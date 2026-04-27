import type { ReactNode } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/content";

export function PageHero({ eyebrow, h1, subhead, accentRight }: { eyebrow: string; h1: string; subhead: string; accentRight?: ReactNode }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 px-4 border-b border-zinc-200">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-10 items-end relative z-10">
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-3">
            <span className="bg-red-500 text-black px-4 py-2 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] inline-block transform -rotate-2">
              {eyebrow}
            </span>
            <span className="bg-red-500 text-zinc-900 px-4 py-2 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] inline-flex items-center gap-2 transform rotate-1">
              <Zap className="w-3 h-3" /> Same-Day Repair
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] font-black uppercase tracking-tighter text-zinc-900">
            {h1}
          </h1>
          <p className="text-lg md:text-xl font-bold text-zinc-600 max-w-2xl">{subhead}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="rounded-none bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest text-sm h-12 px-6 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]">
              <a href={BUSINESS.phoneTel}>Call (346) 623-6898</a>
            </Button>
            <Button asChild className="rounded-none bg-red-500 hover:bg-white text-black font-black uppercase tracking-widest text-sm h-12 px-6">
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">Text For Quote</a>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-2 border-white bg-transparent hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest text-sm h-12 px-6">
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">Directions</a>
            </Button>
          </div>
        </div>
        {accentRight}
      </div>
    </section>
  );
}
