import { useState } from "react";
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
  const [step, setStep] = useState<WizardStep>(1);
  const [device, setDevice] = useState("");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4) as WizardStep);
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as WizardStep);

  const reset = () => {
    setStep(1);
    setDevice("");
    setModel("");
    setIssue("");
    setName("");
    setPhone("");
    setDone(false);
    setError(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const meta = DEVICE_OPTIONS.find((d) => d.name === device);
    try {
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
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  function openWhatsappFallback() {
    const text = `Hi, I need a quote for a ${device}${model ? ` (${model})` : ""}. Issue: ${issue}. Name: ${name}.`;
    const url = `${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (done) {
    return (
      <div
        className="bg-white border-4 border-zinc-950 p-8 md:p-10 shadow-[12px_12px_0_0_#09090b]"
        data-testid="wizard-success"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-red-600 text-white p-3 shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Got it.</h3>
            <p className="font-bold text-zinc-700">
              We&apos;ll text or call you back today with a firm quote. For the fastest response, call{" "}
              <a className="text-red-600 underline" href={BUSINESS.phoneTel}>
                {BUSINESS.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
        <button
          onClick={reset}
          className="mt-6 font-black uppercase tracking-widest text-sm text-zinc-500 hover:text-zinc-950 transition-colors underline"
          data-testid="button-wizard-reset"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-white border-4 border-zinc-950 p-6 md:p-10 shadow-[12px_12px_0_0_#09090b]"
      data-testid="wizard-repair-quote"
    >
      <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-200 pb-4">
        <div className="font-black uppercase tracking-widest text-sm text-zinc-500">
          Step <span className="text-zinc-950 text-xl">{step}</span> of 4
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 md:w-12 transition-colors ${i <= step ? "bg-red-600" : "bg-zinc-200"}`}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[320px]">
        {step === 1 && (
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-6">What needs fixing?</h3>
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
                    className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-zinc-300 hover:border-zinc-950 hover:bg-zinc-50 transition-all font-black uppercase tracking-wide text-sm group"
                    data-testid={`wizard-device-${cat.name.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <Icon className="w-8 h-8 text-zinc-400 group-hover:text-red-600 transition-colors" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Which model?</h3>
            <p className="text-zinc-500 font-black mb-3 uppercase text-xs tracking-widest">Common Models</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {(MODEL_SUGGESTIONS[device] ?? []).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setModel(m);
                    handleNext();
                  }}
                  className="bg-zinc-100 border-2 border-zinc-200 hover:border-zinc-950 px-4 py-2 font-bold uppercase tracking-wide text-sm transition-colors"
                  data-testid={`wizard-model-suggestion`}
                >
                  {m}
                </button>
              ))}
            </div>

            <label className="block text-zinc-500 font-black mb-2 uppercase text-xs tracking-widest">
              Or type your model
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. iPhone 12 Mini"
                className="flex-1 bg-zinc-50 border-2 border-zinc-300 focus:border-red-600 focus:outline-none px-4 py-3 font-bold"
                data-testid="wizard-input-model"
              />
              <button
                type="button"
                onClick={handleNext}
                disabled={!model.trim()}
                className="bg-zinc-950 text-white px-6 font-black uppercase tracking-widest hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                data-testid="wizard-button-model-next"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-6">What&apos;s wrong with it?</h3>
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
                    className="flex items-center gap-4 p-4 border-2 border-zinc-300 hover:border-zinc-950 hover:bg-zinc-50 transition-all text-left group"
                    data-testid={`wizard-issue-${opt.issue.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <div className="bg-zinc-100 p-2 group-hover:bg-red-100 transition-colors">
                      <Icon className="w-5 h-5 text-zinc-500 group-hover:text-red-600 transition-colors" />
                    </div>
                    <span className="font-black uppercase tracking-wide text-sm">{opt.issue}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-md" data-testid="wizard-step-contact">
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-2">How should we reach you?</h3>
              <p className="text-zinc-500 font-black uppercase text-xs tracking-widest mb-4">
                We&apos;ll text or call your quote right away.
              </p>
            </div>

            <div className="bg-zinc-50 border-l-4 border-red-600 px-4 py-3 text-sm font-bold text-zinc-700">
              <span className="text-zinc-950">{device}</span>
              {model ? <span className="text-zinc-500"> · {model}</span> : null}
              {issue ? <span className="text-zinc-500"> · {issue}</span> : null}
            </div>

            <div>
              <label htmlFor="wiz-name" className="block text-zinc-950 font-black mb-2 uppercase text-xs tracking-widest">
                First Name
              </label>
              <input
                id="wiz-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-red-600 focus:outline-none px-4 py-3 font-bold"
                placeholder="Your name"
                data-testid="wizard-input-name"
              />
            </div>
            <div>
              <label htmlFor="wiz-phone" className="block text-zinc-950 font-black mb-2 uppercase text-xs tracking-widest">
                Phone Number
              </label>
              <input
                id="wiz-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-red-600 focus:outline-none px-4 py-3 font-bold"
                placeholder="(555) 555-5555"
                data-testid="wizard-input-phone"
              />
            </div>

            {error && (
              <div className="bg-red-600 text-white px-4 py-3 font-black uppercase text-sm" data-testid="wizard-error">
                {error}
                <button
                  type="button"
                  onClick={openWhatsappFallback}
                  className="block mt-2 underline font-black tracking-widest text-xs"
                >
                  Send via WhatsApp instead →
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 text-lg shadow-[6px_6px_0_0_#09090b] hover:shadow-[2px_2px_0_0_#09090b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
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

      <div className="mt-8 pt-6 border-t-2 border-zinc-100 flex justify-start">
        {step > 1 && !done && (
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-2 font-black uppercase tracking-widest text-sm text-zinc-400 hover:text-zinc-950 transition-colors"
            data-testid="wizard-button-back"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>
    </div>
  );
}
