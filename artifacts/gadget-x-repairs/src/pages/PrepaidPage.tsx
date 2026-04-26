import { useRoute } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { PREPAID_BY_SLUG } from "@/data/prepaid";
import { BUSINESS } from "@/content";
import NotFound from "@/pages/not-found";

export default function PrepaidPage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const slug = params?.slug ?? "";
  const data = PREPAID_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/${data.slug}`;

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        jsonLd={[
          localBusinessJsonLd(),
          faqJsonLd(data.faqs),
          breadcrumbJsonLd([{ name: "Prepaid", path: "/phone-activation-houston-tx" }, { name: data.title, path }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Prepaid", to: "/phone-activation-houston-tx" }, { label: data.title }]} />

      <PageHero eyebrow={data.hero.eyebrow} h1={data.hero.h1} subhead={data.hero.subhead} />

      <section className="py-4 px-4 bg-black border-b border-zinc-900">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wide" data-testid="text-prepaid-disclaimer">
            Disclaimer: Gadget X Repairs is an independent authorized retailer offering activations, SIM and bill-pay services. We are not an official corporate store of any carrier unless explicitly confirmed. All carrier names and logos are property of their respective owners.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              WHAT WE <span className="text-yellow-400 text-stroke-black">DO</span>
            </h2>
            <ul className="space-y-3">
              {data.services.map((s) => (
                <li key={s} className="flex items-start gap-3 text-base md:text-lg font-bold text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-12 px-6">
                <a href={BUSINESS.phoneTel}>Call (346) 623-6898</a>
              </Button>
              <Button asChild className="rounded-none bg-yellow-400 hover:bg-white text-black font-black uppercase tracking-widest h-12 px-6">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              QUESTIONS? <span className="text-red-500">WE'RE HERE.</span>
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <Faq items={data.faqs} />
      <LocationCard />
    </PageShell>
  );
}
