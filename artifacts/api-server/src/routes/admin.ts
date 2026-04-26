import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { asc, eq } from "drizzle-orm";
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
} from "@workspace/db";
import { ObjectStorageService } from "../lib/objectStorage";
import { serializeAdminInventoryItem } from "../lib/inventoryMapper";

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

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

router.use(requireAdmin);

router.get("/leads", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [repairQuotes, sellPhone, appointments, contact, reservations] = await Promise.all([
      db.select().from(repairQuotesTable).orderBy(repairQuotesTable.createdAt),
      db.select().from(sellPhoneSubmissionsTable).orderBy(sellPhoneSubmissionsTable.createdAt),
      db.select().from(appointmentsTable).orderBy(appointmentsTable.createdAt),
      db.select().from(contactMessagesTable).orderBy(contactMessagesTable.createdAt),
      db.select().from(itemReservationsTable).orderBy(itemReservationsTable.createdAt),
    ]);
    res.json({
      repairQuotes: repairQuotes.map(serializeDates),
      sellPhoneSubmissions: sellPhone.map(serializeDates),
      appointments: appointments.map(serializeDates),
      contactMessages: contact.map(serializeDates),
      itemReservations: reservations.map(serializeDates),
    });
  } catch (err) {
    next(err as Error);
  }
});

router.patch("/leads/:leadType/:id/status", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { leadType, id } = req.params;
    const numericId = Number(id);
    const status = (req.body as { status?: string }).status;
    if (!Number.isFinite(numericId) || !status || !["new", "in_progress", "done", "archived"].includes(status)) {
      res.status(400).json({ error: "Invalid id or status" });
      return;
    }
    const tableMap = {
      "repair-quote": repairQuotesTable,
      "sell-phone": sellPhoneSubmissionsTable,
      appointment: appointmentsTable,
      contact: contactMessagesTable,
      reservation: itemReservationsTable,
    } as const;
    const table = tableMap[leadType as keyof typeof tableMap];
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
});

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

export default router;
