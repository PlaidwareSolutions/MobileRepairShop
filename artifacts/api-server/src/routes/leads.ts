import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db } from "@workspace/db";
import {
  repairQuotesTable,
  sellPhoneSubmissionsTable,
  appointmentsTable,
  contactMessagesTable,
  itemReservationsTable,
} from "@workspace/db";
import {
  SubmitRepairQuoteBody,
  SubmitSellPhoneBody,
  SubmitAppointmentBody,
  SubmitContactBody,
  SubmitReservationBody,
} from "@workspace/api-zod";
import { ZodError, z } from "zod";
import { leadRateLimit } from "../middleware/leadRateLimit";
import { requireTurnstile } from "../middleware/turnstile";
import { turnstileEnabled, verifyTurnstileToken } from "../lib/turnstile";
import { recordBlockEvent } from "../lib/blockEvents";
import { sendEmail, sendSms, messagingConfig } from "../lib/messaging";
import { getStripeClient } from "../lib/stripeClient";

const router: IRouter = Router();

// Minimum time, in milliseconds, between when a lead form mounts in the
// browser and when it's submitted. Real users take several seconds to read
// the fields and type their info; scripted bots POST in well under a second.
const MIN_FORM_FILL_MS = 2000;

function handleValidation(err: unknown, res: Response, next: NextFunction): boolean {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: { issues: err.issues },
    });
    return true;
  }
  next(err as Error);
  return true;
}

/**
 * Inspect req.body for the two anti-bot signals we attach client-side:
 *   - `website`: an invisible honeypot input. Real users never see or fill it.
 *   - `renderedAt`: a Date.now() captured when the form mounted. If the form
 *     was submitted unrealistically fast we treat it as a bot.
 *
 * These fields are intentionally NOT part of the OpenAPI / zod schema so they
 * stay an internal mechanism and don't leak into the public API contract.
 * The caller is responsible for returning the same success-shaped response a
 * real submission would produce, so a bot can't distinguish the two paths.
 */
function detectBot(req: Request): { isBot: boolean; honeypotFilled: boolean; elapsedMs: number | null } {
  const raw = (req.body ?? {}) as { website?: unknown; renderedAt?: unknown };
  const honeypot = typeof raw.website === "string" ? raw.website.trim() : "";
  const renderedAt =
    typeof raw.renderedAt === "number" && Number.isFinite(raw.renderedAt)
      ? raw.renderedAt
      : null;
  const elapsedMs = renderedAt !== null ? Date.now() - renderedAt : null;
  const honeypotFilled = honeypot.length > 0;
  const tooFast =
    elapsedMs !== null && elapsedMs >= 0 && elapsedMs < MIN_FORM_FILL_MS;
  return { isBot: honeypotFilled || tooFast, honeypotFilled, elapsedMs };
}

/**
 * Generates a plausible-looking positive integer id for the bot-blocked
 * response so its shape and value range match what the real insert path
 * returns. None of the lead form clients read this id, so a random value is
 * safe — the only goal is to stop a bot from fingerprinting blocked vs
 * accepted by inspecting `id`.
 */
function fakeLeadId(): number {
  return Math.floor(Math.random() * 1_000_000) + 1;
}

router.post(
  "/repair-quote",
  leadRateLimit("repair-quote"),
  requireTurnstile("repair-quote"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bot = detectBot(req);
      if (bot.isBot) {
        req.log.warn(
          {
            leadType: "repair-quote",
            ip: req.ip,
            honeypotFilled: bot.honeypotFilled,
            elapsedMs: bot.elapsedMs,
          },
          "lead.bot_blocked",
        );
        recordBlockEvent("honeypot", "repair-quote", req.log);
        // Mirror the real success shape ({ ok, id }) so a bot can't
        // fingerprint blocked vs accepted by inspecting the response.
        res.status(201).json({ ok: true, id: fakeLeadId() });
        return;
      }

      const body = SubmitRepairQuoteBody.parse(req.body);
      // Mail-in quotes ship the device to us, so the team needs a return
      // address to mail it back. Reject mail-in submissions that don't
      // include one — otherwise the lead is unfulfillable. In-store quotes
      // never need it.
      if (body.source === "mail-in" && !body.returnAddress?.trim()) {
        res.status(400).json({
          error: "Validation failed",
          details: {
            issues: [
              {
                code: "custom",
                path: ["returnAddress"],
                message: "Return shipping address is required for mail-in repairs.",
              },
            ],
          },
        });
        return;
      }
      const [row] = await db
        .insert(repairQuotesTable)
        .values({
          name: body.name,
          phone: body.phone,
          email: body.email ?? null,
          deviceType: body.deviceType,
          brand: body.brand,
          model: body.model,
          problem: body.problem,
          preferredContact: body.preferredContact ?? "call",
          urgency: body.urgency ?? "flexible",
          notes: body.notes ?? null,
          photoUrl: body.photoUrl ?? null,
          source: body.source ?? "in-store",
          returnAddress: body.returnAddress ?? null,
        })
        .returning({ id: repairQuotesTable.id });
      req.log.info({ leadType: "repair-quote", id: row.id }, "lead.created");
      res.status(201).json({ ok: true, id: row.id });
    } catch (err) {
      handleValidation(err, res, next);
    }
  },
);

router.post(
  "/sell-phone",
  leadRateLimit("sell-phone"),
  requireTurnstile("sell-phone"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bot = detectBot(req);
      if (bot.isBot) {
        req.log.warn(
          {
            leadType: "sell-phone",
            ip: req.ip,
            honeypotFilled: bot.honeypotFilled,
            elapsedMs: bot.elapsedMs,
          },
          "lead.bot_blocked",
        );
        recordBlockEvent("honeypot", "sell-phone", req.log);
        // Mirror the real success shape ({ ok, id }) so a bot can't
        // fingerprint blocked vs accepted by inspecting the response.
        res.status(201).json({ ok: true, id: fakeLeadId() });
        return;
      }

      const body = SubmitSellPhoneBody.parse(req.body);
      const [row] = await db
        .insert(sellPhoneSubmissionsTable)
        .values({
          name: body.name,
          phone: body.phone,
          brand: body.brand,
          model: body.model,
          storage: body.storage ?? null,
          carrier: body.carrier ?? null,
          lockedStatus: body.lockedStatus ?? "unlocked",
          condition: body.condition ?? "good",
          batteryHealth: body.batteryHealth ?? null,
          damageNotes: body.damageNotes ?? null,
          expectedPrice: body.expectedPrice ?? null,
          photoUrl: body.photoUrl ?? null,
        })
        .returning({ id: sellPhoneSubmissionsTable.id });
      req.log.info({ leadType: "sell-phone", id: row.id }, "lead.created");
      res.status(201).json({ ok: true, id: row.id });
    } catch (err) {
      handleValidation(err, res, next);
    }
  },
);

router.post(
  "/appointment",
  leadRateLimit("appointment"),
  requireTurnstile("appointment"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bot = detectBot(req);
      if (bot.isBot) {
        req.log.warn(
          {
            leadType: "appointment",
            ip: req.ip,
            honeypotFilled: bot.honeypotFilled,
            elapsedMs: bot.elapsedMs,
          },
          "lead.bot_blocked",
        );
        recordBlockEvent("honeypot", "appointment", req.log);
        // Mirror the real success shape ({ ok, id }) so a bot can't
        // fingerprint blocked vs accepted by inspecting the response.
        res.status(201).json({ ok: true, id: fakeLeadId() });
        return;
      }

      const body = SubmitAppointmentBody.parse(req.body);
      const [row] = await db
        .insert(appointmentsTable)
        .values({
          name: body.name,
          phone: body.phone,
          serviceType: body.serviceType,
          preferredDatetime: body.preferredDatetime,
          notes: body.notes ?? null,
        })
        .returning({ id: appointmentsTable.id });
      req.log.info({ leadType: "appointment", id: row.id }, "lead.created");
      res.status(201).json({ ok: true, id: row.id });
    } catch (err) {
      handleValidation(err, res, next);
    }
  },
);

router.post(
  "/contact",
  leadRateLimit("contact"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bot = detectBot(req);
      if (bot.isBot) {
        req.log.warn(
          {
            leadType: "contact",
            ip: req.ip,
            honeypotFilled: bot.honeypotFilled,
            elapsedMs: bot.elapsedMs,
          },
          "lead.bot_blocked",
        );
        recordBlockEvent("honeypot", "contact", req.log);
        // Return the exact same payload as the success path below so a bot
        // can't distinguish blocked from accepted by inspecting the response.
        // The contact form doesn't read the id, so omitting it everywhere is
        // safe and lets us keep the two paths byte-identical.
        res.status(201).json({ ok: true });
        return;
      }

      // Cloudflare Turnstile is the second line of defense for the contact
      // form (the most-targeted endpoint). It runs AFTER the honeypot so we
      // don't burn siteverify calls on obvious bots, and only when Turnstile
      // is actually configured. Failures return a friendly 400 because a real
      // customer who happened to fail a managed challenge needs to know how
      // to retry — unlike the honeypot which silently 201s.
      if (turnstileEnabled) {
        const tokenRaw = (req.body ?? {}) as { cfTurnstileToken?: unknown };
        const token =
          typeof tokenRaw.cfTurnstileToken === "string"
            ? tokenRaw.cfTurnstileToken
            : null;
        const verify = await verifyTurnstileToken(token, req.ip ?? null);
        if (!verify.success) {
          req.log.warn(
            {
              leadType: "contact",
              ip: req.ip,
              errorCodes: "errorCodes" in verify ? verify.errorCodes : [],
            },
            "lead.turnstile_failed",
          );
          recordBlockEvent("turnstile_failed", "contact", req.log);
          res.status(400).json({
            error:
              "We couldn't verify that submission. Please refresh the page and try again, or call us directly at (281) 446-2166.",
          });
          return;
        }
      }

      const body = SubmitContactBody.parse(req.body);
      const [row] = await db
        .insert(contactMessagesTable)
        .values({
          name: body.name,
          contact: body.contact,
          message: body.message,
          // Persist the structured source so the admin inbox doesn't have
          // to sniff the message body. Default to "contact" when the field
          // is omitted (legacy ContactForm callers don't send it). Any
          // string outside the enum is rejected by SubmitContactBody above
          // before this line runs, so the default only applies to genuinely
          // missing values. The DB column also defaults to "contact" as
          // belt-and-braces.
          source: body.source ?? "contact",
        })
        .returning({ id: contactMessagesTable.id });
      req.log.info({ leadType: "contact", id: row.id }, "lead.created");
      res.status(201).json({ ok: true });
    } catch (err) {
      handleValidation(err, res, next);
    }
  },
);

router.post(
  "/reservation",
  leadRateLimit("reservation"),
  requireTurnstile("reservation"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bot = detectBot(req);
      if (bot.isBot) {
        req.log.warn(
          {
            leadType: "reservation",
            ip: req.ip,
            honeypotFilled: bot.honeypotFilled,
            elapsedMs: bot.elapsedMs,
          },
          "lead.bot_blocked",
        );
        recordBlockEvent("honeypot", "reservation", req.log);
        // Mirror the real success shape ({ ok, id }) so a bot can't
        // fingerprint blocked vs accepted by inspecting the response.
        res.status(201).json({ ok: true, id: fakeLeadId() });
        return;
      }

      const body = SubmitReservationBody.parse(req.body);
      const [row] = await db
        .insert(itemReservationsTable)
        .values({
          name: body.name,
          phone: body.phone,
          itemId: body.itemId,
          itemLabel: body.itemLabel,
          notes: body.notes ?? null,
        })
        .returning({ id: itemReservationsTable.id });
      req.log.info({ leadType: "reservation", id: row.id }, "lead.created");
      res.status(201).json({ ok: true, id: row.id });
    } catch (err) {
      handleValidation(err, res, next);
    }
  },
);

const RepairIntakeBody = z.object({
  deviceType: z.string().min(1).max(80),
  brand: z.string().min(1).max(80),
  model: z.string().min(1).max(120),
  problem: z.string().min(1).max(4000),
  photoUrl: z.string().max(500).optional(),
  urgency: z.enum(["asap", "today", "this_week", "flexible"]).optional().default("flexible"),
  source: z.enum(["in-store", "mail-in"]).optional().default("in-store"),
  preferredDatetime: z.string().max(80).optional(),
  returnAddress: z.string().max(500).optional(),
  name: z.string().min(1).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().max(200).optional(),
  preferredContact: z.enum(["call", "text", "whatsapp", "email"]).optional().default("call"),
  notes: z.string().max(2000).optional(),
  stripePaymentIntentId: z.string().max(200).optional(),
});

router.post(
  "/repair-intake",
  leadRateLimit("repair-intake"),
  requireTurnstile("repair-intake"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bot = detectBot(req);
      if (bot.isBot) {
        req.log.warn(
          {
            leadType: "repair-intake",
            ip: req.ip,
            honeypotFilled: bot.honeypotFilled,
            elapsedMs: bot.elapsedMs,
          },
          "lead.bot_blocked",
        );
        recordBlockEvent("honeypot", "repair-intake", req.log);
        res.status(201).json({ ok: true, id: fakeLeadId() });
        return;
      }

      const body = RepairIntakeBody.parse(req.body);

      if (body.source === "mail-in" && !body.returnAddress?.trim()) {
        res.status(400).json({
          error: "Validation failed",
          details: {
            issues: [
              {
                code: "custom",
                path: ["returnAddress"],
                message: "Return shipping address is required for mail-in repairs.",
              },
            ],
          },
        });
        return;
      }

      // Verify Stripe deposit if provided
      let depositPaid = false;
      let depositAmountCents: number | null = null;
      if (body.stripePaymentIntentId) {
        try {
          const stripe = await getStripeClient();
          const intent = await stripe.paymentIntents.retrieve(body.stripePaymentIntentId);
          if (intent.status === "succeeded") {
            depositPaid = true;
            depositAmountCents = intent.amount;
          } else {
            req.log.warn(
              { intentId: body.stripePaymentIntentId, status: intent.status },
              "lead.deposit_not_succeeded",
            );
          }
        } catch (err) {
          req.log.warn({ err }, "lead.deposit_verify_failed");
        }
      }

      const [row] = await db
        .insert(repairQuotesTable)
        .values({
          name: body.name,
          phone: body.phone,
          email: body.email ?? null,
          deviceType: body.deviceType,
          brand: body.brand,
          model: body.model,
          problem: body.problem,
          preferredContact: body.preferredContact ?? "call",
          urgency: body.urgency ?? "flexible",
          notes: body.notes ?? null,
          photoUrl: body.photoUrl ?? null,
          source: body.source ?? "in-store",
          returnAddress: body.returnAddress ?? null,
          preferredDatetime: body.preferredDatetime ?? null,
          depositPaid,
          depositAmountCents,
          stripePaymentIntentId: body.stripePaymentIntentId ?? null,
        })
        .returning({ id: repairQuotesTable.id });

      req.log.info({ leadType: "repair-intake", id: row.id, depositPaid }, "lead.created");

      // Send confirmation messages — non-blocking, best-effort.
      const depositNote = depositPaid ? " Your $10 deposit has been received." : "";
      if (messagingConfig.smsEnabled) {
        sendSms({
          to: body.phone,
          body: `Hi ${body.name}, we received your repair request for your ${body.brand} ${body.model}.${depositNote} We'll be in touch shortly. — OK Cellular (281) 446-2166`,
        }).catch((err) => {
          req.log.warn({ err, id: row.id }, "lead.confirmation_sms_failed");
        });
      }
      if (messagingConfig.emailEnabled && body.email) {
        const depositLine = depositPaid
          ? `<p><strong>Deposit:</strong> $10 received — your appointment slot is held.</p>`
          : "";
        sendEmail({
          to: body.email,
          subject: `Repair request received — ${body.brand} ${body.model}`,
          html: `
            <h2>We got your repair request!</h2>
            <p><strong>Device:</strong> ${body.brand} ${body.model} (${body.deviceType})</p>
            <p><strong>Issue:</strong> ${body.problem}</p>
            ${body.preferredDatetime ? `<p><strong>Preferred time:</strong> ${body.preferredDatetime}</p>` : ""}
            <p><strong>Service method:</strong> ${body.source === "mail-in" ? "Mail-in" : "Drop off at our shop"}</p>
            ${depositLine}
            <p>We'll call or text you back to confirm. For fastest response call <a href="tel:+12814462166">(281) 446-2166</a>.</p>
            <p>— OK Cellular, 3201 FM 1960 E, Humble TX 77338</p>
          `,
          text: `Hi ${body.name}, we received your repair request for your ${body.brand} ${body.model}. Issue: ${body.problem}. We'll be in touch shortly. — OK Cellular (281) 446-2166`,
        }).catch((err) => {
          req.log.warn({ err, id: row.id }, "lead.confirmation_email_failed");
        });
      }

      res.status(201).json({ ok: true, id: row.id, depositPaid });
    } catch (err) {
      handleValidation(err, res, next);
    }
  },
);

export default router;
