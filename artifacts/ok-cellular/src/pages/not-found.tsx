import { Link } from "wouter";
import { AlertCircle, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Phone Repair", to: "/phone-repair-humble-tx" },
  { label: "iPhone Repair", to: "/iphone-repair-humble-tx" },
  { label: "PS5 Repair", to: "/ps5-repair-humble-tx" },
  { label: "Phones for Sale", to: "/phones-for-sale-humble-tx" },
  { label: "Inventory", to: "/inventory" },
  { label: "Contact", to: "/contact-humble-tx" },
];

export default function NotFound() {
  return (
    <PageShell hideTicker>
      <SEO title="Page Not Found | OK Cellular" description="The page you were looking for does not exist." path="/" noindex />
      <section className="py-24 px-4 bg-muted/40 min-h-[60vh]">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-primary mb-6" />
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">404</h1>
          <p className="text-xl font-bold text-muted-foreground mb-10">That page doesn't exist. Try one of these:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10 text-left">
            {QUICK_LINKS.map((q) => (
              <Link key={q.to} href={q.to} className="bg-white border border-border p-4 hover:border-primary transition-colors flex justify-between items-center">
                <span className="font-medium text-sm text-foreground">{q.label}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            ))}
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8">
            <Link href="/phone-repair-humble-tx">Back Home</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
