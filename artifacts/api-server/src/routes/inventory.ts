import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { and, asc, eq, or, sql } from "drizzle-orm";
import { db, inventoryItemsTable } from "@workspace/db";
import { serializeInventoryItem } from "../lib/inventoryMapper";

const router: IRouter = Router();

const PUBLIC_AVAILABILITY = ["in_stock", "on_hold"] as const;
type PublicAvailability = (typeof PUBLIC_AVAILABILITY)[number];

const publicVisibleClause = or(
  eq(inventoryItemsTable.availability, "in_stock"),
  eq(inventoryItemsTable.availability, "on_hold"),
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = (req.query.category as string | undefined)?.toLowerCase();
    const where = category
      ? and(
          publicVisibleClause,
          sql`lower(${inventoryItemsTable.category}) = ${category}`,
        )
      : publicVisibleClause;
    const rows = await db
      .select()
      .from(inventoryItemsTable)
      .where(where)
      .orderBy(
        asc(inventoryItemsTable.sortOrder),
        asc(inventoryItemsTable.createdAt),
      );
    res.json(rows.map(serializeInventoryItem));
  } catch (err) {
    next(err as Error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const [row] = await db
      .select()
      .from(inventoryItemsTable)
      .where(eq(inventoryItemsTable.id, id))
      .limit(1);
    if (!row || !PUBLIC_AVAILABILITY.includes(row.availability as PublicAvailability)) {
      res.status(404).json({ error: "Inventory item not found" });
      return;
    }
    res.json(serializeInventoryItem(row));
  } catch (err) {
    next(err as Error);
  }
});

export default router;
