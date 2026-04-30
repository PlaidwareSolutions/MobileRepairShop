import { Switch, Route, Redirect } from "wouter";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
// Note: bare `/` is rendered by HomePage too (route below), so the SSG-prerendered
// dist/public/index.html is a real page — not a redirect stub. The static host's
// SPA-style fallback to index.html for unknown URLs therefore lands on the home
// page instead of an infinite redirect loop.
import ServicePage from "@/pages/ServicePage";
import SalesPage from "@/pages/SalesPage";
import PrepaidPage from "@/pages/PrepaidPage";
import AreaPage from "@/pages/AreaPage";
import ArticlePage from "@/pages/ArticlePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ReviewsPage from "@/pages/ReviewsPage";
import InventoryPage from "@/pages/InventoryPage";
import FinancingPage from "@/pages/FinancingPage";
import AdminLeadsPage from "@/pages/AdminLeadsPage";
import AdminInventoryPage from "@/pages/AdminInventoryPage";

import { SERVICES_DATA } from "@/data/services";
import { SALES_DATA } from "@/data/sales";
import { PREPAID_DATA } from "@/data/prepaid";
import { AREAS_DATA } from "@/data/areas";
import { LEGACY_REDIRECTS } from "@/legacy-redirects";

export function Routes() {
  return (
    <Switch>
      {/*
        Legacy URL redirects MUST come first. wouter's <Switch> picks the first match,
        so listing these before the dynamic /articles/:slug route ensures legacy article
        paths (e.g. /articles/iphone-screen-repair-cost-houston) redirect to their new
        canonical URL instead of falling through to ArticlePage and 404'ing on the
        missing slug. Same reasoning for legacy service/sales/prepaid/area paths and `/`.
      */}
      {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
        <Route key={from} path={from}>
          <Redirect to={to} replace />
        </Route>
      ))}

      {/*
        Home page is canonical at /phone-repair-houston-tx (SEO canonical URL set in HomePage's
        <SEO path="/phone-repair-houston-tx" />), but we also render it directly at `/` so that
        the SSG-prerendered dist/public/index.html is a real page. Without this, the static
        host's SPA fallback to index.html for unknown URLs would serve a redirect stub and
        loop forever.

        SERVICES_DATA still contains a "phone-repair-houston-tx" entry so that other services
        can reference it via their `related` arrays. We intentionally shadow that ServicePage
        route by registering HomePage at /phone-repair-houston-tx FIRST — wouter's <Switch>
        picks the first match, so the SERVICES map below never claims this slug. Do not move
        these Routes below the SERVICES map.
      */}
      <Route path="/" component={HomePage} />
      <Route path="/phone-repair-houston-tx" component={HomePage} />

      <Route path="/about" component={AboutPage} />
      <Route path="/contact-houston-tx" component={ContactPage} />
      <Route path="/reviews-houston-tx" component={ReviewsPage} />
      <Route path="/inventory" component={InventoryPage} />
      {/*
        Per-category canonical routes (e.g. /inventory/phones). Each known
        inventory group gets its own URL so search engines can rank the page
        for queries like "used phones Houston" — query strings on /inventory
        are mostly ignored as canonical URLs by Google. The wouter param
        :group is read inside InventoryPage; unknown slugs fall back to the
        unfiltered view (with a soft redirect to /inventory). Listed before
        the SERVICES map below so a hypothetical service slug "inventory" or
        "inventory/phones" can never shadow it.
      */}
      <Route path="/inventory/:group" component={InventoryPage} />
      <Route path="/financing-houston-tx" component={FinancingPage} />
      <Route path="/admin/leads" component={AdminLeadsPage} />
      <Route path="/admin/inventory" component={AdminInventoryPage} />

      <Route path="/articles/:slug" component={ArticlePage} />

      {SERVICES_DATA.map((s) => (
        <Route key={s.slug} path={`/${s.slug}`} component={ServicePage} />
      ))}

      {SALES_DATA.map((s) => (
        <Route key={s.slug} path={`/${s.slug}`} component={SalesPage} />
      ))}

      {PREPAID_DATA.map((p) => (
        <Route key={p.slug} path={`/${p.slug}`} component={PrepaidPage} />
      ))}

      {AREAS_DATA.map((a) => (
        <Route key={a.slug} path={`/${a.slug}`} component={AreaPage} />
      ))}

      <Route component={NotFound} />
    </Switch>
  );
}
