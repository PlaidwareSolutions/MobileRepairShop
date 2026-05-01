import type { PromotionRow } from "@workspace/db";
import { isPromotionLive } from "./promotionsSchedule.js";

// Owner-facing status pill. paused = master kill switch off; ended = endsAt
// past; live = schedule currently matches; scheduled = active but not live now.
export type PromotionStatus = "live" | "scheduled" | "ended" | "paused";

export function computePromotionStatus(
  row: PromotionRow,
  now: Date = new Date(),
): PromotionStatus {
  if (!row.active) return "paused";
  if (row.endsAt && now.getTime() > row.endsAt.getTime()) return "ended";
  if (isPromotionLive(row, now)) return "live";
  return "scheduled";
}

// Public payload — only the fields the homepage banner renders. Schedule
// fields are omitted so the client can't infer paused/scheduled rows.
export function serializePublicPromotion(row: PromotionRow) {
  return {
    id: row.id,
    headline: row.headline,
    supportingLine: row.supportingLine ?? null,
    badge: row.badge ?? null,
    ctaLabel: row.ctaLabel ?? null,
    ctaHref: row.ctaHref ?? null,
    accent: row.accent,
  };
}

export type PublicPromotion = ReturnType<typeof serializePublicPromotion>;

// Admin payload — every schedule field plus timestamps and computed status.
export function serializeAdminPromotion(row: PromotionRow) {
  return {
    id: row.id,
    headline: row.headline,
    supportingLine: row.supportingLine,
    badge: row.badge,
    ctaLabel: row.ctaLabel,
    ctaHref: row.ctaHref,
    accent: row.accent,
    active: row.active,
    startsAt: row.startsAt ? row.startsAt.toISOString() : null,
    endsAt: row.endsAt ? row.endsAt.toISOString() : null,
    recurrence: row.recurrence,
    daysOfWeek: row.daysOfWeek,
    dailyStartMinutes: row.dailyStartMinutes,
    dailyEndMinutes: row.dailyEndMinutes,
    sortOrder: Number(row.sortOrder),
    status: computePromotionStatus(row),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export type AdminPromotion = ReturnType<typeof serializeAdminPromotion>;
