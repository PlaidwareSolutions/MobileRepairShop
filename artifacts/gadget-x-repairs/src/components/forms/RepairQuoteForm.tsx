import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitRepairQuote } from "@/lib/api";

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

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submitRepairQuote(values);
      setDone(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (done) {
    return (
      <div className="bg-yellow-400 text-black p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
        <div className="font-black uppercase text-2xl mb-2">Got it.</div>
        <p className="font-bold">We&apos;ll call or text you back today with your quote. For fastest response, call <a className="underline" href="tel:+13466236898">(346) 623-6898</a>.</p>
        <button onClick={() => setDone(false)} className="mt-4 underline font-black uppercase text-sm">Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-900 border-4 border-zinc-800 p-6 md:p-8 space-y-5" data-testid="form-repair-quote">
      <div className="space-y-2">
        <Label htmlFor="rq-name" className="font-black uppercase text-xs tracking-widest text-zinc-300">Your name</Label>
        <Input id="rq-name" {...register("name", { required: true, maxLength: 120 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-name" />
        {errors.name && <p className="text-red-500 text-xs font-bold uppercase">Name is required</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-phone" className="font-black uppercase text-xs tracking-widest text-zinc-300">Phone</Label>
          <Input id="rq-phone" type="tel" {...register("phone", { required: true, minLength: 7, maxLength: 40 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-phone" />
          {errors.phone && <p className="text-red-500 text-xs font-bold uppercase">Phone is required</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-email" className="font-black uppercase text-xs tracking-widest text-zinc-300">Email <span className="text-zinc-500">(optional)</span></Label>
          <Input id="rq-email" type="email" {...register("email", { maxLength: 200 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-email" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-device" className="font-black uppercase text-xs tracking-widest text-zinc-300">Device type</Label>
          <Input id="rq-device" placeholder="Phone, Tablet, Laptop, Console" {...register("deviceType", { required: true, maxLength: 80 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-device-type" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-brand" className="font-black uppercase text-xs tracking-widest text-zinc-300">Brand</Label>
          <Input id="rq-brand" placeholder="Apple, Samsung..." {...register("brand", { required: true, maxLength: 80 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-brand" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-model" className="font-black uppercase text-xs tracking-widest text-zinc-300">Model</Label>
          <Input id="rq-model" placeholder="iPhone 13, Galaxy S22..." {...register("model", { required: true, maxLength: 120 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-model" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rq-problem" className="font-black uppercase text-xs tracking-widest text-zinc-300">What&apos;s wrong?</Label>
        <Textarea id="rq-problem" {...register("problem", { required: true, maxLength: 4000 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 min-h-[100px]" data-testid="input-problem" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rq-contact" className="font-black uppercase text-xs tracking-widest text-zinc-300">Preferred contact</Label>
          <select id="rq-contact" {...register("preferredContact")} className="w-full h-12 rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 px-3 font-bold uppercase text-sm" data-testid="select-preferred-contact">
            <option value="call">Phone call</option>
            <option value="text">Text (SMS)</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rq-urgency" className="font-black uppercase text-xs tracking-widest text-zinc-300">Urgency</Label>
          <select id="rq-urgency" {...register("urgency")} className="w-full h-12 rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 px-3 font-bold uppercase text-sm" data-testid="select-urgency">
            <option value="asap">ASAP</option>
            <option value="today">Today</option>
            <option value="this_week">This week</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rq-notes" className="font-black uppercase text-xs tracking-widest text-zinc-300">Anything else <span className="text-zinc-500">(optional)</span></Label>
        <Textarea id="rq-notes" {...register("notes", { maxLength: 2000 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500" data-testid="input-notes" />
      </div>
      {error && <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm">{error}</div>}
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-14 shadow-[6px_6px_0px_0px_rgba(250,204,21,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(250,204,21,1)]" data-testid="button-submit-quote">
        {isSubmitting ? "Sending..." : "Get My Quote"}
      </Button>
    </form>
  );
}
