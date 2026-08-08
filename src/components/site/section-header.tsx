import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/** Terminal-style section header: `> SYSTEM. LABEL` with a scan rule. */
export function SectionHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <Reveal className="mb-12">
      <p className="term-label flex items-center gap-2">
        <span className="text-magenta">&gt;</span> SYSTEM.{label.toUpperCase()}
        <span className="caret text-magenta">_</span>
      </p>
      <div
        aria-hidden
        className="mt-3 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--cyan) 60%, transparent), transparent)",
        }}
      />
      <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.9rem,4vw,2.7rem)] font-semibold leading-tight">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
