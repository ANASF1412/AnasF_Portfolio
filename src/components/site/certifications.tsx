import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BadgeCheck, ChevronDown, ChevronUp, ExternalLink, X } from "lucide-react";
import { certifications, type Certification } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { SmartImage } from "./smart-image";

export function Certifications() {
  const [open, setOpen] = useState<Certification | null>(null);
  const [expanded, setExpanded] = useState(false);
  const additionalRef = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const featured = certifications.slice(0, 4);
  const remaining = certifications.slice(4);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const frame = window.requestAnimationFrame(() => {
      additionalRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [expanded]);

  const renderCredential = (c: Certification, i: number) => (
    <Reveal key={c.id} delay={i * 0.04}>
      <button
        type="button"
        onClick={() => setOpen(c)}
        aria-haspopup="dialog"
        className="neon-frame group flex h-full w-full items-start gap-3 rounded-lg p-4 text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <BadgeCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
        <div className="min-w-0">
          <h3 className="text-sm font-medium leading-snug text-foreground">{c.name}</h3>
          <p className="mt-1.5 font-mono text-xs text-muted-foreground">
            {c.issuer}
            {c.year ? ` · ${c.year}` : ""}
          </p>
          <span className="mt-3 inline-flex rounded-full border border-cyan/30 bg-cyan-soft px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-cyan dark:bg-cyan-soft">
            {c.credentialUrl ? "Click to preview · verifiable" : "Click to preview"}
          </span>
        </div>
      </button>
    </Reveal>
  );

  return (
    <section id="certifications" className="relative border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader label="CREDENTIALS" title="Credentials behind the stack." />

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(renderCredential)}
        </div>

        {remaining.length > 0 ? (
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              size="lg"
              aria-expanded={expanded}
              aria-controls="additional-credentials"
              onClick={() => setExpanded((value) => !value)}
              className="min-h-11 rounded-full px-5"
            >
              {expanded ? (
                <>
                  Show Fewer Credentials <ChevronUp aria-hidden />
                </>
              ) : (
                <>
                  Expand All Credentials ({remaining.length}) <ChevronDown aria-hidden />
                </>
              )}
            </Button>
          </div>
        ) : null}

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              id="additional-credentials"
              ref={additionalRef}
              role="region"
              aria-label="Additional credentials"
              initial={calm ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={calm ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: calm ? 0 : 0.35 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 items-stretch gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
                {remaining.map((credential, index) => renderCredential(credential, index))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[70] grid place-items-center bg-background/90 p-4 backdrop-blur-xl sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="neon-frame w-full max-w-3xl overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <SmartImage
                src={open.image}
                alt={`${open.name} certificate issued by ${open.issuer}`}
                label={`${open.name} · ${open.issuer}`}
                badge="Certificate image pending"
                width={1200}
                height={900}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
                imgClassName="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{open.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {open.issuer}
                  {open.year ? ` · ${open.year}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {open.credentialUrl ? (
                  <a
                    href={open.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-cyan/40 px-4 font-mono text-xs text-cyan transition-colors duration-300 hover:border-cyan hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Verify <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close certificate preview"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-magenta/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
