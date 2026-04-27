import React, { useState } from "react";
import {
  Smartphone, Tablet, Laptop, Gamepad2, Headphones, Phone,
  MessageCircle, MapPin, Clock, Star, ShieldCheck, Zap,
  Wrench, Battery, CheckCircle2, Menu, X, ArrowRight,
  Wifi, Navigation, ChevronRight
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

export function QuietConfident() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#0a0a0a] font-sans selection:bg-[#e7e5e4] selection:text-[#0a0a0a] font-light text-[15px] leading-relaxed">
      
      {/* 1. Header & Utility Combined */}
      <header className="sticky top-0 z-50 bg-[#fafaf9]/90 backdrop-blur-md border-b border-[#e7e5e4]">
        <div className="max-w-[1000px] mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center group">
            {/* The official logo is a black square JPEG, so we contain it neatly in a dark pill or use a dark header. Here we use a dark pill wrapper for it */}
            <div className="bg-[#0a0a0a] p-1.5 rounded-xl overflow-hidden flex items-center justify-center">
               <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-6 w-auto object-contain rounded-md" />
            </div>
            <span className="ml-3 font-medium tracking-tight text-[15px]">{BUSINESS.name}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-[14px]">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations"].map((item) => (
              <a key={item} href="#" className="text-[#57534e] hover:text-[#0a0a0a] transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6 text-[14px]">
            <a href={BUSINESS.phoneTel} className="text-[#57534e] hover:text-[#0a0a0a] transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" strokeWidth={1.5} /> {BUSINESS.phoneDisplay}
            </a>
            <a href="#quote" className="bg-[#0a0a0a] text-[#fafaf9] px-5 py-2.5 rounded-full hover:bg-[#292524] transition-colors">
              Book repair
            </a>
          </div>

          <button className="lg:hidden text-[#0a0a0a] p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#fafaf9] border-b border-[#e7e5e4] p-6 flex flex-col gap-6 shadow-sm">
            <nav className="flex flex-col gap-4 text-[15px]">
              {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
                <a key={item} href="#" className="text-[#57534e] hover:text-[#0a0a0a]">{item}</a>
              ))}
            </nav>
            <div className="h-[1px] bg-[#e7e5e4] w-full"></div>
            <a href={BUSINESS.phoneTel} className="flex items-center gap-2 text-[#0a0a0a]">
              <Phone className="w-4 h-4" strokeWidth={1.5} /> {BUSINESS.phoneDisplay}
            </a>
          </div>
        )}
      </header>

      {/* 2. Hero */}
      <section className="pt-24 pb-20 lg:pt-40 lg:pb-32 px-6 max-w-[1000px] mx-auto text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#0a0a0a] leading-[1.1] mb-6 max-w-3xl">
          {HERO.h1}
        </h1>
        <p className="text-[17px] md:text-[19px] text-[#57534e] mb-12 max-w-2xl leading-[1.6]">
          {HERO.subhead}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#quote" className="w-full sm:w-auto bg-[#0a0a0a] hover:bg-[#292524] text-[#fafaf9] px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2">
            Get a repair quote
          </a>
          <a href={BUSINESS.phoneTel} className="w-full sm:w-auto bg-transparent border border-[#d6d3d1] hover:border-[#a8a29e] text-[#0a0a0a] px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2">
            Call us directly
          </a>
        </div>
      </section>

      {/* 3. Trust Strip */}
      <section className="border-y border-[#e7e5e4] bg-[#f5f5f4]/50 py-10">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[#57534e] text-[14px]">
          {TRUST_POINTS.map((point, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#a8a29e]" strokeWidth={1.5} />
              <span>{point.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="py-24 lg:py-32 px-6 max-w-[1000px] mx-auto border-b border-[#e7e5e4]">
        <div className="mb-16 md:mb-24 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">What we repair</h2>
          <p className="text-[#57534e] text-[17px]">Quality repairs for the devices you use every day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {SERVICES.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <div key={i} className="group flex items-start gap-5">
                <div className="mt-1 p-3 rounded-2xl bg-[#f5f5f4] text-[#57534e] group-hover:bg-[#e7e5e4] transition-colors">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-medium mb-1 group-hover:text-[#0a0a0a] transition-colors">{service.name}</h3>
                  <p className="text-[#57534e] text-[15px]">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Featured Offers & Why Choose Merged */}
      {/* HTML comment: Merging "Featured Offers" and "Why Choose" into a single breathable "Our approach & offers" section */}
      <section className="py-24 lg:py-32 px-6 max-w-[1000px] mx-auto border-b border-[#e7e5e4]">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-12">Our approach</h2>
            <div className="space-y-10">
              {WHY_CHOOSE.map((feature, i) => (
                <div key={i}>
                  <h4 className="text-[17px] font-medium mb-2">{feature.title}</h4>
                  <p className="text-[#57534e]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-12">Common repairs</h2>
            <div className="space-y-4">
              {FEATURED_OFFERS.map((offer, i) => (
                <div key={i} className="flex justify-between items-baseline py-4 border-b border-[#e7e5e4] group">
                  <div>
                    <h4 className="text-[16px] font-medium text-[#0a0a0a]">{offer.title}</h4>
                    <span className="text-[14px] text-[#78716c]">{offer.note}</span>
                  </div>
                  <div className="text-[16px] text-[#57534e] pl-4">{offer.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sell Products & Prepaid Merged */}
      {/* HTML comment: Merging "Retail" and "Prepaid" under a unified "Beyond repairs" section */}
      <section className="py-24 lg:py-32 px-6 max-w-[1000px] mx-auto border-b border-[#e7e5e4]">
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Beyond repairs</h2>
          <p className="text-[#57534e] text-[17px]">We also sell devices and manage prepaid connectivity.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="bg-[#f5f5f4] p-10 md:p-12 rounded-3xl">
            <h3 className="text-[19px] font-medium mb-6">Devices for sale</h3>
            <ul className="space-y-4 mb-8">
              {SELL_PRODUCTS.map((product, i) => (
                <li key={i} className="flex justify-between items-center text-[15px]">
                  <span className="text-[#0a0a0a]">{product.name}</span>
                  <span className="text-[#78716c]">{product.desc}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="inline-flex items-center gap-2 text-[#0a0a0a] font-medium hover:text-[#57534e] transition-colors">
              View inventory <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          <div className="bg-[#f5f5f4] p-10 md:p-12 rounded-3xl flex flex-col">
            <h3 className="text-[19px] font-medium mb-6">Prepaid plans</h3>
            <p className="text-[#57534e] mb-8">Activate lines and get refills for major prepaid carriers seamlessly in-store.</p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {PREPAID_CARRIERS.map((carrier, i) => (
                <div key={i} className="text-[#0a0a0a] border border-[#e7e5e4] bg-[#fafaf9] py-3 px-4 rounded-xl text-[14px] text-center">
                  {carrier}
                </div>
              ))}
            </div>
            <a href="#" className="mt-auto inline-flex items-center gap-2 text-[#0a0a0a] font-medium hover:text-[#57534e] transition-colors">
              See pricing <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* 7. Location & Quote Form Merged */}
      {/* HTML comment: Merging the location/contact details with the quote form for a streamlined finish */}
      <section className="py-24 lg:py-32 px-6 max-w-[1000px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          <div id="quote">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Request a quote</h2>
            <p className="text-[#57534e] mb-10">Tell us what's wrong, and we'll get back to you with an estimate.</p>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="Name" className="w-full bg-[#f5f5f4] border-0 rounded-xl px-5 py-4 text-[#0a0a0a] placeholder-[#a8a29e] focus:ring-1 focus:ring-[#0a0a0a] focus:outline-none transition-shadow" />
                <input type="tel" placeholder="Phone" className="w-full bg-[#f5f5f4] border-0 rounded-xl px-5 py-4 text-[#0a0a0a] placeholder-[#a8a29e] focus:ring-1 focus:ring-[#0a0a0a] focus:outline-none transition-shadow" />
              </div>
              <input type="text" placeholder="Device (e.g. iPhone 13)" className="w-full bg-[#f5f5f4] border-0 rounded-xl px-5 py-4 text-[#0a0a0a] placeholder-[#a8a29e] focus:ring-1 focus:ring-[#0a0a0a] focus:outline-none transition-shadow" />
              <textarea placeholder="Issue description" rows={3} className="w-full bg-[#f5f5f4] border-0 rounded-xl px-5 py-4 text-[#0a0a0a] placeholder-[#a8a29e] focus:ring-1 focus:ring-[#0a0a0a] focus:outline-none transition-shadow resize-none"></textarea>
              <button type="submit" className="w-full bg-[#0a0a0a] hover:bg-[#292524] text-[#fafaf9] py-4 rounded-xl font-medium transition-colors">
                Send request
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Visit us</h2>
            <p className="text-[#57534e] mb-10">Drop by the shop for a walk-in consultation.</p>

            <div className="space-y-8">
              <div>
                <h4 className="text-[14px] text-[#78716c] mb-2">Location</h4>
                <p className="text-[#0a0a0a]">{BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}</p>
                <div className="mt-4 flex gap-3">
                  <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="text-[14px] text-[#0a0a0a] border border-[#d6d3d1] hover:border-[#a8a29e] rounded-full px-4 py-1.5 transition-colors">Get directions</a>
                </div>
              </div>

              <div>
                <h4 className="text-[14px] text-[#78716c] mb-2">Hours</h4>
                <ul className="space-y-1">
                  {BUSINESS.hours.map((h) => (
                    <li key={h.day} className="flex gap-6">
                      <span className="w-24 text-[#0a0a0a]">{h.day}</span>
                      <span className="text-[#57534e]">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[14px] text-[#78716c] mb-2">Service Areas</h4>
                <p className="text-[#57534e] leading-relaxed">
                  {SERVICE_AREAS.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      {/* HTML comment: A dark footer block per the instructions to safely host the official black square logo */}
      <footer className="bg-[#0a0a0a] text-[#a8a29e] py-16 px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          
          <div className="col-span-2 md:col-span-1">
            <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-10 w-auto rounded-lg mb-6 object-contain bg-[#0a0a0a]" />
            <p className="text-[14px] text-[#78716c] mb-6 pr-4">
              {BUSINESS.tagline}
            </p>
            <p className="text-[14px]">
              {BUSINESS.yearsInBusiness} years of service.
            </p>
          </div>

          <div>
            <h4 className="text-[#fafaf9] font-medium mb-6">Repair</h4>
            <ul className="space-y-3 text-[14px]">
              {FOOTER_LINKS.repair.map((link) => (
                <li key={link}><a href="#" className="hover:text-[#fafaf9] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#fafaf9] font-medium mb-6">Shop</h4>
            <ul className="space-y-3 text-[14px]">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link}><a href="#" className="hover:text-[#fafaf9] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#fafaf9] font-medium mb-6">Connect</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href={BUSINESS.phoneTel} className="hover:text-[#fafaf9] transition-colors">Call us</a></li>
              <li><a href={BUSINESS.sms} className="hover:text-[#fafaf9] transition-colors">Text us</a></li>
              <li><a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#fafaf9] transition-colors">WhatsApp</a></li>
              <li><a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="hover:text-[#fafaf9] transition-colors">Directions</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-[1000px] mx-auto mt-16 pt-8 border-t border-[#292524] text-[13px] text-[#78716c]">
          {COPYRIGHT}
        </div>
      </footer>

    </div>
  );
}
