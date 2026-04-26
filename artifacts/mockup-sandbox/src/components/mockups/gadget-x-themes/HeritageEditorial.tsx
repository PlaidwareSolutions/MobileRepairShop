import React, { useState } from "react";
import {
  Smartphone, Tablet, Laptop, Gamepad2, Headphones, Phone,
  MessageCircle, MapPin, Clock, Star, ShieldCheck, Zap,
  Wrench, Battery, CheckCircle2, Menu, X,
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

export function HeritageEditorial() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#11100f] text-[#f5f5f4] font-sans pb-16 md:pb-0 selection:bg-[#ea580c]/30 selection:text-white">
      
      {/* 1. Top Utility Bar */}
      <div className="bg-[#11100f] border-b border-[#292524] py-2 px-4 text-[11px] font-medium tracking-widest uppercase text-[#a8a29e] flex flex-col sm:flex-row justify-between items-center gap-2 z-50 relative">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#ea580c] rounded-full"></span>
            {BUSINESS.addressFull}
          </span>
          <span className="hidden md:flex items-center gap-2">
            <span className="w-1 h-1 bg-[#ea580c] rounded-full"></span>
            {BUSINESS.hoursShort}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#d6d3d1] border-b border-[#ea580c]/30 pb-[1px]">{HERO.badgeSameDay}</span>
          <a href={BUSINESS.phoneTel} className="flex items-center gap-2 hover:text-[#ea580c] transition-colors text-[#f5f5f4]">
            <Phone className="w-3 h-3" /> {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-40 bg-[#1c1917]/95 backdrop-blur-md border-b border-[#292524]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <a href="#" className="flex-shrink-0 relative group">
            <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-12 object-contain relative z-10" />
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
              <a key={item} href="#" className="text-xs font-semibold tracking-widest uppercase text-[#d6d3d1] hover:text-[#f5f5f4] transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ea580c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href={BUSINESS.phoneTel} className="relative group overflow-hidden border border-[#57534e] text-[#f5f5f4] px-8 py-3 rounded-none text-xs font-semibold uppercase tracking-widest transition-colors hover:border-[#ea580c]">
              <span className="relative z-10">Call Now</span>
              <div className="absolute inset-0 bg-[#ea580c] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-[#f5f5f4] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-24 left-0 w-full bg-[#11100f] border-b border-[#292524] p-6 flex flex-col shadow-2xl">
            <nav className="flex flex-col gap-0 divide-y divide-[#292524]">
              {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
                <a key={item} href="#" className="text-sm font-semibold tracking-widest uppercase text-[#d6d3d1] py-4 hover:text-[#ea580c] transition-colors">{item}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 3. Hero (Charcoal) */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-40 bg-[#1c1917] border-b border-[#292524]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] w-8 bg-[#ea580c]"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ea580c]">{HERO.badgeYears}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-['Playfair_Display'] font-normal leading-[1.1] tracking-tight mb-8 text-[#fafaf9]">
              {HERO.h1}
            </h1>

            <p className="text-lg md:text-xl text-[#a8a29e] mb-12 max-w-xl leading-relaxed font-light">
              {HERO.subhead}
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              {HERO.ctas.map((cta, i) => {
                const Icon = getIcon(cta.icon);
                const isPrimary = cta.kind === "primary";
                const isSecondary = cta.kind === "secondary";
                const isExternal = cta.href.startsWith("http");
                
                return (
                  <a
                    key={i}
                    href={cta.href}
                    {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={`
                      group flex justify-center items-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-300
                      ${isPrimary ? 'bg-[#fafaf9] text-[#1c1917] hover:bg-[#e7e5e4]' : 
                        isSecondary ? 'bg-[#ea580c] text-white hover:bg-[#c2410c]' : 
                        'border border-[#57534e] text-[#d6d3d1] hover:border-[#fafaf9] hover:text-[#fafaf9]'}
                    `}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {cta.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 relative z-10" id="quote">
            <div className="bg-[#11100f] border border-[#292524] p-10 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ea580c]"></div>
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-['Playfair_Display'] text-3xl font-medium tracking-tight">Repair Quote</h3>
                <span className="font-mono text-xs text-[#78716c]">01</span>
              </div>
              
              <p className="text-[#a8a29e] text-sm mb-8 font-light italic">Tell us your device issue. We'll reply within minutes with an honest assessment.</p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="relative group">
                  <label htmlFor="ed-name" className="sr-only">Your Name</label>
                  <input id="ed-name" name="name" type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-[#3f3936] rounded-none px-0 py-3 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#ea580c] transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="ed-device" className="sr-only">Device Type</label>
                    <select id="ed-device" name="device" className="w-full bg-transparent border-b border-[#3f3936] rounded-none px-0 py-3 text-[#f5f5f4] focus:outline-none focus:border-[#ea580c] appearance-none transition-colors">
                      <option className="bg-[#11100f]">Device Type</option>
                      <option className="bg-[#11100f]">iPhone / Phone</option>
                      <option className="bg-[#11100f]">iPad / Tablet</option>
                      <option className="bg-[#11100f]">MacBook / Laptop</option>
                      <option className="bg-[#11100f]">Gaming Console</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label htmlFor="ed-phone" className="sr-only">Phone Number</label>
                    <input id="ed-phone" name="phone" type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-[#3f3936] rounded-none px-0 py-3 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#ea580c] transition-colors" />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="ed-issue" className="sr-only">Describe the issue</label>
                  <textarea id="ed-issue" name="issue" placeholder="Describe the issue (e.g. cracked screen, battery)" rows={2} className="w-full bg-transparent border-b border-[#3f3936] rounded-none px-0 py-3 text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#ea580c] transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-transparent border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white py-4 text-xs font-semibold uppercase tracking-widest transition-colors flex justify-center items-center gap-2 mt-4">
                  Request Assessment <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip (Charcoal) */}
      <section className="bg-[#11100f] border-b border-[#292524] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center md:justify-between items-center gap-8 text-[#a8a29e] text-xs font-semibold uppercase tracking-[0.15em]">
          {TRUST_POINTS.map((point, i) => {
            const Icon = getIcon(point.icon);
            return (
              <div key={i} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-[#78716c]" strokeWidth={1.5} /> 
                <span className="pt-[2px]">{point.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Service Grid (Cream Page) */}
      <section className="py-24 lg:py-32 bg-[#fafaf9] text-[#1c1917] border-b border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ea580c]">02 / Expertise</span>
              <div className="h-[1px] w-12 bg-[#d6d3d1]"></div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-normal tracking-tight max-w-2xl">
                Comprehensive <span className="italic text-[#78716c]">Repair</span> Services
              </h2>
              <p className="text-[#57534e] max-w-sm md:text-right font-light leading-relaxed">
                Precision diagnostics and master-level repairs for every device in your digital life.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#e7e5e4] mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {SERVICES.map((service, i) => {
              const Icon = getIcon(service.icon);
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={i} className="group relative flex flex-col items-start cursor-pointer">
                  <div className="flex items-start justify-between w-full mb-6">
                    <div className="w-12 h-12 rounded-full border border-[#d6d3d1] flex items-center justify-center bg-white group-hover:border-[#ea580c] transition-colors">
                      <Icon className="w-5 h-5 text-[#1c1917] group-hover:text-[#ea580c] transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="font-['Playfair_Display'] text-xl text-[#a8a29e] italic">{num}</span>
                  </div>
                  
                  <h4 className="font-['Playfair_Display'] text-2xl font-medium tracking-tight mb-3 group-hover:text-[#ea580c] transition-colors">{service.name}</h4>
                  <p className="text-[#57534e] font-light leading-relaxed mb-6 flex-grow">{service.desc}</p>
                  
                  <div className="h-[1px] w-8 bg-[#d6d3d1] group-hover:w-full group-hover:bg-[#ea580c] transition-all duration-500 ease-out"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose (Charcoal) */}
      <section className="py-24 lg:py-32 bg-[#1c1917] border-b border-[#292524] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ea580c]">03 / The Workshop</span>
            <div className="h-[1px] w-12 bg-[#3f3936]"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-normal tracking-tight leading-[1.1] mb-8">
                {BUSINESS.yearsInBusiness} Years of <br/><span className="text-[#ea580c] italic">Mastery</span>.
              </h2>
              
              <div className="text-lg text-[#a8a29e] mb-12 font-light leading-relaxed relative">
                <span className="float-left text-6xl font-['Playfair_Display'] text-[#ea580c] leading-none pr-3 pt-2">W</span>
                e don't just swap parts; we understand the engineering behind your devices. Our longevity in Houston is a testament to our dedication to quality, honest craftsmanship, and remarkable speed.
              </div>

              <div className="flex gap-12 border-t border-[#292524] pt-8">
                <div>
                  <div className="font-['Playfair_Display'] text-5xl text-[#fafaf9] mb-2">{BUSINESS.yearsInBusiness}<span className="text-[#ea580c] italic">+</span></div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#78716c]">Years Active</div>
                </div>
                <div>
                  <div className="font-['Playfair_Display'] text-5xl text-[#fafaf9] mb-2">50<span className="text-[#ea580c] italic">k</span></div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#78716c]">Devices Fixed</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-[#292524] border-t border-[#292524]">
                {WHY_CHOOSE.map((feature, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  return (
                    <div key={i} className="py-8 flex gap-6 md:gap-8 group">
                      <div className="font-['Playfair_Display'] text-xl text-[#57534e] italic group-hover:text-[#ea580c] transition-colors">{num}</div>
                      <div>
                        <h4 className="font-['Playfair_Display'] text-2xl font-medium tracking-tight mb-3 text-[#f5f5f4]">{feature.title}</h4>
                        <p className="text-[#a8a29e] font-light leading-relaxed max-w-md">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Offers (Cream) */}
      <section className="py-24 lg:py-32 bg-[#fafaf9] text-[#1c1917] border-b border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#d6d3d1]"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ea580c]">04 / Featured</span>
              <div className="h-[1px] w-8 bg-[#d6d3d1]"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-['Playfair_Display'] font-normal tracking-tight">Repair Offers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border-y border-l border-[#e7e5e4]">
            {FEATURED_OFFERS.map((offer, i) => {
              const Icon = getIcon(offer.icon);
              return (
                <div key={i} className="border-r border-[#e7e5e4] p-10 md:p-8 flex flex-col items-center text-center group hover:bg-white transition-colors relative">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ea580c] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#78716c] mb-6">{offer.note}</span>
                  <Icon className="w-8 h-8 text-[#1c1917] mb-8" strokeWidth={1} />
                  
                  <h4 className="text-xl font-medium font-['Playfair_Display'] mb-3 tracking-tight">{offer.title}</h4>
                  <div className="font-['Playfair_Display'] text-2xl text-[#ea580c] italic mb-10">{offer.price}</div>
                  
                  <a href="#quote" className="mt-auto text-[11px] font-semibold uppercase tracking-widest text-[#1c1917] border-b border-[#1c1917] pb-1 hover:text-[#ea580c] hover:border-[#ea580c] transition-colors inline-block">
                    Claim Offer
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 & 9. Retail & Prepaid (Charcoal) */}
      <section className="py-24 lg:py-32 bg-[#11100f] border-b border-[#292524]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-0 border border-[#292524] bg-[#1c1917]">
            
            {/* Retail */}
            <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-[#292524]">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ea580c]">05 / Retail</span>
              </div>
              <h3 className="text-4xl font-['Playfair_Display'] font-normal tracking-tight mb-6">We Sell Devices Too</h3>
              <p className="text-[#a8a29e] mb-12 max-w-md font-light leading-relaxed">
                Looking for an upgrade? We carry a premium selection of unlocked phones, iPads, MacBooks, laptops, and consoles at competitive prices.
              </p>

              <ul className="space-y-4 mb-12">
                {SELL_PRODUCTS.map((product, i) => {
                  return (
                    <li key={i} className="flex justify-between items-center border-b border-[#292524] pb-4">
                      <span className="text-[#d6d3d1] font-medium">{product.name}</span>
                      <span className="text-xs text-[#78716c] font-light">{product.desc}</span>
                    </li>
                  );
                })}
              </ul>
              
              <a href="#" className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#ea580c] group">
                <span className="border-b border-[#ea580c]/30 group-hover:border-[#ea580c] pb-1 transition-colors">Browse inventory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Prepaid */}
            <div className="p-10 md:p-16 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ea580c]">06 / Connectivity</span>
              </div>
              <h3 className="text-4xl font-['Playfair_Display'] font-normal tracking-tight mb-6">Prepaid Plans</h3>
              <p className="text-[#a8a29e] mb-12 max-w-md font-light leading-relaxed">
                Get connected instantly. We activate lines and sell refills for major prepaid carriers, handling the setup so you don't have to.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {PREPAID_CARRIERS.map((carrier, i) => (
                  <div key={i} className="border border-[#3f3936] text-[#d6d3d1] px-6 py-4 text-sm font-medium">
                    {carrier}
                  </div>
                ))}
              </div>
              
              <a href="#" className="mt-auto inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#f5f5f4] group">
                <span className="border-b border-[#f5f5f4]/30 group-hover:border-[#f5f5f4] pb-1 transition-colors">See plans & pricing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 10 & 11. Location (Cream) */}
      <section className="py-24 lg:py-32 bg-[#fafaf9] text-[#1c1917]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ea580c]">07 / Visit</span>
            <div className="h-[1px] w-12 bg-[#d6d3d1]"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h3 className="text-5xl font-['Playfair_Display'] font-normal tracking-tight mb-8">The Workshop</h3>
              <p className="text-[#57534e] mb-12 text-lg font-light max-w-md leading-relaxed">
                Located conveniently on Almeda Rd. Drop by for a walk-in repair or consultation. No appointment necessary.
              </p>

              <div className="space-y-12 mb-12">
                <div className="flex items-start gap-6">
                  <MapPin className="w-6 h-6 text-[#1c1917] mt-1" strokeWidth={1} />
                  <div>
                    <h4 className="font-['Playfair_Display'] text-2xl font-medium tracking-tight mb-2">{BUSINESS.name}</h4>
                    <p className="text-[#57534e] font-light leading-relaxed">{BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <Clock className="w-6 h-6 text-[#1c1917] mt-1" strokeWidth={1} />
                  <div className="w-full max-w-sm">
                    <h4 className="font-['Playfair_Display'] text-2xl font-medium tracking-tight mb-4">Hours</h4>
                    <table className="w-full text-sm font-light">
                      <tbody>
                        {BUSINESS.hours.map((h, i) => (
                          <tr key={h.day} className={i !== BUSINESS.hours.length - 1 ? "border-b border-[#e7e5e4]" : ""}>
                            <td className="py-3 text-[#1c1917] font-medium">{h.day}</td>
                            <td className="py-3 text-right text-[#57534e]">{h.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-8 border-t border-[#e7e5e4]">
                <a href={BUSINESS.phoneTel} className="bg-[#1c1917] text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[#ea580c] transition-colors flex items-center gap-2">
                  Call Us
                </a>
                <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="border border-[#d6d3d1] text-[#1c1917] px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:border-[#1c1917] transition-colors flex items-center gap-2">
                  Directions
                </a>
                <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="border border-[#d6d3d1] text-[#1c1917] px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:border-[#16a34a] hover:text-[#16a34a] transition-colors flex items-center gap-2">
                  WhatsApp
                </a>
              </div>
              
              <div className="mt-12 pt-8">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78716c] mb-4">Service Areas</h4>
                <p className="text-sm text-[#57534e] font-light leading-relaxed">
                  {SERVICE_AREAS.join(" • ")}
                </p>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-auto border border-[#e7e5e4] bg-[#f5f5f4] p-2">
              <iframe
                src={BUSINESS.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) contrast(1.2) sepia(0.9)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer (Charcoal) */}
      <footer className="bg-[#11100f] pt-20 pb-10 border-t border-[#292524]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 opacity-80 mb-6 object-contain" />
              <p className="text-[#78716c] text-sm max-w-xs leading-relaxed font-light mb-8">
                {BUSINESS.tagline}
              </p>
              <div className="flex items-center gap-4">
                <a href={BUSINESS.phoneTel} className="text-[#a8a29e] hover:text-[#ea580c] transition-colors">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="text-[#a8a29e] hover:text-[#ea580c] transition-colors">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f5f4] mb-6">Repair</h5>
              <ul className="space-y-4">
                {FOOTER_LINKS.repair.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-[#a8a29e] hover:text-[#ea580c] transition-colors font-light">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f5f4] mb-6">Shop</h5>
              <ul className="space-y-4">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-[#a8a29e] hover:text-[#ea580c] transition-colors font-light">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f5f4] mb-6">Company</h5>
              <ul className="space-y-4">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-[#a8a29e] hover:text-[#ea580c] transition-colors font-light">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#292524] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#78716c] font-light">{COPYRIGHT}</p>
            <div className="text-xs text-[#78716c] font-light tracking-widest uppercase">
              {BUSINESS.addressFull}
            </div>
          </div>
        </div>
      </footer>

      {/* 13. Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1c1917] border-t border-[#292524] flex z-50 p-2 gap-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <a href={BUSINESS.phoneTel} className="flex-1 bg-[#11100f] text-[#f5f5f4] border border-[#3f3936] flex flex-col items-center justify-center py-2 text-[10px] font-semibold uppercase tracking-widest active:bg-[#ea580c] transition-colors">
          <Phone className="w-4 h-4 mb-1" />
          Call
        </a>
        <a href={BUSINESS.sms} className="flex-1 bg-[#11100f] text-[#f5f5f4] border border-[#3f3936] flex flex-col items-center justify-center py-2 text-[10px] font-semibold uppercase tracking-widest active:bg-[#ea580c] transition-colors">
          <MessageCircle className="w-4 h-4 mb-1" />
          Text
        </a>
        <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#ea580c] text-white flex flex-col items-center justify-center py-2 text-[10px] font-semibold uppercase tracking-widest active:bg-[#c2410c] transition-colors">
          <Navigation className="w-4 h-4 mb-1" />
          Route
        </a>
      </div>
      
    </div>
  );
}
