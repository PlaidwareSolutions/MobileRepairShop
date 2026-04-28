import { useRoute, Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/SEO";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { PREPAID_BY_SLUG, PREPAID_DATA } from "@/data/prepaid";
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

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={jsonLdBlocks}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

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

      {isHub && hubChildren.length > 0 && (
        <section className="py-16 px-4 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-zinc-900">
              EVERY <span className="text-red-500">CARRIER</span> WE ACTIVATE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="prepaid-hub-children">
              {hubChildren.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="bg-white border border-zinc-200 hover:border-red-500 p-5 transition-colors group"
                  data-testid={`prepaid-hub-child-${c.slug}`}
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
    </PageShell>
  );
}
