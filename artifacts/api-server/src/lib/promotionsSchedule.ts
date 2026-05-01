import type { PromotionRow } from "@workspace/db";

// All schedule evaluation happens in the shop's local timezone so that, e.g.,
// "weekend specials" or "happy hour 4-7pm" do the right thing for customers
// regardless of where the API server is physically running. The shop is in
// Houston, TX, so we use America/Chicago.
export const SHOP_TIMEZONE = "America/Chicago";

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

type LocalParts = {
  /** Day of week 0..6 (Sun..Sat) in the shop timezone. */
  dayOfWeek: number;
  /** Minutes since local midnight 0..1439 in the shop timezone. */
  minutesOfDay: number;
};

function localPartsInTimezone(now: Date, timezone: string): LocalParts {
  // hourCycle: "h23" → hour ranges 00..23 (avoids the "24" Intl quirk that
  // some engines emit when hour12 is false).
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
  });
  const parts = fmt.formatToParts(now);
  const weekdayShort = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return {
    dayOfWeek: WEEKDAY_INDEX[weekdayShort] ?? 0,
    minutesOfDay: hour * 60 + minute,
  };
}

function parseDaysOfWeek(csv: string | null | undefined): number[] {
  if (!csv) return [];
  return csv
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isInteger(n) && n >= 0 && n <= 6);
}

/**
 * Returns true iff the promotion is currently live according to its schedule.
 * The "owner toggle" (`active`) is treated as the master kill switch: if it's
 * off, the promotion is never returned regardless of any other field.
 */
export function isPromotionLive(
  row: PromotionRow,
  now: Date = new Date(),
  timezone: string = SHOP_TIMEZONE,
): boolean {
  if (!row.active) return false;

  // Optional absolute date window (UTC) — applies to all recurrence types.
  if (row.startsAt && now.getTime() < row.startsAt.getTime()) return false;
  if (row.endsAt && now.getTime() > row.endsAt.getTime()) return false;

  if (row.recurrence === "always") return true;

  const { dayOfWeek, minutesOfDay } = localPartsInTimezone(now, timezone);

  if (row.recurrence === "weekly") {
    const days = parseDaysOfWeek(row.daysOfWeek);
    // No days selected for a weekly schedule = nothing is ever live. Owner UI
    // requires at least one day, but defend the API too.
    if (days.length === 0) return false;
    if (!days.includes(dayOfWeek)) return false;
  }

  // Time-of-day window applies to both daily and weekly. NULL on either bound
  // means "no constraint on that side".
  const start = row.dailyStartMinutes;
  const end = row.dailyEndMinutes;

  if (start != null && end != null) {
    if (start <= end) {
      // Same-day window, e.g. 09:00–21:00.
      if (minutesOfDay < start || minutesOfDay > end) return false;
    } else {
      // Wrap-around window, e.g. 22:00–02:00 (overnight).
      if (minutesOfDay < start && minutesOfDay > end) return false;
    }
  } else if (start != null && minutesOfDay < start) {
    return false;
  } else if (end != null && minutesOfDay > end) {
    return false;
  }

  return true;
}
