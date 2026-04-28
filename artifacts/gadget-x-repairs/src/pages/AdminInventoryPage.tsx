import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminNav } from "@/components/AdminNav";
import {
  adminListInventory,
  adminCreateInventory,
  adminUpdateInventory,
  adminDeleteInventory,
  adminReorderInventory,
  adminUploadImage,
  type AdminInventoryItem,
  type InventoryWriteInput,
} from "@/lib/api";

const AVAILABILITY_OPTIONS: { value: AdminInventoryItem["availability"]; label: string }[] = [
  { value: "in_stock", label: "In stock" },
  { value: "on_hold", label: "On hold" },
  { value: "sold", label: "Sold" },
  { value: "hidden", label: "Hidden" },
];

const AVAILABILITY_BADGE: Record<AdminInventoryItem["availability"], string> = {
  in_stock: "border-red-200 text-red-600 bg-red-50",
  on_hold: "border-orange-200 text-orange-600 bg-orange-50",
  sold: "border-zinc-200 text-zinc-600 bg-zinc-50",
  hidden: "border-zinc-200 text-zinc-500 bg-zinc-50",
};

type FormState = {
  id: string;
  category: string;
  brand: string;
  model: string;
  storage: string;
  color: string;
  condition: string;
  carrier: string;
  warranty: string;
  priceDisplay: string;
  priceCents: string;
  availability: AdminInventoryItem["availability"];
  imageUrl: string;
  description: string;
};

const EMPTY_FORM: FormState = {
  id: "",
  category: "",
  brand: "",
  model: "",
  storage: "",
  color: "",
  condition: "",
  carrier: "",
  warranty: "",
  priceDisplay: "",
  priceCents: "",
  availability: "in_stock",
  imageUrl: "",
  description: "",
};

function dollarsToCents(input: string): number {
  const n = Number(input.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

function centsToDollarsString(cents: number): string {
  return (cents / 100).toFixed(2).replace(/\.00$/, "");
}

function rowToForm(item: AdminInventoryItem): FormState {
  return {
    id: item.id,
    category: item.category,
    brand: item.brand,
    model: item.model,
    storage: item.storage ?? "",
    color: item.color ?? "",
    condition: item.condition ?? "",
    carrier: item.carrier ?? "",
    warranty: item.warranty ?? "",
    priceDisplay: item.priceDisplay,
    priceCents: centsToDollarsString(item.priceCents),
    availability: item.availability,
    imageUrl: item.imageUrl ?? "",
    description: item.description ?? "",
  };
}

function formToInput(form: FormState, includeId: boolean): InventoryWriteInput {
  const priceCents = dollarsToCents(form.priceCents || form.priceDisplay);
  const trimOrNull = (v: string) => {
    const t = v.trim();
    return t.length === 0 ? null : t;
  };
  const data: InventoryWriteInput = {
    category: form.category.trim(),
    brand: form.brand.trim(),
    model: form.model.trim(),
    storage: trimOrNull(form.storage),
    color: trimOrNull(form.color),
    condition: trimOrNull(form.condition),
    carrier: trimOrNull(form.carrier),
    warranty: trimOrNull(form.warranty),
    priceCents,
    priceDisplay: form.priceDisplay.trim() || `$${centsToDollarsString(priceCents)}`,
    availability: form.availability,
    imageUrl: trimOrNull(form.imageUrl),
    description: trimOrNull(form.description),
  };
  if (includeId && form.id.trim()) data.id = form.id.trim();
  return data;
}

export default function AdminInventoryPage() {
  const [password, setPassword] = useState(typeof window !== "undefined" ? localStorage.getItem("gx_admin_pw") || "" : "");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<AdminInventoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<AdminInventoryItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function load(pw: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await adminListInventory(pw);
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

  function openEdit(item: AdminInventoryItem) {
    setForm(rowToForm(item));
    setEditing(item);
    setCreating(false);
    setError(null);
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(EMPTY_FORM);
  }

  async function onUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const url = await adminUploadImage(password, file);
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (editing) {
        const body = formToInput(form, false);
        await adminUpdateInventory(password, editing.id, body);
        setInfo(`Updated "${editing.id}"`);
      } else {
        const body = formToInput(form, true);
        const res = await adminCreateInventory(password, body);
        setInfo(`Created "${res.item.id}"`);
      }
      closeForm();
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(item: AdminInventoryItem) {
    if (!confirm(`Delete "${item.brand} ${item.model}" (${item.id})? This cannot be undone.`)) return;
    setError(null);
    try {
      await adminDeleteInventory(password, item.id);
      setInfo(`Deleted "${item.id}"`);
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function onChangeAvailability(item: AdminInventoryItem, value: AdminInventoryItem["availability"]) {
    setError(null);
    try {
      await adminUpdateInventory(password, item.id, { availability: value });
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
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
      await adminReorderInventory(password, ids);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reorder failed");
      await load(password);
    }
  }

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))).sort(), [items]);

  return (
    <PageShell hideTicker>
      <SEO title="Admin · Inventory | Gadget X" description="Admin inventory management" path="/admin/inventory" noindex />
      <section className="py-12 px-4 bg-zinc-50 border-b border-zinc-200 min-h-[80vh]">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
            Admin <span className="text-red-500">Inventory</span>
          </h1>

          {authed && <AdminNav active="inventory" />}

          {!authed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                load(password);
              }}
              className="bg-white border border-zinc-200 rounded-xl shadow-md p-6 max-w-md space-y-4"
              data-testid="form-admin-login"
            >
              <Label htmlFor="ad-pw" className="font-semibold uppercase text-xs tracking-wide text-zinc-700">Admin password</Label>
              <Input
                id="ad-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                data-testid="input-password"
              />
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm">{error}</div>}
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
                  data-testid="button-new-item"
                >
                  + New Item
                </Button>
                <button
                  onClick={() => load(password)}
                  className="px-4 py-2 font-semibold uppercase text-sm tracking-wide border rounded-lg bg-white border-zinc-200 text-zinc-600 hover:border-red-500 hover:text-red-600"
                  data-testid="button-refresh"
                >
                  Refresh
                </button>
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 ml-auto">
                  {items.length} item{items.length === 1 ? "" : "s"}
                </span>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm mb-4" data-testid="error-banner">{error}</div>}
              {info && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg font-semibold text-sm mb-4" data-testid="info-banner">{info}</div>}

              {(creating || editing) && (
                <InventoryFormCard
                  title={creating ? "New item" : `Edit ${editing?.id}`}
                  form={form}
                  setForm={setForm}
                  isEdit={!!editing}
                  categories={categories}
                  uploading={uploading}
                  submitting={submitting}
                  onClose={closeForm}
                  onUpload={onUpload}
                  onSubmit={onSubmitForm}
                />
              )}

              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-zinc-600 uppercase text-[10px] tracking-wide font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="text-left px-3 py-3">Order</th>
                      <th className="text-left px-3 py-3">Image</th>
                      <th className="text-left px-3 py-3">Item</th>
                      <th className="text-left px-3 py-3">Category</th>
                      <th className="text-left px-3 py-3">Price</th>
                      <th className="text-left px-3 py-3">Availability</th>
                      <th className="text-right px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 && (
                      <tr><td colSpan={7} className="px-4 py-12 text-center font-semibold text-zinc-500 uppercase tracking-wide">No items yet</td></tr>
                    )}
                    {items.map((it, i) => (
                      <tr key={it.id} className="border-t border-zinc-100 hover:bg-zinc-50/60" data-testid={`admin-inventory-row-${it.id}`}>
                        <td className="px-3 py-2 align-middle">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => onMove(i, -1)}
                              disabled={i === 0}
                              className="text-zinc-500 hover:text-red-600 disabled:opacity-30 font-semibold text-xs"
                              data-testid={`button-up-${it.id}`}
                              aria-label="Move up"
                            >▲</button>
                            <button
                              onClick={() => onMove(i, 1)}
                              disabled={i === items.length - 1}
                              className="text-zinc-500 hover:text-red-600 disabled:opacity-30 font-semibold text-xs"
                              data-testid={`button-down-${it.id}`}
                              aria-label="Move down"
                            >▼</button>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          {it.imageUrl ? (
                            <img src={it.imageUrl} alt="" className="w-16 h-12 object-cover rounded-md border border-zinc-200" />
                          ) : (
                            <div className="w-16 h-12 bg-zinc-50 border border-zinc-200 rounded-md flex items-center justify-center text-[10px] text-zinc-500 uppercase tracking-wide">No img</div>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-semibold text-zinc-900 text-base">{it.brand} {it.model}</div>
                          <div className="text-[11px] text-zinc-500 font-mono">{it.id}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">
                            {[it.storage, it.color, it.condition, it.carrier].filter(Boolean).join(" · ")}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-zinc-600 text-xs uppercase tracking-wide font-semibold">{it.category}</td>
                        <td className="px-3 py-2 font-semibold text-red-600">{it.priceDisplay}</td>
                        <td className="px-3 py-2">
                          <select
                            value={it.availability}
                            onChange={(e) => onChangeAvailability(it, e.target.value as AdminInventoryItem["availability"])}
                            className={`rounded-full border px-2 py-1 font-semibold uppercase text-[10px] tracking-wide ${AVAILABILITY_BADGE[it.availability]}`}
                            data-testid={`select-availability-${it.id}`}
                          >
                            {AVAILABILITY_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          <button
                            onClick={() => openEdit(it)}
                            className="px-3 py-1 font-semibold uppercase text-[10px] tracking-wide border rounded-md border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600 mr-1"
                            data-testid={`button-edit-${it.id}`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(it)}
                            className="px-3 py-1 font-semibold uppercase text-[10px] tracking-wide border rounded-md border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600"
                            data-testid={`button-delete-${it.id}`}
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

function InventoryFormCard({
  title,
  form,
  setForm,
  isEdit,
  categories,
  uploading,
  submitting,
  onClose,
  onUpload,
  onSubmit,
}: {
  title: string;
  form: FormState;
  setForm: (updater: (prev: FormState) => FormState) => void;
  isEdit: boolean;
  categories: string[];
  uploading: boolean;
  submitting: boolean;
  onClose: () => void;
  onUpload: (f: File) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));
  const inputCls = "bg-white border border-zinc-200 focus:border-red-500 h-11";
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-zinc-200 rounded-xl shadow-md p-6 mb-6 grid md:grid-cols-2 gap-4"
      data-testid="form-inventory"
    >
      <div className="md:col-span-2 flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">{title}</h2>
        <button type="button" onClick={onClose} className="text-zinc-500 hover:text-red-600 font-semibold text-2xl leading-none" aria-label="Close">×</button>
      </div>

      <Field label="Category" required>
        <Input
          list="cats"
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          required
          className={inputCls}
          data-testid="input-category"
        />
        <datalist id="cats">
          {categories.map((c) => <option key={c} value={c} />)}
        </datalist>
      </Field>
      <Field label="Brand" required>
        <Input value={form.brand} onChange={(e) => set("brand", e.target.value)} required className={inputCls} data-testid="input-brand" />
      </Field>
      <Field label="Model" required>
        <Input value={form.model} onChange={(e) => set("model", e.target.value)} required className={inputCls} data-testid="input-model" />
      </Field>
      <Field label={`ID (slug) ${isEdit ? "— cannot be changed" : "— optional, auto-generated"}`}>
        <Input
          value={form.id}
          onChange={(e) => set("id", e.target.value.toLowerCase())}
          disabled={isEdit}
          placeholder="auto"
          className={`${inputCls} font-mono`}
          data-testid="input-id"
        />
      </Field>
      <Field label="Storage">
        <Input value={form.storage} onChange={(e) => set("storage", e.target.value)} className={inputCls} data-testid="input-storage" />
      </Field>
      <Field label="Color">
        <Input value={form.color} onChange={(e) => set("color", e.target.value)} className={inputCls} data-testid="input-color" />
      </Field>
      <Field label="Condition">
        <Input value={form.condition} onChange={(e) => set("condition", e.target.value)} className={inputCls} data-testid="input-condition" />
      </Field>
      <Field label="Carrier">
        <Input value={form.carrier} onChange={(e) => set("carrier", e.target.value)} className={inputCls} data-testid="input-carrier" />
      </Field>
      <Field label="Warranty">
        <Input value={form.warranty} onChange={(e) => set("warranty", e.target.value)} className={inputCls} data-testid="input-warranty" />
      </Field>
      <Field label="Price (USD, e.g. 329)" required>
        <Input
          inputMode="decimal"
          value={form.priceCents}
          onChange={(e) => {
            const v = e.target.value;
            set("priceCents", v);
            if (!form.priceDisplay || form.priceDisplay.startsWith("$")) {
              set("priceDisplay", v ? `$${v}` : "");
            }
          }}
          required
          className={inputCls}
          data-testid="input-price"
        />
      </Field>
      <Field label="Display price (e.g. $329)" required>
        <Input
          value={form.priceDisplay}
          onChange={(e) => set("priceDisplay", e.target.value)}
          required
          className={inputCls}
          data-testid="input-price-display"
        />
      </Field>
      <Field label="Availability">
        <select
          value={form.availability}
          onChange={(e) => set("availability", e.target.value as AdminInventoryItem["availability"])}
          className="bg-white border border-zinc-200 focus:border-red-500 rounded-lg h-11 px-3 w-full text-zinc-900"
          data-testid="select-form-availability"
        >
          {AVAILABILITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Field>

      <div className="md:col-span-2 space-y-2">
        <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">Image</Label>
        <div className="flex items-center gap-3">
          {form.imageUrl ? (
            <img src={form.imageUrl} alt="" className="w-24 h-20 object-cover rounded-md border border-zinc-200" />
          ) : (
            <div className="w-24 h-20 bg-zinc-50 border border-zinc-200 rounded-md flex items-center justify-center text-[10px] text-zinc-500 uppercase tracking-wide">No image</div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
              }}
              disabled={uploading}
              className="block w-full text-xs text-zinc-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-red-500 file:text-white file:font-semibold file:uppercase file:tracking-wide hover:file:bg-red-600"
              data-testid="input-image-upload"
            />
            <Input
              value={form.imageUrl}
              onChange={(e) => set("imageUrl", e.target.value)}
              placeholder="…or paste an image URL"
              className="bg-white border border-zinc-200 focus:border-red-500 h-9 mt-2 text-xs"
              data-testid="input-image-url"
            />
            {uploading && <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mt-1">Uploading…</div>}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-2">
        <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="bg-white border border-zinc-200 focus:border-red-500"
          data-testid="input-description"
        />
      </div>

      <div className="md:col-span-2 flex gap-2 justify-end pt-2">
        <Button
          type="button"
          onClick={onClose}
          className="bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold uppercase tracking-wide h-11 px-6"
          data-testid="button-cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting || uploading}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold uppercase tracking-wide h-11 px-6 shadow-sm"
          data-testid="button-save"
        >
          {submitting ? "Saving…" : isEdit ? "Save changes" : "Create item"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
        {label}{required && <span className="text-red-600"> *</span>}
      </Label>
      {children}
    </div>
  );
}
