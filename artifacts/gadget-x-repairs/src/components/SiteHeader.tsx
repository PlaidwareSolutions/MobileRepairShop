import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Clock, Phone, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BUSINESS, HERO, PROMO_BANNER, TICKER } from "@/content";

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
      { label: "iPhone Screen", to: "/iphone-screen-repair-houston-tx" },
      { label: "iPhone Battery", to: "/iphone-battery-replacement-houston-tx" },
      { label: "iPhone Back Glass", to: "/iphone-back-glass-repair-houston-tx" },
      { label: "iPhone Charging Port", to: "/iphone-charging-port-repair-houston-tx" },
      { label: "iPhone Water Damage", to: "/iphone-water-damage-repair-houston-tx" },
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
    heading: "Tablet / Laptop / Console",
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
      { label: "iPhone Screen Protectors", to: "/iphone-screen-protectors-houston-tx" },
      { label: "iPhone Chargers", to: "/iphone-chargers-houston-tx" },
      { label: "Phone Cables", to: "/phone-cables-houston-tx" },
      { label: "HDMI Cables", to: "/hdmi-cables-houston-tx" },
      { label: "Wireless Chargers", to: "/wireless-chargers-houston-tx" },
      { label: "Car Phone Holders", to: "/car-phone-holders-houston-tx" },
      { label: "Power Banks", to: "/power-banks-houston-tx" },
    ],
  },
  {
    heading: "Audio, Watch & Brands",
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
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact-houston-tx" },
];

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
        className="hover:text-red-500 transition-colors flex items-center gap-1"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label} <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute left-0 top-full pt-2 w-64 hidden group-hover:block group-focus-within:block z-50">
        <div className="bg-white border border-red-300 py-2 shadow-2xl">
          {items.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="block px-4 py-2 text-xs hover:bg-red-500 hover:text-zinc-900 text-zinc-800 transition-colors"
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
        className="hover:text-red-500 transition-colors flex items-center gap-1"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label} <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
        <div
          className={`bg-white border border-red-300 shadow-2xl p-6 grid gap-5 ${
            columns.length >= 5
              ? "grid-cols-5 w-[1100px]"
              : columns.length === 4
                ? "grid-cols-4 w-[860px]"
                : "grid-cols-3 w-[720px]"
          }`}
        >
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-red-500 text-[11px] font-semibold uppercase tracking-wide mb-2 border-b border-zinc-300 pb-1">
                {col.heading}
              </h4>
              <ul className="space-y-1">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      className="block text-xs text-zinc-800 hover:text-red-500 transition-colors"
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
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded border border-zinc-300 text-zinc-900 hover:bg-zinc-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[88vw] sm:w-[360px] p-0 bg-white border-l border-zinc-200 overflow-y-auto"
        data-testid="mobile-nav-drawer"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
          <span className="font-extrabold uppercase tracking-tight text-zinc-900 text-sm">
            {BUSINESS.name}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            data-testid="button-mobile-nav-close"
            className="inline-flex items-center justify-center w-9 h-9 rounded text-zinc-700 hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="py-2" aria-label="Mobile primary">
          <div className="border-b border-zinc-200">
            <div className="flex items-stretch">
              <Link
                href="/repair-services-houston-tx"
                onClick={close}
                className="flex-1 px-4 py-3 font-extrabold uppercase tracking-tight text-zinc-900 hover:bg-red-50"
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
                className="px-4 border-l border-zinc-200 text-zinc-700 hover:bg-red-50"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${repairOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {repairOpen && (
              <div id="mobile-nav-repair-panel" className="bg-zinc-50 border-t border-zinc-200">
                {REPAIR_MEGA.map((col) => {
                  const isOpen = openCol === col.heading;
                  return (
                    <div key={col.heading} className="border-b border-zinc-200 last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setOpenCol(isOpen ? null : col.heading)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-red-600 hover:bg-zinc-100"
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
                                className="block px-7 py-2 text-sm text-zinc-800 hover:bg-red-500 hover:text-white"
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
            className="block px-4 py-3 font-extrabold uppercase tracking-tight text-zinc-900 hover:bg-red-50 border-b border-zinc-200"
            data-testid="link-mobile-nav-shop"
          >
            Shop
          </Link>
          <Link
            href="/sell-phone-houston-tx"
            onClick={close}
            className="block px-4 py-3 font-extrabold uppercase tracking-tight text-zinc-900 hover:bg-red-50 border-b border-zinc-200"
            data-testid="link-mobile-nav-sell"
          >
            Sell
          </Link>
          <Link
            href="/phone-activation-houston-tx"
            onClick={close}
            className="block px-4 py-3 font-extrabold uppercase tracking-tight text-zinc-900 hover:bg-red-50 border-b border-zinc-200"
            data-testid="link-mobile-nav-prepaid"
          >
            Prepaid
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={close}
              className="block px-4 py-3 font-extrabold uppercase tracking-tight text-zinc-900 hover:bg-red-50 border-b border-zinc-200"
              data-testid={`link-mobile-nav-${item.to.replace(/\//g, "")}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={BUSINESS.phoneTel}
            onClick={close}
            className="flex items-center gap-2 px-4 py-3 font-extrabold uppercase tracking-tight text-red-600 hover:bg-red-50"
            data-testid="link-mobile-nav-call"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS.phoneDisplay}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function PromoBanner() {
  return (
    <div
      className="bg-red-600 text-white text-center text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2"
      role="region"
      aria-label="Promotional offer"
      data-testid="promo-banner"
    >
      {PROMO_BANNER.text}
    </div>
  );
}

export function TopUtilityBar() {
  return (
    <div className="bg-zinc-100 border-b border-zinc-300 text-xs font-mono py-2 px-4 flex justify-between items-center tracking-tight text-zinc-600">
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline-flex items-center gap-1">
          <MapPin className="w-3 h-3 text-red-500" />
          {BUSINESS.addressFull}
        </span>
        <span className="hidden md:inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-red-500" />
          {BUSINESS.hoursShort}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="bg-red-50 text-red-600 border border-red-200 rounded-full px-2 py-0.5 uppercase font-semibold text-[10px] tracking-wide">
          {HERO.badgeRepairTime}
        </span>
        <a href={BUSINESS.phoneTel} className="hover:text-red-500 transition-colors flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {BUSINESS.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-[1240px] mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <Link href="/phone-repair-houston-tx" className="flex items-center gap-2 shrink-0" aria-label={`${BUSINESS.name} home`}>
          <img
            src={BUSINESS.logo}
            alt={BUSINESS.name}
            className="h-14 md:h-20 w-auto object-contain block"
            width={220}
            height={80}
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 font-extrabold tracking-tight text-base text-zinc-900" aria-label="Primary">
          <MegaMenuTrigger label="Repair" testIdSuffix="repair" columns={REPAIR_MEGA} />
          <MegaMenuTrigger label="Shop" testIdSuffix="shop" columns={SHOP_MEGA} />
          <SimpleDropdown label="Sell" testIdSuffix="sell" items={SELL_DROPDOWN} />
          <SimpleDropdown label="Prepaid" testIdSuffix="prepaid" items={PREPAID_DROPDOWN} />
          {NAV.map((item) => (
            <Link key={item.to} href={item.to} className="hover:text-red-600 transition-colors" data-testid={`nav-${item.to.replace(/\//g, "")}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="bg-red-600 hover:bg-zinc-900 hover:text-white text-white font-semibold uppercase tracking-wide text-sm px-5 md:px-6 h-12 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <a href={BUSINESS.phoneTel}>Call Now</a>
          </Button>
          <MobileNavDrawer />
        </div>
      </div>
    </header>
  );
}

export function TickerTape() {
  const loop = [...TICKER.items, ...TICKER.items];
  return (
    <div className="w-full overflow-hidden bg-zinc-50 py-2 border-b border-zinc-200 flex items-center" aria-hidden="true">
      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap font-semibold uppercase text-zinc-700 text-sm tracking-wide flex gap-8">
        {loop.map((item, i) => (
          <span key={`ticker-${i}`} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-red-400">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
