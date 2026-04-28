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
        "group bg-zinc-50 border border-zinc-200 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden",
        className,
      )}
      data-testid={`before-after-${pair.slug}`}
    >
      <div className="grid grid-cols-2">
        <div className="relative">
          <PhotoFrame photo={pair.before} aspect="4:3" sizes={sizes} loading={loading} />
          <span className="absolute top-2 left-2 bg-zinc-900/85 text-white px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wide">
            Before
          </span>
        </div>
        <div className="relative border-l border-zinc-200">
          <PhotoFrame photo={pair.after} aspect="4:3" sizes={sizes} loading={loading} />
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wide">
            After
          </span>
        </div>
      </div>
      <figcaption className="px-4 py-3 border-t border-zinc-200 bg-white font-semibold text-sm tracking-tight text-zinc-900">
        {pair.label}
      </figcaption>
    </figure>
  );
}
