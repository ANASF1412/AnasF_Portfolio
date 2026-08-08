import { SmartImage } from "./smart-image";

/**
 * Visual proof container for a project. Resolves to the centralised
 * `/images/projects/{slug}.jpg` path with a glassmorphic fallback.
 *
 * Responsive/perf contract:
 * - fixed 16/9 aspect box reserves layout before the bytes land (zero CLS)
 * - intrinsic 1280x720 + `sizes` so phones never pull desktop-weight bytes
 * - `priority` (first card / case-study hero) loads eagerly at high fetch
 *   priority; everything else stays native-lazy
 */
export function ProjectMedia({
  slug,
  name,
  alt,
  caption,
  priority = false,
  hasImage = true,
  fit = "cover",
  aspect = "standard",
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 620px",
  className = "",
}: {
  slug: string;
  name: string;
  alt?: string;
  caption?: string;
  priority?: boolean;
  /** false → the fallback badge says a shot is still pending. */
  hasImage?: boolean;
  fit?: "cover" | "contain";
  aspect?: "standard" | "dashboard";
  sizes?: string;
  className?: string;
}) {
  const captionId = caption ? `project-media-caption-${slug}` : undefined;

  return (
    <figure
      className={`group/media relative overflow-hidden rounded-xl border border-border bg-surface/40 backdrop-blur-md ${className}`}
    >
      <div
        className={`relative w-full overflow-hidden bg-surface-2/70 ${
          aspect === "dashboard" ? "aspect-[2.14/1]" : "aspect-[16/9]"
        }`}
      >
        <SmartImage
          src={`/images/projects/${slug}.jpg`}
          alt={alt ?? `${name} interface and architecture preview`}
          describedBy={captionId}
          label={`${name} · architecture preview`}
          badge={hasImage ? "Preview unavailable" : "Screenshot pending"}
          width={1280}
          height={720}
          sizes={sizes}
          priority={priority}
          imgClassName={`${fit === "contain" ? "!object-contain" : ""} transition-transform duration-300 group-hover:scale-[1.02] group-hover/media:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
        />
      </div>
      {caption ? (
        <figcaption
          id={captionId}
          className="border-t border-border px-4 py-2.5 text-xs leading-snug text-muted-foreground"
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
