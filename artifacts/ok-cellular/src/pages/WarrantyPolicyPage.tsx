import { PageShell } from "@/components/PageShell";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const UPDATED = "May 8, 2026";

export default function WarrantyPolicyPage() {
  const business = useBusiness();
  return (
    <PageShell hideTicker>
      <SEO
        title="Warranty Policy | OK Cellular Humble TX"
        description="90-day warranty on all repairs at OK Cellular in Humble, TX. Parts and labor guaranteed. Learn what's covered."
        path="/warranty-policy"
        jsonLd={[localBusinessJsonLd(business), breadcrumbJsonLd([{ name: "Warranty Policy", path: "/warranty-policy" }])]}
      />
      <Breadcrumbs items={[{ label: "Warranty Policy" }]} />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Warranty Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <section>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
              <p className="text-lg font-bold text-foreground">
                All repairs at OK Cellular are covered by a <span className="text-primary">90-day warranty</span> on parts and labor.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">What the Warranty Covers</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Defects in replacement parts installed during the repair</li>
              <li>Workmanship issues resulting from the repair performed</li>
              <li>The same problem recurring due to the part or labor (not a new incident)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If a covered issue occurs within 90 days of the repair date, bring your device back and we will re-service it at no charge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">What the Warranty Does Not Cover</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Physical damage</strong> occurring after the repair (drops, cracks, bends)</li>
              <li><strong>Liquid damage</strong> occurring after the repair</li>
              <li><strong>Software issues</strong> unrelated to the hardware repair performed</li>
              <li>Damage caused by unauthorized repair or modification after our service</li>
              <li>Normal wear and tear</li>
              <li>Pre-existing conditions unrelated to the service performed, disclosed or not</li>
              <li>Consumable parts (batteries) degrading through normal use after the warranty period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Used &amp; Refurbished Devices</h2>
            <p className="text-muted-foreground leading-relaxed">
              Used and refurbished phones and laptops purchased from OK Cellular carry a <strong>30-day warranty</strong> covering hardware defects. This warranty does not cover physical or liquid damage incurred after purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Make a Warranty Claim</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Bring your device to our shop at {BUSINESS.addressFull}</li>
              <li>Have your repair receipt or order confirmation ready</li>
              <li>A technician will assess the issue — no appointment needed for warranty claims</li>
              <li>If the issue is covered, we'll repair it at no charge, typically same day</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Warranty Period Start Date</h2>
            <p className="text-muted-foreground leading-relaxed">
              The warranty period begins on the date the repair is completed and the device is returned to you. For online bookings, it begins on the date of in-store service completion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Questions?</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have any questions about warranty coverage, call or text us before bringing your device in.
            </p>
            <address className="not-italic text-muted-foreground space-y-1">
              <p><strong>OK Cellular</strong></p>
              <p>{BUSINESS.addressFull}</p>
              <p><a href={BUSINESS.phoneTel} className="text-primary hover:underline">{BUSINESS.phoneDisplay}</a></p>
            </address>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
