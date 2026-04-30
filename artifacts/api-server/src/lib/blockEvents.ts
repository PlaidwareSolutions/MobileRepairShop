import type { Logger } from "pino";
import { db, leadBlockEventsTable } from "@workspace/db";

export type BlockEventType =
  | "turnstile_failed"
  | "honeypot"
  | "rate_limited";

/**
 * Insert a single row into `lead_block_events` so the admin "Anti-spam" tile
 * can later count blocks per defense layer over the last 7d/30d.
 *
 * This is intentionally fire-and-forget: it returns synchronously and the
 * insert completes on its own promise. Two reasons we never want callers to
 * wait on it:
 *   1. A database hiccup must NEVER make us hand a bot a different response
 *      than it would otherwise see (which would leak that the request was
 *      being audited), and must NEVER turn a legitimate 429/400 into a 500
 *      for a real customer.
 *   2. Slow Postgres should not delay the actual block response — the user
 *      (real or bot) is already getting rejected synchronously, and the
 *      audit log is best-effort telemetry, not part of the critical path.
 *
 * Errors are logged via the existing per-request logger and swallowed.
 */
export function recordBlockEvent(
  eventType: BlockEventType,
  leadType: string,
  log: Logger,
): void {
  void db
    .insert(leadBlockEventsTable)
    .values({ eventType, leadType })
    .catch((err: unknown) => {
      log.warn({ err, eventType, leadType }, "lead.block_event_insert_failed");
    });
}
