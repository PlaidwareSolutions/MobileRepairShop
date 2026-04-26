import type { InventoryItemRow } from "@workspace/db";

const AVAILABILITY_LABEL: Record<string, string> = {
  in_stock: "In stock",
  on_hold: "On hold",
  sold: "Sold",
  hidden: "Hidden",
};

/**
 * Serialize a DB inventory row into the shape consumed by the public Inventory page
 * (matches the existing API contract: omit empty optional fields).
 */
export function serializeInventoryItem(row: InventoryItemRow) {
  const out: Record<string, string> = {
    id: row.id,
    category: row.category,
    brand: row.brand,
    model: row.model,
    price: row.priceDisplay,
  };
  if (row.storage) out.storage = row.storage;
  if (row.color) out.color = row.color;
  if (row.condition) out.condition = row.condition;
  if (row.carrier) out.carrier = row.carrier;
  if (row.warranty) out.warranty = row.warranty;
  if (row.availability) out.availability = AVAILABILITY_LABEL[row.availability] ?? row.availability;
  if (row.imageUrl) out.imageUrl = row.imageUrl;
  if (row.description) out.description = row.description;
  return out;
}

/**
 * Admin-shape serialization: includes raw availability code and sortOrder.
 */
export function serializeAdminInventoryItem(row: InventoryItemRow) {
  return {
    id: row.id,
    category: row.category,
    brand: row.brand,
    model: row.model,
    storage: row.storage,
    color: row.color,
    condition: row.condition,
    carrier: row.carrier,
    warranty: row.warranty,
    priceCents: row.priceCents,
    priceDisplay: row.priceDisplay,
    availability: row.availability,
    imageUrl: row.imageUrl,
    description: row.description,
    sortOrder: Number(row.sortOrder),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
