import { pgTable, text, integer, timestamp, index } from "drizzle-orm/pg-core";

export const rateLimitCountersTable = pgTable(
  "rate_limit_counters",
  {
    key: text("key").primaryKey(),
    count: integer("count").notNull().default(0),
    resetAt: timestamp("reset_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    // Supports the periodic cleanup query
    // (DELETE WHERE reset_at < threshold AND updated_at < threshold).
    // reset_at advances by a window length on every reset and is the more
    // selective of the two conditions, so an index on it alone keeps the
    // delete cheap as the table grows.
    index("rate_limit_counters_reset_at_idx").on(table.resetAt),
  ],
);

export type RateLimitCounter = typeof rateLimitCountersTable.$inferSelect;
