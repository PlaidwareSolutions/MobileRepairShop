import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { ContactForm } from "@/components/forms/ContactForm";
import { BUSINESS } from "@/content";

export default function ContactPage() {
  return (
    <PageShell hideTicker>
      <SEO
        title="Contact Gadget X Repairs | Houston, TX"
        description="Contact Gadget X Repairs in Houston: call (346) 623-6898, text on WhatsApp, or visit 8389 Almeda Rd Suite J-2."
        path="/contact"
        jsonLd={[localBusinessJsonLd(), breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])]}
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="py-12 md:py-16 px-4 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.95]">
              GET IN <span className="text-red-500">TOUCH</span>
            </h1>
            <p className="text-xl font-bold text-zinc-400 mb-8 max-w-md">
              Fastest answer? Call or WhatsApp. Walk in any day during business hours — no appointment needed.
            </p>

            <div className="space-y-6 max-w-md">
              <a href={BUSINESS.phoneTel} className="flex items-start gap-4 bg-black border-4 border-zinc-800 p-5 hover:border-red-500 transition-colors">
                <Phone className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase text-lg text-white">{BUSINESS.phoneDisplay}</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase">Tap to call</div>
                </div>
              </a>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-black border-4 border-zinc-800 p-5 hover:border-yellow-400 transition-colors">
                <MessageCircle className="w-7 h-7 text-yellow-400 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase text-lg text-white">WhatsApp / Text</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase">Send us a message</div>
                </div>
              </a>
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-black border-4 border-zinc-800 p-5 hover:border-red-500 transition-colors">
                <MapPin className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase text-lg text-white">{BUSINESS.addressLine1}</div>
                  <div className="text-zinc-400 font-bold uppercase text-sm">{BUSINESS.addressLine2}</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase mt-1">Get directions</div>
                </div>
              </a>
              <div className="flex items-start gap-4 bg-black border-4 border-zinc-800 p-5">
                <Clock className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-black uppercase text-lg text-white">{BUSINESS.hoursShort}</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase">Walk-ins welcome</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
              SEND A <span className="text-yellow-400 text-stroke-black">MESSAGE</span>
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
