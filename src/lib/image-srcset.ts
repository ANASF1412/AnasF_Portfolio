import { imageVariants } from "./image-variants.generated";

/**
 * Builds a WebP `srcset` for a public image path, using the variants emitted by
 * `scripts/gen-image-variants.py`. Returns `null` when no variants exist so the
 * caller can fall back to the original file untouched.
 */
export function webpSrcSet(src: string): string | null {
  const widths = imageVariants[src];
  if (!widths?.length) return null;
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  return widths.map((w) => `${base}-w${w}.webp ${w}w`).join(", ");
}
