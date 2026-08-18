import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Cloud, Github } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { SiteShell } from "@/components/site/site-shell";
import { Reveal } from "@/components/site/reveal";
import { ProjectMedia } from "@/components/site/project-media";
import { ImageWithFallback } from "@/components/site/image-with-fallback";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }): Project => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }: { loaderData?: Project }) => {
    const title = loaderData ? `${loaderData.name} — Case study | Anas F` : "Case study | Anas F";
    const description = loaderData?.tldr ?? "Engineering case study by Anas F.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const p: Project = Route.useLoaderData();

  return (
    <SiteShell>
      <div className="px-6 pb-28 pt-16">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/"
            hash="work"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All work
          </Link>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
              <span>{p.year}</span>
              <span className="h-px w-6 bg-border" />
              <span>{p.role}</span>
            </div>
            <h1 className="mt-4 text-[clamp(2.2rem,5.5vw,3.4rem)] font-semibold leading-[1.05]">
              {p.name}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{p.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {p.live ? (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                  style={{ boxShadow: "var(--glow-violet)" }}
                >
                  Live site <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}

              {p.github && !p.live && p.cloudInfrastructure ? (
                <Button asChild size="lg" className="min-h-11 rounded-full px-5">
                  <a href={p.github} target="_blank" rel="noreferrer noopener">
                    <Github aria-hidden /> View Source Code (GitHub)
                  </a>
                </Button>
              ) : p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" /> Source
                </a>
              ) : null}

              {!p.live && p.cloudInfrastructure ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg" className="min-h-11 rounded-full px-5">
                      <Cloud aria-hidden /> AWS Deployment Specs
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl rounded-lg border-border bg-background">
                    <DialogHeader>
                      <DialogTitle>FloodGuard AI — AWS Deployment Specs</DialogTitle>
                      <DialogDescription className="pt-2 text-pretty leading-relaxed">
                        {p.cloudInfrastructure}
                      </DialogDescription>
                    </DialogHeader>
                    <dl className="grid gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="font-mono text-xs uppercase text-muted-foreground">
                          Compute
                        </dt>
                        <dd className="mt-1 text-foreground">AWS EC2 · t2.micro</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs uppercase text-muted-foreground">
                          Orchestration
                        </dt>
                        <dd className="mt-1 text-foreground">Docker Compose · systemd</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs uppercase text-muted-foreground">Edge</dt>
                        <dd className="mt-1 text-foreground">Nginx reverse proxy</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs uppercase text-muted-foreground">
                          Services
                        </dt>
                        <dd className="mt-1 text-foreground">FastAPI · React</dd>
                      </div>
                    </dl>
                  </DialogContent>
                </Dialog>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ProjectMedia
              slug={p.slug}
              name={p.name}
              alt={p.imageAlt}
              caption={p.imageCaption}
              hasImage={p.hasImage}
              fit={p.imageFit}
              aspect={p.imageAspect}
              priority={p.hasImage}
              sizes="(max-width: 1024px) 100vw, 960px"
              className="group mt-12"
            />
          </Reveal>

          <Reveal delay={0.05}>
            <section className="panel mt-14 rounded-2xl p-5 sm:p-8">
              <h2 className="term-label">TL;DR</h2>
              <p className="mt-4 text-base leading-relaxed text-foreground">{p.tldr}</p>
              {p.cloudInfrastructure ? (
                <aside className="mt-6 rounded-lg border border-cyan/30 bg-surface/50 p-4">
                  <h3 className="font-mono text-xs uppercase text-cyan">
                    Cloud Infrastructure &amp; Deployment
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.cloudInfrastructure}
                  </p>
                </aside>
              ) : null}
              <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="font-display text-2xl font-semibold">{m.value}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{m.label}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="mt-16">
              <h2 className="term-label">Problem</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.problem}</p>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="mt-14">
              <h2 className="term-label">Approach</h2>
              <ol className="mt-6 space-y-5 border-l border-border pl-6">
                {p.approach.map((step, i) => (
                  <li key={step} className="relative">
                    <span className="absolute -left-[1.9rem] font-mono text-xs text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-relaxed text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {p.keyDecision ? (
            <Reveal delay={0.05}>
              <section className="mt-14">
                <h2 className="term-label">Key architectural decision</h2>
                <div className="panel mt-6 rounded-2xl border-l-2 border-l-cyan p-6">
                  <p className="text-base leading-relaxed text-foreground">{p.keyDecision}</p>
                </div>
              </section>
            </Reveal>
          ) : null}

          {p.architectureImage ? (
            <Reveal delay={0.05}>
              <section className="mt-14" aria-labelledby="system-architecture-title">
                <h2 id="system-architecture-title" className="term-label">
                  System Architecture &amp; Data Pipeline
                </h2>
                <figure className="mt-6 overflow-hidden rounded-lg border border-border bg-surface/40 p-2 sm:p-3">
                  <ImageWithFallback
                    src={p.architectureImage}
                    alt="FloodGuard AI end-to-end system architecture showing users, dashboard, FastAPI services, prediction layer, MongoDB persistence, monitoring, operational response, and MLOps delivery flow."
                    width={1536}
                    height={1024}
                    className="w-full rounded-lg border border-border object-cover"
                  />
                  <figcaption className="px-2 pb-1 pt-3 text-sm leading-relaxed text-muted-foreground">
                    End-to-end telemetry ingestion, inference pipeline, experiment tracking, and
                    drift monitoring flow.
                  </figcaption>
                </figure>
              </section>
            </Reveal>
          ) : null}

          <Reveal delay={0.05}>
            <section className="mt-14">
              <h2 className="term-label">Impact</h2>
              <ul className="mt-6 space-y-3">
                {p.impact.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="mt-14">
              <h2 className="term-label">What shipped</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {p.artifacts.map((a) => (
                  <div key={a.title} className="neon-frame rounded-xl p-5">
                    <h3 className="text-sm font-medium text-foreground">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="mt-14">
              <h2 className="term-label">Stack</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-20 border-t border-border pt-8">
              <Link
                to="/"
                hash="contact"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan link-underline font-mono text-sm text-cyan"
              >
                Get in touch about work like this →
              </Link>
            </div>
          </Reveal>
        </article>
      </div>
    </SiteShell>
  );
}
