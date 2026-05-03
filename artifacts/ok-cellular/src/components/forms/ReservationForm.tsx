import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitReservation } from "@/lib/api";
import { useTurnstile, TURNSTILE_CLIENT_ERROR } from "./Turnstile";

type FormValues = { name: string; phone: string; notes?: string; website?: string };

export function ReservationForm({ itemId, itemLabel, onClose }: { itemId: string; itemLabel: string; onClose?: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();
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
      await submitReservation({
        ...values,
        itemId,
        itemLabel,
        website: values.website ?? "",
        renderedAt: renderedAtRef.current,
        cfTurnstileToken: cfTurnstileToken ?? undefined,
      });
      setDone(true);
      renderedAtRef.current = Date.now();
      resetTurnstile();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      resetTurnstile();
    }
  }

  if (done) {
    return (
      <div className="bg-red-500 text-black p-6 border border-zinc-200">
        <div className="font-bold uppercase text-xl mb-2">Reserved.</div>
        <p className="font-bold text-sm">We&apos;ll hold {itemLabel} for 24 hours and call to confirm.</p>
        {onClose && <button onClick={onClose} className="mt-4 underline font-bold uppercase text-sm">Close</button>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-100 border border-zinc-200 p-6 space-y-4" data-testid="form-reservation">
      {/*
        Honeypot: real users never see or interact with this field.
        Hidden off-screen rather than display:none so headless browsers that
        skip non-rendered fields still fill it in. Bots that auto-fill every
        input by name/label will populate "website" and get silently dropped
        on the server.
      */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="rs-website">Website</label>
        <input
          id="rs-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <p className="font-bold text-sm text-zinc-600">Reserving: <span className="text-zinc-900">{itemLabel}</span></p>
      <div className="space-y-2">
        <Label htmlFor="rs-name" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Your name</Label>
        <Input id="rs-name" {...register("name", { required: true })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rs-phone" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Phone</Label>
        <Input id="rs-phone" type="tel" {...register("phone", { required: true })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-phone" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rs-notes" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Notes</Label>
        <Textarea id="rs-notes" {...register("notes")} className="bg-white border border-zinc-200 focus:border-red-500" data-testid="input-notes" />
      </div>
      {error && <div className="bg-red-500 text-zinc-900 px-4 py-3 font-bold uppercase text-sm">{error}</div>}
      {turnstileWidget}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-red-500 hover:bg-white text-black font-semibold uppercase tracking-wide h-12" data-testid="button-submit-reservation">
        {isSubmitting ? "Sending..." : "Reserve"}
      </Button>
    </form>
  );
}
