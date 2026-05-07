import { Wrench, Clock, MapPin, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { RepairIntakeForm } from "@/components/forms/RepairIntakeForm";
import { LocationCard } from "@/components/LocationCard";
import { SocialLinks } from "@/components/SocialLinks";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const PAGE_TITLE = "Book a Repair — OK Cellular | Humble, TX";
const PAGE_DESC =
  "Book a repair online at OK Cellular, Humble TX — phones, tablets, laptops & consoles. Drop off in-store or mail it in. Optional $10 deposit holds your slot.";

const TRUST_POINTS = [
  { icon: Wrench, text: "Most repairs done same day" },
  { icon: ShieldCheck, text: "90-day repair warranty" },
  { icon: Clock, text: "Open 7 days a week" },
  { icon: MapPin, text: "Humble, TX — or ship from anywhere" },
];

const HOW_IT_WORKS = [
  {
    num: "1",
    title: "Fill out the form",
    desc: "Tell us your device, what's wrong, and how you'd like to bring it in. Takes about 2 minutes.",
  },
  {
    num: "2",
    title: "We confirm your booking",
    desc: "We'll call or text you back to confirm the details and give you a price estimate.",
  },
  {
    num: "3",
    title: "Drop off or ship it",
    desc: "Bring your device to our Humble shop or ship it to us from anywhere in the US.",
  },
  {
    num: "4",
    title: "Pick up your fixed device",
    desc: "We fix it fast and notify you when it's ready. Most repairs are done the same day.",
  },
];

const BREADCRUMBS = [
  { label: "Book a Repair", href: "/book-repair-humble-tx" },
];

const JSON_LD_BREADCRUMBS = [
  { name: "Book a Repair", path: "/book-repair-humble-tx" },
];

export default function BookRepairPage() {
  const business = useBusiness();
  const path = "/book-repair-humble-tx";

  return (
    <PageShell>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        path={path}
        jsonLd={[
          localBusinessJsonLd(business),
          breadcrumbJsonLd(JSON_LD_BREADCRUMBS),
        ]}
      />

      {/* Hero */}
      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={BREADCRUMBS} />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-3">
            Book Your Repair Online
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Phones, tablets, laptops, consoles — drop off at our Humble, TX shop or ship it in from anywhere. Fill out the form below and we&apos;ll confirm your booking.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {TRUST_POINTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium text-white/90">
                <Icon className="w-4 h-4 text-white/70" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Form */}
          <div>
            <RepairIntakeForm />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* How it works */}
            <div className="border border-border bg-white p-5 space-y-4">
              <h2 className="font-bold text-base text-foreground">How it works</h2>
              <ol className="space-y-4">
                {HOW_IT_WORKS.map(({ num, title, desc }) => (
                  <li key={num} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {num}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Deposit info */}
            <div className="border border-emerald-200 bg-emerald-50 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-sm text-emerald-800">About the $10 deposit</span>
              </div>
              <p className="text-xs text-emerald-800">
                The optional $10 deposit holds your appointment slot and is <strong>fully applied toward your repair cost</strong>. It&apos;s refundable if we can&apos;t complete your repair.
              </p>
            </div>

            {/* Contact */}
            <div className="border border-border bg-white p-5 space-y-3">
              <h2 className="font-bold text-sm text-foreground">Prefer to call or text?</h2>
              <a
                href={BUSINESS.phoneTel}
                className="flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                {BUSINESS.phoneDisplay}
              </a>
              <p className="text-xs text-muted-foreground">
                We&apos;re available 7 days a week. Walk-ins are always welcome too.
              </p>
            </div>

            {/* Location */}
            <LocationCard />
            <SocialLinks business={business} />
          </aside>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-muted border-t border-border py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Why choose OK Cellular?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Same-day repairs", desc: "Most phones and tablets fixed while you wait." },
              { title: "90-day warranty", desc: "Every repair backed by our parts & labor guarantee." },
              { title: "Competitive pricing", desc: "Fair, upfront prices — no surprise fees." },
              { title: "All major brands", desc: "iPhone, Samsung, Google, Sony, Xbox, and more." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white border border-border p-4">
                <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
                <div className="font-bold text-sm text-foreground">{title}</div>
                <div className="text-xs text-muted-foreground mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
