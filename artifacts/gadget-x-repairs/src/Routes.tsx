import { Switch, Route, Redirect } from "wouter";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ServicePage from "@/pages/ServicePage";
import SalesPage from "@/pages/SalesPage";
import PrepaidPage from "@/pages/PrepaidPage";
import AreaPage from "@/pages/AreaPage";
import ArticlePage from "@/pages/ArticlePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ReviewsPage from "@/pages/ReviewsPage";
import InventoryPage from "@/pages/InventoryPage";
import AdminLeadsPage from "@/pages/AdminLeadsPage";

import { SERVICES_DATA } from "@/data/services";
import { SALES_DATA } from "@/data/sales";
import { PREPAID_DATA } from "@/data/prepaid";
import { AREAS_DATA } from "@/data/areas";
import { LEGACY_REDIRECTS } from "@/legacy-redirects";

export function Routes() {
  return (
    <Switch>
      {/* Home page is canonical at /phone-repair-houston-tx; bare / redirects via LEGACY_REDIRECTS below */}
      <Route path="/phone-repair-houston-tx" component={HomePage} />

      <Route path="/about" component={AboutPage} />
      <Route path="/contact-houston-tx" component={ContactPage} />
      <Route path="/reviews-houston-tx" component={ReviewsPage} />
      <Route path="/inventory" component={InventoryPage} />
      <Route path="/admin/leads" component={AdminLeadsPage} />

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

      {/* 301-style client redirects from legacy URLs to current canonical URLs */}
      {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
        <Route key={from} path={from}>
          <Redirect to={to} replace />
        </Route>
      ))}

      <Route component={NotFound} />
    </Switch>
  );
}
