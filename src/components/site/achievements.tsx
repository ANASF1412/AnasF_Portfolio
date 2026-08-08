import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { Trophy, ArrowUpRight, Radio } from "lucide-react";
import { timeline, codingProfiles } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.16,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 210, damping: 17 },
  },
};

const railVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
  },
};

const AwardsTimeline = memo(function AwardsTimeline() {
  const calm = useReducedMotion();

  return (
    <div className="relative mt-10 overflow-hidden rounded-xl border border-border bg-surface/30 shadow-[0_24px_70px_-38px_var(--cyan)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 border-b border-border bg-surface/40 px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan">
          <Radio aria-hidden className="h-3.5 w-3.5" />
          Milestone stream
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
          {timeline.length.toString().padStart(2, "0")} records · synced
        </span>
      </div>

      <motion.ol
        className="relative space-y-3 p-4 sm:p-5"
        initial={calm ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: "0px 0px -12% 0px" }}
        variants={listVariants}
      >
        <div
          aria-hidden
          className="absolute bottom-7 left-[1.71rem] top-7 w-px bg-border sm:left-[2.21rem]"
        >
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-cyan via-primary to-magenta shadow-[0_0_14px_var(--cyan)]"
            variants={calm ? undefined : railVariants}
          />
        </div>

        {timeline.map((item) => (
          <motion.li
            key={item.id}
            className="group relative pl-8 sm:pl-10"
            variants={calm ? undefined : cardVariants}
          >
            <motion.span
              aria-hidden
              className="absolute left-[-0.04rem] top-5 z-10 grid h-3.5 w-3.5 place-items-center rounded-full border border-cyan bg-background shadow-[0_0_0_5px_color-mix(in_oklab,var(--cyan)_12%,transparent),0_0_18px_color-mix(in_oklab,var(--cyan)_55%,transparent)] sm:left-[-0.04rem]"
              variants={calm ? undefined : nodeVariants}
            >
              <span className="h-1 w-1 rounded-full bg-cyan" />
            </motion.span>

            <div className="rounded-lg border border-border bg-card/55 px-4 py-3.5 backdrop-blur-sm transition-[border-color,background-color,transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan/40 group-hover:bg-surface/55 group-hover:shadow-[0_14px_35px_-24px_var(--cyan)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan">
                  {item.year}
                </span>
              </div>
              <h3 className="mt-2 flex items-start gap-2 text-sm font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-cyan sm:text-base">
                <Trophy aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <div className="flex items-center justify-between border-t border-border bg-surface/25 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted-foreground sm:px-5">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan" /> awards indexed</span>
        <span>SYS.OK</span>
      </div>
    </div>
  );
});

export function Achievements() {
  return (
    <section id="achievements" className="relative border-t border-border py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="term-label"><span className="text-magenta">&gt;</span> SYSTEM.AWARDS<span className="caret text-magenta">_</span></p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight">
            Wins that came with a working build attached.
          </h2>

          <AwardsTimeline />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="term-label"><span className="text-magenta">&gt;</span> CODING PROFILES & PROBLEM SOLVING<span className="caret text-magenta">_</span></p>
          <div className="mt-6 space-y-3">
            {codingProfiles.map((c) => (
              <a
                key={c.platform}
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan neon-frame group block rounded-2xl px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <p className="flex items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-cyan">
                  {c.platform}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {c.detail}
                </p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
