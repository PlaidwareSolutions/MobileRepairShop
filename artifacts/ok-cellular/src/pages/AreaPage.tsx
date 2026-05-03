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
import { useBusiness } from "@/components/BusinessContext";
import NotFound from "@/pages/not-found";

export default function AreaPage() {
  const business = useBusiness();
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
        jsonLd={[localBusinessJsonLd(business), breadcrumbJsonLd([{ name: "Areas", path: "/phone-repair-humble-tx" }, { name: data.title, path }])]}
      />
      <Breadcrumbs items={[{ label: "Areas Served" }, { label: data.title }]} />
      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

      <section className="py-16 px-4 bg-muted/40">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
              from <span className="text-primary">{data.city}</span>
            </h2>
            <p className="text-lg font-bold text-foreground mb-6 flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
              {data.driveTime}
            </p>
            <h3 className="text-muted-foreground font-semibold tracking-wide text-xs mb-3">Nearby landmarks</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {data.landmarks.map((l) => (
                <span key={l} className="bg-muted border border-border px-3 py-1 font-semibold text-xs">
                  {l}
                </span>
              ))}
            </div>
            <h3 className="text-muted-foreground font-semibold tracking-wide text-xs mb-3">What we do for {data.city}</h3>
            <ul className="space-y-3 mb-8">
              {data.whyUs.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base font-bold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-6">
                <a href={business.phoneTel}>Call Now</a>
              </Button>
              <Button asChild variant="outline" className="border border-border hover:bg-white hover:text-black font-semibold h-12 px-6">
                <a href={business.mapsLink} target="_blank" rel="noreferrer">Directions</a>
              </Button>
              <Button asChild variant="outline" className="border border-border hover:bg-white hover:text-black font-semibold h-12 px-6">
                <Link href="/phone-repair-humble-tx">All Repairs</Link>
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
              Get a <span className="text-primary">quote</span>
            </h2>
            <RepairQuoteForm />
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
