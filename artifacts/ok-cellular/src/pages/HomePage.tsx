import { Link, useLocation } from "wouter";
import { useState, type FormEvent } from "react";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Headphones,
  Battery,
  Search,
  Phone,
  MapPin,
  Clock,
  Truck,
  CreditCard,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  CheckCircle2,
  Wifi,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PromoCampaignBanner } from "@/components/PromoCampaignBanner";
import { LocationCard } from "@/components/LocationCard";
import { RepairQuoteWizard } from "@/components/forms/RepairQuoteWizard";
import { SEO, localBusinessJsonLd } from "@/components/SEO";
import { useBusiness } from "@/components/BusinessContext";
import { PhotoFrame, type Photo } from "@/components/PhotoFrame";
import { BeforeAfter, type BeforeAfterPair } from "@/components/BeforeAfter";
import { BUSINESS, SHIPPING, FINANCING } from "@/content";
import { INVENTORY_GROUPS } from "@/lib/inventoryGroups";

const inventoryHref = (slug: string) => `/inventory/${encodeURIComponent(slug)}`;
const groupSlug = (slug: string): string => {
  const found = INVENTORY_GROUPS.find((g) => g.slug === slug);
  if (!found) throw new Error(`Unknown inventory group slug: ${slug}`);
  return found.slug;
};
const photo = (slug: string, alt: string): Photo => ({
  src640: `/images/photos/${slug}-640.jpg`,
  src1024: `/images/photos/${slug}-1024.jpg`,
  alt,
});

const DEVICE_TILES: { name: string; desc: string; icon: LucideIcon; to: string; image?: Photo }[] = [
  { name: "iPhone", desc: "iPhone 6 through 16 Pro Max", icon: Smartphone, to: "/iphone-repair-houston-tx",
    image: photo("iphone-repair", "Technician using a precision screwdriver on an opened iPhone") },
  { name: "Samsung Galaxy", desc: "S, Note, A and Z series", icon: Smartphone, to: "/samsung-repair-houston-tx",
    image: photo("samsung-repair", "Disassembled Samsung smartphone with the back glass removed on a repair workbench") },
  { name: "Google Pixel", desc: "Pixel 3 through 9 Pro", icon: Smartphone, to: "/google-pixel-repair-houston-tx",
    image: photo("pixel-repair", "Pixel-style smartphone laid out with repair tools on a workbench") },
  { name: "iPad / Tablet", desc: "Glass, LCD and battery", icon: Tablet, to: "/tablet-repair-houston-tx",
    image: photo("tablet-repair", "Hands holding a digital tablet up close") },
  { name: "MacBook", desc: "Screen, battery, board", icon: Laptop, to: "/macbook-repair-houston-tx",
    image: photo("macbook-repair", "Technician soldering a laptop logic board at the workbench") },
  { name: "PC Laptop", desc: "HP, Dell, Lenovo, ASUS", icon: Laptop, to: "/laptop-repair-houston-tx",
    image: photo("laptop-repair", "A hand fixing the internal parts of a laptop") },
  { name: "PlayStation", desc: "HDMI, disc drive, no power", icon: Gamepad2, to: "/ps5-repair-houston-tx",
    image: photo("ps5-repair", "Close-up of a PlayStation 5 DualSense controller") },
  { name: "Xbox", desc: "Power, HDMI, disc drive", icon: Gamepad2, to: "/xbox-repair-houston-tx",
    image: photo("xbox-repair", "Xbox controller and console set up on a workbench") },
  { name: "Battery Replace", desc: "Phones, tablets, laptops", icon: Battery, to: "/battery-replacement-houston-tx",
    image: photo("battery-replace", "Open phone with battery exposed and repair tools laid out") },
  { name: "Accessories", desc: "Cases, chargers, audio", icon: Headphones, to: "/phone-accessories-houston-tx",
    image: photo("accessories", "Smartphone displayed alongside cases and accessories on a counter") },
];

const POPULAR_REPAIRS: { name: string; price: string; time: string; to: string; difficulty: string }[] = [
  { name: "iPhone Screen Replacement", price: "from $79", time: "30–60 min", difficulty: "Walk-in", to: "/iphone-screen-repair-houston-tx" },
  { name: "Phone Battery Replacement", price: "from $49", time: "30–45 min", difficulty: "Walk-in", to: "/battery-replacement-houston-tx" },
  { name: "PS5 HDMI Port Repair", price: "from $99", time: "Same day", difficulty: "Bench job", to: "/ps5-hdmi-repair-houston-tx" },
  { name: "Samsung Back Glass", price: "from $69", time: "Same day", difficulty: "Bench job", to: "/samsung-repair-houston-tx" },
  { name: "iPhone Charging Port", price: "from $69", time: "45–90 min", difficulty: "Bench job", to: "/iphone-charging-port-repair-houston-tx" },
  { name: "MacBook Repair", price: "Free quote", time: "1–3 days", difficulty: "By appointment", to: "/macbook-repair-houston-tx" },
];

const beforeAfterPair = (slug: string, label: string, beforeAlt: string, afterAlt: string): BeforeAfterPair => ({
  slug, label,
  before: photo(`before-${slug}`, beforeAlt),
  after: photo(`after-${slug}`, afterAlt),
});

const BEFORE_AFTER_PAIRS: BeforeAfterPair[] = [
  beforeAfterPair("iphone-screen", "iPhone Screen Replacement",
    "iPhone with shattered front display glass spider-webbed across the screen",
    "Same iPhone with a brand-new pristine display showing a clean blue lock screen"),
  beforeAfterPair("samsung-back", "Samsung Back Glass",
    "Samsung Galaxy with the rear glass panel completely shattered",
    "Same Samsung Galaxy with a flawless mirror-clean replacement back glass"),
  beforeAfterPair("logic-board", "Water-Damaged Board",
    "Smartphone logic board with white-blue corrosion crusted over the chips",
    "Same logic board after micro-soldering and ultrasonic cleaning, components shiny again"),
  beforeAfterPair("ipad-frame", "Tablet Battery Swap",
    "Tablet with a swollen lithium battery lifting the screen away from a bent aluminum frame",
    "Same tablet with a fresh battery installed and the frame realigned flush"),
  beforeAfterPair("hdmi-port", "Console HDMI Repair",
    "Gaming console HDMI port with bent and crushed gold connector pins",
    "Same HDMI port rebuilt with all pins straight and aligned again"),
  beforeAfterPair("macbook-keys", "Keyboard Repair",
    "Laptop keyboard with three keys missing and the scissor mechanisms exposed",
    "Same laptop keyboard fully restored with every key seated and aligned"),
];

const SELL_TILES: { name: string; desc: string; to: string; slug: string; image?: Photo }[] = [
  { name: "Apple", desc: "iPhones, iPads, MacBooks, AirPods, Watches", to: inventoryHref(groupSlug("apple")), slug: groupSlug("apple"),
    image: photo("sell-phones", "Row of unlocked Apple iPhones on display stands at the shop counter") },
  { name: "Samsung", desc: "Galaxy S, Note, A and Z series", to: inventoryHref(groupSlug("samsung")), slug: groupSlug("samsung"),
    image: photo("sell-tablets", "Refurbished Samsung Galaxy phones on display stands at the shop counter") },
  { name: "Google", desc: "Pixel 3 through 9 Pro", to: inventoryHref(groupSlug("google")), slug: groupSlug("google"),
    image: photo("sell-laptops", "Google Pixel phones lined up on the shop counter") },
  { name: "Gaming Consoles", desc: "PlayStation, Xbox, Switch", to: inventoryHref(groupSlug("consoles")), slug: groupSlug("consoles"),
    image: photo("sell-consoles", "Refurbished gaming consoles and controllers on the shop counter") },
];

const PREPAID_TILES = [
  { label: "Cricket", to: "/phone-activation-houston-tx" },
  { label: "Metro by T-Mobile", to: "/phone-activation-houston-tx" },
  { label: "T-Mobile", to: "/phone-activation-houston-tx" },
  { label: "AT&T Prepaid", to: "/att-activation-houston-tx" },
  { label: "Boost Mobile", to: "/boost-mobile-activation-houston-tx" },
  { label: "Gen Mobile", to: "/gen-mobile-activation-houston-tx" },
  { label: "Simple Mobile", to: "/simple-mobile-activation-houston-tx" },
  { label: "H2O Wireless", to: "/h2o-wireless-activation-houston-tx" },
  { label: "Lyca Mobile", to: "/lyca-mobile-activation-houston-tx" },
  { label: "Verizon Prepaid", to: "/verizon-prepaid-activation-houston-tx" },
];

const AREA_TILES = [
  { label: "Houston", to: "/phone-repair-houston-tx" },
  { label: "Sugar Land", to: "/phone-repair-sugar-land-tx" },
  { label: "Missouri City", to: "/phone-repair-missouri-city-tx" },
  { label: "Stafford", to: "/phone-repair-stafford-tx" },
  { label: "Katy", to: "/phone-repair-katy-tx" },
  { label: "Alief", to: "/phone-repair-alief-tx" },
  { label: "Sharpstown", to: "/phone-repair-sharpstown-tx" },
];

const STAT_TILES = [
  { value: "15", unit: "yr", label: "Repairing Houston since 2010" },
  { value: "90", unit: "d", label: "Warranty on every repair" },
  { value: "1–2", unit: "h", label: "Typical walk-in turnaround" },
  { value: "5★", unit: "", label: "Average customer rating" },
];

function HeroSearch() {
  const [, setLocation] = useLocation();
  const [v, setV] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = v.trim().toLowerCase();
    if (!q) {
      setLocation("/repair-services-houston-tx");
      return;
    }
    if (q.includes("iphone")) setLocation("/iphone-repair-houston-tx");
    else if (q.includes("samsung") || q.includes("galaxy")) setLocation("/samsung-repair-houston-tx");
    else if (q.includes("pixel") || q.includes("google")) setLocation("/google-pixel-repair-houston-tx");
    else if (q.includes("ipad") || q.includes("tablet")) setLocation("/tablet-repair-houston-tx");
    else if (q.includes("macbook")) setLocation("/macbook-repair-houston-tx");
    else if (q.includes("laptop") || q.includes("computer")) setLocation("/laptop-repair-houston-tx");
    else if (q.includes("ps5") || q.includes("playstation")) setLocation("/ps5-repair-houston-tx");
    else if (q.includes("xbox")) setLocation("/xbox-repair-houston-tx");
    else if (q.includes("battery")) setLocation("/battery-replacement-houston-tx");
    else if (q.includes("hdmi")) setLocation("/hdmi-port-repair-houston-tx");
    else if (q.includes("unlock")) setLocation("/phone-unlocking-houston-tx");
    else if (q.includes("mail") || q.includes("ship")) setLocation("/mail-in-repair-houston-tx");
    else if (q.includes("financ") || q.includes("$10")) setLocation("/financing-houston-tx");
    else setLocation("/repair-services-houston-tx");
  };
  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-2 max-w-2xl"
      data-testid="hero-search-form"
    >
      <label htmlFor="hero-search" className="sr-only">What are you fixing today?</label>
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          id="hero-search"
          type="search"
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="What are you fixing today? e.g. iPhone screen, PS5 HDMI…"
          className="w-full h-12 pl-10 pr-4 rounded-md border border-border bg-card text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          data-testid="input-hero-search"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-colors"
        data-testid="button-hero-search"
      >
        Find a repair <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function HomePage() {
  const business = useBusiness();

  return (
    <PageShell>
      <SEO
        title="Best Phone Repair Houston TX | OK Cellular"
        description="Top-rated phone repair in Houston TX. Fast fixes for screens, batteries & charging ports. Walk-ins welcome. Free quote at OK Cellular today!"
        path="/phone-repair-houston-tx"
        jsonLd={localBusinessJsonLd(business)}
      />
      <PromoCampaignBanner />

      {/* HERO — search-led, calm, repair-handbook tone */}
      <section className="bg-card border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-muted text-muted-foreground border border-border rounded-full px-2.5 py-1 font-medium">
                15 years in Houston
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-1 font-medium">
                <Zap className="w-3 h-3" /> Most repairs in 15–20 min
              </span>
              <span className="inline-flex items-center gap-1.5 bg-muted text-muted-foreground border border-border rounded-full px-2.5 py-1 font-medium">
                90-day warranty
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-foreground leading-[1.05]">
              Houston's repair shop for phones, tablets, laptops &amp; consoles.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Walk in, mail in, or get a quote in minutes. Real technicians, transparent pricing, and a 90-day warranty on every fix — same shop on Will Clayton Pkwy since 2010.
            </p>
            <HeroSearch />
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Free diagnostic</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Walk-ins welcome</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> All major brands</span>
            </div>
          </div>

          {/* Side panel: Visit / Hours / Quick stats */}
          <aside className="lg:col-span-5 w-full">
            <div className="rounded-md border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-muted/40">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Visit the shop</div>
                <div className="text-base font-semibold text-foreground mt-0.5">{BUSINESS.name} — Humble, TX</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <a href={business.mapsLink} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary transition-colors">
                    {business.addressLine1}<br />
                    <span className="text-muted-foreground">{business.addressLine2}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{business.hoursShort}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <a href={business.phoneTel} className="text-foreground hover:text-primary transition-colors font-medium">
                    {business.phoneDisplay}
                  </a>
                </li>
              </ul>
              <div className="px-5 pb-5 grid grid-cols-2 gap-2 text-sm">
                <a href={business.phoneTel} className="inline-flex items-center justify-center gap-1.5 h-10 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors" data-testid="hero-side-call">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a href={business.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 h-10 rounded-md border border-border bg-card hover:bg-muted text-foreground font-semibold transition-colors" data-testid="hero-side-whatsapp">
                  WhatsApp
                </a>
              </div>
              <div className="border-t border-border grid grid-cols-4">
                {STAT_TILES.map((s) => (
                  <div key={s.label} className="px-3 py-3 border-r last:border-r-0 border-border text-center">
                    <div className="text-xl font-semibold text-foreground tabular-nums">
                      {s.value}<span className="text-primary">{s.unit}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BROWSE BY DEVICE */}
      <section className="bg-background">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Browse by device</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                What are you fixing?
              </h2>
            </div>
            <Link
              href="/repair-services-houston-tx"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              data-testid="link-all-repairs"
            >
              All repair services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {DEVICE_TILES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.to}
                  href={s.to}
                  className="group rounded-md border border-border bg-card hover:border-primary hover:shadow-sm transition-all overflow-hidden"
                  data-testid={`tile-${s.to}`}
                >
                  {s.image ? (
                    <PhotoFrame
                      photo={s.image}
                      aspect="4:3"
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                      <Icon className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                  <div className="p-3.5">
                    <div className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                      {s.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR REPAIRS — iFixit-style guide table */}
      <section className="bg-muted/40 border-y border-border">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Walk-in pricing</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Most popular repairs &amp; what they cost
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Honest starting prices for the repairs we do every day. Final price is confirmed in a free in-person diagnostic — no surprises, no upsells.
            </p>
            <ul className="space-y-2.5 text-sm text-foreground mb-6">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> 90-day repair warranty on every fix</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> OEM-grade parts where available</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> No fix, no fee — diagnostic is free</li>
            </ul>
            <Link
              href="/repair-services-houston-tx"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              data-testid="link-all-pricing"
            >
              See all repairs &amp; pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-md border border-border bg-card overflow-hidden">
              <div className="grid grid-cols-12 px-4 py-3 border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <div className="col-span-6">Repair</div>
                <div className="col-span-2 text-right tabular-nums">Price</div>
                <div className="col-span-2 hidden sm:block">Time</div>
                <div className="col-span-2 hidden md:block">Type</div>
              </div>
              <ul className="divide-y divide-border">
                {POPULAR_REPAIRS.map((r) => (
                  <li key={r.to}>
                    <Link
                      href={r.to}
                      className="grid grid-cols-12 px-4 py-3.5 items-center text-sm hover:bg-muted/60 transition-colors"
                      data-testid={`popular-${r.to}`}
                    >
                      <div className="col-span-6 sm:col-span-6 flex items-center gap-2.5 min-w-0">
                        <Wrench className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-foreground font-semibold truncate">{r.name}</span>
                      </div>
                      <div className="col-span-6 sm:col-span-2 text-right text-foreground font-semibold tabular-nums">
                        {r.price}
                      </div>
                      <div className="col-span-12 sm:col-span-2 hidden sm:block text-muted-foreground tabular-nums">
                        {r.time}
                      </div>
                      <div className="col-span-12 md:col-span-2 hidden md:block text-muted-foreground">
                        {r.difficulty}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MAIL-IN + FINANCING — utility tiles */}
      <section className="bg-background">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-4 md:gap-6">
          <Link
            href={SHIPPING.mailInSlug}
            className="group rounded-md border border-border bg-card hover:border-primary hover:shadow-sm transition-all p-6 md:p-7 flex items-start gap-4"
            data-testid="cta-mail-in-home"
          >
            <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">Out of town?</div>
              <div className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                Mail in your device for repair
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Free repair quote. Insured shipping both ways. Back in {SHIPPING.turnaroundDays}.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Start a mail-in repair <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
          <Link
            href={FINANCING.pagePath}
            className="group rounded-md border border-border bg-card hover:border-primary hover:shadow-sm transition-all p-6 md:p-7 flex items-start gap-4"
            data-testid="cta-financing-home"
          >
            <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">Buy now, pay later</div>
              <div className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                Phone financing from $10 down
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Walk out the same day with an unlocked phone. Soft credit check — no impact to your score.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                See how financing works <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* OUR WORK — before/after */}
      <section id="our-work" className="bg-muted/40 border-y border-border scroll-mt-24">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Our work</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Real repairs we do every day
              </h2>
            </div>
            <p className="hidden md:block text-sm text-muted-foreground max-w-md">
              Cracked screens, corroded boards, swollen batteries — drag the slider to see the before and the after.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BEFORE_AFTER_PAIRS.map((pair) => (
              <BeforeAfter
                key={pair.slug}
                pair={pair}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6 text-center">
            Most repairs done same-day. 90-day warranty on every fix. Photos are illustrative; your finished device is yours alone.
          </p>
        </div>
      </section>

      {/* WHY US — calm trust strip */}
      <section className="bg-background">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Star, title: "15 years in Houston", desc: "Same shop on Will Clayton Pkwy since 2010 — owner-operated and independent." },
              { icon: Zap, title: "Same-day turnaround", desc: "Most walk-in repairs are done in 15–20 minutes while you wait." },
              { icon: ShieldCheck, title: "Certified technicians", desc: "Board-level repair, micro-soldering and data recovery — done in-house." },
              { icon: CheckCircle2, title: "90-day warranty", desc: "Every repair backed by a 90-day warranty on parts and labor." },
            ].map((tile) => {
              const Icon = tile.icon;
              return (
                <div key={tile.title} className="rounded-md border border-border bg-card p-5">
                  <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{tile.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tile.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WE SELL TOO */}
      <section className="bg-muted/40 border-y border-border">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">We sell too</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Tested, warrantied phones &amp; consoles
              </h2>
            </div>
            <Link
              href="/inventory"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              data-testid="link-full-inventory"
            >
              Browse full inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {SELL_TILES.map((p) => (
              <Link
                key={p.slug}
                href={p.to}
                className="group rounded-md border border-border bg-card hover:border-primary hover:shadow-sm transition-all overflow-hidden"
                data-testid={`sell-${p.slug}`}
              >
                {p.image ? (
                  <PhotoFrame photo={p.image} aspect="4:3" sizes="(min-width: 1024px) 280px, 50vw" />
                ) : null}
                <div className="p-4">
                  <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE WIZARD */}
      <section id="quote" className="bg-background scroll-mt-24">
        <div className="max-w-[1240px] mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">Free quote</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Tell us what's broken
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              A real technician answers — usually within 30 minutes during shop hours. We'll text or call back today with a firm price and the fastest way to get your device fixed.
            </p>
            <ul className="space-y-2.5 text-sm text-foreground mb-6">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Free in-person diagnostic</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Same-day repair where possible</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> 90-day warranty on every fix</li>
            </ul>
            <div className="hidden lg:block rounded-md border border-border bg-muted/40 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                Prefer to call?
              </div>
              <a
                href={business.phoneTel}
                className="font-semibold text-xl text-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5 text-primary" />
                {business.phoneDisplay}
              </a>
              <div className="text-xs text-muted-foreground mt-2">{business.hoursShort}</div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <RepairQuoteWizard />
          </div>
        </div>
      </section>

      {/* PREPAID + AREAS */}
      <section className="bg-muted/40 border-y border-border">
        <div className="max-w-[1240px] mx-auto px-4 py-10 md:py-12 grid md:grid-cols-2 gap-10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-3">
              <Wifi className="w-3 h-3 inline mr-1 -mt-0.5" /> Prepaid &amp; bill pay
            </div>
            <h3 className="text-base font-semibold text-foreground mb-3">Activate any major prepaid carrier</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {PREPAID_TILES.map((c) => (
                <Link
                  key={c.label}
                  href={c.to}
                  className="rounded-full border border-border bg-card hover:border-primary hover:text-primary px-3 py-1 text-xs font-medium text-foreground transition-colors"
                  data-testid={`prepaid-${c.label}`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
            <Link
              href="/bill-payments-houston-tx"
              className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Pay your bill in cash <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-3">Service areas</div>
            <h3 className="text-base font-semibold text-foreground mb-3">We serve Houston &amp; the surrounding cities</h3>
            <div className="flex flex-wrap gap-2">
              {AREA_TILES.map((a) => (
                <Link
                  key={a.label}
                  href={a.to}
                  className="rounded-full border border-border bg-card hover:border-primary hover:text-primary px-3 py-1 text-xs font-medium text-foreground transition-colors"
                  data-testid={`area-${a.label}`}
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
