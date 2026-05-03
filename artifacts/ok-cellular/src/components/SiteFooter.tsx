import { Link } from "wouter";
import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { BUSINESS, COPYRIGHT } from "@/content";
import { useBusiness } from "@/components/BusinessContext";
import { SocialLinks } from "@/components/SocialLinks";

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
  { label: "Mail-In Repair", to: "/mail-in-repair-houston-tx" },
  { label: "Financing", to: "/financing-houston-tx" },
];

export function SiteFooter() {
  const business = useBusiness();
  return (
    <footer className="bg-muted/40 text-muted-foreground border-t border-border pt-16 pb-32 md:pb-12">
      <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <Link href="/phone-repair-houston-tx" className="inline-block mb-5">
            <img
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              className="h-12 md:h-14 w-auto object-contain block"
              width={220}
              height={80}
            />
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm mb-5 leading-relaxed">
            {BUSINESS.tagline}
          </p>
          <div className="text-sm font-semibold text-foreground mb-4">
            {BUSINESS.yearsInBusiness} years repairing devices in Houston.
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={business.phoneTel}
                className="hover:text-primary flex items-center gap-2 text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-primary" /> WhatsApp Us
              </a>
            </li>
            <li>
              <a
                href={business.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary flex items-start gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>
                  {business.addressLine1}
                  <br />
                  {business.addressLine2}
                </span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>{business.hoursShort}</span>
            </li>
          </ul>
          <SocialLinks business={business} className="mt-5" iconClass="w-5 h-5" />
        </div>

        <FooterColumn title="Repair" items={REPAIR_LINKS} />
        <FooterColumn title="Shop" items={SHOP_LINKS} />
        <div>
          <FooterColumn title="Prepaid" items={PREPAID_LINKS} />
          <div className="mt-7">
            <FooterColumn title="Company" items={COMPANY_LINKS} />
          </div>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto px-4 mt-12 pt-6 border-t border-border text-muted-foreground text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span>{COPYRIGHT}</span>
        <span className="text-[11px]">
          Independent repair shop. Not affiliated with Apple Inc., Samsung, Google, Sony, or Microsoft.
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div>
      <h4 className="text-foreground font-semibold text-sm mb-4 pb-2 border-b border-border">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.to}>
            <Link
              href={it.to}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
