/**
 * CLI: validate the portfolio data → asset mapping.
 *
 *   bun scripts/audit-portfolio-assets.ts          # report only
 *   bun scripts/audit-portfolio-assets.ts --strict # exit 1 on errors
 *   bun scripts/audit-portfolio-assets.ts --json   # machine-readable
 *
 * Also invoked automatically by the Vite plugin on dev-server start and on
 * every production build, so a broken card can never reach the browser
 * unnoticed.
 */
import { readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { auditPortfolioAssets, summariseIssues, type AssetIssue } from "../src/lib/asset-audit";

const ROOT = resolve(import.meta.dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

/** Every file in public/, as a public-relative URL path. */
function scanPublic(dir = PUBLIC_DIR): string[] {
  let out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(scanPublic(full));
    else out.push("/" + relative(PUBLIC_DIR, full).split("\\").join("/"));
  }
  return out;
}

const COLORS = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  bold: "\x1b[1m",
};

export function formatReport(issues: AssetIssue[]): string {
  const { errors, warnings } = summariseIssues(issues);
  if (issues.length === 0) {
    return `${COLORS.green}✓ asset audit — every card maps to a real file${COLORS.reset}`;
  }

  const lines: string[] = [
    `${COLORS.bold}Portfolio asset audit${COLORS.reset} — ` +
      `${COLORS.red}${errors} error(s)${COLORS.reset}, ` +
      `${COLORS.yellow}${warnings} warning(s)${COLORS.reset}`,
  ];

  const groups = [...new Set(issues.map((i) => i.group))];
  for (const group of groups) {
    lines.push(`  ${COLORS.dim}${group}${COLORS.reset}`);
    for (const issue of issues.filter((i) => i.group === group)) {
      const tag =
        issue.level === "error"
          ? `${COLORS.red}✖${COLORS.reset}`
          : `${COLORS.yellow}▲${COLORS.reset}`;
      lines.push(`   ${tag} ${issue.card}: ${issue.message}`);
      if (issue.path) lines.push(`     ${COLORS.dim}${issue.path}${COLORS.reset}`);
      lines.push(`     ${COLORS.dim}→ ${issue.fix}${COLORS.reset}`);
    }
  }
  return lines.join("\n");
}

export function runAudit() {
  return auditPortfolioAssets(scanPublic());
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const issues = runAudit();

  if (args.includes("--json")) {
    console.log(JSON.stringify(issues));
  } else {
    console.log(formatReport(issues));
  }

  const { errors } = summariseIssues(issues);
  if (args.includes("--strict") && errors > 0) process.exit(1);
}
