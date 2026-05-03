import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-zinc-50 border-b border-zinc-200 py-3 px-4">
      <ol className="max-w-[1240px] mx-auto flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
        <li><Link href="/phone-repair-houston-tx" className="hover:text-red-500">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            {it.to ? (
              <Link href={it.to} className="hover:text-red-500">{it.label}</Link>
            ) : (
              <span className="text-zinc-900">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
