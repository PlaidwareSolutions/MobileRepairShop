import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitSellPhone } from "@/lib/api";

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
};

export function SellPhoneForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { lockedStatus: "unlocked", condition: "good" },
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      const payload = { ...values, batteryHealth: values.batteryHealth ? Number(values.batteryHealth) : undefined };
      await submitSellPhone(payload);
      setDone(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (done) {
    return (
      <div className="bg-yellow-400 text-black p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
        <div className="font-black uppercase text-2xl mb-2">Offer coming.</div>
        <p className="font-bold">We&apos;ll text or call you back today with our offer. Bring your phone in with ID for cash on the spot.</p>
        <button onClick={() => setDone(false)} className="mt-4 underline font-black uppercase text-sm">Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-900 border-4 border-zinc-800 p-6 md:p-8 space-y-5" data-testid="form-sell-phone">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-name" className="font-black uppercase text-xs tracking-widest text-zinc-300">Your name</Label>
          <Input id="sp-name" {...register("name", { required: true, maxLength: 120 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-name" />
          {errors.name && <p className="text-red-500 text-xs font-bold uppercase">Required</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-phone" className="font-black uppercase text-xs tracking-widest text-zinc-300">Phone</Label>
          <Input id="sp-phone" type="tel" {...register("phone", { required: true, minLength: 7, maxLength: 40 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-phone" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-brand" className="font-black uppercase text-xs tracking-widest text-zinc-300">Brand</Label>
          <Input id="sp-brand" placeholder="Apple, Samsung, Google..." {...register("brand", { required: true, maxLength: 80 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-brand" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-model" className="font-black uppercase text-xs tracking-widest text-zinc-300">Model</Label>
          <Input id="sp-model" placeholder="iPhone 13, Galaxy S22..." {...register("model", { required: true, maxLength: 120 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-model" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-storage" className="font-black uppercase text-xs tracking-widest text-zinc-300">Storage</Label>
          <Input id="sp-storage" placeholder="64GB, 128GB..." {...register("storage", { maxLength: 40 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-storage" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-carrier" className="font-black uppercase text-xs tracking-widest text-zinc-300">Carrier</Label>
          <Input id="sp-carrier" placeholder="AT&T, T-Mobile..." {...register("carrier", { maxLength: 80 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-carrier" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-locked" className="font-black uppercase text-xs tracking-widest text-zinc-300">Locked?</Label>
          <select id="sp-locked" {...register("lockedStatus")} className="w-full h-12 rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 px-3 font-bold uppercase text-sm" data-testid="select-locked">
            <option value="unlocked">Unlocked</option>
            <option value="locked">Carrier locked</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sp-condition" className="font-black uppercase text-xs tracking-widest text-zinc-300">Condition</Label>
          <select id="sp-condition" {...register("condition")} className="w-full h-12 rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 px-3 font-bold uppercase text-sm" data-testid="select-condition">
            <option value="mint">Mint</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="broken">Broken</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-battery" className="font-black uppercase text-xs tracking-widest text-zinc-300">Battery health (%)</Label>
          <Input id="sp-battery" type="number" min={0} max={100} {...register("batteryHealth", { valueAsNumber: true })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-battery" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sp-price" className="font-black uppercase text-xs tracking-widest text-zinc-300">Asking price (optional)</Label>
          <Input id="sp-price" placeholder="$" {...register("expectedPrice", { maxLength: 20 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-price" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="sp-damage" className="font-black uppercase text-xs tracking-widest text-zinc-300">Damage / notes <span className="text-zinc-500">(optional)</span></Label>
        <Textarea id="sp-damage" {...register("damageNotes", { maxLength: 2000 })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500" data-testid="input-damage" />
      </div>
      {error && <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm">{error}</div>}
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-none bg-yellow-400 hover:bg-white text-black font-black uppercase tracking-widest text-lg h-14 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]" data-testid="button-submit-sell">
        {isSubmitting ? "Sending..." : "Get Cash Offer"}
      </Button>
    </form>
  );
}
