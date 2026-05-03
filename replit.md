# Workspace

## ok-cellular iFixit-inspired redesign (2026-05-03)

`artifacts/ok-cellular/` was visually rewritten in an iFixit-inspired
technical-handbook style while keeping the OK Cellular Repairs brand,
all routes, all `/api/leads/*` payloads, and all content (15 yrs in
Houston, 90-day warranty, $10-down financing, full hours, NAP, 6
service categories incl. Accessories) unchanged. `artifacts/api-server/`
and the database schema were not touched.

Design tokens (`src/index.css`): white background, foreground
hsl(220 13% 18%), border hsl(220 13% 91%), single confident primary
accent iFixit blue hsl(207 90% 41%), sharp 0.25rem radius, Inter
system sans, low calm shadows.

Chrome rebuilt: `SiteHeader` is now search-led (TopUtilityBar + main
bar with logo + GlobalSearch + Call CTA + nav row with calm white
mega-menus + mobile drawer); `SiteFooter` is light/muted; `PageHero`
is a calm panel; `Breadcrumbs` are first-class on every non-home
page; `StickyMobileBar`'s WhatsApp tile uses `#075E54` (dark teal)
to meet WCAG AA with white text. `PageShell.hideTicker` is now a
no-op; `TickerTape` is kept exported for back-compat.

Templates: `HomePage` is search hero + visit-the-shop side panel +
device tiles + popular-repairs table + mail-in/financing utility
cards + before/after + why-us + sell tiles + RepairQuoteWizard +
prepaid/areas chips. `ServicePage` is a guide template with
at-a-glance Price/Time/Warranty/Diagnostic cells, symptoms + brands
columns, numbered process, pricing table, upgrade/inventory
callouts, quote+appointment forms, hub child grid, and quick-call
strip.

Across all non-shadcn `*.tsx`: `red-*` mapped to primary; `zinc-*`
mapped to foreground/muted/border/muted-foreground;
`font-extrabold/font-black` collapsed to `font-semibold`; brutalist
`shadow-[Npx_Npx_0_0_#hex]` collapsed to `shadow-md`. Heading
`uppercase tracking-tight` styling and CTA-button uppercase pairings
were dropped, and hardcoded ALL-CAPS H1/H2 strings on About,
Contact, Reviews, Area, Prepaid, Financing, Sales, and Inventory
were rewritten in title case (with the existing primary-coloured
highlight word retained). `uppercase tracking-wide` is kept only on
tiny eyebrow labels (10–12 px) as intentional iFixit-style section
markers. `ui/toast.tsx` and `ui/sidebar.tsx` retain the expected
shadcn destructive/red usage.

Verification: `pnpm --filter @workspace/ok-cellular run build`
passes — 160 prerendered routes, 59 legacy redirects,
audit-seo + audit-sitemap green against `okcellularrepairs.com`.

## Anti-spam on lead forms (2026-04-29)

All five OK Cellular lead forms (Repair Quote + the wizard, Sell Phone, Appointment, Contact, Reservation) now have a defense-in-depth stack against junk leads, applied in this order on every POST to `/api/leads/*`:

1. **Per-IP rate limit** (`leadRateLimit` middleware, Postgres-backed sliding window: 5 / 10min and 20 / day).
2. **Honeypot + time-trap** (Contact form only, inline in handler — silent 201 to avoid tipping off bots).
3. **Cloudflare Turnstile** invisible CAPTCHA (`requireTurnstile` middleware on the four simple endpoints; inline check after honeypot for `/contact` so we don't burn siteverify calls on obvious bots).

Turnstile is wired with `appearance: 'interaction-only'` — silent for normal customers, only renders a small managed challenge when CF's risk signals say the session looks suspicious. It is **opt-in via secrets**: if `TURNSTILE_SECRET_KEY` (server) and `VITE_TURNSTILE_SITE_KEY` (build-time, exposed to browser) are not set, both client hook and server middleware become no-ops and the existing honeypot + rate-limit defenses still apply on their own. To enable, add both secrets and rebuild the web app. The shop owner does not need their own Cloudflare account — the keys come from Replit's secrets flow.

Files: `artifacts/api-server/src/lib/turnstile.ts` (siteverify helper), `artifacts/api-server/src/middleware/turnstile.ts` (`requireTurnstile`), `artifacts/ok-cellular/src/components/forms/Turnstile.tsx` (`useTurnstile` hook + invisible widget). The token field on the wire is `cfTurnstileToken`; like `website` and `renderedAt`, it's intentionally NOT in the OpenAPI/zod schema so it doesn't show up in the public API contract (Zod silently strips it).

## Cutover note (2026-04-27)

OK Cellular primary domain switched from `nawazcoded.me` (legacy) to `https://okcellularrepairs.com`. `nawazcoded.me` was fully retired — no 301 redirects kept, custom-domain mapping removed from the deployment. Sender email moved to `support@okcellularrepairs.com`. Code defaults in `messaging.ts`, `seo-config.mjs`, and `SEO.tsx` were updated to match, and the two hardcoded JSON-LD URLs in `InventoryPage.tsx` / `SalesPage.tsx` now use the exported `SITE_URL` from `SEO.tsx`. Build-time env `VITE_SITE_URL=https://okcellularrepairs.com` is set as defence-in-depth. Google Search Console resubmission for the new domain is filed as a follow-up task.

## SMS sender vs. public phone (2026-04-27)

The marketing site advertises the Houston local number `+1 (346) 623-6898` (`tel:`, `sms:`, `wa.me` links across `artifacts/ok-cellular/src/content.ts` and `RepairQuoteForm.tsx`), but **outbound SMS from the admin Composer is sent from the toll-free `+1 (844) 349-6782`** — that is the only number this Telnyx organization owns and the only number attached to messaging profile `40019dcb-dc53-4eb3-a25d-a02d2c922727` ("OKCellularRepairs.com"). `+13466236898` is **not present** in this Telnyx account at all, so any attempt to send from it is rejected by the API.

This discrepancy is intentional for now: the local Houston number is kept as the customer-facing display because it preserves local-business presence on the site, in NAP citations, and in Google Business Profile. The toll-free is used as the sender because it is the number we actually own on Telnyx. As a result, customers will see replies arrive from a different number than the one printed on the website. The shared env var `SMS_FROM_NUMBER=+18443496782` and the code default in `artifacts/api-server/src/lib/messaging.ts` both reflect this. To collapse the discrepancy in the future, port `+13466236898` into Telnyx, attach it to the OKCellularRepairs.com messaging profile, then update both the env var and the marketing-site links to that single number. Until then, end-to-end handset delivery is also gated on toll-free carrier verification (Telnyx Mission Control → Verified Numbers form for `+18443496782`); see `artifacts/api-server/docs/messaging-integration-report.md` defect D5.

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
- `artifacts/ok-cellular` — Production marketing site for **OK Cellular** (Houston cellphone/tablet/laptop/console repair shop). React + Vite + Tailwind + shadcn/ui + wouter. 50+ SEO landing pages: 20 services, 8 sales, 10 prepaid, 6 areas, 10 articles, plus Home/About/Contact/Reviews/Inventory/Admin (Leads + Inventory). Bold but softened theme (warm off-white canvas, desaturated red accents, rounded corners, thin borders, soft blurred shadows; brand still bold + red-accented but no longer brutalist — no rotated/skewed eyebrows, no hard offset shadow blocks, no text-stroke). Phone CTAs everywhere → `tel:+13466236898`. Logo at `public/images/ok-cellular-logo.png`. Brand copy in `src/content.ts`; per-page data in `src/data/{services,sales,prepaid,areas,articles,reviews}.ts`; **inventory is now DB-backed via `inventory_items` table** (legacy items in `src/data/inventory.ts` are only the static fallback for API errors). Public `/inventory` reads `/api/inventory` and renders item images stored in Replit object storage. SEO via `react-helmet-async` (`src/components/SEO.tsx`) — title, meta, canonical, OG/Twitter, plus LocalBusiness/Service/FAQ/Article/Breadcrumb JSON-LD per route. Lead-capture forms (Repair Quote, Sell Phone, Appointment, Contact, Reservation) POST to `/api/leads/*` and persist to Postgres. Password-gated admin (env `GX_ADMIN_PASSWORD`, sent via `x-admin-password` header): `/admin/leads` for lead inbox, `/admin/inventory` for full inventory CRUD (create/edit/delete, image upload via presigned PUT to GCS, availability `in_stock`/`on_hold`/`sold`/`hidden`, drag-style reorder with up/down arrows), `/admin/promotions` for owner-managed campaign banner that renders on the homepage above the hero (animated cross-fade between live promos, server-evaluated schedule in shop's `America/Chicago` TZ — `always` / `daily` time-window / `weekly` days+time-window — accent palette amber/red/emerald/blue, badge/headline/supporting/CTA, `active` master toggle, optional `startsAt`/`endsAt` window, sortable, session-dismissable; the public `GET /api/promotions/active` endpoint never returns paused or out-of-window rows so draft promos cannot leak to the client). API routes: `GET /api/inventory` (public, hides `sold`/`hidden`), `GET/POST/PATCH/DELETE /api/admin/inventory[/:id]`, `POST /api/admin/inventory/reorder`, `POST /api/admin/inventory/upload-url`. Inventory images are uploaded directly to the bucket's public prefix (`public/inventory/<uuid>`) via a presigned PUT — no per-object ACL or auth is needed at read time because uploads only ever land in a publicly-readable path; only image/jpeg, image/png, image/webp and image/gif up to 20MB are accepted, and only signed-in admins can request an upload URL. Public read serving is the single route `GET /api/storage/public-objects/*`. On startup the api-server seeds the original 24 items if the table is empty. `pnpm build` runs `vite build && tsx scripts/build-seo.mjs` — postbuild emits per-route `index.html` with injected title/desc/canonical, plus `sitemap.xml` and `robots.txt`.
