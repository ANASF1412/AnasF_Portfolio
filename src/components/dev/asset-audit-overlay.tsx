import { useState } from "react";
import { assetIssues } from "virtual:asset-audit";
import { AlertTriangle, X } from "lucide-react";

/**
 * Dev-only HUD that surfaces portfolio data → asset mapping problems
 * (missing screenshots, stale `hasImage` flags, orphaned uploads) before the
 * page is reviewed. Never rendered in production builds.
 */
export function AssetAuditOverlay() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!import.meta.env.DEV || dismissed || assetIssues.length === 0) return null;

  const errors = assetIssues.filter((i) => i.level === "error");
  const warnings = assetIssues.filter((i) => i.level === "warning");

  return (
    <div className="fixed bottom-4 right-4 z-[200] max-w-sm font-mono text-xs">
      <div className="rounded-xl border border-white/15 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 px-3 py-2">
          <AlertTriangle
            className={`h-4 w-4 ${errors.length ? "text-red-400" : "text-amber-300"}`}
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex-1 text-left uppercase tracking-[0.14em] text-foreground/80"
            aria-expanded={expanded}
          >
            Asset audit · {errors.length} err · {warnings.length} warn
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss asset audit"
            className="rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>

        {expanded ? (
          <ul className="max-h-72 list-none space-y-2 overflow-y-auto border-t border-white/10 p-3">
            {[...errors, ...warnings].map((issue, i) => (
              <li key={`${issue.card}-${i}`} className="leading-snug">
                <span className={issue.level === "error" ? "text-red-400" : "text-amber-300"}>
                  {issue.level === "error" ? "✖" : "▲"}
                </span>{" "}
                <span className="text-foreground/90">
                  [{issue.group}] {issue.card}
                </span>
                <p className="text-muted-foreground">{issue.message}</p>
                {issue.path ? <p className="text-cyan-300/70">{issue.path}</p> : null}
                <p className="text-muted-foreground/70">→ {issue.fix}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
