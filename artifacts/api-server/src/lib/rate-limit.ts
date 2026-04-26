import { and, lt, sql } from "drizzle-orm";
import { db, rateLimitCountersTable } from "@workspace/db";
import { logger } from "./logger";

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
};

/**
 * How long after a row's window has expired we keep it before deleting.
 * Giving a day of grace means an in-flight request whose transaction started
 * just before the row expired will still find its row, and avoids a thundering
 * herd of cleanup-vs-insert races at the exact moment of expiry.
 */
const CLEANUP_GRACE_MS = 24 * 60 * 60 * 1000;

/**
 * Probability that any given checkRateLimit call also kicks off a background
 * cleanup. Low enough that it adds negligible overhead under load, high enough
 * that even modest traffic keeps the table bounded between restarts.
 */
const OPPORTUNISTIC_CLEANUP_PROBABILITY = 0.01;

let cleanupInFlight = false;

/**
 * Delete rate-limit rows whose window has been expired for longer than the
 * grace period. Safe to run concurrently with normal limiter traffic:
 *   - We require BOTH reset_at AND updated_at to be older than the grace
 *     threshold, so a freshly-inserted row (updated_at = now) is never
 *     deleted out from under an in-flight checkRateLimit transaction even
 *     though its initial reset_at is the epoch.
 *   - DELETE in Postgres takes row locks and will wait for any concurrent
 *     SELECT ... FOR UPDATE on the same row to finish.
 */
export async function cleanupExpiredRateLimits(
  graceMs: number = CLEANUP_GRACE_MS,
): Promise<number> {
  const threshold = new Date(Date.now() - graceMs);
  const result = await db
    .delete(rateLimitCountersTable)
    .where(
      and(
        lt(rateLimitCountersTable.resetAt, threshold),
        lt(rateLimitCountersTable.updatedAt, threshold),
      ),
    );
  return result.rowCount ?? 0;
}

function maybeOpportunisticCleanup(): void {
  if (cleanupInFlight) return;
  if (Math.random() >= OPPORTUNISTIC_CLEANUP_PROBABILITY) return;
  cleanupInFlight = true;
  cleanupExpiredRateLimits()
    .then((deleted) => {
      if (deleted > 0) {
        logger.info({ deleted }, "rate_limit.cleanup");
      }
    })
    .catch((err) => {
      logger.warn({ err }, "rate_limit.cleanup_failed");
    })
    .finally(() => {
      cleanupInFlight = false;
    });
}

/**
 * Persistent, per-key rate limiter backed by Postgres.
 *
 * Uses INSERT ... ON CONFLICT DO NOTHING to ensure the counter row exists,
 * then SELECT ... FOR UPDATE inside a transaction to serialize concurrent
 * requests that share the same key. This survives server restarts and is
 * safe across multiple API server instances.
 */
export async function checkRateLimit(
  key: string,
  max: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const result = await db.transaction(async (tx) => {
    // Make sure a row exists for this key without disturbing an existing one.
    await tx
      .insert(rateLimitCountersTable)
      .values({ key, count: 0, resetAt: new Date(0) })
      .onConflictDoNothing({ target: rateLimitCountersTable.key });

    // Lock the row for the duration of this transaction so concurrent
    // requests for the same key serialize behind us.
    const locked = await tx.execute<{
      count: number;
      reset_at: Date;
    }>(
      sql`SELECT count, reset_at FROM rate_limit_counters WHERE key = ${key} FOR UPDATE`,
    );
    const row = locked.rows[0];
    const now = new Date();
    const currentCount = Number(row?.count ?? 0);
    const currentResetAt = row?.reset_at ? new Date(row.reset_at) : new Date(0);

    if (currentResetAt <= now) {
      const newResetAt = new Date(now.getTime() + windowMs);
      await tx
        .update(rateLimitCountersTable)
        .set({ count: 1, resetAt: newResetAt, updatedAt: now })
        .where(sql`${rateLimitCountersTable.key} = ${key}`);
      return { allowed: true, retryAfterSeconds: 0, remaining: max - 1 };
    }

    if (currentCount >= max) {
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil(
          (currentResetAt.getTime() - now.getTime()) / 1000,
        ),
        remaining: 0,
      };
    }

    await tx
      .update(rateLimitCountersTable)
      .set({ count: currentCount + 1, updatedAt: now })
      .where(sql`${rateLimitCountersTable.key} = ${key}`);
    return {
      allowed: true,
      retryAfterSeconds: 0,
      remaining: max - currentCount - 1,
    };
  });

  // Fire-and-forget: keeps the table bounded under live traffic without
  // blocking the request that triggered it.
  maybeOpportunisticCleanup();

  return result;
}
