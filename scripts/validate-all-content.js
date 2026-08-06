const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const failures = [];
const report = {};

const robotsOf = (html) => html.match(/<meta\s+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] || '';
const count = (text, pattern) => (text.match(pattern) || []).length;
const words = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').toLowerCase().match(/[a-z0-9]+/g) || [];

function shingles(html, size = 5) {
  const tokens = words(html);
  return new Set(tokens.slice(0, -size + 1).map((_, index) => tokens.slice(index, index + size).join(' ')));
}

function validateJsonLd(file, html) {
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { failures.push(`${file}: invalid JSON-LD`); }
  }
}

const trackedHtml = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
let indexable = 0;
let noindex = 0;
for (const file of trackedHtml) {
  const current = fs.readFileSync(path.join(root, file), 'utf8');
  const previous = execFileSync('git', ['show', `HEAD:${file}`], { cwd: root, encoding: 'utf8' });
  const currentRobots = robotsOf(current);
  const previousRobots = robotsOf(previous);
  if (currentRobots !== previousRobots) failures.push(`${file}: robots changed from "${previousRobots}" to "${currentRobots}"`);
  if (/\bnoindex\b/i.test(currentRobots)) noindex += 1; else indexable += 1;
  if (count(current, /<h1\b/gi) !== 1) failures.push(`${file}: expected exactly one H1`);
  const title = current.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '';
  const description = current.match(/<meta name="description" content="([^"]*)">/i)?.[1]?.trim() || '';
  if (!title || title.length > 60) failures.push(`${file}: title length ${title.length}`);
  if (!description || description.length > 160) failures.push(`${file}: description length ${description.length}`);
  if (!/<link rel="canonical" href="https:\/\/vitalhealthhub\.org\//i.test(current)) failures.push(`${file}: missing .org canonical`);
  if (!/<nav class="navbar">/i.test(current) || !/<footer class="site-footer">/i.test(current)) failures.push(`${file}: shared shell marker missing`);
  validateJsonLd(file, current);
}

const blogFiles = fs.readdirSync(path.join(root, 'blog')).filter((name) => name.endsWith('.html'));
if (blogFiles.length !== 155) failures.push(`expected 155 blog pages, found ${blogFiles.length}`);
const articleBodies = [];
let indexedBlogs = 0;
let noindexBlogs = 0;
for (const name of blogFiles) {
  const file = `blog/${name}`;
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const noindexed = /\bnoindex\b/i.test(robotsOf(html));
  if (noindexed) noindexBlogs += 1; else indexedBlogs += 1;
  const body = html.match(/<!-- Article body -->([\s\S]*?)<!-- CTA Callout box -->/)?.[1] || '';
  if (!body) failures.push(`${file}: article body markers missing`);
  const bodyWords = words(body).length;
  if (bodyWords < 370) failures.push(`${file}: article body too short (${bodyWords} words)`);
  const description = html.match(/<meta name="description" content="([^"]*)">/i)?.[1] || '';
  if (!description || description.length > 160) failures.push(`${file}: description length ${description.length}`);
  const sourceLinks = count(body, /target="_blank" rel="noopener noreferrer"/g);
  if (sourceLinks < (noindexed ? 1 : 2)) failures.push(`${file}: insufficient authoritative source links (${sourceLinks})`);
  const faqSchema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => { try { return JSON.parse(match[1]); } catch { return null; } })
    .find((item) => item?.['@type'] === 'FAQPage');
  if (!faqSchema || faqSchema.mainEntity?.length < 4) failures.push(`${file}: FAQ schema is missing or too small`);
  if (noindexed && !/remains noindexed pending final editorial or clinical review/i.test(body)) failures.push(`${file}: missing noindex editorial status`);
  articleBodies.push({ file, set: shingles(body), wordCount: bodyWords });
}

let maximumSimilarity = 0;
let closestPair = [];
for (let i = 0; i < articleBodies.length; i += 1) {
  for (let j = i + 1; j < articleBodies.length; j += 1) {
    const a = articleBodies[i].set;
    const b = articleBodies[j].set;
    let intersection = 0;
    for (const value of a) if (b.has(value)) intersection += 1;
    const similarity = intersection / Math.max(1, a.size + b.size - intersection);
    if (similarity > maximumSimilarity) {
      maximumSimilarity = similarity;
      closestPair = [articleBodies[i].file, articleBodies[j].file];
    }
  }
}
if (maximumSimilarity > 0.45) failures.push(`article similarity too high (${(maximumSimilarity * 100).toFixed(2)}%): ${closestPair.join(' vs ')}`);

const calculatorFiles = fs.readdirSync(path.join(root, 'calculators')).filter((name) => name.endsWith('.html') && name !== 'index.html');
if (calculatorFiles.length !== 103) failures.push(`expected 103 calculator pages, found ${calculatorFiles.length}`);
const calculatorRobots = { index: 0, noindex: 0 };
for (const name of calculatorFiles) {
  const html = fs.readFileSync(path.join(root, 'calculators', name), 'utf8');
  if (/\bnoindex\b/i.test(robotsOf(html))) calculatorRobots.noindex += 1; else calculatorRobots.index += 1;
  if (/valuable health tool|Our calculators use peer-reviewed, established|Green indicates healthy\/optimal/i.test(html)) failures.push(`calculators/${name}: old generic claim remains`);
  if (!/<div class="form-group">/i.test(html) || !/window\._vhCalcFn/i.test(html)) failures.push(`calculators/${name}: calculator inputs or logic marker missing`);
}

const safetySlugs = ['baby-weight-calculator', 'body-fat-calculator', 'child-bmi-calculator', 'child-growth-calculator', 'depression-screening-calculator', 'diabetes-risk-calculator', 'heart-age-calculator', 'medication-dosage-calculator', 'stroke-risk-calculator'];
for (const slug of safetySlugs) {
  const html = fs.readFileSync(path.join(root, 'calculators', `${slug}.html`), 'utf8');
  if (!/Authoritative references/i.test(html)) failures.push(`calculators/${slug}.html: safety review missing`);
}

const allHtml = trackedHtml.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
for (const [label, pattern] of [
  ['old calculator count', /115\+ Free Health Calculators/i],
  ['old quiz count', /50\+ Interactive Quizzes/i],
  ['unsupported review badge', /Expert reviewed/i],
  ['unsupported audience claim', /trusted by millions/i],
  ['unsupported formula provenance', /Our calculators use peer-reviewed, established/i],
]) {
  if (pattern.test(allHtml)) failures.push(`${label} remains in tracked HTML`);
}

const sitemapFiles = fs.readdirSync(path.join(root, 'sitemaps')).filter((name) => name.endsWith('.xml'));
const sitemapUrls = sitemapFiles.flatMap((name) => [...fs.readFileSync(path.join(root, 'sitemaps', name), 'utf8').matchAll(/<loc>https:\/\/vitalhealthhub\.org([^<]*)<\/loc>/g)].map((match) => match[1]));
if (sitemapUrls.length !== indexable) failures.push(`sitemap has ${sitemapUrls.length} URLs; expected ${indexable}`);
for (const url of sitemapUrls) {
  const relative = url === '/' ? 'index.html' : url.endsWith('/') ? `${url.slice(1)}index.html` : url.slice(1);
  const html = fs.readFileSync(path.join(root, relative), 'utf8');
  if (/\bnoindex\b/i.test(robotsOf(html))) failures.push(`${relative}: noindex page included in sitemap`);
}

report.trackedHtmlPages = trackedHtml.length;
report.indexablePages = indexable;
report.noindexPages = noindex;
report.blogPages = blogFiles.length;
report.indexedBlogs = indexedBlogs;
report.noindexBlogs = noindexBlogs;
report.blogWordCountMin = Math.min(...articleBodies.map((item) => item.wordCount));
report.blogWordCountMedian = articleBodies.map((item) => item.wordCount).sort((a, b) => a - b)[Math.floor(articleBodies.length / 2)];
report.blogWordCountMax = Math.max(...articleBodies.map((item) => item.wordCount));
report.maxArticleSimilarityPercent = Number((maximumSimilarity * 100).toFixed(2));
report.closestArticlePair = closestPair;
report.calculatorPages = calculatorFiles.length;
report.indexedCalculators = calculatorRobots.index;
report.noindexCalculators = calculatorRobots.noindex;
report.sitemapUrls = sitemapUrls.length;
report.failures = failures;

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
