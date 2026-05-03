import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SERVICES_BY_SLUG } from "@/data/services";
import { SALES_BY_SLUG } from "@/data/sales";
import { PREPAID_BY_SLUG } from "@/data/prepaid";
import { AREAS_BY_SLUG } from "@/data/areas";
import { ARTICLES_BY_SLUG } from "@/data/articles";
import { inventoryGroupBySlug } from "@/lib/inventoryGroups";

function lookup(slug: string): { title: string; to: string } | null {
  if (SERVICES_BY_SLUG[slug]) return { title: SERVICES_BY_SLUG[slug].title, to: `/${slug}` };
  if (SALES_BY_SLUG[slug]) return { title: SALES_BY_SLUG[slug].title, to: `/${slug}` };
  if (PREPAID_BY_SLUG[slug]) return { title: PREPAID_BY_SLUG[slug].title, to: `/${slug}` };
  if (AREAS_BY_SLUG[slug]) return { title: AREAS_BY_SLUG[slug].title, to: `/${slug}` };
  if (ARTICLES_BY_SLUG[slug]) return { title: ARTICLES_BY_SLUG[slug].title, to: `/articles/${slug}` };
  return null;
}

export function RelatedLinks({
  slugs,
  inventoryGroupSlug,
}: {
  slugs: string[];
  inventoryGroupSlug?: string | null;
}) {
  const items = slugs.map(lookup).filter((x): x is { title: string; to: string } => x !== null);
  const inventoryGroup = inventoryGroupBySlug(inventoryGroupSlug);
  if (inventoryGroup) {
    const to = `/inventory/${inventoryGroup.slug}`;
    if (!items.some((it) => it.to === to)) {
      items.push({
        title: `${inventoryGroup.heading.prefix} ${inventoryGroup.heading.highlight}`,
        to,
      });
    }
  }
  if (items.length === 0) return null;
  return (
    <section className="py-16 px-4 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-[1240px] mx-auto">
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8 text-zinc-900">Related</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <Link key={it.to} href={it.to} className="group block bg-white border border-zinc-200 p-5 hover:border-red-500 transition-colors">
              <div className="flex justify-between items-center gap-2">
                <span className="font-bold uppercase text-sm md:text-base text-zinc-900 group-hover:text-red-500 transition-colors">{it.title}</span>
                <ArrowRight className="w-4 h-4 text-red-500 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
