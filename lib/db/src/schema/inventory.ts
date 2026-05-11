import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  boolean,
  uuid,
  customType,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

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
  imageUrl2: text("image_url_2"),
  imageUrl3: text("image_url_3"),
  financingEnabled: boolean("financing_enabled").notNull().default(true),
  financingFeatured: boolean("financing_featured").notNull().default(false),
  financingDownPaymentCents: integer("financing_down_payment_cents").notNull().default(8000),
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
  id: z.string().optional(),
});
export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;
export type UpdateInventoryItem = z.infer<typeof updateInventoryItemSchema>;

export const inventoryImagesTable = pgTable("inventory_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  data: bytea("data").notNull(),
  contentType: text("content_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type InventoryImageRow = typeof inventoryImagesTable.$inferSelect;
