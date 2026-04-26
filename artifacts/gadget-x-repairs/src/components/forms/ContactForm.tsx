import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/lib/api";

type FormValues = { name: string; contact: string; message: string };

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submitContact(values);
      setDone(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (done) {
    return (
      <div className="bg-yellow-400 text-black p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
        <div className="font-black uppercase text-2xl mb-2">Message received.</div>
        <p className="font-bold">We&apos;ll get back to you today during business hours.</p>
        <button onClick={() => setDone(false)} className="mt-4 underline font-black uppercase text-sm">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-900 border-4 border-zinc-800 p-6 md:p-8 space-y-5" data-testid="form-contact">
      <div className="space-y-2">
        <Label htmlFor="ct-name" className="font-black uppercase text-xs tracking-widest text-zinc-300">Your name</Label>
        <Input id="ct-name" {...register("name", { required: true })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ct-contact" className="font-black uppercase text-xs tracking-widest text-zinc-300">Phone or email</Label>
        <Input id="ct-contact" {...register("contact", { required: true })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-12" data-testid="input-contact" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ct-message" className="font-black uppercase text-xs tracking-widest text-zinc-300">Message</Label>
        <Textarea id="ct-message" {...register("message", { required: true })} className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 min-h-[120px]" data-testid="input-message" />
      </div>
      {error && <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm">{error}</div>}
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-lg h-14" data-testid="button-submit-contact">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
