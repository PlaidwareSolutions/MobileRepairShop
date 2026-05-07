import { useCallback, useState } from "react";
import { Link } from "wouter";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { useBusiness } from "@/components/BusinessContext";
import { FINANCING } from "@/content";
import type { InventoryItem } from "@/data/inventory";

const BRAND_FALLBACK_IMAGE: Record<string, { slug: string; alt: string }> = {
  apple:       { slug: "iphone-repair",  alt: "Apple iPhone repair at OK Cellular" },
  iphone:      { slug: "iphone-repair",  alt: "Apple iPhone repair at OK Cellular" },
  samsung:     { slug: "samsung-repair", alt: "Samsung Galaxy repair at OK Cellular" },
  google:      { slug: "pixel-repair",   alt: "Google Pixel repair at OK Cellular" },
  pixel:       { slug: "pixel-repair",   alt: "Google Pixel repair at OK Cellular" },
  macbook:     { slug: "macbook-repair", alt: "MacBook repair at OK Cellular" },
  sony:        { slug: "ps5-repair",     alt: "PlayStation repair at OK Cellular" },
  playstation: { slug: "ps5-repair",     alt: "PlayStation repair at OK Cellular" },
  xbox:        { slug: "xbox-repair",    alt: "Xbox repair at OK Cellular" },
  microsoft:   { slug: "xbox-repair",    alt: "Xbox repair at OK Cellular" },
};

function getBrandFallback(brand: string, category: string): { slug: string; alt: string } {
  const key = brand.toLowerCase().replace(/\s+/g, "");
  if (BRAND_FALLBACK_IMAGE[key]) return BRAND_FALLBACK_IMAGE[key];
  const catLow = category.toLowerCase();
  if (catLow.includes("console") || catLow.includes("playstation")) return BRAND_FALLBACK_IMAGE.playstation!;
  if (catLow.includes("xbox")) return BRAND_FALLBACK_IMAGE.xbox!;
  if (catLow.includes("tablet") || catLow.includes("ipad")) return { slug: "tablet-repair", alt: "Tablet repair at OK Cellular" };
  if (catLow.includes("laptop") || catLow.includes("macbook")) return { slug: "laptop-repair", alt: "Laptop repair at OK Cellular" };
  return { slug: "sell-phones", alt: `${brand} device at OK Cellular` };
}

function BrandFallbackImage({ brand, category, model, itemId }: { brand: string; category: string; model: string; itemId: string }) {
  const fb = getBrandFallback(brand, category);
  return (
    <div
      className="-mx-5 -mt-5 mb-1 aspect-[4/3] bg-muted overflow-hidden border-b border-border"
      data-testid={`inventory-placeholder-${itemId}`}
    >
      <picture>
        <source srcSet={`/images/photos/${fb.slug}-640.webp`} type="image/webp" />
        <img
          src={`/images/photos/${fb.slug}-640.jpg`}
          alt={`${brand} ${model} — ${fb.alt}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </picture>
    </div>
  );
}

type Props = {
  items: InventoryItem[];
};

export function InventoryTileList({ items }: Props) {
  const business = useBusiness();
  const [reserving, setReserving] = useState<InventoryItem | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => {
          const images = [it.imageUrl, it.imageUrl2, it.imageUrl3].filter(
            (u): u is string => !!u,
          );
          return (
            <article
              key={it.id}
              className="bg-white border border-border p-5 flex flex-col gap-3 hover:border-primary transition-colors"
              data-testid={`inventory-${it.id}`}
            >
              {images.length > 0 ? (
                <ItemImageCarousel
                  images={images}
                  alt={`${it.brand} ${it.model}`}
                  itemId={it.id}
                />
              ) : (
                <BrandFallbackImage brand={it.brand ?? ""} category={it.category ?? ""} model={it.model} itemId={it.id} />
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="text-muted-foreground font-semibold text-xs tracking-wide">
                  {it.category}
                </div>
                {it.availability && (
                  <span
                    data-testid={`availability-${it.id}`}
                    className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full border ${
                      it.availability.toLowerCase().includes("out")
                        ? "border-border text-muted-foreground bg-muted/40"
                        : "border-primary text-primary bg-muted/60"
                    }`}
                  >
                    {it.availability}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-xl text-foreground">
                {it.brand} {it.model}
              </h3>
              <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                {it.storage && (
                  <li>
                    Storage: <span className="text-foreground">{it.storage}</span>
                  </li>
                )}
                {it.color && (
                  <li>
                    Color: <span className="text-foreground">{it.color}</span>
                  </li>
                )}
                {it.condition && (
                  <li>
                    Condition:{" "}
                    <span className="text-foreground">{it.condition}</span>
                  </li>
                )}
                {it.carrier && (
                  <li>
                    Carrier: <span className="text-foreground">{it.carrier}</span>
                  </li>
                )}
                {it.warranty && (
                  <li>
                    Warranty:{" "}
                    <span className="text-foreground">{it.warranty}</span>
                  </li>
                )}
              </ul>
              <div className="mt-auto pt-3 border-t border-border flex flex-col gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold text-2xl text-primary">
                    {it.price}
                  </div>
                  {it.financingEnabled && (
                    <Link
                      href={FINANCING.pagePath}
                      className="bg-muted/60 text-primary border border-primary rounded-full px-2 py-0.5 uppercase font-semibold text-[10px] tracking-wide hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      data-testid={`financing-pill-${it.id}`}
                      aria-label={`Financing from ${it.financingDownPaymentDisplay ?? "$80"} down — learn more`}
                    >
                      Financing from {it.financingDownPaymentDisplay ?? "$80"} down
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    className="bg-white border border-border hover:bg-white hover:text-black text-foreground font-semibold h-10 px-2 text-xs"
                    data-testid={`button-call-${it.id}`}
                  >
                    <a
                      href={business.phoneTel}
                      aria-label={`Call about ${it.brand} ${it.model}`}
                    >
                      <Phone className="w-3.5 h-3.5 mr-1" /> Call
                    </a>
                  </Button>
                  <Button
                    onClick={() => setReserving(it)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-10 px-2 text-xs"
                    data-testid={`button-reserve-${it.id}`}
                  >
                    Reserve
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {reserving && (
        <div
          className="fixed inset-0 bg-white/80 z-[60] flex items-center justify-center p-4"
          onClick={() => setReserving(null)}
        >
          <div
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ReservationForm
              itemId={reserving.id}
              itemLabel={`${reserving.brand} ${reserving.model} — ${reserving.price}`}
              onClose={() => setReserving(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

function ItemImageCarousel({
  images,
  alt,
  itemId,
}: {
  images: string[];
  alt: string;
  itemId: string;
}) {
  const [idx, setIdx] = useState(0);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length],
  );
  const current = images[Math.min(idx, images.length - 1)];
  return (
    <div className="-mx-5 -mt-5 mb-1 aspect-[4/3] bg-muted overflow-hidden border-b border-border relative group">
      <img
        src={current}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        data-testid={`inventory-image-${itemId}`}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/50"}`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
