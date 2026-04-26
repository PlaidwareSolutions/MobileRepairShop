import { Link } from "wouter";
import { AlertCircle, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Phone Repair", to: "/phone-repair-houston" },
  { label: "iPhone Repair", to: "/iphone-repair-houston" },
  { label: "PS5 Repair", to: "/ps5-repair-houston" },
  { label: "Phones for Sale", to: "/phones-for-sale-houston" },
  { label: "Inventory", to: "/inventory" },
  { label: "Contact", to: "/contact" },
];

export default function NotFound() {
  return (
    <PageShell hideTicker>
      <SEO title="Page Not Found | Gadget X Repairs" description="The page you were looking for does not exist." path="/" noindex />
      <section className="py-24 px-4 bg-zinc-950 min-h-[60vh]">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-6" />
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">404</h1>
          <p className="text-xl font-bold text-zinc-400 mb-10">That page doesn't exist. Try one of these:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10 text-left">
            {QUICK_LINKS.map((q) => (
              <Link key={q.to} href={q.to} className="bg-black border-2 border-zinc-800 p-4 hover:border-red-500 transition-colors flex justify-between items-center">
                <span className="font-black uppercase text-sm text-white">{q.label}</span>
                <ArrowRight className="w-4 h-4 text-red-500" />
              </Link>
            ))}
          </div>
          <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-12 px-8">
            <Link href="/">Back Home</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
