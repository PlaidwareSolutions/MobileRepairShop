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
        title="Customer Reviews | Gadget X Repairs Houston"
        description="5-star customer reviews for Gadget X Repairs in Houston, TX — phone, tablet, laptop, PS5, Xbox repair and prepaid activation."
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

      <section className="py-12 md:py-16 px-4 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.95]">
            REAL <span className="text-yellow-400 text-stroke-black">REVIEWS</span>
          </h1>
          <div className="flex items-center gap-3 mb-12">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-black uppercase text-lg text-white">{avg.toFixed(1)} / 5 from {REVIEWS_DATA.length} customers</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS_DATA.map((r, i) => (
              <article key={i} className="bg-black border-4 border-zinc-800 p-6 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>
                <p className="font-bold text-zinc-300 text-base md:text-lg leading-relaxed mb-4">"{r.body}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-black uppercase text-sm text-white">{r.author}</div>
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
