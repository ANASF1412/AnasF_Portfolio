import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { profile, stats } from "@/lib/portfolio-data";
import { StatBars } from "./stat-bars";
import { SmartImage } from "./smart-image";
import { useResumeViewer } from "./resume-modal";

const badgeClass =
  "inline-flex max-w-full items-center rounded-full border border-cyan/30 bg-cyan-soft px-4 py-1.5 text-base font-semibold text-cyan dark:bg-cyan-soft sm:text-lg";

function RoleSwitcher() {
  const calm = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (calm) return;
    let t = 0;
    const tick = () => setI((v) => (v + 1) % profile.roles.length);
    const start = () => {
      stop();
      t = window.setInterval(tick, 2600);
    };
    const stop = () => {
      if (t) window.clearInterval(t);
      t = 0;
    };
    // Don't burn frames or re-render in a background tab.
    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [calm]);

  if (calm) {
    return (
      <span className={`${badgeClass} flex-wrap`} aria-live="off">
        {profile.roles.join(" · ")}
      </span>
    );
  }

  return (
    <span className={badgeClass}>
      <span className="relative inline-flex h-[1.35em] overflow-hidden align-bottom">
        <motion.span
          key={i}
          initial={i === 0 ? false : { y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap leading-[1.35em] will-change-transform"
        >
          {profile.roles[i]}
        </motion.span>
      </span>
    </span>
  );
}

/** Portrait slot: drop /public/images/profile/anas-hero.jpg to replace the monogram. */
function Avatar() {
  const calm = useReducedMotion();

  return (
    <div className="relative mx-auto h-[240px] w-[240px] shrink-0 sm:h-[280px] sm:w-[280px]">
      <div
        aria-hidden
        className={`absolute inset-0 rounded-full border border-dashed border-cyan/35 ${calm ? "" : "hud-spin"}`}
      />
      <div
        aria-hidden
        className="absolute inset-3 rounded-full"
        style={{ boxShadow: "0 0 90px -18px var(--magenta)" }}
      />
      <div className="scanlines absolute inset-4 overflow-hidden rounded-full border border-cyan/40 bg-surface/50 backdrop-blur-xl">
        <SmartImage
          src={profile.heroImage}
          alt={`${profile.name} — portrait`}
          label="AF"
          badge="Photo pending"
          width={560}
          height={560}
          sizes="(max-width: 640px) 240px, 280px"
          priority
          className="rounded-full border-0"
        />
      </div>
    </div>
  );
}

export function Hero() {
  const calm = useReducedMotion();
  const resume = useResumeViewer();

  return (
    <section id="home" className="relative overflow-hidden pb-12 pt-16 sm:pb-16">
      <div aria-hidden className="grid-veil absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: "var(--gradient-veil)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-start gap-6 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="min-w-0">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {profile.location}
          </p>

          <p className="term-label mt-6">&gt; INITIALIZING PROFILE …</p>
          <h1 className="mt-3 text-balance text-[clamp(1.6rem,3.8vw,2.75rem)] font-semibold leading-[1.14] [hyphens:auto]">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.sub}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm text-muted-foreground">
            <RoleSwitcher />
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="min-w-0">{profile.education}</span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <motion.a
              href="#projects"
              whileHover={calm ? undefined : { scale: 1.03 }}
              whileTap={calm ? undefined : { scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow duration-500"
              style={{ boxShadow: "var(--glow-violet)" }}
            >
              See the work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
            <motion.button
              type="button"
              onClick={resume.open}
              whileHover={calm ? undefined : { scale: 1.03 }}
              whileTap={calm ? undefined : { scale: 0.97 }}
              aria-haspopup="dialog"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan/30 bg-cyan-soft px-6 py-3 text-sm font-semibold text-cyan transition-colors duration-300 hover:text-foreground dark:bg-cyan-soft"
            >
              <FileDown className="h-4 w-4" />
              View Resume
            </motion.button>
            {[
              { href: profile.github, icon: Github, label: "GitHub" },
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            ].map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={l.label}
                whileHover={calm ? undefined : { scale: 1.03, y: -2 }}
                whileTap={calm ? undefined : { scale: 0.97 }}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan"
              >
                <l.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Avatar />
          <StatBars />
        </div>
      </div>

      <dl className="relative mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 border-t border-border px-4 pt-6 sm:grid-cols-4 sm:px-6">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="font-display text-3xl font-semibold text-foreground">{s.value}</dt>
            <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
          </div>
        ))}
      </dl>

      <motion.div
        aria-hidden
        animate={calm ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto mt-10 hidden w-fit text-muted-foreground md:block"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}
