import { PageShell } from "@/components/PageShell";
import { SEO, localBusinessJsonLd, breadcrumbJsonLd } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const UPDATED = "May 8, 2026";

export default function PrivacyPolicyPage() {
  const business = useBusiness();
  return (
    <PageShell hideTicker>
      <SEO
        title="Privacy Policy | OK Cellular Humble TX"
        description="Privacy Policy for OK Cellular in Humble, TX. Learn how we collect, use, and protect your personal information."
        path="/privacy-policy"
        jsonLd={[localBusinessJsonLd(business), breadcrumbJsonLd([{ name: "Privacy Policy", path: "/privacy-policy" }])]}
      />
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              OK Cellular ("we," "us," or "our") operates the website <strong>okcellularrepairs.com</strong> and the retail shop located at {BUSINESS.addressFull}. This Privacy Policy explains how we collect, use, disclose, and protect information when you use our website or visit our store.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We collect information you provide directly to us through our website forms, including:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address (optional)</li>
              <li>Device make, model, and description of the issue</li>
              <li>Messages or notes you submit</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We also automatically collect standard web analytics data (pages visited, time on site, browser type, approximate location by city) through Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To respond to your repair quotes, appointment requests, and general inquiries</li>
              <li>To confirm appointments and communicate about your repair status</li>
              <li>To process payments for services rendered</li>
              <li>To improve our website and services</li>
              <li>To measure the effectiveness of our advertising (Google Ads)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use the following third-party services, each subject to their own privacy policy:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Google Analytics</strong> — website traffic measurement</li>
              <li><strong>Google Ads</strong> — advertising and conversion measurement</li>
              <li><strong>Stripe</strong> — secure payment processing for repair deposits</li>
              <li><strong>Cloudflare Turnstile</strong> — bot protection on contact forms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website uses cookies for analytics and advertising purposes. You can disable cookies in your browser settings. Disabling cookies will not affect your ability to use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Sharing and Sale</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We share information only with service providers that help us operate our business (listed above), and only as necessary to provide services to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain customer information for as long as needed to provide our services and maintain warranty records. Repair records are kept for a minimum of 12 months to support warranty claims.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may contact us at any time to request access to, correction of, or deletion of your personal information. We will respond within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about this Privacy Policy? Contact us:
            </p>
            <address className="not-italic mt-3 text-muted-foreground space-y-1">
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
