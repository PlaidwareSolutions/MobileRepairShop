import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Truck,
  Phone,
  MessageCircle,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { LocationCard } from "@/components/LocationCard";
import { SocialLinks } from "@/components/SocialLinks";
import {
  SEO,
  localBusinessJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/SEO";
import { FinancingForm } from "@/components/forms/FinancingForm";
import { FinancingCalculator } from "@/components/FinancingCalculator";
import { Button } from "@/components/ui/button";
import { BUSINESS, FINANCING, FINANCING_PAGE } from "@/content";
import { useBusiness } from "@/components/BusinessContext";
import { fetchInventory } from "@/lib/api";
import { isPhoneCategory } from "@/lib/inventoryGroups";

type PublicInventoryItem = {
  id: string;
  category: string;
  brand: string;
  model: string;
  price: string;
  storage?: string;
  availability?: string;
  financingEnabled?: boolean;
};

type PhoneCard = {
  name: string;
  storage: string;
  retailPrice: number;
  fromMonthly: number;
  tag: string | null;
  id?: string;
};

function parseRetailPrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

function toPhoneCard(item: PublicInventoryItem): PhoneCard {
  const retailPrice = parseRetailPrice(item.price ?? "");
  return {
    id: item.id,
    name: `${item.brand} ${item.model}`.trim(),
    storage: item.storage ?? "",
    retailPrice,
    fromMonthly: retailPrice > 0 ? Math.ceil(retailPrice / 18) : 0,
    tag: null,
  };
}

export default function FinancingPage() {
  const business = useBusiness();
  const path = FINANCING.pagePath;
  const formRef = useRef<HTMLFormElement>(null);
  const [phoneSelection, setPhoneSelection] = useState<{ name: string; tick: number } | null>(null);

  const [phoneCards, setPhoneCards] = useState<PhoneCard[]>(
    FINANCING_PAGE.phoneExamples,
  );
  const [liveLoaded, setLiveLoaded] = useState(false);

  function handlePhoneCardClick(phoneName: string) {
    setPhoneSelection((prev) => ({ name: phoneName, tick: (prev?.tick ?? 0) + 1 }));
  }

  useEffect(() => {
    if (!phoneSelection) return;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = formRef.current?.querySelector<HTMLInputElement>(
      "[data-testid='input-financing-desired-phone']"
    );
    input?.focus();
  }, [phoneSelection]);

  useEffect(() => {
    fetchInventory()
      .then((raw) => {
        const items = raw as unknown as PublicInventoryItem[];
        const inStockPhones = items.filter(
          (it) => isPhoneCategory(it.category) && it.availability === "In stock",
        );
        const financingEligible = inStockPhones.filter(
          (it) => it.financingEnabled === true,
        );
        const candidates = financingEligible.length > 0 ? financingEligible : inStockPhones;
        const display = candidates.slice(0, 8);
        if (display.length > 0) {
          setPhoneCards(display.map(toPhoneCard));
          setLiveLoaded(true);
        }
        // If API is reachable but no in-stock phones, keep static examples
      })
      .catch(() => {
        // API unreachable — keep static examples silently
      });
  }, []);

  const meta = {
    title: "Phone Financing Humble TX | $10 Down | OK Cellular",
    description:
      "Phone financing in Humble TX from $10 down. Walk out the same day with an unlocked iPhone, Samsung or Pixel. Pre-qualify in 60 seconds — no credit pull.",
  };

  return (
    <PageShell hideTicker>
      <SEO
        title={meta.title}
        description={meta.description}
        path={path}
        jsonLd={[
          localBusinessJsonLd(business),
          breadcrumbJsonLd([{ name: "Phone Financing", path }]),
          faqJsonLd(FINANCING_PAGE.faqs),
        ]}
      />
      <Breadcrumbs items={[{ label: "Phone Financing" }]} />

      <PageHero
        eyebrow={FINANCING_PAGE.hero.eyebrow}
        h1={FINANCING_PAGE.hero.h1}
        subhead={FINANCING_PAGE.hero.subhead}
      />

      {/* PROGRAM HIGHLIGHTS + FORM ----------------------------------- */}
      <section className="py-16 px-4 bg-muted/40 border-b border-border">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
              from <span className="text-primary">{FINANCING.pillLabel}</span>
            </h2>
            <p className="text-base font-bold text-muted-foreground mb-6">
              {FINANCING_PAGE.partnerLabel}. We don&apos;t share rates online — the lender
              shows you the exact down payment and schedule in store before you commit.
            </p>
            <ul className="space-y-3 mb-8">
              {FINANCING_PAGE.programHighlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-base font-bold text-foreground"
                  data-testid="financing-highlight"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-6"
              >
                <a href={business.phoneTel} data-testid="financing-cta-call">
                  <Phone className="w-4 h-4 mr-2" /> Call to Apply
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border border-border hover:bg-white hover:text-black font-semibold h-12 px-6"
              >
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="financing-cta-text"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Text Us
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border border-border hover:bg-white hover:text-black font-semibold h-12 px-6"
              >
                <Link href="/inventory/phones" data-testid="financing-cta-inventory">
                  Browse Phones
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">
              Pre-<span className="text-primary">qualify</span>
            </h2>
            <p className="text-base font-bold text-muted-foreground mb-6">
              60-second soft check. We text you back today during business hours.
            </p>
            <FinancingForm defaultPhone={phoneSelection?.name} phoneTick={phoneSelection?.tick} formRef={formRef} />
          </div>
        </div>
      </section>

      {/* PHONE EXAMPLES ----------------------------------------------- */}
      <section className="py-16 px-4 bg-white border-b border-border">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Popular phones <span className="text-primary">you can finance</span>
            </h2>
            {liveLoaded && (
              <span className="text-xs font-semibold uppercase tracking-wide text-primary border border-primary px-2 py-0.5">
                Live Inventory
              </span>
            )}
          </div>
          <p className="text-base font-bold text-muted-foreground mb-8">
            {liveLoaded
              ? "In-stock phones available for financing. Monthly estimates based on an 18-month term with $0 down — exact schedule confirmed in store."
              : "Example monthly payments based on an 18-month term with $0 down. Exact numbers confirmed in store."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {phoneCards.map((phone) => (
              <button
                key={(phone.id ?? phone.name) + phone.storage}
                type="button"
                onClick={() => handlePhoneCardClick(phone.name)}
                className="relative bg-muted/40 border border-border p-5 flex flex-col gap-3 text-left cursor-pointer hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors group"
                data-testid="financing-phone-example"
                aria-label={`Pre-qualify for ${phone.name}`}
              >
                {phone.tag && (
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5">
                    {phone.tag}
                  </span>
                )}
                <div className="bg-foreground text-white w-10 h-10 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-base text-foreground leading-tight">{phone.name}</div>
                  <div className="text-xs font-bold text-muted-foreground">{phone.storage}</div>
                </div>
                <div className="mt-auto">
                  <div className="text-3xl font-semibold text-primary">
                    from ${phone.fromMonthly}
                    <span className="text-base font-bold text-muted-foreground">/mo</span>
                  </div>
                  <div className="text-xs font-bold text-muted-foreground mt-0.5">
                    Retail ~${phone.retailPrice} · 18-mo est.
                  </div>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Pre-qualify →
                </div>
              </button>
            ))}
          </div>

          {/* CALCULATOR */}
          <FinancingCalculator />
        </div>
      </section>

      {/* HOW IT WORKS ------------------------------------------------- */}
      <section className="py-16 px-4 bg-white border-b border-border">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8 text-foreground">
            How it <span className="text-primary">works</span>
          </h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FINANCING_PAGE.steps.map((step, i) => (
              <li
                key={step.title}
                className="bg-muted/40 border border-border p-5 flex flex-col gap-3"
                data-testid={`financing-step-${i + 1}`}
              >
                <div className="bg-foreground text-primary w-10 h-10 flex items-center justify-center font-semibold text-lg">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-base text-foreground">{step.title}</h3>
                <p className="text-sm font-bold text-muted-foreground leading-snug">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT YOU NEED + ELIGIBLE DEVICES ----------------------------- */}
      <section className="py-16 px-4 bg-muted/40 border-b border-border">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-12">
          <div className="bg-white border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                What you need to apply
              </h2>
            </div>
            <ul className="space-y-3">
              {FINANCING_PAGE.eligibility.map((e) => (
                <li
                  key={e}
                  className="flex items-start gap-3 text-base font-bold text-foreground"
                  data-testid="financing-eligibility"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-6">
              Bring everything to the shop and we&apos;ll handle the rest. Most approvals take
              under 10 minutes.
            </p>
          </div>

          <div className="bg-white border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Eligible devices
              </h2>
            </div>
            <p className="text-base font-bold text-foreground mb-4">
              {FINANCING_PAGE.eligibleDevicesNote}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["iPhone", "Samsung Galaxy", "Google Pixel", "Motorola", "OnePlus"].map((b) => (
                <span
                  key={b}
                  className="bg-muted border border-border px-3 py-1 font-semibold text-xs"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11 px-5"
              >
                <Link href="/inventory/phones" data-testid="financing-eligible-inventory">
                  Browse Phones in Stock
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border border-border hover:bg-white hover:text-black font-semibold h-11 px-5"
              >
                <Link href="/used-phones-humble-tx">Used Phones</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FINANCE WITH US ------------------------------------------ */}
      <section className="py-16 px-4 bg-white border-b border-border">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8 text-foreground">
            Why finance <span className="text-primary">with us</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-muted/40 border border-border p-5" data-testid="financing-why-1">
              <div className="bg-foreground text-white w-12 h-12 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">No surprises</h3>
              <p className="text-sm font-bold text-muted-foreground">
                Down payment and schedule are confirmed before you sign — never a hidden fee
                added later.
              </p>
            </div>
            <div className="bg-muted/40 border border-border p-5" data-testid="financing-why-2">
              <div className="bg-foreground text-white w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">Walk out today</h3>
              <p className="text-sm font-bold text-muted-foreground">
                We activate the line and transfer your data in store, so you leave with a phone
                that&apos;s ready to use.
              </p>
            </div>
            <div className="bg-muted/40 border border-border p-5" data-testid="financing-why-3">
              <div className="bg-foreground text-white w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">90-day warranty</h3>
              <p className="text-sm font-bold text-muted-foreground">
                Every financed phone is backed by the same 90-day repair warranty as a cash
                purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Faq items={FINANCING_PAGE.faqs} title="Financing — Frequently Asked Questions" />

      {(business.socialFacebook || business.socialInstagram || business.socialTiktok || business.socialYoutube || business.socialX) && (
        <section className="bg-background border-t border-border" data-testid="financing-follow-us">
          <div className="max-w-[1240px] mx-auto px-4 py-8 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">Follow us</div>
              <p className="text-sm text-muted-foreground">See more shop updates and customer stories.</p>
            </div>
            <SocialLinks business={business} iconClass="w-5 h-5" />
          </div>
        </section>
      )}

      <LocationCard />
    </PageShell>
  );
}
