import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { internships, type Internship } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { InternshipModal } from "./internship-modal";

export function Internships() {
  const [open, setOpen] = useState<Internship | null>(null);

  return (
    <section id="experience" className="relative border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="EXPERIENCE"
          title="Internships where the model had to reach production."
          intro="Click any role to open the full detail view — workplace photos, project screenshots, the repository, and the deliverables shipped."
        />

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((it, i) => (
            <Reveal key={it.slug} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setOpen(it)}
                aria-haspopup="dialog"
                className="neon-frame corner-ticks group flex h-full w-full flex-col rounded-2xl p-4 text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                  <span className="text-cyan">{it.period}</span>
                  <span className="h-px w-6 bg-border" />
                  <span>{it.org}</span>
                </div>
                <h3 className="mt-3 flex items-start justify-between gap-3 text-xl font-semibold sm:text-2xl">
                  {it.role}
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                </h3>
                <ul className="mt-5 space-y-3">
                  {it.points.slice(0, 2).map((p) => (
                    <li
                      key={p}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-primary"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {it.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex self-start rounded-full border border-cyan/30 bg-cyan-soft px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-cyan dark:bg-cyan-soft">
                  Click for full detail
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open ? <InternshipModal item={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}
