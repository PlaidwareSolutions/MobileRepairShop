export function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function formatAbsolute(iso: string): string {
  return new Date(iso).toLocaleString();
}

export function normalizeUsPhone(value?: string | null): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return null;
}

export function looksLikeEmail(value?: string | null): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function pickEmail(values: Array<string | null | undefined>): string | null {
  for (const v of values) {
    if (looksLikeEmail(v ?? "")) return v as string;
  }
  return null;
}

export function whatsappLink(phone: string, text: string): string {
  const digits = (normalizeUsPhone(phone) ?? phone).replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone: string): string {
  const norm = normalizeUsPhone(phone) ?? phone;
  return `tel:${norm}`;
}

// Financing pre-qualification submissions reuse the contact-message endpoint
// but are tagged with a structured `source: "financing"` field on the lead.
// We check that field first (the source of truth), and only fall back to the
// legacy `[FINANCING PRE-QUALIFICATION ...]` body prefix for any historical
// row that pre-dates the column / backfill — that way no in-flight financing
// lead gets silently re-classified as a generic contact message.
const LEGACY_FINANCING_TAG = "[FINANCING PRE-QUALIFICATION";

export function isFinancingContactLead(lead: {
  source?: string | null;
  message?: string | null;
}): boolean {
  if (lead.source === "financing") return true;
  // Defensive fallback for legacy rows: the column was added later, and any
  // unmigrated financing lead would otherwise lose its badge & filter slot.
  const msg = lead.message;
  if (!msg) return false;
  return msg.trimStart().toUpperCase().startsWith(LEGACY_FINANCING_TAG);
}
