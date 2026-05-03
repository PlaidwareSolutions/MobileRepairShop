import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { SiteHeader, TopUtilityBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyMobileBar } from "@/components/StickyMobileBar";

export function PageShell({
  children,
  hideTicker: _hideTicker,
}: {
  children: ReactNode;
  /**
   * Legacy flag from the previous design's marquee ticker. The redesign
   * removes the ticker entirely; the prop is accepted but ignored to keep
   * existing call sites compiling without changes.
   */
  hideTicker?: boolean;
}) {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/15 selection:text-foreground pb-20 md:pb-0">
      <TopUtilityBar />
      <SiteHeader />
      {children}
      <SiteFooter />
      <StickyMobileBar />
    </div>
  );
}
