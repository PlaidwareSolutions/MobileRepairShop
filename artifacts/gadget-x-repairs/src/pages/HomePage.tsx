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
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Battery,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { LocationCard } from "@/components/LocationCard";
import { RepairQuoteForm } from "@/components/forms/RepairQuoteForm";
import { SEO, localBusinessJsonLd } from "@/components/SEO";
import { BUSINESS, HERO } from "@/content";

const SERVICE_TILES: { name: string; desc: string; icon: LucideIcon; to: string }[] = [
  { name: "iPhone Repair", desc: "Screen, battery, charging port.", icon: Smartphone, to: "/iphone-repair-houston" },
  { name: "Samsung Repair", desc: "Galaxy S, Note, A and Z series.", icon: Smartphone, to: "/samsung-phone-repair-houston" },
  { name: "Pixel Repair", desc: "Google Pixel 3 through 9 Pro.", icon: Smartphone, to: "/google-pixel-repair-houston" },
  { name: "iPad / Tablet", desc: "Glass, LCD, battery replacement.", icon: Tablet, to: "/ipad-tablet-repair-houston" },
  { name: "MacBook Repair", desc: "Screen, battery, keyboard, board.", icon: Laptop, to: "/macbook-repair-houston" },
  { name: "Laptop Repair", desc: "HP, Dell, Lenovo, ASUS, Acer.", icon: Laptop, to: "/laptop-repair-houston" },
  { name: "PS5 Repair", desc: "HDMI port, disc drive, no power.", icon: Gamepad2, to: "/ps5-repair-houston" },
  { name: "Xbox Repair", desc: "Power issues, HDMI, disc drive.", icon: Gamepad2, to: "/xbox-repair-houston" },
  { name: "Battery Replace", desc: "Phones, tablets, laptops.", icon: Battery, to: "/battery-replacement-houston" },
  { name: "Accessories", desc: "Cases, chargers, screen protectors.", icon: Headphones, to: "/phone-accessories-houston" },
];

const WHY_TILES = [
  { title: "15 Years Heritage", desc: "Houston's trusted repair shop since 2010.", icon: Star },
  { title: "Same-Day Turnaround", desc: "Most repairs done in 1–2 hours while you wait.", icon: Zap },
  { title: "Certified Technicians", desc: "Skilled techs who know every device, inside and out.", icon: ShieldCheck },
  { title: "90-Day Warranty", desc: "Every repair backed by our 90-day warranty.", icon: CheckCircle2 },
];

const FEATURED_OFFERS = [
  { title: "iPhone Screen", price: "from $79", note: "Most models in stock", icon: Smartphone, to: "/iphone-repair-houston" },
  { title: "Battery Replacement", price: "from $49", note: "Phones, tablets, laptops", icon: Battery, to: "/battery-replacement-houston" },
  { title: "HDMI Port Repair", price: "from $99", note: "PS5, Xbox, Switch", icon: Gamepad2, to: "/hdmi-port-repair-houston" },
  { title: "Used Phones", price: "from $99", note: "Unlocked, tested, warrantied", icon: Smartphone, to: "/used-phones-houston" },
  { title: "Prepaid Activation", price: "Walk in", note: "Cricket, Metro, T-Mobile, AT&T", icon: Wifi, to: "/prepaid-phone-activations-houston" },
];

const SELL_TILES = [
  { name: "Unlocked Phones", desc: "Apple, Samsung, Pixel & more", icon: Smartphone, to: "/phones-for-sale-houston" },
  { name: "iPads & Tablets", desc: "Cellular and Wi-Fi", icon: Tablet, to: "/ipad-tablet-repair-houston" },
  { name: "MacBooks & Laptops", desc: "Refurbished and tested", icon: Laptop, to: "/laptops-for-sale-houston" },
  { name: "Gaming Consoles", desc: "PlayStation, Xbox, Switch", icon: Gamepad2, to: "/gaming-console-repair-houston" },
];

const PREPAID_TILES = [
  { label: "Cricket", to: "/prepaid-phone-activations-houston" },
  { label: "Metro by T-Mobile", to: "/prepaid-phone-activations-houston" },
  { label: "T-Mobile", to: "/prepaid-phone-activations-houston" },
  { label: "AT&T Prepaid", to: "/att-prepaid-activation-houston" },
  { label: "Boost Mobile", to: "/boost-mobile-activation-houston" },
  { label: "Gen Mobile", to: "/gen-mobile-activation-houston" },
  { label: "Simple Mobile", to: "/simple-mobile-activation-houston" },
  { label: "H2O Wireless", to: "/h2o-wireless-activation-houston" },
  { label: "Lyca Mobile", to: "/lyca-mobile-activation-houston" },
  { label: "Verizon Prepaid", to: "/verizon-prepaid-activation-houston" },
];

const AREA_TILES = [
  { label: "Houston", to: "/" },
  { label: "Sugar Land", to: "/phone-repair-sugar-land" },
  { label: "Missouri City", to: "/phone-repair-missouri-city" },
  { label: "Stafford", to: "/phone-repair-stafford" },
  { label: "Katy", to: "/phone-repair-katy" },
  { label: "Alief", to: "/phone-repair-alief" },
  { label: "Sharpstown", to: "/phone-repair-sharpstown" },
];

export default function HomePage() {
  const [ctaCall, ctaQuote, ctaDirections] = HERO.ctas;

  return (
    <PageShell>
      <SEO
        title="Gadget X Repairs — Same-Day Phone, Tablet, Laptop & Console Repair in Houston"
        description="15 years of trusted same-day phone, iPad, MacBook, laptop, PlayStation, Xbox & Nintendo repair in Houston, TX. Walk-ins welcome at 8389 Almeda Rd. Call (346) 623-6898."
        path="/"
        jsonLd={localBusinessJsonLd()}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4 border-b border-zinc-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="bg-yellow-400 text-black px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] inline-block transform -rotate-2">
                {HERO.badgeYears}
              </span>
              <span className="bg-red-500 text-white px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] inline-flex items-center gap-2 transform rotate-1">
                <Zap className="w-4 h-4" /> {HERO.badgeSameDay}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-black uppercase tracking-tighter text-white">
              {HERO.h1}
            </h1>
            <p className="text-xl md:text-2xl font-bold text-zinc-400 max-w-lg">{HERO.subhead}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-16 px-8 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]">
                <a href={ctaCall.href}>{ctaCall.label}</a>
              </Button>
              <Button asChild className="rounded-none bg-yellow-400 hover:bg-white text-black font-black uppercase tracking-widest text-lg h-16 px-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
                <a href={ctaQuote.href} target="_blank" rel="noreferrer">{ctaQuote.label}</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-4 border-white bg-transparent hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-16 px-8">
                <a href={ctaDirections.href} target="_blank" rel="noreferrer">{ctaDirections.label}</a>
              </Button>
            </div>
          </div>

          <div className="relative h-[500px] w-full hidden md:block" aria-hidden="true">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-96 border-8 border-red-500 absolute transform rotate-12 bg-black/50 backdrop-blur"></div>
              <div className="w-72 h-80 border-8 border-yellow-400 absolute transform -rotate-6 bg-black/50 backdrop-blur z-10 flex items-center justify-center">
                <Wrench className="w-32 h-32 text-white" />
              </div>
              <div className="absolute top-10 right-10 bg-white text-black font-black uppercase p-4 transform rotate-12 text-3xl shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] z-20">
                CRACKED?
              </div>
              <div className="absolute bottom-10 left-10 bg-red-500 text-white font-black uppercase p-4 transform -rotate-12 text-3xl shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] z-20">
                WE GOT IT.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-white border-y-8 border-red-500 py-6">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-12 font-black uppercase tracking-tighter text-black text-lg md:text-2xl text-center">
          <div className="flex items-center gap-2"><Star className="w-7 h-7 text-red-500" /> 15+ Years in Houston</div>
          <div className="flex items-center gap-2"><Zap className="w-7 h-7 text-red-500" /> Same-Day Repair</div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-7 h-7 text-red-500" /> 90-Day Warranty</div>
          <div className="flex items-center gap-2"><Star className="w-7 h-7 text-red-500" /> 5-Star Reviews</div>
          <div className="flex items-center gap-2"><Smartphone className="w-7 h-7 text-red-500" /> All Brands Welcome</div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              WHAT WE <br /><span className="text-yellow-400 text-stroke-black">REPAIR</span>
            </h2>
            <div className="bg-red-500 p-4 transform rotate-2 max-w-sm">
              <p className="font-bold text-white uppercase text-sm leading-tight">No matter how badly you broke it, bring it in. We've seen worse.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICE_TILES.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.to} href={s.to} className="group block relative bg-black border-4 border-zinc-800 p-6 hover:border-red-500 transition-colors" data-testid={`tile-${s.to}`}>
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-6 h-6 text-red-500" />
                  </div>
                  <Icon className="w-12 h-12 mb-6 text-white group-hover:text-yellow-400 transition-colors" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{s.name}</h3>
                  <p className="text-sm font-bold text-zinc-500 mb-6">{s.desc}</p>
                  <div className="text-red-500 font-black uppercase text-sm group-hover:underline">View details</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 px-4 bg-red-500 text-black">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-7xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.8] mb-8">
              WHY <br /><span className="text-white">GADGET X</span>
            </h2>
            <div className="text-2xl font-bold uppercase border-l-8 border-black pl-6 py-2">
              "We don't just fix devices. We bring them back from the dead."
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {WHY_TILES.map((item, i) => {
              const Icon = item.icon;
              const isDark = i % 2 === 0;
              const stagger = i === 1 || i === 3 ? "mt-0 sm:mt-12" : "";
              return (
                <div key={item.title} className={`${isDark ? "bg-black text-white" : "bg-white text-black"} p-8 transform hover:-translate-y-2 transition-transform ${stagger}`}>
                  <div className={`text-6xl font-black mb-4 ${isDark ? "text-yellow-400" : "text-red-500"}`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <h4 className="text-2xl font-black uppercase mb-2">{item.title}</h4>
                  <p className={`${isDark ? "text-zinc-400" : "text-zinc-600"} font-bold`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hot Deals + Sell */}
      <section className="py-24 px-4 bg-zinc-900 border-b-8 border-yellow-400">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">
              HOT <span className="text-red-500">DEALS</span>
            </h2>
            <div className="space-y-4">
              {FEATURED_OFFERS.map((offer) => {
                const Icon = offer.icon;
                return (
                  <Link key={offer.title} href={offer.to} className="block bg-black border-2 border-zinc-800 p-6 hover:border-white transition-colors" data-testid={`offer-${offer.to}`}>
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <Icon className="w-8 h-8 text-yellow-400 shrink-0" />
                        <div>
                          <h4 className="text-xl md:text-2xl font-black uppercase">{offer.title}</h4>
                          <div className="text-red-500 font-black text-lg">{offer.price}</div>
                          <div className="text-zinc-500 font-bold text-xs uppercase">{offer.note}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-red-500 shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">
              WE <span className="text-yellow-400">SELL</span> TOO
            </h2>
            <p className="text-lg font-bold text-zinc-400 mb-8 max-w-md">{BUSINESS.tagline}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {SELL_TILES.map((product, i) => {
                const Icon = product.icon;
                const accent = i % 2 === 0 ? "hover:border-red-500" : "hover:border-yellow-400";
                return (
                  <Link key={product.to} href={product.to} className={`bg-zinc-800 aspect-square flex flex-col items-center justify-center border-4 border-transparent ${accent} transition-colors p-4 text-center`} data-testid={`sell-${product.to}`}>
                    <Icon className="w-12 h-12 text-zinc-500 mb-3" />
                    <span className="font-black uppercase text-sm">{product.name}</span>
                    <span className="font-bold text-zinc-500 text-xs mt-1">{product.desc}</span>
                  </Link>
                );
              })}
            </div>
            <Button asChild className="w-full rounded-none bg-white text-black hover:bg-yellow-400 hover:text-black font-black uppercase tracking-widest text-lg h-14">
              <Link href="/inventory">Browse Inventory</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-24 px-4 bg-black border-b border-zinc-900">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
              GET A <span className="text-red-500">QUOTE</span>
            </h2>
            <p className="text-lg font-bold text-zinc-400 mb-6 max-w-md">
              Tell us what's broken. We'll text or call you back today with a firm quote.
            </p>
            <ul className="space-y-2 text-base font-bold text-zinc-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> Free diagnostic</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> Same-day repair where possible</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> 90-day warranty on every fix</li>
            </ul>
          </div>
          <RepairQuoteForm />
        </div>
      </section>

      {/* Prepaid + Areas */}
      <section className="py-12 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-[1240px] mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Prepaid Activations & Bill Pay</h3>
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {PREPAID_TILES.map((carrier) => (
                <Link key={carrier.label} href={carrier.to} className="bg-zinc-900 border border-zinc-800 px-4 py-2 font-black uppercase text-sm hover:border-red-500 transition-colors" data-testid={`prepaid-${carrier.label}`}>
                  {carrier.label}
                </Link>
              ))}
            </div>
            <Link href="/bill-payments-houston" className="text-red-500 font-black uppercase hover:underline inline-flex items-center gap-1">
              Pay your bill in cash <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {AREA_TILES.map((area) => (
                <Link key={area.label} href={area.to} className="text-zinc-400 font-bold uppercase text-sm border-b-2 border-zinc-800 pb-1 hover:text-red-500 hover:border-red-500 transition-colors px-2" data-testid={`area-${area.label}`}>
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
