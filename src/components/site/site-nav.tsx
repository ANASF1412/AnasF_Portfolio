import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { profile } from "@/lib/portfolio-data";
import { ThemeToggle } from "./theme-toggle";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "achievements", label: "Awards" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];


export function SiteNav() {
  const [active, setActive] = useState("projects");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.3, 0.6] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 md:flex md:justify-between ${
          scrolled ? "panel" : "border border-transparent"
        }`}
      >
        <Link
          to="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan min-w-0 truncate font-mono text-sm uppercase tracking-tight text-foreground"
          aria-label="ANAS F — home"
        >
          ANAS<span className="text-cyan"> F</span>
        </Link>


        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`inline-flex min-h-11 items-center rounded-full px-3.5 py-2.5 text-sm transition-colors duration-300 ${
                active === s.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan inline-flex min-h-11 items-center rounded-full border border-border px-3.5 py-2.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground"
          >
            Resume
          </a>
        </div>

      </nav>
    </header>
  );
}
