import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const rateLimitCountersTable = pgTable("rate_limit_counters", {
  key: text("key").primaryKey(),
  count: integer("count").notNull().default(0),
  resetAt: timestamp("reset_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type RateLimitCounter = typeof rateLimitCountersTable.$inferSelect;
