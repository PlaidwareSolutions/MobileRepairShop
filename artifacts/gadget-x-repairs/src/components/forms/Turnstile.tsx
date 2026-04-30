import { useCallback, useEffect, useRef, useState } from "react";

// Cloudflare Turnstile (invisible-by-default CAPTCHA) integration.
//
// Configuration:
//   - VITE_TURNSTILE_SITE_KEY (build-time env, exposed to the browser)
//   - TURNSTILE_SECRET_KEY (server-side secret; verified in api-server)
//
// If the site key is missing, this hook becomes a no-op so the form keeps
// working with just the existing honeypot + time-trap + rate-limit defenses.
// We use `appearance: 'interaction-only'` — the widget is silent for normal
// users and only renders a small managed challenge when Cloudflare's risk
// signals say the session looks suspicious.

const SITE_KEY: string =
  ((import.meta.env?.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? "").trim();
export const TURNSTILE_ENABLED: boolean = SITE_KEY.length > 0;

const SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileGlobal = {
  render: (
    el: HTMLElement,
    opts: Record<string, unknown>,
  ) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  execute?: (widgetId: string) => void;
};

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as unknown as { turnstile?: TurnstileGlobal }).turnstile) {
    return Promise.resolve();
  }
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="${SCRIPT_URL.split("?")[0]}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Turnstile script")),
        { once: true },
      );
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_URL;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Turnstile script"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export type UseTurnstileResult = {
  /** True when Turnstile is configured (site key present). */
  enabled: boolean;
  /**
   * The widget element to render inside the form. Renders `null` when
   * Turnstile is disabled so callers can drop it in unconditionally.
   */
  widget: React.ReactNode;
  /**
   * Resolve a Turnstile token. Returns the current token if one is already
   * available, otherwise waits up to `timeoutMs` for the widget callback
   * (managed challenges show inline). Resolves to `null` on timeout/error
   * or when Turnstile is disabled.
   */
  ensureToken: (timeoutMs?: number) => Promise<string | null>;
  /** Reset the widget so the next submission gets a fresh token. */
  reset: () => void;
};

export function useTurnstile(): UseTurnstileResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const pendingResolverRef = useRef<((token: string | null) => void) | null>(
    null,
  );
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  // True only when Cloudflare actually shows the interactive challenge. With
  // `appearance: 'interaction-only'` this stays false for the vast majority of
  // sessions, so the styled wrapper + caption stay invisible.
  const [challengeVisible, setChallengeVisible] = useState(false);

  // Stable ref-callback so React invokes us when the div mounts/unmounts.
  const refCallback = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
    setContainerEl(node);
  }, []);

  useEffect(() => {
    if (!TURNSTILE_ENABLED) return;
    if (!containerEl) return;

    let cancelled = false;
    loadTurnstileScript()
      .then(() => {
        if (cancelled) return;
        const ts = (window as unknown as { turnstile?: TurnstileGlobal })
          .turnstile;
        if (!ts || !containerEl) return;
        const id = ts.render(containerEl, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          retry: "auto",
          "refresh-expired": "auto",
          "before-interactive-callback": () => {
            // Cloudflare is about to show the interactive widget — reveal the
            // wrapper styling + caption so the user understands the extra step.
            setChallengeVisible(true);
          },
          "after-interactive-callback": () => {
            // Challenge solved. Keep the wrapper visible so the layout doesn't
            // jump while the form submits; it'll go away on reset/unmount.
          },
          callback: (token: string) => {
            tokenRef.current = token;
            const resolver = pendingResolverRef.current;
            if (resolver) {
              pendingResolverRef.current = null;
              resolver(token);
            }
          },
          "error-callback": () => {
            tokenRef.current = null;
            const resolver = pendingResolverRef.current;
            if (resolver) {
              pendingResolverRef.current = null;
              resolver(null);
            }
          },
          "expired-callback": () => {
            tokenRef.current = null;
          },
        });
        widgetIdRef.current = id ?? null;
      })
      .catch(() => {
        // Network issue loading the CF script — leave the form usable. The
        // server will reject without a token, and the user will see a clear
        // retry message.
      });

    return () => {
      cancelled = true;
      const ts = (window as unknown as { turnstile?: TurnstileGlobal })
        .turnstile;
      if (ts && widgetIdRef.current) {
        try {
          ts.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
      widgetIdRef.current = null;
      tokenRef.current = null;
      pendingResolverRef.current = null;
    };
  }, [containerEl]);

  const ensureToken = useCallback(
    (timeoutMs = 15000): Promise<string | null> => {
      if (!TURNSTILE_ENABLED) return Promise.resolve(null);
      if (tokenRef.current) return Promise.resolve(tokenRef.current);
      return new Promise<string | null>((resolve) => {
        // Replace any prior pending resolver — only the most recent submit
        // attempt should receive the next token.
        const prior = pendingResolverRef.current;
        if (prior) prior(null);
        pendingResolverRef.current = resolve;
        const timer = setTimeout(() => {
          if (pendingResolverRef.current === resolve) {
            pendingResolverRef.current = null;
            resolve(null);
          }
        }, timeoutMs);
        // Best-effort cleanup if resolved early
        const wrapped = (token: string | null) => {
          clearTimeout(timer);
          resolve(token);
        };
        pendingResolverRef.current = wrapped;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    tokenRef.current = null;
    setChallengeVisible(false);
    const ts = (window as unknown as { turnstile?: TurnstileGlobal }).turnstile;
    if (ts && widgetIdRef.current) {
      try {
        ts.reset(widgetIdRef.current);
      } catch {
        // ignore
      }
    }
  }, []);

  // The host div is always mounted (so Cloudflare can render into it on
  // demand), but the styled wrapper + caption only become visible when CF
  // actually shows the interactive challenge. That keeps the form clean for
  // the ~99% of sessions that never see a widget.
  const widget = TURNSTILE_ENABLED ? (
    <div
      className={
        challengeVisible
          ? "flex flex-col items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-3"
          : undefined
      }
      data-testid="turnstile-wrapper"
      data-challenge-visible={challengeVisible ? "true" : "false"}
    >
      <div
        ref={refCallback}
        className="cf-turnstile-host"
        data-testid="turnstile-widget"
      />
      {challengeVisible && (
        <p
          className="text-xs text-zinc-600"
          data-testid="turnstile-caption"
        >
          Verifying you're human…
        </p>
      )}
    </div>
  ) : null;

  return { enabled: TURNSTILE_ENABLED, widget, ensureToken, reset };
}

/**
 * User-facing error when Turnstile is enabled but we couldn't get a token
 * (script blocked, network issue, or the widget timed out without resolving).
 */
export const TURNSTILE_CLIENT_ERROR =
  "We couldn't complete the security check. Please refresh the page and try again, or call us at (346) 623-6898.";
