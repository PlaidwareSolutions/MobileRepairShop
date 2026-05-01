import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";
import { fetchActivePromotions, type PublicPromotion } from "@/lib/api";

// Owner-managed campaign banner that renders the live promotions returned by
// the server. The server alone decides which promos are live (the client never
// sees paused or out-of-window rows), so this component only needs to handle
// presentation, rotation, and session dismissal.

const ROTATION_MS = 7000;
const FADE_MS = 400;
// Single session-wide dismissal flag: clicking the banner's close button
// hides the entire promotion slot for the remainder of the browser session,
// regardless of how many live promos exist or which one was on screen.
const SESSION_KEY = "gx-promo-banner-dismissed";

type AccentPalette = {
  bg: string;
  text: string;
  badge: string;
  cta: string;
  ctaHover: string;
};

const ACCENT: Record<PublicPromotion["accent"], AccentPalette> = {
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

/**
 * SSR seed for the banner. The build-time prerender fetches /api/promotions/
 * active once and passes the result through this context so the first promo
 * can render in static HTML for crawlers. On the client the provider is
 * absent, so the value is `null` and the banner falls back to its in-browser
 * fetch on mount.
 */
export const SsrPromosContext = createContext<PublicPromotion[] | null>(null);

function readDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // sessionStorage may be disabled in private mode; that's fine
  }
}

/**
 * Pure, presentational rendering of a single promotion. No fetch, no
 * rotation, no dismiss button — used by the homepage banner for each visible
 * row and by the admin form for the live preview.
 */
export function PromoBannerView({
  promo,
  fading = false,
  onDismiss,
  showDots,
  totalCount,
  activeIndex,
}: {
  promo: PublicPromotion;
  fading?: boolean;
  onDismiss?: () => void;
  showDots?: boolean;
  totalCount?: number;
  activeIndex?: number;
}) {
  const palette = ACCENT[promo.accent] ?? ACCENT.amber;
  return (
    <div className={`${palette.bg} ${palette.text}`}>
      <div className="max-w-[1240px] mx-auto px-4 py-3 md:py-4 flex items-center gap-3 md:gap-5">
        <div
          key={promo.id}
          className={[
            "flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4",
            "transition-opacity",
            fading ? "opacity-0" : "opacity-100",
          ].join(" ")}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        >
          {promo.badge ? (
            <span
              className={`shrink-0 self-start md:self-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider motion-safe:animate-pulse ${palette.badge}`}
              data-testid="promo-campaign-badge"
            >
              {promo.badge}
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <p
              className="text-sm md:text-base font-extrabold leading-snug truncate md:whitespace-normal"
              data-testid="promo-campaign-headline"
            >
              {promo.headline}
            </p>
            {promo.supportingLine ? (
              <p className="text-xs md:text-sm font-medium opacity-90 leading-snug truncate md:whitespace-normal">
                {promo.supportingLine}
              </p>
            ) : null}
          </div>
          {promo.ctaLabel && promo.ctaHref ? (
            <a
              href={promo.ctaHref}
              className={`shrink-0 inline-flex items-center justify-center rounded-md ${palette.cta} ${palette.ctaHover} text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2 transition-colors`}
              data-testid="promo-campaign-cta"
            >
              {promo.ctaLabel}
            </a>
          ) : null}
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-md p-1.5 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
            aria-label="Dismiss promotion"
            data-testid="promo-campaign-dismiss"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {showDots && totalCount && totalCount > 1 ? (
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center gap-1 pb-1 pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({ length: totalCount }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full transition-opacity ${
                i === activeIndex ? "opacity-90" : "opacity-40"
              } bg-current`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function PromoCampaignBanner() {
  const ssrPromos = useContext(SsrPromosContext);

  // SSR seed: when the prerender provides initial data, render it on first
  // paint so crawlers see the banner deterministically. On the client (no
  // provider) this stays null and the useEffect below kicks in.
  const [promos, setPromos] = useState<PublicPromotion[] | null>(ssrPromos);
  // Session-wide dismissal flag: one click hides the banner slot for the
  // remainder of the browser session. Lazy-initialised from sessionStorage so
  // a return navigation within the same tab honours a prior dismissal.
  const [dismissed, setDismissed] = useState<boolean>(() => readDismissed());
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(ssrPromos !== null && ssrPromos.length > 0);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef<number | null>(null);

  // Always re-fetch on mount in the browser. Even if SSR seeded with data, we
  // refresh to pick up any changes the owner made since the build, and to
  // re-evaluate the schedule against the current time (the SSR snapshot was
  // taken at build time, which can be stale for "happy hour"-style promos).
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
        // Network failure: keep whatever we already have (SSR seed if any),
        // otherwise mark as resolved-empty so the null guard below applies.
        if (!cancelled && promos === null) setPromos([]);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the user dismisses the banner, hide every live promo for the rest
  // of the session. We deliberately do NOT filter per-promo IDs — dismissal
  // is a single banner-slot decision.
  const visible = useMemo<PublicPromotion[]>(() => {
    if (!promos || dismissed) return [];
    return promos;
  }, [promos, dismissed]);

  // Reset index when the visible list shrinks.
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

  function dismiss() {
    setDismissed(true);
    writeDismissed();
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
      <PromoBannerView
        promo={current}
        fading={fading}
        onDismiss={dismiss}
        showDots={visible.length > 1}
        totalCount={visible.length}
        activeIndex={index}
      />
    </section>
  );
}
