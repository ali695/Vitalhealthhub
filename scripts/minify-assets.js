#!/usr/bin/env node
/**
 * Minifies the CSS and JS that ships, inside dist/ only.
 *
 * The sources in css/ and js/ stay readable and diffable; this runs after
 * build-static.js has copied them, so what reaches Cloudflare is minified and what
 * lives in the repo is not. Addresses the unminified 294 KB style.css and 77 KB
 * main.js called out as M1 in the August 2026 audit.
 *
 * Requires: npm install (terser, clean-css are devDependencies)
 */

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify } = require('terser');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function collect(dir, extension, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(full, extension, out);
    else if (entry.name.endsWith(extension)) out.push(full);
  }
  return out;
}

function relative(file) {
  return path.relative(DIST, file).split(path.sep).join('/');
}

async function main() {
  if (!fs.existsSync(DIST)) {
    throw new Error('dist/ not found. Run scripts/build-static.js first.');
  }

  const report = [];
  let before = 0;
  let after = 0;

  const cssMinifier = new CleanCSS({ level: 2, returnPromise: false });

  for (const file of collect(path.join(DIST, 'css'), '.css')) {
    const source = fs.readFileSync(file, 'utf8');
    const result = cssMinifier.minify(source);
    if (result.errors.length) {
      throw new Error(`CSS minification failed for ${relative(file)}: ${result.errors.join('; ')}`);
    }
    fs.writeFileSync(file, result.styles);
    before += Buffer.byteLength(source);
    after += Buffer.byteLength(result.styles);
    report.push({
      file: relative(file),
      from: Buffer.byteLength(source),
      to: Buffer.byteLength(result.styles)
    });
  }

  for (const file of collect(path.join(DIST, 'js'), '.js')) {
    const source = fs.readFileSync(file, 'utf8');
    const result = await minify(source, {
      compress: { passes: 2 },
      mangle: true,
      format: { comments: false }
    });
    if (typeof result.code !== 'string') {
      throw new Error(`JS minification produced no output for ${relative(file)}`);
    }
    fs.writeFileSync(file, result.code);
    before += Buffer.byteLength(source);
    after += Buffer.byteLength(result.code);
    report.push({
      file: relative(file),
      from: Buffer.byteLength(source),
      to: Buffer.byteLength(result.code)
    });
  }

  console.log(
    JSON.stringify(
      {
        files: report,
        totalBefore: before,
        totalAfter: after,
        saved: before - after,
        savedPercent: before ? Math.round(((before - after) / before) * 100) : 0
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
