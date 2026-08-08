/**
 * Portfolio data → asset mapping validator.
 *
 * Every card in `portfolio-data.ts` declares the media it expects. This module
 * checks those declarations against the files that actually exist under
 * `public/`, so a missing screenshot, a stale `hasImage` flag, or an orphaned
 * upload is caught *before* the site renders instead of showing up as an empty
 * placeholder in front of a recruiter.
 *
 * It is intentionally pure (no `fs`, no `fetch`): callers pass the list of
 * public-relative asset paths that exist. That keeps it usable from the Vite
 * plugin, a CLI script, and the dev-only browser overlay alike.
 */
import {
  certifications,
  internships,
  profile,
  projects,
  timeline,
} from "./portfolio-data.js";

export type AssetIssueLevel = "error" | "warning";

export type AssetIssue = {
  /** "error" = visibly broken card. "warning" = degraded / unused asset. */
  level: AssetIssueLevel;
  /** Data group the card belongs to, e.g. "projects". */
  group: string;
  /** Human label for the specific card, e.g. "JarvisFi". */
  card: string;
  /** Public-relative asset path involved, when there is one. */
  path?: string;
  /** What is wrong. */
  message: string;
  /** Concrete next action. */
  fix: string;
};

/** Canonical screenshot path for a project card. */
export const projectImagePath = (slug: string) => `/images/projects/${slug}.jpg`;

/** Every public-relative asset path the data layer expects to exist. */
export function expectedAssetPaths(): string[] {
  return [
    profile.heroImage,
    ...internships.flatMap((i) => [i.photo, i.projectShot]),
    ...projects.filter((p) => p.hasImage).map((p) => projectImagePath(p.slug)),
    ...projects.flatMap((p) => (p.architectureImage ? [p.architectureImage] : [])),
    ...certifications.map((c) => c.image),
    ...timeline.map((t) => t.image),
  ].filter(Boolean);
}

const MIN_ALT_LENGTH = 20;

/**
 * @param existingPaths public-relative paths that exist on disk
 *   (e.g. `["/images/projects/jarvisfi.jpg", "/resume.pdf"]`).
 */
export function auditPortfolioAssets(existingPaths: string[]): AssetIssue[] {
  const files = new Set(existingPaths);
  const issues: AssetIssue[] = [];
  const referenced = new Set<string>();

  const require_ = (
    path: string,
    group: string,
    card: string,
    level: AssetIssueLevel,
    fix: string,
  ) => {
    referenced.add(path);
    // CDN-backed pointers are immutable remote assets, not public/ files.
    if (path.startsWith("/__l5e/assets-v1/")) return;
    if (!files.has(path)) {
      issues.push({
        level,
        group,
        card,
        path,
        message: `Referenced asset is missing from public/`,
        fix,
      });
    }
  };

  // ---- profile -----------------------------------------------------------
  require_(
    profile.heroImage,
    "profile",
    profile.name,
    "error",
    `Add the portrait at public${profile.heroImage} or clear profile.heroImage.`,
  );
  referenced.add(profile.resume);
  if (profile.resume && !files.has(profile.resume)) {
    issues.push({
      level: "error",
      group: "profile",
      card: "Résumé CTA",
      path: profile.resume,
      message: "Résumé link points at a file that does not exist",
      fix: `Upload public${profile.resume} — every résumé button is currently a dead link.`,
    });
  }

  // ---- internships -------------------------------------------------------
  for (const item of internships) {
    const label = `${item.role} · ${item.org}`;
    require_(
      item.photo,
      "internships",
      label,
      "warning",
      `Add public${item.photo} — the card falls back to a placeholder.`,
    );
    require_(
      item.projectShot,
      "internships",
      label,
      "warning",
      `Add public${item.projectShot} — the modal falls back to a placeholder.`,
    );
  }

  // ---- projects ----------------------------------------------------------
  for (const project of projects) {
    const path = projectImagePath(project.slug);
    const onDisk = files.has(path);
    referenced.add(path);

    if (project.hasImage && !onDisk) {
      issues.push({
        level: "error",
        group: "projects",
        card: project.name,
        path,
        message: "hasImage is true but no screenshot exists",
        fix: `Upload public${path}, or set hasImage: false for "${project.slug}".`,
      });
    }
    if (!project.hasImage && onDisk) {
      issues.push({
        level: "error",
        group: "projects",
        card: project.name,
        path,
        message: "A screenshot exists but hasImage is false, so it never renders",
        fix: `Set hasImage: true for "${project.slug}".`,
      });
    }
    if (project.hasImage && (project.imageAlt ?? "").trim().length < MIN_ALT_LENGTH) {
      issues.push({
        level: "warning",
        group: "projects",
        card: project.name,
        path,
        message: "Screenshot has missing or too-thin alt text",
        fix: `Write a descriptive imageAlt (20+ chars) for "${project.slug}".`,
      });
    }
    if (project.hasImage && !(project.imageCaption ?? "").trim()) {
      issues.push({
        level: "warning",
        group: "projects",
        card: project.name,
        path,
        message: "Screenshot has no visible caption",
        fix: `Add an imageCaption for "${project.slug}".`,
      });
    }
    if (project.architectureImage) {
      require_(
        project.architectureImage,
        "projects",
        `${project.name} architecture`,
        "error",
        `Add public${project.architectureImage}, or clear architectureImage for "${project.slug}".`,
      );
    }
  }

  // ---- certifications ----------------------------------------------------
  for (const cert of certifications) {
    require_(
      cert.image,
      "certifications",
      cert.name,
      "warning",
      `Add public${cert.image} — the certificate preview shows a placeholder.`,
    );
  }

  // ---- achievements / gallery -------------------------------------------
  const seen = new Map<string, string>();
  for (const item of timeline) {
    require_(
      item.image,
      "achievements",
      item.title,
      "error",
      `Add public${item.image} — the gallery tile renders empty.`,
    );
    if ((item.imageAlt ?? "").trim().length < MIN_ALT_LENGTH) {
      issues.push({
        level: "warning",
        group: "achievements",
        card: item.title,
        path: item.image,
        message: "Gallery photo has missing or too-thin alt text",
        fix: `Write a descriptive imageAlt (20+ chars) for "${item.id}".`,
      });
    }
    const duplicateOf = seen.get(item.image);
    if (duplicateOf) {
      issues.push({
        level: "warning",
        group: "achievements",
        card: item.title,
        path: item.image,
        message: `Reuses the same photo as "${duplicateOf}"`,
        fix: "Point one of the two cards at its own photo.",
      });
    } else {
      seen.set(item.image, item.title);
    }
  }

  // ---- orphaned uploads --------------------------------------------------
  for (const path of existingPaths) {
    if (!path.startsWith("/images/")) continue;
    if (referenced.has(path)) continue;
    const sourceStem = path.replace(/-w\d+\.(?:webp|avif)$/i, "");
    if (
      sourceStem !== path &&
      [...referenced].some((referencedPath) =>
        referencedPath.replace(/\.[^/.]+$/, "") === sourceStem,
      )
    ) {
      continue;
    }
    issues.push({
      level: "warning",
      group: "unmapped",
      card: path.split("/").pop() ?? path,
      path,
      message: "Asset exists in public/images but no card references it",
      fix: "Wire it into portfolio-data.ts or delete the file.",
    });
  }

  return issues;
}

/** Compact one-line summary, e.g. "2 errors, 3 warnings". */
export function summariseIssues(issues: AssetIssue[]) {
  const errors = issues.filter((i) => i.level === "error").length;
  const warnings = issues.length - errors;
  return { errors, warnings, text: `${errors} error(s), ${warnings} warning(s)` };
}
