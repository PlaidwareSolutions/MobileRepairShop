import { SERVICES_DATA } from "./data/services";
import { SALES_DATA } from "./data/sales";
import { PREPAID_DATA } from "./data/prepaid";
import { AREAS_DATA } from "./data/areas";
import { ARTICLES_DATA } from "./data/articles";

export type RouteEntry = {
  path: string;
  metaTitle: string;
  metaDescription: string;
};

export const STATIC_ROUTES: RouteEntry[] = [
  {
    path: "/",
    metaTitle: "Gadget X Repairs — Same-Day Phone, Tablet, Laptop & Console Repair in Houston",
    metaDescription:
      "15 years of trusted same-day phone, iPad, MacBook, laptop, PlayStation, Xbox & Nintendo repair in Houston, TX. Walk-ins welcome at 8389 Almeda Rd. Call (346) 623-6898.",
  },
  {
    path: "/about",
    metaTitle: "About Gadget X Repairs | 15 Years in Houston",
    metaDescription:
      "About Gadget X Repairs — 15 years of honest repair, sales and prepaid service from our Almeda Rd shop in Houston, TX.",
  },
  {
    path: "/contact",
    metaTitle: "Contact Gadget X Repairs | Houston, TX",
    metaDescription:
      "Contact Gadget X Repairs in Houston: call (346) 623-6898, text on WhatsApp, or visit 8389 Almeda Rd Suite J-2.",
  },
  {
    path: "/reviews",
    metaTitle: "Customer Reviews | Gadget X Repairs Houston",
    metaDescription:
      "5-star customer reviews for Gadget X Repairs in Houston, TX — phone, tablet, laptop, PS5, Xbox repair and prepaid activation.",
  },
  {
    path: "/inventory",
    metaTitle: "Inventory | Used & Refurbished Phones, Laptops in Houston",
    metaDescription:
      "Browse our current inventory of unlocked iPhones, Samsungs, Pixels, MacBooks and laptops at our Houston shop.",
  },
  {
    path: "/admin/leads",
    metaTitle: "Admin · Leads | Gadget X",
    metaDescription: "Admin lead inbox for Gadget X Repairs.",
  },
];

export const ALL_ROUTES: RouteEntry[] = [
  ...STATIC_ROUTES,
  ...SERVICES_DATA.map((s): RouteEntry => ({ path: `/${s.slug}`, metaTitle: s.metaTitle, metaDescription: s.metaDescription })),
  ...SALES_DATA.map((s): RouteEntry => ({ path: `/${s.slug}`, metaTitle: s.metaTitle, metaDescription: s.metaDescription })),
  ...PREPAID_DATA.map((p): RouteEntry => ({ path: `/${p.slug}`, metaTitle: p.metaTitle, metaDescription: p.metaDescription })),
  ...AREAS_DATA.map((a): RouteEntry => ({ path: `/${a.slug}`, metaTitle: a.metaTitle, metaDescription: a.metaDescription })),
  ...ARTICLES_DATA.map((a): RouteEntry => ({ path: `/articles/${a.slug}`, metaTitle: a.metaTitle, metaDescription: a.metaDescription })),
];

export const SITEMAP_ROUTES = ALL_ROUTES.filter((r) => !r.path.startsWith("/admin"));
