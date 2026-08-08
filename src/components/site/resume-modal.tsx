import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Download, ExternalLink, FileDown, X } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

type ResumeCtx = { open: () => void };

const Ctx = createContext<ResumeCtx>({ open: () => {} });

export function useResumeViewer() {
  return useContext(Ctx);
}

/** True when the browser can render a PDF inline (desktop Chrome/Safari/Firefox). */
function canEmbedPdf() {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { pdfViewerEnabled?: boolean };
  if (typeof nav.pdfViewerEnabled === "boolean") return nav.pdfViewerEnabled;
  // Older engines: mobile browsers generally cannot embed PDFs.
  return !/Android|iPhone|iPad|iPod/i.test(nav.userAgent);
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [embeddable, setEmbeddable] = useState(true);

  const openViewer = useCallback(() => {
    setEmbeddable(canEmbedPdf());
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const value = useMemo(() => ({ open: openViewer }), [openViewer]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${profile.name} — résumé preview`}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] grid place-items-center bg-background/92 p-3 backdrop-blur-xl sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="neon-frame flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-cyan">
                  RESUME.PDF
                </p>
                <p className="truncate text-sm text-foreground">{profile.name} — résumé</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-cyan/40 bg-surface/50 px-4 text-xs font-semibold text-cyan transition-colors duration-300 hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close résumé preview"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-magenta/60 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-surface/40">
              {embeddable ? (
                <object
                  data={`${profile.resume}#view=FitH`}
                  type="application/pdf"
                  aria-label="Résumé PDF"
                  className="h-full w-full"
                >
                  <PdfFallback />
                </object>
              ) : (
                <PdfFallback />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Ctx.Provider>
  );
}

function PdfFallback() {
  return (
    <div className="grid h-full place-items-center px-6 py-10 text-center">
      <div className="max-w-sm">
        <FileDown className="mx-auto h-8 w-8 text-cyan" />
        <p className="mt-4 text-sm text-foreground">
          Your browser can't preview PDFs inline.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Open the résumé in a new tab — it downloads instantly and reads fine on mobile.
        </p>
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          style={{ boxShadow: "var(--glow-violet)" }}
        >
          Open résumé
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
