import {
  Router,
  type IRouter,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import express from "express";
import crypto from "crypto";
import { Webhook } from "svix";
import { and, desc, eq, ilike } from "drizzle-orm";
import {
  db,
  leadCommunicationsTable,
  repairQuotesTable,
  sellPhoneSubmissionsTable,
  appointmentsTable,
  contactMessagesTable,
  itemReservationsTable,
} from "@workspace/db";
import { logger } from "../lib/logger";

type LeadTypeKey =
  | "repair-quote"
  | "sell-phone"
  | "appointment"
  | "contact"
  | "reservation";

const LEAD_TABLE_BY_TYPE = {
  "repair-quote": repairQuotesTable,
  "sell-phone": sellPhoneSubmissionsTable,
  appointment: appointmentsTable,
  contact: contactMessagesTable,
  reservation: itemReservationsTable,
} as const;

function isKnownLeadType(value: string): value is LeadTypeKey {
  return value in LEAD_TABLE_BY_TYPE;
}

function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return value.startsWith("+") ? value : `+${digits || value}`;
}

async function findLeadForInbound(
  channel: "email" | "sms",
  from: string,
): Promise<{ leadType: LeadTypeKey; leadId: string } | null> {
  const recipientMatch =
    channel === "sms" ? normalizePhone(from) : from.trim().toLowerCase();

  const recentOutbound = await db
    .select({
      leadType: leadCommunicationsTable.leadType,
      leadId: leadCommunicationsTable.leadId,
    })
    .from(leadCommunicationsTable)
    .where(
      and(
        eq(leadCommunicationsTable.channel, channel),
        eq(leadCommunicationsTable.direction, "outbound"),
        channel === "sms"
          ? eq(leadCommunicationsTable.recipient, recipientMatch)
          : ilike(leadCommunicationsTable.recipient, recipientMatch),
      ),
    )
    .orderBy(desc(leadCommunicationsTable.createdAt))
    .limit(1);

  if (recentOutbound.length === 0) return null;
  const row = recentOutbound[0];
  if (!isKnownLeadType(row.leadType)) return null;
  return { leadType: row.leadType, leadId: row.leadId };
}

async function maybeReopenLead(
  leadType: LeadTypeKey,
  leadId: string,
): Promise<void> {
  const numericId = Number(leadId);
  if (!Number.isFinite(numericId)) return;
  const table = LEAD_TABLE_BY_TYPE[leadType];
  const [existing] = await db
    .select({ status: table.status })
    .from(table)
    .where(eq(table.id, numericId));
  if (existing && existing.status === "done") {
    await db
      .update(table)
      .set({ status: "new", updatedAt: new Date() })
      .where(eq(table.id, numericId));
    logger.info(
      { leadType, leadId, status: "new" },
      "webhooks.lead.reopened_on_inbound",
    );
  }
}

async function persistInbound(args: {
  channel: "email" | "sms";
  from: string;
  to: string;
  subject: string | null;
  body: string;
  providerMessageId: string | null;
}): Promise<void> {
  const lead = await findLeadForInbound(args.channel, args.from);
  if (!lead) {
    logger.info(
      { channel: args.channel, from: args.from },
      "webhooks.inbound.no_matching_lead",
    );
    return;
  }
  // For inbound rows, `recipient` stores the customer's address (the
  // "other party" on the conversation), mirroring the meaning it has
  // for outbound rows. The shop's own destination address (args.to) is
  // discarded because it's always our configured mailbox/number.
  const customerAddress =
    args.channel === "sms" ? normalizePhone(args.from) : args.from.trim();
  await db.insert(leadCommunicationsTable).values({
    leadType: lead.leadType,
    leadId: lead.leadId,
    channel: args.channel,
    direction: "inbound",
    subject: args.subject,
    body: args.body,
    recipient: customerAddress,
    providerMessageId: args.providerMessageId,
    status: "received",
    error: null,
  });
  await maybeReopenLead(lead.leadType, lead.leadId);
  logger.info(
    {
      channel: args.channel,
      leadType: lead.leadType,
      leadId: lead.leadId,
      from: customerAddress,
      shopAddress: args.to,
    },
    "webhooks.inbound.persisted",
  );
}

const router: IRouter = Router();

const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;
const TELNYX_PUBLIC_KEY = process.env.TELNYX_PUBLIC_KEY;

const RESEND_STATUS_MAP: Record<string, string> = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.delivery_delayed": "delayed",
  "email.bounced": "bounced",
  "email.complained": "complained",
  "email.failed": "failed",
};

router.post(
  "/resend",
  express.raw({ type: "*/*" }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!RESEND_WEBHOOK_SECRET) {
        logger.warn("webhooks.resend.secret_missing");
        res.status(500).json({ error: "Webhook secret not configured" });
        return;
      }
      const rawBody = req.body as Buffer;
      const payloadString = rawBody.toString("utf8");
      type ResendEvent = {
        type: string;
        data?: {
          email_id?: string;
          reason?: string;
          from?: string | { email?: string };
          to?: string | string[];
          subject?: string;
          text?: string;
          html?: string;
          headers?: Record<string, string> | Array<{ name: string; value: string }>;
        };
      };
      let event: ResendEvent;
      try {
        const wh = new Webhook(RESEND_WEBHOOK_SECRET);
        event = wh.verify(payloadString, {
          "svix-id": req.header("svix-id") ?? "",
          "svix-timestamp": req.header("svix-timestamp") ?? "",
          "svix-signature": req.header("svix-signature") ?? "",
        }) as ResendEvent;
      } catch (err) {
        logger.warn({ err }, "webhooks.resend.signature_invalid");
        res.status(401).json({ error: "Invalid signature" });
        return;
      }

      if (isResendInboundType(event.type)) {
        const fromValue = event.data?.from;
        const fromAddress =
          typeof fromValue === "string"
            ? extractEmailAddress(fromValue)
            : fromValue?.email ?? null;
        const toValue = event.data?.to;
        const toAddress = Array.isArray(toValue)
          ? toValue[0]
          : typeof toValue === "string"
            ? toValue
            : null;
        if (!fromAddress) {
          logger.info({ type: event.type }, "webhooks.resend.inbound_no_from");
          res.json({ ok: true });
          return;
        }
        await persistInbound({
          channel: "email",
          from: fromAddress,
          to: toAddress ?? "",
          subject: event.data?.subject ?? null,
          body: event.data?.text ?? event.data?.html ?? "",
          providerMessageId: event.data?.email_id ?? null,
        });
        res.json({ ok: true });
        return;
      }

      const status = RESEND_STATUS_MAP[event.type];
      const messageId = event.data?.email_id;
      if (status && messageId) {
        await db
          .update(leadCommunicationsTable)
          .set({
            status,
            error: event.data?.reason ?? null,
            updatedAt: new Date(),
          })
          .where(eq(leadCommunicationsTable.providerMessageId, messageId));
        logger.info(
          { messageId, status, type: event.type },
          "webhooks.resend.updated",
        );
      } else {
        logger.info({ type: event.type }, "webhooks.resend.ignored");
      }
      res.json({ ok: true });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.post(
  "/telnyx",
  express.raw({ type: "*/*" }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!TELNYX_PUBLIC_KEY) {
        logger.warn("webhooks.telnyx.public_key_missing");
        res.status(500).json({ error: "Webhook public key not configured" });
        return;
      }
      const signature = req.header("telnyx-signature-ed25519");
      const timestamp = req.header("telnyx-timestamp");
      const rawBody = req.body as Buffer;
      if (!signature || !timestamp) {
        res.status(401).json({ error: "Missing signature headers" });
        return;
      }
      const TOLERANCE_SECONDS = 300;
      const ts = Number(timestamp);
      if (
        !Number.isFinite(ts) ||
        Math.abs(Date.now() / 1000 - ts) > TOLERANCE_SECONDS
      ) {
        res.status(401).json({ error: "Stale timestamp" });
        return;
      }
      const valid = verifyTelnyxSignature(
        TELNYX_PUBLIC_KEY,
        signature,
        timestamp,
        rawBody,
      );
      if (!valid) {
        logger.warn("webhooks.telnyx.signature_invalid");
        res.status(401).json({ error: "Invalid signature" });
        return;
      }

      const payload = JSON.parse(rawBody.toString("utf8")) as {
        data?: {
          event_type?: string;
          payload?: {
            id?: string;
            text?: string;
            from?: { phone_number?: string };
            to?: Array<{ phone_number?: string; status?: string }>;
            errors?: Array<{ title?: string; detail?: string }>;
          };
        };
      };
      const eventType = payload.data?.event_type;
      const messageId = payload.data?.payload?.id;
      const recipientStatus = payload.data?.payload?.to?.[0]?.status;
      const errorDetail =
        payload.data?.payload?.errors?.[0]?.detail ??
        payload.data?.payload?.errors?.[0]?.title ??
        null;

      if (eventType === "message.received") {
        const fromNumber = payload.data?.payload?.from?.phone_number;
        const toNumber = payload.data?.payload?.to?.[0]?.phone_number ?? "";
        const text = payload.data?.payload?.text ?? "";
        if (!fromNumber) {
          logger.info({ eventType }, "webhooks.telnyx.inbound_no_from");
          res.json({ ok: true });
          return;
        }
        await persistInbound({
          channel: "sms",
          from: fromNumber,
          to: toNumber,
          subject: null,
          body: text,
          providerMessageId: messageId ?? null,
        });
        res.json({ ok: true });
        return;
      }

      const status = mapTelnyxStatus(eventType, recipientStatus);
      if (status && messageId) {
        await db
          .update(leadCommunicationsTable)
          .set({ status, error: errorDetail, updatedAt: new Date() })
          .where(eq(leadCommunicationsTable.providerMessageId, messageId));
        logger.info(
          { messageId, status, eventType },
          "webhooks.telnyx.updated",
        );
      } else {
        logger.info({ eventType }, "webhooks.telnyx.ignored");
      }
      res.json({ ok: true });
    } catch (err) {
      next(err as Error);
    }
  },
);

function verifyTelnyxSignature(
  publicKeyBase64: string,
  signatureBase64: string,
  timestamp: string,
  rawBody: Buffer,
): boolean {
  try {
    const signedPayload = Buffer.concat([
      Buffer.from(`${timestamp}|`, "utf8"),
      rawBody,
    ]);
    const signature = Buffer.from(signatureBase64, "base64");
    const publicKeyDer = Buffer.concat([
      Buffer.from("302a300506032b6570032100", "hex"),
      Buffer.from(publicKeyBase64, "base64"),
    ]);
    const keyObject = crypto.createPublicKey({
      key: publicKeyDer,
      format: "der",
      type: "spki",
    });
    return crypto.verify(null, signedPayload, keyObject, signature);
  } catch (err) {
    logger.warn({ err }, "webhooks.telnyx.verify_error");
    return false;
  }
}

function isResendInboundType(type: string): boolean {
  return (
    type === "inbound.email.received" ||
    type === "email.inbound.received" ||
    type === "email.received" ||
    type.startsWith("inbound.")
  );
}

function extractEmailAddress(value: string): string | null {
  const angle = value.match(/<([^>]+)>/);
  if (angle) return angle[1].trim();
  const bare = value.trim();
  return bare.includes("@") ? bare : null;
}

function mapTelnyxStatus(
  eventType?: string,
  recipientStatus?: string,
): string | null {
  if (!eventType) return null;
  if (eventType === "message.sent") return "sent";
  if (eventType === "message.finalized") {
    if (recipientStatus === "delivered") return "delivered";
    if (recipientStatus === "delivery_failed") return "failed";
    if (recipientStatus === "delivery_unconfirmed") return "delivered";
    if (recipientStatus === "sending_failed") return "failed";
    return recipientStatus ?? null;
  }
  return null;
}

export default router;
