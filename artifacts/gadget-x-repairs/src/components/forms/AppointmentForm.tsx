import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitAppointment } from "@/lib/api";

type FormValues = {
  name: string;
  phone: string;
  serviceType: string;
  preferredDatetime: string;
  notes?: string;
};

export function AppointmentForm({ defaultServiceType = "screen-repair" }: { defaultServiceType?: string }) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: { serviceType: defaultServiceType },
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submitAppointment(values);
      setDone(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (done) {
    return (
      <div className="bg-red-500 text-black p-6 border-4 border-zinc-300 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
        <div className="font-black uppercase text-2xl mb-2">Booked.</div>
        <p className="font-bold">We&apos;ll confirm your appointment by text or call. Walk-ins welcome too.</p>
        <button onClick={() => setDone(false)} className="mt-4 underline font-black uppercase text-sm">Book another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-100 border-4 border-zinc-300 p-6 md:p-8 space-y-5" data-testid="form-appointment">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ap-name" className="font-black uppercase text-xs tracking-widest text-zinc-700">Your name</Label>
          <Input id="ap-name" {...register("name", { required: true })} className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-12" data-testid="input-name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ap-phone" className="font-black uppercase text-xs tracking-widest text-zinc-700">Phone</Label>
          <Input id="ap-phone" type="tel" {...register("phone", { required: true })} className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-12" data-testid="input-phone" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ap-service" className="font-black uppercase text-xs tracking-widest text-zinc-700">Service</Label>
          <select id="ap-service" {...register("serviceType")} className="w-full h-12 rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 px-3 font-bold uppercase text-sm" data-testid="select-service">
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
          <Label htmlFor="ap-datetime" className="font-black uppercase text-xs tracking-widest text-zinc-700">Preferred day & time</Label>
          <Input id="ap-datetime" placeholder="Mon 3pm, tomorrow afternoon..." {...register("preferredDatetime", { required: true })} className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-12" data-testid="input-datetime" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ap-notes" className="font-black uppercase text-xs tracking-widest text-zinc-700">Notes <span className="text-zinc-500">(optional)</span></Label>
        <Textarea id="ap-notes" {...register("notes")} className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500" data-testid="input-notes" />
      </div>
      {error && <div className="bg-red-500 text-zinc-900 px-4 py-3 font-black uppercase text-sm">{error}</div>}
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-none bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest text-lg h-14" data-testid="button-submit-appointment">
        {isSubmitting ? "Sending..." : "Book Appointment"}
      </Button>
    </form>
  );
}
