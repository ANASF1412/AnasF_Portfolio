# Deploying to Vercel

This repo builds with Vite + TanStack Start + Nitro. On Vercel, Nitro
auto-detects the `vercel` preset and emits `.vercel/output` (Build Output API v3).

## One-time setup on Vercel

Project → Settings → General:

- Framework Preset: **Other** (this is what `vercel.json` sets with `"framework": null`)
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave **empty** (Build Output API is auto-detected)
- Node.js version: 22.x

No environment variables are required — the contact form posts directly to
Web3Forms with a public access key.

## Push and deploy

```bash
git init
git remote add origin https://github.com/ANASF1412/AnasF_Portfolio.git
git add -A
git commit -m "Portfolio: AI/ML Engineer · Full-Stack Systems"
git branch -M main
git push -u origin main --force
```

Vercel redeploys automatically on push to `main`.

## Local verification (same commands Vercel runs)

```bash
npm install
npm run build     # must exit 0
npm run preview
```

To reproduce the exact Vercel artifact locally:

```bash
NITRO_PRESET=vercel npm run build   # writes .vercel/output/
```
