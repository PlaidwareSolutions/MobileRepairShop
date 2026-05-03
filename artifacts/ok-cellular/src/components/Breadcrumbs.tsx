import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-muted/40 border-b border-border">
      <ol className="max-w-[1240px] mx-auto px-4 py-2.5 flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
        <li>
          <Link
            href="/phone-repair-humble-tx"
            className="hover:text-primary inline-flex items-center gap-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            {it.to ? (
              <Link href={it.to} className="hover:text-primary transition-colors">
                {it.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
