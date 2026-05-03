import { Phone, MessageSquare, MessageCircle, Navigation, FileText } from "lucide-react";
import { Link } from "wouter";
import { useBusiness } from "@/components/BusinessContext";

export function StickyMobileBar() {
  const business = useBusiness();
  return (
    <div
      data-testid="sticky-mobile-bar"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border grid grid-cols-5 shadow-lg"
    >
      <a
        href={business.phoneTel}
        data-testid="link-mobile-call"
        className="flex flex-col items-center justify-center gap-1 py-3 text-foreground font-semibold text-[11px] tracking-tight hover:bg-muted transition-colors"
      >
        <Phone className="w-5 h-5" />
        Call
      </a>
      <Link
        href="/contact-humble-tx"
        data-testid="link-mobile-quote"
        className="flex flex-col items-center justify-center gap-1 py-3 text-primary-foreground bg-primary font-semibold text-[11px] tracking-tight hover:bg-primary/90 transition-colors border-x border-border"
      >
        <FileText className="w-5 h-5" />
        Quote
      </Link>
      <a
        href={business.smsHref}
        data-testid="link-mobile-sms"
        className="flex flex-col items-center justify-center gap-1 py-3 text-foreground font-semibold text-[11px] tracking-tight hover:bg-muted transition-colors border-r border-border"
      >
        <MessageSquare className="w-5 h-5" />
        SMS
      </a>
      <a
        href={business.mapsLink}
        target="_blank"
        rel="noreferrer"
        data-testid="link-mobile-map"
        className="flex flex-col items-center justify-center gap-1 py-3 text-foreground font-semibold text-[11px] tracking-tight hover:bg-muted transition-colors border-r border-border"
      >
        <Navigation className="w-5 h-5" />
        Map
      </a>
      <a
        href={business.whatsappHref}
        target="_blank"
        rel="noreferrer"
        data-testid="link-mobile-whatsapp"
        className="flex flex-col items-center justify-center gap-1 py-3 text-white bg-[#075E54] font-semibold text-[11px] tracking-tight hover:bg-[#054640] transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        WhatsApp
      </a>
    </div>
  );
}
