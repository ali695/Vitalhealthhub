#!/usr/bin/env node
/** Replace third-party editorial photos with the site's generated WebP library. */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['.git', 'dist', 'node_modules', 'scripts']);
const ORIGIN = 'https://vitalhealthhub.org';
const UNSPLASH = /https:\/\/images\.unsplash\.com\/[^\s\"'<>\\)]+/g;
const EDITORIAL = '/images/editorial/';

const topics = {
  nutrition: { file: 'nutrition.webp', alt: 'Balanced nutritious meal with vegetables, salmon, whole grains and berries' },
  fitness: { file: 'fitness.webp', alt: 'Adults combining strength and cardio exercise in a modern gym' },
  'body-metrics': { file: 'body-metrics.webp', alt: 'Adult tracking body measurements in a calm home wellness setting' },
  sleep: { file: 'sleep.webp', alt: 'Adult getting restorative sleep in a calm bedroom' },
  'mental-wellness': { file: 'mental-wellness.webp', alt: 'Adult practicing calm breathing for stress management and mental wellness' },
  'womens-health': { file: 'womens-health.webp', alt: "Women supporting one another through different stages of women's health" },
  'heart-health': { file: 'heart-health.webp', alt: 'Active adult walking outdoors to support cardiovascular health' },
  'medical-wellness': { file: 'medical-wellness.webp', alt: 'Clinician and patient reviewing personal health information together' }
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function topicFor(value) {
  const text = value.toLowerCase().replace(/[-_]/g, ' ');
  if (/pregnan|fertil|ovulat|menstrual|menopaus|pcos|breastfeed|baby|maternal|child growth/.test(text)) return 'womens-health';
  if (/sleep|insomnia|nap\b|bedtime|circadian|restorative/.test(text)) return 'sleep';
  if (/blood pressure|heart|cardiovascular|cholesterol|stroke|pulse|heart rate|hrv/.test(text)) return 'heart-health';
  if (/stress|anxiety|depress|burnout|mental|mindful|meditat|focus|dopamine|digital detox|work life|productiv|habit|cortisol/.test(text)) return 'mental-wellness';
  if (/bmi|body fat|body composition|waist|weight|obes|underweight|overweight|lean mass|ideal weight|metabolic age|body surface/.test(text)) return 'body-metrics';
  if (/women|woman|female|hormone/.test(text)) return 'womens-health';
  if (/workout|exercise|fitness|muscle|strength|running|walking|steps|cardio|cycling|swimming|yoga|marathon|vo2|max heart|calorie burn|training|recovery|stretch/.test(text)) return 'fitness';
  if (/food|meal|nutrition|diet|calorie|protein|carb|macro|fat intake|vitamin|mineral|sodium|sugar|fiber|water|hydrat|electrolyte|omega|keto|fasting|gut|alcohol|caffeine/.test(text)) return 'nutrition';
  return 'medical-wellness';
}

function isMetadataContext(html, offset) {
  const scriptOpen = html.lastIndexOf('<script type="application/ld+json"', offset);
  const scriptClose = html.lastIndexOf('</script>', offset);
  if (scriptOpen > scriptClose) return true;
  const tagOpen = html.lastIndexOf('<', offset);
  const before = html.slice(tagOpen, offset);
  return /^<meta\b/i.test(before);
}

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function transform(file, html) {
  const relative = path.relative(ROOT, file).replace(/\\/g, '/');
  const pageTitle = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || relative;
  const pageTopic = topicFor(relative + ' ' + pageTitle);
  let out = html.replace(UNSPLASH, (url, offset) => {
    const context = html.slice(Math.max(0, offset - 500), Math.min(html.length, offset + url.length + 500));
    const topic = topicFor(context + ' ' + relative + ' ' + pageTitle);
    const local = EDITORIAL + topics[topic].file;
    return isMetadataContext(html, offset) ? ORIGIN + local : local;
  });

  out = out.replace(/[ \t]*<link rel="(?:preconnect|dns-prefetch)" href="https:\/\/images\.unsplash\.com"[^>]*>\r?\n?/gi, '');

  // Social metadata, article schema and CSS heroes describe the current page,
  // so keep them aligned to one page-level image instead of nearby navigation text.
  const pagePath = EDITORIAL + topics[pageTopic].file;
  out = out.replace(/(<meta\b[^>]*(?:property="og:image"|name="twitter:image")[^>]*content=")https:\/\/vitalhealthhub\.org\/images\/editorial\/[^"?]+(")/gi, `$1${ORIGIN}${pagePath}$2`);
  out = out.replace(/("image":\{"@type":"ImageObject","url":")https:\/\/vitalhealthhub\.org\/images\/editorial\/[^"?]+(")/g, `$1${ORIGIN}${pagePath}$2`);
  out = out.replace(/(--bp-bg:url\(['"]?)\/images\/editorial\/[^'"\)]+(['"]?\))/gi, `$1${pagePath}$2`);

  out = out.replace(/<img\b[^>]*src="\/images\/editorial\/([^"?]+)"[^>]*>/gi, (tag, filename) => {
    const topic = topicFor(tag + ' ' + relative + ' ' + pageTitle);
    let next = tag.replace(/src="\/images\/editorial\/[^"?]+"/i, `src="${EDITORIAL}${topics[topic].file}"`);
    const altMatch = next.match(/\balt="([^"]*)"/i);
    if (!altMatch) next = next.replace(/>$/, ` alt="${escapeAttribute(topics[topic].alt)}">`);
    const finalAlt = (next.match(/\balt="([^"]*)"/i) || [,''])[1];
    if (!/\btitle=/i.test(next)) {
      const title = finalAlt.replace(/\s*\|\s*VitalHealth Hub\s*$/i, '').trim() || topics[topic].alt;
      next = next.replace(/>$/, ` title="${escapeAttribute(title)}">`);
    }
    const widthMatch = next.match(/\bwidth="(\d+)"/i);
    const width = widthMatch ? Number(widthMatch[1]) : 1200;
    const height = Math.round(width * 9 / 16);
    if (widthMatch) next = next.replace(/\bheight="\d+"/i, `height="${height}"`);
    else next = next.replace(/>$/, ` width="1200" height="675">`);
    return next;
  });

  out = out.replace(/("image":\{"@type":"ImageObject","url":"https:\/\/vitalhealthhub\.org\/images\/editorial\/[^"]+","width":1200,"height":)630/g, '$1' + '675');
  return out;
}

let filesChanged = 0;
let referencesReplaced = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, 'utf8');
  const count = (before.match(UNSPLASH) || []).length;
  const after = transform(file, before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    filesChanged++;
    referencesReplaced += count;
  }
}

console.log(`Localized ${referencesReplaced} editorial references across ${filesChanged} HTML files.`);
