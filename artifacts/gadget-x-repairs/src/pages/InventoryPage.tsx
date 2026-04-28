import { useEffect, useMemo, useState } from "react";
import { Phone } from "lucide-react";
import { useLocation, useSearch } from "wouter";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, SITE_URL, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Button } from "@/components/ui/button";
import { fetchInventory } from "@/lib/api";
import { INVENTORY_FALLBACK, type InventoryItem } from "@/data/inventory";
import {
  ALL_FILTER_SLUG,
  INVENTORY_GROUPS,
  OTHER_GROUP,
  inventoryGroupBySlug,
  type InventoryGroup,
} from "@/lib/inventoryGroups";
import { BUSINESS } from "@/content";

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

  // Initialise to "all" so that SSR (which has no query string) and the first
  // client render match. A useEffect below syncs the chip from the real URL
  // once we're mounted in the browser.
  const [filterSlug, setFilterSlug] = useState<string>(ALL_FILTER_SLUG);

  useEffect(() => {
    setFilterSlug(readSlugFromSearch(search));
  }, [search]);

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
    setFilterSlug(slug);
    const params = new URLSearchParams(search);
    if (slug === ALL_FILTER_SLUG) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const qs = params.toString();
    setLocation(qs ? `/inventory?${qs}` : "/inventory");
  }

  const chips: { slug: string; label: string }[] = [
    { slug: ALL_FILTER_SLUG, label: "All" },
    ...availableGroups.map((g) => ({ slug: g.slug, label: g.label })),
  ];

  return (
    <PageShell hideTicker>
      <SEO
        title="Inventory | Used & Refurbished Phones, Laptops in Houston"
        description="Browse our current inventory of unlocked iPhones, Samsungs, Pixels, MacBooks and laptops at our Houston shop."
        path="/inventory"
        jsonLd={[
          localBusinessJsonLd(),
          breadcrumbJsonLd([{ name: "Inventory", path: "/inventory" }]),
          inventoryProductJsonLd(items),
        ]}
      />
      <Breadcrumbs items={[{ label: "Inventory" }]} />

      <section className="py-12 px-4 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
            CURRENT <span className="text-red-500">INVENTORY</span>
          </h1>
          <p className="text-lg font-bold text-zinc-600 mb-8 max-w-2xl">
            Stock changes daily. Call to confirm availability or reserve an item — we'll hold it for 24 hours.
          </p>

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
