# Workspace

## Cutover note (2026-04-27)

Gadget X Repairs primary domain switched from `nawazcoded.me` (legacy) to `https://gadgetxrepairs.com`. `nawazcoded.me` was fully retired — no 301 redirects kept, custom-domain mapping removed from the deployment. Sender email moved to `support@gadgetxrepairs.com`. Code defaults in `messaging.ts`, `seo-config.mjs`, and `SEO.tsx` were updated to match, and the two hardcoded JSON-LD URLs in `InventoryPage.tsx` / `SalesPage.tsx` now use the exported `SITE_URL` from `SEO.tsx`. Build-time env `VITE_SITE_URL=https://gadgetxrepairs.com` is set as defence-in-depth. Google Search Console resubmission for the new domain is filed as a follow-up task.

## SMS sender vs. public phone (2026-04-27)

The marketing site advertises the Houston local number `+1 (346) 623-6898` (`tel:`, `sms:`, `wa.me` links across `artifacts/gadget-x-repairs/src/content.ts` and `RepairQuoteForm.tsx`), but **outbound SMS from the admin Composer is sent from the toll-free `+1 (844) 349-6782`** — that is the only number this Telnyx organization owns and the only number attached to messaging profile `40019dcb-dc53-4eb3-a25d-a02d2c922727` ("GadgetXRepairs.com"). `+13466236898` is **not present** in this Telnyx account at all, so any attempt to send from it is rejected by the API.

This discrepancy is intentional for now: the local Houston number is kept as the customer-facing display because it preserves local-business presence on the site, in NAP citations, and in Google Business Profile. The toll-free is used as the sender because it is the number we actually own on Telnyx. As a result, customers will see replies arrive from a different number than the one printed on the website. The shared env var `SMS_FROM_NUMBER=+18443496782` and the code default in `artifacts/api-server/src/lib/messaging.ts` both reflect this. To collapse the discrepancy in the future, port `+13466236898` into Telnyx, attach it to the GadgetXRepairs.com messaging profile, then update both the env var and the marketing-site links to that single number. Until then, end-to-end handset delivery is also gated on toll-free carrier verification (Telnyx Mission Control → Verified Numbers form for `+18443496782`); see `artifacts/api-server/docs/messaging-integration-report.md` defect D5.

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/api-server` — Express API server (kind: api).
- `artifacts/mockup-sandbox` — Vite preview server for canvas component mockups (kind: design).
- `artifacts/gadget-x-repairs` — Production marketing site for **Gadget X Repairs** (Houston cellphone/tablet/laptop/console repair shop). React + Vite + Tailwind + shadcn/ui + wouter. 50+ SEO landing pages: 20 services, 8 sales, 10 prepaid, 6 areas, 10 articles, plus Home/About/Contact/Reviews/Inventory/Admin (Leads + Inventory). Bold but softened theme (warm off-white canvas, desaturated red accents, rounded corners, thin borders, soft blurred shadows; brand still bold + red-accented but no longer brutalist — no rotated/skewed eyebrows, no hard offset shadow blocks, no text-stroke). Phone CTAs everywhere → `tel:+13466236898`. Logo at `public/images/gadget-x-logo.png`. Brand copy in `src/content.ts`; per-page data in `src/data/{services,sales,prepaid,areas,articles,reviews}.ts`; **inventory is now DB-backed via `inventory_items` table** (legacy items in `src/data/inventory.ts` are only the static fallback for API errors). Public `/inventory` reads `/api/inventory` and renders item images stored in Replit object storage. SEO via `react-helmet-async` (`src/components/SEO.tsx`) — title, meta, canonical, OG/Twitter, plus LocalBusiness/Service/FAQ/Article/Breadcrumb JSON-LD per route. Lead-capture forms (Repair Quote, Sell Phone, Appointment, Contact, Reservation) POST to `/api/leads/*` and persist to Postgres. Password-gated admin (env `GX_ADMIN_PASSWORD`, sent via `x-admin-password` header): `/admin/leads` for lead inbox, `/admin/inventory` for full inventory CRUD (create/edit/delete, image upload via presigned PUT to GCS, availability `in_stock`/`on_hold`/`sold`/`hidden`, drag-style reorder with up/down arrows). API routes: `GET /api/inventory` (public, hides `sold`/`hidden`), `GET/POST/PATCH/DELETE /api/admin/inventory[/:id]`, `POST /api/admin/inventory/reorder`, `POST /api/admin/inventory/upload-url`. Inventory images are uploaded directly to the bucket's public prefix (`public/inventory/<uuid>`) via a presigned PUT — no per-object ACL or auth is needed at read time because uploads only ever land in a publicly-readable path; only image/jpeg, image/png, image/webp and image/gif up to 20MB are accepted, and only signed-in admins can request an upload URL. Public read serving is the single route `GET /api/storage/public-objects/*`. On startup the api-server seeds the original 24 items if the table is empty. `pnpm build` runs `vite build && tsx scripts/build-seo.mjs` — postbuild emits per-route `index.html` with injected title/desc/canonical, plus `sitemap.xml` and `robots.txt`.
