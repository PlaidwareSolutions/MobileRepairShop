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
  Star,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function BoldUrbanStore() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500 selection:text-white pb-20">
      {/* 1. Top utility bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 text-xs font-mono py-2 px-4 flex justify-between items-center tracking-tight text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1">
            <MapPin className="w-3 h-3 text-red-500" />
            8389 Almeda Rd, Suite J-2, Houston, TX
          </span>
          <span className="hidden md:inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-red-500" />
            Mon-Sat 10AM-7PM | Sun 12PM-5PM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-red-500 text-white px-2 py-0.5 uppercase font-bold text-[10px] tracking-wider transform -skew-x-12">
            Same-Day Repair
          </span>
          <a
            href="tel:+13466236898"
            className="hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            +1 (346) 623-6898
          </a>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-4 border-red-500">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/__mockup/images/gadget-x-logo.png"
              alt="Gadget X Repairs"
              className="h-10 md:h-12 object-contain"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-8 font-black uppercase tracking-tighter text-sm">
            <a href="#" className="hover:text-red-500 transition-colors">
              Repair
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Sell
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Accessories
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Prepaid
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Locations
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Contact
            </a>
          </nav>
          <Button
            asChild
            className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-sm px-6 h-12"
          >
            <a href="tel:+13466236898">Call Now</a>
          </Button>
        </div>
      </header>

      {/* Ticker Tape */}
      <div className="w-full overflow-hidden bg-yellow-400 py-2 border-y-2 border-black flex items-center">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap font-black uppercase text-black text-xl tracking-tighter flex gap-8">
          <span>SAME-DAY REPAIR</span>
          <span>•</span>
          <span>15 YEARS EXPERIENCE</span>
          <span>•</span>
          <span>HOUSTON'S BEST</span>
          <span>•</span>
          <span>CALL NOW</span>
          <span>•</span>
          <span>SAME-DAY REPAIR</span>
          <span>•</span>
          <span>15 YEARS EXPERIENCE</span>
          <span>•</span>
          <span>HOUSTON'S BEST</span>
          <span>•</span>
          <span>CALL NOW</span>
        </div>
      </div>

      {/* 3. Hero */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4 border-b border-zinc-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="bg-yellow-400 text-black px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] inline-block transform -rotate-2">
                15 Years & Counting
              </span>
              <span className="bg-red-500 text-white px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] inline-flex items-center gap-2 transform rotate-1">
                <Zap className="w-4 h-4" /> Same-Day Repair
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[100px] leading-[0.85] font-black uppercase tracking-tighter text-white">
              WE FIX <br />
              <span className="text-red-500">YOUR SH*T.</span> <br />
              FAST.
            </h1>
            <p className="text-xl md:text-2xl font-bold text-zinc-400 max-w-lg">
              Phone, Tablet, Laptop & Game Console Repair in Houston. Most repairs done the same day.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-16 px-8 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]"
              >
                <a href="tel:+13466236898">Call Now</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-4 border-white bg-transparent hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-16 px-8"
              >
                <a href="https://wa.me/13466236898" target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </Button>
              <Button
                asChild
                className="rounded-none bg-yellow-400 hover:bg-white text-black font-black uppercase tracking-widest text-lg h-16 px-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]"
              >
                <a href="#quote">Get Free Quote</a>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[500px] w-full hidden md:block">
            {/* Abstract device pattern composition */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-96 border-8 border-red-500 absolute transform rotate-12 bg-black/50 backdrop-blur"></div>
              <div className="w-72 h-80 border-8 border-yellow-400 absolute transform -rotate-6 bg-black/50 backdrop-blur z-10 flex items-center justify-center">
                <Wrench className="w-32 h-32 text-white" />
              </div>
              <div className="absolute top-10 right-10 bg-white text-black font-black uppercase p-4 transform rotate-12 text-3xl shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] z-20">
                CRACKED?
              </div>
              <div className="absolute bottom-10 left-10 bg-red-500 text-white font-black uppercase p-4 transform -rotate-12 text-3xl shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] z-20">
                WE GOT IT.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip */}
      <div className="bg-white border-y-8 border-red-500 py-6">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 font-black uppercase tracking-tighter text-black text-xl md:text-3xl text-center">
          <div className="flex items-center gap-2"><Zap className="w-8 h-8 text-red-500" /> Same-Day Repair</div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-8 h-8 text-red-500" /> 90-Day Warranty</div>
          <div className="flex items-center gap-2"><Star className="w-8 h-8 text-red-500 fill-red-500" /> 5-Star Reviews</div>
          <div className="flex items-center gap-2"><Smartphone className="w-8 h-8 text-red-500" /> All Brands</div>
        </div>
      </div>

      {/* 5. Service Grid */}
      <section className="py-24 px-4 bg-zinc-950 relative">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              WHAT WE <br/><span className="text-yellow-400 text-stroke-black">REPAIR</span>
            </h2>
            <div className="bg-red-500 p-4 transform rotate-2 max-w-sm">
              <p className="font-bold text-white uppercase text-sm leading-tight">
                No matter how badly you broke it, bring it in. We've seen worse.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Smartphone, name: "iPhone Repair", desc: "Screens, batteries, charging ports." },
              { icon: Smartphone, name: "Android Repair", desc: "Samsung, Google, Motorola & more." },
              { icon: Tablet, name: "iPad Repair", desc: "Glass, LCD, battery replacement." },
              { icon: Tablet, name: "Tablet Repair", desc: "All major tablet brands fixed." },
              { icon: Laptop, name: "MacBook Repair", desc: "Screens, keyboards, logic boards." },
              { icon: Laptop, name: "Laptop Repair", desc: "PC hardware & software issues." },
              { icon: Gamepad2, name: "PlayStation", desc: "HDMI ports, drives, overheating." },
              { icon: Gamepad2, name: "Xbox Repair", desc: "Power issues, disc drives, ports." },
              { icon: Gamepad2, name: "Nintendo Switch", desc: "Screens, joy-cons, charging." },
              { icon: Headphones, name: "Accessories", desc: "Cases, chargers, screen protectors." },
            ].map((s, i) => (
              <a href="#" key={i} className="group block relative bg-black border-4 border-zinc-800 p-6 hover:border-red-500 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-red-500" />
                </div>
                <s.icon className="w-12 h-12 mb-6 text-white group-hover:text-yellow-400 transition-colors" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{s.name}</h3>
                <p className="text-sm font-bold text-zinc-500 mb-6">{s.desc}</p>
                <div className="text-red-500 font-black uppercase text-sm group-hover:underline">
                  Learn more
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-24 px-4 bg-red-500 text-black">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-7xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.8] mb-8">
              WHY <br/><span className="text-white">GADGET X</span>
            </h2>
            <div className="text-2xl font-bold uppercase border-l-8 border-black pl-6 py-2">
              "We don't just fix devices. We bring them back from the dead."
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-black text-white p-8 transform hover:-translate-y-2 transition-transform">
              <div className="text-6xl font-black text-yellow-400 mb-4">15</div>
              <h4 className="text-2xl font-black uppercase mb-2">Years Heritage</h4>
              <p className="text-zinc-400 font-bold">Serving Houston with reliable repairs since day one.</p>
            </div>
            <div className="bg-white text-black p-8 transform hover:-translate-y-2 transition-transform mt-0 sm:mt-12">
              <div className="text-6xl font-black text-red-500 mb-4"><Zap className="w-12 h-12" /></div>
              <h4 className="text-2xl font-black uppercase mb-2">Same-Day</h4>
              <p className="text-zinc-600 font-bold">Fast turnaround because you need your device now.</p>
            </div>
            <div className="bg-white text-black p-8 transform hover:-translate-y-2 transition-transform">
              <div className="text-6xl font-black text-red-500 mb-4"><Wrench className="w-12 h-12" /></div>
              <h4 className="text-2xl font-black uppercase mb-2">Certified</h4>
              <p className="text-zinc-600 font-bold">Expert technicians who know what they're doing.</p>
            </div>
            <div className="bg-black text-white p-8 transform hover:-translate-y-2 transition-transform mt-0 sm:mt-12">
              <div className="text-6xl font-black text-yellow-400 mb-4"><ShieldCheck className="w-12 h-12" /></div>
              <h4 className="text-2xl font-black uppercase mb-2">Warranty</h4>
              <p className="text-zinc-400 font-bold">90-day warranty on all repairs for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Offers & 8. We Sell Too */}
      <section className="py-24 px-4 bg-zinc-900 border-b-8 border-yellow-400">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Featured Offers */}
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">
                HOT <span className="text-red-500">DEALS</span>
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Screen Replacement", price: "from $79" },
                  { title: "Battery Replacement", price: "from $49" },
                  { title: "Device Diagnostics", price: "FREE" },
                ].map((offer, i) => (
                  <div key={i} className="bg-black border-2 border-zinc-800 p-6 flex justify-between items-center group hover:border-white transition-colors">
                    <div>
                      <h4 className="text-xl md:text-2xl font-black uppercase">{offer.title}</h4>
                      <div className="text-red-500 font-black text-lg">{offer.price}</div>
                    </div>
                    <Button variant="outline" className="rounded-none font-black uppercase text-xs sm:text-sm border-2">
                      Claim
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* We Sell Too */}
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">
                WE <span className="text-yellow-400">SELL</span> TOO
              </h2>
              <p className="text-lg font-bold text-zinc-400 mb-8 max-w-md">
                Unlocked phones, iPads, MacBooks, laptops, gaming consoles, and premium accessories.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-800 aspect-square flex flex-col items-center justify-center border-4 border-transparent hover:border-red-500 transition-colors">
                  <Smartphone className="w-16 h-16 text-zinc-600 mb-4" />
                  <span className="font-black uppercase text-sm">Unlocked Phones</span>
                </div>
                <div className="bg-zinc-800 aspect-square flex flex-col items-center justify-center border-4 border-transparent hover:border-yellow-400 transition-colors">
                  <Laptop className="w-16 h-16 text-zinc-600 mb-4" />
                  <span className="font-black uppercase text-sm">MacBooks & PCs</span>
                </div>
              </div>
              <Button asChild className="w-full rounded-none bg-white text-black hover:bg-yellow-400 hover:text-black font-black uppercase tracking-widest text-lg h-14">
                <a href="#">Browse Inventory</a>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Prepaid Plans & 10. Service Areas */}
      <section className="py-12 bg-black border-b border-zinc-900">
        <div className="max-w-[1240px] mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Prepaid Activations</h3>
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {["Cricket", "Metro by T-Mobile", "T-Mobile", "AT&T Prepaid"].map(carrier => (
                <span key={carrier} className="bg-zinc-900 border border-zinc-800 px-4 py-2 font-black uppercase text-sm">
                  {carrier}
                </span>
              ))}
            </div>
            <a href="#" className="text-red-500 font-black uppercase hover:underline flex items-center gap-1">
              See plans <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {["Houston", "Sugar Land", "Missouri City", "Stafford", "Katy", "Alief", "Sharpstown"].map(area => (
                <span key={area} className="text-zinc-400 font-bold uppercase text-sm border-b-2 border-zinc-800 pb-1">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Location / Visit Us */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white">
              COME <br/><span className="text-red-500">THROUGH</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2">Location</h4>
                <p className="text-2xl font-black uppercase text-white">
                  8389 Almeda Rd, Suite J-2<br/>
                  Houston, TX 77054
                </p>
              </div>
              
              <div>
                <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2">Store Hours</h4>
                <div className="space-y-2 max-w-xs font-bold text-lg">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="uppercase">Mon - Sat</span>
                    <span className="text-yellow-400">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="uppercase">Sunday</span>
                    <span className="text-yellow-400">12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest h-14 px-8">
                <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noreferrer">
                  Get Directions
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-14 px-6">
                <a href="tel:+13466236898">Call</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-14 px-6">
                <a href="sms:+13466236898">Text</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-14 px-6">
                <a href="https://wa.me/13466236898" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-auto border-8 border-white bg-zinc-900 overflow-hidden flex items-center justify-center p-8 group">
            {/* Map styling */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #444 25%, transparent 25%, transparent 75%, #444 75%, #444), repeating-linear-gradient(45deg, #444 25%, #222 25%, #222 75%, #444 75%, #444)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-16 bg-zinc-800 transform -translate-x-1/2 -translate-y-1/2 rotate-12"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-64 bg-zinc-800 transform -translate-x-1/2 -translate-y-1/2 -rotate-12"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <MapPin className="w-20 h-20 text-red-500 fill-red-500 mb-4 animate-bounce" />
              <div className="bg-black text-white font-black uppercase text-xl px-6 py-3 border-4 border-yellow-400 text-center shadow-xl">
                Gadget X Repairs
              </div>
              <Button asChild className="mt-8 rounded-none bg-white text-black hover:bg-yellow-400 font-black uppercase tracking-widest h-12 px-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-black pt-16 pb-32 border-t border-zinc-900">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-zinc-400 font-bold">
          <div>
            <img
              src="/__mockup/images/gadget-x-logo.png"
              alt="Gadget X Repairs"
              className="h-10 object-contain mb-6 grayscale opacity-50"
            />
            <p className="text-sm mb-6">
              Cellphone, iPhone, iPad, MacBook, Laptop, Gaming Console & Accessories — We Sell and Repair.
            </p>
            <div className="text-xl text-white font-black uppercase tracking-widest">
              15 Years Strong.
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm uppercase">
              <li><a href="tel:+13466236898" className="hover:text-red-500 flex items-center gap-2"><Phone className="w-4 h-4"/> +1 (346) 623-6898</a></li>
              <li><a href="https://wa.me/13466236898" target="_blank" rel="noreferrer" className="hover:text-red-500 flex items-center gap-2"><MessageCircle className="w-4 h-4"/> WhatsApp Us</a></li>
              <li><a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noreferrer" className="hover:text-red-500 flex items-center gap-2"><MapPin className="w-4 h-4"/> 8389 Almeda Rd, Suite J-2<br/>Houston, TX 77054</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">Hours</h4>
            <ul className="space-y-2 text-sm uppercase">
              <li className="flex justify-between"><span>Mon - Sat</span> <span>10AM - 7PM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>12PM - 5PM</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-2 text-sm uppercase">
              <li><a href="#" className="hover:text-red-500">Repair Services</a></li>
              <li><a href="#" className="hover:text-red-500">Sell Your Device</a></li>
              <li><a href="#" className="hover:text-red-500">Shop Accessories</a></li>
              <li><a href="#" className="hover:text-red-500">Prepaid Plans</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto px-4 mt-16 pt-8 border-t border-zinc-900 text-center text-sm font-bold text-zinc-600 uppercase">
          © 2026 Gadget X Repairs. All Rights Reserved.
        </div>
      </footer>

      {/* 13. Sticky mobile-style bottom bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-red-500 z-50 p-2 md:p-4">
        <div className="max-w-[1240px] mx-auto grid grid-cols-3 gap-2">
          <Button asChild className="rounded-none bg-zinc-900 hover:bg-white text-white hover:text-black font-black uppercase text-xs md:text-sm h-12">
            <a href="tel:+13466236898">
              <Phone className="w-4 h-4 mr-2" /> Call
            </a>
          </Button>
          <Button asChild className="rounded-none bg-green-600 hover:bg-green-500 text-white font-black uppercase text-xs md:text-sm h-12">
            <a href="https://wa.me/13466236898" target="_blank" rel="noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </a>
          </Button>
          <Button asChild className="rounded-none bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs md:text-sm h-12">
            <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noreferrer">
              <MapPin className="w-4 h-4 mr-2" /> Directions
            </a>
          </Button>
        </div>
      </div>
      
      {/* Add global styles for marquee and specific fonts via style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;700;900&display=swap');
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6, .font-black {
          font-family: 'Archivo Black', sans-serif;
          font-weight: 400;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        
        .text-stroke-black {
          -webkit-text-stroke: 2px black;
          color: transparent;
        }
      `}} />
    </div>
  );
}
