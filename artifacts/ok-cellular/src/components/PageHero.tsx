import type { ReactNode } from "react";
import { Zap, Phone, MapPin, MessageSquare } from "lucide-react";
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
    <section className="relative overflow-hidden bg-card border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_0%,hsl(var(--primary)/0.10),transparent_70%),radial-gradient(40%_40%_at_0%_100%,hsl(var(--primary)/0.06),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <div className="relative max-w-[1240px] mx-auto px-4 py-10 md:py-14 grid md:grid-cols-3 gap-10 items-end">
        <div className="md:col-span-2 space-y-5">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-muted text-muted-foreground border border-border rounded-full px-2.5 py-1 font-medium">
              {eyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-1 font-medium">
              <Zap className="w-3 h-3" /> Most repairs same day
            </span>
            <span className="inline-flex items-center gap-1.5 bg-muted text-muted-foreground border border-border rounded-full px-2.5 py-1 font-medium">
              90-day warranty
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-semibold tracking-tight text-foreground">
            {h1}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {subhead}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 px-5 rounded-md"
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
              className="bg-card border-border text-foreground hover:bg-muted h-11 px-5 rounded-md font-semibold"
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
              className="text-foreground hover:bg-muted h-11 px-5 rounded-md font-semibold"
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
    </section>
  );
}
