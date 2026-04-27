import { Link } from "wouter";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Headphones,
  Wrench,
  Zap,
  Star,
  Shield,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Battery,
  Wifi,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { LocationCard } from "@/components/LocationCard";
import { RepairQuoteWizard } from "@/components/forms/RepairQuoteWizard";
import { SEO, localBusinessJsonLd } from "@/components/SEO";
import { BUSINESS, HERO } from "@/content";

const SERVICE_TILES: { name: string; desc: string; icon: LucideIcon; to: string }[] = [
  { name: "iPhone Repair", desc: "Screen, battery, charging port.", icon: Smartphone, to: "/iphone-repair-houston-tx" },
  { name: "Samsung Repair", desc: "Galaxy S, Note, A and Z series.", icon: Smartphone, to: "/samsung-repair-houston-tx" },
  { name: "Pixel Repair", desc: "Google Pixel 3 through 9 Pro.", icon: Smartphone, to: "/google-pixel-repair-houston-tx" },
  { name: "iPad / Tablet", desc: "Glass, LCD, battery replacement.", icon: Tablet, to: "/tablet-repair-houston-tx" },
  { name: "MacBook Repair", desc: "Screen, battery, keyboard, board.", icon: Laptop, to: "/macbook-repair-houston-tx" },
  { name: "Laptop Repair", desc: "HP, Dell, Lenovo, ASUS, Acer.", icon: Laptop, to: "/laptop-repair-houston-tx" },
  { name: "PS5 Repair", desc: "HDMI port, disc drive, no power.", icon: Gamepad2, to: "/ps5-repair-houston-tx" },
  { name: "Xbox Repair", desc: "Power issues, HDMI, disc drive.", icon: Gamepad2, to: "/xbox-repair-houston-tx" },
  { name: "Battery Replace", desc: "Phones, tablets, laptops.", icon: Battery, to: "/battery-replacement-houston-tx" },
  { name: "Accessories", desc: "Cases, chargers, screen protectors.", icon: Headphones, to: "/phone-accessories-houston-tx" },
];

const HERO_DIAGNOSTIC: { name: string; price: string; icon: LucideIcon; to: string }[] = [
  { name: "iPhone Screen", price: "from $79", icon: Smartphone, to: "/iphone-screen-repair-houston-tx" },
  { name: "Battery Swap", price: "from $49", icon: Battery, to: "/battery-replacement-houston-tx" },
  { name: "PS5 HDMI", price: "from $99", icon: Gamepad2, to: "/ps5-hdmi-repair-houston-tx" },
  { name: "MacBook Repair", price: "free quote", icon: Laptop, to: "/macbook-repair-houston-tx" },
];

const WHY_TILES = [
  { title: "15 Years Heritage", desc: "Houston's trusted repair shop since 2010.", icon: Star },
  { title: "Same-Day Turnaround", desc: "Most repairs done in 1–2 hours while you wait.", icon: Zap },
  { title: "Certified Technicians", desc: "Skilled techs who know every device, inside and out.", icon: ShieldCheck },
  { title: "90-Day Warranty", desc: "Every repair backed by our 90-day warranty.", icon: CheckCircle2 },
];

const FEATURED_OFFERS = [
  { title: "iPhone Screen", price: "from $79", note: "Most models in stock", icon: Smartphone, to: "/iphone-repair-houston-tx" },
  { title: "Battery Replacement", price: "from $49", note: "Phones, tablets, laptops", icon: Battery, to: "/battery-replacement-houston-tx" },
  { title: "HDMI Port Repair", price: "from $99", note: "PS5, Xbox, Switch", icon: Gamepad2, to: "/hdmi-port-repair-houston-tx" },
  { title: "Used Phones", price: "from $99", note: "Unlocked, tested, warrantied", icon: Smartphone, to: "/used-phones-houston-tx" },
  { title: "Prepaid Activation", price: "Walk in", note: "Cricket, Metro, T-Mobile, AT&T", icon: Wifi, to: "/phone-activation-houston-tx" },
];

const SELL_TILES = [
  { name: "Unlocked Phones", desc: "Apple, Samsung, Pixel & more", icon: Smartphone, to: "/phones-for-sale-houston-tx" },
  { name: "iPads & Tablets", desc: "Cellular and Wi-Fi", icon: Tablet, to: "/tablet-repair-houston-tx" },
  { name: "MacBooks & Laptops", desc: "Refurbished and tested", icon: Laptop, to: "/laptops-for-sale-houston-tx" },
  { name: "Gaming Consoles", desc: "PlayStation, Xbox, Switch", icon: Gamepad2, to: "/gaming-console-repair-houston-tx" },
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

export default function HomePage() {
  const [ctaCall, ctaQuote, ctaDirections] = HERO.ctas;

  return (
    <PageShell>
      <SEO
        title="Gadget X Repairs — Same-Day Phone, Tablet, Laptop & Console Repair in Houston"
        description="15 years of trusted same-day phone, iPad, MacBook, laptop, PlayStation, Xbox & Nintendo repair in Houston, TX. Walk-ins welcome at 8389 Almeda Rd. Call (346) 623-6898."
        path="/phone-repair-houston-tx"
        jsonLd={localBusinessJsonLd()}
      />

      {/* HERO ----------------------------------------------------------- */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 bg-zinc-100">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
          {/* Left: headline + CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="bg-zinc-950 text-white px-4 py-2 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#ef4444] inline-block">
                {HERO.badgeYears}
              </span>
              <span className="bg-red-600 text-white px-4 py-2 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#09090b] inline-flex items-center gap-2">
                <Zap className="w-4 h-4" /> {HERO.badgeSameDay}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.85] font-black uppercase tracking-tighter text-zinc-950">
              Houston&apos;s <span className="text-red-600">Fix</span> for Phones, Tablets, Laptops &amp; Consoles.
            </h1>
            <p className="text-lg md:text-xl font-bold text-zinc-600 max-w-xl uppercase tracking-tight">
              {HERO.subhead}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                className="rounded-none bg-red-600 hover:bg-zinc-950 text-white font-black uppercase tracking-widest text-base h-14 px-7 shadow-[6px_6px_0_0_#09090b] hover:shadow-[2px_2px_0_0_#09090b] transition-all hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <a href={ctaCall.href} data-testid="hero-cta-call">
                  <Phone className="w-5 h-5 mr-2" /> {ctaCall.label}
                </a>
              </Button>
              <Button
                asChild
                className="rounded-none bg-zinc-950 hover:bg-red-600 text-white font-black uppercase tracking-widest text-base h-14 px-7 shadow-[6px_6px_0_0_#ef4444] hover:shadow-[2px_2px_0_0_#ef4444] transition-all hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <a href={ctaQuote.href} data-testid="hero-cta-quote">
                  <Wrench className="w-5 h-5 mr-2" /> {ctaQuote.label}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-4 border-zinc-950 bg-transparent hover:bg-zinc-950 hover:text-white text-zinc-950 font-black uppercase tracking-widest text-base h-14 px-7"
              >
                <a href={ctaDirections.href} target="_blank" rel="noreferrer" data-testid="hero-cta-directions">
                  <MapPin className="w-5 h-5 mr-2" /> {ctaDirections.label}
                </a>
              </Button>
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-xl">
              <div>
                <div className="text-3xl md:text-4xl font-black text-zinc-950">15</div>
                <div className="text-[11px] md:text-xs font-black uppercase tracking-widest text-zinc-500">Years in Houston</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-zinc-950">90<span className="text-red-600">d</span></div>
                <div className="text-[11px] md:text-xs font-black uppercase tracking-widest text-zinc-500">Repair Warranty</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-zinc-950">5<span className="text-red-600">★</span></div>
                <div className="text-[11px] md:text-xs font-black uppercase tracking-widest text-zinc-500">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right: Diagnostic Check panel */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-zinc-950 text-white p-6 md:p-8 shadow-[12px_12px_0_0_#ef4444]">
              <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                <h3 className="font-black uppercase tracking-tighter text-xl flex items-center gap-2 text-red-500">
                  <Zap className="w-5 h-5" /> Diagnostic Check
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Pricing</span>
              </div>
              <ul className="space-y-3 mb-6">
                {HERO_DIAGNOSTIC.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        href={item.to}
                        className="flex items-center justify-between gap-3 px-4 py-3 bg-zinc-900 hover:bg-red-600 transition-colors group"
                        data-testid={`hero-diagnostic-${item.to}`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                          <span className="font-black uppercase text-sm tracking-wide">{item.name}</span>
                        </span>
                        <span className="font-black uppercase text-xs tracking-widest text-red-500 group-hover:text-white">
                          {item.price}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <a
                href="#quote"
                className="block w-full bg-red-600 text-white font-black uppercase tracking-widest text-sm py-3 text-center shadow-[4px_4px_0_0_#fff] hover:shadow-[2px_2px_0_0_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                data-testid="hero-diagnostic-cta"
              >
                Get My Quote →
              </a>
              <div className="mt-6 pt-6 border-t border-zinc-800 grid gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-black uppercase tracking-wide text-zinc-300">{BUSINESS.addressLine1}</div>
                    <div className="font-bold text-zinc-500">{BUSINESS.addressLine2}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                  <div className="font-black uppercase tracking-wide text-zinc-300">{BUSINESS.hoursShort}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP ---------------------------------------------------- */}
      <div className="bg-red-600 text-white border-y-4 border-zinc-950 py-6">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 font-black uppercase tracking-widest text-sm md:text-lg">
          <div className="flex items-center gap-2"><Star className="w-5 h-5 text-red-200" /> 15+ Years in Houston</div>
          <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-red-200" /> Same-Day Repair</div>
          <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-red-200" /> 90-Day Warranty</div>
          <div className="flex items-center gap-2"><Star className="w-5 h-5 text-red-200" /> 5-Star Reviews</div>
          <div className="flex items-center gap-2"><Smartphone className="w-5 h-5 text-red-200" /> All Brands Welcome</div>
        </div>
      </div>

      {/* SERVICES GRID -------------------------------------------------- */}
      <section className="py-20 md:py-24 px-4 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-zinc-950">
              What We <br />
              <span className="text-red-600">Repair</span>
            </h2>
            <div className="bg-zinc-950 text-white p-4 max-w-sm shadow-[6px_6px_0_0_#ef4444]">
              <p className="font-black uppercase text-xs leading-snug tracking-wide">
                No matter how badly you broke it, bring it in. We&apos;ve seen worse.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICE_TILES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.to}
                  href={s.to}
                  className="group block relative bg-zinc-50 border-4 border-zinc-950 p-6 shadow-[6px_6px_0_0_#09090b] hover:shadow-[2px_2px_0_0_#09090b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                  data-testid={`tile-${s.to}`}
                >
                  <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="bg-zinc-950 text-white w-12 h-12 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">{s.name}</h3>
                  <p className="text-xs font-bold text-zinc-500 mb-4 uppercase">{s.desc}</p>
                  <div className="text-red-600 font-black uppercase text-xs tracking-widest">View details →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICE BOARD + WHY -------------------------------------------- */}
      <section className="py-20 md:py-24 px-4 bg-zinc-100">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-12">
          {/* Price board (charcoal) */}
          <div className="lg:col-span-7 bg-zinc-950 text-white p-6 md:p-10 shadow-[12px_12px_0_0_#ef4444]">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                Hot <span className="text-red-500">Deals</span>
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Walk-in Pricing</span>
            </div>
            <div className="space-y-3">
              {FEATURED_OFFERS.map((offer) => {
                const Icon = offer.icon;
                return (
                  <Link
                    key={offer.title}
                    href={offer.to}
                    className="flex items-center justify-between gap-4 px-4 md:px-5 py-4 bg-zinc-900 hover:bg-red-600 transition-colors group"
                    data-testid={`offer-${offer.to}`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="bg-zinc-800 group-hover:bg-zinc-950 p-2 shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base md:text-lg font-black uppercase tracking-tight truncate">{offer.title}</h4>
                        <div className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-red-200">
                          {offer.note}
                        </div>
                      </div>
                    </div>
                    <div className="font-black uppercase text-sm md:text-base tracking-widest text-red-500 group-hover:text-white shrink-0">
                      {offer.price}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Why Gadget X */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">
              Why <span className="text-red-600">Gadget X?</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {WHY_TILES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white border-4 border-zinc-950 p-5 shadow-[6px_6px_0_0_#09090b] hover:-translate-y-1 transition-transform"
                  >
                    <div className="bg-zinc-950 text-white w-12 h-12 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <h4 className="text-base font-black uppercase mb-1 leading-tight">{item.title}</h4>
                    <p className="text-xs font-bold text-zinc-600 uppercase tracking-tight">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WE SELL TOO -------------------------------------------------- */}
      <section className="py-20 md:py-24 px-4 bg-white border-y-4 border-zinc-950">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-zinc-950">
              We <span className="text-red-600">Sell</span> Too
            </h2>
            <p className="text-base font-bold text-zinc-600 uppercase tracking-tight max-w-md">
              {BUSINESS.tagline}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {SELL_TILES.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.to}
                  href={product.to}
                  className="bg-zinc-50 border-4 border-zinc-950 aspect-square flex flex-col items-center justify-center p-4 text-center shadow-[6px_6px_0_0_#09090b] hover:shadow-[2px_2px_0_0_#09090b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all group"
                  data-testid={`sell-${product.to}`}
                >
                  <div className="bg-zinc-950 text-white w-14 h-14 flex items-center justify-center mb-3 group-hover:bg-red-600 transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="font-black uppercase text-sm tracking-tight">{product.name}</span>
                  <span className="font-bold text-zinc-500 text-[11px] uppercase tracking-tight mt-1">{product.desc}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Button
              asChild
              className="rounded-none bg-zinc-950 hover:bg-red-600 text-white font-black uppercase tracking-widest text-base h-14 px-8 shadow-[6px_6px_0_0_#ef4444] hover:shadow-[2px_2px_0_0_#ef4444] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
            >
              <Link href="/inventory">Browse Full Inventory →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* QUOTE WIZARD -------------------------------------------------- */}
      <section id="quote" className="py-20 md:py-24 px-4 bg-zinc-100 scroll-mt-24">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-zinc-950 leading-[0.9]">
              Get Your <br />
              <span className="text-red-600">Repair Quote</span>
            </h2>
            <p className="text-lg font-bold text-zinc-600 mb-8 max-w-md uppercase tracking-tight">
              Tell us what&apos;s broken. We&apos;ll tell you how much to fix it. Fast.
            </p>
            <ul className="space-y-3 text-base font-bold text-zinc-700 mb-10">
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">Free diagnostic</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">Same-day repair where possible</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">90-day warranty on every fix</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">A real technician answers — usually within 30 min</span>
              </li>
            </ul>
            <div className="hidden lg:block bg-zinc-950 text-white p-6 shadow-[8px_8px_0_0_#ef4444]">
              <div className="font-black uppercase tracking-widest text-xs text-zinc-500 mb-2">Prefer to call?</div>
              <a href={BUSINESS.phoneTel} className="font-black uppercase text-2xl tracking-tight hover:text-red-500 transition-colors block">
                <Phone className="w-5 h-5 inline mr-2 text-red-500" />
                {BUSINESS.phoneDisplay}
              </a>
              <div className="text-xs font-bold text-zinc-500 mt-2 uppercase tracking-wide">{BUSINESS.hoursShort}</div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <RepairQuoteWizard />
          </div>
        </div>
      </section>

      {/* PREPAID + AREAS ----------------------------------------------- */}
      <section className="py-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4">
              Prepaid Activations &amp; Bill Pay
            </h3>
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {PREPAID_TILES.map((carrier) => (
                <Link
                  key={carrier.label}
                  href={carrier.to}
                  className="bg-zinc-100 border-2 border-zinc-200 hover:border-zinc-950 px-4 py-2 font-black uppercase text-xs tracking-wide transition-colors"
                  data-testid={`prepaid-${carrier.label}`}
                >
                  {carrier.label}
                </Link>
              ))}
            </div>
            <Link
              href="/bill-payments-houston-tx"
              className="text-red-600 font-black uppercase text-sm tracking-widest hover:underline inline-flex items-center gap-1"
            >
              Pay your bill in cash <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {AREA_TILES.map((area) => (
                <Link
                  key={area.label}
                  href={area.to}
                  className="text-zinc-700 font-black uppercase text-xs tracking-wide border-b-2 border-zinc-300 pb-1 hover:text-red-600 hover:border-red-600 transition-colors px-2"
                  data-testid={`area-${area.label}`}
                >
                  {area.label}
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
