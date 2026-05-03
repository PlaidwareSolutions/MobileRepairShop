import type { AntiSpamStats, AntiSpamWindow } from "@/lib/api";

type Props = {
  stats: AntiSpamStats | null;
  loading: boolean;
  error: string | null;
};

const STAT_ROWS: {
  key: keyof Omit<AntiSpamWindow, "key" | "days">;
  label: string;
  testId: string;
  tone: "ok" | "blocked";
}[] = [
  {
    key: "acceptedLeads",
    label: "Leads accepted",
    testId: "anti-spam-accepted",
    tone: "ok",
  },
  {
    key: "turnstileFailures",
    label: "CAPTCHA failures",
    testId: "anti-spam-turnstile",
    tone: "blocked",
  },
  {
    key: "honeypotTrips",
    label: "Honeypot trips",
    testId: "anti-spam-honeypot",
    tone: "blocked",
  },
  {
    key: "rateLimitBlocks",
    label: "Rate-limit blocks",
    testId: "anti-spam-ratelimit",
    tone: "blocked",
  },
];

/**
 * Surfaces the layered-defense scoreboard so the shop owner can answer
 * "did the CAPTCHA actually pay off this week, or is it just frustrating
 * real customers?" — the question that motivated this tile in the first
 * place. Numbers come straight from /admin/anti-spam/stats.
 */
export function AntiSpamTile({ stats, loading, error }: Props) {
  return (
    <section
      className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5 mb-6"
      data-testid="tile-anti-spam"
    >
      <div className="flex items-end justify-between mb-3 gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-extrabold uppercase tracking-wide text-zinc-900">
            Anti-spam
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Real customers vs blocked submissions, by defense layer.
          </p>
        </div>
        {stats && (
          <div className="text-[10px] uppercase tracking-wide text-zinc-400">
            7d / 30d
          </div>
        )}
      </div>

      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg font-semibold text-xs"
          data-testid="anti-spam-error"
        >
          {error}
        </div>
      )}

      {!error && loading && !stats && (
        <div
          className="text-sm text-zinc-500 italic"
          data-testid="anti-spam-loading"
        >
          Loading…
        </div>
      )}

      {!error && stats && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-zinc-500 border-b border-zinc-200">
                <th className="py-2 pr-4 font-semibold">Metric</th>
                {stats.windows.map((w) => (
                  <th
                    key={w.key}
                    className="py-2 pr-4 font-semibold text-right"
                  >
                    Last {w.key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STAT_ROWS.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-zinc-100 last:border-b-0"
                  data-testid={`row-${row.testId}`}
                >
                  <td className="py-2 pr-4 text-zinc-700 font-medium">
                    {row.label}
                  </td>
                  {stats.windows.map((w) => {
                    const value = w[row.key];
                    const colorClass =
                      row.tone === "ok"
                        ? "text-emerald-600"
                        : value > 0
                          ? "text-zinc-900"
                          : "text-zinc-400";
                    return (
                      <td
                        key={w.key}
                        className={`py-2 pr-4 text-right tabular-nums font-bold ${colorClass}`}
                        data-testid={`${row.testId}-${w.key}`}
                      >
                        {value.toLocaleString()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
