import { useEffect, useRef } from "react";

/**
 * Soft cursor light that follows the pointer. Desktop + pointer-fine only.
 * Perf: the rAF loop only runs while the light is actually catching up to the
 * pointer, and it fully stops when the tab is hidden or motion is reduced.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fineQuery = window.matchMedia("(pointer: fine)");
    const calmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let running = false;
    let enabled = false;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    const draw = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 260}px, ${cy - 260}px, 0)`;
      }
    };

    const loop = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      draw();
      // Settled: park the loop until the pointer moves again.
      if (Math.abs(x - cx) < 0.5 && Math.abs(y - cy) < 0.5) {
        cx = x;
        cy = y;
        draw();
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || document.hidden || !enabled) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      start();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      } else {
        start();
      }
    };

    const sync = () => {
      const next = fineQuery.matches && !calmQuery.matches;
      if (next === enabled) return;
      enabled = next;
      if (enabled) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
      } else {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVisibility);
        cancelAnimationFrame(raf);
        running = false;
      }
      if (ref.current) ref.current.style.opacity = enabled ? "" : "0";
    };

    sync();
    fineQuery.addEventListener("change", sync);
    calmQuery.addEventListener("change", sync);

    return () => {
      fineQuery.removeEventListener("change", sync);
      calmQuery.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="motion-reduce:hidden pointer-events-none fixed left-0 top-0 z-0 hidden h-[520px] w-[520px] rounded-full opacity-60 blur-3xl will-change-transform [contain:strict] md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--violet) 26%, transparent), transparent 65%)",
      }}
    />
  );
}
