export function Faq({ items, title = "Frequently Asked Questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="py-16 px-4 bg-white border-t border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 text-foreground">{title}</h2>
        <div className="space-y-4">
          {items.map((it, i) => (
            <details key={i} className="bg-muted border border-border hover:border-primary transition-colors group">
              <summary className="cursor-pointer p-5 font-semibold text-base md:text-lg text-foreground flex justify-between items-center">
                <span>{it.q}</span>
                <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-tight">+</span>
              </summary>
              <div className="px-5 pb-5 font-bold text-muted-foreground leading-relaxed">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
