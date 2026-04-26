import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const baseColumns = {
  id: serial("id").primaryKey(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const repairQuotesTable = pgTable("repair_quotes", {
  ...baseColumns,
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  deviceType: text("device_type").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  problem: text("problem").notNull(),
  preferredContact: text("preferred_contact").notNull().default("call"),
  urgency: text("urgency").notNull().default("flexible"),
  notes: text("notes"),
});

export const sellPhoneSubmissionsTable = pgTable("sell_phone_submissions", {
  ...baseColumns,
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  storage: text("storage"),
  carrier: text("carrier"),
  lockedStatus: text("locked_status").notNull().default("unlocked"),
  condition: text("condition").notNull().default("good"),
  batteryHealth: integer("battery_health"),
  damageNotes: text("damage_notes"),
  expectedPrice: numeric("expected_price", { precision: 10, scale: 2 }),
});

export const appointmentsTable = pgTable("appointments", {
  ...baseColumns,
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  serviceType: text("service_type").notNull(),
  preferredDatetime: text("preferred_datetime").notNull(),
  notes: text("notes"),
});

export const contactMessagesTable = pgTable("contact_messages", {
  ...baseColumns,
  name: text("name").notNull(),
  contact: text("contact").notNull(),
  message: text("message").notNull(),
});

export const itemReservationsTable = pgTable("item_reservations", {
  ...baseColumns,
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  itemId: text("item_id").notNull(),
  itemLabel: text("item_label").notNull(),
  notes: text("notes"),
});

const omitServer = { id: true, status: true, createdAt: true, updatedAt: true } as const;

export const insertRepairQuoteSchema = createInsertSchema(repairQuotesTable).omit(omitServer);
export const repairQuoteSchema = createSelectSchema(repairQuotesTable);
export type InsertRepairQuote = z.infer<typeof insertRepairQuoteSchema>;
export type RepairQuote = typeof repairQuotesTable.$inferSelect;

export const insertSellPhoneSchema = createInsertSchema(sellPhoneSubmissionsTable).omit(omitServer);
export const sellPhoneSchema = createSelectSchema(sellPhoneSubmissionsTable);
export type InsertSellPhone = z.infer<typeof insertSellPhoneSchema>;
export type SellPhone = typeof sellPhoneSubmissionsTable.$inferSelect;

export const insertAppointmentSchema = createInsertSchema(appointmentsTable).omit(omitServer);
export const appointmentSchema = createSelectSchema(appointmentsTable);
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointmentsTable.$inferSelect;

export const insertContactMessageSchema = createInsertSchema(contactMessagesTable).omit(omitServer);
export const contactMessageSchema = createSelectSchema(contactMessagesTable);
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessagesTable.$inferSelect;

export const insertItemReservationSchema = createInsertSchema(itemReservationsTable).omit(omitServer);
export const itemReservationSchema = createSelectSchema(itemReservationsTable);
export type InsertItemReservation = z.infer<typeof insertItemReservationSchema>;
export type ItemReservation = typeof itemReservationsTable.$inferSelect;
