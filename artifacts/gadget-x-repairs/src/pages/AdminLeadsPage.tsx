import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminNav } from "@/components/AdminNav";
import {
  adminAntiSpamStats,
  adminFetchLeads,
  adminMessagingConfig,
  type AntiSpamStats,
  type MessagingConfig,
} from "@/lib/api";
import { AntiSpamTile } from "@/components/admin/AntiSpamTile";
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

const TABS: { key: TabKey; label: string; leadType: string }[] = [
  { key: "repairQuotes", label: "Repair Quotes", leadType: "repair-quote" },
  { key: "sellPhoneSubmissions", label: "Sell Phone", leadType: "sell-phone" },
  { key: "appointments", label: "Appointments", leadType: "appointment" },
  { key: "contactMessages", label: "Contact", leadType: "contact" },
  { key: "itemReservations", label: "Reservations", leadType: "reservation" },
];

type UnreadInboundCounts = Record<string, Record<string, number>>;

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
  const [unreadCounts, setUnreadCounts] = useState<UnreadInboundCounts>({});
  const [messaging, setMessaging] = useState<MessagingConfig | null>(null);
  const [antiSpam, setAntiSpam] = useState<AntiSpamStats | null>(null);
  const [antiSpamError, setAntiSpamError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("repairQuotes");
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setError(null);
    setAntiSpamError(null);
    setLoading(true);
    try {
      // The anti-spam stats are nice-to-have on this page; a transient
      // failure there must not knock the operator out of the inbox, so we
      // surface its error in the tile itself rather than the page banner.
      const [leads, cfg, spam] = await Promise.all([
        adminFetchLeads(pw) as Promise<
          AllLeads & { unreadInboundCounts?: UnreadInboundCounts }
        >,
        adminMessagingConfig(pw).catch(() => null),
        adminAntiSpamStats(pw).catch((e: unknown) => {
          setAntiSpamError(
            e instanceof Error ? e.message : "Failed to load anti-spam stats",
          );
          return null;
        }),
      ]);
      const { unreadInboundCounts, ...leadsOnly } = leads;
      setData(leadsOnly as AllLeads);
      setUnreadCounts(unreadInboundCounts ?? {});
      setMessaging(cfg);
      setAntiSpam(spam);
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
    if (!data)
      return {} as Record<
        TabKey,
        { total: number; news: number; unread: number }
      >;
    function unreadFor(leadType: string): number {
      const map = unreadCounts[leadType];
      if (!map) return 0;
      return Object.values(map).reduce((sum, n) => sum + (n || 0), 0);
    }
    return {
      repairQuotes: {
        total: data.repairQuotes.length,
        news: newCount(data.repairQuotes),
        unread: unreadFor("repair-quote"),
      },
      sellPhoneSubmissions: {
        total: data.sellPhoneSubmissions.length,
        news: newCount(data.sellPhoneSubmissions),
        unread: unreadFor("sell-phone"),
      },
      appointments: {
        total: data.appointments.length,
        news: newCount(data.appointments),
        unread: unreadFor("appointment"),
      },
      contactMessages: {
        total: data.contactMessages.length,
        news: newCount(data.contactMessages),
        unread: unreadFor("contact"),
      },
      itemReservations: {
        total: data.itemReservations.length,
        news: newCount(data.itemReservations),
        unread: unreadFor("reservation"),
      },
    } as Record<TabKey, { total: number; news: number; unread: number }>;
  }, [data, unreadCounts]);

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
      <section className="py-12 px-4 bg-zinc-50 border-b border-zinc-200 min-h-[80vh]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Admin <span className="text-red-500">Inbox</span>
            </h1>
            {authed && messaging && (
              <div className="text-xs uppercase tracking-wide text-zinc-500 space-y-1 text-right">
                <div>
                  email{" "}
                  <span
                    className={
                      messaging.emailEnabled
                        ? "text-emerald-600 font-semibold"
                        : "text-zinc-500"
                    }
                  >
                    {messaging.emailEnabled ? "enabled" : "off"}
                  </span>{" "}
                  ·{" "}
                  <span className="text-zinc-700">{messaging.mailFrom}</span>
                </div>
                <div>
                  sms{" "}
                  <span
                    className={
                      messaging.smsEnabled
                        ? "text-emerald-600 font-semibold"
                        : "text-zinc-500"
                    }
                  >
                    {messaging.smsEnabled ? "enabled" : "off"}
                  </span>{" "}
                  · <span className="text-zinc-700">{messaging.smsFrom}</span>
                </div>
              </div>
            )}
          </div>

          {authed && <AdminNav active="leads" />}

          {authed && (
            <AntiSpamTile
              stats={antiSpam}
              loading={loading}
              error={antiSpamError}
            />
          )}

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
              <div className="flex flex-wrap gap-2 mb-4">
                {TABS.map((t) => {
                  const c =
                    tabCounts[t.key] ?? { total: 0, news: 0, unread: 0 };
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`relative px-4 py-2 font-semibold uppercase text-sm tracking-wide border rounded-lg transition-colors ${
                        active
                          ? "bg-red-500 border-red-500 text-white shadow-sm"
                          : "bg-white border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600"
                      }`}
                      data-testid={`tab-${t.key}`}
                    >
                      {t.label}
                      <span className="text-xs ml-2 opacity-70">{c.total}</span>
                      {c.news > 0 && (
                        <span
                          className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5 text-[10px] tracking-wide font-semibold rounded-full shadow-sm"
                          data-testid={`badge-new-${t.key}`}
                        >
                          {c.news}
                        </span>
                      )}
                      {c.unread > 0 && (
                        <span
                          className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-0.5 text-[10px] tracking-wide font-semibold rounded-full shadow-sm animate-pulse"
                          data-testid={`badge-unread-${t.key}`}
                        >
                          {c.unread} ←
                        </span>
                      )}
                    </button>
                  );
                })}
                <button
                  onClick={() => load(password)}
                  className="ml-auto px-4 py-2 font-semibold uppercase text-sm tracking-wide border rounded-lg bg-white border-zinc-200 text-zinc-600 hover:border-red-500 hover:text-red-600"
                  data-testid="button-refresh"
                >
                  {loading ? "Refreshing…" : "Refresh"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 items-center mb-6">
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setStatusFilter("active")}
                    className={`px-3 py-1.5 font-semibold uppercase text-[11px] tracking-wide border rounded-lg ${
                      statusFilter === "active"
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-900"
                    }`}
                    data-testid="filter-active"
                  >
                    Active
                  </button>
                  {STATUS_FILTER.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setStatusFilter(f.key)}
                      className={`px-3 py-1.5 font-semibold uppercase text-[11px] tracking-wide border rounded-lg ${
                        statusFilter === f.key
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-900"
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
                    className="bg-white border border-zinc-200 focus:border-red-500 h-10 text-zinc-900"
                    data-testid="input-search"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm mb-4">
                  {error}
                </div>
              )}

              {data && (
                <div className="space-y-4">
                  {visibleLeads.length === 0 && (
                    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-8 text-center font-semibold text-zinc-500 uppercase tracking-wide">
                      No entries match
                    </div>
                  )}
                  {visibleLeads.map((lead) => {
                    const tabMeta = TABS.find((t) => t.key === tab);
                    const leadTypeStr = tabMeta?.leadType ?? "";
                    const unread =
                      unreadCounts[leadTypeStr]?.[String(lead.id)] ?? 0;
                    const common = {
                      password,
                      messaging,
                      onChanged: handleChanged,
                      unreadInboundCount: unread,
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
