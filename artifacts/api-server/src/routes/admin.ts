import {
  Router,
  type IRouter,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { and, asc, desc, eq, gte, isNull, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@workspace/db";
import {
  repairQuotesTable,
  sellPhoneSubmissionsTable,
  appointmentsTable,
  contactMessagesTable,
  itemReservationsTable,
  inventoryItemsTable,
  AVAILABILITY_VALUES,
  leadCommunicationsTable,
  leadReplyTemplatesTable,
  leadBlockEventsTable,
  promotionsTable,
  PROMOTION_RECURRENCE_VALUES,
  PROMOTION_ACCENT_VALUES,
} from "@workspace/db";
import { ObjectStorageService } from "../lib/objectStorage";
import { serializeAdminInventoryItem } from "../lib/inventoryMapper";
import { serializeAdminPromotion } from "../lib/promotionsMapper";
import { sendEmail, sendSms, messagingConfig } from "../lib/messaging";
import { checkRateLimit } from "../lib/rate-limit";

const ADMIN_PASSWORD_ENV = "GX_ADMIN_PASSWORD";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const expected = process.env[ADMIN_PASSWORD_ENV];
  if (!expected) {
    res.status(500).json({ error: "Admin password not configured" });
    return;
  }
  const provided = req.header("x-admin-password");
  if (provided !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

function noStore(_req: Request, res: Response, next: NextFunction) {
  res.set("Cache-Control", "no-store");
  next();
}

const tableMap = {
  "repair-quote": repairQuotesTable,
  "sell-phone": sellPhoneSubmissionsTable,
  appointment: appointmentsTable,
  contact: contactMessagesTable,
  reservation: itemReservationsTable,
} as const;

type LeadType = keyof typeof tableMap;

const STATUSES = ["new", "in_progress", "done", "archived"] as const;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

router.use(requireAdmin);
router.use(noStore);

router.get(
  "/leads",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        repairQuotes,
        sellPhone,
        appointments,
        contact,
        reservations,
        unreadRows,
      ] = await Promise.all([
        db
          .select()
          .from(repairQuotesTable)
          .orderBy(desc(repairQuotesTable.createdAt)),
        db
          .select()
          .from(sellPhoneSubmissionsTable)
          .orderBy(desc(sellPhoneSubmissionsTable.createdAt)),
        db
          .select()
          .from(appointmentsTable)
          .orderBy(desc(appointmentsTable.createdAt)),
        db
          .select()
          .from(contactMessagesTable)
          .orderBy(desc(contactMessagesTable.createdAt)),
        db
          .select()
          .from(itemReservationsTable)
          .orderBy(desc(itemReservationsTable.createdAt)),
        db
          .select({
            leadType: leadCommunicationsTable.leadType,
            leadId: leadCommunicationsTable.leadId,
            count: sql<number>`count(*)::int`,
          })
          .from(leadCommunicationsTable)
          .where(
            and(
              eq(leadCommunicationsTable.direction, "inbound"),
              isNull(leadCommunicationsTable.readAt),
            ),
          )
          .groupBy(
            leadCommunicationsTable.leadType,
            leadCommunicationsTable.leadId,
          ),
      ]);
      const unreadInboundCounts: Record<string, Record<string, number>> = {};
      for (const row of unreadRows) {
        if (!unreadInboundCounts[row.leadType]) {
          unreadInboundCounts[row.leadType] = {};
        }
        unreadInboundCounts[row.leadType][row.leadId] = Number(row.count);
      }
      res.json({
        repairQuotes: repairQuotes.map(serializeDates),
        sellPhoneSubmissions: sellPhone.map(serializeDates),
        appointments: appointments.map(serializeDates),
        contactMessages: contact.map(serializeDates),
        itemReservations: reservations.map(serializeDates),
        unreadInboundCounts,
      });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.get(
  "/anti-spam/stats",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      // Each window we report. Keeping it to two avoids overloading the
      // tile and matches the task spec ("last 7d / 30d").
      const WINDOWS = [
        { key: "7d", days: 7 },
        { key: "30d", days: 30 },
      ] as const;

      const now = Date.now();

      const windowResults = await Promise.all(
        WINDOWS.map(async ({ key, days }) => {
          const since = new Date(now - days * 24 * 60 * 60 * 1000);

          // Block events: count per event_type in one round-trip so
          // missing types still report as 0 in the response below.
          const blockRows = await db
            .select({
              eventType: leadBlockEventsTable.eventType,
              count: sql<number>`count(*)::int`,
            })
            .from(leadBlockEventsTable)
            .where(gte(leadBlockEventsTable.createdAt, since))
            .groupBy(leadBlockEventsTable.eventType);

          const blocks: Record<string, number> = {};
          for (const row of blockRows) {
            blocks[row.eventType] = Number(row.count);
          }

          // Accepted leads: anything that actually landed in one of the
          // five lead tables in the window. We deliberately query the
          // source tables (not a derived "accepted" event) so the count
          // can't drift from reality if an event insert ever fails.
          const acceptedTables = [
            repairQuotesTable,
            sellPhoneSubmissionsTable,
            appointmentsTable,
            contactMessagesTable,
            itemReservationsTable,
          ] as const;
          const acceptedCounts = await Promise.all(
            acceptedTables.map(async (table) => {
              const [row] = await db
                .select({ count: sql<number>`count(*)::int` })
                .from(table)
                .where(gte(table.createdAt, since));
              return Number(row?.count ?? 0);
            }),
          );
          const acceptedLeads = acceptedCounts.reduce((a, b) => a + b, 0);

          return {
            key,
            days,
            acceptedLeads,
            turnstileFailures: blocks["turnstile_failed"] ?? 0,
            honeypotTrips: blocks["honeypot"] ?? 0,
            rateLimitBlocks: blocks["rate_limited"] ?? 0,
          };
        }),
      );

      res.json({ windows: windowResults });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.get(
  "/messaging/config",
  (_req: Request, res: Response) => {
    res.json({
      emailEnabled: messagingConfig.emailEnabled,
      smsEnabled: messagingConfig.smsEnabled,
      mailFrom: messagingConfig.mailFrom,
      smsFrom: messagingConfig.smsFrom,
    });
  },
);

router.patch(
  "/leads/:leadType/:id/status",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leadType, id } = req.params;
      const numericId = Number(id);
      const status = (req.body as { status?: string }).status;
      if (
        !Number.isFinite(numericId) ||
        !status ||
        !STATUSES.includes(status as (typeof STATUSES)[number])
      ) {
        res.status(400).json({ error: "Invalid id or status" });
        return;
      }
      const table = tableMap[leadType as LeadType];
      if (!table) {
        res.status(400).json({ error: "Unknown leadType" });
        return;
      }
      const [row] = await db
        .update(table)
        .set({ status, updatedAt: new Date() })
        .where(eq(table.id, numericId))
        .returning({ id: table.id });
      if (!row) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }
      res.json({ ok: true, id: row.id });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.get(
  "/leads/:leadType/:id/activity",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leadType, id } = req.params;
      if (!isLeadType(leadType)) {
        res.status(400).json({ error: "Unknown leadType" });
        return;
      }
      const rows = await db
        .select()
        .from(leadCommunicationsTable)
        .where(eq(leadCommunicationsTable.leadType, leadType))
        .orderBy(desc(leadCommunicationsTable.createdAt));
      const filtered = rows
        .filter((r) => r.leadId === String(id))
        .map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
          readAt: r.readAt ? r.readAt.toISOString() : null,
        }));
      res.json({ items: filtered });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.post(
  "/leads/:leadType/:id/activity/read",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leadType, id } = req.params;
      if (!isLeadType(leadType)) {
        res.status(400).json({ error: "Unknown leadType" });
        return;
      }
      const result = await db
        .update(leadCommunicationsTable)
        .set({ readAt: new Date(), updatedAt: new Date() })
        .where(
          and(
            eq(leadCommunicationsTable.leadType, leadType),
            eq(leadCommunicationsTable.leadId, String(id)),
            eq(leadCommunicationsTable.direction, "inbound"),
            isNull(leadCommunicationsTable.readAt),
          ),
        )
        .returning({ id: leadCommunicationsTable.id });
      res.json({ ok: true, marked: result.length });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.post(
  "/leads/:leadType/:id/email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leadType, id } = req.params;
      const body = req.body as {
        to?: string;
        subject?: string;
        html?: string;
        text?: string;
      };
      if (!isLeadType(leadType)) {
        res.status(400).json({ error: "Unknown leadType" });
        return;
      }
      const numericId = Number(id);
      if (!Number.isFinite(numericId)) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }
      if (
        !body.to ||
        !body.subject ||
        (!body.html && !body.text) ||
        !isValidEmail(body.to)
      ) {
        res
          .status(400)
          .json({ error: "to (email), subject, and html or text are required" });
        return;
      }
      const rateKey = `email:${leadType}:${id}`;
      const limit = await checkRateLimit(
        rateKey,
        RATE_LIMIT_MAX,
        RATE_LIMIT_WINDOW_MS,
      );
      if (!limit.allowed) {
        res.set("Retry-After", String(limit.retryAfterSeconds));
        res
          .status(429)
          .json({ error: "Email rate limit reached for this lead" });
        return;
      }
      const sendResult = await sendEmail({
        to: body.to,
        subject: body.subject,
        html: body.html,
        text: body.text,
      });
      const [row] = await db
        .insert(leadCommunicationsTable)
        .values({
          leadType,
          leadId: String(numericId),
          channel: "email",
          direction: "outbound",
          subject: body.subject,
          body: body.html ?? body.text ?? "",
          recipient: body.to,
          providerMessageId: sendResult.providerMessageId,
          status: sendResult.status,
          error: sendResult.error ?? null,
        })
        .returning();

      if (sendResult.status !== "failed") {
        await maybeAutoAdvance(leadType, numericId);
      }

      const status = sendResult.status === "failed" ? 502 : 200;
      res.status(status).json({
        ok: sendResult.status !== "failed",
        id: row.id,
        providerMessageId: sendResult.providerMessageId,
        status: sendResult.status,
        error: sendResult.error ?? null,
      });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.post(
  "/leads/:leadType/:id/sms",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leadType, id } = req.params;
      const body = req.body as { to?: string; body?: string };
      if (!isLeadType(leadType)) {
        res.status(400).json({ error: "Unknown leadType" });
        return;
      }
      const numericId = Number(id);
      if (!Number.isFinite(numericId)) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }
      if (!body.to || !body.body) {
        res.status(400).json({ error: "to (phone) and body are required" });
        return;
      }
      const normalized = normalizeUsPhone(body.to);
      if (!normalized) {
        res
          .status(400)
          .json({ error: "Phone number must be a valid US (+1) number" });
        return;
      }
      const rateKey = `sms:${leadType}:${id}`;
      const limit = await checkRateLimit(
        rateKey,
        RATE_LIMIT_MAX,
        RATE_LIMIT_WINDOW_MS,
      );
      if (!limit.allowed) {
        res.set("Retry-After", String(limit.retryAfterSeconds));
        res.status(429).json({ error: "SMS rate limit reached for this lead" });
        return;
      }
      const sendResult = await sendSms({ to: normalized, body: body.body });
      const [row] = await db
        .insert(leadCommunicationsTable)
        .values({
          leadType,
          leadId: String(numericId),
          channel: "sms",
          direction: "outbound",
          subject: null,
          body: body.body,
          recipient: normalized,
          providerMessageId: sendResult.providerMessageId,
          status: sendResult.status,
          error: sendResult.error ?? null,
        })
        .returning();

      if (sendResult.status !== "failed") {
        await maybeAutoAdvance(leadType, numericId);
      }

      const status = sendResult.status === "failed" ? 502 : 200;
      res.status(status).json({
        ok: sendResult.status !== "failed",
        id: row.id,
        providerMessageId: sendResult.providerMessageId,
        status: sendResult.status,
        error: sendResult.error ?? null,
      });
    } catch (err) {
      next(err as Error);
    }
  },
);

async function maybeAutoAdvance(leadType: LeadType, id: number): Promise<void> {
  const table = tableMap[leadType];
  const [existing] = await db
    .select({ status: table.status })
    .from(table)
    .where(eq(table.id, id));
  if (existing && existing.status === "new") {
    await db
      .update(table)
      .set({ status: "in_progress", updatedAt: new Date() })
      .where(eq(table.id, id));
  }
}

function isLeadType(value: string | string[] | undefined): value is LeadType {
  return typeof value === "string" && value in tableMap;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeUsPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return null;
}

// ---------------- Inventory CRUD ----------------

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

const InventoryCreateSchema = z.object({
  id: z.string().min(1).max(120).regex(SLUG_RE).optional(),
  category: z.string().min(1).max(120),
  brand: z.string().min(1).max(80),
  model: z.string().min(1).max(160),
  storage: z.string().max(120).optional().nullable(),
  color: z.string().max(80).optional().nullable(),
  condition: z.string().max(80).optional().nullable(),
  carrier: z.string().max(80).optional().nullable(),
  warranty: z.string().max(80).optional().nullable(),
  priceCents: z.number().int().min(0).max(100_000_00),
  priceDisplay: z.string().min(1).max(40),
  availability: z.enum(AVAILABILITY_VALUES).default("in_stock"),
  imageUrl: z.string().max(500).optional().nullable(),
  description: z.string().max(4000).optional().nullable(),
  sortOrder: z.number().finite().optional(),
});

const InventoryUpdateSchema = InventoryCreateSchema.partial();

const ReorderSchema = z
  .object({
    ids: z.array(z.string().min(1).max(120)).min(1).max(1000),
  })
  .refine((v) => new Set(v.ids).size === v.ids.length, {
    message: "ids must be unique",
    path: ["ids"],
  });

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

const UploadUrlSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.number().int().min(1).max(20 * 1024 * 1024),
  contentType: z.enum(ALLOWED_IMAGE_TYPES),
});

function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
  return base || "item";
}

function isUniqueViolation(err: unknown): boolean {
  return !!err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "23505";
}

function handleZod(err: unknown, res: Response): boolean {
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: "Validation failed", details: { issues: err.issues } });
    return true;
  }
  return false;
}

router.get("/inventory", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await db
      .select()
      .from(inventoryItemsTable)
      .orderBy(asc(inventoryItemsTable.sortOrder), asc(inventoryItemsTable.createdAt));
    res.json({ items: rows.map(serializeAdminInventoryItem) });
  } catch (err) {
    next(err as Error);
  }
});

router.post("/inventory", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = InventoryCreateSchema.parse(req.body);

    let id = body.id?.trim();
    if (!id) {
      const base = slugify(`${body.brand}-${body.model}`);
      id = base;
      let n = 1;
      while (true) {
        const [exists] = await db
          .select({ id: inventoryItemsTable.id })
          .from(inventoryItemsTable)
          .where(eq(inventoryItemsTable.id, id))
          .limit(1);
        if (!exists) break;
        n += 1;
        id = `${base}-${n}`;
        if (n > 50) {
          res.status(500).json({ error: "Could not generate unique id" });
          return;
        }
      }
    }

    let sortOrder = body.sortOrder;
    if (sortOrder == null) {
      const all = await db
        .select({ s: inventoryItemsTable.sortOrder })
        .from(inventoryItemsTable);
      const max = all.reduce((m, r) => Math.max(m, Number(r.s)), 0);
      sortOrder = max + 10;
    }

    try {
      const [created] = await db
        .insert(inventoryItemsTable)
        .values({
          id,
          category: body.category,
          brand: body.brand,
          model: body.model,
          storage: body.storage ?? null,
          color: body.color ?? null,
          condition: body.condition ?? null,
          carrier: body.carrier ?? null,
          warranty: body.warranty ?? null,
          priceCents: body.priceCents,
          priceDisplay: body.priceDisplay,
          availability: body.availability,
          imageUrl: body.imageUrl ?? null,
          description: body.description ?? null,
          sortOrder: String(sortOrder),
        })
        .returning();
      res.status(201).json({ ok: true, item: serializeAdminInventoryItem(created) });
    } catch (err) {
      if (isUniqueViolation(err)) {
        res.status(409).json({ error: "An item with that id already exists" });
        return;
      }
      throw err;
    }
  } catch (err) {
    if (handleZod(err, res)) return;
    next(err as Error);
  }
});

router.patch("/inventory/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const body = InventoryUpdateSchema.parse(req.body);
    if (Object.keys(body).length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }
    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (body.category !== undefined) updates.category = body.category;
    if (body.brand !== undefined) updates.brand = body.brand;
    if (body.model !== undefined) updates.model = body.model;
    if (body.storage !== undefined) updates.storage = body.storage ?? null;
    if (body.color !== undefined) updates.color = body.color ?? null;
    if (body.condition !== undefined) updates.condition = body.condition ?? null;
    if (body.carrier !== undefined) updates.carrier = body.carrier ?? null;
    if (body.warranty !== undefined) updates.warranty = body.warranty ?? null;
    if (body.priceCents !== undefined) updates.priceCents = body.priceCents;
    if (body.priceDisplay !== undefined) updates.priceDisplay = body.priceDisplay;
    if (body.availability !== undefined) updates.availability = body.availability;
    if (body.imageUrl !== undefined) updates.imageUrl = body.imageUrl ?? null;
    if (body.description !== undefined) updates.description = body.description ?? null;
    if (body.sortOrder !== undefined) updates.sortOrder = String(body.sortOrder);

    const [updated] = await db
      .update(inventoryItemsTable)
      .set(updates)
      .where(eq(inventoryItemsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.json({ ok: true, item: serializeAdminInventoryItem(updated) });
  } catch (err) {
    if (handleZod(err, res)) return;
    next(err as Error);
  }
});

router.delete("/inventory/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const [deleted] = await db
      .delete(inventoryItemsTable)
      .where(eq(inventoryItemsTable.id, id))
      .returning({ id: inventoryItemsTable.id });
    if (!deleted) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.json({ ok: true, id: deleted.id });
  } catch (err) {
    next(err as Error);
  }
});

router.post("/inventory/reorder", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = ReorderSchema.parse(req.body);

    // Verify every supplied id maps to a real row before touching anything,
    // so a typo on the client doesn't silently no-op part of the reorder.
    const existing = await db
      .select({ id: inventoryItemsTable.id })
      .from(inventoryItemsTable);
    const existingIds = new Set(existing.map((r) => r.id));
    const missing = body.ids.filter((id) => !existingIds.has(id));
    if (missing.length > 0) {
      res.status(400).json({ error: "Unknown inventory ids", details: { missing } });
      return;
    }

    // Reassign sortOrder for the submitted ids first, then push every other
    // row to the end with strictly larger values. This keeps sort orders
    // globally unique even if the client sent only a partial set.
    const submitted = new Set(body.ids);
    const others = existing.map((r) => r.id).filter((id) => !submitted.has(id));
    const now = new Date();
    await db.transaction(async (tx) => {
      for (let i = 0; i < body.ids.length; i++) {
        await tx
          .update(inventoryItemsTable)
          .set({ sortOrder: String((i + 1) * 10), updatedAt: now })
          .where(eq(inventoryItemsTable.id, body.ids[i]));
      }
      const offset = body.ids.length;
      for (let j = 0; j < others.length; j++) {
        await tx
          .update(inventoryItemsTable)
          .set({ sortOrder: String((offset + j + 1) * 10) })
          .where(eq(inventoryItemsTable.id, others[j]));
      }
    });
    res.json({ ok: true, count: body.ids.length });
  } catch (err) {
    if (handleZod(err, res)) return;
    next(err as Error);
  }
});

router.post("/inventory/upload-url", async (req: Request, res: Response, next: NextFunction) => {
  try {
    UploadUrlSchema.parse(req.body ?? {});
    const { uploadURL, servingUrl } = await objectStorageService.getPublicObjectUploadURL({
      subdir: "inventory",
    });
    res.json({ uploadURL, servingUrl });
  } catch (err) {
    if (handleZod(err, res)) return;
    next(err as Error);
  }
});

function serializeDates<T extends { createdAt: Date; updatedAt: Date }>(row: T) {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

// ---------------- Promotions CRUD ----------------

const TIME_HHMM_RE = /^([01]?\d|2[0-3]):[0-5]\d$/;

function timeStringToMinutes(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
}

const TimeOfDay = z.union([
  z.string().regex(TIME_HHMM_RE).transform(timeStringToMinutes),
  z.number().int().min(0).max(1439),
]);

const DaysOfWeek = z
  .array(z.number().int().min(0).max(6))
  .max(7)
  .transform((arr) => Array.from(new Set(arr)).sort((a, b) => a - b));

const IsoDate = z
  .string()
  .min(1)
  .transform((s, ctx) => {
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) {
      ctx.addIssue({ code: "custom", message: "Invalid date" });
      return z.NEVER;
    }
    return d;
  });

// Defense in depth: even though only authenticated owners can create
// promotions, refuse to accept CTA URLs that aren't site-relative ("/foo"),
// http(s), tel:, or mailto:. This blocks accidental "javascript:" pastes that
// would render as anchor hrefs on the homepage.
const CtaHref = z
  .string()
  .max(500)
  .refine(
    (v) =>
      v.startsWith("/") ||
      /^https?:\/\//i.test(v) ||
      /^tel:/i.test(v) ||
      /^mailto:/i.test(v),
    { message: "CTA URL must be site-relative (/path), https://, http://, tel:, or mailto:" },
  );

const PromotionCreateSchema = z
  .object({
    headline: z.string().min(1).max(160),
    supportingLine: z.string().max(280).optional().nullable(),
    badge: z.string().max(40).optional().nullable(),
    ctaLabel: z.string().max(40).optional().nullable(),
    ctaHref: CtaHref.optional().nullable(),
    accent: z.enum(PROMOTION_ACCENT_VALUES).default("amber"),
    active: z.boolean().default(true),
    startsAt: IsoDate.optional().nullable(),
    endsAt: IsoDate.optional().nullable(),
    recurrence: z.enum(PROMOTION_RECURRENCE_VALUES).default("always"),
    daysOfWeek: DaysOfWeek.optional(),
    dailyStartMinutes: TimeOfDay.optional().nullable(),
    dailyEndMinutes: TimeOfDay.optional().nullable(),
    sortOrder: z.number().finite().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.recurrence === "weekly" && (!v.daysOfWeek || v.daysOfWeek.length === 0)) {
      ctx.addIssue({
        code: "custom",
        message: "Weekly recurrence requires at least one day",
        path: ["daysOfWeek"],
      });
    }
    if (
      v.startsAt instanceof Date &&
      v.endsAt instanceof Date &&
      v.startsAt.getTime() > v.endsAt.getTime()
    ) {
      ctx.addIssue({
        code: "custom",
        message: "startsAt must be before endsAt",
        path: ["endsAt"],
      });
    }
  });

const PromotionUpdateSchema = z
  .object({
    headline: z.string().min(1).max(160).optional(),
    supportingLine: z.string().max(280).optional().nullable(),
    badge: z.string().max(40).optional().nullable(),
    ctaLabel: z.string().max(40).optional().nullable(),
    ctaHref: CtaHref.optional().nullable(),
    accent: z.enum(PROMOTION_ACCENT_VALUES).optional(),
    active: z.boolean().optional(),
    startsAt: IsoDate.optional().nullable(),
    endsAt: IsoDate.optional().nullable(),
    recurrence: z.enum(PROMOTION_RECURRENCE_VALUES).optional(),
    daysOfWeek: DaysOfWeek.optional(),
    dailyStartMinutes: TimeOfDay.optional().nullable(),
    dailyEndMinutes: TimeOfDay.optional().nullable(),
    sortOrder: z.number().finite().optional(),
  })
  .superRefine((v, ctx) => {
    if (
      v.startsAt instanceof Date &&
      v.endsAt instanceof Date &&
      v.startsAt.getTime() > v.endsAt.getTime()
    ) {
      ctx.addIssue({
        code: "custom",
        message: "startsAt must be before endsAt",
        path: ["endsAt"],
      });
    }
  });

const PromotionReorderSchema = z
  .object({
    ids: z.array(z.number().int().positive()).min(1).max(1000),
  })
  .refine((v) => new Set(v.ids).size === v.ids.length, {
    message: "ids must be unique",
    path: ["ids"],
  });

router.get("/promotions", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await db
      .select()
      .from(promotionsTable)
      .orderBy(asc(promotionsTable.sortOrder), asc(promotionsTable.id));
    res.json({ items: rows.map(serializeAdminPromotion) });
  } catch (err) {
    next(err as Error);
  }
});

router.post("/promotions", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = PromotionCreateSchema.parse(req.body);

    let sortOrder = body.sortOrder;
    if (sortOrder == null) {
      const all = await db.select({ s: promotionsTable.sortOrder }).from(promotionsTable);
      const max = all.reduce((m, r) => Math.max(m, Number(r.s)), 0);
      sortOrder = max + 10;
    }

    const [created] = await db
      .insert(promotionsTable)
      .values({
        headline: body.headline,
        supportingLine: body.supportingLine ?? null,
        badge: body.badge ?? null,
        ctaLabel: body.ctaLabel ?? null,
        ctaHref: body.ctaHref ?? null,
        accent: body.accent,
        active: body.active,
        startsAt: body.startsAt ?? null,
        endsAt: body.endsAt ?? null,
        recurrence: body.recurrence,
        daysOfWeek: (body.daysOfWeek ?? []).join(","),
        dailyStartMinutes: body.dailyStartMinutes ?? null,
        dailyEndMinutes: body.dailyEndMinutes ?? null,
        sortOrder: String(sortOrder),
      })
      .returning();
    res.status(201).json({ ok: true, item: serializeAdminPromotion(created) });
  } catch (err) {
    if (handleZod(err, res)) return;
    next(err as Error);
  }
});

router.patch("/promotions/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const body = PromotionUpdateSchema.parse(req.body);
    if (Object.keys(body).length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    // Final-state validation: if recurrence ends up "weekly", ensure
    // daysOfWeek is non-empty by reading current row when not supplied.
    if (body.recurrence === "weekly" && (!body.daysOfWeek || body.daysOfWeek.length === 0)) {
      const [existing] = await db
        .select({ days: promotionsTable.daysOfWeek })
        .from(promotionsTable)
        .where(eq(promotionsTable.id, id))
        .limit(1);
      const currentDays = (existing?.days ?? "")
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => Number.isInteger(n));
      if (currentDays.length === 0) {
        res
          .status(400)
          .json({ error: "Weekly recurrence requires at least one day" });
        return;
      }
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (body.headline !== undefined) updates.headline = body.headline;
    if (body.supportingLine !== undefined) updates.supportingLine = body.supportingLine ?? null;
    if (body.badge !== undefined) updates.badge = body.badge ?? null;
    if (body.ctaLabel !== undefined) updates.ctaLabel = body.ctaLabel ?? null;
    if (body.ctaHref !== undefined) updates.ctaHref = body.ctaHref ?? null;
    if (body.accent !== undefined) updates.accent = body.accent;
    if (body.active !== undefined) updates.active = body.active;
    if (body.startsAt !== undefined) updates.startsAt = body.startsAt ?? null;
    if (body.endsAt !== undefined) updates.endsAt = body.endsAt ?? null;
    if (body.recurrence !== undefined) updates.recurrence = body.recurrence;
    if (body.daysOfWeek !== undefined) updates.daysOfWeek = body.daysOfWeek.join(",");
    if (body.dailyStartMinutes !== undefined)
      updates.dailyStartMinutes = body.dailyStartMinutes ?? null;
    if (body.dailyEndMinutes !== undefined)
      updates.dailyEndMinutes = body.dailyEndMinutes ?? null;
    if (body.sortOrder !== undefined) updates.sortOrder = String(body.sortOrder);

    const [updated] = await db
      .update(promotionsTable)
      .set(updates)
      .where(eq(promotionsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Promotion not found" });
      return;
    }
    res.json({ ok: true, item: serializeAdminPromotion(updated) });
  } catch (err) {
    if (handleZod(err, res)) return;
    next(err as Error);
  }
});

router.delete("/promotions/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const [deleted] = await db
      .delete(promotionsTable)
      .where(eq(promotionsTable.id, id))
      .returning({ id: promotionsTable.id });
    if (!deleted) {
      res.status(404).json({ error: "Promotion not found" });
      return;
    }
    res.json({ ok: true, id: deleted.id });
  } catch (err) {
    next(err as Error);
  }
});

router.post(
  "/promotions/:id/duplicate",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }
      const [src] = await db
        .select()
        .from(promotionsTable)
        .where(eq(promotionsTable.id, id))
        .limit(1);
      if (!src) {
        res.status(404).json({ error: "Promotion not found" });
        return;
      }
      // Compute next sort order so the duplicate appears at the end of the
      // list (where the owner expects "newly created" items to land).
      const all = await db.select({ s: promotionsTable.sortOrder }).from(promotionsTable);
      const maxSort = all.reduce((acc, r) => Math.max(acc, Number(r.s)), 0);
      const nextSort = String(maxSort + 10);

      // Duplicate copies all fields but flips active=false and tags the
      // headline with " (copy)" so the owner can immediately tell which row
      // is the source and which is the new one. Owner re-activates after
      // editing whatever needs changing.
      const [created] = await db
        .insert(promotionsTable)
        .values({
          headline: `${src.headline} (copy)`,
          supportingLine: src.supportingLine,
          badge: src.badge,
          ctaLabel: src.ctaLabel,
          ctaHref: src.ctaHref,
          accent: src.accent,
          active: false,
          startsAt: src.startsAt,
          endsAt: src.endsAt,
          recurrence: src.recurrence,
          daysOfWeek: src.daysOfWeek,
          dailyStartMinutes: src.dailyStartMinutes,
          dailyEndMinutes: src.dailyEndMinutes,
          sortOrder: nextSort,
        })
        .returning();
      res.status(201).json({ ok: true, item: serializeAdminPromotion(created) });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.post(
  "/promotions/reorder",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = PromotionReorderSchema.parse(req.body);
      const existing = await db.select({ id: promotionsTable.id }).from(promotionsTable);
      const existingIds = new Set(existing.map((r) => r.id));
      const missing = body.ids.filter((id) => !existingIds.has(id));
      if (missing.length > 0) {
        res
          .status(400)
          .json({ error: "Unknown promotion ids", details: { missing } });
        return;
      }
      const submitted = new Set(body.ids);
      const others = existing.map((r) => r.id).filter((id) => !submitted.has(id));
      const now = new Date();
      await db.transaction(async (tx) => {
        for (let i = 0; i < body.ids.length; i++) {
          await tx
            .update(promotionsTable)
            .set({ sortOrder: String((i + 1) * 10), updatedAt: now })
            .where(eq(promotionsTable.id, body.ids[i]));
        }
        const offset = body.ids.length;
        for (let j = 0; j < others.length; j++) {
          await tx
            .update(promotionsTable)
            .set({ sortOrder: String((offset + j + 1) * 10) })
            .where(eq(promotionsTable.id, others[j]));
        }
      });
      res.json({ ok: true, count: body.ids.length });
    } catch (err) {
      if (handleZod(err, res)) return;
      next(err as Error);
    }
  },
);

// ---------------- Reply Templates (saved replies) ----------------

const REPLY_CHANNELS = ["email", "sms"] as const;
const REPLY_LEAD_TYPES = [
  "repair-quote",
  "sell-phone",
  "appointment",
  "contact",
  "reservation",
] as const;

const ReplyTemplateCreateSchema = z
  .object({
    name: z.string().min(1).max(120),
    channel: z.enum(REPLY_CHANNELS),
    leadType: z.enum(REPLY_LEAD_TYPES).nullable().optional(),
    subject: z.string().max(300).nullable().optional(),
    body: z.string().min(1).max(20000),
    sortOrder: z.number().int().optional(),
  })
  .refine(
    (v) => v.channel === "email" || !v.subject,
    { message: "subject is only allowed for email templates", path: ["subject"] },
  );

const ReplyTemplateUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  channel: z.enum(REPLY_CHANNELS).optional(),
  leadType: z.enum(REPLY_LEAD_TYPES).nullable().optional(),
  subject: z.string().max(300).nullable().optional(),
  body: z.string().min(1).max(20000).optional(),
  sortOrder: z.number().int().optional(),
});

router.get(
  "/reply-templates",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const rows = await db
        .select()
        .from(leadReplyTemplatesTable)
        .orderBy(
          asc(leadReplyTemplatesTable.sortOrder),
          asc(leadReplyTemplatesTable.id),
        );
      res.json({ items: rows.map(serializeDates) });
    } catch (err) {
      next(err as Error);
    }
  },
);

router.post(
  "/reply-templates",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = ReplyTemplateCreateSchema.parse(req.body);
      const [row] = await db
        .insert(leadReplyTemplatesTable)
        .values({
          name: body.name,
          channel: body.channel,
          leadType: body.leadType ?? null,
          subject: body.channel === "email" ? body.subject ?? null : null,
          body: body.body,
          sortOrder: body.sortOrder ?? 0,
        })
        .returning();
      res.status(201).json({ ok: true, item: serializeDates(row) });
    } catch (err) {
      if (handleZod(err, res)) return;
      next(err as Error);
    }
  },
);

router.patch(
  "/reply-templates/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const numericId = Number(req.params.id);
      if (!Number.isFinite(numericId)) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }
      const body = ReplyTemplateUpdateSchema.parse(req.body);
      if (Object.keys(body).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      const updates: Record<string, unknown> = { updatedAt: new Date() };
      if (body.name !== undefined) updates.name = body.name;
      if (body.channel !== undefined) updates.channel = body.channel;
      if (body.leadType !== undefined) updates.leadType = body.leadType ?? null;
      if (body.subject !== undefined) updates.subject = body.subject ?? null;
      if (body.body !== undefined) updates.body = body.body;
      if (body.sortOrder !== undefined) updates.sortOrder = body.sortOrder;

      // If switching to sms (either via this update or already sms), strip subject.
      const targetChannel =
        body.channel ??
        (
          await db
            .select({ channel: leadReplyTemplatesTable.channel })
            .from(leadReplyTemplatesTable)
            .where(eq(leadReplyTemplatesTable.id, numericId))
        )[0]?.channel;
      if (targetChannel === "sms") updates.subject = null;

      const [row] = await db
        .update(leadReplyTemplatesTable)
        .set(updates)
        .where(eq(leadReplyTemplatesTable.id, numericId))
        .returning();
      if (!row) {
        res.status(404).json({ error: "Template not found" });
        return;
      }
      res.json({ ok: true, item: serializeDates(row) });
    } catch (err) {
      if (handleZod(err, res)) return;
      next(err as Error);
    }
  },
);

router.delete(
  "/reply-templates/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const numericId = Number(req.params.id);
      if (!Number.isFinite(numericId)) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }
      const [deleted] = await db
        .delete(leadReplyTemplatesTable)
        .where(eq(leadReplyTemplatesTable.id, numericId))
        .returning({ id: leadReplyTemplatesTable.id });
      if (!deleted) {
        res.status(404).json({ error: "Template not found" });
        return;
      }
      res.json({ ok: true, id: deleted.id });
    } catch (err) {
      next(err as Error);
    }
  },
);

const ReplyTemplateReorderSchema = z
  .object({
    ids: z.array(z.number().int().positive()).min(1).max(1000),
  })
  .refine((v) => new Set(v.ids).size === v.ids.length, {
    message: "ids must be unique",
    path: ["ids"],
  });

router.post(
  "/reply-templates/reorder",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = ReplyTemplateReorderSchema.parse(req.body);

      // Verify every supplied id exists before touching anything so a typo
      // on the client doesn't silently no-op part of the reorder.
      const existing = await db
        .select({ id: leadReplyTemplatesTable.id })
        .from(leadReplyTemplatesTable);
      const existingIds = new Set(existing.map((r) => r.id));
      const missing = body.ids.filter((id) => !existingIds.has(id));
      if (missing.length > 0) {
        res
          .status(400)
          .json({ error: "Unknown template ids", details: { missing } });
        return;
      }

      // Reassign sortOrder for the submitted ids first, then push every other
      // row to the end with strictly larger values. This keeps sort orders
      // globally unique even when the client sends only a partial set
      // (e.g. one channel's worth of templates).
      const submitted = new Set(body.ids);
      const others = existing.map((r) => r.id).filter((id) => !submitted.has(id));
      const now = new Date();
      await db.transaction(async (tx) => {
        for (let i = 0; i < body.ids.length; i++) {
          await tx
            .update(leadReplyTemplatesTable)
            .set({ sortOrder: (i + 1) * 10, updatedAt: now })
            .where(eq(leadReplyTemplatesTable.id, body.ids[i]));
        }
        const offset = body.ids.length;
        for (let j = 0; j < others.length; j++) {
          await tx
            .update(leadReplyTemplatesTable)
            .set({ sortOrder: (offset + j + 1) * 10 })
            .where(eq(leadReplyTemplatesTable.id, others[j]));
        }
      });
      res.json({ ok: true, count: body.ids.length });
    } catch (err) {
      if (handleZod(err, res)) return;
      next(err as Error);
    }
  },
);

export default router;
