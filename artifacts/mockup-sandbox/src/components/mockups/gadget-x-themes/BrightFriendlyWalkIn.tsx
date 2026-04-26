import React from "react";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Headphones,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  Zap,
  Wrench,
  ChevronRight,
  Menu,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Search,
  Battery,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

type IconName =
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

const ICON_MAP: Record<IconName, LucideIcon> = {
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

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name as IconName] ?? Wrench;
}

const SERVICE_PALETTE: Array<{ color: string; bg: string }> = [
  { color: "text-blue-600", bg: "bg-blue-100" },
  { color: "text-green-600", bg: "bg-green-100" },
  { color: "text-purple-600", bg: "bg-purple-100" },
  { color: "text-orange-600", bg: "bg-orange-100" },
  { color: "text-slate-700", bg: "bg-slate-200" },
  { color: "text-cyan-600", bg: "bg-cyan-100" },
  { color: "text-indigo-600", bg: "bg-indigo-100" },
  { color: "text-emerald-600", bg: "bg-emerald-100" },
  { color: "text-red-600", bg: "bg-red-100" },
  { color: "text-pink-600", bg: "bg-pink-100" },
];

const SELL_ACCENTS = [
  "text-blue-400",
  "text-purple-400",
  "text-slate-300",
  "text-green-400",
  "text-pink-400",
];

const OFFER_TAGS = [
  "Most Popular",
  "Quick Fix",
  "Console Repair",
  "In Stock",
  "Free Setup",
];

export function BrightFriendlyWalkIn() {
  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 selection:bg-red-100 selection:text-red-900 pb-20 md:pb-0 relative">
      
      {/* 1. Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs font-medium py-2 px-4">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              {BUSINESS.addressFull}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              {BUSINESS.hoursShort}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border-0 rounded-full px-2 py-0.5 text-[10px] tracking-wide uppercase shadow-none">
              {HERO.badgeSameDay}
            </Badge>
            <a href={BUSINESS.phoneTel} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-green-400" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img 
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              className="h-10 w-auto object-contain"
            />
          </a>
          
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <a href="#" className="hover:text-red-500 transition-colors">Repair</a>
            <a href="#" className="hover:text-red-500 transition-colors">Sell</a>
            <a href="#" className="hover:text-red-500 transition-colors">Accessories</a>
            <a href="#" className="hover:text-red-500 transition-colors">Prepaid</a>
            <a href="#" className="hover:text-red-500 transition-colors">Locations</a>
            <a href="#" className="hover:text-red-500 transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <a href={BUSINESS.phoneTel} className="hidden sm:inline-flex">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full font-bold px-6 shadow-md shadow-red-500/20 transition-transform active:scale-95">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
            <button className="lg:hidden p-2 text-slate-500 hover:text-slate-800">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50 to-white pt-12 pb-24 md:pt-20 md:pb-32 px-4">
        {/* Decorative background shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-40 -left-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-[1240px] mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex flex-wrap items-center gap-2 mb-6 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full shadow-sm text-sm font-bold text-green-700 border border-green-200">
                <Zap className="w-4 h-4 fill-green-500 text-green-600" />
                {HERO.badgeSameDay}
              </span>
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-red-600 border border-red-100">
                <Star className="w-4 h-4 fill-red-500 text-red-500" />
                {HERO.badgeYears}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-900 to-red-500">
                {HERO.h1}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {HERO.subhead}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              {HERO.ctas.map((cta, i) => {
                const Icon = getIcon(cta.icon);
                const isPrimary = cta.kind === "primary";
                const isSecondary = cta.kind === "secondary";
                const buttonClass = isPrimary
                  ? "w-full bg-red-500 hover:bg-red-600 text-white rounded-full font-bold h-14 px-8 text-base shadow-lg shadow-red-500/30 transition-transform hover:-translate-y-0.5"
                  : isSecondary
                  ? "w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold h-14 px-8 text-base shadow-lg shadow-slate-900/20 transition-transform hover:-translate-y-0.5"
                  : "w-full border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-full font-bold h-14 px-8 text-base bg-white transition-transform hover:-translate-y-0.5";
                return (
                  <a
                    key={i}
                    href={cta.href}
                    target={cta.href.startsWith("http") ? "_blank" : undefined}
                    rel={cta.href.startsWith("http") ? "noreferrer" : undefined}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      variant={isPrimary || isSecondary ? "default" : "outline"}
                      className={buttonClass}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {cta.label}
                    </Button>
                  </a>
                );
              })}
            </div>
            
            {/* Inline Lead Form */}
            <div id="quote" className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-md mx-auto lg:mx-0 relative">
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm transform rotate-3">
                Quick Estimate
              </div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Get a Free Quote
              </h3>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Device (e.g. iPhone 13)" className="bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-red-500" />
                  <Input placeholder="Issue (e.g. Screen)" className="bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-red-500" />
                </div>
                <div className="flex gap-3">
                  <Input placeholder="Phone Number" className="bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-red-500 flex-1" />
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold px-6">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Stylized Device Composition */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto hidden lg:block">
            {/* Main Phone */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-[500px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden z-20">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-3xl mx-auto w-32"></div>
              <div className="w-full h-full bg-gradient-to-br from-red-100 via-white to-red-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-500/40">
                  <Wrench className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 mb-2">Fixed Fast</h3>
                <p className="text-slate-500 font-medium">Good as new.</p>
                <div className="mt-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-sm font-bold text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Ready for pickup
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-12 -left-4 w-48 h-48 bg-blue-50 rounded-3xl shadow-lg border-4 border-white rotate-[-12deg] z-10 flex items-center justify-center">
              <Gamepad2 className="w-16 h-16 text-blue-300" />
            </div>
            <div className="absolute bottom-16 -right-8 w-56 h-40 bg-green-50 rounded-3xl shadow-lg border-4 border-white rotate-[8deg] z-10 flex items-center justify-center">
              <Laptop className="w-20 h-20 text-green-300" />
            </div>
            <div className="absolute top-32 -right-4 w-24 h-24 bg-yellow-50 rounded-full shadow-lg border-4 border-white z-30 flex items-center justify-center">
              <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip */}
      <div className="bg-slate-900 py-6 text-white border-y-4 border-red-500">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4 text-sm font-bold">
            {TRUST_POINTS.map((point, i) => {
              const Icon = getIcon(point.icon);
              const accent =
                point.icon === "shield"
                  ? "text-green-400"
                  : point.icon === "smartphone"
                  ? "text-blue-400"
                  : "text-yellow-400 fill-yellow-400";
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${accent}`} />
                    {point.label}
                  </div>
                  {i < TRUST_POINTS.length - 1 && (
                    <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Service Grid */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">What do you need fixed?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Expert repairs for all your daily devices. Drop it off broken, pick it up working.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {SERVICES.map((service, i) => {
              const Icon = getIcon(service.icon);
              const palette = SERVICE_PALETTE[i % SERVICE_PALETTE.length];
              return (
                <a href="#" key={i} className="group block h-full">
                  <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-6 bg-white hover:-translate-y-1 relative overflow-hidden flex flex-col">
                    {/* Decorative background circle on hover */}
                    <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${palette.bg} mix-blend-multiply`}></div>
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${palette.bg} ${palette.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">{service.name}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-6 flex-1">{service.desc}</p>
                    <div className="flex items-center text-sm font-bold text-red-500 group-hover:text-red-600">
                      Learn more <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Gadget X */}
      <section className="py-20 px-4 bg-white relative">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Houston's trusted neighborhood repair shop.</h2>
              <p className="text-lg text-slate-600 font-medium mb-10">
                We're not a faceless corporate chain. We're local experts who have been fixing Houston's devices for over {BUSINESS.yearsInBusiness} years. We care about getting you back online quickly and affordably.
              </p>
              
              <div className="space-y-6">
                {WHY_CHOOSE.map((feature, i) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-50 flex-shrink-0 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{feature.title}</h4>
                        <p className="text-slate-600 font-medium">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-[500px] mx-auto bg-slate-100 rounded-[3rem] p-10 flex flex-col justify-center relative">
                {/* Abstract graphic representing tools/expertise */}
                <div className="absolute top-10 right-10 opacity-10">
                  <Wrench className="w-40 h-40" />
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl relative z-10 border border-slate-100">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-xl font-medium text-slate-700 italic leading-relaxed mb-6">
                    "My iPhone screen was completely shattered. Walked into Gadget X and they had it looking brand new in under 45 minutes. Super friendly guys and great price!"
                  </p>
                  <div className="font-bold text-slate-900">— Sarah M., Houston</div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-red-500 text-white p-6 rounded-3xl shadow-lg z-20 transform -rotate-3">
                  <div className="text-4xl font-extrabold mb-1">15k+</div>
                  <div className="font-medium text-red-100">Devices Repaired</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Offers */}
      <section className="py-20 px-4 bg-red-50/50 border-y border-red-100">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold mb-2">Popular Repairs & Offers</h2>
              <p className="text-slate-600 font-medium">Straightforward pricing. No hidden fees.</p>
            </div>
            <Button variant="outline" className="rounded-full font-bold border-2 border-slate-200">
              View all pricing
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {FEATURED_OFFERS.map((offer, i) => {
              const Icon = getIcon(offer.icon);
              return (
                <Card key={i} className="rounded-3xl border-0 shadow-md p-6 bg-white relative overflow-hidden group flex flex-col">
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10">
                    {OFFER_TAGS[i % OFFER_TAGS.length]}
                  </div>
                  <Icon className="w-10 h-10 text-slate-300 mb-6 group-hover:text-red-500 transition-colors" />
                  <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                  <div className="text-2xl font-extrabold text-red-500 mb-2">{offer.price}</div>
                  <p className="text-sm text-slate-500 font-medium mb-6 flex-1">{offer.note}</p>
                  <Button className="w-full rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900 font-bold shadow-none">
                    Get Quote
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. We Sell Too */}
      <section className="py-20 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-[1240px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase mb-6">
                Sales & Trade-ins
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Need a new device? <br/><span className="text-blue-400">We sell them too.</span></h2>
              <p className="text-lg text-slate-300 font-medium mb-8 max-w-xl">
                Looking for an upgrade without the carrier contract? We carry a wide selection of unlocked phones, iPads, MacBooks, laptops, and gaming consoles.
              </p>
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold h-12 px-8">
                Browse inventory <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {SELL_PRODUCTS.map((product, i) => {
                const Icon = getIcon(product.icon);
                const accent = SELL_ACCENTS[i % SELL_ACCENTS.length];
                const offset = i % 2 === 1 ? "transform translate-y-6" : "";
                return (
                  <div
                    key={i}
                    className={`bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:bg-slate-800 transition-colors ${offset}`}
                  >
                    <Icon className={`w-12 h-12 ${accent}`} />
                    <span className="font-bold">{product.name}</span>
                    <span className="text-xs text-slate-400 font-medium">{product.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Prepaid Plans & 10. Service Areas */}
      <section className="py-12 px-4 bg-white border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Prepaid */}
          <div className="md:pr-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> Prepaid Activations
            </h3>
            <p className="text-slate-600 text-sm font-medium mb-4">We activate lines and pay bills for major prepaid carriers.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {PREPAID_CARRIERS.map((carrier, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-800 text-sm font-bold rounded-lg border border-slate-200">
                  {carrier}
                </span>
              ))}
            </div>
            <a href="#" className="text-red-500 font-bold text-sm hover:underline flex items-center">
              See plans <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          {/* Service Areas */}
          <div className="pt-12 md:pt-0 md:pl-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-500" /> Service Areas
            </h3>
            <p className="text-slate-600 text-sm font-medium mb-4">Proudly serving the greater Houston metro area.</p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-800 text-sm font-bold rounded-full border border-blue-100">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Visit Us / Location */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-16">
                <h2 className="text-3xl font-extrabold mb-8">Come visit the shop</h2>
                
                <div className="flex gap-4 mb-8">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {BUSINESS.name}<br />
                      {BUSINESS.addressLine1}<br />
                      {BUSINESS.addressLine2}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-bold text-lg mb-3">Hours</h4>
                    <div className="space-y-2 text-slate-600 font-medium max-w-xs">
                      {BUSINESS.hours.map((h, i) => (
                        <div
                          key={i}
                          className={`flex justify-between ${
                            i < BUSINESS.hours.length - 1 ? "border-b border-slate-100 pb-2" : "pt-1"
                          }`}
                        >
                          <span>{h.day}</span>
                          <span className="font-bold text-slate-900">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <a href={BUSINESS.phoneTel}>
                    <Button className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                  </a>
                  <a href={BUSINESS.sms}>
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                      <MessageCircle className="w-4 h-4 mr-2" /> Text Us
                    </Button>
                  </a>
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">
                    <Button className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold">
                      <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                    </Button>
                  </a>
                  <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-2 border-slate-900 text-slate-900 hover:bg-slate-50">
                      <Navigation className="w-4 h-4 mr-2" /> Directions
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* Live Google Map */}
              <div className="relative min-h-[360px] bg-slate-100 border-l border-slate-100">
                <iframe
                  src={BUSINESS.mapsEmbed}
                  width="100%"
                  height={360}
                  loading="lazy"
                  title="Gadget X Repairs location map"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full block border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-24 md:pb-8 px-4 text-slate-600 font-medium">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <img 
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              className="h-10 w-auto object-contain mb-6 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
            />
            <p className="max-w-md mb-6 text-sm leading-relaxed">
              {BUSINESS.tagline}
            </p>
            <div className="flex gap-4">
              <a href={BUSINESS.phoneTel} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href={BUSINESS.whatsapp} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-green-500 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={BUSINESS.mapsLink} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-500 hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Repair</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.repair.map((link, i) => (
                <li key={i}><a href="#" className="hover:text-red-500">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.shop.map((link, i) => (
                <li key={i}><a href="#" className="hover:text-red-500">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span>{BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                <a href={BUSINESS.phoneTel} className="hover:text-red-500">{BUSINESS.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span>{BUSINESS.hoursShort}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1240px] mx-auto pt-8 border-t border-slate-100 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>{COPYRIGHT}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* 13. Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 flex gap-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe md:hidden">
        <a href={BUSINESS.phoneTel} className="flex-1">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 flex flex-col gap-0.5 items-center justify-center">
            <Phone className="w-4 h-4" />
            <span className="text-[10px]">Call</span>
          </Button>
        </a>
        <a href={BUSINESS.whatsapp} className="flex-1">
          <Button variant="outline" className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200 rounded-xl font-bold h-12 flex flex-col gap-0.5 items-center justify-center">
            <MessageCircle className="w-4 h-4" />
            <span className="text-[10px]">WhatsApp</span>
          </Button>
        </a>
        <a href={BUSINESS.mapsLink} className="flex-1">
          <Button variant="outline" className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 rounded-xl font-bold h-12 flex flex-col gap-0.5 items-center justify-center">
            <Navigation className="w-4 h-4" />
            <span className="text-[10px]">Directions</span>
          </Button>
        </a>
      </div>

    </div>
  );
}
