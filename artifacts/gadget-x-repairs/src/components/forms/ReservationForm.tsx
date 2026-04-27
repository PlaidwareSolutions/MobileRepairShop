import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitReservation } from "@/lib/api";

type FormValues = { name: string; phone: string; notes?: string };

export function ReservationForm({ itemId, itemLabel, onClose }: { itemId: string; itemLabel: string; onClose?: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submitReservation({ ...values, itemId, itemLabel });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (done) {
    return (
      <div className="bg-red-500 text-black p-6 border-4 border-zinc-300">
        <div className="font-black uppercase text-xl mb-2">Reserved.</div>
        <p className="font-bold text-sm">We&apos;ll hold {itemLabel} for 24 hours and call to confirm.</p>
        {onClose && <button onClick={onClose} className="mt-4 underline font-black uppercase text-sm">Close</button>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-100 border-4 border-zinc-300 p-6 space-y-4" data-testid="form-reservation">
      <p className="font-bold text-sm text-zinc-600">Reserving: <span className="text-zinc-900">{itemLabel}</span></p>
      <div className="space-y-2">
        <Label htmlFor="rs-name" className="font-black uppercase text-xs tracking-widest text-zinc-700">Your name</Label>
        <Input id="rs-name" {...register("name", { required: true })} className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-12" data-testid="input-name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rs-phone" className="font-black uppercase text-xs tracking-widest text-zinc-700">Phone</Label>
        <Input id="rs-phone" type="tel" {...register("phone", { required: true })} className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-12" data-testid="input-phone" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rs-notes" className="font-black uppercase text-xs tracking-widest text-zinc-700">Notes</Label>
        <Textarea id="rs-notes" {...register("notes")} className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500" data-testid="input-notes" />
      </div>
      {error && <div className="bg-red-500 text-zinc-900 px-4 py-3 font-black uppercase text-sm">{error}</div>}
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-none bg-red-500 hover:bg-white text-black font-black uppercase tracking-widest h-12" data-testid="button-submit-reservation">
        {isSubmitting ? "Sending..." : "Reserve"}
      </Button>
    </form>
  );
}
