import { useMemo } from "react";
import { Link } from "wouter";
import { CheckCircle2, Phone, Calendar, ArrowRight, Home } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { LocationCard } from "@/components/LocationCard";
import { BUSINESS } from "@/content";

type FromType = "booking" | "quote" | "appointment" | "financing" | "contact" | "sell" | "reservation" | "other";

const MESSAGES: Record<FromType, { heading: string; body: string; sub: string }> = {
  booking: {
    heading: "You're booked.",
    body: "We got your repair request and will call or text you shortly to confirm the details.",
    sub: "Bring your device to the shop at your scheduled time — walk-ins always welcome too.",
  },
  quote: {
    heading: "Quote request received.",
    body: "We'll call or text you back today with your repair quote.",
    sub: "For the fastest response, give us a call directly.",
  },
  appointment: {
    heading: "Appointment booked.",
    body: "We'll confirm your appointment by text or call. Walk-ins are always welcome too.",
    sub: "See you soon at our Humble, TX shop.",
  },
  financing: {
    heading: "Pre-qualification received.",
    body: "We'll text or call you back today during business hours with your next step.",
    sub: "No credit check required — just $10 down to get started.",
  },
  contact: {
    heading: "Message received.",
    body: "We'll get back to you today during business hours.",
    sub: "If it's urgent, give us a call.",
  },
  sell: {
    heading: "Offer coming your way.",
    body: "We'll text or call you back today with our offer.",
    sub: "Bring your phone in with a valid ID for cash on the spot.",
  },
  reservation: {
    heading: "Item reserved.",
    body: "We'll hold your item for 24 hours and call to confirm.",
    sub: "Come in during business hours — walk-ins welcome.",
  },
  other: {
    heading: "We got it.",
    body: "Someone from our team will be in touch shortly.",
    sub: "Questions? Give us a call.",
  },
};

export default function ThankYouPage() {
  const from = useMemo<FromType>(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("from") ?? "";
    const valid: FromType[] = ["booking", "quote", "appointment", "financing", "contact", "sell", "reservation"];
    return valid.includes(raw as FromType) ? (raw as FromType) : "other";
  }, []);

  const depositPaid = useMemo(() => {
    return new URLSearchParams(window.location.search).get("deposit") === "1";
  }, []);

  const msg = MESSAGES[from];

  return (
    <PageShell>
      <SEO
        title="Thank You | OK Cellular Repairs"
        description="Your submission has been received. We'll be in touch shortly."
        path="/thank-you"
        noindex
      />

      <div className="min-h-[70vh] bg-background flex flex-col">
        {/* Success hero */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <div className="flex justify-center">
              <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-900/40">
                <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              {msg.heading}
            </h1>

            {depositPaid && (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                $10 deposit confirmed — your slot is held
              </div>
            )}

            <p className="text-white/80 text-lg max-w-xl mx-auto">{msg.body}</p>
            <p className="text-white/50 text-sm">{msg.sub}</p>
          </div>
        </section>

        {/* Quick actions */}
        <section className="py-10 px-4 bg-muted border-b border-border">
          <div className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-4">
            <a
              href={BUSINESS.phoneTel}
              className="flex flex-col items-center gap-2 bg-white border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all text-center"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow">
                <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-semibold text-sm text-foreground">Call us</span>
              <span className="text-xs text-muted-foreground">{BUSINESS.phoneDisplay}</span>
            </a>

            <Link
              href="/book-repair-humble-tx"
              className="flex flex-col items-center gap-2 bg-white border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all text-center"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow">
                <Calendar className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-semibold text-sm text-foreground">Book another repair</span>
              <span className="text-xs text-muted-foreground">Start a new request</span>
            </Link>

            <Link
              href="/phone-repair-humble-tx"
              className="flex flex-col items-center gap-2 bg-white border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all text-center"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow">
                <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-semibold text-sm text-foreground">Back to home</span>
              <span className="text-xs text-muted-foreground">Browse all services</span>
            </Link>
          </div>
        </section>

        {/* Repair services quick links */}
        <section className="py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-sm text-muted-foreground mb-4">
              While you wait — explore our most popular services
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "iPhone Repair", to: "/iphone-repair-humble-tx" },
                { label: "Samsung Repair", to: "/samsung-repair-humble-tx" },
                { label: "MacBook Repair", to: "/macbook-repair-humble-tx" },
                { label: "PS5 Repair", to: "/ps5-repair-humble-tx" },
                { label: "Phones for Sale", to: "/phones-for-sale-humble-tx" },
                { label: "Financing", to: "/financing-humble-tx" },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  href={to}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline border border-primary/30 rounded-full px-3 py-1 hover:bg-primary/5 transition-colors"
                >
                  {label} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Location card */}
        <section className="py-6 px-4 pb-12">
          <div className="max-w-2xl mx-auto">
            <LocationCard />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
