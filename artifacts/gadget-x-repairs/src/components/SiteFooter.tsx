import { Link } from "wouter";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { BUSINESS, COPYRIGHT } from "@/content";

const REPAIR_LINKS = [
  { label: "iPhone Repair", to: "/iphone-repair-houston" },
  { label: "Samsung Repair", to: "/samsung-phone-repair-houston" },
  { label: "iPad / Tablet Repair", to: "/ipad-tablet-repair-houston" },
  { label: "MacBook Repair", to: "/macbook-repair-houston" },
  { label: "Laptop Repair", to: "/laptop-repair-houston" },
  { label: "PS5 Repair", to: "/ps5-repair-houston" },
  { label: "Xbox Repair", to: "/xbox-repair-houston" },
  { label: "Battery Replacement", to: "/battery-replacement-houston" },
];

const SHOP_LINKS = [
  { label: "Phones for Sale", to: "/phones-for-sale-houston" },
  { label: "Used Phones", to: "/used-phones-houston" },
  { label: "Refurbished Phones", to: "/refurbished-phones-houston" },
  { label: "Laptops for Sale", to: "/laptops-for-sale-houston" },
  { label: "Sell Your Phone", to: "/buy-my-phone-houston" },
  { label: "Inventory", to: "/inventory" },
];

const PREPAID_LINKS = [
  { label: "All Prepaid Carriers", to: "/prepaid-phone-activations-houston" },
  { label: "Bill Payments", to: "/bill-payments-houston" },
  { label: "Boost Mobile", to: "/boost-mobile-activation-houston" },
  { label: "AT&T Prepaid", to: "/att-prepaid-activation-houston" },
];

const COMPANY_LINKS = [
  { label: "About", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black pt-16 pb-32 md:pb-16 border-t border-zinc-900">
      <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-zinc-400 font-bold">
        <div className="lg:col-span-2">
          <Link href="/">
            <img src={BUSINESS.logo} alt={BUSINESS.name} className="h-10 object-contain mb-6 grayscale opacity-50" width={120} height={40} />
          </Link>
          <p className="text-sm mb-6 max-w-sm">{BUSINESS.tagline}</p>
          <div className="text-xl text-white font-black uppercase tracking-widest mb-6">{BUSINESS.yearsInBusiness} Years Strong.</div>
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
      <div className="max-w-[1240px] mx-auto px-4 mt-16 pt-8 border-t border-zinc-900 text-zinc-500 text-xs uppercase tracking-widest font-bold">
        {COPYRIGHT}
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-white font-black uppercase tracking-widest mb-6">{title}</h4>
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
