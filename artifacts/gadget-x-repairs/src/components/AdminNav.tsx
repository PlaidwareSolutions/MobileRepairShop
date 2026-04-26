import { Link } from "wouter";

const TABS: { to: string; label: string; testId: string }[] = [
  { to: "/admin/leads", label: "Leads", testId: "admin-nav-leads" },
  { to: "/admin/inventory", label: "Inventory", testId: "admin-nav-inventory" },
];

export function AdminNav({ active }: { active: "leads" | "inventory" }) {
  return (
    <nav className="flex flex-wrap gap-2 mb-6" aria-label="Admin sections">
      {TABS.map((t) => {
        const isActive = active === t.to.replace("/admin/", "");
        return (
          <Link
            key={t.to}
            href={t.to}
            data-testid={t.testId}
            className={`px-4 py-2 font-black uppercase text-sm tracking-widest border-2 transition-colors ${
              isActive
                ? "bg-red-500 border-red-500 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-500"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
