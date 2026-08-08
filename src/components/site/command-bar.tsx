import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Bell, FileDown } from "lucide-react";
import { profile, projects } from "@/lib/portfolio-data";
import { navItems } from "./system-sidebar";
import { useResumeViewer } from "./resume-modal";
import { ThemeToggle } from "./theme-toggle";

type Hit = { label: string; hint: string; href: string };

/**
 * Top command bar. The search is real: it filters sections and projects
 * and jumps to them on Enter or click.
 */
export function CommandBar() {
  const resume = useResumeViewer();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const index = useMemo<Hit[]>(
    () => [
      ...navItems.map((n) => ({ label: n.label, hint: "section", href: `/#${n.id}` })),
      ...projects.map((p) => ({ label: p.name, hint: "project", href: `/work/${p.slug}` })),
    ],
    [],
  );

  const hits = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index.filter((h) => h.label.toLowerCase().includes(term)).slice(0, 6);
  }, [q, index]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        boxRef.current?.querySelector("input")?.focus();
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <div ref={boxRef} className="relative min-w-0 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && hits[0]) window.location.href = hits[0].href;
            }}
            placeholder="Search systems…   /"
            aria-label="Search sections and projects"
            className="min-h-11 w-full rounded-full border border-border bg-surface/40 py-2 pl-10 pr-4 font-mono text-xs text-foreground transition-colors duration-300 placeholder:text-muted-foreground focus:border-cyan/60 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          {open && hits.length > 0 ? (
            <ul className="panel absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-xl p-1.5">
              {hits.map((h) => (
                <li key={h.href}>
                  <a
                    href={h.href}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-secondary/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="truncate">{h.label}</span>
                    <span className="term-label shrink-0">{h.hint}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-cyan/30 bg-cyan-soft px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-cyan dark:bg-cyan-soft sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </span>
            System Online
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={resume.open}
            aria-haspopup="dialog"
            aria-label="Resume"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-magenta/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </button>
          <span aria-label="No new notifications" role="status" className="relative grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground">
            <Bell className="h-3.5 w-3.5" />
            <span aria-hidden className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-magenta" />
          </span>
        </div>
      </div>
    </header>
  );
}
