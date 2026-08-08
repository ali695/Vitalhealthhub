#!/usr/bin/env node
/**
 * Moves every executable inline <script> out of the HTML and into an external file,
 * so 'unsafe-inline' can come out of script-src.
 *
 * H2 in the audit. 224,294 bytes across 127 blocks, all of it in calculators (107 KB),
 * quizzes (87 KB) and tools (30 KB); the root pages and all 155 blog posts already had
 * none. Each page's blocks are concatenated in document order into
 * js/page/<section>/<slug>.js.
 *
 * Ordering is the part that matters. A plain inline <script> executes during parsing,
 * which is BEFORE any defer script, so today window._vhCalcFn and window.vhQuizData are
 * always set before calculators.js and quiz.js run. Deferred scripts execute in
 * document order, so the extracted file is inserted ahead of the first existing
 * /js/ script tag to reproduce exactly that sequence.
 *
 * JSON-LD blocks are left alone: they are a data type, not executed, and script-src
 * does not govern them.
 *
 * Idempotent -- a page with no inline scripts left is skipped.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.runtime', 'uploads', 'scripts', 'content']);
const OUT_ROOT = path.join(ROOT, 'js', 'page');

const INLINE_SCRIPT = /[ \t]*<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>\r?\n?/gi;
const FIRST_LOCAL_SCRIPT = /[ \t]*<script src="\/js\/[^"]*"[^>]*><\/script>/;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const results = [];
const problems = [];
let totalBytes = 0;

for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, 'utf8');
  const eol = before.includes('\r\n') ? '\r\n' : '\n';

  const bodies = [];
  const after = before.replace(INLINE_SCRIPT, (match, attrs, body) => {
    // Data blocks (JSON-LD, importmap, application/json) are not executed and are
    // not covered by script-src -- leave them exactly where they are.
    if (/\btype\s*=/i.test(attrs) && !/\btype\s*=\s*["']?(text\/javascript|module)["']?/i.test(attrs)) {
      return match;
    }
    if (!body.trim()) return '';
    bodies.push(body.trim());
    return '';
  });

  if (!bodies.length) continue;

  const relative = path.relative(ROOT, file).split(path.sep).join('/');
  const section = relative.includes('/') ? relative.slice(0, relative.indexOf('/')) : 'root';
  const slug = path.basename(relative, '.html');

  const outDir = path.join(OUT_ROOT, section);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${slug}.js`);

  const header =
    `/* Extracted from ${relative} so the site can drop 'unsafe-inline' from script-src.` +
    ` Edit this file, not the HTML. */\n`;
  const source = header + bodies.join('\n\n') + '\n';
  fs.writeFileSync(outFile, source);

  const tag = `<script src="/js/page/${section}/${slug}.js" defer></script>`;

  let updated = after;
  if (updated.includes(tag)) {
    // already wired from a previous run
  } else if (FIRST_LOCAL_SCRIPT.test(updated)) {
    updated = updated.replace(FIRST_LOCAL_SCRIPT, (m) => tag + eol + m);
  } else if (updated.includes('</body>')) {
    updated = updated.replace('</body>', `${tag}${eol}</body>`);
  } else {
    problems.push(`${relative}: no anchor found to insert the script tag`);
    continue;
  }

  fs.writeFileSync(file, updated);
  totalBytes += Buffer.byteLength(source);
  results.push({ page: relative, extractedTo: path.relative(ROOT, outFile).split(path.sep).join('/'), blocks: bodies.length, bytes: Buffer.byteLength(source) });
}

const bySection = {};
for (const r of results) {
  const section = r.extractedTo.split('/')[2];
  bySection[section] = (bySection[section] || 0) + 1;
}

console.log(
  JSON.stringify(
    { pagesChanged: results.length, filesWritten: results.length, totalBytes, bySection, problems },
    null,
    2
  )
);
if (problems.length) process.exit(1);
