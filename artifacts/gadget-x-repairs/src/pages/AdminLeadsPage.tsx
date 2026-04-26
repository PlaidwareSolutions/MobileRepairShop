import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminNav } from "@/components/AdminNav";
import {
  adminFetchLeads,
  adminMessagingConfig,
  type MessagingConfig,
} from "@/lib/api";
import {
  AppointmentCard,
  ContactCard,
  RepairQuoteCard,
  ReservationCard,
  SellPhoneCard,
} from "@/components/admin/cards";
import {
  STATUSES,
  type AllLeads,
  type AppointmentLead,
  type ContactLead,
  type RepairQuoteLead,
  type ReservationLead,
  type SellPhoneLead,
} from "@/components/admin/types";

type TabKey = keyof AllLeads;

const TABS: { key: TabKey; label: string }[] = [
  { key: "repairQuotes", label: "Repair Quotes" },
  { key: "sellPhoneSubmissions", label: "Sell Phone" },
  { key: "appointments", label: "Appointments" },
  { key: "contactMessages", label: "Contact" },
  { key: "itemReservations", label: "Reservations" },
];

const STATUS_FILTER: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Done" },
  { key: "archived", label: "Archived" },
];

function newCount(items: { status?: string }[] = []): number {
  return items.filter((i) => (i.status ?? "new") === "new").length;
}

function searchableText(lead: Record<string, unknown>): string {
  return Object.values(lead)
    .filter((v) => typeof v === "string" || typeof v === "number")
    .map((v) => String(v))
    .join(" ")
    .toLowerCase();
}

export default function AdminLeadsPage() {
  const [password, setPassword] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("gx_admin_pw") || ""
      : "",
  );
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<AllLeads | null>(null);
  const [messaging, setMessaging] = useState<MessagingConfig | null>(null);
  const [tab, setTab] = useState<TabKey>("repairQuotes");
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setError(null);
    setLoading(true);
    try {
      const [leads, cfg] = await Promise.all([
        adminFetchLeads(pw) as Promise<AllLeads>,
        adminMessagingConfig(pw).catch(() => null),
      ]);
      setData(leads);
      setMessaging(cfg);
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

  const tabCounts = useMemo(() => {
    if (!data) return {} as Record<TabKey, { total: number; news: number }>;
    return {
      repairQuotes: {
        total: data.repairQuotes.length,
        news: newCount(data.repairQuotes),
      },
      sellPhoneSubmissions: {
        total: data.sellPhoneSubmissions.length,
        news: newCount(data.sellPhoneSubmissions),
      },
      appointments: {
        total: data.appointments.length,
        news: newCount(data.appointments),
      },
      contactMessages: {
        total: data.contactMessages.length,
        news: newCount(data.contactMessages),
      },
      itemReservations: {
        total: data.itemReservations.length,
        news: newCount(data.itemReservations),
      },
    } as Record<TabKey, { total: number; news: number }>;
  }, [data]);

  const visibleLeads = useMemo(() => {
    if (!data) return [];
    const list = data[tab] ?? [];
    const q = search.trim().toLowerCase();
    return list
      .filter((l) => {
        const status = (l.status as string) || "new";
        if (statusFilter === "active") return status !== "archived";
        if (statusFilter === "all") return true;
        return status === statusFilter;
      })
      .filter((l) => {
        if (!q) return true;
        return searchableText(l as Record<string, unknown>).includes(q);
      })
      .slice()
      .sort((a, b) => {
        const ad = new Date(a.createdAt ?? 0).getTime();
        const bd = new Date(b.createdAt ?? 0).getTime();
        return bd - ad;
      });
  }, [data, tab, statusFilter, search]);

  function handleChanged() {
    if (password) load(password);
  }

  return (
    <PageShell hideTicker>
      <SEO
        title="Admin · Leads | Gadget X"
        description="Admin lead inbox"
        path="/admin/leads"
        noindex
      />
      <section className="py-12 px-4 bg-zinc-950 border-b border-zinc-900 min-h-[80vh]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              ADMIN <span className="text-red-500">INBOX</span>
            </h1>
            {authed && messaging && (
              <div className="text-xs uppercase tracking-widest text-zinc-500 space-y-1 text-right">
                <div>
                  email{" "}
                  <span
                    className={
                      messaging.emailEnabled
                        ? "text-green-400"
                        : "text-zinc-600"
                    }
                  >
                    {messaging.emailEnabled ? "enabled" : "off"}
                  </span>{" "}
                  ·{" "}
                  <span className="text-zinc-300">{messaging.mailFrom}</span>
                </div>
                <div>
                  sms{" "}
                  <span
                    className={
                      messaging.smsEnabled ? "text-green-400" : "text-zinc-600"
                    }
                  >
                    {messaging.smsEnabled ? "enabled" : "off"}
                  </span>{" "}
                  · <span className="text-zinc-300">{messaging.smsFrom}</span>
                </div>
              </div>
            )}
          </div>

          {authed && <AdminNav active="leads" />}

          {!authed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                load(password);
              }}
              className="bg-zinc-900 border-4 border-zinc-800 p-6 max-w-md space-y-4"
              data-testid="form-admin-login"
            >
              <Label
                htmlFor="ad-pw"
                className="font-black uppercase text-xs tracking-widest text-zinc-300"
              >
                Admin password
              </Label>
              <Input
                id="ad-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12"
                data-testid="input-password"
              />
              {error && (
                <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-12"
                data-testid="button-login"
              >
                {loading ? "..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {TABS.map((t) => {
                  const c = tabCounts[t.key] ?? { total: 0, news: 0 };
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`relative px-4 py-2 font-black uppercase text-sm tracking-widest border-2 transition-colors ${
                        active
                          ? "bg-red-500 border-red-500 text-white"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-red-500"
                      }`}
                      data-testid={`tab-${t.key}`}
                    >
                      {t.label}
                      <span className="text-xs ml-2 opacity-70">{c.total}</span>
                      {c.news > 0 && (
                        <span
                          className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 py-0.5 text-[10px] tracking-widest font-black"
                          data-testid={`badge-new-${t.key}`}
                        >
                          {c.news}
                        </span>
                      )}
                    </button>
                  );
                })}
                <button
                  onClick={() => load(password)}
                  className="ml-auto px-4 py-2 font-black uppercase text-sm tracking-widest border-2 bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-yellow-400"
                  data-testid="button-refresh"
                >
                  {loading ? "Refreshing…" : "Refresh"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 items-center mb-6">
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setStatusFilter("active")}
                    className={`px-3 py-1.5 font-black uppercase text-[11px] tracking-widest border-2 ${
                      statusFilter === "active"
                        ? "bg-white text-black border-white"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-white"
                    }`}
                    data-testid="filter-active"
                  >
                    Active
                  </button>
                  {STATUS_FILTER.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setStatusFilter(f.key)}
                      className={`px-3 py-1.5 font-black uppercase text-[11px] tracking-widest border-2 ${
                        statusFilter === f.key
                          ? "bg-white text-black border-white"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-white"
                      }`}
                      data-testid={`filter-${f.key}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <div className="ml-auto w-full md:w-72">
                  <Input
                    type="search"
                    placeholder="Search name, phone, model…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-10 text-white"
                    data-testid="input-search"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm mb-4">
                  {error}
                </div>
              )}

              {data && (
                <div className="space-y-4">
                  {visibleLeads.length === 0 && (
                    <div className="bg-zinc-900 border-2 border-zinc-800 p-8 text-center font-bold text-zinc-500 uppercase">
                      No entries match
                    </div>
                  )}
                  {visibleLeads.map((lead) => {
                    const common = {
                      password,
                      messaging,
                      onChanged: handleChanged,
                    };
                    if (tab === "repairQuotes") {
                      return (
                        <RepairQuoteCard
                          key={lead.id}
                          lead={lead as RepairQuoteLead}
                          {...common}
                        />
                      );
                    }
                    if (tab === "sellPhoneSubmissions") {
                      return (
                        <SellPhoneCard
                          key={lead.id}
                          lead={lead as SellPhoneLead}
                          {...common}
                        />
                      );
                    }
                    if (tab === "appointments") {
                      return (
                        <AppointmentCard
                          key={lead.id}
                          lead={lead as AppointmentLead}
                          {...common}
                        />
                      );
                    }
                    if (tab === "contactMessages") {
                      return (
                        <ContactCard
                          key={lead.id}
                          lead={lead as ContactLead}
                          {...common}
                        />
                      );
                    }
                    return (
                      <ReservationCard
                        key={lead.id}
                        lead={lead as ReservationLead}
                        {...common}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
          {/* keep STATUSES referenced for type completeness */}
          <span className="hidden">{STATUSES.join("")}</span>
        </div>
      </section>
    </PageShell>
  );
}
