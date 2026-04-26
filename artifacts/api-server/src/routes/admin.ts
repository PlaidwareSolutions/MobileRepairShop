import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  repairQuotesTable,
  sellPhoneSubmissionsTable,
  appointmentsTable,
  contactMessagesTable,
  itemReservationsTable,
} from "@workspace/db";

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

function serializeDates<T extends { createdAt: Date; updatedAt: Date }>(row: T) {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export default router;
