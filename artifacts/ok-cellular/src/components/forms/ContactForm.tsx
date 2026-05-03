import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/lib/api";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";

type FormValues = { name: string; contact: string; message: string; website?: string };

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>();
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
      await submitContact({
        name: values.name,
        contact: values.contact,
        message: values.message,
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
      <div className="bg-primary text-black p-6 border border-border shadow-md">
        <div className="font-semibold text-2xl mb-2">Message received.</div>
        <p className="font-bold">We&apos;ll get back to you today during business hours.</p>
        <button onClick={() => setDone(false)} className="mt-4 underline font-medium text-sm">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-muted border border-border p-6 md:p-8 space-y-5" data-testid="form-contact">
      {/*
        Honeypot: real users never see or interact with this field.
        Hidden off-screen rather than display:none so headless browsers that
        skip non-rendered fields still fill it in. Bots that auto-fill every
        input by name/label will populate "website" and get silently dropped
        on the server.
      */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="ct-website">Website</label>
        <input
          id="ct-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ct-name" className="font-semibold text-xs tracking-wide text-foreground">Your name</Label>
        <Input id="ct-name" {...register("name", { required: true })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ct-contact" className="font-semibold text-xs tracking-wide text-foreground">Phone or email</Label>
        <Input id="ct-contact" {...register("contact", { required: true })} className="bg-white border border-border focus:border-primary h-12" data-testid="input-contact" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ct-message" className="font-semibold text-xs tracking-wide text-foreground">Message</Label>
        <Textarea id="ct-message" {...register("message", { required: true })} className="bg-white border border-border focus:border-primary min-h-[120px]" data-testid="input-message" />
      </div>
      {error && <div className="bg-primary text-foreground px-4 py-3 font-medium text-sm">{error}</div>}
      {turnstileWidget}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-white hover:text-black text-foreground font-semibold uppercase tracking-wide text-lg h-14" data-testid="button-submit-contact">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
