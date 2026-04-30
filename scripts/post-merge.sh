#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
# Bring forward legacy financing pre-qualification rows now that
# contact_messages has a structured `source` column. Idempotent and a no-op
# once everything is migrated.
pnpm --filter @workspace/scripts run backfill:contact-source
