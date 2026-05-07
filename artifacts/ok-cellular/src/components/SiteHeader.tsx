import { useState, useRef, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Phone, ChevronDown, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";
import { findSearchMatch, buildSuggestions } from "@/lib/searchIndex";

type MegaMenuColumn = { heading: string; items: { label: string; to: string }[] };

const REPAIR_MEGA: MegaMenuColumn[] = [
  {
    heading: "iPhone",
    items: [
      { label: "All iPhone Repair", to: "/iphone-repair-humble-tx" },
      { label: "iPhone 16 Pro Max", to: "/iphone-16-pro-max-repair-humble-tx" },
      { label: "iPhone 16 Pro", to: "/iphone-16-pro-repair-humble-tx" },
      { label: "iPhone 16", to: "/iphone-16-repair-humble-tx" },
      { label: "iPhone 15 Pro", to: "/iphone-15-pro-repair-humble-tx" },
      { label: "iPhone 15", to: "/iphone-15-repair-humble-tx" },
      { label: "iPhone 14", to: "/iphone-14-repair-humble-tx" },
      { label: "iPhone 13", to: "/iphone-13-repair-humble-tx" },
      { label: "iPhone 12", to: "/iphone-12-repair-humble-tx" },
      { label: "iPhone 11", to: "/iphone-11-repair-humble-tx" },
      { label: "iPhone X / XS / XR", to: "/iphone-x-repair-humble-tx" },
      { label: "iPhone SE", to: "/iphone-se-repair-humble-tx" },
      { label: "iPhone 8 / 8 Plus", to: "/iphone-8-repair-humble-tx" },
      { label: "iPhone 7 / 6s / 6", to: "/iphone-7-repair-humble-tx" },
      { label: "Screen Replacement", to: "/iphone-screen-repair-humble-tx" },
      { label: "Battery Replacement", to: "/iphone-battery-replacement-humble-tx" },
      { label: "Back Glass", to: "/iphone-back-glass-repair-humble-tx" },
      { label: "Charging Port", to: "/iphone-charging-port-repair-humble-tx" },
      { label: "Water Damage", to: "/iphone-water-damage-repair-humble-tx" },
    ],
  },
  {
    heading: "Samsung & Android",
    items: [
      { label: "All Samsung Galaxy", to: "/samsung-repair-humble-tx" },
      { label: "Galaxy S24", to: "/samsung-galaxy-s24-repair-humble-tx" },
      { label: "Galaxy S23", to: "/samsung-galaxy-s23-repair-humble-tx" },
      { label: "Galaxy S22", to: "/samsung-galaxy-s22-repair-humble-tx" },
      { label: "Galaxy S21", to: "/samsung-galaxy-s21-repair-humble-tx" },
      { label: "Galaxy A54", to: "/samsung-galaxy-a54-repair-humble-tx" },
      { label: "Galaxy A35", to: "/samsung-galaxy-a35-repair-humble-tx" },
      { label: "Galaxy A15", to: "/samsung-galaxy-a15-repair-humble-tx" },
      { label: "Galaxy Note 20", to: "/samsung-galaxy-note-20-repair-humble-tx" },
      { label: "Galaxy Note 10", to: "/samsung-galaxy-note-10-repair-humble-tx" },
      { label: "Samsung Screen", to: "/samsung-screen-repair-humble-tx" },
      { label: "Samsung Battery", to: "/samsung-battery-replacement-humble-tx" },
      { label: "Google Pixel", to: "/google-pixel-repair-humble-tx" },
      { label: "Motorola", to: "/motorola-repair-humble-tx" },
      { label: "T-Mobile Revvl", to: "/revvl-repair-humble-tx" },
    ],
  },
  {
    heading: "Tablet, Laptop & Console",
    items: [
      { label: "All Repair Services", to: "/repair-services-humble-tx" },
      { label: "iPad / Tablet", to: "/tablet-repair-humble-tx" },
      { label: "iPad", to: "/ipad-repair-humble-tx" },
      { label: "iPad Pro", to: "/ipad-pro-repair-humble-tx" },
      { label: "iPad Air", to: "/ipad-air-repair-humble-tx" },
      { label: "Samsung Tablet", to: "/samsung-tablet-repair-humble-tx" },
      { label: "Tablet Screen", to: "/tablet-screen-repair-humble-tx" },
      { label: "Laptop Repair", to: "/laptop-repair-humble-tx" },
      { label: "Laptop Screen", to: "/laptop-screen-repair-humble-tx" },
      { label: "Laptop Battery", to: "/laptop-battery-replacement-humble-tx" },
      { label: "MacBook Repair", to: "/macbook-repair-humble-tx" },
      { label: "Gaming Consoles", to: "/gaming-console-repair-humble-tx" },
      { label: "PS5 Repair", to: "/ps5-repair-humble-tx" },
      { label: "PS5 HDMI Repair", to: "/ps5-hdmi-repair-humble-tx" },
      { label: "Xbox Repair", to: "/xbox-repair-humble-tx" },
      { label: "HDMI Port Repair", to: "/hdmi-port-repair-humble-tx" },
      { label: "Battery Replacement", to: "/battery-replacement-humble-tx" },
      { label: "Phone Unlocking", to: "/phone-unlocking-humble-tx" },
      { label: "Google Lock Removal", to: "/google-lock-removal-humble-tx" },
    ],
  },
];

const SHOP_MEGA: MegaMenuColumn[] = [
  {
    heading: "Phones",
    items: [
      { label: "All Phones for Sale", to: "/phones-for-sale-humble-tx" },
      { label: "Used Phones", to: "/used-phones-humble-tx" },
      { label: "Refurbished Phones", to: "/refurbished-phones-humble-tx" },
      { label: "New Phones", to: "/new-phones-humble-tx" },
      { label: "Buy iPhone", to: "/buy-iphone-humble-tx" },
      { label: "Buy Samsung", to: "/buy-samsung-phones-humble-tx" },
      { label: "Buy Galaxy A54", to: "/buy-samsung-galaxy-a54-humble-tx" },
      { label: "Buy Galaxy A15", to: "/buy-samsung-galaxy-a15-humble-tx" },
      { label: "Buy Galaxy S22", to: "/buy-samsung-galaxy-s22-humble-tx" },
      { label: "Buy Galaxy Note 20", to: "/buy-samsung-galaxy-note-20-humble-tx" },
      { label: "Buy Pixel", to: "/buy-google-pixel-phones-humble-tx" },
      { label: "Buy Motorola", to: "/buy-motorola-phones-humble-tx" },
      { label: "Buy Revvl", to: "/buy-revvl-phones-humble-tx" },
    ],
  },
  {
    heading: "Laptops",
    items: [
      { label: "All Laptops for Sale", to: "/laptops-for-sale-humble-tx" },
      { label: "Buy MacBook", to: "/buy-macbook-humble-tx" },
      { label: "Buy HP Laptops", to: "/buy-hp-laptops-humble-tx" },
      { label: "Buy Dell Laptops", to: "/buy-dell-laptops-humble-tx" },
      { label: "Buy Lenovo Laptops", to: "/buy-lenovo-laptops-humble-tx" },
      { label: "Laptop Accessories", to: "/laptop-accessories-humble-tx" },
    ],
  },
  {
    heading: "Cases & Cables",
    items: [
      { label: "All Accessories", to: "/phone-accessories-humble-tx" },
      { label: "iPhone Cases", to: "/iphone-cases-humble-tx" },
      { label: "OtterBox Cases", to: "/otterbox-cases-humble-tx" },
      { label: "Screen Protectors", to: "/iphone-screen-protectors-humble-tx" },
      { label: "iPhone Chargers", to: "/iphone-chargers-humble-tx" },
      { label: "Phone Cables", to: "/phone-cables-humble-tx" },
      { label: "HDMI Cables", to: "/hdmi-cables-humble-tx" },
      { label: "Wireless Chargers", to: "/wireless-chargers-humble-tx" },
      { label: "Car Phone Holders", to: "/car-phone-holders-humble-tx" },
      { label: "Power Banks", to: "/power-banks-humble-tx" },
    ],
  },
  {
    heading: "Audio, Watch & More",
    items: [
      { label: "AirPods", to: "/airpods-humble-tx" },
      { label: "Wireless Earbuds", to: "/wireless-earbuds-humble-tx" },
      { label: "Wired Headphones", to: "/wired-headphones-humble-tx" },
      { label: "Bluetooth Speakers", to: "/bluetooth-speakers-humble-tx" },
      { label: "Apple Watch", to: "/apple-watch-humble-tx" },
      { label: "Watch Bands", to: "/watch-bands-humble-tx" },
      { label: "iPad Accessories", to: "/ipad-accessories-humble-tx" },
      { label: "Camera Lenses", to: "/camera-lenses-humble-tx" },
      { label: "Apple Accessories", to: "/apple-accessories-humble-tx" },
      { label: "Samsung Accessories", to: "/samsung-accessories-humble-tx" },
      { label: "Shop Index", to: "/shop-humble-tx" },
    ],
  },
];

const PREPAID_DROPDOWN: { label: string; to: string }[] = [
  { label: "All Prepaid Activations", to: "/phone-activation-humble-tx" },
  { label: "Bill Payments", to: "/bill-payments-humble-tx" },
  { label: "Boost Mobile", to: "/boost-mobile-activation-humble-tx" },
  { label: "AT&T Prepaid", to: "/att-activation-humble-tx" },
  { label: "Gen Mobile", to: "/gen-mobile-activation-humble-tx" },
  { label: "Simple Mobile", to: "/simple-mobile-activation-humble-tx" },
  { label: "Xfinity Mobile", to: "/xfinity-mobile-activation-humble-tx" },
  { label: "H2O Wireless", to: "/h2o-wireless-activation-humble-tx" },
  { label: "Lyca Mobile", to: "/lyca-mobile-activation-humble-tx" },
  { label: "Verizon Prepaid", to: "/verizon-prepaid-activation-humble-tx" },
];

const SELL_DROPDOWN: { label: string; to: string }[] = [
  { label: "Sell Any Phone", to: "/sell-phone-humble-tx" },
  { label: "Sell iPhone", to: "/sell-iphone-humble-tx" },
  { label: "Sell Samsung", to: "/sell-samsung-phone-humble-tx" },
];

const NAV: { label: string; to: string }[] = [
  { label: "Inventory", to: "/inventory" },
  { label: "Reviews", to: "/reviews-humble-tx" },
  { label: "Contact", to: "/contact-humble-tx" },
];

function GlobalSearch({ id = "site-search" }: { id?: string }) {
  const [, setLocation] = useLocation();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<number | null>(null);

  const suggestions = buildSuggestions(value);

  function go(target: string) {
    setOpen(false);
    setValue("");
    setLocation(target);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const match = findSearchMatch(value);
    if (match) {
      go(match.to);
    } else {
      const q = value.trim();
      go(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    }
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

function MobileNavDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const business = useBusiness();
  const [repairOpen, setRepairOpen] = useState(false);
  const [openCol, setOpenCol] = useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
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
                href="/repair-services-humble-tx"
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
            href="/shop-humble-tx"
            onClick={close}
            className="block px-4 py-3 font-semibold text-foreground hover:bg-muted border-b border-border"
            data-testid="link-mobile-nav-shop"
          >
            Shop
          </Link>
          <Link
            href="/sell-phone-humble-tx"
            onClick={close}
            className="block px-4 py-3 font-semibold text-foreground hover:bg-muted border-b border-border"
            data-testid="link-mobile-nav-sell"
          >
            Sell
          </Link>
          <Link
            href="/phone-activation-humble-tx"
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

const MARQUEE_MESSAGES = [
  "15 Minutes Repair",
  "We Match & Beat Everyone's Prices",
  "5+ Years in Business",
];

export function TopUtilityBar() {
  return (
    <div
      className="bg-primary text-primary-foreground overflow-hidden py-1.5"
      data-testid="announcement-marquee"
      aria-label="Announcements"
    >
      <div
        className="flex motion-reduce:hidden"
        style={{ willChange: "transform" }}
      >
        <div
          className="flex gap-0 shrink-0 animate-[marquee_18s_linear_infinite] hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {[...MARQUEE_MESSAGES, ...MARQUEE_MESSAGES, ...MARQUEE_MESSAGES].map((msg, i) => (
            <span
              key={i}
              className="text-[13px] font-semibold px-8 whitespace-nowrap"
              data-testid={i < MARQUEE_MESSAGES.length ? `marquee-msg-${i}` : undefined}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden motion-reduce:flex justify-center gap-8 flex-wrap px-4">
        {MARQUEE_MESSAGES.map((msg, i) => (
          <span
            key={i}
            className="text-[13px] font-semibold whitespace-nowrap"
            data-testid={`marquee-msg-${i}`}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const business = useBusiness();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b-2 border-primary/20">
      <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center gap-3 md:gap-4">
        <Link
          href="/phone-repair-humble-tx"
          className="flex items-center gap-2 shrink-0"
          aria-label={`${BUSINESS.name} home`}
        >
          <img
            src={BUSINESS.logo}
            alt={BUSINESS.name}
            className="h-12 md:h-16 w-auto object-contain block"
            width={240}
            height={90}
          />
        </Link>

        {searchOpen ? (
          <div className="hidden md:flex flex-1 max-w-md items-center gap-2 ml-4">
            <GlobalSearch id="header-search-desktop" />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted border border-border text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            data-testid="button-header-search-open"
            className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-muted text-foreground transition-colors ml-4"
          >
            <Search className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto shrink-0">
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
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open search"
            data-testid="button-mobile-search-toggle"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-muted text-foreground transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <MobileNavDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        </div>
      </div>

      <div className="hidden lg:block border-t border-primary/15 bg-card">
        <nav
          className="max-w-[1240px] mx-auto px-4 flex items-center gap-6 text-base font-medium"
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
            href="/mail-in-repair-humble-tx"
            className="ml-auto inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-1.5 rounded-md text-sm transition-colors my-1.5"
            data-testid="nav-mail-in"
          >
            Mail-In Repair
          </Link>
        </nav>
      </div>
    </header>
  );
}
