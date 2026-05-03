import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

export function LocationCard() {
  const business = useBusiness();
  return (
    <section id="location" className="py-16 px-4 bg-muted/40 scroll-mt-20 border-t border-border">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-6 text-foreground">
            Visit the <span className="text-primary">shop</span>
          </h2>
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-muted-foreground font-semibold uppercase tracking-wide text-xs mb-1">Location</h4>
              <p className="text-xl font-semibold text-foreground">
                {business.addressLine1}<br />{business.addressLine2}
              </p>
            </div>
            <div>
              <h4 className="text-muted-foreground font-semibold uppercase tracking-wide text-xs mb-1">Hours</h4>
              <div className="space-y-1 max-w-xs font-medium">
                {business.hours.map((h) => (
                  <div key={h.day} className="flex justify-between border-b border-border pb-1">
                    <span className="text-sm">{h.day}</span>
                    <span className="text-primary text-sm">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-muted-foreground font-semibold uppercase tracking-wide text-xs mb-1">Contact</h4>
              <a href={business.phoneTel} className="flex items-center gap-2 text-foreground hover:text-primary font-semibold">
                <Phone className="w-4 h-4 text-primary" /> {business.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-primary hover:bg-primary text-white font-semibold h-12 px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <a href={business.mapsLink} target="_blank" rel="noreferrer">Get Directions</a>
            </Button>
            <Button asChild variant="outline" className="border border-border bg-white hover:bg-muted/40 text-foreground font-semibold h-12 px-6">
              <a href={business.phoneTel}>Call</a>
            </Button>
            <Button asChild variant="outline" className="border border-border bg-white hover:bg-muted/40 text-foreground font-semibold h-12 px-6">
              <a href={business.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
            </Button>
          </div>
        </div>
        <div className="relative bg-muted overflow-hidden rounded-2xl shadow-lg ring-1 ring-zinc-200 min-h-[300px]">
          <iframe src={business.mapsEmbed} width="100%" height={400} loading="lazy" title={`${BUSINESS.name} location map`} className="block w-full border-0 h-full" />
        </div>
      </div>
    </section>
  );
}
