import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Headphones,
  Wrench,
  ShieldCheck,
  Star,
  Zap,
  ChevronRight,
  Monitor,
  Watch,
  Battery,
  Cpu,
  ArrowRight
} from "lucide-react";

export function ElectricTech() {
  const [formData, setFormData] = useState({ name: "", device: "", issue: "", phone: "" });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote requested!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-sky-500/30 selection:text-sky-200 dark">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Top utility bar */}
        <div className="bg-slate-900/80 backdrop-blur-md border-b border-sky-500/20 text-xs py-2 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              8389 Almeda Rd, Suite J-2, Houston, TX 77054
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Sun 12PM-5PM | Mon-Sat 10AM-7PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono text-[10px]">
              Same-day repair
            </span>
            <a href="tel:+13466236898" className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-mono">
              <Phone className="w-3.5 h-3.5" />
              +1 (346) 623-6898
            </a>
          </div>
        </div>

        {/* 2. Header */}
        <header className="bg-slate-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <img src="/__mockup/images/gadget-x-logo.png" alt="Gadget X Repairs" className="h-10 object-contain invert brightness-0 saturate-100 sepia-[100%] hue-rotate-[190deg] contrast-[100%]" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#" className="hover:text-sky-400 transition-colors">Repair</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Sell</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Accessories</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Prepaid</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Locations</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <a 
                href="tel:+13466236898"
                className="hidden sm:flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2.5 rounded-md font-semibold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {/* 3. Hero */}
          <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 bg-slate-900 border border-sky-500/30 rounded-full px-4 py-1.5 text-sm text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Same-Day Repair Available</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                  Fast Phone, Tablet, Laptop & Game Console Repair in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Houston</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                  15 years of trusted experience. We fix your broken screens, batteries, and logic boards with precision tech. Most repairs completed same-day.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="tel:+13466236898"
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 py-3.5 rounded-md font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                  <a 
                    href="https://wa.me/13466236898"
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-sky-500/30 px-6 py-3.5 rounded-md font-bold transition-all"
                  >
                    <MessageCircle className="w-5 h-5 text-sky-400" />
                    WhatsApp Us
                  </a>
                </div>

                {/* Inline Quote Form */}
                <div className="mt-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 max-w-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-sky-400" />
                    Get a Free Quote
                  </h3>
                  <form onSubmit={handleQuoteSubmit} className="space-y-3 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Device (e.g. iPhone 13 Pro)" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                      value={formData.device}
                      onChange={e => setFormData({...formData, device: e.target.value})}
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Issue (e.g. Broken screen)" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                      value={formData.issue}
                      onChange={e => setFormData({...formData, issue: e.target.value})}
                      required
                    />
                    <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-sky-500/50 py-2.5 rounded-md text-sm font-semibold transition-all flex items-center justify-center gap-2 group/btn">
                      Request Quote
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Hero Visual - Tech Abstract */}
              <div className="relative hidden lg:block h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-md aspect-square">
                    {/* Glowing rings */}
                    <div className="absolute inset-0 border-[0.5px] border-sky-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
                    <div className="absolute inset-4 border border-sky-500/30 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-12 border-[0.5px] border-sky-500/10 rounded-full"></div>
                    
                    {/* Device abstract shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-80 bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_0_50px_rgba(14,165,233,0.2)] overflow-hidden backdrop-blur-xl">
                      <div className="absolute top-0 inset-x-0 h-10 border-b border-slate-800 flex justify-center items-center">
                        <div className="w-16 h-4 rounded-full bg-slate-950 border border-slate-800"></div>
                      </div>
                      <div className="absolute inset-x-4 top-14 bottom-4 rounded-xl border border-sky-500/30 bg-slate-950/50 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute w-[200%] h-px bg-sky-500/50 top-1/2 -translate-y-1/2 -rotate-45 group-hover:rotate-45 transition-transform duration-1000"></div>
                        <Smartphone className="w-16 h-16 text-sky-400 opacity-50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-sky-500/20 to-transparent opacity-50"></div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-20 right-10 w-24 h-24 bg-slate-900/80 border border-slate-700 rounded-xl backdrop-blur-md flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
                      <Cpu className="w-10 h-10 text-sky-400" />
                    </div>
                    <div className="absolute bottom-32 left-0 w-20 h-20 bg-slate-900/80 border border-slate-700 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                      <Battery className="w-8 h-8 text-sky-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Trust strip */}
          <section className="border-y border-slate-800 bg-slate-900/50 backdrop-blur-sm relative z-10">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-6">
              <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:justify-between items-center text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  15+ Years in Houston
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-sky-400" />
                  Same-Day Repair
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  90-Day Warranty
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  5-Star Reviews
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-sky-400" />
                  All Brands Welcome
                </div>
              </div>
            </div>
          </section>

          {/* 5. Service grid (10 services) */}
          <section className="py-24 relative">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Precision Repair Services</h2>
                <p className="text-slate-400 max-w-2xl">Expert diagnostics and repair for all your devices. We use high-quality parts and advanced technical procedures to bring your tech back to life.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {[
                  { icon: Smartphone, name: "iPhone Repair", desc: "Screen, battery, charging port & logic board repair for all models." },
                  { icon: Smartphone, name: "Android & Cellphone", desc: "Samsung, Google Pixel, Motorola and other major brands." },
                  { icon: Tablet, name: "iPad Repair", desc: "Digitizer replacement, LCD repair, and battery service." },
                  { icon: Tablet, name: "Tablet Repair", desc: "Samsung Tab, Surface, and other Android/Windows tablets." },
                  { icon: Laptop, name: "MacBook Repair", desc: "Screen assembly, keyboard, battery, and component level repair." },
                  { icon: Monitor, name: "Laptop Repair", desc: "PC laptops, Chromebooks. Screen, battery, and hinge repair." },
                  { icon: Gamepad2, name: "PlayStation Repair", desc: "PS5, PS4 HDMI port repair, disc drive issues, and overheating." },
                  { icon: Gamepad2, name: "Xbox Repair", desc: "Xbox Series X/S, One repair. Power issues, port replacement." },
                  { icon: Gamepad2, name: "Nintendo Switch", desc: "Joy-Con drift, screen replacement, charging port repair." },
                  { icon: Headphones, name: "Accessories", desc: "Cases, chargers, screen protectors, and audio accessories." }
                ].map((service, idx) => (
                  <a key={idx} href="#" className="group block bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <service.icon className="w-24 h-24 text-sky-400 -rotate-12 translate-x-4 -translate-y-4" />
                    </div>
                    <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:border-sky-500/50 transition-colors relative z-10">
                      <service.icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{service.name}</h3>
                    <p className="text-sm text-slate-400 mb-6 relative z-10 min-h-[40px]">{service.desc}</p>
                    <div className="flex items-center gap-2 text-sky-400 text-sm font-medium relative z-10">
                      Learn more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 6. Why Choose Gadget X */}
          <section className="py-24 bg-slate-900/50 border-y border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.05),transparent_50%)]"></div>
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Lab Standard</h2>
                  <p className="text-slate-400 mb-8 text-lg">We don't just replace parts; we understand how your devices work at a component level. That's why Houston has trusted us for 15 years.</p>
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl font-mono text-sm">
                    <div className="text-sky-400 mb-2">{">"} System.stats()</div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-2xl font-bold text-white mb-1">15+</div>
                        <div className="text-slate-500">Years Active</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white mb-1">100k+</div>
                        <div className="text-slate-500">Devices Fixed</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "15-Year Heritage", desc: "Established in Houston with over a decade of proven technical expertise and community trust." },
                    { title: "Same-Day Turnaround", desc: "We stock hundreds of parts to ensure your device is back in your hands the very same day." },
                    { title: "Certified Technicians", desc: "Our lab technicians undergo rigorous training for micro-soldering and complex diagnostics." },
                    { title: "90-Day Warranty", desc: "Every repair is backed by our comprehensive warranty on parts and labor for your peace of mind." }
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                        <span className="text-sky-500 font-mono text-sm opacity-50">0{idx + 1}</span>
                        {feature.title}
                      </h3>
                      <p className="text-slate-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. Featured offers strip */}
          <section className="py-24">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Featured Services</h2>
                  <p className="text-slate-400">Standardized pricing for common repairs.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: "Screen Replacement", price: "from $79", icon: Smartphone, highlight: false },
                  { title: "Battery Replacement", price: "from $49", icon: Battery, highlight: true },
                  { title: "Free Diagnostics", price: "$0", icon: Zap, highlight: false }
                ].map((offer, idx) => (
                  <div key={idx} className={`p-8 rounded-2xl border ${offer.highlight ? 'bg-sky-950/20 border-sky-500/50 shadow-[0_0_30px_rgba(14,165,233,0.1)] relative overflow-hidden' : 'bg-slate-900 border-slate-800'}`}>
                    {offer.highlight && <div className="absolute top-0 right-0 bg-sky-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Popular</div>}
                    <offer.icon className={`w-8 h-8 mb-6 ${offer.highlight ? 'text-sky-400' : 'text-slate-400'}`} />
                    <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                    <div className="text-2xl font-mono text-sky-400 mb-6">{offer.price}</div>
                    <a href="tel:+13466236898" className={`block text-center py-3 px-4 rounded-lg font-semibold transition-all ${offer.highlight ? 'bg-sky-500 hover:bg-sky-400 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                      Book Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. We Sell Too teaser */}
          <section className="py-20 bg-slate-950 border-t border-slate-800 relative">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl border border-slate-700 p-8 sm:p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_70%)]"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-slate-950/50 border border-slate-700 rounded-full px-4 py-1.5 text-sm text-slate-300 mb-6">
                      <Star className="w-4 h-4 text-sky-400" /> Premium Pre-owned
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">We Sell Too.</h2>
                    <p className="text-slate-400 text-lg mb-8 max-w-md">Looking for an upgrade? We sell high-quality unlocked phones, iPads, MacBooks, laptops, gaming consoles, and premium accessories.</p>
                    <a href="#" className="inline-flex items-center gap-2 bg-white hover:bg-slate-200 text-slate-950 px-6 py-3 rounded-md font-bold transition-all">
                      Browse Inventory <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-center">
                      <Smartphone className="w-8 h-8 text-slate-400" />
                      <span className="font-medium text-slate-200">Unlocked Phones</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-center">
                      <Laptop className="w-8 h-8 text-slate-400" />
                      <span className="font-medium text-slate-200">MacBooks & PCs</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-center">
                      <Gamepad2 className="w-8 h-8 text-slate-400" />
                      <span className="font-medium text-slate-200">Gaming Consoles</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-center">
                      <Watch className="w-8 h-8 text-slate-400" />
                      <span className="font-medium text-slate-200">Smartwatches</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Prepaid plans teaser */}
          <section className="py-12 border-b border-slate-800">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Zap className="w-6 h-6 text-sky-400 hidden md:block" />
                <h3 className="text-xl font-bold text-white">Activate Prepaid Plans:</h3>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded text-slate-300 font-medium">Cricket</span>
                <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded text-slate-300 font-medium">Metro by T-Mobile</span>
                <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded text-slate-300 font-medium">T-Mobile</span>
                <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded text-slate-300 font-medium">AT&T Prepaid</span>
              </div>
              <a href="#" className="text-sky-400 font-medium flex items-center gap-1 hover:text-sky-300">
                See plans <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* 10. Service areas & 11. Visit us */}
          <section className="py-24 relative overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Visit Our Lab</h2>
                  <p className="text-slate-400 mb-8">Conveniently located in Houston. Walk-ins always welcome, no appointment necessary for standard repairs.</p>
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-8">
                    <div className="flex items-start gap-4 mb-6">
                      <MapPin className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">Gadget X Repairs</h4>
                        <p className="text-slate-400 leading-relaxed">
                          8389 Almeda Rd, Suite J-2<br />
                          Houston, TX 77054
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                      <div className="w-full">
                        <h4 className="text-lg font-bold text-white mb-3">Operating Hours</h4>
                        <div className="space-y-2 text-slate-400 font-mono text-sm">
                          <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span>Monday - Saturday</span>
                            <span className="text-white">10:00 AM - 7:00 PM</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <span>Sunday</span>
                            <span className="text-white">12:00 PM - 5:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noopener noreferrer" className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 py-3 rounded-md font-bold transition-all text-center">
                      Get Directions
                    </a>
                    <a href="tel:+13466236898" className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-md font-bold transition-all text-center">
                      Call Us
                    </a>
                  </div>
                  
                  <div className="mt-12">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Service Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Houston", "Sugar Land", "Missouri City", "Stafford", "Katy", "Alief", "Sharpstown"].map((area, i) => (
                        <span key={i} className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Styled Map Card */}
                <div className="h-full min-h-[400px] bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group p-8">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50"></div>
                  
                  {/* Stylized street lines */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-0 right-0 h-4 bg-slate-800/50 -skew-y-12"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-slate-800/50 skew-x-12"></div>
                    <div className="absolute top-2/3 left-0 right-0 h-2 bg-slate-800/30 skew-y-6"></div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center animate-pulse mb-4">
                      <div className="w-4 h-4 bg-sky-400 rounded-full shadow-[0_0_20px_rgba(14,165,233,1)]"></div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 px-6 py-4 rounded-xl shadow-2xl text-center backdrop-blur-md mb-6">
                      <div className="font-bold text-white mb-1">Gadget X Repairs</div>
                      <div className="text-sm text-slate-400">8389 Almeda Rd, Suite J-2</div>
                    </div>
                    <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-200 text-slate-950 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* 12. Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-24 md:pb-8 relative z-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <img src="/__mockup/images/gadget-x-logo.png" alt="Gadget X Repairs" className="h-8 object-contain mb-6 invert brightness-0 saturate-100 sepia-[100%] hue-rotate-[190deg] contrast-[100%]" style={{ filter: 'brightness(0) invert(1)' }} />
                <p className="text-slate-400 text-sm max-w-xs mb-6">
                  Houston's premier destination for professional device repair, sales, and accessories. 15 years of trusted technical excellence.
                </p>
                <div className="flex gap-4">
                  <a href="tel:+13466236898" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/50 transition-all">
                    <Phone className="w-4 h-4" />
                  </a>
                  <a href="https://wa.me/13466236898" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/50 transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6">Quick Links</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-sky-400 transition-colors">iPhone Repair</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition-colors">MacBook & Laptop Repair</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition-colors">Game Console Repair</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition-colors">Buy Devices</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition-colors">Prepaid Plans</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Contact & Hours</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>8389 Almeda Rd, Suite J-2<br/>Houston, TX 77054</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                    <a href="tel:+13466236898" className="hover:text-sky-400">+1 (346) 623-6898</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>Mon-Sat: 10AM - 7PM<br/>Sun: 12PM - 5PM</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <p>© 2026 Gadget X Repairs. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                <a href="#" className="hover:text-slate-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* 13. Sticky mobile-style bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 p-2 z-[100] flex justify-around items-center">
          <a href="tel:+13466236898" className="flex flex-col items-center justify-center w-full py-2 text-slate-400 hover:text-sky-400 transition-colors">
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium uppercase tracking-wide">Call</span>
          </a>
          <a href="https://wa.me/13466236898" className="flex flex-col items-center justify-center w-full py-2 text-slate-400 hover:text-sky-400 transition-colors border-l border-r border-slate-800">
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium uppercase tracking-wide">WhatsApp</span>
          </a>
          <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-full py-2 text-slate-400 hover:text-sky-400 transition-colors">
            <MapPin className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium uppercase tracking-wide">Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
