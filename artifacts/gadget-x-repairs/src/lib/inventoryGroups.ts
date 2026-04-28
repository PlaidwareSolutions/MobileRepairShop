/**
 * Shared inventory category grouping.
 *
 * Each known group has its own canonical URL (`/inventory/<slug>`) so search
 * engines can index a clean per-category page (Google mostly ignores query
 * strings as canonical URLs). The legacy `/inventory?category=<slug>` form
 * still works — InventoryPage soft-redirects it to the canonical path.
 *
 * Inventory items are stored with free-form category strings ("Used iPhones",
 * "Refurbished iPhones", "Samsung phones", "Laptops", ...) that change over
 * time as stock is renamed or re-categorised. To keep the slug -> filter
 * mapping resilient to those renames we map slugs to a *predicate* over the
 * item's category string (case-insensitive keyword match) instead of an
 * exact-match table that would silently break the moment someone tweaks a
 * category label in the admin.
 *
 * Per-group SEO metadata (`seo`, `heading`, `intro`) lives here too so that
 * routes-config.ts (which generates the prerender route list and sitemap) and
 * InventoryPage (which renders the page) read from one source of truth — no
 * risk of the title in the sitemap drifting from the title in the rendered
 * page.
 */

export type InventoryGroup = {
  slug: string;
  label: string;
  matches: (category: string) => boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  heading: {
    prefix: string;
    highlight: string;
  };
  intro: string;
};

export const INVENTORY_GROUPS: InventoryGroup[] = [
  {
    slug: "phones",
    label: "Phones",
    matches: (c) => /phone|iphone|galaxy|pixel/i.test(c),
    seo: {
      metaTitle: "Used & Refurbished Phones in Houston | Gadget X Repairs",
      metaDescription:
        "Browse unlocked iPhones, Samsung Galaxy and Google Pixel phones at our Houston shop. Tested, warrantied refurbished and used phones from $99.",
    },
    heading: { prefix: "Used", highlight: "Phones" },
    intro:
      "Unlocked iPhones, Samsung Galaxy and Google Pixel handsets — tested, cleaned and backed by our 90-day warranty. Stock changes daily; call to confirm or reserve.",
  },
  {
    slug: "tablets",
    label: "Tablets",
    matches: (c) => /tablet|ipad/i.test(c),
    seo: {
      metaTitle: "Used & Refurbished Tablets in Houston | Gadget X Repairs",
      metaDescription:
        "Refurbished iPads and Android tablets at our Houston shop — Wi-Fi and cellular models, tested and backed by our 90-day warranty.",
    },
    heading: { prefix: "Used", highlight: "Tablets" },
    intro:
      "iPads and Android tablets we've tested and refurbished in-shop. Wi-Fi and cellular models, all backed by our 90-day warranty. Call to confirm or reserve.",
  },
  {
    slug: "laptops",
    label: "Laptops",
    matches: (c) => /laptop|macbook|chromebook|notebook/i.test(c),
    seo: {
      metaTitle: "Refurbished MacBooks & Laptops in Houston | Gadget X Repairs",
      metaDescription:
        "Refurbished MacBooks and Windows laptops in Houston, TX — HP, Dell, Lenovo, ASUS, Acer and Chromebooks. Tested with our 90-day warranty.",
    },
    heading: { prefix: "Refurbished", highlight: "Laptops" },
    intro:
      "MacBooks, Windows laptops and Chromebooks we've cleaned, tested and warrantied in-shop. Stock changes daily; call to confirm or reserve.",
  },
  {
    slug: "consoles",
    label: "Consoles",
    matches: (c) =>
      /console|playstation|\bps[2-9]\b|xbox|nintendo|\bswitch\b/i.test(c),
    seo: {
      metaTitle:
        "Refurbished PlayStation, Xbox & Nintendo Switch in Houston | Gadget X Repairs",
      metaDescription:
        "Used and refurbished PS4, PS5, Xbox One, Series X|S and Nintendo Switch consoles at our Houston shop. Tested, cleaned, backed by our 90-day warranty.",
    },
    heading: { prefix: "Refurbished", highlight: "Consoles" },
    intro:
      "PlayStation, Xbox and Nintendo Switch consoles we've cleaned, tested and warrantied in-shop. Controllers and cables included unless noted.",
  },
];

// Catch-all bucket for anything that doesn't match the well-known groups above.
// Intentionally kept out of the prerendered route list / sitemap — "other" has
// no stable user intent worth ranking for, and the chip is only shown when the
// inventory actually contains uncategorised items.
export const OTHER_GROUP: InventoryGroup = {
  slug: "other",
  label: "Other",
  matches: (c) => !INVENTORY_GROUPS.some((g) => g.matches(c)),
  seo: {
    metaTitle: "Other Inventory | Gadget X Repairs Houston",
    metaDescription:
      "Other tested, warrantied gadgets in stock at our Houston shop.",
  },
  heading: { prefix: "Other", highlight: "Inventory" },
  intro: "Other tested gadgets currently in stock at our Houston shop.",
};

export const ALL_FILTER_SLUG = "all";

export function inventoryGroupBySlug(
  slug: string | null | undefined,
): InventoryGroup | null {
  if (!slug) return null;
  if (slug === OTHER_GROUP.slug) return OTHER_GROUP;
  return INVENTORY_GROUPS.find((g) => g.slug === slug) ?? null;
}

/**
 * Resolve which inventory group a free-form category string will land in.
 *
 * Mirrors the same keyword-based matching the shopper-facing inventory page
 * uses, so admin staff can preview the bucket their item will appear under
 * before saving. Falls back to {@link OTHER_GROUP} when no group matches —
 * that means the item won't be reachable from the "We Sell Too" tile filters.
 */
export function inventoryGroupForCategory(
  category: string | null | undefined,
): InventoryGroup {
  const c = (category ?? "").trim();
  if (!c) return OTHER_GROUP;
  return INVENTORY_GROUPS.find((g) => g.matches(c)) ?? OTHER_GROUP;
}
