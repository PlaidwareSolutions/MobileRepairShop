import React from "react";
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
  ArrowRight,
  Check,
  Battery,
  Wifi,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
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
} from "./_content";

const iconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  gamepad: Gamepad2,
  headphones: Headphones,
  wrench: Wrench,
  zap: Zap,
  star: Star,
  shield: Shield,
  check: Check,
  battery: Battery,
  wifi: Wifi,
  phone: Phone,
  map: MapPin,
};

export function GarageShowroom() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const primaryCta = HERO.ctas.find((c) => c.kind === "primary");
  const secondaryCta = HERO.ctas.find((c) => c.kind === "secondary");
  const tertiaryCta = HERO.ctas.find((c) => c.kind === "tertiary");

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-red-500 selection:text-white flex flex-col">
      {/* Ticker Bar - Edge #1 Fixed: White text on red for high contrast */}
      <div className="bg-red-600 text-white py-2 overflow-hidden border-b-4 border-red-800">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap font-black uppercase text-sm tracking-widest flex gap-8 items-center">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span>{HERO.badgeSameDay}</span>
              <span className="text-red-300">•</span>
              <span>{HERO.badgeYears}</span>
              <span className="text-red-300">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Header - Edge #2 Fixed: Dark anchor block for the logo */}
      <header className="bg-white border-b-2 border-zinc-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="block bg-zinc-950 p-4 shrink-0 transition-transform hover:scale-[1.02]">
              <img
                src={BUSINESS.logoOfficial}
                alt={BUSINESS.name}
                className="h-12 w-auto object-contain block"
              />
            </Link>
            <div className="hidden lg:flex items-center gap-6 ml-8">
              <Link href="#services" className="font-bold uppercase text-sm tracking-wide text-zinc-600 hover:text-red-600 transition-colors">Services</Link>
              <Link href="#shop" className="font-bold uppercase text-sm tracking-wide text-zinc-600 hover:text-red-600 transition-colors">Shop</Link>
              <Link href="#why-us" className="font-bold uppercase text-sm tracking-wide text-zinc-600 hover:text-red-600 transition-colors">Why Us</Link>
              <Link href="#contact" className="font-bold uppercase text-sm tracking-wide text-zinc-600 hover:text-red-600 transition-colors">Contact</Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 pr-6">
            <div className="text-right mr-4">
              <div className="font-bold text-xs text-zinc-500 uppercase tracking-widest mb-0.5">Call for a quote</div>
              <a href={BUSINESS.phoneTel} className="font-black text-xl hover:text-red-600 transition-colors block leading-none">{BUSINESS.phoneDisplay}</a>
            </div>
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="bg-red-600 hover:bg-red-700 text-white font-black uppercase text-sm px-6 py-3 tracking-widest shadow-[4px_4px_0px_0px_#18181b] hover:shadow-[2px_2px_0px_0px_#18181b] hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
              >
                {primaryCta.label}
              </a>
            )}
          </div>

          <button
            className="lg:hidden p-6 text-zinc-900 hover:text-red-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-900 text-white absolute top-full left-0 w-full border-t border-zinc-800 shadow-2xl">
            <nav className="flex flex-col p-6 gap-4">
              <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="font-black uppercase text-xl border-b border-zinc-800 pb-4">Services</Link>
              <Link href="#shop" onClick={() => setMobileMenuOpen(false)} className="font-black uppercase text-xl border-b border-zinc-800 pb-4">Shop</Link>
              <Link href="#why-us" onClick={() => setMobileMenuOpen(false)} className="font-black uppercase text-xl border-b border-zinc-800 pb-4">Why Us</Link>
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-black uppercase text-xl">Contact</Link>
            </nav>
            <div className="p-6 bg-zinc-950">
               {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className="block text-center bg-red-600 hover:bg-red-700 text-white font-black uppercase text-lg px-6 py-4 tracking-widest"
                  >
                    {primaryCta.label}
                  </a>
                )}
            </div>
          </div>
        )}
      </header>

      {/* Hero - Edge #3 Fixed: Real surfaces, structured precision layout. Edge #4 Fixed: Clear CTA hierarchy */}
      <section className="relative bg-zinc-100 border-b border-zinc-300 pt-16 pb-24 overflow-hidden">
        {/* Precision Grid Background Motif */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-1.5 font-bold uppercase text-xs tracking-widest mb-8 border-l-4 border-red-600">
                <Wrench className="w-4 h-4 text-red-500" /> Professional Service Bay
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900 mb-6 drop-shadow-sm">
                {HERO.h1}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-zinc-600 mb-10 max-w-2xl leading-snug border-l-2 border-zinc-300 pl-6">
                {HERO.subhead}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className="flex-1 sm:flex-none text-center bg-red-600 hover:bg-red-700 text-white font-black uppercase text-lg px-8 py-4 tracking-widest shadow-[6px_6px_0px_0px_#18181b] hover:shadow-[2px_2px_0px_0px_#18181b] hover:translate-y-[4px] hover:translate-x-[4px] transition-all flex justify-center items-center gap-3"
                  >
                    {primaryCta.icon && React.createElement(iconMap[primaryCta.icon] || ArrowRight, { className: "w-5 h-5" })}
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="flex-1 sm:flex-none text-center bg-white hover:bg-zinc-50 text-zinc-900 font-black uppercase text-lg px-8 py-4 tracking-widest border-2 border-zinc-900 shadow-[6px_6px_0px_0px_#18181b] hover:shadow-[2px_2px_0px_0px_#18181b] hover:translate-y-[4px] hover:translate-x-[4px] transition-all flex justify-center items-center gap-3"
                  >
                    {secondaryCta.icon && React.createElement(iconMap[secondaryCta.icon] || ArrowRight, { className: "w-5 h-5" })}
                    {secondaryCta.label}
                  </a>
                )}
              </div>
              
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-zinc-300">
                {TRUST_POINTS.slice(0, 3).map((point, idx) => {
                  const Icon = iconMap[point.icon] || Check;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-700">
                      <Icon className="w-5 h-5 text-red-600" />
                      {point.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              {/* Charcoal Accent Panel */}
              <div className="bg-zinc-900 p-8 shadow-2xl relative z-10 border-t-8 border-red-600 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap className="w-32 h-32 text-white" />
                </div>
                <h3 className="text-white font-black uppercase text-2xl mb-6 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-red-500" /> Diagnostic Check
                </h3>
                <div className="space-y-4 relative z-10">
                  {SERVICES.slice(0, 4).map((service, idx) => {
                    const Icon = iconMap[service.icon] || Wrench;
                    return (
                      <div key={idx} className="bg-zinc-800 p-4 border border-zinc-700 flex items-center gap-4 group hover:bg-zinc-700 transition-colors">
                        <div className="bg-zinc-900 p-3">
                          <Icon className="w-6 h-6 text-red-400 group-hover:text-red-500 transition-colors" />
                        </div>
                        <div>
                          <div className="text-white font-black uppercase tracking-wide text-sm">{service.name}</div>
                          <div className="text-zinc-400 text-xs font-medium mt-1 line-clamp-1">{service.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <a href="#services" className="text-red-400 hover:text-red-300 font-bold uppercase text-sm tracking-widest flex items-center gap-2 w-full justify-between group">
                    View All Repairs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              {/* Decorative behind elements */}
              <div className="absolute -inset-4 border-2 border-zinc-300 -z-10 hidden lg:block transform -rotate-1"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Catalog - Edge #5 Fixed: Structured chrome material variation */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-3">Service Catalog</h2>
              <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                Precision <span className="text-red-600">Repairs</span>
              </h3>
            </div>
            <p className="text-zinc-500 font-medium max-w-sm">Every device requires specific care. Browse our catalog of standardized repair services.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
            {SERVICES.map((service, idx) => {
              const Icon = iconMap[service.icon] || Wrench;
              return (
                <div key={idx} className="bg-white p-8 hover:bg-zinc-50 transition-colors group relative">
                  <div className="text-red-100 group-hover:text-red-600 transition-colors absolute top-8 right-8">
                    <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                  <Icon className="w-10 h-10 text-zinc-900 mb-6" />
                  <h4 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-2 group-hover:text-red-600 transition-colors">{service.name}</h4>
                  <p className="text-sm text-zinc-600 font-medium">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Offers / Pricing - Edge #5 material variation (charcoal/zinc-900 block) */}
      <section className="py-24 bg-zinc-900 text-white border-y-8 border-red-600">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3 border-l-2 border-red-500 pl-3">Standard Rates</h2>
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Featured Offers</h3>
            <p className="text-zinc-400 font-medium mb-8">Transparent pricing on our most common procedures. Quality parts, professional installation.</p>
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex text-center bg-white hover:bg-zinc-200 text-zinc-900 font-black uppercase text-sm px-6 py-3 tracking-widest transition-colors"
              >
                Get Custom Quote
              </a>
            )}
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-4">
              {FEATURED_OFFERS.map((offer, idx) => {
                const Icon = iconMap[offer.icon] || Zap;
                return (
                  <div key={idx} className="bg-zinc-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-zinc-700 hover:border-red-500 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-zinc-900 p-3 shrink-0">
                        <Icon className="w-6 h-6 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-wide">{offer.title}</h4>
                        <div className="text-zinc-400 text-sm font-medium mt-1 uppercase tracking-wider">{offer.note}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-500 font-black text-2xl">{offer.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sell / Prepaid Split - Edge #5 variation (zinc-100 surfaces) */}
      <section id="shop" className="py-24 bg-zinc-100 border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Sell Products */}
          <div className="bg-white p-10 border-t-4 border-zinc-900 shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
              <Smartphone className="w-64 h-64" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 mb-8 border-b-2 border-zinc-100 pb-4">
              Inventory & Sales
            </h2>
            <p className="text-zinc-600 font-medium mb-8">{BUSINESS.tagline}</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
              {SELL_PRODUCTS.map((prod, idx) => {
                const Icon = iconMap[prod.icon] || Smartphone;
                return (
                  <li key={idx} className="flex items-start gap-3 group">
                    <Icon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold uppercase text-zinc-900 text-sm group-hover:text-red-600 transition-colors">{prod.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{prod.desc}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <a href="#shop" className="inline-flex items-center gap-2 text-zinc-900 font-black uppercase tracking-widest text-sm hover:text-red-600 transition-colors">
              Browse Selection <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Why Choose Us */}
          <div id="why-us" className="bg-zinc-200 p-10 border-t-4 border-red-600 shadow-lg">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 mb-8 border-b-2 border-zinc-300 pb-4">
              Why Gadget X
            </h2>
            <div className="space-y-6">
              {WHY_CHOOSE.map((reason, idx) => {
                const Icon = iconMap[reason.icon] || Star;
                return (
                  <div key={idx} className="flex items-start gap-4 bg-white p-4">
                    <div className="bg-red-100 text-red-600 p-2 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-zinc-900 tracking-wide">{reason.title}</h4>
                      <p className="text-sm text-zinc-600 font-medium mt-1">{reason.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Area with Location & Prepaid */}
      <footer id="contact" className="bg-zinc-950 text-zinc-400 pt-20 pb-8 border-t-8 border-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            
            <div className="lg:col-span-1">
              <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-12 mb-6 grayscale contrast-200 brightness-200" />
              <p className="text-sm font-medium mb-6 max-w-xs">{BUSINESS.tagline}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-zinc-300 font-bold">{BUSINESS.addressLine1}, {BUSINESS.addressLine2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <a href={BUSINESS.phoneTel} className="text-zinc-300 font-bold hover:text-white transition-colors">{BUSINESS.phoneDisplay}</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                  <div className="space-y-1">
                    {BUSINESS.hours.slice(0, 3).map((h, i) => (
                      <div key={i} className="text-zinc-300 font-medium text-xs"><span className="w-16 inline-block">{h.day}:</span> {h.time}</div>
                    ))}
                    <div className="text-zinc-500 text-xs italic">See all hours online</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6 border-b border-zinc-800 pb-2">Services</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.repair.map((link, idx) => (
                    <li key={idx}><a href="#" className="hover:text-red-400 transition-colors font-medium text-sm">{link}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6 border-b border-zinc-800 pb-2">Prepaid</h4>
                <ul className="space-y-3">
                  {PREPAID_CARRIERS.map((carrier, idx) => (
                    <li key={idx}><a href="#" className="hover:text-red-400 transition-colors font-medium text-sm">{carrier} Activation</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6 border-b border-zinc-800 pb-2">Service Areas</h4>
                <ul className="space-y-3">
                  {SERVICE_AREAS.slice(0, 6).map((area, idx) => (
                    <li key={idx}><a href="#" className="hover:text-red-400 transition-colors font-medium text-sm">{area} Phone Repair</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
            <p>{COPYRIGHT}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
