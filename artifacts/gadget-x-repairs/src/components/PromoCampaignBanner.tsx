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

const ROTATION_MS = 7000;
const FADE_MS = 400;
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

// SSR seed: build-time prerender supplies live promos through this context so
// crawlers see the banner in static HTML. Absent on the client → null → the
// banner falls back to its in-browser fetch on mount.
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
    /* private mode etc. — fine to ignore */
  }
}

// Pure presentational view of a single promo. Reused by the homepage banner
// and the admin form's live preview.
export function PromoBannerView({
  promo,
  onDismiss,
  showDots,
  totalCount,
  activeIndex,
}: {
  promo: PublicPromotion;
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
          className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
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
  const [promos, setPromos] = useState<PublicPromotion[] | null>(ssrPromos);
  const [dismissed, setDismissed] = useState<boolean>(() => readDismissed());
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  // Always start un-mounted so the slide-in entrance animation runs on first
  // paint, even when an SSR seed is present.
  const [mounted, setMounted] = useState(false);
  const fadeTimer = useRef<number | null>(null);

  // Latest-index ref so the rotation interval can advance from the truly
  // current value without re-binding (which would reset the 7s cadence).
  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Always re-fetch on mount: the SSR seed reflects build-time, but the
  // schedule must be re-evaluated against current wall-clock time.
  useEffect(() => {
    let cancelled = false;
    fetchActivePromotions()
      .then((items) => {
        if (cancelled) return;
        setPromos(items);
        requestAnimationFrame(() => {
          if (!cancelled) setMounted(true);
        });
      })
      .catch(() => {
        // Discard the SSR seed on fetch failure so a paused/expired
        // promo can't linger once the API is unreachable.
        if (!cancelled) setPromos([]);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dismissal is a single banner-slot decision — not per promo.
  const visible = useMemo<PublicPromotion[]>(() => {
    if (!promos || dismissed) return [];
    return promos;
  }, [promos, dismissed]);

  useEffect(() => {
    if (index >= visible.length && visible.length > 0) {
      setIndex(0);
    }
  }, [visible.length, index]);

  useEffect(() => {
    if (visible.length < 2) return;
    const interval = window.setInterval(() => {
      const fromIndex = indexRef.current;
      setPrevIndex(fromIndex);
      setIndex((fromIndex + 1) % visible.length);
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
      fadeTimer.current = window.setTimeout(() => {
        setPrevIndex(null);
      }, FADE_MS);
    }, ROTATION_MS);
    return () => {
      window.clearInterval(interval);
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    };
  }, [visible.length]);

  if (!promos || visible.length === 0) return null;

  const safeIndex = Math.min(index, visible.length - 1);
  const current = visible[safeIndex];
  const previous =
    prevIndex !== null && prevIndex < visible.length ? visible[prevIndex] : null;

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
        onDismiss={dismiss}
        showDots={visible.length > 1}
        totalCount={visible.length}
        activeIndex={safeIndex}
      />
      {previous ? (
        <div
          key={`promo-fade-${prevIndex}`}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            animation: `promoCrossfadeOut ${FADE_MS}ms ease-out forwards`,
          }}
        >
          <PromoBannerView promo={previous} />
        </div>
      ) : null}
      <style>{`
        @keyframes promoCrossfadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
