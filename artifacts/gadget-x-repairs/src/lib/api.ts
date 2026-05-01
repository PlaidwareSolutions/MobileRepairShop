const BASE = "/api";

async function postJson<TBody, TRes = { ok: boolean; id?: number }>(
  path: string,
  body: TBody,
): Promise<TRes> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return (await res.json()) as TRes;
}

export const submitRepairQuote = (body: unknown) =>
  postJson("/leads/repair-quote", body);
export const submitSellPhone = (body: unknown) =>
  postJson("/leads/sell-phone", body);
export const submitAppointment = (body: unknown) =>
  postJson("/leads/appointment", body);
export const submitContact = (body: unknown) => postJson("/leads/contact", body);
export const submitReservation = (body: unknown) =>
  postJson("/leads/reservation", body);

export async function fetchInventory(category?: string) {
  const url = category
    ? `${BASE}/inventory?category=${encodeURIComponent(category)}`
    : `${BASE}/inventory`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Inventory fetch failed (${res.status})`);
  return (await res.json()) as Array<Record<string, string>>;
}

function adminHeaders(password: string, contentType?: boolean): HeadersInit {
  return contentType
    ? { "Content-Type": "application/json", "X-Admin-Password": password }
    : { "X-Admin-Password": password };
}

async function adminJson<T>(
  password: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers: HeadersInit = {
    ...(init?.headers ?? {}),
    "X-Admin-Password": password,
  };
  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  if (res.status === 401) throw new Error("Wrong password");
  if (res.status === 429) {
    const t = await res.text();
    throw new Error(t || "Rate limit reached for this lead");
  }
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

// ---------------- Admin Leads ----------------

export async function adminFetchLeads(password: string) {
  return await adminJson<unknown>(password, "/admin/leads");
}

export async function adminUpdateStatus(
  password: string,
  leadType: string,
  id: number,
  status: string,
) {
  return await adminJson<{ ok: boolean; id: number }>(
    password,
    `/admin/leads/${leadType}/${id}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    },
  );
}

export type MessagingConfig = {
  emailEnabled: boolean;
  smsEnabled: boolean;
  mailFrom: string;
  smsFrom: string;
};

export async function adminMessagingConfig(password: string) {
  return await adminJson<MessagingConfig>(password, "/admin/messaging/config");
}

export type AntiSpamWindow = {
  key: string;
  days: number;
  acceptedLeads: number;
  turnstileFailures: number;
  honeypotTrips: number;
  rateLimitBlocks: number;
};

export type AntiSpamStats = { windows: AntiSpamWindow[] };

export async function adminAntiSpamStats(password: string) {
  return await adminJson<AntiSpamStats>(password, "/admin/anti-spam/stats");
}

export type LeadCommunication = {
  id: number;
  leadType: string;
  leadId: string;
  channel: "email" | "sms";
  direction: "outbound" | "inbound";
  subject: string | null;
  body: string;
  recipient: string;
  providerMessageId: string | null;
  status: string;
  error: string | null;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function adminLeadActivity(
  password: string,
  leadType: string,
  id: number,
) {
  return await adminJson<{ items: LeadCommunication[] }>(
    password,
    `/admin/leads/${leadType}/${id}/activity`,
  );
}

export async function adminMarkActivityRead(
  password: string,
  leadType: string,
  id: number,
) {
  return await adminJson<{ ok: boolean; marked: number }>(
    password,
    `/admin/leads/${leadType}/${id}/activity/read`,
    { method: "POST" },
  );
}

export type SendResult = {
  ok: boolean;
  id?: number;
  providerMessageId: string | null;
  status: "queued" | "sent" | "failed";
  error: string | null;
};

export async function adminSendEmail(
  password: string,
  leadType: string,
  id: number,
  body: { to: string; subject: string; html?: string; text?: string },
) {
  return await adminJson<SendResult>(
    password,
    `/admin/leads/${leadType}/${id}/email`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function adminSendSms(
  password: string,
  leadType: string,
  id: number,
  body: { to: string; body: string },
) {
  return await adminJson<SendResult>(
    password,
    `/admin/leads/${leadType}/${id}/sms`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

// ---------------- Admin Inventory ----------------

export type AdminInventoryItem = {
  id: string;
  category: string;
  brand: string;
  model: string;
  storage: string | null;
  color: string | null;
  condition: string | null;
  carrier: string | null;
  warranty: string | null;
  priceCents: number;
  priceDisplay: string;
  availability: "in_stock" | "on_hold" | "sold" | "hidden";
  imageUrl: string | null;
  description: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type InventoryWriteInput = {
  id?: string;
  category: string;
  brand: string;
  model: string;
  storage?: string | null;
  color?: string | null;
  condition?: string | null;
  carrier?: string | null;
  warranty?: string | null;
  priceCents: number;
  priceDisplay: string;
  availability: AdminInventoryItem["availability"];
  imageUrl?: string | null;
  description?: string | null;
  sortOrder?: number;
};

async function adminFetch(password: string, path: string, init: RequestInit = {}) {
  const headers: Record<string, string> = {
    "X-Admin-Password": password,
    ...(init.headers as Record<string, string> | undefined),
  };
  if (init.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  if (res.status === 401) throw new Error("Wrong password");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return await res.json();
}

export async function adminListInventory(password: string): Promise<{ items: AdminInventoryItem[] }> {
  return (await adminFetch(password, "/admin/inventory")) as { items: AdminInventoryItem[] };
}

export async function adminCreateInventory(password: string, body: InventoryWriteInput) {
  return (await adminFetch(password, "/admin/inventory", {
    method: "POST",
    body: JSON.stringify(body),
  })) as { ok: true; item: AdminInventoryItem };
}

export async function adminUpdateInventory(password: string, id: string, body: Partial<InventoryWriteInput>) {
  return (await adminFetch(password, `/admin/inventory/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })) as { ok: true; item: AdminInventoryItem };
}

export async function adminDeleteInventory(password: string, id: string) {
  return (await adminFetch(password, `/admin/inventory/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })) as { ok: true; id: string };
}

export async function adminReorderInventory(password: string, ids: string[]) {
  return (await adminFetch(password, "/admin/inventory/reorder", {
    method: "POST",
    body: JSON.stringify({ ids }),
  })) as { ok: true; count: number };
}

export async function adminRequestUploadUrl(password: string, file: File) {
  return (await adminFetch(password, "/admin/inventory/upload-url", {
    method: "POST",
    body: JSON.stringify({
      name: file.name,
      size: file.size,
      contentType: file.type,
    }),
  })) as { uploadURL: string; servingUrl: string };
}

/**
 * Two-step upload: ask for a presigned URL, then PUT the bytes directly to GCS.
 * Returns the public serving URL (relative path) suitable for storing on an item.
 */
export async function adminUploadImage(password: string, file: File): Promise<string> {
  const { uploadURL, servingUrl } = await adminRequestUploadUrl(password, file);
  const put = await fetch(uploadURL, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!put.ok) {
    const text = await put.text();
    throw new Error(`Upload failed (${put.status}): ${text || put.statusText}`);
  }
  return servingUrl;
}

void adminHeaders;

// ---------------- Admin Reply Templates (saved replies) ----------------

export type ReplyTemplate = {
  id: number;
  name: string;
  channel: "email" | "sms";
  leadType: string | null;
  subject: string | null;
  body: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ReplyTemplateInput = {
  name: string;
  channel: "email" | "sms";
  leadType?: string | null;
  subject?: string | null;
  body: string;
  sortOrder?: number;
};

export async function adminListReplyTemplates(password: string) {
  return await adminJson<{ items: ReplyTemplate[] }>(
    password,
    "/admin/reply-templates",
  );
}

export async function adminCreateReplyTemplate(
  password: string,
  body: ReplyTemplateInput,
) {
  return await adminJson<{ ok: boolean; item: ReplyTemplate }>(
    password,
    "/admin/reply-templates",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function adminUpdateReplyTemplate(
  password: string,
  id: number,
  body: Partial<ReplyTemplateInput>,
) {
  return await adminJson<{ ok: boolean; item: ReplyTemplate }>(
    password,
    `/admin/reply-templates/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function adminDeleteReplyTemplate(password: string, id: number) {
  return await adminJson<{ ok: boolean; id: number }>(
    password,
    `/admin/reply-templates/${id}`,
    { method: "DELETE" },
  );
}

export async function adminReorderReplyTemplates(
  password: string,
  ids: number[],
) {
  return await adminJson<{ ok: boolean; count: number }>(
    password,
    "/admin/reply-templates/reorder",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    },
  );
}

// ---------------- Public Promotions ----------------

export type PublicPromotion = {
  id: number;
  headline: string;
  supportingLine: string | null;
  badge: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  accent: "amber" | "red" | "emerald" | "blue";
};

export async function fetchActivePromotions(): Promise<PublicPromotion[]> {
  const res = await fetch(`${BASE}/promotions/active`);
  if (!res.ok) return [];
  const data = (await res.json()) as { promotions?: PublicPromotion[] };
  return Array.isArray(data.promotions) ? data.promotions : [];
}

// ---------------- Admin Promotions ----------------

export type AdminPromotion = {
  id: number;
  headline: string;
  supportingLine: string | null;
  badge: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  accent: "amber" | "red" | "emerald" | "blue";
  active: boolean;
  startsAt: string | null;
  endsAt: string | null;
  recurrence: "always" | "daily" | "weekly";
  daysOfWeek: string;
  dailyStartMinutes: number | null;
  dailyEndMinutes: number | null;
  sortOrder: number;
  status: "live" | "scheduled" | "ended" | "paused";
  createdAt: string;
  updatedAt: string;
};

export type PromotionWriteInput = {
  headline: string;
  supportingLine?: string | null;
  badge?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  accent?: AdminPromotion["accent"];
  active?: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  recurrence?: AdminPromotion["recurrence"];
  daysOfWeek?: number[];
  // The API accepts either an "HH:MM" string (which is what the admin form
  // sends straight from <input type="time">) or a number in 0..1439 (minutes
  // since local midnight); the server normalises both before persisting.
  dailyStartMinutes?: number | string | null;
  dailyEndMinutes?: number | string | null;
  sortOrder?: number;
};

export async function adminListPromotions(password: string) {
  return (await adminFetch(password, "/admin/promotions")) as {
    items: AdminPromotion[];
    shopTimezone: string;
  };
}

export async function adminCreatePromotion(
  password: string,
  body: PromotionWriteInput,
) {
  return (await adminFetch(password, "/admin/promotions", {
    method: "POST",
    body: JSON.stringify(body),
  })) as { ok: true; item: AdminPromotion };
}

export async function adminUpdatePromotion(
  password: string,
  id: number,
  body: Partial<PromotionWriteInput>,
) {
  return (await adminFetch(password, `/admin/promotions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })) as { ok: true; item: AdminPromotion };
}

export async function adminDeletePromotion(password: string, id: number) {
  return (await adminFetch(password, `/admin/promotions/${id}`, {
    method: "DELETE",
  })) as { ok: true; id: number };
}

export async function adminDuplicatePromotion(password: string, id: number) {
  return (await adminFetch(password, `/admin/promotions/${id}/duplicate`, {
    method: "POST",
  })) as { ok: true; item: AdminPromotion };
}

export async function adminReorderPromotions(password: string, ids: number[]) {
  return (await adminFetch(password, "/admin/promotions/reorder", {
    method: "POST",
    body: JSON.stringify({ ids }),
  })) as { ok: true; count: number };
}

// ---------------- Business Settings (phone / address / hours) ----------------

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
  updatedAt: string;
};

export async function fetchBusinessSettings(): Promise<PublicBusinessSettings | null> {
  try {
    const res = await fetch(`${BASE}/business-settings`);
    if (!res.ok) return null;
    const data = (await res.json()) as { settings?: PublicBusinessSettings };
    return data.settings ?? null;
  } catch {
    return null;
  }
}

export type AdminBusinessSettingsInput = {
  phoneE164?: string;
  addressLine1?: string;
  addressLine2?: string;
  mapsLink?: string;
  mapsEmbed?: string;
  hoursShort?: string;
  hoursSunday?: string;
  hoursMonday?: string;
  hoursTuesday?: string;
  hoursWednesday?: string;
  hoursThursday?: string;
  hoursFriday?: string;
  hoursSaturday?: string;
};

export async function adminGetBusinessSettings(password: string) {
  return (await adminFetch(password, "/admin/business-settings")) as {
    settings: PublicBusinessSettings;
  };
}

export async function adminUpdateBusinessSettings(
  password: string,
  body: AdminBusinessSettingsInput,
) {
  return (await adminFetch(password, "/admin/business-settings", {
    method: "PATCH",
    body: JSON.stringify(body),
  })) as { settings: PublicBusinessSettings };
}
