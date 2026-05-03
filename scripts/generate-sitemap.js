const fs   = require('fs');
const path = require('path');

const SITE      = 'https://vitalhealthhub.org';
const ROOT      = path.join(__dirname, '..');
const OUT_INDEX = path.join(ROOT, 'sitemap.xml');
const OUT_DIR   = path.join(ROOT, 'sitemaps');
const TODAY     = new Date().toISOString().slice(0, 10);

const EXCLUDE_DIRS = new Set([
  'node_modules', '.git', 'scripts', 'uploads',
  'attached_assets', '.local', 'css', 'js', 'images', 'fonts', 'icons'
]);

const CATEGORIES = {
  pages:       { file: 'pages.xml',       changefreq: 'weekly'  },
  calculators: { file: 'calculators.xml', changefreq: 'monthly' },
  blog:        { file: 'blog.xml',        changefreq: 'monthly' },
  tools:       { file: 'tools.xml',       changefreq: 'monthly' },
  quizzes:     { file: 'quizzes.xml',     changefreq: 'monthly' },
};

function getPriority(urlPath) {
  if (urlPath === '/')                     return '1.0';
  if (/^\/(calculators|blog|tools|quizzes)\/?$/.test(urlPath)) return '0.9';
  if (/^\/(about|contact|faq)\.html$/.test(urlPath))           return '0.8';
  if (/^\/calculators\//.test(urlPath))   return '0.8';
  if (/^\/blog\//.test(urlPath))          return '0.7';
  if (/^\/tools\//.test(urlPath))         return '0.8';
  if (/^\/quizzes\//.test(urlPath))       return '0.8';
  return '0.6';
}

function getCategory(urlPath) {
  if (/^\/calculators\//.test(urlPath))   return 'calculators';
  if (/^\/blog\//.test(urlPath))          return 'blog';
  if (/^\/tools\//.test(urlPath))         return 'tools';
  if (/^\/quizzes\//.test(urlPath))       return 'quizzes';
  return 'pages';
}

function scanHtml(dir, base = '') {
  const urls = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return urls; }

  for (const entry of entries) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;

    const relPath = base ? `${base}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      urls.push(...scanHtml(fullPath, relPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let urlPath = '/' + relPath;

      if (urlPath === '/index.html') urlPath = '/';

      const excluded = [
        '/sitemap.html',
        '/blog.html',
        '/calculators/index.html',
        '/tools/index.html',
        '/quizzes/index.html',
      ];
      if (excluded.includes(urlPath)) continue;

      urls.push(urlPath);
    }
  }
  return urls;
}

function xmlUrl(urlPath, changefreq) {
  const priority = getPriority(urlPath);
  const loc = urlPath === '/' ? SITE + '/' : SITE + urlPath;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function buildUrlsetXml(urls, changefreq) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ...urls.map(u => xmlUrl(u, changefreq)),
    '</urlset>',
  ].join('\n');
}

function buildIndexXml(names) {
  const items = names.map(name => [
    '  <sitemap>',
    `    <loc>${SITE}/sitemaps/${name}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    '  </sitemap>',
  ].join('\n'));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...items,
    '</sitemapindex>',
  ].join('\n');
}

function run() {
  console.log('Scanning HTML files...');
  const allUrls = scanHtml(ROOT);

  const buckets = { pages: [], calculators: [], blog: [], tools: [], quizzes: [] };

  for (const u of allUrls) {
    const cat = getCategory(u);
    buckets[cat].push(u);
  }

  buckets.pages.sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });
  for (const cat of ['calculators', 'blog', 'tools', 'quizzes']) {
    buckets[cat].sort();
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const generatedFiles = [];

  for (const [cat, cfg] of Object.entries(CATEGORIES)) {
    const urls = buckets[cat];
    if (urls.length === 0) {
      console.log(`  [skip] ${cat}: no URLs found`);
      continue;
    }
    const xml = buildUrlsetXml(urls, cfg.changefreq);
    const outPath = path.join(OUT_DIR, cfg.file);
    fs.writeFileSync(outPath, xml, 'utf8');
    generatedFiles.push(cfg.file);
    console.log(`  [ok]   sitemaps/${cfg.file} — ${urls.length} URLs`);
  }

  const indexXml = buildIndexXml(generatedFiles);
  fs.writeFileSync(OUT_INDEX, indexXml, 'utf8');
  console.log(`  [ok]   sitemap.xml (index, ${generatedFiles.length} sitemaps)`);

  const total = Object.values(buckets).reduce((s, a) => s + a.length, 0);
  console.log(`\nDone. ${total} URLs across ${generatedFiles.length} sitemaps.`);
}

run();
