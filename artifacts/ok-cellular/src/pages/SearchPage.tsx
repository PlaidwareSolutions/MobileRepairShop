import { useSearch } from "wouter";
import { Search, Phone, ArrowRight, Wrench, ShoppingBag, Tag, Headphones, CreditCard, Package, BookOpen, MapPin } from "lucide-react";
import { Link } from "wouter";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { useBusiness } from "@/components/BusinessContext";
import { SEARCH_INDEX, findAllSearchMatches, categoryForEntry, type ResultCategory, type SearchEntry } from "@/lib/searchIndex";

const CATEGORY_ORDER: ResultCategory[] = ["Repair", "Buy", "Sell", "Accessories", "Prepaid", "Inventory", "Guides", "Other"];

const CATEGORY_META: Record<ResultCategory, { label: string; icon: React.ReactNode; color: string }> = {
  Repair:      { label: "Repair Services",     icon: <Wrench className="w-4 h-4" />,      color: "text-blue-600" },
  Buy:         { label: "Buy",                 icon: <ShoppingBag className="w-4 h-4" />, color: "text-green-600" },
  Sell:        { label: "Sell",                icon: <Tag className="w-4 h-4" />,         color: "text-orange-500" },
  Accessories: { label: "Accessories",         icon: <Headphones className="w-4 h-4" />, color: "text-purple-600" },
  Prepaid:     { label: "Prepaid & Billing",   icon: <CreditCard className="w-4 h-4" />, color: "text-teal-600" },
  Inventory:   { label: "Inventory",           icon: <Package className="w-4 h-4" />,    color: "text-indigo-600" },
  Guides:      { label: "Guides & Articles",   icon: <BookOpen className="w-4 h-4" />,   color: "text-amber-600" },
  Other:       { label: "More",                icon: <MapPin className="w-4 h-4" />,     color: "text-gray-500" },
};

const MAX_PER_CATEGORY = 6;

export default function SearchPage() {
  const business = useBusiness();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const query = params.get("q") ?? "";

  const allMatches = query.trim().length >= 2 ? findAllSearchMatches(query) : [];

  const grouped: Partial<Record<ResultCategory, SearchEntry[]>> = {};
  for (const entry of allMatches) {
    const cat = categoryForEntry(entry);
    if (!grouped[cat]) grouped[cat] = [];
    if (grouped[cat]!.length < MAX_PER_CATEGORY) {
      grouped[cat]!.push(entry);
    }
  }

  const hasResults = allMatches.length > 0;
  const totalCount = allMatches.length;

  return (
    <PageShell hideTicker>
      <SEO
        title={query ? `Search results for "${query}" | OK Cellular` : "Search | OK Cellular"}
        description={`Search results for ${query} at OK Cellular in Humble, TX. Find repair services, phones for sale, accessories, and more.`}
        path={`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`}
      />

      <div className="bg-muted/40 border-b border-border py-8 md:py-10">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">Search</div>
          {query ? (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-1">
                Results for <span className="text-primary">&ldquo;{query}&rdquo;</span>
              </h1>
              {hasResults && (
                <p className="text-sm text-muted-foreground">
                  {totalCount} result{totalCount !== 1 ? "s" : ""} found
                </p>
              )}
            </>
          ) : (
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Search OK Cellular
            </h1>
          )}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-8 md:py-12">
        {!query && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <Search className="w-12 h-12 text-muted-foreground/40" />
            <p className="text-lg text-muted-foreground">
              Use the search bar above to find repair services, phones, and accessories.
            </p>
          </div>
        )}

        {query && !hasResults && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center gap-5"
            data-testid="search-empty-state"
          >
            <Search className="w-12 h-12 text-muted-foreground/40" />
            <div>
              <p className="text-lg font-semibold text-foreground mb-1">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-muted-foreground text-sm">
                Try a different search, or give us a call — we can help find what you need.
              </p>
            </div>
            <a
              href={business.phoneTel}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-md transition-colors text-sm"
              data-testid="search-empty-call-cta"
            >
              <Phone className="w-4 h-4" />
              Call {business.phoneDisplay}
            </a>
            <div className="mt-4 text-sm text-muted-foreground">
              Or browse all:{" "}
              <Link href="/repair-services-humble-tx" className="text-primary hover:underline font-medium">Repair Services</Link>
              {" · "}
              <Link href="/inventory" className="text-primary hover:underline font-medium">Inventory</Link>
              {" · "}
              <Link href="/phone-accessories-humble-tx" className="text-primary hover:underline font-medium">Accessories</Link>
            </div>
          </div>
        )}

        {hasResults && (
          <div className="space-y-10">
            {CATEGORY_ORDER.filter((cat) => grouped[cat]?.length).map((cat) => {
              const items = grouped[cat]!;
              const meta = CATEGORY_META[cat];
              return (
                <section key={cat} data-testid={`search-group-${cat.toLowerCase()}`}>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                    <span className={meta.color}>{meta.icon}</span>
                    <h2 className="text-base font-semibold text-foreground">{meta.label}</h2>
                    <span className="text-xs text-muted-foreground ml-1">({items.length})</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {items.map((entry) => (
                      <li key={entry.to}>
                        <Link
                          href={entry.to}
                          className="flex items-center justify-between gap-2 rounded-md border border-border bg-card hover:border-primary hover:shadow-sm transition-all px-4 py-3 group"
                          data-testid={`search-result-${entry.to.replace(/\//g, "")}`}
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {entry.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <div className="rounded-md border border-border bg-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">Don&apos;t see what you need?</p>
                <p className="text-sm text-muted-foreground">
                  Call us and we&apos;ll help find the right service or part.
                </p>
              </div>
              <a
                href={business.phoneTel}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4" />
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
