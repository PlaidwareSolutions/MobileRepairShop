import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes } from "@/Routes";
import { SsrPromosContext } from "@/components/PromoCampaignBanner";
import { BusinessProvider } from "@/components/BusinessContext";
import type { PublicPromotion, PublicBusinessSettings } from "@/lib/api";

export type SsrData = {
  /** Live promos prefetched by the build script for SSR seeding. */
  promotions?: PublicPromotion[];
  /** Business settings (phone/address/hours) prefetched for SSR seeding. */
  business?: PublicBusinessSettings | null;
};

export type RenderResult = { html: string; head: string };

/**
 * react-helmet-async v3 detects React 19 and switches to a "React19Dispatcher"
 * that simply renders raw <title>, <meta>, <link>, and <script> JSX elements
 * inline in the React tree, expecting React 19's native metadata hoisting to
 * relocate them into <head>. That hoisting is only performed by React 19's
 * streaming SSR APIs (renderToReadableStream / renderToPipeableStream) — the
 * legacy renderToString we use here does NOT hoist, so the tags emitted by
 * <SEO> end up serialised inside <div id="root"> instead of <head>.
 *
 * We rely on renderToString (sync, simple) for our prerender pipeline, so we
 * compensate after-the-fact: scan the rendered string for head-eligible tags
 * (<title>, <meta>, <link>, JSON-LD <script>), strip them from the body html,
 * and return them concatenated as `head` for the build script to inject right
 * before </head>.
 *
 * Assumption: no page component renders a raw <title>, <meta>, <link>, or
 * application/ld+json <script> outside of <SEO>. If that ever changes, those
 * tags would also be moved to <head>, which is the correct destination
 * regardless — but the assumption is documented here for future maintainers.
 */
const HEAD_TAG_PATTERN =
  /<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>|<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;

function extractHeadTags(rendered: string): { head: string; html: string } {
  const tags: string[] = [];
  const html = rendered.replace(HEAD_TAG_PATTERN, (match) => {
    tags.push(match);
    return "";
  });
  return { head: tags.join("\n"), html };
}

export function render(url: string, ssr: SsrData = {}): RenderResult {
  const queryClient = new QueryClient();
  const promos = ssr.promotions ?? null;
  const business = ssr.business ?? null;

  const rendered = renderToString(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BusinessProvider initial={business}>
          <TooltipProvider>
            <SsrPromosContext.Provider value={promos}>
              <WouterRouter ssrPath={url} base="">
                <Routes />
              </WouterRouter>
            </SsrPromosContext.Provider>
          </TooltipProvider>
        </BusinessProvider>
      </QueryClientProvider>
    </HelmetProvider>,
  );

  const { head, html } = extractHeadTags(rendered);
  return { html, head };
}
