import { Link } from "wouter";

const TABS: { to: string; label: string; testId: string; key: string }[] = [
  { to: "/admin/leads", label: "Leads", testId: "admin-nav-leads", key: "leads" },
  { to: "/admin/inventory", label: "Inventory", testId: "admin-nav-inventory", key: "inventory" },
  { to: "/admin/promotions", label: "Promotions", testId: "admin-nav-promotions", key: "promotions" },
  { to: "/admin/business-settings", label: "Business Info", testId: "admin-nav-business-settings", key: "business-settings" },
];

export function AdminNav({
  active,
}: {
  active: "leads" | "inventory" | "promotions" | "business-settings";
}) {
  return (
    <nav className="flex flex-wrap gap-2 mb-6" aria-label="Admin sections">
      {TABS.map((t) => {
        const isActive = active === t.key;
        return (
          <Link
            key={t.to}
            href={t.to}
            data-testid={t.testId}
            className={`px-4 py-2 font-semibold uppercase text-sm tracking-wide border rounded-lg transition-colors ${
              isActive
                ? "bg-red-500 border-red-500 text-white shadow-sm"
                : "bg-white border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
