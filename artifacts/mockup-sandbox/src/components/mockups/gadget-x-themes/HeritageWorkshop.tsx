import React, { useState } from "react";
import {
  Smartphone, Tablet, Laptop, Gamepad2, Headphones, Phone,
  MessageCircle, MapPin, Clock, Star, ShieldCheck, Zap,
  Wrench, Hammer, Battery, Monitor, Car, CheckCircle2, Menu, X,
  ArrowRight, Wifi, Navigation,
} from "lucide-react";
import {
  BUSINESS, HERO, TRUST_POINTS, SERVICES, WHY_CHOOSE,
  FEATURED_OFFERS, SELL_PRODUCTS, PREPAID_CARRIERS, SERVICE_AREAS,
  FOOTER_LINKS, COPYRIGHT,
} from "./_content";

type IconName =
  | "smartphone" | "tablet" | "laptop" | "gamepad" | "headphones"
  | "wrench" | "phone" | "map" | "star" | "zap" | "shield"
  | "check" | "battery" | "wifi";

type IconComponent = React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;

const ICONS: Record<IconName, IconComponent> = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  gamepad: Gamepad2,
  headphones: Headphones,
  wrench: Wrench,
  phone: Phone,
  map: MapPin,
  star: Star,
  zap: Zap,
  shield: ShieldCheck,
  check: CheckCircle2,
  battery: Battery,
  wifi: Wifi,
};

function getIcon(name: IconName): IconComponent {
  return ICONS[name];
}

export function HeritageWorkshop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#f5f5f4] font-sans pb-16 selection:bg-[#ea580c]/30">

      {/* 1. Top Utility Bar */}
      <div className="bg-[#11100f] border-b border-[#302b28] py-2 px-4 text-xs font-medium tracking-wide text-[#a8a29e] flex flex-col sm:flex-row justify-between items-center gap-2 z-50 relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#ea580c]" /> {BUSINESS.addressFull}</span>
          <span className="hidden md:flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#ea580c]" /> {BUSINESS.hoursShort}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-[#292524] px-2 py-0.5 rounded text-[#f5f5f4] uppercase tracking-wider text-[10px] border border-[#3f3936]">{HERO.badgeSameDay}</span>
          <a href={BUSINESS.phoneTel} className="flex items-center gap-1.5 hover:text-[#ea580c] transition-colors font-semibold text-[#f5f5f4]">
            <Phone className="w-3.5 h-3.5" /> {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-40 bg-[#1c1917]/95 backdrop-blur-md border-b border-[#302b28]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex-shrink-0">
            <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 md:h-12 object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
              <a key={item} href="#" className="text-sm font-medium tracking-wide text-[#d6d3d1] hover:text-[#f5f5f4] transition-colors relative group">
                {item}
                <span className="absolute -bottom-8 left-0 w-full h-[2px] bg-[#ea580c] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={BUSINESS.phoneTel} className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2.5 rounded-sm font-medium transition-colors shadow-lg shadow-[#ea580c]/20">
              Call Now
            </a>
          </div>

          <button className="lg:hidden text-[#f5f5f4]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#1c1917] border-b border-[#302b28] p-4 flex flex-col gap-4 shadow-2xl">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
              <a key={item} href="#" className="text-base font-medium text-[#d6d3d1] py-2 border-b border-[#302b28]/50">{item}</a>
            ))}
            <a href={BUSINESS.phoneTel} className="bg-[#ea580c] text-white text-center py-3 rounded-sm font-medium mt-2">Call Now</a>
          </div>
        )}
      </header>

      {/* 3. Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-[#302b28]">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ea580c]/20 via-[#1c1917]/0 to-transparent blur-3xl rounded-full translate-x-1/3 -translate-y-1/4"></div>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#44403c" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 border border-[#44403c] bg-[#292524]/80 backdrop-blur py-1.5 px-3 rounded-full">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea580c]"></span>
                </span>
                <span className="text-xs font-semibold tracking-wider text-[#d6d3d1] uppercase">{HERO.badgeSameDay}</span>
              </div>
              <div className="inline-flex items-center gap-2 border border-[#44403c] bg-[#292524]/80 backdrop-blur py-1.5 px-3 rounded-full">
                <Star className="w-3 h-3 text-[#ea580c]" fill="#ea580c" />
                <span className="text-xs font-semibold tracking-wider text-[#d6d3d1] uppercase">{HERO.badgeYears}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold leading-tight mb-6">
              {HERO.h1}
            </h1>

            <p className="text-lg md:text-xl text-[#a8a29e] mb-10 max-w-2xl leading-relaxed font-light">
              {HERO.subhead}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {HERO.ctas.map((cta, i) => {
                const Icon = getIcon(cta.icon);
                const base = "flex justify-center items-center gap-2 px-8 py-3.5 rounded-sm font-semibold transition-colors";
                const styles =
                  cta.kind === "primary"
                    ? "bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#1c1917]"
                    : cta.kind === "secondary"
                    ? "bg-[#ea580c] hover:bg-[#c2410c] text-white"
                    : "border border-[#57534e] hover:border-[#ea580c] hover:text-[#ea580c] text-[#d6d3d1]";
                const isExternal = cta.href.startsWith("http");
                return (
                  <a
                    key={i}
                    href={cta.href}
                    {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={`${base} ${styles}`}
                  >
                    <Icon className="w-5 h-5" /> {cta.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 relative" id="quote">
            {/* Inline Quote Form with brushed metal / dark card vibe */}
            <div className="bg-gradient-to-b from-[#292524] to-[#1c1917] border border-[#3f3936] p-8 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ea580c] to-transparent"></div>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-2">Request a Quote</h3>
              <p className="text-[#a8a29e] text-sm mb-6">Tell us your device issue. We'll reply within minutes.</p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Your Name" className="w-full bg-[#11100f] border border-[#3f3936] rounded-sm px-4 py-2.5 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full bg-[#11100f] border border-[#3f3936] rounded-sm px-4 py-2.5 text-[#f5f5f4] focus:outline-none focus:border-[#ea580c] appearance-none">
                    <option>Device Type</option>
                    <option>iPhone / Phone</option>
                    <option>iPad / Tablet</option>
                    <option>MacBook / Laptop</option>
                    <option>Gaming Console</option>
                  </select>
                  <input type="tel" placeholder="Phone Number" className="w-full bg-[#11100f] border border-[#3f3936] rounded-sm px-4 py-2.5 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#ea580c] transition-all" />
                </div>
                <div>
                  <textarea placeholder="Describe the issue (e.g. cracked screen, battery)" rows={3} className="w-full bg-[#11100f] border border-[#3f3936] rounded-sm px-4 py-2.5 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#ea580c] transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white py-3 rounded-sm font-semibold transition-colors flex justify-center items-center gap-2">
                  Send Request <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip */}
      <section className="border-b border-[#302b28] bg-[#11100f]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-[#a8a29e] text-sm font-semibold uppercase tracking-wider">
            {TRUST_POINTS.map((point, i) => {
              const Icon = getIcon(point.icon);
              return (
                <React.Fragment key={i}>
                  {i > 0 && <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#44403c]"></span>}
                  <span className="flex items-center gap-2"><Icon className="w-4 h-4 text-[#ea580c]" /> {point.label}</span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Service Grid */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-semibold tracking-wider text-[#ea580c] uppercase mb-3">Our Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold">Comprehensive Repair Services</h3>
            </div>
            <p className="text-[#a8a29e] max-w-xs md:text-right">Precision diagnostics and master-level repairs for every device in your digital life.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <a key={i} href="#" className="group flex flex-col p-6 bg-[#24211f] border border-[#3f3936] hover:border-[#ea580c]/50 hover:bg-[#292524] transition-all rounded-sm relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <Icon className="w-32 h-32" />
                  </div>
                  <Icon className="w-8 h-8 text-[#ea580c] mb-4" strokeWidth={1.5} />
                  <h4 className="font-['Playfair_Display'] text-xl font-semibold mb-2 text-[#f5f5f4]">{service.name}</h4>
                  <p className="text-sm text-[#a8a29e] mb-6 flex-grow">{service.desc}</p>
                  <span className="text-[#ea580c] text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Gadget X */}
      <section className="py-20 lg:py-28 bg-[#11100f] border-y border-[#302b28]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 border-t-2 border-l-2 border-[#ea580c]"></div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 border-b-2 border-r-2 border-[#ea580c]"></div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold leading-tight mb-6">
                {BUSINESS.yearsInBusiness} Years of <br/><span className="text-[#ea580c] italic">Mastery</span>.
              </h2>
              <p className="text-lg text-[#a8a29e] mb-8 font-light">
                We don't just swap parts; we understand the engineering behind your devices. Our longevity in Houston is a testament to our dedication to quality, honesty, and speed.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-['Playfair_Display'] text-[#f5f5f4] mb-1">{BUSINESS.yearsInBusiness}<span className="text-[#ea580c]">+</span></div>
                  <div className="text-xs tracking-wider text-[#78716c] uppercase">Years Active</div>
                </div>
                <div>
                  <div className="text-4xl font-['Playfair_Display'] text-[#f5f5f4] mb-1">50<span className="text-[#ea580c]">k</span></div>
                  <div className="text-xs tracking-wider text-[#78716c] uppercase">Devices Fixed</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              {WHY_CHOOSE.map((feature, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div key={i} className="relative pl-6 border-l border-[#3f3936] hover:border-[#ea580c] transition-colors pb-4">
                    <div className="absolute -left-[17px] top-0 text-sm font-mono text-[#ea580c] bg-[#11100f] py-1">{num}</div>
                    <h4 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-[#a8a29e]">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Offers */}
      <section className="py-20 border-b border-[#302b28]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-['Playfair_Display'] font-bold">Featured Repair Offers</h3>
            <div className="w-16 h-0.5 bg-[#ea580c] mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {FEATURED_OFFERS.map((offer, i) => {
              const Icon = getIcon(offer.icon);
              return (
                <div key={i} className="bg-gradient-to-br from-[#24211f] to-[#1c1917] border border-[#3f3936] p-8 text-center flex flex-col items-center group hover:border-[#78716c] transition-colors rounded-sm">
                  <span className="text-[10px] tracking-widest uppercase text-[#ea580c] mb-4">{offer.note}</span>
                  <Icon className="w-10 h-10 text-[#d6d3d1] mb-6 group-hover:text-[#f5f5f4] transition-colors" strokeWidth={1} />
                  <h4 className="text-xl font-semibold font-['Playfair_Display'] mb-2">{offer.title}</h4>
                  <div className="text-2xl font-light text-[#a8a29e] mb-8">{offer.price}</div>
                  <a href="#quote" className="mt-auto px-6 py-2 border border-[#57534e] text-[#d6d3d1] hover:bg-[#f5f5f4] hover:text-[#1c1917] transition-colors rounded-sm text-sm font-semibold w-full">
                    Claim Offer
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. We Sell Too & 9. Prepaid Plans */}
      <section className="py-20 border-b border-[#302b28] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzZjM5MzYiLz48L3N2Zz4=')]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 bg-[#1c1917]/95 backdrop-blur-sm border border-[#302b28] p-8 md:p-12 rounded-sm shadow-2xl">

            {/* We Sell Too */}
            <div>
              <h2 className="text-xs font-semibold tracking-wider text-[#ea580c] uppercase mb-3">Retail</h2>
              <h3 className="text-3xl font-['Playfair_Display'] font-bold mb-4">We Sell Devices Too</h3>
              <p className="text-[#a8a29e] mb-8 max-w-md">Looking for an upgrade? We carry a premium selection of unlocked phones, iPads, MacBooks, laptops, and gaming consoles at competitive prices.</p>

              <div className="flex flex-wrap gap-3 mb-8">
                {SELL_PRODUCTS.map((product, i) => {
                  const Icon = getIcon(product.icon);
                  return (
                    <div key={i} className="flex items-center gap-2 bg-[#24211f] border border-[#3f3936] px-4 py-2 rounded-sm text-sm text-[#d6d3d1]">
                      <Icon className="w-4 h-4 text-[#ea580c]" /> {product.name}
                    </div>
                  );
                })}
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-[#ea580c] font-semibold hover:text-[#c2410c] transition-colors border-b border-[#ea580c] pb-0.5">
                Browse inventory <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Prepaid Plans */}
            <div className="lg:border-l lg:border-[#302b28] lg:pl-12 flex flex-col justify-center">
              <h2 className="text-xs font-semibold tracking-wider text-[#ea580c] uppercase mb-3">Connectivity</h2>
              <h3 className="text-3xl font-['Playfair_Display'] font-bold mb-4">Prepaid Plans & Activation</h3>
              <p className="text-[#a8a29e] mb-8 max-w-md">Get connected instantly. We activate lines and sell refills for major prepaid carriers.</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {PREPAID_CARRIERS.map((carrier, i) => (
                  <div key={i} className="bg-[#11100f] border border-[#302b28] text-[#a8a29e] text-center py-3 text-sm font-medium rounded-sm">
                    {carrier}
                  </div>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-[#f5f5f4] font-semibold hover:text-[#d6d3d1] transition-colors border-b border-[#f5f5f4] pb-0.5 self-start">
                See plans & pricing <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Service Areas & 11. Location */}
      <section className="py-20 lg:py-28 relative bg-[#11100f]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info Col */}
            <div>
              <h3 className="text-4xl font-['Playfair_Display'] font-bold mb-6">Visit Our Workshop</h3>
              <p className="text-[#a8a29e] mb-8 text-lg font-light max-w-md">Located conveniently on Almeda Rd. Drop by for a walk-in repair or consultation.</p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-[#24211f] p-3 rounded-full border border-[#3f3936]">
                    <MapPin className="w-5 h-5 text-[#ea580c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#f5f5f4]">{BUSINESS.name}</h4>
                    <p className="text-[#a8a29e] mt-1">{BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#24211f] p-3 rounded-full border border-[#3f3936]">
                    <Clock className="w-5 h-5 text-[#ea580c]" />
                  </div>
                  <table className="text-[#a8a29e] w-full max-w-[260px]">
                    <tbody>
                      {BUSINESS.hours.map((h) => (
                        <tr key={h.day}>
                          <td className="py-1 text-[#f5f5f4] font-medium">{h.day}</td>
                          <td className="py-1 text-right">{h.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={BUSINESS.phoneTel} className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-sm font-semibold transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a href={BUSINESS.sms} className="bg-[#24211f] hover:bg-[#292524] border border-[#3f3936] text-[#f5f5f4] px-5 py-2.5 rounded-sm font-semibold transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Text
                </a>
                <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-2.5 rounded-sm font-semibold transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="bg-[#24211f] hover:bg-[#292524] border border-[#3f3936] text-[#f5f5f4] px-5 py-2.5 rounded-sm font-semibold transition-colors flex items-center gap-2">
                  <Car className="w-4 h-4" /> Directions
                </a>
              </div>

              {/* Service Areas */}
              <div className="mt-12 pt-8 border-t border-[#302b28]">
                <h4 className="text-sm font-semibold text-[#d6d3d1] mb-4 uppercase tracking-wider">Serving Greater Houston</h4>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS.map((area, i) => (
                    <span key={i} className="text-xs text-[#a8a29e] border border-[#3f3936] bg-[#1c1917] px-3 py-1.5 rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Card — real Google Maps embed inside theme frame */}
            <div className="relative bg-[#1c1917] border border-[#3f3936] rounded-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ea580c] to-transparent z-10"></div>
              <iframe
                src={BUSINESS.mapsEmbed}
                width="100%"
                height={380}
                loading="lazy"
                title="Gadget X Repairs location map"
                className="block w-full grayscale-[20%] contrast-110"
                style={{ border: 0 }}
              />
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 bg-[#11100f]/95 backdrop-blur border border-[#3f3936] px-4 py-3 rounded-sm shadow-2xl">
                <div>
                  <div className="font-bold text-[#f5f5f4] text-sm">{BUSINESS.name}</div>
                  <div className="text-xs text-[#a8a29e]">{BUSINESS.addressLine1}</div>
                </div>
                <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="bg-[#f5f5f4] text-[#1c1917] px-4 py-2 rounded-sm font-semibold hover:bg-[#e7e5e4] transition-colors text-xs flex items-center gap-2 whitespace-nowrap">
                  <Navigation className="w-3.5 h-3.5" /> Open in Maps
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-[#0a0909] pt-16 pb-24 md:pb-8 border-t border-[#302b28]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-8 object-contain mb-6 opacity-90" />
              <p className="text-[#78716c] text-sm max-w-sm mb-6 leading-relaxed">
                {BUSINESS.tagline}
              </p>
              <ul className="space-y-2 text-sm text-[#78716c] mb-6">
                <li><a href={BUSINESS.phoneTel} className="hover:text-[#ea580c] transition-colors">{BUSINESS.phoneDisplay}</a></li>
                <li><a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#ea580c] transition-colors">WhatsApp</a></li>
                <li className="text-[#57534e]">{BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}</li>
                <li className="text-[#57534e]">{BUSINESS.hoursShort}</li>
              </ul>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full bg-[#1c1917] border border-[#302b28] flex items-center justify-center text-[#78716c] hover:text-[#ea580c] hover:border-[#ea580c] transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1c1917] border border-[#302b28] flex items-center justify-center text-[#78716c] hover:text-[#ea580c] hover:border-[#ea580c] transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#f5f5f4] mb-4">Repair</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.repair.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-[#78716c] hover:text-[#ea580c] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#f5f5f4] mb-4">Shop</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-[#78716c] hover:text-[#ea580c] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#f5f5f4] mb-4">Prepaid</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.prepaid.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-[#78716c] hover:text-[#ea580c] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#f5f5f4] mb-4">Company</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-[#78716c] hover:text-[#ea580c] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1c1917] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#57534e]">
            <p>{COPYRIGHT}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#a8a29e]">Privacy Policy</a>
              <a href="#" className="hover:text-[#a8a29e]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. Sticky Mobile-Only Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#11100f]/95 backdrop-blur border-t border-[#302b28] p-2 flex justify-around items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <a href={BUSINESS.phoneTel} className="flex flex-col items-center justify-center p-2 text-[#a8a29e] hover:text-[#f5f5f4] w-1/3">
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Call</span>
        </a>
        <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-2 text-[#ea580c] hover:text-[#c2410c] w-1/3 relative">
          <div className="absolute -top-6 bg-[#ea580c] text-white p-3 rounded-full border-4 border-[#11100f] shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-wider mt-6">WhatsApp</span>
        </a>
        <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-2 text-[#a8a29e] hover:text-[#f5f5f4] w-1/3">
          <MapPin className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Directions</span>
        </a>
      </div>

    </div>
  );
}
