import { useRoute } from "wouter";
import { Calendar } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedLinks } from "@/components/RelatedLinks";
import { LocationCard } from "@/components/LocationCard";
import { SEO, articleJsonLd, breadcrumbJsonLd, localBusinessJsonLd } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ARTICLES_BY_SLUG } from "@/data/articles";
import { BUSINESS } from "@/content";
import NotFound from "@/pages/not-found";

export default function ArticlePage() {
  const [, params] = useRoute<{ slug: string }>("/articles/:slug");
  const slug = params?.slug ?? "";
  const data = ARTICLES_BY_SLUG[slug];
  if (!data) return <NotFound />;
  const path = `/articles/${data.slug}`;

  return (
    <PageShell hideTicker>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        type="article"
        jsonLd={[
          localBusinessJsonLd(),
          articleJsonLd({ title: data.title, description: data.metaDescription, path, published: data.publishedDate, updated: data.updatedDate }),
          breadcrumbJsonLd([{ name: "Articles", path: "/" }, { name: data.title, path }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Articles" }, { label: data.title }]} />

      <article className="bg-black">
        <header className="py-12 md:py-16 px-4 border-b border-zinc-900">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-zinc-500 font-bold uppercase text-xs tracking-widest mb-6">
              <Calendar className="w-4 h-4 text-red-500" />
              Updated {data.updatedDate}
            </div>
            <h1 className="text-4xl md:text-6xl leading-[0.95] font-black uppercase tracking-tighter text-white mb-6">{data.title}</h1>
            <p className="text-lg md:text-xl font-bold text-zinc-400">{data.intro}</p>
          </div>
        </header>

        <div className="py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {data.sections.map((sec) => (
              <section key={sec.h2}>
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white border-l-4 border-red-500 pl-4">
                  {sec.h2}
                </h2>
                <div className="space-y-4 text-base md:text-lg font-bold text-zinc-300 leading-relaxed">
                  {sec.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            ))}
            <div className="bg-yellow-400 text-black p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
              <div className="font-black uppercase text-xl md:text-2xl mb-3">{data.cta}</div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button asChild className="rounded-none bg-black text-white hover:bg-red-500 font-black uppercase tracking-widest h-12 px-6">
                  <a href={BUSINESS.phoneTel}>Call (346) 623-6898</a>
                </Button>
                <Button asChild variant="outline" className="rounded-none border-2 border-black hover:bg-black hover:text-white font-black uppercase tracking-widest h-12 px-6">
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <RelatedLinks slugs={data.related} />
      <LocationCard />
    </PageShell>
  );
}
