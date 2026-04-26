import { useEffect, useState } from "react";
import { adminLeadActivity, type LeadCommunication } from "@/lib/api";
import { formatAbsolute } from "./utils";

export type ActivityProps = {
  password: string;
  leadType: string;
  id: number;
  refreshKey: number;
};

const STATUS_BADGE: Record<string, string> = {
  queued: "bg-zinc-700 text-zinc-200",
  sent: "bg-blue-500 text-white",
  delivered: "bg-green-500 text-white",
  bounced: "bg-red-500 text-white",
  failed: "bg-red-500 text-white",
  complained: "bg-red-500 text-white",
  delayed: "bg-yellow-400 text-black",
};

export function Activity({ password, leadType, id, refreshKey }: ActivityProps) {
  const [items, setItems] = useState<LeadCommunication[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminLeadActivity(password, leadType, id)
      .then((res) => {
        if (!cancelled) setItems(res.items);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [password, leadType, id, refreshKey]);

  return (
    <div className="mt-4 border-t-2 border-zinc-800 pt-4" data-testid={`activity-${leadType}-${id}`}>
      <div className="font-black uppercase text-xs tracking-widest text-zinc-400 mb-3">
        Activity {items ? `(${items.length})` : ""}
      </div>
      {loading && <div className="text-xs text-zinc-500">Loading…</div>}
      {error && <div className="text-xs text-red-400">{error}</div>}
      {items && items.length === 0 && !loading && (
        <div className="text-xs text-zinc-600 italic">No messages sent yet.</div>
      )}
      {items && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((c) => (
            <li
              key={c.id}
              className="bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-300 space-y-1"
              data-testid={`activity-item-${c.id}`}
            >
              <div className="flex justify-between gap-2 items-center">
                <span className="font-black uppercase tracking-widest text-zinc-400">
                  {c.channel.toUpperCase()} → {c.recipient}
                </span>
                <span
                  className={`px-2 py-0.5 font-black uppercase text-[10px] tracking-widest ${
                    STATUS_BADGE[c.status] ?? "bg-zinc-700 text-zinc-200"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              {c.subject && (
                <div className="text-zinc-200 font-bold">{c.subject}</div>
              )}
              <div className="text-zinc-400 whitespace-pre-wrap break-words line-clamp-3">
                {stripHtml(c.body)}
              </div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
                {formatAbsolute(c.createdAt)}
                {c.error ? ` · ${c.error}` : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}
