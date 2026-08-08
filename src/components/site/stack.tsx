import { stackGroups } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";
import { TechIcon } from "./tech-icon";

export function Stack() {
  return (
    <section id="stack" className="relative border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="term-label">
            <span className="text-magenta">&gt;</span> SYSTEM.TOOLCHAIN
            <span className="caret text-magenta">_</span>
          </p>
          <h2 className="mt-4 max-w-xl text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight">
            Tools I've actually shipped with.
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {stackGroups.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.05}>
              <div className="neon-frame h-full rounded-lg p-5">
                <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan">
                  <span aria-hidden>{g.emoji}</span>
                  {g.label}
                </h3>

                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {g.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex min-w-0 items-center gap-2.5 rounded-lg border border-border bg-surface/40 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cyan/25 bg-surface text-cyan transition-colors duration-300 group-hover:border-cyan/60">
                        <TechIcon name={item.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 truncate text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
