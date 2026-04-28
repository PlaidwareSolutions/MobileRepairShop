import { Phone, MessageSquare, MessageCircle, Navigation, FileText } from "lucide-react";
import { Link } from "wouter";
import { BUSINESS } from "@/content";

export function StickyMobileBar() {
  return (
    <div
      data-testid="sticky-mobile-bar"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-zinc-200 grid grid-cols-5"
    >
      <a
        href={BUSINESS.phoneTel}
        data-testid="link-mobile-call"
        className="flex flex-col items-center justify-center gap-1 py-3 text-zinc-900 font-bold uppercase text-[10px] tracking-wide hover:bg-red-500 transition-colors"
      >
        <Phone className="w-5 h-5" />
        Call
      </a>
      <Link
        href="/contact-houston-tx"
        data-testid="link-mobile-quote"
        className="flex flex-col items-center justify-center gap-1 py-3 text-black bg-red-500 font-bold uppercase text-[10px] tracking-wide hover:bg-white transition-colors border-x border-zinc-200"
      >
        <FileText className="w-5 h-5" />
        Quote
      </Link>
      <a
        href={BUSINESS.sms}
        data-testid="link-mobile-sms"
        className="flex flex-col items-center justify-center gap-1 py-3 text-zinc-900 font-bold uppercase text-[10px] tracking-wide hover:bg-red-500 transition-colors border-r border-zinc-200"
      >
        <MessageSquare className="w-5 h-5" />
        SMS
      </a>
      <a
        href={BUSINESS.mapsLink}
        target="_blank"
        rel="noreferrer"
        data-testid="link-mobile-map"
        className="flex flex-col items-center justify-center gap-1 py-3 text-zinc-900 font-bold uppercase text-[10px] tracking-wide hover:bg-red-500 transition-colors border-r border-zinc-200"
      >
        <Navigation className="w-5 h-5" />
        Map
      </a>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noreferrer"
        data-testid="link-mobile-whatsapp"
        className="flex flex-col items-center justify-center gap-1 py-3 text-black bg-green-500 font-bold uppercase text-[10px] tracking-wide hover:bg-white transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        WhatsApp
      </a>
    </div>
  );
}
