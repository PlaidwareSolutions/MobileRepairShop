import type { PromotionRow } from "@workspace/db";

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
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export type AdminPromotion = ReturnType<typeof serializeAdminPromotion>;
