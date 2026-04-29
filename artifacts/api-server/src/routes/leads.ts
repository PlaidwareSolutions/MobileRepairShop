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
import { ZodError } from "zod";
import { leadRateLimit } from "../middleware/leadRateLimit";
import { requireTurnstile } from "../middleware/turnstile";
import { turnstileEnabled, verifyTurnstileToken } from "../lib/turnstile";

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
        // Mirror the real success shape ({ ok, id }) so a bot can't
        // fingerprint blocked vs accepted by inspecting the response.
        res.status(201).json({ ok: true, id: fakeLeadId() });
        return;
      }

      const body = SubmitRepairQuoteBody.parse(req.body);
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
          res.status(400).json({
            error:
              "We couldn't verify that submission. Please refresh the page and try again, or call us directly at (346) 623-6898.",
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

export default router;
