import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/content";

const VALUES = [
  "Honest quotes — no surprises at pickup",
  "Quality OEM-grade parts on every repair",
  "90-day warranty on everything we fix",
  "Same-day repair where possible",
  "Walk-ins welcome 6 days a week",
];

export default function AboutPage() {
  return (
    <PageShell hideTicker>
      <SEO
        title="About Gadget X Repairs | 15 Years in Houston"
        description="About Gadget X Repairs — 15 years of honest repair, sales and prepaid service from our Almeda Rd shop in Houston, TX."
        path="/about"
        jsonLd={[localBusinessJsonLd(), breadcrumbJsonLd([{ name: "About", path: "/about" }])]}
      />
      <Breadcrumbs items={[{ label: "About" }]} />

      <section className="py-16 md:py-24 px-4 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.95]">
            15 YEARS REPAIRING <span className="text-red-500">HOUSTON'S DEVICES</span>
          </h1>
          <p className="text-xl font-bold text-zinc-300 mb-6">
            Gadget X Repairs has been fixing phones, tablets, laptops and gaming consoles for Houston since 2010.
            From our shop at {BUSINESS.addressFull}, we serve walk-in customers six days a week.
          </p>
          <p className="text-lg font-bold text-zinc-400 mb-6">
            We started small — one bench, one technician — and grew because of one simple promise: tell people honestly
            what's wrong with their device, charge them honestly to fix it, and stand behind the work.
          </p>
          <p className="text-lg font-bold text-zinc-400 mb-10">
            Today we repair every major brand of phone, tablet, laptop and console; sell tested used and refurbished
            phones; activate every prepaid carrier; and accept bill payments. The promise hasn't changed.
          </p>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
            WHAT WE <span className="text-yellow-400 text-stroke-black">STAND FOR</span>
          </h2>
          <ul className="space-y-3 mb-10">
            {VALUES.map((v) => (
              <li key={v} className="flex items-start gap-3 text-lg font-bold text-zinc-300">
                <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <span>{v}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-12 px-6">
              <a href={BUSINESS.phoneTel}>Call (346) 623-6898</a>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-12 px-6">
              <Link href="/reviews-houston-tx">Read Reviews</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-12 px-6">
              <Link href="/contact-houston-tx">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
