import { PhotoFrame, type Photo } from "@/components/PhotoFrame";
import { cn } from "@/lib/utils";

export type BeforeAfterPair = {
  slug: string;
  label: string;
  before: Photo;
  after: Photo;
};

type Props = {
  pair: BeforeAfterPair;
  sizes?: string;
  loading?: "lazy" | "eager";
  className?: string;
};

export function BeforeAfter({
  pair,
  sizes = "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw",
  loading = "lazy",
  className,
}: Props) {
  return (
    <figure
      className={cn(
        "group bg-zinc-50 border-4 border-zinc-950 shadow-[6px_6px_0_0_#09090b] hover:shadow-[2px_2px_0_0_#09090b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all overflow-hidden",
        className,
      )}
      data-testid={`before-after-${pair.slug}`}
    >
      <div className="grid grid-cols-2">
        <div className="relative">
          <PhotoFrame photo={pair.before} aspect="4:3" sizes={sizes} loading={loading} />
          <span className="absolute top-2 left-2 bg-zinc-950 text-white px-2 py-1 font-black uppercase text-[10px] tracking-widest shadow-[3px_3px_0_0_#ef4444]">
            Before
          </span>
        </div>
        <div className="relative border-l-4 border-zinc-950">
          <PhotoFrame photo={pair.after} aspect="4:3" sizes={sizes} loading={loading} />
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 font-black uppercase text-[10px] tracking-widest shadow-[3px_3px_0_0_#09090b]">
            After
          </span>
        </div>
      </div>
      <figcaption className="px-4 py-3 border-t-4 border-zinc-950 bg-white font-black uppercase text-sm tracking-tight text-zinc-950">
        {pair.label}
      </figcaption>
    </figure>
  );
}
