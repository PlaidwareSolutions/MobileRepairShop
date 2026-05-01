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
import { Button } from "@/components/ui/button";
import { SALES_BY_SLUG, SALES_DATA } from "@/data/sales";
import {
  inventoryGroupBySlug,
  inventoryGroupSlugForPageSlug,
  isPhonePageSlug,
} from "@/lib/inventoryGroups";
import { BUSINESS, FINANCING } from "@/content";
import { useBusiness } from "@/components/BusinessContext";
import NotFound from "@/pages/not-found";

type SalesPageType = "sell" | "shop-hub" | "shop-brand" | "accessories-hub" | "accessories";

const ACCESSORY_HUB_SLUGS = new Set(["phone-accessories-houston-tx"]);
const SHOP_BRAND_HUB_SLUGS = new Set([
  "phones-for-sale-houston-tx",
  "laptops-for-sale-houston-tx",
  "used-phones-houston-tx",
  "refurbished-phones-houston-tx",
  "new-phones-houston-tx",
  // buy-samsung is a hub now that we have per-model Samsung shop pages —
  // the model pages roll up under it via getParentHub.
  "buy-samsung-phones-houston-tx",
]);

function getSalesPageType(slug: string): SalesPageType {
  if (slug.startsWith("sell-")) return "sell";
  if (slug === "shop-houston-tx") return "shop-hub";
  if (ACCESSORY_HUB_SLUGS.has(slug)) return "accessories-hub";
  if (slug.startsWith("buy-") || SHOP_BRAND_HUB_SLUGS.has(slug)) return "shop-brand";
  return "accessories";
}

function isHubPage(slug: string, pageType: SalesPageType): boolean {
  return pageType === "shop-hub" || pageType === "accessories-hub" || SHOP_BRAND_HUB_SLUGS.has(slug);
}

function getParentHub(slug: string, pageType: SalesPageType): { name: string; path: string } | null {
  if (slug === "shop-houston-tx") return null;
  if (pageType === "sell") {
    if (slug === "sell-phone-houston-tx") return { name: "Shop", path: "/shop-houston-tx" };
    return { name: "Sell Your Phone", path: "/sell-phone-houston-tx" };
  }
  if (pageType === "shop-brand") {
    if (slug === "phones-for-sale-houston-tx" || slug === "laptops-for-sale-houston-tx") {
      return { name: "Shop", path: "/shop-houston-tx" };
    }
    if (slug.includes("laptop") || slug === "buy-macbook-houston-tx") {
      return { name: "Laptops for Sale", path: "/laptops-for-sale-houston-tx" };
    }
    if (slug === "used-phones-houston-tx" || slug === "refurbished-phones-houston-tx" || slug === "new-phones-houston-tx") {
      return { name: "Phones for Sale", path: "/phones-for-sale-houston-tx" };
    }
    if (slug.startsWith("buy-samsung-galaxy-")) {
      return { name: "Buy Samsung Phones", path: "/buy-samsung-phones-houston-tx" };
    }
    return { name: "Phones for Sale", path: "/phones-for-sale-houston-tx" };
  }
  // accessories
  if (slug === "phone-accessories-houston-tx") return { name: "Shop", path: "/shop-houston-tx" };
  return { name: "Phone Accessories", path: "/phone-accessories-houston-tx" };
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
  const isBuyback = data.slug === "sell-phone-houston-tx";
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
    brand: { "@type": "Brand", name: "Gadget X Repairs" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "49",
      highPrice: "999",
      offerCount: data.highlights.length,
      availability: "https://schema.org/InStock",
      seller: { "@type": "ElectronicsStore", name: "Gadget X Repairs" },
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

      <section className="py-16 px-4 bg-zinc-50">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
              WHY <span className="text-red-500">US</span>
            </h2>
            <p className="text-lg font-bold text-zinc-600 mb-6">{data.intro}</p>
            <ul className="space-y-3">
              {data.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-base md:text-lg font-bold text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <Button asChild className="bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-semibold uppercase tracking-wide h-12 px-6">
                <a href={business.phoneTel}>Call to Browse</a>
              </Button>
              <Button asChild variant="outline" className="border border-zinc-300 hover:bg-white hover:text-black font-semibold uppercase tracking-wide h-12 px-6">
                <Link href={inventoryHref} data-testid="link-view-inventory">{inventoryLabel}</Link>
              </Button>
              {isPhonePageSlug(data.slug) && (
                <Link
                  href={FINANCING.pagePath}
                  className="bg-red-50 text-red-600 border border-red-200 rounded-full px-3 py-1 uppercase font-semibold text-[11px] tracking-wide hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
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
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
                  {isBuyback ? <>GET YOUR <span className="text-red-500">CASH OFFER</span></> : <>SELL YOUR <span className="text-red-500">PHONE</span></>}
                </h2>
                <p className="text-lg font-bold text-zinc-600 mb-6">
                  We pay cash for working iPhones, Samsungs, Pixels and Motorolas — including phones with cracked screens.
                </p>
                <SellPhoneForm />
              </>
            ) : isHub ? (
              <>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
                  ASK ABOUT <span className="text-red-500">STOCK</span>
                </h2>
                <p className="text-lg font-bold text-zinc-600 mb-6">
                  Looking for something specific? Send us a quick message and we'll text or call you back today with what we have in stock and the price.
                </p>
                <ContactForm />
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
                  RESERVE <span className="text-red-500">OR VISIT</span>
                </h2>
                <p className="text-lg font-bold text-zinc-600 mb-6">
                  Reserve {data.title.toLowerCase()} for in-store pickup. Walk-ins always welcome — but reserving guarantees we have it ready when you arrive.
                </p>
                <ReservationForm itemId={data.slug} itemLabel={data.title} />
              </>
            )}
          </div>
        </div>
      </section>

      {isHub && childPages.length > 0 && (
        <section className="py-16 px-4 bg-white border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-zinc-900">
              BROWSE <span className="text-red-500">{data.hero.eyebrow.toUpperCase()}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="hub-children">
              {childPages.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="bg-zinc-50 border border-zinc-200 hover:border-red-500 p-5 transition-colors group"
                  data-testid={`hub-child-${c.slug}`}
                >
                  <div className="font-bold uppercase text-base text-zinc-900 group-hover:text-red-500 transition-colors leading-tight">
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
