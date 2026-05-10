import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/SocialLinks";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const VALUES = [
  "Honest quotes — no surprises at pickup",
  "Quality OEM-grade parts on every repair",
  "90-day warranty on everything we fix",
  "Same-day repair where possible",
  "Walk-ins welcome 6 days a week",
];

export default function AboutPage() {
  const business = useBusiness();
  return (
    <PageShell hideTicker>
      <SEO
        title="About OK Cellular | 5+ Years in Humble TX"
        description="About OK Cellular in Humble TX — 5+ years of honest repair, sales and prepaid service from our Will Clayton Pkwy shop. Walk-ins welcome!"
        path="/about"
        jsonLd={[localBusinessJsonLd(business), breadcrumbJsonLd([{ name: "About", path: "/about" }])]}
      />
      <Breadcrumbs items={[{ label: "About" }]} />

      <section className="py-16 md:py-24 px-4 bg-muted/40 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8 leading-tight">
            5+ years repairing <span className="text-primary">Humble's devices</span>
          </h1>
          <p className="text-xl font-bold text-foreground mb-6">
            OK Cellular has been fixing phones, tablets, laptops and gaming consoles for Humble since 2020.
            From our shop at {business.addressFull}, we serve walk-in customers six days a week.
          </p>
          <p className="text-lg font-bold text-muted-foreground mb-6">
            We started small — one bench, one technician — and grew because of one simple promise: tell people honestly
            what's wrong with their device, charge them honestly to fix it, and stand behind the work.
          </p>
          <p className="text-lg font-bold text-muted-foreground mb-10">
            Today we repair every major brand of phone, tablet, laptop and console; sell tested used and refurbished
            phones; activate every prepaid carrier; and accept bill payments. The promise hasn't changed.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
            What we <span className="text-primary">stand for</span>
          </h2>
          <ul className="space-y-3 mb-10">
            {VALUES.map((v) => (
              <li key={v} className="flex items-start gap-3 text-lg font-bold text-foreground">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20 px-4 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
            Our <span className="text-primary">shop & team</span>
          </h2>
          <p className="text-muted-foreground mb-8">A peek inside the OK Cellular shop on Will Clayton Pkwy.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <figure className="rounded-xl overflow-hidden shadow-md border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/photos/storefront-placeholder.svg"
                  alt="OK Cellular storefront — placeholder, real photo coming soon"
                  className="w-full h-full object-cover"
                  width={1024}
                  height={768}
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-muted-foreground font-medium">Our Humble TX shop — Will Clayton Pkwy</figcaption>
            </figure>

            <figure className="rounded-xl overflow-hidden shadow-md border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/photos/process-bench-1024.jpg"
                  alt="OK Cellular technician at the repair bench"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-muted-foreground font-medium">Technician at the repair bench</figcaption>
            </figure>

            <figure className="rounded-xl overflow-hidden shadow-md border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/photos/iphone-repair-1024.jpg"
                  alt="OK Cellular technician performing a screen repair"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-muted-foreground font-medium">Screen repair in progress</figcaption>
            </figure>

            <figure className="rounded-xl overflow-hidden shadow-md border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/photos/storefront-placeholder.svg"
                  alt="OK Cellular storefront interior — placeholder, real photo coming soon"
                  className="w-full h-full object-cover"
                  width={1024}
                  height={768}
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-muted-foreground font-medium">Inside our OK Cellular storefront</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-4 bg-muted/40 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-6">
              <a href={business.phoneTel}>Call {business.phoneDisplay}</a>
            </Button>
            <Button asChild variant="outline" className="border border-border hover:bg-white hover:text-black font-semibold h-12 px-6">
              <Link href="/reviews-humble-tx">Read Reviews</Link>
            </Button>
            <Button asChild variant="outline" className="border border-border hover:bg-white hover:text-black font-semibold h-12 px-6">
              <Link href="/contact-humble-tx">Contact Us</Link>
            </Button>
          </div>

          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Follow Us</p>
            <SocialLinks business={business} iconClass="w-6 h-6" />
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
