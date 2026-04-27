import { useEffect, useState } from "react";
import {
  adminLeadActivity,
  adminMarkActivityRead,
  type LeadCommunication,
} from "@/lib/api";
import { formatAbsolute } from "./utils";

export type ActivityProps = {
  password: string;
  leadType: string;
  id: number;
  refreshKey: number;
  onRead?: () => void;
};

const STATUS_BADGE: Record<string, string> = {
  queued: "bg-zinc-300 text-zinc-800",
  sent: "bg-blue-500 text-zinc-900",
  delivered: "bg-green-500 text-zinc-900",
  bounced: "bg-red-500 text-zinc-900",
  failed: "bg-red-500 text-zinc-900",
  complained: "bg-red-500 text-zinc-900",
  delayed: "bg-red-500 text-black",
  received: "bg-red-500 text-black",
};

export function Activity({
  password,
  leadType,
  id,
  refreshKey,
  onRead,
}: ActivityProps) {
  const [items, setItems] = useState<LeadCommunication[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminLeadActivity(password, leadType, id)
      .then(async (res) => {
        if (cancelled) return;
        setItems(res.items);
        const hasUnread = res.items.some(
          (c) => c.direction === "inbound" && !c.readAt,
        );
        if (hasUnread) {
          try {
            const result = await adminMarkActivityRead(password, leadType, id);
            if (!cancelled && result.marked > 0) {
              setItems((prev) =>
                prev
                  ? prev.map((c) =>
                      c.direction === "inbound" && !c.readAt
                        ? { ...c, readAt: new Date().toISOString() }
                        : c,
                    )
                  : prev,
              );
              onRead?.();
            }
          } catch {
            // non-fatal: still showed activity
          }
        }
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
  }, [password, leadType, id, refreshKey, onRead]);

  return (
    <div className="mt-4 border-t-2 border-zinc-300 pt-4" data-testid={`activity-${leadType}-${id}`}>
      <div className="font-black uppercase text-xs tracking-widest text-zinc-600 mb-3">
        Activity {items ? `(${items.length})` : ""}
      </div>
      {loading && <div className="text-xs text-zinc-500">Loading…</div>}
      {error && <div className="text-xs text-red-400">{error}</div>}
      {items && items.length === 0 && !loading && (
        <div className="text-xs text-zinc-600 italic">No messages yet.</div>
      )}
      {items && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((c) => {
            const isInbound = c.direction === "inbound";
            const wasUnread = isInbound && !c.readAt;
            return (
              <li
                key={c.id}
                className={
                  isInbound
                    ? `bg-red-50/30 border-l-4 border-red-500 border-y border-r border-zinc-300 p-3 text-xs text-zinc-800 space-y-1`
                    : `bg-zinc-50 border border-zinc-300 p-3 text-xs text-zinc-700 space-y-1`
                }
                data-testid={`activity-item-${c.id}`}
                data-direction={c.direction}
              >
                <div className="flex justify-between gap-2 items-center">
                  <span className="font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2">
                    {isInbound ? (
                      <span
                        className="bg-red-500 text-black px-1.5 py-0.5 text-[10px] tracking-widest"
                        data-testid={`badge-inbound-${c.id}`}
                      >
                        ← REPLY
                      </span>
                    ) : (
                      <span className="text-zinc-500">→</span>
                    )}
                    <span>
                      {c.channel.toUpperCase()}{" "}
                      {isInbound ? "from" : "to"}{" "}
                      <span className="text-zinc-800">
                        {isInbound ? c.recipient || "customer" : c.recipient}
                      </span>
                    </span>
                    {wasUnread && (
                      <span
                        className="bg-red-500 text-zinc-900 px-1.5 py-0.5 text-[10px] tracking-widest animate-pulse"
                        data-testid={`badge-unread-${c.id}`}
                      >
                        NEW
                      </span>
                    )}
                  </span>
                  <span
                    className={`px-2 py-0.5 font-black uppercase text-[10px] tracking-widest ${
                      STATUS_BADGE[c.status] ?? "bg-zinc-300 text-zinc-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                {c.subject && (
                  <div className="text-zinc-800 font-bold">{c.subject}</div>
                )}
                <div className="text-zinc-700 whitespace-pre-wrap break-words line-clamp-6">
                  {stripHtml(c.body)}
                </div>
                <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
                  {formatAbsolute(c.createdAt)}
                  {c.error ? ` · ${c.error}` : ""}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}
