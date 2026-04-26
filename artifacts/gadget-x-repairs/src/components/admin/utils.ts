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
