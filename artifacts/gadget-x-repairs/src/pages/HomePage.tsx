import { Link } from "wouter";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Headphones,
  Wrench,
  Zap,
  Star,
  Shield,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Battery,
  Wifi,
  Phone,
  MapPin,
  Clock,
  Truck,
  CreditCard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { PromoCampaignBanner } from "@/components/PromoCampaignBanner";
import { LocationCard } from "@/components/LocationCard";
import { RepairQuoteWizard } from "@/components/forms/RepairQuoteWizard";
import { SEO, localBusinessJsonLd } from "@/components/SEO";
import { PhotoFrame, type Photo } from "@/components/PhotoFrame";
import { BeforeAfter, type BeforeAfterPair } from "@/components/BeforeAfter";
import { BUSINESS, HERO, SHIPPING, FINANCING } from "@/content";
import { INVENTORY_GROUPS } from "@/lib/inventoryGroups";

// Each known inventory group has its own canonical path (`/inventory/<slug>`)
// so the homepage tile deep-links into a real, indexable page instead of a
// query-string-filtered view that Google mostly ignores.
const inventoryHref = (slug: string) => `/inventory/${encodeURIComponent(slug)}`;

const groupSlug = (slug: string): string => {
  const found = INVENTORY_GROUPS.find((g) => g.slug === slug);
  if (!found) {
    // Fail loud at module load so a typo here can't silently send shoppers to
    // an unfiltered inventory page.
    throw new Error(`Unknown inventory group slug: ${slug}`);
  }
  return found.slug;
};

const photo = (slug: string, alt: string): Photo => ({
  src640: `/images/photos/${slug}-640.jpg`,
  src1024: `/images/photos/${slug}-1024.jpg`,
  alt,
});

const SERVICE_TILES: {
  name: string;
  desc: string;
  icon: LucideIcon;
  to: string;
  image?: Photo;
}[] = [
  { name: "iPhone Repair", desc: "Screen, battery, charging port.", icon: Smartphone, to: "/iphone-repair-houston-tx",
    image: photo("iphone-repair", "Technician using a precision screwdriver on an opened iPhone") },
  { name: "Samsung Repair", desc: "Galaxy S, Note, A and Z series.", icon: Smartphone, to: "/samsung-repair-houston-tx",
    image: photo("samsung-repair", "Disassembled Samsung smartphone with the back glass removed on a repair workbench") },
  { name: "Pixel Repair", desc: "Google Pixel 3 through 9 Pro.", icon: Smartphone, to: "/google-pixel-repair-houston-tx",
    image: photo("pixel-repair", "Pixel-style smartphone laid out with repair tools on a workbench") },
  { name: "iPad / Tablet", desc: "Glass, LCD, battery replacement.", icon: Tablet, to: "/tablet-repair-houston-tx",
    image: photo("tablet-repair", "Hands holding a digital tablet up close") },
  { name: "MacBook Repair", desc: "Screen, battery, keyboard, board.", icon: Laptop, to: "/macbook-repair-houston-tx",
    image: photo("macbook-repair", "Technician soldering a laptop logic board at the workbench") },
  { name: "Laptop Repair", desc: "HP, Dell, Lenovo, ASUS, Acer.", icon: Laptop, to: "/laptop-repair-houston-tx",
    image: photo("laptop-repair", "A hand fixing the internal parts of a laptop") },
  { name: "PS5 Repair", desc: "HDMI port, disc drive, no power.", icon: Gamepad2, to: "/ps5-repair-houston-tx",
    image: photo("ps5-repair", "Close-up of a PlayStation 5 DualSense controller") },
  { name: "Xbox Repair", desc: "Power issues, HDMI, disc drive.", icon: Gamepad2, to: "/xbox-repair-houston-tx",
    image: photo("xbox-repair", "Xbox controller and console set up on a workbench") },
  { name: "Battery Replace", desc: "Phones, tablets, laptops.", icon: Battery, to: "/battery-replacement-houston-tx",
    image: photo("battery-replace", "Open phone with battery exposed and repair tools laid out") },
  { name: "Accessories", desc: "Cases, chargers, screen protectors.", icon: Headphones, to: "/phone-accessories-houston-tx",
    image: photo("accessories", "Smartphone displayed alongside cases and accessories on a counter") },
];

const beforeAfterPair = (slug: string, label: string, beforeAlt: string, afterAlt: string): BeforeAfterPair => ({
  slug,
  label,
  before: photo(`before-${slug}`, beforeAlt),
  after: photo(`after-${slug}`, afterAlt),
});

const BEFORE_AFTER_PAIRS: BeforeAfterPair[] = [
  beforeAfterPair(
    "iphone-screen",
    "iPhone Screen Replacement",
    "iPhone with shattered front display glass spider-webbed across the screen",
    "Same iPhone with a brand-new pristine display showing a clean blue lock screen",
  ),
  beforeAfterPair(
    "samsung-back",
    "Samsung Back Glass",
    "Samsung Galaxy with the rear glass panel completely shattered",
    "Same Samsung Galaxy with a flawless mirror-clean replacement back glass",
  ),
  beforeAfterPair(
    "logic-board",
    "Water-Damaged Board",
    "Smartphone logic board with white-blue corrosion crusted over the chips",
    "Same logic board after micro-soldering and ultrasonic cleaning, components shiny again",
  ),
  beforeAfterPair(
    "ipad-frame",
    "Tablet Battery Swap",
    "Tablet with a swollen lithium battery lifting the screen away from a bent aluminum frame",
    "Same tablet with a fresh battery installed and the frame realigned flush",
  ),
  beforeAfterPair(
    "hdmi-port",
    "Console HDMI Repair",
    "Gaming console HDMI port with bent and crushed gold connector pins",
    "Same HDMI port rebuilt with all pins straight and aligned again",
  ),
  beforeAfterPair(
    "macbook-keys",
    "Keyboard Repair",
    "Laptop keyboard with three keys missing and the scissor mechanisms exposed",
    "Same laptop keyboard fully restored with every key seated and aligned",
  ),
];

const HERO_DIAGNOSTIC: { name: string; price: string; icon: LucideIcon; to: string }[] = [
  { name: "iPhone Screen", price: "from $79", icon: Smartphone, to: "/iphone-screen-repair-houston-tx" },
  { name: "Battery Swap", price: "from $49", icon: Battery, to: "/battery-replacement-houston-tx" },
  { name: "PS5 HDMI", price: "from $99", icon: Gamepad2, to: "/ps5-hdmi-repair-houston-tx" },
  { name: "MacBook Repair", price: "free quote", icon: Laptop, to: "/macbook-repair-houston-tx" },
];

const WHY_TILES: {
  title: string;
  desc: string;
  icon: LucideIcon;
  image?: Photo;
  // Optional internal link. The "We Ship" tile points at the dedicated
  // mail-in repair landing page so out-of-area visitors can actually start
  // an intake online instead of just reading a one-line callout. The
  // "Easy Financing" tile points at the financing landing page. Tiles
  // without a `to` render as static cards (no link), preserving the
  // previous behavior for the trust-points tiles.
  to?: string;
}[] = [
  { title: "15 Years Heritage", desc: "Houston's trusted repair shop since 2010.", icon: Star,
    image: photo("trust-heritage", "Portrait of a senior shop owner looking at the camera") },
  { title: "Same-Day Turnaround", desc: "Most repairs done in 1–2 hours while you wait.", icon: Zap,
    image: photo("trust-sameday", "Customer being handed their phone back at the counter") },
  { title: "Certified Technicians", desc: "Skilled techs who know every device, inside and out.", icon: ShieldCheck,
    image: photo("trust-certified", "Technician inspecting a circuit board through a microscope") },
  { title: "90-Day Warranty", desc: "Every repair backed by our 90-day warranty.", icon: CheckCircle2,
    image: photo("trust-warranty", "Smiling man in a black suit shaking hands with a customer") },
  { title: SHIPPING.shortLabel, desc: SHIPPING.desc, icon: Truck, to: SHIPPING.mailInSlug },
  { title: FINANCING.shortLabel, desc: FINANCING.desc, icon: CreditCard, to: FINANCING.pagePath },
];

const FEATURED_OFFERS = [
  { title: "iPhone Screen", price: "from $79", note: "Most models in stock", icon: Smartphone, to: "/iphone-repair-houston-tx" },
  { title: "Battery Replacement", price: "from $49", note: "Phones, tablets, laptops", icon: Battery, to: "/battery-replacement-houston-tx" },
  { title: "HDMI Port Repair", price: "from $99", note: "PS5, Xbox, Switch", icon: Gamepad2, to: "/hdmi-port-repair-houston-tx" },
  { title: "Used Phones", price: "from $99", note: "Unlocked, tested, warrantied", icon: Smartphone, to: "/used-phones-houston-tx" },
  { title: "Prepaid Activation", price: "Walk in", note: "Cricket, Metro, T-Mobile, AT&T", icon: Wifi, to: "/phone-activation-houston-tx" },
];

const SELL_TILES: {
  name: string;
  desc: string;
  icon: LucideIcon;
  to: string;
  slug: string;
  image?: Photo;
}[] = [
  { name: "Apple", desc: "iPhones, iPads, MacBooks, Watches, AirPods", icon: Smartphone, to: inventoryHref(groupSlug("apple")), slug: groupSlug("apple"),
    image: photo("sell-phones", "Row of unlocked Apple iPhones on display stands at the shop counter") },
  { name: "Samsung", desc: "Galaxy S, Note, A and Z series", icon: Smartphone, to: inventoryHref(groupSlug("samsung")), slug: groupSlug("samsung"),
    image: photo("sell-tablets", "Refurbished Samsung Galaxy phones on display stands at the shop counter") },
  { name: "Google", desc: "Pixel 3 through 9 Pro", icon: Smartphone, to: inventoryHref(groupSlug("google")), slug: groupSlug("google"),
    image: photo("sell-laptops", "Google Pixel phones lined up on the shop counter") },
  { name: "Gaming Consoles", desc: "PlayStation, Xbox, Switch", icon: Gamepad2, to: inventoryHref(groupSlug("consoles")), slug: groupSlug("consoles"),
    image: photo("sell-consoles", "Refurbished gaming consoles and controllers on the shop counter") },
];

const PREPAID_TILES = [
  { label: "Cricket", to: "/phone-activation-houston-tx" },
  { label: "Metro by T-Mobile", to: "/phone-activation-houston-tx" },
  { label: "T-Mobile", to: "/phone-activation-houston-tx" },
  { label: "AT&T Prepaid", to: "/att-activation-houston-tx" },
  { label: "Boost Mobile", to: "/boost-mobile-activation-houston-tx" },
  { label: "Gen Mobile", to: "/gen-mobile-activation-houston-tx" },
  { label: "Simple Mobile", to: "/simple-mobile-activation-houston-tx" },
  { label: "H2O Wireless", to: "/h2o-wireless-activation-houston-tx" },
  { label: "Lyca Mobile", to: "/lyca-mobile-activation-houston-tx" },
  { label: "Verizon Prepaid", to: "/verizon-prepaid-activation-houston-tx" },
];

const AREA_TILES = [
  { label: "Houston", to: "/phone-repair-houston-tx" },
  { label: "Sugar Land", to: "/phone-repair-sugar-land-tx" },
  { label: "Missouri City", to: "/phone-repair-missouri-city-tx" },
  { label: "Stafford", to: "/phone-repair-stafford-tx" },
  { label: "Katy", to: "/phone-repair-katy-tx" },
  { label: "Alief", to: "/phone-repair-alief-tx" },
  { label: "Sharpstown", to: "/phone-repair-sharpstown-tx" },
];

export default function HomePage() {
  const [ctaCall, ctaQuote, ctaDirections] = HERO.ctas;

  return (
    <PageShell>
      <SEO
        title="Best Phone Repair Houston TX | GadgetX Repairs"
        description="Top-rated phone repair in Houston TX. Fast fixes for screens, batteries & charging ports. Walk-ins welcome. Free quote at GadgetX Repairs today!"
        path="/phone-repair-houston-tx"
        jsonLd={localBusinessJsonLd()}
      />

      {/* OWNER-MANAGED CAMPAIGN BANNER ---------------------------------- */}
      {/* Animated banner driven by /admin/promotions. The API server is the
          single source of truth for which rows are live; this component
          handles entrance animation, rotation, and session dismissal. During
          SSG/SSR the build script best-effort fetches the live promos and
          seeds them via SsrPromosContext so the first promo renders in
          static HTML for crawlers — and falls back gracefully to no banner
          when the API is unreachable at build time. The client always
          re-fetches on mount, so paused or scheduled-for-later campaigns
          never appear regardless of when the prerender ran. */}
      <PromoCampaignBanner />

      {/* HERO ----------------------------------------------------------- */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 bg-zinc-100">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
          {/* Left: headline + CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wide text-xs inline-block">
                {HERO.badgeYears}
              </span>
              <span className="bg-red-50 text-red-600 border border-red-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wide text-xs inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> {HERO.badgeRepairTime}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold tracking-tight text-zinc-900">
              Houston&apos;s <span className="text-red-600">Fix</span> for Phones, Tablets, Laptops &amp; Consoles.
            </h1>
            <p className="text-lg md:text-xl font-medium text-zinc-600 max-w-xl tracking-normal">
              {HERO.subhead}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                className="bg-red-600 hover:bg-zinc-900 text-white font-semibold uppercase tracking-wide text-base h-14 px-7 shadow-md hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <a href={ctaCall.href} data-testid="hero-cta-call">
                  <Phone className="w-5 h-5 mr-2" /> {ctaCall.label}
                </a>
              </Button>
              <Button
                asChild
                className="bg-zinc-900 hover:bg-red-600 text-white font-semibold uppercase tracking-wide text-base h-14 px-7 shadow-md hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <a href={ctaQuote.href} data-testid="hero-cta-quote">
                  <Wrench className="w-5 h-5 mr-2" /> {ctaQuote.label}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border border-zinc-200 bg-transparent hover:bg-zinc-900 hover:text-white text-zinc-900 font-semibold uppercase tracking-wide text-base h-14 px-7"
              >
                <a href={ctaDirections.href} target="_blank" rel="noreferrer" data-testid="hero-cta-directions">
                  <MapPin className="w-5 h-5 mr-2" /> {ctaDirections.label}
                </a>
              </Button>
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-xl">
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-zinc-900">15</div>
                <div className="text-[11px] md:text-xs font-semibold uppercase tracking-wide text-zinc-500">Years in Houston</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-zinc-900">90<span className="text-red-600">d</span></div>
                <div className="text-[11px] md:text-xs font-semibold uppercase tracking-wide text-zinc-500">Repair Warranty</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-zinc-900">5<span className="text-red-600">★</span></div>
                <div className="text-[11px] md:text-xs font-semibold uppercase tracking-wide text-zinc-500">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right: Diagnostic Check panel */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-zinc-900 text-white p-6 md:p-8 shadow-md">
              <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Diagnostic <span className="text-red-500">Check</span>
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Live Pricing</span>
              </div>
              <div className="space-y-3 mb-8">
                {HERO_DIAGNOSTIC.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      href={item.to}
                      className="flex items-center justify-between gap-4 px-4 md:px-5 py-4 bg-zinc-900 hover:bg-red-600 transition-colors group"
                      data-testid={`hero-diagnostic-${item.to}`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="bg-zinc-800 group-hover:bg-zinc-900 p-2 shrink-0 transition-colors">
                          <Icon className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-base md:text-lg font-extrabold tracking-tight truncate">{item.name}</h4>
                        </div>
                      </div>
                      <div className="font-bold uppercase text-sm md:text-base tracking-wide text-red-500 group-hover:text-white shrink-0">
                        {item.price}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <a
                href="#quote"
                className="block w-full bg-red-600 text-white font-semibold uppercase tracking-wide text-sm py-3 text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                data-testid="hero-diagnostic-cta"
              >
                Get My Quote →
              </a>
              <div className="mt-8 pt-6 border-t border-zinc-800 grid gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold uppercase tracking-wide text-zinc-300">{BUSINESS.addressLine1}</div>
                    <div className="font-bold text-zinc-500">{BUSINESS.addressLine2}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                  <div className="font-semibold uppercase tracking-wide text-zinc-300">{BUSINESS.hoursShort}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP ---------------------------------------------------- */}
      <div className="bg-zinc-50 text-zinc-700 border-y border-zinc-200 py-5">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-10 font-semibold uppercase tracking-wide text-xs md:text-sm">
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-red-500" /> 15+ Years in Houston</div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-red-500" /> Same-Day Repair</div>
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" /> 90-Day Warranty</div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-red-500" /> 5-Star Reviews</div>
          <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-red-500" /> All Brands Welcome</div>
        </div>
      </div>

      {/* SERVICES GRID -------------------------------------------------- */}
      <section className="py-20 md:py-24 px-4 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900">
              What We <br />
              <span className="text-red-600">Repair</span>
            </h2>
            <div className="max-w-sm">
              <p className="text-lg md:text-xl font-medium text-zinc-600 tracking-normal">
                No matter how badly you broke it, bring it in. We&apos;ve seen worse.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICE_TILES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.to}
                  href={s.to}
                  className="group block relative bg-zinc-50 border border-zinc-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
                  data-testid={`tile-${s.to}`}
                >
                  {s.image ? (
                    <PhotoFrame
                      photo={s.image}
                      aspect="4:3"
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                  <div className="p-5 relative">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-red-600" />
                    </div>
                    {s.image ? null : (
                      <div className="bg-zinc-900 text-white w-12 h-12 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                    )}
                    <h3 className="text-lg font-extrabold tracking-tight mb-1">{s.name}</h3>
                    <p className="text-xs font-bold text-zinc-500 mb-4 uppercase">{s.desc}</p>
                    <div className="text-red-600 font-bold uppercase text-xs tracking-wide">View details →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICE BOARD + WHY -------------------------------------------- */}
      <section className="py-20 md:py-24 px-4 bg-zinc-100">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-12">
          {/* Price board (charcoal) */}
          <div className="lg:col-span-7 bg-zinc-900 text-white p-6 md:p-10 shadow-md">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Hot <span className="text-red-500">Deals</span>
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Walk-in Pricing</span>
            </div>
            <div className="space-y-3">
              {FEATURED_OFFERS.map((offer) => {
                const Icon = offer.icon;
                return (
                  <Link
                    key={offer.title}
                    href={offer.to}
                    className="flex items-center justify-between gap-4 px-4 md:px-5 py-4 bg-zinc-900 hover:bg-red-600 transition-colors group"
                    data-testid={`offer-${offer.to}`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="bg-zinc-800 group-hover:bg-zinc-900 p-2 shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base md:text-lg font-extrabold tracking-tight truncate">{offer.title}</h4>
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 group-hover:text-red-200">
                          {offer.note}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold uppercase text-sm md:text-base tracking-wide text-red-500 group-hover:text-white shrink-0">
                      {offer.price}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Why Gadget X */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-zinc-900">
              Why <span className="text-red-600">Gadget X?</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {WHY_TILES.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <>
                    {item.image ? (
                      <PhotoFrame
                        photo={item.image}
                        aspect="1:1"
                        sizes="(min-width: 1024px) 200px, 50vw"
                      />
                    ) : null}
                    <div className="p-5 relative">
                      {item.image ? (
                        <div className="absolute -top-7 left-5 bg-zinc-900 text-white w-12 h-12 flex items-center justify-center shadow-md">
                          <Icon className="w-6 h-6 text-red-500" />
                        </div>
                      ) : (
                        <div className="bg-zinc-900 text-white w-12 h-12 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-red-500" />
                        </div>
                      )}
                      <h4 className={`text-base font-bold uppercase mb-1 leading-tight ${item.image ? "mt-8" : ""}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-zinc-600 uppercase tracking-tight">{item.desc}</p>
                    </div>
                  </>
                );
                const className =
                  "group bg-white border border-zinc-200 shadow-md hover:-translate-y-1 transition-transform overflow-hidden block";
                if (item.to) {
                  return (
                    <Link
                      key={item.title}
                      href={item.to}
                      className={`${className} hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500`}
                      data-testid={`why-tile-link-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                    >
                      {inner}
                    </Link>
                  );
                }
                return (
                  <div key={item.title} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OUR WORK (BEFORE / AFTER) ------------------------------------ */}
      <section id="our-work" className="py-20 md:py-24 px-4 bg-white scroll-mt-24">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-zinc-950">
              Our <span className="text-red-600">Work</span>
            </h2>
            <p className="text-base font-bold text-zinc-600 uppercase tracking-tight max-w-md">
              Cracked screens, corroded boards, swollen batteries — the kind of damage we fix every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BEFORE_AFTER_PAIRS.map((pair) => (
              <BeforeAfter
                key={pair.slug}
                pair={pair}
                sizes="(min-width: 1024px) 200px, (min-width: 768px) 33vw, 50vw"
              />
            ))}
          </div>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-8 text-center">
            Most repairs done same-day. 90-day warranty on every fix. Photos are illustrative; your finished device is yours alone.
          </p>
        </div>
      </section>

      {/* WE SELL TOO -------------------------------------------------- */}
      <section className="py-20 md:py-24 px-4 bg-white border-y border-zinc-200">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900">
              We <span className="text-red-600">Sell</span> Too
            </h2>
            <p className="text-base font-bold text-zinc-600 uppercase tracking-tight max-w-md">
              {BUSINESS.tagline}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {SELL_TILES.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.slug}
                  href={product.to}
                  className="group block relative bg-zinc-50 border border-zinc-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
                  data-testid={`sell-${product.slug}`}
                >
                  {product.image ? (
                    <PhotoFrame
                      photo={product.image}
                      aspect="4:3"
                      sizes="(min-width: 1024px) 280px, 50vw"
                    />
                  ) : null}
                  <div className="p-5 relative">
                    <div className="absolute top-3 right-3 bg-zinc-900 text-white w-9 h-9 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-extrabold tracking-tight mb-1 pr-12">{product.name}</h3>
                    <p className="text-xs font-bold text-zinc-500 mb-4 uppercase">{product.desc}</p>
                    <div className="text-red-600 font-bold uppercase text-xs tracking-wide">View details →</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-zinc-900 hover:bg-red-600 text-white font-semibold uppercase tracking-wide text-base h-14 px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Link href="/inventory">Browse Full Inventory →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* QUOTE WIZARD -------------------------------------------------- */}
      <section id="quote" className="py-20 md:py-24 px-4 bg-zinc-100 scroll-mt-24">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-zinc-900 leading-tight">
              Get Your <br />
              <span className="text-red-600">Repair Quote</span>
            </h2>
            <p className="text-lg font-bold text-zinc-600 mb-8 max-w-md uppercase tracking-tight">
              Tell us what&apos;s broken. We&apos;ll tell you how much to fix it. Fast.
            </p>
            <ul className="space-y-3 text-base font-bold text-zinc-700 mb-10">
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">Free diagnostic</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">Same-day repair where possible</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">90-day warranty on every fix</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="uppercase tracking-tight">A real technician answers — usually within 30 min</span>
              </li>
            </ul>
            <div className="hidden lg:block bg-zinc-900 text-white p-6 shadow-md">
              <div className="font-semibold uppercase tracking-wide text-xs text-zinc-500 mb-2">Prefer to call?</div>
              <a href={BUSINESS.phoneTel} className="font-bold uppercase text-2xl tracking-tight hover:text-red-500 transition-colors block">
                <Phone className="w-5 h-5 inline mr-2 text-red-500" />
                {BUSINESS.phoneDisplay}
              </a>
              <div className="text-xs font-bold text-zinc-500 mt-2 uppercase tracking-wide">{BUSINESS.hoursShort}</div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <RepairQuoteWizard />
          </div>
        </div>
      </section>

      {/* PREPAID + AREAS ----------------------------------------------- */}
      <section className="py-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1240px] mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 mb-4">
              Prepaid Activations &amp; Bill Pay
            </h3>
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {PREPAID_TILES.map((carrier) => (
                <Link
                  key={carrier.label}
                  href={carrier.to}
                  className="bg-zinc-100 border border-zinc-200 hover:border-zinc-800 px-4 py-2 font-bold uppercase text-xs tracking-wide transition-colors"
                  data-testid={`prepaid-${carrier.label}`}
                >
                  {carrier.label}
                </Link>
              ))}
            </div>
            <Link
              href="/bill-payments-houston-tx"
              className="text-red-600 font-bold uppercase text-sm tracking-wide hover:underline inline-flex items-center gap-1"
            >
              Pay your bill in cash <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {AREA_TILES.map((area) => (
                <Link
                  key={area.label}
                  href={area.to}
                  className="text-zinc-700 font-bold uppercase text-xs tracking-wide border-b border-zinc-200 pb-1 hover:text-red-600 hover:border-red-600 transition-colors px-2"
                  data-testid={`area-${area.label}`}
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LocationCard />
    </PageShell>
  );
}
