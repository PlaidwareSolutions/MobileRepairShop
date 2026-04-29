import { SERVICES_DATA } from "./data/services";
import { SALES_DATA } from "./data/sales";
import { PREPAID_DATA } from "./data/prepaid";
import { AREAS_DATA } from "./data/areas";
import { ARTICLES_DATA } from "./data/articles";
import { INVENTORY_GROUPS } from "./lib/inventoryGroups";

export type RouteEntry = {
  path: string;
  metaTitle: string;
  metaDescription: string;
};

// Home page meta — kept identical for `/` and `/phone-repair-houston-tx` since both
// render the same HomePage component. The canonical URL emitted by <SEO> still points
// to /phone-repair-houston-tx so existing search-engine signals are preserved.
const HOME_META = {
  metaTitle:
    "Phone Repair Houston, TX | iPhone, Samsung, Pixel, Laptop, PS5 — Gadget X Repairs",
  metaDescription:
    "Same-day phone, tablet, laptop and game console repair in Houston, TX. iPhone, Samsung, Pixel, MacBook, PS5, Xbox — fix, sell, prepaid activation. (346) 623-6898.",
};

export const STATIC_ROUTES: RouteEntry[] = [
  {
    path: "/",
    ...HOME_META,
  },
  {
    path: "/about",
    metaTitle: "About GadgetX Repairs | 15 Years in Houston TX",
    metaDescription:
      "About GadgetX Repairs in Houston TX — 15 years of honest repair, sales and prepaid service from our Almeda Rd shop. Walk-ins welcome!",
  },
  {
    path: "/contact-houston-tx",
    metaTitle: "Contact Gadget X Repairs | Houston, TX",
    metaDescription:
      "Contact Gadget X Repairs in Houston: call (346) 623-6898, text on WhatsApp, or visit 8389 Almeda Rd Suite J-2.",
  },
  {
    path: "/reviews-houston-tx",
    metaTitle: "Customer Reviews | Gadget X Repairs Houston",
    metaDescription:
      "5-star customer reviews for Gadget X Repairs in Houston, TX — phone, tablet, laptop, PS5, Xbox repair and prepaid activation.",
  },
  {
    path: "/inventory",
    metaTitle: "Phones & Laptops Inventory Houston | GadgetX Repairs",
    metaDescription:
      "Browse current inventory of unlocked iPhones, Samsungs, Pixels and MacBooks at GadgetX Repairs in Houston TX. Walk-ins welcome!",
  },
  {
    path: "/admin/leads",
    metaTitle: "Admin · Leads | Gadget X",
    metaDescription: "Admin lead inbox for Gadget X Repairs.",
  },
];

// Per-category inventory pages (e.g. /inventory/phones). Each known group
// gets its own canonical URL so search engines can rank category-specific
// queries ("used phones Houston", "refurbished MacBooks Houston", ...). The
// catch-all OTHER_GROUP is intentionally excluded — it has no stable user
// intent worth ranking for.
const INVENTORY_GROUP_ROUTES: RouteEntry[] = INVENTORY_GROUPS.map(
  (g): RouteEntry => ({
    path: `/inventory/${g.slug}`,
    metaTitle: g.seo.metaTitle,
    metaDescription: g.seo.metaDescription,
  }),
);

export const ALL_ROUTES: RouteEntry[] = [
  ...STATIC_ROUTES,
  ...INVENTORY_GROUP_ROUTES,
  ...SERVICES_DATA.map((s): RouteEntry => ({ path: `/${s.slug}`, metaTitle: s.metaTitle, metaDescription: s.metaDescription })),
  ...SALES_DATA.map((s): RouteEntry => ({ path: `/${s.slug}`, metaTitle: s.metaTitle, metaDescription: s.metaDescription })),
  ...PREPAID_DATA.map((p): RouteEntry => ({ path: `/${p.slug}`, metaTitle: p.metaTitle, metaDescription: p.metaDescription })),
  ...AREAS_DATA.map((a): RouteEntry => ({ path: `/${a.slug}`, metaTitle: a.metaTitle, metaDescription: a.metaDescription })),
  ...ARTICLES_DATA.map((a): RouteEntry => ({ path: `/articles/${a.slug}`, metaTitle: a.metaTitle, metaDescription: a.metaDescription })),
];

// `/` is prerendered (so the static host has a real index.html) but excluded from the
// sitemap because the canonical home URL is `/phone-repair-houston-tx`. We don't want
// crawlers to see two URLs for the same content.
export const SITEMAP_ROUTES = ALL_ROUTES.filter(
  (r) => !r.path.startsWith("/admin") && r.path !== "/",
);
