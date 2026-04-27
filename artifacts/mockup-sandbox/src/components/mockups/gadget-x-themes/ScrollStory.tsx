import React, { useEffect } from "react";
import { BUSINESS, HERO, TRUST_POINTS, SERVICES, WHY_CHOOSE, FEATURED_OFFERS, SELL_PRODUCTS, PREPAID_CARRIERS, SERVICE_AREAS, FOOTER_LINKS, COPYRIGHT } from "./_content";
import { ArrowRight, MapPin, Phone, Star, Wrench, Smartphone, Tablet, Laptop, Gamepad2, Headphones, Check, Zap, Shield, ArrowDown } from "lucide-react";

export function ScrollStory() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "smartphone": return <Smartphone className="w-5 h-5" />;
      case "tablet": return <Tablet className="w-5 h-5" />;
      case "laptop": return <Laptop className="w-5 h-5" />;
      case "gamepad": return <Gamepad2 className="w-5 h-5" />;
      case "headphones": return <Headphones className="w-5 h-5" />;
      case "wrench": return <Wrench className="w-5 h-5" />;
      case "star": return <Star className="w-5 h-5" />;
      case "zap": return <Zap className="w-5 h-5" />;
      case "shield": return <Shield className="w-5 h-5" />;
      case "check": return <Check className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans selection:bg-red-600 selection:text-white scroll-smooth relative">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <a href="#" onClick={(e) => scrollTo(e, 'scene-1')} className="block bg-zinc-950 px-3 py-2">
                <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-6 w-auto object-contain" />
              </a>
              <span className="hidden sm:inline-block font-black tracking-tight text-xs uppercase text-zinc-500">Houston, TX</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Story', 'What We Fix', 'Why Us', 'Visit'].map((item) => {
                const id = `scene-${item === 'Story' ? '2' : item === 'What We Fix' ? '3' : item === 'Why Us' ? '4' : '5'}`;
                return (
                  <a key={item} href={`#${id}`} onClick={(e) => scrollTo(e, id)} className="text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-red-600 transition-colors">
                    {item}
                  </a>
                );
              })}
            </div>
            <div>
              <a href={BUSINESS.phoneTel} className="text-xs font-black uppercase tracking-widest text-zinc-950 hover:text-red-600 transition-colors border-b-2 border-zinc-950 hover:border-red-600 pb-1">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Scene 1: Opening */}
      <section id="scene-1" className="min-h-[calc(100vh-64px)] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="max-w-4xl">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-zinc-950 mb-12">
            Fifteen Years / <br />
            Houston / <br />
            <span className="text-red-600">Every Gadget</span> <br />
            You Carry
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-600 max-w-prose leading-relaxed mb-16 border-l-4 border-zinc-300 pl-6">
            {HERO.subhead}
          </p>
          <a href="#scene-5" onClick={(e) => scrollTo(e, 'scene-5')} className="inline-flex items-center gap-3 bg-zinc-950 text-white font-black uppercase tracking-widest text-sm px-8 py-4 hover:bg-red-600 transition-colors shadow-[8px_8px_0_0_rgba(220,38,38,0.2)] hover:shadow-[4px_4px_0_0_rgba(220,38,38,0.5)] hover:translate-x-1 hover:translate-y-1">
            Visit the shop <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      <hr className="border-zinc-200" />

      {/* Scene 2: The Shop */}
      <section id="scene-2" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-4">— The Story</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              More Than a Repair Shop.<br />A Houston Institution.
            </h3>
            <div className="prose prose-lg prose-zinc text-zinc-600 font-medium leading-relaxed max-w-prose">
              <p>
                Since 2010, Gadget X has been a cornerstone of Houston's tech community. Started as a small workbench operation at 8389 Almeda Rd, we've grown through word-of-mouth and an obsession with doing things right.
              </p>
              <p>
                We don't just swap parts. We diagnose, we troubleshoot, and we revive devices that others say are dead. Whether it's a shattered iPhone screen, a MacBook logic board, or a gaming console that won't power on, our bench is where it comes back to life.
              </p>
            </div>
            <blockquote className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-snug border-l-8 border-red-600 pl-6 my-12 text-zinc-900">
              "We treat every device like it holds your entire life—because it usually does."
            </blockquote>
          </div>
          
          <div className="grid gap-6">
            <div className="bg-zinc-200 aspect-[4/3] w-full p-4 flex items-end shadow-[8px_8px_0_0_#18181b]">
              <span className="bg-white px-3 py-1 font-black uppercase tracking-widest text-xs text-zinc-950">Shop Floor</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-zinc-200 aspect-square w-full p-4 flex items-end shadow-[8px_8px_0_0_#18181b]">
                <span className="bg-white px-3 py-1 font-black uppercase tracking-widest text-xs text-zinc-950">The Bench</span>
              </div>
              <div className="bg-zinc-200 aspect-square w-full p-4 flex items-end shadow-[8px_8px_0_0_#18181b]">
                <span className="bg-white px-3 py-1 font-black uppercase tracking-widest text-xs text-zinc-950">The Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-zinc-200" />

      {/* Scene 3: What We Fix */}
      <section id="scene-3" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-12 text-center">— What We Fix</h2>
        
        <div className="space-y-4">
          {SERVICES.map((service, index) => (
            <div key={index} className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 border-b border-zinc-200 hover:border-red-600 transition-colors">
              <div className="text-zinc-300 font-black text-3xl md:text-4xl tracking-tighter w-12 group-hover:text-red-600 transition-colors">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-950">{service.name}</h3>
                <p className="text-zinc-500 font-medium mt-1">{service.desc}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <span className="bg-zinc-100 text-zinc-600 font-bold uppercase tracking-widest text-xs px-3 py-1 rounded-full whitespace-nowrap">
                  Same Day*
                </span>
                <div className="text-zinc-400 group-hover:text-red-600 transition-colors">
                  {getIcon(service.icon)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-500 font-medium mt-8 text-center uppercase tracking-widest">*Most repairs completed same-day. Subject to part availability.</p>
      </section>

      {/* Scene 4: Why Us (Dark Spotlight) */}
      <section id="scene-4" className="bg-zinc-950 text-white py-32 border-y-8 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-black uppercase tracking-widest text-red-500 mb-16 text-center">— The Gadget X Difference</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {WHY_CHOOSE.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 border-2 border-zinc-800 text-red-500 mb-6 shadow-[4px_4px_0_0_#ef4444] transform -rotate-3 hover:rotate-0 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-zinc-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scene 5: Visit */}
      <section id="scene-5" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center bg-white p-8 md:p-12 border-4 border-zinc-950 shadow-[16px_16px_0_0_#18181b]">
          <div className="order-2 lg:order-1 h-[400px] bg-zinc-200 border-4 border-zinc-950 relative">
             <iframe
              src={BUSINESS.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
              className="absolute inset-0 grayscale contrast-125"
            ></iframe>
          </div>
          <div className="order-1 lg:order-2 space-y-10">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-4">— Visit the Shop</h2>
              <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                Walk In.<br />
                We'll Take<br />
                A Look.
              </h3>
            </div>
            
            <div className="space-y-6 text-lg font-medium text-zinc-600">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <p className="text-zinc-950 font-bold uppercase tracking-widest text-sm mb-1">Location</p>
                  <p>{BUSINESS.addressLine1}</p>
                  <p>{BUSINESS.addressLine2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <p className="text-zinc-950 font-bold uppercase tracking-widest text-sm mb-1">Hours</p>
                  <p>{BUSINESS.hoursShort}</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row gap-4">
              <a href={BUSINESS.phoneTel} className="flex-1 flex items-center justify-center gap-3 bg-zinc-950 text-white font-black uppercase tracking-widest text-sm px-6 py-4 hover:bg-red-600 transition-colors">
                <Phone className="w-4 h-4" /> Call Us
              </a>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 bg-white text-zinc-950 border-4 border-zinc-950 font-black uppercase tracking-widest text-sm px-6 py-4 hover:bg-zinc-100 transition-colors">
                <Smartphone className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 6: Footer */}
      <footer className="bg-zinc-100 border-t border-zinc-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="bg-zinc-950 px-4 py-3 shrink-0">
               <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-8 w-auto object-contain" />
            </div>
            <div className="text-center md:text-right">
              <p className="font-bold text-zinc-950 uppercase tracking-widest text-sm mb-1">Serving Houston for 15 Years</p>
              <p className="text-sm font-medium text-zinc-500">{BUSINESS.tagline}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pt-8 border-t border-zinc-300 text-sm">
            <div>
              <p className="font-black uppercase tracking-widest text-zinc-950 mb-4">Repair</p>
              <ul className="space-y-2 font-medium text-zinc-600">
                {FOOTER_LINKS.repair.map(link => <li key={link}><a href="#" className="hover:text-red-600 transition-colors">{link}</a></li>)}
              </ul>
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-zinc-950 mb-4">Shop</p>
              <ul className="space-y-2 font-medium text-zinc-600">
                {FOOTER_LINKS.shop.map(link => <li key={link}><a href="#" className="hover:text-red-600 transition-colors">{link}</a></li>)}
              </ul>
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-zinc-950 mb-4">Prepaid</p>
              <ul className="space-y-2 font-medium text-zinc-600">
                {FOOTER_LINKS.prepaid.map(link => <li key={link}><a href="#" className="hover:text-red-600 transition-colors">{link}</a></li>)}
              </ul>
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-zinc-950 mb-4">Company</p>
              <ul className="space-y-2 font-medium text-zinc-600">
                {FOOTER_LINKS.company.map(link => <li key={link}><a href="#" className="hover:text-red-600 transition-colors">{link}</a></li>)}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-300 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <p>{COPYRIGHT}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-zinc-950 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-950 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
