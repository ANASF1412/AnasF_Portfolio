import { ArrowUpRight, FileDown } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";
import { ContactForm } from "./contact-form";
import { useResumeViewer } from "./resume-modal";

export function Contact() {
  const resume = useResumeViewer();

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border py-12 sm:py-16"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{ background: "var(--gradient-veil)", transform: "rotate(180deg)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <Reveal>
            <p className="term-label">
              <span className="text-magenta">&gt;</span> SYSTEM.COMMUNICATION
              <span className="caret text-magenta">_</span>
            </p>
            <h2 className="mt-4 text-balance text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.05]">
              Hiring for a full-stack or AI internship?{" "}
              <span className="text-gradient">Let's talk.</span>
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base text-muted-foreground">
              One message is enough — I reply within a day, with links to whichever of these systems
              is closest to what your team is building.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground"
              >
                {profile.email}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground"
              >
                {profile.phone}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground"
              >
                LinkedIn
              </a>
              <button
                type="button"
                onClick={resume.open}
                aria-haspopup="dialog"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-surface/40 px-5 py-3 text-sm font-semibold text-cyan transition-colors duration-300 hover:text-foreground"
              >
                <FileDown className="h-4 w-4" />
                View Resume
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{profile.education}</span>
        </div>
      </div>
    </section>
  );
}
