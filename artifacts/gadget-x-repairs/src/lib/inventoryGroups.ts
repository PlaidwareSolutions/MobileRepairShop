/**
 * Shared inventory category grouping.
 *
 * The homepage "We Sell Too" tiles deep-link into the inventory page using
 * a stable `slug` (e.g. `/inventory?category=phones`). Inventory items are
 * stored with free-form category strings ("Used iPhones", "Refurbished
 * iPhones", "Samsung phones", "Laptops", ...) that change over time as
 * stock is renamed or re-categorised.
 *
 * To keep the tile -> filter mapping resilient to those renames we map
 * slugs to a *predicate* over the item's category string (case-insensitive
 * keyword match) instead of an exact-match table that would silently break
 * the moment someone tweaks a category label in the admin.
 */

export type InventoryGroup = {
  slug: string;
  label: string;
  matches: (category: string) => boolean;
};

export const INVENTORY_GROUPS: InventoryGroup[] = [
  {
    slug: "phones",
    label: "Phones",
    matches: (c) => /phone|iphone|galaxy|pixel/i.test(c),
  },
  {
    slug: "tablets",
    label: "Tablets",
    matches: (c) => /tablet|ipad/i.test(c),
  },
  {
    slug: "laptops",
    label: "Laptops",
    matches: (c) => /laptop|macbook|chromebook|notebook/i.test(c),
  },
  {
    slug: "consoles",
    label: "Consoles",
    matches: (c) =>
      /console|playstation|\bps[2-9]\b|xbox|nintendo|\bswitch\b/i.test(c),
  },
];

export const OTHER_GROUP: InventoryGroup = {
  slug: "other",
  label: "Other",
  matches: (c) => !INVENTORY_GROUPS.some((g) => g.matches(c)),
};

export const ALL_FILTER_SLUG = "all";

export function inventoryGroupBySlug(
  slug: string | null | undefined,
): InventoryGroup | null {
  if (!slug) return null;
  if (slug === OTHER_GROUP.slug) return OTHER_GROUP;
  return INVENTORY_GROUPS.find((g) => g.slug === slug) ?? null;
}
