# VitalHealth Hub

Static website for [vitalhealthhub.org](https://vitalhealthhub.org), deployed to Cloudflare Pages.

## Project structure

- `blog/`, `calculators/`, `quizzes/`, `tools/` — public HTML pages
- `css/`, `js/`, `images/` — public frontend assets
- `content/` — editorial source data used by content-maintenance scripts
- `scripts/` — build, validation, sitemap, content and calculator maintenance
- `deployment/` — Cloudflare `_headers` and the production 404 page
- `sitemaps/` — generated sitemap files
- `dist/` — generated production output; ignored by Git

## Local commands

```sh
npm run build
npm test
```

`npm run build` creates a clean `dist/` directory. Cloudflare Pages must use:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

Do not configure Cloudflare to publish the repository root.

## Content maintenance

Run `npm run content:update` only when intentionally regenerating editorial content, then review the diff and run `npm test` before committing.

This repository contains no application server, database, CMS, WordPress package or Replit configuration. All production behavior is static and browser-side.
