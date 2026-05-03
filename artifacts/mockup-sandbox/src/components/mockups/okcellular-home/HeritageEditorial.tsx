import React from "react";
import { ArrowRight, MapPin, Clock, Phone, Navigation } from "lucide-react";

const COLORS = {
  bg: "#F9F8F6",
  text: "#2A2825",
  muted: "#736F68",
  accent: "#A24836",
  border: "#E6E2DC",
  white: "#FFFFFF"
};

const Header = () => (
  <header className="flex items-center justify-between py-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
    <div className="font-serif text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
      OK Cellular
    </div>
    <div className="flex items-center gap-6 text-sm font-medium tracking-wide uppercase" style={{ color: COLORS.muted }}>
      <a href="tel:+12814462166" className="hover:text-[#A24836] transition-colors">(281) 446-2166</a>
      <a href="https://maps.app.goo.gl/A7NW74nbXMUS7NAM6" className="hidden md:inline-block hover:text-[#A24836] transition-colors">Humble, TX</a>
    </div>
  </header>
);

const Hero = () => (
  <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase" style={{ color: COLORS.accent }}>
        <span className="w-8 h-[1px] bg-current"></span>
        15 Years in Houston
      </div>
      <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight" style={{ color: COLORS.text }}>
        Craftsmanship in every repair.
      </h1>
      <p className="text-lg md:text-xl leading-relaxed" style={{ color: COLORS.muted }}>
        For over a decade, we've been restoring the devices that keep Houston connected. We believe in meticulous work, honest diagnoses, and treating every phone, tablet, and console as if it were our own.
      </p>
      <div className="pt-4 flex flex-col sm:flex-row gap-6">
        <a href="tel:+12814462166" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: COLORS.text, color: COLORS.white }}>
          <Phone size={18} />
          Call the shop
        </a>
        <a href="https://maps.app.goo.gl/A7NW74nbXMUS7NAM6" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: "transparent", color: COLORS.text, border: `1px solid ${COLORS.text}` }}>
          <MapPin size={18} />
          Visit us
        </a>
      </div>
    </div>
    <div className="relative">
      <div className="aspect-[3/4] overflow-hidden" style={{ backgroundColor: COLORS.border }}>
        <img 
          src="/__mockup/images/owner-portrait.jpg" 
          alt="OK Cellular owner in the repair shop" 
          className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div className="absolute -bottom-8 -left-8 md:-left-12 p-8 md:p-10 max-w-[280px]" style={{ backgroundColor: COLORS.white, color: COLORS.text }}>
        <p className="font-serif text-xl italic leading-snug">
          "A repair shop isn't just about fixing glass and batteries. It's about preserving memories and restoring connections."
        </p>
      </div>
    </div>
  </section>
);

const PhotoEssay = () => (
  <section className="py-24" style={{ backgroundColor: COLORS.white }}>
    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-serif text-4xl md:text-5xl" style={{ color: COLORS.text }}>
          The Art of Restoration
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: COLORS.muted }}>
          We document our work because every repair tells a story. From severely shattered screens to water-damaged logic boards, we take pride in bringing your essential devices back to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h3 className="font-serif text-3xl" style={{ color: COLORS.text }}>Shattered to Pristine</h3>
          <p className="leading-relaxed text-lg" style={{ color: COLORS.muted }}>
            A drop on concrete shouldn't mean the end of your device. We carefully remove the damaged components, clean the internal housing, and fit an original-quality display. The result is indistinguishable from a brand new phone. iPhone screen repairs start at $79.
          </p>
        </div>
        <div className="relative aspect-square order-1 md:order-2 group overflow-hidden">
          <img src="/__mockup/images/broken-phone.jpg" alt="Severely damaged smartphone screen" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 group-hover:opacity-0" />
          <img src="/__mockup/images/fixed-phone.jpg" alt="Perfectly repaired smartphone screen" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500">
            <span className="bg-black/50 backdrop-blur-sm text-white px-6 py-2 tracking-widest uppercase text-xs font-bold rounded-full">Hover to reveal</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ServicesList = () => (
  <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto w-full space-y-16">
    <div className="space-y-6 text-center">
      <h2 className="font-serif text-4xl" style={{ color: COLORS.text }}>What We Fix</h2>
      <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: COLORS.accent }}></div>
    </div>

    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 border-b pb-12" style={{ borderColor: COLORS.border }}>
        <h3 className="font-serif text-2xl" style={{ color: COLORS.text }}>iPhone</h3>
        <div className="space-y-4" style={{ color: COLORS.muted }}>
          <p className="text-lg leading-relaxed">Cracked glass, swollen batteries (from $49), Face ID restoration, charging ports and the quiet board-level work most shops won't touch. Screen replacements from $79.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 border-b pb-12" style={{ borderColor: COLORS.border }}>
        <h3 className="font-serif text-2xl" style={{ color: COLORS.text }}>Android & cellphones</h3>
        <div className="space-y-4" style={{ color: COLORS.muted }}>
          <p className="text-lg leading-relaxed">Samsung Galaxy — including folds — Google Pixel, Motorola, OnePlus and the older models everyone else has stopped fixing. We carry parts most shops have to special-order.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 border-b pb-12" style={{ borderColor: COLORS.border }}>
        <h3 className="font-serif text-2xl" style={{ color: COLORS.text }}>iPad &amp; tablets</h3>
        <div className="space-y-4" style={{ color: COLORS.muted }}>
          <p className="text-lg leading-relaxed">Glass, LCD and battery work for iPad Pro through the older Air models, plus Samsung, Amazon Fire and Lenovo tablets. Honest assessments — sometimes the right answer is "not worth it."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 border-b pb-12" style={{ borderColor: COLORS.border }}>
        <h3 className="font-serif text-2xl" style={{ color: COLORS.text }}>MacBook &amp; laptops</h3>
        <div className="space-y-4" style={{ color: COLORS.muted }}>
          <p className="text-lg leading-relaxed">Liquid-damaged logic boards, dead keyboards, swollen batteries, hinge rebuilds. MacBooks, plus HP, Dell, Lenovo, ASUS, Acer and Chromebooks. We diagnose first, quote second.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 border-b pb-12" style={{ borderColor: COLORS.border }}>
        <h3 className="font-serif text-2xl" style={{ color: COLORS.text }}>Gaming consoles</h3>
        <div className="space-y-4" style={{ color: COLORS.muted }}>
          <p className="text-lg leading-relaxed">PS5, Xbox Series X|S and Nintendo Switch. HDMI port rebuilds from $89, disc drives, drift-free joycons, power supplies. Most consoles back to you within a few days.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 pb-4">
        <h3 className="font-serif text-2xl" style={{ color: COLORS.text }}>Accessories</h3>
        <div className="space-y-4" style={{ color: COLORS.muted }}>
          <p className="text-lg leading-relaxed">Cases, tempered glass, premium chargers, audio, cables — quietly curated, fairly priced. The kind of accessories we'd hand our own family.</p>
        </div>
      </div>
    </div>
  </section>
);

const MailIn = () => (
  <section className="py-24 px-6 md:px-12" style={{ backgroundColor: COLORS.text, color: COLORS.white }}>
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="aspect-[4/3] relative">
        <img src="/__mockup/images/shop-tools.jpg" alt="Repair tools on a workbench" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="space-y-8 max-w-lg">
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">We take care of devices from anywhere in Texas.</h2>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Not in the Houston area? You can mail your device directly to our workbench. We offer insured shipping both ways, transparent communication throughout the process, and a typical turnaround of 3-5 business days. 
        </p>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Every repair, local or mailed, receives our standard 90-day warranty and the same meticulous attention to detail.
        </p>
        <div className="pt-4">
          <a href="/mail-in-repair-houston-tx" className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase group transition-colors hover:text-[#A24836]">
            Start a mail-in repair
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Testimonial = () => (
  <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto w-full text-center space-y-10">
    <div className="text-5xl opacity-20 mx-auto w-fit font-serif" style={{ color: COLORS.accent }}>"</div>
    <p className="font-serif text-2xl md:text-4xl leading-snug" style={{ color: COLORS.text }}>
      I thought my phone was completely unrecoverable after dropping it in the lake. The team at OK Cellular didn't just fix it—they recovered photos of my daughter that hadn't been backed up. True craftsmen.
    </p>
    <div className="flex flex-col items-center gap-2">
      <span className="font-bold tracking-widest uppercase text-sm" style={{ color: COLORS.text }}>Sarah Jenkins</span>
      <span className="text-sm" style={{ color: COLORS.muted }}>Customer since 2018</span>
    </div>
  </section>
);

const FooterInfo = () => (
  <footer className="border-t py-16 px-6 md:px-12" style={{ borderColor: COLORS.border, backgroundColor: COLORS.white }}>
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12 text-sm" style={{ color: COLORS.muted }}>
      <div className="space-y-6 md:col-span-1">
        <div className="font-serif text-xl font-bold" style={{ color: COLORS.text }}>OK Cellular</div>
        <p>15 years of trusted repairs. Same-day turnaround on most services.</p>
        <p>Used phones available starting at $99. Easy financing from $10 down.</p>
      </div>
      
      <div className="space-y-6">
        <div className="font-bold tracking-widest uppercase text-xs" style={{ color: COLORS.text }}>Visit Us</div>
        <div className="space-y-2">
          <p>8910 Will Clayton Pkwy APT 200</p>
          <p>Humble, TX 77396</p>
          <a href="https://maps.app.goo.gl/A7NW74nbXMUS7NAM6" className="inline-block pt-2 hover:text-[#A24836] transition-colors flex items-center gap-2">
            <Navigation size={14} /> Get Directions
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <div className="font-bold tracking-widest uppercase text-xs" style={{ color: COLORS.text }}>Hours</div>
        <div className="space-y-2">
          <p>Mon–Sat: 10:00 AM – 8:30 PM</p>
          <p>Sun: 11:00 AM – 7:30 PM</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="font-bold tracking-widest uppercase text-xs" style={{ color: COLORS.text }}>Contact</div>
        <div className="space-y-2">
          <p><a href="tel:+12814462166" className="hover:text-[#A24836] transition-colors">(281) 446-2166</a></p>
        </div>
      </div>
    </div>
  </footer>
);

export function HeritageEditorial() {
  return (
    <div className="min-h-screen w-full antialiased" style={{ backgroundColor: COLORS.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .antialiased {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>
      
      <Header />
      <Hero />
      <PhotoEssay />
      <ServicesList />
      <MailIn />
      <Testimonial />
      <FooterInfo />
      
    </div>
  );
}
