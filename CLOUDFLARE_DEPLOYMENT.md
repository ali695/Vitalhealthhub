# Cloudflare Pages production settings

The repository contains source code and optional local CMS tooling. Cloudflare must publish only the generated `dist` directory.

## Pages build

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

The checked-in `wrangler.toml` also declares `./dist` as the Pages output directory. Do not use the repository root or `/` as the output directory, and do not use Direct Upload against the repository root.

## `www` redirect

The `www` hostname requires Cloudflare zone configuration and cannot be repaired by static files alone:

1. Create a proxied DNS `A` record named `www` pointing to `192.0.2.1`.
2. Create a Cloudflare Bulk Redirect from `www.vitalhealthhub.org` to `https://vitalhealthhub.org`.
3. Use status `301` and enable preserve query string, subpath matching, and preserve path suffix.

After deployment, verify that an unknown path returns HTTP 404, `.html` URLs redirect once to extensionless URLs, `www` redirects to the apex hostname, security headers are present, and `/server.js` plus `/database/vitalhealth.db` return 404.
