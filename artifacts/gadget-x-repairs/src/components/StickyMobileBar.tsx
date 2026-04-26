import { Phone, MessageCircle, Navigation } from "lucide-react";
import { BUSINESS } from "@/content";

export function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black border-t-4 border-red-500 grid grid-cols-3">
      <a
        href={BUSINESS.phoneTel}
        className="flex flex-col items-center justify-center gap-1 py-3 text-white font-black uppercase text-xs tracking-widest hover:bg-red-500 transition-colors"
      >
        <Phone className="w-5 h-5" />
        Call
      </a>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-3 text-black bg-yellow-400 font-black uppercase text-xs tracking-widest hover:bg-white transition-colors border-x-2 border-black"
      >
        <MessageCircle className="w-5 h-5" />
        Text
      </a>
      <a
        href={BUSINESS.mapsLink}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-3 text-white font-black uppercase text-xs tracking-widest hover:bg-red-500 transition-colors"
      >
        <Navigation className="w-5 h-5" />
        Map
      </a>
    </div>
  );
}
