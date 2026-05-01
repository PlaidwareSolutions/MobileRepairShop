import type { PromotionRow } from "@workspace/db";

// Shop timezone — schedule windows are evaluated in local time so weekend
// specials and "happy hour" promos work regardless of server location.
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
  /** 0..6 (Sun..Sat) */
  dayOfWeek: number;
  /** 0..1439 */
  minutesOfDay: number;
};

function localPartsInTimezone(now: Date, timezone: string): LocalParts {
  // hourCycle h23 avoids the "24" Intl quirk seen with hour12:false.
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

// True iff the promo is live now. `active` is the master kill switch.
export function isPromotionLive(
  row: PromotionRow,
  now: Date = new Date(),
  timezone: string = SHOP_TIMEZONE,
): boolean {
  if (!row.active) return false;
  if (row.startsAt && now.getTime() < row.startsAt.getTime()) return false;
  if (row.endsAt && now.getTime() > row.endsAt.getTime()) return false;
  if (row.recurrence === "always") return true;

  const { dayOfWeek, minutesOfDay } = localPartsInTimezone(now, timezone);

  if (row.recurrence === "weekly") {
    const days = parseDaysOfWeek(row.daysOfWeek);
    if (days.length === 0) return false;
    if (!days.includes(dayOfWeek)) return false;
  }

  const start = row.dailyStartMinutes;
  const end = row.dailyEndMinutes;
  if (start != null && end != null) {
    if (start <= end) {
      if (minutesOfDay < start || minutesOfDay > end) return false;
    } else {
      // Overnight wrap-around (e.g. 22:00–02:00).
      if (minutesOfDay < start && minutesOfDay > end) return false;
    }
  } else if (start != null && minutesOfDay < start) {
    return false;
  } else if (end != null && minutesOfDay > end) {
    return false;
  }
  return true;
}
