import {
  Truck,
  PackageCheck,
  Wrench,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocationCard } from "@/components/LocationCard";
import {
  SEO,
  localBusinessJsonLd,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/components/SEO";
import { RepairQuoteForm } from "@/components/forms/RepairQuoteForm";
import { BUSINESS, SHIPPING } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const PAGE_TITLE = "Mail-In Phone & Laptop Repair | Gadget X Houston, TX";
const PAGE_DESC =
  "Ship your phone, tablet, laptop or console to GadgetX Repairs in Houston TX for repair. Get a quote online, mail it in, we fix it and ship it back.";

const STEPS = [
  {
    icon: Wrench,
    title: "1. Request your quote",
    desc: "Tell us what's broken and where to ship it back. We'll text or email you the price and our shipping address within one business day.",
  },
  {
    icon: Truck,
    title: "2. Ship us your device",
    desc: "Pack your device securely and mail it to our Houston shop. Use any carrier — USPS, UPS, or FedEx all work. Insurance + tracking strongly recommended.",
  },
  {
    icon: PackageCheck,
    title: "3. We repair & ship it back",
    desc: `We diagnose, repair and test your device, then ship it back to your return address. Most mail-in repairs ship back within ${SHIPPING.turnaroundDays} of arrival.`,
  },
];

const PACK_LIST = [
  "The device itself (phone, tablet, laptop, or console)",
  "A printed copy of your quote confirmation, or a note with your name + phone number",
  "Your charging cable only if the issue is charging-related",
  "Sturdy box with bubble wrap or foam — devices shift in transit",
  "Tracking + insurance from your carrier (we recommend $200+ coverage)",
];

const DO_NOT_SEND = [
  "SIM cards, microSD cards or accessories you want back (we'll discard them)",
  "Cases or screen protectors you care about — they may be removed for the repair",
  "Cash, gift cards, or anything valuable that isn't the device",
];

const FAQS = [
  {
    q: "How long does a mail-in repair take?",
    a: `Most mail-in repairs ship back within ${SHIPPING.turnaroundDays} of arriving at our shop. Total time including transit usually runs 7–10 days door-to-door, depending on your shipping carrier.`,
  },
  {
    q: "How do I pay?",
    a: "We send a payment link by text or email after we diagnose the device and you approve the price. Repairs don't begin until you say yes — no surprise charges.",
  },
  {
    q: "Who pays for return shipping?",
    a: "Return shipping is included in the quoted price (USPS Priority Mail with tracking and insurance). You only cover the cost of shipping the device to us.",
  },
  {
    q: "What if my device can't be repaired?",
    a: "If we can't fix it, we'll let you know before charging anything. You only pay return shipping ($15 flat) and we'll mail the device back to you intact.",
  },
  {
    q: "Do you offer a warranty on mail-in repairs?",
    a: "Yes — every mail-in repair carries the same 90-day warranty as our in-shop work. If the same fault returns within 90 days, we re-repair it and cover return shipping.",
  },
  {
    q: "What devices do you repair by mail?",
    a: "Phones (iPhone, Samsung, Pixel, Motorola), tablets (iPad, Galaxy Tab), laptops (MacBook, HP, Dell, Lenovo), and gaming consoles (PS5, Xbox, Switch). If you're not sure, request a quote and we'll tell you.",
  },
];

export default function MailInRepairPage() {
  const business = useBusiness();
  const path = SHIPPING.mailInSlug;
  return (
    <PageShell hideTicker>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        path={path}
        jsonLd={[
          localBusinessJsonLd(business),
          serviceJsonLd(
            "Mail-In Device Repair",
            PAGE_DESC,
            path,
            business,
          ),
          faqJsonLd(FAQS),
          breadcrumbJsonLd([{ name: "Mail-In Repair", path }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Mail-In Repair" }]} />

      {/* HERO ----------------------------------------------------------- */}
      <section
        className="relative overflow-hidden py-16 md:py-24 px-4 border-b border-zinc-200 bg-zinc-50"
        data-testid="mail-in-hero"
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-12 items-start relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="bg-red-50 text-red-600 border border-red-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wide text-xs inline-flex items-center gap-2">
                <Truck className="w-3.5 h-3.5" /> Mail-In Repair
              </span>
              <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wide text-xs inline-block">
                15 Years in Houston
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight font-extrabold tracking-tight text-zinc-900">
              Out of <span className="text-red-600">Houston?</span> Mail us your device.
            </h1>
            <p className="text-lg md:text-xl font-medium text-zinc-600 max-w-2xl">
              Ship your phone, tablet, laptop or console to our Houston shop. We diagnose,
              repair and ship it back — usually within {SHIPPING.turnaroundDays} of arrival.
              Same 90-day warranty as our in-shop work.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-base font-bold text-zinc-700 pt-2 max-w-xl">
              {[
                "Quote first — no work until you approve",
                "Return shipping included in price",
                "90-day warranty on every repair",
                "All major brands — phones, tablets, laptops, consoles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="uppercase tracking-tight text-sm md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <a
                href="#mail-in-form"
                className="inline-block bg-red-600 hover:bg-zinc-900 text-white font-semibold uppercase tracking-wide text-base h-14 px-8 leading-[3.5rem] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                data-testid="hero-cta-mail-in"
              >
                Start My Mail-In Repair →
              </a>
            </div>
          </div>

          {/* Right: ship-to address card */}
          <div className="lg:col-span-5 w-full">
            <div
              className="bg-zinc-900 text-white p-6 md:p-8 shadow-md"
              data-testid="ship-to-card"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-zinc-800 pb-4">
                <Truck className="w-6 h-6 text-red-500" />
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                  Ship to <span className="text-red-500">Gadget X</span>
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-zinc-400 font-bold uppercase tracking-wide text-xs">
                  Mail-in shipping address
                </p>
                <address className="not-italic font-bold text-base leading-relaxed">
                  {BUSINESS.name}
                  <br />
                  Attn: Mail-In Repair
                  <br />
                  {business.addressLine1}
                  <br />
                  {business.addressLine2}
                </address>
                <div className="pt-4 border-t border-zinc-800 grid gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <a
                      href={business.phoneTel}
                      className="font-semibold uppercase tracking-wide text-zinc-300 hover:text-red-500 transition-colors"
                    >
                      {business.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <span className="font-semibold uppercase tracking-wide text-zinc-300">
                      Boxes received {business.hoursShort}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <a
                      href={business.mapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold uppercase tracking-wide text-zinc-300 hover:text-red-500 transition-colors"
                    >
                      View on map
                    </a>
                  </div>
                </div>
                <p className="text-xs font-medium text-zinc-400 pt-3 border-t border-zinc-800">
                  Wait for your quote confirmation before shipping — we&apos;ll text you the
                  ship-to address along with packing instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-STEP FLOW -------------------------------------------------- */}
      <section className="py-16 md:py-20 px-4 bg-white" data-testid="mail-in-steps">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-zinc-900">
              How mail-in <span className="text-red-600">repair</span> works
            </h2>
            <p className="text-base font-bold text-zinc-600 uppercase tracking-tight max-w-md">
              Three steps. No appointment. No driving across town.
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="bg-zinc-50 border border-zinc-200 p-6 shadow-sm flex flex-col gap-4"
                  data-testid={`step-${step.title.charAt(0)}`}
                >
                  <div className="bg-zinc-900 text-white w-12 h-12 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-700">{step.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* WHAT TO SHIP / NOT TO SHIP ----------------------------------- */}
      <section
        className="py-16 md:py-20 px-4 bg-zinc-100 border-y border-zinc-200"
        data-testid="mail-in-pack"
      >
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-zinc-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <PackageCheck className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                What to put in the box
              </h2>
            </div>
            <ul className="space-y-3">
              {PACK_LIST.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium text-zinc-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-zinc-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                Don&apos;t send these
              </h2>
            </div>
            <ul className="space-y-3">
              {DO_NOT_SEND.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium text-zinc-700"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide mt-6 pt-6 border-t border-zinc-200">
              Remove your screen lock or share your passcode in the quote notes — we
              can&apos;t test the repair without unlocking the device.
            </p>
          </div>
        </div>
      </section>

      {/* INTAKE FORM -------------------------------------------------- */}
      <section
        id="mail-in-form"
        className="py-16 md:py-20 px-4 bg-zinc-50 scroll-mt-24"
        data-testid="mail-in-form-section"
      >
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 leading-tight">
              Start your <br />
              <span className="text-red-600">mail-in repair</span>
            </h2>
            <p className="text-lg font-bold text-zinc-600 mb-8 max-w-md uppercase tracking-tight">
              Tell us about your device and where to ship it back. We reply within one
              business day with the quote and shipping address.
            </p>
            <ul className="space-y-3 text-base font-bold text-zinc-700 mb-10">
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">90-day warranty</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">
                  Quote within one business day
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">
                  Return shipping included in quote
                </span>
              </li>
            </ul>
            <div className="bg-zinc-900 text-white p-6 shadow-md">
              <div className="font-semibold uppercase tracking-wide text-xs text-zinc-500 mb-2">
                Prefer to talk first?
              </div>
              <a
                href={business.phoneTel}
                className="font-bold uppercase text-2xl tracking-tight hover:text-red-500 transition-colors block"
              >
                <Phone className="w-5 h-5 inline mr-2 text-red-500" />
                {business.phoneDisplay}
              </a>
              <div className="text-xs font-bold text-zinc-500 mt-2 uppercase tracking-wide">
                {business.hoursShort}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <RepairQuoteForm mode="mail-in" />
          </div>
        </div>
      </section>

      {/* FAQ ---------------------------------------------------------- */}
      <section className="py-16 md:py-20 px-4 bg-white" data-testid="mail-in-faq">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-10 text-zinc-900 text-center">
            Mail-in repair <span className="text-red-600">FAQ</span>
          </h2>
          <dl className="space-y-6">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="border-b border-zinc-200 pb-6 last:border-b-0"
              >
                <dt className="text-lg md:text-xl font-extrabold text-zinc-900 mb-2">
                  {f.q}
                </dt>
                <dd className="text-base font-medium text-zinc-700 leading-relaxed">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
