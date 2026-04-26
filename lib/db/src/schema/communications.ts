import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
  integer,
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
    readAt: timestamp("read_at", { withTimezone: true }),
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
    inboundUnreadIdx: index("lead_comms_inbound_unread_idx").on(
      table.direction,
      table.readAt,
    ),
  }),
);

export const leadCommunicationSchema = createSelectSchema(
  leadCommunicationsTable,
);
export type LeadCommunication = typeof leadCommunicationsTable.$inferSelect;
export type InsertLeadCommunication =
  typeof leadCommunicationsTable.$inferInsert;

export const leadReplyTemplatesTable = pgTable(
  "lead_reply_templates",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    channel: text("channel").notNull(),
    leadType: text("lead_type"),
    subject: text("subject"),
    body: text("body").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    channelIdx: index("lead_reply_tpl_channel_idx").on(
      table.channel,
      table.leadType,
    ),
  }),
);

export const leadReplyTemplateSchema = createSelectSchema(
  leadReplyTemplatesTable,
);
export type LeadReplyTemplate = typeof leadReplyTemplatesTable.$inferSelect;
export type InsertLeadReplyTemplate =
  typeof leadReplyTemplatesTable.$inferInsert;
