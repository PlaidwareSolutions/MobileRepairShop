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
  adminGetBusinessSettings,
  adminUpdateBusinessSettings,
  type AdminBusinessSettingsInput,
  type PublicBusinessSettings,
} from "@/lib/api";

type FormState = {
  phoneE164: string;
  addressLine1: string;
  addressLine2: string;
  mapsLink: string;
  mapsEmbed: string;
  hoursShort: string;
  hoursSunday: string;
  hoursMonday: string;
  hoursTuesday: string;
  hoursWednesday: string;
  hoursThursday: string;
  hoursFriday: string;
  hoursSaturday: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTiktok: string;
  socialYoutube: string;
  socialX: string;
};

const EMPTY_FORM: FormState = {
  phoneE164: "",
  addressLine1: "",
  addressLine2: "",
  mapsLink: "",
  mapsEmbed: "",
  hoursShort: "",
  hoursSunday: "",
  hoursMonday: "",
  hoursTuesday: "",
  hoursWednesday: "",
  hoursThursday: "",
  hoursFriday: "",
  hoursSaturday: "",
  socialFacebook: "",
  socialInstagram: "",
  socialTiktok: "",
  socialYoutube: "",
  socialX: "",
};

const DAY_FIELDS: { key: keyof FormState; label: string }[] = [
  { key: "hoursSunday", label: "Sunday" },
  { key: "hoursMonday", label: "Monday" },
  { key: "hoursTuesday", label: "Tuesday" },
  { key: "hoursWednesday", label: "Wednesday" },
  { key: "hoursThursday", label: "Thursday" },
  { key: "hoursFriday", label: "Friday" },
  { key: "hoursSaturday", label: "Saturday" },
];

function settingsToForm(s: PublicBusinessSettings): FormState {
  // The public payload exposes hours as an ordered array (Sunday first); turn
  // that back into the per-day form fields the admin form uses so the editor
  // round-trips cleanly between read and write.
  const byDay = new Map(s.hours.map((h) => [h.day, h.time]));
  return {
    phoneE164: s.phoneE164,
    addressLine1: s.addressLine1,
    addressLine2: s.addressLine2,
    mapsLink: s.mapsLink,
    mapsEmbed: s.mapsEmbed,
    hoursShort: s.hoursShort,
    hoursSunday: byDay.get("Sunday") ?? "",
    hoursMonday: byDay.get("Monday") ?? "",
    hoursTuesday: byDay.get("Tuesday") ?? "",
    hoursWednesday: byDay.get("Wednesday") ?? "",
    hoursThursday: byDay.get("Thursday") ?? "",
    hoursFriday: byDay.get("Friday") ?? "",
    hoursSaturday: byDay.get("Saturday") ?? "",
    socialFacebook: s.socialFacebook ?? "",
    socialInstagram: s.socialInstagram ?? "",
    socialTiktok: s.socialTiktok ?? "",
    socialYoutube: s.socialYoutube ?? "",
    socialX: s.socialX ?? "",
  };
}

function formToInput(form: FormState): AdminBusinessSettingsInput {
  return {
    phoneE164: form.phoneE164.trim(),
    addressLine1: form.addressLine1.trim(),
    addressLine2: form.addressLine2.trim(),
    mapsLink: form.mapsLink.trim(),
    mapsEmbed: form.mapsEmbed.trim(),
    hoursShort: form.hoursShort.trim(),
    hoursSunday: form.hoursSunday.trim(),
    hoursMonday: form.hoursMonday.trim(),
    hoursTuesday: form.hoursTuesday.trim(),
    hoursWednesday: form.hoursWednesday.trim(),
    hoursThursday: form.hoursThursday.trim(),
    hoursFriday: form.hoursFriday.trim(),
    hoursSaturday: form.hoursSaturday.trim(),
    socialFacebook: form.socialFacebook.trim(),
    socialInstagram: form.socialInstagram.trim(),
    socialTiktok: form.socialTiktok.trim(),
    socialYoutube: form.socialYoutube.trim(),
    socialX: form.socialX.trim(),
  };
}

export default function AdminBusinessSettingsPage() {
  const [password, setPassword] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("gx_admin_pw") || ""
      : "",
  );
  const [authed, setAuthed] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [current, setCurrent] = useState<PublicBusinessSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function load(pw: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await adminGetBusinessSettings(pw);
      setCurrent(res.settings);
      setForm(settingsToForm(res.settings));
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    try {
      const res = await adminUpdateBusinessSettings(password, formToInput(form));
      setCurrent(res.settings);
      setForm(settingsToForm(res.settings));
      setInfo("Saved. Visitors will see the new info on their next page load.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  function field<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <PageShell hideTicker>
      <SEO
        title="Admin: Business Settings | Gadget X"
        description="Edit phone number, address, and store hours."
        path="/admin/business-settings"
        noindex
      />
      <section className="py-12 px-4 bg-zinc-50 border-b border-zinc-200 min-h-[80vh]">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
            Admin <span className="text-red-500">Business Info</span>
          </h1>

          {authed && <AdminNav active="business-settings" />}

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
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-zinc-200 rounded-xl shadow-md p-6 max-w-3xl space-y-6"
              data-testid="form-business-settings"
            >
              <p className="text-sm text-zinc-600 font-medium">
                These details show up on the homepage, header, footer, contact
                page, store map, and call/text/WhatsApp buttons across the
                site. Saving here updates everywhere on the next page load.
              </p>

              {info && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg font-semibold text-sm">
                  {info}
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm">
                  {error}
                </div>
              )}

              <fieldset className="space-y-3">
                <legend className="font-bold uppercase text-sm tracking-wide text-zinc-900">
                  Phone Number
                </legend>
                <div>
                  <Label htmlFor="phone" className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                    Phone (E.164 format, e.g. +13466236898)
                  </Label>
                  <Input
                    id="phone"
                    value={form.phoneE164}
                    onChange={(e) => field("phoneE164", e.target.value)}
                    placeholder="+13466236898"
                    className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                    data-testid="input-phone"
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    Display, tap-to-call, SMS, and WhatsApp links are all
                    derived from this single number.
                  </p>
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="font-bold uppercase text-sm tracking-wide text-zinc-900">
                  Address
                </legend>
                <div>
                  <Label htmlFor="addr1" className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                    Street (line 1)
                  </Label>
                  <Input
                    id="addr1"
                    value={form.addressLine1}
                    onChange={(e) => field("addressLine1", e.target.value)}
                    className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                    data-testid="input-addr1"
                  />
                </div>
                <div>
                  <Label htmlFor="addr2" className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                    City, State Zip (line 2)
                  </Label>
                  <Input
                    id="addr2"
                    value={form.addressLine2}
                    onChange={(e) => field("addressLine2", e.target.value)}
                    className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                    data-testid="input-addr2"
                  />
                </div>
                <div>
                  <Label htmlFor="mapsLink" className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                    Google Maps link (used by Directions buttons)
                  </Label>
                  <Input
                    id="mapsLink"
                    value={form.mapsLink}
                    onChange={(e) => field("mapsLink", e.target.value)}
                    className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                    data-testid="input-maps-link"
                  />
                </div>
                <div>
                  <Label htmlFor="mapsEmbed" className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                    Google Maps embed URL (used by location iframe)
                  </Label>
                  <Textarea
                    id="mapsEmbed"
                    value={form.mapsEmbed}
                    onChange={(e) => field("mapsEmbed", e.target.value)}
                    className="bg-white border border-zinc-200 focus:border-red-500 min-h-[90px]"
                    data-testid="input-maps-embed"
                  />
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="font-bold uppercase text-sm tracking-wide text-zinc-900">
                  Store Hours
                </legend>
                <div>
                  <Label htmlFor="hoursShort" className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                    Short summary (shown in header / hero)
                  </Label>
                  <Input
                    id="hoursShort"
                    value={form.hoursShort}
                    onChange={(e) => field("hoursShort", e.target.value)}
                    placeholder="Sun 12–5 PM | Mon–Sat 10 AM–7 PM"
                    className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                    data-testid="input-hours-short"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {DAY_FIELDS.map((d) => (
                    <div key={d.key}>
                      <Label
                        htmlFor={`day-${d.key}`}
                        className="font-semibold uppercase text-xs tracking-wide text-zinc-700"
                      >
                        {d.label}
                      </Label>
                      <Input
                        id={`day-${d.key}`}
                        value={form[d.key]}
                        onChange={(e) => field(d.key, e.target.value)}
                        placeholder="10:00 AM – 7:00 PM"
                        className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                        data-testid={`input-${d.key}`}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="font-bold uppercase text-sm tracking-wide text-zinc-900">
                  Social Media
                </legend>
                <p className="text-xs text-zinc-500">
                  Paste the full URL for each platform you use. Leave a field blank to hide that icon.
                </p>
                {(
                  [
                    { key: "socialFacebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
                    { key: "socialInstagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle" },
                    { key: "socialTiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourhandle" },
                    { key: "socialYoutube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
                    { key: "socialX", label: "X (Twitter)", placeholder: "https://x.com/yourhandle" },
                  ] as { key: keyof FormState; label: string; placeholder: string }[]
                ).map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <Label htmlFor={key} className="font-semibold uppercase text-xs tracking-wide text-zinc-700">
                      {label}
                    </Label>
                    <Input
                      id={key}
                      type="url"
                      value={form[key]}
                      onChange={(e) => field(key, e.target.value)}
                      placeholder={placeholder}
                      className="bg-white border border-zinc-200 focus:border-red-500 h-12"
                      data-testid={`input-${key}`}
                    />
                  </div>
                ))}
              </fieldset>

              <div className="flex flex-wrap gap-3 items-center pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold uppercase tracking-wide h-12 px-6 shadow-sm"
                  data-testid="button-save"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!current || submitting}
                  onClick={() => current && setForm(settingsToForm(current))}
                  className="border border-zinc-300 hover:bg-white hover:text-black font-semibold uppercase tracking-wide h-12 px-6"
                  data-testid="button-revert"
                >
                  Revert
                </Button>
                {current && (
                  <span className="text-xs font-medium text-zinc-500">
                    Last updated {new Date(current.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
