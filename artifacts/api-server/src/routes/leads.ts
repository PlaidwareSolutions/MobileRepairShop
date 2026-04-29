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

const router: IRouter = Router();

// Minimum time, in milliseconds, between when the contact form mounts in the
// browser and when it's submitted. Real users take several seconds to read the
// fields and type a message; scripted bots POST in well under a second.
const MIN_CONTACT_FILL_MS = 2000;

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

router.post(
  "/repair-quote",
  leadRateLimit("repair-quote"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
      // Anti-bot fields are intentionally NOT part of the OpenAPI/zod schema
      // so they don't show up in the public API contract. We pull them off
      // req.body directly before the strict parse strips them.
      const raw = (req.body ?? {}) as { website?: unknown; renderedAt?: unknown };
      const honeypot =
        typeof raw.website === "string" ? raw.website.trim() : "";
      const renderedAt =
        typeof raw.renderedAt === "number" && Number.isFinite(raw.renderedAt)
          ? raw.renderedAt
          : null;
      const elapsedMs = renderedAt !== null ? Date.now() - renderedAt : null;
      const isBot =
        honeypot.length > 0 ||
        (elapsedMs !== null && elapsedMs >= 0 && elapsedMs < MIN_CONTACT_FILL_MS);

      if (isBot) {
        req.log.warn(
          {
            leadType: "contact",
            ip: req.ip,
            honeypotFilled: honeypot.length > 0,
            elapsedMs,
          },
          "lead.bot_blocked",
        );
        // Mimic the success shape so the bot can't tell it was filtered and
        // doesn't learn to bypass the trap. id is optional in the response
        // schema, so we omit it rather than fabricate one.
        res.status(201).json({ ok: true });
        return;
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
      res.status(201).json({ ok: true, id: row.id });
    } catch (err) {
      handleValidation(err, res, next);
    }
  },
);

router.post(
  "/reservation",
  leadRateLimit("reservation"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
