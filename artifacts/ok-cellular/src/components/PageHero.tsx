import type { ReactNode } from "react";
import { Zap, Phone, MapPin, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/components/BusinessContext";

export function PageHero({
  eyebrow,
  h1,
  subhead,
  accentRight,
}: {
  eyebrow: string;
  h1: string;
  subhead: string;
  accentRight?: ReactNode;
}) {
  const business = useBusiness();
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_15%_10%,hsl(var(--primary)/0.45),transparent_60%),radial-gradient(50%_60%_at_95%_90%,hsl(207_90%_55%/0.30),transparent_60%),radial-gradient(35%_45%_at_75%_25%,hsl(280_70%_55%/0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-16 w-[24rem] h-[24rem] rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative max-w-[1240px] mx-auto px-4 pt-12 pb-14 md:pt-16 md:pb-20 grid md:grid-cols-3 gap-10 items-end">
        <div className="md:col-span-2 space-y-5">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/15 backdrop-blur rounded-full px-3 py-1 font-medium">
              {eyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-sky-400 text-white border border-white/20 rounded-full px-3 py-1 font-semibold shadow-lg shadow-primary/30">
              <Zap className="w-3 h-3" /> Most repairs same day
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/15 backdrop-blur rounded-full px-3 py-1 font-medium">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> 90-day warranty
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[3.25rem] leading-[1.05] font-extrabold tracking-tight text-white">
            {h1}
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {subhead}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-slate-100 text-slate-900 font-semibold h-11 px-5 rounded-md shadow-lg shadow-black/20"
            >
              <a href={business.phoneTel}>
                <Phone className="w-4 h-4 mr-2" />
                Call {business.phoneDisplay}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 hover:text-white h-11 px-5 rounded-md font-semibold"
            >
              <a href={business.whatsappHref} target="_blank" rel="noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" />
                Text for a quote
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white h-11 px-5 rounded-md font-semibold"
            >
              <a href={business.mapsLink} target="_blank" rel="noreferrer">
                <MapPin className="w-4 h-4 mr-2" />
                Directions
              </a>
            </Button>
          </div>
        </div>
        {accentRight}
      </div>
      <div aria-hidden="true" className="relative">
        <svg className="block w-full h-10 md:h-14 text-background" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,80 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
