import { sql } from "drizzle-orm";
import { db, rateLimitCountersTable } from "@workspace/db";

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
};

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
  return await db.transaction(async (tx) => {
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
}
