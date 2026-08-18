import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Home, User, FolderGit2, Code2, Trophy, Mail, BadgeCheck, FileDown } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { useResumeViewer } from "./resume-modal";

export const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "stack", label: "Skills", icon: Code2 },
  { id: "certifications", label: "Certs", icon: BadgeCheck },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "contact", label: "Contact", icon: Mail },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.01, 0.25, 0.6] },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

export function SystemSidebar() {
  const active = useActiveSection();
  const resume = useResumeViewer();

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[76px] flex-col border-r border-border bg-background/80 backdrop-blur-xl md:flex lg:w-[210px]">
        <Link
          to="/"
          aria-label="AF — Anas F, home"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan mx-auto mt-6 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan/50 font-mono text-sm font-semibold tracking-tight text-cyan transition-shadow duration-500 hover:shadow-[0_0_28px_-4px_var(--cyan)]"
        >
          AF
        </Link>

        <nav className="mt-10 flex flex-col gap-1.5 px-3">
          {navItems.map((item) => {
            const on = active === item.id;
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                aria-current={on ? "true" : undefined}
                className={`group relative flex min-h-11 items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  on
                    ? "bg-secondary/70 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-1.5 left-0 w-[2px] rounded-full bg-magenta transition-transform duration-300 ${
                    on ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
                  }`}
                />
                <item.icon
                  className={`h-4 w-4 shrink-0 transition-colors duration-300 ${on ? "text-cyan" : ""}`}
                />
                <span className="hidden truncate text-sm lg:block">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={resume.open}
          aria-haspopup="dialog"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan mx-3 mb-6 mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan/40 bg-surface/50 px-3 py-2.5 text-xs font-semibold text-cyan transition-colors duration-300 hover:text-foreground"
        >
          <FileDown className="h-4 w-4 shrink-0" />
          <span className="hidden lg:inline">View Resume</span>
        </button>
      </aside>

      {/* Mobile dock */}
      <nav className="panel fixed inset-x-3 bottom-3 z-50 flex items-center justify-between rounded-2xl px-2 py-2 md:hidden">
        {navItems.map((item) => {
          const on = active === item.id;
          return (
            <a
              key={item.id}
              href={`/#${item.id}`}
              aria-label={item.label}
              className={`grid h-11 w-11 place-items-center rounded-xl transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                on ? "bg-secondary text-cyan" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
            </a>
          );
        })}
      </nav>
    </>
  );
}
