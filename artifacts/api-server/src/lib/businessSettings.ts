import { db, businessSettingsTable, type BusinessSettingsRow } from "@workspace/db";
import { eq } from "drizzle-orm";

// The single business-settings row is keyed by id=1. There is exactly one
// shop, so we don't expose a list/create API — just GET (with auto-seed of
// the default row on first read) and PATCH.
const SETTINGS_ROW_ID = 1;

// Defaults match the legacy hard-coded values that used to live in
// content.ts. They are used to seed the row on first read so the admin form
// always has something to edit and the public endpoint never returns 404.
const DEFAULT_SETTINGS: Omit<BusinessSettingsRow, "updatedAt"> = {
  id: SETTINGS_ROW_ID,
  phoneE164: "+13466236898",
  addressLine1: "8389 Almeda Rd, Suite J-2",
  addressLine2: "Houston, TX 77054",
  mapsLink: "https://maps.app.goo.gl/ALRF73zPbrG9qndz8",
  mapsEmbed:
    "https://maps.google.com/maps?q=8389%20Almeda%20Rd%20Suite%20J-2%20Houston%20TX%2077054&t=&z=15&ie=UTF8&iwloc=&output=embed",
  hoursShort: "Sun 12–5 PM | Mon–Sat 10 AM–7 PM",
  hoursSunday: "12:00 PM – 5:00 PM",
  hoursMonday: "10:00 AM – 7:00 PM",
  hoursTuesday: "10:00 AM – 7:00 PM",
  hoursWednesday: "10:00 AM – 7:00 PM",
  hoursThursday: "10:00 AM – 7:00 PM",
  hoursFriday: "10:00 AM – 7:00 PM",
  hoursSaturday: "10:00 AM – 7:00 PM",
  socialFacebook: null,
  socialInstagram: null,
  socialTiktok: null,
  socialYoutube: null,
  socialX: null,
};

/**
 * Read the single settings row. If it doesn't exist yet, insert the default
 * row first so subsequent reads (and admin PATCHes) always have something to
 * mutate. Concurrent first-read calls race-insert is handled with onConflict
 * doNothing — Postgres will simply ignore the duplicate insert and we re-
 * select the existing row.
 */
export async function getBusinessSettings(): Promise<BusinessSettingsRow> {
  const existing = await db
    .select()
    .from(businessSettingsTable)
    .where(eq(businessSettingsTable.id, SETTINGS_ROW_ID))
    .limit(1);
  if (existing.length > 0) return existing[0];

  await db
    .insert(businessSettingsTable)
    .values(DEFAULT_SETTINGS)
    .onConflictDoNothing({ target: businessSettingsTable.id });

  const [row] = await db
    .select()
    .from(businessSettingsTable)
    .where(eq(businessSettingsTable.id, SETTINGS_ROW_ID))
    .limit(1);
  return row;
}

export async function updateBusinessSettings(
  patch: Partial<Omit<BusinessSettingsRow, "id" | "updatedAt">>,
): Promise<BusinessSettingsRow> {
  // Ensure the row exists before patching — first call would otherwise PATCH
  // zero rows and silently no-op.
  await getBusinessSettings();
  const [row] = await db
    .update(businessSettingsTable)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(businessSettingsTable.id, SETTINGS_ROW_ID))
    .returning();
  return row;
}

// --- serializers ---

// Format an E.164 number ("+13466236898") into a human-friendly display
// ("+1 (346) 623-6898"). Falls back to the raw value for non-NANP numbers
// so we never crash on an unexpected country code.
function formatPhoneDisplay(e164: string): string {
  const m = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164);
  if (!m) return e164;
  return `+1 (${m[1]}) ${m[2]}-${m[3]}`;
}

// Normalize a social URL field: empty string and null both become null so the
// public API has a consistent signal for "not configured".
function normalizeSocialUrl(val: string | null | undefined): string | null {
  if (!val || val.trim() === "") return null;
  return val.trim();
}

export type PublicBusinessSettings = {
  phoneE164: string;
  phoneDisplay: string;
  phoneTel: string;
  smsHref: string;
  whatsappHref: string;
  addressLine1: string;
  addressLine2: string;
  addressFull: string;
  mapsLink: string;
  mapsEmbed: string;
  hoursShort: string;
  hours: { day: string; time: string }[];
  socialFacebook: string | null;
  socialInstagram: string | null;
  socialTiktok: string | null;
  socialYoutube: string | null;
  socialX: string | null;
  updatedAt: string;
};

export function serializePublicBusinessSettings(
  row: BusinessSettingsRow,
): PublicBusinessSettings {
  const digits = row.phoneE164.replace(/^\+/, "");
  return {
    phoneE164: row.phoneE164,
    phoneDisplay: formatPhoneDisplay(row.phoneE164),
    phoneTel: `tel:${row.phoneE164}`,
    smsHref: `sms:${row.phoneE164}`,
    whatsappHref: `https://wa.me/${digits}`,
    addressLine1: row.addressLine1,
    addressLine2: row.addressLine2,
    addressFull: `${row.addressLine1}, ${row.addressLine2}`,
    mapsLink: row.mapsLink,
    mapsEmbed: row.mapsEmbed,
    hoursShort: row.hoursShort,
    hours: [
      { day: "Sunday", time: row.hoursSunday },
      { day: "Monday", time: row.hoursMonday },
      { day: "Tuesday", time: row.hoursTuesday },
      { day: "Wednesday", time: row.hoursWednesday },
      { day: "Thursday", time: row.hoursThursday },
      { day: "Friday", time: row.hoursFriday },
      { day: "Saturday", time: row.hoursSaturday },
    ],
    socialFacebook: normalizeSocialUrl(row.socialFacebook),
    socialInstagram: normalizeSocialUrl(row.socialInstagram),
    socialTiktok: normalizeSocialUrl(row.socialTiktok),
    socialYoutube: normalizeSocialUrl(row.socialYoutube),
    socialX: normalizeSocialUrl(row.socialX),
    updatedAt: row.updatedAt.toISOString(),
  };
}
