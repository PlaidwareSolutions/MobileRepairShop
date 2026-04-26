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
