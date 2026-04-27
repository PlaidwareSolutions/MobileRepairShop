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
  Star,
  Check,
  Shield,
  Zap,
  MessageCircle,
  ExternalLink,
  CarFront,
  Briefcase
} from "lucide-react";
import {
  BUSINESS,
  HERO,
  TRUST_POINTS,
  SERVICES,
  SERVICE_AREAS,
  FOOTER_LINKS,
  COPYRIGHT
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
  phone: Phone,
  map: MapPin,
};

const MOCK_REVIEWS = [
  { name: "Michael R.", date: "2 days ago", rating: 5, text: "Fixed my iPhone 13 screen in 45 minutes. Looks brand new and the price was exactly what they quoted over the phone." },
  { name: "Sarah T.", date: "1 week ago", rating: 5, text: "Brought in my son's PS5 that wouldn't turn on. They diagnosed it for free and had it running by the next day. Lifesavers!" },
  { name: "David L.", date: "2 weeks ago", rating: 5, text: "Honest and fast. Thought I needed a new charging port for my iPad, but they just cleaned it out and didn't even charge me. Will be back." },
  { name: "Jessica W.", date: "1 month ago", rating: 5, text: "Best repair shop in Houston. I've brought my whole family's devices here over the years and they always do a fantastic job with warranties." }
];

export function LocalStorefront() {
  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 = Sunday
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[currentDayIndex];
  
  const todayHours = BUSINESS.hours.find(h => h.day === currentDayName)?.time || "Closed";
  const isOpen = todayHours !== "Closed"; // Simplification for mockup purposes

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans selection:bg-red-500 selection:text-white">
      {/* HEADER / NAV - Minimal */}
      <header className="bg-white border-b-4 border-zinc-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-950 p-2">
              <img src={BUSINESS.logoOfficial} alt="Gadget X Logo" className="h-8 md:h-10 w-auto" />
            </div>
            <div className="hidden sm:block font-black uppercase text-xl tracking-tight leading-none">
              {BUSINESS.name}
            </div>
          </div>
          <div className="flex items-center gap-6 font-bold text-sm uppercase tracking-widest">
            <a href="#services" className="hidden md:block hover:text-red-600 transition-colors">Services</a>
            <a href="#reviews" className="hidden md:block hover:text-red-600 transition-colors">Reviews</a>
            <a href={BUSINESS.phoneTel} className="bg-red-600 text-white px-5 py-2.5 shadow-[4px_4px_0_0_#18181b] hover:shadow-[2px_2px_0_0_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12 md:space-y-16">
        
        {/* ABOVE THE FOLD: Split Hero (Map + Stat Card) */}
        <section className="grid lg:grid-cols-[55%_45%] gap-8 items-start">
          
          {/* Left 55%: Map & Direct CTA */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border-4 border-zinc-900 shadow-[8px_8px_0_0_#18181b] flex flex-col overflow-hidden">
              <div className="h-[300px] md:h-[400px] bg-zinc-200 relative border-b-4 border-zinc-900">
                <iframe 
                  src={BUSINESS.mapsEmbed} 
                  className="w-full h-full absolute inset-0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6 md:p-8 bg-white flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div>
                  <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2">Location</h2>
                  <p className="font-bold text-zinc-600 flex items-start gap-2 max-w-xs">
                    <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    {BUSINESS.addressFull}
                  </p>
                </div>
                <a 
                  href={BUSINESS.mapsLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="shrink-0 bg-white border-2 border-zinc-900 px-6 py-3 font-black uppercase text-sm tracking-widest shadow-[4px_4px_0_0_#18181b] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0_0_#18181b] transition-all flex items-center gap-2"
                >
                  Directions <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href={BUSINESS.phoneTel} className="bg-zinc-900 hover:bg-zinc-800 text-white p-6 border-4 border-zinc-900 shadow-[8px_8px_0_0_#18181b] hover:shadow-[4px_4px_0_0_#18181b] hover:translate-y-1 hover:translate-x-1 transition-all flex flex-col items-center justify-center text-center gap-3">
                <Phone className="w-8 h-8 text-red-500" />
                <div>
                  <div className="font-black uppercase tracking-widest text-xs text-zinc-400 mb-1">Call the shop</div>
                  <div className="font-black text-xl md:text-2xl tracking-tighter">{BUSINESS.phoneDisplay}</div>
                </div>
              </a>
              <a href={BUSINESS.whatsapp} className="bg-white hover:bg-zinc-50 text-zinc-900 p-6 border-4 border-zinc-900 shadow-[8px_8px_0_0_#18181b] hover:shadow-[4px_4px_0_0_#18181b] hover:translate-y-1 hover:translate-x-1 transition-all flex flex-col items-center justify-center text-center gap-3">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-black uppercase tracking-widest text-xs text-zinc-500 mb-1">Message us</div>
                  <div className="font-black text-xl md:text-2xl tracking-tighter">WhatsApp</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right 45%: Stat Card */}
          <div className="bg-white border-4 border-zinc-900 p-8 md:p-12 shadow-[12px_12px_0_0_#18181b] flex flex-col gap-8 h-full">
            <div className="flex flex-col items-center text-center pb-8 border-b-2 border-dashed border-zinc-200">
              <div className="bg-zinc-950 p-4 inline-block mb-6 shadow-[6px_6px_0_0_#ef4444]">
                <img src={BUSINESS.logoOfficial} alt="Gadget X" className="h-16 md:h-20 w-auto" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                {BUSINESS.name}
              </h1>
              <p className="font-bold text-zinc-500 max-w-sm mx-auto uppercase tracking-wide text-sm md:text-base leading-snug">
                {BUSINESS.tagline}
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="inline-flex items-center justify-center gap-2 bg-zinc-100 border-2 border-zinc-900 px-4 py-2 font-black uppercase tracking-widest text-lg">
                <Star className="w-6 h-6 text-red-600 fill-red-600" />
                4.9 / 5.0 <span className="text-zinc-400 text-sm ml-2">(480 Reviews)</span>
              </div>
              <div className="inline-flex items-center gap-2 text-green-600 font-black uppercase tracking-widest text-lg">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                {isOpen ? `Open Now • Closes at ${todayHours.split('–')[1]}` : 'Currently Closed'}
              </div>
            </div>

            <div className="mt-auto pt-8 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-100 border-2 border-zinc-200 px-3 py-3 flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-zinc-700">
                  <Shield className="w-5 h-5 text-zinc-900" /> 90-Day Warranty
                </div>
                <div className="bg-zinc-100 border-2 border-zinc-200 px-3 py-3 flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-zinc-700">
                  <Zap className="w-5 h-5 text-zinc-900" /> Same-Day Repair
                </div>
                <div className="bg-zinc-100 border-2 border-zinc-200 px-3 py-3 flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-zinc-700">
                  <Clock className="w-5 h-5 text-zinc-900" /> 15+ Years Exp.
                </div>
                <div className="bg-zinc-100 border-2 border-zinc-200 px-3 py-3 flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-zinc-700">
                  <Check className="w-5 h-5 text-zinc-900" /> Walk-ins Welcome
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BELOW THE FOLD */}
        
        {/* What We Fix Today */}
        <section id="services" className="bg-white border-4 border-zinc-900 shadow-[8px_8px_0_0_#18181b] p-8 md:p-12">
          <div className="mb-10 pb-6 border-b-4 border-zinc-900 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
                What We Fix <span className="text-red-600">Today</span>
              </h2>
              <p className="font-bold text-zinc-500 uppercase tracking-widest text-sm">In-store diagnosis & repairs.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Wrench;
              return (
                <div key={i} className="flex items-start gap-4 p-4 border-2 border-zinc-100 hover:border-red-200 hover:bg-zinc-50 transition-colors group">
                  <div className="bg-zinc-900 p-3 shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-lg tracking-tight leading-tight mb-1 group-hover:text-red-600 transition-colors">{service.name}</h3>
                    <p className="font-medium text-zinc-600 text-sm">{service.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Hours & Visiting Block */}
        <section className="grid lg:grid-cols-[1fr_2fr] gap-8">
          <div className="bg-red-600 text-white p-8 md:p-12 border-4 border-zinc-900 shadow-[8px_8px_0_0_#18181b] flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8">
              Store <br/>Hours
            </h2>
            <div className="flex flex-col gap-4">
              {BUSINESS.hours.map((h, i) => (
                <div key={i} className={`flex justify-between items-center pb-3 border-b-2 border-red-700/50 font-bold uppercase tracking-widest text-sm ${h.day === currentDayName ? 'text-white font-black' : 'text-red-100'}`}>
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-8 md:p-12 border-4 border-zinc-900 shadow-[8px_8px_0_0_#18181b] flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-10">
              Visiting The <span className="text-red-500">Shop</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="flex items-start gap-4">
                <CarFront className="w-8 h-8 text-zinc-500 shrink-0" />
                <div>
                  <h3 className="font-black uppercase text-xl tracking-tight mb-2">Parking</h3>
                  <p className="text-zinc-400 font-medium">Free parking available directly in front of our storefront in the shopping center lot.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Briefcase className="w-8 h-8 text-zinc-500 shrink-0" />
                <div>
                  <h3 className="font-black uppercase text-xl tracking-tight mb-2">What to bring</h3>
                  <p className="text-zinc-400 font-medium">Bring your device, its charger (if you have it), and a valid ID if you plan on selling a device to us.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 sm:col-span-2">
                <Clock className="w-8 h-8 text-zinc-500 shrink-0" />
                <div>
                  <h3 className="font-black uppercase text-xl tracking-tight mb-2">Turnaround Times</h3>
                  <p className="text-zinc-400 font-medium">Most phone screen and battery repairs are completed in 1-2 hours. Complex motherboard repairs or console jobs usually take 1-3 days. We'll give you a firm estimate upon drop-off.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Photos / Reviews */}
        <section id="reviews" className="bg-white border-4 border-zinc-900 shadow-[8px_8px_0_0_#18181b] p-8 md:p-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
                Customer <span className="text-red-600">Reviews</span>
              </h2>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-zinc-900 text-zinc-900" />)}
                </div>
                <span className="font-bold text-zinc-600 uppercase tracking-widest text-sm">4.9 Average</span>
              </div>
            </div>
            <a href="#" className="font-black uppercase text-sm tracking-widest border-b-2 border-zinc-900 pb-1 hover:text-red-600 hover:border-red-600 transition-colors">
              Read all Google Reviews
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_REVIEWS.map((review, i) => (
              <div key={i} className="bg-zinc-50 border-2 border-zinc-200 p-6 flex flex-col gap-4 hover:border-zinc-900 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-red-600 text-red-600" />)}
                  </div>
                  <span className="font-bold text-zinc-400 text-xs uppercase tracking-wider">{review.date}</span>
                </div>
                <p className="font-medium text-zinc-700 flex-1 italic text-sm">"{review.text}"</p>
                <div className="font-black uppercase tracking-tight text-zinc-900 mt-2">
                  — {review.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Areas */}
        <section className="bg-zinc-200 p-8 md:p-12 border-4 border-zinc-900 border-dashed text-center flex flex-col items-center gap-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter max-w-2xl mx-auto">
            Proudly serving Houston and surrounding communities for over 15 years
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {SERVICE_AREAS.map((area, i) => (
              <span key={i} className="bg-white border-2 border-zinc-900 px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#18181b]">
                {area}
              </span>
            ))}
          </div>
          <a href={BUSINESS.phoneTel} className="mt-4 bg-zinc-900 text-white px-8 py-4 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#ef4444] hover:shadow-[2px_2px_0_0_#ef4444] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2">
            <Phone className="w-4 h-4" /> Need a repair? Call Us
          </a>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-white py-12 border-t-8 border-red-600 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16">
            <div className="flex-1">
              <img src={BUSINESS.logoOfficial} alt="Gadget X" className="h-12 w-auto mb-6 opacity-80 mix-blend-screen" />
              <div className="space-y-4 font-bold text-zinc-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="max-w-xs">{BUSINESS.addressFull}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <a href={BUSINESS.phoneTel} className="hover:text-white transition-colors">{BUSINESS.phoneDisplay}</a>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-black uppercase tracking-widest text-white mb-4 text-sm">Services</h4>
                <ul className="space-y-2 font-bold text-zinc-500 text-sm">
                  {FOOTER_LINKS.repair.map((link, i) => <li key={i}><a href="#" className="hover:text-red-400 transition-colors">{link}</a></li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-white mb-4 text-sm">Shop</h4>
                <ul className="space-y-2 font-bold text-zinc-500 text-sm">
                  {FOOTER_LINKS.shop.map((link, i) => <li key={i}><a href="#" className="hover:text-red-400 transition-colors">{link}</a></li>)}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-black uppercase tracking-widest text-white mb-4 text-sm">Status</h4>
                <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 font-black uppercase text-xs tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Open Today
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <p>{COPYRIGHT}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
