import { Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { useBusiness } from "@/components/BusinessContext";
import { REVIEWS_DATA } from "@/data/reviews";

export default function ReviewsPage() {
  const business = useBusiness();
  const avg = REVIEWS_DATA.reduce((s, r) => s + r.rating, 0) / REVIEWS_DATA.length;
  return (
    <PageShell hideTicker>
      <SEO
        title="Customer Reviews Houston TX | OK Cellular"
        description="See what customers say about OK Cellular in Humble TX. Real reviews from satisfied clients. Trusted phone & device repair specialists!"
        path="/reviews-houston-tx"
        jsonLd={[
          localBusinessJsonLd(business),
          breadcrumbJsonLd([{ name: "Reviews", path: "/reviews-houston-tx" }]),
          {
            ...localBusinessJsonLd(business),
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

      <section className="py-12 md:py-16 px-4 bg-muted/40 border-b border-border">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6 leading-tight">
            Real <span className="text-primary">reviews</span>
          </h1>
          <div className="flex items-center gap-3 mb-12">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-red-500 text-primary" />
              ))}
            </div>
            <span className="font-semibold text-base text-foreground">{avg.toFixed(1)} / 5 from {REVIEWS_DATA.length} customers</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS_DATA.map((r, i) => (
              <article key={i} className="bg-white border border-border p-6 hover:border-primary transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-red-500 text-primary" />
                  ))}
                </div>
                <p className="font-bold text-foreground text-base md:text-lg leading-relaxed mb-4">"{r.body}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm text-foreground">{r.author}</div>
                    {r.service && <div className="text-muted-foreground font-semibold text-xs">{r.service}</div>}
                  </div>
                  <div className="text-muted-foreground font-bold text-xs">{r.date}</div>
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
