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
import { Button } from "@/components/ui/button";
import { SALES_BY_SLUG } from "@/data/sales";
import { BUSINESS } from "@/content";
import NotFound from "@/pages/not-found";

export default function SalesPage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const slug = params?.slug ?? "";
  const data = SALES_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/${data.slug}`;
  const isBuyback = data.slug === "buy-my-phone-houston";

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={[
          localBusinessJsonLd(),
          faqJsonLd(data.faqs),
          breadcrumbJsonLd([{ name: "Shop", path: "/phones-for-sale-houston" }, { name: data.title, path }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Shop", to: "/phones-for-sale-houston" }, { label: data.title }]} />

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
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              {isBuyback ? <>GET YOUR <span className="text-red-500">CASH OFFER</span></> : <>SELL YOUR <span className="text-red-500">OLD PHONE</span></>}
            </h2>
            <p className="text-lg font-bold text-zinc-400 mb-6">
              We pay cash for working iPhones, Samsungs, Pixels and Motorolas — including phones with cracked screens.
            </p>
            <SellPhoneForm />
          </div>
        </div>
      </section>

      <Faq items={data.faqs} />
      <LocationCard />
      <RelatedLinks slugs={data.related} />
    </PageShell>
  );
}
