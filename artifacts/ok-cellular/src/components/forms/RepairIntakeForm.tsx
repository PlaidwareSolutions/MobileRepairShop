import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitRepairIntake, fetchStripeConfig } from "@/lib/api";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";
import { Smartphone, Tablet, Laptop, Gamepad2, Truck, Store, ChevronRight, ChevronLeft, ShieldCheck, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// ─── Types ────────────────────────────────────────────────────────────────────

type DeviceType = "Phone" | "Tablet" | "Laptop" | "Console";
type ServiceMethod = "in-store" | "mail-in";
type Urgency = "asap" | "today" | "this_week" | "flexible";
type PreferredContact = "call" | "text" | "whatsapp" | "email";

type StepData = {
  deviceType: DeviceType | "";
  brand: string;
  model: string;
  problem: string;
  photoUrl: string;
  urgency: Urgency;
  source: ServiceMethod;
  preferredDatetime: string;
  returnAddress: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: PreferredContact;
  notes: string;
};

const DEVICE_OPTIONS: { type: DeviceType; icon: typeof Smartphone; label: string; brands: string[] }[] = [
  { type: "Phone", icon: Smartphone, label: "Phone", brands: ["Apple", "Samsung", "Google", "Motorola", "Other"] },
  { type: "Tablet", icon: Tablet, label: "Tablet", brands: ["Apple", "Samsung", "Other"] },
  { type: "Laptop", icon: Laptop, label: "Laptop", brands: ["Apple", "HP", "Dell", "Lenovo", "Samsung", "Other"] },
  { type: "Console", icon: Gamepad2, label: "Console", brands: ["Sony (PS5)", "Microsoft (Xbox)", "Nintendo", "Other"] },
];

const URGENCY_OPTIONS: { value: Urgency; label: string; desc: string }[] = [
  { value: "asap", label: "ASAP", desc: "Get it fixed immediately" },
  { value: "today", label: "Today", desc: "Same-day if possible" },
  { value: "this_week", label: "This week", desc: "Within the next few days" },
  { value: "flexible", label: "Flexible", desc: "No rush" },
];

const CONTACT_OPTIONS: { value: PreferredContact; label: string }[] = [
  { value: "call", label: "Phone call" },
  { value: "text", label: "Text (SMS)" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

const TOTAL_STEPS = 4;

// ─── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i + 1 < step
                ? "bg-primary border-primary text-white"
                : i + 1 === step
                  ? "border-primary text-primary bg-white"
                  : "border-muted-foreground/30 text-muted-foreground/50 bg-white"
            }`}
          >
            {i + 1 < step ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-8 sm:w-12 transition-all ${
                i + 1 < step ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
      <span className="ml-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Step {step} of {total}
      </span>
    </div>
  );
}

// ─── Step 1: Device ────────────────────────────────────────────────────────────

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: StepData;
  onChange: (patch: Partial<StepData>) => void;
  onNext: () => void;
}) {
  const canAdvance = data.deviceType && data.brand.trim() && data.model.trim();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">What are we fixing?</h2>
        <p className="text-muted-foreground text-sm">Select your device type, then tell us the brand and model.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DEVICE_OPTIONS.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange({ deviceType: type, brand: "", model: "" })}
            className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-lg transition-all text-sm font-semibold ${
              data.deviceType === type
                ? "border-primary bg-primary/5 text-primary"
                : "border-border bg-white hover:border-primary/40 text-foreground"
            }`}
          >
            <Icon className="w-7 h-7" />
            {label}
          </button>
        ))}
      </div>
      {data.deviceType && (
        <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="space-y-2">
            <Label className="font-semibold text-xs tracking-wide">Brand</Label>
            <select
              value={data.brand}
              onChange={(e) => onChange({ brand: e.target.value, model: "" })}
              className="w-full h-12 bg-white border border-border focus:border-primary px-3 font-medium text-sm rounded-none"
            >
              <option value="">Select brand...</option>
              {DEVICE_OPTIONS.find((d) => d.type === data.deviceType)?.brands.map((b) => (
                <option key={b} value={b === "Apple" && data.deviceType === "Phone" ? "Apple" : b.split(" (")[0]}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="font-semibold text-xs tracking-wide">Model</Label>
            <Input
              value={data.model}
              onChange={(e) => onChange({ model: e.target.value })}
              placeholder={
                data.deviceType === "Phone"
                  ? "iPhone 15, Galaxy S24…"
                  : data.deviceType === "Tablet"
                    ? "iPad Pro, Galaxy Tab…"
                    : data.deviceType === "Laptop"
                      ? "MacBook Pro, HP Envy…"
                      : "PS5, Xbox Series X…"
              }
              className="bg-white border border-border focus:border-primary h-12"
            />
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onNext}
          disabled={!canAdvance}
          className="bg-primary text-white font-semibold px-6 h-11 flex items-center gap-2"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 2: Issue ─────────────────────────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: StepData;
  onChange: (patch: Partial<StepData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canAdvance = data.problem.trim().length > 0;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">What&apos;s wrong?</h2>
        <p className="text-muted-foreground text-sm">Describe the issue with your {data.brand} {data.model}.</p>
      </div>
      <div className="space-y-2">
        <Label className="font-semibold text-xs tracking-wide">Describe the problem</Label>
        <Textarea
          value={data.problem}
          onChange={(e) => onChange({ problem: e.target.value })}
          placeholder="Cracked screen, won't charge, water damage, won't turn on…"
          className="bg-white border border-border focus:border-primary min-h-[120px]"
        />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold text-xs tracking-wide">
          Urgency
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {URGENCY_OPTIONS.map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ urgency: value })}
              className={`flex flex-col items-start p-3 border-2 rounded-lg text-left transition-all ${
                data.urgency === value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-white hover:border-primary/40"
              }`}
            >
              <span className="font-semibold text-sm text-foreground">{label}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="font-semibold text-xs tracking-wide">
          Photo of damage <span className="font-normal text-muted-foreground">(optional — paste a link)</span>
        </Label>
        <Input
          type="url"
          value={data.photoUrl}
          onChange={(e) => onChange({ photoUrl: e.target.value })}
          placeholder="https://… (Google Photos, iCloud, Imgur, etc.)"
          className="bg-white border border-border focus:border-primary h-12"
        />
        <p className="text-xs text-muted-foreground font-medium">Or text a photo to (281) 446-2166 on WhatsApp.</p>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="flex items-center gap-1 text-muted-foreground">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={!canAdvance}
          className="bg-primary text-white font-semibold px-6 h-11 flex items-center gap-2"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Service method ────────────────────────────────────────────────────

function Step3({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: StepData;
  onChange: (patch: Partial<StepData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canAdvance =
    data.source === "mail-in"
      ? data.returnAddress.trim().length > 5
      : true;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">How would you like to get it to us?</h2>
        <p className="text-muted-foreground text-sm">Drop it off at our Humble, TX shop or ship it to us from anywhere.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange({ source: "in-store", returnAddress: "" })}
          className={`flex flex-col items-center gap-3 p-5 border-2 rounded-lg transition-all ${
            data.source === "in-store"
              ? "border-primary bg-primary/5"
              : "border-border bg-white hover:border-primary/40"
          }`}
        >
          <Store className={`w-8 h-8 ${data.source === "in-store" ? "text-primary" : "text-foreground"}`} />
          <div>
            <div className="font-bold text-base text-foreground">Drop off at our shop</div>
            <div className="text-xs text-muted-foreground mt-1">3201 FM 1960 E, Humble TX 77338</div>
            <div className="text-xs text-muted-foreground">Walk in anytime during store hours</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onChange({ source: "mail-in", preferredDatetime: "" })}
          className={`flex flex-col items-center gap-3 p-5 border-2 rounded-lg transition-all ${
            data.source === "mail-in"
              ? "border-primary bg-primary/5"
              : "border-border bg-white hover:border-primary/40"
          }`}
        >
          <Truck className={`w-8 h-8 ${data.source === "mail-in" ? "text-primary" : "text-foreground"}`} />
          <div>
            <div className="font-bold text-base text-foreground">Ship it to us</div>
            <div className="text-xs text-muted-foreground mt-1">Mail-in from anywhere in the US</div>
            <div className="text-xs text-muted-foreground">We fix it and ship it back</div>
          </div>
        </button>
      </div>
      {data.source === "in-store" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Label className="font-semibold text-xs tracking-wide">
            Preferred day &amp; time <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            value={data.preferredDatetime}
            onChange={(e) => onChange({ preferredDatetime: e.target.value })}
            placeholder="Monday 3pm, tomorrow morning, this weekend…"
            className="bg-white border border-border focus:border-primary h-12"
          />
        </div>
      )}
      {data.source === "mail-in" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Label className="font-semibold text-xs tracking-wide">Return shipping address</Label>
          <Textarea
            value={data.returnAddress}
            onChange={(e) => onChange({ returnAddress: e.target.value })}
            placeholder={"Full name\nStreet address\nCity, State ZIP"}
            className="bg-white border border-border focus:border-primary min-h-[100px]"
          />
          <p className="text-xs font-medium text-muted-foreground">
            We&apos;ll mail your repaired device back to this address.
          </p>
        </div>
      )}
      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="flex items-center gap-1 text-muted-foreground">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={!canAdvance}
          className="bg-primary text-white font-semibold px-6 h-11 flex items-center gap-2"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 4: Contact info ──────────────────────────────────────────────────────

function Step4({
  data,
  onChange,
  onSubmitNoDeposit,
  onSubmitWithDeposit,
  onBack,
  isSubmitting,
  error,
  stripeEnabled,
  stripePublishableKey,
  turnstileWidget,
}: {
  data: StepData;
  onChange: (patch: Partial<StepData>) => void;
  onSubmitNoDeposit: () => void;
  onSubmitWithDeposit: (intentId: string) => void;
  onBack: () => void;
  isSubmitting: boolean;
  error: string | null;
  stripeEnabled: boolean;
  stripePublishableKey: string | null;
  turnstileWidget: React.ReactNode;
}) {
  const canAdvance = data.name.trim() && data.phone.trim().length >= 7;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Your contact info</h2>
        <p className="text-muted-foreground text-sm">We&apos;ll use this to confirm your booking and keep you updated.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-semibold text-xs tracking-wide">Your name</Label>
          <Input
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="bg-white border border-border focus:border-primary h-12"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-semibold text-xs tracking-wide">Phone</Label>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="bg-white border border-border focus:border-primary h-12"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-semibold text-xs tracking-wide">
            Email <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="bg-white border border-border focus:border-primary h-12"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-semibold text-xs tracking-wide">Preferred contact</Label>
          <select
            value={data.preferredContact}
            onChange={(e) => onChange({ preferredContact: e.target.value as PreferredContact })}
            className="w-full h-12 bg-white border border-border focus:border-primary px-3 font-medium text-sm rounded-none"
          >
            {CONTACT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="font-semibold text-xs tracking-wide">
          Anything else? <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          value={data.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Any other details we should know…"
          className="bg-white border border-border focus:border-primary"
        />
      </div>
      {error && (
        <div className="bg-primary text-white px-4 py-3 font-medium text-sm">
          {error}
        </div>
      )}
      {turnstileWidget}

      <div className="flex justify-between items-center">
        <Button type="button" variant="ghost" onClick={onBack} className="flex items-center gap-1 text-muted-foreground">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        {(!stripeEnabled || !stripePublishableKey || !canAdvance) && (
          <Button
            type="button"
            onClick={onSubmitNoDeposit}
            disabled={!canAdvance || isSubmitting}
            className="bg-primary text-white font-semibold px-6 h-11"
          >
            {isSubmitting ? "Submitting…" : "Book My Repair"}
          </Button>
        )}
      </div>
      {stripeEnabled && stripePublishableKey && canAdvance && (
        <DepositSection
          publishableKey={stripePublishableKey}
          onPaid={onSubmitWithDeposit}
          onSkip={onSubmitNoDeposit}
          isSubmitting={isSubmitting}
          canProceed={canAdvance}
        />
      )}
    </div>
  );
}

// ─── Deposit section (Stripe Elements) ────────────────────────────────────────

function DepositPaymentForm({
  onPaid,
  onSkip,
  isSubmitting,
}: {
  onPaid: (intentId: string) => void;
  onSkip: () => void;
  isSubmitting: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    setPayError(null);
    setPaying(true);
    try {
      const submitResult = await elements.submit();
      if (submitResult.error) {
        setPayError(submitResult.error.message ?? "Payment failed");
        return;
      }
      const resp = await fetch("/api/payments/repair-deposit/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!resp.ok) {
        const err = (await resp.json()) as { error?: string };
        setPayError(err.error ?? "Could not create payment");
        return;
      }
      const { clientSecret, intentId } = (await resp.json()) as { clientSecret: string; intentId: string };
      const confirmResult = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      });
      if (confirmResult.error) {
        setPayError(confirmResult.error.message ?? "Payment failed");
        return;
      }
      onPaid(intentId);
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="space-y-4">
      <PaymentElement />
      {payError && (
        <div className="bg-primary/10 border border-primary text-primary px-4 py-3 text-sm font-medium">
          {payError}
        </div>
      )}
      <Button
        type="button"
        onClick={handlePay}
        disabled={paying || isSubmitting || !stripe}
        className="w-full bg-primary text-white font-semibold h-12 text-base flex items-center justify-center gap-2"
      >
        <CreditCard className="w-5 h-5" />
        {paying ? "Processing…" : "Pay $10 Deposit & Book"}
      </Button>
      <button
        type="button"
        onClick={onSkip}
        disabled={isSubmitting}
        className="w-full text-sm text-muted-foreground underline py-1 hover:text-foreground transition-colors"
      >
        Skip deposit — book without holding my slot
      </button>
    </div>
  );
}

function DepositSection({
  publishableKey,
  onPaid,
  onSkip,
  isSubmitting,
  canProceed,
}: {
  publishableKey: string;
  onPaid: (intentId: string) => void;
  onSkip: () => void;
  isSubmitting: boolean;
  canProceed: boolean;
}) {
  const [stripePromise] = useState(() => loadStripe(publishableKey));
  const [showDeposit, setShowDeposit] = useState(false);

  if (!canProceed) return null;

  if (!showDeposit) {
    return (
      <div className="border border-border bg-muted/30 p-5 rounded-lg space-y-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-semibold text-foreground text-sm">Hold your slot with a $10 deposit</div>
            <div className="text-xs text-muted-foreground mt-1">
              A refundable $10 deposit guarantees your appointment. Applied toward your repair cost.
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={() => setShowDeposit(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 flex-1 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" /> Pay $10 Deposit
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            disabled={isSubmitting}
            className="h-11 flex-1 font-medium text-muted-foreground"
          >
            {isSubmitting ? "Submitting…" : "Skip Deposit & Book"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-white p-5 rounded-lg space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <span className="font-semibold text-sm text-foreground">$10 deposit — refundable, applied to repair</span>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: 1000,
          currency: "usd",
          appearance: { theme: "stripe" },
        }}
      >
        <DepositPaymentForm onPaid={onPaid} onSkip={onSkip} isSubmitting={isSubmitting} />
      </Elements>
    </div>
  );
}

// ─── Main multi-step form ──────────────────────────────────────────────────────

export function RepairIntakeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StepData>({
    deviceType: "",
    brand: "",
    model: "",
    problem: "",
    photoUrl: "",
    urgency: "flexible",
    source: "in-store",
    preferredDatetime: "",
    returnAddress: "",
    name: "",
    phone: "",
    email: "",
    preferredContact: "call",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [depositPaid, setDepositPaid] = useState(false);
  const [stripeEnabled, setStripeEnabled] = useState(false);
  const [stripePublishableKey, setStripePublishableKey] = useState<string | null>(null);

  const renderedAtRef = useRef<number>(Date.now());
  const {
    widget: turnstileWidget,
    ensureToken: ensureTurnstileToken,
    reset: resetTurnstile,
    enabled: turnstileEnabled,
  } = useTurnstile();

  useEffect(() => {
    fetchStripeConfig()
      .then(({ available, publishableKey }) => {
        setStripeEnabled(available);
        setStripePublishableKey(publishableKey ?? null);
      })
      .catch(() => {
        setStripeEnabled(false);
      });
  }, []);

  function patch(data: Partial<StepData>) {
    setFormData((prev) => ({ ...prev, ...data }));
  }

  async function submit(stripePaymentIntentId?: string) {
    setError(null);
    setIsSubmitting(true);
    try {
      const cfTurnstileToken = await ensureTurnstileToken();
      if (turnstileEnabled && !cfTurnstileToken) {
        setError(TURNSTILE_CLIENT_ERROR);
        return;
      }
      await submitRepairIntake({
        deviceType: formData.deviceType || "Phone",
        brand: formData.brand,
        model: formData.model,
        problem: formData.problem,
        photoUrl: formData.photoUrl || undefined,
        urgency: formData.urgency,
        source: formData.source,
        preferredDatetime: formData.preferredDatetime || undefined,
        returnAddress: formData.returnAddress || undefined,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        preferredContact: formData.preferredContact,
        notes: formData.notes || undefined,
        stripePaymentIntentId,
        renderedAt: renderedAtRef.current,
        cfTurnstileToken: cfTurnstileToken ?? undefined,
      });
      setDepositPaid(!!stripePaymentIntentId);
      setDone(true);
      resetTurnstile();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="bg-primary text-white p-8 space-y-3">
        <div className="text-3xl font-bold">You&apos;re booked.</div>
        {depositPaid ? (
          <p className="font-semibold text-lg">
            Your $10 deposit is confirmed and your slot is held. We&apos;ll call or text you to confirm the details.
          </p>
        ) : (
          <p className="font-semibold text-lg">
            We got your request for your {formData.brand} {formData.model}. We&apos;ll call or text you back shortly to confirm.
          </p>
        )}
        <p className="text-white/80 text-sm">
          Questions? Call <a href="tel:+12814462166" className="underline font-semibold">(281) 446-2166</a>.
        </p>
        <button
          onClick={() => {
            setDone(false);
            setStep(1);
            setFormData({
              deviceType: "", brand: "", model: "", problem: "", photoUrl: "",
              urgency: "flexible", source: "in-store", preferredDatetime: "",
              returnAddress: "", name: "", phone: "", email: "",
              preferredContact: "call", notes: "",
            });
            renderedAtRef.current = Date.now();
          }}
          className="mt-2 underline text-sm font-medium text-white/80 hover:text-white"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-muted border border-border p-6 md:p-8">
      <StepIndicator step={step} total={TOTAL_STEPS} />

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="ri-website">Website</label>
        <input id="ri-website" type="text" tabIndex={-1} autoComplete="off" name="website" />
      </div>

      {step === 1 && (
        <Step1
          data={formData}
          onChange={patch}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          data={formData}
          onChange={patch}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3
          data={formData}
          onChange={patch}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Step4
          data={formData}
          onChange={patch}
          onSubmitNoDeposit={() => submit()}
          onSubmitWithDeposit={(intentId) => submit(intentId)}
          onBack={() => setStep(3)}
          isSubmitting={isSubmitting}
          error={error}
          stripeEnabled={stripeEnabled}
          stripePublishableKey={stripePublishableKey}
          turnstileWidget={turnstileWidget}
        />
      )}
    </div>
  );
}
