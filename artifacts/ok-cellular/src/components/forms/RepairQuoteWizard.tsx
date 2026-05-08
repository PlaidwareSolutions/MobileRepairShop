import { useState } from "react";
import { useLocation } from "wouter";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Wrench,
  Zap,
  Shield,
  ArrowLeft,
  Droplet,
  BatteryWarning,
  AlertTriangle,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { submitRepairQuote } from "@/lib/api";
import { BUSINESS } from "@/content";
import { useBusiness } from "@/components/BusinessContext";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";

type WizardStep = 1 | 2 | 3 | 4;

const DEVICE_OPTIONS: { name: string; brand: string; deviceType: string; icon: typeof Smartphone }[] = [
  { name: "iPhone", deviceType: "Phone", brand: "Apple", icon: Smartphone },
  { name: "Android", deviceType: "Phone", brand: "Samsung", icon: Smartphone },
  { name: "iPad", deviceType: "Tablet", brand: "Apple", icon: Tablet },
  { name: "MacBook", deviceType: "Laptop", brand: "Apple", icon: Laptop },
  { name: "Game Console", deviceType: "Console", brand: "Sony", icon: Gamepad2 },
  { name: "Other", deviceType: "Other", brand: "Other", icon: Wrench },
];

const MODEL_SUGGESTIONS: Record<string, string[]> = {
  iPhone: ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 13", "iPhone 12", "iPhone SE"],
  Android: ["Galaxy S24", "Galaxy S23", "Galaxy A54", "Pixel 8", "Motorola Edge", "T-Mobile Revvl"],
  iPad: ["iPad Pro 12.9″", "iPad Air", "iPad 10th gen", "iPad mini"],
  MacBook: ["MacBook Air M2", "MacBook Pro 14″", "MacBook Pro 16″", "MacBook Air M1"],
  "Game Console": ["PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One", "Nintendo Switch"],
  Other: [],
};

const ISSUE_OPTIONS = [
  { issue: "Cracked Screen", icon: AlertTriangle },
  { issue: "Battery Dying Fast", icon: BatteryWarning },
  { issue: "Water Damage", icon: Droplet },
  { issue: "Won't Turn On", icon: Zap },
  { issue: "Broken Charging Port", icon: Wrench },
  { issue: "Not Sure / Other", icon: Shield },
];

export function RepairQuoteWizard() {
  const [, setLocation] = useLocation();
  const business = useBusiness();
  const [step, setStep] = useState<WizardStep>(1);
  const [device, setDevice] = useState("");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    widget: turnstileWidget,
    ensureToken: ensureTurnstileToken,
    reset: resetTurnstile,
    enabled: turnstileEnabled,
  } = useTurnstile();

  const handleNext = () => setStep((s) => Math.min(s + 1, 4) as WizardStep);
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as WizardStep);

  const reset = () => {
    setStep(1);
    setDevice("");
    setModel("");
    setIssue("");
    setName("");
    setPhone("");
    setError(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const meta = DEVICE_OPTIONS.find((d) => d.name === device);
    try {
      const cfTurnstileToken = await ensureTurnstileToken();
      if (turnstileEnabled && !cfTurnstileToken) {
        setError(TURNSTILE_CLIENT_ERROR);
        return;
      }
      await submitRepairQuote({
        name,
        phone,
        deviceType: meta?.deviceType ?? device ?? "Other",
        brand: meta?.brand ?? device ?? "Other",
        model: model || device,
        problem: issue || "Unspecified — customer requested a quote via the wizard.",
        preferredContact: "call" as const,
        urgency: "today" as const,
        notes: `Submitted via quote wizard. Device: ${device}. Model: ${model}. Issue: ${issue}.`,
        cfTurnstileToken: cfTurnstileToken ?? undefined,
      });
      setLocation("/thank-you?from=quote");
      resetTurnstile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us directly.");
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  }

  function openWhatsappFallback() {
    const text = `Hi, I need a quote for a ${device}${model ? ` (${model})` : ""}. Issue: ${issue}. Name: ${name}.`;
    const url = `${business.whatsappHref}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }


  return (
    <div
      className="bg-white border border-border p-6 md:p-10 shadow-md"
      data-testid="wizard-repair-quote"
    >
      <div className="flex items-center justify-between mb-8 border-b-2 border-border pb-4">
        <div className="font-semibold tracking-wide text-sm text-muted-foreground">
          Step <span className="text-foreground text-xl">{step}</span> of 4
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 md:w-12 transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[320px]">
        {step === 1 && (
          <div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">What needs fixing?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DEVICE_OPTIONS.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => {
                      setDevice(cat.name);
                      setModel("");
                      handleNext();
                    }}
                    className="flex flex-col items-center justify-center gap-3 p-6 border border-border hover:border-border hover:bg-muted/40 transition-all font-semibold tracking-wide text-sm group"
                    data-testid={`wizard-device-${cat.name.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">Which model?</h3>
            <p className="text-muted-foreground font-semibold mb-3 uppercase text-xs tracking-wide">Common Models</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {(MODEL_SUGGESTIONS[device] ?? []).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setModel(m);
                    handleNext();
                  }}
                  className="bg-muted border border-border hover:border-border px-4 py-2 font-semibold tracking-wide text-sm transition-colors"
                  data-testid={`wizard-model-suggestion`}
                >
                  {m}
                </button>
              ))}
            </div>

            <label className="block text-muted-foreground font-semibold mb-2 uppercase text-xs tracking-wide">
              Or type your model
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. iPhone 12 Mini"
                className="flex-1 bg-muted/40 border border-border focus:border-primary focus:outline-none px-4 py-3 font-bold"
                data-testid="wizard-input-model"
              />
              <button
                type="button"
                onClick={handleNext}
                disabled={!model.trim()}
                className="bg-foreground text-white px-6 font-semibold uppercase tracking-wide hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                data-testid="wizard-button-model-next"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">What&apos;s wrong with it?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ISSUE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.issue}
                    type="button"
                    onClick={() => {
                      setIssue(opt.issue);
                      handleNext();
                    }}
                    className="flex items-center gap-4 p-4 border border-border hover:border-border hover:bg-muted/40 transition-all text-left group"
                    data-testid={`wizard-issue-${opt.issue.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <div className="bg-muted p-2 group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-semibold tracking-wide text-sm">{opt.issue}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-md" data-testid="wizard-step-contact">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight mb-2">How should we reach you?</h3>
              <p className="text-muted-foreground font-semibold text-xs tracking-wide mb-4">
                We&apos;ll text or call your quote right away.
              </p>
            </div>

            <div className="bg-muted/40 border-l-2 border-primary px-4 py-3 text-sm font-bold text-foreground">
              <span className="text-foreground">{device}</span>
              {model ? <span className="text-muted-foreground"> · {model}</span> : null}
              {issue ? <span className="text-muted-foreground"> · {issue}</span> : null}
            </div>

            <div>
              <label htmlFor="wiz-name" className="block text-foreground font-semibold mb-2 uppercase text-xs tracking-wide">
                First Name
              </label>
              <input
                id="wiz-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-muted/40 border border-border focus:border-primary focus:outline-none px-4 py-3 font-bold"
                placeholder="Your name"
                data-testid="wizard-input-name"
              />
            </div>
            <div>
              <label htmlFor="wiz-phone" className="block text-foreground font-semibold mb-2 uppercase text-xs tracking-wide">
                Phone Number
              </label>
              <input
                id="wiz-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-muted/40 border border-border focus:border-primary focus:outline-none px-4 py-3 font-bold"
                placeholder="(555) 555-5555"
                data-testid="wizard-input-phone"
              />
            </div>

            {error && (
              <div className="bg-primary text-white px-4 py-3 font-medium text-sm" data-testid="wizard-error">
                {error}
                <button
                  type="button"
                  onClick={openWhatsappFallback}
                  className="block mt-2 underline font-semibold tracking-wide text-xs"
                >
                  Send via WhatsApp instead →
                </button>
              </div>
            )}
            {turnstileWidget}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white font-semibold uppercase tracking-wide py-4 text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              data-testid="wizard-button-submit"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Get My Quote <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 pt-6 border-t-2 border-border flex justify-start">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-2 font-semibold tracking-wide text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="wizard-button-back"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>
    </div>
  );
}
