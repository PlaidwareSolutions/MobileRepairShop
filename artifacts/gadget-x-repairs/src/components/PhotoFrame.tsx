import { cn } from "@/lib/utils";

export type PhotoAspect = "4:3" | "1:1" | "16:9";

export type Photo = {
  src640: string;
  src1024: string;
  alt: string;
};

const ASPECT_DIMENSIONS: Record<PhotoAspect, { w: number; h: number; aspectClass: string }> = {
  "4:3":  { w: 1024, h: 768,  aspectClass: "aspect-[4/3]" },
  "1:1":  { w: 1024, h: 1024, aspectClass: "aspect-square" },
  "16:9": { w: 1024, h: 576,  aspectClass: "aspect-video" },
};

type Props = {
  photo: Photo;
  aspect: PhotoAspect;
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  hover?: boolean;
  className?: string;
};

export function PhotoFrame({
  photo,
  aspect,
  sizes = "(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw",
  loading = "lazy",
  fetchPriority = "auto",
  hover = true,
  className,
}: Props) {
  const dims = ASPECT_DIMENSIONS[aspect];
  return (
    <div className={cn("relative overflow-hidden bg-zinc-200", dims.aspectClass, className)}>
      <img
        src={photo.src1024}
        srcSet={`${photo.src640} 640w, ${photo.src1024} 1024w`}
        sizes={sizes}
        alt={photo.alt}
        width={dims.w}
        height={dims.h}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={cn(
          "block w-full h-full object-cover",
          hover && "transition-transform duration-300 group-hover:scale-105",
        )}
      />
      {hover && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        />
      )}
    </div>
  );
}
