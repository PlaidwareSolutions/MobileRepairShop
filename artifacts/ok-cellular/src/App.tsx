import { Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes } from "@/Routes";
import { BusinessProvider, DEFAULT_BUSINESS } from "@/components/BusinessContext";
import type { PublicBusinessSettings } from "@/lib/api";

const queryClient = new QueryClient();

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
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Routes />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </BusinessProvider>
    </QueryClientProvider>
  );
}

export default App;
