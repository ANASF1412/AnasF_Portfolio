import { motion, useReducedMotion } from "motion/react";
import { systemStats } from "@/lib/portfolio-data";

type Tone = (typeof systemStats)[number]["tone"];

const tone: Record<Tone, string> = {
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  magenta: "var(--magenta)",
};

/** Animated capability bars — the hero's "system stats" readout. */
export function StatBars() {
  const calm = useReducedMotion();

  return (
    <div className="corner-ticks neon-frame rounded-2xl p-5 sm:p-6">
      <p className="term-label">SYSTEM.STATS</p>
      <dl className="mt-5 space-y-4">
        {systemStats.map((s, i) => (
          <div key={s.label} className="grid grid-cols-[1fr_auto] items-baseline">
            <dt className="col-start-1 row-start-1 z-10 truncate font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </dt>
            <dd className="col-span-2 row-start-1 grid grid-cols-[1fr_auto] items-baseline gap-x-3 font-display text-lg font-semibold text-foreground">
              <span className="col-start-2">{s.value}</span>
              <div
                className="col-span-2 mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-label={s.label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={s.pct}
              >
                {/* scaleX instead of width: composited, no layout per frame. */}
                <motion.span
                  className="block h-full w-full origin-left rounded-full will-change-transform"
                  data-testid="system-stat-bar"
                  style={{ background: tone[s.tone] }}
                  initial={calm ? { scaleX: s.pct / 100 } : { scaleX: 0 }}
                  animate={{ scaleX: s.pct / 100 }}
                  transition={
                    calm
                      ? { duration: 0 }
                      : { duration: 1.1, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
