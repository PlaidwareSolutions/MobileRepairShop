import { useState } from "react";
import { Link } from "wouter";
import { Phone, MessageCircle, MapPin, Clock, Truck, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { ContactForm } from "@/components/forms/ContactForm";
import { RepairQuoteForm } from "@/components/forms/RepairQuoteForm";
import { SellPhoneForm } from "@/components/forms/SellPhoneForm";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { SocialLinks } from "@/components/SocialLinks";
import { BUSINESS, SHIPPING } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

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
  const business = useBusiness();
  const [tab, setTab] = useState<FormTab>("message");
  const heading = TAB_HEADINGS[tab];

  return (
    <PageShell hideTicker>
      <SEO
        title="Contact OK Cellular Houston TX"
        description="Get in touch with OK Cellular in Humble TX. Find our address, phone number & hours. Contact us for repairs, activations & more. Call today!"
        path="/contact-houston-tx"
        jsonLd={[localBusinessJsonLd(business), breadcrumbJsonLd([{ name: "Contact", path: "/contact-houston-tx" }])]}
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="py-12 md:py-16 px-4 bg-muted/40 border-b border-border">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8 leading-tight">
              Get in <span className="text-primary">touch</span>
            </h1>
            <p className="text-xl font-bold text-muted-foreground mb-8 max-w-md">
              Fastest answer? Call or WhatsApp. Walk in any day during business hours — no appointment needed.
            </p>

            <div className="space-y-6 max-w-md">
              <a href={business.phoneTel} className="flex items-start gap-4 bg-white border border-border p-5 hover:border-primary transition-colors" data-testid="link-call">
                <Phone className="w-7 h-7 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-base text-foreground">{business.phoneDisplay}</div>
                  <div className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Tap to call</div>
                </div>
              </a>
              <a href={business.whatsappHref} target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-white border border-border p-5 hover:border-primary transition-colors" data-testid="link-whatsapp">
                <MessageCircle className="w-7 h-7 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-base text-foreground">WhatsApp / Text</div>
                  <div className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Send us a message</div>
                </div>
              </a>
              <a href={business.mapsLink} target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-white border border-border p-5 hover:border-primary transition-colors" data-testid="link-maps">
                <MapPin className="w-7 h-7 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-base text-foreground">{business.addressLine1}</div>
                  <div className="text-muted-foreground font-medium text-sm">{business.addressLine2}</div>
                  <div className="text-muted-foreground font-medium text-xs uppercase tracking-wide mt-1">Get directions</div>
                </div>
              </a>
              <div className="flex items-start gap-4 bg-white border border-border p-5">
                <Clock className="w-7 h-7 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-base text-foreground">{business.hoursShort}</div>
                  <div className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Walk-ins welcome</div>
                </div>
              </div>
              <SocialLinks
                business={business}
                className="flex-wrap"
                iconClass="w-6 h-6"
              />
              <Link
                href={SHIPPING.mailInSlug}
                className="flex items-start gap-4 bg-muted/60 border border-primary p-5 hover:bg-primary/10 hover:border-primary transition-colors group focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="contact-mail-in-callout"
              >
                <Truck className="w-7 h-7 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="font-semibold text-base text-foreground">{SHIPPING.mailInTitle}</div>
                  <div className="text-foreground font-medium text-sm mt-1">{SHIPPING.desc}</div>
                  <div className="text-primary font-semibold text-xs mt-2 inline-flex items-center gap-1">
                    Start a mail-in repair <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
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
                  className={`px-3 py-2 font-semibold text-xs tracking-wide border transition-colors ${ tab === t.key ? "bg-primary border-primary text-foreground" : "bg-muted border-border text-muted-foreground hover:border-primary" }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
              {heading.title} <span className="text-primary">{heading.accent}</span>
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
