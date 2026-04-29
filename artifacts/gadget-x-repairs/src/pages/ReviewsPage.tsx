import { Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { REVIEWS_DATA } from "@/data/reviews";

export default function ReviewsPage() {
  const avg = REVIEWS_DATA.reduce((s, r) => s + r.rating, 0) / REVIEWS_DATA.length;
  return (
    <PageShell hideTicker>
      <SEO
        title="Customer Reviews Houston TX | GadgetX Repairs"
        description="See what customers say about GadgetX Repairs in Houston TX. Real reviews from satisfied clients. Trusted phone & device repair specialists!"
        path="/reviews-houston-tx"
        jsonLd={[
          localBusinessJsonLd(),
          breadcrumbJsonLd([{ name: "Reviews", path: "/reviews-houston-tx" }]),
          {
            ...localBusinessJsonLd(),
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: avg.toFixed(1),
              reviewCount: REVIEWS_DATA.length,
              bestRating: 5,
              worstRating: 1,
            },
            review: REVIEWS_DATA.map((r) => ({
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: 5,
                worstRating: 1,
              },
              author: { "@type": "Person", name: r.author },
              datePublished: r.date,
              reviewBody: r.body,
              ...(r.service ? { name: r.service } : {}),
            })),
          },
        ]}
      />
      <Breadcrumbs items={[{ label: "Reviews" }]} />

      <section className="py-12 md:py-16 px-4 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
            REAL <span className="text-red-500">REVIEWS</span>
          </h1>
          <div className="flex items-center gap-3 mb-12">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-red-500 text-red-500" />
              ))}
            </div>
            <span className="font-bold uppercase text-lg text-zinc-900">{avg.toFixed(1)} / 5 from {REVIEWS_DATA.length} customers</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS_DATA.map((r, i) => (
              <article key={i} className="bg-white border border-zinc-200 p-6 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>
                <p className="font-bold text-zinc-700 text-base md:text-lg leading-relaxed mb-4">"{r.body}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold uppercase text-sm text-zinc-900">{r.author}</div>
                    {r.service && <div className="text-zinc-500 font-bold uppercase text-xs">{r.service}</div>}
                  </div>
                  <div className="text-zinc-500 font-bold text-xs">{r.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
