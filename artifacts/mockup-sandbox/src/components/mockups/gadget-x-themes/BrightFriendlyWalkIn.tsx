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
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BrightFriendlyWalkIn() {
  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 selection:bg-red-100 selection:text-red-900 pb-20 md:pb-0 relative">
      
      {/* 1. Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs font-medium py-2 px-4">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              8389 Almeda Rd, Suite J-2, Houston, TX 77054
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              Mon-Sat 10am-7pm | Sun 12pm-5pm
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border-0 rounded-full px-2 py-0.5 text-[10px] tracking-wide uppercase shadow-none">
              Same-day repair available
            </Badge>
            <a href="tel:+13466236898" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-green-400" />
              +1 (346) 623-6898
            </a>
          </div>
        </div>
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img 
              src="/__mockup/images/gadget-x-logo.png" 
              alt="Gadget X Repairs" 
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
            <a href="tel:+13466236898" className="hidden sm:inline-flex">
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
                Same-Day Repair Available
              </span>
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-red-600 border border-red-100">
                <Star className="w-4 h-4 fill-red-500 text-red-500" />
                15 Years in Houston
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Fast Phone, Tablet, Laptop & Game Console <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">Repair in Houston</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              We fix broken screens, dead batteries, and water damage. Most repairs done the <span className="text-slate-900 font-bold border-b-2 border-red-200">same day</span>. All brands welcome.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a href="tel:+13466236898" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full font-bold h-14 px-8 text-base shadow-lg shadow-red-500/30 transition-transform hover:-translate-y-0.5">
                  <Phone className="w-5 h-5 mr-2 fill-white/20" />
                  Call Now
                </Button>
              </a>
              <a href="https://wa.me/13466236898" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full font-bold h-14 px-8 text-base transition-transform hover:-translate-y-0.5">
                  <MessageCircle className="w-5 h-5 mr-2 fill-green-500/20" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
            
            {/* Inline Lead Form */}
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-md mx-auto lg:mx-0 relative">
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
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              15+ Years in Houston
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              Same-Day Repair
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              90-Day Warranty
            </div>
            <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              5-Star Reviews
            </div>
            <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-400" />
              All Brands Welcome
            </div>
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
            {[
              { icon: Smartphone, name: "iPhone Repair", desc: "Screen, battery, charging port.", color: "text-blue-600", bg: "bg-blue-100" },
              { icon: Smartphone, name: "Android Repair", desc: "Samsung, Google, Motorola.", color: "text-green-600", bg: "bg-green-100" },
              { icon: Tablet, name: "iPad Repair", desc: "Glass, LCD, battery replacement.", color: "text-purple-600", bg: "bg-purple-100" },
              { icon: Tablet, name: "Tablet Repair", desc: "Samsung, Amazon, Lenovo.", color: "text-orange-600", bg: "bg-orange-100" },
              { icon: Laptop, name: "MacBook Repair", desc: "Screen, keyboard, battery.", color: "text-slate-700", bg: "bg-slate-200" },
              { icon: Laptop, name: "Laptop Repair", desc: "Windows, Chromebooks.", color: "text-cyan-600", bg: "bg-cyan-100" },
              { icon: Gamepad2, name: "PlayStation", desc: "HDMI port, disc drive, power.", color: "text-indigo-600", bg: "bg-indigo-100" },
              { icon: Gamepad2, name: "Xbox Repair", desc: "HDMI port, no power, updates.", color: "text-emerald-600", bg: "bg-emerald-100" },
              { icon: Gamepad2, name: "Nintendo Switch", desc: "Screen, joycons, charging.", color: "text-red-600", bg: "bg-red-100" },
              { icon: Headphones, name: "Accessories", desc: "Cases, chargers, protectors.", color: "text-pink-600", bg: "bg-pink-100" },
            ].map((service, i) => (
              <a href="#" key={i} className="group block h-full">
                <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-6 bg-white hover:-translate-y-1 relative overflow-hidden flex flex-col">
                  {/* Decorative background circle on hover */}
                  <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${service.bg} mix-blend-multiply`}></div>
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.bg} ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900">{service.name}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-6 flex-1">{service.desc}</p>
                  <div className="flex items-center text-sm font-bold text-red-500 group-hover:text-red-600">
                    Learn more <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </a>
            ))}
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
                We're not a faceless corporate chain. We're local experts who have been fixing Houston's devices for over 15 years. We care about getting you back online quickly and affordably.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Clock, title: "15-Year Heritage", desc: "Serving the Houston community for over a decade and a half." },
                  { icon: Zap, title: "Same-Day Turnaround", desc: "Most repairs are completed within 1-2 hours while you wait." },
                  { icon: Wrench, title: "Certified Technicians", desc: "Expert staff trained on the latest devices and repair techniques." },
                  { icon: ShieldCheck, title: "90-Day Warranty", desc: "We stand behind our work. If it's not right, we make it right." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex-shrink-0 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">{feature.title}</h4>
                      <p className="text-slate-600 font-medium">{feature.desc}</p>
                    </div>
                  </div>
                ))}
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
              <h2 className="text-3xl font-extrabold mb-2">Popular Repairs</h2>
              <p className="text-slate-600 font-medium">Straightforward pricing. No hidden fees.</p>
            </div>
            <Button variant="outline" className="rounded-full font-bold border-2 border-slate-200">
              View all pricing
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Screen Replacement", price: "from $79", icon: Smartphone, tag: "Most Popular" },
              { title: "Battery Replacement", price: "from $49", icon: Zap, tag: "Quick Fix" },
              { title: "Diagnostics", price: "Free", icon: Search, tag: "No Obligation" }
            ].map((offer, i) => (
              <Card key={i} className="rounded-3xl border-0 shadow-md p-8 bg-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10">
                  {offer.tag}
                </div>
                <offer.icon className="w-10 h-10 text-slate-300 mb-6 group-hover:text-red-500 transition-colors" />
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <div className="text-3xl font-extrabold text-red-500 mb-6">{offer.price}</div>
                <Button className="w-full rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900 font-bold shadow-none">
                  Get Quote
                </Button>
              </Card>
            ))}
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
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:bg-slate-800 transition-colors">
                <Smartphone className="w-12 h-12 text-blue-400" />
                <span className="font-bold">Unlocked Phones</span>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:bg-slate-800 transition-colors transform translate-y-6">
                <Tablet className="w-12 h-12 text-purple-400" />
                <span className="font-bold">iPads & Tablets</span>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:bg-slate-800 transition-colors">
                <Laptop className="w-12 h-12 text-slate-300" />
                <span className="font-bold">MacBooks & Laptops</span>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:bg-slate-800 transition-colors transform translate-y-6">
                <Gamepad2 className="w-12 h-12 text-green-400" />
                <span className="font-bold">Gaming Consoles</span>
              </div>
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
              {['Cricket', 'Metro by T-Mobile', 'T-Mobile', 'AT&T Prepaid'].map((carrier, i) => (
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
              {['Houston', 'Sugar Land', 'Missouri City', 'Stafford', 'Katy', 'Alief', 'Sharpstown'].map((area, i) => (
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
                      Gadget X Repairs<br />
                      8389 Almeda Rd, Suite J-2<br />
                      Houston, TX 77054
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
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Mon - Sat</span>
                        <span className="font-bold text-slate-900">10:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span>Sunday</span>
                        <span className="font-bold text-slate-900">12:00 PM - 5:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noreferrer" className="flex-1 min-w-[200px]">
                    <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold">
                      <Navigation className="w-4 h-4 mr-2" /> Get Directions
                    </Button>
                  </a>
                  <a href="tel:+13466236898" className="flex-1 min-w-[120px]">
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-2">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* Stylized Map Card */}
              <div className="bg-slate-200 relative min-h-[400px] flex items-center justify-center overflow-hidden">
                {/* CSS Street Pattern */}
                <div className="absolute inset-0 opacity-20" 
                  style={{
                    backgroundImage: `linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%, #cbd5e1), linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%, #cbd5e1)`,
                    backgroundSize: `60px 60px`,
                    backgroundPosition: `0 0, 30px 30px`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200/80 to-transparent"></div>
                
                {/* Pin */}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/30 mb-2 border-4 border-white animate-bounce-subtle">
                    <MapPin className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div className="w-12 h-3 bg-slate-300 rounded-[100%] blur-sm mb-6"></div>
                  
                  <div className="bg-white px-6 py-4 rounded-2xl shadow-xl font-bold text-slate-900 border border-slate-100 flex flex-col gap-2">
                    8389 Almeda Rd
                    <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline inline-flex items-center justify-center font-bold">
                      Open in Google Maps <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-24 md:pb-8 px-4 text-slate-600 font-medium">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img 
              src="/__mockup/images/gadget-x-logo.png" 
              alt="Gadget X Repairs" 
              className="h-10 w-auto object-contain mb-6 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
            />
            <p className="max-w-md mb-6 text-sm leading-relaxed">
              Houston's trusted destination for cellphone, iPhone, iPad, MacBook, laptop, and gaming console repairs. We sell devices and accessories too.
            </p>
            <div className="flex gap-4">
              <a href="tel:+13466236898" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://wa.me/13466236898" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-green-500 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-500 hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500">All Repairs</a></li>
              <li><a href="#" className="hover:text-red-500">Buy Devices</a></li>
              <li><a href="#" className="hover:text-red-500">Accessories</a></li>
              <li><a href="#" className="hover:text-red-500">Prepaid Plans</a></li>
              <li><a href="#" className="hover:text-red-500">Get a Quote</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span>8389 Almeda Rd, Suite J-2<br/>Houston, TX 77054</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                <a href="tel:+13466236898" className="hover:text-red-500">+1 (346) 623-6898</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-slate-400" />
                <span>Mon-Sat: 10am-7pm<br/>Sun: 12pm-5pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1240px] mx-auto pt-8 border-t border-slate-100 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>© 2026 Gadget X Repairs. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* 13. Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 flex gap-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe md:hidden">
        <a href="tel:+13466236898" className="flex-1">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 flex flex-col gap-0.5 items-center justify-center">
            <Phone className="w-4 h-4" />
            <span className="text-[10px]">Call</span>
          </Button>
        </a>
        <a href="https://wa.me/13466236898" className="flex-1">
          <Button variant="outline" className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200 rounded-xl font-bold h-12 flex flex-col gap-0.5 items-center justify-center">
            <MessageCircle className="w-4 h-4" />
            <span className="text-[10px]">WhatsApp</span>
          </Button>
        </a>
        <a href="https://maps.app.goo.gl/ALRF73zPbrG9qndz8" className="flex-1">
          <Button variant="outline" className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 rounded-xl font-bold h-12 flex flex-col gap-0.5 items-center justify-center">
            <Navigation className="w-4 h-4" />
            <span className="text-[10px]">Directions</span>
          </Button>
        </a>
      </div>

    </div>
  );
}

// Add a simple fallback icon for Search which was used but not imported
function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
