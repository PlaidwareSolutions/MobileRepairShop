import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { RelatedLinks } from "@/components/RelatedLinks";
import { LocationCard } from "@/components/LocationCard";
import { SEO, SITE_URL, localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { SellPhoneForm } from "@/components/forms/SellPhoneForm";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { InventoryTileList } from "@/components/InventoryTileList";
import { Button } from "@/components/ui/button";
import { SALES_BY_SLUG, SALES_DATA } from "@/data/sales";
import { fetchInventory } from "@/lib/api";
import type { InventoryItem } from "@/data/inventory";
import {
  inventoryGroupBySlug,
  inventoryGroupSlugForPageSlug,
  isPhonePageSlug,
} from "@/lib/inventoryGroups";
import { BUSINESS, FINANCING } from "@/content";
import { useBusiness } from "@/components/BusinessContext";
import NotFound from "@/pages/not-found";

type SalesPageType = "sell" | "shop-hub" | "shop-brand" | "accessories-hub" | "accessories";

const ACCESSORY_HUB_SLUGS = new Set(["phone-accessories-humble-tx"]);
const SHOP_BRAND_HUB_SLUGS = new Set([
  "phones-for-sale-humble-tx",
  "laptops-for-sale-humble-tx",
  "used-phones-humble-tx",
  "refurbished-phones-humble-tx",
  "new-phones-humble-tx",
  // buy-samsung is a hub now that we have per-model Samsung shop pages —
  // the model pages roll up under it via getParentHub.
  "buy-samsung-phones-humble-tx",
]);

function getSalesPageType(slug: string): SalesPageType {
  if (slug.startsWith("sell-")) return "sell";
  if (slug === "shop-humble-tx") return "shop-hub";
  if (ACCESSORY_HUB_SLUGS.has(slug)) return "accessories-hub";
  if (slug.startsWith("buy-") || SHOP_BRAND_HUB_SLUGS.has(slug)) return "shop-brand";
  return "accessories";
}

function isHubPage(slug: string, pageType: SalesPageType): boolean {
  return pageType === "shop-hub" || pageType === "accessories-hub" || SHOP_BRAND_HUB_SLUGS.has(slug);
}

function getParentHub(slug: string, pageType: SalesPageType): { name: string; path: string } | null {
  if (slug === "shop-humble-tx") return null;
  if (pageType === "sell") {
    if (slug === "sell-phone-humble-tx") return { name: "Shop", path: "/shop-humble-tx" };
    return { name: "Sell Your Phone", path: "/sell-phone-humble-tx" };
  }
  if (pageType === "shop-brand") {
    if (slug === "phones-for-sale-humble-tx" || slug === "laptops-for-sale-humble-tx") {
      return { name: "Shop", path: "/shop-humble-tx" };
    }
    if (slug.includes("laptop") || slug === "buy-macbook-humble-tx") {
      return { name: "Laptops for Sale", path: "/laptops-for-sale-humble-tx" };
    }
    if (slug === "used-phones-humble-tx" || slug === "refurbished-phones-humble-tx" || slug === "new-phones-humble-tx") {
      return { name: "Phones for Sale", path: "/phones-for-sale-humble-tx" };
    }
    if (slug.startsWith("buy-samsung-galaxy-")) {
      return { name: "Buy Samsung Phones", path: "/buy-samsung-phones-humble-tx" };
    }
    return { name: "Phones for Sale", path: "/phones-for-sale-humble-tx" };
  }
  // accessories
  if (slug === "phone-accessories-humble-tx") return { name: "Shop", path: "/shop-humble-tx" };
  return { name: "Phone Accessories", path: "/phone-accessories-humble-tx" };
}

export default function SalesPage() {
  const business = useBusiness();
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const slug = params?.slug ?? "";
  const data = SALES_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/${data.slug}`;
  const pageType = getSalesPageType(data.slug);
  const parent = getParentHub(data.slug, pageType);
  const isBuyback = data.slug === "sell-phone-humble-tx";
  const isSellPage = pageType === "sell";
  const isHub = isHubPage(data.slug, pageType);
  // Accessories pages aren't really tied to a device-class inventory bucket, so
  // keep the generic /inventory link for them. For shop / sell / brand pages
  // we deep-link to the matching /inventory/<group> when one clearly applies.
  const inventoryGroup =
    pageType === "accessories" || pageType === "accessories-hub"
      ? null
      : inventoryGroupBySlug(inventoryGroupSlugForPageSlug(data.slug));
  const inventoryHref = inventoryGroup ? `/inventory/${inventoryGroup.slug}` : "/inventory";
  const inventoryLabel = inventoryGroup ? `View ${inventoryGroup.label}` : "View Inventory";

  // Inline inventory rendering: only the iPhone sales page surfaces live tiles
  // today. Other brand sales pages keep the existing "View <Group>" CTA so
  // their behaviour is unchanged by this task.
  const showInlineInventory = data.slug === "buy-iphone-humble-tx";
  const [inlineState, setInlineState] = useState<{
    status: "loading" | "ready" | "error";
    items: InventoryItem[];
  }>({ status: "loading", items: [] });

  useEffect(() => {
    if (!showInlineInventory) return;
    let cancelled = false;
    setInlineState({ status: "loading", items: [] });
    fetchInventory()
      .then((d) => {
        if (cancelled) return;
        const all = Array.isArray(d) ? (d as unknown as InventoryItem[]) : [];
        const appleGroup = inventoryGroupBySlug("apple");
        const apple = appleGroup
          ? all.filter((it) =>
              appleGroup.matches({ category: it.category, brand: it.brand }),
            )
          : [];
        // Narrow the Apple group to iPhones only on this page — iPads /
        // MacBooks / Apple Watch / AirPods belong on the broader
        // /inventory/apple view, not the "Buy iPhone" sales page.
        const iphones = apple.filter(
          (it) => /iphone/i.test(it.category) || /iphone/i.test(it.model),
        );
        setInlineState({ status: "ready", items: iphones });
      })
      .catch(() => {
        if (cancelled) return;
        setInlineState({ status: "error", items: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [showInlineInventory]);

  const breadcrumbItems = parent
    ? [{ label: parent.name, to: parent.path }, { label: data.title }]
    : [{ label: data.title }];
  const jsonLdBreadcrumb = parent
    ? [{ name: parent.name, path: parent.path }, { name: data.title, path }]
    : [{ name: data.title, path }];

  const childPages = isHub
    ? SALES_DATA.filter(
        (s) =>
          s.slug !== data.slug &&
          (data.related.includes(s.slug) || getParentHub(s.slug, getSalesPageType(s.slug))?.path === path),
      ).slice(0, 12)
    : [];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.title,
    category: data.title,
    description: data.intro,
    brand: { "@type": "Brand", name: "OK Cellular" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "49",
      highPrice: "999",
      offerCount: data.highlights.length,
      availability: "https://schema.org/InStock",
      seller: { "@type": "ElectronicsStore", name: "OK Cellular" },
    },
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: data.title,
    description: data.intro,
    numberOfItems: childPages.length,
    itemListElement: childPages.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${c.slug}`,
      name: c.title,
    })),
  };

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={[
          localBusinessJsonLd(business),
          faqJsonLd(data.faqs),
          breadcrumbJsonLd(jsonLdBreadcrumb),
          isHub && childPages.length > 0 ? itemListJsonLd : productJsonLd,
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

      <section className="py-16 px-4 bg-muted/40">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
              Why <span className="text-primary">us</span>
            </h2>
            <p className="text-lg font-bold text-muted-foreground mb-6">{data.intro}</p>
            <ul className="space-y-3">
              {data.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-base md:text-lg font-bold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-6">
                <a href={business.phoneTel}>Call to Browse</a>
              </Button>
              {!showInlineInventory && (
                <Button asChild variant="outline" className="border border-border hover:bg-white hover:text-black font-semibold h-12 px-6">
                  <Link href={inventoryHref} data-testid="link-view-inventory">{inventoryLabel}</Link>
                </Button>
              )}
              {isPhonePageSlug(data.slug) && (
                <Link
                  href={FINANCING.pagePath}
                  className="bg-muted/60 text-primary border border-primary rounded-full px-3 py-1 uppercase font-semibold text-[11px] tracking-wide hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  data-testid="financing-pill"
                  aria-label={`${FINANCING.pillLabel} — learn more`}
                >
                  {FINANCING.pillLabel}
                </Link>
              )}
            </div>
          </div>
          <div>
            {isSellPage ? (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
                  {isBuyback ? <>GET YOUR <span className="text-primary">CASH OFFER</span></> : <>SELL YOUR <span className="text-primary">PHONE</span></>}
                </h2>
                <p className="text-lg font-bold text-muted-foreground mb-6">
                  We pay cash for working iPhones, Samsungs, Pixels and Motorolas — including phones with cracked screens.
                </p>
                <SellPhoneForm />
              </>
            ) : isHub ? (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
                  Ask about <span className="text-primary">stock</span>
                </h2>
                <p className="text-lg font-bold text-muted-foreground mb-6">
                  Looking for something specific? Send us a quick message and we'll text or call you back today with what we have in stock and the price.
                </p>
                <ContactForm />
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
                  Reserve <span className="text-primary">or visit</span>
                </h2>
                <p className="text-lg font-bold text-muted-foreground mb-6">
                  Reserve {data.title.toLowerCase()} for in-store pickup. Walk-ins always welcome — but reserving guarantees we have it ready when you arrive.
                </p>
                <ReservationForm itemId={data.slug} itemLabel={data.title} />
              </>
            )}
          </div>
        </div>
      </section>

      {showInlineInventory && (
        <section
          className="py-16 px-4 bg-white border-t border-border"
          data-testid="sales-inline-inventory"
        >
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 text-foreground">
              iPhones <span className="text-primary">in stock</span>
            </h2>
            {inlineState.status === "loading" && (
              <div
                className="bg-muted/40 border border-border p-6 text-center text-muted-foreground font-semibold tracking-wide text-sm"
                data-testid="sales-inventory-loading"
              >
                Loading current iPhone inventory…
              </div>
            )}
            {inlineState.status === "error" && (
              <div
                className="bg-muted/40 border border-border p-6 text-center text-muted-foreground font-semibold tracking-wide text-sm"
                data-testid="sales-inventory-error"
              >
                We couldn't load live inventory just now — call us at {business.phoneDisplay} and we'll tell you what's on the shelf.
              </div>
            )}
            {inlineState.status === "ready" && inlineState.items.length === 0 && (
              <div
                className="bg-muted/40 border border-border p-6 text-center text-muted-foreground font-semibold tracking-wide text-sm"
                data-testid="sales-inventory-empty"
              >
                No iPhones in stock right now — call us at {business.phoneDisplay} and we'll let you know when more come in.
              </div>
            )}
            {inlineState.status === "ready" && inlineState.items.length > 0 && (
              <InventoryTileList items={inlineState.items} />
            )}
            <div className="mt-8">
              <Link
                href={inventoryHref}
                className="text-sm font-semibold text-primary hover:underline"
                data-testid="link-see-all-apple-inventory"
              >
                See all Apple inventory →
              </Link>
            </div>
          </div>
        </section>
      )}

      {isHub && childPages.length > 0 && (
        <section className="py-16 px-4 bg-white border-t border-border">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 text-foreground">
              Browse <span className="text-primary">{data.hero.eyebrow}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="hub-children">
              {childPages.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="bg-muted/40 border border-border hover:border-primary p-5 transition-colors group"
                  data-testid={`hub-child-${c.slug}`}
                >
                  <div className="font-semibold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
                    {c.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq items={data.faqs} />
      <LocationCard />
      <RelatedLinks slugs={data.related} inventoryGroupSlug={inventoryGroup?.slug} />
    </PageShell>
  );
}
