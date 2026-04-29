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
  website?: string;
};

export function RepairQuoteForm({ defaultDeviceType, defaultBrand }: { defaultDeviceType?: string; defaultBrand?: string }) {
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
      <div className="bg-red-500 text-black p-6 border border-zinc-200 shadow-md">
        <div className="font-bold uppercase text-2xl mb-2">Got it.</div>
        <p className="font-bold">We&apos;ll call or text you back today with your quote. For fastest response, call <a className="underline" href="tel:+13466236898">(346) 623-6898</a>.</p>
        <button onClick={() => setDone(false)} className="mt-4 underline font-bold uppercase text-sm">Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-100 border border-zinc-200 p-6 md:p-8 space-y-5" data-testid="form-repair-quote">
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
        <Label htmlFor="rq-name" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Your name</Label>
        <Input id="rq-name" {...register("name", { required: true, maxLength: 120 })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-name" />
        {errors.name && <p className="text-red-500 text-xs font-bold uppercase">Name is required</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-phone" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Phone</Label>
          <Input id="rq-phone" type="tel" {...register("phone", { required: true, minLength: 7, maxLength: 40 })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-phone" />
          {errors.phone && <p className="text-red-500 text-xs font-bold uppercase">Phone is required</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-email" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Email <span className="text-zinc-500">(optional)</span></Label>
          <Input id="rq-email" type="email" {...register("email", { maxLength: 200 })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-email" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-device" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Device type</Label>
          <Input id="rq-device" placeholder="Phone, Tablet, Laptop, Console" {...register("deviceType", { required: true, maxLength: 80 })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-device-type" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-brand" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Brand</Label>
          <Input id="rq-brand" placeholder="Apple, Samsung..." {...register("brand", { required: true, maxLength: 80 })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-brand" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-model" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Model</Label>
          <Input id="rq-model" placeholder="iPhone 13, Galaxy S22..." {...register("model", { required: true, maxLength: 120 })} className="bg-white border border-zinc-200 focus:border-red-500 h-12" data-testid="input-model" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rq-problem" className="font-bold uppercase text-xs tracking-wide text-zinc-700">What&apos;s wrong?</Label>
        <Textarea id="rq-problem" {...register("problem", { required: true, maxLength: 4000 })} className="bg-white border border-zinc-200 focus:border-red-500 min-h-[100px]" data-testid="input-problem" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-contact" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Preferred contact</Label>
          <select id="rq-contact" {...register("preferredContact")} className="w-full h-12 bg-white border border-zinc-200 focus:border-red-500 px-3 font-bold uppercase text-sm" data-testid="select-preferred-contact">
            <option value="call">Phone call</option>
            <option value="text">Text (SMS)</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-urgency" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Urgency</Label>
          <select id="rq-urgency" {...register("urgency")} className="w-full h-12 bg-white border border-zinc-200 focus:border-red-500 px-3 font-bold uppercase text-sm" data-testid="select-urgency">
            <option value="asap">ASAP</option>
            <option value="today">Today</option>
            <option value="this_week">This week</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rq-photo" className="font-bold uppercase text-xs tracking-wide text-zinc-700">
          Photo of damage <span className="text-zinc-500">(optional — paste a link)</span>
        </Label>
        <Input
          id="rq-photo"
          type="url"
          placeholder="https://… (Google Photos, iCloud, Imgur, etc.)"
          {...register("photoUrl", { maxLength: 500 })}
          className="bg-white border border-zinc-200 focus:border-red-500 h-12"
          data-testid="input-photo-url"
        />
        <p className="text-xs font-bold text-zinc-500">Or text a photo to (346) 623-6898 on WhatsApp.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rq-notes" className="font-bold uppercase text-xs tracking-wide text-zinc-700">Anything else <span className="text-zinc-500">(optional)</span></Label>
        <Textarea id="rq-notes" {...register("notes", { maxLength: 2000 })} className="bg-white border border-zinc-200 focus:border-red-500" data-testid="input-notes" />
      </div>
      {turnstileWidget}
      {error && <div className="bg-red-500 text-zinc-900 px-4 py-3 font-bold uppercase text-sm">{error}</div>}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-semibold uppercase tracking-wide text-lg h-14 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-md" data-testid="button-submit-quote">
        {isSubmitting ? "Sending..." : "Get My Quote"}
      </Button>
    </form>
  );
}
