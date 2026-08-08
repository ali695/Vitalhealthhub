#!/usr/bin/env node
/** Assign each blog article's unique generated WebP to every place that article appears. */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const ORIGIN = 'https://vitalhealthhub.org';
const SKIP = new Set(['.git', 'dist', 'node_modules', 'scripts', '.review-images']);

function clean(value = '') {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&ndash;|&#8211;/g, '–')
    .replace(/&mdash;|&#8212;/g, '—')
    .replace(/\s*\|\s*VitalHealth Hub\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const articles = fs.readdirSync(BLOG_DIR)
  .filter((name) => name.endsWith('.html'))
  .map((name) => {
    const slug = name.replace(/\.html$/, '');
    const html = fs.readFileSync(path.join(BLOG_DIR, name), 'utf8');
    const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || slug;
    const heroAlt = (html.match(/<img\b[^>]*alt="([^"]+)"[^>]*loading="eager"/i) || [])[1] || '';
    return { slug, title, heroAlt };
  });

const byTitle = new Map(articles.map((article) => [clean(article.title), article.slug]));
const byAlt = new Map(articles.filter((article) => article.heroAlt).map((article) => [clean(article.heroAlt), article.slug]));
const validSlugs = new Set(articles.map((article) => article.slug));

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function ownBlogSlug(file) {
  if (path.dirname(file) !== BLOG_DIR) return null;
  const slug = path.basename(file, '.html');
  return validSlugs.has(slug) ? slug : null;
}

function nearbyLinkedSlug(html, offset, tagLength) {
  const anchorOpen = html.lastIndexOf('<a ', offset);
  const anchorClose = html.indexOf('</a>', offset + tagLength);
  if (anchorOpen >= 0 && anchorClose >= offset) {
    const anchor = html.slice(anchorOpen, anchorClose + 4);
    const direct = (anchor.match(/href="\/blog\/([^"#?]+)"/) || [])[1];
    if (validSlugs.has(direct)) return direct;
  }
  const nearby = html.slice(Math.max(0, offset - 700), Math.min(html.length, offset + tagLength + 700));
  const links = [...nearby.matchAll(/href="\/blog\/([^"#?]+)"/g)]
    .map((match) => match[1])
    .filter((slug) => validSlugs.has(slug));
  return links.length === 1 ? links[0] : null;
}

function transform(file, html) {
  const own = ownBlogSlug(file);
  let out = html;

  if (own) {
    const absolute = `${ORIGIN}/images/blog/${own}.webp`;
    out = out.replace(/(<meta\b[^>]*(?:property="og:image"|name="twitter:image")[^>]*content=")[^"]+("[^>]*>)/gi, `$1${absolute}$2`);
    out = out.replace(/("image":\{"@type":"ImageObject","url":")[^"]+("[^}]*"width":1200,"height":)\d+/g, `$1${absolute}$2` + '675');
    out = out.replace(/(--bp-bg:url\(['"]?)[^'"\)]+(['"]?\))/gi, `$1/images/blog/${own}.webp$2`);
  }

  out = out.replace(/<img\b[^>]*src="\/images\/(?:editorial|blog)\/[^"?]+\.webp"[^>]*>/gi, (tag, offset) => {
    const title = (tag.match(/\btitle="([^"]+)"/i) || [])[1] || '';
    const alt = (tag.match(/\balt="([^"]+)"/i) || [])[1] || '';
    const eager = /\bloading="eager"/i.test(tag);
    let slug = byTitle.get(clean(title)) || byAlt.get(clean(alt));
    if (!slug && own && eager) slug = own;
    if (!slug) slug = nearbyLinkedSlug(out, offset, tag.length);
    if (!slug) return tag;
    return tag.replace(/src="\/images\/(?:editorial|blog)\/[^"?]+\.webp"/i, `src="/images/blog/${slug}.webp"`);
  });

  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = transform(file, before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}

console.log(JSON.stringify({ articles: articles.length, htmlFilesChanged: changed }, null, 2));
