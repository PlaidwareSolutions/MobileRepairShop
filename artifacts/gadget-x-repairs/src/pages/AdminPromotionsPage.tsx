import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminNav } from "@/components/AdminNav";
import {
  adminListPromotions,
  adminCreatePromotion,
  adminUpdatePromotion,
  adminDeletePromotion,
  adminDuplicatePromotion,
  adminReorderPromotions,
  type AdminPromotion,
  type PromotionWriteInput,
  type PublicPromotion,
} from "@/lib/api";
import { PromoBannerView } from "@/components/PromoCampaignBanner";

const STATUS_PILL: Record<
  AdminPromotion["status"],
  { label: string; classes: string }
> = {
  live: {
    label: "Live now",
    classes:
      "bg-emerald-100 border-emerald-300 text-emerald-800",
  },
  scheduled: {
    label: "Scheduled",
    classes: "bg-sky-50 border-sky-200 text-sky-700",
  },
  ended: {
    label: "Ended",
    classes: "bg-zinc-100 border-zinc-300 text-zinc-600",
  },
  paused: {
    label: "Paused",
    classes: "bg-amber-50 border-amber-200 text-amber-800",
  },
};

const ACCENT_OPTIONS: { value: AdminPromotion["accent"]; label: string; swatch: string }[] = [
  { value: "amber", label: "Amber", swatch: "bg-amber-500" },
  { value: "red", label: "Red", swatch: "bg-red-600" },
  { value: "emerald", label: "Emerald", swatch: "bg-emerald-600" },
  { value: "blue", label: "Blue", swatch: "bg-sky-600" },
];

const RECURRENCE_OPTIONS: { value: AdminPromotion["recurrence"]; label: string }[] = [
  { value: "always", label: "Always on" },
  { value: "daily", label: "Daily (time window)" },
  { value: "weekly", label: "Weekly (days + time)" },
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type FormState = {
  headline: string;
  supportingLine: string;
  badge: string;
  ctaLabel: string;
  ctaHref: string;
  accent: AdminPromotion["accent"];
  active: boolean;
  recurrence: AdminPromotion["recurrence"];
  daysOfWeek: number[];
  // HTML <input type="time"> values, "HH:MM"
  dailyStart: string;
  dailyEnd: string;
  // <input type="datetime-local"> values, "YYYY-MM-DDTHH:MM" in browser local TZ
  startsAtLocal: string;
  endsAtLocal: string;
};

const EMPTY_FORM: FormState = {
  headline: "",
  supportingLine: "",
  badge: "",
  ctaLabel: "",
  ctaHref: "",
  accent: "amber",
  active: true,
  recurrence: "always",
  daysOfWeek: [],
  dailyStart: "",
  dailyEnd: "",
  startsAtLocal: "",
  endsAtLocal: "",
};

function minutesToHHMM(mins: number | null): string {
  if (mins == null) return "";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function isoToLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  // Build YYYY-MM-DDTHH:MM in the browser's local timezone (matches what
  // <input type="datetime-local"> consumes/produces).
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

function localInputToIso(value: string): string | null {
  if (!value) return null;
  // datetime-local strings have no timezone info; the Date constructor parses
  // them in the browser's local timezone, which is exactly what the owner
  // sees in the picker.
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function rowToForm(row: AdminPromotion): FormState {
  return {
    headline: row.headline,
    supportingLine: row.supportingLine ?? "",
    badge: row.badge ?? "",
    ctaLabel: row.ctaLabel ?? "",
    ctaHref: row.ctaHref ?? "",
    accent: row.accent,
    active: row.active,
    recurrence: row.recurrence,
    daysOfWeek: row.daysOfWeek
      ? row.daysOfWeek
          .split(",")
          .map((s) => Number(s.trim()))
          .filter((n) => Number.isInteger(n) && n >= 0 && n <= 6)
      : [],
    dailyStart: minutesToHHMM(row.dailyStartMinutes),
    dailyEnd: minutesToHHMM(row.dailyEndMinutes),
    startsAtLocal: isoToLocalInput(row.startsAt),
    endsAtLocal: isoToLocalInput(row.endsAt),
  };
}

function formToInput(form: FormState): PromotionWriteInput {
  const trimOrNull = (v: string) => {
    const t = v.trim();
    return t.length === 0 ? null : t;
  };
  const body: PromotionWriteInput = {
    headline: form.headline.trim(),
    supportingLine: trimOrNull(form.supportingLine),
    badge: trimOrNull(form.badge),
    ctaLabel: trimOrNull(form.ctaLabel),
    ctaHref: trimOrNull(form.ctaHref),
    accent: form.accent,
    active: form.active,
    recurrence: form.recurrence,
    startsAt: localInputToIso(form.startsAtLocal),
    endsAt: localInputToIso(form.endsAtLocal),
    // For "always" we explicitly clear schedule details so editing back to
    // "always" doesn't leave stale time/day fields lurking in the row. The
    // dailyStart/End fields here are "HH:MM" strings straight from the
    // <input type="time">; the server schema accepts both that and a numeric
    // minute offset, so no client-side conversion is needed.
    daysOfWeek: form.recurrence === "weekly" ? form.daysOfWeek : [],
    dailyStartMinutes:
      form.recurrence !== "always" && form.dailyStart ? form.dailyStart : null,
    dailyEndMinutes:
      form.recurrence !== "always" && form.dailyEnd ? form.dailyEnd : null,
  };
  return body;
}

function describeSchedule(row: AdminPromotion): string {
  const parts: string[] = [];
  if (row.recurrence === "always") parts.push("Always on");
  else if (row.recurrence === "daily") parts.push("Daily");
  else if (row.recurrence === "weekly") {
    const days = row.daysOfWeek
      ? row.daysOfWeek
          .split(",")
          .map((s) => Number(s.trim()))
          .filter((n) => Number.isInteger(n) && n >= 0 && n <= 6)
          .map((n) => DAY_LABELS[n])
          .join("/")
      : "";
    parts.push(days ? `Weekly · ${days}` : "Weekly · (no days set)");
  }
  if (
    (row.recurrence === "daily" || row.recurrence === "weekly") &&
    row.dailyStartMinutes != null &&
    row.dailyEndMinutes != null
  ) {
    parts.push(
      `${minutesToHHMM(row.dailyStartMinutes)}–${minutesToHHMM(row.dailyEndMinutes)} CT`,
    );
  }
  if (row.startsAt || row.endsAt) {
    const s = row.startsAt ? new Date(row.startsAt).toLocaleDateString() : "—";
    const e = row.endsAt ? new Date(row.endsAt).toLocaleDateString() : "—";
    parts.push(`Window ${s} → ${e}`);
  }
  return parts.join(" · ");
}

export default function AdminPromotionsPage() {
  const [password, setPassword] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("gx_admin_pw") || ""
      : "",
  );
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<AdminPromotion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<AdminPromotion | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  async function load(pw: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await adminListPromotions(pw);
      setItems(res.items);
      setAuthed(true);
      if (typeof window !== "undefined") localStorage.setItem("gx_admin_pw", pw);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (password) load(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditing(null);
    setCreating(true);
    setError(null);
  }

  function openEdit(row: AdminPromotion) {
    setForm(rowToForm(row));
    setEditing(row);
    setCreating(false);
    setError(null);
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(EMPTY_FORM);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.headline.trim()) {
      setError("Headline is required");
      return;
    }
    if (form.recurrence === "weekly" && form.daysOfWeek.length === 0) {
      setError("Pick at least one day for a weekly schedule");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const body = formToInput(form);
      if (editing) {
        await adminUpdatePromotion(password, editing.id, body);
        setInfo(`Updated "${editing.headline}"`);
      } else {
        const res = await adminCreatePromotion(password, body);
        setInfo(`Created "${res.item.headline}"`);
      }
      closeForm();
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(row: AdminPromotion) {
    if (!confirm(`Delete "${row.headline}"? This cannot be undone.`)) return;
    setError(null);
    try {
      await adminDeletePromotion(password, row.id);
      setInfo(`Deleted "${row.headline}"`);
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function onToggleActive(row: AdminPromotion) {
    setError(null);
    try {
      await adminUpdatePromotion(password, row.id, { active: !row.active });
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function onDuplicate(row: AdminPromotion) {
    setError(null);
    try {
      const res = await adminDuplicatePromotion(password, row.id);
      setInfo(`Duplicated "${row.headline}" → "${res.item.headline}" (paused)`);
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Duplicate failed");
    }
  }

  async function onMove(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= items.length) return;
    const newOrder = items.slice();
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(next, 0, moved);
    const ids = newOrder.map((i) => i.id);
    setItems(newOrder);
    try {
      await adminReorderPromotions(password, ids);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reorder failed");
      await load(password);
    }
  }

  function toggleDay(d: number) {
    setForm((f) => {
      const has = f.daysOfWeek.includes(d);
      const next = has
        ? f.daysOfWeek.filter((n) => n !== d)
        : [...f.daysOfWeek, d].sort((a, b) => a - b);
      return { ...f, daysOfWeek: next };
    });
  }

  return (
    <PageShell hideTicker>
      <SEO
        title="Admin · Promotions | Gadget X"
        description="Admin promotions management"
        path="/admin/promotions"
        noindex
      />
      <section className="py-12 px-4 bg-zinc-50 border-b border-zinc-200 min-h-[80vh]">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
            Admin <span className="text-red-500">Promotions</span>
          </h1>

          {authed && <AdminNav active="promotions" />}

          {!authed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                load(password);
              }}
              className="bg-white border border-zinc-200 rounded-xl shadow-md p-6 max-w-md space-y-4"
              data-testid="form-admin-login"
            >
              <Label
                htmlFor="ad-pw"
                className="font-semibold uppercase text-xs tracking-wide text-zinc-700"
              >
                Admin password
              </Label>
              <Input
                id="ad-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                data-testid="input-password"
              />
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold uppercase tracking-wide h-12 shadow-sm"
                data-testid="button-login"
              >
                {loading ? "..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <Button
                  onClick={openCreate}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold uppercase tracking-wide h-10 shadow-sm"
                  data-testid="button-new-promotion"
                >
                  + New Promotion
                </Button>
                <button
                  onClick={() => load(password)}
                  className="px-4 py-2 font-semibold uppercase text-sm tracking-wide border rounded-lg bg-white border-zinc-200 text-zinc-600 hover:border-red-500 hover:text-red-600"
                  data-testid="button-refresh"
                >
                  Refresh
                </button>
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 ml-auto">
                  {items.length} promo{items.length === 1 ? "" : "s"} · times in
                  Houston (CT)
                </span>
              </div>

              {error && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm mb-4"
                  data-testid="error-banner"
                >
                  {error}
                </div>
              )}
              {info && (
                <div
                  className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg font-semibold text-sm mb-4"
                  data-testid="info-banner"
                >
                  {info}
                </div>
              )}

              {(creating || editing) && (
                <PromotionFormCard
                  title={creating ? "New promotion" : `Edit “${editing?.headline}”`}
                  form={form}
                  setForm={setForm}
                  isEdit={!!editing}
                  submitting={submitting}
                  onClose={closeForm}
                  onSubmit={onSubmit}
                  toggleDay={toggleDay}
                />
              )}

              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-zinc-600 uppercase text-[10px] tracking-wide font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="text-left px-3 py-3">Order</th>
                      <th className="text-left px-3 py-3">Promo</th>
                      <th className="text-left px-3 py-3">Schedule</th>
                      <th className="text-left px-3 py-3">Status</th>
                      <th className="text-left px-3 py-3">Toggle</th>
                      <th className="text-right px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-12 text-center font-semibold text-zinc-500 uppercase tracking-wide"
                        >
                          No promotions yet
                        </td>
                      </tr>
                    )}
                    {items.map((row, i) => (
                      <tr
                        key={row.id}
                        className="border-t border-zinc-100 hover:bg-zinc-50/60"
                        data-testid={`admin-promotion-row-${row.id}`}
                      >
                        <td className="px-3 py-2 align-middle">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => onMove(i, -1)}
                              disabled={i === 0}
                              className="text-zinc-500 hover:text-red-600 disabled:opacity-30 font-semibold text-xs"
                              data-testid={`button-up-${row.id}`}
                              aria-label="Move up"
                            >
                              ▲
                            </button>
                            <button
                              onClick={() => onMove(i, 1)}
                              disabled={i === items.length - 1}
                              className="text-zinc-500 hover:text-red-600 disabled:opacity-30 font-semibold text-xs"
                              data-testid={`button-down-${row.id}`}
                              aria-label="Move down"
                            >
                              ▼
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className={`inline-block w-3 h-3 rounded-full shrink-0 ${
                                ACCENT_OPTIONS.find((a) => a.value === row.accent)
                                  ?.swatch ?? "bg-zinc-300"
                              }`}
                              title={`Accent: ${row.accent}`}
                            />
                            <div className="font-semibold text-zinc-900 text-base">
                              {row.headline}
                            </div>
                          </div>
                          {row.supportingLine && (
                            <div className="text-[12px] text-zinc-600 mt-0.5">
                              {row.supportingLine}
                            </div>
                          )}
                          <div className="text-[11px] text-zinc-500 mt-1 font-mono">
                            {row.badge ? `[${row.badge}] ` : ""}
                            {row.ctaLabel
                              ? `→ ${row.ctaLabel} (${row.ctaHref || "no href"})`
                              : ""}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-[12px] text-zinc-700 align-top">
                          {describeSchedule(row)}
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                              STATUS_PILL[row.status].classes
                            }`}
                            data-testid={`status-${row.id}`}
                          >
                            {STATUS_PILL[row.status].label}
                          </span>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <button
                            onClick={() => onToggleActive(row)}
                            className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border transition-colors ${
                              row.active
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                            }`}
                            data-testid={`button-toggle-${row.id}`}
                          >
                            {row.active ? "On" : "Paused"}
                          </button>
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          <button
                            onClick={() => openEdit(row)}
                            className="text-red-600 hover:text-red-700 font-semibold text-xs uppercase tracking-wide mr-3"
                            data-testid={`button-edit-${row.id}`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDuplicate(row)}
                            className="text-sky-600 hover:text-sky-700 font-semibold text-xs uppercase tracking-wide mr-3"
                            data-testid={`button-duplicate-${row.id}`}
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => onDelete(row)}
                            className="text-zinc-500 hover:text-red-600 font-semibold text-xs uppercase tracking-wide"
                            data-testid={`button-delete-${row.id}`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}

type FormCardProps = {
  title: string;
  form: FormState;
  setForm: (updater: (prev: FormState) => FormState) => void;
  isEdit: boolean;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  toggleDay: (d: number) => void;
};

function PromotionFormCard({
  title,
  form,
  setForm,
  submitting,
  onClose,
  onSubmit,
  toggleDay,
}: FormCardProps) {
  const showTimeOfDay =
    form.recurrence === "daily" || form.recurrence === "weekly";
  const showDays = form.recurrence === "weekly";

  // Build a synthetic public-promo object that mirrors what the homepage
  // banner would receive for these form values. id is a stable sentinel so
  // the preview's React keys don't churn on every keystroke.
  const previewPromo: PublicPromotion = {
    id: -1,
    headline: form.headline.trim() || "Your headline appears here",
    supportingLine: form.supportingLine.trim() || null,
    badge: form.badge.trim() || null,
    ctaLabel: form.ctaLabel.trim() || null,
    ctaHref: form.ctaHref.trim() || null,
    accent: form.accent,
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 mb-6 space-y-5"
      data-testid="form-promotion"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-500 hover:text-red-600 font-semibold text-xs uppercase tracking-wide"
        >
          Close
        </button>
      </div>

      <div>
        <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700 mb-2 block">
          Live preview (as customers will see it)
        </Label>
        <div
          className="rounded-lg overflow-hidden border border-zinc-200 shadow-inner relative"
          data-testid="promo-form-preview"
        >
          <PromoBannerView promo={previewPromo} />
        </div>
        <p className="text-[11px] text-zinc-500 mt-1.5">
          Updates as you type. Badge has a subtle pulse on the live site.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
            Headline *
          </Label>
          <Input
            value={form.headline}
            onChange={(e) =>
              setForm((f) => ({ ...f, headline: e.target.value }))
            }
            maxLength={160}
            className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
            data-testid="input-headline"
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
            Supporting line
          </Label>
          <Textarea
            value={form.supportingLine}
            onChange={(e) =>
              setForm((f) => ({ ...f, supportingLine: e.target.value }))
            }
            maxLength={280}
            rows={2}
            className="bg-white border border-zinc-200 focus:border-red-500 mt-1"
            data-testid="input-supporting"
          />
        </div>
        <div>
          <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
            Badge
          </Label>
          <Input
            value={form.badge}
            onChange={(e) =>
              setForm((f) => ({ ...f, badge: e.target.value }))
            }
            maxLength={40}
            placeholder="e.g. LIMITED"
            className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
            data-testid="input-badge"
          />
        </div>
        <div>
          <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
            Accent color
          </Label>
          <div className="flex gap-2 mt-1">
            {ACCENT_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() =>
                  setForm((f) => ({ ...f, accent: opt.value }))
                }
                className={`flex items-center gap-2 px-3 h-11 rounded-md border font-semibold text-xs uppercase tracking-wide ${
                  form.accent === opt.value
                    ? "border-zinc-900 ring-2 ring-red-300"
                    : "border-zinc-200 hover:border-red-300"
                }`}
                data-testid={`button-accent-${opt.value}`}
              >
                <span
                  className={`inline-block w-4 h-4 rounded-full ${opt.swatch}`}
                />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
            CTA label
          </Label>
          <Input
            value={form.ctaLabel}
            onChange={(e) =>
              setForm((f) => ({ ...f, ctaLabel: e.target.value }))
            }
            maxLength={40}
            placeholder="e.g. Book now"
            className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
            data-testid="input-cta-label"
          />
        </div>
        <div>
          <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
            CTA URL
          </Label>
          <Input
            value={form.ctaHref}
            onChange={(e) =>
              setForm((f) => ({ ...f, ctaHref: e.target.value }))
            }
            maxLength={500}
            placeholder="/contact-houston-tx"
            className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
            data-testid="input-cta-href"
          />
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-5">
        <h3 className="font-semibold uppercase text-xs tracking-wide text-zinc-700 mb-3">
          Schedule (Houston / America/Chicago)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
              Recurrence
            </Label>
            <select
              value={form.recurrence}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  recurrence: e.target.value as AdminPromotion["recurrence"],
                }))
              }
              className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1 w-full rounded-md px-3 font-medium text-sm"
              data-testid="select-recurrence"
            >
              {RECURRENCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 font-semibold text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm((f) => ({ ...f, active: e.target.checked }))
                }
                className="w-4 h-4 accent-red-600"
                data-testid="checkbox-active"
              />
              Active (master toggle)
            </label>
          </div>

          {showDays && (
            <div className="md:col-span-2">
              <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                Days of week
              </Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {DAY_LABELS.map((label, idx) => {
                  const checked = form.daysOfWeek.includes(idx);
                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => toggleDay(idx)}
                      className={`px-3 h-10 rounded-md border font-semibold text-xs uppercase tracking-wide ${
                        checked
                          ? "bg-red-500 border-red-500 text-white"
                          : "bg-white border-zinc-200 text-zinc-700 hover:border-red-300"
                      }`}
                      data-testid={`button-day-${idx}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {showTimeOfDay && (
            <>
              <div>
                <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                  Time-of-day start (CT)
                </Label>
                <Input
                  type="time"
                  value={form.dailyStart}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dailyStart: e.target.value }))
                  }
                  className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
                  data-testid="input-time-start"
                />
              </div>
              <div>
                <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                  Time-of-day end (CT)
                </Label>
                <Input
                  type="time"
                  value={form.dailyEnd}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dailyEnd: e.target.value }))
                  }
                  className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
                  data-testid="input-time-end"
                />
              </div>
            </>
          )}

          <div>
            <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
              Window start (optional)
            </Label>
            <Input
              type="datetime-local"
              value={form.startsAtLocal}
              onChange={(e) =>
                setForm((f) => ({ ...f, startsAtLocal: e.target.value }))
              }
              className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
              data-testid="input-starts-at"
            />
          </div>
          <div>
            <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
              Window end (optional)
            </Label>
            <Input
              type="datetime-local"
              value={form.endsAtLocal}
              onChange={(e) =>
                setForm((f) => ({ ...f, endsAtLocal: e.target.value }))
              }
              className="bg-white border border-zinc-200 focus:border-red-500 h-11 mt-1"
              data-testid="input-ends-at"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold uppercase tracking-wide h-11 shadow-sm"
          data-testid="button-save"
        >
          {submitting ? "Saving..." : "Save promotion"}
        </Button>
        <Button
          type="button"
          onClick={onClose}
          className="bg-white text-zinc-700 border border-zinc-200 hover:border-red-300 font-semibold uppercase tracking-wide h-11"
          data-testid="button-cancel"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
