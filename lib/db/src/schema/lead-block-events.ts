import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";

/**
 * Append-only audit table for the layered anti-spam defenses
 * (Cloudflare Turnstile, the invisible honeypot, and the per-IP rate limit).
 *
 * It exists so the admin "Anti-spam" tile can show the shop owner concrete
 * 7d/30d numbers — "x bots blocked vs y real customers had to retry" — and
 * decide whether the layered defense is worth the friction. We deliberately
 * store only the minimum needed for the tile (event type, lead type, time)
 * and intentionally do NOT persist IPs or any user data: the per-event
 * structured logs already cover incident-response forensics.
 */
export const leadBlockEventsTable = pgTable(
  "lead_block_events",
  {
    id: serial("id").primaryKey(),
    // One of: "turnstile_failed" | "honeypot" | "rate_limited".
    // Stored as plain text (not an enum) so adding a new defense layer
    // doesn't require an enum migration; the admin endpoint validates
    // values at read time.
    eventType: text("event_type").notNull(),
    // Which form was hit (repair-quote, sell-phone, appointment, contact,
    // reservation). Useful for spotting whether one form attracts more bots.
    leadType: text("lead_type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    // Primary read pattern: count rows by event_type within a time window
    // (last 7d / 30d). Leading the index with event_type keeps the per-type
    // counts cheap as the table grows.
    index("lead_block_events_type_created_idx").on(
      table.eventType,
      table.createdAt,
    ),
    // Secondary: time-only scans for the "leads accepted vs blocked" totals.
    index("lead_block_events_created_idx").on(table.createdAt),
  ],
);

export type LeadBlockEvent = typeof leadBlockEventsTable.$inferSelect;
export type InsertLeadBlockEvent = typeof leadBlockEventsTable.$inferInsert;
