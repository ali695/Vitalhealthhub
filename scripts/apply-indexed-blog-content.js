const fs = require('fs');
const path = require('path');
const articles = require('../content/indexed-blog-content');

const root = path.resolve(__dirname, '..');
const modified = '2026-08-07';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceOnce(html, pattern, replacement, label, file) {
  const matches = html.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`));
  if (!matches || matches.length !== 1) {
    throw new Error(`${file}: expected one ${label}, found ${matches ? matches.length : 0}`);
  }
  return html.replace(pattern, replacement);
}

function tocHtml(sections, sidebar = false) {
  return `<ol class="bp-toc-list">${sections.map((section, index) => {
    const extra = sidebar ? ` class="bp-toc-link" data-target="bp-sec-${index}"` : '';
    return `<li><a href="#bp-sec-${index}"${extra}>${index + 1}. ${escapeHtml(section.heading)}</a></li>`;
  }).join('')}</ol>`;
}

function faqHtml(faqs) {
  return `<div class="faq-list">${faqs.map((faq) => `<div class="faq-item"><button class="faq-question">${escapeHtml(faq.question)}<svg viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><div class="faq-answer"><div class="faq-answer-inner">${escapeHtml(faq.answer)}</div></div></div>`).join('')}</div>`;
}

function updateJsonLd(html, type, updater, file) {
  const pattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let count = 0;
  html = html.replace(pattern, (full, json) => {
    let data;
    try { data = JSON.parse(json); } catch { return full; }
    if (data['@type'] !== type) return full;
    count += 1;
    return `<script type="application/ld+json">${JSON.stringify(updater(data))}</script>`;
  });
  if (count !== 1) throw new Error(`${file}: expected one ${type} JSON-LD block, found ${count}`);
  return html;
}

for (const article of articles) {
  const file = path.join(root, article.path);
  let html = fs.readFileSync(file, 'utf8');

  if (!/<meta name="robots" content="index, follow">/i.test(html)) {
    throw new Error(`${article.path}: refusing to edit a page that is not index, follow`);
  }

  const calculatorWidget = html.match(/<div class="calc-embed-widget fade-in">[\s\S]*?<\/div>/)?.[0] || '';
  const body = article.sections.map((section, index) => {
    const widget = index === 3 && calculatorWidget ? `\n${calculatorWidget}` : '';
    return `<h2 id="bp-sec-${index}">${escapeHtml(section.heading)}</h2>\n${section.html}${widget}`;
  }).join('\n');

  const mobileToc = tocHtml(article.sections);
  const sidebarToc = tocHtml(article.sections, true);
  const takeaways = `<ul>${article.takeaways.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const visibleFaq = `<section class="bp-faq-section fade-in">\n<h2>Important FAQs About ${escapeHtml(article.keywords[0])}</h2>\n${faqHtml(article.faqs)}\n</section>`;

  html = replaceOnce(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(article.description)}">`, 'meta description', article.path);
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(article.description)}">`, 'Open Graph description', article.path);
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(article.description)}">`, 'Twitter description', article.path);
  html = replaceOnce(html, /<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${escapeHtml(article.keywords.join(', '))}">`, 'keywords meta', article.path);

  html = updateJsonLd(html, 'BlogPosting', (data) => ({
    ...data,
    description: article.description,
    dateModified: modified,
    keywords: article.keywords.join(', ')
  }), article.path);
  html = updateJsonLd(html, 'FAQPage', (data) => ({
    ...data,
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer.replace(/<[^>]+>/g, '') }
    }))
  }), article.path);

  html = replaceOnce(html, /(<details class="bp-toc-mobile fade-in">[\s\S]*?<summary>[\s\S]*?<\/summary>\s*)<ol class="bp-toc-list">[\s\S]*?<\/ol>(\s*<\/details>)/, `$1${mobileToc}$2`, 'mobile table of contents', article.path);
  html = replaceOnce(html, /(<div class="bp-info-box-title">[\s\S]*?<\/div>\s*)<ul>[\s\S]*?<\/ul>(\s*<\/div>)/, `$1${takeaways}$2`, 'key takeaways', article.path);
  html = replaceOnce(html, /(<!-- Article body -->\s*)[\s\S]*?(\s*<!-- CTA Callout box -->)/, `$1${body}$2`, 'article body', article.path);
  html = replaceOnce(html, /(<!-- FAQ -->\s*)<section class="bp-faq-section fade-in">[\s\S]*?<\/section>/, `$1${visibleFaq}`, 'visible FAQ', article.path);
  html = replaceOnce(html, /(<div class="bp-toc" id="bpToc">[\s\S]*?<\/div>\s*)<ol class="bp-toc-list">[\s\S]*?<\/ol>(\s*<\/div>)/, `$1${sidebarToc}$2`, 'sidebar table of contents', article.path);
  html = html.replace(/<span>Updated 2026<\/span>/, '<span>Updated August 2026</span>');

  fs.writeFileSync(file, html, 'utf8');
}

console.log(`Updated ${articles.length} indexed blog articles without changing their page shells.`);
