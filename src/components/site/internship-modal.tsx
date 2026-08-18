import { useEffect } from "react";
import { Github, X, ArrowUpRight } from "lucide-react";
import type { Internship } from "@/lib/portfolio-data";
import { SmartImage } from "./smart-image";

/** Rich detail overlay for a single internship. */
export function InternshipModal({ item, onClose }: { item: Internship; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.role} at ${item.org}`}
      onClick={onClose}
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-background/90 p-4 backdrop-blur-xl sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="neon-frame my-6 w-full max-w-3xl overflow-hidden rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-4 sm:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="text-cyan">{item.period}</span>
              <span className="h-px w-6 bg-border" />
              <span>{item.org}</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{item.role}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close internship details"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-magenta/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
          <figure className="overflow-hidden rounded-xl border border-border">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <SmartImage
                src={item.photo}
                alt={`${item.org} workplace`}
                label={`${item.org} — workplace`}
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, 380px"
              />
            </div>
            <figcaption className="border-t border-border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
              Workplace
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-border">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <SmartImage
                src={item.projectShot}
                alt={`${item.role} project screenshot`}
                label={`${item.role} — project`}
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, 380px"
              />
            </div>
            <figcaption className="border-t border-border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
              Project result
            </figcaption>
          </figure>
        </div>

        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <p className="term-label">Key engineering contributions & deliverables</p>
          <ul className="mt-4 space-y-3">
            {item.points.map((p) => (
              <li key={p} className="relative pl-5 text-sm leading-relaxed text-muted-foreground">
                <span
                  aria-hidden
                  className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-primary"
                />
                {p}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {item.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>

          <a
            href={item.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-surface/50 px-5 py-2.5 text-sm font-medium text-cyan transition-colors duration-300 hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="h-4 w-4" />
            View project repository
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
