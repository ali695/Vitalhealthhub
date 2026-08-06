const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const articles = require('../content/indexed-blog-content');

const root = path.resolve(__dirname, '..');
const failures = [];
const report = {};

const count = (text, pattern) => (text.match(pattern) || []).length;
const robotsOf = (html) => html.match(/<meta\s+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] || '';

function canonicalShell(html) {
  return html
    .replace(/\r\n/g, '\n')
    .replace(/<meta name="description" content="[^"]*">/g, '<META_DESCRIPTION>')
    .replace(/<meta property="og:description" content="[^"]*">/g, '<OG_DESCRIPTION>')
    .replace(/<meta name="twitter:description" content="[^"]*">/g, '<TWITTER_DESCRIPTION>')
    .replace(/<meta name="keywords" content="[^"]*">/g, '<META_KEYWORDS>')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, (block) => {
      try {
        const json = JSON.parse(block.match(/>([\s\S]*?)<\/script>/)[1]);
        return json['@type'] === 'BlogPosting' ? '<BLOG_SCHEMA>' : json['@type'] === 'FAQPage' ? '<FAQ_SCHEMA>' : block;
      } catch { return block; }
    })
    .replace(/(<details class="bp-toc-mobile fade-in">[\s\S]*?<summary>[\s\S]*?<\/summary>)[\s\S]*?(<\/details>)/, '$1<MOBILE_TOC>$2')
    .replace(/(<div class="bp-info-box-title">[\s\S]*?<\/div>)[\s\S]*?(<\/div>)/, '$1<TAKEAWAYS>$2')
    .replace(/(<!-- Article body -->)[\s\S]*?(<!-- CTA Callout box -->)/, '$1<ARTICLE_BODY>$2')
    .replace(/(<!-- FAQ -->)[\s\S]*?(<\/section>)/, '$1<VISIBLE_FAQ>$2')
    .replace(/(<div class="bp-toc" id="bpToc">[\s\S]*?<\/div>)[\s\S]*?(<\/div>)/, '$1<SIDEBAR_TOC>$2')
    .replace(/Updated(?: August)? 2026/g, '<UPDATED>')
    .replace(/Evidence-Based Tools and Insights|Practical Tools and Clear Guides/g, '<ANNOUNCEMENT>')
    .replace(/Designed for Accuracy and Simplicity|Designed for Clarity and Simplicity/g, '<CLARITY>')
    .replace(/Science-backed tools, free forever|Practical tools, free forever/g, '<MEGA_TAGLINE>')
    .replace(/Get precise results tailored to your body and goals\.[^<]*/g, '<WIDGET_DESCRIPTION>')
    .replace(/Use this free calculator for a quick starting estimate,[^<]*/g, '<WIDGET_DESCRIPTION>')
    .replace(/Trusted by thousands of users for smarter health decisions\.|Free to use, with no sign-up required\./g, '<WIDGET_TRUST>')
    .replace(/Ready to get (?:your personalized result|a starting estimate)\?/g, '<CTA_QUESTION>')
    .replace(/instant, science-based, no sign-up needed|instant and no sign-up needed/g, '<CTA_DETAIL>');
}

function words(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').toLowerCase().match(/[a-z0-9]+/g) || [];
}

function shingles(html, size = 5) {
  const token = words(html);
  return new Set(token.slice(0, -size + 1).map((_, index) => token.slice(index, index + size).join(' ')));
}

const articleShingles = [];
for (const article of articles) {
  const current = fs.readFileSync(path.join(root, article.path), 'utf8');
  const previous = execFileSync('git', ['show', `HEAD:${article.path}`], { cwd: root, encoding: 'utf8' });
  if (robotsOf(current).toLowerCase() !== 'index, follow') failures.push(`${article.path}: robots changed`);
  if (canonicalShell(current) !== canonicalShell(previous)) failures.push(`${article.path}: outer page shell changed`);
  if (count(current, /<h1\b/g) !== 1) failures.push(`${article.path}: expected one H1`);
  if (count(current, /<h2 id="bp-sec-\d+">/g) !== article.sections.length) failures.push(`${article.path}: section count mismatch`);
  if (count(current, /class="bp-toc-link"/g) !== article.sections.length) failures.push(`${article.path}: sidebar TOC mismatch`);
  if (count(current, /target="_blank" rel="noopener noreferrer"/g) < 2) failures.push(`${article.path}: fewer than two cited sources`);
  if (/2023 meta-analysis in|reviewed by healthcare professionals|accurate to within 5|Every recommendation here is grounded/i.test(current)) failures.push(`${article.path}: old unsupported claim remains`);

  const desc = current.match(/<meta name="description" content="([^"]*)">/)?.[1] || '';
  if (!desc || desc.length > 160) failures.push(`${article.path}: description length ${desc.length}`);

  const blocks = [...current.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const block of blocks) {
    try { JSON.parse(block[1]); } catch { failures.push(`${article.path}: invalid JSON-LD`); }
  }
  const faq = blocks.map((block) => { try { return JSON.parse(block[1]); } catch { return null; } }).find((item) => item?.['@type'] === 'FAQPage');
  if (faq?.mainEntity?.length !== article.faqs.length) failures.push(`${article.path}: FAQ schema mismatch`);

  const body = current.match(/<!-- Article body -->([\s\S]*?)<!-- CTA Callout box -->/)?.[1] || '';
  articleShingles.push({ path: article.path, set: shingles(body), wordCount: words(body).length });
}

const similarities = [];
for (let i = 0; i < articleShingles.length; i += 1) {
  let highest = 0;
  for (let j = 0; j < articleShingles.length; j += 1) {
    if (i === j) continue;
    const a = articleShingles[i].set;
    const b = articleShingles[j].set;
    let intersection = 0;
    for (const value of a) if (b.has(value)) intersection += 1;
    highest = Math.max(highest, intersection / Math.max(1, a.size + b.size - intersection));
  }
  similarities.push(highest);
}

const trackedHtml = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
let indexableCount = 0;
for (const file of trackedHtml) {
  const current = fs.readFileSync(path.join(root, file), 'utf8');
  const previous = execFileSync('git', ['show', `HEAD:${file}`], { cwd: root, encoding: 'utf8' });
  if (robotsOf(current) !== robotsOf(previous)) failures.push(`${file}: robots directive changed`);
  if (!/\bnoindex\b/i.test(robotsOf(current))) indexableCount += 1;
}

const sitemapFiles = fs.readdirSync(path.join(root, 'sitemaps')).filter((name) => name.endsWith('.xml'));
const sitemapUrls = sitemapFiles.flatMap((name) => [...fs.readFileSync(path.join(root, 'sitemaps', name), 'utf8').matchAll(/<loc>https:\/\/vitalhealthhub\.org([^<]*)<\/loc>/g)].map((match) => match[1]));
if (sitemapUrls.length !== indexableCount) failures.push(`sitemap has ${sitemapUrls.length} URLs; expected ${indexableCount}`);
for (const url of sitemapUrls) {
  const relative = url === '/' ? 'index.html' : url.endsWith('/') ? `${url.slice(1)}index.html` : url.slice(1);
  const html = fs.readFileSync(path.join(root, relative), 'utf8');
  if (/\bnoindex\b/i.test(robotsOf(html))) failures.push(`${relative}: noindex page included in sitemap`);
}

report.indexablePages = indexableCount;
report.rewrittenArticles = articles.length;
report.articleWordCountMin = Math.min(...articleShingles.map((item) => item.wordCount));
report.articleWordCountMedian = articleShingles.map((item) => item.wordCount).sort((a, b) => a - b)[Math.floor(articleShingles.length / 2)];
report.articleWordCountMax = Math.max(...articleShingles.map((item) => item.wordCount));
report.maxClosestArticleSimilarityPercent = Number((Math.max(...similarities) * 100).toFixed(2));
report.sitemapUrls = sitemapUrls.length;
report.failures = failures;

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
