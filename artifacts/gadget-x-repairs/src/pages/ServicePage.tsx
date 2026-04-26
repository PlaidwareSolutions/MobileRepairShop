import { useRoute, Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { RelatedLinks } from "@/components/RelatedLinks";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/SEO";
import { RepairQuoteForm } from "@/components/forms/RepairQuoteForm";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { SERVICES_BY_SLUG, SERVICES_DATA } from "@/data/services";
import NotFound from "@/pages/not-found";

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

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={[
          localBusinessJsonLd(),
          ...(isHub && hubChildren.length > 0
            ? [itemListJsonLd(data.title, hubChildren.map((c) => ({ name: c.title, path: `/${c.slug}` })))]
            : [serviceJsonLd(data.title, data.metaDescription, path)]),
          faqJsonLd(data.faqs),
          breadcrumbJsonLd(jsonLdBreadcrumb),
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

      {/* Problems */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              WHAT WE <span className="text-yellow-400 text-stroke-black">FIX</span>
            </h2>
            <ul className="space-y-3">
              {data.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-lg font-bold text-zinc-300">
                  <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {data.brands && data.brands.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
                BRANDS &amp; <span className="text-red-500">MODELS</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.brands.map((b) => (
                  <span key={b} className="bg-zinc-900 border-2 border-zinc-800 px-4 py-2 font-black uppercase text-sm">
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
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
            HOW IT <span className="text-white">WORKS</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.process.map((step, i) => (
              <div key={step.step} className="bg-black text-white p-6 transform hover:-translate-y-1 transition-transform">
                <div className="text-yellow-400 font-black text-5xl mb-2">0{i + 1}</div>
                <h3 className="text-xl font-black uppercase mb-2">{step.step}</h3>
                <p className="text-zinc-400 font-bold text-sm">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">
            HONEST <span className="text-yellow-400 text-stroke-black">PRICING</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.pricing.map((p) => (
              <div key={p.label} className="bg-black border-2 border-zinc-800 p-5 flex justify-between items-center hover:border-red-500 transition-colors">
                <div>
                  <div className="font-black uppercase text-base md:text-lg">{p.label}</div>
                  {p.note && <div className="text-zinc-500 font-bold text-xs uppercase mt-1">{p.note}</div>}
                </div>
                <div className="text-red-500 font-black text-xl whitespace-nowrap">{p.price}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-500 font-bold uppercase mt-4">
            Quotes shown are starting prices. Final price confirmed after free diagnostic.
          </p>
        </div>
      </section>

      {/* Lead-capture form: Contact on hubs, Quote+Appointment on detail pages */}
      {REPAIR_HUB_SLUGS.has(data.slug) ? (
        <section className="py-16 px-4 bg-black border-t border-zinc-900">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white text-center">
              NOT SURE WHAT YOU NEED? <span className="text-red-500">ASK US.</span>
            </h2>
            <p className="text-lg font-bold text-zinc-400 mb-8 max-w-2xl mx-auto text-center">
              Send us a quick note about your device — we'll text or call back today with a firm price and the fastest way to get it fixed.
            </p>
            <ContactForm />
          </div>
        </section>
      ) : (
        <section className="py-16 px-4 bg-black border-t border-zinc-900">
          <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white">
                GET A <span className="text-red-500">QUOTE</span>
              </h2>
              <p className="text-lg font-bold text-zinc-400 mb-6 max-w-md">
                Tell us what's broken and we'll text or call you back today with a firm price.
              </p>
              <RepairQuoteForm defaultDeviceType={data.hero.eyebrow} />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white">
                OR <span className="text-yellow-400 text-stroke-black">BOOK A SLOT</span>
              </h2>
              <p className="text-lg font-bold text-zinc-400 mb-6 max-w-md">
                Walk-ins always welcome — but if you want a guaranteed slot, book here.
              </p>
              <AppointmentForm defaultServiceType={data.serviceType} />
            </div>
          </div>
        </section>
      )}

      {isHub && hubChildren.length > 0 && (
        <section className="py-16 px-4 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-white">
              EVERY <span className="text-yellow-400 text-stroke-black">REPAIR</span> WE DO
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="repair-hub-children">
              {hubChildren.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="bg-black border-2 border-zinc-800 hover:border-red-500 p-5 transition-colors group"
                  data-testid={`repair-hub-child-${c.slug}`}
                >
                  <div className="font-black uppercase text-base text-white group-hover:text-red-500 transition-colors leading-tight">
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
      <RelatedLinks slugs={data.related} />
    </PageShell>
  );
}
