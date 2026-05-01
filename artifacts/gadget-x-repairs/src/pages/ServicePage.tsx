import { useRoute, Link } from "wouter";
import { CheckCircle2, Wrench } from "lucide-react";
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
  {
    src640: "/images/photos/process-diagnostic-640.jpg",
    src1024: "/images/photos/process-diagnostic-1024.jpg",
    alt: "Customer setting their phone down on the counter for a free diagnostic",
  },
  {
    src640: "/images/photos/process-bench-640.jpg",
    src1024: "/images/photos/process-bench-1024.jpg",
    alt: "Technician working on a device at the repair bench",
  },
  {
    src640: "/images/photos/process-quality-640.jpg",
    src1024: "/images/photos/process-quality-1024.jpg",
    alt: "Hand testing a smartphone screen after the repair",
  },
  {
    src640: "/images/photos/process-pickup-640.jpg",
    src1024: "/images/photos/process-pickup-1024.jpg",
    alt: "Customer picking up their finished device at the counter",
  },
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

      {/* Problems */}
      <section className="py-16 px-4 bg-zinc-50">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
              WHAT WE <span className="text-red-500">FIX</span>
            </h2>
            <ul className="space-y-3">
              {data.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-lg font-bold text-zinc-700">
                  <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {data.brands && data.brands.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
                BRANDS &amp; <span className="text-red-500">MODELS</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.brands.map((b) => (
                  <span key={b} className="bg-zinc-100 border border-zinc-200 px-4 py-2 font-bold uppercase text-sm">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-red-500 text-black">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-10">
            HOW IT <span className="text-zinc-900">WORKS</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.process.map((step, i) => {
              const stepPhoto = PROCESS_PHOTOS[i];
              return (
                <div key={step.step} className="group bg-white text-zinc-900 transform hover:-translate-y-1 transition-transform overflow-hidden">
                  {stepPhoto ? (
                    <PhotoFrame
                      photo={stepPhoto}
                      aspect="16:9"
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                  <div className="p-6">
                    <div className="text-red-500 font-extrabold text-5xl mb-2">0{i + 1}</div>
                    <h3 className="text-xl font-bold uppercase mb-2">{step.step}</h3>
                    <p className="text-zinc-600 font-bold text-sm">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-950 text-white p-5 shadow-[6px_6px_0_0_#09090b]">
            <p className="font-black uppercase tracking-tight text-sm md:text-base">
              See the before-and-after for the kinds of repairs we do every day.
            </p>
            <Link
              href="/#our-work"
              className="bg-white text-zinc-950 hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-xs px-5 py-3 shadow-[4px_4px_0_0_#ef4444] hover:shadow-[2px_2px_0_0_#fff] transition-all whitespace-nowrap"
              data-testid="link-our-work"
            >
              View Our Work →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-zinc-100">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-zinc-900 text-white p-6 md:p-10 shadow-md">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Honest <span className="text-red-500">Pricing</span>
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Walk-in Pricing</span>
            </div>
            <div className="space-y-3">
              {data.pricing.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between gap-4 px-4 md:px-5 py-4 bg-zinc-900 hover:bg-red-600 transition-colors group"
                  data-testid={`pricing-${p.label}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="bg-zinc-800 group-hover:bg-zinc-900 p-2 shrink-0 transition-colors">
                      <Wrench className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base md:text-lg font-extrabold tracking-tight truncate">{p.label}</h4>
                      {p.note && (
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 group-hover:text-red-200">
                          {p.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="font-bold uppercase text-sm md:text-base tracking-wide text-red-500 group-hover:text-white shrink-0">
                    {p.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-zinc-500 font-bold uppercase mt-4">
            Quotes shown are starting prices. Final price confirmed after free diagnostic.
          </p>
        </div>
      </section>

      {data.upgradeTo && (
        <section className="py-10 px-4 bg-white border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-50 border border-zinc-200 p-5 md:p-6"
              data-testid="service-upgrade-callout"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 mb-1">
                  Looking to upgrade instead?
                </div>
                <p className="font-bold text-zinc-900 text-base md:text-lg">
                  We sell unlocked {data.upgradeTo.label} handsets too — tested, warrantied and ready to activate.
                </p>
              </div>
              <Link
                href={`/${data.upgradeTo.slug}`}
                className="bg-zinc-900 text-white hover:bg-red-500 font-black uppercase tracking-widest text-xs px-5 py-3 shadow-[4px_4px_0_0_#ef4444] hover:shadow-[2px_2px_0_0_#09090b] transition-all whitespace-nowrap"
                data-testid={`link-upgrade-${data.upgradeTo.slug}`}
              >
                Buy {data.upgradeTo.label} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {inventoryGroup && (
        <section className="py-10 px-4 bg-white border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-50 border border-zinc-200 p-5 md:p-6"
              data-testid="service-inventory-callout"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 mb-1">
                  Looking to buy instead?
                </div>
                <p className="font-bold text-zinc-900 text-base md:text-lg">
                  We also sell tested, warrantied {inventoryGroup.label.toLowerCase()} at our Houston shop.
                </p>
              </div>
              <Link
                href={`/inventory/${inventoryGroup.slug}`}
                className="bg-zinc-900 text-white hover:bg-red-500 font-black uppercase tracking-widest text-xs px-5 py-3 shadow-[4px_4px_0_0_#ef4444] hover:shadow-[2px_2px_0_0_#09090b] transition-all whitespace-nowrap"
                data-testid={`link-inventory-${inventoryGroup.slug}`}
              >
                Browse {inventoryGroup.label} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Lead-capture form: Contact on hubs, Quote+Appointment on detail pages */}
      {REPAIR_HUB_SLUGS.has(data.slug) ? (
        <section className="py-16 px-4 bg-white border-t border-zinc-200">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900 text-center">
              NOT SURE WHAT YOU NEED? <span className="text-red-500">ASK US.</span>
            </h2>
            <p className="text-lg font-bold text-zinc-600 mb-8 max-w-2xl mx-auto text-center">
              Send us a quick note about your device — we'll text or call back today with a firm price and the fastest way to get it fixed.
            </p>
            <ContactForm />
          </div>
        </section>
      ) : (
        <section className="py-16 px-4 bg-white border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-zinc-900">
                GET A <span className="text-red-500">QUOTE</span>
              </h2>
              <p className="text-lg font-bold text-zinc-600 mb-6 max-w-md">
                Tell us what's broken and we'll text or call you back today with a firm price.
              </p>
              <RepairQuoteForm defaultDeviceType={data.hero.eyebrow} />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-zinc-900">
                OR <span className="text-red-500">BOOK A SLOT</span>
              </h2>
              <p className="text-lg font-bold text-zinc-600 mb-6 max-w-md">
                Walk-ins always welcome — but if you want a guaranteed slot, book here.
              </p>
              <AppointmentForm defaultServiceType={data.serviceType} />
            </div>
          </div>
        </section>
      )}

      {isHub && hubChildren.length > 0 && (
        <section className="py-16 px-4 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-zinc-900">
              EVERY <span className="text-red-500">REPAIR</span> WE DO
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="repair-hub-children">
              {hubChildren.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="bg-white border border-zinc-200 hover:border-red-500 p-5 transition-colors group"
                  data-testid={`repair-hub-child-${c.slug}`}
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

      {(business.socialFacebook || business.socialInstagram || business.socialTiktok || business.socialYoutube || business.socialX) && (
        <section className="py-10 px-4 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">Follow Us</p>
            <SocialLinks business={business} iconClass="w-6 h-6" />
          </div>
        </section>
      )}

      <Faq items={data.faqs} />
      <LocationCard />
      <RelatedLinks slugs={data.related} inventoryGroupSlug={inventoryGroup?.slug} />
    </PageShell>
  );
}
