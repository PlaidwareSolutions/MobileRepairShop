import {
  MapPin,
  Clock,
  Phone,
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
  MessageCircle,
  CheckCircle2,
  Battery,
  Wifi,
  Navigation,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BUSINESS,
  HERO,
  TRUST_POINTS,
  SERVICES,
  WHY_CHOOSE,
  FEATURED_OFFERS,
  SELL_PRODUCTS,
  PREPAID_CARRIERS,
  SERVICE_AREAS,
  FOOTER_LINKS,
  COPYRIGHT,
} from "@/content";

type IconKey =
  | "smartphone"
  | "tablet"
  | "laptop"
  | "gamepad"
  | "headphones"
  | "wrench"
  | "phone"
  | "map"
  | "star"
  | "zap"
  | "shield"
  | "check"
  | "battery"
  | "wifi";

const ICON_MAP: Record<IconKey, LucideIcon> = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  gamepad: Gamepad2,
  headphones: Headphones,
  wrench: Wrench,
  phone: Phone,
  map: Navigation,
  star: Star,
  zap: Zap,
  shield: ShieldCheck,
  check: CheckCircle2,
  battery: Battery,
  wifi: Wifi,
};

function getIcon(key: string): LucideIcon {
  return ICON_MAP[key as IconKey] ?? Wrench;
}

export default function HomePage() {
  const [ctaCall, ctaQuote, ctaDirections] = HERO.ctas;

  return (
    <div data-theme="bold-urban-store" className="min-h-screen bg-black text-white font-sans selection:bg-red-500 selection:text-white pb-20 md:pb-0">
      {/* 1. Top utility bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 text-xs font-mono py-2 px-4 flex justify-between items-center tracking-tight text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1">
            <MapPin className="w-3 h-3 text-red-500" />
            {BUSINESS.addressFull}
          </span>
          <span className="hidden md:inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-red-500" />
            {BUSINESS.hoursShort}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-red-500 text-white px-2 py-0.5 uppercase font-bold text-[10px] tracking-wider transform -skew-x-12">
            {HERO.badgeSameDay}
          </span>
          <a
            href={BUSINESS.phoneTel}
            className="hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-4 border-red-500">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2" aria-label={`${BUSINESS.name} home`}>
            <img
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              className="h-10 md:h-12 object-contain"
              width={120}
              height={48}
            />
          </a>
          <nav className="hidden lg:flex items-center gap-8 font-black uppercase tracking-tighter text-sm" aria-label="Primary">
            <a href="#repair" className="hover:text-red-500 transition-colors">
              Repair
            </a>
            <a href="#sell" className="hover:text-red-500 transition-colors">
              Sell
            </a>
            <a href="#sell" className="hover:text-red-500 transition-colors">
              Accessories
            </a>
            <a href="#prepaid" className="hover:text-red-500 transition-colors">
              Prepaid
            </a>
            <a href="#location" className="hover:text-red-500 transition-colors">
              Locations
            </a>
            <a href="#location" className="hover:text-red-500 transition-colors">
              Contact
            </a>
          </nav>
          <Button
            asChild
            className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-sm px-6 h-12"
          >
            <a href={BUSINESS.phoneTel}>Call Now</a>
          </Button>
        </div>
      </header>

      {/* Ticker Tape */}
      <div className="w-full overflow-hidden bg-yellow-400 py-2 border-y-2 border-black flex items-center" aria-hidden="true">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap font-black uppercase text-black text-xl tracking-tighter flex gap-8">
          <span>SAME-DAY REPAIR</span>
          <span>•</span>
          <span>15 YEARS EXPERIENCE</span>
          <span>•</span>
          <span>HOUSTON'S BEST</span>
          <span>•</span>
          <span>CALL NOW</span>
          <span>•</span>
          <span>SAME-DAY REPAIR</span>
          <span>•</span>
          <span>15 YEARS EXPERIENCE</span>
          <span>•</span>
          <span>HOUSTON'S BEST</span>
          <span>•</span>
          <span>CALL NOW</span>
        </div>
      </div>

      {/* 3. Hero */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4 border-b border-zinc-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
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
            <p className="text-xl md:text-2xl font-bold text-zinc-400 max-w-lg">
              {HERO.subhead}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-16 px-8 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]"
              >
                <a href={ctaCall.href}>{ctaCall.label}</a>
              </Button>
              <Button
                asChild
                className="rounded-none bg-yellow-400 hover:bg-white text-black font-black uppercase tracking-widest text-lg h-16 px-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]"
              >
                <a href={ctaQuote.href} target="_blank" rel="noreferrer">{ctaQuote.label}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-4 border-white bg-transparent hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-16 px-8"
              >
                <a href={ctaDirections.href} target="_blank" rel="noreferrer">
                  {ctaDirections.label}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative h-[500px] w-full hidden md:block" aria-hidden="true">
            {/* Abstract device pattern composition */}
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

      {/* 4. Trust Strip */}
      <div className="bg-white border-y-8 border-red-500 py-6">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-12 font-black uppercase tracking-tighter text-black text-lg md:text-2xl text-center">
          {TRUST_POINTS.map((point, i) => {
            const Icon = getIcon(point.icon);
            return (
              <div key={i} className="flex items-center gap-2">
                <Icon className="w-7 h-7 text-red-500" /> {point.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Service Grid */}
      <section id="repair" className="py-24 px-4 bg-zinc-950 relative scroll-mt-20">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              WHAT WE <br/><span className="text-yellow-400 text-stroke-black">REPAIR</span>
            </h2>
            <div className="bg-red-500 p-4 transform rotate-2 max-w-sm">
              <p className="font-bold text-white uppercase text-sm leading-tight">
                No matter how badly you broke it, bring it in. We've seen worse.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <a href={BUSINESS.phoneTel} key={i} className="group block relative bg-black border-4 border-zinc-800 p-6 hover:border-red-500 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-6 h-6 text-red-500" />
                  </div>
                  <Icon className="w-12 h-12 mb-6 text-white group-hover:text-yellow-400 transition-colors" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{s.name}</h3>
                  <p className="text-sm font-bold text-zinc-500 mb-6">{s.desc}</p>
                  <div className="text-red-500 font-black uppercase text-sm group-hover:underline">
                    Call for quote
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-24 px-4 bg-red-500 text-black">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-7xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.8] mb-8">
              WHY <br/><span className="text-white">GADGET X</span>
            </h2>
            <div className="text-2xl font-bold uppercase border-l-8 border-black pl-6 py-2">
              "We don't just fix devices. We bring them back from the dead."
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = getIcon(item.icon);
              const isDark = i % 2 === 0;
              const stagger = i === 1 || i === 3 ? "mt-0 sm:mt-12" : "";
              return (
                <div
                  key={i}
                  className={`${isDark ? "bg-black text-white" : "bg-white text-black"} p-8 transform hover:-translate-y-2 transition-transform ${stagger}`}
                >
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

      {/* 7. Featured Offers & 8. We Sell Too */}
      <section id="sell" className="py-24 px-4 bg-zinc-900 border-b-8 border-yellow-400 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Featured Offers */}
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">
                HOT <span className="text-red-500">DEALS</span>
              </h2>
              <div className="space-y-4">
                {FEATURED_OFFERS.map((offer, i) => {
                  const Icon = getIcon(offer.icon);
                  return (
                    <div key={i} className="bg-black border-2 border-zinc-800 p-6 flex justify-between items-center group hover:border-white transition-colors">
                      <div className="flex items-center gap-4">
                        <Icon className="w-8 h-8 text-yellow-400 shrink-0" />
                        <div>
                          <h4 className="text-xl md:text-2xl font-black uppercase">{offer.title}</h4>
                          <div className="text-red-500 font-black text-lg">{offer.price}</div>
                          <div className="text-zinc-500 font-bold text-xs uppercase">{offer.note}</div>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="rounded-none font-black uppercase text-xs sm:text-sm border-2">
                        <a href={BUSINESS.phoneTel}>Claim</a>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* We Sell Too */}
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">
                WE <span className="text-yellow-400">SELL</span> TOO
              </h2>
              <p className="text-lg font-bold text-zinc-400 mb-8 max-w-md">
                {BUSINESS.tagline}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {SELL_PRODUCTS.map((product, i) => {
                  const Icon = getIcon(product.icon);
                  const accent = i % 2 === 0 ? "hover:border-red-500" : "hover:border-yellow-400";
                  return (
                    <div key={i} className={`bg-zinc-800 aspect-square flex flex-col items-center justify-center border-4 border-transparent ${accent} transition-colors p-4 text-center`}>
                      <Icon className="w-12 h-12 text-zinc-500 mb-3" />
                      <span className="font-black uppercase text-sm">{product.name}</span>
                      <span className="font-bold text-zinc-500 text-xs mt-1">{product.desc}</span>
                    </div>
                  );
                })}
              </div>
              <Button asChild className="w-full rounded-none bg-white text-black hover:bg-yellow-400 hover:text-black font-black uppercase tracking-widest text-lg h-14">
                <a href={BUSINESS.phoneTel}>Call to Browse Inventory</a>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Prepaid Plans & 10. Service Areas */}
      <section id="prepaid" className="py-12 bg-black border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Prepaid Activations</h3>
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {PREPAID_CARRIERS.map(carrier => (
                <span key={carrier} className="bg-zinc-900 border border-zinc-800 px-4 py-2 font-black uppercase text-sm">
                  {carrier}
                </span>
              ))}
            </div>
            <a href={BUSINESS.phoneTel} className="text-red-500 font-black uppercase hover:underline inline-flex items-center gap-1">
              Call about plans <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map(area => (
                <span key={area} className="text-zinc-400 font-bold uppercase text-sm border-b-2 border-zinc-800 pb-1">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Location / Visit Us */}
      <section id="location" className="py-24 px-4 bg-zinc-950 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white">
              COME <br/><span className="text-red-500">THROUGH</span>
            </h2>

            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2">Location</h4>
                <p className="text-2xl font-black uppercase text-white">
                  {BUSINESS.addressLine1}<br/>
                  {BUSINESS.addressLine2}
                </p>
              </div>

              <div>
                <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2">Store Hours</h4>
                <div className="space-y-2 max-w-xs font-bold text-lg">
                  {BUSINESS.hours.map((h) => (
                    <div key={h.day} className="flex justify-between border-b border-zinc-800 pb-2">
                      <span className="uppercase">{h.day}</span>
                      <span className="text-yellow-400">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2">Contact</h4>
                <div className="space-y-2 font-bold text-lg">
                  <a href={BUSINESS.phoneTel} className="flex items-center gap-2 text-white hover:text-red-500">
                    <Phone className="w-5 h-5 text-red-500" /> {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-14 px-8">
                <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">
                  Get Directions
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-14 px-6">
                <a href={BUSINESS.phoneTel}>Call</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-14 px-6">
                <a href={BUSINESS.sms}>Text</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-14 px-6">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="relative border-8 border-white bg-zinc-900 overflow-hidden shadow-[12px_12px_0px_0px_rgba(239,68,68,1)]">
            <iframe
              src={BUSINESS.mapsEmbed}
              width="100%"
              height={400}
              loading="lazy"
              title={`${BUSINESS.name} location map`}
              className="block w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-black pt-16 pb-32 md:pb-16 border-t border-zinc-900">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-zinc-400 font-bold">
          <div>
            <img
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              className="h-10 object-contain mb-6 grayscale opacity-50"
              width={120}
              height={40}
            />
            <p className="text-sm mb-6">
              {BUSINESS.tagline}
            </p>
            <div className="text-xl text-white font-black uppercase tracking-widest">
              {BUSINESS.yearsInBusiness} Years Strong.
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm uppercase">
              <li><a href={BUSINESS.phoneTel} className="hover:text-red-500 flex items-center gap-2"><Phone className="w-4 h-4"/> {BUSINESS.phoneDisplay}</a></li>
              <li><a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-red-500 flex items-center gap-2"><MessageCircle className="w-4 h-4"/> WhatsApp Us</a></li>
              <li><a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="hover:text-red-500 flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0"/><span>{BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">Hours</h4>
            <ul className="space-y-2 text-sm uppercase">
              {BUSINESS.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span> <span className="text-zinc-500">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">Repair</h4>
            <ul className="space-y-2 text-sm uppercase">
              {FOOTER_LINKS.repair.map((link) => (
                <li key={link}><a href="#repair" className="hover:text-red-500">{link}</a></li>
              ))}
            </ul>
            <h4 className="text-white font-black uppercase tracking-widest mt-6 mb-6">Shop</h4>
            <ul className="space-y-2 text-sm uppercase">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link}><a href="#sell" className="hover:text-red-500">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto px-4 mt-16 pt-8 border-t border-zinc-900 text-center text-sm font-bold text-zinc-600 uppercase">
          {COPYRIGHT}
        </div>
      </footer>

      {/* 13. Sticky mobile-only bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t-4 border-red-500 z-50 p-2">
        <div className="max-w-[1240px] mx-auto grid grid-cols-3 gap-2">
          <Button asChild className="rounded-none bg-zinc-900 hover:bg-white text-white hover:text-black font-black uppercase text-xs md:text-sm h-12">
            <a href={BUSINESS.phoneTel}>
              <Phone className="w-4 h-4 mr-2" /> Call
            </a>
          </Button>
          <Button asChild className="rounded-none bg-green-600 hover:bg-green-500 text-white font-black uppercase text-xs md:text-sm h-12">
            <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </a>
          </Button>
          <Button asChild className="rounded-none bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs md:text-sm h-12">
            <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">
              <MapPin className="w-4 h-4 mr-2" /> Directions
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
