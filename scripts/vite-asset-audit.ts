import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

/**
 * Vite plugin: portfolio data → asset mapping validator.
 *
 * - Runs the audit when the dev server boots and whenever `public/` or
 *   `portfolio-data.ts` changes, printing a report in the terminal.
 * - Exposes the result to the browser as `virtual:asset-audit` so the dev-only
 *   overlay can flag broken cards before anyone scrolls past them.
 * - Fails the production build when any *error*-level issue is present, so a
 *   card with a missing or mismatched image can never ship.
 */
import type { AssetIssue as AuditIssue } from "../src/lib/asset-audit";

const VIRTUAL_ID = "virtual:asset-audit";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  bold: "\x1b[1m",
};

function runAudit(root: string) {
  const res = spawnSync("bun", ["scripts/audit-portfolio-assets.ts", "--json"], {
    cwd: root,
    encoding: "utf8",
  });
  if (res.status !== 0 || !res.stdout) {
    return { issues: [], failed: true, stderr: res.stderr || "audit did not run" };
  }
  try {
    return { issues: JSON.parse(res.stdout.trim()), failed: false };
  } catch {
    return { issues: [], failed: true, stderr: res.stdout };
  }
}

function report(
  issues: AuditIssue[],
  logger: { info: (m: string) => void; warn: (m: string) => void; error: (m: string) => void },
) {
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warning");

  if (issues.length === 0) {
    logger.info(`${C.green}✓ asset audit${C.reset} — every card maps to a real file`);
    return { errors, warnings };
  }

  const lines = [
    `${C.bold}Portfolio asset audit${C.reset} — ` +
      `${C.red}${errors.length} error(s)${C.reset}, ` +
      `${C.yellow}${warnings.length} warning(s)${C.reset}`,
  ];
  for (const issue of [...errors, ...warnings]) {
    const tag = issue.level === "error" ? `${C.red}✖${C.reset}` : `${C.yellow}▲${C.reset}`;
    lines.push(`  ${tag} [${issue.group}] ${issue.card}: ${issue.message}`);
    lines.push(`    ${C.dim}${issue.path ?? ""} → ${issue.fix}${C.reset}`);
  }
  logger[errors.length ? "error" : "warn"](lines.join("\n"));
  return { errors, warnings };
}

export function portfolioAssetAudit() {
  let root = process.cwd();
  let cache: AuditIssue[] = [];

  return {
    name: "portfolio-asset-audit",

    configResolved(config: { root: string }) {
      root = config.root;
    },

    buildStart(this: { warn: (m: string) => void; error: (m: string) => never }) {
      const { issues, failed, stderr } = runAudit(root);
      cache = issues;
      if (failed) {
        this.warn(`asset audit could not run: ${stderr}`);
        return;
      }
      const { errors } = report(issues, console);
      if (errors.length && process.env.NODE_ENV === "production") {
        this.error(
          `Asset audit failed: ${errors.length} card(s) reference missing or mismatched images.`,
        );
      }
    },

    resolveId(id: string) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id: string) {
      if (id === RESOLVED_ID) {
        return `export const assetIssues = ${JSON.stringify(cache)};`;
      }
    },

    configureServer(server: any) {
      const refresh = () => {
        const { issues, failed } = runAudit(root);
        if (failed) return;
        cache = issues;
        report(issues, server.config.logger);
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      };

      const watched = [resolve(root, "public"), resolve(root, "src/lib/portfolio-data.ts")];
      server.watcher.add(watched);
      const onChange = (file: string) => {
        if (watched.some((w) => file.startsWith(w))) refresh();
      };
      server.watcher.on("add", onChange);
      server.watcher.on("unlink", onChange);
      server.watcher.on("change", onChange);
    },
  };
}
