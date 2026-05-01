import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

// --- enumerations ---

// `recurrence` controls how the schedule window is interpreted on top of the
// optional [startsAt, endsAt] date window:
//   - "always": live for the entire window
//   - "daily":  live every day, optionally only within a time-of-day window
//   - "weekly": live only on selected days-of-week, optionally within a
//               time-of-day window
export const PROMOTION_RECURRENCE_VALUES = [
  "always",
  "daily",
  "weekly",
] as const;
export type PromotionRecurrence = (typeof PROMOTION_RECURRENCE_VALUES)[number];

// Limited palette so the homepage banner stays on-brand. The frontend maps
// these tokens to tailwind classes; adding a new accent requires a frontend
// change (not just a DB row), which is the correct trade-off here.
export const PROMOTION_ACCENT_VALUES = [
  "amber",
  "red",
  "emerald",
  "blue",
] as const;
export type PromotionAccent = (typeof PROMOTION_ACCENT_VALUES)[number];

// --- table ---

export const promotionsTable = pgTable("promotions", {
  id: serial("id").primaryKey(),

  // content
  headline: text("headline").notNull(),
  supportingLine: text("supporting_line"),
  badge: text("badge"),
  ctaLabel: text("cta_label"),
  ctaHref: text("cta_href"),
  accent: text("accent").notNull().default("amber"),

  // schedule
  active: boolean("active").notNull().default(true),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  recurrence: text("recurrence").notNull().default("always"),
  // CSV of integers 0-6 (Sun=0..Sat=6), e.g. "0,3,5". Stored as text to keep
  // the migration trivially portable across drizzle-kit push runs (no
  // PostgreSQL array type quirks). Empty when recurrence != "weekly".
  daysOfWeek: text("days_of_week").notNull().default(""),
  // Minutes from local midnight (0..1439) in the shop's timezone. NULL on
  // either side means "no time-of-day bound" for that side.
  dailyStartMinutes: integer("daily_start_minutes"),
  dailyEndMinutes: integer("daily_end_minutes"),

  // ordering / metadata
  sortOrder: numeric("sort_order", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type PromotionRow = typeof promotionsTable.$inferSelect;

// --- zod schemas (used by API for validation) ---

const baseInsert = createInsertSchema(promotionsTable, {
  recurrence: z.enum(PROMOTION_RECURRENCE_VALUES),
  accent: z.enum(PROMOTION_ACCENT_VALUES),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertPromotionSchema = baseInsert;
export const promotionSchema = createSelectSchema(promotionsTable);
export const updatePromotionSchema = baseInsert.partial();

export type InsertPromotion = z.infer<typeof insertPromotionSchema>;
export type UpdatePromotion = z.infer<typeof updatePromotionSchema>;
