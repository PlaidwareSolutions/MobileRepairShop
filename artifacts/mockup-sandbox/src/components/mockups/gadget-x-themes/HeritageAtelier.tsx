import React, { useState } from "react";
import {
  Smartphone, Tablet, Laptop, Gamepad2, Headphones, Phone,
  MessageCircle, MapPin, Clock, Star, ShieldCheck, Zap,
  Wrench, Battery, Car, CheckCircle2, Menu, X,
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

// Reusable decorative corner bracket
const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#b45309]/50 pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#b45309]/50 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#b45309]/50 pointer-events-none"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#b45309]/50 pointer-events-none"></div>
  </>
);

export function HeritageAtelier() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#f5f5f4] font-sans pb-16 md:pb-0 selection:bg-[#ea580c]/30 relative">
      {/* Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik0wIDRMMCAwTDEgMEwxIDRaTTEgNEwxIDFMMiAxTDIgNFpNMiA0TDIgMkwzIDJMMyA0Wk0zIDRMMyAzTDQgM0w0IDRaIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')" }}></div>

      {/* 1. Top Utility Bar */}
      <div className="bg-[#11100f] border-b border-[#3f3936] py-2 px-4 text-[11px] font-medium tracking-widest text-[#a8a29e] flex flex-col sm:flex-row justify-between items-center gap-2 z-50 relative uppercase">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#b45309]" /> {BUSINESS.addressFull}</span>
          <span className="hidden md:flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#b45309]" /> {BUSINESS.hoursShort}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#ea580c]">{HERO.badgeSameDay}</span>
          <span className="text-[#3f3936]">|</span>
          <a href={BUSINESS.phoneTel} className="flex items-center gap-1.5 hover:text-[#f5f5f4] transition-colors text-[#d6d3d1]">
            <Phone className="w-3.5 h-3.5 text-[#b45309]" /> {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-40 bg-[#1c1917]/95 backdrop-blur-md border-b border-[#3f3936] shadow-sm shadow-black/20">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex-shrink-0 relative group">
            <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 md:h-11 object-contain transition-transform duration-300 group-hover:scale-105" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
              <a key={item} href="#" className="text-sm font-medium tracking-wide text-[#d6d3d1] hover:text-[#f5f5f4] transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b45309] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={BUSINESS.phoneTel} className="relative overflow-hidden group bg-transparent border border-[#b45309] text-[#f5f5f4] px-6 py-2 rounded-none font-medium transition-colors">
              <span className="absolute inset-0 w-full h-full bg-[#b45309] origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Call Now
              </span>
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-[#f5f5f4]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#1c1917] border-b border-[#3f3936] p-4 flex flex-col gap-4 shadow-2xl">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
              <a key={item} href="#" className="text-base font-medium text-[#d6d3d1] py-2 border-b border-[#3f3936]/50">{item}</a>
            ))}
            <a href={BUSINESS.phoneTel} className="bg-[#b45309] text-white text-center py-3 rounded-none font-medium mt-2">Call Now</a>
          </div>
        )}
      </header>

      {/* 3. Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-[#3f3936] z-10 bg-gradient-to-b from-[#1c1917] to-[#24211f]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#ea580c] uppercase">
                <span className="w-8 h-[1px] bg-[#ea580c]"></span>
                {HERO.badgeSameDay}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b45309] uppercase">
                <span className="w-8 h-[1px] bg-[#b45309]"></span>
                {HERO.badgeYears}
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-['Playfair_Display'] font-semibold leading-[1.1] mb-6 tracking-tight">
              {HERO.h1}
            </h1>

            <p className="text-lg md:text-xl text-[#a8a29e] mb-10 max-w-2xl leading-relaxed font-light border-l border-[#b45309]/50 pl-6 py-1 italic">
              {HERO.subhead}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {HERO.ctas.map((cta, i) => {
                const Icon = getIcon(cta.icon);
                const isExternal = cta.href.startsWith("http");
                
                let styles = "";
                if (cta.kind === "primary") {
                  styles = "bg-[#ea580c] text-white hover:bg-[#c2410c] border border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]";
                } else if (cta.kind === "secondary") {
                  styles = "bg-[#1c1917] text-[#f5f5f4] border border-[#b45309] hover:bg-[#b45309] hover:text-white";
                } else {
                  styles = "text-[#d6d3d1] hover:text-[#ea580c] border-b border-transparent hover:border-[#ea580c] rounded-none px-0 py-3.5 w-fit";
                }

                return (
                  <a
                    key={i}
                    href={cta.href}
                    {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={`flex justify-center items-center gap-2 px-8 py-3.5 font-semibold transition-all duration-300 ${styles}`}
                  >
                    <Icon className={`w-5 h-5 ${cta.kind === 'tertiary' ? 'text-[#b45309]' : ''}`} /> {cta.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 relative z-10" id="quote">
            <div className="bg-[#1c1917] p-2 rounded-none border border-[#3f3936] shadow-2xl relative">
              <CornerBrackets />
              <div className="bg-[#24211f] border border-[#3f3936]/50 p-8 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#ea580c]"></div>
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-2 text-center text-[#f5f5f4]">Request a Quote</h3>
                <p className="text-[#a8a29e] text-sm mb-6 text-center italic">Tell us your device issue. We'll reply within minutes.</p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="at-name" className="sr-only">Your Name</label>
                    <input id="at-name" name="name" type="text" placeholder="Your Name" className="w-full bg-[#1c1917] border border-[#3f3936] px-4 py-3 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#b45309] transition-all font-light" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label htmlFor="at-device" className="sr-only">Device Type</label>
                      <select id="at-device" name="device" className="w-full bg-[#1c1917] border border-[#3f3936] px-4 py-3 text-[#f5f5f4] focus:outline-none focus:border-[#b45309] appearance-none font-light">
                        <option>Device Type</option>
                        <option>iPhone / Phone</option>
                        <option>iPad / Tablet</option>
                        <option>MacBook / Laptop</option>
                        <option>Gaming Console</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#78716c]">▼</div>
                    </div>
                    <label htmlFor="at-phone" className="sr-only">Phone Number</label>
                    <input id="at-phone" name="phone" type="tel" placeholder="Phone Number" className="w-full bg-[#1c1917] border border-[#3f3936] px-4 py-3 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#b45309] transition-all font-light" />
                  </div>
                  <div>
                    <label htmlFor="at-issue" className="sr-only">Describe the issue</label>
                    <textarea id="at-issue" name="issue" placeholder="Describe the issue (e.g. cracked screen, battery)" rows={3} className="w-full bg-[#1c1917] border border-[#3f3936] px-4 py-3 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#b45309] transition-all resize-none font-light"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#11100f] border border-[#3f3936] text-[#d6d3d1] hover:text-white hover:border-[#b45309] py-3 font-semibold transition-colors flex justify-center items-center gap-2 group mt-2">
                    Send Request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#b45309]" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip */}
      <section className="border-b border-[#3f3936] bg-[#11100f] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-[#a8a29e] text-xs font-semibold uppercase tracking-widest">
            {TRUST_POINTS.map((point, i) => {
              const Icon = getIcon(point.icon);
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-[#b45309]/30 flex items-center justify-center bg-[#1c1917]">
                    <Icon className="w-3 h-3 text-[#ea580c]" />
                  </div>
                  <span className="text-[#d6d3d1]">{point.label}</span>
                  {i < TRUST_POINTS.length - 1 && <span className="hidden md:inline-block text-[#3f3936] ml-6">/</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Service Grid */}
      <section className="py-20 lg:py-28 relative z-10 bg-[#1c1917]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-semibold tracking-widest text-[#b45309] uppercase mb-4 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#b45309]"></span> Our Expertise
              </h2>
              <h3 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold tracking-tight">Comprehensive Repair Services</h3>
            </div>
            <p className="text-[#a8a29e] max-w-xs md:text-right italic font-serif">Precision diagnostics and master-level repairs for every device in your digital life.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-[#3f3936]">
            {SERVICES.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <a key={i} href="#" className="group flex flex-col p-8 bg-[#1c1917] border-r border-b border-[#3f3936] hover:bg-[#24211f] transition-all relative overflow-hidden -mb-[1px] -mr-[1px]">
                  <div className="w-12 h-12 rounded-full border border-[#b45309]/40 flex items-center justify-center bg-[#11100f] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <Icon className="w-5 h-5 text-[#ea580c]" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-['Playfair_Display'] text-xl font-semibold mb-3 text-[#f5f5f4]">{service.name}</h4>
                  <p className="text-sm text-[#a8a29e] mb-6 flex-grow leading-relaxed">{service.desc}</p>
                  <span className="text-[#b45309] text-xs tracking-widest uppercase font-semibold flex items-center gap-2 group-hover:text-[#ea580c] transition-colors">
                    Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Gadget X (Manifesto) */}
      <section className="py-24 lg:py-32 bg-[#11100f] border-y border-[#3f3936] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <CornerBrackets />
              <div className="p-8 lg:p-10 border border-[#3f3936]/30 bg-[#1c1917]/50">
                <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold leading-tight mb-8">
                  {BUSINESS.yearsInBusiness} Years of <span className="text-[#b45309] italic">Mastery</span>.
                </h2>
                <p className="text-lg text-[#a8a29e] mb-10 font-light leading-relaxed">
                  We don't just swap parts; we understand the engineering behind your devices. Our longevity in Houston is a testament to our dedication to quality, honesty, and speed.
                </p>
                <div className="flex gap-12 border-t border-[#3f3936] pt-8">
                  <div>
                    <div className="text-5xl font-['Playfair_Display'] text-[#f5f5f4] mb-2">{BUSINESS.yearsInBusiness}<span className="text-[#ea580c] text-3xl align-top">+</span></div>
                    <div className="text-xs tracking-widest text-[#78716c] uppercase font-semibold">Years Active</div>
                  </div>
                  <div>
                    <div className="text-5xl font-['Playfair_Display'] text-[#f5f5f4] mb-2">50<span className="text-[#ea580c] text-3xl align-top">k</span></div>
                    <div className="text-xs tracking-widest text-[#78716c] uppercase font-semibold">Devices Fixed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {WHY_CHOOSE.map((feature, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div key={i} className="relative pl-6 border-l border-[#3f3936]">
                    <div className="absolute -left-[17px] top-0 text-xs font-mono text-[#b45309] bg-[#11100f] py-1 border border-[#3f3936] px-1.5">{num}</div>
                    <h4 className="font-['Playfair_Display'] text-xl font-semibold mb-3 text-[#f5f5f4]">{feature.title}</h4>
                    <p className="text-sm text-[#a8a29e] leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Offers */}
      <section className="py-24 border-b border-[#3f3936] bg-[#1c1917] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold tracking-widest text-[#b45309] uppercase mb-4">Pricing</h2>
            <h3 className="text-4xl font-['Playfair_Display'] font-semibold">Featured Repair Offers</h3>
            <div className="w-12 h-[1px] bg-[#ea580c] mx-auto mt-6"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {FEATURED_OFFERS.map((offer, i) => {
              const Icon = getIcon(offer.icon);
              return (
                <div key={i} className="bg-[#24211f] border border-[#3f3936] p-8 text-center flex flex-col items-center group hover:border-[#b45309] transition-colors relative shadow-lg">
                  <CornerBrackets />
                  <span className="text-[9px] font-semibold tracking-widest uppercase text-[#a8a29e] mb-6 block border-b border-[#3f3936] pb-2 w-full">{offer.note}</span>
                  <div className="w-12 h-12 rounded-full border border-[#3f3936] flex items-center justify-center bg-[#1c1917] mb-6 group-hover:border-[#b45309] transition-colors">
                    <Icon className="w-5 h-5 text-[#d6d3d1] group-hover:text-[#ea580c] transition-colors" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-semibold font-['Playfair_Display'] mb-3 leading-snug">{offer.title}</h4>
                  <div className="text-xl font-light text-[#b45309] mb-8">{offer.price}</div>
                  <a href="#quote" className="mt-auto border-b border-[#57534e] text-[#d6d3d1] hover:text-[#ea580c] hover:border-[#ea580c] transition-colors text-xs font-semibold uppercase tracking-widest pb-1 inline-block">
                    Claim Offer
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. We Sell Too & 9. Prepaid Plans */}
      <section className="py-24 border-b border-[#3f3936] bg-[#11100f] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-0 border border-[#3f3936] shadow-2xl relative">
            <CornerBrackets />
            
            {/* We Sell Too */}
            <div className="bg-[#1c1917] p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-[#3f3936]">
              <h2 className="text-xs font-semibold tracking-widest text-[#b45309] uppercase mb-4 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#b45309]"></span> Retail
              </h2>
              <h3 className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold mb-6">We Sell Devices Too</h3>
              <p className="text-[#a8a29e] mb-10 font-light leading-relaxed">Looking for an upgrade? We carry a premium selection of unlocked phones, iPads, MacBooks, laptops, and gaming consoles at competitive prices.</p>

              <ul className="space-y-4 mb-10">
                {SELL_PRODUCTS.map((product, i) => {
                  const Icon = getIcon(product.icon);
                  return (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full border border-[#3f3936] flex items-center justify-center bg-[#24211f]">
                        <Icon className="w-3 h-3 text-[#ea580c]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#f5f5f4]">{product.name}</div>
                        <div className="text-sm text-[#78716c]">{product.desc}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <a href="#" className="inline-flex items-center gap-2 text-[#f5f5f4] hover:text-[#ea580c] transition-colors border border-[#3f3936] hover:border-[#ea580c] px-6 py-3 text-sm font-semibold uppercase tracking-widest">
                Browse inventory <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Prepaid Plans */}
            <div className="bg-[#24211f] p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-xs font-semibold tracking-widest text-[#b45309] uppercase mb-4 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#b45309]"></span> Connectivity
              </h2>
              <h3 className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold mb-6">Prepaid Plans & Activation</h3>
              <p className="text-[#a8a29e] mb-10 font-light leading-relaxed">Get connected instantly. We activate lines and sell refills for major prepaid carriers.</p>

              <div className="grid gap-4 mb-10">
                {PREPAID_CARRIERS.map((carrier, i) => (
                  <div key={i} className="bg-[#1c1917] border border-[#3f3936] px-6 py-4 text-[#d6d3d1] font-medium flex justify-between items-center group hover:border-[#b45309] transition-colors cursor-pointer">
                    <span>{carrier}</span>
                    <Wifi className="w-4 h-4 text-[#78716c] group-hover:text-[#ea580c]" />
                  </div>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-[#f5f5f4] hover:text-[#ea580c] transition-colors border border-[#3f3936] hover:border-[#ea580c] px-6 py-3 text-sm font-semibold uppercase tracking-widest self-start">
                See plans & pricing <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Service Areas & 11. Location */}
      <section className="py-24 lg:py-32 relative bg-[#1c1917] z-10 border-b border-[#3f3936]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Info Col */}
            <div>
              <h3 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-8">Visit Our Workshop</h3>
              <p className="text-[#a8a29e] mb-12 text-lg font-light leading-relaxed">Located conveniently on Almeda Rd. Drop by for a walk-in repair or consultation.</p>

              <div className="space-y-10 mb-12">
                <div className="flex items-start gap-6 border-l border-[#b45309] pl-6">
                  <div className="w-10 h-10 rounded-full border border-[#3f3936] flex items-center justify-center bg-[#24211f] shrink-0">
                    <MapPin className="w-4 h-4 text-[#ea580c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-[#f5f5f4] font-['Playfair_Display'] mb-2">{BUSINESS.name}</h4>
                    <p className="text-[#a8a29e] leading-relaxed">{BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 border-l border-[#b45309] pl-6">
                  <div className="w-10 h-10 rounded-full border border-[#3f3936] flex items-center justify-center bg-[#24211f] shrink-0">
                    <Clock className="w-4 h-4 text-[#ea580c]" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-semibold text-xl text-[#f5f5f4] font-['Playfair_Display'] mb-4">Hours of Operation</h4>
                    <div className="bg-[#24211f] border border-[#3f3936] p-6 text-sm relative">
                      <CornerBrackets />
                      <table className="w-full">
                        <tbody>
                          {BUSINESS.hours.map((h, i) => (
                            <tr key={h.day} className={i !== BUSINESS.hours.length - 1 ? "border-b border-[#3f3936]" : ""}>
                              <td className="py-3 text-[#d6d3d1] font-medium">{h.day}</td>
                              <td className="py-3 text-right text-[#a8a29e] font-mono text-xs">{h.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={BUSINESS.phoneTel} className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3 font-semibold transition-colors flex items-center gap-2 border border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a href={BUSINESS.sms} className="bg-[#11100f] hover:bg-[#24211f] border border-[#3f3936] text-[#f5f5f4] px-6 py-3 font-semibold transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#b45309]" /> Text
                </a>
                <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="bg-[#11100f] hover:bg-[#24211f] border border-[#3f3936] text-[#f5f5f4] px-6 py-3 font-semibold transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#16a34a]" /> WhatsApp
                </a>
                <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="bg-[#1c1917] hover:bg-[#24211f] border border-[#b45309] text-[#f5f5f4] px-6 py-3 font-semibold transition-colors flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#b45309]" /> Directions
                </a>
              </div>

              {/* Service Areas */}
              <div className="mt-16">
                <h4 className="text-xs font-semibold text-[#b45309] mb-4 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-[#b45309]"></span> Serving Greater Houston
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS.map((area, i) => (
                    <span key={i} className="text-xs text-[#a8a29e] border border-[#3f3936] bg-[#24211f] px-4 py-2 uppercase tracking-wider font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="relative bg-[#1c1917] border border-[#3f3936] p-2 shadow-2xl h-[500px] lg:h-auto">
              <CornerBrackets />
              <div className="w-full h-full border border-[#3f3936]/50 bg-[#24211f]">
                <iframe
                  src={BUSINESS.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) contrast(1.2) sepia(1.1) opacity(0.8)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-[#11100f] pt-20 pb-10 border-t border-[#b45309]/20 relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 lg:col-span-2 pr-8">
              <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 mb-6 opacity-90" />
              <p className="text-[#78716c] text-sm leading-relaxed max-w-sm mb-6 font-light">
                {BUSINESS.tagline}
              </p>
              <div className="flex items-center gap-4 text-[#78716c]">
                <a href="#" className="hover:text-[#ea580c] transition-colors"><Star className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#ea580c] transition-colors"><Star className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#ea580c] transition-colors"><Star className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#f5f5f4] font-semibold mb-6 uppercase tracking-widest text-xs font-['Playfair_Display']">Repair</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.repair.map((link) => (
                  <li key={link}><a href="#" className="text-[#78716c] hover:text-[#ea580c] text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f5f5f4] font-semibold mb-6 uppercase tracking-widest text-xs font-['Playfair_Display']">Shop & Prepaid</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link}><a href="#" className="text-[#78716c] hover:text-[#ea580c] text-sm transition-colors">{link}</a></li>
                ))}
                <li className="pt-2"><div className="w-4 h-[1px] bg-[#3f3936]"></div></li>
                {FOOTER_LINKS.prepaid.map((link) => (
                  <li key={link}><a href="#" className="text-[#78716c] hover:text-[#ea580c] text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f5f5f4] font-semibold mb-6 uppercase tracking-widest text-xs font-['Playfair_Display']">Company</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link}><a href="#" className="text-[#78716c] hover:text-[#ea580c] text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#3f3936] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#78716c]">
            <p>{COPYRIGHT}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#d6d3d1] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d6d3d1] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. Sticky Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1c1917]/95 backdrop-blur-md border-t border-[#3f3936] p-3 z-50 flex gap-2">
        <a href={BUSINESS.phoneTel} className="flex-1 bg-[#ea580c] text-white py-3 rounded-none text-center font-semibold text-sm shadow-lg flex justify-center items-center gap-2">
          <Phone className="w-4 h-4" /> Call
        </a>
        <a href={BUSINESS.sms} className="flex-1 bg-[#24211f] border border-[#3f3936] text-[#f5f5f4] py-3 rounded-none text-center font-semibold text-sm flex justify-center items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#b45309]" /> Text
        </a>
        <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#24211f] border border-[#3f3936] text-[#f5f5f4] py-3 rounded-none text-center font-semibold text-sm flex justify-center items-center gap-2">
          <MapPin className="w-4 h-4 text-[#b45309]" /> Map
        </a>
      </div>
    </div>
  );
}
