import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { webpSrcSet } from "@/lib/image-srcset";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
};

/** Responsive image with a reserved box, loading skeleton, and visible error fallback. */
export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 1024px) 100vw, 960px",
  className = "",
}: ImageWithFallbackProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;
    setState(image.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-surface-2/70">
      {state === "loading" ? (
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
            ref={imageRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading="lazy"
            decoding="async"
            onLoad={() => setState("loaded")}
            onError={() => setState("error")}
            className={`${className} h-full transition-opacity duration-300 ${
              state === "loaded" ? "opacity-100" : "opacity-0"
            } motion-reduce:transition-none`}
          />
        </picture>
      ) : (
        <div
          role="img"
          aria-label={`${alt} (image unavailable)`}
          className="absolute inset-0 grid place-items-center border border-border bg-surface/80"
        >
          <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
            <ImageOff aria-hidden className="h-6 w-6 text-cyan" />
            <span className="font-mono text-xs uppercase">Architecture diagram unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
}