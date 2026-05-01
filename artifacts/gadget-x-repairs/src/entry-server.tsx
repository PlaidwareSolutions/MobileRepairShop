import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes } from "@/Routes";
import { SsrPromosContext } from "@/components/PromoCampaignBanner";
import type { PublicPromotion } from "@/lib/api";

export type SsrData = {
  /**
   * Promotions evaluated as live by the server at build time. The build script
   * fetches /api/promotions/active once before pre-rendering and passes the
   * result here so the homepage banner can render deterministically in static
   * HTML for crawlers. If the API was unreachable at build time the build
   * script passes an empty array and no banner is included in the SSR HTML
   * — the client will still fetch on mount.
   */
  promotions?: PublicPromotion[];
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

  const rendered = renderToString(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SsrPromosContext.Provider value={promos}>
            <WouterRouter ssrPath={url} base="">
              <Routes />
            </WouterRouter>
          </SsrPromosContext.Provider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>,
  );

  const { head, html } = extractHeadTags(rendered);
  return { html, head };
}
