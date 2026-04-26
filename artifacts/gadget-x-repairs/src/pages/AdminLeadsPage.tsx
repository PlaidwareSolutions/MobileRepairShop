import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetchLeads, adminUpdateStatus } from "@/lib/api";

type Lead = Record<string, unknown> & { id: number; status?: string; createdAt?: string };
type AllLeads = {
  repairQuotes: Lead[];
  sellPhoneSubmissions: Lead[];
  appointments: Lead[];
  contactMessages: Lead[];
  itemReservations: Lead[];
};

const TABS: { key: keyof AllLeads; label: string; type: string }[] = [
  { key: "repairQuotes", label: "Repair Quotes", type: "repair-quote" },
  { key: "sellPhoneSubmissions", label: "Sell Phone", type: "sell-phone" },
  { key: "appointments", label: "Appointments", type: "appointment" },
  { key: "contactMessages", label: "Contact Messages", type: "contact" },
  { key: "itemReservations", label: "Reservations", type: "reservation" },
];

const STATUSES = ["new", "in_progress", "done", "archived"] as const;

export default function AdminLeadsPage() {
  const [password, setPassword] = useState(typeof window !== "undefined" ? localStorage.getItem("gx_admin_pw") || "" : "");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<AllLeads | null>(null);
  const [tab, setTab] = useState<keyof AllLeads>("repairQuotes");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setError(null);
    setLoading(true);
    try {
      const d = await adminFetchLeads(pw);
      setData(d as AllLeads);
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

  async function setStatus(leadType: string, id: number, status: string) {
    try {
      await adminUpdateStatus(password, leadType, id, status);
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <PageShell hideTicker>
      <SEO title="Admin · Leads | Gadget X" description="Admin lead inbox" path="/admin/leads" noindex />
      <section className="py-12 px-4 bg-zinc-950 border-b border-zinc-900 min-h-[80vh]">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            ADMIN <span className="text-red-500">LEADS</span>
          </h1>

          {!authed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                load(password);
              }}
              className="bg-zinc-900 border-4 border-zinc-800 p-6 max-w-md space-y-4"
              data-testid="form-admin-login"
            >
              <Label htmlFor="ad-pw" className="font-black uppercase text-xs tracking-widest text-zinc-300">Admin password</Label>
              <Input id="ad-pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-password" />
              {error && <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm">{error}</div>}
              <Button type="submit" disabled={loading || !password} className="w-full rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-12" data-testid="button-login">
                {loading ? "..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-6">
                {TABS.map((t) => {
                  const count = data?.[t.key]?.length ?? 0;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`px-4 py-2 font-black uppercase text-sm tracking-widest border-2 transition-colors ${tab === t.key ? "bg-red-500 border-red-500 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-500"}`}
                      data-testid={`tab-${t.key}`}
                    >
                      {t.label} <span className="text-xs ml-1 opacity-70">{count}</span>
                    </button>
                  );
                })}
                <button onClick={() => load(password)} className="ml-auto px-4 py-2 font-black uppercase text-sm tracking-widest border-2 bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-yellow-400" data-testid="button-refresh">
                  Refresh
                </button>
              </div>

              {error && <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm mb-4">{error}</div>}

              {data && (
                <div className="space-y-4">
                  {(data[tab] ?? []).length === 0 && (
                    <div className="bg-zinc-900 border-2 border-zinc-800 p-8 text-center font-bold text-zinc-500 uppercase">No entries</div>
                  )}
                  {(data[tab] ?? []).map((lead) => {
                    const tabConfig = TABS.find((t) => t.key === tab)!;
                    return (
                      <article key={lead.id} className="bg-black border-2 border-zinc-800 p-5" data-testid={`lead-${tab}-${lead.id}`}>
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="font-black uppercase text-xs text-zinc-500 tracking-widest">
                            #{lead.id} · {lead.createdAt ? new Date(lead.createdAt as string).toLocaleString() : ""}
                          </div>
                          <select
                            value={(lead.status as string) || "new"}
                            onChange={(e) => setStatus(tabConfig.type, lead.id, e.target.value)}
                            className="rounded-none bg-zinc-900 border-2 border-zinc-700 px-3 py-1 font-black uppercase text-xs"
                            data-testid={`select-status-${tab}-${lead.id}`}
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>{s.replace("_", " ")}</option>
                            ))}
                          </select>
                        </div>
                        <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap break-all bg-zinc-950 border border-zinc-800 p-3 max-h-64 overflow-auto">
                          {JSON.stringify(lead, null, 2)}
                        </pre>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
