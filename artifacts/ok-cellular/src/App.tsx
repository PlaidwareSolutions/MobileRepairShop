import { Router as WouterRouter } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes } from "@/Routes";
import { BusinessProvider, DEFAULT_BUSINESS } from "@/components/BusinessContext";
import type { PublicBusinessSettings } from "@/lib/api";

const queryClient = new QueryClient();

// Strip trailing slashes from the browser path before wouter matches routes.
// Without this, the static file server's trailing-slash redirect (e.g.
// /iphone-14-repair-humble-tx → /iphone-14-repair-humble-tx/) causes wouter
// to see a path it can't match, falling to NotFound and setting the wrong
// canonical URL — which Lighthouse reports as "conflicting canonicals".
function useNormalizedLocation(): ReturnType<typeof useBrowserLocation> {
  const [loc, setLoc] = useBrowserLocation();
  const normalized = loc !== "/" && loc.endsWith("/") ? loc.slice(0, -1) : loc;
  return [normalized, setLoc];
}

// Read SSR-seeded business settings injected into the page by the build
// script (see scripts/build-seo.mjs). Falls back to the bundled defaults so
// the very first paint always has real values to render.
function readSsrBusiness(): PublicBusinessSettings {
  if (typeof window === "undefined") return DEFAULT_BUSINESS;
  const seed = (window as unknown as { __SSR_BUSINESS__?: PublicBusinessSettings })
    .__SSR_BUSINESS__;
  return seed ?? DEFAULT_BUSINESS;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BusinessProvider initial={readSsrBusiness()}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} hook={useNormalizedLocation}>
            <Routes />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </BusinessProvider>
    </QueryClientProvider>
  );
}

export default App;
