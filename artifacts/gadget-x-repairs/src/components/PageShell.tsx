import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { SiteHeader, TopUtilityBar, TickerTape } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyMobileBar } from "@/components/StickyMobileBar";

export function PageShell({ children, hideTicker }: { children: ReactNode; hideTicker?: boolean }) {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location]);

  return (
    <div data-theme="bold-urban-store" className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-red-500 selection:text-zinc-900 pb-20 md:pb-0">
      <TopUtilityBar />
      <SiteHeader />
      {!hideTicker && <TickerTape />}
      {children}
      <SiteFooter />
      <StickyMobileBar />
    </div>
  );
}
