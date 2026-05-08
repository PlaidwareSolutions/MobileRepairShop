import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitAppointment } from "@/lib/api";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";

type FormValues = {
  name: string;
  phone: string;
  serviceType: string;
  preferredDatetime: string;
  notes?: string;
  website?: string;
};

export function AppointmentForm({ defaultServiceType = "screen-repair" }: { defaultServiceType?: string }) {
  const [, setLocation] = useLocation();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: { serviceType: defaultServiceType },
  });
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
      await submitAppointment({
        ...values,
        website: values.website ?? "",
        renderedAt: renderedAtRef.current,
        cfTurnstileToken: cfTurnstileToken ?? undefined,
      });
      setLocation("/thank-you?from=appointment");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      resetTurnstile();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-muted border border-border p-6 md:p-8 space-y-5" data-testid="form-appointment">
      {/*
        Honeypot: real users never see or interact with this field.
        Hidden off-screen rather than display:none so headless browsers that
        skip non-rendered fields still fill it in. Bots that auto-fill every
        input by name/label will populate "website" and get silently dropped
        on the server.
      */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="ap-website">Website</label>
        <input
          id="ap-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ap-name" className="font-semibold text-xs tracking-wide text-foreground">Your name</Label>
          <Input id="ap-name" {...register("name", { required: true })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ap-phone" className="font-semibold text-xs tracking-wide text-foreground">Phone</Label>
          <Input id="ap-phone" type="tel" {...register("phone", { required: true })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-phone" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ap-service" className="font-semibold text-xs tracking-wide text-foreground">Service</Label>
          <select id="ap-service" {...register("serviceType")} className="w-full h-12 bg-white border border-border focus:border-primary px-3 font-medium text-sm" data-testid="select-service">
            <option value="screen-repair">Screen repair</option>
            <option value="battery-replacement">Battery replacement</option>
            <option value="hdmi-repair">HDMI port repair</option>
            <option value="laptop-diagnostic">Laptop diagnostic</option>
            <option value="motherboard-repair">Motherboard repair</option>
            <option value="phone-unlocking">Phone unlocking</option>
            <option value="prepaid-activation">Prepaid activation</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ap-datetime" className="font-semibold text-xs tracking-wide text-foreground">Preferred day & time</Label>
          <Input id="ap-datetime" placeholder="Mon 3pm, tomorrow afternoon..." {...register("preferredDatetime", { required: true })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-datetime" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ap-notes" className="font-semibold text-xs tracking-wide text-foreground">Notes <span className="text-muted-foreground">(optional)</span></Label>
        <Textarea id="ap-notes" {...register("notes")} className="bg-white border border-border focus:border-primary" data-testid="input-notes" />
      </div>
      {error && <div className="bg-primary text-primary-foreground px-4 py-3 font-medium text-sm">{error}</div>}
      {turnstileWidget}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base h-12" data-testid="button-submit-appointment">
        {isSubmitting ? "Sending..." : "Book Appointment"}
      </Button>
    </form>
  );
}
