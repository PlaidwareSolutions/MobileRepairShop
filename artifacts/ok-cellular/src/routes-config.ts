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
  noindex?: boolean;
};

// Home page meta — kept identical for `/` and `/phone-repair-humble-tx` since both
// render the same HomePage component. The canonical URL emitted by <SEO> still points
// to /phone-repair-humble-tx so existing search-engine signals are preserved.
const HOME_META = {
  metaTitle:
    "Phone, Laptop & PS5 Repair Humble TX | OK Cellular",
  metaDescription:
    "Same-day phone, tablet, laptop and console repair in Humble, TX. iPhone, Samsung, Pixel, MacBook, PS5, Xbox. Call (281) 446-2166.",
};

export const STATIC_ROUTES: RouteEntry[] = [
  {
    path: "/",
    ...HOME_META,
  },
  {
    path: "/about",
    metaTitle: "About OK Cellular | 5+ Years in Humble TX",
    metaDescription:
      "About OK Cellular in Humble TX — 5+ years of honest repair, sales and prepaid service from our Will Clayton Pkwy shop. Walk-ins welcome!",
  },
  {
    path: "/contact-humble-tx",
    metaTitle: "Contact OK Cellular | Humble, TX",
    metaDescription:
      "Contact OK Cellular in Humble TX: call (281) 446-2166, text on WhatsApp, or visit 8910 Will Clayton Pkwy APT 200.",
  },
  {
    path: "/mail-in-repair-humble-tx",
    metaTitle: "Mail-In Phone & Laptop Repair | OK Cellular Humble, TX",
    metaDescription:
      "Ship your phone, tablet, laptop or console to OK Cellular in Humble TX for repair. Get a quote online, mail it in, we fix it and ship it back.",
  },
  {
    path: "/book-repair-humble-tx",
    metaTitle: "Book a Repair Online | OK Cellular Humble, TX",
    metaDescription:
      "Book a repair online at OK Cellular, Humble TX — phones, tablets, laptops & consoles. Drop off in-store or mail it in. Optional $10 deposit holds your slot.",
  },
  {
    path: "/reviews-humble-tx",
    metaTitle: "Customer Reviews | OK Cellular Humble TX",
    metaDescription:
      "5-star customer reviews for OK Cellular in Humble, TX — phone, tablet, laptop, PS5, Xbox repair and prepaid activation.",
  },
  {
    path: "/inventory",
    metaTitle: "Phones & Laptops Inventory Humble TX | OK Cellular",
    metaDescription:
      "Browse current inventory of unlocked iPhones, Samsungs, Pixels and MacBooks at OK Cellular in Humble TX. Walk-ins welcome!",
  },
  {
    path: "/financing-humble-tx",
    metaTitle: "Phone Financing Humble TX | $10 Down | OK Cellular",
    metaDescription:
      "Phone financing in Humble TX from $10 down. Walk out the same day with an unlocked iPhone, Samsung or Pixel. Pre-qualify in 60 seconds — no credit pull.",
  },
  {
    path: "/admin/leads",
    metaTitle: "Admin · Leads | OK Cellular",
    metaDescription: "Admin lead inbox for OK Cellular.",
  },
];

// Per-category inventory pages (e.g. /inventory/phones). Each known group
// gets its own canonical URL so search engines can rank category-specific
// queries ("used phones Humble", "refurbished MacBooks Humble", ...). The
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
// sitemap because the canonical home URL is `/phone-repair-humble-tx`. We don't want
// crawlers to see two URLs for the same content.
export const SITEMAP_ROUTES = ALL_ROUTES.filter(
  (r) => !r.path.startsWith("/admin") && r.path !== "/",
);
