const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const failures = [];

const forbiddenNames = new Set([
  'package.json', 'package-lock.json', 'server.js', 'wrangler.toml',
  'vitalhealth.db', 'vitalhealth.db-wal', 'vitalhealth.db-shm',
]);
const forbiddenExtensions = new Set(['.db', '.ejs', '.php', '.shm', '.sql', '.toml', '.wal', '.zip']);
const forbiddenDirectories = new Set([
  'content', 'deployment', 'node_modules', 'scripts',
]);

function walk(directory, relative = '') {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const rel = relative ? `${relative}/${entry.name}` : entry.name;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full, rel));
    else files.push(rel.replace(/\\/g, '/'));
  }
  return files;
}

if (!fs.existsSync(DIST)) failures.push('dist directory is missing; run npm run build first');

const files = fs.existsSync(DIST) ? walk(DIST) : [];
for (const file of files) {
  const parts = file.split('/');
  const base = parts.at(-1);
  const extension = path.extname(base).toLowerCase();
  if (parts.some((part) => forbiddenDirectories.has(part))) failures.push(`${file}: forbidden directory published`);
  if (forbiddenNames.has(base) || forbiddenExtensions.has(extension)) failures.push(`${file}: forbidden source or data file published`);
}

for (const required of ['index.html', '404.html', '_headers', 'robots.txt', 'sitemap.xml']) {
  if (!files.includes(required)) failures.push(`${required}: required production file missing`);
}

const htmlFiles = files.filter((file) => file.endsWith('.html'));
const fileSet = new Set(files);
let htmlLinks = 0;
let redirectedCanonicals = 0;
const brokenInternalReferences = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(DIST, file), 'utf8');
  htmlLinks += [...html.matchAll(/(?<![-\w])(?:href|action)=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((url) => /^(?:\/|\.\/|\.\.\/|https?:\/\/(?:www\.)?vitalhealthhub\.(?:org|com)\/)/i.test(url) && /\.html(?:[?#]|$)/i.test(url)).length;
  redirectedCanonicals += (html.match(/<link\s+rel=["']canonical["'][^>]+href=["'][^"']+\.html["']/gi) || []).length;
  for (const match of html.matchAll(/(?<![-\w])(?:href|src|action)=["']([^"']+)["']/gi)) {
    const value = match[1];
    if (!value || /^(?:#|mailto:|tel:|javascript:|data:|blob:)/i.test(value)) continue;
    let url;
    try { url = new URL(value, `https://vitalhealthhub.org/${file}`); } catch { continue; }
    if (url.hostname !== 'vitalhealthhub.org') continue;
    const pathname = decodeURIComponent(url.pathname).replace(/^\//, '');
    const candidates = pathname === ''
      ? ['index.html']
      : pathname.endsWith('/')
        ? [`${pathname}index.html`]
        : path.extname(pathname)
          ? [pathname]
          : [pathname, `${pathname}.html`, `${pathname}/index.html`];
    if (!candidates.some((candidate) => fileSet.has(candidate))) brokenInternalReferences.push(`${file} -> ${url.pathname}`);
  }
}
if (htmlLinks) failures.push(`${htmlLinks} internal HTML-extension links remain in production`);
if (redirectedCanonicals) failures.push(`${redirectedCanonicals} redirecting canonical URLs remain in production`);
if (brokenInternalReferences.length) failures.push(`${brokenInternalReferences.length} broken internal production references remain`);

const sitemapXml = files.filter((file) => file.endsWith('.xml')).map((file) => fs.readFileSync(path.join(DIST, file), 'utf8')).join('\n');
if (/https:\/\/vitalhealthhub\.org\/[^<\s]+\.html/i.test(sitemapXml)) failures.push('HTML-extension URLs remain in production sitemaps');

const headers = fs.existsSync(path.join(DIST, '_headers')) ? fs.readFileSync(path.join(DIST, '_headers'), 'utf8') : '';
for (const header of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Frame-Options', 'Permissions-Policy']) {
  if (!headers.includes(`${header}:`)) failures.push(`${header}: production header missing`);
}

const report = {
  productionFiles: files.length,
  htmlFiles: htmlFiles.length,
  forbiddenFiles: failures.filter((failure) => /forbidden/.test(failure)).length,
  internalHtmlLinks: htmlLinks,
  redirectingCanonicals: redirectedCanonicals,
  brokenInternalReferences: brokenInternalReferences.length,
  brokenInternalReferenceExamples: brokenInternalReferences.slice(0, 20),
  failures,
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
