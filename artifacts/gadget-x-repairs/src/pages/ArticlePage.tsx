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
          breadcrumbJsonLd([{ name: "Articles", path: "/phone-repair-houston-tx" }, { name: data.title, path }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Articles" }, { label: data.title }]} />

      <article className="bg-white">
        <header className="py-12 md:py-16 px-4 border-b border-zinc-200">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-zinc-500 font-bold uppercase text-xs tracking-wide mb-6">
              <Calendar className="w-4 h-4 text-red-500" />
              Updated {data.updatedDate}
            </div>
            <h1 className="text-4xl md:text-6xl leading-tight font-extrabold tracking-tight text-zinc-900 mb-6">{data.title}</h1>
            <p className="text-lg md:text-xl font-bold text-zinc-600">{data.intro}</p>
          </div>
        </header>

        <div className="py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {data.sections.map((sec) => (
              <section key={sec.h2}>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-zinc-900 border-l-2 border-red-400 pl-4">
                  {sec.h2}
                </h2>
                <div className="space-y-4 text-base md:text-lg font-bold text-zinc-700 leading-relaxed">
                  {sec.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            ))}
            <div className="bg-red-500 text-black p-6 md:p-8 border border-zinc-200 shadow-md">
              <div className="font-bold uppercase text-xl md:text-2xl mb-3">{data.cta}</div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button asChild className="bg-white text-zinc-900 hover:bg-red-500 font-semibold uppercase tracking-wide h-12 px-6">
                  <a href={BUSINESS.phoneTel}>Call (346) 623-6898</a>
                </Button>
                <Button asChild variant="outline" className="border border-zinc-200 hover:bg-white hover:text-zinc-900 font-semibold uppercase tracking-wide h-12 px-6">
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
