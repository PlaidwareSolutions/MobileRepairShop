import { useRoute, Link } from "wouter";
import { CheckCircle2, Wrench, Clock, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { RelatedLinks } from "@/components/RelatedLinks";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/SEO";
import { useBusiness } from "@/components/BusinessContext";
import { RepairQuoteForm } from "@/components/forms/RepairQuoteForm";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { PhotoFrame, type Photo } from "@/components/PhotoFrame";
import { SocialLinks } from "@/components/SocialLinks";
import { SERVICES_BY_SLUG, SERVICES_DATA } from "@/data/services";
import { inventoryGroupBySlug, inventoryGroupSlugForPageSlug } from "@/lib/inventoryGroups";
import NotFound from "@/pages/not-found";

const PROCESS_PHOTOS: Photo[] = [
  { src640: "/images/photos/process-diagnostic-640.jpg", src1024: "/images/photos/process-diagnostic-1024.jpg",
    alt: "Customer setting their phone down on the counter for a free diagnostic" },
  { src640: "/images/photos/process-bench-640.jpg", src1024: "/images/photos/process-bench-1024.jpg",
    alt: "Technician working on a device at the repair bench" },
  { src640: "/images/photos/process-quality-640.jpg", src1024: "/images/photos/process-quality-1024.jpg",
    alt: "Hand testing a smartphone screen after the repair" },
  { src640: "/images/photos/process-pickup-640.jpg", src1024: "/images/photos/process-pickup-1024.jpg",
    alt: "Customer picking up their finished device at the counter" },
];

const REPAIR_HUB_SLUGS = new Set([
  "repair-services-houston-tx",
  "phone-repair-houston-tx",
]);

function getRepairParentHub(slug: string): { name: string; path: string } | null {
  if (slug === "repair-services-houston-tx") return null;
  if (slug === "phone-repair-houston-tx") return { name: "Repair Services", path: "/repair-services-houston-tx" };
  if (slug.startsWith("iphone-") && slug !== "iphone-repair-houston-tx") {
    return { name: "iPhone Repair", path: "/iphone-repair-houston-tx" };
  }
  if (slug.startsWith("samsung-galaxy-") || slug === "samsung-screen-repair-houston-tx" || slug === "samsung-battery-replacement-houston-tx") {
    return { name: "Samsung Repair", path: "/samsung-repair-houston-tx" };
  }
  if (slug === "ipad-repair-houston-tx" || slug === "ipad-pro-repair-houston-tx" || slug === "ipad-air-repair-houston-tx" || slug === "samsung-tablet-repair-houston-tx" || slug.startsWith("tablet-")) {
    if (slug === "tablet-repair-houston-tx") return { name: "Repair Services", path: "/repair-services-houston-tx" };
    return { name: "Tablet Repair", path: "/tablet-repair-houston-tx" };
  }
  if (slug.startsWith("laptop-") && slug !== "laptop-repair-houston-tx") {
    return { name: "Laptop Repair", path: "/laptop-repair-houston-tx" };
  }
  if (slug === "macbook-repair-houston-tx" || slug === "hp-laptop-repair-houston-tx" || slug === "dell-laptop-repair-houston-tx" || slug === "lenovo-laptop-repair-houston-tx") {
    return { name: "Laptop Repair", path: "/laptop-repair-houston-tx" };
  }
  if (slug === "computer-repair-houston-tx") return { name: "Repair Services", path: "/repair-services-houston-tx" };
  if (slug === "ps5-repair-houston-tx" || slug === "ps5-hdmi-repair-houston-tx" || slug === "xbox-repair-houston-tx" || slug === "controller-repair-houston-tx") {
    return { name: "Gaming Console Repair", path: "/gaming-console-repair-houston-tx" };
  }
  if (slug === "google-lock-removal-houston-tx") {
    return { name: "Phone Unlocking", path: "/phone-unlocking-houston-tx" };
  }
  return { name: "Repair Services", path: "/repair-services-houston-tx" };
}

export default function ServicePage() {
  const business = useBusiness();
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const slug = params?.slug ?? "";
  const data = SERVICES_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/${data.slug}`;
  const parent = getRepairParentHub(data.slug);
  const isHub = REPAIR_HUB_SLUGS.has(data.slug);

  const breadcrumbItems = parent
    ? [{ label: parent.name, to: parent.path }, { label: data.title }]
    : [{ label: data.title }];
  const jsonLdBreadcrumb = parent
    ? [{ name: parent.name, path: parent.path }, { name: data.title, path }]
    : [{ name: data.title, path }];

  const hubChildren = isHub
    ? SERVICES_DATA.filter(
        (s) =>
          s.slug !== data.slug &&
          (data.related.includes(s.slug) || getRepairParentHub(s.slug)?.path === path),
      ).slice(0, 12)
    : [];

  const inventoryGroup = inventoryGroupBySlug(inventoryGroupSlugForPageSlug(data.slug));

  // Pull a representative starting price/turnaround from the data so the
  // iFixit-style "guide info" strip near the top is concrete, not generic.
  const startingPrice = data.pricing[0]?.price ?? "Free quote";

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={[
          localBusinessJsonLd(business),
          ...(isHub && hubChildren.length > 0
            ? [itemListJsonLd(data.title, hubChildren.map((c) => ({ name: c.title, path: `/${c.slug}` })))]
            : [serviceJsonLd(data.title, data.metaDescription, path, business)]),
          faqJsonLd(data.faqs),
          breadcrumbJsonLd(jsonLdBreadcrumb),
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

      {/* Guide info strip — iFixit-style at-a-glance metadata */}
      <section className="bg-card border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <InfoCell icon={<Wrench className="w-4 h-4 text-primary" />} label="Starting price" value={startingPrice} />
          <InfoCell icon={<Clock className="w-4 h-4 text-primary" />} label="Typical time" value="Same day" />
          <InfoCell icon={<ShieldCheck className="w-4 h-4 text-primary" />} label="Warranty" value="90-day parts &amp; labor" />
          <InfoCell icon={<CheckCircle2 className="w-4 h-4 text-primary" />} label="Diagnostic" value="Free, no obligation" />
        </div>
      </section>

      {/* What we fix + Brands */}
      <section className="bg-background">
        <div className="max-w-[1240px] mx-auto px-4 py-10 md:py-14 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Symptoms we fix</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5">
              What we repair on this device
            </h2>
            <ul className="space-y-2.5">
              {data.problems.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-base text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {data.brands && data.brands.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Compatible models</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5">
                Brands &amp; models supported
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.brands.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Process — guide-style numbered steps */}
      <section className="bg-muted/40 border-y border-border">
        <div className="max-w-[1240px] mx-auto px-4 py-10 md:py-14">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">How it works</div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
            From drop-off to pick-up in {data.process.length} steps
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.process.map((step, i) => {
              const stepPhoto = PROCESS_PHOTOS[i];
              return (
                <li
                  key={step.step}
                  className="rounded-md border border-border bg-card overflow-hidden"
                >
                  {stepPhoto ? (
                    <PhotoFrame
                      photo={stepPhoto}
                      aspect="16:9"
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground tabular-nums">
                        {i + 1}
                      </span>
                      Step {i + 1}
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{step.step}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-md border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              Curious what these repairs look like in real life? See the before-and-after gallery.
            </p>
            <Link
              href="/#our-work"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline whitespace-nowrap"
              data-testid="link-our-work"
            >
              View our work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing table — clean iFixit-style */}
      <section className="bg-background">
        <div className="max-w-[1240px] mx-auto px-4 py-10 md:py-14">
          <div className="flex items-end justify-between gap-6 mb-5">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Walk-in pricing</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Honest, up-front pricing
              </h2>
            </div>
            <div className="hidden md:block text-xs text-muted-foreground max-w-xs text-right">
              Starting prices. Final price confirmed after a free diagnostic — no surprises.
            </div>
          </div>
          <div className="rounded-md border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-3 border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <div className="col-span-8">Repair</div>
              <div className="col-span-4 text-right">Starting at</div>
            </div>
            <ul className="divide-y divide-border">
              {data.pricing.map((p) => (
                <li
                  key={p.label}
                  className="grid grid-cols-12 px-4 py-3.5 items-center text-sm hover:bg-muted/60 transition-colors"
                  data-testid={`pricing-${p.label}`}
                >
                  <div className="col-span-8 flex items-start gap-2.5 min-w-0">
                    <Wrench className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-foreground font-semibold">{p.label}</div>
                      {p.note && (
                        <div className="text-xs text-muted-foreground mt-0.5">{p.note}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 text-right text-foreground font-semibold tabular-nums">
                    {p.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Quotes shown are starting prices. Final price confirmed after free diagnostic.
          </p>
        </div>
      </section>

      {data.upgradeTo && (
        <section className="bg-muted/40 border-y border-border">
          <div className="max-w-[1240px] mx-auto px-4 py-8">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md border border-border bg-card p-5"
              data-testid="service-upgrade-callout"
            >
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">
                  Looking to upgrade instead?
                </div>
                <p className="text-base text-foreground">
                  We sell unlocked {data.upgradeTo.label} handsets too — tested, warrantied and ready to activate.
                </p>
              </div>
              <Link
                href={`/${data.upgradeTo.slug}`}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-4 h-10 whitespace-nowrap transition-colors"
                data-testid={`link-upgrade-${data.upgradeTo.slug}`}
              >
                Buy {data.upgradeTo.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {inventoryGroup && (
        <section className="bg-background">
          <div className="max-w-[1240px] mx-auto px-4 py-8">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md border border-border bg-muted/40 p-5"
              data-testid="service-inventory-callout"
            >
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">
                  Looking to buy instead?
                </div>
                <p className="text-base text-foreground">
                  We also sell tested, warrantied {inventoryGroup.label.toLowerCase()} at our Humble shop.
                </p>
              </div>
              <Link
                href={`/inventory/${inventoryGroup.slug}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card hover:border-primary hover:text-primary font-semibold text-sm px-4 h-10 whitespace-nowrap transition-colors"
                data-testid={`link-inventory-${inventoryGroup.slug}`}
              >
                Browse {inventoryGroup.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Lead-capture form: Contact on hubs, Quote+Appointment on detail pages */}
      {REPAIR_HUB_SLUGS.has(data.slug) ? (
        <section className="bg-background border-t border-border">
          <div className="max-w-[860px] mx-auto px-4 py-12 md:py-16">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Talk to a technician</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Not sure what you need? Ask us.
            </h2>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              Send us a quick note about your device — we'll text or call back today with a firm price and the fastest way to get it fixed.
            </p>
            <ContactForm />
          </div>
        </section>
      ) : (
        <section className="bg-background border-t border-border">
          <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-10">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Free quote</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
                Get a quote in minutes
              </h2>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Tell us what's broken and we'll text or call back today with a firm price.
              </p>
              <RepairQuoteForm defaultDeviceType={data.hero.eyebrow} />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Or book a slot</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
                Reserve a time at the bench
              </h2>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Walk-ins are always welcome — but if you want a guaranteed slot, book one here.
              </p>
              <AppointmentForm defaultServiceType={data.serviceType} />
            </div>
          </div>
        </section>
      )}

      {isHub && hubChildren.length > 0 && (
        <section className="bg-muted/40 border-t border-border">
          <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-14">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Repair index</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
              Every repair we do
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5" data-testid="repair-hub-children">
              {hubChildren.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="rounded-md border border-border bg-card hover:border-primary hover:shadow-sm transition-all p-4"
                  data-testid={`repair-hub-child-${c.slug}`}
                >
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary leading-tight">
                    {c.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {(business.socialFacebook || business.socialInstagram || business.socialTiktok || business.socialYoutube || business.socialX) && (
        <section className="bg-background border-t border-border">
          <div className="max-w-[1240px] mx-auto px-4 py-8 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">Follow us</div>
              <p className="text-sm text-muted-foreground">See more repairs and shop updates.</p>
            </div>
            <SocialLinks business={business} iconClass="w-5 h-5" />
          </div>
        </section>
      )}

      {/* Quick-call strip — keeps phone visible after the form */}
      <section className="bg-card border-t border-border">
        <div className="max-w-[1240px] mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Prefer to talk to a real human?
          </div>
          <a
            href={business.phoneTel}
            className="inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            {business.phoneDisplay} — {business.hoursShort}
          </a>
        </div>
      </section>

      <Faq items={data.faqs} />
      <LocationCard />
      <RelatedLinks slugs={data.related} inventoryGroupSlug={inventoryGroup?.slug} />
    </PageShell>
  );
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
}
