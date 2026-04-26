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
- `artifacts/gadget-x-repairs` — Production marketing site for **Gadget X Repairs** (Houston cellphone/tablet/laptop/console repair shop). React + Vite + Tailwind + shadcn/ui. Single-page Bold Urban Store theme (black canvas, oversized red headlines, yellow accents, neo-brutalist shadows, marquee ticker). Phone CTAs everywhere → `tel:+13466236898`. SEO meta + LocalBusiness JSON-LD in `index.html`. Logo at `public/images/gadget-x-logo.png`. All copy in `src/content.ts`. Single page in `src/pages/HomePage.tsx`.
