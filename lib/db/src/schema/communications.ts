import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadCommunicationsTable = pgTable(
  "lead_communications",
  {
    id: serial("id").primaryKey(),
    leadType: text("lead_type").notNull(),
    leadId: text("lead_id").notNull(),
    channel: text("channel").notNull(),
    direction: text("direction").notNull().default("outbound"),
    subject: text("subject"),
    body: text("body").notNull(),
    recipient: text("recipient").notNull(),
    providerMessageId: text("provider_message_id"),
    status: text("status").notNull().default("queued"),
    error: text("error"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    leadIdx: index("lead_comms_lead_idx").on(table.leadType, table.leadId),
    createdIdx: index("lead_comms_created_idx").on(table.createdAt),
    providerMsgIdx: index("lead_comms_provider_msg_idx").on(
      table.providerMessageId,
    ),
  }),
);

export const leadCommunicationSchema = createSelectSchema(
  leadCommunicationsTable,
);
export type LeadCommunication = typeof leadCommunicationsTable.$inferSelect;
export type InsertLeadCommunication =
  typeof leadCommunicationsTable.$inferInsert;
