import { about, profile } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { useResumeViewer } from "./resume-modal";

export function About() {
  const resume = useResumeViewer();
  return (
    <section id="about" className="relative border-t border-border py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="term-label">
            <span className="text-magenta">&gt;</span> SYSTEM.OPERATOR
            <span className="caret text-magenta">_</span>
          </p>
          <h2 className="mt-4 text-balance text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight">
            Concepts over checklists — systems that survive production.
          </h2>
          <div className="neon-frame corner-ticks mt-6 rounded-lg p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan">Education</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {profile.education}
            </p>
          </div>
          <button
            type="button"
            onClick={resume.open}
            aria-haspopup="dialog"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan link-underline mt-6 inline-block font-mono text-sm text-cyan"
          >
            View résumé (PDF)
          </button>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {about.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
