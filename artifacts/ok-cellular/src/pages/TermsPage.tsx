import { PageShell } from "@/components/PageShell";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const UPDATED = "May 8, 2026";

export default function TermsPage() {
  const business = useBusiness();
  return (
    <PageShell hideTicker>
      <SEO
        title="Terms & Conditions | OK Cellular Humble TX"
        description="Terms and conditions for repair, sales, and services at OK Cellular in Humble, TX."
        path="/terms"
        jsonLd={[localBusinessJsonLd(business), breadcrumbJsonLd([{ name: "Terms & Conditions", path: "/terms" }])]}
      />
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By visiting our store, using our website, or submitting a repair, quote, or purchase request, you agree to these Terms &amp; Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              OK Cellular provides device repair services, used and refurbished device sales, prepaid carrier activations, bill payment services, and accessories. All repair services are performed in good faith using quality parts. We do not guarantee results for devices with severe water damage, prior third-party repairs, or pre-existing defects unrelated to the requested service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Device Ownership</h2>
            <p className="text-muted-foreground leading-relaxed">
              By bringing a device in for service, you represent that you are the legal owner of the device or have explicit authorization from the owner to request repairs. OK Cellular will not service devices that are reported lost or stolen. For certain services (carrier unlock assistance, account lock removal), valid government-issued photo ID and proof of ownership are required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Device Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              While your device is in our care, we take reasonable precautions to prevent damage. However, OK Cellular is not liable for pre-existing damage, data loss, or issues unrelated to the service performed. Devices with severe water damage or prior unauthorized repairs may carry additional risk that we will disclose before proceeding. We strongly recommend backing up your data before any repair.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Unclaimed Devices</h2>
            <p className="text-muted-foreground leading-relaxed">
              Devices not picked up within 30 days of repair completion, after reasonable attempts to contact the customer, may be considered abandoned. OK Cellular reserves the right to recoup repair costs from abandoned devices in accordance with Texas law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              Payment is due upon completion of service or at time of sale. We accept cash, major credit/debit cards, and select digital payment methods. Diagnostic fees, where applicable, are disclosed prior to service. Online repair deposits are applied toward the total repair cost.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Website Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is provided for informational purposes. Prices and availability shown online are subject to change. Submitting an online form does not constitute a confirmed appointment or price quote — a team member will confirm details by phone or text.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including text, images, and graphics, is owned by or licensed to OK Cellular and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, OK Cellular's liability for any claim arising from our services is limited to the amount paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Harris County, Texas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. Continued use of our services after any changes constitutes acceptance of the revised Terms.
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
