import React, { useState } from "react";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Headphones,
  Wrench,
  Zap,
  Shield,
  Star,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Droplet,
  BatteryWarning,
  AlertTriangle,
  Send
} from "lucide-react";
import {
  BUSINESS,
  HERO,
  TRUST_POINTS,
  SERVICES,
  WHY_CHOOSE,
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
  shield: Shield,
  star: Star,
  map: MapPin,
  phone: Phone,
};

type WizardStep = 1 | 2 | 3 | 4;

export function QuoteWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [device, setDevice] = useState("");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [name, setName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const handleNext = () => setStep((s) => Math.min(s + 1, 4) as WizardStep);
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as WizardStep);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I need a quote for a ${device} (${model}). Issue: ${issue}. Name: ${name}.`;
    const url = `https://wa.me/13466236898?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950 font-sans selection:bg-red-500 selection:text-white flex flex-col">
      {/* HEADER */}
      <header className="bg-zinc-950 border-b-4 border-red-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="block bg-zinc-950 p-2 shrink-0">
              <img
                src={BUSINESS.logoOfficial}
                alt={BUSINESS.name}
                className="h-10 w-auto object-contain block"
              />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end text-zinc-300">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Call Us Direct</span>
              <a href={BUSINESS.phoneTel} className="font-black text-lg hover:text-white transition-colors">{BUSINESS.phoneDisplay}</a>
            </div>
            <a
              href={BUSINESS.phoneTel}
              className="bg-red-600 text-white font-black uppercase px-5 py-2 text-sm tracking-widest shadow-[4px_4px_0_0_#fff] hover:shadow-[2px_2px_0_0_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Call Now
            </a>
          </div>
        </div>
      </header>

      {/* HERO & WIZARD */}
      <section className="flex-1 max-w-7xl mx-auto px-4 py-12 md:py-20 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: The Wizard (70%) */}
        <div className="lg:col-span-8 w-full">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
              Get Your <span className="text-red-600">Repair Quote</span>
            </h1>
            <p className="text-xl font-bold text-zinc-600 uppercase tracking-tight">
              Tell us what's broken. We'll tell you how much to fix it. Fast.
            </p>
          </div>

          <div className="bg-white border-4 border-zinc-950 p-6 md:p-10 shadow-[12px_12px_0_0_#09090b]">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-200 pb-4">
              <div className="font-black uppercase tracking-widest text-sm text-zinc-500">
                Step <span className="text-zinc-950 text-xl">{step}</span> of 4
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-2 w-8 md:w-12 transition-colors ${
                      i <= step ? "bg-red-600" : "bg-zinc-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* WIZARD STEPS */}
            <div className="min-h-[320px]">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-6">What needs fixing?</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: "iPhone", icon: Smartphone },
                      { name: "Android", icon: Smartphone },
                      { name: "iPad", icon: Tablet },
                      { name: "MacBook", icon: Laptop },
                      { name: "Game Console", icon: Gamepad2 },
                      { name: "Other", icon: Wrench },
                    ].map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setDevice(cat.name);
                          handleNext();
                        }}
                        className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-zinc-300 hover:border-zinc-950 hover:bg-zinc-50 transition-all font-bold uppercase tracking-wide text-sm group"
                      >
                        <cat.icon className="w-8 h-8 text-zinc-400 group-hover:text-red-600 transition-colors" />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Which model?</h2>
                  <p className="text-zinc-500 font-bold mb-4 uppercase text-sm tracking-wide">Common Models</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {["iPhone 13", "iPhone 14 Pro", "Samsung S22", "iPad Pro", "MacBook Air", "PS5"].map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setModel(m);
                          handleNext();
                        }}
                        className="bg-zinc-100 border-2 border-zinc-200 hover:border-zinc-950 px-4 py-2 font-bold uppercase tracking-wide text-sm transition-colors"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <label className="block text-zinc-500 font-bold mb-2 uppercase text-sm tracking-wide">Or type your model</label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="e.g. iPhone 12 Mini"
                        className="flex-1 bg-zinc-50 border-2 border-zinc-300 focus:border-red-600 focus:ring-0 px-4 py-3 font-bold uppercase"
                      />
                      <button
                        onClick={handleNext}
                        disabled={!model}
                        className="bg-zinc-950 text-white px-6 font-black uppercase tracking-widest hover:bg-red-600 transition-colors disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-6">What's wrong with it?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { issue: "Cracked Screen", icon: AlertTriangle },
                      { issue: "Battery Dying Fast", icon: BatteryWarning },
                      { issue: "Water Damage", icon: Droplet },
                      { issue: "Won't Turn On", icon: Zap },
                      { issue: "Broken Port", icon: Wrench },
                      { issue: "Not Sure / Other", icon: Shield },
                    ].map((i) => (
                      <button
                        key={i.issue}
                        onClick={() => {
                          setIssue(i.issue);
                          handleNext();
                        }}
                        className="flex items-center gap-4 p-4 border-2 border-zinc-300 hover:border-zinc-950 hover:bg-zinc-50 transition-all text-left group"
                      >
                        <div className="bg-zinc-100 p-2 group-hover:bg-red-100 transition-colors">
                          <i.icon className="w-5 h-5 text-zinc-500 group-hover:text-red-600 transition-colors" />
                        </div>
                        <span className="font-bold uppercase tracking-wide text-sm">{i.issue}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-2">How should we reach you?</h2>
                  <p className="text-zinc-500 font-bold mb-6 uppercase text-sm tracking-wide">We'll text or call your quote right away.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-zinc-950 font-black mb-2 uppercase text-sm tracking-wide">First Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-red-600 px-4 py-3 font-bold uppercase"
                        placeholder="YOUR NAME"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-950 font-black mb-2 uppercase text-sm tracking-wide">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-red-600 px-4 py-3 font-bold uppercase"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 text-lg shadow-[6px_6px_0_0_#09090b] hover:shadow-[2px_2px_0_0_#09090b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3"
                    >
                      Get My Quote <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="mt-8 pt-6 border-t-2 border-zinc-100 flex justify-start">
              {step > 1 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-zinc-400 hover:text-zinc-950 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Info Column (30%) */}
        <div className="lg:col-span-4 w-full">
          <div className="bg-zinc-950 text-white p-8 shadow-[8px_8px_0_0_#ef4444] sticky top-24">
            <h3 className="font-black uppercase tracking-tighter text-2xl mb-6 flex items-center gap-3 text-red-500">
              <Zap className="w-6 h-6" /> Houston's Fix
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-zinc-500 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase tracking-wide text-sm text-zinc-300">Location</div>
                  <div className="font-bold text-zinc-100">{BUSINESS.addressLine1}</div>
                  <div className="font-bold text-zinc-400">{BUSINESS.addressLine2}</div>
                  <a href={BUSINESS.mapsLink} className="text-red-500 hover:text-red-400 font-bold text-xs uppercase tracking-widest mt-2 inline-block">Get Directions →</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-zinc-500 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase tracking-wide text-sm text-zinc-300">Hours</div>
                  <div className="font-bold text-zinc-100">{BUSINESS.hoursShort}</div>
                </div>
              </div>
              
              <div className="flex gap-4 border-t border-zinc-800 pt-6">
                <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase tracking-wide text-sm text-zinc-300 mb-1">We answer in &lt; 30 min</div>
                  <div className="font-bold text-zinc-400 text-sm">Submit the form and a real technician will get back to you with pricing.</div>
                </div>
              </div>

              <div className="flex gap-4 border-t border-zinc-800 pt-6">
                <Star className="w-6 h-6 text-zinc-500 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase tracking-wide text-sm text-zinc-300 mb-1">{BUSINESS.yearsInBusiness} Years in Business</div>
                  <div className="font-bold text-zinc-400 text-sm">Trusted by thousands with 5-star reviews.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-red-600 text-white border-y-4 border-zinc-950 py-6 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-7xl mx-auto px-4">
          {TRUST_POINTS.map((point, idx) => {
            const Icon = iconMap[point.icon] || Star;
            return (
              <div key={idx} className="flex items-center gap-2 font-black uppercase tracking-widest text-sm md:text-base">
                <Icon className="w-5 h-5 text-red-300" />
                {point.label}
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-950">Why Gadget X?</h2>
            <div className="w-24 h-2 bg-red-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {WHY_CHOOSE.slice(0, 3).map((item, idx) => {
              const Icon = iconMap[item.icon] || Star;
              return (
                <div key={idx} className="bg-zinc-50 border-4 border-zinc-950 p-8 shadow-[8px_8px_0_0_#09090b] hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-zinc-950 text-white w-16 h-16 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="font-black uppercase text-xl mb-3">{item.title}</h3>
                  <p className="font-bold text-zinc-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 pt-20 pb-12 border-t-8 border-red-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-12 w-auto mb-6 opacity-80 mix-blend-screen grayscale contrast-200" />
              <p className="text-zinc-400 font-bold max-w-sm mb-6 uppercase tracking-wide text-sm">{BUSINESS.tagline}</p>
              <div className="flex items-center gap-4 text-zinc-300 font-black text-xl">
                <Phone className="text-red-500 w-6 h-6" /> {BUSINESS.phoneDisplay}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-3 mb-6">Repair Services</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.repair.map((link, idx) => (
                  <li key={idx}><a href="#" className="text-zinc-400 hover:text-red-500 font-bold uppercase text-sm tracking-wide transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-3 mb-6">Company</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link, idx) => (
                  <li key={idx}><a href="#" className="text-zinc-400 hover:text-red-500 font-bold uppercase text-sm tracking-wide transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{COPYRIGHT}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
