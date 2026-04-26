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
import { eq } from "drizzle-orm";
import { db, leadCommunicationsTable } from "@workspace/db";
import { logger } from "../lib/logger";

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
      let event: { type: string; data?: { email_id?: string; reason?: string } };
      try {
        const wh = new Webhook(RESEND_WEBHOOK_SECRET);
        event = wh.verify(payloadString, {
          "svix-id": req.header("svix-id") ?? "",
          "svix-timestamp": req.header("svix-timestamp") ?? "",
          "svix-signature": req.header("svix-signature") ?? "",
        }) as typeof event;
      } catch (err) {
        logger.warn({ err }, "webhooks.resend.signature_invalid");
        res.status(401).json({ error: "Invalid signature" });
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
            to?: Array<{ status?: string }>;
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
