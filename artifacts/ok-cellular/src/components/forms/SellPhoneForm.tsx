import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitSellPhone } from "@/lib/api";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";

type FormValues = {
  name: string;
  phone: string;
  brand: string;
  model: string;
  storage?: string;
  carrier?: string;
  lockedStatus: "locked" | "unlocked";
  condition: "mint" | "good" | "fair" | "broken";
  batteryHealth?: number;
  damageNotes?: string;
  expectedPrice?: string;
  photoUrl?: string;
  website?: string;
};

export function SellPhoneForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { lockedStatus: "unlocked", condition: "good" },
  });
  const [, setLocation] = useLocation();
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
      const payload = {
        ...values,
        batteryHealth: values.batteryHealth ? Number(values.batteryHealth) : undefined,
        website: values.website ?? "",
        renderedAt: renderedAtRef.current,
        cfTurnstileToken: cfTurnstileToken ?? undefined,
      };
      await submitSellPhone(payload);
      setLocation("/thank-you?from=sell");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      resetTurnstile();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-muted border border-border p-6 md:p-8 space-y-5" data-testid="form-sell-phone">
      {/*
        Honeypot: real users never see or interact with this field.
        Hidden off-screen rather than display:none so headless browsers that
        skip non-rendered fields still fill it in. Bots that auto-fill every
        input by name/label will populate "website" and get silently dropped
        on the server.
      */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="sp-website">Website</label>
        <input
          id="sp-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-name" className="font-semibold text-xs tracking-wide text-foreground">Your name</Label>
          <Input id="sp-name" {...register("name", { required: true, maxLength: 120 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-name" />
          {errors.name && <p className="text-primary text-xs font-semibold">Required</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-phone" className="font-semibold text-xs tracking-wide text-foreground">Phone</Label>
          <Input id="sp-phone" type="tel" {...register("phone", { required: true, minLength: 7, maxLength: 40 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-phone" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-brand" className="font-semibold text-xs tracking-wide text-foreground">Brand</Label>
          <Input id="sp-brand" placeholder="Apple, Samsung, Google..." {...register("brand", { required: true, maxLength: 80 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-brand" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-model" className="font-semibold text-xs tracking-wide text-foreground">Model</Label>
          <Input id="sp-model" placeholder="iPhone 13, Galaxy S22..." {...register("model", { required: true, maxLength: 120 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-model" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-storage" className="font-semibold text-xs tracking-wide text-foreground">Storage</Label>
          <Input id="sp-storage" placeholder="64GB, 128GB..." {...register("storage", { maxLength: 40 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-storage" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-carrier" className="font-semibold text-xs tracking-wide text-foreground">Carrier</Label>
          <Input id="sp-carrier" placeholder="AT&T, T-Mobile..." {...register("carrier", { maxLength: 80 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-carrier" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-locked" className="font-semibold text-xs tracking-wide text-foreground">Locked?</Label>
          <select id="sp-locked" {...register("lockedStatus")} className="w-full h-12 bg-white border border-border focus:border-primary px-3 font-medium text-sm" data-testid="select-locked">
            <option value="unlocked">Unlocked</option>
            <option value="locked">Carrier locked</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-condition" className="font-semibold text-xs tracking-wide text-foreground">Condition</Label>
          <select id="sp-condition" {...register("condition")} className="w-full h-12 bg-white border border-border focus:border-primary px-3 font-medium text-sm" data-testid="select-condition">
            <option value="mint">Mint</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="broken">Broken</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-battery" className="font-semibold text-xs tracking-wide text-foreground">Battery health (%)</Label>
          <Input id="sp-battery" type="number" min={0} max={100} {...register("batteryHealth", { valueAsNumber: true })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-battery" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-price" className="font-semibold text-xs tracking-wide text-foreground">Asking price (optional)</Label>
          <Input id="sp-price" placeholder="$" {...register("expectedPrice", { maxLength: 20 })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-price" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="sp-damage" className="font-semibold text-xs tracking-wide text-foreground">Damage / notes <span className="text-muted-foreground">(optional)</span></Label>
        <Textarea id="sp-damage" {...register("damageNotes", { maxLength: 2000 })} className="bg-white border border-border focus:border-primary" data-testid="input-damage" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sp-photo" className="font-semibold text-xs tracking-wide text-foreground">
          Photo of phone <span className="text-muted-foreground">(optional — paste a link)</span>
        </Label>
        <Input
          id="sp-photo"
          type="url"
          placeholder="https://… (Google Photos, iCloud, Imgur, etc.)"
          {...register("photoUrl", { maxLength: 500 })}
          className="bg-white border border-border focus:border-primary h-12"
          data-testid="input-photo-url"
        />
        <p className="text-xs font-bold text-muted-foreground">Or text a photo to (281) 446-2166 on WhatsApp.</p>
      </div>
      {error && <div className="bg-primary text-primary-foreground px-4 py-3 font-medium text-sm">{error}</div>}
      {turnstileWidget}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base h-12 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-md" data-testid="button-submit-sell">
        {isSubmitting ? "Sending..." : "Get Cash Offer"}
      </Button>
    </form>
  );
}
