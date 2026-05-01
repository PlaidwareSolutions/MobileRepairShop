import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Single-row table holding owner-editable shop contact info: phone, address,
// and store hours. The row is keyed by id=1 — there is exactly one shop, and
// keeping the singleton at a fixed id keeps the API simple (no list / pick).
//
// Phone is stored once as an E.164 string (e.g. "+13466236898"); display,
// tel:, sms:, and wa.me links are derived in the serializer so the owner
// only ever has to update one value when the number changes.
//
// Hours are stored as one column per weekday so the DB schema is fully
// describable to drizzle (no JSON columns) and so partial updates can target
// one day at a time without a JSON merge.

export const businessSettingsTable = pgTable("business_settings", {
  id: integer("id").primaryKey(),

  // contact
  phoneE164: text("phone_e164").notNull(),

  // address
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2").notNull(),
  mapsLink: text("maps_link").notNull(),
  mapsEmbed: text("maps_embed").notNull(),

  // hours (free-form per day so owners can write things like "Closed" or
  // "By appointment" without us inventing yet another mini DSL)
  hoursShort: text("hours_short").notNull(),
  hoursSunday: text("hours_sunday").notNull(),
  hoursMonday: text("hours_monday").notNull(),
  hoursTuesday: text("hours_tuesday").notNull(),
  hoursWednesday: text("hours_wednesday").notNull(),
  hoursThursday: text("hours_thursday").notNull(),
  hoursFriday: text("hours_friday").notNull(),
  hoursSaturday: text("hours_saturday").notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type BusinessSettingsRow = typeof businessSettingsTable.$inferSelect;

export const businessSettingsSchema = createSelectSchema(businessSettingsTable);

// Update schema used by the admin PATCH endpoint. Every field is optional so
// the owner can save just the field(s) they touched. `phoneE164` is validated
// to a sane shape — the serializer assumes it starts with "+" and contains
// only digits afterward when deriving tel:/sms:/wa.me links.
export const updateBusinessSettingsSchema = z
  .object({
    phoneE164: z
      .string()
      .trim()
      .regex(/^\+\d{8,15}$/, "Phone must be E.164 format like +13466236898"),
    addressLine1: z.string().trim().min(1).max(200),
    addressLine2: z.string().trim().min(1).max(200),
    mapsLink: z
      .string()
      .trim()
      .url("Maps link must be a full URL"),
    mapsEmbed: z
      .string()
      .trim()
      .url("Maps embed must be a full URL"),
    hoursShort: z.string().trim().min(1).max(200),
    hoursSunday: z.string().trim().min(1).max(80),
    hoursMonday: z.string().trim().min(1).max(80),
    hoursTuesday: z.string().trim().min(1).max(80),
    hoursWednesday: z.string().trim().min(1).max(80),
    hoursThursday: z.string().trim().min(1).max(80),
    hoursFriday: z.string().trim().min(1).max(80),
    hoursSaturday: z.string().trim().min(1).max(80),
  })
  .partial();

export type UpdateBusinessSettings = z.infer<typeof updateBusinessSettingsSchema>;
