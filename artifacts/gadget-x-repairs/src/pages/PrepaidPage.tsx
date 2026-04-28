import { useRoute, Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { LocationCard } from "@/components/LocationCard";
import { PhotoFrame } from "@/components/PhotoFrame";
import { SEO, localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/SEO";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { PREPAID_BY_SLUG, PREPAID_DATA, ALL_CARRIERS } from "@/data/prepaid";
import { BUSINESS } from "@/content";
import NotFound from "@/pages/not-found";

const PREPAID_HUB_SLUG = "phone-activation-houston-tx";

export default function PrepaidPage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const slug = params?.slug ?? "";
  const data = PREPAID_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/${data.slug}`;
  const isHub = data.slug === PREPAID_HUB_SLUG;

  const hubChildren = isHub
    ? PREPAID_DATA.filter((p) => p.slug !== PREPAID_HUB_SLUG)
    : [];

  const breadcrumbItems = isHub
    ? [{ label: data.title }]
    : [{ label: "Prepaid", to: `/${PREPAID_HUB_SLUG}` }, { label: data.title }];
  const jsonLdBreadcrumb = isHub
    ? [{ name: data.title, path }]
    : [{ name: "Prepaid", path: `/${PREPAID_HUB_SLUG}` }, { name: data.title, path }];

  const jsonLdBlocks: Record<string, unknown>[] = [
    localBusinessJsonLd(),
    faqJsonLd(data.faqs),
    breadcrumbJsonLd(jsonLdBreadcrumb),
  ];
  if (isHub && hubChildren.length > 0) {
    jsonLdBlocks.push(
      itemListJsonLd(
        data.title,
        hubChildren.map((c) => ({ name: c.title, path: `/${c.slug}` })),
      ),
    );
  }

  const heroAccent = (
    <div className="hidden md:flex flex-col items-end gap-4">
      {data.logoSrc && (
        <div className="bg-white border-2 border-zinc-200 shadow-sm p-6 w-full max-w-[280px] flex items-center justify-center">
          <img
            src={data.logoSrc}
            alt={`${data.carrier} logo`}
            width={400}
            height={200}
            className="block w-full h-auto max-h-24 object-contain"
            loading="eager"
          />
        </div>
      )}
      {data.heroPhoto && (
        <div className="w-full max-w-[280px] group">
          <PhotoFrame
            photo={data.heroPhoto}
            aspect="4:3"
            sizes="(min-width: 768px) 280px, 100vw"
            loading="eager"
            fetchPriority="high"
            hover={false}
          />
        </div>
      )}
    </div>
  );

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={jsonLdBlocks}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        eyebrow={data.hero.eyebrow}
        h1={data.hero.h1}
        subhead={data.hero.subhead}
        accentRight={(data.logoSrc || data.heroPhoto) ? heroAccent : undefined}
      />

      <section className="py-4 px-4 bg-white border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wide" data-testid="text-prepaid-disclaimer">
            Disclaimer: Gadget X Repairs is an independent authorized retailer offering activations, SIM and bill-pay services. We are not an official corporate store of any carrier unless explicitly confirmed. All carrier names and logos are property of their respective owners.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-zinc-50">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
              WHAT WE <span className="text-red-500">DO</span>
            </h2>
            <ul className="space-y-3">
              {data.services.map((s) => (
                <li key={s} className="flex items-start gap-3 text-base md:text-lg font-bold text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-semibold uppercase tracking-wide h-12 px-6">
                <a href={BUSINESS.phoneTel}>Call (346) 623-6898</a>
              </Button>
              <Button asChild className="bg-red-500 hover:bg-white text-black font-semibold uppercase tracking-wide h-12 px-6">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
              QUESTIONS? <span className="text-red-500">WE'RE HERE.</span>
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {isHub && (
        <section className="py-16 px-4 bg-white border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 text-zinc-900">
              EVERY <span className="text-red-500">CARRIER</span> WE ACTIVATE
            </h2>
            <p className="text-base md:text-lg text-zinc-600 mb-8 max-w-2xl">
              Walk in with any phone — we activate, port, or swap on every major prepaid network.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" data-testid="prepaid-carriers-grid">
              {ALL_CARRIERS.map((c) => {
                const inner = (
                  <>
                    <div className="aspect-[2/1] flex items-center justify-center p-3">
                      <img
                        src={c.logoSrc}
                        alt={`${c.name} logo`}
                        width={400}
                        height={200}
                        className="block max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 pb-3 text-center text-xs font-bold uppercase tracking-wide text-zinc-700 group-hover:text-red-600 transition-colors">
                      {c.name}
                    </div>
                  </>
                );
                return c.slug ? (
                  <Link
                    key={c.name}
                    href={`/${c.slug}`}
                    className="bg-white border-2 border-zinc-200 hover:border-red-500 transition-colors group block"
                    data-testid={`carrier-tile-${c.slug}`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={c.name}
                    className="bg-zinc-50 border-2 border-zinc-200 group cursor-default"
                    data-testid={`carrier-tile-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Logos shown for identification only. All carrier names and logos are property of their respective owners.
            </p>
          </div>
        </section>
      )}

      {isHub && hubChildren.length > 0 && (
        <section className="py-16 px-4 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-zinc-900">
              POPULAR <span className="text-red-500">CARRIER PAGES</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="prepaid-hub-children">
              {hubChildren.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="bg-white border border-zinc-200 hover:border-red-500 p-5 transition-colors group flex items-center gap-3"
                  data-testid={`prepaid-hub-child-${c.slug}`}
                >
                  {c.logoSrc && (
                    <img
                      src={c.logoSrc}
                      alt=""
                      width={80}
                      height={40}
                      className="block w-16 h-10 object-contain shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="font-bold uppercase text-sm text-zinc-900 group-hover:text-red-500 transition-colors leading-tight">
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
    </PageShell>
  );
}
