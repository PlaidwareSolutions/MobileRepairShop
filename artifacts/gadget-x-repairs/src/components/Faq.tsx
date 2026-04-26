export function Faq({ items, title = "Frequently Asked Questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="py-16 px-4 bg-black border-t border-zinc-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-white">{title}</h2>
        <div className="space-y-4">
          {items.map((it, i) => (
            <details key={i} className="bg-zinc-900 border-2 border-zinc-800 hover:border-red-500 transition-colors group">
              <summary className="cursor-pointer p-5 font-black uppercase text-base md:text-lg text-white flex justify-between items-center">
                <span>{it.q}</span>
                <span className="text-red-500 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
              </summary>
              <div className="px-5 pb-5 font-bold text-zinc-400 leading-relaxed">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
