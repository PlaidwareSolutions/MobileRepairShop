import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BUSINESS } from "@/content";
import {
  fetchBusinessSettings,
  type PublicBusinessSettings,
} from "@/lib/api";

// Static fallback derived from content.ts. Used:
//   - During the initial server-render when no SSR seed is available.
//   - As a defensive fallback if the public settings API ever returns an
//     unexpected shape on the client.
// Keeping defaults in code means every page can render meaningful content
// even before the database is seeded.
export const DEFAULT_BUSINESS: PublicBusinessSettings = {
  phoneE164: "+13466236898",
  phoneDisplay: BUSINESS.phoneDisplay,
  phoneTel: BUSINESS.phoneTel,
  smsHref: BUSINESS.sms,
  whatsappHref: BUSINESS.whatsapp,
  addressLine1: BUSINESS.addressLine1,
  addressLine2: BUSINESS.addressLine2,
  addressFull: BUSINESS.addressFull,
  mapsLink: BUSINESS.mapsLink,
  mapsEmbed: BUSINESS.mapsEmbed,
  hoursShort: BUSINESS.hoursShort,
  hours: BUSINESS.hours,
  updatedAt: "1970-01-01T00:00:00.000Z",
};

// React context carrying the merged-with-defaults business settings. The
// context value is *never* null so consumers don't need to handle missing
// state — they always get something renderable.
const BusinessContext = createContext<PublicBusinessSettings>(DEFAULT_BUSINESS);

/**
 * Hook used by every component that previously imported `BUSINESS` from
 * content.ts. Returns the current merged settings so phone/address/hours
 * are always in sync with what the owner saved in /admin/business-settings.
 */
export function useBusiness(): PublicBusinessSettings {
  return useContext(BusinessContext);
}

type ProviderProps = {
  /** Optional SSR-seeded settings (server-render or build-time prerender). */
  initial?: PublicBusinessSettings | null;
  children: ReactNode;
};

/**
 * Wraps the app, supplies the current business settings to every descendant,
 * and refreshes them once on mount so the client UI reflects the latest
 * owner-edited values (the SSR seed is at most a few seconds stale, but for
 * statically prerendered HTML it could be hours/days stale).
 *
 * Refetches are intentionally *not* on a timer — the values change
 * infrequently and an extra request per page mount is plenty.
 */
export function BusinessProvider({ initial, children }: ProviderProps) {
  const [settings, setSettings] = useState<PublicBusinessSettings>(
    initial ?? DEFAULT_BUSINESS,
  );

  useEffect(() => {
    let cancelled = false;
    void fetchBusinessSettings().then((live) => {
      if (cancelled || !live) return;
      // Only swap when the payload actually differs to avoid an unnecessary
      // re-render (which would otherwise reset focus inside any descendant
      // controlled inputs that depend on these values).
      if (live.updatedAt !== settings.updatedAt) {
        setSettings(live);
      }
    });
    return () => {
      cancelled = true;
    };
    // Run exactly once on mount — refetching when settings change would be
    // an infinite loop (we'd re-fetch the value we just set).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BusinessContext.Provider value={settings}>
      {children}
    </BusinessContext.Provider>
  );
}
