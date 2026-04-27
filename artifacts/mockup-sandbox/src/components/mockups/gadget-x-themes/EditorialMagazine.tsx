import React from "react";
import {
  ArrowRight, Phone, MapPin, Clock, MessageCircle, Navigation, Play, Plus, ChevronRight,
  Smartphone, Tablet, Laptop, Gamepad2, Headphones, ShieldCheck, Zap, Star
} from "lucide-react";
import {
  BUSINESS, HERO, TRUST_POINTS, SERVICES, WHY_CHOOSE,
  FEATURED_OFFERS, SELL_PRODUCTS, PREPAID_CARRIERS, SERVICE_AREAS,
  FOOTER_LINKS, COPYRIGHT,
} from "./_content";

const ACCENT = "text-[#1c3556]";
const ACCENT_BG = "bg-[#1c3556]";
const ACCENT_BORDER = "border-[#1c3556]";

export function EditorialMagazine() {
  return (
    <div className="min-h-screen bg-[#fdfcf8] text-[#1a1a1a] font-sans selection:bg-[#1c3556] selection:text-white">
      
      {/* Masthead (Dark container for logo) */}
      <div className="bg-[#1a1a1a] text-[#f8f6f0] border-b-[6px] border-[#1c3556]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-medium tracking-widest uppercase text-[#a8a29e]">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {BUSINESS.addressFull}</span>
          </div>
          <div className="flex-shrink-0">
            <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-8 md:h-10 object-contain" />
          </div>
          <div className="flex items-center gap-6 text-xs font-medium tracking-widest uppercase">
            <span className="text-[#a8a29e] hidden md:inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {BUSINESS.hoursShort}</span>
            <a href={BUSINESS.phoneTel} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3" /> {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation (Light) */}
      <div className="border-b border-[#e5e5e5] bg-[#fdfcf8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#1a1a1a]">
            {BUSINESS.name}
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#4a4a4a]">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
              <a key={item} href="#" className="hover:text-[#1a1a1a] transition-colors">{item}</a>
            ))}
          </nav>
          <a href={BUSINESS.phoneTel} className={`text-xs font-bold tracking-widest uppercase ${ACCENT} hover:underline underline-offset-4 flex items-center gap-1`}>
            Get a Quote <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-b-2 border-[#1a1a1a]">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Vertical Sidebar */}
          <div className="hidden lg:block lg:col-span-1 border-r border-[#e5e5e5] h-full pr-6 relative">
            <div className="sticky top-24 transform -rotate-180 whitespace-nowrap text-[10px] font-bold tracking-[0.2em] uppercase text-[#a8a29e]" style={{ writingMode: "vertical-rl" }}>
              Est. 2010 · 15 yrs in Houston · {HERO.badgeSameDay}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-4">
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${ACCENT} border-b border-[#1c3556] pb-1`}>
                The Repair Desk
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-normal leading-[1.05] tracking-tight mb-8 text-[#1a1a1a]">
              Fast Phone, Tablet, Laptop & Game Console <span className="italic">Repair</span> in Houston
            </h1>
            <p className="text-xl md:text-2xl font-serif text-[#4a4a4a] leading-relaxed max-w-2xl mb-10">
              {HERO.subhead}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 border-t border-[#e5e5e5] pt-8">
              {HERO.ctas.map((cta, i) => (
                <a key={i} href={cta.href} className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#1a1a1a]">
                  <span className={`${cta.kind === "primary" ? ACCENT : "text-[#4a4a4a] group-hover:text-[#1a1a1a]"} transition-colors`}>{cta.label}</span>
                  <ArrowRight className={`w-4 h-4 ${cta.kind === "primary" ? ACCENT : "text-[#a8a29e]"} group-hover:translate-x-1 transition-transform`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Quote Form inline */}
          <div className="lg:col-span-3 border-l border-[#e5e5e5] pl-6 h-full" id="quote">
            <h3 className="font-serif text-2xl mb-6 text-[#1a1a1a]">Request Assessment</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Device (e.g. iPhone 13)" className="w-full bg-transparent border-b border-[#a8a29e] rounded-none px-0 py-2 text-sm font-serif placeholder-[#a8a29e] focus:outline-none focus:border-[#1a1a1a] transition-colors" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-[#a8a29e] rounded-none px-0 py-2 text-sm font-serif placeholder-[#a8a29e] focus:outline-none focus:border-[#1a1a1a] transition-colors" />
              <textarea placeholder="Describe the issue" rows={2} className="w-full bg-transparent border-b border-[#a8a29e] rounded-none px-0 py-2 text-sm font-serif placeholder-[#a8a29e] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"></textarea>
              <button type="submit" className={`text-xs font-bold tracking-widest uppercase ${ACCENT} hover:underline underline-offset-4 pt-2 flex items-center gap-2`}>
                Send Request <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Trust Strip */}
      <section className="border-b border-[#e5e5e5] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center text-[11px] font-bold tracking-[0.15em] uppercase text-[#4a4a4a]">
          {TRUST_POINTS.map((point, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-serif italic text-[#1a1a1a] text-sm">{(i + 1).toString().padStart(2, '0')}</span>
              {point.label}
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid (Multi-column) */}
      <section className="py-20 border-b-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 border-b-4 border-[#1a1a1a] pb-4 flex justify-between items-end">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a8a29e]">Repair · Services</h2>
            <h3 className="text-4xl font-serif text-[#1a1a1a]">Our Expertise</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#e5e5e5]">
            {SERVICES.map((service, i) => (
              <div key={i} className="border-b border-r border-[#e5e5e5] p-8 hover:bg-[#f8f6f0] transition-colors group">
                <h4 className="font-serif text-2xl font-medium mb-3 text-[#1a1a1a] group-hover:text-[#1c3556] transition-colors">{service.name}</h4>
                <p className="text-sm font-serif text-[#4a4a4a] leading-relaxed mb-6">{service.desc}</p>
                <div className="h-[1px] w-8 bg-[#1a1a1a]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Featured Offers */}
      <section className="py-20 border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Why Choose Us */}
          <div>
            <div className="mb-10 border-b-2 border-[#1a1a1a] pb-4">
              <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a8a29e]">Our Promise</h2>
              <h3 className="text-3xl font-serif text-[#1a1a1a] mt-2">Why Gadget X?</h3>
            </div>
            <div className="divide-y divide-[#e5e5e5] border-t border-[#e5e5e5]">
              {WHY_CHOOSE.map((feature, i) => (
                <div key={i} className="py-6 grid grid-cols-12 gap-4">
                  <div className={`col-span-1 font-serif text-lg italic ${ACCENT}`}>{(i + 1)}</div>
                  <div className="col-span-11">
                    <h4 className="font-serif text-xl font-medium mb-2 text-[#1a1a1a]">{feature.title}</h4>
                    <p className="font-serif text-[#4a4a4a] text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Offers */}
          <div>
            <div className="mb-10 border-b-2 border-[#1a1a1a] pb-4">
              <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a8a29e]">Priced</h2>
              <h3 className="text-3xl font-serif text-[#1a1a1a] mt-2">Featured Offers</h3>
            </div>
            <div className="flex flex-col gap-6">
              {FEATURED_OFFERS.map((offer, i) => (
                <div key={i} className="flex items-end justify-between border-b border-[#e5e5e5] pb-4 group">
                  <div className="pr-4">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#a8a29e] mb-1">{offer.note}</div>
                    <h4 className="font-serif text-lg font-medium text-[#1a1a1a] group-hover:text-[#1c3556] transition-colors">{offer.title}</h4>
                  </div>
                  <div className="font-serif text-xl text-[#1a1a1a] whitespace-nowrap">
                    {offer.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Retail & Connectivity */}
      <section className="py-20 border-b border-[#e5e5e5] bg-[#f8f6f0]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Retail */}
          <div className="border-r border-[#e5e5e5] pr-16">
            <div className="mb-8 border-b border-[#1a1a1a] pb-4">
              <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a8a29e]">Retail</h2>
              <h3 className="text-3xl font-serif text-[#1a1a1a] mt-2">We Sell Devices</h3>
            </div>
            <p className="font-serif text-[#4a4a4a] leading-relaxed mb-8">
              We carry a premium selection of unlocked phones, iPads, MacBooks, laptops, and gaming consoles at competitive prices. Tested, warranted, and ready to go.
            </p>
            <ul className="space-y-3">
              {SELL_PRODUCTS.map((p, i) => (
                <li key={i} className="text-sm font-bold tracking-wider uppercase text-[#1a1a1a] flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-[#a8a29e] font-serif lowercase italic text-xs">{p.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connectivity */}
          <div>
            <div className="mb-8 border-b border-[#1a1a1a] pb-4">
              <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a8a29e]">Connectivity</h2>
              <h3 className="text-3xl font-serif text-[#1a1a1a] mt-2">Prepaid Plans</h3>
            </div>
            <p className="font-serif text-[#4a4a4a] leading-relaxed mb-8">
              Get connected instantly. We activate lines and sell refills for major prepaid carriers, handling the setup so you don't have to.
            </p>
            <div className="flex flex-wrap gap-4">
              {PREPAID_CARRIERS.map((c, i) => (
                <span key={i} className="text-[11px] font-bold tracking-widest uppercase border border-[#1a1a1a] px-3 py-1.5">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas (Inline Serif) */}
      <section className="py-16 border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a8a29e] mb-4">Service Areas</div>
          <p className="font-serif text-2xl text-[#1a1a1a] max-w-4xl mx-auto leading-relaxed">
            Proudly serving <span className="italic">Houston</span>, {SERVICE_AREAS.filter(a => a !== "Houston").join(", ")}, and the greater metropolitan area with honesty and speed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-[#f8f6f0] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#333] pb-12 mb-8">
            <div className="col-span-1 md:col-span-1">
              <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-12 object-contain mb-6" />
              <p className="font-serif text-[#a8a29e] text-sm leading-relaxed mb-6">
                {BUSINESS.tagline}
              </p>
              <div className="font-serif italic text-[#a8a29e] text-sm">
                Est. 2010
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a8a29e] mb-6">Location</h4>
              <p className="font-serif text-sm leading-relaxed mb-4">
                {BUSINESS.addressLine1}<br />
                {BUSINESS.addressLine2}
              </p>
              <div className="space-y-1 font-serif text-sm text-[#a8a29e]">
                {BUSINESS.hours.map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a8a29e] mb-6">Contact</h4>
              <ul className="space-y-3 text-sm font-bold tracking-wider uppercase">
                <li><a href={BUSINESS.phoneTel} className="hover:text-white transition-colors flex items-center gap-2">Call Us</a></li>
                <li><a href={BUSINESS.sms} className="hover:text-white transition-colors flex items-center gap-2">Text Us</a></li>
                <li><a href={BUSINESS.whatsapp} className="hover:text-white transition-colors flex items-center gap-2">WhatsApp</a></li>
                <li><a href={BUSINESS.mapsLink} className="hover:text-white transition-colors flex items-center gap-2">Directions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a8a29e] mb-6">Directory</h4>
              <ul className="space-y-3 text-sm font-bold tracking-wider uppercase">
                {["Repair", "Sell", "Accessories", "Prepaid"].map(link => (
                  <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-[#a8a29e]">
            <div>{COPYRIGHT}</div>
            <div>Editorial Edition</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EditorialMagazine;