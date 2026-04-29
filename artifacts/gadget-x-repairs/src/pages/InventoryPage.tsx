import { useEffect, useMemo, useState } from "react";
import { Phone, Wrench, ArrowRight } from "lucide-react";
import { Link, useLocation, useRoute, useSearch } from "wouter";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, SITE_URL, localBusinessJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/SEO";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Button } from "@/components/ui/button";
import { fetchInventory } from "@/lib/api";
import { INVENTORY_FALLBACK, type InventoryItem } from "@/data/inventory";
import {
  ALL_FILTER_SLUG,
  INVENTORY_GROUPS,
  OTHER_GROUP,
  inventoryGroupBySlug,
  inventoryServiceHubForGroupSlug,
  type InventoryGroup,
} from "@/lib/inventoryGroups";
import { BUSINESS } from "@/content";

const DEFAULT_META = {
  title: "Phones & Laptops Inventory Houston | GadgetX Repairs",
  description:
    "Browse current inventory of unlocked iPhones, Samsungs, Pixels and MacBooks at GadgetX Repairs in Houston TX. Walk-ins welcome!",
  heading: { prefix: "Current", highlight: "Inventory" },
  intro:
    "Stock changes daily. Call to confirm availability or reserve an item — we'll hold it for 24 hours.",
};

function priceToNumber(price: string): string {
  const m = price.replace(/[^0-9.]/g, "");
  return m || "0";
}

function inventoryProductJsonLd(items: InventoryItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        "@id": `${SITE_URL}/inventory#${it.id}`,
        name: `${it.brand} ${it.model}`,
        sku: it.id,
        category: it.category,
        brand: { "@type": "Brand", name: it.brand },
        description: [it.condition, it.storage, it.color, it.carrier].filter(Boolean).join(", "),
        offers: {
          "@type": "Offer",
          price: priceToNumber(it.price),
          priceCurrency: "USD",
          availability:
            (it.availability ?? "").toLowerCase().includes("out")
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          itemCondition:
            (it.condition ?? "").toLowerCase().includes("new")
              ? "https://schema.org/NewCondition"
              : (it.condition ?? "").toLowerCase().includes("refurb")
              ? "https://schema.org/RefurbishedCondition"
              : "https://schema.org/UsedCondition",
          seller: { "@type": "ElectronicsStore", name: "Gadget X Repairs" },
        },
      },
    })),
  };
}

function readSlugFromSearch(search: string): string {
  const params = new URLSearchParams(search);
  const slug = params.get("category");
  if (slug && inventoryGroupBySlug(slug)) return slug;
  return ALL_FILTER_SLUG;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY_FALLBACK);
  const [reserving, setReserving] = useState<InventoryItem | null>(null);
  const [, setLocation] = useLocation();
  const search = useSearch();

  // Path-based group is the canonical source of truth: e.g. /inventory/phones
  // resolves to the "phones" group below. /inventory (no param) falls back to
  // the legacy ?category= query string, which is then soft-redirected to the
  // canonical path so old links keep working but search engines see one URL.
  const [matchPath, params] = useRoute<{ group: string }>("/inventory/:group");
  const pathSlug = matchPath ? params?.group ?? null : null;

  // Resolve path slug -> group. An unknown slug (e.g. /inventory/foobar) is
  // treated as no match and we redirect to the unfiltered /inventory below
  // rather than rendering a stale "All" view at a junk URL that could leak
  // into search results.
  const pathGroup = pathSlug ? inventoryGroupBySlug(pathSlug) : null;

  // Active filter slug used by the chip UI and the visible-items computation.
  // Initialised from the route param so SSR (no client JS) renders the right
  // chip/filter immediately. The query-string fallback is applied in a
  // useEffect below — running it during render would double-call setLocation.
  const initialSlug = pathGroup ? pathGroup.slug : ALL_FILTER_SLUG;
  const [filterSlug, setFilterSlug] = useState<string>(initialSlug);

  // Sync the chip when the URL changes (back/forward, programmatic nav, or a
  // chip click that updates the route).
  useEffect(() => {
    setFilterSlug(pathGroup ? pathGroup.slug : ALL_FILTER_SLUG);
  }, [pathGroup]);

  // Legacy ?category=<slug> support: soft-redirect to the canonical
  // /inventory/<slug> path so external links from before this change keep
  // working AND search engines see one canonical URL per category. Only
  // fires when we're actually at /inventory (no path param) and the query
  // string names a known group.
  useEffect(() => {
    if (matchPath) return;
    const slug = readSlugFromSearch(search);
    if (slug !== ALL_FILTER_SLUG) {
      const group = inventoryGroupBySlug(slug);
      if (group) {
        setLocation(`/inventory/${group.slug}`, { replace: true });
      }
    }
  }, [matchPath, search, setLocation]);

  // Path slug present but unrecognised — bounce to the unfiltered page.
  // Replace the history entry so the back button doesn't trap users in a
  // redirect loop.
  useEffect(() => {
    if (matchPath && pathSlug && !pathGroup) {
      setLocation("/inventory", { replace: true });
    }
  }, [matchPath, pathSlug, pathGroup, setLocation]);

  useEffect(() => {
    fetchInventory()
      .then((d) => {
        // A successful response is the source of truth — including an empty
        // list (e.g. when every item is sold or hidden). Only API failures
        // fall back to the static seed list (handled in catch).
        if (Array.isArray(d)) setItems(d as InventoryItem[]);
      })
      .catch(() => {
        // keep fallback
      });
  }, []);

  // Always show every well-known group chip (so a visitor who deep-links
  // from a "We Sell Too" tile always sees their selection reflected, even
  // when that category is currently out of stock). Only the catch-all
  // "Other" chip is conditional on actually having uncategorised items.
  const availableGroups = useMemo<InventoryGroup[]>(() => {
    const result: InventoryGroup[] = [...INVENTORY_GROUPS];
    if (items.some((it) => OTHER_GROUP.matches(it.category))) result.push(OTHER_GROUP);
    return result;
  }, [items]);

  const visible = useMemo(() => {
    if (filterSlug === ALL_FILTER_SLUG) return items;
    const group = inventoryGroupBySlug(filterSlug);
    if (!group) return items;
    return items.filter((it) => group.matches(it.category));
  }, [items, filterSlug]);

  function selectFilter(slug: string) {
    // Optimistic UI update so the chip doesn't appear to lag behind the click
    // while the route transitions.
    setFilterSlug(slug);
    if (slug === ALL_FILTER_SLUG) {
      setLocation("/inventory");
    } else {
      setLocation(`/inventory/${slug}`);
    }
  }

  const chips: { slug: string; label: string }[] = [
    { slug: ALL_FILTER_SLUG, label: "All" },
    ...availableGroups.map((g) => ({ slug: g.slug, label: g.label })),
  ];

  // Per-page metadata: a known category page uses its group's SEO copy and
  // breadcrumb label; the unfiltered /inventory page falls back to the shared
  // defaults. The /inventory/<slug> SEO must match the entry in
  // routes-config.ts since the prerender pipeline reads metadata from this
  // component's <SEO> tag and audits it against routes-config.
  const seoTitle = pathGroup ? pathGroup.seo.metaTitle : DEFAULT_META.title;
  const seoDescription = pathGroup ? pathGroup.seo.metaDescription : DEFAULT_META.description;
  const seoPath = pathGroup ? `/inventory/${pathGroup.slug}` : "/inventory";
  const heading = pathGroup ? pathGroup.heading : DEFAULT_META.heading;
  const intro = pathGroup ? pathGroup.intro : DEFAULT_META.intro;

  const breadcrumbItems = pathGroup
    ? [{ label: "Inventory", to: "/inventory" }, { label: pathGroup.label }]
    : [{ label: "Inventory" }];

  const breadcrumbJsonLdItems = pathGroup
    ? [
        { name: "Inventory", path: "/inventory" },
        { name: pathGroup.label, path: `/inventory/${pathGroup.slug}` },
      ]
    : [{ name: "Inventory", path: "/inventory" }];

  // Per-category long-form copy and FAQs. Both are only present on a known
  // category page (the unfiltered /inventory view stays lean). The FAQ list
  // doubles as the source for `FAQPage` JSON-LD so the same questions/answers
  // visible on the page are exactly what crawlers see — keeping them in sync
  // is a Google requirement for FAQ rich results.
  const bodyCopy = pathGroup?.bodyCopy ?? null;
  const faqs = pathGroup?.faqs ?? null;

  // Reverse cross-link back to the matching repair service hub. Hidden when
  // the current view has no matching hub (the unfiltered /inventory index, the
  // catch-all "other" bucket, or any future group without a service hub) so
  // we never render a dead callout.
  const serviceHub = inventoryServiceHubForGroupSlug(pathGroup?.slug);

  // Build the JSON-LD payload: shared blocks plus FAQPage on category pages
  // that have FAQs defined. Done as an array build (vs. inline conditional)
  // so the ordering stays predictable and easy to scan.
  const jsonLdPayload: object[] = [
    localBusinessJsonLd(),
    breadcrumbJsonLd(breadcrumbJsonLdItems),
    // ItemList reflects only the items shown on this page so per-category
    // pages emit category-scoped structured data instead of the full
    // catalogue (which would dilute relevance signals to crawlers).
    inventoryProductJsonLd(visible),
  ];
  if (faqs && faqs.length > 0) {
    jsonLdPayload.push(faqJsonLd(faqs));
  }

  return (
    <PageShell hideTicker>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={seoPath}
        jsonLd={jsonLdPayload}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="py-12 px-4 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight uppercase">
            {heading.prefix} <span className="text-red-500">{heading.highlight}</span>
          </h1>
          <p className="text-lg font-bold text-zinc-600 mb-8 max-w-2xl">{intro}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {chips.map((c) => (
              <button
                key={c.slug}
                onClick={() => selectFilter(c.slug)}
                aria-pressed={filterSlug === c.slug}
                className={`px-4 py-2 font-bold uppercase text-sm tracking-wide border transition-colors ${filterSlug === c.slug ? "bg-red-500 border-red-500 text-zinc-900" : "bg-zinc-100 border-zinc-300 text-zinc-600 hover:border-red-500"}`}
                data-testid={`filter-${c.slug}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {serviceHub && pathGroup && (
            <div
              className="mb-8 bg-white border border-zinc-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              data-testid={`service-hub-callout-${pathGroup.slug}`}
            >
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-zinc-700">
                  Need yours fixed instead of replaced? See our{" "}
                  <span className="text-zinc-900">{serviceHub.label}</span>{" "}
                  service in Houston.
                </p>
              </div>
              <Link
                href={serviceHub.path}
                className="inline-flex items-center gap-1 self-start sm:self-auto px-4 py-2 font-bold uppercase text-xs tracking-wide border border-zinc-300 text-zinc-900 bg-zinc-100 hover:bg-red-500 hover:border-red-500 transition-colors"
                data-testid={`service-hub-link-${pathGroup.slug}`}
              >
                {serviceHub.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {visible.length === 0 && (
            <div
              className="bg-white border border-zinc-200 p-6 text-center text-zinc-600 font-bold uppercase tracking-wide text-sm"
              data-testid="inventory-empty"
            >
              Nothing in this category right now — call us at {BUSINESS.phoneDisplay} and we'll let you know when it's back in stock.
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((it) => (
              <article key={it.id} className="bg-white border border-zinc-200 p-5 flex flex-col gap-3 hover:border-red-500 transition-colors" data-testid={`inventory-${it.id}`}>
                {it.imageUrl && (
                  <div className="-mx-5 -mt-5 mb-1 aspect-[4/3] bg-zinc-100 overflow-hidden border-b border-zinc-200">
                    <img
                      src={it.imageUrl}
                      alt={`${it.brand} ${it.model}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      data-testid={`inventory-image-${it.id}`}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-zinc-500 font-bold uppercase text-xs tracking-wide">{it.category}</div>
                  {it.availability && (
                    <span
                      data-testid={`availability-${it.id}`}
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full border ${ it.availability.toLowerCase().includes("out") ? "border-zinc-300 text-zinc-600 bg-zinc-50" : "border-red-200 text-red-600 bg-red-50" }`}
                    >
                      {it.availability}
                    </span>
                  )}
                </div>
                <h3 className="font-bold uppercase text-xl text-zinc-900">{it.brand} {it.model}</h3>
                <ul className="space-y-1 text-sm font-bold text-zinc-600">
                  {it.storage && <li>Storage: <span className="text-zinc-900">{it.storage}</span></li>}
                  {it.color && <li>Color: <span className="text-zinc-900">{it.color}</span></li>}
                  {it.condition && <li>Condition: <span className="text-zinc-900">{it.condition}</span></li>}
                  {it.carrier && <li>Carrier: <span className="text-zinc-900">{it.carrier}</span></li>}
                  {it.warranty && <li>Warranty: <span className="text-zinc-900">{it.warranty}</span></li>}
                </ul>
                <div className="mt-auto pt-3 border-t border-zinc-300 flex flex-col gap-3">
                  <div className="font-bold uppercase text-2xl text-red-500">{it.price}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild className="bg-white border border-zinc-300 hover:bg-white hover:text-black text-zinc-900 font-semibold uppercase tracking-wide h-10 px-2 text-xs" data-testid={`button-call-${it.id}`}>
                      <a href={BUSINESS.phoneTel} aria-label={`Call about ${it.brand} ${it.model}`}>
                        <Phone className="w-3.5 h-3.5 mr-1" /> Call
                      </a>
                    </Button>
                    <Button onClick={() => setReserving(it)} className="bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-semibold uppercase tracking-wide h-10 px-2 text-xs" data-testid={`button-reserve-${it.id}`}>
                      Reserve
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {bodyCopy && pathGroup && (
        <section
          className="py-12 px-4 bg-white border-b border-zinc-200"
          data-testid={`category-bodycopy-${pathGroup.slug}`}
        >
          <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 uppercase">
                About our {pathGroup.label.toLowerCase()}
              </h2>
              {bodyCopy.paragraphs.map((p, i) => (
                <p key={i} className="text-base text-zinc-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <aside className="bg-zinc-50 border border-zinc-200 p-6">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-zinc-900 mb-3">
                What's included
              </h3>
              <ul className="space-y-2 text-sm font-medium text-zinc-700 list-disc pl-5">
                {bodyCopy.included.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && pathGroup && (
        <section
          className="py-12 px-4 bg-zinc-50 border-b border-zinc-200"
          data-testid={`category-faqs-${pathGroup.slug}`}
        >
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 uppercase mb-6">
              {pathGroup.label} FAQ
            </h2>
            <dl className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {faqs.map((f, i) => (
                <div key={i} className="py-5">
                  <dt className="text-base font-bold text-zinc-900">{f.q}</dt>
                  <dd className="mt-2 text-base text-zinc-700 leading-relaxed">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {reserving && (
        <div className="fixed inset-0 bg-white/80 z-[60] flex items-center justify-center p-4" onClick={() => setReserving(null)}>
          <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <ReservationForm itemId={reserving.id} itemLabel={`${reserving.brand} ${reserving.model} — ${reserving.price}`} onClose={() => setReserving(null)} />
          </div>
        </div>
      )}

      <LocationCard />
    </PageShell>
  );
}
