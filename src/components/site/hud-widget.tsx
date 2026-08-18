import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

const R = 30;
const C = 2 * Math.PI * R;

/** Floating radial HUD: scroll progress ring + back-to-top. */
export function HudWidget() {
  const calm = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(
    scrollYProgress,
    calm
      ? { stiffness: 1000, damping: 100, mass: 0.1 }
      : { stiffness: 120, damping: 26, mass: 0.4 },
  );

  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-40 md:bottom-8 md:right-8">
      <div className="relative grid h-[76px] w-[76px] place-items-center">
        <svg viewBox="0 0 76 76" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="38" cy="38" r={R} fill="none" stroke="var(--border)" strokeWidth="2" />
          <motion.circle
            cx="38"
            cy="38"
            r={R}
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={C}
            style={{ pathLength: p }}
          />
        </svg>
        <div
          aria-hidden
          className={`absolute inset-0 rounded-full border border-dashed border-magenta/40 ${calm ? "" : "hud-spin"}`}
        />
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" })}
          aria-label="Back to top"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/70 text-muted-foreground backdrop-blur-xl transition-colors duration-300 hover:border-cyan/60 hover:text-cyan"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
