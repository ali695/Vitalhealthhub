const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const roots = ['', 'blog', 'calculators', 'quizzes', 'tools'];
const files = roots.flatMap((dir) => {
  const full = path.join(root, dir);
  return fs.readdirSync(full, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => path.join(full, entry.name));
});

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'));
  return match ? match[1] : '';
}

function addAttr(tag, name, value) {
  if (new RegExp(`\\s${name}=`, 'i').test(tag)) return tag;
  return tag.replace(/>$/, ` ${name}="${value}">`);
}

function labelFrom(tag, fallback) {
  const raw = attr(tag, 'placeholder') || attr(tag, 'name') || attr(tag, 'id') || fallback;
  return raw.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/^./, (c) => c.toUpperCase());
}

function normalize(file) {
  let html = fs.readFileSync(file, 'utf8');

  // FAQ rich results are intentionally omitted. The visible, useful FAQ content remains.
  html = html.replace(/\s*<script\s+type=["']application\/ld\+json["']>\s*([\s\S]*?)<\/script>/gi, (block, json) => {
    try { return JSON.parse(json)['@type'] === 'FAQPage' ? '' : block; } catch { return block; }
  });

  // Non-health utilities must not identify themselves as HealthApplication.
  if (/calculators[\\/](password-generator|loan-emi-calculator|tip-calculator|percentage-calculator|random-number-generator|text-counter|date-difference-calculator|countdown-timer|birthday-calculator|age-in-days-calculator|age-calculator|pomodoro-calculator)\.html$/i.test(file)) {
    html = html.replace(/"applicationCategory"\s*:\s*"HealthApplication"/g, '"applicationCategory":"UtilitiesApplication"');
  }

  if (!/class=["'][^"']*skip-link/i.test(html)) {
    html = html.replace(/(<body[^>]*>)/i, '$1\n<a class="skip-link" href="#main-content">Skip to main content</a>');
  }
  if (!/id=["']main-content["']/i.test(html)) {
    html = html.replace(/<(main|section)(\s[^>]*)?>/i, (tag) => addAttr(tag, 'id', 'main-content').replace(/>$/, ' tabindex="-1">'));
    if (!/id=["']main-content["']/i.test(html)) html = html.replace(/<body([^>]*)>/i, '<body$1><div id="main-content" tabindex="-1">').replace(/<\/body>/i, '</div></body>');
  }

  html = html.replace(/<button\b[^>]*class=["'][^"']*hamburger[^"']*["'][^>]*>/gi, (tag) => {
    tag = addAttr(tag, 'aria-expanded', 'false');
    tag = addAttr(tag, 'aria-controls', 'primary-navigation');
    return tag;
  });
  html = html.replace(/<ul\b[^>]*class=["'][^"']*nav-links[^"']*["'][^>]*>/i, (tag) => addAttr(tag, 'id', 'primary-navigation'));
  html = html.replace(/<[^>]+class=["'][^"']*nav-dropdown-trigger[^"']*["'][^>]*>/gi, (tag) => addAttr(addAttr(tag, 'aria-expanded', 'false'), 'aria-haspopup', 'true'));
  html = html.replace(/<[^>]+class=["'][^"']*mega-col-title[^"']*["'][^>]*>/gi, (tag) => addAttr(addAttr(addAttr(tag, 'role', 'button'), 'tabindex', '0'), 'aria-expanded', 'false'));
  html = html.replace(/<button\b[^>]*id=["']vh-chat-toggle["'][^>]*>/gi, (tag) => addAttr(addAttr(tag, 'aria-expanded', 'false'), 'aria-controls', 'vh-chat-window'));
  html = html.replace(/<button\b[^>]*id=["']vh-chat-minimize["'][^>]*>/gi, (tag) => addAttr(tag, 'aria-label', 'Minimize health assistant'));
  html = html.replace(/<button\b[^>]*id=["']vh-chat-send["'][^>]*>/gi, (tag) => addAttr(tag, 'aria-label', 'Send health question'));
  html = html.replace(/<input\b[^>]*id=["']vh-chat-input["'][^>]*>/gi, (tag) => addAttr(tag, 'aria-label', 'Health assistant question'));
  html = html.replace(/<div\b[^>]*id=["']vh-chat-messages["'][^>]*>/gi, (tag) => addAttr(addAttr(tag, 'role', 'log'), 'aria-live', 'polite'));
  html = html.replace(/<[^>]+class=["'][^"']*result-box[^"']*["'][^>]*>/gi, (tag) => addAttr(addAttr(tag, 'role', 'status'), 'aria-live', 'polite'));

  html = html.replace(/<div\b[^>]*id=["']blogSearchOverlay["'][^>]*>/gi, (tag) => {
    tag = addAttr(tag, 'role', 'dialog');
    tag = addAttr(tag, 'aria-modal', 'true');
    tag = addAttr(tag, 'aria-label', 'Search health articles');
    return addAttr(tag, 'aria-hidden', 'true');
  });
  html = html.replace(/<input\b[^>]*id=["']blogSearchInput["'][^>]*>/gi, (tag) => addAttr(tag, 'aria-label', 'Search health articles'));
  html = html.replace(/<[^>]+id=["']blogSearchResults["'][^>]*>/gi, (tag) => addAttr(addAttr(tag, 'role', 'status'), 'aria-live', 'polite'));

  // Give FAQ disclosure buttons and panels unique, matching relationships.
  const faqIds = [];
  let faqIndex = 0;
  html = html.replace(/<button\b[^>]*class=["'][^"']*faq-question[^"']*["'][^>]*>/gi, (tag) => {
    faqIndex += 1;
    const id = `faq-answer-${path.basename(file, '.html').replace(/[^a-z0-9]+/gi, '-')}-${faqIndex}`;
    faqIds.push(id);
    tag = tag.replace(/\saria-(expanded|controls)=["'][^"']*["']/gi, '');
    return addAttr(addAttr(tag, 'aria-expanded', 'false'), 'aria-controls', id);
  });
  let answerIndex = 0;
  html = html.replace(/<div\b[^>]*class=["'][^"']*faq-answer-inner[^"']*["'][^>]*>/gi, (tag) => tag.replace(/\sid=["'][^"']*["']/i, ''));
  html = html.replace(/<div\b[^>]*class=["'][^"']*["'][^>]*>/gi, (tag) => {
    if (!attr(tag, 'class').split(/\s+/).includes('faq-answer')) return tag;
    const id = faqIds[answerIndex++];
    if (!id) return tag;
    tag = tag.replace(/\sid=["'][^"']*["']/i, '');
    return addAttr(tag, 'id', id);
  });

  // Add a usable accessible name when no explicit name is present.
  html = html.replace(/<(input|select|textarea)\b[^>]*>/gi, (tag) => {
    if (/\s(aria-label|aria-labelledby)=/i.test(tag)) return tag;
    const id = attr(tag, 'id');
    if (id && new RegExp(`<label[^>]+for=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(html)) return tag;
    return addAttr(tag, 'aria-label', labelFrom(tag, 'Input'));
  });

  // Prevent skipped levels in the document's primary content outline.
  const footerAt = html.search(/<footer\b/i);
  let seenH1 = false;
  let previousLevel = 0;
  let openHeadingLevel = 0;
  html = html.replace(/<\/?h([1-6])\b[^>]*>/gi, (tag, rawLevel, offset) => {
    if (footerAt >= 0 && offset >= footerAt) return tag;
    const closing = /^<\//.test(tag);
    const level = Number(rawLevel);
    if (!closing) {
      if (level === 1) { seenH1 = true; previousLevel = 1; openHeadingLevel = 1; return tag; }
      if (!seenH1) return tag;
      const fixed = level > previousLevel + 1 ? previousLevel + 1 : level;
      previousLevel = fixed;
      openHeadingLevel = fixed;
      return fixed === level ? tag : tag.replace(new RegExp(`^<h${level}`, 'i'), `<h${fixed}`);
    }
    if (!openHeadingLevel) return tag;
    const fixed = openHeadingLevel;
    openHeadingLevel = 0;
    return fixed === level ? tag : tag.replace(new RegExp(`^</h${level}`, 'i'), `</h${fixed}`);
  });

  fs.writeFileSync(file, html, 'utf8');
}

files.forEach(normalize);
console.log(`Normalized accessibility and structured data in ${files.length} HTML files.`);
