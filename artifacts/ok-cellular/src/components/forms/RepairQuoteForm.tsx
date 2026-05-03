import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitRepairQuote } from "@/lib/api";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";

type FormValues = {
  name: string;
  phone: string;
  email?: string;
  deviceType: string;
  brand: string;
  model: string;
  problem: string;
  preferredContact: "call" | "text" | "whatsapp" | "email";
  urgency: "asap" | "today" | "this_week" | "flexible";
  notes?: string;
  photoUrl?: string;
  returnAddress?: string;
  website?: string;
};

export function RepairQuoteForm({
  defaultDeviceType,
  defaultBrand,
  mode = "in-store",
}: {
  defaultDeviceType?: string;
  defaultBrand?: string;
  // "mail-in" enables the return-shipping-address field and tags the lead as
  // a mail-in repair on the server. The Repair Quote / Contact tabs default
  // to "in-store" and don't show the address field.
  mode?: "in-store" | "mail-in";
}) {
  const isMailIn = mode === "mail-in";
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      preferredContact: "call",
      urgency: "today",
      deviceType: defaultDeviceType ?? "",
      brand: defaultBrand ?? "",
    },
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const renderedAtRef = useRef<number>(Date.now());
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
      await submitRepairQuote({
        ...values,
        source: mode,
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
      <div className="bg-primary text-black p-6 border border-border shadow-md" data-testid="form-repair-quote-success">
        <div className="font-semibold text-2xl mb-2">Got it.</div>
        {isMailIn ? (
          <p className="font-bold">
            We&apos;ll call or text you back within one business day with your quote and shipping
            instructions. For fastest response, call <a className="underline" href="tel:+12814462166">(281) 446-2166</a>.
          </p>
        ) : (
          <p className="font-bold">
            We&apos;ll call or text you back today with your quote. For fastest response, call{" "}
            <a className="underline" href="tel:+12814462166">(281) 446-2166</a>.
          </p>
        )}
        <button onClick={() => setDone(false)} className="mt-4 underline font-medium text-sm">Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-muted border border-border p-6 md:p-8 space-y-5" data-testid="form-repair-quote">
      {/*
        Honeypot: real users never see or interact with this field.
        Hidden off-screen rather than display:none so headless browsers that
        skip non-rendered fields still fill it in. Bots that auto-fill every
        input by name/label will populate "website" and get silently dropped
        on the server.
      */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="rq-website">Website</label>
        <input
          id="rq-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rq-name" className="font-semibold text-xs tracking-wide text-foreground">Your name</Label>
        <Input id="rq-name" {...register("name", { required: true, maxLength: 120 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-name" />
        {errors.name && <p className="text-primary text-xs font-semibold">Name is required</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-phone" className="font-semibold text-xs tracking-wide text-foreground">Phone</Label>
          <Input id="rq-phone" type="tel" {...register("phone", { required: true, minLength: 7, maxLength: 40 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-phone" />
          {errors.phone && <p className="text-primary text-xs font-semibold">Phone is required</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-email" className="font-semibold text-xs tracking-wide text-foreground">Email <span className="text-muted-foreground">(optional)</span></Label>
          <Input id="rq-email" type="email" {...register("email", { maxLength: 200 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-email" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-device" className="font-semibold text-xs tracking-wide text-foreground">Device type</Label>
          <Input id="rq-device" placeholder="Phone, Tablet, Laptop, Console" {...register("deviceType", { required: true, maxLength: 80 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-device-type" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-brand" className="font-semibold text-xs tracking-wide text-foreground">Brand</Label>
          <Input id="rq-brand" placeholder="Apple, Samsung..." {...register("brand", { required: true, maxLength: 80 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-brand" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-model" className="font-semibold text-xs tracking-wide text-foreground">Model</Label>
          <Input id="rq-model" placeholder="iPhone 13, Galaxy S22..." {...register("model", { required: true, maxLength: 120 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-model" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rq-problem" className="font-semibold text-xs tracking-wide text-foreground">What&apos;s wrong?</Label>
        <Textarea id="rq-problem" {...register("problem", { required: true, maxLength: 4000 })} className="bg-white border border-border focus:border-primary min-h-[100px]" data-testid="input-problem" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-contact" className="font-semibold text-xs tracking-wide text-foreground">Preferred contact</Label>
          <select id="rq-contact" {...register("preferredContact")} className="w-full h-12 bg-white border border-border focus:border-primary px-3 font-medium text-sm" data-testid="select-preferred-contact">
            <option value="call">Phone call</option>
            <option value="text">Text (SMS)</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-urgency" className="font-semibold text-xs tracking-wide text-foreground">Urgency</Label>
          <select id="rq-urgency" {...register("urgency")} className="w-full h-12 bg-white border border-border focus:border-primary px-3 font-medium text-sm" data-testid="select-urgency">
            <option value="asap">ASAP</option>
            <option value="today">Today</option>
            <option value="this_week">This week</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rq-photo" className="font-semibold text-xs tracking-wide text-foreground">
          Photo of damage <span className="text-muted-foreground">(optional — paste a link)</span>
        </Label>
        <Input
          id="rq-photo"
          type="url"
          placeholder="https://… (Google Photos, iCloud, Imgur, etc.)"
          {...register("photoUrl", { maxLength: 500 })}
          className="bg-white border border-border focus:border-primary h-12"
          data-testid="input-photo-url"
        />
        <p className="text-xs font-bold text-muted-foreground">Or text a photo to (281) 446-2166 on WhatsApp.</p>
      </div>
      {isMailIn && (
        <div className="space-y-2">
          <Label htmlFor="rq-return-address" className="font-semibold text-xs tracking-wide text-foreground">
            Return shipping address
          </Label>
          <Textarea
            id="rq-return-address"
            placeholder={"Full name\nStreet address\nCity, State ZIP"}
            {...register("returnAddress", {
              required: true,
              minLength: 10,
              maxLength: 500,
            })}
            className="bg-white border border-border focus:border-primary min-h-[110px]"
            data-testid="input-return-address"
          />
          <p className="text-xs font-bold text-muted-foreground">
            Where we&apos;ll mail your repaired device once it&apos;s done.
          </p>
          {errors.returnAddress && (
            <p className="text-primary text-xs font-semibold">
              Return address is required for mail-in repairs
            </p>
          )}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="rq-notes" className="font-semibold text-xs tracking-wide text-foreground">Anything else <span className="text-muted-foreground">(optional)</span></Label>
        <Textarea id="rq-notes" {...register("notes", { maxLength: 2000 })} className="bg-white border border-border focus:border-primary" data-testid="input-notes" />
      </div>
      {error && <div className="bg-primary text-foreground px-4 py-3 font-medium text-sm">{error}</div>}
      {turnstileWidget}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-white hover:text-black text-foreground font-semibold uppercase tracking-wide text-lg h-14 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-md" data-testid="button-submit-quote">
        {isSubmitting
          ? "Sending..."
          : isMailIn
            ? "Start My Mail-In Repair"
            : "Get My Quote"}
      </Button>
    </form>
  );
}
