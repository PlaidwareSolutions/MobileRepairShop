import { PageShell } from "@/components/PageShell";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const UPDATED = "May 8, 2026";

export default function RefundPolicyPage() {
  const business = useBusiness();
  return (
    <PageShell hideTicker>
      <SEO
        title="Refund Policy | OK Cellular Humble TX"
        description="Refund policy for repair services and device sales at OK Cellular in Humble, TX. No-fix, no-fee on repairs."
        path="/refund-policy"
        jsonLd={[localBusinessJsonLd(business), breadcrumbJsonLd([{ name: "Refund Policy", path: "/refund-policy" }])]}
      />
      <Breadcrumbs items={[{ label: "Refund Policy" }]} />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Refund Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">Repair Services — No-Fix, No-Fee</h2>
            <p className="text-muted-foreground leading-relaxed">
              If we are unable to repair your device, you owe us nothing. There is no diagnostic charge for standard repairs when we cannot complete the service. If we quote a repair and you decline after the diagnostic, there is no fee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Repair Failed After Completion</h2>
            <p className="text-muted-foreground leading-relaxed">
              If a completed repair fails due to our parts or workmanship within the 90-day warranty period, we will re-service your device at no additional charge. See our <a href="/warranty-policy" className="text-primary hover:underline">Warranty Policy</a> for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Online Repair Deposits</h2>
            <p className="text-muted-foreground leading-relaxed">
              The $10 deposit collected online when booking a repair is applied toward your total repair cost. If we cannot complete your repair, the deposit is fully refunded to your original payment method within 5–10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Used &amp; Refurbished Device Sales</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              All used and refurbished devices are tested before sale. We offer the following return terms:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>7-day return</strong> on defective devices — if a device has a hardware defect that was not disclosed at the time of sale, bring it back within 7 days for a full refund or exchange.</li>
              <li><strong>No returns</strong> on devices with new physical damage, liquid damage, or that have been opened or modified after sale.</li>
              <li>All sales are final after 7 days unless covered under our warranty policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Accessories</h2>
            <p className="text-muted-foreground leading-relaxed">
              Accessories (cases, chargers, screen protectors) may be returned within 7 days if unopened and in original packaging. Opened accessories are non-refundable unless defective.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Software Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Software-based services (carrier unlock assistance, account lock removal, data transfers) are non-refundable once the service has been completed, as the service is consumed upon delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Request a Refund</h2>
            <p className="text-muted-foreground leading-relaxed">
              To request a refund, contact us by phone, text, or in person. Bring your device and receipt. Refunds are issued to the original payment method or as store credit at your preference.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
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
