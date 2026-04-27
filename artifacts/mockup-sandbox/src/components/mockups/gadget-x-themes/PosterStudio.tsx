import React from "react";
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
  Shield,
  Star,
  Check,
  Battery,
  Wifi,
  ArrowRight,
  ArrowUpRight,
  Menu
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
  COPYRIGHT
} from "./_content";

const ICON_MAP: Record<string, React.ElementType> = {
  phone: Phone,
  wrench: Wrench,
  map: MapPin,
  star: Star,
  zap: Zap,
  shield: Shield,
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  gamepad: Gamepad2,
  headphones: Headphones,
  check: Check,
  battery: Battery,
  wifi: Wifi
};

export function PosterStudio() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-red-500 selection:text-white">
      {/* HEADER & TICKER */}
      <header className="border-b-4 border-zinc-900 bg-white sticky top-0 z-50">
        <div className="flex flex-col md:flex-row">
          {/* Logo Block - Dark Container */}
          <div className="bg-zinc-900 px-6 py-4 flex items-center justify-center shrink-0">
            <img 
              src={BUSINESS.logoOfficial} 
              alt={BUSINESS.name} 
              className="h-12 w-auto object-contain"
            />
          </div>
          
          {/* Utility & Navigation */}
          <div className="flex flex-col flex-1">
            {/* Utility Bar */}
            <div className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex justify-between items-center border-b border-red-700/50 hidden md:flex">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {BUSINESS.addressLine1}, {BUSINESS.addressLine2}</span>
                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {BUSINESS.hoursShort}</span>
              </div>
              <a href={BUSINESS.phoneTel} className="flex items-center gap-2 hover:text-zinc-900 transition-colors">
                <Phone className="w-3 h-3" /> {BUSINESS.phoneDisplay}
              </a>
            </div>
            
            {/* Nav */}
            <div className="flex-1 flex justify-between items-center px-6 py-4 md:py-0">
              <nav className="hidden md:flex items-center gap-8 font-black uppercase tracking-tight text-sm">
                <a href="#services" className="hover:text-red-600 transition-colors">Repair</a>
                <a href="#shop" className="hover:text-red-600 transition-colors">Shop</a>
                <a href="#sell" className="hover:text-red-600 transition-colors">Sell</a>
                <a href="#prepaid" className="hover:text-red-600 transition-colors">Prepaid</a>
              </nav>
              <div className="md:hidden flex-1 flex justify-end">
                <Menu className="w-6 h-6" />
              </div>
              <a 
                href={BUSINESS.phoneTel}
                className="hidden md:inline-flex bg-zinc-900 text-white px-6 py-3 font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ANNOUNCEMENT TICKER */}
      <div className="bg-red-600 text-white overflow-hidden py-3 border-b-4 border-zinc-900">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] font-black uppercase tracking-widest text-sm md:text-base">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-8">
              <span>{HERO.badgeSameDay}</span>
              <span className="text-red-300">•</span>
              <span>{HERO.badgeYears}</span>
              <span className="text-red-300">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO - POSTER STYLE */}
      <section className="px-4 py-12 md:py-24 bg-white border-b-4 border-zinc-900 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(zinc-900 1px, transparent 1px), linear-gradient(90deg, zinc-900 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_400px] gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85]">
              {HERO.h1.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'repair' ? 'text-red-600 block mt-2' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className="text-xl md:text-3xl font-bold text-zinc-600 max-w-2xl leading-tight border-l-8 border-red-600 pl-6 py-2">
              {HERO.subhead}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-8">
              <a 
                href={HERO.ctas[0].href} 
                className="bg-red-600 text-white font-black uppercase tracking-widest px-8 py-5 text-lg shadow-[8px_8px_0_0_#18181b] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#18181b] transition-all flex items-center gap-3"
              >
                <Phone className="w-5 h-5" /> {HERO.ctas[0].label}
              </a>
              <a 
                href={HERO.ctas[1].href} 
                className="bg-white border-4 border-zinc-900 text-zinc-900 font-black uppercase tracking-widest px-8 py-5 text-lg shadow-[8px_8px_0_0_#18181b] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#18181b] transition-all flex items-center gap-3"
              >
                <Wrench className="w-5 h-5" /> {HERO.ctas[1].label}
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="bg-zinc-100 border-4 border-zinc-900 p-8 shadow-[16px_16px_0_0_#18181b] transform rotate-3">
              <div className="aspect-[3/4] bg-white border-4 border-zinc-900 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="font-black text-4xl text-zinc-300 tracking-tighter">01</span>
                  <Zap className="w-8 h-8 text-red-600" />
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-12 bg-red-600"></div>
                  <h3 className="font-black text-4xl uppercase leading-none tracking-tighter">Houston's<br/>Fix.</h3>
                  <p className="font-bold text-zinc-500 uppercase tracking-widest text-xs">Since 2010</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-6 bg-zinc-900 text-white border-b-4 border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-12 gap-y-4">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICON_MAP[point.icon] || Star;
            return (
              <div key={i} className="flex items-center gap-3 font-black uppercase tracking-widest text-sm md:text-base">
                <Icon className="w-5 h-5 text-red-500" />
                {point.label}
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICES - EDITORIAL GRID */}
      <section id="services" className="py-24 bg-zinc-100 border-b-4 border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b-4 border-zinc-900 pb-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Services <br />
              <span className="text-red-600">Overview</span>
            </h2>
            <p className="font-bold text-zinc-500 max-w-sm uppercase tracking-widest text-xs md:text-sm text-right">
              Professional repairs for all major devices. We don't just fix screens; we solve problems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Wrench;
              return (
                <div key={i} className="group bg-white border-4 border-zinc-900 p-8 shadow-[8px_8px_0_0_#18181b] hover:-translate-y-2 hover:shadow-[16px_16px_0_0_#ef4444] transition-all relative">
                  <div className="absolute top-0 right-0 p-4 font-black text-3xl text-zinc-200 group-hover:text-red-100 transition-colors pointer-events-none">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <Icon className="w-12 h-12 text-zinc-900 mb-6 group-hover:text-red-600 transition-colors" />
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2 pr-8">{service.name}</h3>
                  <p className="font-bold text-zinc-500 leading-tight mb-6">{service.desc}</p>
                  <a href="#" className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-sm text-red-600 hover:text-zinc-900 transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - STARK CONTRAST */}
      <section className="py-24 bg-white border-b-4 border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr_1.5fr] gap-16">
          <div className="sticky top-32 self-start">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Why <br />Choose<br />Gadget X
            </h2>
            <div className="w-24 h-4 bg-red-600 mb-8"></div>
            <p className="font-bold text-zinc-600 text-xl md:text-2xl leading-tight">
              We've been bringing dead devices back to life in Houston for over a decade.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = ICON_MAP[item.icon] || Star;
              return (
                <div key={i} className="border-t-4 border-zinc-900 pt-6">
                  <Icon className="w-10 h-10 text-red-600 mb-4" />
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{item.title}</h3>
                  <p className="font-bold text-zinc-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEALS & SELL SECTION */}
      <section className="grid lg:grid-cols-2 border-b-4 border-zinc-900">
        {/* Hot Deals */}
        <div className="bg-zinc-100 p-8 md:p-16 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 border-zinc-900">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
            Hot <span className="text-red-600">Deals</span>
          </h2>
          <div className="space-y-6">
            {FEATURED_OFFERS.map((offer, i) => {
              const Icon = ICON_MAP[offer.icon] || Star;
              return (
                <div key={i} className="bg-white border-4 border-zinc-900 p-6 flex items-center justify-between gap-4 hover:shadow-[8px_8px_0_0_#18181b] hover:-translate-y-1 transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="bg-zinc-100 p-3 border-2 border-zinc-900 hidden sm:block">
                      <Icon className="w-8 h-8 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-tight">{offer.title}</h4>
                      <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{offer.note}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-red-600 tracking-tighter">{offer.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* We Sell Too */}
        <div className="bg-zinc-900 text-white p-8 md:p-16 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              We <span className="text-red-500">Sell</span> Too
            </h2>
            <p className="font-bold text-zinc-400 text-xl mb-12 max-w-md">
              Looking for an upgrade? Browse our selection of tested and certified devices.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              {SELL_PRODUCTS.map((product, i) => {
                const Icon = ICON_MAP[product.icon] || Smartphone;
                return (
                  <div key={i} className="border-2 border-zinc-700 p-6 hover:border-red-500 hover:bg-zinc-800 transition-colors">
                    <Icon className="w-8 h-8 text-red-500 mb-4" />
                    <h4 className="font-black uppercase tracking-tight mb-1">{product.name}</h4>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{product.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <button className="bg-red-600 text-white font-black uppercase tracking-widest px-8 py-5 text-lg w-full hover:bg-white hover:text-zinc-900 transition-colors">
              Browse Inventory
            </button>
          </div>
        </div>
      </section>

      {/* PREPAID & AREAS */}
      <section className="py-16 bg-white border-b-4 border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Wifi className="w-6 h-6 text-red-600" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Prepaid Activations</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {PREPAID_CARRIERS.map((carrier, i) => (
                <span key={i} className="bg-zinc-100 border-2 border-zinc-900 px-4 py-2 font-black uppercase text-sm tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer">
                  {carrier}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-red-600" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Service Areas</h3>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {SERVICE_AREAS.map((area, i) => (
                <span key={i} className="font-bold text-zinc-600 uppercase tracking-widest text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            <div>
              <h4 className="font-black uppercase tracking-widest text-zinc-900 mb-6 border-b-2 border-zinc-900 pb-2 inline-block">Repair</h4>
              <ul className="space-y-3 font-bold text-sm text-zinc-600 uppercase tracking-wide">
                {FOOTER_LINKS.repair.map((link, i) => <li key={i} className="hover:text-red-600 cursor-pointer">{link}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-zinc-900 mb-6 border-b-2 border-zinc-900 pb-2 inline-block">Shop</h4>
              <ul className="space-y-3 font-bold text-sm text-zinc-600 uppercase tracking-wide">
                {FOOTER_LINKS.shop.map((link, i) => <li key={i} className="hover:text-red-600 cursor-pointer">{link}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-zinc-900 mb-6 border-b-2 border-zinc-900 pb-2 inline-block">Prepaid</h4>
              <ul className="space-y-3 font-bold text-sm text-zinc-600 uppercase tracking-wide">
                {FOOTER_LINKS.prepaid.map((link, i) => <li key={i} className="hover:text-red-600 cursor-pointer">{link}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-zinc-900 mb-6 border-b-2 border-zinc-900 pb-2 inline-block">Company</h4>
              <ul className="space-y-3 font-bold text-sm text-zinc-600 uppercase tracking-wide">
                {FOOTER_LINKS.company.map((link, i) => <li key={i} className="hover:text-red-600 cursor-pointer">{link}</li>)}
              </ul>
            </div>
          </div>
          
          <div className="border-t-4 border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <img 
              src={BUSINESS.logoOfficial} 
              alt={BUSINESS.name} 
              className="h-10 w-auto object-contain bg-zinc-900 p-2"
            />
            <p className="font-bold text-zinc-500 uppercase tracking-widest text-xs text-center md:text-right">
              {COPYRIGHT}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
