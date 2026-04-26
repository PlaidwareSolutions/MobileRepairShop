import { Link } from "wouter";
import { MapPin, Clock, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS, HERO } from "@/content";

const REPAIR_DROPDOWN: { label: string; to: string }[] = [
  { label: "All Repairs", to: "/phone-repair-houston-tx" },
  { label: "iPhone Repair", to: "/iphone-repair-houston-tx" },
  { label: "Samsung Repair", to: "/samsung-repair-houston-tx" },
  { label: "iPad / Tablet", to: "/tablet-repair-houston-tx" },
  { label: "Laptop Repair", to: "/laptop-repair-houston-tx" },
  { label: "MacBook Repair", to: "/macbook-repair-houston-tx" },
  { label: "Game Consoles", to: "/gaming-console-repair-houston-tx" },
  { label: "PS5 Repair", to: "/ps5-repair-houston-tx" },
  { label: "Xbox Repair", to: "/xbox-repair-houston-tx" },
  { label: "Battery Replacement", to: "/battery-replacement-houston-tx" },
  { label: "HDMI Port Repair", to: "/hdmi-port-repair-houston-tx" },
  { label: "Phone Unlocking", to: "/phone-unlocking-houston-tx" },
];

const NAV: { label: string; to: string }[] = [
  { label: "Sell", to: "/sell-phone-houston-tx" },
  { label: "Phones", to: "/phones-for-sale-houston-tx" },
  { label: "Accessories", to: "/phone-accessories-houston-tx" },
  { label: "Prepaid", to: "/phone-activation-houston-tx" },
  { label: "Inventory", to: "/inventory" },
  { label: "Reviews", to: "/reviews-houston-tx" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact-houston-tx" },
];

export function TopUtilityBar() {
  return (
    <div className="bg-zinc-900 border-b border-zinc-800 text-xs font-mono py-2 px-4 flex justify-between items-center tracking-tight text-zinc-400">
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
        <span className="bg-red-500 text-white px-2 py-0.5 uppercase font-bold text-[10px] tracking-wider transform -skew-x-12">
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
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-4 border-red-500">
      <div className="max-w-[1240px] mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={`${BUSINESS.name} home`}>
          <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 md:h-12 object-contain" width={120} height={48} />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 font-black uppercase tracking-tighter text-sm" aria-label="Primary">
          <div className="relative group" data-testid="nav-repair-services">
            <button
              type="button"
              className="hover:text-red-500 transition-colors flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Repair Services <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 top-full pt-2 w-64 hidden group-hover:block group-focus-within:block z-50">
              <div className="bg-black border-2 border-red-500 py-2 shadow-2xl">
                {REPAIR_DROPDOWN.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    className="block px-4 py-2 text-xs hover:bg-red-500 hover:text-white text-zinc-200 transition-colors"
                    data-testid={`nav-repair-${item.to.replace(/\//g, "")}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {NAV.map((item) => (
            <Link key={item.to} href={item.to} className="hover:text-red-500 transition-colors" data-testid={`nav-${item.to.replace(/\//g, "")}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          asChild
          className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-sm px-4 md:px-6 h-12"
        >
          <a href={BUSINESS.phoneTel}>Call Now</a>
        </Button>
      </div>
    </header>
  );
}

export function TickerTape() {
  return (
    <div className="w-full overflow-hidden bg-yellow-400 py-2 border-y-2 border-black flex items-center" aria-hidden="true">
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
