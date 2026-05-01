import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { fetchActivePromotions, type PublicPromotion } from "@/lib/api";

// Owner-managed campaign banner that renders the live promotions returned by
// the server. The server alone decides which promos are live (the client never
// sees paused or out-of-window rows), so this component only needs to handle
// presentation, rotation, and session dismissal.

const ROTATION_MS = 7000;
const FADE_MS = 400;
const SESSION_KEY = "gx-dismissed-promos";

const ACCENT: Record<
  PublicPromotion["accent"],
  { bg: string; text: string; badge: string; cta: string; ctaHover: string }
> = {
  amber: {
    bg: "bg-gradient-to-r from-amber-500 to-amber-600",
    text: "text-zinc-900",
    badge: "bg-zinc-900 text-amber-200",
    cta: "bg-zinc-900 text-amber-300",
    ctaHover: "hover:bg-zinc-800",
  },
  red: {
    bg: "bg-gradient-to-r from-red-600 to-red-700",
    text: "text-white",
    badge: "bg-white/20 text-white",
    cta: "bg-white text-red-700",
    ctaHover: "hover:bg-zinc-100",
  },
  emerald: {
    bg: "bg-gradient-to-r from-emerald-600 to-emerald-700",
    text: "text-white",
    badge: "bg-white/20 text-white",
    cta: "bg-white text-emerald-700",
    ctaHover: "hover:bg-zinc-100",
  },
  blue: {
    bg: "bg-gradient-to-r from-sky-600 to-sky-700",
    text: "text-white",
    badge: "bg-white/20 text-white",
    cta: "bg-white text-sky-700",
    ctaHover: "hover:bg-zinc-100",
  },
};

function readDismissed(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((n) => typeof n === "number"));
    }
  } catch {
    // ignore — corrupt storage just means "nothing dismissed"
  }
  return new Set();
}

function writeDismissed(ids: Set<number>) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // sessionStorage may be disabled in private mode; that's fine
  }
}

export function PromoCampaignBanner() {
  const [promos, setPromos] = useState<PublicPromotion[] | null>(null);
  const [dismissed, setDismissed] = useState<Set<number>>(() => readDismissed());
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef<number | null>(null);

  // Fetch on mount only. SSR (build-time prerender) skips this entirely
  // because useEffect doesn't run during server rendering — the banner stays
  // null in the static HTML, and shows up on the client once data arrives.
  useEffect(() => {
    let cancelled = false;
    fetchActivePromotions()
      .then((items) => {
        if (cancelled) return;
        setPromos(items);
        // Trigger entrance animation on the next frame so the transition
        // actually plays (otherwise the element appears in its final state).
        requestAnimationFrame(() => {
          if (!cancelled) setMounted(true);
        });
      })
      .catch(() => {
        if (!cancelled) setPromos([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter out dismissed promos. Memoized so the rotation effect's dep array
  // sees a stable reference per dismissed-set change.
  const visible = useMemo(() => {
    if (!promos) return [];
    return promos.filter((p) => !dismissed.has(p.id));
  }, [promos, dismissed]);

  // Reset index when the visible list shrinks (e.g. after a dismissal).
  useEffect(() => {
    if (index >= visible.length && visible.length > 0) {
      setIndex(0);
    }
  }, [visible.length, index]);

  // Cross-fade rotation. Only runs when there are 2+ visible promos.
  useEffect(() => {
    if (visible.length < 2) return;
    const interval = window.setInterval(() => {
      setFading(true);
      fadeTimer.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % visible.length);
        setFading(false);
      }, FADE_MS);
    }, ROTATION_MS);
    return () => {
      window.clearInterval(interval);
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    };
  }, [visible.length]);

  if (!promos || visible.length === 0) return null;

  const current = visible[Math.min(index, visible.length - 1)];
  const palette = ACCENT[current.accent] ?? ACCENT.amber;

  function dismiss(id: number) {
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(id);
      writeDismissed(next);
      return next;
    });
  }

  return (
    <section
      role="region"
      aria-label="Featured promotion"
      data-testid="promo-campaign-banner"
      className={[
        "relative overflow-hidden",
        "transition-all ease-out",
        mounted
          ? "max-h-40 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2",
      ].join(" ")}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className={`${palette.bg} ${palette.text}`}>
        <div className="max-w-[1240px] mx-auto px-4 py-3 md:py-4 flex items-center gap-3 md:gap-5">
          <div
            key={current.id}
            className={[
              "flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4",
              "transition-opacity",
              fading ? "opacity-0" : "opacity-100",
            ].join(" ")}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            {current.badge ? (
              <span
                className={`shrink-0 self-start md:self-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider ${palette.badge}`}
                data-testid="promo-campaign-badge"
              >
                {current.badge}
              </span>
            ) : null}
            <div className="min-w-0 flex-1">
              <p
                className="text-sm md:text-base font-extrabold leading-snug truncate md:whitespace-normal"
                data-testid="promo-campaign-headline"
              >
                {current.headline}
              </p>
              {current.supportingLine ? (
                <p className="text-xs md:text-sm font-medium opacity-90 leading-snug truncate md:whitespace-normal">
                  {current.supportingLine}
                </p>
              ) : null}
            </div>
            {current.ctaLabel && current.ctaHref ? (
              <a
                href={current.ctaHref}
                className={`shrink-0 inline-flex items-center justify-center rounded-md ${palette.cta} ${palette.ctaHover} text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2 transition-colors`}
                data-testid="promo-campaign-cta"
              >
                {current.ctaLabel}
              </a>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => dismiss(current.id)}
            className="shrink-0 rounded-md p-1.5 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
            aria-label="Dismiss promotion"
            data-testid="promo-campaign-dismiss"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
          </button>
        </div>
        {visible.length > 1 ? (
          <div
            className="absolute inset-x-0 bottom-0 flex justify-center gap-1 pb-1 pointer-events-none"
            aria-hidden="true"
          >
            {visible.map((p, i) => (
              <span
                key={p.id}
                className={`h-1 w-1 rounded-full transition-opacity ${
                  i === index ? "opacity-90" : "opacity-40"
                } bg-current`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
