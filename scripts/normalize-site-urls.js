const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://vitalhealthhub.org';
const PUBLIC_HTML_DIRECTORIES = ['blog', 'calculators', 'quizzes', 'tools'];

function extensionlessPath(urlPath) {
  const [pathname, suffix = ''] = urlPath.split(/(?=[?#])/s, 2);
  let normalized = pathname;
  if (/\/index\.html$/i.test(normalized)) normalized = normalized.replace(/index\.html$/i, '');
  else normalized = normalized.replace(/\.html$/i, '');
  return normalized + suffix;
}

function normalizeUrl(value) {
  if (!value || /^(?:mailto:|tel:|javascript:|data:|#)/i.test(value)) return value;

  const absolute = value.match(/^https?:\/\/(?:www\.)?vitalhealthhub\.(?:org|com)(\/[^\s"'<>]*)?$/i);
  if (absolute) return SITE + extensionlessPath(absolute[1] || '/');

  if (/^(?:\/|\.\.\/|\.\/)/.test(value)) return extensionlessPath(value);
  return value;
}

function canonicalPath(file) {
  const relative = path.relative(ROOT, file).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative.replace(/\.html$/i, '')}`;
}

function normalizeHtml(file) {
  let html = fs.readFileSync(file, 'utf8');

  html = html.replace(/\b(href|action)=(['"])([^'"]+)\2/gi, (match, attribute, quote, value) => {
    return `${attribute}=${quote}${normalizeUrl(value)}${quote}`;
  });

  html = html.replace(/https?:\/\/(?:www\.)?vitalhealthhub\.(?:org|com)\/[^\s"'<>]+/gi, (value) => normalizeUrl(value));
  html = html.replace(/(https%3A%2F%2F(?:www\.)?vitalhealthhub\.(?:org|com)%2F[^&"'<>]*?)\.html/gi, '$1');
  html = html.replace(/(['"])(\/(?!\/)[^'"<>]*?\.html(?:[?#][^'"<>]*)?)\1/g, (match, quote, value) => {
    return `${quote}${normalizeUrl(value)}${quote}`;
  });

  const canonical = SITE + canonicalPath(file);
  html = html.replace(/<link\s+rel=(['"])canonical\1\s+href=(['"])[^'"]+\2\s*\/?>/i, `<link rel="canonical" href="${canonical}">`);
  html = html.replace(/<meta\s+property=(['"])og:url\1\s+content=(['"])[^'"]+\2\s*\/?>/i, `<meta property="og:url" content="${canonical}">`);

  fs.writeFileSync(file, html, 'utf8');
}

const htmlFiles = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
  .map((entry) => path.join(ROOT, entry.name));

for (const directory of PUBLIC_HTML_DIRECTORIES) {
  const fullDirectory = path.join(ROOT, directory);
  for (const entry of fs.readdirSync(fullDirectory, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(path.join(fullDirectory, entry.name));
  }
}

htmlFiles.forEach(normalizeHtml);
console.log(JSON.stringify({ normalizedHtmlFiles: htmlFiles.length, canonicalHost: SITE }, null, 2));
