import { sql } from "drizzle-orm";
import { db, inventoryItemsTable, type Availability } from "@workspace/db";
import { INVENTORY } from "../data/inventory";

function priceToCents(price: string): number {
  const m = price.replace(/[^0-9.]/g, "");
  const n = Number(m);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

function legacyAvailability(value: string | undefined): Availability {
  if (!value) return "in_stock";
  const v = value.toLowerCase();
  if (v.includes("sold")) return "sold";
  if (v.includes("hold")) return "on_hold";
  if (v.includes("hidden")) return "hidden";
  return "in_stock";
}

/**
 * On first run, populate inventory_items from the legacy hardcoded list so
 * the public Inventory page sees the same items it always did.
 * Idempotent: skips if any rows already exist.
 */
export async function seedInventoryIfEmpty(): Promise<{ inserted: number }> {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(inventoryItemsTable);

  if (count > 0) return { inserted: 0 };

  const rows = INVENTORY.map((it, idx) => ({
    id: it.id,
    category: it.category,
    brand: it.brand,
    model: it.model,
    storage: it.storage ?? null,
    color: it.color ?? null,
    condition: it.condition ?? null,
    carrier: it.carrier ?? null,
    warranty: it.warranty ?? null,
    priceCents: priceToCents(it.price),
    priceDisplay: it.price,
    availability: legacyAvailability(it.availability),
    imageUrl: null,
    description: null,
    sortOrder: String(idx * 10),
  }));

  if (rows.length === 0) return { inserted: 0 };
  await db.insert(inventoryItemsTable).values(rows);
  return { inserted: rows.length };
}
