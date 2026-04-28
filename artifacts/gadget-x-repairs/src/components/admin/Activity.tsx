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
  queued: "bg-zinc-100 text-zinc-700 border border-zinc-200",
  sent: "bg-blue-50 text-blue-700 border border-blue-200",
  delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  bounced: "bg-red-50 text-red-600 border border-red-200",
  failed: "bg-red-50 text-red-600 border border-red-200",
  complained: "bg-red-50 text-red-600 border border-red-200",
  delayed: "bg-amber-50 text-amber-700 border border-amber-200",
  received: "bg-red-50 text-red-600 border border-red-200",
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
    <div className="mt-4 border-t border-zinc-200 pt-4" data-testid={`activity-${leadType}-${id}`}>
      <div className="font-semibold uppercase text-xs tracking-wide text-zinc-600 mb-3">
        Activity {items ? `(${items.length})` : ""}
      </div>
      {loading && <div className="text-xs text-zinc-500">Loading…</div>}
      {error && <div className="text-xs text-red-600">{error}</div>}
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
                    ? `bg-red-50/40 border-l-4 border-red-500 border-y border-r border-red-100 rounded-md p-3 text-xs text-zinc-800 space-y-1`
                    : `bg-white border border-zinc-200 rounded-md p-3 text-xs text-zinc-700 space-y-1`
                }
                data-testid={`activity-item-${c.id}`}
                data-direction={c.direction}
              >
                <div className="flex justify-between gap-2 items-center">
                  <span className="font-semibold uppercase tracking-wide text-zinc-600 flex items-center gap-2">
                    {isInbound ? (
                      <span
                        className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] tracking-wide shadow-sm"
                        data-testid={`badge-inbound-${c.id}`}
                      >
                        ← REPLY
                      </span>
                    ) : (
                      <span className="text-zinc-400">→</span>
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
                        className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] tracking-wide animate-pulse shadow-sm"
                        data-testid={`badge-unread-${c.id}`}
                      >
                        NEW
                      </span>
                    )}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wide ${
                      STATUS_BADGE[c.status] ?? "bg-zinc-100 text-zinc-700 border border-zinc-200"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                {c.subject && (
                  <div className="text-zinc-900 font-semibold">{c.subject}</div>
                )}
                <div className="text-zinc-700 whitespace-pre-wrap break-words line-clamp-6">
                  {stripHtml(c.body)}
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">
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
