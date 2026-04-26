# Workspace

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
- `artifacts/gadget-x-repairs` — Production marketing site for **Gadget X Repairs** (Houston cellphone/tablet/laptop/console repair shop). React + Vite + Tailwind + shadcn/ui + wouter. 50+ SEO landing pages: 20 services, 8 sales, 10 prepaid, 6 areas, 10 articles, plus Home/About/Contact/Reviews/Inventory/Admin (Leads + Inventory). Bold Urban Store theme (black canvas, red headlines, yellow accents, neo-brutalist). Phone CTAs everywhere → `tel:+13466236898`. Logo at `public/images/gadget-x-logo.png`. Brand copy in `src/content.ts`; per-page data in `src/data/{services,sales,prepaid,areas,articles,reviews}.ts`; **inventory is now DB-backed via `inventory_items` table** (legacy items in `src/data/inventory.ts` are only the static fallback for API errors). Public `/inventory` reads `/api/inventory` and renders item images stored in Replit object storage. SEO via `react-helmet-async` (`src/components/SEO.tsx`) — title, meta, canonical, OG/Twitter, plus LocalBusiness/Service/FAQ/Article/Breadcrumb JSON-LD per route. Lead-capture forms (Repair Quote, Sell Phone, Appointment, Contact, Reservation) POST to `/api/leads/*` and persist to Postgres. Password-gated admin (env `GX_ADMIN_PASSWORD`, sent via `x-admin-password` header): `/admin/leads` for lead inbox, `/admin/inventory` for full inventory CRUD (create/edit/delete, image upload via presigned PUT to GCS, availability `in_stock`/`on_hold`/`sold`/`hidden`, drag-style reorder with up/down arrows). API routes: `GET /api/inventory` (public, hides `sold`/`hidden`), `GET/POST/PATCH/DELETE /api/admin/inventory[/:id]`, `POST /api/admin/inventory/reorder`, `POST /api/admin/inventory/upload-url`. Inventory images are uploaded directly to the bucket's public prefix (`public/inventory/<uuid>`) via a presigned PUT — no per-object ACL or auth is needed at read time because uploads only ever land in a publicly-readable path; only image/jpeg, image/png, image/webp and image/gif up to 20MB are accepted, and only signed-in admins can request an upload URL. Public read serving is the single route `GET /api/storage/public-objects/*`. On startup the api-server seeds the original 24 items if the table is empty. `pnpm build` runs `vite build && tsx scripts/build-seo.mjs` — postbuild emits per-route `index.html` with injected title/desc/canonical, plus `sitemap.xml` and `robots.txt`.
