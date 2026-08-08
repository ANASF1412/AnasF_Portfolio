import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, ChevronUp, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { ProjectMedia } from "./project-media";

const FEATURED_COUNT = 3;

export function Projects() {
  const [expanded, setExpanded] = useState(false);
  const additionalProjectsRef = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const featuredProjects = projects.slice(0, FEATURED_COUNT);
  const remainingProjects = projects.slice(FEATURED_COUNT);

  useEffect(() => {
    if (!expanded) return;
    const frame = window.requestAnimationFrame(() => {
      additionalProjectsRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [expanded]);

  return (
    <section id="projects" className="relative border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="PROJECTS"
          title="AI/ML systems and full-stack architectures shipped end to end."
          intro="MLOps pipelines · Computer Vision & NLP · Scalable Web Architectures"
        />

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <article className="neon-frame corner-ticks group relative flex h-full flex-col overflow-hidden rounded-lg p-5">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px opacity-60"
                  style={{ background: "var(--gradient-brand)" }}
                />
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-1 flex-col">
                    <div className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-[0.68rem] text-muted-foreground">
                      <span className={p.accent === "cyan" ? "text-cyan" : "text-primary"}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{p.year}</span>
                      <span className="h-px w-6 bg-border" />
                      <span>{p.role}</span>
                    </div>
                    <h3 className="mt-3 text-balance text-xl font-semibold">{p.name}</h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {p.tagline}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.metrics.map((m) => (
                        <li
                          key={m.label}
                          className="flex w-full flex-col items-start gap-1 rounded-lg border border-cyan/25 bg-surface/40 px-3 py-2"
                        >
                          <span className="font-display text-sm font-semibold leading-none text-foreground">
                            {m.value}
                          </span>
                          <span className="text-xs leading-relaxed text-muted-foreground">
                            {m.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <ProjectMedia
                      slug={p.slug}
                      name={p.name}
                      alt={p.imageAlt}
                      caption={p.imageCaption}
                      hasImage={p.hasImage}
                      fit={p.imageFit}
                      aspect={p.imageAspect}
                      priority={i === 0 && p.hasImage}
                       className="mt-4"
                    />

                  </div>

                  <div className="mt-auto flex shrink-0 flex-wrap gap-2 border-t border-border pt-4">
                    <Link
                      to="/work/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Case study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {remainingProjects.length > 0 ? (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              size="lg"
              aria-expanded={expanded}
              aria-controls="additional-projects"
              onClick={() => setExpanded((value) => !value)}
              className="min-h-12 rounded-full px-6 text-sm shadow-[var(--glow-violet)] sm:text-base"
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp aria-hidden />
                </>
              ) : (
                <>
                  Click to View More Projects ({remainingProjects.length}) <ChevronDown aria-hidden />
                </>
              )}
            </Button>
          </div>
        ) : null}

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              id="additional-projects"
              ref={additionalProjectsRef}
              role="region"
              aria-label="Additional projects"
              initial={calm ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={calm ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: calm ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 items-stretch gap-4 pt-8 md:grid-cols-2 lg:grid-cols-3">
                {remainingProjects.map((p, offset) => {
                  const i = offset + FEATURED_COUNT;
                  return (
                    <motion.article
                      key={p.slug}
                      initial={calm ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: calm ? 0 : 0.35, delay: calm ? 0 : offset * 0.07 }}
                      className="neon-frame corner-ticks group relative flex h-full flex-col overflow-hidden rounded-lg p-5"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px opacity-60"
                        style={{ background: "var(--gradient-brand)" }}
                      />
                      <div className="flex h-full flex-col gap-4">
                        <div className="flex flex-1 flex-col">
                          <div className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-[0.68rem] text-muted-foreground">
                            <span className={p.accent === "cyan" ? "text-cyan" : "text-primary"}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{p.year}</span>
                            <span className="h-px w-6 bg-border" />
                            <span>{p.role}</span>
                          </div>
                          <h3 className="mt-3 text-balance text-xl font-semibold">{p.name}</h3>
                          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                            {p.tagline}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-1.5">
                            {p.metrics.map((metric) => (
                              <li
                                key={metric.label}
                                className="flex w-full flex-col items-start gap-1 rounded-lg border border-cyan/25 bg-surface/40 px-3 py-2"
                              >
                                <span className="font-display text-sm font-semibold leading-none text-foreground">
                                  {metric.value}
                                </span>
                                <span className="text-xs leading-relaxed text-muted-foreground">{metric.label}</span>
                              </li>
                            ))}
                          </ul>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {p.stack.map((item) => (
                              <li
                                key={item}
                                className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                          <ProjectMedia
                            slug={p.slug}
                            name={p.name}
                            alt={p.imageAlt}
                            caption={p.imageCaption}
                            hasImage={p.hasImage}
                            fit={p.imageFit}
                            aspect={p.imageAspect}
                            className="mt-4"
                          />
                        </div>
                        <div className="mt-auto flex shrink-0 flex-wrap gap-2 border-t border-border pt-4">
                          <Link
                            to="/work/$slug"
                            params={{ slug: p.slug }}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            Case study <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                          {p.github ? (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              <Github className="h-3.5 w-3.5" /> Code
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
