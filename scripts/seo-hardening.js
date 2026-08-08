#!/usr/bin/env node
/**
 * Idempotent sitewide SEO / accessibility / performance normaliser.
 *
 * Applies the fixes from the August 2026 technical audit that span every page:
 *   H3  replace the personal Gmail with the domain address
 *   M5  strip <meta name="keywords"> (ignored by Google, spam signal for Bing)
 *   M4  drop preconnects to hosts nothing is loaded from, preconnect the host that is
 *   M6  give every <button> an explicit type so it cannot submit a form by accident
 *   M6  demote the nav mega-menu <h4>s so the document outline starts at <h1>
 *   M3  intrinsic width/height, decoding and loading hints on the logo images
 *   M3  fetchpriority on the eager above-the-fold hero image (LCP)
 *
 * Safe to run repeatedly; every rule is a no-op once applied.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.runtime', 'uploads', 'scripts']);

const OLD_EMAIL = 'ma7122671@gmail.com';
const NEW_EMAIL = 'contact@vitalhealthhub.org';

const LOGO_WIDTH = 946;
const LOGO_HEIGHT = 283;

const DEAD_PRECONNECTS = [
  /[ \t]*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"[^>]*>\r?\n?/g,
  /[ \t]*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com"[^>]*>\r?\n?/g,
  /[ \t]*<link rel="preconnect" href="https:\/\/www\.googletagmanager\.com"[^>]*>\r?\n?/g,
  /[ \t]*<link rel="dns-prefetch" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\n?/g
];

const UNSPLASH_HINTS = [
  '<link rel="preconnect" href="https://images.unsplash.com" crossorigin>',
  '<link rel="dns-prefetch" href="https://images.unsplash.com">'
];

// Both fonts are now served from our own origin, so preloading them starts the
// download in parallel with style.css instead of waiting for it to be parsed.
const FONT_PRELOADS = [
  '<link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>',
  '<link rel="preload" href="/fonts/playfair-display-latin.woff2" as="font" type="font/woff2" crossorigin>'
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Add an attribute to a tag only when that attribute is absent. */
function ensureAttribute(tag, attribute, value) {
  const present = new RegExp('\\s' + attribute + '\\s*=', 'i');
  if (present.test(tag)) return tag;
  const selfClosing = /\/>$/.test(tag);
  const head = tag.slice(0, selfClosing ? -2 : -1).replace(/\s+$/, '');
  return head + ' ' + attribute + '="' + value + '"' + (selfClosing ? ' />' : '>');
}

const counters = {};
function bump(key, by = 1) {
  counters[key] = (counters[key] || 0) + by;
}

function transform(html) {
  let out = html;
  const eol = html.includes('\r\n') ? '\r\n' : '\n';

  // H3 -- personal Gmail out of markup, mailto: links and JSON-LD alike.
  const emailHits = out.split(OLD_EMAIL).length - 1;
  if (emailHits) {
    out = out.split(OLD_EMAIL).join(NEW_EMAIL);
    bump('emailReplacements', emailHits);
  }

  // M5 -- meta keywords has been dead since 2009 and reads as stuffing.
  out = out.replace(/[ \t]*<meta\s+name="keywords"[^>]*>\r?\n?/gi, () => {
    bump('keywordTagsRemoved');
    return '';
  });

  // M4 -- no Google Font and no GTM container is loaded anywhere on this site.
  for (const pattern of DEAD_PRECONNECTS) {
    out = out.replace(pattern, () => {
      bump('deadPreconnectsRemoved');
      return '';
    });
  }

  // M4 -- Unsplash is the host actually on the critical path for hero imagery.
  if (out.includes('images.unsplash.com') && !out.includes('rel="preconnect" href="https://images.unsplash.com"')) {
    out = out.replace(/(<link rel="stylesheet" href="\/css\/style\.css">)/, (m) => {
      bump('unsplashHintsAdded');
      return UNSPLASH_HINTS.join(eol) + eol + m;
    });
  }

  // M7 -- E-E-A-T. The byline was an unlinked span, and the schema pointed the author
  // at a LinkedIn profile rather than at an author page on the site that ranks. Both
  // now resolve to /author/ali-haider, with LinkedIn kept as a sameAs.
  out = out.replace(
    /<span>&#9998;&nbsp;Ali Haider<\/span>/g,
    () => {
      bump('bylinesLinked');
      return '<span>&#9998;&nbsp;<a href="/author/ali-haider" rel="author">Ali Haider</a></span>';
    }
  );

  out = out.replace(
    /"author":\{"@type":"Person","name":"Ali Haider","url":"https:\/\/www\.linkedin\.com\/in\/ali-haider-seo-consultant\/"/g,
    () => {
      bump('authorSchemaRepointed');
      return '"author":{"@type":"Person","name":"Ali Haider","url":"https://vitalhealthhub.org/author/ali-haider"';
    }
  );

  // Consent Mode v2. consent-defaults.js is deliberately NOT deferred and sits in
  // <head>: the default state has to be registered before any tag could fire, and a
  // deferred script would run too late to deny anything. The banner UI is deferred.
  if (!out.includes('/js/consent-defaults.js')) {
    out = out.replace(/(<link rel="stylesheet" href="\/css\/style\.css">)/, (m) => {
      bump('consentDefaultsAdded');
      return '<script src="/js/consent-defaults.js"></script>' + eol + m;
    });
  }

  // The quiz pages and a couple of index pages never load main.js, so anchor on it
  // when it is there and fall back to the end of <body> when it is not.
  if (!out.includes('/js/consent-banner.js')) {
    const bannerTag = '<script src="/js/consent-banner.js" defer></script>';
    if (/[ \t]*<script src="\/js\/main\.js" defer><\/script>/.test(out)) {
      out = out.replace(/([ \t]*<script src="\/js\/main\.js" defer><\/script>)/, (m) => {
        bump('consentBannerAdded');
        return m + eol + bannerTag;
      });
    } else if (out.includes('</body>')) {
      out = out.replace('</body>', () => {
        bump('consentBannerAdded');
        return bannerTag + eol + '</body>';
      });
    }
  }

  // Consent must be as easy to withdraw as it was to give.
  if (!out.includes('data-consent-open')) {
    out = out.replace('<li><a href="/disclaimer">Medical Disclaimer</a></li>', (m) => {
      bump('consentFooterLinksAdded');
      return m + eol + '<li><a href="#" data-consent-open="1">Cookie Preferences</a></li>';
    });
  }

  // M7 -- the editorial policy has to be reachable from every page to count.
  if (!out.includes('href="/editorial-policy"')) {
    out = out.replace(
      '<li><a href="/disclaimer">Medical Disclaimer</a></li>',
      (m) => {
        bump('editorialPolicyLinksAdded');
        return m + eol + '<li><a href="/editorial-policy">Editorial Policy</a></li>';
      }
    );
  }

  // Open Graph completeness: locale, brand theme colour, and real dimensions for
  // the card so Facebook/LinkedIn/Slack can lay out the preview before fetching it.
  if (!out.includes('property="og:locale"')) {
    out = out.replace(/(<meta property="og:type"[^>]*>)/, (m) => {
      bump('ogLocaleAdded');
      return '<meta property="og:locale" content="en_US">' + eol + m;
    });
  }

  if (!out.includes('name="theme-color"')) {
    out = out.replace(/(<link rel="manifest"[^>]*>)/, (m) => {
      bump('themeColorAdded');
      return m + eol + '<meta name="theme-color" content="#1b4332">';
    });
  }

  out = out.replace(
    /<meta property="og:image" content="https:\/\/vitalhealthhub\.org\/images\/og-default\.jpg">/,
    (m) => {
      if (out.includes('property="og:image:width"')) return m;
      bump('ogImageDimensionsAdded');
      return (
        m +
        eol +
        '<meta property="og:image:width" content="1200">' +
        eol +
        '<meta property="og:image:height" content="630">' +
        eol +
        '<meta property="og:image:alt" content="VitalHealth Hub - free health calculators and evidence-based guides">'
      );
    }
  );

  // M1/M4 -- preload the self-hosted fonts ahead of the stylesheet that uses them.
  if (!out.includes('href="/fonts/dm-sans-latin.woff2"')) {
    out = out.replace(/(<link rel="stylesheet" href="\/css\/style\.css">)/, (m) => {
      bump('fontPreloadsAdded');
      return FONT_PRELOADS.join(eol) + eol + m;
    });
  }

  // Collapse the blank lines left behind by the removals above so <head> stays tidy.
  out = out.replace(/<head>[\s\S]*?<\/head>/i, (head) => head.replace(/(\r?\n)(?:[ \t]*\r?\n)+/g, '$1'));

  // M6 -- an untyped <button> defaults to type=submit and fires stray submits.
  out = out.replace(/<button(\s[^>]*)?>/gi, (tag) => {
    const typed = ensureAttribute(tag, 'type', 'button');
    if (typed !== tag) bump('buttonTypesAdded');
    return typed;
  });

  // M6 -- the mega-menu emitted four <h4>s before the page <h1>, breaking the
  // outline for screen readers and confusing Google's content hierarchy.
  out = out.replace(/<h4 class="mega-col-title"([^>]*)>([\s\S]*?)<\/h4>/g, (_m, attrs, inner) => {
    bump('megaMenuHeadingsDemoted');
    return '<div class="mega-col-title"' + attrs + '>' + inner + '</div>';
  });

  // M3 -- logo images carried no intrinsic size, so every page shifted on load.
  out = out.replace(/<img\s[^>]*class="nav-logo-img"[^>]*>/gi, (tag) => {
    let next = ensureAttribute(tag, 'width', String(LOGO_WIDTH));
    next = ensureAttribute(next, 'height', String(LOGO_HEIGHT));
    next = ensureAttribute(next, 'decoding', 'async');
    if (next !== tag) bump('navLogosFixed');
    return next;
  });

  out = out.replace(/<img\s[^>]*class="footer-logo-img2"[^>]*>/gi, (tag) => {
    let next = ensureAttribute(tag, 'width', String(LOGO_WIDTH));
    next = ensureAttribute(next, 'height', String(LOGO_HEIGHT));
    next = ensureAttribute(next, 'loading', 'lazy');
    next = ensureAttribute(next, 'decoding', 'async');
    if (next !== tag) bump('footerLogosFixed');
    return next;
  });

  // M3 -- decoding=async on everything, and fetchpriority on the one eager hero
  // image per page so the LCP candidate is requested ahead of the rest.
  out = out.replace(/<img\s[^>]*>/gi, (tag) => {
    let next = ensureAttribute(tag, 'decoding', 'async');
    if (next !== tag) bump('decodingHintsAdded');
    if (/\sloading="eager"/i.test(next)) {
      const withPriority = ensureAttribute(next, 'fetchpriority', 'high');
      if (withPriority !== next) bump('heroPriorityHintsAdded');
      next = withPriority;
    }
    return next;
  });

  return out;
}

function main() {
  const files = walk(ROOT);
  let changed = 0;

  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const after = transform(before);
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed++;
    }
  }

  console.log(
    JSON.stringify({ htmlFilesScanned: files.length, htmlFilesChanged: changed, ...counters }, null, 2)
  );
}

main();
