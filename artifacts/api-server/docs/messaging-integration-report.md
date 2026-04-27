# Messaging Integration Report — gadgetxrepairs.com cutover

**Latest run:** 2026-04-27 (Task #48 re-verification, later same day after Task #51's first run)
**Target environment:** Production — `https://gadgetxrepairs.com`
**Test fixtures:**
- Test inbox: `kfnawaz@gmail.com`
- Test phone: `+1-281-745-1997` (E.164 `+12817451997`)

---

## Final verdict: **NO-GO** (unchanged from Task #51's run)

### Task #48 re-verification — what changed since Task #51 merged

| Blocker | Status as of this re-run | Owner / unblocking task |
|---|---|---|
| **D1** prod serves stale `MAIL_FROM_EMAIL=hello@nawazcoded.me` | **Still active.** `GET https://gadgetxrepairs.com/api/admin/messaging/config` still returns `mailFrom:"hello@nawazcoded.me"`. Local dev (post-restart) correctly returns `mailFrom:"support@gadgetxrepairs.com"`. So the shared env is right; production has not yet been redeployed. | Task **#54** (in progress) |
| **D2** prod serves stale `SMS_FROM_NUMBER=+13466236898` | **Still active.** Same prod config endpoint still returns `smsFrom:"+13466236898"`. Local dev returns `smsFrom:"+18443496782"`. Same root cause as D1 — pending prod redeploy. | Task **#54** (in progress, bundled with D1) |
| **D3** Telnyx profile webhook URL | **Still fixed.** `GET https://api.telnyx.com/v2/messaging_profiles/40019dcb-dc53-4eb3-a25d-a02d2c922727` returns `webhook_url: "https://gadgetxrepairs.com/api/webhooks/telnyx"`, `webhook_api_version: "2"`, `enabled: true`. No regression. | n/a — fixed |
| **D4** Resend domain `gadgetxrepairs.com` not verified | **Assumed still active.** The send-only `RESEND_API_KEY` returns `401 restricted_api_key` on `GET /v1/domains`, so the domain list cannot be inspected programmatically. No code path has changed that would make a previously-failing send succeed; the only way this clears is an operator publishing SPF/DKIM/DMARC DNS for `gadgetxrepairs.com` and clicking "Verify" in the Resend dashboard. **Did not re-attempt a live send** because (a) it would burn provider credit on a known-failing pipe, (b) Task #51 already captured the exact 403 response in evidence. | Task **#54** (operator action — same task that owns the redeploy, since redeploy without a verified domain still produces failing sends) |
| **D5** Telnyx toll-free `+18443496782` not carrier-verified | **Still active.** `GET /v2/verified_numbers` returns `total_results: 0`. `GET /v2/verifications/by_phone_number/+18443496782` returns `total_results: 0`. The toll-free is `phone_number_type: toll_free, status: active, tags: []` on the GadgetXRepairs profile — but it has no verification submission, so Aerial / T-Mobile and the other US carriers will continue to return error 40329 on every send. | Task **#55** (in progress — picks a real number for outbound; whichever number is chosen, it still needs TFN/10DLC verification before traffic flows) |
| **All four negative-signature / stale-timestamp probes** | **Still PASS** against `https://gadgetxrepairs.com`. Re-ran on 2026-04-27 during this task: Resend bad svix sig → `401 {"error":"Invalid signature"}`; Telnyx no headers → `401 {"error":"Missing signature headers"}`; Telnyx bad ed25519 sig with fresh timestamp → `401 {"error":"Invalid signature"}`; Telnyx ed25519 with timestamp `1000000000` (year 2001) → `401 {"error":"Stale timestamp"}`. Confirms `RESEND_WEBHOOK_SECRET` and `TELNYX_PUBLIC_KEY` are still present and verification logic in `webhooks.ts` is intact. | n/a — healthy |

**Net change since Task #51:** none. No blocker has been cleared, no new blocker has appeared, no regression detected. Task #54 and Task #55 (both in progress) cover everything that needs to be done by an operator before the live happy-path scenarios (#13–#19 in the matrix below) can be re-run successfully. **No new code changes were applied during Task #48** (the report itself is the deliverable). **No new follow-up tasks proposed** — the work is fully covered by #54, #55, and #22 (the unknown-sender inbound matching gap, separately tracked).

### Task #51 original run — full evidence below

Live outbound delivery to the real fixtures **failed end-to-end on both channels**:

- **Email**: Resend rejects every send because `gadgetxrepairs.com` is not a verified sending domain on the Resend account (and prod's stale `MAIL_FROM_EMAIL` would mis-brand even the failure as `hello@nawazcoded.me`).
- **SMS**: Telnyx accepts the API call and assigns a message id, then the carrier (Aerial / T-Mobile MVNO) returns error **40329 "Tollfree number is not verified"** and the message status becomes `delivery_failed`. The recipient confirmed **no SMS arrived** on `+12817451997`.

Two of the three pre-flight blockers were fixed during this run (Telnyx webhook URL via API, and `SMS_FROM_NUMBER` via shared env vars), but two new product-side blockers were uncovered (Resend domain not verified, Telnyx TFN not verified). Both new blockers can only be cleared by an operator working in the Resend and Telnyx dashboards — they are paperwork / DNS / carrier-approval issues, not code or env-var issues.

`queued → sent → delivered` status transitions and inbound reply matching could not be observed because no message was ever delivered, and because dev and prod use **separate databases** while webhooks are only routed to prod (so anything sent from dev to test the new env vars is invisible to prod's webhook handler regardless).

The Resend and Telnyx plumbing in code is intact and correct (signature verification, stale-timestamp guard, status mapping, inbound matching, auto-reopen, rate limit). The blockers are all in the deployment / provider dashboards.

---

## Scenario matrix

| # | Scenario | Status | Evidence |
|---|---|---|---|
| 1 | Pre-flight: secrets present in dev env | PASS | All seven required env vars present locally: `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`, `MAIL_FROM_EMAIL=support@gadgetxrepairs.com`, `TELNYX_API_KEY`, `TELNYX_MESSAGING_PROFILE_ID=40019dcb-dc53-4eb3-a25d-a02d2c922727`, `TELNYX_PUBLIC_KEY`, `SMS_FROM_NUMBER=+18443496782` (after this run's fix; was `+13466236898` at start). |
| 2 | Pre-flight: production reports both channels enabled | PASS | `GET https://gadgetxrepairs.com/api/admin/messaging/config` → `{"emailEnabled":true,"smsEnabled":true,...}` (200, with `x-admin-password`). |
| 3 | Pre-flight: production sender identity matches new domain | **FAIL** (D1) | At start of run and at end of run: prod still returns `mailFrom: "hello@nawazcoded.me"` and `smsFrom: "+13466236898"`. Shared env was corrected during this run (`MAIL_FROM_EMAIL=support@gadgetxrepairs.com`, `SMS_FROM_NUMBER=+18443496782`) but **prod is still serving a stale snapshot of the secrets** — a redeploy is needed for prod to pick up the new values. Local dev `/api/admin/messaging/config` does correctly report `mailFrom:"support@gadgetxrepairs.com", smsFrom:"+18443496782"` after restart, proving the env vars themselves are correct. |
| 4 | Pre-flight: Resend domain `gadgetxrepairs.com` is verified | **FAIL** (D4 — new) | Live send attempt returned `"The gadgetxrepairs.com domain is not verified. Please, add and verify your domain on https://resend.com/domains"` (HTTP 403 from Resend). The restricted send-only API key hides the domain list, but any send attempt confirms the domain isn't verified. Prod-side send (which uses the stale `nawazcoded.me`) likewise returned `"The nawazcoded.me domain is not verified."` — so neither domain is currently verified on the Resend account. |
| 5 | Pre-flight: Telnyx messaging profile + number attached | PASS | Profile `40019dcb-dc53-4eb3-a25d-a02d2c922727` ("GadgetXRepairs.com") exists, is `enabled: true`, has one US number attached: `+18443496782` (toll-free, A2P, two-way SMS+MMS). |
| 6 | Pre-flight: `SMS_FROM_NUMBER` is owned by the Telnyx account | PASS (after fix) | `SMS_FROM_NUMBER` was `+13466236898` at start of run and that number is **not present** in this Telnyx organization at all (`GET /v2/phone_numbers?filter[phone_number]=+13466236898` returns zero results). Updated the shared env var to `+18443496782` (the only Telnyx-owned number on the GadgetXRepairs profile) during this run; dev now sends from a valid, account-owned number. Prod still has the stale value pending redeploy. |
| 7 | Pre-flight: Telnyx webhook URL points at the new domain | **PASS (fixed during this run)** | At start of run, `GET /v2/messaging_profiles/40019dcb-.../` returned `webhook_url: null`. Patched the profile via `PATCH /v2/messaging_profiles/40019dcb-...` with `webhook_url=https://gadgetxrepairs.com/api/webhooks/telnyx`, `webhook_api_version=2`, ed25519 verification on. Verified afterwards that the message Telnyx accepted from this run carries `webhook_url: "https://gadgetxrepairs.com/api/webhooks/telnyx"` in its record. |
| 8 | Pre-flight: Telnyx toll-free number is **carrier-verified** for messaging | **FAIL** (D5 — new) | Telnyx `/v2/messages/40319dcc-cf62-409a-862b-3255cc0dbfd3` returned `to[0].status: "delivery_failed"` with `errors: [{code:"40329", title:"Tollfree number is not verified", detail:"Try verifying the number if you haven't already; otherwise double check that verification succeeded."}]`. The user-verifications endpoint (`/v2/verifications`) confirms organization-level verification is at level 1 (`verified_phone_number: +12817451997, verified_phone_number_at: 2026-04-12, verified_by_telnyx_at: null`) — i.e. only the org's notification number is verified; the toll-free has no submission. New TFNs are blocked at all major US carriers until the verification form is submitted and approved (typically 2–4 weeks). |
| 9 | Negative: Resend webhook rejects bogus signature | PASS | `POST https://gadgetxrepairs.com/api/webhooks/resend` with junk svix headers → `401 {"error":"Invalid signature"}`. Confirms `RESEND_WEBHOOK_SECRET` is wired up in production (otherwise this would be 500). |
| 10 | Negative: Telnyx webhook rejects missing signature | PASS | `POST .../api/webhooks/telnyx` with no headers → `401 {"error":"Missing signature headers"}`. |
| 11 | Negative: Telnyx webhook rejects bogus signature | PASS | Same path with a 64-byte all-zero ed25519 signature + fresh timestamp → `401 {"error":"Invalid signature"}`. Confirms `TELNYX_PUBLIC_KEY` is wired up in production. |
| 12 | Negative: Telnyx webhook stale-timestamp guard | PASS | Same path with `telnyx-timestamp: 1000000000` (year 2001) → `401 {"error":"Stale timestamp"}`. The 5-minute tolerance window in `webhooks.ts` is enforced. |
| 13 | Outbound email — happy path | **FAIL** | Live send via dev (`POST http://localhost:8080/api/admin/leads/repair-quote/2/email` with corrected env) returned `{"ok":false,"providerMessageId":null,"status":"failed","error":"The gadgetxrepairs.com domain is not verified."}`. The dev DB row for this attempt is at `lead_communications.id=1` with `status=failed` and the Resend error string captured. Same path against prod returned the analogous `nawazcoded.me` error, proving the stale-env regression. |
| 14 | Outbound SMS — happy path (provider-accepted) | PASS-then-FAIL | Live send via dev returned `{"ok":true,"providerMessageId":"40319dcc-cf62-409a-862b-3255cc0dbfd3","status":"queued"}` — Telnyx accepted the API call. Per Telnyx, `received_at: 2026-04-27T02:40:36.386Z`, `sent_at: 2026-04-27T02:40:36.830Z`, `completed_at: 2026-04-27T02:40:36.895Z`, final `to[0].status=delivery_failed` with error code 40329. **User confirmed no SMS arrived on +1-281-745-1997.** |
| 15 | Outbound SMS — actual delivery to handset | **FAIL** | See #14 — `delivery_failed` due to TFN not being carrier-verified. |
| 16 | Inbound email reply | NOT RUN — depends on #13 | Cannot reply to an email that was never sent. |
| 17 | Inbound SMS reply | NOT RUN — depends on #15 | Cannot reply to an SMS that never arrived. Even if a sentinel outbound row existed in prod DB to anchor matching (and one does — `repair-quotes.id=1, lead_communications.id=2, recipient=+12817451997, status=failed`), no inbound has anything to reply to. |
| 18 | Auto-reopen on reply to a `done` lead | NOT RUN — depends on #16 / #17 | Logic verified correct in `webhooks.ts`'s `maybeReopenLead`, but no live evidence collected. |
| 19 | Bounce / failure handling via webhook status callback | NOT RUN — opportunity blocked by dev/prod DB split | The dev-sent SMS (`40319dcc-...`) failed at the carrier; Telnyx will fire a `message.finalized` callback to the now-correct prod webhook URL. Prod's webhook handler will look up the `providerMessageId` in **prod DB**, find nothing (because the row lives in dev DB), and ignore. Verifying status-mapping end-to-end requires either (a) the message to be sent from prod after redeploy, or (b) the webhook URL to be temporarily pointed at the dev REPLIT_DEV_DOMAIN — neither is appropriate to do from this task. |
| 20 | Rate limit guard (6 sends in a row) | NOT RUN — would consume real provider credit on a broken pipe | `checkRateLimit` is unchanged from when it was last validated. |
| 21 | Placeholder substitution in saved replies | NOT RUN — same reason | Substitution logic unchanged. |
| 22 | Webhook entries pointing at retired `nawazcoded.me` | PASS (Telnyx) / BLOCKED (Resend) | Telnyx GadgetXRepairs profile webhook is now `https://gadgetxrepairs.com/api/webhooks/telnyx` (set during this run). Resend webhook list cannot be inspected via the restricted API key; please confirm in the dashboard that no entry still targets `nawazcoded.me`. |

---

## Defects found

| ID | Defect | Severity | Where | Fixed during this run? |
|---|---|---|---|---|
| D1 | Production deployment is serving stale `MAIL_FROM_EMAIL=hello@nawazcoded.me`. Shared env was corrected to `support@gadgetxrepairs.com` during this run, and dev confirms it works. Prod still serves the old value because the running deployment was built against the older snapshot. | **Blocker** | Replit deployment for `gadgetxrepairs.com` | Env corrected; **redeploy required** |
| D2 | Production deployment is serving stale `SMS_FROM_NUMBER=+13466236898`, a number that does not exist in the Telnyx organization. Shared env was corrected to `+18443496782` (the Telnyx-owned TFN attached to the GadgetXRepairs profile); dev confirms it works. Prod still serves the old value. | **Blocker** | Replit deployment for `gadgetxrepairs.com` | Env corrected; **redeploy required** |
| D3 | Telnyx GadgetXRepairs.com messaging profile had `webhook_url: null` and `webhook_failover_url: null`. No SMS callbacks could ever reach the api-server. | **Blocker** | Telnyx Mission Control → Messaging Profile `40019dcb-dc53-4eb3-a25d-a02d2c922727` | **Yes — fixed via Telnyx API.** Profile now points at `https://gadgetxrepairs.com/api/webhooks/telnyx` with `webhook_api_version=2` and the ed25519 signing key from `TELNYX_PUBLIC_KEY`. |
| D4 | Resend account has no verified sending domain that matches the configured `MAIL_FROM_EMAIL`. Both `gadgetxrepairs.com` (current intent) and `nawazcoded.me` (legacy) return `"domain is not verified"` on send. The send-only API key cannot list domains, so verification status must be inspected/fixed in the Resend dashboard. | **Blocker** | Resend dashboard | No — operator action only |
| D5 | Telnyx toll-free `+18443496782` is not carrier-verified for messaging. All sends from it return `delivery_failed` with error code 40329 (`"Tollfree number is not verified"`) before reaching the handset. The org-level user-verifications record shows level 1 (email + notification phone) but the TFN itself has no verification submission. | **Blocker** | Telnyx Mission Control → Messaging → Verified Numbers (10DLC/TFN verification form) | No — operator action only; carrier review typically takes 2–4 weeks after submission |

### Adjacent observation (not a defect of this task, but worth flagging)

- The public site (`artifacts/gadget-x-repairs`) places `tel:`, `sms:`, and `wa.me` links pointing at `+13466236898`, but that number is not owned by the Telnyx account at all. If the intent is for that number to be the customer-facing line, it must be ported in or purchased through Telnyx and attached to the GadgetXRepairs profile, after which `SMS_FROM_NUMBER` should be set to it (and it too must pass TFN/10DLC verification). If the intent is for `+18443496782` to be the customer-facing line, the site links should be updated to that number. Either way, today the site advertises a phone number the messaging stack cannot send from.

---

## Inline fixes applied during this run

1. **D3 fixed.** `PATCH https://api.telnyx.com/v2/messaging_profiles/40019dcb-dc53-4eb3-a25d-a02d2c922727` with body `{"webhook_url":"https://gadgetxrepairs.com/api/webhooks/telnyx","webhook_api_version":"2"}` → 200. Verified via subsequent `GET` and via the `webhook_url` field on the live message record `40319dcc-...`.
2. **D2 env corrected (deploy still pending).** Set shared env `SMS_FROM_NUMBER=+18443496782`. Restarted the local api-server workflow; `GET http://localhost:8080/api/admin/messaging/config` now reports `smsFrom:"+18443496782"`. Production will pick up the value on next redeploy.
3. **D1 env confirmed correct (deploy still pending).** Shared env already had `MAIL_FROM_EMAIL=support@gadgetxrepairs.com`. Local dev reports the correct value. Production deployment needs to be rebuilt/republished to pick it up.

D4 and D5 cannot be fixed from inside the Replit environment — they require an operator working in the Resend and Telnyx dashboards.

---

## Things that look healthy and do NOT need work

- Webhook signature verification on both channels (Resend / Svix and Telnyx ed25519) is enforced in production, including the 5-minute stale-timestamp window.
- `RESEND_WEBHOOK_SECRET` and `TELNYX_PUBLIC_KEY` are both present in production (proven by 401-not-500 on bogus payloads).
- `messaging.ts` defaults and dev env now reflect the new sender identities (`support@gadgetxrepairs.com`, `+18443496782`).
- The webhook URLs `https://gadgetxrepairs.com/api/webhooks/{resend,telnyx}` are reachable end-to-end (no DNS / cert / proxy issues).
- The Telnyx profile is correctly attached to a number, A2P-enabled, and now has its webhook callback wired in.

---

## Re-run instructions (after the remaining blockers are fixed)

1. **D4 — Resend domain verification.** In the Resend dashboard, add `gadgetxrepairs.com` as a sending domain and publish the SPF / DKIM / DMARC DNS records it requests. Wait for "Verified" status. While in the dashboard, also confirm the webhook entry points at `https://gadgetxrepairs.com/api/webhooks/resend` (signed with `RESEND_WEBHOOK_SECRET`) and remove any leftover `nawazcoded.me` entries.
2. **D5 — Telnyx TFN verification.** In Telnyx Mission Control → Messaging → Verified Numbers, submit the toll-free verification form for `+18443496782` (use case, sample messages, opt-in flow URL, business info). Wait for carrier approval — typically 2–4 weeks. Until then, all sends from this number will continue to return error 40329.
3. **D1 + D2 — Republish production.** After this task's commits are merged, redeploy `gadgetxrepairs.com` so the running deployment picks up the corrected `MAIL_FROM_EMAIL` and `SMS_FROM_NUMBER` from shared env. Verify with `curl -s -H "x-admin-password: $GX_ADMIN_PASSWORD" https://gadgetxrepairs.com/api/admin/messaging/config` — it should report `mailFrom:"support@gadgetxrepairs.com", smsFrom:"+18443496782"`.
4. **Re-run scenarios 13–19** against `kfnawaz@gmail.com` / `+12817451997` from `https://gadgetxrepairs.com/api/admin/leads/...` (so outbound rows live in prod DB and webhook callbacks land where they can be matched). For each test message, capture the Resend / Telnyx provider id, the `lead_communications` row id, and observe `queued → sent → delivered` transitions in the row over the next 30–60 seconds. Then reply from the real inbox / phone and verify a new `direction=inbound` row is appended to the same lead, and that a `status=done` lead reopens to `in_progress` on reply. Update this file with PASS evidence and flip the verdict to **GO**.

---

## Operational notes

- Tag every test message with `[GX TEST yyyy-mm-dd hh:mm]` in the subject/body so rows are easy to identify and clean up later.
- After the live test passes, mark the test lead as `archived` (not deleted) so the conversation thread remains visible in the admin UI for audit.
- All admin API calls require the `x-admin-password` header (value = `GX_ADMIN_PASSWORD`).
- Dev and production use **separate databases** (dev = `helium/heliumdb`; prod = a different host). Outbound rows created in dev are not visible to prod's webhook handler, and vice-versa. Always run the live verification against prod after a redeploy, never from dev.

---

## Test artifacts left in the databases

- **Dev DB** (`helium/heliumdb`): `repair_quotes.id=2` ("GX TEST 2026-04-27", `kfnawaz@gmail.com`, `+12817451997`); `lead_communications.id=1` (failed email — domain unverified) and `id=2` (queued SMS, Telnyx provider id `40319dcc-cf62-409a-862b-3255cc0dbfd3`, ultimately `delivery_failed` per Telnyx).
- **Prod DB**: `repair_quotes.id=1` ("GX TEST 2026-04-27 prod-side"); `lead_communications.id=1` (failed email — `nawazcoded.me` unverified) and `id=2` (failed SMS — invalid source number `+13466236898`). These rows can be archived once the post-redeploy re-run is complete.
