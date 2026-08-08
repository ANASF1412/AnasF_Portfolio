import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/lib/portfolio-data";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";
import { SmartImage } from "./smart-image";

/**
 * Achievement media gallery with a fully keyboard-navigable lightbox.
 *
 * Keyboard contract:
 * - grid tiles are real <button>s → Tab / Shift+Tab / Enter / Space work natively
 * - Escape closes, ArrowLeft / ArrowRight step between items, Home / End jump
 * - focus moves into the dialog on open and returns to the triggering tile on close
 */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    const last = open;
    setOpen(null);
    if (last !== null) triggersRef.current[last]?.focus();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setOpen((i) => ((i ?? 0) + 1) % gallery.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setOpen((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        setOpen(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setOpen(gallery.length - 1);
      } else if (e.key === "Tab") {
        // Simple focus trap: only the dialog's controls are tabbable.
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const active = open === null ? null : gallery[open];

  return (
    <section id="gallery" className="relative border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="MEDIA"
          title="Achievement Media Gallery"
          intro="Photographic proof and event highlights from hackathons, paper presentations, and competition floors."
        />

        <ul
          className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Achievement photos — press Enter to enlarge, then use arrow keys"
        >
          {gallery.map((g, i) => (
            <li key={g.id}>
              <Reveal delay={0.05 * i}>
                <figure className="m-0">
                  <button
                    type="button"
                    ref={(el) => {
                      triggersRef.current[i] = el;
                    }}
                    onClick={() => setOpen(i)}
                    aria-haspopup="dialog"
                    aria-label={`Enlarge photo: ${g.caption}`}
                    className="neon-frame corner-ticks group block h-full w-full overflow-hidden rounded-lg text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden ${
                        g.fit === "contain" ? "bg-surface p-2" : "scanlines"
                      }`}
                    >
                      <SmartImage
                        src={g.src}
                        alt={g.alt}
                        describedBy={`gallery-caption-${g.id}`}
                        label={g.caption.split(" — ")[0]}
                        width={800}
                        height={600}
                        imgClassName={
                          g.fit === "contain" ? "!object-contain" : ""
                        }
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={i === 0}
                      />
                    </div>
                    <figcaption
                      id={`gallery-caption-${g.id}`}
                      className="px-4 py-3 text-xs leading-snug text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                    >
                      {g.caption}
                    </figcaption>
                  </button>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {active ? (
        <div
          onClick={close}
          className="fixed inset-0 z-[70] grid place-items-center bg-background/90 p-6 backdrop-blur-xl"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            onClick={(e) => e.stopPropagation()}
            className="neon-frame w-full max-w-3xl overflow-hidden rounded-2xl"
          >
            <figure className="m-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                <SmartImage
                  src={active.src}
                  alt={active.alt}
                  describedBy="gallery-lightbox-caption"
                  label={active.caption.split(" — ")[0]}
                  width={1200}
                  height={900}
                  imgClassName={active.fit === "contain" ? "!object-contain" : ""}
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <figcaption
                  id="gallery-lightbox-caption"
                  className="text-sm text-muted-foreground"
                >
                  {active.caption}
                </figcaption>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOpen((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length)
                    }
                    aria-label="Previous photo"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-cyan/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen((i) => ((i ?? 0) + 1) % gallery.length)}
                    aria-label="Next photo"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-cyan/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    ref={closeRef}
                    onClick={close}
                    aria-label="Close photo viewer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-magenta/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </figure>
          </div>
        </div>
      ) : null}
    </section>
  );
}
