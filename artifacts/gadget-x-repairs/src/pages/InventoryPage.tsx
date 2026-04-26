import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Button } from "@/components/ui/button";
import { fetchInventory } from "@/lib/api";
import { INVENTORY_FALLBACK, type InventoryItem } from "@/data/inventory";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY_FALLBACK);
  const [reserving, setReserving] = useState<InventoryItem | null>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    fetchInventory()
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setItems(d as InventoryItem[]);
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
        jsonLd={[localBusinessJsonLd(), breadcrumbJsonLd([{ name: "Inventory", path: "/inventory" }])]}
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
                <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{it.category}</div>
                <h3 className="font-black uppercase text-xl text-white">{it.brand} {it.model}</h3>
                <ul className="space-y-1 text-sm font-bold text-zinc-400">
                  {it.storage && <li>Storage: <span className="text-white">{it.storage}</span></li>}
                  {it.color && <li>Color: <span className="text-white">{it.color}</span></li>}
                  {it.condition && <li>Condition: <span className="text-white">{it.condition}</span></li>}
                  {it.carrier && <li>Carrier: <span className="text-white">{it.carrier}</span></li>}
                  {it.warranty && <li>Warranty: <span className="text-white">{it.warranty}</span></li>}
                </ul>
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-zinc-800">
                  <div className="font-black uppercase text-2xl text-yellow-400">{it.price}</div>
                  <Button onClick={() => setReserving(it)} className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-10 px-4 text-xs" data-testid={`button-reserve-${it.id}`}>
                    Reserve
                  </Button>
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
