import { useEffect, useMemo, useState } from "react";
import { Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, SITE_URL, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Button } from "@/components/ui/button";
import { fetchInventory } from "@/lib/api";
import { INVENTORY_FALLBACK, type InventoryItem } from "@/data/inventory";
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

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY_FALLBACK);
  const [reserving, setReserving] = useState<InventoryItem | null>(null);
  const [filter, setFilter] = useState<string>("All");

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

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => set.add(it.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const visible = filter === "All" ? items : items.filter((it) => it.category === filter);

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

      <section className="py-12 px-4 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.95]">
            CURRENT <span className="text-red-500">INVENTORY</span>
          </h1>
          <p className="text-lg font-bold text-zinc-400 mb-8 max-w-2xl">
            Stock changes daily. Call to confirm availability or reserve an item — we'll hold it for 24 hours.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 font-black uppercase text-sm tracking-widest border-2 transition-colors ${filter === c ? "bg-red-500 border-red-500 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-500"}`}
                data-testid={`filter-${c}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((it) => (
              <article key={it.id} className="bg-black border-4 border-zinc-800 p-5 flex flex-col gap-3 hover:border-red-500 transition-colors" data-testid={`inventory-${it.id}`}>
                {it.imageUrl && (
                  <div className="-mx-5 -mt-5 mb-1 aspect-[4/3] bg-zinc-900 overflow-hidden border-b-2 border-zinc-800">
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
                  <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{it.category}</div>
                  {it.availability && (
                    <span
                      data-testid={`availability-${it.id}`}
                      className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border-2 ${
                        it.availability.toLowerCase().includes("out")
                          ? "border-zinc-600 text-zinc-400"
                          : "border-yellow-400 text-yellow-400"
                      }`}
                    >
                      {it.availability}
                    </span>
                  )}
                </div>
                <h3 className="font-black uppercase text-xl text-white">{it.brand} {it.model}</h3>
                <ul className="space-y-1 text-sm font-bold text-zinc-400">
                  {it.storage && <li>Storage: <span className="text-white">{it.storage}</span></li>}
                  {it.color && <li>Color: <span className="text-white">{it.color}</span></li>}
                  {it.condition && <li>Condition: <span className="text-white">{it.condition}</span></li>}
                  {it.carrier && <li>Carrier: <span className="text-white">{it.carrier}</span></li>}
                  {it.warranty && <li>Warranty: <span className="text-white">{it.warranty}</span></li>}
                </ul>
                <div className="mt-auto pt-3 border-t border-zinc-800 flex flex-col gap-3">
                  <div className="font-black uppercase text-2xl text-yellow-400">{it.price}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild className="rounded-none bg-black border-2 border-white hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-10 px-2 text-xs" data-testid={`button-call-${it.id}`}>
                      <a href={BUSINESS.phoneTel} aria-label={`Call about ${it.brand} ${it.model}`}>
                        <Phone className="w-3.5 h-3.5 mr-1" /> Call
                      </a>
                    </Button>
                    <Button onClick={() => setReserving(it)} className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-10 px-2 text-xs" data-testid={`button-reserve-${it.id}`}>
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
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={() => setReserving(null)}>
          <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <ReservationForm itemId={reserving.id} itemLabel={`${reserving.brand} ${reserving.model} — ${reserving.price}`} onClose={() => setReserving(null)} />
          </div>
        </div>
      )}

      <LocationCard />
    </PageShell>
  );
}
