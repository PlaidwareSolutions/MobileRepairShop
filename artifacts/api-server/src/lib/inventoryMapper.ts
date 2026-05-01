import type { InventoryItemRow } from "@workspace/db";

const AVAILABILITY_LABEL: Record<string, string> = {
  in_stock: "In stock",
  on_hold: "On hold",
  sold: "Sold",
  hidden: "Hidden",
};

function centsToDollarsDisplay(cents: number): string {
  const dollars = cents / 100;
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

/**
 * Serialize a DB inventory row into the shape consumed by the public Inventory page
 * (matches the existing API contract: omit empty optional fields).
 */
export function serializeInventoryItem(row: InventoryItemRow) {
  const out: Record<string, unknown> = {
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
  if (row.imageUrl2) out.imageUrl2 = row.imageUrl2;
  if (row.imageUrl3) out.imageUrl3 = row.imageUrl3;
  if (row.description) out.description = row.description;
  out.financingEnabled = row.financingEnabled;
  out.financingDownPaymentCents = row.financingDownPaymentCents;
  out.financingDownPaymentDisplay = centsToDollarsDisplay(row.financingDownPaymentCents);
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
    imageUrl2: row.imageUrl2,
    imageUrl3: row.imageUrl3,
    financingEnabled: row.financingEnabled,
    financingDownPaymentCents: row.financingDownPaymentCents,
    description: row.description,
    sortOrder: Number(row.sortOrder),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
