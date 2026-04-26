const BASE = "/api";

async function postJson<TBody, TRes = { ok: boolean; id?: number }>(path: string, body: TBody): Promise<TRes> {
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

export const submitRepairQuote = (body: unknown) => postJson("/leads/repair-quote", body);
export const submitSellPhone = (body: unknown) => postJson("/leads/sell-phone", body);
export const submitAppointment = (body: unknown) => postJson("/leads/appointment", body);
export const submitContact = (body: unknown) => postJson("/leads/contact", body);
export const submitReservation = (body: unknown) => postJson("/leads/reservation", body);

export async function fetchInventory(category?: string) {
  const url = category ? `${BASE}/inventory?category=${encodeURIComponent(category)}` : `${BASE}/inventory`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Inventory fetch failed (${res.status})`);
  return (await res.json()) as Array<Record<string, string>>;
}

export async function adminFetchLeads(password: string) {
  const res = await fetch(`${BASE}/admin/leads`, {
    headers: { "X-Admin-Password": password },
  });
  if (res.status === 401) throw new Error("Wrong password");
  if (!res.ok) throw new Error(`Failed (${res.status})`);
  return await res.json();
}

export async function adminUpdateStatus(password: string, leadType: string, id: number, status: string) {
  const res = await fetch(`${BASE}/admin/leads/${leadType}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Admin-Password": password },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Update failed (${res.status})`);
  return await res.json();
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
