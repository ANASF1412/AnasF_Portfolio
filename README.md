# Anas F — AI/ML Engineer · Full-Stack Systems

Personal portfolio: MLOps pipelines, computer vision & NLP projects, and
full-stack web architecture case studies.

## Tech stack

- React 19 + TypeScript
- TanStack Start / TanStack Router (SSR)
- Tailwind CSS v4
- Framer Motion
- Vite 7

## Getting started

```bash
npm install     # or: bun install
npm run dev     # http://localhost:8080
npm run build   # production build
```

## Project structure

```
public/images/      all portfolio imagery (projects, certifications,
                    achievements, internships, profile) + responsive .webp variants
public/resume.pdf   downloadable resume
src/lib/portfolio-data.ts   single source of truth for every card on the site
src/components/site/        page sections and UI primitives
src/routes/                 file-based routes (home + /work/$slug case studies)
scripts/                    image variant generator + asset/data audit
```

## Images

Every image is a local file under `public/images/`. `scripts/gen-image-variants.py`
generates 480/768/1200/1600px WebP variants, and `scripts/audit-portfolio-assets.ts`
fails the build if any card in `portfolio-data.ts` points at a missing file.

## Contact

anasofficial2024@gmail.com
