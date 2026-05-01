import type { PromotionRow } from "@workspace/db";
import { isPromotionLive } from "./promotionsSchedule.js";

/**
 * Computed status pill displayed to the owner in the admin list. The 4 states
 * correspond exactly to the spec's required status pills:
 *   - "paused": owner has flipped the master kill switch off.
 *   - "ended":  endsAt is set and has already passed (terminal state).
 *   - "live":   the schedule says the promo is live RIGHT NOW.
 *   - "scheduled": active and not yet ended, but not currently live (either
 *                  before startsAt, or outside the daily/weekly window). The
 *                  promo will/may go live again later.
 */
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

/**
 * Public-facing serialization. Only the fields needed to render the homepage
 * banner are exposed — schedule details and owner toggles are intentionally
 * omitted so that the client can never reveal a paused/draft promotion.
 */
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

/**
 * Admin serialization — includes every schedule field plus timestamps.
 */
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
