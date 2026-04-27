import { Link } from "wouter";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { BUSINESS, COPYRIGHT } from "@/content";

const REPAIR_LINKS = [
  { label: "All Repair Services", to: "/repair-services-houston-tx" },
  { label: "iPhone Repair", to: "/iphone-repair-houston-tx" },
  { label: "iPhone Screen", to: "/iphone-screen-repair-houston-tx" },
  { label: "Samsung Repair", to: "/samsung-repair-houston-tx" },
  { label: "iPad / Tablet", to: "/tablet-repair-houston-tx" },
  { label: "Laptop Repair", to: "/laptop-repair-houston-tx" },
  { label: "MacBook Repair", to: "/macbook-repair-houston-tx" },
  { label: "PS5 / Xbox HDMI", to: "/ps5-hdmi-repair-houston-tx" },
  { label: "Battery Replacement", to: "/battery-replacement-houston-tx" },
  { label: "Phone Unlocking", to: "/phone-unlocking-houston-tx" },
];

const SHOP_LINKS = [
  { label: "Shop Index", to: "/shop-houston-tx" },
  { label: "Phones for Sale", to: "/phones-for-sale-houston-tx" },
  { label: "Buy iPhone", to: "/buy-iphone-houston-tx" },
  { label: "Buy Samsung", to: "/buy-samsung-phones-houston-tx" },
  { label: "Laptops for Sale", to: "/laptops-for-sale-houston-tx" },
  { label: "Buy MacBook", to: "/buy-macbook-houston-tx" },
  { label: "Phone Cases", to: "/phone-cases-houston-tx" },
  { label: "Phone Chargers", to: "/phone-chargers-houston-tx" },
  { label: "Sell Your Phone", to: "/sell-phone-houston-tx" },
  { label: "Inventory", to: "/inventory" },
];

const PREPAID_LINKS = [
  { label: "All Prepaid Carriers", to: "/phone-activation-houston-tx" },
  { label: "Bill Payments", to: "/bill-payments-houston-tx" },
  { label: "Boost Mobile", to: "/boost-mobile-activation-houston-tx" },
  { label: "AT&T Prepaid", to: "/att-activation-houston-tx" },
];

const COMPANY_LINKS = [
  { label: "About", to: "/about" },
  { label: "Reviews", to: "/reviews-houston-tx" },
  { label: "Contact", to: "/contact-houston-tx" },
];

export function SiteFooter() {
  return (
    <footer className="bg-white pt-16 pb-32 md:pb-16 border-t border-zinc-200">
      <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-zinc-600 font-bold">
        <div className="lg:col-span-2">
          <Link href="/phone-repair-houston-tx">
            <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 object-contain mb-6 grayscale opacity-50" width={120} height={40} />
          </Link>
          <p className="text-sm mb-6 max-w-sm">{BUSINESS.tagline}</p>
          <div className="text-xl text-zinc-900 font-black uppercase tracking-widest mb-6">{BUSINESS.yearsInBusiness} Years Strong.</div>
          <ul className="space-y-3 text-sm uppercase">
            <li>
              <a href={BUSINESS.phoneTel} className="hover:text-red-500 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-red-500 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </li>
            <li>
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="hover:text-red-500 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  {BUSINESS.addressLine1}
                  <br />
                  {BUSINESS.addressLine2}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <FooterColumn title="Repair" items={REPAIR_LINKS} />
        <FooterColumn title="Shop" items={SHOP_LINKS} />
        <div>
          <FooterColumn title="Prepaid" items={PREPAID_LINKS} />
          <div className="mt-8">
            <FooterColumn title="Company" items={COMPANY_LINKS} />
          </div>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto px-4 mt-16 pt-8 border-t border-zinc-200 text-zinc-500 text-xs uppercase tracking-widest font-bold">
        {COPYRIGHT}
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-zinc-900 font-black uppercase tracking-widest mb-6">{title}</h4>
      <ul className="space-y-2 text-sm uppercase">
        {items.map((it) => (
          <li key={it.to}>
            <Link href={it.to} className="hover:text-red-500">{it.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
