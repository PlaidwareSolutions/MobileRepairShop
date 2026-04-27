import React, { useState } from "react";
import {
  Smartphone, Tablet, Laptop, Gamepad2, Headphones, Phone,
  MessageCircle, MapPin, Clock, Star, ShieldCheck, Zap,
  Wrench, Battery, CheckCircle2, Menu, X, ArrowRight, Wifi
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  BUSINESS, HERO, TRUST_POINTS, SERVICES, WHY_CHOOSE,
  FEATURED_OFFERS, SELL_PRODUCTS, PREPAID_CARRIERS, SERVICE_AREAS,
  FOOTER_LINKS, COPYRIGHT,
} from "./_content";

type IconKey =
  | "smartphone" | "tablet" | "laptop" | "gamepad" | "headphones"
  | "wrench" | "phone" | "map" | "star" | "zap" | "shield"
  | "check" | "battery" | "wifi";

const ICON_MAP: Record<IconKey, LucideIcon> = {
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

function getIcon(key: string): LucideIcon {
  return ICON_MAP[key as IconKey] ?? Wrench;
}

const PALETTE = [
  "bg-[#6ee7b7]", // Mint
  "bg-[#fb7185]", // Coral
  "bg-[#fde047]", // Lemon
  "bg-[#c084fc]", // Lavender
  "bg-[#93c5fd]", // Light Blue
];

export function PlayfulRetro() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ctaCall, ctaQuote, ctaDirections] = HERO.ctas;

  return (
    <div className="min-h-screen bg-[#fffbeb] text-black font-sans selection:bg-[#fb7185] selection:text-white pb-20 md:pb-0">
      
      {/* 1. Top Utility Bar */}
      <div className="bg-[#fb7185] border-b-4 border-black py-2 px-4 flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-black">
        <div className="max-w-[1240px] mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 bg-white border-2 border-black px-2 py-0.5 rounded-full shadow-[2px_2px_0_0_#000]">
              <MapPin className="w-3 h-3" /> {BUSINESS.addressFull}
            </span>
            <span className="hidden md:inline-flex items-center gap-2 bg-white border-2 border-black px-2 py-0.5 rounded-full shadow-[2px_2px_0_0_#000]">
              <Clock className="w-3 h-3" /> {BUSINESS.hoursShort}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-[#fde047] border-2 border-black text-black px-3 py-1 rounded-full font-black shadow-[2px_2px_0_0_#000] -rotate-2">
              {HERO.badgeSameDay}
            </span>
            <a href={BUSINESS.phoneTel} className="hover:scale-105 transition-transform flex items-center gap-2 bg-white border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0_0_#000]">
              <Phone className="w-3 h-3" /> {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-50 bg-[#fffbeb] border-b-4 border-black">
        <div className="max-w-[1240px] mx-auto px-4 h-24 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            {/* Logo in a dark chunky tile */}
            <div className="bg-black p-2 rounded-2xl border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
              <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-10 w-10 object-contain rounded-xl bg-black" />
            </div>
            <span className="font-mono font-black text-2xl uppercase tracking-tighter">Gadget X</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 font-mono font-bold uppercase text-sm">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item, i) => (
              <a key={item} href="#" className={`hover:bg-black hover:text-white px-3 py-1 rounded-lg border-2 border-transparent hover:border-black transition-colors ${i%2===0 ? 'hover:-rotate-2' : 'hover:rotate-2'}`}>
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={BUSINESS.phoneTel} className="bg-[#6ee7b7] text-black border-4 border-black px-6 py-2.5 rounded-2xl font-mono font-black uppercase text-sm shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
              Call Now
            </a>
          </div>

          <button className="lg:hidden p-2 border-4 border-black rounded-xl bg-[#fde047] shadow-[4px_4px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-24 left-0 w-full bg-[#fffbeb] border-b-4 border-black p-4 flex flex-col gap-2 z-40">
            {["Repair", "Sell", "Accessories", "Prepaid", "Locations", "Contact"].map((item) => (
              <a key={item} href="#" className="font-mono font-bold uppercase text-xl p-4 bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0_0_#000] text-center active:translate-y-[4px] active:shadow-none transition-all">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* 3. Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b-4 border-black bg-[#fffbeb]">
        {/* Playful background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-[1240px] mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative">
            {/* Sparkle deco */}
            <Star className="absolute -top-8 -left-4 w-8 h-8 text-[#fde047] fill-[#fde047] border-black stroke-black stroke-2 animate-spin-slow" />
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#c084fc] border-4 border-black px-4 py-2 rounded-full font-mono font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#000] rotate-2 inline-flex items-center gap-2">
                <Star className="w-4 h-4 fill-white" /> {HERO.badgeYears}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-mono font-black uppercase tracking-tighter leading-[1.1]">
              Fast Phone & <br/>
              <span className="inline-block bg-[#fde047] px-2 -rotate-2 border-4 border-black shadow-[4px_4px_0_0_#000] mt-2 mb-2">Console</span><br/>
              Repair
            </h1>
            
            <p className="text-lg md:text-xl font-bold max-w-lg bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0_0_#000]">
              {HERO.subhead}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href={ctaCall.href} className="bg-[#fb7185] border-4 border-black px-8 py-4 rounded-2xl font-mono font-black uppercase text-lg shadow-[6px_6px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-2">
                <Phone className="w-5 h-5 fill-black" /> {ctaCall.label}
              </a>
              <a href={ctaQuote.href} className="bg-[#6ee7b7] border-4 border-black px-8 py-4 rounded-2xl font-mono font-black uppercase text-lg shadow-[6px_6px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-2">
                <Wrench className="w-5 h-5" /> {ctaQuote.label}
              </a>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto">
            {/* Arcade Cabinet / Gameboy Vibe Illustration */}
            <div className="absolute inset-0 bg-[#93c5fd] border-8 border-black rounded-[3rem] rounded-br-[6rem] shadow-[12px_12px_0_0_#000] p-6 flex flex-col transform rotate-3">
              <div className="bg-black rounded-3xl p-4 flex-1 shadow-inner relative overflow-hidden">
                {/* Screen content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <Gamepad2 className="w-20 h-20 text-[#6ee7b7] mb-4 animate-bounce" />
                  <div className="font-mono font-black text-2xl text-[#fde047] uppercase">GAME OVER?</div>
                  <div className="font-mono font-bold text-[#fb7185] mt-2">INSERT COIN TO REPAIR</div>
                </div>
                {/* Screen glare */}
                <div className="absolute -top-20 -right-20 w-40 h-64 bg-white opacity-10 transform rotate-45"></div>
              </div>
              <div className="h-32 mt-6 flex justify-between items-center px-4">
                {/* D-Pad */}
                <div className="relative w-20 h-20">
                  <div className="absolute top-1/2 left-0 w-full h-6 -translate-y-1/2 bg-black rounded-sm border-b-4 border-gray-800"></div>
                  <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-black rounded-sm border-b-4 border-gray-800"></div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-4 transform -rotate-12">
                  <div className="w-10 h-10 rounded-full bg-[#fb7185] border-4 border-black shadow-[2px_2px_0_0_#000]"></div>
                  <div className="w-10 h-10 rounded-full bg-[#fde047] border-4 border-black shadow-[2px_2px_0_0_#000] mt-6"></div>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 bg-[#fde047] border-4 border-black p-4 rounded-full shadow-[4px_4px_0_0_#000] transform rotate-12 z-20 font-mono font-black text-xl">
              WOW!
            </div>
            <div className="absolute bottom-10 -left-10 bg-[#c084fc] border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0_0_#000] transform -rotate-12 z-20 font-mono font-black text-white">
              100% HP
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip */}
      <div className="bg-[#93c5fd] border-b-4 border-black py-6 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-black font-mono font-black uppercase text-sm md:text-base">
          {TRUST_POINTS.map((point, i) => {
            const Icon = getIcon(point.icon);
            return (
              <div key={i} className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 rounded-2xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-transform">
                <Icon className="w-5 h-5" strokeWidth={2.5} />
                {point.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Service Grid */}
      <section className="py-24 px-4 bg-[#fffbeb] border-b-4 border-black relative">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-6xl font-mono font-black uppercase tracking-tighter inline-block bg-white border-4 border-black px-8 py-4 rounded-[2rem] shadow-[8px_8px_0_0_#000] -rotate-1">
              What Do You Need <br/> <span className="text-[#fb7185]">Fixed?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {SERVICES.map((s, i) => {
              const Icon = getIcon(s.icon);
              const bgColor = PALETTE[i % PALETTE.length];
              return (
                <a href="#" key={i} className="group block outline-none">
                  <div className={`h-full ${bgColor} border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0_0_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[4px_4px_0_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex flex-col relative overflow-hidden`}>
                    <div className="bg-white border-4 border-black w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-[2px_2px_0_0_#000] group-hover:-rotate-12 transition-transform">
                      <Icon className="w-6 h-6 stroke-black" strokeWidth={3} />
                    </div>
                    <h3 className="font-mono font-black uppercase text-lg mb-2">{s.name}</h3>
                    <p className="font-bold text-sm bg-white/50 p-3 rounded-xl border-2 border-black flex-1">
                      {s.desc}
                    </p>
                    <div className="mt-4 font-mono font-black uppercase text-sm border-b-4 border-black self-start">
                      Learn More
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-24 px-4 bg-[#6ee7b7] border-b-4 border-black">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-black text-white font-mono font-black uppercase px-4 py-2 rounded-xl mb-6 shadow-[4px_4px_0_0_#fff] border-2 border-white -rotate-2">
              Level Up Your Repair
            </div>
            <h2 className="text-5xl md:text-7xl font-mono font-black uppercase tracking-tighter leading-none mb-8">
              Why Choose <br/><span className="text-white drop-shadow-[2px_2px_0_#000]">Gadget X</span>
            </h2>
            <p className="text-xl font-bold bg-white border-4 border-black p-6 rounded-3xl shadow-[6px_6px_0_0_#000] mb-8 relative">
              We've been fixing Houston's devices for {BUSINESS.yearsInBusiness} years. No gimmicks, just honest repairs and high scores.
              <span className="absolute -bottom-4 right-8 bg-[#fde047] border-4 border-black rounded-full w-8 h-8 shadow-[2px_2px_0_0_#000]"></span>
              <span className="absolute -bottom-8 right-4 bg-[#fde047] border-4 border-black rounded-full w-4 h-4 shadow-[2px_2px_0_0_#000]"></span>
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={i} className="bg-[#fffbeb] border-4 border-black p-6 rounded-3xl shadow-[6px_6px_0_0_#000] hover:-translate-y-2 transition-transform">
                  <div className="bg-[#c084fc] w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0_0_#000]">
                    <Icon className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <h4 className="font-mono font-black uppercase text-xl mb-2">{item.title}</h4>
                  <p className="font-bold text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Featured Offers & 8. We Sell Too */}
      <section className="py-24 px-4 bg-[#fffbeb] border-b-4 border-black">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Featured Offers */}
            <div>
              <h2 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tighter mb-8 inline-block bg-[#fde047] border-4 border-black px-6 py-2 rounded-2xl shadow-[6px_6px_0_0_#000] rotate-1">
                Featured <span className="text-[#fb7185]">Offers</span>
              </h2>
              <div className="space-y-4">
                {FEATURED_OFFERS.map((offer, i) => {
                  const Icon = getIcon(offer.icon);
                  return (
                    <div key={i} className="bg-white border-4 border-black p-4 rounded-3xl shadow-[6px_6px_0_0_#000] flex justify-between items-center group hover:bg-[#93c5fd] transition-colors relative overflow-hidden">
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center border-2 border-transparent group-hover:border-white transition-colors">
                          <Icon className="w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-lg font-mono font-black uppercase">{offer.title}</h4>
                          <div className="text-sm font-bold text-gray-600 group-hover:text-black">{offer.note}</div>
                        </div>
                      </div>
                      <div className="relative z-10 text-right">
                        <div className="text-xl font-mono font-black text-[#fb7185] group-hover:text-white drop-shadow-[1px_1px_0_#000]">{offer.price}</div>
                        <a href="#quote" className="text-xs font-black uppercase border-b-2 border-black inline-block hover:scale-105 transition-transform">Claim</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* We Sell Too */}
            <div>
              <h2 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tighter mb-8 inline-block bg-[#fb7185] border-4 border-black px-6 py-2 rounded-2xl shadow-[6px_6px_0_0_#000] -rotate-2 text-white">
                We Sell <span className="text-[#fde047] drop-shadow-[2px_2px_0_#000]">Devices</span>
              </h2>
              <p className="text-lg font-bold bg-white border-4 border-black p-6 rounded-2xl shadow-[4px_4px_0_0_#000] mb-8">
                {BUSINESS.tagline}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {SELL_PRODUCTS.map((product, i) => {
                  const Icon = getIcon(product.icon);
                  const bgColor = PALETTE[i % PALETTE.length];
                  return (
                    <div key={i} className={`${bgColor} border-4 border-black aspect-video flex flex-col items-center justify-center rounded-3xl shadow-[4px_4px_0_0_#000] p-4 text-center hover:scale-105 transition-transform`}>
                      <div className="bg-white p-2 rounded-full border-2 border-black mb-2 shadow-[2px_2px_0_0_#000]">
                        <Icon className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <span className="font-mono font-black uppercase text-sm leading-tight">{product.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Prepaid Plans & 10. Service Areas */}
      <section className="py-16 px-4 bg-[#c084fc] border-b-4 border-black text-black">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0_0_#000] rotate-1">
            <h3 className="text-2xl font-mono font-black uppercase mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 fill-[#fde047] border-black" /> Prepaid Plans
            </h3>
            <div className="flex flex-wrap gap-3">
              {PREPAID_CARRIERS.map(carrier => (
                <span key={carrier} className="bg-[#6ee7b7] border-2 border-black px-4 py-2 rounded-xl font-bold uppercase text-sm shadow-[2px_2px_0_0_#000]">
                  {carrier}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0_0_#000] -rotate-1">
            <h3 className="text-2xl font-mono font-black uppercase mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 fill-[#fb7185] border-black" /> Service Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map(area => (
                <span key={area} className="bg-[#93c5fd] border-2 border-black px-3 py-1.5 rounded-lg font-bold uppercase text-xs shadow-[2px_2px_0_0_#000]">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-black pt-20 pb-24 text-white">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="bg-white p-2 rounded-2xl border-4 border-white inline-block mb-6 rotate-2">
              <img
                src={BUSINESS.logoOfficial}
                alt={BUSINESS.name}
                className="h-10 object-contain rounded-xl bg-black"
              />
            </div>
            <p className="text-sm font-bold text-gray-400 mb-6 max-w-xs">
              {BUSINESS.tagline}
            </p>
            <div className="font-mono font-black uppercase text-[#fde047] text-xl">
              {BUSINESS.yearsInBusiness} Years Active
            </div>
          </div>
          
          <div>
            <h4 className="font-mono font-black uppercase text-xl mb-6 text-[#6ee7b7]">Contact</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><a href={BUSINESS.phoneTel} className="hover:text-[#fb7185] transition-colors flex items-center gap-2"><Phone className="w-4 h-4"/> {BUSINESS.phoneDisplay}</a></li>
              <li><a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#fb7185] transition-colors flex items-center gap-2"><MessageCircle className="w-4 h-4"/> WhatsApp</a></li>
              <li><a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="hover:text-[#fb7185] transition-colors flex items-center gap-2"><MapPin className="w-4 h-4"/> {BUSINESS.addressLine1}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-black uppercase text-xl mb-6 text-[#c084fc]">Hours</h4>
            <ul className="space-y-3 font-bold text-sm text-gray-400">
              {BUSINESS.hours.map((h) => (
                <li key={h.day} className="flex justify-between border-b-2 border-gray-800 pb-2">
                  <span className="uppercase text-white">{h.day}</span> <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-black uppercase text-xl mb-6 text-[#fb7185]">Links</h4>
            <div className="grid grid-cols-2 gap-2 font-bold text-sm">
              {FOOTER_LINKS.repair.slice(0, 4).map((link) => (
                <a key={link} href="#" className="hover:text-[#fde047] transition-colors">{link}</a>
              ))}
              {FOOTER_LINKS.shop.slice(0, 4).map((link) => (
                <a key={link} href="#" className="hover:text-[#fde047] transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-[1240px] mx-auto px-4 mt-16 pt-8 border-t-4 border-gray-800 text-center text-sm font-mono font-bold uppercase text-gray-500">
          {COPYRIGHT}
        </div>
      </footer>

      {/* Sticky Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#fffbeb] border-t-4 border-black p-3 z-50">
        <div className="grid grid-cols-3 gap-2">
          <a href={BUSINESS.phoneTel} className="bg-[#fb7185] border-4 border-black rounded-xl py-2 font-mono font-black uppercase text-xs text-center shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:shadow-none">
            Call
          </a>
          <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="bg-[#6ee7b7] border-4 border-black rounded-xl py-2 font-mono font-black uppercase text-xs text-center shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:shadow-none">
            Map
          </a>
          <a href="#quote" className="bg-[#fde047] border-4 border-black rounded-xl py-2 font-mono font-black uppercase text-xs text-center shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:shadow-none">
            Quote
          </a>
        </div>
      </div>
    </div>
  );
}
