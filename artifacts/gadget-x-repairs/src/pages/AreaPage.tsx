import { useRoute, Link } from "wouter";
import { CheckCircle2, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { RepairQuoteForm } from "@/components/forms/RepairQuoteForm";
import { Button } from "@/components/ui/button";
import { AREAS_BY_SLUG } from "@/data/areas";
import { BUSINESS } from "@/content";
import NotFound from "@/pages/not-found";

export default function AreaPage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const slug = params?.slug ?? "";
  const data = AREAS_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/${data.slug}`;

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={[localBusinessJsonLd(), breadcrumbJsonLd([{ name: "Areas", path: "/phone-repair-houston-tx" }, { name: data.title, path }])]}
      />
      <Breadcrumbs items={[{ label: "Areas Served" }, { label: data.title }]} />
      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

      <section className="py-16 px-4 bg-zinc-50">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-zinc-900">
              FROM <span className="text-red-500 text-stroke-black">{data.city.toUpperCase()}</span>
            </h2>
            <p className="text-lg font-bold text-zinc-700 mb-6 flex items-start gap-3">
              <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              {data.driveTime}
            </p>
            <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-3">Nearby landmarks</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {data.landmarks.map((l) => (
                <span key={l} className="bg-zinc-100 border-2 border-zinc-300 px-3 py-1 font-bold uppercase text-xs">
                  {l}
                </span>
              ))}
            </div>
            <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-3">What we do for {data.city}</h3>
            <ul className="space-y-3 mb-8">
              {data.whyUs.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base font-bold text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest h-12 px-6">
                <a href={BUSINESS.phoneTel}>Call Now</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-12 px-6">
                <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">Directions</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-12 px-6">
                <Link href="/phone-repair-houston-tx">All Repairs</Link>
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-zinc-900">
              GET A <span className="text-red-500">QUOTE</span>
            </h2>
            <RepairQuoteForm />
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
