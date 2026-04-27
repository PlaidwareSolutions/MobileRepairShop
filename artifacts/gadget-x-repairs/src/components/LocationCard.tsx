import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/content";

export function LocationCard() {
  return (
    <section id="location" className="py-16 px-4 bg-zinc-50 scroll-mt-20 border-t border-zinc-200">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-zinc-900">
            VISIT THE <br /><span className="text-red-500">SHOP</span>
          </h2>
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-1">Location</h4>
              <p className="text-xl font-black uppercase text-zinc-900">
                {BUSINESS.addressLine1}<br />{BUSINESS.addressLine2}
              </p>
            </div>
            <div>
              <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-1">Hours</h4>
              <div className="space-y-1 max-w-xs font-bold">
                {BUSINESS.hours.map((h) => (
                  <div key={h.day} className="flex justify-between border-b border-zinc-300 pb-1">
                    <span className="uppercase text-sm">{h.day}</span>
                    <span className="text-red-500 text-sm">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-1">Contact</h4>
              <a href={BUSINESS.phoneTel} className="flex items-center gap-2 text-zinc-900 hover:text-red-500 font-bold">
                <Phone className="w-4 h-4 text-red-500" /> {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest h-12 px-6">
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">Get Directions</a>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-12 px-6">
              <a href={BUSINESS.phoneTel}>Call</a>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-2 border-white hover:bg-white hover:text-black font-black uppercase tracking-widest h-12 px-6">
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            </Button>
          </div>
        </div>
        <div className="relative border-8 border-white bg-zinc-100 overflow-hidden shadow-[12px_12px_0px_0px_rgba(239,68,68,1)] min-h-[300px]">
          <iframe src={BUSINESS.mapsEmbed} width="100%" height={400} loading="lazy" title={`${BUSINESS.name} location map`} className="block w-full border-0 h-full" />
        </div>
      </div>
    </section>
  );
}
