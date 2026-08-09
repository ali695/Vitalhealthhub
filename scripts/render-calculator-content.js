#!/usr/bin/env node
/**
 * Renders hand-written page content from content/calculator-content/<slug>.js into the
 * calculator HTML, replacing the templated block.
 *
 * The old block was identical across all 103 calculators: the same "Who Should Use"
 * paragraph word for word, the same "Step 1 - Enter your weight in the weight field"
 * padding. This swaps it for content written to content/CONTENT-STANDARD.md.
 *
 * Also emits FAQPage structured data, which no calculator had, so the FAQs become
 * eligible for rich results instead of being invisible to Google.
 *
 * Only rewrites slugs that have a content module. Calculators without one are left
 * exactly as they are, so this can be rolled out page by page.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'calculator-content');
const CALC_DIR = path.join(ROOT, 'calculators');
const SITE = 'https://vitalhealthhub.org';

const BLOCK_MARKER = '<section class="ccs-section ccs-white">';
const RENDER_MARK = '<!-- content:standard -->';

function tidy(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function escapeJson(value) {
  return tidy(String(value).replace(/<[^>]*>/g, ''));
}

function buildFaqHtml(slug, faqs) {
  const items = faqs
    .map((faq, index) => {
      const id = `${slug}-q${index}`;
      return (
        `<div class="faq-item">` +
        `<button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-a-${id}" id="faq-q-${id}">` +
        `${faq.q}<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>` +
        `</button>` +
        `<div class="faq-answer" id="faq-a-${id}" role="region" aria-labelledby="faq-q-${id}">` +
        `<div class="faq-answer-inner">${faq.a}</div></div></div>`
      );
    })
    .join('');
  return `<h2>Frequently asked questions</h2><div class="faq-list">${items}</div>`;
}

function buildSourcesHtml(sources) {
  const items = sources
    .map(
      (source) =>
        `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a></li>`
    )
    .join('');
  return (
    `<h2>Sources</h2><p class="sources-note">Each source below supports a specific figure on this page.</p>` +
    `<ul class="sources-list">${items}</ul>`
  );
}

function buildBlock(content) {
  const sections = content.sections
    .map((section) => `<h2>${section.h2}</h2>${section.html}`)
    .join('\n');

  return (
    `${BLOCK_MARKER}\n${RENDER_MARK}\n<div class="container">\n<section class="seo-section fade-in">\n` +
    `<div class="calc-answer-box"><p>${tidy(content.answer)}</p></div>\n` +
    `${sections}\n` +
    `${buildFaqHtml(content.slug, content.faqs)}\n` +
    `${buildSourcesHtml(content.sources)}\n` +
    `</section>\n</div>\n</section>`
  );
}

function buildFaqSchema(content, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: escapeJson(faq.q),
      acceptedAnswer: { '@type': 'Answer', text: escapeJson(faq.a) }
    })),
    isPartOf: { '@type': 'WebPage', '@id': url }
  };
}

const modules = fs.existsSync(CONTENT_DIR)
  ? fs.readdirSync(CONTENT_DIR).filter((name) => name.endsWith('.js'))
  : [];

const rendered = [];
const problems = [];

for (const moduleName of modules) {
  const content = require(path.join(CONTENT_DIR, moduleName));
  const slug = content.slug;
  const file = path.join(CALC_DIR, `${slug}.html`);

  if (!fs.existsSync(file)) {
    problems.push(`${slug}: calculators/${slug}.html not found`);
    continue;
  }

  const before = fs.readFileSync(file, 'utf8');

  const start = before.indexOf(BLOCK_MARKER);
  if (start === -1) {
    problems.push(`${slug}: content block marker not found`);
    continue;
  }
  // The templated prose spans SEVERAL consecutive ccs-white sections ("How to Use",
  // "Who Should Use", "Common Mistakes", "Tips", the old FAQ). Replacing only the
  // first leaves the boilerplate and a second, duplicate FAQ behind. So consume every
  // block up to the "Related Calculators" section, which is real internal linking and
  // must survive.
  const relatedAt = before.indexOf('Related Calculators');
  if (relatedAt === -1) {
    problems.push(`${slug}: could not find the Related Calculators section to stop at`);
    continue;
  }
  let next = -1;
  let cursor = start;
  while (true) {
    const candidate = before.indexOf(BLOCK_MARKER, cursor + BLOCK_MARKER.length);
    if (candidate === -1 || candidate > relatedAt) break;
    next = candidate;
    cursor = candidate;
  }
  if (next === -1) {
    problems.push(`${slug}: could not find the end of the content block`);
    continue;
  }

  let html = before.slice(0, start) + buildBlock(content) + '\n\n' + before.slice(next);

  // FAQPage structured data, replacing any previous render.
  const url = `${SITE}/calculators/${slug}`;
  html = html.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>\s*/g, '');
  const schemaTag = `<script type="application/ld+json">${JSON.stringify(buildFaqSchema(content, url))}</script>`;
  html = html.replace('</head>', `${schemaTag}\n</head>`);

  if (html !== before) {
    fs.writeFileSync(file, html);
    const words = buildBlock(content).replace(/<[^>]*>/g, ' ').match(/[A-Za-z0-9']+/g) || [];
    rendered.push({ slug, words: words.length, faqs: content.faqs.length, sources: content.sources.length });
  }
}

console.log(JSON.stringify({ modulesFound: modules.length, rendered, problems }, null, 2));
if (problems.length) process.exit(1);
