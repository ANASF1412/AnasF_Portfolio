import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { webpSrcSet } from "@/lib/image-srcset";

/**
 * Image with a zero-layout-shift glassmorphic fallback.
 *
 * Performance rules baked in:
 * - native `loading="lazy"` + `decoding="async"` for everything below the fold
 *   (`priority` opts an image into eager loading + high fetch priority)
 * - intrinsic `width`/`height` so the browser reserves the box before decode
 * - `sizes` so responsive layouts don't download desktop-sized bytes on mobile
 * - no JS pre-probing: probing with `new Image()` downloads every asset up front
 *   and defeats lazy loading entirely
 */
export function SmartImage({
  src,
  alt,
  label,
  badge = "Awaiting upload",
  className = "",
  imgClassName = "",
  width = 1200,
  height = 900,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  describedBy,
}: {
  src: string;
  alt: string;
  label?: string;
  badge?: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /** id of a visible caption element describing this image. */
  describedBy?: string;
}) {
  const [state, setState] = useState<"idle" | "loaded" | "error">("idle");
  const imgRef = useRef<HTMLImageElement>(null);

  // SSR/cached images can finish loading before hydration, so `onLoad` never
  // fires and the image would stay stuck at opacity-0. Reconcile on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Skeleton shimmer holds the box until the bytes land — no CLS, no flash. */}
      {state === "idle" ? (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-foreground/5 motion-reduce:animate-none"
        />
      ) : null}

      {state !== "error" ? (
        <picture>
          {webpSrcSet(src) ? (
            <source type="image/webp" srcSet={webpSrcSet(src) ?? undefined} sizes={sizes} />
          ) : null}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            aria-describedby={describedBy}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            onLoad={() => setState("loaded")}
            onError={() => setState("error")}
            className={`relative h-full w-full object-cover ${imgClassName}`}
          />
        </picture>
      ) : null}

      {state === "error" ? (
        <div className="absolute inset-0 grid place-items-center overflow-hidden border border-border bg-surface/80 backdrop-blur-md">
          <div className="grid-veil absolute inset-0 opacity-40" aria-hidden />
          <div className="relative flex flex-col items-center gap-2 px-4 text-center">
            <ImageOff className="h-5 w-5 text-cyan/70" aria-hidden />
            {label ? (
              <p className="text-xs font-medium leading-snug text-foreground/80">{label}</p>
            ) : null}
            <span className="rounded-full border border-cyan/40 bg-surface px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan">
              {badge}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
