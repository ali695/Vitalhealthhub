#!/usr/bin/env node
/**
 * Builds the two trust pages the site was missing, and links them from every footer.
 *
 * M7 in the August 2026 audit: for Your-Money-Your-Life health content Google's
 * quality rater guidelines look for demonstrated expertise, a named accountable
 * author, and a visible process. The site had a medical disclaimer and roughly three
 * authority citations per article -- a good base -- but no author page, no stated
 * editorial process, and a bare "Ali Haider" byline with no credentials behind it.
 *
 * This generates:
 *   /editorial-policy  -- how articles are researched, sourced, updated and corrected
 *   /author/ali-haider -- a real bio page with Person schema and sameAs links
 *
 * Deliberately NOT generated: any "Medically reviewed by" claim. Nothing on this site
 * has been clinically reviewed yet, and inventing a reviewer on YMYL health content is
 * precisely the fabrication those guidelines exist to catch. Once a licensed reviewer
 * is engaged, fill content/medical-reviewers.json and run scripts/apply-medical-review.js.
 *
 * The page shell (head, nav, footer) is lifted from disclaimer.html so these pages can
 * never drift from the rest of the site.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = path.join(ROOT, 'disclaimer.html');
const SITE = 'https://vitalhealthhub.org';

const shell = fs.readFileSync(TEMPLATE, 'utf8');
const eol = shell.includes('\r\n') ? '\r\n' : '\n';

const headEnd = shell.indexOf('</head>');
const bodyStart = shell.indexOf('<body>');
const breadcrumbStart = shell.indexOf('<div class="breadcrumbs">');
const mainStart = shell.indexOf('<section class="content-page"');
const mainEnd = shell.indexOf('</section>', mainStart) + '</section>'.length;

if ([headEnd, bodyStart, breadcrumbStart, mainStart].some((i) => i < 0)) {
  throw new Error('Could not locate the page shell landmarks in disclaimer.html');
}

const headOpen = shell.slice(0, shell.indexOf('<title>'));
const headTail = shell.slice(shell.indexOf('</title>') + '</title>'.length, headEnd);
const chrome = shell.slice(bodyStart, breadcrumbStart); // <body> through the end of <nav>
const tail = shell.slice(mainEnd); // footer, scripts, </html>

/** Strip the per-page bits out of the shared <head> so each page supplies its own. */
function headFor({ title, description, urlPath }) {
  const canonical = `${SITE}${urlPath}`;
  let head = headTail
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
    .replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${description}">`
    )
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`)
    .replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${description}">`
    );
  return headOpen + `<title>${title}</title>` + head;
}

function breadcrumb(name, urlPath) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SITE}${urlPath}` }
    ]
  };
  return (
    `<div class="breadcrumbs"><div class="breadcrumbs-inner"><a href="/">Home</a><span>/</span><span>${name}</span></div></div>` +
    eol +
    `<script type="application/ld+json">${JSON.stringify(json)}</script>`
  );
}

function assemble({ title, description, urlPath, crumb, schema, body }) {
  return [
    headFor({ title, description, urlPath }),
    '</head>',
    chrome,
    breadcrumb(crumb, urlPath),
    schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : '',
    '<section class="content-page" id="main-content" tabindex="-1">',
    '<div class="container" style="max-width:820px;">',
    body,
    '</div>',
    '</section>',
    tail
  ]
    .filter(Boolean)
    .join(eol);
}

// ── /editorial-policy ────────────────────────────────────────────────────────

const editorialBody = `<h1 class="fade-in">Editorial Policy</h1>
<p class="page-lead">How the guides and calculators on VitalHealth Hub are researched, written, checked and kept current, and what we do not claim.</p>
<div class="disclaimer-box" style="margin-bottom:30px;"><strong>In short:</strong> everything here is general health education, sourced from public health bodies and peer-reviewed research. It is not a substitute for advice from a clinician who knows your history.</div>

<h2>Who writes this site</h2>
<p>VitalHealth Hub is written and edited by <a href="/author/ali-haider">Ali Haider</a>, the site's founder. He is a search and health-content specialist, not a physician or dietitian. That distinction matters on health topics, so it is stated on the author page and here rather than buried.</p>
<p>What that means in practice: articles explain what published guidance says and where it came from. They do not diagnose, they do not prescribe, and they do not present the author's judgement as clinical opinion.</p>

<h2>Where the information comes from</h2>
<p>Each guide is built from primary and institutional sources rather than from other blogs. The sources used most often are:</p>
<ul>
<li>The National Institutes of Health and its constituent institutes, including MedlinePlus and PubMed-indexed research</li>
<li>The U.S. Department of Health and Human Services physical activity and dietary guidelines at health.gov</li>
<li>The Compendium of Physical Activities for MET and energy-expenditure values</li>
<li>The World Health Organization and the Centers for Disease Control and Prevention for population-level definitions and thresholds</li>
</ul>
<p>Citations appear inline in the article they support, linking to the source rather than to a summary of it, so you can check the claim yourself.</p>

<h2>How the calculators work</h2>
<p>Every calculator implements a published, named formula, and the article around it says which one. Where several competing equations exist, for example Mifflin-St Jeor against Harris-Benedict for resting metabolic rate, the page names the one in use and explains why.</p>
<p>Calculator formulas are covered by an automated test suite that checks the arithmetic against known-good reference values on every build. This catches regressions; it does not make an estimate right for any individual. Population equations carry real error bars, and the pages say so.</p>

<h2>What we do not do</h2>
<ul>
<li>We do not publish "medically reviewed" on anything a clinician has not actually reviewed.</li>
<li>We do not accept payment to feature, recommend or rank a product, supplement or service.</li>
<li>We do not use scare framing, miracle claims, or before-and-after imagery to drive clicks.</li>
<li>We do not present calculator output as a diagnosis, and we do not ask you to create an account to see your result.</li>
</ul>

<h2>Reviewing and updating</h2>
<p>Articles carry a visible last-updated date, and that date changes only when the content itself changes, never as a freshness signal on its own. Guides are revisited when the underlying guidance is revised, when a cited source moves or is withdrawn, or when a reader reports a problem.</p>
<p>Clinical review is the next step for this site. When a licensed reviewer is in place, reviewed articles will carry that reviewer's name, credential and review date in the byline and in structured data, and unreviewed articles will not.</p>

<h2>Corrections</h2>
<p>If something here is wrong, we want to fix it rather than defend it. Email <a href="mailto:contact@vitalhealthhub.org">contact@vitalhealthhub.org</a> or use the <a href="/contact">contact form</a> with the page and the problem. Substantive corrections are made to the article and reflected in its updated date.</p>

<h2>Independence and funding</h2>
<p>The site is independently owned and run. Health guidance is written first and is not adjusted to suit any commercial arrangement. If advertising or affiliate links are introduced, they will be disclosed on the page they appear on and will not influence what the guidance says.</p>

<h2>Privacy of what you enter</h2>
<p>Calculators and trackers run entirely in your browser. Figures you type into a calculator are not transmitted to a server, and tracker data stays in your own browser's local storage. See the <a href="/privacy">privacy policy</a> for the full detail.</p>

<p>Related: <a href="/disclaimer">medical disclaimer</a>, <a href="/about">about VitalHealth Hub</a>, <a href="/author/ali-haider">about the author</a>.</p>`;

const editorialSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Editorial Policy',
  url: `${SITE}/editorial-policy`,
  description:
    'How VitalHealth Hub researches, sources, reviews and corrects its health guides and calculators.',
  isPartOf: { '@type': 'WebSite', name: 'VitalHealth Hub', url: SITE },
  publisher: {
    '@type': 'Organization',
    name: 'VitalHealth Hub',
    url: SITE,
    email: 'contact@vitalhealthhub.org',
    logo: { '@type': 'ImageObject', url: `${SITE}/images/logo.png`, width: 946, height: 283 }
  }
};

// ── /author/ali-haider ───────────────────────────────────────────────────────

const authorBody = `<h1 class="fade-in">Ali Haider</h1>
<p class="page-lead">Founder and editor, VitalHealth Hub. Search and health-content specialist.</p>
<div class="disclaimer-box" style="margin-bottom:30px;"><strong>Not a medical professional.</strong> Ali is not a physician, dietitian or nurse. He writes health education sourced from public health bodies and peer-reviewed research, and the articles say where every claim comes from. For advice about your own health, speak to a clinician who knows your history.</div>

<h2>Background</h2>
<p>Ali Haider built VitalHealth Hub to do one thing properly: answer a specific health question in plain language, show the source, and let you leave. No sign-up wall, no newsletter interstitial, no calculator that withholds your result until you hand over an email address.</p>
<p>His working background is in search and content strategy, which is why the site is structured the way it is: one clear question per page, formulas named rather than hidden, and citations that link to the primary source instead of to another blog summarising it.</p>

<h2>What he writes about</h2>
<ul>
<li>Body composition and weight metrics, including what BMI does and does not measure</li>
<li>Energy balance: resting metabolic rate, total daily energy expenditure, and where the common equations disagree</li>
<li>Physical activity guidance and how activity multipliers translate into real calorie needs</li>
<li>Nutrition fundamentals such as fibre, protein and hydration, at the level the public guidelines actually support</li>
<li>Sleep, and the two-way relationship between sleep and mental health</li>
</ul>

<h2>How he works</h2>
<p>Every guide starts from the primary source. Claims trace back to the NIH, health.gov, the WHO, the CDC or the Compendium of Physical Activities, and the link in the article goes to that source directly. Calculator formulas are named on the page and tested against published reference values on every build.</p>
<p>Where the evidence is genuinely uncertain or contested, the article says so rather than picking the more confident-sounding answer. The full process is set out in the <a href="/editorial-policy">editorial policy</a>.</p>

<h2>On clinical review</h2>
<p>Health content carries a duty that ordinary content does not. Nothing on this site is presented as clinically reviewed, because it has not been, and adding that label without a reviewer behind it would be a lie that happens to rank well. Bringing in a licensed reviewer is the site's current priority; when that is in place, reviewed articles will name the reviewer and their credential and unreviewed ones will remain unlabelled.</p>

<h2>Contact</h2>
<p>Corrections, questions and collaboration: <a href="mailto:contact@vitalhealthhub.org">contact@vitalhealthhub.org</a>, or the <a href="/contact">contact form</a>. Corrections are welcome and get made.</p>

<div class="creator-social" style="margin-top:24px;">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer me">LinkedIn</a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer me">Facebook</a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer me">Instagram</a>
</div>`;

const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE}/author/ali-haider`,
  mainEntity: {
    '@type': 'Person',
    '@id': `${SITE}/author/ali-haider#person`,
    name: 'Ali Haider',
    url: `${SITE}/author/ali-haider`,
    jobTitle: 'Founder and Editor',
    description:
      'Founder and editor of VitalHealth Hub. Search and health-content specialist writing evidence-sourced health education. Not a licensed medical professional.',
    email: 'contact@vitalhealthhub.org',
    knowsAbout: [
      'Body mass index',
      'Basal metabolic rate',
      'Total daily energy expenditure',
      'Physical activity guidelines',
      'Nutrition fundamentals',
      'Sleep and mental health'
    ],
    worksFor: { '@type': 'Organization', name: 'VitalHealth Hub', url: SITE },
    sameAs: [
      'https://www.linkedin.com/in/ali-haider-seo-consultant/',
      'https://www.facebook.com/AliHadi768',
      'https://www.instagram.com/ali_haiderseo/'
    ]
  }
};

// ── write ────────────────────────────────────────────────────────────────────

const pages = [
  {
    file: path.join(ROOT, 'editorial-policy.html'),
    html: assemble({
      title: 'Editorial Policy | VitalHealth Hub',
      description:
        'How VitalHealth Hub researches, sources, tests and corrects its health guides and calculators, and what it does not claim.',
      urlPath: '/editorial-policy',
      crumb: 'Editorial Policy',
      schema: editorialSchema,
      body: editorialBody
    })
  },
  {
    file: path.join(ROOT, 'author', 'ali-haider.html'),
    html: assemble({
      title: 'Ali Haider, Founder and Editor | VitalHealth Hub',
      description:
        'Ali Haider founded and edits VitalHealth Hub. Background, what he writes about, how sources are chosen, and why nothing here claims clinical review.',
      urlPath: '/author/ali-haider',
      crumb: 'Ali Haider',
      schema: authorSchema,
      body: authorBody
    })
  }
];

fs.mkdirSync(path.join(ROOT, 'author'), { recursive: true });

const written = [];
for (const page of pages) {
  fs.writeFileSync(page.file, page.html);
  written.push(path.relative(ROOT, page.file).split(path.sep).join('/'));
}

console.log(JSON.stringify({ written }, null, 2));
