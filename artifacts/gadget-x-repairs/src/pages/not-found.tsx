import { Link } from "wouter";
import { AlertCircle, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Phone Repair", to: "/phone-repair-houston-tx" },
  { label: "iPhone Repair", to: "/iphone-repair-houston-tx" },
  { label: "PS5 Repair", to: "/ps5-repair-houston-tx" },
  { label: "Phones for Sale", to: "/phones-for-sale-houston-tx" },
  { label: "Inventory", to: "/inventory" },
  { label: "Contact", to: "/contact-houston-tx" },
];

export default function NotFound() {
  return (
    <PageShell hideTicker>
      <SEO title="Page Not Found | Gadget X Repairs" description="The page you were looking for does not exist." path="/" noindex />
      <section className="py-24 px-4 bg-zinc-50 min-h-[60vh]">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4">404</h1>
          <p className="text-xl font-bold text-zinc-600 mb-10">That page doesn't exist. Try one of these:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10 text-left">
            {QUICK_LINKS.map((q) => (
              <Link key={q.to} href={q.to} className="bg-white border border-zinc-200 p-4 hover:border-red-500 transition-colors flex justify-between items-center">
                <span className="font-bold uppercase text-sm text-zinc-900">{q.label}</span>
                <ArrowRight className="w-4 h-4 text-red-500" />
              </Link>
            ))}
          </div>
          <Button asChild className="bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-semibold uppercase tracking-wide h-12 px-8">
            <Link href="/phone-repair-houston-tx">Back Home</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
