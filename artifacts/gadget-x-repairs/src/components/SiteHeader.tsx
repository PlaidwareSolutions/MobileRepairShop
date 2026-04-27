import { Link } from "wouter";
import { MapPin, Clock, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS, HERO } from "@/content";

type MegaMenuColumn = { heading: string; items: { label: string; to: string }[] };

const REPAIR_MEGA: MegaMenuColumn[] = [
  {
    heading: "iPhone",
    items: [
      { label: "All iPhone Repair", to: "/iphone-repair-houston-tx" },
      { label: "iPhone Screen", to: "/iphone-screen-repair-houston-tx" },
      { label: "iPhone Battery", to: "/iphone-battery-replacement-houston-tx" },
      { label: "iPhone Back Glass", to: "/iphone-back-glass-repair-houston-tx" },
      { label: "iPhone Charging Port", to: "/iphone-charging-port-repair-houston-tx" },
      { label: "iPhone Water Damage", to: "/iphone-water-damage-repair-houston-tx" },
      { label: "iPhone 16 Pro Max", to: "/iphone-16-pro-max-repair-houston-tx" },
      { label: "iPhone 16 Pro", to: "/iphone-16-pro-repair-houston-tx" },
      { label: "iPhone 16", to: "/iphone-16-repair-houston-tx" },
      { label: "iPhone 15 Pro", to: "/iphone-15-pro-repair-houston-tx" },
      { label: "iPhone 15", to: "/iphone-15-repair-houston-tx" },
      { label: "iPhone 14", to: "/iphone-14-repair-houston-tx" },
    ],
  },
  {
    heading: "Samsung & Android",
    items: [
      { label: "Samsung Galaxy", to: "/samsung-repair-houston-tx" },
      { label: "Galaxy S24", to: "/samsung-galaxy-s24-repair-houston-tx" },
      { label: "Galaxy S23", to: "/samsung-galaxy-s23-repair-houston-tx" },
      { label: "Samsung Screen", to: "/samsung-screen-repair-houston-tx" },
      { label: "Samsung Battery", to: "/samsung-battery-replacement-houston-tx" },
      { label: "Google Pixel", to: "/google-pixel-repair-houston-tx" },
      { label: "Motorola", to: "/motorola-repair-houston-tx" },
      { label: "T-Mobile Revvl", to: "/revvl-repair-houston-tx" },
    ],
  },
  {
    heading: "Tablet & Laptop",
    items: [
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
    ],
  },
  {
    heading: "Console & Other",
    items: [
      { label: "All Repair Services", to: "/repair-services-houston-tx" },
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
        <div className="bg-white border-2 border-red-500 py-2 shadow-2xl">
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
        <div className="bg-white border-2 border-red-500 shadow-2xl p-6 grid grid-cols-4 gap-6 w-[860px]">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-red-500 text-[11px] font-black uppercase tracking-wider mb-2 border-b border-zinc-300 pb-1">
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
        <span className="bg-red-500 text-zinc-900 px-2 py-0.5 uppercase font-bold text-[10px] tracking-wider transform -skew-x-12">
          {HERO.badgeSameDay}
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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-red-500">
      <div className="max-w-[1240px] mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <Link href="/phone-repair-houston-tx" className="flex items-center gap-2 shrink-0" aria-label={`${BUSINESS.name} home`}>
          <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 md:h-12 object-contain" width={120} height={48} />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 font-black uppercase tracking-tighter text-sm" aria-label="Primary">
          <MegaMenuTrigger label="Repair" testIdSuffix="repair" columns={REPAIR_MEGA} />
          <MegaMenuTrigger label="Shop" testIdSuffix="shop" columns={SHOP_MEGA} />
          <SimpleDropdown label="Sell" testIdSuffix="sell" items={SELL_DROPDOWN} />
          <SimpleDropdown label="Prepaid" testIdSuffix="prepaid" items={PREPAID_DROPDOWN} />
          {NAV.map((item) => (
            <Link key={item.to} href={item.to} className="hover:text-red-500 transition-colors" data-testid={`nav-${item.to.replace(/\//g, "")}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          asChild
          className="rounded-none bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest text-sm px-4 md:px-6 h-12"
        >
          <a href={BUSINESS.phoneTel}>Call Now</a>
        </Button>
      </div>
    </header>
  );
}

export function TickerTape() {
  return (
    <div className="w-full overflow-hidden bg-red-500 py-2 border-y-2 border-zinc-300 flex items-center" aria-hidden="true">
      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap font-black uppercase text-black text-xl tracking-tighter flex gap-8">
        <span>SAME-DAY REPAIR</span>
        <span>•</span>
        <span>15 YEARS EXPERIENCE</span>
        <span>•</span>
        <span>HOUSTON'S BEST</span>
        <span>•</span>
        <span>CALL NOW</span>
        <span>•</span>
        <span>SAME-DAY REPAIR</span>
        <span>•</span>
        <span>15 YEARS EXPERIENCE</span>
        <span>•</span>
        <span>HOUSTON'S BEST</span>
        <span>•</span>
        <span>CALL NOW</span>
      </div>
    </div>
  );
}
