import { useState, useRef, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { MapPin, Clock, Phone, ChevronDown, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BUSINESS, HERO, PROMO_BANNER, TICKER } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

type MegaMenuColumn = { heading: string; items: { label: string; to: string }[] };

const REPAIR_MEGA: MegaMenuColumn[] = [
  {
    heading: "iPhone",
    items: [
      { label: "All iPhone Repair", to: "/iphone-repair-houston-tx" },
      { label: "iPhone 16 Pro Max", to: "/iphone-16-pro-max-repair-houston-tx" },
      { label: "iPhone 16 Pro", to: "/iphone-16-pro-repair-houston-tx" },
      { label: "iPhone 16", to: "/iphone-16-repair-houston-tx" },
      { label: "iPhone 15 Pro", to: "/iphone-15-pro-repair-houston-tx" },
      { label: "iPhone 15", to: "/iphone-15-repair-houston-tx" },
      { label: "iPhone 14", to: "/iphone-14-repair-houston-tx" },
      { label: "iPhone 13", to: "/iphone-13-repair-houston-tx" },
      { label: "iPhone 12", to: "/iphone-12-repair-houston-tx" },
      { label: "iPhone 11", to: "/iphone-11-repair-houston-tx" },
      { label: "iPhone X / XS / XR", to: "/iphone-x-repair-houston-tx" },
      { label: "iPhone SE", to: "/iphone-se-repair-houston-tx" },
      { label: "iPhone 8 / 8 Plus", to: "/iphone-8-repair-houston-tx" },
      { label: "iPhone 7 / 6s / 6", to: "/iphone-7-repair-houston-tx" },
      { label: "Screen Replacement", to: "/iphone-screen-repair-houston-tx" },
      { label: "Battery Replacement", to: "/iphone-battery-replacement-houston-tx" },
      { label: "Back Glass", to: "/iphone-back-glass-repair-houston-tx" },
      { label: "Charging Port", to: "/iphone-charging-port-repair-houston-tx" },
      { label: "Water Damage", to: "/iphone-water-damage-repair-houston-tx" },
    ],
  },
  {
    heading: "Samsung & Android",
    items: [
      { label: "All Samsung Galaxy", to: "/samsung-repair-houston-tx" },
      { label: "Galaxy S24", to: "/samsung-galaxy-s24-repair-houston-tx" },
      { label: "Galaxy S23", to: "/samsung-galaxy-s23-repair-houston-tx" },
      { label: "Galaxy S22", to: "/samsung-galaxy-s22-repair-houston-tx" },
      { label: "Galaxy S21", to: "/samsung-galaxy-s21-repair-houston-tx" },
      { label: "Galaxy A54", to: "/samsung-galaxy-a54-repair-houston-tx" },
      { label: "Galaxy A35", to: "/samsung-galaxy-a35-repair-houston-tx" },
      { label: "Galaxy A15", to: "/samsung-galaxy-a15-repair-houston-tx" },
      { label: "Galaxy Note 20", to: "/samsung-galaxy-note-20-repair-houston-tx" },
      { label: "Galaxy Note 10", to: "/samsung-galaxy-note-10-repair-houston-tx" },
      { label: "Samsung Screen", to: "/samsung-screen-repair-houston-tx" },
      { label: "Samsung Battery", to: "/samsung-battery-replacement-houston-tx" },
      { label: "Google Pixel", to: "/google-pixel-repair-houston-tx" },
      { label: "Motorola", to: "/motorola-repair-houston-tx" },
      { label: "T-Mobile Revvl", to: "/revvl-repair-houston-tx" },
    ],
  },
  {
    heading: "Tablet, Laptop & Console",
    items: [
      { label: "All Repair Services", to: "/repair-services-houston-tx" },
      { label: "iPad / Tablet", to: "/tablet-repair-houston-tx" },
      { label: "iPad", to: "/ipad-repair-houston-tx" },
      { label: "iPad Pro", to: "/ipad-pro-repair-houston-tx" },
      { label: "iPad Air", to: "/ipad-air-repair-houston-tx" },
      { label: "Samsung Tablet", to: "/samsung-tablet-repair-houston-tx" },
      { label: "Tablet Screen", to: "/tablet-screen-repair-houston-tx" },
      { label: "Laptop Repair", to: "/laptop-repair-houston-tx" },
      { label: "Laptop Screen", to: "/laptop-screen-repair-houston-tx" },
      { label: "Laptop Battery", to: "/laptop-battery-replacement-houston-tx" },
      { label: "MacBook Repair", to: "/macbook-repair-houston-tx" },
      { label: "Gaming Consoles", to: "/gaming-console-repair-houston-tx" },
      { label: "PS5 Repair", to: "/ps5-repair-houston-tx" },
      { label: "PS5 HDMI Repair", to: "/ps5-hdmi-repair-houston-tx" },
      { label: "Xbox Repair", to: "/xbox-repair-houston-tx" },
      { label: "HDMI Port Repair", to: "/hdmi-port-repair-houston-tx" },
      { label: "Battery Replacement", to: "/battery-replacement-houston-tx" },
      { label: "Phone Unlocking", to: "/phone-unlocking-houston-tx" },
      { label: "Google Lock Removal", to: "/google-lock-removal-houston-tx" },
    ],
  },
];

const SHOP_MEGA: MegaMenuColumn[] = [
  {
    heading: "Phones",
    items: [
      { label: "All Phones for Sale", to: "/phones-for-sale-houston-tx" },
      { label: "Used Phones", to: "/used-phones-houston-tx" },
      { label: "Refurbished Phones", to: "/refurbished-phones-houston-tx" },
      { label: "New Phones", to: "/new-phones-houston-tx" },
      { label: "Buy iPhone", to: "/buy-iphone-houston-tx" },
      { label: "Buy Samsung", to: "/buy-samsung-phones-houston-tx" },
      { label: "Buy Galaxy A54", to: "/buy-samsung-galaxy-a54-houston-tx" },
      { label: "Buy Galaxy A15", to: "/buy-samsung-galaxy-a15-houston-tx" },
      { label: "Buy Galaxy S22", to: "/buy-samsung-galaxy-s22-houston-tx" },
      { label: "Buy Galaxy Note 20", to: "/buy-samsung-galaxy-note-20-houston-tx" },
      { label: "Buy Pixel", to: "/buy-google-pixel-phones-houston-tx" },
      { label: "Buy Motorola", to: "/buy-motorola-phones-houston-tx" },
      { label: "Buy Revvl", to: "/buy-revvl-phones-houston-tx" },
    ],
  },
  {
    heading: "Laptops",
    items: [
      { label: "All Laptops for Sale", to: "/laptops-for-sale-houston-tx" },
      { label: "Buy MacBook", to: "/buy-macbook-houston-tx" },
      { label: "Buy HP Laptops", to: "/buy-hp-laptops-houston-tx" },
      { label: "Buy Dell Laptops", to: "/buy-dell-laptops-houston-tx" },
      { label: "Buy Lenovo Laptops", to: "/buy-lenovo-laptops-houston-tx" },
      { label: "Laptop Accessories", to: "/laptop-accessories-houston-tx" },
    ],
  },
  {
    heading: "Cases & Cables",
    items: [
      { label: "All Accessories", to: "/phone-accessories-houston-tx" },
      { label: "iPhone Cases", to: "/iphone-cases-houston-tx" },
      { label: "OtterBox Cases", to: "/otterbox-cases-houston-tx" },
      { label: "Screen Protectors", to: "/iphone-screen-protectors-houston-tx" },
      { label: "iPhone Chargers", to: "/iphone-chargers-houston-tx" },
      { label: "Phone Cables", to: "/phone-cables-houston-tx" },
      { label: "HDMI Cables", to: "/hdmi-cables-houston-tx" },
      { label: "Wireless Chargers", to: "/wireless-chargers-houston-tx" },
      { label: "Car Phone Holders", to: "/car-phone-holders-houston-tx" },
      { label: "Power Banks", to: "/power-banks-houston-tx" },
    ],
  },
  {
    heading: "Audio, Watch & More",
    items: [
      { label: "AirPods", to: "/airpods-houston-tx" },
      { label: "Wireless Earbuds", to: "/wireless-earbuds-houston-tx" },
      { label: "Wired Headphones", to: "/wired-headphones-houston-tx" },
      { label: "Bluetooth Speakers", to: "/bluetooth-speakers-houston-tx" },
      { label: "Apple Watch", to: "/apple-watch-houston-tx" },
      { label: "Watch Bands", to: "/watch-bands-houston-tx" },
      { label: "iPad Accessories", to: "/ipad-accessories-houston-tx" },
      { label: "Camera Lenses", to: "/camera-lenses-houston-tx" },
      { label: "Apple Accessories", to: "/apple-accessories-houston-tx" },
      { label: "Samsung Accessories", to: "/samsung-accessories-houston-tx" },
      { label: "Shop Index", to: "/shop-houston-tx" },
    ],
  },
];

const PREPAID_DROPDOWN: { label: string; to: string }[] = [
  { label: "All Prepaid Activations", to: "/phone-activation-houston-tx" },
  { label: "Bill Payments", to: "/bill-payments-houston-tx" },
  { label: "Boost Mobile", to: "/boost-mobile-activation-houston-tx" },
  { label: "AT&T Prepaid", to: "/att-activation-houston-tx" },
  { label: "Gen Mobile", to: "/gen-mobile-activation-houston-tx" },
  { label: "Simple Mobile", to: "/simple-mobile-activation-houston-tx" },
  { label: "Xfinity Mobile", to: "/xfinity-mobile-activation-houston-tx" },
  { label: "H2O Wireless", to: "/h2o-wireless-activation-houston-tx" },
  { label: "Lyca Mobile", to: "/lyca-mobile-activation-houston-tx" },
  { label: "Verizon Prepaid", to: "/verizon-prepaid-activation-houston-tx" },
];

const SELL_DROPDOWN: { label: string; to: string }[] = [
  { label: "Sell Any Phone", to: "/sell-phone-houston-tx" },
  { label: "Sell iPhone", to: "/sell-iphone-houston-tx" },
  { label: "Sell Samsung", to: "/sell-samsung-phone-houston-tx" },
];

const NAV: { label: string; to: string }[] = [
  { label: "Inventory", to: "/inventory" },
  { label: "Reviews", to: "/reviews-houston-tx" },
  { label: "Contact", to: "/contact-houston-tx" },
];

type SearchEntry = { keywords: string[]; to: string; label: string };
const SEARCH_INDEX: SearchEntry[] = [
  { keywords: ["iphone screen", "iphone glass", "cracked iphone", "iphone display"], to: "/iphone-screen-repair-houston-tx", label: "iPhone Screen Repair" },
  { keywords: ["iphone battery", "iphone replacement battery"], to: "/iphone-battery-replacement-houston-tx", label: "iPhone Battery Replacement" },
  { keywords: ["iphone charging", "iphone charge port", "iphone won't charge"], to: "/iphone-charging-port-repair-houston-tx", label: "iPhone Charging Port" },
  { keywords: ["iphone back", "back glass"], to: "/iphone-back-glass-repair-houston-tx", label: "iPhone Back Glass" },
  { keywords: ["iphone water", "water damage"], to: "/iphone-water-damage-repair-houston-tx", label: "iPhone Water Damage" },
  { keywords: ["iphone"], to: "/iphone-repair-houston-tx", label: "iPhone Repair" },
  { keywords: ["samsung screen"], to: "/samsung-screen-repair-houston-tx", label: "Samsung Screen Repair" },
  { keywords: ["samsung battery"], to: "/samsung-battery-replacement-houston-tx", label: "Samsung Battery Replacement" },
  { keywords: ["galaxy", "samsung"], to: "/samsung-repair-houston-tx", label: "Samsung Repair" },
  { keywords: ["pixel", "google"], to: "/google-pixel-repair-houston-tx", label: "Google Pixel Repair" },
  { keywords: ["motorola"], to: "/motorola-repair-houston-tx", label: "Motorola Repair" },
  { keywords: ["ipad pro"], to: "/ipad-pro-repair-houston-tx", label: "iPad Pro Repair" },
  { keywords: ["ipad air"], to: "/ipad-air-repair-houston-tx", label: "iPad Air Repair" },
  { keywords: ["ipad", "tablet"], to: "/tablet-repair-houston-tx", label: "iPad / Tablet Repair" },
  { keywords: ["macbook"], to: "/macbook-repair-houston-tx", label: "MacBook Repair" },
  { keywords: ["laptop battery"], to: "/laptop-battery-replacement-houston-tx", label: "Laptop Battery" },
  { keywords: ["laptop screen"], to: "/laptop-screen-repair-houston-tx", label: "Laptop Screen" },
  { keywords: ["laptop", "computer"], to: "/laptop-repair-houston-tx", label: "Laptop Repair" },
  { keywords: ["ps5 hdmi", "playstation hdmi"], to: "/ps5-hdmi-repair-houston-tx", label: "PS5 HDMI Repair" },
  { keywords: ["ps5", "playstation"], to: "/ps5-repair-houston-tx", label: "PS5 Repair" },
  { keywords: ["xbox"], to: "/xbox-repair-houston-tx", label: "Xbox Repair" },
  { keywords: ["hdmi"], to: "/hdmi-port-repair-houston-tx", label: "HDMI Port Repair" },
  { keywords: ["battery"], to: "/battery-replacement-houston-tx", label: "Battery Replacement" },
  { keywords: ["unlock"], to: "/phone-unlocking-houston-tx", label: "Phone Unlocking" },
  { keywords: ["mail in", "mail-in", "ship"], to: "/mail-in-repair-houston-tx", label: "Mail-In Repair" },
  { keywords: ["financing", "finance", "$10 down"], to: "/financing-houston-tx", label: "Phone Financing" },
  { keywords: ["sell"], to: "/sell-phone-houston-tx", label: "Sell Your Phone" },
  { keywords: ["case"], to: "/phone-accessories-houston-tx", label: "Cases & Accessories" },
  { keywords: ["activation", "prepaid", "cricket", "metro", "t-mobile"], to: "/phone-activation-houston-tx", label: "Prepaid Activation" },
  { keywords: ["bill"], to: "/bill-payments-houston-tx", label: "Bill Payments" },
  { keywords: ["inventory", "in stock", "phones for sale"], to: "/inventory", label: "Inventory" },
  { keywords: ["about"], to: "/about", label: "About" },
  { keywords: ["contact", "address", "directions", "location"], to: "/contact-houston-tx", label: "Contact" },
  { keywords: ["reviews"], to: "/reviews-houston-tx", label: "Reviews" },
];

function findSearchMatch(raw: string): SearchEntry | null {
  const q = raw.trim().toLowerCase();
  if (!q) return null;
  for (const entry of SEARCH_INDEX) {
    if (entry.keywords.some((kw) => q.includes(kw))) return entry;
  }
  return null;
}

function GlobalSearch({ id = "site-search" }: { id?: string }) {
  const [, setLocation] = useLocation();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<number | null>(null);

  const suggestions = (() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((e) =>
      e.label.toLowerCase().includes(q) || e.keywords.some((kw) => kw.includes(q) || q.includes(kw)),
    ).slice(0, 6);
  })();

  function go(target: string) {
    setOpen(false);
    setValue("");
    setLocation(target);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const match = findSearchMatch(value);
    go(match ? match.to : "/repair-services-houston-tx");
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="relative w-full"
      data-testid="global-search-form"
    >
      <label htmlFor={id} className="sr-only">
        Search OK Cellular
      </label>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Defer close so a click on a suggestion can register first.
          blurTimer.current = window.setTimeout(() => setOpen(false), 120);
        }}
        placeholder="Search repairs, devices, parts…"
        className="w-full h-10 pl-9 pr-3 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
        data-testid="input-global-search"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-popover border border-border rounded-md shadow-lg z-50 overflow-hidden">
          <ul role="listbox" className="py-1 text-sm">
            {suggestions.map((s) => (
              <li key={s.to}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-muted text-foreground flex items-center gap-2"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (blurTimer.current) window.clearTimeout(blurTimer.current);
                    go(s.to);
                  }}
                  data-testid={`search-suggest-${s.to.replace(/\//g, "")}`}
                >
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

function SimpleDropdown({
  label,
  testIdSuffix,
  items,
}: {
  label: string;
  testIdSuffix: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div className="relative group" data-testid={`nav-${testIdSuffix}`}>
      <button
        type="button"
        className="text-foreground hover:text-primary transition-colors flex items-center gap-1 py-2"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      <div className="absolute left-0 top-full pt-1 w-64 hidden group-hover:block group-focus-within:block z-50">
        <div className="bg-popover border border-border rounded-md py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
              data-testid={`nav-${testIdSuffix}-${item.to.replace(/\//g, "")}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MegaMenuTrigger({
  label,
  testIdSuffix,
  columns,
}: {
  label: string;
  testIdSuffix: string;
  columns: MegaMenuColumn[];
}) {
  return (
    <div className="relative group" data-testid={`nav-${testIdSuffix}`}>
      <button
        type="button"
        className="text-foreground hover:text-primary transition-colors flex items-center gap-1 py-2"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      <div className="absolute left-0 top-full pt-1 hidden group-hover:block group-focus-within:block z-50">
        <div
          className={`bg-popover border border-border rounded-md shadow-lg p-6 grid gap-6 ${
            columns.length >= 4
              ? "grid-cols-4 w-[920px]"
              : "grid-cols-3 w-[720px]"
          }`}
        >
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3 pb-2 border-b border-border">
                {col.heading}
              </h4>
              <ul className="space-y-1.5">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      className="block text-sm text-foreground hover:text-primary transition-colors"
                      data-testid={`nav-${testIdSuffix}-${item.to.replace(/\//g, "")}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavDrawer() {
  const business = useBusiness();
  const [open, setOpen] = useState(false);
  const [repairOpen, setRepairOpen] = useState(false);
  const [openCol, setOpenCol] = useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setRepairOpen(false);
      setOpenCol(null);
    }
  };

  const close = () => handleOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          data-testid="button-mobile-nav-open"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-border text-foreground hover:bg-muted transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[88vw] sm:w-[360px] p-0 bg-card border-l border-border overflow-y-auto"
        data-testid="mobile-nav-drawer"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="font-semibold text-foreground text-base">{BUSINESS.name}</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            data-testid="button-mobile-nav-close"
            className="inline-flex items-center justify-center w-9 h-9 rounded text-muted-foreground hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 border-b border-border">
          <GlobalSearch id="mobile-search" />
        </div>
        <nav className="py-1" aria-label="Mobile primary">
          <div className="border-b border-border">
            <div className="flex items-stretch">
              <Link
                href="/repair-services-houston-tx"
                onClick={close}
                className="flex-1 px-4 py-3 font-semibold text-foreground hover:bg-muted"
                data-testid="link-mobile-nav-repair-root"
              >
                Repair
              </Link>
              <button
                type="button"
                onClick={() => setRepairOpen((v) => !v)}
                aria-expanded={repairOpen}
                aria-controls="mobile-nav-repair-panel"
                aria-label={repairOpen ? "Collapse repair menu" : "Expand repair menu"}
                data-testid="button-mobile-nav-repair-toggle"
                className="px-4 border-l border-border text-muted-foreground hover:bg-muted"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${repairOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {repairOpen && (
              <div id="mobile-nav-repair-panel" className="bg-muted/40 border-t border-border">
                {REPAIR_MEGA.map((col) => {
                  const isOpen = openCol === col.heading;
                  return (
                    <div key={col.heading} className="border-b border-border last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setOpenCol(isOpen ? null : col.heading)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-primary hover:bg-muted"
                        data-testid={`button-mobile-nav-repair-group-${col.heading
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")}`}
                      >
                        <span>{col.heading}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <ul className="pb-2">
                          {col.items.map((item) => (
                            <li key={item.to}>
                              <Link
                                href={item.to}
                                onClick={close}
                                className="block px-7 py-2 text-sm text-foreground hover:bg-primary hover:text-primary-foreground"
                                data-testid={`link-mobile-nav-repair-${item.to.replace(/\//g, "")}`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/shop-houston-tx"
            onClick={close}
            className="block px-4 py-3 font-semibold text-foreground hover:bg-muted border-b border-border"
            data-testid="link-mobile-nav-shop"
          >
            Shop
          </Link>
          <Link
            href="/sell-phone-houston-tx"
            onClick={close}
            className="block px-4 py-3 font-semibold text-foreground hover:bg-muted border-b border-border"
            data-testid="link-mobile-nav-sell"
          >
            Sell
          </Link>
          <Link
            href="/phone-activation-houston-tx"
            onClick={close}
            className="block px-4 py-3 font-semibold text-foreground hover:bg-muted border-b border-border"
            data-testid="link-mobile-nav-prepaid"
          >
            Prepaid
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={close}
              className="block px-4 py-3 font-semibold text-foreground hover:bg-muted border-b border-border"
              data-testid={`link-mobile-nav-${item.to.replace(/\//g, "")}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={business.phoneTel}
            onClick={close}
            className="flex items-center gap-2 px-4 py-3 font-semibold text-primary hover:bg-muted"
            data-testid="link-mobile-nav-call"
          >
            <Phone className="w-4 h-4" />
            {business.phoneDisplay}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function PromoBanner() {
  return (
    <div
      className="bg-foreground text-background text-center text-xs md:text-sm font-medium px-4 py-2"
      role="region"
      aria-label="Promotional offer"
      data-testid="promo-banner"
    >
      {PROMO_BANNER.text}
    </div>
  );
}

export function TopUtilityBar() {
  const business = useBusiness();
  return (
    <div className="bg-muted/60 border-b border-border text-[12px] text-muted-foreground py-1.5 px-4">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 text-primary shrink-0" />
            <span className="truncate">{business.addressFull}</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-primary" />
            {business.hoursShort}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:inline">{HERO.badgeRepairTime}</span>
          <a
            href={business.phoneTel}
            className="hover:text-primary transition-colors flex items-center gap-1.5 font-medium text-foreground"
          >
            <Phone className="w-3 h-3" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const business = useBusiness();
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Main bar: logo + global search + Call CTA + mobile menu */}
      <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center gap-4 md:gap-6">
        <Link
          href="/phone-repair-houston-tx"
          className="flex items-center gap-2 shrink-0"
          aria-label={`${BUSINESS.name} home`}
        >
          <img
            src={BUSINESS.logo}
            alt={BUSINESS.name}
            className="h-12 md:h-14 w-auto object-contain block"
            width={220}
            height={80}
          />
        </Link>
        <div className="hidden md:flex flex-1 max-w-2xl">
          <GlobalSearch />
        </div>
        <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 px-4 rounded-md"
          >
            <a href={business.phoneTel} data-testid="header-call-cta">
              <Phone className="w-4 h-4 mr-1.5" /> {business.phoneDisplay}
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="sm:hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 px-3 rounded-md"
          >
            <a href={business.phoneTel} aria-label={`Call ${business.phoneDisplay}`}>
              <Phone className="w-4 h-4" />
            </a>
          </Button>
          <MobileNavDrawer />
        </div>
      </div>
      {/* Mobile-only search row */}
      <div className="md:hidden px-4 pb-3">
        <GlobalSearch id="header-search-mobile" />
      </div>
      {/* Primary nav row */}
      <div className="hidden lg:block border-t border-border bg-card">
        <nav
          className="max-w-[1240px] mx-auto px-4 flex items-center gap-7 text-sm font-medium"
          aria-label="Primary"
        >
          <MegaMenuTrigger label="Repair" testIdSuffix="repair" columns={REPAIR_MEGA} />
          <MegaMenuTrigger label="Shop" testIdSuffix="shop" columns={SHOP_MEGA} />
          <SimpleDropdown label="Sell" testIdSuffix="sell" items={SELL_DROPDOWN} />
          <SimpleDropdown label="Prepaid" testIdSuffix="prepaid" items={PREPAID_DROPDOWN} />
          {NAV.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="text-foreground hover:text-primary transition-colors py-2"
              data-testid={`nav-${item.to.replace(/\//g, "")}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/mail-in-repair-houston-tx"
            className="ml-auto text-primary hover:underline py-2 font-semibold"
            data-testid="nav-mail-in"
          >
            Mail-In Repair →
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function TickerTape() {
  const loop = [...TICKER.items, ...TICKER.items];
  return (
    <div
      className="w-full overflow-hidden bg-muted py-2 border-b border-border flex items-center"
      aria-hidden="true"
    >
      <div className="animate-[marquee_28s_linear_infinite] whitespace-nowrap text-muted-foreground text-sm flex gap-8">
        {loop.map((item, i) => (
          <span key={`ticker-${i}`} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-primary">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
