import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/lib/api";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";

type FormValues = {
  name: string;
  phone: string;
  desiredPhone: string;
  monthlyBudget: string;
  notes?: string;
  website?: string;
};

const BUDGET_OPTIONS = [
  "Under $30 / month",
  "$30 – $50 / month",
  "$50 – $80 / month",
  "$80+ / month",
  "Not sure yet",
];

// Pre-qualification leads land in the existing contact-message inbox, but
// they're tagged with a structured `source: "financing"` field on the API
// (see /leads/contact in api-server) so the admin badge and "Financing only"
// filter don't have to sniff the message body. The structured intake fields
// (desired phone, monthly budget, optional notes) are still formatted into
// the message body — the team needs that context to reply, and the contact
// endpoint only stores a single free-form `message`.
function buildContactMessage(values: FormValues): string {
  const lines = [
    `Desired phone: ${values.desiredPhone || "—"}`,
    `Monthly budget: ${values.monthlyBudget || "—"}`,
  ];
  if (values.notes && values.notes.trim().length > 0) {
    lines.push("", "Notes:", values.notes.trim());
  }
  return lines.join("\n");
}

type FinancingFormProps = {
  defaultPhone?: string;
  phoneTick?: number;
  formRef?: React.RefObject<HTMLFormElement>;
};

export function FinancingForm({ defaultPhone, phoneTick, formRef }: FinancingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const renderedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (defaultPhone) {
      setValue("desiredPhone", defaultPhone, { shouldValidate: false });
    }
  }, [defaultPhone, phoneTick, setValue]);
  const {
    widget: turnstileWidget,
    ensureToken: ensureTurnstileToken,
    reset: resetTurnstile,
    enabled: turnstileEnabled,
  } = useTurnstile();

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      const cfTurnstileToken = await ensureTurnstileToken();
      if (turnstileEnabled && !cfTurnstileToken) {
        setError(TURNSTILE_CLIENT_ERROR);
        return;
      }
      await submitContact({
        name: values.name,
        contact: values.phone,
        message: buildContactMessage(values),
        // Mark this as a financing pre-qualification on the structured
        // `source` field so the admin inbox can label and filter it without
        // having to parse the message body.
        source: "financing",
        website: values.website ?? "",
        renderedAt: renderedAtRef.current,
        cfTurnstileToken: cfTurnstileToken ?? undefined,
      });
      setDone(true);
      reset();
      renderedAtRef.current = Date.now();
      resetTurnstile();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      resetTurnstile();
    }
  }

  if (done) {
    return (
      <div
        className="bg-primary text-primary-foreground p-6 border border-border shadow-md"
        data-testid="financing-form-success"
      >
        <div className="font-semibold text-2xl mb-2">Pre-qualification received.</div>
        <p className="font-bold">
          We&apos;ll text or call you back today during business hours with the next step.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-4 underline font-medium text-sm"
          data-testid="financing-form-restart"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-muted border border-border p-6 md:p-8 space-y-5"
      data-testid="form-financing"
    >
      {/*
        Honeypot — same pattern as the other lead forms. Real users never see
        or interact with this; bots that auto-fill every field by name get
        silently dropped on the server.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="fin-website">Website</label>
        <input
          id="fin-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="fin-name"
          className="font-semibold text-xs tracking-wide text-foreground"
        >
          Your name
        </Label>
        <Input
          id="fin-name"
          autoComplete="name"
          {...register("name", { required: true })}
          className="bg-white border border-border focus:border-primary h-12"
          data-testid="input-financing-name"
        />
        {errors.name && (
          <div className="text-primary font-medium text-xs uppercase tracking-wide">Name is required</div>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="fin-phone"
          className="font-semibold text-xs tracking-wide text-foreground"
        >
          Callback phone
        </Label>
        <Input
          id="fin-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="(346) 555-0102"
          {...register("phone", { required: true, minLength: 7 })}
          className="bg-white border border-border focus:border-primary h-12"
          data-testid="input-financing-phone"
        />
        {errors.phone && (
          <div className="text-primary font-medium text-xs uppercase tracking-wide">
            We need a phone number to text you back
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="fin-desired"
          className="font-semibold text-xs tracking-wide text-foreground"
        >
          Phone you want
        </Label>
        <Input
          id="fin-desired"
          placeholder="iPhone 14, Samsung Galaxy S23, Pixel 8…"
          {...register("desiredPhone", { required: true })}
          className="bg-white border border-border focus:border-primary h-12"
          data-testid="input-financing-desired-phone"
        />
        {errors.desiredPhone && (
          <div className="text-primary font-medium text-xs uppercase tracking-wide">
            Tell us which phone you&apos;re after
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="fin-budget"
          className="font-semibold text-xs tracking-wide text-foreground"
        >
          Monthly budget
        </Label>
        <select
          id="fin-budget"
          {...register("monthlyBudget", { required: true })}
          className="w-full bg-white border border-border focus:border-primary focus:outline-none h-12 px-3 font-medium text-foreground"
          data-testid="input-financing-budget"
          defaultValue=""
        >
          <option value="" disabled>
            Pick a range
          </option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.monthlyBudget && (
          <div className="text-primary font-medium text-xs uppercase tracking-wide">
            Pick a monthly budget so we can match a phone
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="fin-notes"
          className="font-semibold text-xs tracking-wide text-foreground"
        >
          Anything else? <span className="text-muted-foreground normal-case font-medium">(optional)</span>
        </Label>
        <Textarea
          id="fin-notes"
          placeholder="Trade-in, carrier, color, storage…"
          {...register("notes")}
          className="bg-white border border-border focus:border-primary min-h-[96px]"
          data-testid="input-financing-notes"
        />
      </div>

      {error && (
        <div
          className="bg-primary text-primary-foreground px-4 py-3 font-medium text-sm"
          data-testid="financing-form-error"
        >
          {error}
        </div>
      )}
      {turnstileWidget}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base h-12"
        data-testid="button-submit-financing"
      >
        {isSubmitting ? "Sending..." : "Pre-qualify"}
      </Button>
      <p className="text-xs text-muted-foreground font-medium leading-snug">
        Submitting this form is a soft pre-qualification only. It does not affect your credit
        score. The actual lender check happens in store after we confirm the phone is available.
      </p>
    </form>
  );
}
