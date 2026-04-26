import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const AVAILABILITY_VALUES = [
  "in_stock",
  "on_hold",
  "sold",
  "hidden",
] as const;
export type Availability = (typeof AVAILABILITY_VALUES)[number];

export const inventoryItemsTable = pgTable("inventory_items", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  storage: text("storage"),
  color: text("color"),
  condition: text("condition"),
  carrier: text("carrier"),
  warranty: text("warranty"),
  priceCents: integer("price_cents").notNull().default(0),
  priceDisplay: text("price_display").notNull(),
  availability: text("availability").notNull().default("in_stock"),
  imageUrl: text("image_url"),
  description: text("description"),
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

export type InventoryItemRow = typeof inventoryItemsTable.$inferSelect;

const baseInsert = createInsertSchema(inventoryItemsTable, {
  availability: z.enum(AVAILABILITY_VALUES),
}).omit({ createdAt: true, updatedAt: true });

export const insertInventoryItemSchema = baseInsert;
export const inventoryItemSchema = createSelectSchema(inventoryItemsTable);
export const updateInventoryItemSchema = baseInsert.partial().extend({
  // id cannot be updated through this schema
  id: z.string().optional(),
});
export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;
export type UpdateInventoryItem = z.infer<typeof updateInventoryItemSchema>;
