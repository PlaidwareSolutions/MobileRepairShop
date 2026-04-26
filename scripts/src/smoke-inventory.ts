/**
 * Tiny end-to-end smoke test for the inventory endpoints. Run while the
 * api-server is up:
 *
 *   GX_ADMIN_PASSWORD=... pnpm --filter @workspace/scripts exec tsx ./src/smoke-inventory.ts
 *
 * It exercises the public inventory route plus the admin reorder
 * guardrails (duplicate ids → 400, unknown ids → 400, valid → 200) and
 * a create/delete round trip. Exits non-zero on the first failure so it
 * can also be wired into CI.
 */

const BASE = process.env.SMOKE_API_URL ?? "http://localhost:8080/api";
const PASSWORD = process.env.GX_ADMIN_PASSWORD;
if (!PASSWORD) {
  console.error("GX_ADMIN_PASSWORD is required");
  process.exit(1);
}

let failures = 0;

async function expect(label: string, actual: unknown, expected: unknown): Promise<void> {
  const ok = actual === expected;
  console.log(`${ok ? "OK  " : "FAIL"}  ${label}: got=${JSON.stringify(actual)} want=${JSON.stringify(expected)}`);
  if (!ok) failures += 1;
}

async function request(path: string, init: RequestInit = {}) {
  const headers: Record<string, string> = {
    "X-Admin-Password": PASSWORD!,
    ...(init.headers as Record<string, string> | undefined),
  };
  if (init.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* ignore */
  }
  return { status: res.status, body };
}

async function main() {
  // 1. Public inventory returns an array (possibly empty, never falls through to 5xx).
  const pub = await request("/inventory");
  await expect("GET /inventory status", pub.status, 200);
  await expect("GET /inventory body is array", Array.isArray(pub.body), true);

  // 2. Reorder with duplicate ids should be rejected at schema level.
  const dup = await request("/admin/inventory/reorder", {
    method: "POST",
    body: JSON.stringify({ ids: ["dup", "dup"] }),
  });
  await expect("reorder duplicates rejected", dup.status, 400);

  // 3. Reorder referencing an unknown id should be rejected with a missing list.
  const unknown = await request("/admin/inventory/reorder", {
    method: "POST",
    body: JSON.stringify({ ids: ["__definitely_does_not_exist__"] }),
  });
  await expect("reorder unknown id rejected", unknown.status, 400);

  // 4. Create -> delete round trip.
  const created = await request("/admin/inventory", {
    method: "POST",
    body: JSON.stringify({
      category: "SmokeTest",
      brand: "Smoke",
      model: `Test ${Date.now()}`,
      priceCents: 100,
      priceDisplay: "$1",
      availability: "hidden",
    }),
  });
  await expect("admin create status", created.status, 201);
  const createdId = (created.body as { item?: { id?: string } } | null)?.item?.id;
  if (!createdId) {
    console.error("FAIL  could not obtain created id");
    failures += 1;
  } else {
    const reorderValid = await request("/admin/inventory/reorder", {
      method: "POST",
      body: JSON.stringify({ ids: [createdId] }),
    });
    await expect("reorder valid id status", reorderValid.status, 200);

    const del = await request(`/admin/inventory/${encodeURIComponent(createdId)}`, {
      method: "DELETE",
    });
    await expect("admin delete status", del.status, 200);
  }

  // 5. Wrong password is rejected.
  const badAuth = await fetch(`${BASE}/admin/inventory`, {
    headers: { "X-Admin-Password": "obviously-wrong" },
  });
  await expect("admin auth rejection", badAuth.status, 401);

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed`);
    process.exit(1);
  }
  console.log("\nAll inventory smoke checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
