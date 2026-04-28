import type { ReactNode } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/content";

export function PageHero({ eyebrow, h1, subhead, accentRight }: { eyebrow: string; h1: string; subhead: string; accentRight?: ReactNode }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 px-4 border-b border-zinc-200">
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-10 items-end relative z-10">
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-3">
            <span className="bg-red-50 text-red-600 border border-red-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wide text-xs inline-block">
              {eyebrow}
            </span>
            <span className="bg-red-50 text-red-600 border border-red-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wide text-xs inline-flex items-center gap-2">
              <Zap className="w-3 h-3" /> Same-Day Repair
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight font-extrabold tracking-tight text-zinc-900">
            {h1}
          </h1>
          <p className="text-lg md:text-xl font-medium text-zinc-600 max-w-2xl">{subhead}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="bg-red-500 hover:bg-red-600 text-white font-semibold uppercase tracking-wide text-sm h-12 px-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <a href={BUSINESS.phoneTel}>Call (346) 623-6898</a>
            </Button>
            <Button asChild className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold uppercase tracking-wide text-sm h-12 px-6 shadow-sm hover:shadow-md transition-all">
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer">Text For Quote</a>
            </Button>
            <Button asChild variant="outline" className="border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold uppercase tracking-wide text-sm h-12 px-6">
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">Directions</a>
            </Button>
          </div>
        </div>
        {accentRight}
      </div>
    </section>
  );
}
