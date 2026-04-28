import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { ContactForm } from "@/components/forms/ContactForm";
import { RepairQuoteForm } from "@/components/forms/RepairQuoteForm";
import { SellPhoneForm } from "@/components/forms/SellPhoneForm";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { BUSINESS } from "@/content";

type FormTab = "message" | "repair" | "sell" | "appointment";

const TABS: { key: FormTab; label: string }[] = [
  { key: "message", label: "Send a message" },
  { key: "repair", label: "Get a repair quote" },
  { key: "sell", label: "Sell a phone" },
  { key: "appointment", label: "Book appointment" },
];

const TAB_HEADINGS: Record<FormTab, { title: string; accent: string }> = {
  message: { title: "SEND A", accent: "MESSAGE" },
  repair: { title: "GET A", accent: "REPAIR QUOTE" },
  sell: { title: "GET A", accent: "CASH OFFER" },
  appointment: { title: "BOOK AN", accent: "APPOINTMENT" },
};

export default function ContactPage() {
  const [tab, setTab] = useState<FormTab>("message");
  const heading = TAB_HEADINGS[tab];

  return (
    <PageShell hideTicker>
      <SEO
        title="Contact Gadget X Repairs | Houston, TX"
        description="Contact Gadget X Repairs in Houston: call (346) 623-6898, text on WhatsApp, or visit 8389 Almeda Rd Suite J-2. Submit a repair quote, sell-phone offer, appointment, or general message."
        path="/contact-houston-tx"
        jsonLd={[localBusinessJsonLd(), breadcrumbJsonLd([{ name: "Contact", path: "/contact-houston-tx" }])]}
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="py-12 md:py-16 px-4 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-8 leading-tight">
              GET IN <span className="text-red-500">TOUCH</span>
            </h1>
            <p className="text-xl font-bold text-zinc-600 mb-8 max-w-md">
              Fastest answer? Call or WhatsApp. Walk in any day during business hours — no appointment needed.
            </p>

            <div className="space-y-6 max-w-md">
              <a href={BUSINESS.phoneTel} className="flex items-start gap-4 bg-white border border-zinc-200 p-5 hover:border-red-500 transition-colors" data-testid="link-call">
                <Phone className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-bold uppercase text-lg text-zinc-900">{BUSINESS.phoneDisplay}</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase">Tap to call</div>
                </div>
              </a>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-white border border-zinc-200 p-5 hover:border-red-500 transition-colors" data-testid="link-whatsapp">
                <MessageCircle className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-bold uppercase text-lg text-zinc-900">WhatsApp / Text</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase">Send us a message</div>
                </div>
              </a>
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-white border border-zinc-200 p-5 hover:border-red-500 transition-colors" data-testid="link-maps">
                <MapPin className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-bold uppercase text-lg text-zinc-900">{BUSINESS.addressLine1}</div>
                  <div className="text-zinc-600 font-bold uppercase text-sm">{BUSINESS.addressLine2}</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase mt-1">Get directions</div>
                </div>
              </a>
              <div className="flex items-start gap-4 bg-white border border-zinc-200 p-5">
                <Clock className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <div>
                  <div className="font-bold uppercase text-lg text-zinc-900">{BUSINESS.hoursShort}</div>
                  <div className="text-zinc-500 font-bold text-xs uppercase">Walk-ins welcome</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Contact options">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  data-testid={`tab-contact-${t.key}`}
                  className={`px-3 py-2 font-bold uppercase text-xs tracking-wide border transition-colors ${ tab === t.key ? "bg-red-500 border-red-500 text-zinc-900" : "bg-zinc-100 border-zinc-300 text-zinc-600 hover:border-red-500" }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-6">
              {heading.title} <span className="text-red-500">{heading.accent}</span>
            </h2>

            {tab === "message" && <ContactForm />}
            {tab === "repair" && <RepairQuoteForm />}
            {tab === "sell" && <SellPhoneForm />}
            {tab === "appointment" && <AppointmentForm />}
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
