import { useRoute, Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { RelatedLinks } from "@/components/RelatedLinks";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { SellPhoneForm } from "@/components/forms/SellPhoneForm";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Button } from "@/components/ui/button";
import { SALES_BY_SLUG } from "@/data/sales";
import { BUSINESS } from "@/content";
import NotFound from "@/pages/not-found";

type SalesPageType = "sell" | "shop-hub" | "shop-brand" | "accessories";

function getSalesPageType(slug: string): SalesPageType {
  if (slug.startsWith("sell-")) return "sell";
  if (slug === "shop-houston-tx") return "shop-hub";
  if (slug.startsWith("buy-") || slug === "phones-for-sale-houston-tx" || slug === "used-phones-houston-tx" || slug === "refurbished-phones-houston-tx" || slug === "new-phones-houston-tx" || slug === "laptops-for-sale-houston-tx") return "shop-brand";
  return "accessories";
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
    return { name: "Phones for Sale", path: "/phones-for-sale-houston-tx" };
  }
  // accessories
  if (slug === "phone-accessories-houston-tx") return { name: "Shop", path: "/shop-houston-tx" };
  return { name: "Phone Accessories", path: "/phone-accessories-houston-tx" };
}

export default function SalesPage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const slug = params?.slug ?? "";
  const data = SALES_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/${data.slug}`;
  const pageType = getSalesPageType(data.slug);
  const parent = getParentHub(data.slug, pageType);
  const isBuyback = data.slug === "sell-phone-houston-tx";
  const isSellPage = pageType === "sell";

  const breadcrumbItems = parent
    ? [{ label: parent.name, to: parent.path }, { label: data.title }]
    : [{ label: data.title }];
  const jsonLdBreadcrumb = parent
    ? [{ name: parent.name, path: parent.path }, { name: data.title, path }]
    : [{ name: data.title, path }];

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={[
          localBusinessJsonLd(),
          faqJsonLd(data.faqs),
          breadcrumbJsonLd(jsonLdBreadcrumb),
          {
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
          },
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              WHY <span className="text-yellow-400 text-stroke-black">US</span>
            </h2>
            <p className="text-lg font-bold text-zinc-400 mb-6">{data.intro}</p>
            <ul className="space-y-3">
              {data.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-base md:text-lg font-bold text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-12 px-6">
                <a href={BUSINESS.phoneTel}>Call to Browse</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-12 px-6">
                <Link href="/inventory">View Inventory</Link>
              </Button>
            </div>
          </div>
          <div>
            {isSellPage ? (
              <>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
                  {isBuyback ? <>GET YOUR <span className="text-red-500">CASH OFFER</span></> : <>SELL YOUR <span className="text-red-500">PHONE</span></>}
                </h2>
                <p className="text-lg font-bold text-zinc-400 mb-6">
                  We pay cash for working iPhones, Samsungs, Pixels and Motorolas — including phones with cracked screens.
                </p>
                <SellPhoneForm />
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
                  RESERVE <span className="text-red-500">OR VISIT</span>
                </h2>
                <p className="text-lg font-bold text-zinc-400 mb-6">
                  Reserve {data.title.toLowerCase()} for in-store pickup. Walk-ins always welcome — but reserving guarantees we have it ready when you arrive.
                </p>
                <ReservationForm itemId={data.slug} itemLabel={data.title} />
              </>
            )}
          </div>
        </div>
      </section>

      <Faq items={data.faqs} />
      <LocationCard />
      <RelatedLinks slugs={data.related} />
    </PageShell>
  );
}
