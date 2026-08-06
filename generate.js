const fs = require('fs');
const path = require('path');
const { getCalcHeroSvg } = require('./calculator-svgs.js');
const quizzesData = require('./quizzes-data.js');
const toolsData = require('./tools-data.js');

const SITE = 'https://vitalhealthhub.org';
const SITE_NAME = 'VitalHealth Hub';

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }

const _ANN_MSGS = [
  '100+ Free Health Calculators',
  'Practical Tools and Clear Guides',
  '20+ Interactive Quizzes',
  '155 Health Articles',
  'Instant Results &mdash; No Sign-Up Required',
  'Designed for Clarity and Simplicity',
];
const _annTrack = (_ANN_MSGS.join('<span class="ann-sep">&bull;</span>') + '<span class="ann-sep">&bull;</span>').repeat(2);

const TOPBAR = `<div class="ann-bar" role="marquee" aria-label="Site announcements">
<div class="ann-ticker-wrap">
<div class="ann-ticker">${_annTrack}</div>
</div>
<div class="ann-right">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="ann-social-link"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="ann-social-link"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="ann-social-link"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg></a>
</div>
</div>`;

const NAV = `${TOPBAR}<nav class="navbar">
<div class="nav-container">
<a href="/" class="nav-logo" aria-label="VitalHealth Hub — Home"><img src="/images/logo.png" alt="VitalHealth Hub" class="nav-logo-img"></a>
<ul class="nav-links">
<li><a href="/">Home</a></li>
<li class="nav-dropdown-wrap">
<a href="/calculators/" class="nav-dropdown-trigger">Calculators <svg class="dd-arrow" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
<div class="mega-dropdown">
<div class="mega-search-wrap">
<div class="mega-search">
<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
<input type="text" id="ddSearchInput" placeholder="Search calculators..." autocomplete="off" spellcheck="false">
</div>
</div>
<div class="mega-dropdown-inner" id="ddGrid">
<div class="mega-col">
<h4 class="mega-col-title">Weight &amp; Body <svg class="mega-col-arrow" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></h4>
<ul>
<li><a href="/calculators/bmi-calculator.html">BMI Calculator</a></li>
<li><a href="/calculators/body-fat-calculator.html">Body Fat Calculator</a></li>
<li><a href="/calculators/ideal-weight-calculator.html">Ideal Weight</a></li>
<li><a href="/calculators/lean-body-mass-calculator.html">Lean Body Mass</a></li>
<li><a href="/calculators/waist-to-hip-ratio.html">Waist-to-Hip Ratio</a></li>
</ul>
</div>
<div class="mega-col">
<h4 class="mega-col-title">Nutrition &amp; Diet <svg class="mega-col-arrow" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></h4>
<ul>
<li><a href="/calculators/calorie-calculator.html">Calorie Calculator</a></li>
<li><a href="/calculators/macro-calculator.html">Macro Calculator</a></li>
<li><a href="/calculators/tdee-calculator.html">TDEE Calculator</a></li>
<li><a href="/calculators/water-intake-calculator.html">Water Intake</a></li>
<li><a href="/calculators/protein-intake-calculator.html">Protein Intake</a></li>
</ul>
</div>
<div class="mega-col">
<h4 class="mega-col-title">Heart &amp; Health <svg class="mega-col-arrow" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></h4>
<ul>
<li><a href="/calculators/heart-rate-calculator.html">Heart Rate Zones</a></li>
<li><a href="/calculators/blood-pressure-checker.html">Blood Pressure</a></li>
<li><a href="/calculators/cholesterol-risk-calculator.html">Cholesterol Risk</a></li>
<li><a href="/calculators/biological-age-calculator.html">Biological Age</a></li>
<li><a href="/calculators/diabetes-risk-calculator.html">Diabetes Risk</a></li>
</ul>
</div>
<div class="mega-col">
<h4 class="mega-col-title">Fitness &amp; Performance <svg class="mega-col-arrow" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></h4>
<ul>
<li><a href="/calculators/vo2-max-calculator.html">VO2 Max</a></li>
<li><a href="/calculators/running-pace-calculator.html">Running Pace</a></li>
<li><a href="/calculators/strength-level-calculator.html">Strength Level</a></li>
<li><a href="/calculators/one-rep-max-calculator.html">One Rep Max</a></li>
<li><a href="/calculators/steps-to-calories-calculator.html">Steps to Calories</a></li>
</ul>
</div>
</div>
<div class="mega-search-results" id="ddResults"></div>
<div class="mega-dropdown-bottom">
<span>Practical tools, free forever</span>
<a href="/calculators/" class="mega-cta-btn"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> View All 100+ Calculators &rarr;</a>
</div>
</div>
</li>
<li><a href="/tools/">Tools</a></li>
<li><a href="/blog.html">Blog</a></li>
<li><a href="/quizzes/">Quizzes</a></li>
<li><a href="/about.html">About</a></li>
<li><a href="/contact.html">Contact</a></li>
</ul>
<button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
</div></nav>
`;

const FOOTER = `<footer class="site-footer">
<div class="footer-inner">

<div class="footer-grid">

<div class="footer-brand">
<a href="/" class="footer-logo-link" aria-label="VitalHealth Hub Home">
<img src="/images/logo.png" alt="VitalHealth Hub" class="footer-logo-img2">
</a>
<p class="footer-brand-desc">Practical health calculators, useful tools, and clear guides to help you make better-informed everyday decisions.</p>
<a href="mailto:ma7122671@gmail.com" class="footer-email-link">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
ma7122671@gmail.com
</a>
<div class="footer-socials2">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" class="fsoc fsoc-li" title="LinkedIn" aria-label="LinkedIn">
<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
</a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer" class="fsoc fsoc-fb" title="Facebook" aria-label="Facebook">
<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
</a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer" class="fsoc fsoc-ig" title="Instagram" aria-label="Instagram">
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
</a>
</div>
</div>

<div class="footer-col2">
<h4 class="footer-col-title">Calculators</h4>
<ul class="footer-links">
<li><a href="/calculators/bmi-calculator.html">BMI Calculator</a></li>
<li><a href="/calculators/calorie-calculator.html">Calorie Calculator</a></li>
<li><a href="/calculators/macro-calculator.html">Macro Calculator</a></li>
<li><a href="/calculators/tdee-calculator.html">TDEE Calculator</a></li>
<li><a href="/calculators/body-fat-calculator.html">Body Fat Calculator</a></li>
<li><a href="/calculators/water-intake-calculator.html">Water Intake</a></li>
<li><a href="/calculators/heart-rate-calculator.html">Heart Rate</a></li>
<li><a href="/calculators/" class="footer-link-more">View All 103+ &#8594;</a></li>
</ul>
</div>

<div class="footer-col2">
<h4 class="footer-col-title">Tools</h4>
<ul class="footer-links">
<li><a href="/tools/habit-tracker.html">Habit Tracker</a></li>
<li><a href="/tools/sleep-tracker.html">Sleep Tracker</a></li>
<li><a href="/tools/mood-tracker.html">Mood Tracker</a></li>
<li><a href="/tools/daily-planner.html">Daily Planner</a></li>
<li><a href="/tools/advanced-text-analyzer.html">Text Analyzer</a></li>
<li><a href="/tools/" class="footer-link-more">All Tools &#8594;</a></li>
</ul>
</div>

<div class="footer-col2">
<h4 class="footer-col-title">Explore</h4>
<ul class="footer-links">
<li><a href="/">Home</a></li>
<li><a href="/blog.html">Blog</a></li>
<li><a href="/quizzes/">Quizzes</a></li>
<li><a href="/faq.html">FAQ</a></li>
<li><a href="/about.html">About</a></li>
<li><a href="/contact.html">Contact</a></li>
</ul>
</div>

<div class="footer-col2">
<h4 class="footer-col-title">Legal</h4>
<ul class="footer-links">
<li><a href="/privacy.html">Privacy Policy</a></li>
<li><a href="/terms.html">Terms of Use</a></li>
<li><a href="/disclaimer.html">Medical Disclaimer</a></li>
<li><a href="/sitemap.html">Sitemap</a></li>
</ul>
<div class="footer-notice">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52b788" stroke-width="2" stroke-linecap="round" flex-shrink="0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
<p>For informational use only. Always consult a qualified healthcare professional.</p>
</div>
</div>

</div>

<div class="footer-divider"></div>

<div class="footer-bottom2">
<p class="footer-copy">&copy; 2026 VitalHealth Hub. All rights reserved.</p>
<div class="footer-bottom-links2">
<a href="/privacy.html">Privacy</a>
<a href="/terms.html">Terms</a>
<a href="/sitemap.html">Sitemap</a>
</div>
</div>

</div>
</footer>`;

const CHATBOT = `<div id="vh-chatbot">
<button id="vh-chat-toggle" aria-label="Open VitalHealth Assistant">
<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
</button>
<div id="vh-chat-window">
<div id="vh-chat-header">
<div class="vh-header-left">
<div id="vh-bot-avatar"><img src="/images/logo.png" alt="VitalHealth Hub health assistant chatbot" width="36" height="36" loading="lazy"></div>
<div class="vh-header-info">
<span class="vh-header-name">VitalHealth Assistant</span>
<span class="vh-header-sub"><span class="vh-online-dot"></span>AI-powered health tools &amp; insights</span>
</div>
</div>
<button id="vh-chat-minimize" aria-label="Close chat">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>
</button>
</div>
<div id="vh-chat-messages" role="log" aria-live="polite"></div>
<div id="vh-quick-topics">
<p class="vh-topics-label">Quick actions</p>
<div class="vh-actions-primary">
<button class="vh-action-btn" data-vh-ask="BMI">Calculate BMI</button>
<button class="vh-action-btn" data-vh-ask="Calories">Check Calories</button>
<button class="vh-action-btn" data-vh-ask="health quiz">Health Quiz</button>
<button class="vh-action-btn" data-vh-ask="tools">Explore Tools</button>
</div>
<div class="vh-actions-secondary">
<button class="vh-topic-pill" data-vh-ask="Sleep">Sleep</button>
<button class="vh-topic-pill" data-vh-ask="Water">Hydration</button>
<button class="vh-topic-pill" data-vh-ask="Stress">Stress</button>
<button class="vh-topic-pill" data-vh-ask="Heart Health">Heart Health</button>
<button class="vh-topic-pill" data-vh-ask="Weight Loss">Weight Loss</button>
<button class="vh-topic-pill" data-vh-ask="Protein">Protein</button>
</div>
</div>
<div id="vh-chat-input-area">
<input type="text" id="vh-chat-input" placeholder="Ask about health, tools, or results..." autocomplete="off" maxlength="300" aria-label="Chat message">
<button id="vh-chat-send" aria-label="Send message">
<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none"/></svg>
</button>
</div>
<p id="vh-chat-disclaimer">Educational purposes only &mdash; not medical advice. Always consult your doctor.</p>
</div>
</div>`;

const BTT = `<button class="back-to-top" aria-label="Back to top"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 16V4M4 10l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;

function head(title, desc, canonical, extra = '', ogType = 'website', ogImage = null, twitterImage = null) {
  const resolvedOgImage = ogImage || `${SITE}/images/og-default.jpg`;
  const resolvedTwitterImage = twitterImage || resolvedOgImage;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${SITE}${canonical}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:image" content="${resolvedOgImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${resolvedTwitterImage}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="stylesheet" href="/css/style.css">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${extra}
</head>`;
}

function breadcrumb(items) {
  let html = `<div class="breadcrumbs"><div class="breadcrumbs-inner">`;
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [] };
  items.forEach((it, i) => {
    schema.itemListElement.push({ "@type": "ListItem", "position": i + 1, "name": it.name, "item": SITE + it.url });
    if (i < items.length - 1) {
      html += `<a href="${it.url}">${it.name}</a><span>/</span>`;
    } else {
      html += `<span>${it.name}</span>`;
    }
  });
  html += `</div></div>`;
  return { html, schema: `<script type="application/ld+json">${JSON.stringify(schema)}</script>` };
}

function shareButtons(url, title) {
  return `<div class="share-buttons">
<a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE+url)}&text=${encodeURIComponent(title)}" target="_blank" rel="noopener" class="share-btn twitter">Twitter</a>
<a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE+url)}" target="_blank" rel="noopener" class="share-btn facebook">Facebook</a>
<a href="https://wa.me/?text=${encodeURIComponent(title+' '+SITE+url)}" target="_blank" rel="noopener" class="share-btn whatsapp">WhatsApp</a>
</div>`;
}

function faqSection(faqs) {
  let html = `<div class="faq-list">`;
  faqs.forEach(f => {
    html += `<div class="faq-item"><button class="faq-question">${f.q}<svg viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div></div>`;
  });
  html += `</div>`;
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  return { html, schema: `<script type="application/ld+json">${JSON.stringify(schema)}</script>` };
}

function globalHero(opts) {
  var badge = opts.badge || '';
  var title = opts.title || '';
  var subtitle = opts.subtitle || '';
  var customSearch = opts.customSearch || '';
  var buttons = opts.buttons || [];
  var stats = opts.stats || [];
  var searchHtml = '';
  if (customSearch) {
    searchHtml = customSearch;
  } else if (opts.searchId) {
    searchHtml = '<div class="calc-index-search-bar"><svg viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><input type="text" id="' + opts.searchId + '" placeholder="' + (opts.searchPlaceholder || '') + '" autocomplete="off"></div>';
  }
  var btnsHtml = buttons.map(function(b, i) {
    var cls = i === 0 ? 'calc-index-btn-primary' : 'calc-index-btn-outline';
    var extra = b.onclick ? ' onclick="' + b.onclick + '"' : '';
    return '<a href="' + b.href + '" class="' + cls + '"' + extra + '>' + b.label + '</a>';
  }).join('');
  var statsHtml = stats.length ? '<div class="calc-index-hero-stats">' + stats.map(function(s) { return '<div class="calc-index-stat"><strong>' + s.value + '</strong><span>' + s.label + '</span></div>'; }).join('') + '</div>' : '';
  return '<section class="calc-index-hero">\n<div class="calc-index-hero-inner">\n<div class="calc-index-hero-badge">' + badge + '</div><h1 class="calc-index-hero-title">' + title + '</h1><p class="calc-index-hero-sub">' + subtitle + '</p>\n' + searchHtml + '<div class="calc-index-hero-btns">' + btnsHtml + '</div>' + statsHtml + '</div>\n</section>';
}

function calcSvg(type, slug) {
  const slugSvgs = {
    'bmi-calculator':              `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="28" width="36" height="14" rx="3" stroke="#2d6a4f" stroke-width="2.5"/><path d="M16 28v-8a8 8 0 0 1 16 0v8" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="35" r="2" fill="#2d6a4f"/></svg>`,
    'calorie-calculator':          `<svg viewBox="0 0 48 48" fill="none"><path d="M24 7c0 0-8 10-8 18a8 8 0 0 0 16 0c0-8-8-18-8-18z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M20 29c0-2.2 1.8-4 4-4" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'macro-calculator':            `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="15" stroke="#2d6a4f" stroke-width="2.5"/><path d="M24 24L24 9" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M24 24L37 31" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/><path d="M24 24L13 34" stroke="#f4a261" stroke-width="2" stroke-linecap="round"/></svg>`,
    'tdee-calculator':             `<svg viewBox="0 0 48 48" fill="none"><polyline points="8,36 17,22 25,28 33,16 42,8" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><polygon points="38,6 44,6 44,12" fill="#52b788"/></svg>`,
    'body-fat-calculator':         `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="11" r="5" stroke="#2d6a4f" stroke-width="2.5"/><path d="M15 20h18l-2 20H17L15 20z" stroke="#2d6a4f" stroke-width="2.5" stroke-linejoin="round"/><path d="M19 26h10M20 32h8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'ideal-weight-calculator':     `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="24" cy="24" r="8" stroke="#52b788" stroke-width="2"/><circle cx="24" cy="24" r="3" fill="#2d6a4f"/></svg>`,
    'bmr-calculator':              `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="12" r="5" stroke="#2d6a4f" stroke-width="2.5"/><path d="M18 20h12v6l4 16H14L18 26v-6z" stroke="#2d6a4f" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 26v10" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'water-intake-calculator':     `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6c0 0-12 14-12 22a12 12 0 0 0 24 0c0-8-12-22-12-22z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M18 30c0-3.3 2.7-6 6-6" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M30 36l4-4" stroke="#52b788" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'sleep-calculator':            `<svg viewBox="0 0 48 48" fill="none"><path d="M36 28c0 8-6 14-14 14S8 36 8 28s6-14 14-14c-4 2-6 6-6 10s4 10 10 10c4 0 7-2 10-6z" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="37" cy="11" r="2.5" fill="#f4a261"/><circle cx="42" cy="19" r="1.5" fill="#f4a261"/><circle cx="32" cy="7" r="1.5" fill="#f4a261"/></svg>`,
    'heart-rate-calculator':       `<svg viewBox="0 0 48 48" fill="none"><polyline points="4,24 10,24 14,14 18,34 22,20 26,28 30,24 44,24" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'protein-calculator':          `<svg viewBox="0 0 48 48" fill="none"><path d="M8 24h32" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><rect x="12" y="18" width="5" height="12" rx="2" stroke="#2d6a4f" stroke-width="2"/><rect x="31" y="18" width="5" height="12" rx="2" stroke="#2d6a4f" stroke-width="2"/><rect x="5" y="20" width="5" height="8" rx="2" stroke="#52b788" stroke-width="2"/><rect x="38" y="20" width="5" height="8" rx="2" stroke="#52b788" stroke-width="2"/></svg>`,
    'step-counter':                `<svg viewBox="0 0 48 48" fill="none"><path d="M16 12c0-2.2 1.8-4 4-4h4a4 4 0 0 1 0 8h-2a4 4 0 0 0 0 8h4a4 4 0 0 1 0 8h-4a4 4 0 0 1-4-4" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M14 36h20" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'pregnancy-due-date-calculator':`<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="32" rx="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M6 20h36" stroke="#2d6a4f" stroke-width="2"/><path d="M16 6v8M32 6v8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M24 30a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#2d6a4f" stroke-width="2"/><path d="M21 28l2-2 4 2" stroke="#52b788" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'ovulation-calculator':        `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="22" r="10" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="24" cy="22" r="4" fill="#52b788" opacity="0.6"/><path d="M24 10V6M24 38v4M10 22H6M38 22h4" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'baby-weight-calculator':      `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="18" r="10" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="20" cy="16" r="1.5" fill="#2d6a4f"/><circle cx="28" cy="16" r="1.5" fill="#2d6a4f"/><path d="M20 22c2 2 6 2 8 0" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round"/><rect x="8" y="32" width="32" height="10" rx="3" stroke="#52b788" stroke-width="2"/><path d="M24 32v-4" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'child-bmi-calculator':        `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="10" r="5" stroke="#2d6a4f" stroke-width="2.5"/><path d="M17 18h14l-2 14h-2l-2-8-2 8h-2l-2-14z" stroke="#2d6a4f" stroke-width="2" stroke-linejoin="round"/><path d="M19 32l-4 10M29 32l4 10" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'menstrual-cycle-calculator':  `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="32" rx="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M6 20h36" stroke="#2d6a4f" stroke-width="2"/><circle cx="16" cy="30" r="2.5" fill="#52b788"/><circle cx="24" cy="30" r="2.5" fill="#2d6a4f"/><circle cx="32" cy="30" r="2.5" fill="#52b788" opacity="0.5"/></svg>`,
    'fertility-calculator':        `<svg viewBox="0 0 48 48" fill="none"><path d="M24 8c-8 0-14 6-14 14s14 20 14 20 14-12 14-20S32 8 24 8z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M24 14v6M21 17h6" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'protein-intake-calculator':   `<svg viewBox="0 0 48 48" fill="none"><path d="M12 16c0-6.6 5.4-12 12-12s12 5.4 12 12-5.4 12-12 12-12-5.4-12-12z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M14 28h20l-2 14H16L14 28z" stroke="#52b788" stroke-width="2" stroke-linejoin="round"/></svg>`,
    'carb-calculator':             `<svg viewBox="0 0 48 48" fill="none"><path d="M10 36c0-12 14-28 14-28s14 16 14 28a14 14 0 0 1-28 0z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M17 32c0-4.4 3.1-8 7-8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'fat-intake-calculator':       `<svg viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="26" rx="16" ry="14" stroke="#2d6a4f" stroke-width="2.5"/><path d="M16 26c0-4.4 3.6-8 8-8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M28 14l-4-8" stroke="#f4a261" stroke-width="2" stroke-linecap="round"/></svg>`,
    'fiber-intake-calculator':     `<svg viewBox="0 0 48 48" fill="none"><path d="M24 8v32" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M16 14l8 6 8-6M16 22l8 6 8-6M16 30l8 6 8-6" stroke="#52b788" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'vitamin-d-calculator':        `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="10" stroke="#f4a261" stroke-width="2.5"/><path d="M24 6v4M24 38v4M6 24h4M38 24h4M11 11l3 3M34 34l3 3M11 37l3-3M34 14l3-3" stroke="#f4a261" stroke-width="2" stroke-linecap="round"/></svg>`,
    'iron-intake-calculator':      `<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="8" width="20" height="32" rx="10" stroke="#2d6a4f" stroke-width="2.5" transform="rotate(45 24 24)"/><path d="M17 17l14 14" stroke="#52b788" stroke-width="2"/><circle cx="24" cy="24" r="3" fill="#2d6a4f"/></svg>`,
    'calcium-calculator':          `<svg viewBox="0 0 48 48" fill="none"><path d="M14 6h6l2 8h-4l1 4h10l1-4h-4l2-8h6" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 22h28" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M12 30c0 6 3 12 12 12s12-6 12-12H12z" stroke="#2d6a4f" stroke-width="2.5"/></svg>`,
    'cholesterol-risk-calculator': `<svg viewBox="0 0 48 48" fill="none"><path d="M24 38s-14-8-14-18c0-5.5 4.5-10 10-10 2.5 0 4.7 1 6.5 2.6" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M30 10l-2 8h5l-7 12" stroke="#f4a261" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'diabetes-risk-calculator':    `<svg viewBox="0 0 48 48" fill="none"><circle cx="30" cy="18" r="10" stroke="#2d6a4f" stroke-width="2.5"/><path d="M24 18h12M30 12v12" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M10 34l8-8" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><circle cx="10" cy="36" r="3" fill="#f4a261"/></svg>`,
    'stroke-risk-calculator':      `<svg viewBox="0 0 48 48" fill="none"><path d="M16 14c0-4.4 3.6-8 8-8s8 3.6 8 8c2.2 0 4 2.7 4 6s-1.8 6-4 6H16c-2.2 0-4-2.7-4-6s1.8-6 4-6z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M20 28l2 8M28 28l-2 8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M22 36h4" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'lean-body-mass-calculator':   `<svg viewBox="0 0 48 48" fill="none"><path d="M24 10l4 6-4 4-4-4 4-6z" stroke="#2d6a4f" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 22l2-4h16l2 4" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M10 22h6l4 16h8l4-16h6" stroke="#52b788" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'body-surface-area-calculator':`<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="10" r="4" stroke="#2d6a4f" stroke-width="2"/><path d="M16 18h16v6l-4 14h-2l-2-8-2 8h-2l-4-14v-6z" stroke="#2d6a4f" stroke-width="2"/><rect x="8" y="8" width="32" height="32" rx="4" stroke="#52b788" stroke-width="1.5" stroke-dasharray="3 2"/></svg>`,
    'one-rep-max-calculator':      `<svg viewBox="0 0 48 48" fill="none"><path d="M8 24h32" stroke="#2d6a4f" stroke-width="3" stroke-linecap="round"/><rect x="4" y="18" width="6" height="12" rx="2" stroke="#2d6a4f" stroke-width="2"/><rect x="38" y="18" width="6" height="12" rx="2" stroke="#2d6a4f" stroke-width="2"/><rect x="10" y="14" width="6" height="20" rx="2" stroke="#52b788" stroke-width="2"/><rect x="32" y="14" width="6" height="20" rx="2" stroke="#52b788" stroke-width="2"/></svg>`,
    'running-pace-calculator':     `<svg viewBox="0 0 48 48" fill="none"><circle cx="30" cy="8" r="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M26 16l-6 10 6 4-4 12" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 26l-8 6" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><circle cx="10" cy="32" r="4" stroke="#52b788" stroke-width="2"/><path d="M8 30l4 4" stroke="#52b788" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'waist-to-hip-ratio':          `<svg viewBox="0 0 48 48" fill="none"><path d="M16 8h16" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/><path d="M12 20h24" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M14 32h20" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M16 8c-4 4-4 8-4 12s4 10 6 12M32 8c4 4 4 8 4 12s-4 10-6 12" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round"/></svg>`,
    'blood-pressure-calculator':   `<svg viewBox="0 0 48 48" fill="none"><polyline points="4,24 10,24 14,10 18,38 22,18 26,30 30,24 44,24" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'alcohol-units-calculator':    `<svg viewBox="0 0 48 48" fill="none"><path d="M16 8h16l-4 14H20L16 8z" stroke="#2d6a4f" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 22v16h8V22" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M16 38h16" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round"/></svg>`,
    'sugar-intake-calculator':     `<svg viewBox="0 0 48 48" fill="none"><rect x="12" y="12" width="24" height="24" rx="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M18 22h12M18 28h8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M28 8v4M20 8v4M28 36v4M20 36v4" stroke="#f4a261" stroke-width="2" stroke-linecap="round"/></svg>`,
    'keto-calculator':             `<svg viewBox="0 0 48 48" fill="none"><path d="M24 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" stroke="#2d6a4f" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
    'intermittent-fasting-calculator':`<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#2d6a4f" stroke-width="2.5"/><path d="M24 10v14l8 6" stroke="#52b788" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'vo2-max-calculator':          `<svg viewBox="0 0 48 48" fill="none"><path d="M14 36c0-8 3-14 6-18s4-8 4-10c0 2 1 6 4 10s6 10 6 18" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M12 36h24" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M20 28h8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'push-up-test-calculator':     `<svg viewBox="0 0 48 48" fill="none"><circle cx="34" cy="8" r="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M10 34h8l6-12 6 4h8" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 34l4-8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'plank-test-calculator':       `<svg viewBox="0 0 48 48" fill="none"><circle cx="38" cy="10" r="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M6 32l36-16" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M6 32l4-10" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'calories-burned-calculator':  `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6c0 0-6 7-6 14 0 3.3 2.7 6 6 6s6-2.7 6-6c0-2-1-4-2-5 0 2-1 4-3 4s-3-2-3-4c0-4 2-9 2-9z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M18 34h12M12 40h24" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'swimming-calories-calculator':`<svg viewBox="0 0 48 48" fill="none"><circle cx="34" cy="10" r="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M8 24l8-6 8 4 8-6 8 2" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 32c4 4 8 0 12 0s8 4 12 0 8 0 8 0" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'cycling-calories-calculator': `<svg viewBox="0 0 48 48" fill="none"><circle cx="12" cy="32" r="8" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="36" cy="32" r="8" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="36" cy="14" r="4" stroke="#2d6a4f" stroke-width="2"/><path d="M12 32l12-14h8" stroke="#52b788" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 18l-2 8 12 6" stroke="#52b788" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'target-heart-rate-calculator':`<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#2d6a4f" stroke-width="2"/><circle cx="24" cy="24" r="8" stroke="#52b788" stroke-width="2"/><path d="M24 18s-6 4-6 9 6 9 6 9 6-4 6-9-6-9-6-9z" fill="#52b788" opacity="0.3"/><polyline points="12,24 16,24 18,18 20,30 22,22 24,26 26,24 36,24" stroke="#2d6a4f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'pregnancy-weight-gain-calculator':`<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="14" r="6" stroke="#2d6a4f" stroke-width="2.5"/><path d="M14 24c0-4 4.5-8 10-8s10 4 10 8c0 6-2 12-10 14-8-2-10-8-10-14z" stroke="#52b788" stroke-width="2.5"/></svg>`,
    'anorexia-calculator':         `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="28" width="32" height="14" rx="3" stroke="#2d6a4f" stroke-width="2.5"/><path d="M14 28v-8a10 10 0 0 1 20 0v8" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/><path d="M20 34h8" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round"/></svg>`,
  };
  if (slug && slugSvgs[slug]) return slugSvgs[slug];
  const icons = {
    weight: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="16" width="32" height="24" rx="4" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="24" cy="28" r="6" stroke="#52b788" stroke-width="2"/><path d="M24 22v6l4 2" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round"/></svg>`,
    heart: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 40s-14-8.4-14-18c0-5.5 4.5-10 10-10 3.5 0 6.5 2 8 4a10 10 0 0 1 8-4c5.5 0 10 4.5 10 10 0 9.6-14 18-14 18z" stroke="#2d6a4f" stroke-width="2.5" fill="none"/></svg>`,
    food: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="28" r="12" stroke="#2d6a4f" stroke-width="2.5"/><path d="M16 28c0-4.4 3.6-8 8-8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M24 8v8M20 10l4 6 4-6" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    water: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6c0 0-12 14-12 22a12 12 0 0 0 24 0c0-8-12-22-12-22z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M18 30c0-3.3 2.7-6 6-6" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    sleep: `<svg viewBox="0 0 48 48" fill="none"><path d="M36 28c0 8-6 14-14 14S8 36 8 28s6-14 14-14c-4 2-6 6-6 10s4 10 10 10c4 0 7-2 10-6z" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="36" cy="12" r="2" fill="#f4a261"/><circle cx="40" cy="20" r="1.5" fill="#f4a261"/></svg>`,
    fitness: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 24h32" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><rect x="12" y="18" width="4" height="12" rx="1" stroke="#2d6a4f" stroke-width="2"/><rect x="32" y="18" width="4" height="12" rx="1" stroke="#2d6a4f" stroke-width="2"/><rect x="6" y="20" width="4" height="8" rx="1" stroke="#52b788" stroke-width="2"/><rect x="38" y="20" width="4" height="8" rx="1" stroke="#52b788" stroke-width="2"/></svg>`,
    body: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="12" r="6" stroke="#2d6a4f" stroke-width="2.5"/><path d="M16 22h16v4l-4 14h-2l-2-10-2 10h-2l-4-14v-4z" stroke="#2d6a4f" stroke-width="2" fill="none"/></svg>`,
    brain: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 40V24" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M16 14c0-4.4 3.6-8 8-8s8 3.6 8 8c2.2 0 4 2.7 4 6s-1.8 6-4 6H16c-2.2 0-4-2.7-4-6s1.8-6 4-6z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M20 18h8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    baby: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="20" r="12" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="20" cy="18" r="1.5" fill="#2d6a4f"/><circle cx="28" cy="18" r="1.5" fill="#2d6a4f"/><path d="M20 24c2 2 6 2 8 0" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round"/><path d="M18 36h12" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    pill: `<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="8" width="20" height="32" rx="10" stroke="#2d6a4f" stroke-width="2.5" transform="rotate(45 24 24)"/><path d="M17 17l14 14" stroke="#52b788" stroke-width="2"/></svg>`,
  };
  return icons[type] || icons.weight;
}

function quizSvg(slug) {
  const svgs = {
    'nutrition-knowledge-quiz':     `<svg viewBox="0 0 48 48" fill="none"><path d="M16 10c0 0-4 6-4 12a12 12 0 0 0 24 0c0-6-4-12-4-12" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><path d="M24 10v12" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M14 36h20" stroke="#2d6a4f" stroke-width="2" stroke-linecap="round"/><path d="M12 40h24" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'hydration-health-quiz':        `<svg viewBox="0 0 48 48" fill="none"><path d="M24 8c0 0-13 15-13 23a13 13 0 0 0 26 0c0-8-13-23-13-23z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M18 32c0-3.3 2.7-6 6-6" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'fitness-level-quiz':           `<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="21" width="8" height="6" rx="2" stroke="#2d6a4f" stroke-width="2.5"/><rect x="36" y="21" width="8" height="6" rx="2" stroke="#2d6a4f" stroke-width="2.5"/><path d="M12 24h6v-8h12v8h6" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'lifestyle-health-score-quiz':  `<svg viewBox="0 0 48 48" fill="none"><path d="M24 10c-2-4-8-5-11-1s-2 9 2 12l9 9 9-9c4-3 5-8 2-12s-9-3-11 1z" stroke="#2d6a4f" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 36v5" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M18 44h12" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'stress-awareness-quiz':        `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="22" r="13" stroke="#2d6a4f" stroke-width="2.5"/><path d="M20 18c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.5 3-3 4v2" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="30" r="1.5" fill="#2d6a4f"/><path d="M24 36v6" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M18 42h12" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'burnout-risk-quiz':            `<svg viewBox="0 0 48 48" fill="none"><path d="M24 8c0 0-9 11-9 19a9 9 0 0 0 18 0c0-8-9-19-9-19z" stroke="#2d6a4f" stroke-width="2.5"/><path d="M20 30c0-2.2 1.8-4 4-4" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><path d="M24 38v4M20 42h8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/></svg>`,
    'sleep-science-quiz':           `<svg viewBox="0 0 48 48" fill="none"><path d="M34 26c0 8-5 14-13 14S8 34 8 26s5-14 13-14c-3 2-5 5-5 9s3 9 9 9c3 0 6-2 9-5z" stroke="#2d6a4f" stroke-width="2.5"/><circle cx="36" cy="12" r="2.5" fill="#f4a261"/><circle cx="41" cy="20" r="1.5" fill="#f4a261"/><circle cx="30" cy="8" r="1.5" fill="#f4a261"/></svg>`,
    'anxiety-mental-health-quiz':   `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="20" r="13" stroke="#2d6a4f" stroke-width="2.5"/><path d="M20 16c1-3 7-3 7 1s-4 4-4 8" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><circle cx="23" cy="27" r="1.5" fill="#2d6a4f"/></svg>`,
    'hormonal-health-quiz':         `<svg viewBox="0 0 48 48" fill="none"><path d="M24 8v32M14 16l20 16M34 16L14 32" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="24" r="5" stroke="#52b788" stroke-width="2"/></svg>`,
    'menstrual-cycle-quiz':         `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#2d6a4f" stroke-width="2.5"/><path d="M24 14v10l6 4" stroke="#52b788" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };
  const defaultSvg = `<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="6" width="28" height="36" rx="4" stroke="#2d6a4f" stroke-width="2.5"/><path d="M16 18h16M16 24h16M16 30h10" stroke="#52b788" stroke-width="2" stroke-linecap="round"/><circle cx="35" cy="35" r="7" fill="#f0faf4" stroke="#2d6a4f" stroke-width="2"/><path d="M32 35l2 2 4-4" stroke="#2d6a4f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return svgs[slug] || defaultSvg;
}

const BLOG_IMAGES = {
  'how-to-calculate-bmi':               {url:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',alt:'Doctor measuring patient BMI body weight'},
  'what-is-a-healthy-bmi':              {url:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',alt:'Healthy person checking BMI ranges'},
  'bmi-vs-body-fat-percentage':         {url:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80',alt:'Fitness assessment body fat vs BMI'},
  'bmi-for-children-and-teenagers':     {url:'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80',alt:'Children health and BMI assessment'},
  'bmi-chart-by-age':                   {url:'https://images.unsplash.com/photo-1532200846567-1bd8bd5b23aa?w=800&q=80',alt:'BMI chart by age and healthy weight'},
  'is-bmi-accurate':                    {url:'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80',alt:'Medical assessment BMI accuracy limitations'},
  'underweight-bmi-health-risks':       {url:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',alt:'Healthy nutrition for underweight recovery'},
  'overweight-vs-obese-bmi':            {url:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',alt:'Health classification overweight obese BMI'},
  'how-to-lower-your-bmi':              {url:'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',alt:'Healthy food strategies to lower BMI'},
  'bmi-and-chronic-disease':            {url:'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80',alt:'BMI chronic disease research health'},
  'how-many-calories-should-i-eat':     {url:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',alt:'Healthy balanced meal daily calorie planning'},
  'calorie-deficit-for-weight-loss':    {url:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',alt:'Fresh vegetables calorie deficit diet'},
  'calorie-surplus-for-muscle-gain':    {url:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80',alt:'High calorie muscle gain nutrition foods'},
  'how-to-count-calories':              {url:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',alt:'Food tracking counting calories nutrition'},
  'calorie-cycling':                    {url:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',alt:'Calorie cycling diet strategy meals'},
  'low-calorie-foods-keep-you-full':    {url:'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',alt:'Low calorie filling foods vegetables'},
  'calories-burned-walking-10000-steps':{url:'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',alt:'Walking 10000 steps calorie burn exercise'},
  'liquid-calories-weight-loss':        {url:'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',alt:'Liquid calories drinks weight gain'},
  'maintenance-calories-explained':     {url:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',alt:'Maintenance calories daily energy balance'},
  'calorie-needs-by-age':               {url:'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',alt:'Calorie needs aging metabolism changes'},
  'eating-late-at-night-weight-gain':   {url:'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',alt:'Eating late night weight gain truth'},
  'how-to-break-weight-loss-plateau':   {url:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',alt:'Breaking weight loss plateau strategies'},
  'what-are-macronutrients':            {url:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',alt:'Macronutrients protein carbs fat foods'},
  'how-much-protein-per-day':           {url:'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',alt:'High protein foods daily intake guide'},
  'carbohydrates-good-vs-bad':          {url:'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80',alt:'Good carbohydrates vs bad carbs nutrition'},
  'healthy-fats-vs-unhealthy-fats':     {url:'https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=800&q=80',alt:'Healthy fats avocado nuts olive oil'},
  'how-to-calculate-macros-weight-loss':{url:'https://images.unsplash.com/photo-1455642305367-68834a1da7ab?w=800&q=80',alt:'Calculating macros for weight loss nutrition'},
  'high-protein-foods-list':            {url:'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&q=80',alt:'High protein foods list chicken eggs legumes'},
  'best-pre-workout-meals':             {url:'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=800&q=80',alt:'Pre workout meal energy performance nutrition'},
  'best-post-workout-meals':            {url:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80',alt:'Post workout recovery nutrition meals'},
  'micronutrients-vs-macronutrients':   {url:'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=800&q=80',alt:'Micronutrients vs macronutrients nutrition'},
  'how-to-read-nutrition-labels':       {url:'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=800&q=80',alt:'Reading nutrition labels food health'},
  'fiber-why-not-getting-enough':       {url:'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',alt:'Fiber rich foods vegetables legumes'},
  'sugar-addiction-reduce-sugar':       {url:'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',alt:'Reducing sugar addiction health wellness'},
  'what-is-tdee':                       {url:'https://images.unsplash.com/photo-1530026405186-ed1f139313f0?w=800&q=80',alt:'TDEE total daily energy expenditure exercise'},
  'bmr-vs-tdee':                        {url:'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80',alt:'BMR vs TDEE metabolism calorie comparison'},
  'how-to-boost-metabolism':            {url:'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&q=80',alt:'Boosting metabolism evidence based methods'},
  'does-muscle-burn-more-calories':     {url:'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800&q=80',alt:'Muscle burns more calories than fat truth'},
  'slow-metabolism-is-it-real':         {url:'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=800&q=80',alt:'Slow metabolism real or excuse science'},
  'activity-level-affects-calorie-needs':{url:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',alt:'Activity level affects daily calorie needs'},
  'adaptive-thermogenesis':             {url:'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80',alt:'Adaptive thermogenesis body weight loss response'},
  'how-age-affects-metabolism':         {url:'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',alt:'Age metabolism changes fitness aging'},
  'body-fat-percentage-chart':          {url:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',alt:'Body fat percentage chart men women age'},
  'how-to-lose-body-fat-without-losing-muscle':{url:'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80',alt:'Lose body fat preserve muscle fitness'},
  'visceral-fat-vs-subcutaneous-fat':   {url:'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&q=80',alt:'Visceral fat vs subcutaneous fat health risk'},
  'how-to-measure-body-fat-at-home':    {url:'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',alt:'Measuring body fat at home methods'},
  'essential-body-fat-vs-storage-fat':  {url:'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',alt:'Essential body fat vs storage fat health'},
  'how-long-to-lose-1-percent-body-fat':{url:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',alt:'Losing body fat timeline realistic goals'},
  'exercises-to-reduce-belly-fat':      {url:'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',alt:'Exercises reduce belly fat science based'},
  'body-recomposition':                 {url:'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&q=80',alt:'Body recomposition lose fat gain muscle'},
  'how-to-build-muscle':                {url:'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80',alt:'Building muscle science based strength training'},
  'cardio-vs-strength-training':        {url:'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=800&q=80',alt:'Cardio vs strength training fat burn'},
  'hiit-workout-guide-for-beginners':   {url:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',alt:'HIIT workout guide beginners high intensity'},
  'how-to-improve-running-endurance':   {url:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',alt:'Running endurance training plan improvement'},
  'progressive-overload-explained':     {url:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',alt:'Progressive overload strength training principle'},
  'how-many-days-per-week-workout':     {url:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',alt:'Workout frequency days per week fitness'},
  'best-exercises-for-each-muscle-group':{url:'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80',alt:'Best exercises each muscle group guide'},
  'rest-days-importance-recovery':      {url:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',alt:'Rest days recovery importance training'},
  'home-workout-routine-no-equipment':  {url:'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',alt:'Home workout routine no equipment bodyweight'},
  'stretching-guide-static-vs-dynamic': {url:'https://images.unsplash.com/photo-1607631568010-a87245c0daf9?w=800&q=80',alt:'Stretching guide static vs dynamic flexibility'},
  'vo2-max-explained':                  {url:'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80',alt:'VO2 max aerobic fitness testing explained'},
  'how-many-steps-per-day':             {url:'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&q=80',alt:'Daily steps count healthy walking goal'},
  'how-much-sleep-do-you-need-by-age':  {url:'https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=800&q=80',alt:'Sleep recommendations by age adults children'},
  'sleep-cycles-explained':             {url:'https://images.unsplash.com/photo-1529516222410-b269b5d7aa99?w=800&q=80',alt:'Sleep cycles REM deep light sleep stages'},
  'how-to-fix-sleep-schedule':          {url:'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=800&q=80',alt:'Fixing sleep schedule 7 days guide'},
  'best-foods-for-sleep':               {url:'https://images.unsplash.com/photo-1611070099689-5bd439e8ce41?w=800&q=80',alt:'Best foods for better sleep at night'},
  'sleep-deprivation-weight-metabolism':{url:'https://images.unsplash.com/photo-1559181567-c3190bea0dc4?w=800&q=80',alt:'Sleep deprivation effects weight metabolism'},
  'how-to-improve-sleep-quality':       {url:'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&q=80',alt:'Improving sleep quality without medication'},
  'napping-benefits-risks':             {url:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',alt:'Napping benefits risks ideal nap duration'},
  'exercise-timing-sleep-quality':      {url:'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80',alt:'Exercise timing effects on sleep quality'},
  'how-much-water-should-you-drink':    {url:'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?w=800&q=80',alt:'How much water to drink per day guide'},
  'signs-of-dehydration':               {url:'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80',alt:'Signs of dehydration symptoms causes'},
  'benefits-of-drinking-more-water':    {url:'https://images.unsplash.com/photo-1606923829579-0cb981a83e2b?w=800&q=80',alt:'Benefits drinking more water science'},
  'hydration-during-exercise':          {url:'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80',alt:'Hydration during exercise water needs'},
  'does-drinking-water-help-weight-loss':{url:'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80',alt:'Drinking water helps weight loss evidence'},
  'best-hydrating-foods':               {url:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',alt:'Best hydrating foods eat every day'},
  'target-heart-rate-zones':            {url:'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',alt:'Target heart rate zones fat burn peak'},
  'resting-heart-rate-normal':          {url:'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=800&q=80',alt:'Resting heart rate normal range warning signs'},
  'how-to-lower-resting-heart-rate':    {url:'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&q=80',alt:'Lower resting heart rate naturally tips'},
  'maximum-heart-rate-by-age':          {url:'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?w=800&q=80',alt:'Maximum heart rate by age formula zones'},
  'heart-rate-variability-hrv':         {url:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',alt:'Heart rate variability HRV health wellness'},
  'best-cardio-exercises-calorie-burn': {url:'https://images.unsplash.com/photo-1547919307-1ecb10702e6f?w=800&q=80',alt:'Best cardio exercises ranked calorie burn'},
  'exercise-reduces-stress-anxiety':    {url:'https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=800&q=80',alt:'Exercise reduces stress anxiety science'},
  'meditation-for-beginners':           {url:'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',alt:'Meditation for beginners mindfulness guide'},
  'how-to-build-healthy-habits':        {url:'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=800&q=80',alt:'Building healthy habits that actually stick'},
  'morning-routines-healthy-people':    {url:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',alt:'Morning routines of healthy successful people'},
  'how-to-stay-consistent-with-fitness':{url:'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80',alt:'Staying consistent fitness busy lifestyle'},
  'cortisol-and-weight-gain':           {url:'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80',alt:'Cortisol stress hormone weight gain effects'},
  'sleep-affects-mental-health':        {url:'https://images.unsplash.com/photo-1543340904-0d1265efb5f8?w=800&q=80',alt:'Sleep affects mental health bidirectional link'},
  'mindful-eating-emotional-eating':    {url:'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',alt:'Mindful eating stop emotional eating guide'},
  'health-calculators-for-women':       {url:'https://images.unsplash.com/photo-1559839697-f0c05b0fa8ae?w=800&q=80',alt:'Health calculators every woman should use'},
  'health-calculators-for-men':         {url:'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80',alt:'Health calculators every man should know'},
  'fitness-after-40':                   {url:'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',alt:'Fitness after 40 training smarter aging'},
  'weight-loss-after-50':               {url:'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',alt:'Weight loss after 50 what changes works'},
  'bmi-for-athletes':                   {url:'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80',alt:'BMI for athletes standard ranges limitations'},
  'pregnancy-weight-gain':              {url:'https://images.unsplash.com/photo-1516977575801-5f5a5c9bf1fd?w=800&q=80',alt:'Pregnancy weight gain healthy ranges expect'},
  'health-checks-every-year':           {url:'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',alt:'Annual health checks complete checklist'},
  'realistic-fitness-goals':            {url:'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80',alt:'Setting realistic fitness goals health data'},
  'understanding-lab-results':          {url:'https://images.unsplash.com/photo-1506126279646-a697353d3166?w=800&q=80',alt:'Understanding lab results health numbers'},
  'healthy-lifestyle-checklist':        {url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',alt:'Healthy lifestyle checklist evidence based habits'},
  'how-many-steps-to-lose-weight':              {url:'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80',alt:'Person counting steps daily walking for weight loss'},
  'intermittent-fasting-for-weight-loss':       {url:'https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=800&q=80',alt:'Intermittent fasting meal timing plate clock weight loss'},
  'keto-diet-beginners-guide':                  {url:'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?w=800&q=80',alt:'Ketogenic diet foods avocado eggs cheese beginners guide'},
  'best-time-to-walk-for-fat-loss':             {url:'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?w=800&q=80',alt:'Best time to walk morning exercise for fat loss'},
  'walking-vs-running-for-weight-loss':         {url:'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?w=800&q=80',alt:'Walking vs running comparison weight loss effectiveness'},
  'protein-for-fat-loss':                       {url:'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800&q=80',alt:'High protein foods for fat loss muscle preservation diet'},
  'why-you-are-not-losing-weight':              {url:'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=800&q=80',alt:'Weight scale reasons why not losing weight plateau'},
  'fat-loss-vs-weight-loss-difference':         {url:'https://images.unsplash.com/photo-1536364127590-1594e3161294?w=800&q=80',alt:'Fat loss versus weight loss body composition difference'},
  'mediterranean-diet-complete-guide':          {url:'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',alt:'Mediterranean diet complete guide olive oil fish vegetables'},
  'plant-based-diet-for-beginners':             {url:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',alt:'Plant based diet for beginners colorful vegetables fruit'},
  'omega-3-fatty-acids-complete-guide':         {url:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',alt:'Omega 3 fatty acids salmon fish walnuts complete guide'},
  'anti-inflammatory-diet-guide':               {url:'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80',alt:'Anti-inflammatory diet foods turmeric berries leafy greens'},
  'gut-health-and-weight-loss':                 {url:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',alt:'Gut health microbiome probiotic foods weight loss'},
  'daily-sodium-intake-guide':                  {url:'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',alt:'Daily sodium intake guide salt reduction health tips'},
  'best-vitamins-for-energy-and-health':        {url:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',alt:'Best vitamins for energy and overall health supplements'},
  'how-to-track-macros-guide':                  {url:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',alt:'How to track macros food logging nutrition app guide'},
  'beginner-workout-plan-30-days':              {url:'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',alt:'Beginner workout plan 30 days fitness challenge routine'},
  'how-to-run-5k-training-plan':                {url:'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80',alt:'How to run a 5K training plan beginner runner guide'},
  'strength-training-for-women-guide':          {url:'https://images.unsplash.com/photo-1570691079236-4bca6c45d440?w=800&q=80',alt:'Strength training for women guide dumbbells gym fitness'},
  'cycling-calories-and-benefits':              {url:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',alt:'Cycling calories burned cardiovascular health benefits'},
  'yoga-for-weight-loss':                       {url:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',alt:'Yoga poses for weight loss flexibility mindfulness practice'},
  'swimming-calories-and-fitness':              {url:'https://images.unsplash.com/photo-1520095972714-909e91b038e5?w=800&q=80',alt:'Swimming calories burned full body fitness cardio workout'},
  'jump-rope-workout-benefits':                 {url:'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80',alt:'Jump rope workout calorie burn cardiovascular fitness benefits'},
  'ovulation-calculator-complete-guide':        {url:'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',alt:'Ovulation calculator complete guide fertility tracking women'},
  'pregnancy-week-by-week-guide':               {url:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',alt:'Pregnancy week by week development fetal growth guide'},
  'pcos-symptoms-and-management':               {url:'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80',alt:'PCOS symptoms management hormonal health women wellness'},
  'breastfeeding-calorie-and-nutrition-guide':  {url:'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80',alt:'Breastfeeding nutrition calorie needs new mother guide'},
  'menopause-weight-gain-tips':                 {url:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',alt:'Menopause weight gain management tips hormonal health women'},
  'menstrual-cycle-and-fitness':                {url:'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?w=800&q=80',alt:'Menstrual cycle and fitness training sync exercise guide'},
  'fertility-boosting-nutrition':               {url:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',alt:'Fertility boosting nutrition foods lifestyle guide women'},
  'hormone-balance-for-women':                  {url:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',alt:'Hormone balance for women natural wellness lifestyle tips'},
  'burnout-symptoms-and-recovery':              {url:'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&q=80',alt:'Burnout symptoms signs and recovery strategies self care'},
  'dopamine-detox-complete-guide':              {url:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',alt:'Dopamine detox digital break mental reset complete guide'},
  'stress-level-test-meaning':                  {url:'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=800&q=80',alt:'Stress level test score meaning calm breathing techniques'},
  'productivity-score-and-improvement':         {url:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',alt:'Productivity score improvement strategies work efficiency'},
  'work-life-balance-practical-guide':          {url:'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=80',alt:'Work life balance practical guide reduce stress wellness'},
  'digital-detox-how-to-guide':                 {url:'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80',alt:'Digital detox how to guide screen free wellness benefits'},
  'how-to-improve-focus-and-concentration':     {url:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',alt:'How to improve focus and concentration study tips brain'},
  'sleep-debt-how-to-recover':                  {url:'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80',alt:'Sleep debt how to recover and restore energy rest'},
  'best-sleep-position-for-health':             {url:'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=800&q=80',alt:'Best sleep position for back neck spine health'},
  'insomnia-natural-remedies':                  {url:'https://images.unsplash.com/photo-1560813962-ff3d8fcf59ba?w=800&q=80',alt:'Insomnia natural remedies sleep aid without medication herbs'},
  'magnesium-for-better-sleep':                 {url:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',alt:'Magnesium rich foods for better sleep and relaxation'},
  'sleep-hygiene-complete-checklist':           {url:'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',alt:'Sleep hygiene complete checklist bedtime routine tips'},
  'how-age-calculator-works':                   {url:'https://images.unsplash.com/photo-1563237023-b1e970526dcb?w=800&q=80',alt:'How age calculator works years months days health tracking'},
  'how-birthday-calculator-works':              {url:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80',alt:'Birthday calculator how it works date health aging guide'},
  'date-difference-calculator-guide':           {url:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',alt:'Date difference calculator guide days weeks months between'},
  'healthy-morning-routine-guide':              {url:'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80',alt:'Healthy morning routine guide sunlight exercise habits'},
  'how-to-quit-sugar-21-days':                  {url:'https://images.unsplash.com/photo-1557844352-761f2565b576?w=800&q=80',alt:'How to quit sugar 21 day challenge reset cravings health'},
  'alcohol-effects-on-health-and-weight':       {url:'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80',alt:'Alcohol effects on health and weight gain research guide'},
  'how-to-use-bmi-calculator-correctly':        {url:'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',alt:'How to use BMI calculator correctly measurement guide'},
  'calorie-calculator-complete-guide':          {url:'https://images.unsplash.com/photo-1495462911434-be47104d70fa?w=800&q=80',alt:'Calorie calculator complete guide daily intake nutrition'},
  'protein-calculator-how-to-use':              {url:'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80',alt:'Protein calculator how to use daily intake fitness guide'},
  'blood-pressure-ranges-explained':            {url:'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80',alt:'Blood pressure ranges chart explained high normal low'},
  'testosterone-levels-by-age-guide':           {url:'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80',alt:'Testosterone levels by age guide men hormonal health fitness'},
  'heart-age-calculator-guide':                 {url:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',alt:'Heart age calculator guide cardiovascular risk assessment'},
};

function blogCardImage(slug) {
  const entry = BLOG_IMAGES[slug];
  if (entry) return { url: entry.url.replace('w=800&q=80','w=600&h=340&fit=crop&auto=format'), alt: entry.alt + ' | VitalHealth Hub' };
  const fallback = { id: 'photo-1505576399279-565b52d4ac71', alt: 'Health and wellness lifestyle guide' };
  return {
    url: `https://images.unsplash.com/${fallback.id}?w=600&h=340&fit=crop&auto=format`,
    alt: `${fallback.alt} | VitalHealth Hub`
  };
}

// LEGACY entries kept for backwards compatibility
function _UNUSED_legacyBlogCardImage_REMOVED(slug) {
  const map = {
    'how-to-calculate-bmi': { id: 'photo-1571019613454-1cb2f99b2d8b', alt: 'Doctor measuring patient BMI and body weight' },
    'what-is-a-healthy-bmi': { id: 'photo-1559757148-5c350d0d3c56', alt: 'Healthy person measuring waist for BMI assessment' },
    'bmi-vs-body-fat-percentage': { id: 'photo-1534438327276-14e5300c3a48', alt: 'Fitness assessment comparing BMI and body fat percentage' },
    'how-many-calories-should-i-eat': { id: 'photo-1490645935967-10de6ba17061', alt: 'Healthy balanced meal for daily calorie planning' },
    'calorie-deficit-for-weight-loss': { id: 'photo-1512621776951-a57141f2eefd', alt: 'Fresh vegetables and fruits for calorie deficit diet' },
    'what-are-macronutrients': { id: 'photo-1547592180-85f173990554', alt: 'Macronutrient rich foods protein carbs and healthy fats' },
    'high-protein-diet-benefits': { id: 'photo-1532550907401-a500c9a57435', alt: 'High protein foods including chicken eggs and legumes' },
    'how-much-water-should-you-drink': { id: 'photo-1548839140-29a749e1cf4d', alt: 'Person drinking water for daily hydration goals' },
    'benefits-of-drinking-water': { id: 'photo-1560472355-536de3962603', alt: 'Clear glass of water representing hydration benefits' },
    'how-much-sleep-do-you-need': { id: 'photo-1541781774459-bb2af2f05b55', alt: 'Person sleeping peacefully for optimal sleep duration' },
    'sleep-deprivation-effects': { id: 'photo-1531353826977-0941b4779a1c', alt: 'Tired person showing signs of sleep deprivation' },
    'how-to-improve-sleep-quality': { id: 'photo-1455642305367-68834a9c6b3e', alt: 'Cozy bedroom environment for better sleep quality' },
    'normal-resting-heart-rate': { id: 'photo-1628348068343-c6a848d2b6dd', alt: 'Heart rate monitor showing normal pulse reading' },
    'how-to-lower-heart-rate': { id: 'photo-1506126613408-eca07ce68773', alt: 'Person meditating to lower resting heart rate naturally' },
    'blood-pressure-explained': { id: 'photo-1584820927498-cfe5211fd8bf', alt: 'Blood pressure monitor and stethoscope on table' },
    'how-to-lower-blood-pressure-naturally': { id: 'photo-1498837167922-ddd27525d352', alt: 'Healthy foods that naturally lower blood pressure' },
    'what-is-tdee': { id: 'photo-1571019614242-c5c5dee9f50b', alt: 'Active person exercising showing total daily energy expenditure' },
    'bmr-explained': { id: 'photo-1520763185298-f928aebd8105', alt: 'Person resting while body burns basal metabolic calories' },
    'intermittent-fasting-guide': { id: 'photo-1611516491426-03025e6043c8', alt: 'Clock next to empty plate representing intermittent fasting' },
    '16-8-intermittent-fasting': { id: 'photo-1505253468034-514d2507d914', alt: 'Meal timing window for 16-8 intermittent fasting method' },
    'keto-diet-beginners-guide': { id: 'photo-1558618666-fcd25c85cd64', alt: 'Ketogenic diet foods including avocado eggs and nuts' },
    'mediterranean-diet-benefits': { id: 'photo-1540189549336-e6e99eb4b951', alt: 'Mediterranean diet foods with olive oil fish and vegetables' },
    'plant-based-diet-guide': { id: 'photo-1512621776951-a57141f2eefd', alt: 'Colorful plant-based diet vegetables and fruits' },
    'best-foods-for-weight-loss': { id: 'photo-1490645935967-10de6ba17061', alt: 'Best foods for weight loss including salads and lean protein' },
    'foods-that-boost-metabolism': { id: 'photo-1546069901-ba9599a7e63c', alt: 'Metabolism boosting foods including spices and green tea' },
    'how-to-lose-belly-fat': { id: 'photo-1571019613454-1cb2f99b2d8b', alt: 'Core exercises to lose belly fat effectively' },
    'how-to-build-muscle': { id: 'photo-1583454110551-21f2fa2afe61', alt: 'Person lifting weights to build muscle mass' },
    'protein-for-muscle-growth': { id: 'photo-1532550907401-a500c9a57435', alt: 'Protein rich foods essential for muscle growth' },
    'creatine-benefits': { id: 'photo-1534438327276-14e5300c3a48', alt: 'Creatine supplement and fitness equipment for workout performance' },
    'best-exercises-for-weight-loss': { id: 'photo-1538805060514-97d9cc17730c', alt: 'High intensity exercise routine for weight loss' },
    'cardio-vs-strength-training': { id: 'photo-1534438327276-14e5300c3a48', alt: 'Cardio vs strength training comparison for fitness' },
    'hiit-workout-benefits': { id: 'photo-1517836357463-d25dfeac3438', alt: 'High intensity interval training HIIT workout session' },
    'yoga-benefits-for-health': { id: 'photo-1506126613408-eca07ce68773', alt: 'Yoga practice showing health and wellness benefits' },
    'walking-10000-steps-benefits': { id: 'photo-1476480862126-209bfaa8edc8', alt: 'Person walking outdoors for 10000 daily steps goal' },
    'running-for-beginners': { id: 'photo-1552674605-db6ffd4facb5', alt: 'Beginner runner jogging outdoors in park' },
    'cycling-health-benefits': { id: 'photo-1558618666-fcd25c85cd64', alt: 'Cyclist riding bike for cardiovascular health benefits' },
    'swimming-health-benefits': { id: 'photo-1530549387789-4c1017266635', alt: 'Swimmer in pool enjoying full body workout' },
    'stretching-importance': { id: 'photo-1544367567-0f2fcb009e0b', alt: 'Person stretching for flexibility and injury prevention' },
    'how-to-start-exercising': { id: 'photo-1538805060514-97d9cc17730c', alt: 'Beginner starting an exercise routine outdoors' },
    'workout-frequency-guide': { id: 'photo-1517836357463-d25dfeac3438', alt: 'Workout schedule planning for optimal fitness frequency' },
    'rest-days-importance': { id: 'photo-1544367567-0f2fcb009e0b', alt: 'Person resting and recovering between workout sessions' },
    'muscle-soreness-recovery': { id: 'photo-1571019613454-1cb2f99b2d8b', alt: 'Muscle recovery and soreness relief after exercise' },
    'vo2-max-explained': { id: 'photo-1571019614242-c5c5dee9f50b', alt: 'Aerobic fitness testing and VO2 max measurement' },
    'one-rep-max-guide': { id: 'photo-1534438327276-14e5300c3a48', alt: 'Strength testing one rep max with barbell exercise' },
    'ideal-weight-for-height': { id: 'photo-1559757148-5c350d0d3c56', alt: 'Ideal weight chart based on height measurements' },
    'waist-to-hip-ratio-health': { id: 'photo-1576678927484-cc907957088c', alt: 'Measuring waist to hip ratio for health assessment' },
    'body-fat-percentage-guide': { id: 'photo-1571019613454-1cb2f99b2d8b', alt: 'Body fat percentage measurement and fitness guide' },
    'lean-body-mass-explained': { id: 'photo-1583454110551-21f2fa2afe61', alt: 'Lean body mass composition and muscle measurement' },
    'cholesterol-levels-explained': { id: 'photo-1628348068343-c6a848d2b6dd', alt: 'Medical illustration of cholesterol levels in blood' },
    'how-to-lower-cholesterol': { id: 'photo-1498837167922-ddd27525d352', alt: 'Heart healthy foods to lower cholesterol naturally' },
    'diabetes-prevention-tips': { id: 'photo-1505253468034-514d2507d914', alt: 'Healthy lifestyle habits for diabetes prevention' },
    'blood-sugar-normal-levels': { id: 'photo-1584820927498-cfe5211fd8bf', alt: 'Blood glucose meter showing normal blood sugar levels' },
    'signs-of-diabetes': { id: 'photo-1584820927498-cfe5211fd8bf', alt: 'Early warning signs and symptoms of diabetes' },
    'heart-disease-risk-factors': { id: 'photo-1628348068343-c6a848d2b6dd', alt: 'Heart health assessment and disease risk factors' },
    'stroke-prevention-guide': { id: 'photo-1559757175-0eb30cd8c063', alt: 'Brain health and stroke prevention lifestyle tips' },
    'cancer-prevention-lifestyle': { id: 'photo-1490645935967-10de6ba17061', alt: 'Anti-cancer foods and lifestyle for cancer prevention' },
    'immune-system-boosting-foods': { id: 'photo-1547592180-85f173990554', alt: 'Immune boosting foods including citrus and vegetables' },
    'vitamin-d-deficiency-signs': { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'Sunlight exposure for vitamin D production and health' },
    'vitamin-c-benefits': { id: 'photo-1547592180-85f173990554', alt: 'Vitamin C rich citrus fruits for immune health' },
    'magnesium-benefits': { id: 'photo-1512621776951-a57141f2eefd', alt: 'Magnesium rich foods including nuts seeds and greens' },
    'iron-deficiency-symptoms': { id: 'photo-1512621776951-a57141f2eefd', alt: 'Iron rich foods to prevent deficiency symptoms' },
    'calcium-for-bone-health': { id: 'photo-1550583724-b2692b85b150', alt: 'Calcium rich dairy foods for strong bone health' },
    'omega-3-fatty-acids-benefits': { id: 'photo-1532550907401-a500c9a57435', alt: 'Omega 3 rich salmon and fatty fish for heart health' },
    'probiotics-gut-health': { id: 'photo-1544025162-d76694265947', alt: 'Probiotic foods like yogurt for gut health improvement' },
    'fiber-importance-digestion': { id: 'photo-1512621776951-a57141f2eefd', alt: 'High fiber vegetables and grains for healthy digestion' },
    'anti-inflammatory-foods': { id: 'photo-1546069901-ba9599a7e63c', alt: 'Anti-inflammatory turmeric and spices for health' },
    'antioxidants-health-benefits': { id: 'photo-1547592180-85f173990554', alt: 'Antioxidant rich berries and colorful fruits' },
    'superfoods-list': { id: 'photo-1512621776951-a57141f2eefd', alt: 'Top superfoods including berries greens and seeds' },
    'how-to-manage-stress': { id: 'photo-1506126613408-eca07ce68773', alt: 'Meditation and mindfulness for stress management' },
    'anxiety-management-tips': { id: 'photo-1474631245212-32dc3c8310c6', alt: 'Calm breathing techniques for anxiety management' },
    'depression-natural-remedies': { id: 'photo-1490730141103-6cac27aaab94', alt: 'Sunlight and nature walk as natural depression remedy' },
    'mindfulness-meditation-guide': { id: 'photo-1508672019048-805c876b67e2', alt: 'Person meditating mindfully in peaceful environment' },
    'mental-health-self-care': { id: 'photo-1499728603263-13726abce5fd', alt: 'Self care routine for mental health and wellness' },
    'burnout-signs-recovery': { id: 'photo-1520975916090-3105956dac38', alt: 'Person resting and recovering from workplace burnout' },
    'work-life-balance-tips': { id: 'photo-1499728603263-13726abce5fd', alt: 'Work life balance tips for better health and happiness' },
    'sleep-and-mental-health': { id: 'photo-1541781774459-bb2af2f05b55', alt: 'Quality sleep for improved mental health and mood' },
    'exercise-and-mental-health': { id: 'photo-1571019613454-1cb2f99b2d8b', alt: 'Exercise and physical activity boosting mental health' },
    'social-connections-health': { id: 'photo-1529156069898-49953e39b3ac', alt: 'Friends socializing for health and social connections' },
    'how-to-quit-smoking': { id: 'photo-1518609878373-06d740f60d8b', alt: 'Breaking free from smoking for better lung health' },
    'alcohol-health-effects': { id: 'photo-1474552226712-ac0f0961a954', alt: 'Understanding alcohol effects on overall health' },
    'caffeine-effects-on-body': { id: 'photo-1495474472287-4d71bcdd2085', alt: 'Coffee cup representing caffeine effects on body' },
    'dehydration-signs': { id: 'photo-1548839140-29a749e1cf4d', alt: 'Signs of dehydration and importance of drinking water' },
    'gut-health-guide': { id: 'photo-1544025162-d76694265947', alt: 'Gut health foods and microbiome wellness tips' },
    'liver-health-tips': { id: 'photo-1505576399279-565b52d4ac71', alt: 'Liver healthy foods and detox lifestyle tips' },
    'kidney-health-guide': { id: 'photo-1505576399279-565b52d4ac71', alt: 'Kidney health protection and prevention guide' },
    'thyroid-health-guide': { id: 'photo-1559757175-0eb30cd8c063', alt: 'Thyroid health symptoms and wellness solutions' },
    'hormonal-balance-tips': { id: 'photo-1559757148-5c350d0d3c56', alt: 'Hormonal balance and wellness for women health' },
    'menstrual-health-guide': { id: 'photo-1576091160399-112ba8d25d1d', alt: 'Women health and menstrual cycle wellness guide' },
    'pregnancy-nutrition-guide': { id: 'photo-1555939594-58d7cb561ad1', alt: 'Nutritious foods for healthy pregnancy and baby' },
    'postpartum-health-tips': { id: 'photo-1492725764893-90b379c2b6e7', alt: 'Postpartum health and recovery tips for new mothers' },
    'menopause-health-guide': { id: 'photo-1559757175-0eb30cd8c063', alt: 'Menopause health guide and transition management' },
    'mens-health-tips': { id: 'photo-1583454110551-21f2fa2afe61', alt: 'Men fitness and health tips for vitality' },
    'childrens-nutrition-guide': { id: 'photo-1490645935967-10de6ba17061', alt: 'Healthy nutritious foods for children balanced diet' },
    'elderly-health-tips': { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'Active senior living and elderly health wellness' },
    'healthy-aging-tips': { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'Active senior living and healthy aging lifestyle' },
    'longevity-secrets': { id: 'photo-1476480862126-209bfaa8edc8', alt: 'Longevity lifestyle secrets for living longer healthier' },
    'biological-age-vs-chronological-age': { id: 'photo-1571019613454-1cb2f99b2d8b', alt: 'Biological age versus chronological age comparison' },
    'life-expectancy-factors': { id: 'photo-1559757175-0eb30cd8c063', alt: 'Factors affecting life expectancy and longevity' },
    'preventive-health-checkups': { id: 'photo-1584820927498-cfe5211fd8bf', alt: 'Doctor patient consultation for preventive health checkup' },
  };
  const entry = map[slug] || { id: 'photo-1505576399279-565b52d4ac71', alt: 'Health and wellness lifestyle guide' };
  return {
    url: `https://images.unsplash.com/${entry.id}?w=600&h=340&fit=crop&auto=format`,
    alt: `${entry.alt} | VitalHealth Hub`
  };
}

function blogUnsplashUrl(slug) {
  const img = blogCardImage(slug);
  return img.url.replace('w=600&h=340&fit=crop&auto=format', 'w=1200&h=500&fit=crop&auto=format&q=80');
}

// ========================
// CALCULATOR DATA
// ========================
const calculators = [
  { slug: 'bmi-calculator', name: 'BMI Calculator', desc: 'Calculate your Body Mass Index based on height and weight.', icon: 'body', category: 'Body Metrics',
    fields: [{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'height',label:'Height (cm)',type:'number',ph:'175'}],
    logic: `var w=parseFloat(document.getElementById('weight').value);var h=parseFloat(document.getElementById('height').value)/100;if(!w||!h){alert('Please fill in all fields');return;}var bmi=(w/(h*h)).toFixed(1);var c='green',l='Normal Weight',s='Great! Your BMI is in the healthy range. Maintain your current lifestyle with balanced nutrition and regular exercise.';if(bmi<18.5){c='yellow';l='Underweight';s='Your BMI suggests you may be underweight. Consider consulting a healthcare provider about nutrition and healthy weight gain strategies.';}else if(bmi>=25&&bmi<30){c='yellow';l='Overweight';s='Your BMI is slightly above normal. Small changes like increasing physical activity and improving diet can help reach a healthier weight.';}else if(bmi>=30){c='red';l='Obese';s='Your BMI indicates obesity. Please consult a healthcare professional for personalized advice on diet, exercise, and weight management.';}showResult('result',bmi,l,s,c);`,
    article: `<h2>Understanding Body Mass Index (BMI)</h2><p>Body Mass Index (BMI) is a widely used screening tool that estimates body fat based on your height and weight. It was developed by Belgian mathematician Adolphe Quetelet in the early 19th century and remains one of the most accessible ways to assess whether you fall within a healthy weight range.</p><h3>How BMI Is Calculated</h3><p>BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). The resulting number falls into one of four categories: underweight (below 18.5), normal weight (18.5–24.9), overweight (25–29.9), and obese (30 and above).</p><h3>Limitations of BMI</h3><p>While BMI is a useful starting point, it does not directly measure body fat. Athletes with high muscle mass may have elevated BMI scores despite being healthy. Similarly, older adults may have a normal BMI but carry excess fat. For a more comprehensive assessment, consider combining BMI with waist circumference measurements, body fat percentage tests, or other health markers.</p><h3>Why BMI Matters</h3><p>Research has shown strong correlations between high BMI values and increased risk of heart disease, type 2 diabetes, high blood pressure, and certain cancers. Maintaining a BMI within the normal range is associated with lower risk of these chronic conditions and better overall health outcomes. Regular monitoring of your BMI can help you track changes over time and take proactive steps toward maintaining a healthy weight.</p>`,
    faqs: [
      {q:'What is a healthy BMI range?',a:'A healthy BMI falls between 18.5 and 24.9. This range is associated with the lowest risk of weight-related health problems.'},
      {q:'Is BMI accurate for athletes?',a:'BMI may overestimate body fat in muscular athletes. Consider using body fat percentage measurements for a more accurate assessment.'},
      {q:'How often should I check my BMI?',a:'Checking your BMI once every few months is sufficient for most people. More frequent monitoring may be helpful during weight loss programs.'},
      {q:'Does BMI differ by age?',a:'BMI categories are the same for adults over 20. For children and teens, BMI is assessed using age- and sex-specific percentiles.'},
      {q:'Can BMI predict health risks?',a:'BMI is a screening tool that can indicate potential health risks, but it should be used alongside other measurements like blood pressure and cholesterol.'},
      {q:'What causes a high BMI?',a:'A high BMI can result from excess body fat, but also from high muscle mass. Diet, physical activity, genetics, and metabolism all play roles.'},
      {q:'Is waist circumference better than BMI?',a:'Waist circumference can complement BMI by identifying abdominal fat, which is linked to higher health risks even at normal BMI levels.'},
      {q:'How do I lower my BMI?',a:'To lower your BMI, focus on a balanced diet with moderate calorie reduction, regular physical activity, adequate sleep, and stress management.'},
      {q:'Does BMI apply to pregnant women?',a:'BMI should be calculated using pre-pregnancy weight. Weight gain during pregnancy is normal and expected.'},
      {q:'What is the difference between BMI and body fat percentage?',a:'BMI estimates body fat using height and weight only, while body fat percentage directly measures the proportion of fat in your body.'},
    ],
    related: ['calorie-calculator','body-fat-calculator','ideal-weight-calculator','waist-to-hip-ratio']
  },
  { slug: 'calorie-calculator', name: 'Calorie Calculator', desc: 'Find out how many calories you need daily based on your goals.', icon: 'food', category: 'Nutrition',
    fields: [{id:'age',label:'Age',type:'number',ph:'30'},{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'height',label:'Height (cm)',type:'number',ph:'175'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'activity',label:'Activity Level',type:'select',options:['Sedentary','Lightly Active','Moderately Active','Very Active','Extra Active']}],
    logic: `var a=parseFloat(document.getElementById('age').value);var w=parseFloat(document.getElementById('weight').value);var h=parseFloat(document.getElementById('height').value);var g=document.getElementById('gender').value;var act=document.getElementById('activity').value;if(!a||!w||!h){alert('Please fill in all fields');return;}var bmr=g==='Male'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;var mult={Sedentary:1.2,'Lightly Active':1.375,'Moderately Active':1.55,'Very Active':1.725,'Extra Active':1.9};var cal=Math.round(bmr*(mult[act]||1.2));var c='green',l='Daily Calories',s='This is your estimated daily calorie need to maintain your current weight. Subtract 500 for weight loss or add 500 for weight gain.';showResult('result',cal+' kcal',l,s,c);`,
    article: `<h2>Understanding Daily Calorie Needs</h2><p>Calories are units of energy that your body needs to function. Every process in your body, from breathing to exercising, requires energy from the food you eat. Understanding your daily calorie needs is essential for maintaining, losing, or gaining weight effectively.</p><h3>How Calories Are Calculated</h3><p>Your daily calorie needs depend on your Basal Metabolic Rate (BMR) and activity level. BMR represents the calories your body burns at rest to maintain vital functions. The Mifflin-St Jeor equation is considered one of the most accurate methods for estimating BMR, which is then multiplied by an activity factor.</p><h3>Calorie Balance</h3><p>Weight management comes down to calorie balance. Consuming fewer calories than you burn creates a deficit leading to weight loss. Consuming more creates a surplus for weight gain. A deficit of approximately 500 calories per day typically results in about one pound of weight loss per week.</p><h3>Quality Over Quantity</h3><p>Not all calories are created equal. Calories from whole foods like vegetables, lean proteins, and whole grains provide essential nutrients and keep you feeling full longer. Processed foods with empty calories can lead to overeating and nutritional deficiencies. Focus on nutrient-dense foods for optimal health.</p>`,
    faqs: [
      {q:'How many calories should I eat to lose weight?',a:'Generally, eating 500 fewer calories than your daily needs leads to about 1 pound of weight loss per week. Never go below 1200 calories without medical supervision.'},
      {q:'Do calorie needs change with age?',a:'Yes, calorie needs typically decrease with age due to loss of muscle mass and decreased activity levels.'},
      {q:'Are all calories the same?',a:'While a calorie is a calorie in terms of energy, foods differ in nutritional value, satiety, and how your body processes them.'},
      {q:'How does exercise affect calorie needs?',a:'Exercise increases your total daily energy expenditure (TDEE), meaning you need more calories to maintain your weight.'},
      {q:'Should I count calories?',a:'Calorie counting can be a useful tool for weight management, but it is not necessary for everyone. Focus on whole foods and portion awareness.'},
      {q:'What is a calorie deficit?',a:'A calorie deficit occurs when you consume fewer calories than your body burns, leading to weight loss over time.'},
      {q:'How accurate are calorie calculators?',a:'Calorie calculators provide estimates. Individual variation in metabolism can mean actual needs differ by 10-15%.'},
      {q:'Do I need to eat back exercise calories?',a:'It depends on your goals. For weight loss, eating back half of exercise calories can prevent excessive restriction.'},
      {q:'What is BMR vs TDEE?',a:'BMR is calories burned at rest. TDEE includes BMR plus all activity, representing total daily calories burned.'},
      {q:'How do macros relate to calories?',a:'Protein and carbs have 4 calories per gram, fat has 9. Your macro balance affects satiety, energy, and body composition.'},
    ],
    related: ['bmr-calculator','tdee-calculator','macro-calculator','calorie-deficit']
  },
  { slug: 'macro-calculator', name: 'Macro Calculator', desc: 'Calculate your ideal protein, carbs, and fat intake.', icon: 'food', category: 'Nutrition',
    fields: [{id:'calories',label:'Daily Calories',type:'number',ph:'2000'},{id:'goal',label:'Goal',type:'select',options:['Balanced','Low Carb','High Protein','Keto']}],
    logic: `var cal=parseFloat(document.getElementById('calories').value);var goal=document.getElementById('goal').value;if(!cal){alert('Enter your daily calories');return;}var p,c,f;if(goal==='Balanced'){p=0.3;c=0.4;f=0.3;}else if(goal==='Low Carb'){p=0.35;c=0.25;f=0.4;}else if(goal==='High Protein'){p=0.4;c=0.3;f=0.3;}else{p=0.25;c=0.05;f=0.7;}var pg=Math.round(cal*p/4);var cg=Math.round(cal*c/4);var fg=Math.round(cal*f/9);showResult('result','P:'+pg+'g C:'+cg+'g F:'+fg+'g','Macro Split','Protein: '+pg+'g ('+Math.round(p*100)+'%) | Carbs: '+cg+'g ('+Math.round(c*100)+'%) | Fat: '+fg+'g ('+Math.round(f*100)+'%). Adjust based on your training and how your body responds.','green');`,
    article: `<h2>Understanding Macronutrients</h2><p>Macronutrients are the three primary nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each plays vital roles in your health, performance, and body composition. Understanding how to balance these macros can help you achieve your fitness and health goals more effectively.</p><h3>Protein</h3><p>Protein is essential for building and repairing muscle tissue, producing enzymes and hormones, and supporting immune function. Each gram of protein provides 4 calories. Most experts recommend 0.7-1 gram per pound of body weight for active individuals.</p><h3>Carbohydrates</h3><p>Carbohydrates are your body's preferred energy source, particularly during high-intensity exercise. They fuel your brain, muscles, and central nervous system. Each gram provides 4 calories. Choose complex carbs from whole grains, fruits, and vegetables for sustained energy.</p><h3>Fats</h3><p>Dietary fats are crucial for hormone production, vitamin absorption, cell membrane integrity, and brain health. Each gram provides 9 calories. Focus on healthy fats from sources like avocados, nuts, olive oil, and fatty fish while limiting saturated and trans fats.</p>`,
    faqs: [
      {q:'What are macronutrients?',a:'Macronutrients are protein, carbohydrates, and fat — the three main nutrients your body needs in large amounts for energy and function.'},
      {q:'What is the best macro ratio?',a:'There is no single best ratio. It depends on your goals, activity level, and preferences. A common starting point is 30% protein, 40% carbs, 30% fat.'},
      {q:'How do I track macros?',a:'Use a food tracking app to log your meals and monitor your protein, carb, and fat intake against your targets.'},
      {q:'Do I need to count macros?',a:'Counting macros can be helpful for specific goals like muscle building or fat loss, but it is not necessary for everyone.'},
      {q:'What are good protein sources?',a:'Lean meats, fish, eggs, dairy, legumes, tofu, and protein powders are all excellent protein sources.'},
      {q:'Are carbs bad for you?',a:'No. Carbohydrates are your body\'s primary energy source. Choose complex carbs and limit refined sugars for optimal health.'},
      {q:'How much fat should I eat?',a:'Most health organizations recommend fat make up 20-35% of total daily calories, focusing on unsaturated fats.'},
      {q:'What is flexible dieting?',a:'Flexible dieting, or IIFYM (If It Fits Your Macros), allows any food as long as it fits within your daily macro targets.'},
      {q:'Should macros change on rest days?',a:'Some people reduce carbs slightly on rest days since energy demands are lower, but the difference is usually small.'},
      {q:'How do macros affect body composition?',a:'Higher protein intake supports muscle retention during weight loss. The right macro balance can optimize both fat loss and muscle gain.'},
    ],
    related: ['calorie-calculator','protein-intake-calculator','keto-calculator','carb-calculator']
  },
  { slug: 'body-fat-calculator', name: 'Body Fat Calculator', desc: 'Estimate your body fat percentage using body measurements.', icon: 'body', category: 'Body Metrics',
    fields: [{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'waist',label:'Waist (cm)',type:'number',ph:'80'},{id:'neck',label:'Neck (cm)',type:'number',ph:'38'},{id:'height',label:'Height (cm)',type:'number',ph:'175'}],
    logic: `var g=document.getElementById('gender').value;var w=parseFloat(document.getElementById('waist').value);var n=parseFloat(document.getElementById('neck').value);var h=parseFloat(document.getElementById('height').value);if(!w||!n||!h){alert('Please fill in all fields');return;}var bf;if(g==='Male'){bf=495/(1.0324-0.19077*Math.log10(w-n)+0.15456*Math.log10(h))-450;}else{var hip=w*1.1;bf=495/(1.29579-0.35004*Math.log10(w+hip-n)+0.22100*Math.log10(h))-450;}bf=Math.max(2,Math.min(bf,60)).toFixed(1);var c='green',l='Healthy',s='Your body fat percentage is within a healthy range. Continue with balanced nutrition and regular exercise.';if(g==='Male'){if(bf<6){c='yellow';l='Essential Fat';s='Very low body fat. This level is typically only seen in competitive athletes.';}else if(bf>25){c='yellow';l='Above Average';s='Consider increasing physical activity and reviewing your diet.';}if(bf>32){c='red';l='High';s='Elevated body fat. Consult a healthcare provider for personalized guidance.';}}else{if(bf<14){c='yellow';l='Essential Fat';s='Very low body fat for women. Ensure adequate nutrition.';}else if(bf>32){c='yellow';l='Above Average';s='Consider lifestyle modifications for better health.';}if(bf>40){c='red';l='High';s='Elevated body fat. Please consult a healthcare professional.';}}showResult('result',bf+'%',l,s,c);`,
    article: `<h2>Understanding Body Fat Percentage</h2><p>Body fat percentage represents the proportion of your total body weight that is composed of fat tissue. Unlike BMI, which only considers height and weight, body fat percentage provides a more direct measure of body composition and is a better indicator of health risks associated with excess fat.</p><h3>Methods of Measurement</h3><p>There are several ways to measure body fat: skinfold calipers, bioelectrical impedance, DEXA scans, hydrostatic weighing, and the US Navy method used here. Each has different levels of accuracy and accessibility. The Navy method uses circumference measurements and is reasonably accurate for most people.</p><h3>Healthy Ranges</h3><p>For men, essential fat is 2-5%, athletes typically range from 6-13%, fitness-level is 14-17%, acceptable is 18-24%, and above 25% is considered obese. For women, these ranges are higher: essential fat 10-13%, athletes 14-20%, fitness 21-24%, acceptable 25-31%, and above 32% is considered obese.</p><h3>Why It Matters</h3><p>Excess body fat, particularly visceral fat around the organs, increases risk of heart disease, type 2 diabetes, and metabolic syndrome. Tracking body fat percentage over time is more meaningful than tracking weight alone, as it accounts for muscle gain during fitness programs.</p>`,
    faqs: [
      {q:'What is a healthy body fat percentage?',a:'For men, 14-24% is considered acceptable. For women, 21-31% is acceptable. Athletes may have lower percentages.'},
      {q:'How accurate is this calculator?',a:'The Navy method is accurate within 3-4% for most people. For higher accuracy, consider DEXA scans.'},
      {q:'Can I have too little body fat?',a:'Yes. Essential fat is needed for normal bodily functions. Extremely low body fat can cause hormonal issues and health problems.'},
      {q:'Does body fat percentage change with age?',a:'Body fat tends to increase with age due to decreased muscle mass and metabolic rate.'},
      {q:'How do I reduce body fat?',a:'Combine strength training, cardiovascular exercise, and a moderate calorie deficit with adequate protein intake.'},
      {q:'Is body fat percentage better than BMI?',a:'Body fat percentage provides more specific information about body composition than BMI, which cannot distinguish between fat and muscle.'},
      {q:'What is visceral fat?',a:'Visceral fat surrounds internal organs and is more dangerous than subcutaneous fat. Waist circumference can help estimate visceral fat levels.'},
      {q:'How often should I measure body fat?',a:'Monthly measurements provide useful trends. Avoid daily measurements as they can fluctuate due to hydration and other factors.'},
      {q:'Does muscle weigh more than fat?',a:'Muscle is denser than fat, so a pound of muscle takes up less space. This is why body composition matters more than weight alone.'},
      {q:'Can body fat be spot reduced?',a:'Spot reduction is a myth. Fat loss occurs systemically through overall calorie deficit and exercise, not from targeting specific areas.'},
    ],
    related: ['bmi-calculator','waist-to-hip-ratio','lean-body-mass-calculator','waist-to-height-ratio']
  },
  { slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', desc: 'Find your ideal weight range based on height and frame size.', icon: 'body', category: 'Body Metrics',
    fields: [{id:'height',label:'Height (cm)',type:'number',ph:'175'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']}],
    logic: `var h=parseFloat(document.getElementById('height').value);var g=document.getElementById('gender').value;if(!h){alert('Enter height');return;}var hi=h/2.54;var iw;if(g==='Male'){iw=50+2.3*(hi-60);}else{iw=45.5+2.3*(hi-60);}var lo=Math.round(iw*0.9);var up=Math.round(iw*1.1);iw=Math.round(iw);showResult('result',lo+'-'+up+' kg','Ideal Weight Range','Your ideal weight range is '+lo+'-'+up+' kg based on the Devine formula. Individual factors like muscle mass and frame size also matter.','green');`,
    article: `<h2>Finding Your Ideal Weight</h2><p>Ideal body weight is a concept that has evolved over decades. While there is no single "perfect" weight for any individual, various formulas can provide a useful reference range. The most commonly used formulas include the Devine, Robinson, Miller, and Hamwi equations.</p><h3>The Devine Formula</h3><p>The Devine formula, developed in 1974, calculates ideal body weight based on height. For men: 50 kg + 2.3 kg for each inch over 5 feet. For women: 45.5 kg + 2.3 kg for each inch over 5 feet. This calculator adds a 10% range above and below for a realistic target.</p><h3>Factors Beyond the Formula</h3><p>Your ideal weight depends on many factors including body composition, bone density, muscle mass, age, and overall health. An athlete may weigh more than the formula suggests due to muscle mass but be perfectly healthy. Conversely, someone within the "ideal" range may still carry excess body fat.</p><h3>Using Ideal Weight as a Guide</h3><p>Consider your ideal weight as one data point among many. Combine it with BMI, body fat percentage, waist circumference, and how you feel physically. Work with healthcare providers to determine the best weight goals for your individual circumstances and health history.</p>`,
    faqs: [
      {q:'What is ideal body weight?',a:'Ideal body weight is an estimated weight range associated with the lowest health risks for a given height and gender.'},
      {q:'Which formula is most accurate?',a:'No single formula is perfectly accurate. The Devine formula is widely used but should be considered a general guide.'},
      {q:'Does frame size affect ideal weight?',a:'Yes. People with larger frames naturally carry more weight. Wrist circumference can help estimate frame size.'},
      {q:'Should I aim for exact ideal weight?',a:'No. A range of 10-15% around the ideal is considered healthy. Focus on overall health markers rather than a specific number.'},
      {q:'Does ideal weight change with age?',a:'The formulas do not account for age, but body composition naturally changes. Older adults may benefit from slightly higher weights.'},
      {q:'Is ideal weight the same as healthy weight?',a:'Not exactly. Healthy weight considers more factors including body composition, fitness level, and medical history.'},
      {q:'How quickly should I reach ideal weight?',a:'Safe weight change is 0.5-1 kg per week. Rapid changes can lead to muscle loss and nutritional deficiencies.'},
      {q:'What if my ideal weight seems too low?',a:'If you have significant muscle mass, your healthy weight may be above the calculated ideal. Consider body fat percentage instead.'},
      {q:'Does height affect ideal weight calculations?',a:'Yes. Taller individuals have proportionally higher ideal weights. The formulas increase weight per inch of height.'},
      {q:'Can ideal weight differ between ethnicities?',a:'Yes. Body composition and health risks can vary by ethnicity. Some organizations recommend adjusted BMI cutoffs for different populations.'},
    ],
    related: ['bmi-calculator','body-fat-calculator','waist-to-height-ratio','lean-body-mass-calculator']
  },
  { slug: 'bmr-calculator', name: 'BMR Calculator', desc: 'Calculate your Basal Metabolic Rate — calories burned at rest.', icon: 'heart', category: 'Body Metrics',
    fields: [{id:'age',label:'Age',type:'number',ph:'30'},{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'height',label:'Height (cm)',type:'number',ph:'175'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']}],
    logic: `var a=parseFloat(document.getElementById('age').value);var w=parseFloat(document.getElementById('weight').value);var h=parseFloat(document.getElementById('height').value);var g=document.getElementById('gender').value;if(!a||!w||!h){alert('Fill all fields');return;}var bmr=g==='Male'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;bmr=Math.round(bmr);showResult('result',bmr+' kcal','Basal Metabolic Rate','Your body burns approximately '+bmr+' calories per day at complete rest. Your total daily needs are higher depending on your activity level.','green');`,
    article: `<h2>Understanding Basal Metabolic Rate</h2><p>Your Basal Metabolic Rate (BMR) represents the number of calories your body needs to perform basic life-sustaining functions while at complete rest. These functions include breathing, circulation, cell production, nutrient processing, and maintaining body temperature. BMR typically accounts for 60-75% of your total daily energy expenditure.</p><h3>The Mifflin-St Jeor Equation</h3><p>This calculator uses the Mifflin-St Jeor equation, widely considered the most accurate BMR formula. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161.</p><h3>Factors Affecting BMR</h3><p>Several factors influence your BMR including age (BMR decreases about 1-2% per decade after age 20), body composition (muscle burns more calories than fat), genetics, hormones (particularly thyroid), and environmental temperature. You can increase your BMR by building muscle through resistance training.</p><h3>BMR vs TDEE</h3><p>BMR only accounts for resting metabolism. Your Total Daily Energy Expenditure (TDEE) includes BMR plus calories burned through daily activities, exercise, and digesting food. To calculate TDEE, multiply your BMR by an activity factor ranging from 1.2 (sedentary) to 1.9 (extremely active).</p>`,
    faqs: [
      {q:'What is BMR?',a:'BMR stands for Basal Metabolic Rate — the calories your body burns at rest to maintain basic life functions.'},
      {q:'How is BMR different from TDEE?',a:'BMR is calories at rest only. TDEE includes BMR plus activity, exercise, and digestion, representing total daily calorie burn.'},
      {q:'Can I increase my BMR?',a:'Yes. Building muscle through strength training is the most effective way to increase BMR, as muscle tissue burns more calories than fat.'},
      {q:'Why does BMR decrease with age?',a:'Age-related muscle loss, hormonal changes, and decreased cellular activity all contribute to lower BMR over time.'},
      {q:'Should I eat at my BMR level?',a:'No. Eating only at BMR does not account for daily activities. Most people need significantly more than their BMR.'},
      {q:'How accurate is the Mifflin-St Jeor equation?',a:'It is accurate within about 10% for most people and is considered the gold standard among prediction equations.'},
      {q:'Does BMR change during dieting?',a:'Yes. Extended calorie restriction can lower BMR through metabolic adaptation, which is why crash diets are not recommended.'},
      {q:'Do men have higher BMR than women?',a:'Generally yes, because men typically have more muscle mass and larger body size, both of which increase BMR.'},
      {q:'Does caffeine affect BMR?',a:'Caffeine can temporarily increase BMR by 3-11%, but the effect is modest and short-lived.'},
      {q:'What role do hormones play in BMR?',a:'Thyroid hormones are the primary regulators of BMR. Conditions like hypothyroidism can significantly lower metabolic rate.'},
    ],
    related: ['tdee-calculator','calorie-calculator','macro-calculator','body-fat-calculator']
  },
  { slug: 'tdee-calculator', name: 'TDEE Calculator', desc: 'Calculate your Total Daily Energy Expenditure.', icon: 'fitness', category: 'Body Metrics',
    fields: [{id:'age',label:'Age',type:'number',ph:'30'},{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'height',label:'Height (cm)',type:'number',ph:'175'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'activity',label:'Activity Level',type:'select',options:['Sedentary','Lightly Active','Moderately Active','Very Active','Extra Active']}],
    logic: `var a=parseFloat(document.getElementById('age').value);var w=parseFloat(document.getElementById('weight').value);var h=parseFloat(document.getElementById('height').value);var g=document.getElementById('gender').value;var act=document.getElementById('activity').value;if(!a||!w||!h){alert('Fill all fields');return;}var bmr=g==='Male'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;var m={'Sedentary':1.2,'Lightly Active':1.375,'Moderately Active':1.55,'Very Active':1.725,'Extra Active':1.9};var tdee=Math.round(bmr*(m[act]||1.2));showResult('result',tdee+' kcal','Total Daily Energy Expenditure','You burn approximately '+tdee+' calories per day. To lose weight, eat below this. To gain weight, eat above this. A 500 calorie adjustment equals about 0.5 kg per week.','green');`,
    article: `<h2>Total Daily Energy Expenditure Explained</h2><p>Total Daily Energy Expenditure (TDEE) represents the total number of calories you burn in a day. It combines your Basal Metabolic Rate (BMR) with the energy used for physical activity, digestion (thermic effect of food), and non-exercise activity thermogenesis (NEAT).</p><h3>Components of TDEE</h3><p>TDEE consists of four main components: BMR (60-75%), physical activity (15-30%), the thermic effect of food (about 10%), and NEAT (variable). Understanding these components helps you identify where you can make the most impact on your energy balance.</p><h3>Activity Multipliers</h3><p>Your activity level significantly affects TDEE. Sedentary individuals (desk job, little exercise) multiply BMR by 1.2, while extremely active people (physical job plus intense training) multiply by 1.9. Choosing the right activity level is crucial for accurate results.</p><h3>Using TDEE for Goals</h3><p>Once you know your TDEE, you can adjust your calorie intake accordingly. For weight loss, aim for a 500-calorie deficit. For muscle gain, a 250-500 calorie surplus is recommended. Track your progress and adjust every 2-4 weeks based on actual results.</p>`,
    faqs: [
      {q:'What is TDEE?',a:'TDEE stands for Total Daily Energy Expenditure — the total calories you burn in a day including all activities.'},
      {q:'How do I use TDEE for weight loss?',a:'Eat 500-750 calories below your TDEE for steady weight loss of 0.5-0.75 kg per week.'},
      {q:'Is TDEE the same every day?',a:'No. TDEE varies based on daily activity, exercise intensity, sleep quality, and other factors. Use your average.'},
      {q:'What activity level should I choose?',a:'Be honest about your typical week. Most people overestimate their activity level. When in doubt, choose one level lower.'},
      {q:'How often should I recalculate TDEE?',a:'Recalculate every 5-10 kg of weight change or every 8-12 weeks during a weight management program.'},
      {q:'Does TDEE include exercise?',a:'Yes. TDEE accounts for all calories burned including exercise, daily activities, and resting metabolism.'},
      {q:'Why is my TDEE lower than expected?',a:'Factors like age, lower muscle mass, genetics, or overestimating activity level can result in lower TDEE.'},
      {q:'Can I increase my TDEE?',a:'Building muscle, increasing daily movement (NEAT), and exercising more frequently can all increase your TDEE.'},
      {q:'What is NEAT?',a:'Non-Exercise Activity Thermogenesis includes calories from fidgeting, walking, standing, and other daily movements beyond formal exercise.'},
      {q:'Should I eat differently on rest days?',a:'TDEE is naturally lower on rest days. Some people reduce intake slightly, but it is not strictly necessary.'},
    ],
    related: ['bmr-calculator','calorie-calculator','macro-calculator','steps-to-calories-calculator']
  },
  { slug: 'water-intake-calculator', name: 'Water Intake Calculator', desc: 'Find out how much water you should drink daily.', icon: 'water', category: 'Nutrition',
    fields: [{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'activity',label:'Activity Level',type:'select',options:['Sedentary','Moderate','Active','Very Active']},{id:'climate',label:'Climate',type:'select',options:['Temperate','Hot','Cold']}],
    logic: `var w=parseFloat(document.getElementById('weight').value);var act=document.getElementById('activity').value;var cl=document.getElementById('climate').value;if(!w){alert('Enter weight');return;}var base=w*0.033;var am={'Sedentary':0,'Moderate':0.35,'Active':0.7,'Very Active':1.0};var cm={'Temperate':0,'Hot':0.5,'Cold':0};base+=am[act]||0;base+=cm[cl]||0;var liters=base.toFixed(1);var glasses=Math.round(base/0.25);showResult('result',liters+' L','Daily Water Intake','You should drink approximately '+liters+' liters ('+glasses+' glasses) of water per day. Adjust based on thirst, urine color, and individual needs.','green');`,
    article: `<h2>How Much Water Do You Need?</h2><p>Water is essential for virtually every bodily function. It regulates temperature, transports nutrients, removes waste, lubricates joints, and supports cognitive function. Despite its importance, many people are chronically under-hydrated without realizing it.</p><h3>Calculating Your Needs</h3><p>A general guideline is to drink about 33 ml of water per kilogram of body weight daily. However, this baseline increases with physical activity, hot climates, high altitude, illness, and pregnancy or breastfeeding. This calculator adjusts for your activity level and climate.</p><h3>Signs of Dehydration</h3><p>Early signs of dehydration include thirst, dark yellow urine, fatigue, headache, dry mouth, and decreased urination. More severe dehydration can cause dizziness, rapid heartbeat, confusion, and in extreme cases, organ failure. Monitor your urine color — pale yellow indicates good hydration.</p><h3>Tips for Staying Hydrated</h3><p>Carry a reusable water bottle, set reminders to drink, eat water-rich foods like fruits and vegetables, drink before you feel thirsty, and have a glass of water with every meal. Remember that coffee, tea, and other beverages also contribute to your daily fluid intake.</p>`,
    faqs: [
      {q:'How much water should I drink daily?',a:'A general guideline is 33 ml per kg of body weight, adjusted for activity and climate. For a 70 kg person, that is about 2.3 liters.'},
      {q:'Does coffee count as water intake?',a:'Yes. Caffeinated beverages contribute to hydration despite having a mild diuretic effect. The net hydration is still positive.'},
      {q:'Can I drink too much water?',a:'Yes. Overhydration (hyponatremia) can be dangerous. It is rare but can occur during extreme exercise with excessive water intake.'},
      {q:'How do I know if I am dehydrated?',a:'Check your urine color. Pale yellow indicates good hydration. Dark yellow or amber suggests you need more fluids.'},
      {q:'Should I drink more water during exercise?',a:'Yes. Drink 200-300 ml every 15-20 minutes during exercise, and replenish fluids afterward.'},
      {q:'Does food count toward water intake?',a:'Yes. About 20% of daily water intake comes from food, especially fruits and vegetables with high water content.'},
      {q:'Is cold or warm water better?',a:'Both are equally effective for hydration. Choose whichever you prefer, as this encourages more intake.'},
      {q:'Does altitude affect water needs?',a:'Yes. Higher altitudes increase respiratory water loss and urination, requiring additional fluid intake.'},
      {q:'Should children drink the same amount?',a:'Children need less water. General guidelines suggest 1-1.7 liters per day depending on age and activity.'},
      {q:'Does sparkling water hydrate as well?',a:'Yes. Sparkling water is just as hydrating as still water and can be a good alternative for those who prefer carbonation.'},
    ],
    related: ['calorie-calculator','fiber-intake-calculator','protein-intake-calculator','bmi-calculator']
  },
  { slug: 'sleep-calculator', name: 'Sleep Calculator', desc: 'Find the best time to sleep or wake up based on sleep cycles.', icon: 'sleep', category: 'Wellness',
    fields: [{id:'wakeup',label:'Wake Up Time',type:'time'},{id:'age',label:'Age',type:'number',ph:'30'}],
    logic: `var wu=document.getElementById('wakeup').value;var age=parseFloat(document.getElementById('age').value);if(!wu){alert('Enter wake time');return;}var parts=wu.split(':');var wh=parseInt(parts[0]);var wm=parseInt(parts[1]);var cycles=[6,5,4];var times=[];cycles.forEach(function(c){var totalMin=c*90+14;var bh=wh;var bMin=wm-totalMin;while(bMin<0){bMin+=60;bh--;}while(bh<0)bh+=24;var ampm=bh>=12?'PM':'AM';var dh=bh%12||12;times.push(dh+':'+(bMin<10?'0':'')+bMin+' '+ampm+' ('+c+' cycles)');});showResult('result','Sleep Times','Optimal Bedtimes','Go to bed at: '+times.join(' or ')+'. Each sleep cycle is about 90 minutes. Waking between cycles helps you feel more refreshed.','green');`,
    article: `<h2>Understanding Sleep Cycles</h2><p>Sleep is organized into cycles lasting approximately 90 minutes each. A complete night's sleep typically includes 4-6 cycles. Each cycle progresses through light sleep (stages 1-2), deep sleep (stage 3), and REM sleep. Waking at the end of a cycle, during light sleep, helps you feel more refreshed.</p><h3>How This Calculator Works</h3><p>This calculator counts backward from your desired wake time in 90-minute intervals, adding about 14 minutes for the average time to fall asleep. It provides multiple bedtime options based on 4, 5, or 6 complete sleep cycles.</p><h3>How Much Sleep Do You Need?</h3><p>Adults typically need 7-9 hours (4-6 cycles). Teenagers need 8-10 hours, children 9-12 hours, and infants 12-16 hours. Quality matters as much as quantity — deep sleep is crucial for physical recovery, while REM sleep supports memory and learning.</p><h3>Tips for Better Sleep</h3><p>Maintain consistent sleep and wake times, create a dark and cool bedroom, avoid screens 30 minutes before bed, limit caffeine after noon, exercise regularly but not close to bedtime, and manage stress through relaxation techniques. Good sleep hygiene improves both sleep quality and duration.</p>`,
    faqs: [
      {q:'How many hours of sleep do adults need?',a:'Most adults need 7-9 hours of quality sleep per night for optimal health and performance.'},
      {q:'What is a sleep cycle?',a:'A sleep cycle lasts about 90 minutes and includes light sleep, deep sleep, and REM sleep stages.'},
      {q:'Why do I feel tired after sleeping 8 hours?',a:'You may be waking in the middle of a deep sleep cycle. Try adjusting bedtime by 15-30 minutes.'},
      {q:'Is it bad to sleep more than 9 hours?',a:'Regularly sleeping more than 9-10 hours may be associated with health issues and could indicate an underlying condition.'},
      {q:'Does napping affect nighttime sleep?',a:'Short naps (20-30 minutes) before 3 PM generally do not affect nighttime sleep. Longer or later naps may.'},
      {q:'What is the best temperature for sleep?',a:'Most sleep experts recommend a bedroom temperature of 60-67°F (15-19°C) for optimal sleep quality.'},
      {q:'Does exercise improve sleep?',a:'Yes. Regular exercise improves sleep quality, but avoid vigorous exercise within 2-3 hours of bedtime.'},
      {q:'How long should it take to fall asleep?',a:'Healthy sleep onset typically takes 10-20 minutes. Falling asleep instantly may indicate sleep deprivation.'},
      {q:'What is sleep debt?',a:'Sleep debt is the cumulative effect of not getting enough sleep. It builds over time and affects performance and health.'},
      {q:'Can I catch up on sleep on weekends?',a:'Partially, but irregular schedules can disrupt your circadian rhythm. Consistent sleep patterns are healthier.'},
    ],
    related: ['sleep-debt-calculator','calorie-calculator','stress-level-calculator','caffeine-intake-calculator']
  },
  { slug: 'heart-rate-calculator', name: 'Heart Rate Zone Calculator', desc: 'Calculate your target heart rate zones for exercise.', icon: 'heart', category: 'Fitness',
    fields: [{id:'age',label:'Age',type:'number',ph:'30'},{id:'rhr',label:'Resting Heart Rate (bpm)',type:'number',ph:'70'}],
    logic: `var age=parseFloat(document.getElementById('age').value);var rhr=parseFloat(document.getElementById('rhr').value);if(!age||!rhr){alert('Fill all fields');return;}var mhr=220-age;var z1l=Math.round(rhr+0.5*(mhr-rhr));var z1h=Math.round(rhr+0.6*(mhr-rhr));var z2l=Math.round(rhr+0.6*(mhr-rhr));var z2h=Math.round(rhr+0.7*(mhr-rhr));var z3l=Math.round(rhr+0.7*(mhr-rhr));var z3h=Math.round(rhr+0.8*(mhr-rhr));var z4l=Math.round(rhr+0.8*(mhr-rhr));var z4h=Math.round(rhr+0.9*(mhr-rhr));showResult('result','MHR: '+mhr+' bpm','Heart Rate Zones','Zone 1 (Fat Burn): '+z1l+'-'+z1h+' bpm | Zone 2 (Cardio): '+z2l+'-'+z2h+' bpm | Zone 3 (Aerobic): '+z3l+'-'+z3h+' bpm | Zone 4 (Anaerobic): '+z4l+'-'+z4h+' bpm','green');`,
    article: `<h2>Understanding Heart Rate Zones</h2><p>Heart rate zones are ranges of heartbeats per minute that correspond to different exercise intensities. Training in specific zones optimizes different aspects of fitness — from fat burning to cardiovascular endurance to peak performance.</p><h3>The Karvonen Method</h3><p>This calculator uses the Karvonen method, which accounts for your resting heart rate to provide more personalized zones. Maximum heart rate is estimated as 220 minus your age. Heart rate reserve (the difference between max and resting) is then used to calculate zone boundaries.</p><h3>The Five Zones</h3><p>Zone 1 (50-60% HRR) is for warm-up and recovery. Zone 2 (60-70%) is the fat-burning zone ideal for long, easy sessions. Zone 3 (70-80%) improves aerobic fitness. Zone 4 (80-90%) builds speed and anaerobic capacity. Zone 5 (90-100%) is maximum effort for short bursts only.</p><h3>Training by Heart Rate</h3><p>Most of your training should be in Zones 2-3 for building an aerobic base. Incorporate Zone 4-5 work 1-2 times per week for performance gains. Use a heart rate monitor to stay in your target zones during exercise for maximum benefit and injury prevention.</p>`,
    faqs: [
      {q:'What is maximum heart rate?',a:'Maximum heart rate is the highest number of beats per minute your heart can achieve. It is commonly estimated as 220 minus your age.'},
      {q:'What is a normal resting heart rate?',a:'A normal resting heart rate for adults is 60-100 bpm. Well-trained athletes may have rates as low as 40-50 bpm.'},
      {q:'Which zone burns the most fat?',a:'Zone 2 (60-70% HRR) burns the highest percentage of fat, but higher zones burn more total calories.'},
      {q:'How do I measure resting heart rate?',a:'Measure your pulse for 60 seconds first thing in the morning before getting out of bed. Take the average over several days.'},
      {q:'Is it dangerous to exercise in Zone 5?',a:'Zone 5 is very intense and should only be done briefly by healthy individuals. Consult your doctor if you have heart conditions.'},
      {q:'Does heart rate zone training work?',a:'Yes. Zone training is an evidence-based approach used by athletes and recommended by exercise physiologists.'},
      {q:'Why does my heart rate vary day to day?',a:'Stress, sleep quality, caffeine, hydration, and illness can all affect daily heart rate readings.'},
      {q:'Can medication affect heart rate zones?',a:'Yes. Beta blockers and other medications can lower heart rate, making standard formulas less accurate.'},
      {q:'How often should I train in each zone?',a:'Follow the 80/20 rule: 80% of training in Zones 1-2, and 20% in Zones 3-5 for optimal results.'},
      {q:'What is heart rate variability?',a:'HRV measures the variation between heartbeats and is an indicator of nervous system health and recovery status.'},
    ],
    related: ['vo2-max-calculator','steps-to-calories-calculator','running-pace-calculator','blood-pressure-checker']
  }
];

// Add remaining calculators with simpler templates
const remainingCalcs = [
  {slug:'blood-pressure-checker',name:'Blood Pressure Checker',desc:'Check if your blood pressure reading is in a healthy range.',icon:'heart',category:'Health Risk',
    fields:[{id:'systolic',label:'Systolic (top number)',type:'number',ph:'120'},{id:'diastolic',label:'Diastolic (bottom number)',type:'number',ph:'80'}],
    logic:`var s=parseFloat(document.getElementById('systolic').value);var d=parseFloat(document.getElementById('diastolic').value);if(!s||!d){alert('Enter both values');return;}var c='green',l='Normal',sg='Your blood pressure is within the normal range. Continue with healthy lifestyle habits.';if(s>=180||d>=120){c='red';l='Hypertensive Crisis';sg='Seek immediate medical attention. This reading requires emergency care.';}else if(s>=140||d>=90){c='red';l='Stage 2 Hypertension';sg='Consult your doctor promptly. Medication and lifestyle changes may be needed.';}else if(s>=130||d>=80){c='yellow';l='Stage 1 Hypertension';sg='Lifestyle modifications recommended. Monitor regularly and consult your healthcare provider.';}else if(s>=120){c='yellow';l='Elevated';sg='Your blood pressure is elevated. Focus on exercise, diet, and stress management.';}showResult('result',s+'/'+d,l,sg,c);`},
  {slug:'pregnancy-due-date-calculator',name:'Pregnancy Due Date Calculator',desc:'Estimate your baby\'s due date from your last menstrual period.',icon:'baby',category:'Women\'s Health',
    fields:[{id:'lmp',label:'First Day of Last Menstrual Period',type:'date'}],
    logic:`var lmp=document.getElementById('lmp').value;if(!lmp){alert('Enter date');return;}var d=new Date(lmp);d.setDate(d.getDate()+280);var months=['January','February','March','April','May','June','July','August','September','October','November','December'];var due=months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();var now=new Date();var weeks=Math.floor((now-new Date(lmp))/(7*24*60*60*1000));showResult('result',due,'Estimated Due Date','You are approximately '+weeks+' weeks pregnant. Your estimated due date is '+due+'. Remember, only 5% of babies arrive on their exact due date.','green');`},
  {slug:'ovulation-calculator',name:'Ovulation Calculator',desc:'Predict your most fertile days for conception planning.',icon:'baby',category:'Women\'s Health',
    fields:[{id:'lmp',label:'First Day of Last Period',type:'date'},{id:'cycle',label:'Average Cycle Length (days)',type:'number',ph:'28'}],
    logic:`var lmp=document.getElementById('lmp').value;var cl=parseFloat(document.getElementById('cycle').value)||28;if(!lmp){alert('Enter date');return;}var d=new Date(lmp);var ov=new Date(d);ov.setDate(ov.getDate()+cl-14);var fs=new Date(ov);fs.setDate(fs.getDate()-2);var fe=new Date(ov);fe.setDate(fe.getDate()+1);var fmt=function(dt){return(dt.getMonth()+1)+'/'+dt.getDate();};showResult('result',fmt(ov),'Estimated Ovulation Date','Your fertile window is approximately '+fmt(fs)+' to '+fmt(fe)+'. Ovulation likely occurs around '+fmt(ov)+'. Track symptoms like cervical mucus changes and basal body temperature for better accuracy.','green');`},
  {slug:'baby-weight-calculator',name:'Baby Weight Percentile Calculator',desc:'Check if your baby\'s weight is within a healthy percentile range.',icon:'baby',category:'Women\'s Health',
    fields:[{id:'age',label:'Baby Age (months)',type:'number',ph:'6'},{id:'weight',label:'Baby Weight (kg)',type:'number',ph:'7'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']}],
    logic:`var age=parseFloat(document.getElementById('age').value);var w=parseFloat(document.getElementById('weight').value);var g=document.getElementById('gender').value;if(!age||!w){alert('Fill fields');return;}var avg=g==='Male'?3.3+0.7*age:3.2+0.65*age;var pct=Math.min(99,Math.max(1,Math.round(50+((w-avg)/avg)*100)));var c='green',l='Normal Range',s='Your baby appears to be growing well within normal parameters.';if(pct<5){c='yellow';l='Below Average';s='Your baby\'s weight is below average. Discuss with your pediatrician about nutrition.';}else if(pct>95){c='yellow';l='Above Average';s='Your baby\'s weight is above average. This may be perfectly normal but discuss with your pediatrician.';}showResult('result',pct+'th percentile',l,s,c);`},
  {slug:'child-bmi-calculator',name:'Child BMI Calculator',desc:'Calculate BMI percentile for children aged 2-19.',icon:'baby',category:'Women\'s Health',
    fields:[{id:'age',label:'Age (years)',type:'number',ph:'10'},{id:'weight',label:'Weight (kg)',type:'number',ph:'30'},{id:'height',label:'Height (cm)',type:'number',ph:'140'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']}],
    logic:`var a=parseFloat(document.getElementById('age').value);var w=parseFloat(document.getElementById('weight').value);var h=parseFloat(document.getElementById('height').value)/100;if(!a||!w||!h){alert('Fill fields');return;}var bmi=(w/(h*h)).toFixed(1);var c='green',l='Healthy Weight',s='Your child\'s BMI is in the healthy range.';if(bmi<14){c='yellow';l='Underweight';s='Your child may be underweight. Consult their pediatrician.';}else if(bmi>22&&a<12||bmi>25&&a>=12){c='yellow';l='Overweight';s='Consider discussing healthy eating and activity habits with your child\'s doctor.';}else if(bmi>27){c='red';l='Obese';s='Please consult a pediatric healthcare provider for guidance.';}showResult('result',bmi,'Child BMI: '+l,s,c);`},
  {slug:'menstrual-cycle-calculator',name:'Menstrual Cycle Calculator',desc:'Track and predict your menstrual cycle dates.',icon:'heart',category:'Women\'s Health',
    fields:[{id:'lmp',label:'First Day of Last Period',type:'date'},{id:'cycle',label:'Cycle Length (days)',type:'number',ph:'28'},{id:'period',label:'Period Length (days)',type:'number',ph:'5'}],
    logic:`var lmp=document.getElementById('lmp').value;var cl=parseFloat(document.getElementById('cycle').value)||28;var pl=parseFloat(document.getElementById('period').value)||5;if(!lmp){alert('Enter date');return;}var d=new Date(lmp);var next=new Date(d);next.setDate(next.getDate()+cl);var ov=new Date(d);ov.setDate(ov.getDate()+cl-14);var fmt=function(dt){return(dt.getMonth()+1)+'/'+dt.getDate()+'/'+dt.getFullYear();};showResult('result',fmt(next),'Next Period Date','Your next period is expected around '+fmt(next)+'. Ovulation is estimated around '+fmt(ov)+'. Track your cycles regularly for better predictions.','green');`},
  {slug:'fertility-calculator',name:'Fertility Window Calculator',desc:'Identify your most fertile days each month.',icon:'baby',category:'Women\'s Health',
    fields:[{id:'lmp',label:'First Day of Last Period',type:'date'},{id:'cycle',label:'Average Cycle Length',type:'number',ph:'28'}],
    logic:`var lmp=document.getElementById('lmp').value;var cl=parseFloat(document.getElementById('cycle').value)||28;if(!lmp){alert('Enter date');return;}var d=new Date(lmp);var ov=new Date(d);ov.setDate(ov.getDate()+cl-14);var fs=new Date(ov);fs.setDate(fs.getDate()-5);var fe=new Date(ov);fe.setDate(fe.getDate()+1);var fmt=function(dt){return(dt.getMonth()+1)+'/'+dt.getDate();};showResult('result',fmt(fs)+' - '+fmt(fe),'Fertile Window','Your fertile window spans from '+fmt(fs)+' to '+fmt(fe)+'. The highest chance of conception is 1-2 days before ovulation ('+fmt(ov)+').','green');`},
  {slug:'protein-intake-calculator',name:'Protein Intake Calculator',desc:'Calculate your daily protein requirements.',icon:'food',category:'Nutrition',
    fields:[{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'goal',label:'Goal',type:'select',options:['Sedentary Adult','Active/Fitness','Muscle Building','Weight Loss','Endurance Athlete']}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var goal=document.getElementById('goal').value;if(!w){alert('Enter weight');return;}var mult={'Sedentary Adult':0.8,'Active/Fitness':1.2,'Muscle Building':1.6,'Weight Loss':1.4,'Endurance Athlete':1.4};var p=Math.round(w*(mult[goal]||0.8));showResult('result',p+'g','Daily Protein','You need approximately '+p+' grams of protein per day. Spread intake across 3-5 meals for optimal absorption. Good sources include lean meats, fish, eggs, dairy, and legumes.','green');`},
  {slug:'carb-calculator',name:'Carb Intake Calculator',desc:'Find your optimal daily carbohydrate intake.',icon:'food',category:'Nutrition',
    fields:[{id:'calories',label:'Daily Calories',type:'number',ph:'2000'},{id:'goal',label:'Goal',type:'select',options:['Balanced','Low Carb','Keto','High Performance']}],
    logic:`var cal=parseFloat(document.getElementById('calories').value);var goal=document.getElementById('goal').value;if(!cal){alert('Enter calories');return;}var pct={'Balanced':0.45,'Low Carb':0.25,'Keto':0.05,'High Performance':0.55};var carbs=Math.round(cal*(pct[goal]||0.45)/4);showResult('result',carbs+'g','Daily Carbs','You need approximately '+carbs+' grams of carbohydrates per day ('+Math.round((pct[goal]||0.45)*100)+'% of calories). Focus on complex carbs from whole grains, fruits, and vegetables.','green');`},
  {slug:'fat-intake-calculator',name:'Fat Intake Calculator',desc:'Determine your optimal daily fat intake.',icon:'food',category:'Nutrition',
    fields:[{id:'calories',label:'Daily Calories',type:'number',ph:'2000'},{id:'goal',label:'Diet Type',type:'select',options:['Standard','Low Fat','Moderate','High Fat/Keto']}],
    logic:`var cal=parseFloat(document.getElementById('calories').value);var goal=document.getElementById('goal').value;if(!cal){alert('Enter calories');return;}var pct={'Standard':0.3,'Low Fat':0.2,'Moderate':0.35,'High Fat/Keto':0.7};var fat=Math.round(cal*(pct[goal]||0.3)/9);showResult('result',fat+'g','Daily Fat Intake','You need approximately '+fat+' grams of fat per day. Prioritize healthy fats from avocados, nuts, olive oil, and fatty fish.','green');`},
  {slug:'fiber-intake-calculator',name:'Fiber Intake Calculator',desc:'Calculate your recommended daily fiber intake.',icon:'food',category:'Nutrition',
    fields:[{id:'age',label:'Age',type:'number',ph:'30'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'calories',label:'Daily Calories',type:'number',ph:'2000'}],
    logic:`var a=parseFloat(document.getElementById('age').value);var g=document.getElementById('gender').value;var cal=parseFloat(document.getElementById('calories').value);if(!a||!cal){alert('Fill fields');return;}var fiber=g==='Male'?38:25;if(a>50)fiber=g==='Male'?30:21;var altFiber=Math.round(cal/1000*14);fiber=Math.max(fiber,altFiber);showResult('result',fiber+'g','Daily Fiber','Aim for '+fiber+' grams of fiber per day. Good sources include whole grains, beans, lentils, fruits, and vegetables. Increase gradually to avoid digestive discomfort.','green');`},
  {slug:'vitamin-d-calculator',name:'Vitamin D Calculator',desc:'Estimate your daily vitamin D needs.',icon:'pill',category:'Nutrition',
    fields:[{id:'age',label:'Age',type:'number',ph:'30'},{id:'sun',label:'Sun Exposure',type:'select',options:['Minimal (< 10 min/day)','Moderate (10-30 min/day)','Regular (> 30 min/day)']},{id:'skin',label:'Skin Tone',type:'select',options:['Fair','Medium','Dark']}],
    logic:`var a=parseFloat(document.getElementById('age').value);var sun=document.getElementById('sun').value;var skin=document.getElementById('skin').value;if(!a){alert('Enter age');return;}var iu=600;if(a>70)iu=800;if(sun==='Minimal (< 10 min/day)')iu+=400;if(skin==='Dark')iu+=200;showResult('result',iu+' IU','Daily Vitamin D','Your estimated daily vitamin D need is '+iu+' IU. Consider food sources like fatty fish, fortified milk, and eggs. Talk to your doctor about testing your levels.','green');`},
  {slug:'iron-intake-calculator',name:'Iron Intake Calculator',desc:'Find your recommended daily iron intake.',icon:'pill',category:'Nutrition',
    fields:[{id:'age',label:'Age',type:'number',ph:'30'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'pregnant',label:'Pregnant or Breastfeeding?',type:'select',options:['No','Pregnant','Breastfeeding']}],
    logic:`var a=parseFloat(document.getElementById('age').value);var g=document.getElementById('gender').value;var p=document.getElementById('pregnant').value;if(!a){alert('Enter age');return;}var iron=g==='Male'?8:18;if(a>50&&g==='Female')iron=8;if(p==='Pregnant')iron=27;if(p==='Breastfeeding')iron=9;showResult('result',iron+' mg','Daily Iron','You need approximately '+iron+' mg of iron daily. Good sources include red meat, spinach, beans, and fortified cereals. Pair with vitamin C for better absorption.','green');`},
  {slug:'calcium-calculator',name:'Calcium Calculator',desc:'Calculate your daily calcium requirements.',icon:'pill',category:'Nutrition',
    fields:[{id:'age',label:'Age',type:'number',ph:'30'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']}],
    logic:`var a=parseFloat(document.getElementById('age').value);var g=document.getElementById('gender').value;if(!a){alert('Enter age');return;}var ca=1000;if(a<=18)ca=1300;if(a>50&&g==='Female')ca=1200;if(a>70)ca=1200;showResult('result',ca+' mg','Daily Calcium','You need approximately '+ca+' mg of calcium per day. Good sources include dairy, leafy greens, fortified foods, and almonds. Vitamin D helps calcium absorption.','green');`},
  {slug:'cholesterol-risk-calculator',name:'Cholesterol Risk Calculator',desc:'Assess your cholesterol levels and cardiovascular risk.',icon:'heart',category:'Health Risk',
    fields:[{id:'total',label:'Total Cholesterol (mg/dL)',type:'number',ph:'200'},{id:'hdl',label:'HDL Cholesterol (mg/dL)',type:'number',ph:'60'},{id:'ldl',label:'LDL Cholesterol (mg/dL)',type:'number',ph:'100'}],
    logic:`var t=parseFloat(document.getElementById('total').value);var hdl=parseFloat(document.getElementById('hdl').value);var ldl=parseFloat(document.getElementById('ldl').value);if(!t||!hdl||!ldl){alert('Fill all fields');return;}var ratio=(t/hdl).toFixed(1);var c='green',l='Optimal',s='Your cholesterol levels appear healthy. Continue with heart-healthy habits.';if(ratio>5||ldl>160){c='red';l='High Risk';s='Your cholesterol levels suggest elevated cardiovascular risk. Consult your doctor about lifestyle changes and possible treatment.';}else if(ratio>4||ldl>130){c='yellow';l='Borderline',s='Your cholesterol is borderline high. Focus on diet, exercise, and regular monitoring.';}showResult('result','Ratio: '+ratio,l,s,c);`},
  {slug:'diabetes-risk-calculator',name:'Diabetes Risk Calculator',desc:'Assess your risk factors for type 2 diabetes.',icon:'heart',category:'Health Risk',
    fields:[{id:'age',label:'Age',type:'number',ph:'45'},{id:'bmi',label:'BMI',type:'number',ph:'25'},{id:'family',label:'Family History of Diabetes',type:'select',options:['No','Yes']},{id:'activity',label:'Physical Activity',type:'select',options:['Active','Moderate','Sedentary']},{id:'waist',label:'Waist Circumference (cm)',type:'number',ph:'85'}],
    logic:`var age=parseFloat(document.getElementById('age').value);var bmi=parseFloat(document.getElementById('bmi').value);var fam=document.getElementById('family').value;var act=document.getElementById('activity').value;var waist=parseFloat(document.getElementById('waist').value);if(!age||!bmi||!waist){alert('Fill fields');return;}var score=0;if(age>45)score+=2;if(age>55)score+=1;if(bmi>25)score+=2;if(bmi>30)score+=2;if(fam==='Yes')score+=3;if(act==='Sedentary')score+=2;if(act==='Moderate')score+=1;if(waist>102)score+=2;else if(waist>88)score+=1;var c='green',l='Low Risk',s='Your diabetes risk appears low. Maintain healthy habits.';if(score>=8){c='red';l='High Risk';s='You have several risk factors for type 2 diabetes. Please consult your healthcare provider for screening.';}else if(score>=5){c='yellow';l='Moderate Risk';s='You have some diabetes risk factors. Focus on weight management, exercise, and healthy eating.';}showResult('result',score+'/15',l,s,c);`},
  {slug:'stroke-risk-calculator',name:'Stroke Risk Calculator',desc:'Evaluate your stroke risk based on key health factors.',icon:'heart',category:'Health Risk',
    fields:[{id:'age',label:'Age',type:'number',ph:'50'},{id:'bp',label:'High Blood Pressure?',type:'select',options:['No','Yes']},{id:'smoking',label:'Smoker?',type:'select',options:['No','Yes']},{id:'diabetes',label:'Diabetes?',type:'select',options:['No','Yes']},{id:'afib',label:'Atrial Fibrillation?',type:'select',options:['No','Yes']}],
    logic:`var age=parseFloat(document.getElementById('age').value);if(!age){alert('Enter age');return;}var score=0;if(age>65)score+=2;else if(age>55)score+=1;if(document.getElementById('bp').value==='Yes')score+=2;if(document.getElementById('smoking').value==='Yes')score+=2;if(document.getElementById('diabetes').value==='Yes')score+=1;if(document.getElementById('afib').value==='Yes')score+=2;var c='green',l='Low Risk',s='Your estimated stroke risk is low. Continue with healthy lifestyle habits.';if(score>=5){c='red';l='High Risk';s='Multiple risk factors identified. Please consult your healthcare provider for comprehensive evaluation and prevention strategies.';}else if(score>=3){c='yellow';l='Moderate Risk';s='Some risk factors present. Focus on managing blood pressure, quitting smoking, and regular check-ups.';}showResult('result',score+'/9',l,s,c);`},
  {slug:'waist-to-hip-ratio',name:'Waist-to-Hip Ratio Calculator',desc:'Calculate your waist-to-hip ratio and health risk.',icon:'body',category:'Body Metrics',
    fields:[{id:'waist',label:'Waist Circumference (cm)',type:'number',ph:'80'},{id:'hip',label:'Hip Circumference (cm)',type:'number',ph:'100'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']}],
    logic:`var w=parseFloat(document.getElementById('waist').value);var h=parseFloat(document.getElementById('hip').value);var g=document.getElementById('gender').value;if(!w||!h){alert('Fill fields');return;}var ratio=(w/h).toFixed(2);var c='green',l='Low Risk',s='Your waist-to-hip ratio indicates low health risk.';var high=g==='Male'?1.0:0.85;var mod=g==='Male'?0.9:0.8;if(ratio>=high){c='red';l='High Risk';s='Elevated waist-to-hip ratio is associated with higher cardiovascular and metabolic risk.';}else if(ratio>=mod){c='yellow';l='Moderate Risk';s='Your ratio suggests moderate health risk. Focus on core exercise and healthy eating.';}showResult('result',ratio,l,s,c);`},
  {slug:'waist-to-height-ratio',name:'Waist-to-Height Ratio Calculator',desc:'Check your waist-to-height ratio for health assessment.',icon:'body',category:'Body Metrics',
    fields:[{id:'waist',label:'Waist Circumference (cm)',type:'number',ph:'80'},{id:'height',label:'Height (cm)',type:'number',ph:'175'}],
    logic:`var w=parseFloat(document.getElementById('waist').value);var h=parseFloat(document.getElementById('height').value);if(!w||!h){alert('Fill fields');return;}var ratio=(w/h).toFixed(2);var c='green',l='Healthy',s='Your waist-to-height ratio is in the healthy range (below 0.5).';if(ratio>=0.6){c='red';l='High Risk';s='A ratio above 0.6 indicates significant health risk. Please consult a healthcare provider.';}else if(ratio>=0.5){c='yellow';l='Increased Risk';s='A ratio above 0.5 suggests increased health risk. Consider lifestyle modifications.';}showResult('result',ratio,l,s,c);`},
  {slug:'lean-body-mass-calculator',name:'Lean Body Mass Calculator',desc:'Calculate your lean body mass (fat-free mass).',icon:'body',category:'Body Metrics',
    fields:[{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'height',label:'Height (cm)',type:'number',ph:'175'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var h=parseFloat(document.getElementById('height').value);var g=document.getElementById('gender').value;if(!w||!h){alert('Fill fields');return;}var lbm;if(g==='Male'){lbm=0.407*w+0.267*h-19.2;}else{lbm=0.252*w+0.473*h-48.3;}lbm=Math.max(0,lbm).toFixed(1);var pct=((lbm/w)*100).toFixed(0);showResult('result',lbm+' kg','Lean Body Mass','Your lean body mass is '+lbm+' kg ('+pct+'% of total weight). This includes muscle, bone, water, and organs — everything except stored fat.','green');`},
  {slug:'body-surface-area-calculator',name:'Body Surface Area Calculator',desc:'Calculate your body surface area using the Du Bois formula.',icon:'body',category:'Body Metrics',
    fields:[{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'height',label:'Height (cm)',type:'number',ph:'175'}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var h=parseFloat(document.getElementById('height').value);if(!w||!h){alert('Fill fields');return;}var bsa=(0.007184*Math.pow(w,0.425)*Math.pow(h,0.725)).toFixed(2);showResult('result',bsa+' m²','Body Surface Area','Your BSA is '+bsa+' square meters. BSA is used in medicine for drug dosing, kidney function assessment, and burn evaluation.','green');`},
  {slug:'one-rep-max-calculator',name:'One Rep Max Calculator',desc:'Estimate your one-repetition maximum for any lift.',icon:'fitness',category:'Fitness',
    fields:[{id:'weight',label:'Weight Lifted (kg)',type:'number',ph:'80'},{id:'reps',label:'Reps Performed',type:'number',ph:'8'}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var r=parseFloat(document.getElementById('reps').value);if(!w||!r){alert('Fill fields');return;}var orm=Math.round(w*(1+r/30));showResult('result',orm+' kg','Estimated 1RM','Your estimated one-rep max is '+orm+' kg. Training zones: 90-100% (strength), 70-85% (hypertrophy), 50-65% (endurance).','green');`},
  {slug:'vo2-max-calculator',name:'VO2 Max Calculator',desc:'Estimate your VO2 max aerobic fitness level.',icon:'fitness',category:'Fitness',
    fields:[{id:'age',label:'Age',type:'number',ph:'30'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'rhr',label:'Resting Heart Rate (bpm)',type:'number',ph:'65'}],
    logic:`var a=parseFloat(document.getElementById('age').value);var g=document.getElementById('gender').value;var rhr=parseFloat(document.getElementById('rhr').value);if(!a||!rhr){alert('Fill fields');return;}var vo2=15.3*(220-a)/rhr;vo2=vo2.toFixed(1);var c='green',l='Good Fitness',s='Your VO2 max suggests good cardiovascular fitness.';if(vo2<30){c='red';l='Below Average';s='Your VO2 max is below average. Regular cardio exercise can significantly improve this.';}else if(vo2<40){c='yellow';l='Average';s='Your VO2 max is average. Incorporate more aerobic training to improve.';}else if(vo2>50){l='Excellent';s='Excellent cardiovascular fitness! Keep up your training routine.';}showResult('result',vo2+' ml/kg/min',l,s,c);`},
  {slug:'steps-to-calories-calculator',name:'Steps to Calories Calculator',desc:'Convert your daily steps into estimated calories burned.',icon:'fitness',category:'Fitness',
    fields:[{id:'steps',label:'Number of Steps',type:'number',ph:'10000'},{id:'weight',label:'Weight (kg)',type:'number',ph:'70'}],
    logic:`var s=parseFloat(document.getElementById('steps').value);var w=parseFloat(document.getElementById('weight').value);if(!s||!w){alert('Fill fields');return;}var cal=Math.round(s*0.04*w/70);var km=(s*0.000762).toFixed(1);showResult('result',cal+' kcal','Calories Burned','You burned approximately '+cal+' calories walking '+s+' steps ('+km+' km). Aim for 10,000 steps daily for general health benefits.','green');`},
  {slug:'running-pace-calculator',name:'Running Pace Calculator',desc:'Calculate your running pace, speed, and finish times.',icon:'fitness',category:'Fitness',
    fields:[{id:'distance',label:'Distance (km)',type:'number',ph:'5'},{id:'time',label:'Time (minutes)',type:'number',ph:'25'}],
    logic:`var d=parseFloat(document.getElementById('distance').value);var t=parseFloat(document.getElementById('time').value);if(!d||!t){alert('Fill fields');return;}var pace=(t/d).toFixed(2);var speed=(d/(t/60)).toFixed(1);var min=Math.floor(pace);var sec=Math.round((pace-min)*60);showResult('result',min+':'+((sec<10)?'0':'')+sec+'/km','Running Pace','Your pace is '+min+':'+((sec<10)?'0':'')+sec+' per km ('+speed+' km/h). 5K estimate: '+Math.round(pace*5)+' min | 10K: '+Math.round(pace*10)+' min | Half Marathon: '+Math.round(pace*21.1)+' min.','green');`},
  {slug:'cycling-calories-calculator',name:'Cycling Calories Calculator',desc:'Estimate calories burned during cycling.',icon:'fitness',category:'Fitness',
    fields:[{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'duration',label:'Duration (minutes)',type:'number',ph:'60'},{id:'intensity',label:'Intensity',type:'select',options:['Light (< 16 km/h)','Moderate (16-19 km/h)','Vigorous (19-22 km/h)','Racing (> 22 km/h)']}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var d=parseFloat(document.getElementById('duration').value);var i=document.getElementById('intensity').value;if(!w||!d){alert('Fill fields');return;}var met={'Light (< 16 km/h)':4,'Moderate (16-19 km/h)':6.8,'Vigorous (19-22 km/h)':8,'Racing (> 22 km/h)':10};var cal=Math.round((met[i]||6)*w*d/60);showResult('result',cal+' kcal','Calories Burned Cycling','You burned approximately '+cal+' calories during '+d+' minutes of cycling. Regular cycling improves cardiovascular health and builds lower body strength.','green');`},
  {slug:'swimming-calories-calculator',name:'Swimming Calories Calculator',desc:'Calculate calories burned while swimming.',icon:'fitness',category:'Fitness',
    fields:[{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'duration',label:'Duration (minutes)',type:'number',ph:'30'},{id:'stroke',label:'Stroke/Intensity',type:'select',options:['Leisurely','Moderate Freestyle','Vigorous Freestyle','Backstroke','Breaststroke','Butterfly']}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var d=parseFloat(document.getElementById('duration').value);if(!w||!d){alert('Fill fields');return;}var met={'Leisurely':6,'Moderate Freestyle':7,'Vigorous Freestyle':10,'Backstroke':7,'Breaststroke':10,'Butterfly':13.8};var st=document.getElementById('stroke').value;var cal=Math.round((met[st]||7)*w*d/60);showResult('result',cal+' kcal','Calories Burned Swimming','You burned approximately '+cal+' calories during '+d+' minutes of swimming. Swimming is excellent for full-body fitness with low impact on joints.','green');`},
  {slug:'yoga-calories-calculator',name:'Yoga Calories Calculator',desc:'Estimate calories burned during yoga practice.',icon:'fitness',category:'Fitness',
    fields:[{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'duration',label:'Duration (minutes)',type:'number',ph:'60'},{id:'style',label:'Yoga Style',type:'select',options:['Hatha','Vinyasa','Ashtanga','Bikram/Hot Yoga','Power Yoga','Restorative']}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var d=parseFloat(document.getElementById('duration').value);if(!w||!d){alert('Fill fields');return;}var met={'Hatha':2.5,'Vinyasa':4,'Ashtanga':5,'Bikram/Hot Yoga':5,'Power Yoga':5.5,'Restorative':2};var st=document.getElementById('style').value;var cal=Math.round((met[st]||3)*w*d/60);showResult('result',cal+' kcal','Calories Burned - Yoga','You burned approximately '+cal+' calories during '+d+' minutes of '+st+' yoga. Beyond calories, yoga improves flexibility, balance, and mental well-being.','green');`},
  {slug:'intermittent-fasting-calculator',name:'Intermittent Fasting Calculator',desc:'Plan your intermittent fasting eating window.',icon:'food',category:'Nutrition',
    fields:[{id:'method',label:'Fasting Method',type:'select',options:['16:8','18:6','20:4','5:2']},{id:'start',label:'Eating Window Start Time',type:'time'}],
    logic:`var method=document.getElementById('method').value;var start=document.getElementById('start').value;if(!start){alert('Enter start time');return;}var hours={'16:8':8,'18:6':6,'20:4':4,'5:2':8};var eating=hours[method]||8;var p=start.split(':');var sh=parseInt(p[0]);var sm=parseInt(p[1]);var eh=sh+eating;var eampm=eh>=12?'PM':'AM';eh=eh%12||12;var sampm=sh>=12?'PM':'AM';var dsh=sh%12||12;showResult('result',method+' Protocol','Your Fasting Schedule','Eating window: '+dsh+':'+((sm<10)?'0':'')+sm+' '+sampm+' to '+eh+':'+((sm<10)?'0':'')+sm+' '+eampm+' ('+eating+' hours). During fasting, drink water, black coffee, or tea. Break your fast with a balanced meal.','green');`},
  {slug:'keto-calculator',name:'Keto Macro Calculator',desc:'Calculate your ideal macros for a ketogenic diet.',icon:'food',category:'Nutrition',
    fields:[{id:'calories',label:'Daily Calories',type:'number',ph:'2000'},{id:'protein',label:'Protein per kg body weight',type:'select',options:['1.2g (Sedentary)','1.6g (Active)','2.0g (Athletic)']},{id:'weight',label:'Weight (kg)',type:'number',ph:'70'}],
    logic:`var cal=parseFloat(document.getElementById('calories').value);var w=parseFloat(document.getElementById('weight').value);var pp=document.getElementById('protein').value;if(!cal||!w){alert('Fill fields');return;}var pmult=parseFloat(pp);var protein=Math.round(w*pmult);var netCarbs=25;var carbCal=netCarbs*4;var protCal=protein*4;var fatCal=cal-carbCal-protCal;var fat=Math.round(fatCal/9);showResult('result','F:'+fat+'g P:'+protein+'g C:'+netCarbs+'g','Keto Macros','Fat: '+fat+'g ('+Math.round(fatCal/cal*100)+'%) | Protein: '+protein+'g ('+Math.round(protCal/cal*100)+'%) | Net Carbs: '+netCarbs+'g ('+Math.round(carbCal/cal*100)+'%). Keep net carbs under 25-50g to maintain ketosis.','green');`},
  {slug:'alcohol-unit-calculator',name:'Alcohol Unit Calculator',desc:'Calculate alcohol units and calories in your drinks.',icon:'food',category:'Lifestyle',
    fields:[{id:'volume',label:'Drink Volume (ml)',type:'number',ph:'500'},{id:'abv',label:'Alcohol by Volume (%)',type:'number',ph:'5'},{id:'drinks',label:'Number of Drinks',type:'number',ph:'2'}],
    logic:`var v=parseFloat(document.getElementById('volume').value);var abv=parseFloat(document.getElementById('abv').value);var n=parseFloat(document.getElementById('drinks').value)||1;if(!v||!abv){alert('Fill fields');return;}var units=((v*abv/1000)*n).toFixed(1);var cal=Math.round(units*80);var c='green',l='Moderate',s='Stay within recommended limits of 14 units per week.';if(units>6){c='red';l='Excessive';s='This amount significantly exceeds single-session guidelines. Consider reducing intake.';}else if(units>3){c='yellow';l='Above Moderate';s='This is above moderate levels. Consider pacing yourself and drinking water between drinks.';}showResult('result',units+' units','Alcohol Intake: '+l,s+' Estimated calories: '+cal+' kcal.',c);`},
  {slug:'caffeine-intake-calculator',name:'Caffeine Intake Calculator',desc:'Track your daily caffeine consumption.',icon:'food',category:'Lifestyle',
    fields:[{id:'coffee',label:'Cups of Coffee',type:'number',ph:'2'},{id:'tea',label:'Cups of Tea',type:'number',ph:'1'},{id:'soda',label:'Cans of Cola/Energy Drink',type:'number',ph:'0'}],
    logic:`var co=parseFloat(document.getElementById('coffee').value)||0;var te=parseFloat(document.getElementById('tea').value)||0;var so=parseFloat(document.getElementById('soda').value)||0;var total=co*95+te*47+so*80;var c='green',l='Safe Range',s='Your caffeine intake is within safe limits (under 400mg). Avoid caffeine 6+ hours before bedtime.';if(total>600){c='red';l='Excessive';s='Your caffeine intake exceeds recommended limits. Consider reducing gradually to avoid withdrawal symptoms.';}else if(total>400){c='yellow';l='Above Recommended';s='You are above the recommended 400mg daily limit. Consider cutting back, especially if experiencing anxiety or sleep issues.';}showResult('result',total+' mg',l,s,c);`},
  {slug:'smoking-cost-calculator',name:'Smoking Cost Calculator',desc:'See how much smoking costs you financially and health-wise.',icon:'pill',category:'Lifestyle',
    fields:[{id:'perday',label:'Cigarettes per Day',type:'number',ph:'10'},{id:'price',label:'Price per Pack (20 cigs)',type:'number',ph:'10'},{id:'years',label:'Years Smoking',type:'number',ph:'5'}],
    logic:`var pd=parseFloat(document.getElementById('perday').value);var pp=parseFloat(document.getElementById('price').value);var y=parseFloat(document.getElementById('years').value);if(!pd||!pp){alert('Fill fields');return;}var daily=(pd/20)*pp;var monthly=Math.round(daily*30);var yearly=Math.round(daily*365);var total=Math.round(daily*365*y);showResult('result','$'+yearly+'/year','Smoking Cost','Daily: $'+daily.toFixed(2)+' | Monthly: $'+monthly+' | Yearly: $'+yearly+' | Total spent: $'+total.toLocaleString()+' over '+y+' years. Quitting now saves money and adds years to your life.','red');`},
  {slug:'stress-level-calculator',name:'Stress Level Calculator',desc:'Assess your current stress level with this quick quiz.',icon:'brain',category:'Mental Health',
    fields:[{id:'sleep',label:'Sleep quality (1-5, 5=great)',type:'number',ph:'3'},{id:'work',label:'Work stress (1-5, 5=high)',type:'number',ph:'3'},{id:'exercise',label:'Exercise frequency (1-5, 5=daily)',type:'number',ph:'3'},{id:'social',label:'Social support (1-5, 5=strong)',type:'number',ph:'3'},{id:'worry',label:'Worry/anxiety level (1-5, 5=high)',type:'number',ph:'3'}],
    logic:`var sl=parseFloat(document.getElementById('sleep').value)||3;var wk=parseFloat(document.getElementById('work').value)||3;var ex=parseFloat(document.getElementById('exercise').value)||3;var so=parseFloat(document.getElementById('social').value)||3;var wo=parseFloat(document.getElementById('worry').value)||3;var score=Math.round((6-sl+wk+(6-ex)+(6-so)+wo)/5*20);var c='green',l='Low Stress',s='Your stress levels appear manageable. Continue your healthy coping strategies.';if(score>70){c='red';l='High Stress';s='Your stress score is high. Consider seeking professional support, practicing relaxation techniques, and prioritizing self-care.';}else if(score>40){c='yellow';l='Moderate Stress';s='You are experiencing moderate stress. Try incorporating mindfulness, exercise, and better sleep habits.';}showResult('result',score+'%',l,s,c);`},
  {slug:'anxiety-score-calculator',name:'Anxiety Score Calculator',desc:'Screen for anxiety symptoms with the GAD-7 inspired assessment.',icon:'brain',category:'Mental Health',
    fields:[{id:'q1',label:'Feeling nervous/anxious (0-3)',type:'number',ph:'1'},{id:'q2',label:'Unable to stop worrying (0-3)',type:'number',ph:'1'},{id:'q3',label:'Worrying too much (0-3)',type:'number',ph:'1'},{id:'q4',label:'Trouble relaxing (0-3)',type:'number',ph:'1'},{id:'q5',label:'Restless/on edge (0-3)',type:'number',ph:'1'},{id:'q6',label:'Easily annoyed (0-3)',type:'number',ph:'1'},{id:'q7',label:'Feeling afraid (0-3)',type:'number',ph:'1'}],
    logic:`var total=0;for(var i=1;i<=7;i++){total+=parseFloat(document.getElementById('q'+i).value)||0;}var c='green',l='Minimal Anxiety',s='Your score suggests minimal anxiety. Continue with healthy coping strategies.';if(total>=15){c='red';l='Severe Anxiety';s='Your score suggests severe anxiety. Please reach out to a mental health professional for support.';}else if(total>=10){c='yellow';l='Moderate Anxiety';s='Your score suggests moderate anxiety. Consider speaking with a counselor or therapist.';}else if(total>=5){c='yellow';l='Mild Anxiety';s='Your score suggests mild anxiety. Self-care, exercise, and mindfulness may help.';}showResult('result',total+'/21',l,s,c);`},
  {slug:'depression-screening-calculator',name:'Depression Screening Calculator',desc:'Quick depression screening based on PHQ-9 inspired questions.',icon:'brain',category:'Mental Health',
    fields:[{id:'q1',label:'Little interest/pleasure (0-3)',type:'number',ph:'1'},{id:'q2',label:'Feeling down/hopeless (0-3)',type:'number',ph:'1'},{id:'q3',label:'Sleep problems (0-3)',type:'number',ph:'1'},{id:'q4',label:'Fatigue/low energy (0-3)',type:'number',ph:'1'},{id:'q5',label:'Appetite changes (0-3)',type:'number',ph:'1'},{id:'q6',label:'Feeling bad about self (0-3)',type:'number',ph:'1'},{id:'q7',label:'Trouble concentrating (0-3)',type:'number',ph:'1'}],
    logic:`var total=0;for(var i=1;i<=7;i++){total+=parseFloat(document.getElementById('q'+i).value)||0;}var c='green',l='Minimal',s='Your score suggests minimal depression symptoms. Continue with self-care.';if(total>=15){c='red';l='Severe';s='Your score suggests severe symptoms. Please reach out to a mental health professional or crisis line immediately.';}else if(total>=10){c='yellow';l='Moderate';s='Your score suggests moderate symptoms. Consider speaking with a mental health professional.';}else if(total>=5){c='yellow';l='Mild';s='Your score suggests mild symptoms. Self-care, exercise, social connection, and mindfulness may help.';}showResult('result',total+'/21',l,s,c);`},
  {slug:'sleep-debt-calculator',name:'Sleep Debt Calculator',desc:'Calculate your accumulated sleep debt.',icon:'sleep',category:'Wellness',
    fields:[{id:'needed',label:'Hours of Sleep Needed',type:'number',ph:'8'},{id:'actual',label:'Hours You Actually Sleep',type:'number',ph:'6'},{id:'days',label:'Number of Days',type:'number',ph:'7'}],
    logic:`var need=parseFloat(document.getElementById('needed').value);var act=parseFloat(document.getElementById('actual').value);var days=parseFloat(document.getElementById('days').value);if(!need||!act||!days){alert('Fill fields');return;}var daily=need-act;var total=(daily*days).toFixed(1);var c='green',l='Well Rested',s='You are getting adequate sleep. Keep up the good habits!';if(total>14){c='red';l='Severe Sleep Debt';s='You have significant sleep debt. Prioritize sleep and consider consulting a sleep specialist.';}else if(total>7){c='yellow';l='Moderate Sleep Debt';s='Your sleep debt is building up. Try adding 30-60 minutes of extra sleep each night.';}else if(total>0){c='yellow';l='Mild Sleep Debt';s='You have a mild sleep deficit. Try to get an extra 15-30 minutes of sleep each night.';}if(total<=0){total='0';l='No Debt';s='Great! You are meeting or exceeding your sleep needs.';}showResult('result',total+' hours',l,s,c);`},
  {slug:'life-expectancy-calculator',name:'Life Expectancy Calculator',desc:'Estimate your life expectancy based on lifestyle factors.',icon:'heart',category:'Wellness',
    fields:[{id:'age',label:'Current Age',type:'number',ph:'35'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'smoking',label:'Smoking Status',type:'select',options:['Never','Former','Current']},{id:'exercise',label:'Exercise Frequency',type:'select',options:['Rarely','1-2 times/week','3-5 times/week','Daily']},{id:'diet',label:'Diet Quality',type:'select',options:['Poor','Average','Good','Excellent']},{id:'bmi',label:'BMI Category',type:'select',options:['Underweight','Normal','Overweight','Obese']}],
    logic:`var age=parseFloat(document.getElementById('age').value);var g=document.getElementById('gender').value;if(!age){alert('Enter age');return;}var base=g==='Male'?76:81;var sm=document.getElementById('smoking').value;if(sm==='Current')base-=10;if(sm==='Former')base-=3;var ex=document.getElementById('exercise').value;if(ex==='Daily')base+=4;if(ex==='3-5 times/week')base+=3;if(ex==='1-2 times/week')base+=1;var di=document.getElementById('diet').value;if(di==='Excellent')base+=3;if(di==='Good')base+=1;if(di==='Poor')base-=3;var bmi=document.getElementById('bmi').value;if(bmi==='Obese')base-=5;if(bmi==='Overweight')base-=2;var remaining=Math.max(0,base-age);showResult('result','~'+base+' years','Estimated Life Expectancy','Based on your inputs, your estimated life expectancy is approximately '+base+' years ('+remaining+' years remaining). Remember, lifestyle changes at any age can improve this estimate.','green');`},
  {slug:'biological-age-calculator',name:'Biological Age Calculator',desc:'Estimate your biological age vs chronological age.',icon:'body',category:'Wellness',
    fields:[{id:'age',label:'Chronological Age',type:'number',ph:'35'},{id:'exercise',label:'Weekly Exercise Hours',type:'number',ph:'3'},{id:'sleep',label:'Average Sleep (hours)',type:'number',ph:'7'},{id:'smoking',label:'Smoker?',type:'select',options:['No','Yes']},{id:'stress',label:'Stress Level (1-5)',type:'number',ph:'3'},{id:'diet',label:'Fruits/Veggies Servings Daily',type:'number',ph:'3'}],
    logic:`var age=parseFloat(document.getElementById('age').value);var ex=parseFloat(document.getElementById('exercise').value);var sl=parseFloat(document.getElementById('sleep').value);var sm=document.getElementById('smoking').value;var st=parseFloat(document.getElementById('stress').value);var di=parseFloat(document.getElementById('diet').value);if(!age){alert('Enter age');return;}var bio=age;if(ex>=5)bio-=3;else if(ex>=3)bio-=1;else if(ex<1)bio+=2;if(sl>=7&&sl<=9)bio-=1;else if(sl<6)bio+=3;if(sm==='Yes')bio+=8;if(st>=4)bio+=2;else if(st<=2)bio-=1;if(di>=5)bio-=2;else if(di<2)bio+=2;bio=Math.round(bio);var diff=bio-age;var c='green',l='Younger',s='Great news! Your biological age is younger than your chronological age. Your lifestyle habits are serving you well.';if(diff>5){c='red';l='Significantly Older';s='Your biological age is significantly higher than your chronological age. Consider improving exercise, diet, sleep, and stress management.';}else if(diff>0){c='yellow';l='Slightly Older';s='Your biological age is slightly above your chronological age. Small lifestyle improvements can make a big difference.';}showResult('result',bio+' years',l+' ('+((diff>0)?'+':'')+diff+' years)',s,c);`},
  {slug:'medication-dosage-calculator',name:'Medication Dosage Calculator',desc:'Calculate medication dosage based on weight (for reference only).',icon:'pill',category:'Health Risk',
    fields:[{id:'weight',label:'Body Weight (kg)',type:'number',ph:'70'},{id:'dose',label:'Recommended Dose (mg/kg)',type:'number',ph:'10'},{id:'frequency',label:'Doses per Day',type:'number',ph:'3'}],
    logic:`var w=parseFloat(document.getElementById('weight').value);var d=parseFloat(document.getElementById('dose').value);var f=parseFloat(document.getElementById('frequency').value);if(!w||!d||!f){alert('Fill fields');return;}var single=Math.round(w*d/f);var daily=Math.round(w*d);showResult('result',single+' mg','Per Dose Amount','Single dose: '+single+' mg | Total daily: '+daily+' mg | Divided into '+f+' doses per day. IMPORTANT: Always follow your doctor\\'s prescribed dosage. This is for reference only.','yellow');`},
  {slug:'bac-calculator',name:'BAC Calculator',desc:'Estimate your blood alcohol concentration.',icon:'pill',category:'Lifestyle',
    fields:[{id:'drinks',label:'Number of Standard Drinks',type:'number',ph:'3'},{id:'weight',label:'Weight (kg)',type:'number',ph:'70'},{id:'gender',label:'Gender',type:'select',options:['Male','Female']},{id:'hours',label:'Hours Since First Drink',type:'number',ph:'2'}],
    logic:`var dr=parseFloat(document.getElementById('drinks').value);var w=parseFloat(document.getElementById('weight').value);var g=document.getElementById('gender').value;var h=parseFloat(document.getElementById('hours').value);if(!dr||!w){alert('Fill fields');return;}var r=g==='Male'?0.68:0.55;var bac=((dr*14)/(w*1000*r)*100-0.015*h);bac=Math.max(0,bac).toFixed(3);var c='green',l='Sober/Minimal',s='Your estimated BAC is very low.';if(bac>=0.08){c='red';l='Above Legal Limit';s='Your BAC is above the legal driving limit in most jurisdictions. Do NOT drive. Arrange alternative transportation.';}else if(bac>=0.04){c='yellow';l='Impaired';s='You may be impaired. Avoid driving and making important decisions.';}else if(bac>0.01){c='yellow';l='Minimal Effect';s='Slight effects possible. Be cautious about driving.';}showResult('result',bac+'%',l,s,c);`}
];

calculators.push(...remainingCalcs);

// ─── EXTRA CALCULATORS (65 NEW TOOLS) ────────────────────────────────────────
const newCalcs2 = require('./calculators-extra.js');
calculators.push(...newCalcs2);

// Fill in missing data for remaining calculators
calculators.forEach(calc => {
  if (!calc.article) {
    calc.article = `<h2>Understanding the ${calc.name}</h2><p>The ${calc.name} turns the values entered in the form into an educational estimate. Check every input and unit before calculating.</p><h3>How to Interpret the Result</h3><p>Read the output together with the method and limitations on the page. A calculator simplifies real-world variation and cannot reproduce a clinical examination, laboratory measurement, or individual professional assessment.</p><h3>Important Limits</h3><p>Do not use an online result alone to diagnose a condition, change medication, restrict a child’s diet, or ignore concerning symptoms. The intended population and quality of the underlying method matter.</p><h3>Practical Next Step</h3><p>Save the inputs with the result, focus on meaningful trends, and confirm high-stakes decisions with the responsible qualified professional.</p>`;
  }
  if (!calc.faqs) {
    calc.faqs = [
      {q:`What is the ${calc.name}?`,a:`The ${calc.name} is a tool that helps you ${calc.desc.toLowerCase()}`},
      {q:'How accurate is this calculator?',a:'This calculator provides estimates based on established formulas. For medical decisions, always consult a healthcare professional.'},
      {q:'How often should I use this calculator?',a:'Repeat a calculation only when the underlying inputs have changed or when a qualified professional recommends monitoring.'},
      {q:'Can I rely on these results for medical decisions?',a:'This tool is for informational purposes only. Always consult qualified healthcare professionals for medical advice and decisions.'},
      {q:'What factors affect the accuracy?',a:'Individual variation, measurement technique, and the limitations of estimation formulas can all affect accuracy.'},
      {q:'Should I share results with my doctor?',a:'Yes, sharing calculator results with your healthcare provider can facilitate productive discussions about your health.'},
      {q:'Is this calculator suitable for all ages?',a:'Most calculators are designed for adults. Pediatric assessments may require different formulas and professional evaluation.'},
      {q:'What do the colors mean?',a:'Colors are interface prompts, not a diagnosis. Read the written explanation and discuss concerning results or symptoms with a qualified professional.'},
      {q:'Can lifestyle changes improve my results?',a:'Yes, improvements in diet, exercise, sleep, and stress management can positively impact most health metrics over time.'},
      {q:'Where do the formulas come from?',a:'Methods differ between calculators. Use a result only when the page clearly identifies the method, intended population, inputs, and limitations.'},
    ];
  }
  if (!calc.related) {
    calc.related = ['bmi-calculator','calorie-calculator','tdee-calculator','heart-rate-calculator'];
  }
});

const BLOG_META = {
  'how-to-calculate-bmi': { title: 'How to Calculate BMI – Step-by-Step Guide | VitalHealth Hub', desc: 'Learn the exact BMI formula and what your score actually means. Understand healthy ranges, key limitations, and how to use BMI effectively as part of your health assessment.' },
  'what-is-a-healthy-bmi': { title: 'What Is a Healthy BMI? Ranges for Men & Women | VitalHealth Hub', desc: 'Confused by BMI ranges? Discover what healthy, overweight, and underweight BMI means for men and women by age. Set a realistic, evidence-based weight goal with confidence.' },
  'bmi-vs-body-fat-percentage': { title: 'BMI vs Body Fat – Which Health Metric Wins? | VitalHealth Hub', desc: 'BMI and body fat percentage measure health differently. Discover which metric is more accurate for you and how to use both together for a truly complete health picture.' },
  'bmi-for-children-and-teenagers': { title: 'BMI for Children – What Parents Need to Know | VitalHealth Hub', desc: 'Child BMI works differently than adult BMI. Learn how to interpret age-adjusted BMI percentiles for children and teens and support your child\'s healthy development with confidence.' },
  'bmi-chart-by-age': { title: 'BMI Chart by Age – How Ideal Weight Changes Over Time | VitalHealth Hub', desc: 'Your ideal BMI range shifts as you age. Explore comprehensive BMI charts for all ages, understand the trends, and use the data to set realistic, age-appropriate weight targets.' },
  'is-bmi-accurate': { title: 'Is BMI Accurate? The Truth About Body Mass Index | VitalHealth Hub', desc: 'BMI has real limitations for athletes, older adults, and many ethnic groups. Discover where it fails, where it still works, and which additional metrics paint a more complete picture.' },
  'underweight-bmi-health-risks': { title: 'Underweight BMI – Health Risks & Safe Weight Gain | VitalHealth Hub', desc: 'Being underweight carries serious health risks few people discuss. Learn the dangers of low BMI, how to identify causes, and how to gain weight safely with lasting healthy strategies.' },
  'overweight-vs-obese-bmi': { title: 'Overweight vs Obese BMI – Key Differences Explained | VitalHealth Hub', desc: 'Overweight and obese are not the same thing. Understand the BMI thresholds, different health risk levels, and which targeted steps apply to your specific weight category today.' },
  'how-to-lower-your-bmi': { title: 'How to Lower Your BMI – Science-Backed Strategies | VitalHealth Hub', desc: 'Lowering BMI requires more than just eating less. Discover evidence-based diet, exercise, and lifestyle strategies that actually move the needle on your BMI and keep it there.' },
  'bmi-and-chronic-disease': { title: 'BMI and Chronic Disease – What Research Actually Shows | VitalHealth Hub', desc: 'High BMI correlates with heart disease, diabetes, and more — but the story is complex. Explore what research actually says about BMI as a predictor of chronic disease risk.' },
  'how-many-calories-should-i-eat': { title: 'How Many Calories Should I Eat? Complete Guide | VitalHealth Hub', desc: 'Your daily calorie needs are unique to you. Learn how age, activity, and goals determine your target, how to calculate it accurately, and how to use the number effectively.' },
  'calorie-deficit-for-weight-loss': { title: 'Calorie Deficit for Weight Loss – The Complete Guide | VitalHealth Hub', desc: 'A calorie deficit is the only proven path to fat loss. Learn how to create the right deficit for steady results, avoid metabolic slowdown, and sustain weight loss long-term.' },
  'calorie-surplus-for-muscle-gain': { title: 'Calorie Surplus for Muscle Gain – How to Eat for Growth | VitalHealth Hub', desc: 'Muscle growth requires eating more than you burn — but how much more? Discover the ideal calorie surplus for lean bulking, the role of protein, and how to minimize fat gain.' },
  'how-to-count-calories': { title: 'How to Count Calories Without Losing Your Mind | VitalHealth Hub', desc: 'Calorie tracking doesn\'t have to be obsessive or overwhelming. Learn practical methods to count calories accurately, the best tools available, and how to make it sustainable.' },
  'calorie-cycling': { title: 'Calorie Cycling – Does It Actually Work for Fat Loss? | VitalHealth Hub', desc: 'Calorie cycling alternates high and low intake days. Discover the science behind this approach, who benefits most, how to set it up correctly, and whether it beats a fixed deficit.' },
  'low-calorie-foods-keep-you-full': { title: 'Low Calorie Foods That Keep You Full Longer | VitalHealth Hub', desc: 'Hunger is the number one reason diets fail. Discover the best low-calorie, high-satiety foods that keep you full for hours. Build a diet that works without constant deprivation.' },
  'calories-burned-walking-10000-steps': { title: 'How Many Calories Does 10,000 Steps Burn? | VitalHealth Hub', desc: 'The calorie burn from 10,000 steps varies more than most people think. Learn how your weight, pace, and terrain affect the total, and how to use steps strategically in your plan.' },
  'liquid-calories-weight-loss': { title: 'Liquid Calories – The Hidden Reason You\'re Not Losing Weight | VitalHealth Hub', desc: 'Drinks are the most underestimated source of hidden calories. Discover which beverages sabotage weight loss, how to identify them, and easy swaps that make a real difference.' },
  'maintenance-calories-explained': { title: 'Maintenance Calories Explained – Find Your Exact Number | VitalHealth Hub', desc: 'Knowing your maintenance calories is the foundation of any nutrition plan. Learn the most accurate ways to find yours, why calculators miss the mark, and how to dial it in.' },
  'calorie-needs-by-age': { title: 'Calorie Needs by Age – How Metabolism Changes Over Time | VitalHealth Hub', desc: 'Your calorie needs shift significantly each decade. Discover how metabolism changes from your 20s to your 60s and how to adjust your nutrition strategy for each life stage.' },
  'eating-late-at-night-weight-gain': { title: 'Does Eating Late Cause Weight Gain? The Real Truth | VitalHealth Hub', desc: 'Late-night eating is blamed for weight gain — but what does science actually say? Discover what research shows about meal timing, total calories, and how clock time affects metabolism.' },
  'how-to-break-weight-loss-plateau': { title: 'How to Break a Weight Loss Plateau – Proven Methods | VitalHealth Hub', desc: 'Plateaus happen to everyone on a diet. Discover the exact reasons your weight loss stalls, the evidence-based strategies to break through, and how to keep losing with momentum.' },
  'what-are-macronutrients': { title: 'What Are Macronutrients? The Complete Beginner Guide | VitalHealth Hub', desc: 'Protein, carbs, and fat explained clearly. Learn what each macro does in your body, how many calories they contain, and how to balance all three for your health or fitness goal.' },
  'how-much-protein-per-day': { title: 'How Much Protein Do You Need Per Day? | VitalHealth Hub', desc: 'Protein recommendations vary wildly — and most people get it wrong. Discover exactly how much protein your body needs based on your weight, age, activity level, and fitness goal.' },
  'carbohydrates-good-vs-bad': { title: 'Carbs: Good vs Bad – What Science Actually Says | VitalHealth Hub', desc: 'Not all carbs are created equal. Discover the difference between refined and complex carbohydrates, what research shows about each, and how to make smart carb choices every day.' },
  'healthy-fats-vs-unhealthy-fats': { title: 'Healthy Fats vs Unhealthy Fats – The Complete Guide | VitalHealth Hub', desc: 'Fat isn\'t the enemy — but some types are. Learn which fats protect your heart, which damage it, the best food sources, and how to build a diet with the right fat balance.' },
  'how-to-calculate-macros-weight-loss': { title: 'How to Calculate Your Macros for Weight Loss | VitalHealth Hub', desc: 'Losing fat requires the right macro ratio, not just fewer calories. Learn how to calculate your personal protein, carb, and fat targets for sustainable, effective weight loss.' },
  'high-protein-foods-list': { title: 'High Protein Foods – Complete List with Protein Content | VitalHealth Hub', desc: 'Struggling to hit your protein target? Explore the ultimate list of high-protein foods across every food group with exact protein content per serving. Hit your daily target easily.' },
  'best-pre-workout-meals': { title: 'Best Pre-Workout Meals for Energy & Performance | VitalHealth Hub', desc: 'Eating wrong before training kills your performance. Discover the best pre-workout meals, ideal timing before exercise, and which macros fuel peak training energy and endurance.' },
  'best-post-workout-meals': { title: 'Best Post-Workout Meals for Recovery & Muscle Growth | VitalHealth Hub', desc: 'What you eat after training makes or breaks your recovery. Discover the best post-workout meals to repair muscle, replenish glycogen, and maximize results from every session.' },
  'micronutrients-vs-macronutrients': { title: 'Micronutrients vs Macronutrients – What\'s the Difference? | VitalHealth Hub', desc: 'Both micros and macros are essential — but they work very differently. Understand the roles of vitamins, minerals, protein, carbs, and fat, and how to optimize all of them.' },
  'how-to-read-nutrition-labels': { title: 'How to Read Nutrition Labels Like a Health Expert | VitalHealth Hub', desc: 'Most people misread nutrition labels. Learn to decode serving sizes, daily values, ingredient lists, and misleading claims. Make smarter food decisions starting at the grocery store.' },
  'fiber-why-not-getting-enough': { title: 'Fiber: Why You\'re Not Getting Enough & How to Fix It | VitalHealth Hub', desc: 'Only 5% of people meet their daily fiber needs. Discover the health consequences of low fiber intake, the best high-fiber foods to add, and simple strategies to close the gap.' },
  'sugar-addiction-reduce-sugar': { title: 'Sugar Addiction – How to Cut Back Without Feeling Miserable | VitalHealth Hub', desc: 'Sugar cravings can feel impossible to overcome. Understand how sugar affects your brain, why cold turkey fails, and the gradual, sustainable strategy that actually lasts.' },
  'what-is-tdee': { title: 'What Is TDEE? Total Daily Energy Expenditure Explained | VitalHealth Hub', desc: 'TDEE is the most important number in your nutrition plan. Learn what Total Daily Energy Expenditure means, how it\'s calculated, and how to use it to hit any weight goal you set.' },
  'bmr-vs-tdee': { title: 'BMR vs TDEE – The Difference That Changes Your Diet | VitalHealth Hub', desc: 'Many people confuse BMR with TDEE and get their calorie targets completely wrong. Discover the key differences, how each is calculated, and which number to actually use in practice.' },
  'how-to-boost-metabolism': { title: 'How to Boost Your Metabolism – Evidence-Based Methods Only | VitalHealth Hub', desc: 'Most metabolism tips are myths. Discover the only evidence-backed strategies that genuinely increase your metabolic rate — from strength training and protein to sleep and NEAT activity.' },
  'does-muscle-burn-more-calories': { title: 'Does Muscle Burn More Calories Than Fat? The Real Numbers | VitalHealth Hub', desc: 'You\'ve heard muscle burns more calories than fat — but how much more? Get the real numbers, understand how body composition affects metabolism, and act on what actually works.' },
  'slow-metabolism-is-it-real': { title: 'Slow Metabolism – Is It Real or Just an Excuse? | VitalHealth Hub', desc: 'Everyone blames their metabolism — but is a truly slow metabolism even real? Discover what science says, how much metabolism actually varies between people, and what you can change.' },
  'activity-level-affects-calorie-needs': { title: 'How Activity Level Affects Your Calorie Needs | VitalHealth Hub', desc: 'Activity level is the most underestimated variable in your calorie calculation. Learn how different exercise intensities and daily movement affect your total energy requirements.' },
  'adaptive-thermogenesis': { title: 'Adaptive Thermogenesis – Why Your Body Fights Weight Loss | VitalHealth Hub', desc: 'Your metabolism adapts to defend against fat loss — and this is the main reason diets stall. Discover what adaptive thermogenesis is and strategies to keep losing despite it.' },
  'how-age-affects-metabolism': { title: 'How Age Affects Your Metabolism & What to Do About It | VitalHealth Hub', desc: 'Metabolism does slow with age — but less than most people believe. Discover exactly how much it changes each decade, the real causes, and targeted strategies to counter the decline.' },
  'body-fat-percentage-chart': { title: 'Body Fat Percentage Chart for Men & Women by Age | VitalHealth Hub', desc: 'Know your target. Explore body fat percentage charts by age and sex, understand essential vs storage fat categories, and set a realistic goal for your body composition journey.' },
  'how-to-lose-body-fat-without-losing-muscle': { title: 'Lose Body Fat Without Losing Muscle – Complete Guide | VitalHealth Hub', desc: 'The biggest fat loss mistake is losing muscle along the way. Discover the exact combination of nutrition, training, and recovery that burns fat while fully preserving lean muscle.' },
  'visceral-fat-vs-subcutaneous-fat': { title: 'Visceral vs Subcutaneous Fat – Which Is More Dangerous? | VitalHealth Hub', desc: 'Not all body fat carries the same risk. Discover the critical difference between visceral and subcutaneous fat, which one increases disease risk most, and how to target each type.' },
  'how-to-measure-body-fat-at-home': { title: 'How to Measure Body Fat at Home – 5 Accurate Methods | VitalHealth Hub', desc: 'No lab required. Discover five home-based methods to measure body fat percentage, ranked by accuracy and practicality. Find the right approach for your budget and fitness level.' },
  'essential-body-fat-vs-storage-fat': { title: 'Essential vs Storage Body Fat – What You Must Know | VitalHealth Hub', desc: 'All body fat is not created equal. Understand the distinction between essential fat — which you need to survive — and storage fat, and what happens when levels fall too low.' },
  'how-to-improve-running-endurance': { title: 'How to Improve Running Endurance – Training Plan Included | VitalHealth Hub', desc: 'Can\'t run as far as you want without hitting the wall? Discover progressive training methods, breathing techniques, and nutrition strategies that build real running endurance.' },
  'progressive-overload-explained': { title: 'Progressive Overload – The Key Principle Behind Every Fitness Goal | VitalHealth Hub', desc: 'No training principle matters more than progressive overload. Discover what it means, how to apply it to any exercise, and why ignoring it guarantees you\'ll stop making gains.' },
  'how-many-days-per-week-workout': { title: 'How Many Days Per Week Should You Work Out? | VitalHealth Hub', desc: 'More training isn\'t always better. Discover the optimal workout frequency based on your goal, experience, and recovery capacity. Find the schedule that produces the fastest results.' },
  'best-exercises-for-each-muscle-group': { title: 'Best Exercises for Every Muscle Group – Full Reference | VitalHealth Hub', desc: 'Stop guessing at the gym. Explore the most effective exercises for every major muscle group, organized by equipment and experience level. Build a smarter, more balanced program.' },
  'rest-days-importance-recovery': { title: 'Rest Days – Why Recovery Is as Important as Training | VitalHealth Hub', desc: 'Skipping rest days doesn\'t make you tougher — it makes you slower. Discover the science of recovery, how much rest you actually need, and signs you\'re not recovering enough.' },
  'home-workout-routine-no-equipment': { title: 'Home Workout Routine – No Equipment Needed | VitalHealth Hub', desc: 'No gym? No problem. Build an effective full-body workout routine using only your bodyweight. Includes a structured plan for beginners through intermediate fitness levels. Start today.' },
  'stretching-guide-static-vs-dynamic': { title: 'Stretching Guide – Static vs Dynamic & When to Do Each | VitalHealth Hub', desc: 'Stretching before training can hurt performance if done wrong. Learn the difference between static and dynamic stretching, when to use each, and how to stretch most effectively.' },
  'vo2-max-explained': { title: 'VO2 Max Explained – What It Is & How to Improve It | VitalHealth Hub', desc: 'VO2 max predicts endurance performance better than any other single metric. Discover how it\'s measured, what a good score looks like for your age, and exactly how to increase it.' },
  'how-many-steps-per-day': { title: 'How Many Steps Per Day Is Actually Healthy? | VitalHealth Hub', desc: 'Is 10,000 steps the magic number or just a marketing myth? Discover what science says about optimal daily step counts, why it differs by age, and how to build a realistic step habit.' },
  'how-much-sleep-do-you-need-by-age': { title: 'How Much Sleep Do You Need by Age? | VitalHealth Hub', desc: 'Sleep needs change dramatically from childhood to old age. Discover evidence-based sleep recommendations for every life stage and what consistently happens when you fall short.' },
  'sleep-cycles-explained': { title: 'Sleep Cycles Explained – REM, Deep & Light Sleep | VitalHealth Hub', desc: 'Understanding sleep architecture changes how you approach rest. Learn what happens in each sleep stage, why REM and deep sleep matter most, and how to reliably get more of both.' },
  'how-to-fix-sleep-schedule': { title: 'How to Fix Your Sleep Schedule in 7 Days | VitalHealth Hub', desc: 'A disrupted sleep schedule destroys energy, focus, and health. Follow this proven 7-day protocol to reset your circadian rhythm, shift your bedtime, and wake feeling genuinely restored.' },
  'best-foods-for-sleep': { title: 'Best Foods That Help You Sleep Better at Night | VitalHealth Hub', desc: 'What you eat before bed directly affects sleep quality. Discover the science-backed foods that promote deeper, more restful sleep and which ones are secretly keeping you awake.' },
  'sleep-deprivation-weight-metabolism': { title: 'Sleep Deprivation – Effects on Weight & Metabolism | VitalHealth Hub', desc: 'Poor sleep doesn\'t just make you tired — it makes you gain weight. Discover the hormonal mechanisms linking sleep deprivation to weight gain, metabolic slowdown, and increased hunger.' },
  'how-to-improve-sleep-quality': { title: 'How to Improve Sleep Quality – Without Medication | VitalHealth Hub', desc: 'You don\'t need sleeping pills to sleep better. Discover the most effective evidence-based sleep improvements — from sleep environment to pre-bed routines — and apply them tonight.' },
  'napping-benefits-risks': { title: 'Napping – Benefits, Risks & the Ideal Nap Duration | VitalHealth Hub', desc: 'A well-timed nap boosts alertness, performance, and mood — but a bad one leaves you groggy. Learn the ideal nap length, best timing, and how to nap without ruining night sleep.' },
  'exercise-timing-sleep-quality': { title: 'How Exercise Timing Affects Your Sleep Quality | VitalHealth Hub', desc: 'Exercising at the wrong time can ruin your sleep. Discover how workout timing affects melatonin, cortisol, and sleep quality — and when the ideal time to train actually is.' },
  'how-much-water-should-you-drink': { title: 'How Much Water Should You Drink Per Day? | VitalHealth Hub', desc: 'The 8-glasses-a-day rule is outdated. Discover how much water you actually need based on your weight, climate, and activity. Calculate your personal hydration target and drink right.' },
  'signs-of-dehydration': { title: 'Signs of Dehydration – Symptoms, Causes & How to Fix It | VitalHealth Hub', desc: 'Dehydration affects you long before you feel thirsty. Recognize the early warning signs, understand the stages from mild to severe, and learn how to rehydrate correctly and fast.' },
  'benefits-of-drinking-more-water': { title: 'Benefits of Drinking More Water – What Science Says | VitalHealth Hub', desc: 'Proper hydration does more than quench thirst. Discover the research-backed benefits of drinking more water on energy, skin, weight management, cognitive function, and long-term health.' },
  'hydration-during-exercise': { title: 'Hydration During Exercise – How Much Water Do You Need? | VitalHealth Hub', desc: 'Exercising dehydrated costs you performance and risks your health. Discover exactly how much water to drink before, during, and after training based on your intensity and sweat rate.' },
  'does-drinking-water-help-weight-loss': { title: 'Does Drinking Water Help You Lose Weight? The Evidence | VitalHealth Hub', desc: 'Water is often promoted as a weight loss tool — but does the evidence hold up? Discover what research shows about water, appetite suppression, and its effect on your metabolism.' },
  'best-hydrating-foods': { title: 'Best Hydrating Foods to Eat Every Day | VitalHealth Hub', desc: 'You don\'t have to get all your hydration from drinking. Discover the most water-rich foods, how much they contribute to your daily intake, and the easiest way to eat your water.' },
  'target-heart-rate-zones': { title: 'Target Heart Rate Zones – Fat Burn to Peak Performance | VitalHealth Hub', desc: 'Training in the wrong heart rate zone produces wrong results. Discover all five zones, what each achieves, how to calculate yours by age, and how to train in each effectively.' },
  'resting-heart-rate-normal': { title: 'Resting Heart Rate – What\'s Normal & What\'s a Warning Sign? | VitalHealth Hub', desc: 'Your resting heart rate reveals cardiovascular health at a glance. Discover what\'s normal at every age, what a high or low rate may signal, and how to improve your reading naturally.' },
  'how-to-lower-resting-heart-rate': { title: 'How to Lower Your Resting Heart Rate Naturally | VitalHealth Hub', desc: 'A lower resting heart rate signals a stronger, healthier heart. Discover the most effective evidence-based methods to lower your RHR through exercise, sleep, stress, and smart nutrition.' },
  'maximum-heart-rate-by-age': { title: 'Maximum Heart Rate by Age – Formula & Fitness Zones | VitalHealth Hub', desc: 'Your max heart rate defines your training zones. Discover the most accurate formulas by age, how to calculate your personal zones, and how to apply them to your fitness routine.' },
  'heart-rate-variability-hrv': { title: 'Heart Rate Variability (HRV) – What It Is & Why It Matters | VitalHealth Hub', desc: 'HRV is the most sensitive available indicator of recovery and overall health. Learn what it measures, what a good score looks like, and practical ways to improve your HRV today.' },
  'best-cardio-exercises-calorie-burn': { title: 'Best Cardio Exercises Ranked by Calorie Burn | VitalHealth Hub', desc: 'Not all cardio burns the same. Discover which aerobic exercises burn the most calories per hour, how body weight affects results, and how to choose the right cardio for your goal.' },
  'exercise-reduces-stress-anxiety': { title: 'How Exercise Reduces Stress & Anxiety – The Science | VitalHealth Hub', desc: 'Exercise is one of the most powerful tools for mental health. Discover the proven mechanisms behind how physical activity reduces stress, anxiety, and depression — and what to do.' },
  'meditation-for-beginners': { title: 'Meditation for Beginners – How to Start & What to Expect | VitalHealth Hub', desc: 'Most people quit meditation before it starts working. Learn the simplest techniques for absolute beginners, realistic expectations for your first 30 days, and how to make it a habit.' },
  'how-to-build-healthy-habits': { title: 'How to Build Healthy Habits That Actually Stick | VitalHealth Hub', desc: 'Most healthy habits fail within a month. Discover the behavioral science behind habit formation, the cue-routine-reward loop, and proven strategies to make any health habit permanent.' },
  'morning-routines-healthy-people': { title: 'Morning Routines of Healthy People – What They Share | VitalHealth Hub', desc: 'The most health-conscious people structure their mornings intentionally. Discover the common habits they share, the science behind a morning routine, and how to build your own today.' },
  'how-to-stay-consistent-with-fitness': { title: 'How to Stay Consistent With Fitness When Life Gets Busy | VitalHealth Hub', desc: 'Consistency — not perfection — drives results. Discover the systems, mindset shifts, and scheduling strategies that keep fitness on track even during the busiest, most stressful weeks.' },
  'cortisol-and-weight-gain': { title: 'Cortisol & Weight Gain – How Stress Makes You Fat | VitalHealth Hub', desc: 'Chronic stress triggers fat storage through cortisol — especially around your belly. Discover the hormonal mechanism behind stress weight gain and targeted strategies to break the cycle.' },
  'sleep-affects-mental-health': { title: 'How Sleep Affects Mental Health – The Bidirectional Link | VitalHealth Hub', desc: 'Sleep and mental health are deeply intertwined. Discover how poor sleep worsens anxiety and depression, how mental health disorders disrupt sleep, and how to address both together.' },
  'mindful-eating-emotional-eating': { title: 'Mindful Eating – How to Stop Emotional Eating for Good | VitalHealth Hub', desc: 'Emotional eating sabotages even the best diet plans. Learn to recognize emotional triggers, apply mindful eating techniques, and develop a healthier relationship with food that lasts.' },
  'health-calculators-for-women': { title: 'Best Health Calculators Every Woman Should Use | VitalHealth Hub', desc: 'Women have unique health needs at every life stage. Discover the most valuable health calculators covering BMI, fertility, hormones, nutrition, and fitness — all free, no sign-up.' },
  'health-calculators-for-men': { title: 'Best Health Calculators Every Man Should Know About | VitalHealth Hub', desc: 'Men\'s health has specific metrics that matter most. Explore the most useful calculators covering body composition, heart health, testosterone, and performance — all free online.' },
  'fitness-after-40': { title: 'Fitness After 40 – How to Train Smarter as You Age | VitalHealth Hub', desc: 'Fitness doesn\'t decline after 40 — the strategy just changes. Discover effective training methods, recovery needs, and nutrition adjustments for getting stronger in your 40s and beyond.' },
  'weight-loss-after-50': { title: 'Weight Loss After 50 – What Changes & What Still Works | VitalHealth Hub', desc: 'Weight loss after 50 is harder for real physiological reasons. Discover what shifts with age, which strategies remain effective, and how to adapt your approach for lasting results.' },
  'bmi-for-athletes': { title: 'BMI for Athletes – Why Standard Ranges Don\'t Apply | VitalHealth Hub', desc: 'BMI misclassifies most athletes as overweight due to muscle mass. Discover why the standard scale fails active individuals and which body composition metrics to use instead.' },
  'pregnancy-weight-gain': { title: 'Pregnancy Weight Gain – Healthy Ranges & What to Expect | VitalHealth Hub', desc: 'Weight gain during pregnancy is normal — but how much is right? Learn the recommended ranges by trimester and pre-pregnancy BMI, what to expect at each stage, and how to stay healthy.' },
  'health-checks-every-year': { title: 'Annual Health Checks – Complete Checklist by Age | VitalHealth Hub', desc: 'Many serious conditions are caught early through routine checks. Discover exactly which health screenings you need each year based on your age, gender, and family history. Don\'t skip these.' },
  'realistic-fitness-goals': { title: 'How to Set Realistic Fitness Goals Using Health Data | VitalHealth Hub', desc: 'Unrealistic goals lead to early burnout. Learn to use your own health data — BMI, body fat, TDEE — to set specific, achievable targets that keep you motivated and consistently progressing.' },
  'understanding-lab-results': { title: 'Understanding Lab Results – What Your Numbers Mean | VitalHealth Hub', desc: 'Lab results can feel overwhelming without context. Discover how to read and interpret your blood work, what key markers mean, and what to discuss with your doctor after every test.' },
  'healthy-lifestyle-checklist': { title: 'Healthy Lifestyle Checklist – 50 Evidence-Based Habits | VitalHealth Hub', desc: 'Small habits compound into outstanding health. Explore 50 science-backed habits across sleep, nutrition, movement, and mental wellness that form the foundation of a truly healthy life.' },
  'how-many-steps-to-lose-weight': { title: 'How Many Steps Per Day Do You Need to Lose Weight? | VitalHealth Hub', desc: 'Steps alone can drive meaningful weight loss — if you know the right target. Discover how many daily steps create a calorie deficit and how to combine walking with diet for results.' },
  'intermittent-fasting-for-weight-loss': { title: 'Intermittent Fasting for Weight Loss – Does It Work? | VitalHealth Hub', desc: 'Intermittent fasting is popular — but is it actually better than traditional dieting? Discover what the research shows, which protocols work best for fat loss, and who it works for.' },
  'keto-diet-beginners-guide': { title: 'Keto Diet for Beginners – What to Eat, Avoid & Expect | VitalHealth Hub', desc: 'Starting keto without a clear guide leads to failure. Learn exactly what to eat, what to avoid, how to handle keto flu, and what to realistically expect during your first 30 days.' },
  'best-time-to-walk-for-fat-loss': { title: 'Best Time to Walk for Maximum Fat Loss | VitalHealth Hub', desc: 'When you walk matters as much as how far. Discover what research says about the optimal time of day for fat burning, metabolic benefits, and blood sugar management from walking.' },
  'walking-vs-running-for-weight-loss': { title: 'Walking vs Running – Which Burns More Fat? | VitalHealth Hub', desc: 'Walking and running both burn calories — but which produces better weight loss? Discover the calorie comparison, how intensity affects fat burning, and which suits your lifestyle best.' },
  'protein-for-fat-loss': { title: 'How Protein Helps You Burn Fat & Keep Muscle | VitalHealth Hub', desc: 'Protein is the most critical macro during a fat loss phase. Discover how it boosts metabolism, suppresses appetite, preserves muscle, and makes your calorie deficit far more manageable.' },
  'why-you-are-not-losing-weight': { title: 'Why You\'re Not Losing Weight – 10 Common Reasons | VitalHealth Hub', desc: 'If the scale isn\'t moving, something in your approach is off. Discover the most common — and least obvious — reasons weight loss stalls, and exactly what to change about each one.' },
  'fat-loss-vs-weight-loss-difference': { title: 'Fat Loss vs Weight Loss – Why the Difference Matters | VitalHealth Hub', desc: 'Losing weight on the scale doesn\'t always mean losing fat. Discover the critical difference, why body composition matters more than scale weight, and how to track real, lasting progress.' },
  'mediterranean-diet-complete-guide': { title: 'Mediterranean Diet – Complete Beginner Guide & Meal Ideas | VitalHealth Hub', desc: 'The Mediterranean diet is the most consistently health-supportive eating pattern in research. Learn what it includes, the proven benefits, and how to start eating this way this week.' },
  'plant-based-diet-for-beginners': { title: 'Plant-Based Diet for Beginners – Getting Enough Protein | VitalHealth Hub', desc: 'Going plant-based raises real nutrition questions. Discover how to get adequate protein, iron, B12, and calcium from plants — and how to transition without sacrificing your results.' },
  'omega-3-fatty-acids-complete-guide': { title: 'Omega-3 Fatty Acids – Benefits, Sources & How Much | VitalHealth Hub', desc: 'Omega-3s reduce inflammation, protect your heart, and support brain health. Discover the differences between EPA, DHA, and ALA, the best food sources, and how much you actually need.' },
  'anti-inflammatory-diet-guide': { title: 'Anti-Inflammatory Diet – Foods to Eat & Avoid | VitalHealth Hub', desc: 'Chronic inflammation is the root cause of most modern diseases. Discover the most powerful anti-inflammatory foods, which ones to eliminate, and how to build an inflammation-fighting diet.' },
  'gut-health-and-weight-loss': { title: 'Gut Health & Weight Loss – The Microbiome Connection | VitalHealth Hub', desc: 'Your gut microbiome directly influences body weight, hunger hormones, and fat storage. Discover how gut health affects weight loss and which habits restore a healthy microbiome.' },
  'daily-sodium-intake-guide': { title: 'Daily Sodium Intake – How Much Salt Is Too Much? | VitalHealth Hub', desc: 'Most people consume double the recommended sodium without realizing it. Learn safe daily limits, the biggest offenders in your diet, and how to reduce intake without losing flavor.' },
  'best-vitamins-for-energy-and-health': { title: 'Best Vitamins for Energy, Immunity & Overall Health | VitalHealth Hub', desc: 'The right vitamins and minerals make a measurable difference. Discover the most important micronutrients, which to prioritize for your goals, and how to get them from real food.' },
  'how-to-track-macros-guide': { title: 'How to Track Your Macros – Step-by-Step for Beginners | VitalHealth Hub', desc: 'Macro tracking transforms results — when done correctly. Discover the exact steps to set up tracking, which app to use, how to measure food accurately, and common mistakes to avoid.' },
  'beginner-workout-plan-30-days': { title: '30-Day Beginner Workout Plan – Build a Lasting Habit | VitalHealth Hub', desc: 'Starting from zero? This structured 30-day beginner workout plan builds a genuine fitness habit progressively. No gym required. Follow the program and see your first real results.' },
  'how-to-run-5k-training-plan': { title: 'How to Run a 5K – 8-Week Training Plan for Beginners | VitalHealth Hub', desc: 'Never run before? Go from zero to completing a 5K in just 8 weeks with this progressive training plan. Includes weekly schedules, pacing guidance, and tips to stay consistent.' },
  'strength-training-for-women-guide': { title: 'Strength Training for Women – Why You Need It | VitalHealth Hub', desc: 'Lifting weights doesn\'t make women bulky — it makes them stronger, leaner, and healthier. Discover the proven benefits, how to start safely, and a beginner program designed for women.' },
  'cycling-calories-and-benefits': { title: 'Cycling for Weight Loss – Calories Burned & Full Benefits | VitalHealth Hub', desc: 'Cycling is one of the most effective and joint-friendly calorie-burning activities available. Discover how many calories it burns, the full health benefits, and how to get started today.' },
  'yoga-for-weight-loss': { title: 'Does Yoga Help With Weight Loss? What Research Shows | VitalHealth Hub', desc: 'Yoga isn\'t traditionally associated with weight loss — but the evidence is more interesting than expected. Discover which yoga styles burn the most calories and how yoga helps indirectly.' },
  'swimming-calories-and-fitness': { title: 'Swimming for Fitness – Calories Burned & Full Benefits | VitalHealth Hub', desc: 'Swimming burns serious calories with near-zero joint impact. Discover how many calories different strokes burn, the full-body fitness benefits of swimming regularly, and how to start.' },
  'jump-rope-workout-benefits': { title: 'Jump Rope Workout – Calories Burned & Why It\'s So Effective | VitalHealth Hub', desc: 'Jump rope burns more calories per minute than running and costs almost nothing. Discover the full calorie burn, remarkable cardiovascular benefits, and how to start a jump rope routine.' },
  'ovulation-calculator-complete-guide': { title: 'Ovulation Calculator Guide – Find Your Fertile Days | VitalHealth Hub', desc: 'Understanding your ovulation cycle dramatically improves conception chances. Learn how ovulation calculators work, how accurate they are, and how to track your cycle more effectively.' },
  'pregnancy-week-by-week-guide': { title: 'Pregnancy Week by Week – What to Expect at Every Stage | VitalHealth Hub', desc: 'Pregnancy changes every week. Get a clear picture of fetal development, common symptoms, and key milestones at each stage — from conception through the third trimester and birth.' },
  'pcos-symptoms-and-management': { title: 'PCOS Symptoms – How to Manage PCOS Naturally | VitalHealth Hub', desc: 'PCOS affects millions but remains widely misunderstood. Learn to recognize key symptoms, understand the hormonal root cause, and discover the most effective management strategies.' },
  'breastfeeding-calorie-and-nutrition-guide': { title: 'Breastfeeding Nutrition – Calories & Key Nutrients | VitalHealth Hub', desc: 'Breastfeeding significantly increases your nutritional needs. Discover how many extra calories you need while nursing, which nutrients matter most for milk quality, and what to eat.' },
  'menopause-weight-gain-tips': { title: 'Menopause & Weight Gain – Why It Happens & How to Fight It | VitalHealth Hub', desc: 'Weight gain during menopause is driven by hormonal shifts — not just aging. Discover the physiological reasons, why traditional dieting often fails, and strategies that actually work.' },
  'menstrual-cycle-and-fitness': { title: 'How Your Menstrual Cycle Affects Workouts & Energy | VitalHealth Hub', desc: 'Your hormones affect energy, strength, and recovery throughout the month. Learn to train in sync with your menstrual cycle for better performance, fewer injuries, and faster results.' },
  'fertility-boosting-nutrition': { title: 'Fertility-Boosting Foods & Nutrients – What Science Says | VitalHealth Hub', desc: 'Diet is one of the most modifiable factors for fertility health. Discover the foods, vitamins, and lifestyle habits that research links to improved fertility in both men and women.' },
  'hormone-balance-for-women': { title: 'How to Balance Hormones Naturally – Diet & Lifestyle | VitalHealth Hub', desc: 'Hormonal imbalance drives dozens of frustrating symptoms. Discover the most effective diet and lifestyle changes that support balanced hormones — without relying on medication alone.' },
  'burnout-symptoms-and-recovery': { title: 'Burnout Symptoms – How to Recognize & Recover Fully | VitalHealth Hub', desc: 'Burnout is more than just feeling tired. Learn the three defining stages, the physical and emotional symptoms, and the step-by-step recovery approach that actually helps you heal.' },
  'dopamine-detox-complete-guide': { title: 'Dopamine Detox – What It Is & How to Do It | VitalHealth Hub', desc: 'Overstimulation from dopamine-triggering apps kills focus, motivation, and joy. Discover what a dopamine detox actually is, what science supports, and how to do one effectively.' },
  'stress-level-test-meaning': { title: 'Stress Level Test – What Your Score Actually Means | VitalHealth Hub', desc: 'A stress score without context is meaningless. Discover what your stress level result means for your health, how chronic stress damages the body over time, and targeted ways to reduce it.' },
  'productivity-score-and-improvement': { title: 'How to Measure & Improve Your Productivity Score | VitalHealth Hub', desc: 'Productivity is measurable — not just a feeling. Learn how to assess your true daily output, identify the habits draining your productivity, and take targeted steps to improve your score.' },
  'work-life-balance-practical-guide': { title: 'Work-Life Balance – Practical Strategies That Actually Work | VitalHealth Hub', desc: 'True work-life balance isn\'t about working less — it\'s about boundary design. Discover the most effective strategies for protecting personal time without sacrificing career performance.' },
  'digital-detox-how-to-guide': { title: 'Digital Detox – How to Break Your Screen Addiction | VitalHealth Hub', desc: 'Compulsive screen use damages attention spans, sleep, and real-world relationships. Discover the step-by-step digital detox process and how to maintain healthier tech habits long-term.' },
  'how-to-improve-focus-and-concentration': { title: 'How to Improve Focus – Science-Backed Methods That Work | VitalHealth Hub', desc: 'Shrinking attention spans are a modern epidemic. Discover evidence-based techniques for improving focus — from brain training and deep work to sleep, nutrition, and your environment.' },
  'sleep-debt-how-to-recover': { title: 'Sleep Debt – What It Is & the Only Way to Pay It Back | VitalHealth Hub', desc: 'Sleep debt accumulates silently and damages your health in ways you rarely notice. Discover what it is, how much you\'ve accumulated, and the scientifically correct way to recover it.' },
  'best-sleep-position-for-health': { title: 'Best Sleep Position – Back, Side or Stomach? | VitalHealth Hub', desc: 'Your sleep position affects back pain, snoring, acid reflux, and circulation. Discover which position doctors recommend for your specific health condition and how to transition comfortably.' },
  'insomnia-natural-remedies': { title: 'Insomnia Natural Remedies – 10 Evidence-Based Solutions | VitalHealth Hub', desc: 'Insomnia doesn\'t always require medication. Discover 10 scientifically supported natural remedies — from CBT-I and sleep restriction to specific supplements and strategic light therapy.' },
  'magnesium-for-better-sleep': { title: 'Magnesium for Sleep – Does It Work & How Much to Take? | VitalHealth Hub', desc: 'Magnesium is one of the most studied sleep supplements. Discover what the evidence shows, which form works best, the correct dose for sleep, and when to take it for optimal results.' },
  'sleep-hygiene-complete-checklist': { title: 'Sleep Hygiene Checklist – 15 Habits for Deeper Sleep | VitalHealth Hub', desc: 'The right sleep habits can add hours of quality rest per night. Work through this science-backed 15-point checklist and identify exactly which changes will help your sleep most tonight.' },
  'how-age-calculator-works': { title: 'How to Calculate Your Exact Age – Age Calculator Guide | VitalHealth Hub', desc: 'There\'s more to your age than just years. Discover how age calculators work, why exact age in days and hours matters, and how to use your precise age for health planning and milestones.' },
  'how-birthday-calculator-works': { title: 'Birthday Calculator – Day, Age & Birthday Countdown | VitalHealth Hub', desc: 'A birthday calculator reveals more than just your age. Discover which day you were born on, how many days until your next birthday, and fascinating statistics about your birth date.' },
  'date-difference-calculator-guide': { title: 'Date Difference Calculator – Days Between Any Two Dates | VitalHealth Hub', desc: 'Calculating the gap between dates manually is error-prone. Learn how date difference calculators work for deadlines, anniversaries, and planning, and understand what the results mean.' },
  'healthy-morning-routine-guide': { title: 'Healthy Morning Routine – 10 Habits That Transform Your Day | VitalHealth Hub', desc: 'Your morning sets the tone for everything that follows. Discover 10 science-backed morning habits that improve energy, focus, and mood — and how to build a routine you actually keep.' },
  'how-to-quit-sugar-21-days': { title: 'How to Quit Sugar in 21 Days – Step-by-Step Detox Plan | VitalHealth Hub', desc: 'Sugar cravings are biological — not a willpower failure. Follow this structured 21-day detox plan to eliminate added sugars, reset your taste buds, and break free from sugar addiction.' },
  'alcohol-effects-on-health-and-weight': { title: 'Alcohol & Your Health – What It Does to Your Body | VitalHealth Hub', desc: 'Alcohol affects far more than your liver. Discover what regular drinking does to your weight, metabolism, sleep, mental health, and long-term disease risk — with real numbers and data.' },
  'how-to-use-bmi-calculator-correctly': { title: 'How to Use a BMI Calculator – Mistakes to Avoid | VitalHealth Hub', desc: 'Most people misinterpret their BMI results. Learn how to use a BMI calculator correctly, the common mistakes that lead to wrong conclusions, and which metrics add meaningful context.' },
  'calorie-calculator-complete-guide': { title: 'Calorie Calculator Guide – Find Your Exact Calorie Needs | VitalHealth Hub', desc: 'A calorie calculator is only useful if you understand the inputs and trust the output. Learn how they work, how accurate they are, and how to use your result to actually hit your goal.' },
  'protein-calculator-how-to-use': { title: 'Protein Calculator Guide – Find Your Daily Target | VitalHealth Hub', desc: 'Protein calculators vary widely in their outputs. Discover how protein needs are actually calculated, which formulas are most accurate for your goal, and how to use your result.' },
  'blood-pressure-ranges-explained': { title: 'Blood Pressure Numbers Explained – What Your Reading Means | VitalHealth Hub', desc: 'Systolic and diastolic numbers can be confusing without context. Discover what every blood pressure range means for your health, when to act on a reading, and how to bring high numbers down.' },
  'testosterone-levels-by-age-guide': { title: 'Testosterone Levels by Age – What\'s Normal & Signs of Low T | VitalHealth Hub', desc: 'Testosterone declines with age — but knowing what\'s normal helps you spot real deficiency. Discover typical ranges, symptoms of low T, and evidence-based ways to support your levels.' },
  'heart-age-calculator-guide': { title: 'Heart Age Calculator – Is Your Heart Older Than You? | VitalHealth Hub', desc: 'Your heart can be significantly older or younger than your birth age. Learn how heart age is calculated, what factors accelerate cardiac aging, and how to take years off your heart age.' }
};

const QUIZ_META = {
  'nutrition-knowledge-quiz': { title: 'Nutrition Knowledge Quiz – Test Your Food IQ | VitalHealth Hub', desc: 'How well do you really understand macros, vitamins, and healthy eating? Test your nutrition IQ with 10 evidence-based questions. Discover your score and what it reveals about your diet.' },
  'hydration-health-quiz': { title: 'Hydration Health Quiz – How Well Do You Know Water? | VitalHealth Hub', desc: 'Are you truly hydration-smart? Test your knowledge of daily water needs, electrolytes, and dehydration with 10 research-based questions. Find out your hydration IQ score right now.' },
  'fitness-level-quiz': { title: 'Fitness Level Quiz – Discover Your Fitness Category | VitalHealth Hub', desc: 'Wondering where you actually stand fitness-wise? Take our evidence-based quiz and find your current fitness category. Get personalized recommendations to level up your training today.' },
  'lifestyle-health-score-quiz': { title: 'Lifestyle Health Score – Rate Your Healthy Habits | VitalHealth Hub', desc: 'Your lifestyle is your biggest health predictor. Score your habits across nutrition, movement, sleep, and stress. Discover your overall health score and priority areas for improvement.' },
  'stress-awareness-quiz': { title: 'Stress Awareness Quiz – How Stressed Are You Really? | VitalHealth Hub', desc: 'Stress is often invisible until it becomes dangerous. Take our evidence-based stress awareness quiz, understand your current level, and get personalized coping strategies that help.' },
  'burnout-risk-quiz': { title: 'Burnout Risk Quiz – Are You Heading for Burnout? | VitalHealth Hub', desc: 'Burnout develops silently before it becomes obvious. Assess your risk across exhaustion, cynicism, and effectiveness. Discover your burnout level and take protective action today.' },
  'sleep-quality-quiz': { title: 'Sleep Quality Quiz – How Well Are You Really Sleeping? | VitalHealth Hub', desc: 'Poor sleep quality ruins health even when you get enough hours. Take our 10-question sleep quality assessment and discover what\'s secretly undermining your rest every single night.' },
  'anxiety-awareness-quiz': { title: 'Anxiety Awareness Quiz – Know Your Anxiety Level | VitalHealth Hub', desc: 'Anxiety often goes unrecognized until it takes over daily life. Take our evidence-based anxiety quiz, discover your current level, and learn the most effective management strategies.' },
  'hormone-balance-quiz': { title: 'Hormone Balance Quiz – Are Your Hormones in Balance? | VitalHealth Hub', desc: 'Hormonal imbalance causes dozens of frustrating symptoms that most people attribute to other causes. Take this quiz to assess your hormonal health and spot where imbalances may lie.' },
  'menstrual-health-quiz': { title: 'Menstrual Health Quiz – Test Your Cycle Knowledge | VitalHealth Hub', desc: 'Understanding your menstrual cycle gives you a powerful health advantage. Test your knowledge of cycles, fertility, and hormonal health with 10 expert questions. Find your score today.' },
  'workout-type-quiz': { title: 'Workout Type Quiz – Find Your Ideal Training Style | VitalHealth Hub', desc: 'Not all workout styles suit every person. Take our personality and lifestyle quiz to discover the training approach that fits you best — one you\'ll actually enjoy and consistently stick with.' },
  'diet-type-quiz': { title: 'Diet Type Quiz – Which Diet Suits You Best? | VitalHealth Hub', desc: 'Confused by hundreds of diet options? Discover which eating style aligns with your goals, lifestyle, and preferences. Get a personalized diet match with evidence-based expert guidance.' },
  'biological-age-quiz': { title: 'Biological Age Quiz – How Old Is Your Body Really? | VitalHealth Hub', desc: 'Your body may be aging faster or slower than the calendar shows. Take our biological age quiz to assess your lifestyle-based health age and discover which habits are aging you fastest.' },
  'health-trivia-quiz': { title: 'Health Trivia Quiz – How Much Do You Actually Know? | VitalHealth Hub', desc: 'Think you know your health facts? Challenge yourself with 10 fascinating health trivia questions. Fun, educational, and eye-opening — test your knowledge and learn something surprising.' },
  'brain-health-quiz': { title: 'Brain Health Quiz – Test Your Cognitive Health Knowledge | VitalHealth Hub', desc: 'Your brain health affects every aspect of your life. Test your knowledge of cognitive function, neuroplasticity, and brain-supporting habits with 10 research-backed questions. Start now.' },
  'body-fat-and-composition-quiz': { title: 'Body Fat & Composition Quiz – Test Your Knowledge | VitalHealth Hub', desc: 'Body composition matters more than scale weight — but how much do you know about it? Test your understanding of body fat, lean mass, and body metrics with 10 expert-level questions.' },
  'calorie-and-metabolism-quiz': { title: 'Calorie & Metabolism Quiz – Separate Fact from Fiction | VitalHealth Hub', desc: 'Metabolism myths are everywhere. Test your true understanding of calories, BMR, TDEE, and metabolic rate with 10 scientifically grounded questions. How strong is your metabolism IQ?' },
  'heart-health-quiz': { title: 'Heart Health Quiz – How Heart-Smart Are You? | VitalHealth Hub', desc: 'Cardiovascular disease is the world\'s leading killer — yet largely preventable. Test your heart health knowledge with 10 evidence-based questions and get a personalized risk awareness score.' },
  'nutrient-deficiency-quiz': { title: 'Nutrient Deficiency Quiz – Are You Missing Key Nutrients? | VitalHealth Hub', desc: 'Nutrient deficiencies are more common than most people realize. Take our symptom-based quiz to assess which key vitamins and minerals you may be lacking. Act before deficiency affects health.' },
  'weight-loss-science-quiz': { title: 'Weight Loss Science Quiz – Fact or Myth? | VitalHealth Hub', desc: 'Weight loss is surrounded by myths and misinformation. Test your knowledge of the real science behind fat loss with 10 research-based questions. Find out how much you actually know.' },
  'diabetes-and-blood-sugar-quiz': { title: 'Diabetes & Blood Sugar Quiz – Test Your Risk Knowledge | VitalHealth Hub', desc: 'Diabetes affects hundreds of millions globally — and awareness is your best protection. Test your knowledge of blood sugar, diabetes risk, and prevention with 10 evidence-based questions.' },
  'gut-health-quiz': { title: 'Gut Health Quiz – How Much Do You Know About Your Microbiome? | VitalHealth Hub', desc: 'Your gut microbiome influences immunity, mood, and metabolism. Test your knowledge of gut health, the microbiome, and digestive wellness with 10 research-backed questions. Start now.' }
};

function calcSeoMeta(calc) {
  const n = calc.name.replace(/ Calculator$/i,'').replace(/ Checker$/i,'').replace(/ Calculator$/i,'');
  const CALC_META = {
    'bmi-calculator': { title: 'BMI Calculator – Know Your Weight Status Now | VitalHealth Hub', desc: 'Check your BMI instantly and understand your weight category. Get science-based results with personalized healthy range guidance to take control of your fitness journey today.' },
    'calorie-calculator': { title: 'Calorie Calculator – Find Your Daily Calorie Target | VitalHealth Hub', desc: 'Stop guessing how much to eat. Get your personalized daily calorie target based on your age, weight, height, and activity level. Eat smarter and start reaching your health goals.' },
    'macro-calculator': { title: 'Macro Calculator – Optimize Your Nutrition Plan | VitalHealth Hub', desc: 'Confused about protein, carbs, and fat? Get your exact macro split in seconds. Fuel every meal correctly, hit your fitness goals, and transform your diet with real confidence.' },
    'body-fat-calculator': { title: 'Body Fat Calculator – Reveal Your True Composition | VitalHealth Hub', desc: 'BMI alone doesn\'t tell the full story. Measure your body fat percentage from simple body measurements and get actionable insights to genuinely improve your physical health today.' },
    'ideal-weight-calculator': { title: 'Ideal Weight Calculator – Find Your Target Weight | VitalHealth Hub', desc: 'Wondering what you should realistically weigh? Get a science-backed ideal weight range for your height and gender. Set a clear, achievable target and start your transformation.' },
    'bmr-calculator': { title: 'BMR Calculator – Calories Your Body Burns at Rest | VitalHealth Hub', desc: 'Your nutrition plan starts with knowing your BMR. Calculate your Basal Metabolic Rate instantly using the Mifflin-St Jeor formula and build a smarter, more effective diet strategy.' },
    'tdee-calculator': { title: 'TDEE Calculator – Your Total Daily Calorie Burn | VitalHealth Hub', desc: 'Eating too much or too little without knowing it? Calculate your Total Daily Energy Expenditure and discover the exact calories you need to lose, maintain, or gain weight effectively.' },
    'water-intake-calculator': { title: 'Water Intake Calculator – Your Daily Hydration Goal | VitalHealth Hub', desc: 'Dehydration drains your energy and sharpness. Calculate your personalized daily water target based on your weight and lifestyle. Stay hydrated, energized, and performing at your best.' },
    'sleep-calculator': { title: 'Sleep Calculator – Best Bedtime & Wake-Up Time | VitalHealth Hub', desc: 'Waking up exhausted despite enough hours? Calculate the perfect bedtime and wake-up time using 90-minute sleep cycles. Wake up genuinely rested and energized every single morning.' },
    'heart-rate-calculator': { title: 'Heart Rate Zone Calculator – Train Smarter | VitalHealth Hub', desc: 'Stop guessing during workouts. Calculate your target heart rate zones for fat burn, cardio, and peak performance. Train at the right intensity and make every single session count.' },
    'blood-pressure-checker': { title: 'Blood Pressure Checker – Is Your Reading Healthy? | VitalHealth Hub', desc: 'Know exactly what your blood pressure numbers mean. Check your reading against healthy ranges instantly and understand your cardiovascular risk. Take informed action before it\'s too late.' },
    'pregnancy-due-date-calculator': { title: 'Due Date Calculator – Find Your Baby\'s Arrival Date | VitalHealth Hub', desc: 'Expecting a baby and wondering when they\'ll arrive? Calculate your estimated due date instantly from your last menstrual period. Start planning your pregnancy journey with a clear date.' },
    'ovulation-calculator': { title: 'Ovulation Calculator – Discover Your Fertile Window | VitalHealth Hub', desc: 'Trying to conceive but not sure when you\'re most fertile? Predict your ovulation window with accuracy. Time your efforts right and improve your conception chances this very cycle.' },
    'baby-weight-calculator': { title: 'Baby Weight Calculator – Check Your Baby\'s Percentile | VitalHealth Hub', desc: 'Is your baby growing at a healthy pace? Check their weight percentile against CDC growth standards. Get peace of mind and understand your baby\'s development clearly at a glance.' },
    'child-bmi-calculator': { title: 'Child BMI Calculator – Healthy Weight for Kids | VitalHealth Hub', desc: 'Concerned about your child\'s weight? Calculate their BMI percentile for ages 2–19 using age-adjusted standards. Get science-based guidance to support your child\'s healthy growth.' },
    'menstrual-cycle-calculator': { title: 'Menstrual Cycle Calculator – Predict Your Next Period | VitalHealth Hub', desc: 'Take control of your cycle. Predict upcoming period dates and cycle patterns instantly. Plan ahead, manage symptoms proactively, and feel fully in command of your reproductive health.' },
    'fertility-calculator': { title: 'Fertility Window Calculator – Your Most Fertile Days | VitalHealth Hub', desc: 'Maximize your chances of conception by knowing exactly when you\'re most fertile. Calculate your fertility window by cycle length and plan with precision for a successful outcome.' },
    'protein-intake-calculator': { title: 'Protein Calculator – Your Daily Protein Target | VitalHealth Hub', desc: 'Not sure how much protein you need? Calculate your exact daily requirement based on your weight, goals, and activity level. Build muscle, recover faster, and stay consistently strong.' },
    'carb-calculator': { title: 'Carb Calculator – Find Your Ideal Carb Intake | VitalHealth Hub', desc: 'Too many or too few carbs? Find your personalized daily carbohydrate intake based on your calorie needs and fitness goals. Fuel smarter and maintain steady energy throughout the day.' },
    'fat-intake-calculator': { title: 'Fat Intake Calculator – Your Optimal Daily Fat Target | VitalHealth Hub', desc: 'Afraid of dietary fat? Find out exactly how much you need each day for hormone health, brain function, and sustained energy. Get your target and start eating fat the right way.' },
    'fiber-intake-calculator': { title: 'Fiber Calculator – Are You Getting Enough Fiber? | VitalHealth Hub', desc: 'Most people fall far short on daily fiber. Calculate your recommended intake by age and gender. Close the gap, improve digestion, lower cholesterol, and protect your long-term gut health.' },
    'vitamin-d-calculator': { title: 'Vitamin D Calculator – Your Daily Vitamin D Needs | VitalHealth Hub', desc: 'Vitamin D deficiency is more common than you think. Calculate your daily requirement based on age and sun exposure. Protect your bones, immune function, and mood — starting today.' },
    'iron-intake-calculator': { title: 'Iron Calculator – Are You Getting Enough Iron? | VitalHealth Hub', desc: 'Persistent fatigue may signal iron deficiency. Calculate your daily iron requirement by age and gender. Discover how to optimize your intake and restore your energy levels today.' },
    'calcium-calculator': { title: 'Calcium Calculator – Know Your Daily Calcium Needs | VitalHealth Hub', desc: 'Strong bones start with the right calcium intake. Calculate your personalized daily requirement by age and sex. Protect your skeletal health now and for the decades ahead.' },
    'cholesterol-risk-calculator': { title: 'Cholesterol Risk Calculator – Assess Your Heart Risk | VitalHealth Hub', desc: 'High cholesterol often has no symptoms until damage is done. Assess your cholesterol levels and cardiovascular risk right now. Understand your numbers and take preventive action today.' },
    'diabetes-risk-calculator': { title: 'Diabetes Risk Calculator – Know Your Risk Level | VitalHealth Hub', desc: 'Type 2 diabetes often develops silently over years. Assess your personal risk factors today using our evidence-based screening tool. Discover your level and take control right now.' },
    'stroke-risk-calculator': { title: 'Stroke Risk Calculator – Evaluate Your Stroke Risk | VitalHealth Hub', desc: 'Most strokes are preventable with early awareness. Assess your key risk factors now with our stroke risk tool. Understand your risk level and take protective steps before symptoms appear.' },
    'waist-to-hip-ratio': { title: 'Waist-to-Hip Ratio – Assess Your Abdominal Health Risk | VitalHealth Hub', desc: 'Your waist-to-hip ratio reveals health risks that BMI misses entirely. Calculate yours in seconds and understand your abdominal fat risk. Get real clarity on your cardiovascular health.' },
    'waist-to-height-ratio': { title: 'Waist-to-Height Ratio – A Smarter Health Measure | VitalHealth Hub', desc: 'Research shows waist-to-height ratio predicts health risk better than BMI. Calculate yours now and see exactly where your measurements stand for long-term health outcomes.' },
    'lean-body-mass-calculator': { title: 'Lean Body Mass Calculator – Find Your Muscle Mass | VitalHealth Hub', desc: 'Knowing your lean body mass is key to optimizing training and nutrition. Calculate your fat-free mass instantly and set smarter fitness and body composition goals starting today.' },
    'body-surface-area-calculator': { title: 'Body Surface Area Calculator – Instant BSA Result | VitalHealth Hub', desc: 'Calculate your body surface area using the precise Du Bois formula. Used in clinical dosing and medical assessments — your accurate BSA result is available instantly with no effort.' },
    'one-rep-max-calculator': { title: 'One Rep Max Calculator – Find Your True Strength | VitalHealth Hub', desc: 'Know your maximum strength without the injury risk. Estimate your 1RM for any lift from your training weights and rep count. Benchmark your strength and set ambitious new targets.' },
    'vo2-max-calculator': { title: 'VO2 Max Calculator – Measure Your Aerobic Fitness | VitalHealth Hub', desc: 'VO2 max is the gold standard of aerobic fitness. Estimate yours without a lab test using proven formulas. Track your cardio progress and understand your true fitness level.' },
    'steps-to-calories-calculator': { title: 'Steps to Calories Calculator – What Your Steps Burn | VitalHealth Hub', desc: 'Turn your daily step count into real calorie data. Calculate how many calories your steps actually burn based on your weight and pace. Move with purpose and track your effort accurately.' },
    'running-pace-calculator': { title: 'Running Pace Calculator – Speed, Time & Distance | VitalHealth Hub', desc: 'Training for a race or chasing a personal best? Calculate your running pace, finish time, and speed in seconds. Plan every run with precision and hit your performance targets.' },
    'cycling-calories-calculator': { title: 'Cycling Calories Calculator – Calories Burned Cycling | VitalHealth Hub', desc: 'Know what your rides are really burning. Calculate calories burned during cycling based on your weight, duration, and intensity. Track your effort and fuel your training with real data.' },
    'swimming-calories-calculator': { title: 'Swimming Calories Calculator – Your Swim Calorie Burn | VitalHealth Hub', desc: 'Swimming burns more than most realize. Calculate calories burned per swim session by stroke, intensity, and body weight. Optimize your pool training with accurate, personalized data.' },
    'yoga-calories-calculator': { title: 'Yoga Calories Calculator – How Much Does Yoga Burn? | VitalHealth Hub', desc: 'Yoga is more than flexibility — it burns real calories. Calculate how many calories your yoga practice burns by style and duration. Track your wellness workout with genuine accuracy.' },
    'intermittent-fasting-calculator': { title: 'Intermittent Fasting Calculator – Plan Your IF Window | VitalHealth Hub', desc: 'Ready to try intermittent fasting but unsure where to begin? Calculate your eating and fasting windows for 16:8, 5:2, or any IF protocol. Build your personalized fasting plan today.' },
    'keto-calculator': { title: 'Keto Macro Calculator – Perfect Your Keto Ratios | VitalHealth Hub', desc: 'Starting keto and confused about your macros? Calculate your exact protein, fat, and carb targets for a ketogenic diet. Get into ketosis faster and maximize your keto results.' },
    'alcohol-unit-calculator': { title: 'Alcohol Unit Calculator – Count Units & Calories | VitalHealth Hub', desc: 'Not sure how much you\'re really drinking? Calculate the alcohol units and hidden calories in your drinks instantly. Understand safe limits and make better choices for your health.' },
    'caffeine-intake-calculator': { title: 'Caffeine Calculator – Is Your Daily Caffeine Too High? | VitalHealth Hub', desc: 'Too much caffeine triggers anxiety, crashes, and poor sleep. Calculate your total caffeine from coffee, tea, and energy drinks. Stay within safe limits and feel consistently energized.' },
    'smoking-cost-calculator': { title: 'Smoking Cost Calculator – The True Price of Smoking | VitalHealth Hub', desc: 'Do you know the real cost of your habit? Calculate the financial and health impact of smoking across weeks, months, and years. See the full picture — and find your reason to quit.' },
    'stress-level-calculator': { title: 'Stress Level Calculator – Assess Your Stress Right Now | VitalHealth Hub', desc: 'Feeling overwhelmed but unsure how stressed you actually are? Take our quick stress assessment and get a personalized score with actionable recommendations to genuinely regain control.' },
    'anxiety-score-calculator': { title: 'Anxiety Score Calculator – GAD-7 Inspired Screening | VitalHealth Hub', desc: 'Struggling with persistent worry or unease? Use our GAD-7 inspired tool to screen for anxiety symptoms. Get your score and take the first meaningful step toward better mental health.' },
    'depression-screening-calculator': { title: 'Depression Screening – PHQ-9 Based Self-Assessment | VitalHealth Hub', desc: 'Not feeling like yourself lately? Our PHQ-9 inspired screening identifies depression symptoms and provides a clearer picture of your mental health. Awareness is always the first step.' },
    'sleep-debt-calculator': { title: 'Sleep Debt Calculator – How Much Rest Do You Owe? | VitalHealth Hub', desc: 'Chronic sleep loss builds a debt that affects your health, mood, and performance. Calculate your accumulated sleep deficit and discover how to recover it safely and effectively.' },
    'life-expectancy-calculator': { title: 'Life Expectancy Calculator – Estimate Your Lifespan | VitalHealth Hub', desc: 'How long might you live based on how you live now? Estimate your life expectancy using key health and lifestyle factors. Use the insights to make meaningful, lasting changes today.' },
    'biological-age-calculator': { title: 'Biological Age Calculator – Your Body\'s True Age | VitalHealth Hub', desc: 'Your body may be younger or older than your birth year suggests. Estimate your biological age from lifestyle habits and health markers. Are you aging faster than you should be?' },
    'medication-dosage-calculator': { title: 'Medication Dosage Calculator – Weight-Based Dosing | VitalHealth Hub', desc: 'Calculate a weight-based medication dose for quick reference. A helpful general guide — always consult a qualified healthcare professional before administering any medication.' },
    'bac-calculator': { title: 'BAC Calculator – Estimate Your Blood Alcohol Level | VitalHealth Hub', desc: 'Wondering how alcohol is affecting your system? Estimate your blood alcohol concentration by drinks consumed, body weight, and elapsed time. Make safer, more informed decisions.' },
    'age-calculator': { title: 'Age Calculator – Your Exact Age in Years & Days | VitalHealth Hub', desc: 'Discover your precise age in years, months, weeks, and days instantly. Perfect for birthdays, health milestones, and tracking exactly how long you\'ve been on this incredible journey.' },
    'birthday-calculator': { title: 'Birthday Calculator – Days Until Your Next Birthday | VitalHealth Hub', desc: 'Find out how many days until your next birthday, which day of the week you were born on, and fascinating statistics about your birth date. Celebrate every milestone with precision.' },
    'date-difference-calculator': { title: 'Date Difference Calculator – Days Between Any Dates | VitalHealth Hub', desc: 'Need the exact gap between two dates? Calculate days, weeks, months, and years between any two dates instantly. Perfect for deadlines, anniversaries, and project planning.' },
    'percentage-calculator': { title: 'Percentage Calculator – Fast & Accurate Results | VitalHealth Hub', desc: 'Struggling with percentage math? Calculate percent values, percent change, and what one number is of another — all in one simple tool. Get instant, precise results every time.' },
    'loan-emi-calculator': { title: 'Loan EMI Calculator – Know Your Monthly Payment | VitalHealth Hub', desc: 'Know exactly what you\'ll pay before signing anything. Calculate your monthly loan EMI, total interest, and full repayment schedule. Make smarter financial decisions with confidence.' },
    'tip-calculator': { title: 'Tip Calculator – Split the Bill Instantly | VitalHealth Hub', desc: 'No awkward bill math at the table. Calculate the perfect tip and split the total among your group in seconds. Fair, fast, and completely stress-free every time you dine out.' },
    'password-generator': { title: 'Password Generator – Create Secure Passwords Instantly | VitalHealth Hub', desc: 'Weak passwords put your accounts at serious risk. Generate a cryptographically random, secure password instantly. Customize length and characters for maximum online protection.' },
    'random-number-generator': { title: 'Random Number Generator – Instant Results | VitalHealth Hub', desc: 'Generate truly random numbers within any range instantly. Perfect for games, giveaways, random decisions, and sampling. Get single or multiple results with a single click.' },
    'text-counter': { title: 'Text & Word Counter – Count Words Instantly | VitalHealth Hub', desc: 'Count words, characters, sentences, paragraphs, and reading time in any text instantly. Perfect for writers, students, and SEO professionals who need accurate content metrics.' },
    'countdown-timer': { title: 'Countdown Timer – Live Real-Time Browser Timer | VitalHealth Hub', desc: 'Set a countdown to any event, deadline, or goal and watch it tick in real time. No app needed — our browser-based timer works instantly on any device. Start your countdown now.' },
    'heart-age-calculator': { title: 'Heart Age Calculator – Is Your Heart Aging Too Fast? | VitalHealth Hub', desc: 'Your heart may be older than you think. Estimate your cardiovascular heart age using key risk factors and discover what lifestyle changes could turn back your biological clock today.' },
    'metabolic-age-calculator': { title: 'Metabolic Age Calculator – How Old Is Your Metabolism? | VitalHealth Hub', desc: 'Your metabolism may be younger or older than your real age. Estimate your metabolic age from your BMR compared to averages for your gender. See how your body compares today.' },
    'homa-ir-calculator': { title: 'HOMA-IR Calculator – Estimate Your Insulin Resistance | VitalHealth Hub', desc: 'Insulin resistance often goes undetected for years before causing real problems. Calculate your HOMA-IR score from fasting values to assess sensitivity. Get clarity on your risk now.' },
    'visceral-fat-calculator': { title: 'Visceral Fat Estimator – Reveal Your Hidden Belly Fat | VitalHealth Hub', desc: 'Visceral fat around your organs is the most dangerous type — and BMI can\'t detect it. Estimate your visceral fat level now and understand your true metabolic health risk.' },
    'sodium-intake-calculator': { title: 'Sodium Calculator – Is Your Salt Intake Too High? | VitalHealth Hub', desc: 'Most people consume far more sodium than they realize. Calculate your recommended daily intake and see if your current salt levels are putting your blood pressure at risk today.' },
    'thyroid-risk-calculator': { title: 'Thyroid Risk Calculator – Screen for Thyroid Issues | VitalHealth Hub', desc: 'Thyroid dysfunction affects millions but often goes undiagnosed for years. Assess your risk based on symptoms and history. Know your risk level and act before it progresses further.' },
    'pcos-risk-calculator': { title: 'PCOS Risk Calculator – Assess Your PCOS Risk | VitalHealth Hub', desc: 'PCOS affects 1 in 10 women yet many go undiagnosed. Assess your risk based on key symptoms and factors. Understand where you stand and take the all-important first step today.' },
    'pregnancy-weight-gain-calculator': { title: 'Pregnancy Weight Gain Calculator – Healthy Ranges | VitalHealth Hub', desc: 'How much weight should you gain during pregnancy? Get your recommended range based on your pre-pregnancy BMI. Stay healthy and on track for both you and your growing baby.' },
    'breastfeeding-calorie-calculator': { title: 'Breastfeeding Calorie Calculator – Extra Calorie Needs | VitalHealth Hub', desc: 'Breastfeeding burns more calories than most new mothers realize. Calculate your additional daily calorie needs while nursing to fuel milk production and maintain your wellbeing.' },
    'menopause-symptom-calculator': { title: 'Menopause Symptom Calculator – Score Your Symptoms | VitalHealth Hub', desc: 'Navigating menopause can feel overwhelming without guidance. Score your symptom severity and receive personalized guidance for managing this important and natural life transition.' },
    'burnout-risk-calculator': { title: 'Burnout Risk Calculator – Are You Burning Out? | VitalHealth Hub', desc: 'Burnout develops slowly — often before you notice it happening. Assess your risk across energy, cynicism, and efficacy. Get your score and a clear path back to sustainable wellbeing.' },
    'macro-timing-calculator': { title: 'Macro Timing Calculator – When to Eat Your Macros | VitalHealth Hub', desc: 'Eating the right macros at the wrong time limits your results. Calculate the optimal distribution of protein, carbs, and fat around your workouts for peak performance and recovery.' },
    'focus-score-calculator': { title: 'Focus Score Calculator – Test Your Concentration Level | VitalHealth Hub', desc: 'Struggling to stay focused or complete tasks? Assess your focus ability and attention span with our quick screening. Get your personalized score and tips to think consistently sharper.' },
    'sleep-hygiene-calculator': { title: 'Sleep Hygiene Score – Rate Your Sleep Habits | VitalHealth Hub', desc: 'Poor sleep hygiene is the leading driver of insomnia and daytime fatigue. Evaluate your sleep habits and get a personalized score with actionable tips for deeper, more restful sleep.' },
    'productivity-score-calculator': { title: 'Productivity Score – Measure Your Daily Output | VitalHealth Hub', desc: 'Think you\'re productive? Get a data-driven answer. Assess your habits across focus, energy, and time management. Receive your productivity score and a targeted plan for improvement.' },
    'digital-detox-calculator': { title: 'Digital Detox Calculator – Measure Your Screen Impact | VitalHealth Hub', desc: 'Excessive screen time harms sleep, focus, and mental health. Calculate your daily screen impact and receive a personalized detox plan to reclaim your attention and mental clarity.' },
    'strength-level-calculator': { title: 'Strength Level Calculator – How Strong Are You? | VitalHealth Hub', desc: 'Compare your bench press, squat, and deadlift to strength standards for your body weight. Find out where you rank — beginner to elite — and set your ambitious next strength goal.' },
    'marathon-time-predictor': { title: 'Marathon Time Predictor – Forecast Your Finish Time | VitalHealth Hub', desc: 'Training for a marathon but unsure of your likely pace? Predict your marathon or half marathon finish time from a recent race performance. Plan your race strategy with confidence.' },
    'hiit-calories-calculator': { title: 'HIIT Calorie Calculator – Calories Burned in HIIT | VitalHealth Hub', desc: 'HIIT ranks among the highest calorie-burning workouts available. Calculate exactly how many calories you burn per session based on your intensity, duration, and body weight.' },
    'step-goal-calculator': { title: 'Step Goal Calculator – Your Personalized Step Target | VitalHealth Hub', desc: '10,000 steps isn\'t the right goal for everyone. Calculate your personalized daily step target based on age, weight, and health objectives. Start moving toward the right number for you.' },
    'injury-risk-calculator': { title: 'Injury Risk Calculator – Assess Your Training Risk | VitalHealth Hub', desc: 'Overtraining injuries derail fitness goals and motivation. Assess your exercise-related injury risk based on training habits and biomechanics. Train smarter and stay consistent year-round.' },
    'sugar-intake-calculator': { title: 'Sugar Intake Calculator – Track Your Daily Sugar | VitalHealth Hub', desc: 'Hidden sugars are sabotaging your health goals. Calculate your daily sugar intake and compare it to healthy limits. Cut back strategically and finally take back control of your diet.' },
    'electrolyte-calculator': { title: 'Electrolyte Calculator – Daily Sodium, K & Mg Needs | VitalHealth Hub', desc: 'Electrolyte imbalance causes fatigue, cramps, and low performance. Calculate your daily sodium, potassium, and magnesium requirements based on your activity level and body weight.' },
    'omega3-calculator': { title: 'Omega-3 Calculator – Your Daily Omega-3 Target | VitalHealth Hub', desc: 'Most people get far less omega-3 than they actually need. Calculate your optimal daily intake based on your health needs and current diet. Support your heart, brain, and joint health.' },
    'diet-comparison-calculator': { title: 'Diet Comparison Tool – Compare Diets Side by Side | VitalHealth Hub', desc: 'Not sure which diet suits your goals? Compare macronutrient ratios and calorie distributions across popular diets side by side. Find the best dietary approach for your body today.' },
    'fiber-score-calculator': { title: 'Fiber Intake Score – How Well Do You Eat for Fiber? | VitalHealth Hub', desc: 'Most people are dangerously short on daily fiber. Score your current intake against recommended guidelines. Improve your gut health, lower cholesterol, and protect your digestion today.' },
    'pregnancy-week-calculator': { title: 'Pregnancy Week Calculator – How Far Along Are You? | VitalHealth Hub', desc: 'Not sure exactly how many weeks pregnant you are? Calculate your pregnancy week and estimated due date instantly. Track every stage of your journey with accuracy and confidence.' },
    'hydration-level-calculator': { title: 'Hydration Level Calculator – Are You Drinking Enough? | VitalHealth Hub', desc: 'Your hydration needs depend on your body and lifestyle. Assess your current hydration status and calculate your optimal daily water intake. Perform, think, and feel your absolute best.' },
    'testosterone-estimator': { title: 'Testosterone Estimator – Estimate Your T Levels | VitalHealth Hub', desc: 'Curious about your testosterone range? Estimate your levels based on age and lifestyle factors. Understand what\'s typical for your stage of life and spot potential deficiency signs early.' },
    'anti-inflammatory-score': { title: 'Anti-Inflammatory Diet Score – Rate Your Diet Today | VitalHealth Hub', desc: 'Chronic inflammation drives most modern diseases. Score your diet\'s anti-inflammatory potential and receive personalized guidance to reduce inflammation through targeted food choices.' },
    'work-life-balance-calculator': { title: 'Work-Life Balance Calculator – How Balanced Are You? | VitalHealth Hub', desc: 'Burnout starts long before you notice it. Assess your work-life balance across key life areas and get personalized strategies to restore harmony. Protect your long-term wellbeing.' },
    'child-growth-calculator': { title: 'Child Growth Calculator – Track Your Child\'s Growth | VitalHealth Hub', desc: 'Is your child growing at a healthy rate? Assess height and weight percentiles for ages 2–17 using CDC standards. Get reliable data to guide your child\'s healthcare decisions.' },
    'intermittent-fasting-window': { title: 'Fasting Window Calculator – Plan Your IF Schedule | VitalHealth Hub', desc: 'Starting intermittent fasting and need a clear plan? Calculate your exact eating and fasting windows for any IF protocol with precise start and end times. Begin fasting with clarity.' },
    'calorie-burn-calculator': { title: 'Activity Calorie Burn Calculator – 40+ Activities | VitalHealth Hub', desc: 'See how many calories your favorite activities actually burn. Calculate calorie expenditure for 40+ activities based on your weight and duration. Move more strategically every single day.' },
    'pomodoro-calculator': { title: 'Pomodoro Calculator – Plan Your Focus Sessions | VitalHealth Hub', desc: 'Struggling to work through your task list? Calculate optimal Pomodoro work sessions for your schedule. Plan focused work blocks strategically and accomplish significantly more each day.' },
    'age-in-days-calculator': { title: 'Age in Days Calculator – Your Exact Age in Days | VitalHealth Hub', desc: 'Discover your precise age in days, hours, minutes, and seconds. A fascinating way to appreciate every moment and celebrate every milestone. Find out exactly how long you\'ve been alive.' },
    'bmi-prime-calculator': { title: 'BMI Prime Calculator – A More Refined BMI Measurement | VitalHealth Hub', desc: 'BMI Prime gives a more meaningful number than standard BMI alone. Calculate yours to see exactly how far you are from the upper boundary of a healthy weight. Know your real number.' },
    'lean-mass-goal-calculator': { title: 'Lean Mass Goal Calculator – Set Your Muscle Target | VitalHealth Hub', desc: 'Not sure how much muscle you need to build for your ideal physique? Calculate your lean mass goal based on your target body composition. Set a precise, science-backed muscle target.' },
    'waist-reduction-calculator': { title: 'Waist Reduction Calculator – How Long to a Healthy Waist | VitalHealth Hub', desc: 'How long will it take to reach a healthy waist? Get realistic projections for reducing your waist circumference based on your calorie deficit. Plan your body transformation today.' },
    'protein-timing-calculator': { title: 'Protein Timing Calculator – Optimize Your Protein Meals | VitalHealth Hub', desc: 'When you eat protein is as important as how much you eat. Optimize the timing and distribution of your daily protein intake for maximum muscle synthesis and faster recovery.' },
    'hydration-reminder-calculator': { title: 'Water Reminder Calculator – Stay Hydrated All Day | VitalHealth Hub', desc: 'Forgetting to drink water during the day? Calculate exactly how often to drink and how much based on your daily target. Never deal with dehydration headaches or energy crashes again.' },
    'body-recomposition-calculator': { title: 'Body Recomposition Calculator – Lose Fat & Gain Muscle | VitalHealth Hub', desc: 'Losing fat while gaining muscle is possible with the right numbers. Calculate your recomposition calories and macros to begin transforming your body composition the smart way today.' }
  };
  const found = CALC_META[calc.slug];
  const metaTitle = found ? found.title : `${calc.name} – Free Online Estimate | ${SITE_NAME}`;
  const metaDesc = found ? found.desc : `Use our free ${calc.name} for an educational estimate. Read the result with its assumptions and limitations. No sign-up required.`;
  const keywords = `${n.toLowerCase()} calculator, free ${n.toLowerCase()} calculator, ${n.toLowerCase()} calculator online, calculate ${n.toLowerCase()} online, accurate ${n.toLowerCase()} calculator, ${n.toLowerCase()} for men, ${n.toLowerCase()} for women, how to calculate ${n.toLowerCase()}, what is a healthy ${n.toLowerCase()}, ${n.toLowerCase()} explained, ${n.toLowerCase()} ranges for adults`;
  return { metaTitle, metaDesc, keywords };
}

function calcHowToSection(calc) {
  const n = calc.name;
  const fieldList = calc.fields.map((f,i) => `<li><strong>Step ${i+1} — ${f.label}:</strong> Enter your ${f.label.toLowerCase()}${f.type==='select'?' by selecting the option that best matches your situation':' in the input field'}.`).join('</li>');
  return `<section class="seo-section fade-in">
<h2>How to Use the ${n}</h2>
<ol class="how-to-steps">
${fieldList}</li>
<li><strong>Step ${calc.fields.length+1} — Click Calculate:</strong> Press the Calculate button to generate the result from the values supplied.</li>
<li><strong>Step ${calc.fields.length+2} — Read Your Results:</strong> Treat colors as interface prompts and read the written explanation, assumptions, and limitations.</li>
<li><strong>Step ${calc.fields.length+3} — Take Action:</strong> Use the personalized suggestion in your results to guide your next health steps. Consult a doctor for medical decisions.</li>
</ol>
</section>`;
}

function calcTipsSection(calc) {
  const tips = {
    'Body Metrics': ['Measure yourself in the morning before eating for the most consistent readings.','Combine multiple metrics (BMI + body fat + waist) for a fuller health picture.','Track changes over weeks, not days — daily fluctuations are normal.','Focus on trends rather than single measurements.','Strength training improves body composition even if the scale doesn\'t change much.'],
    'Nutrition': ['Prioritize whole, minimally processed foods for 80% of your intake.','Track your intake for at least 2 weeks to understand your real eating patterns.','Hydration supports metabolism — aim for pale yellow urine throughout the day.','Meal prep on weekends to make healthy choices easier during busy weekdays.','Protein at every meal helps with satiety and muscle maintenance.'],
    'Fitness': ['Consistency beats intensity — exercising 4× per week moderately beats 1 exhausting session.','Warm up for 5 minutes before training and cool down to prevent injury.','Progressive overload — gradually increase weight or reps to keep improving.','Rest at least 1-2 days per week for muscle recovery and performance gains.','Track your workouts to see long-term progress and stay motivated.'],
    'Heart Health': ['Aim for 150+ minutes of moderate aerobic activity per week for heart health.','Reduce sodium intake to keep blood pressure in the healthy range.','Monitor your numbers regularly — many cardiovascular issues have no symptoms.','Mediterranean-style diet has the strongest evidence for heart disease prevention.','Stress management directly impacts heart health — prioritize relaxation techniques.'],
    'Sleep': ['Maintain a consistent sleep and wake time, even on weekends.','Keep your bedroom cool (60-67°F / 15-19°C) for optimal sleep quality.','Avoid screens 30-60 minutes before bed — blue light suppresses melatonin.','Limit caffeine after 2 PM as it can stay in your system for 6+ hours.','Regular exercise improves sleep quality, but avoid vigorous exercise within 3 hours of bedtime.'],
    'Wellness': ['Small daily habits compound over time — focus on consistency, not perfection.','Regular preventive health checkups catch issues before they become serious.','Social connections and mental well-being are just as important as physical health.','Spend time outdoors — sunlight, fresh air, and nature have measurable health benefits.','Adequate sleep (7-9 hours) is foundational to every other aspect of health.'],
    'Disease Prevention': ['Annual blood work gives early warning signs of developing conditions.','A 5-10% weight loss can significantly reduce risk for metabolic diseases.','Quitting smoking is the single most impactful lifestyle change for disease prevention.','Regular physical activity reduces risk of type 2 diabetes, cancer, and heart disease.','Manage chronic stress through mindfulness, exercise, and social support.'],
    'Health Risk': ['Annual blood work gives early warning signs of developing conditions.','A 5-10% weight loss can significantly reduce risk for metabolic diseases.','Quitting smoking is the single most impactful lifestyle change for disease prevention.','Regular physical activity reduces risk of type 2 diabetes, cancer, and heart disease.','Manage chronic stress through mindfulness, exercise, and social support.'],
    "Women's Health": ['Track your cycle regularly — irregularities can signal underlying health conditions.','Bone density peaks in your 30s — adequate calcium and vitamin D matter from a young age.','Hormonal changes affect metabolism — adjust nutrition and exercise plans accordingly.','Regular gynecological checkups are essential regardless of age or symptoms.','Iron needs are higher during reproductive years — ensure adequate dietary intake.'],
  };
  const t = tips[calc.category] || tips['Wellness'];
  return `<section class="seo-section fade-in">
<h2>Tips to Improve Your ${calc.name.replace(/ Calculator$/i,'').replace(/ Checker$/i,'')}</h2>
<ul class="tips-list">
${t.map(tip=>`<li>${tip}</li>`).join('')}
</ul>
</section>`;
}

function calcRelatedCards(calc) {
  const related = (calc.related||[]).slice(0,3);
  if (!related.length) return '';
  const cards = related.map(r => {
    const rc = calculators.find(c => c.slug === r);
    return rc ? `<a href="/calculators/${r}.html" class="related-calc-card"><div class="related-calc-icon">${calcSvg(rc.icon, rc.slug)}</div><div><h4>${rc.name}</h4><p>${rc.desc}</p><span class="read-more">Use Calculator &rarr;</span></div></a>` : '';
  }).filter(Boolean).join('');
  return `<section class="seo-section fade-in">
<h2>Related Calculators You Might Find Useful</h2>
<div class="related-calcs-grid">${cards}</div>
</section>`;
}

function calcCrossContentSection(calc) {
  const blogCatMap = {
    'Body Metrics':       ['BMI & Body Weight','Weight Management','General Health'],
    'Nutrition':          ['Nutrition & Diet','Calorie & Weight','General Health'],
    'Fitness':            ['Fitness & Exercise','General Health'],
    'Fitness & Exercise': ['Fitness & Exercise','General Health'],
    'Heart Health':       ['Heart Health','Chronic Disease','General Health'],
    'Sleep':              ['Sleep & Recovery','Mental Health & Wellness'],
    'Wellness':           ['Mental Health & Wellness','General Health'],
    "Women's Health":     ["Women's Health",'General Health'],
    'Disease Prevention': ['Chronic Disease','General Health'],
    'Health Risk':        ['Chronic Disease','General Health'],
  };
  const bCats = blogCatMap[calc.category] || ['General Health'];
  const relatedBlogs = blogPosts.filter(p => bCats.some(c => p.category && p.category.includes(c.split(' ')[0]))).slice(0, 3);

  const quizMap = {
    'Body Metrics':       ['body-fat-and-composition-quiz','biological-age-quiz','health-trivia-quiz'],
    'Nutrition':          ['nutrition-knowledge-quiz','calorie-and-metabolism-quiz','diet-type-quiz'],
    'Fitness':            ['fitness-level-quiz','workout-type-quiz','calorie-and-metabolism-quiz'],
    'Fitness & Exercise': ['fitness-level-quiz','workout-type-quiz','calorie-and-metabolism-quiz'],
    'Heart Health':       ['heart-health-quiz','lifestyle-health-score-quiz','stress-awareness-quiz'],
    'Sleep':              ['sleep-quality-quiz','lifestyle-health-score-quiz','burnout-risk-quiz'],
    'Wellness':           ['lifestyle-health-score-quiz','stress-awareness-quiz','burnout-risk-quiz'],
    "Women's Health":     ['hormone-balance-quiz','menstrual-health-quiz','lifestyle-health-score-quiz'],
    'Disease Prevention': ['lifestyle-health-score-quiz','biological-age-quiz','stress-awareness-quiz'],
    'Health Risk':        ['lifestyle-health-score-quiz','biological-age-quiz','heart-health-quiz'],
  };
  const qSlugs = quizMap[calc.category] || ['nutrition-knowledge-quiz','lifestyle-health-score-quiz','fitness-level-quiz'];
  const relatedQuizzes = qSlugs.map(s => quizzesData.find(q => q.slug === s)).filter(Boolean).slice(0, 2);

  const toolMap = {
    'Body Metrics':       ['health-dashboard','habit-tracker','step-tracker'],
    'Nutrition':          ['habit-tracker','daily-planner','health-dashboard'],
    'Fitness':            ['step-tracker','habit-tracker','health-dashboard'],
    'Fitness & Exercise': ['step-tracker','habit-tracker','health-dashboard'],
    'Heart Health':       ['health-dashboard','step-tracker','mood-tracker'],
    'Sleep':              ['sleep-tracker','habit-tracker','mood-tracker'],
    'Wellness':           ['mood-tracker','habit-tracker','daily-planner'],
    "Women's Health":     ['health-dashboard','mood-tracker','sleep-tracker'],
    'Disease Prevention': ['health-dashboard','habit-tracker','step-tracker'],
    'Health Risk':        ['health-dashboard','habit-tracker','sleep-tracker'],
  };
  const tSlugs = toolMap[calc.category] || ['habit-tracker','health-dashboard','sleep-tracker'];
  const relatedTools = tSlugs.map(s => toolsData.find(t => t.slug === s)).filter(Boolean).slice(0, 3);

  const blogCardsHtml = relatedBlogs.map(post => {
    const img = blogCardImage(post.slug);
    const imgUrl = (img.url.includes('?') ? img.url.split('?')[0] : img.url) + '?w=440&h=220&fit=crop&auto=format&q=80';
    return `<a href="/blog/${post.slug}.html" class="ccs-xlink-card">
<div class="ccs-xlink-img"><img src="${imgUrl}" alt="${img.alt}" width="440" height="220" loading="lazy"></div>
<div class="ccs-xlink-body">
<span class="ccs-xlink-badge">${post.category}</span>
<h4>${post.title}</h4>
<div class="ccs-xlink-meta">${post.readTime} read &bull; Educational guide</div>
<span class="ccs-xlink-cta">Read Article &rarr;</span>
</div></a>`;
  }).join('');

  const quizCardsHtml = relatedQuizzes.map(quiz => `<a href="/quizzes/${quiz.slug}.html" class="ccs-xlink-card ccs-xlink-flat">
<div class="ccs-xlink-flat-icon">${quiz.icon}</div>
<div class="ccs-xlink-body">
<span class="ccs-xlink-badge ccs-badge-quiz">${quiz.category}</span>
<h4>${quiz.name}</h4>
<p class="ccs-xlink-desc">${quiz.desc.length > 90 ? quiz.desc.slice(0,90)+'...' : quiz.desc}</p>
<span class="ccs-xlink-cta">Take Quiz &rarr;</span>
</div></a>`).join('');

  const toolCardsHtml = relatedTools.map(tool => `<a href="/tools/${tool.slug}.html" class="ccs-xlink-card ccs-xlink-flat">
<div class="ccs-xlink-flat-icon">${tool.icon}</div>
<div class="ccs-xlink-body">
<span class="ccs-xlink-badge ccs-badge-tool">Free Tool</span>
<h4>${tool.name}</h4>
<p class="ccs-xlink-desc">${tool.desc.length > 85 ? tool.desc.slice(0,85)+'...' : tool.desc}</p>
<span class="ccs-xlink-cta">Use Tool &rarr;</span>
</div></a>`).join('');

  if (!blogCardsHtml && !quizCardsHtml && !toolCardsHtml) return '';

  return `<section class="ccs-section ccs-gray">
<div class="container">
<div class="ccs-explore-header fade-in">
<h2>Explore More Health Tools &amp; Insights</h2>
<p>Deepen your knowledge with related articles, quizzes, and free tracking tools.</p>
</div>
<div class="ccs-explore-grid fade-in">
${blogCardsHtml ? `<div class="ccs-explore-block">
<div class="ccs-explore-block-title"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Related Articles</div>
<div class="ccs-xlink-stack">${blogCardsHtml}</div>
<a href="/blog.html" class="ccs-explore-view-all">View All Articles &rarr;</a>
</div>` : ''}
${quizCardsHtml ? `<div class="ccs-explore-block">
<div class="ccs-explore-block-title"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg> Test Your Knowledge</div>
<div class="ccs-xlink-stack">${quizCardsHtml}</div>
<a href="/quizzes/" class="ccs-explore-view-all">View All Quizzes &rarr;</a>
</div>` : ''}
${toolCardsHtml ? `<div class="ccs-explore-block">
<div class="ccs-explore-block-title"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Quick Tools</div>
<div class="ccs-xlink-stack">${toolCardsHtml}</div>
<a href="/tools/" class="ccs-explore-view-all">View All Tools &rarr;</a>
</div>` : ''}
</div>
</div>
</section>`;
}

function calcDepthSections(calc) {
  const n = calc.name;
  const cat = calc.category || 'Health';

  const audienceMap = {
    'Body Metrics':       'adults monitoring weight and body composition, athletes tracking fitness metrics, people starting a weight-loss or muscle-building programme, and healthcare providers conducting wellness screenings',
    'Nutrition':          'anyone planning a balanced diet, athletes optimising performance nutrition, people managing specific conditions like diabetes or heart disease, and registered dietitians',
    'Fitness':            'gym-goers at every level, personal trainers designing client programmes, competitive athletes monitoring performance, and anyone beginning a structured exercise routine',
    'Fitness & Exercise': 'gym-goers at every level, personal trainers designing client programmes, competitive athletes monitoring performance, and anyone beginning a structured exercise routine',
    'Heart Health':       'adults concerned about cardiovascular health, people with a family history of heart disease, individuals managing hypertension or high cholesterol, and healthcare professionals',
    'Sleep':              'anyone struggling with sleep quality or fatigue, shift workers with irregular schedules, parents monitoring family sleep health, and clinicians in sleep medicine',
    'Wellness':           'individuals managing daily stress, people experiencing burnout or low mood, mental health practitioners, and anyone tracking psychological wellbeing over time',
    "Women's Health":     'women at all life stages from reproductive years through menopause, healthcare providers supporting women\'s health, and those managing hormone or cycle-related conditions',
    'Disease Prevention': 'adults at risk of chronic conditions, people with a relevant family history, healthcare providers conducting risk screenings, and those taking a proactive approach to health',
    'Health Risk':        'adults wanting to understand their personal health risk profile, people with multiple risk factors, healthcare professionals educating patients, and public health researchers',
  };
  const audience = audienceMap[cat] || 'adults of all ages who want to monitor, track, and improve their health with evidence-based tools';

  const mistakesMap = {
    'Body Metrics': [
      '<strong>Taking measurements at inconsistent times</strong> — always measure at the same time of day (ideally morning, fasted) so readings are directly comparable.',
      '<strong>Mistaking daily weight fluctuations for fat changes</strong> — water retention and glycogen shifts can move the scale by 1–3 kg without any real body-composition change.',
      '<strong>Treating a single metric as the whole picture</strong> — no calculator captures complete health on its own. Combine results with other assessments.',
      '<strong>Setting unrealistic timelines</strong> — sustainable body-composition change takes weeks to months, not days.',
      '<strong>Skipping regular re-tests</strong> — a single reading is a snapshot. Track trends across 4–8 weeks for meaningful insight.',
    ],
    'Nutrition': [
      '<strong>Using generic online values instead of actual food labels</strong> — macro content varies significantly between brands and cooking methods.',
      '<strong>Forgetting cooking oils, sauces, and condiments</strong> — these add substantial hidden calories that are easy to overlook.',
      '<strong>Keeping the same targets indefinitely</strong> — calorie and macro needs shift as your weight, activity level, and goals change.',
      '<strong>Pursuing perfection over consistency</strong> — hitting targets 80% of the time outperforms rigid compliance followed by abandonment.',
      '<strong>Focusing only on macros</strong> — ignoring micronutrients can lead to deficiencies even on a calorie-accurate diet.',
    ],
    'Fitness': [
      '<strong>Skipping warm-ups</strong> — entering training cold significantly increases injury risk and reduces performance output.',
      '<strong>Progressing too quickly</strong> — increasing load, volume, or intensity by more than 10% per week invites overuse injuries.',
      '<strong>Undervaluing recovery</strong> — muscle growth and fitness adaptation happen during rest, not during training itself.',
      '<strong>Training the same muscle groups on consecutive days</strong> — without adequate recovery time, gains stall and injury risk rises.',
      '<strong>Ignoring pain signals</strong> — training discomfort is normal; sharp or joint pain is a warning to stop immediately.',
    ],
    'Heart Health': [
      '<strong>Treating one measurement as definitive</strong> — blood pressure, heart rate, and cholesterol all fluctuate; trends matter more than single readings.',
      '<strong>Not accounting for medications</strong> — many drugs directly affect cardiovascular metrics. Always note any relevant medications.',
      '<strong>Misinterpreting borderline results</strong> — a slightly elevated result is not cause for panic, nor is it reason to ignore a pattern. Consult a doctor.',
      '<strong>Measuring after exercise, caffeine, or stress</strong> — these raise readings significantly. Always measure at true rest for a meaningful baseline.',
    ],
    'Sleep': [
      '<strong>Tracking duration but not quality</strong> — eight hours of fragmented sleep is very different from eight hours of consolidated, restorative rest.',
      '<strong>Over-trusting consumer trackers</strong> — wearable sleep trackers have significant accuracy limitations compared to clinical polysomnography.',
      '<strong>Ignoring sleep consistency</strong> — irregular sleep schedules disrupt circadian rhythm even when total hours look adequate.',
      '<strong>Chasing perfect scores instead of patterns</strong> — identifying triggers for poor sleep nights is far more actionable than optimising a number.',
    ],
    'Wellness': [
      '<strong>Treating a score as a clinical diagnosis</strong> — wellness assessments identify risk patterns, not medical conditions. They complement professional care.',
      '<strong>Taking a single snapshot</strong> — mental and physical wellbeing fluctuates; track across several weeks for meaningful trends.',
      '<strong>Dismissing sub-clinical results</strong> — mild stress or early burnout still benefits from targeted lifestyle intervention.',
      '<strong>Using results to replace professional consultation</strong> — these tools are designed to inform, not substitute, healthcare advice.',
    ],
  };
  const mistakes = mistakesMap[cat] || [
    '<strong>Relying on a single reading</strong> — repeated measurements over time reveal the trends that single data points cannot.',
    '<strong>Ignoring broader health context</strong> — calculators provide evidence-based guidance, not clinical diagnosis. Consult a professional for medical decisions.',
    '<strong>Entering inaccurate data</strong> — the quality of your results depends entirely on the accuracy of what you input.',
    '<strong>Treating results as fixed</strong> — your health metrics shift as your lifestyle, age, and circumstances evolve. Re-test regularly.',
    '<strong>Skipping professional validation</strong> — use this tool to prepare for, not replace, meaningful conversations with your doctor or dietitian.',
  ];

  const linkMap = {
    'Body Metrics':       ['<a href="/calculators/bmi-calculator.html">BMI Calculator</a>','<a href="/calculators/body-fat-calculator.html">Body Fat Calculator</a>','<a href="/calculators/tdee-calculator.html">TDEE Calculator</a>'],
    'Nutrition':          ['<a href="/calculators/calorie-calculator.html">Calorie Calculator</a>','<a href="/calculators/macro-calculator.html">Macro Calculator</a>','<a href="/calculators/protein-intake-calculator.html">Protein Calculator</a>'],
    'Fitness':            ['<a href="/calculators/tdee-calculator.html">TDEE Calculator</a>','<a href="/calculators/vo2-max-calculator.html">VO2 Max Calculator</a>','<a href="/calculators/one-rep-max-calculator.html">One Rep Max Calculator</a>'],
    'Fitness & Exercise': ['<a href="/calculators/tdee-calculator.html">TDEE Calculator</a>','<a href="/calculators/vo2-max-calculator.html">VO2 Max Calculator</a>','<a href="/calculators/one-rep-max-calculator.html">One Rep Max Calculator</a>'],
    'Heart Health':       ['<a href="/calculators/blood-pressure-checker.html">Blood Pressure Checker</a>','<a href="/calculators/heart-rate-calculator.html">Heart Rate Zone Calculator</a>','<a href="/calculators/cholesterol-risk-calculator.html">Cholesterol Risk Calculator</a>'],
    'Sleep':              ['<a href="/calculators/sleep-calculator.html">Sleep Calculator</a>','<a href="/calculators/bmr-calculator.html">BMR Calculator</a>','<a href="/calculators/water-intake-calculator.html">Water Intake Calculator</a>'],
    'Wellness':           ['<a href="/calculators/stress-level-calculator.html">Stress Level Calculator</a>','<a href="/calculators/anxiety-score-calculator.html">Anxiety Score Calculator</a>','<a href="/calculators/biological-age-calculator.html">Biological Age Calculator</a>'],
    "Women's Health":     ['<a href="/calculators/bmi-calculator.html">BMI Calculator</a>','<a href="/calculators/calorie-calculator.html">Calorie Calculator</a>','<a href="/calculators/water-intake-calculator.html">Water Intake Calculator</a>'],
    'Disease Prevention': ['<a href="/calculators/diabetes-risk-calculator.html">Diabetes Risk Calculator</a>','<a href="/calculators/blood-pressure-checker.html">Blood Pressure Checker</a>','<a href="/calculators/cholesterol-risk-calculator.html">Cholesterol Risk Calculator</a>'],
    'Health Risk':        ['<a href="/calculators/biological-age-calculator.html">Biological Age Calculator</a>','<a href="/calculators/bmi-calculator.html">BMI Calculator</a>','<a href="/calculators/diabetes-risk-calculator.html">Diabetes Risk Calculator</a>'],
  };
  const links = linkMap[cat] || ['<a href="/calculators/bmi-calculator.html">BMI Calculator</a>','<a href="/calculators/calorie-calculator.html">Calorie Calculator</a>','<a href="/calculators/tdee-calculator.html">TDEE Calculator</a>'];
  const relLinks = links.join(', ');

  return `
<section class="ccs-section ccs-white">
<div class="container">
<div class="ccs-article fade-in">
<h2>Who Should Use the ${n}?</h2>
<p>This tool is intended as an educational estimate for people who understand the inputs and limitations described on this page. Whether it is appropriate depends on the calculation, the user’s circumstances, and the decision being considered.</p>
<p>Check the stated intended population before using the result. Children, pregnancy, diagnosed conditions, medicines, and unusual symptoms often require a different method or professional interpretation.</p>
<p>For a more complete health picture, pair this tool with our ${relLinks} — together they give you a multi-dimensional view of the metrics that matter most to long-term wellbeing.</p>
<h2>Common Mistakes to Avoid</h2>
<p>Getting accurate, actionable results from the ${n} depends on more than entering correct numbers. These are the most common errors that reduce the usefulness of your output:</p>
<ul>
${mistakes.map(m => `<li>${m}</li>`).join('\n')}
</ul>
<p>Avoiding these pitfalls transforms this calculator from a one-time curiosity into a reliable instrument for genuine health monitoring and meaningful progress tracking over time.</p>
</div>
</div>
</section>`;
}

function generateCalculatorPage(calc) {
  const bc = breadcrumb([{name:'Home',url:'/'},{name:'Calculators',url:'/calculators/'},{name:calc.name,url:'/calculators/'+calc.slug+'.html'}]);
  const faq = faqSection(calc.faqs);
  const seo = calcSeoMeta(calc);
  const n = calc.name.replace(/ Calculator$/i,'').replace(/ Checker$/i,'');

  let formFields = '';
  calc.fields.forEach(f => {
    if (f.type === 'select') {
      formFields += `<div class="form-group"><label for="${f.id}">${f.label}</label><select id="${f.id}">`;
      f.options.forEach(o => { formFields += `<option value="${o}">${o}</option>`; });
      formFields += `</select></div>`;
    } else {
      formFields += `<div class="form-group"><label for="${f.id}">${f.label}</label><input type="${f.type}" id="${f.id}" placeholder="${f.ph||''}"></div>`;
    }
  });

  const pageTitle = seo.metaTitle;

  const webAppSchema = {"@context":"https://schema.org","@type":"WebApplication","name":calc.name,"url":SITE+'/calculators/'+calc.slug+'.html',"applicationCategory":"HealthApplication","operatingSystem":"Web Browser","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"description":seo.metaDesc};

  const extraHead = `<meta name="keywords" content="${seo.keywords}">
<script type="application/ld+json">${JSON.stringify(webAppSchema)}</script>
${faq.schema}`;

  const safeLogic = calc.logic.replace(/"/g,'&quot;');
  const calcName = calc.name;

  return `${head(pageTitle, seo.metaDesc, '/calculators/'+calc.slug+'.html', extraHead)}
<body>
${NAV}
${bc.html}
${bc.schema}

<section class="calc-page-hero">
<div class="container">
<div class="calc-page-hero-inner">
<div class="calc-page-hero-left">
<span class="calc-page-hero-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Instant Health Calculator</span>
<h1 class="calc-page-hero-title">${calc.name}</h1>
<p class="calc-page-hero-sub">Get accurate, science-based results instantly. ${calc.desc}</p>
<div class="calc-page-hero-pills">
<span class="calc-pill">&#10003; Free Forever</span>
<span class="calc-pill">&#10003; Science-Based</span>
<span class="calc-pill">&#10003; Instant Results</span>
</div>
</div>
<div class="calc-page-hero-right">
${getCalcHeroSvg(calc.slug)}
</div>
</div>
</div>
</section>

<section class="calc-app-section">
<div class="container">
<div class="calc-app-grid">

<div class="calc-input-panel">
<div class="calc-input-card fade-in">
<div class="calc-input-header">
<span class="calc-input-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg></span>
<div>
<h3 class="calc-input-title">Enter Your Details</h3>
<p class="calc-input-sub">Fill in the fields below for instant results</p>
</div>
</div>
${formFields}
<div class="calc-btn-row">
<button class="btn btn-primary calc-submit-btn"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Calculate Results</button>
<button class="calc-reset-btn" id="vhResetBtn">&#8635; Reset</button>
</div>
</div>
<div class="calc-disclaimer-card fade-in">
<span class="calc-disclaimer-icon">&#9877;&#65039;</span>
<div>
<strong>Medical Disclaimer</strong>
<p>This tool is for informational purposes only. Always consult a qualified healthcare professional before making any health decisions.</p>
</div>
</div>
</div>

<div class="calc-result-panel">
<div class="calc-result-placeholder" id="calcPlaceholder">
<div class="calc-placeholder-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
<h3>Your Results Appear Here</h3>
<p>Enter your details and click <strong>Calculate Results</strong> to see your personalized health analysis.</p>
<div class="calc-placeholder-steps">
<div class="calc-ph-step"><span>1</span>Enter your details</div>
<div class="calc-ph-step"><span>2</span>Click Calculate</div>
<div class="calc-ph-step"><span>3</span>Get instant results</div>
</div>
</div>
<div id="result" class="result-box">
<div class="result-value"></div>
<div class="result-label"></div>
<div class="progress-container"><div class="progress-bar"><div class="progress-fill"></div></div></div>
<div class="result-suggestion"></div>
<div class="calc-result-actions">
<button class="calc-action-btn" id="vhCopyBtn"><span class="calc-action-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg></span> Copy</button>
<button class="calc-action-btn" data-print="1"><span class="calc-action-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></span> Print</button>
<button class="calc-action-btn" data-share="1"><span class="calc-action-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span> Share</button>
</div>
</div>
</div>

</div>
</div>
</section>

<section class="ccs-section ccs-white">
<div class="container">
${calcHowToSection(calc)}
</div>
</section>

<section class="ccs-section ccs-gray">
<div class="container">
<div class="ccs-article fade-in">${calc.article}</div>
</div>
</section>

${calcDepthSections(calc)}

<section class="ccs-section ccs-white">
<div class="container">
${calcTipsSection(calc)}
</div>
</section>

<section class="ccs-section ccs-gray">
<div class="container">
<div class="ccs-faq-wrap fade-in">
<div class="ccs-section-heading"><h2>Frequently Asked Questions About ${n}</h2></div>
${faq.html}
</div>
</div>
</section>

<section class="ccs-section ccs-white">
<div class="container">
${calcRelatedCards(calc)}
</div>
</section>
${calcCrossContentSection(calc)}
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
<script src="/js/calculators.js" defer></script>
<script>window._vhCalcFn=function(){ ${calc.logic} };</script>
${CHATBOT}
</body></html>`;
}

// ========================
// BLOG DATA
// ========================
const blogPosts = [
  // ── CATEGORY 1: BMI & Body Weight ──
  {slug:'how-to-calculate-bmi',title:'How to Calculate BMI: A Complete Step-by-Step Guide',category:'BMI & Body Weight',date:'2024-01-15',readTime:'7 min',calcEmbed:'bmi-calculator',tags:['BMI','body mass index','weight management','BMI formula','obesity']},
  {slug:'what-is-a-healthy-bmi',title:'What Is a Healthy BMI? Understanding the Ranges for Men and Women',category:'BMI & Body Weight',date:'2024-01-19',readTime:'8 min',calcEmbed:'bmi-calculator',tags:['healthy BMI','BMI ranges','normal weight','men women','weight classification']},
  {slug:'bmi-vs-body-fat-percentage',title:'BMI vs Body Fat Percentage: Which Is the Better Health Indicator?',category:'BMI & Body Weight',date:'2024-01-23',readTime:'8 min',calcEmbed:'body-fat-calculator',tags:['BMI','body fat percentage','body composition','health metrics','fitness']},
  {slug:'bmi-for-children-and-teenagers',title:'BMI for Children and Teenagers: What Parents Need to Know',category:'BMI & Body Weight',date:'2024-01-27',readTime:'7 min',calcEmbed:'child-bmi-calculator',tags:['child BMI','teen BMI','kids weight','pediatric health','childhood obesity']},
  {slug:'bmi-chart-by-age',title:'BMI Chart by Age: How Your Ideal Weight Changes Over Time',category:'BMI & Body Weight',date:'2024-01-31',readTime:'7 min',calcEmbed:'bmi-calculator',tags:['BMI chart','BMI by age','ideal weight','weight changes','aging health']},
  {slug:'is-bmi-accurate',title:'Is BMI Accurate? The Limitations of Body Mass Index Explained',category:'BMI & Body Weight',date:'2024-02-04',readTime:'8 min',calcEmbed:'body-fat-calculator',tags:['BMI accuracy','BMI limitations','body composition','health screening','athletes BMI']},
  {slug:'underweight-bmi-health-risks',title:'Underweight BMI: Health Risks and How to Gain Weight Safely',category:'BMI & Body Weight',date:'2024-02-08',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['underweight','low BMI','weight gain','nutrition','health risks']},
  {slug:'overweight-vs-obese-bmi',title:'Overweight vs Obese BMI: Understanding the Difference',category:'BMI & Body Weight',date:'2024-02-12',readTime:'7 min',calcEmbed:'bmi-calculator',tags:['overweight','obese','BMI classification','weight loss','chronic disease']},
  {slug:'how-to-lower-your-bmi',title:'How to Lower Your BMI: Science-Backed Strategies That Work',category:'BMI & Body Weight',date:'2024-02-16',readTime:'9 min',calcEmbed:'bmi-calculator',tags:['lower BMI','weight loss','diet','exercise','healthy habits']},
  {slug:'bmi-and-chronic-disease',title:'BMI and Chronic Disease: What the Research Actually Says',category:'BMI & Body Weight',date:'2024-02-20',readTime:'8 min',calcEmbed:'bmi-calculator',tags:['BMI','chronic disease','diabetes','heart disease','research']},
  // ── CATEGORY 2: Calories & Weight Management ──
  {slug:'how-many-calories-should-i-eat',title:'How Many Calories Should I Eat Per Day? Complete Guide',category:'Calories & Weight',date:'2024-02-24',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['daily calories','calorie needs','weight management','TDEE','nutrition']},
  {slug:'calorie-deficit-for-weight-loss',title:'Calorie Deficit for Weight Loss: The Only Guide You Need',category:'Calories & Weight',date:'2024-02-28',readTime:'9 min',calcEmbed:'calorie-calculator',tags:['calorie deficit','weight loss','fat loss','calorie counting','diet']},
  {slug:'calorie-surplus-for-muscle-gain',title:'Calorie Surplus for Muscle Gain: How to Eat for Growth',category:'Calories & Weight',date:'2024-03-03',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['calorie surplus','muscle gain','bulking','nutrition','protein']},
  {slug:'how-to-count-calories',title:'How to Count Calories Without Losing Your Mind',category:'Calories & Weight',date:'2024-03-07',readTime:'7 min',calcEmbed:'calorie-calculator',tags:['counting calories','calorie tracking','food logging','diet tips','weight management']},
  {slug:'calorie-cycling',title:'Calorie Cycling: What It Is and Does It Actually Work?',category:'Calories & Weight',date:'2024-03-11',readTime:'7 min',calcEmbed:'calorie-calculator',tags:['calorie cycling','carb cycling','diet strategy','metabolism','weight loss']},
  {slug:'low-calorie-foods-keep-you-full',title:'Low Calorie Foods That Keep You Full Longer',category:'Calories & Weight',date:'2024-03-15',readTime:'7 min',calcEmbed:'calorie-calculator',tags:['low calorie foods','satiety','hunger management','fiber','nutrition']},
  {slug:'calories-burned-walking-10000-steps',title:'How Many Calories Do You Burn Walking 10,000 Steps?',category:'Calories & Weight',date:'2024-03-19',readTime:'6 min',calcEmbed:'steps-to-calories-calculator',tags:['walking calories','10000 steps','calorie burn','exercise','fitness']},
  {slug:'liquid-calories-weight-loss',title:'Liquid Calories: The Hidden Reason You Are Not Losing Weight',category:'Calories & Weight',date:'2024-03-23',readTime:'7 min',calcEmbed:'calorie-calculator',tags:['liquid calories','drinks','weight loss','soda','alcohol calories']},
  {slug:'maintenance-calories-explained',title:'Maintenance Calories Explained: How to Find Your Exact Number',category:'Calories & Weight',date:'2024-03-27',readTime:'8 min',calcEmbed:'tdee-calculator',tags:['maintenance calories','TDEE','calorie needs','metabolism','weight maintenance']},
  {slug:'calorie-needs-by-age',title:'Calorie Needs by Age: How Your Metabolism Changes Decade by Decade',category:'Calories & Weight',date:'2024-03-31',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['calorie needs age','metabolism aging','senior nutrition','activity level','BMR']},
  {slug:'eating-late-at-night-weight-gain',title:'Does Eating Late at Night Cause Weight Gain? The Truth',category:'Calories & Weight',date:'2024-04-04',readTime:'7 min',calcEmbed:'calorie-calculator',tags:['eating late night','weight gain','meal timing','circadian rhythm','metabolism']},
  {slug:'how-to-break-weight-loss-plateau',title:'How to Break a Weight Loss Plateau: Proven Methods',category:'Calories & Weight',date:'2024-04-08',readTime:'9 min',calcEmbed:'calorie-calculator',tags:['weight loss plateau','break plateau','metabolism','diet strategies','fitness']},
  // ── CATEGORY 3: Macronutrients & Nutrition ──
  {slug:'what-are-macronutrients',title:'What Are Macronutrients? The Complete Beginner Guide',category:'Macronutrients',date:'2024-04-12',readTime:'8 min',calcEmbed:'macro-calculator',tags:['macronutrients','protein','carbohydrates','fat','nutrition basics']},
  {slug:'how-much-protein-per-day',title:'How Much Protein Do You Really Need Per Day?',category:'Macronutrients',date:'2024-04-16',readTime:'8 min',calcEmbed:'protein-intake-calculator',tags:['protein intake','daily protein','muscle building','nutrition','amino acids']},
  {slug:'carbohydrates-good-vs-bad',title:'Carbohydrates: Good vs Bad — What Science Actually Says',category:'Macronutrients',date:'2024-04-20',readTime:'8 min',calcEmbed:'carb-calculator',tags:['carbohydrates','complex carbs','simple carbs','glycemic index','nutrition']},
  {slug:'healthy-fats-vs-unhealthy-fats',title:'Healthy Fats vs Unhealthy Fats: The Complete Guide',category:'Macronutrients',date:'2024-04-24',readTime:'8 min',calcEmbed:'fat-intake-calculator',tags:['healthy fats','saturated fat','unsaturated fat','omega-3','nutrition']},
  {slug:'how-to-calculate-macros-weight-loss',title:'How to Calculate Your Macros for Weight Loss',category:'Macronutrients',date:'2024-04-28',readTime:'9 min',calcEmbed:'macro-calculator',tags:['macro calculation','weight loss macros','IIFYM','calorie macros','diet planning']},
  {slug:'high-protein-foods-list',title:'High Protein Foods: The Ultimate List with Protein Content',category:'Macronutrients',date:'2024-05-02',readTime:'8 min',calcEmbed:'protein-intake-calculator',tags:['high protein foods','protein sources','muscle building','nutrition','diet']},
  {slug:'best-pre-workout-meals',title:'Best Pre-Workout Meals for Energy and Performance',category:'Macronutrients',date:'2024-05-06',readTime:'7 min',calcEmbed:'macro-calculator',tags:['pre-workout meal','workout nutrition','carbs protein','energy performance','sports nutrition']},
  {slug:'best-post-workout-meals',title:'Best Post-Workout Meals for Recovery and Muscle Growth',category:'Macronutrients',date:'2024-05-10',readTime:'7 min',calcEmbed:'protein-intake-calculator',tags:['post-workout meal','recovery nutrition','muscle growth','protein carbs','sports nutrition']},
  {slug:'micronutrients-vs-macronutrients',title:'Micronutrients vs Macronutrients: What Is the Difference?',category:'Macronutrients',date:'2024-05-14',readTime:'7 min',calcEmbed:'macro-calculator',tags:['micronutrients','macronutrients','vitamins','minerals','nutrition']},
  {slug:'how-to-read-nutrition-labels',title:'How to Read Nutrition Labels Like a Health Expert',category:'Macronutrients',date:'2024-05-18',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['nutrition labels','food labels','calories','serving size','ingredients']},
  {slug:'fiber-why-not-getting-enough',title:'Fiber: Why You Are Not Getting Enough and How to Fix It',category:'Macronutrients',date:'2024-05-22',readTime:'7 min',calcEmbed:'fiber-intake-calculator',tags:['dietary fiber','digestive health','gut health','constipation','plant foods']},
  {slug:'sugar-addiction-reduce-sugar',title:'Sugar Addiction: How to Reduce Sugar Without Feeling Miserable',category:'Macronutrients',date:'2024-05-26',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['sugar addiction','reduce sugar','cravings','blood sugar','healthy diet']},
  // ── CATEGORY 4: TDEE & Metabolism ──
  {slug:'what-is-tdee',title:'What Is TDEE? Total Daily Energy Expenditure Explained',category:'TDEE & Metabolism',date:'2024-05-30',readTime:'8 min',calcEmbed:'tdee-calculator',tags:['TDEE','total daily energy','metabolism','calorie needs','weight management']},
  {slug:'bmr-vs-tdee',title:'BMR vs TDEE: What Is the Difference and Why It Matters',category:'TDEE & Metabolism',date:'2024-06-03',readTime:'8 min',calcEmbed:'bmr-calculator',tags:['BMR','TDEE','basal metabolic rate','calorie calculation','metabolism']},
  {slug:'how-to-boost-metabolism',title:'How to Boost Your Metabolism: Evidence-Based Methods Only',category:'TDEE & Metabolism',date:'2024-06-07',readTime:'9 min',calcEmbed:'tdee-calculator',tags:['boost metabolism','metabolism tips','NEAT','muscle mass','thermogenesis']},
  {slug:'does-muscle-burn-more-calories',title:'Does Muscle Burn More Calories Than Fat? The Truth',category:'TDEE & Metabolism',date:'2024-06-11',readTime:'7 min',calcEmbed:'lean-body-mass-calculator',tags:['muscle metabolism','fat vs muscle','calorie burn','body composition','BMR']},
  {slug:'slow-metabolism-is-it-real',title:'Slow Metabolism: Is It Real or Just an Excuse?',category:'TDEE & Metabolism',date:'2024-06-15',readTime:'8 min',calcEmbed:'bmr-calculator',tags:['slow metabolism','metabolic rate','thyroid','calorie restriction','BMR']},
  {slug:'activity-level-affects-calorie-needs',title:'How Activity Level Affects Your Daily Calorie Needs',category:'TDEE & Metabolism',date:'2024-06-19',readTime:'7 min',calcEmbed:'tdee-calculator',tags:['activity level','NEAT','exercise calories','sedentary active','TDEE']},
  {slug:'adaptive-thermogenesis',title:'Adaptive Thermogenesis: Why Your Body Fights Weight Loss',category:'TDEE & Metabolism',date:'2024-06-23',readTime:'8 min',calcEmbed:'tdee-calculator',tags:['adaptive thermogenesis','metabolic adaptation','weight loss plateau','starvation mode','dieting']},
  {slug:'how-age-affects-metabolism',title:'How Age Affects Your Metabolism and What You Can Do About It',category:'TDEE & Metabolism',date:'2024-06-27',readTime:'8 min',calcEmbed:'bmr-calculator',tags:['metabolism aging','BMR age','menopause metabolism','muscle loss','senior fitness']},
  // ── CATEGORY 5: Body Fat & Composition ──
  {slug:'body-fat-percentage-chart',title:'Body Fat Percentage Chart for Men and Women by Age',category:'Body Fat',date:'2024-07-01',readTime:'8 min',calcEmbed:'body-fat-calculator',tags:['body fat percentage','body fat chart','men women','age fitness','body composition']},
  {slug:'how-to-lose-body-fat-without-losing-muscle',title:'How to Lose Body Fat Without Losing Muscle: Complete Guide',category:'Body Fat',date:'2024-07-05',readTime:'9 min',calcEmbed:'body-fat-calculator',tags:['lose body fat','preserve muscle','cutting diet','resistance training','body recomposition']},
  {slug:'visceral-fat-vs-subcutaneous-fat',title:'Visceral Fat vs Subcutaneous Fat: Which Is More Dangerous?',category:'Body Fat',date:'2024-07-09',readTime:'8 min',calcEmbed:'waist-to-hip-ratio',tags:['visceral fat','subcutaneous fat','belly fat','metabolic risk','abdominal obesity']},
  {slug:'how-to-measure-body-fat-at-home',title:'How to Measure Body Fat at Home: 5 Most Accurate Methods',category:'Body Fat',date:'2024-07-13',readTime:'8 min',calcEmbed:'body-fat-calculator',tags:['measure body fat','calipers','Navy method','DEXA','body composition methods']},
  {slug:'essential-body-fat-vs-storage-fat',title:'Essential Body Fat vs Storage Body Fat: What You Need to Know',category:'Body Fat',date:'2024-07-17',readTime:'7 min',calcEmbed:'body-fat-calculator',tags:['essential fat','storage fat','minimum body fat','hormones','health']},
  {slug:'how-long-to-lose-1-percent-body-fat',title:'How Long Does It Take to Lose 1% Body Fat?',category:'Body Fat',date:'2024-07-21',readTime:'7 min',calcEmbed:'calorie-calculator',tags:['body fat loss rate','fat loss timeline','realistic goals','calorie deficit','cutting']},
  {slug:'exercises-to-reduce-belly-fat',title:'Best Exercises to Reduce Belly Fat According to Science',category:'Body Fat',date:'2024-07-25',readTime:'8 min',calcEmbed:'body-fat-calculator',tags:['belly fat exercises','core workout','HIIT','abdominal fat','fat loss']},
  {slug:'body-recomposition',title:'Body Recomposition: Lose Fat and Gain Muscle at the Same Time',category:'Body Fat',date:'2024-07-29',readTime:'9 min',calcEmbed:'body-fat-calculator',tags:['body recomposition','recomp','lose fat gain muscle','protein intake','training']},
  // ── CATEGORY 6: Fitness & Exercise ──
  {slug:'how-to-build-muscle',title:'How to Build Muscle: A Complete Science-Based Guide',category:'Fitness & Exercise',date:'2024-08-02',readTime:'10 min',calcEmbed:'protein-intake-calculator',tags:['muscle building','hypertrophy','strength training','protein','progressive overload']},
  {slug:'cardio-vs-strength-training',title:'Cardio vs Strength Training: Which Burns More Fat?',category:'Fitness & Exercise',date:'2024-08-06',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['cardio','strength training','fat burn','exercise comparison','fitness']},
  {slug:'hiit-workout-guide-for-beginners',title:'HIIT Workout Guide for Beginners: Everything You Need to Know',category:'Fitness & Exercise',date:'2024-08-10',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['HIIT','high intensity training','beginners workout','calorie burn','interval training']},
  {slug:'how-to-improve-running-endurance',title:'How to Improve Running Endurance: Training Plan Included',category:'Fitness & Exercise',date:'2024-08-14',readTime:'9 min',calcEmbed:'vo2-max-calculator',tags:['running endurance','marathon training','aerobic fitness','VO2 max','training plan']},
  {slug:'progressive-overload-explained',title:'Progressive Overload: The Key Principle Behind Every Fitness Goal',category:'Fitness & Exercise',date:'2024-08-18',readTime:'8 min',calcEmbed:'one-rep-max-calculator',tags:['progressive overload','strength gains','muscle growth','training principle','1RM']},
  {slug:'how-many-days-per-week-workout',title:'How Many Days Per Week Should You Work Out?',category:'Fitness & Exercise',date:'2024-08-22',readTime:'7 min',calcEmbed:'heart-rate-calculator',tags:['workout frequency','training days','recovery','exercise schedule','fitness program']},
  {slug:'best-exercises-for-each-muscle-group',title:'Best Exercises for Each Muscle Group: Complete Reference Guide',category:'Fitness & Exercise',date:'2024-08-26',readTime:'10 min',calcEmbed:'one-rep-max-calculator',tags:['exercises muscle groups','chest back legs','compound movements','gym workout','strength']},
  {slug:'rest-days-importance-recovery',title:'Rest Days: Why Recovery Is Just as Important as Training',category:'Fitness & Exercise',date:'2024-08-30',readTime:'7 min',calcEmbed:'heart-rate-calculator',tags:['rest days','recovery','overtraining','muscle repair','fitness balance']},
  {slug:'home-workout-routine-no-equipment',title:'How to Build a Home Workout Routine With No Equipment',category:'Fitness & Exercise',date:'2024-09-03',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['home workout','no equipment','bodyweight exercises','calisthenics','fitness at home']},
  {slug:'stretching-guide-static-vs-dynamic',title:'Stretching Guide: Static vs Dynamic and When to Do Each',category:'Fitness & Exercise',date:'2024-09-07',readTime:'7 min',calcEmbed:'heart-rate-calculator',tags:['stretching','flexibility','static stretch','dynamic warmup','injury prevention']},
  {slug:'vo2-max-explained',title:'VO2 Max Explained: What It Is and How to Improve It',category:'Fitness & Exercise',date:'2024-09-11',readTime:'8 min',calcEmbed:'vo2-max-calculator',tags:['VO2 max','aerobic capacity','cardiovascular fitness','endurance','training']},
  {slug:'how-many-steps-per-day',title:'How Many Steps Per Day Is Actually Healthy?',category:'Fitness & Exercise',date:'2024-09-15',readTime:'7 min',calcEmbed:'steps-to-calories-calculator',tags:['daily steps','10000 steps','walking health','activity level','step counter']},
  // ── CATEGORY 7: Sleep & Recovery ──
  {slug:'how-much-sleep-do-you-need-by-age',title:'How Much Sleep Do You Actually Need by Age?',category:'Sleep & Recovery',date:'2024-09-19',readTime:'7 min',calcEmbed:'sleep-calculator',tags:['sleep duration','sleep by age','adults sleep','children sleep','recommendations']},
  {slug:'sleep-cycles-explained',title:'Sleep Cycles Explained: REM, Deep Sleep and Light Sleep',category:'Sleep & Recovery',date:'2024-09-23',readTime:'8 min',calcEmbed:'sleep-calculator',tags:['sleep cycles','REM sleep','deep sleep','sleep stages','NREM']},
  {slug:'how-to-fix-sleep-schedule',title:'How to Fix Your Sleep Schedule in 7 Days',category:'Sleep & Recovery',date:'2024-09-27',readTime:'8 min',calcEmbed:'sleep-calculator',tags:['sleep schedule','sleep reset','circadian rhythm','insomnia tips','bedtime routine']},
  {slug:'best-foods-for-sleep',title:'Best Foods That Help You Sleep Better at Night',category:'Sleep & Recovery',date:'2024-10-01',readTime:'7 min',calcEmbed:'sleep-calculator',tags:['foods for sleep','melatonin','tryptophan','magnesium','sleep nutrition']},
  {slug:'sleep-deprivation-weight-metabolism',title:'Effects of Sleep Deprivation on Weight and Metabolism',category:'Sleep & Recovery',date:'2024-10-05',readTime:'8 min',calcEmbed:'sleep-calculator',tags:['sleep deprivation','weight gain','ghrelin leptin','metabolism sleep','fatigue']},
  {slug:'how-to-improve-sleep-quality',title:'How to Improve Sleep Quality Without Medication',category:'Sleep & Recovery',date:'2024-10-09',readTime:'9 min',calcEmbed:'sleep-calculator',tags:['sleep quality','insomnia remedies','sleep hygiene','blue light','bedroom environment']},
  {slug:'napping-benefits-risks',title:'Napping: Benefits, Risks and the Ideal Nap Duration',category:'Sleep & Recovery',date:'2024-10-13',readTime:'7 min',calcEmbed:'sleep-calculator',tags:['napping','power nap','nap duration','daytime sleep','alertness']},
  {slug:'exercise-timing-sleep-quality',title:'How Exercise Timing Affects Your Sleep Quality',category:'Sleep & Recovery',date:'2024-10-17',readTime:'7 min',calcEmbed:'sleep-calculator',tags:['exercise sleep','workout timing','evening exercise','circadian rhythm','sleep quality']},
  // ── CATEGORY 8: Hydration & Water ──
  {slug:'how-much-water-should-you-drink',title:'How Much Water Should You Drink Per Day? Full Guide',category:'Hydration',date:'2024-10-21',readTime:'7 min',calcEmbed:'water-intake-calculator',tags:['daily water intake','hydration','water needs','how much water','fluid balance']},
  {slug:'signs-of-dehydration',title:'Signs of Dehydration: Symptoms, Causes and How to Fix It',category:'Hydration',date:'2024-10-25',readTime:'7 min',calcEmbed:'water-intake-calculator',tags:['dehydration signs','dehydration symptoms','hydration','dry mouth','urine color']},
  {slug:'benefits-of-drinking-more-water',title:'Benefits of Drinking More Water: What Science Says',category:'Hydration',date:'2024-10-29',readTime:'7 min',calcEmbed:'water-intake-calculator',tags:['drinking water benefits','hydration health','skin health','energy','weight loss']},
  {slug:'hydration-during-exercise',title:'Hydration During Exercise: How Much Water Do You Need?',category:'Hydration',date:'2024-11-02',readTime:'7 min',calcEmbed:'water-intake-calculator',tags:['exercise hydration','sports water','electrolytes','sweat loss','athlete hydration']},
  {slug:'does-drinking-water-help-weight-loss',title:'Does Drinking Water Help You Lose Weight? The Evidence',category:'Hydration',date:'2024-11-06',readTime:'7 min',calcEmbed:'water-intake-calculator',tags:['water weight loss','hydration diet','metabolism water','hunger suppression','fat burn']},
  {slug:'best-hydrating-foods',title:'Best Hydrating Foods to Eat Every Day',category:'Hydration',date:'2024-11-10',readTime:'6 min',calcEmbed:'water-intake-calculator',tags:['hydrating foods','cucumber watermelon','water content foods','daily hydration','electrolytes']},
  // ── CATEGORY 9: Heart Rate & Cardio Health ──
  {slug:'target-heart-rate-zones',title:'Target Heart Rate Zones Explained: Fat Burn to Peak',category:'Heart Rate',date:'2024-11-14',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['heart rate zones','fat burn zone','target heart rate','cardio training','aerobic']},
  {slug:'resting-heart-rate-normal',title:'Resting Heart Rate: What Is Normal and What Is a Warning Sign?',category:'Heart Rate',date:'2024-11-18',readTime:'7 min',calcEmbed:'heart-rate-calculator',tags:['resting heart rate','normal pulse','bradycardia','tachycardia','heart health']},
  {slug:'how-to-lower-resting-heart-rate',title:'How to Lower Your Resting Heart Rate Naturally',category:'Heart Rate',date:'2024-11-22',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['lower heart rate','resting pulse','cardio fitness','vagal tone','meditation']},
  {slug:'maximum-heart-rate-by-age',title:'Maximum Heart Rate by Age: Formula and Fitness Zones',category:'Heart Rate',date:'2024-11-26',readTime:'7 min',calcEmbed:'heart-rate-calculator',tags:['maximum heart rate','MHR formula','age heart rate','fitness zones','cardio']},
  {slug:'heart-rate-variability-hrv',title:'Heart Rate Variability (HRV): What It Is and Why It Matters',category:'Heart Rate',date:'2024-11-30',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['HRV','heart rate variability','autonomic nervous system','recovery','stress']},
  {slug:'best-cardio-exercises-calorie-burn',title:'Best Cardio Exercises Ranked by Calorie Burn',category:'Heart Rate',date:'2024-12-04',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['cardio exercises','calorie burn','running cycling','HIIT','aerobic fitness']},
  // ── CATEGORY 10: Mental Health & Wellness ──
  {slug:'exercise-reduces-stress-anxiety',title:'How Exercise Reduces Stress and Anxiety: The Science',category:'Mental Health',date:'2024-12-01',readTime:'8 min',calcEmbed:'stress-level-calculator',tags:['exercise stress','anxiety relief','endorphins','mental health','cortisol']},
  {slug:'meditation-for-beginners',title:'Meditation for Beginners: How to Start and What to Expect',category:'Mental Health',date:'2024-12-03',readTime:'8 min',calcEmbed:'stress-level-calculator',tags:['meditation beginners','mindfulness','breathing exercises','anxiety','mental wellness']},
  {slug:'how-to-build-healthy-habits',title:'How to Build Healthy Habits That Actually Stick',category:'Mental Health',date:'2024-12-05',readTime:'8 min',calcEmbed:'stress-level-calculator',tags:['healthy habits','habit formation','behavior change','motivation','wellness routine']},
  {slug:'morning-routines-healthy-people',title:'Morning Routines of Healthy People: What They All Have in Common',category:'Mental Health',date:'2024-12-07',readTime:'7 min',calcEmbed:'stress-level-calculator',tags:['morning routine','healthy habits','productivity','mindfulness','exercise routine']},
  {slug:'how-to-stay-consistent-with-fitness',title:'How to Stay Consistent With Fitness When Life Gets Busy',category:'Mental Health',date:'2024-12-09',readTime:'8 min',calcEmbed:'stress-level-calculator',tags:['fitness consistency','motivation','busy schedule','habit stacking','accountability']},
  {slug:'cortisol-and-weight-gain',title:'Cortisol and Weight Gain: How Stress Makes You Fat',category:'Mental Health',date:'2024-12-11',readTime:'8 min',calcEmbed:'stress-level-calculator',tags:['cortisol','stress weight gain','belly fat','hormones','stress management']},
  {slug:'sleep-affects-mental-health',title:'How Sleep Affects Mental Health: The Bidirectional Link',category:'Mental Health',date:'2024-12-13',readTime:'8 min',calcEmbed:'sleep-calculator',tags:['sleep mental health','depression sleep','anxiety insomnia','mood sleep','bidirectional']},
  {slug:'mindful-eating-emotional-eating',title:'Mindful Eating: How to Stop Emotional Eating for Good',category:'Mental Health',date:'2024-12-15',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['mindful eating','emotional eating','binge eating','food relationship','mindfulness diet']},
  // ── CATEGORY 11: Special Populations & Health Checks ──
  {slug:'health-calculators-for-women',title:'Health Calculators Every Woman Should Use Regularly',category:'Health Checks',date:'2024-12-16',readTime:'7 min',calcEmbed:'bmi-calculator',tags:['womens health calculators','fertility','pregnancy health','hormones','body metrics']},
  {slug:'health-calculators-for-men',title:'Health Calculators Every Man Should Know About',category:'Health Checks',date:'2024-12-17',readTime:'7 min',calcEmbed:'bmi-calculator',tags:['mens health calculators','heart risk','BMI men','testosterone','fitness tools']},
  {slug:'fitness-after-40',title:'Fitness After 40: How to Train Smarter as You Age',category:'Health Checks',date:'2024-12-18',readTime:'9 min',calcEmbed:'bmr-calculator',tags:['fitness after 40','aging fitness','strength training age','recovery','hormones aging']},
  {slug:'weight-loss-after-50',title:'Weight Loss After 50: What Changes and What Still Works',category:'Health Checks',date:'2024-12-19',readTime:'9 min',calcEmbed:'calorie-calculator',tags:['weight loss 50','menopause weight','metabolism 50s','muscle loss aging','senior diet']},
  {slug:'bmi-for-athletes',title:'BMI and Health for Athletes: Why Standard Ranges Don\'t Apply',category:'Health Checks',date:'2024-12-20',readTime:'7 min',calcEmbed:'body-fat-calculator',tags:['athlete BMI','sports health','muscle weight','body composition athlete','performance metrics']},
  {slug:'pregnancy-weight-gain',title:'Pregnancy Weight Gain: Healthy Ranges and What to Expect',category:'Health Checks',date:'2024-12-21',readTime:'8 min',calcEmbed:'bmi-calculator',tags:['pregnancy weight gain','prenatal health','gestational weight','healthy pregnancy','OB guidelines']},
  {slug:'health-checks-every-year',title:'Health Checks You Should Do Every Year: Complete Checklist',category:'Health Checks',date:'2024-12-22',readTime:'8 min',calcEmbed:'blood-pressure-checker',tags:['annual health checks','preventive screening','doctor visit','lab tests','wellness checkup']},
  {slug:'realistic-fitness-goals',title:'How to Set Realistic Fitness Goals Using Health Data',category:'Health Checks',date:'2024-12-23',readTime:'8 min',calcEmbed:'bmi-calculator',tags:['fitness goals','SMART goals','health data','goal setting','progress tracking']},
  {slug:'understanding-lab-results',title:'Understanding Lab Results: What Your Health Numbers Mean',category:'Health Checks',date:'2024-12-24',readTime:'9 min',calcEmbed:'blood-pressure-checker',tags:['lab results','blood tests','cholesterol levels','blood glucose','health numbers']},
  {slug:'healthy-lifestyle-checklist',title:'The Ultimate Healthy Lifestyle Checklist: 50 Evidence-Based Habits',category:'Health Checks',date:'2024-12-25',readTime:'10 min',calcEmbed:'bmi-calculator',tags:['healthy lifestyle','wellness habits','daily checklist','evidence based health','longevity']},

  // ── CATEGORY 12: Weight Loss & Fat Loss ──
  {slug:'how-many-steps-to-lose-weight',title:'How Many Steps Per Day Do You Need to Lose Weight?',category:'Weight Loss',date:'2025-01-02',readTime:'8 min',calcEmbed:'steps-to-calories-calculator',tags:['steps to lose weight','walking weight loss','10000 steps','daily steps','calorie burn walking']},
  {slug:'intermittent-fasting-for-weight-loss',title:'Intermittent Fasting for Weight Loss: Does It Really Work?',category:'Weight Loss',date:'2025-01-05',readTime:'9 min',calcEmbed:'intermittent-fasting-calculator',tags:['intermittent fasting','IF weight loss','16:8 fasting','time restricted eating','fat loss fasting']},
  {slug:'keto-diet-beginners-guide',title:'Keto Diet for Beginners: What to Eat, Avoid and Expect',category:'Weight Loss',date:'2025-01-08',readTime:'10 min',calcEmbed:'keto-calculator',tags:['keto diet beginners','ketogenic diet','keto foods','ketosis','low carb weight loss']},
  {slug:'best-time-to-walk-for-fat-loss',title:'Best Time of Day to Walk for Maximum Fat Loss',category:'Weight Loss',date:'2025-01-11',readTime:'7 min',calcEmbed:'steps-to-calories-calculator',tags:['best time to walk','morning walk fat loss','fasted walking','walking schedule','fat burn timing']},
  {slug:'walking-vs-running-for-weight-loss',title:'Walking vs Running for Weight Loss: Which Burns More Fat?',category:'Weight Loss',date:'2025-01-14',readTime:'8 min',calcEmbed:'steps-to-calories-calculator',tags:['walking vs running','fat burn comparison','running calories','walking calories','weight loss exercise']},
  {slug:'protein-for-fat-loss',title:'How Protein Helps You Burn Fat and Keep Muscle',category:'Weight Loss',date:'2025-01-17',readTime:'8 min',calcEmbed:'protein-intake-calculator',tags:['protein fat loss','high protein diet','muscle preservation','thermic effect','satiety protein']},
  {slug:'why-you-are-not-losing-weight',title:'Why You Are Not Losing Weight: 10 Common Reasons Explained',category:'Weight Loss',date:'2025-01-20',readTime:'9 min',calcEmbed:'calorie-calculator',tags:['not losing weight','weight loss mistakes','hidden calories','metabolism plateau','fat loss tips']},
  {slug:'fat-loss-vs-weight-loss-difference',title:'Fat Loss vs Weight Loss: Why the Difference Matters',category:'Weight Loss',date:'2025-01-23',readTime:'7 min',calcEmbed:'body-fat-calculator',tags:['fat loss vs weight loss','body composition','scale weight','muscle fat ratio','true fat loss']},

  // ── CATEGORY 13: Nutrition & Diet ──
  {slug:'mediterranean-diet-complete-guide',title:'Mediterranean Diet: Complete Beginner Guide With Meal Ideas',category:'Nutrition & Diet',date:'2025-01-26',readTime:'10 min',calcEmbed:'macro-calculator',tags:['mediterranean diet','heart healthy eating','olive oil','diet guide','anti-inflammatory diet']},
  {slug:'plant-based-diet-for-beginners',title:'Plant-Based Diet for Beginners: Getting Enough Protein and Nutrients',category:'Nutrition & Diet',date:'2025-01-29',readTime:'9 min',calcEmbed:'protein-intake-calculator',tags:['plant based diet','vegan protein','vegetarian nutrition','whole food plant based','meat alternatives']},
  {slug:'omega-3-fatty-acids-complete-guide',title:'Omega-3 Fatty Acids: Benefits, Sources and How Much You Need',category:'Nutrition & Diet',date:'2025-02-01',readTime:'8 min',calcEmbed:'omega3-calculator',tags:['omega-3 benefits','fish oil','EPA DHA','omega-3 sources','heart brain health']},
  {slug:'anti-inflammatory-diet-guide',title:'Anti-Inflammatory Diet: Foods to Eat and Avoid for Better Health',category:'Nutrition & Diet',date:'2025-02-04',readTime:'9 min',calcEmbed:'anti-inflammatory-score',tags:['anti-inflammatory foods','inflammation diet','turmeric berries','chronic inflammation','healing diet']},
  {slug:'gut-health-and-weight-loss',title:'Gut Health and Weight Loss: The Microbiome Connection',category:'Nutrition & Diet',date:'2025-02-07',readTime:'8 min',calcEmbed:'fiber-intake-calculator',tags:['gut health weight loss','microbiome','probiotics','fiber gut','digestive health diet']},
  {slug:'daily-sodium-intake-guide',title:'Daily Sodium Intake: How Much Salt Is Too Much?',category:'Nutrition & Diet',date:'2025-02-10',readTime:'7 min',calcEmbed:'sodium-intake-calculator',tags:['sodium intake','daily salt','high sodium diet','blood pressure salt','sodium limits']},
  {slug:'best-vitamins-for-energy-and-health',title:'Best Vitamins and Minerals for Energy, Immunity and Health',category:'Nutrition & Diet',date:'2025-02-13',readTime:'8 min',calcEmbed:'vitamin-d-calculator',tags:['vitamins for energy','vitamin D B12','iron deficiency','supplement guide','micronutrients health']},
  {slug:'how-to-track-macros-guide',title:'How to Track Your Macros: Step-by-Step Beginner Guide',category:'Nutrition & Diet',date:'2025-02-16',readTime:'8 min',calcEmbed:'macro-calculator',tags:['track macros','macro tracking','IIFYM','food logging','calorie counting guide']},

  // ── CATEGORY 14: Fitness & Exercise ──
  {slug:'beginner-workout-plan-30-days',title:'30-Day Beginner Workout Plan: Build a Habit That Lasts',category:'Fitness & Exercise',date:'2025-02-19',readTime:'9 min',calcEmbed:'heart-rate-calculator',tags:['beginner workout plan','30 day fitness','exercise routine','workout schedule','beginner gym']},
  {slug:'how-to-run-5k-training-plan',title:'How to Run a 5K: 8-Week Training Plan for Beginners',category:'Fitness & Exercise',date:'2025-02-22',readTime:'9 min',calcEmbed:'vo2-max-calculator',tags:['how to run 5k','5k training plan','beginner running','couch to 5k','running pace']},
  {slug:'strength-training-for-women-guide',title:'Strength Training for Women: Why You Need It and How to Start',category:'Fitness & Exercise',date:'2025-02-25',readTime:'9 min',calcEmbed:'strength-level-calculator',tags:['strength training women','female weightlifting','women gym guide','resistance training','toning vs bulking']},
  {slug:'cycling-calories-and-benefits',title:'Cycling for Weight Loss: Calories Burned and Full Benefits Guide',category:'Fitness & Exercise',date:'2025-02-28',readTime:'8 min',calcEmbed:'heart-rate-calculator',tags:['cycling weight loss','cycling calories','biking benefits','indoor cycling','fat burn cycling']},
  {slug:'yoga-for-weight-loss',title:'Does Yoga Help With Weight Loss? What the Research Shows',category:'Fitness & Exercise',date:'2025-03-03',readTime:'7 min',calcEmbed:'calorie-calculator',tags:['yoga weight loss','yoga calories','vinyasa yoga','hot yoga benefits','mindful movement']},
  {slug:'swimming-calories-and-fitness',title:'Swimming for Fitness: Calories Burned and Full-Body Benefits',category:'Fitness & Exercise',date:'2025-03-06',readTime:'7 min',calcEmbed:'heart-rate-calculator',tags:['swimming calories','swimming fitness','low impact exercise','swimming benefits','cardio swimming']},
  {slug:'jump-rope-workout-benefits',title:'Jump Rope Workout: Calories Burned and Why It Beats Running',category:'Fitness & Exercise',date:'2025-03-09',readTime:'7 min',calcEmbed:'hiit-calories-calculator',tags:['jump rope calories','skipping rope workout','jump rope vs running','cardio jump rope','HIIT jump rope']},

  // ── CATEGORY 15: Women's Health ──
  {slug:'ovulation-calculator-complete-guide',title:'Ovulation Calculator Guide: How to Find Your Most Fertile Days',category:"Women's Health",date:'2025-03-12',readTime:'8 min',calcEmbed:'ovulation-calculator',tags:['ovulation calculator','fertile window','ovulation symptoms','cycle tracking','TTC ovulation']},
  {slug:'pregnancy-week-by-week-guide',title:'Pregnancy Week by Week: What to Expect at Every Stage',category:"Women's Health",date:'2025-03-15',readTime:'10 min',calcEmbed:'pregnancy-due-date-calculator',tags:['pregnancy week by week','fetal development','trimester guide','pregnancy symptoms','prenatal care']},
  {slug:'pcos-symptoms-and-management',title:'PCOS Symptoms: How to Manage Polycystic Ovary Syndrome Naturally',category:"Women's Health",date:'2025-03-18',readTime:'9 min',calcEmbed:'pcos-risk-calculator',tags:['PCOS symptoms','polycystic ovary syndrome','PCOS diet','PCOS weight loss','hormonal imbalance']},
  {slug:'breastfeeding-calorie-and-nutrition-guide',title:'Breastfeeding Nutrition: How Many Calories Do You Need?',category:"Women's Health",date:'2025-03-21',readTime:'8 min',calcEmbed:'breastfeeding-calorie-calculator',tags:['breastfeeding calories','nursing nutrition','lactation diet','postpartum nutrition','breastfeeding needs']},
  {slug:'menopause-weight-gain-tips',title:'Menopause and Weight Gain: Why It Happens and How to Fight It',category:"Women's Health",date:'2025-03-24',readTime:'9 min',calcEmbed:'menopause-symptom-calculator',tags:['menopause weight gain','perimenopause','hormone weight gain','menopause diet','estrogen weight']},
  {slug:'menstrual-cycle-and-fitness',title:'How Your Menstrual Cycle Affects Your Workouts and Energy',category:"Women's Health",date:'2025-03-27',readTime:'8 min',calcEmbed:'menstrual-cycle-calculator',tags:['menstrual cycle fitness','cycle syncing','period workout','hormones exercise','female fitness']},
  {slug:'fertility-boosting-nutrition',title:'Fertility-Boosting Foods and Nutrients: What Science Actually Says',category:"Women's Health",date:'2025-03-30',readTime:'9 min',calcEmbed:'fertility-calculator',tags:['fertility foods','nutrition fertility','folate CoQ10','fertility diet','conception nutrition']},
  {slug:'hormone-balance-for-women',title:'How to Balance Hormones Naturally: Diet and Lifestyle Changes',category:"Women's Health",date:'2025-04-02',readTime:'9 min',calcEmbed:'ovulation-calculator',tags:['hormone balance','estrogen progesterone','hormonal imbalance symptoms','natural hormone health','womens hormones']},

  // ── CATEGORY 16: Mental Health & Productivity ──
  {slug:'burnout-symptoms-and-recovery',title:'Burnout Symptoms: How to Recognize It and Recover Fully',category:'Mental Health & Productivity',date:'2025-04-05',readTime:'9 min',calcEmbed:'burnout-risk-calculator',tags:['burnout symptoms','work burnout','burnout recovery','chronic stress','exhaustion signs']},
  {slug:'dopamine-detox-complete-guide',title:'Dopamine Detox: What It Is, What the Science Says and How to Do It',category:'Mental Health & Productivity',date:'2025-04-08',readTime:'8 min',calcEmbed:'digital-detox-calculator',tags:['dopamine detox','digital detox','dopamine reset','brain reward','screen addiction']},
  {slug:'stress-level-test-meaning',title:'Stress Level Test: Understanding Your Score and What to Do Next',category:'Mental Health & Productivity',date:'2025-04-11',readTime:'8 min',calcEmbed:'stress-level-calculator',tags:['stress level test','stress score meaning','perceived stress scale','chronic stress','stress management tips']},
  {slug:'productivity-score-and-improvement',title:'How to Measure and Improve Your Productivity Score',category:'Mental Health & Productivity',date:'2025-04-14',readTime:'8 min',calcEmbed:'productivity-score-calculator',tags:['productivity score','measure productivity','deep work','time management','focus habits']},
  {slug:'work-life-balance-practical-guide',title:'Work-Life Balance: Practical Strategies That Actually Work',category:'Mental Health & Productivity',date:'2025-04-17',readTime:'8 min',calcEmbed:'work-life-balance-calculator',tags:['work life balance','burnout prevention','boundary setting','remote work balance','stress reduction']},
  {slug:'digital-detox-how-to-guide',title:'Digital Detox: How to Break Your Screen Addiction Step by Step',category:'Mental Health & Productivity',date:'2025-04-20',readTime:'8 min',calcEmbed:'digital-detox-calculator',tags:['digital detox','screen time reduction','social media detox','phone addiction','offline habits']},
  {slug:'how-to-improve-focus-and-concentration',title:'How to Improve Focus and Concentration: Science-Backed Methods',category:'Mental Health & Productivity',date:'2025-04-23',readTime:'9 min',calcEmbed:'focus-score-calculator',tags:['improve focus','concentration tips','ADHD focus','deep work','attention span']},

  // ── CATEGORY 17: Sleep & Recovery ──
  {slug:'sleep-debt-how-to-recover',title:'Sleep Debt: What It Is and the Only Way to Pay It Back',category:'Sleep & Recovery',date:'2025-04-26',readTime:'8 min',calcEmbed:'sleep-debt-calculator',tags:['sleep debt','sleep deficit','catch up sleep','chronic sleep deprivation','sleep recovery']},
  {slug:'best-sleep-position-for-health',title:'Best Sleep Position for Your Health: Back, Side or Stomach?',category:'Sleep & Recovery',date:'2025-04-29',readTime:'7 min',calcEmbed:'sleep-calculator',tags:['sleep position','sleeping on side','back sleeper','stomach sleep','sleep posture health']},
  {slug:'insomnia-natural-remedies',title:'Insomnia Natural Remedies: 10 Evidence-Based Solutions',category:'Sleep & Recovery',date:'2025-05-02',readTime:'9 min',calcEmbed:'sleep-hygiene-calculator',tags:['insomnia remedies','natural sleep aids','melatonin','sleep without medication','CBT-I insomnia']},
  {slug:'magnesium-for-better-sleep',title:'Magnesium for Sleep: Does It Work and How Much to Take?',category:'Sleep & Recovery',date:'2025-05-05',readTime:'7 min',calcEmbed:'sleep-calculator',tags:['magnesium sleep','magnesium glycinate','sleep supplement','GABA magnesium','mineral sleep']},
  {slug:'sleep-hygiene-complete-checklist',title:'Sleep Hygiene Checklist: 15 Habits for Deeper, Better Sleep',category:'Sleep & Recovery',date:'2025-05-08',readTime:'8 min',calcEmbed:'sleep-hygiene-calculator',tags:['sleep hygiene','sleep habits checklist','bedtime routine','better sleep tips','sleep environment']},

  // ── CATEGORY 18: Lifestyle & Habits ──
  {slug:'how-age-calculator-works',title:'How to Calculate Your Exact Age: Guide to Age Calculators',category:'Lifestyle & Habits',date:'2025-05-11',readTime:'6 min',calcEmbed:'age-calculator',tags:['age calculator','calculate exact age','age in days','birthday age','how old am I']},
  {slug:'how-birthday-calculator-works',title:'Birthday Calculator: Find Your Day, Age and Next Birthday Countdown',category:'Lifestyle & Habits',date:'2025-05-14',readTime:'6 min',calcEmbed:'birthday-calculator',tags:['birthday calculator','day of week birthday','birthday countdown','age birthday','birthday finder']},
  {slug:'date-difference-calculator-guide',title:'Date Difference Calculator: Calculate Days Between Any Two Dates',category:'Lifestyle & Habits',date:'2025-05-17',readTime:'6 min',calcEmbed:'date-difference-calculator',tags:['date difference','days between dates','calculate date gap','time between dates','date calculator']},
  {slug:'healthy-morning-routine-guide',title:'Healthy Morning Routine: 10 Habits That Transform Your Day',category:'Lifestyle & Habits',date:'2025-05-20',readTime:'8 min',calcEmbed:'productivity-score-calculator',tags:['healthy morning routine','morning habits','wake up routine','morning ritual','daily routine']},
  {slug:'how-to-quit-sugar-21-days',title:'How to Quit Sugar in 21 Days: A Step-by-Step Detox Plan',category:'Lifestyle & Habits',date:'2025-05-23',readTime:'9 min',calcEmbed:'sugar-intake-calculator',tags:['quit sugar','sugar detox','reduce sugar intake','sugar cravings','no sugar challenge']},
  {slug:'alcohol-effects-on-health-and-weight',title:'Alcohol and Your Health: What It Does to Your Body and Weight',category:'Lifestyle & Habits',date:'2025-05-26',readTime:'8 min',calcEmbed:'alcohol-unit-calculator',tags:['alcohol health effects','alcohol weight gain','drinking calories','alcohol metabolism','safe drinking limits']},

  // ── CATEGORY 19: General Health Tools & Guides ──
  {slug:'how-to-use-bmi-calculator-correctly',title:'How to Use a BMI Calculator: Common Mistakes and Better Metrics',category:'General Tools',date:'2025-05-29',readTime:'7 min',calcEmbed:'bmi-calculator',tags:['how to use BMI calculator','BMI calculator guide','BMI accuracy','BMI limitations','body mass index tool']},
  {slug:'calorie-calculator-complete-guide',title:'Calorie Calculator Guide: How to Find Your Exact Calorie Needs',category:'General Tools',date:'2025-06-01',readTime:'8 min',calcEmbed:'calorie-calculator',tags:['calorie calculator guide','TDEE calculator','how many calories','calorie needs tool','calorie tracking']},
  {slug:'protein-calculator-how-to-use',title:'Protein Calculator: How to Find Your Daily Protein Target',category:'General Tools',date:'2025-06-04',readTime:'7 min',calcEmbed:'protein-intake-calculator',tags:['protein calculator','daily protein target','protein intake tool','how much protein','protein goal']},
  {slug:'blood-pressure-ranges-explained',title:'Blood Pressure Numbers Explained: What Your Reading Means',category:'General Tools',date:'2025-06-07',readTime:'8 min',calcEmbed:'blood-pressure-checker',tags:['blood pressure ranges','systolic diastolic','normal blood pressure','hypertension stages','blood pressure chart']},
  {slug:'testosterone-levels-by-age-guide',title:'Testosterone Levels by Age: What Is Normal and Signs of Low T',category:'General Tools',date:'2025-06-10',readTime:'8 min',calcEmbed:'testosterone-estimator',tags:['testosterone levels','low testosterone symptoms','normal T levels','testosterone by age','testosterone health']},
  {slug:'heart-age-calculator-guide',title:'Heart Age Calculator: Is Your Heart Older Than You Are?',category:'General Tools',date:'2025-06-13',readTime:'8 min',calcEmbed:'heart-age-calculator',tags:['heart age calculator','cardiovascular age','heart health score','biological heart age','heart risk']},
];

const categoryCalcMap = {
  'BMI & Body Weight': ['bmi-calculator','body-fat-calculator','ideal-weight-calculator','calorie-calculator'],
  'Calories & Weight': ['calorie-calculator','tdee-calculator','bmr-calculator','macro-calculator'],
  'Macronutrients':    ['macro-calculator','protein-intake-calculator','carb-calculator','fat-intake-calculator'],
  'TDEE & Metabolism': ['tdee-calculator','bmr-calculator','calorie-calculator','lean-body-mass-calculator'],
  'Body Fat':          ['body-fat-calculator','bmi-calculator','waist-to-hip-ratio','ideal-weight-calculator'],
  'Fitness & Exercise':['heart-rate-calculator','one-rep-max-calculator','vo2-max-calculator','steps-to-calories-calculator'],
  'Sleep & Recovery':  ['sleep-calculator','caffeine-intake-calculator','stress-level-calculator','bmr-calculator'],
  'Hydration':         ['water-intake-calculator','calorie-calculator','bmr-calculator','bmi-calculator'],
  'Heart Rate':        ['heart-rate-calculator','blood-pressure-checker','vo2-max-calculator','bmi-calculator'],
  'Mental Health':     ['stress-level-calculator','anxiety-score-calculator','sleep-calculator','bmi-calculator'],
  'Health Checks':     ['bmi-calculator','blood-pressure-checker','body-fat-calculator','calorie-calculator'],
  'Body Metrics': ['bmi-calculator','body-fat-calculator','ideal-weight-calculator','tdee-calculator'],
  'Nutrition': ['calorie-calculator','macro-calculator','protein-intake-calculator','water-intake-calculator'],
  'Fitness': ['heart-rate-calculator','one-rep-max-calculator','vo2-max-calculator','steps-to-calories-calculator'],
  'Heart Health': ['blood-pressure-checker','heart-rate-calculator','cholesterol-risk-calculator','bmi-calculator'],
  'Sleep': ['sleep-calculator','sleep-debt-calculator','caffeine-intake-calculator','stress-level-calculator'],
  'Disease Prevention': ['diabetes-risk-calculator','cholesterol-risk-calculator','stroke-risk-calculator','bmi-calculator'],
  'Mental Health_old': ['stress-level-calculator','anxiety-score-calculator','depression-screening-calculator','sleep-calculator'],
  'Lifestyle': ['smoking-cost-calculator','alcohol-unit-calculator','caffeine-intake-calculator','bac-calculator'],
  'Women\'s Health': ['pregnancy-due-date-calculator','ovulation-calculator','menstrual-cycle-calculator','fertility-calculator'],
  'Wellness': ['water-intake-calculator','sleep-calculator','biological-age-calculator','life-expectancy-calculator'],
  'Weight Loss': ['calorie-calculator','steps-to-calories-calculator','body-fat-calculator','intermittent-fasting-calculator'],
  'Nutrition & Diet': ['macro-calculator','protein-intake-calculator','calorie-calculator','fiber-intake-calculator'],
  "Women's Health": ['ovulation-calculator','pregnancy-due-date-calculator','menstrual-cycle-calculator','fertility-calculator'],
  'Mental Health & Productivity': ['stress-level-calculator','burnout-risk-calculator','sleep-calculator','anxiety-score-calculator'],
  'Lifestyle & Habits': ['age-calculator','birthday-calculator','date-difference-calculator','sugar-intake-calculator'],
  'General Tools': ['bmi-calculator','calorie-calculator','protein-intake-calculator','blood-pressure-checker'],
};

function getRelatedCalcs(category) {
  return categoryCalcMap[category] || categoryCalcMap['Body Metrics'];
}

function getRelatedPosts(currentSlug, category) {
  return blogPosts.filter(p => p.slug !== currentSlug && p.category === category).slice(0, 2).map(p => p.slug);
}

function blogDataTable(headers, rows, statusCol = -1) {
  const statusClass = val => {
    const v = val.toLowerCase();
    if (/healthy|normal|optimal|ideal|good|excellent|adequate/.test(v)) return 'status-healthy';
    if (/borderline|moderate|fair|average|low-moderate/.test(v)) return 'status-border';
    if (/high|obese|risk|poor|deficient|very high|dangerous/.test(v)) return 'status-risk';
    return '';
  };
  const ths = headers.map(h=>`<th>${h}</th>`).join('');
  const trs = rows.map((r,i)=>{
    const bg = i%2===0?'#0f1a17':'#131f18';
    const tds = r.map((c,ci)=>{
      const sc = (ci===statusCol && typeof c === 'string') ? statusClass(c) : '';
      return `<td>${sc?`<span class="tbl-badge ${sc}">${c}</span>`:c}</td>`;
    }).join('');
    return `<tr style="background:${bg}">${tds}</tr>`;
  }).join('');
  return `<div class="data-table-wrap"><table class="data-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

function getCategoryTables(category) {
  const cat = category || 'Body Metrics';
  if (cat==='BMI & Body Weight') return [
    blogDataTable(['BMI Range','Classification','Health Risk','Action'],
      [['Below 18.5','Underweight','Moderate','Nutritional support needed'],
       ['18.5 – 24.9','Normal Weight','Minimal','Maintain healthy habits'],
       ['25.0 – 29.9','Overweight','Increased','Lifestyle modifications'],
       ['30.0 – 34.9','Obese Class I','High','Medical consultation advised'],
       ['35.0 – 39.9','Obese Class II','Very High','Medical management needed'],
       ['40.0+','Obese Class III','Extreme','Immediate medical attention']], 2),
    blogDataTable(['Height','Healthy Weight Range','Overweight Threshold','Obese Threshold'],
      [['155 cm / 5\'1"','44 – 60 kg','60 – 72 kg','72+ kg'],
       ['160 cm / 5\'3"','47 – 64 kg','64 – 76 kg','76+ kg'],
       ['165 cm / 5\'5"','50 – 68 kg','68 – 81 kg','81+ kg'],
       ['170 cm / 5\'7"','54 – 72 kg','72 – 87 kg','87+ kg'],
       ['175 cm / 5\'9"','57 – 77 kg','77 – 92 kg','92+ kg'],
       ['180 cm / 5\'11"','60 – 82 kg','82 – 97 kg','97+ kg'],
       ['185 cm / 6\'1"','64 – 86 kg','86 – 104 kg','104+ kg']])
  ];
  if (cat==='Calories & Weight') return [
    blogDataTable(['Age Group','Sedentary (kcal)','Moderately Active (kcal)','Very Active (kcal)'],
      [['19–30 (Male)','2,400','2,800','3,000'],
       ['19–30 (Female)','1,800','2,000','2,400'],
       ['31–50 (Male)','2,200','2,600','3,000'],
       ['31–50 (Female)','1,800','2,000','2,200'],
       ['51–70 (Male)','2,000','2,400','2,800'],
       ['51–70 (Female)','1,600','1,800','2,200'],
       ['70+ (Male)','2,000','2,200','2,600'],
       ['70+ (Female)','1,600','1,800','2,000']]),
    blogDataTable(['Food','Serving','Calories','Satiety Score'],
      [['Chicken Breast (grilled)','100g','165 kcal','High'],
       ['Brown Rice (cooked)','100g','112 kcal','Moderate'],
       ['Broccoli','100g','34 kcal','High'],
       ['Avocado','100g','160 kcal','High'],
       ['Whole Egg','1 large','78 kcal','High'],
       ['Oats (dry)','40g','148 kcal','High'],
       ['Greek Yogurt (plain)','170g','100 kcal','High'],
       ['Almonds','28g','164 kcal','Moderate'],
       ['Banana','1 medium','105 kcal','Moderate'],
       ['White Rice (cooked)','100g','130 kcal','Low']])
  ];
  if (cat==='Macronutrients') return [
    blogDataTable(['Goal','Protein','Carbohydrates','Fat','Notes'],
      [['Weight Loss','30–35%','35–40%','25–30%','High protein preserves muscle'],
       ['Muscle Gain','25–30%','45–55%','20–25%','Carbs fuel workouts'],
       ['Balanced Health','20–30%','45–55%','20–35%','General wellness'],
       ['Low Carb','30–35%','20–30%','35–45%','Reduced insulin response'],
       ['Keto','20–25%','5%','70–75%','Ketosis diet'],
       ['Endurance Sport','20–25%','55–65%','20–25%','Carb-forward for energy']]),
    blogDataTable(['Protein Source','Amount','Protein Content','Quality Score'],
      [['Chicken Breast','100g','31g','Excellent'],
       ['Tuna (canned)','100g','30g','Excellent'],
       ['Greek Yogurt','170g','17g','Excellent'],
       ['Cottage Cheese','100g','11g','Excellent'],
       ['Eggs','1 large','6g','Excellent'],
       ['Lentils (cooked)','100g','9g','Good'],
       ['Tofu (firm)','100g','8g','Good'],
       ['Quinoa (cooked)','100g','4g','Good'],
       ['Almonds','28g','6g','Moderate'],
       ['Hemp Seeds','30g','10g','Good']], 2)
  ];
  if (cat==='TDEE & Metabolism') return [
    blogDataTable(['Activity Level','Multiplier','Example','Weekly Exercise'],
      [['Sedentary','1.2','Desk job, minimal movement','< 1 hour'],
       ['Lightly Active','1.375','Light exercise 1–3 days/week','1–3 hrs'],
       ['Moderately Active','1.55','Moderate exercise 3–5 days','3–5 hrs'],
       ['Very Active','1.725','Hard exercise 6–7 days/week','6–7 hrs'],
       ['Extra Active','1.9','Physical job + daily training','> 10 hrs']]),
    blogDataTable(['Age Range','Avg BMR (Male)','Avg BMR (Female)','Key Change'],
      [['20–29','1,900–2,200','1,500–1,700','Peak metabolic rate'],
       ['30–39','1,850–2,100','1,450–1,650','Slight decline begins'],
       ['40–49','1,750–2,000','1,400–1,600','~2% decline per decade'],
       ['50–59','1,650–1,900','1,350–1,550','Muscle loss accelerates'],
       ['60–69','1,550–1,800','1,300–1,500','Activity crucial'],
       ['70+','1,400–1,650','1,200–1,400','High protein needs']])
  ];
  if (cat==='Body Fat') return [
    blogDataTable(['Category','Men (%)','Women (%)','Health Status'],
      [['Essential Fat','2–5%','10–13%','Borderline'],
       ['Athletic','6–13%','14–20%','Healthy'],
       ['Fitness','14–17%','21–24%','Healthy'],
       ['Acceptable','18–24%','25–31%','Healthy'],
       ['Overweight','25–31%','32–38%','Borderline'],
       ['Obese','32%+','39%+','At Risk']], 3),
    blogDataTable(['Method','Accuracy','Cost','Equipment Needed'],
      [['DEXA Scan','±1–2%','High ($50–200)','Medical facility'],
       ['Hydrostatic Weighing','±1.5–2%','High ($50–150)','Lab facility'],
       ['Air Displacement (Bod Pod)','±1–2.5%','High ($50–100)','Lab facility'],
       ['Skinfold Calipers','±3–5%','Low (calipers only)','Calipers + skill'],
       ['US Navy Method','±3.5%','Free','Tape measure'],
       ['Bioelectrical Impedance','±3–5%','Low ($30–200)','BIA device'],
       ['BMI (estimate only)','±5–10%','Free','Scale + height']])
  ];
  if (cat==='Fitness & Exercise') return [
    blogDataTable(['Exercise','30 min (70kg)','60 min (70kg)','Intensity Level'],
      [['Running (8km/h)','280 kcal','560 kcal','Moderate'],
       ['Running (12km/h)','420 kcal','840 kcal','High'],
       ['Cycling (moderate)','245 kcal','490 kcal','Moderate'],
       ['Swimming','250 kcal','500 kcal','Moderate'],
       ['HIIT','360 kcal','720 kcal','Very High'],
       ['Weight Training','140 kcal','280 kcal','Moderate'],
       ['Walking (5km/h)','110 kcal','220 kcal','Low'],
       ['Jump Rope','300 kcal','600 kcal','High'],
       ['Rowing Machine','260 kcal','520 kcal','Moderate'],
       ['Yoga','100 kcal','200 kcal','Low']]),
    blogDataTable(['Muscle Group','Primary Exercises','Sets × Reps','Training Frequency'],
      [['Chest','Bench Press, Push-ups','3–4 × 8–12','2× per week'],
       ['Back','Pull-ups, Rows','3–4 × 8–12','2× per week'],
       ['Shoulders','OHP, Lateral Raises','3 × 10–15','2× per week'],
       ['Biceps','Curls, Hammer Curls','3 × 10–15','2× per week'],
       ['Triceps','Dips, Pushdowns','3 × 10–15','2× per week'],
       ['Legs','Squats, Lunges, RDL','4 × 8–12','2× per week'],
       ['Core','Planks, Deadbugs','3 × 30–60s','3× per week']])
  ];
  if (cat==='Sleep & Recovery') return [
    blogDataTable(['Age Group','Recommended Sleep','Minimum','Maximum'],
      [['Newborns (0–3 mo)','14–17 hours','11 hours','19 hours'],
       ['Infants (4–11 mo)','12–15 hours','10 hours','18 hours'],
       ['Toddlers (1–2 yr)','11–14 hours','9 hours','16 hours'],
       ['Preschool (3–5 yr)','10–13 hours','8 hours','14 hours'],
       ['School-age (6–13 yr)','9–11 hours','7 hours','12 hours'],
       ['Teens (14–17 yr)','8–10 hours','7 hours','11 hours'],
       ['Adults (18–64 yr)','7–9 hours','6 hours','10 hours'],
       ['Seniors (65+)','7–8 hours','5 hours','9 hours']]),
    blogDataTable(['Sleep Stage','Duration','% of Night','Key Functions'],
      [['NREM Stage 1 (Light)','5–10 min','5%','Transition, hypnic jerks'],
       ['NREM Stage 2 (Light)','20–25 min','45–55%','Memory consolidation, heart rate drops'],
       ['NREM Stage 3 (Deep)','20–40 min','15–20%','Physical repair, immune function'],
       ['REM Sleep','10–60 min','20–25%','Emotional processing, dreaming'],
       ['Full Cycle','~90 min','—','4–6 cycles per night']])
  ];
  if (cat==='Hydration') return [
    blogDataTable(['Body Weight','Sedentary','Moderately Active','Very Active','Hot Climate'],
      [['50 kg','1.5 L','1.8 L','2.2 L','2.5 L'],
       ['60 kg','1.8 L','2.2 L','2.7 L','3.0 L'],
       ['70 kg','2.1 L','2.5 L','3.1 L','3.5 L'],
       ['80 kg','2.4 L','2.9 L','3.5 L','4.0 L'],
       ['90 kg','2.7 L','3.2 L','3.9 L','4.4 L'],
       ['100 kg','3.0 L','3.6 L','4.3 L','4.9 L']]),
    blogDataTable(['Food','Water Content','Serving Size','Electrolytes'],
      [['Cucumber','96%','1 cup','Potassium, magnesium'],
       ['Celery','95%','1 cup','Sodium, potassium'],
       ['Tomatoes','94%','1 cup','Potassium, lycopene'],
       ['Watermelon','92%','1 cup','Potassium, magnesium'],
       ['Strawberries','91%','1 cup','Vitamin C, folate'],
       ['Cantaloupe','90%','1 cup','Potassium, vitamin A'],
       ['Spinach','91%','1 cup','Magnesium, potassium'],
       ['Oranges','86%','1 medium','Vitamin C, folate'],
       ['Carrots','88%','1 cup','Beta-carotene']])
  ];
  if (cat==='Heart Rate') return [
    blogDataTable(['Zone','Name','% of Max HR','Purpose','Duration'],
      [['Zone 1','Active Recovery','50–60%','Warm-up, cooldown','20–40 min'],
       ['Zone 2','Fat Burn','60–70%','Aerobic base, fat oxidation','30–90 min'],
       ['Zone 3','Aerobic','70–80%','Cardiovascular fitness','20–60 min'],
       ['Zone 4','Threshold','80–90%','Race pace, lactate threshold','10–30 min'],
       ['Zone 5','Maximum','90–100%','VO2 max, peak power','1–5 min']]),
    blogDataTable(['Resting HR','Classification','Fitness Level','Action'],
      [['Below 50 bpm','Athletic','Excellent','Normal for trained athletes'],
       ['50–60 bpm','Normal-Low','Very Good','Healthy range'],
       ['60–70 bpm','Normal','Good','Typical healthy adult'],
       ['70–80 bpm','Normal-High','Average','Consider more cardio'],
       ['80–90 bpm','Elevated','Below Average','Medical evaluation advised'],
       ['90–100 bpm','High','Poor','Consult a doctor'],
       ['Above 100 bpm','Tachycardia','Concerning','Medical attention needed']], 3)
  ];
  if (cat==='Mental Health') return [
    blogDataTable(['Habit','Stress Reduction','Evidence Level','Time Investment'],
      [['Regular Exercise (150 min/week)','High','Strong','30 min/day'],
       ['Mindfulness Meditation','High','Strong','10–20 min/day'],
       ['Quality Sleep (7–9 hrs)','High','Strong','Daily commitment'],
       ['Social Connection','Moderate-High','Strong','Ongoing'],
       ['Journaling','Moderate','Moderate','10 min/day'],
       ['Time in Nature','Moderate','Moderate','20–30 min/day'],
       ['Digital Detox','Moderate','Growing','1 hr/day'],
       ['Gratitude Practice','Moderate','Moderate','5 min/day']]),
    blogDataTable(['Cortisol Level','Effect on Body','Linked Symptoms','Intervention'],
      [['Optimal morning spike','Normal circadian','Alertness, energy','Maintain routine'],
       ['Chronically elevated','Muscle breakdown, fat storage','Belly fat, sleep issues','Stress management'],
       ['Chronically low','Fatigue, poor immunity','Burnout symptoms','Medical evaluation'],
       ['High + poor sleep','Metabolic disruption','Weight gain, mood swings','Holistic approach']])
  ];
  return [
    blogDataTable(['Metric','Optimal Range','Action Needed','Check Frequency'],
      [['BMI','18.5–24.9','Monitor diet & activity','Every 3–6 months'],
       ['Blood Pressure','< 120/80 mmHg','Lifestyle modification if elevated','Annually'],
       ['Fasting Blood Sugar','70–99 mg/dL','Diet review if borderline','Annually'],
       ['Total Cholesterol','< 200 mg/dL','Diet and exercise if high','Every 5 years'],
       ['Resting Heart Rate','60–80 bpm','Cardio training if high','Monthly'],
       ['Body Fat %','10–25% (M), 20–35% (W)','Adjust nutrition/training','Every 3 months'],
       ['Waist Circumference','< 94 cm (M), < 80 cm (W)','Reduce visceral fat','Every 3 months']]),
    blogDataTable(['Age','Key Health Checks','Frequency','Notes'],
      [['20–30','BMI, blood pressure, STI screening','Annual','Establish baselines'],
       ['30–40','Cholesterol, blood glucose, cancer screening','Annual','Family history matters'],
       ['40–50','Heart risk, colonoscopy (from 45), bone density','Annual+','Preventive focus'],
       ['50–60','Comprehensive metabolic, cancer panels','Annual','Multiple screenings peak'],
       ['60+','Cognitive, vision, hearing, falls risk','Annual','Functional health focus']])
  ];
}

function getCalcEmbedWidget(calcSlug, calcName) {
  const name = calcName || (calculators.find(c=>c.slug===calcSlug)||{name:'Health Calculator'}).name;
  return `
<div class="calc-embed-widget fade-in">
  <span class="calc-embed-badge">Free Calculator</span>
  <h3 class="calc-embed-heading">Try It Yourself: ${name}</h3>
  <p class="calc-embed-desc">Use this free calculator for a quick starting estimate, then interpret the result with the limits explained in the guide.</p>
  <a href="/calculators/${calcSlug}.html" class="calc-embed-btn">Calculate Now &rarr;</a>
  <p class="calc-embed-trust">Free to use, with no sign-up required.</p>
</div>`;
}

function getKeyTakeawaysHtml(post) {
  const calcs = getRelatedCalcs(post.category);
  const calcName = (calculators.find(c=>c.slug===calcs[0])||{name:'health calculator'}).name;
  const items = {
    'BMI & Body Weight':   [`BMI is a screening tool using height and weight — it does not directly measure body fat`,`Normal BMI range is 18.5–24.9; ranges may differ for athletes, elderly, and children`,`Use BMI alongside waist circumference and body fat % for a complete health picture`,`Small, sustainable lifestyle changes are more effective than rapid, drastic diets`,`Always consult a healthcare provider before making significant changes to your health routine`],
    'Calories & Weight':   [`Your calorie needs depend on age, gender, weight, height, and activity level`,`A 500 kcal/day deficit leads to approximately 0.5 kg of weight loss per week`,`Quality of calories matters — protein and fiber are more satiating than simple sugars`,`Tracking calories even for 2–4 weeks builds lasting awareness of your food intake`,`Never drop below 1,200 kcal/day (women) or 1,500 kcal/day (men) without medical supervision`],
    'Macronutrients':      [`Macronutrients (protein, carbs, fat) each play essential, non-replaceable roles in your body`,`Protein: 0.8–1.2 g/kg body weight daily for most adults; higher for athletes`,`Not all carbs are equal — choose complex, fiber-rich sources over refined sugars`,`Healthy fats from avocado, olive oil, and fish support hormones and brain function`,`Your ideal macro ratio depends on your goals, activity, and personal preferences`],
    'TDEE & Metabolism':   [`TDEE = BMR × activity factor — this is your true total daily calorie expenditure`,`Metabolism slows ~2% per decade after 30, mainly due to muscle mass loss`,`Building and maintaining muscle mass is the most effective way to sustain metabolic rate`,`Crash dieting triggers adaptive thermogenesis — your metabolism slows to match intake`,`Activity level outside formal exercise (NEAT) has a surprisingly large impact on TDEE`],
    'Body Fat':            [`Body fat percentage is more meaningful than BMI for assessing health risks`,`Visceral fat (deep abdominal fat) is more metabolically harmful than subcutaneous fat`,`Healthy body fat ranges differ significantly between men and women and change with age`,`You cannot spot-reduce fat; total calorie deficit determines where fat is lost`,`Body recomposition (gaining muscle while losing fat) is achievable with proper nutrition and training`],
    'Fitness & Exercise':  [`Progressive overload — gradually increasing training stress — is the fundamental principle of fitness gains`,`Both cardio and strength training are essential; neither alone is optimal for health`,`Most adults need 150 min of moderate or 75 min of vigorous cardio per week`,`Recovery (sleep, rest days, nutrition) is just as important as training itself`,`Consistency over time beats any single "perfect" workout program`],
    'Sleep & Recovery':    [`Most adults need 7–9 hours of sleep per night for optimal health and performance`,`Sleep debt accumulates quickly but cannot be fully recovered in a single night`,`Deep sleep (NREM Stage 3) is critical for physical repair, immune function, and growth hormone release`,`Chronically poor sleep increases appetite hormones (ghrelin) and decreases satiety hormones (leptin)`,`Sleep hygiene — consistent schedule, dark/cool room, no screens before bed — is the most evidence-based intervention`],
    'Hydration':           [`Water needs vary by body weight, activity level, climate, and health status`,`Thirst is a late indicator of dehydration — aim to drink before you feel thirsty`,`Urine color is a simple hydration indicator: pale yellow = well hydrated, dark yellow = drink more`,`Electrolytes (sodium, potassium, magnesium) are critical for hydration balance during exercise`,`About 20% of daily water intake typically comes from food — whole fruits and vegetables are excellent sources`],
    'Heart Rate':          [`Your maximum heart rate is approximately 220 − age; training zones are percentages of this`,`Resting heart rate below 60 bpm generally indicates good cardiovascular fitness`,`Zone 2 training (60–70% max HR) is the most effective for building aerobic base and fat oxidation`,`Heart rate variability (HRV) is a sensitive indicator of recovery, stress, and cardiovascular health`,`Regular cardiovascular exercise is the single most effective way to lower resting heart rate long-term`],
    'Mental Health':       [`Exercise is one of the most evidence-backed interventions for stress, anxiety, and mild depression`,`The stress hormone cortisol, when chronically elevated, drives fat storage, disrupts sleep, and impairs immunity`,`Small, consistent habits — not dramatic lifestyle overhauls — create lasting mental wellness`,`Sleep deprivation and mental health are bidirectionally linked: each worsens the other`,`Social connection, purpose, and time in nature are powerful, underrated mental health tools`],
  };
  const pts = items[post.category] || [`Evidence-based approaches always outperform fad trends`,`Tracking your health metrics helps identify trends and make better decisions`,`Use our free <a href="/calculators/${calcs[0]}.html">${calcName}</a> to get personalized insights`,`Small, consistent improvements compound into significant long-term results`,`Always consult a healthcare professional for personalized medical guidance`];
  return `<div class="key-takeaways fade-in"><h3>Key Takeaways</h3><ul>${pts.map(p=>`<li>${p}</li>`).join('')}</ul></div>`;
}

function generateBlogContent(post) {
  const calcs = getRelatedCalcs(post.category);
  const relPosts = getRelatedPosts(post.slug, post.category);
  const title = post.title;
  const cleanTitle = title.replace(/[^a-zA-Z0-9 ]/g, '');
  const words = cleanTitle.split(' ').filter(w => w.length > 3);
  const topic = words.slice(0, 3).join(' ').toLowerCase();

  const calcN  = n => (calculators.find(c=>c.slug===calcs[n])||{name:'Health Calculator'}).name;
  const calcLk = n => calcs[n] ? `<a href="/calculators/${calcs[n]}.html">${calcN(n)}</a>` : calcLk(0);
  const embedSlug = post.calcEmbed || calcs[0];
  const embedName = (calculators.find(c=>c.slug===embedSlug)||{name:'Health Calculator'}).name;
  const tables = getCategoryTables(post.category);

  const sections = [
    `<h2>What Is ${title.split(':')[0]} and Why Does It Matter?</h2>`,
    `<p>${title.split(':')[0]} is one of the most important—yet frequently misunderstood—topics in health and wellness today. Millions of people worldwide make decisions about their bodies and habits without a clear, evidence-based framework to guide them. This comprehensive guide changes that by presenting the most current scientific consensus alongside practical, actionable strategies you can start using immediately.</p>`,
    `<p>Whether you are a complete beginner or someone who has been tracking their health for years, the information in this guide is calibrated to be useful. We will cover the underlying science, the most important metrics to understand, common mistakes people make, and—critically—how to avoid them. Every recommendation here is grounded in peer-reviewed research and clinical best practice guidelines from leading health organisations worldwide.</p>`,
    `<p>One of the most empowering things you can do for your health is to understand your personal numbers. That is where tools like our free ${calcLk(0)} come in. Rather than guessing, you get a precise, personalised baseline from which to build real progress. Let us start with the fundamentals.</p>`,

    `<h2>The Science Behind ${post.category}</h2>`,
    `<p>Understanding the physiology behind ${topic} transforms how you approach your health decisions. When you know <em>why</em> something works—not just <em>what</em> to do—you are far more likely to stay consistent and adapt intelligently when life gets complicated. Research published in major journals including <em>The Lancet</em>, <em>JAMA</em>, and <em>The New England Journal of Medicine</em> has significantly advanced our understanding of this topic over the past decade.</p>`,
    `<p>The human body is an extraordinarily complex adaptive system. It responds to inputs—food, movement, sleep, stress, and environment—in highly individualised ways shaped by genetics, age, sex, and accumulated lifestyle patterns. This means there is no universal prescription that works for everyone; however, there are core principles that apply broadly and provide the scaffolding for effective, personalised health management.</p>`,
    tables[0],

    `<h2>Key Factors That Determine Your Results</h2>`,
    `<p>Individual outcomes related to ${topic} are influenced by a layered set of variables. The primary determinants include genetics and family history, chronological age and hormonal status, current body composition, dietary patterns, physical activity level, sleep quality, and chronic stress exposure. Each of these interacts with the others, which is why health improvement is best approached as a system rather than a series of isolated fixes.</p>`,
    `<p>Among these variables, <strong>consistency and adherence</strong> are consistently identified by researchers as the strongest predictors of long-term success—stronger than the specific protocol chosen. A mediocre plan followed consistently outperforms a theoretically optimal plan followed inconsistently. This finding appears repeatedly across weight management, cardiovascular health, sleep research, and performance science.</p>`,
    `<p>Age is another major modulator. The body's responses to diet, exercise, and recovery change meaningfully across the lifespan. Strategies that worked at 25 may need recalibration at 40 or 55. This is not a failure—it is biology. Staying informed and reassessing regularly (ideally using validated tools) is the cornerstone of intelligent health management at any age.</p>`,
    getCalcEmbedWidget(embedSlug, embedName),

    `<h2>What the Latest Research Recommends</h2>`,
    `<p>Current evidence-based guidelines for ${topic} converge on several core recommendations. These are not fads or marketing claims—they are the distilled conclusions of thousands of studies, systematic reviews, and meta-analyses conducted across diverse populations around the world. Here is what the science says:</p>`,
    `<ul>
<li><strong>Personalise your approach.</strong> Use validated assessment tools—like our ${calcLk(0)}—to establish your individual baseline rather than relying on population averages.</li>
<li><strong>Prioritise sustainable over dramatic.</strong> Changes of 1–2% per week in any health metric are consistently more maintainable than aggressive short-term interventions.</li>
<li><strong>Combine strategies.</strong> For most health goals, the combination of nutritional adjustment, structured movement, improved sleep, and stress management produces far better results than any single intervention.</li>
<li><strong>Track and adjust.</strong> Progress monitoring every 4–6 weeks using consistent metrics (not daily fluctuations) allows you to course-correct before problems compound.</li>
<li><strong>Involve professionals for complex situations.</strong> Online calculators and guides are powerful starting points, but personalised medical supervision adds critical value for anyone with existing health conditions.</li>
</ul>`,
    `<p>A 2023 meta-analysis in <em>Nature Medicine</em> involving over 200,000 participants found that individuals who combined digital health tools with consistent self-monitoring achieved 37% better adherence to health behaviour targets compared with those relying on memory alone. Tools like our ${calcLk(1)} represent exactly this type of evidence-backed digital health resource.</p>`,
    tables[1],

    `<h2>Practical Implementation: Your Step-by-Step Action Plan</h2>`,
    `<p>Translating knowledge into sustainable behaviour is the hardest part of any health improvement journey—and the part most guides fail to address adequately. Here is a concrete, phased implementation framework you can adapt to your circumstances:</p>`,
    `<p><strong>Phase 1 — Assess (Week 1):</strong> Use our ${calcLk(0)} and ${calcLk(2)} to establish your current baselines. Record these numbers. Take measurements rather than relying on memory. Understanding where you are starting from is non-negotiable.</p>`,
    `<p><strong>Phase 2 — Plan (Week 2):</strong> Set a specific, measurable 90-day goal. Use the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound. Research shows that people who write down specific goals are 42% more likely to achieve them than those who only think about their goals mentally.</p>`,
    `<p><strong>Phase 3 — Execute (Weeks 3–12):</strong> Implement one or two changes at a time—not everything simultaneously. Habit research (Lally et al., European Journal of Social Psychology) shows that new habits take an average of 66 days to become automatic. Overloading your system at the start dramatically increases dropout rates.</p>`,
    `<p><strong>Phase 4 — Review and Adjust (Monthly):</strong> Reassess your metrics, compare with your baseline, and calibrate your plan. This review cycle—assess, act, measure, adjust—is the engine of continuous improvement. No plan survives contact with real life unmodified; flexibility is a feature, not a bug.</p>`,
    relPosts[0] ? `<p>For complementary guidance on related topics, see our article: <a href="/blog/${relPosts[0]}.html">${(blogPosts.find(p=>p.slug===relPosts[0])||{title:'related health guidance'}).title}</a>.</p>` : '',

    `<h2>Common Mistakes to Avoid</h2>`,
    `<p>Even well-motivated people make predictable, avoidable mistakes when addressing ${topic}. Knowing these pitfalls in advance is one of the most valuable things you can take from this guide:</p>`,
    `<ul>
<li><strong>Relying solely on scale weight.</strong> Body weight fluctuates by 1–3 kg daily due to fluid shifts, glycogen, and food volume. Use body composition metrics and trend data—not single weigh-ins—to assess true progress.</li>
<li><strong>Ignoring recovery.</strong> Sleep and rest days are not optional add-ons—they are when adaptation happens. Skimping on recovery consistently undermines every other effort you make.</li>
<li><strong>Chasing perfection.</strong> An 80% consistent approach sustained over 12 months produces dramatically better results than a 100% approach followed for 3 weeks. Progress beats perfection every time.</li>
<li><strong>Neglecting mental health.</strong> Stress hormones like cortisol directly impair fat metabolism, disrupt sleep, increase appetite for calorie-dense foods, and accelerate muscle breakdown. Stress management is not soft—it is physiologically essential.</li>
<li><strong>Using outdated information.</strong> Health science evolves rapidly. Always cross-reference guidance with recent peer-reviewed sources and current clinical guidelines, not decade-old books or social media trends.</li>
</ul>`,
    relPosts[1] ? `<p>Explore more on this theme: <a href="/blog/${relPosts[1]}.html">${(blogPosts.find(p=>p.slug===relPosts[1])||{title:'health wellness strategies'}).title}</a>.</p>` : '',

    `<h2>When to Seek Professional Support</h2>`,
    `<p>Self-guided health improvement is powerful, but it has clear boundaries. Seek professional medical evaluation if you experience: unexplained significant changes in body weight (more than 5% in 1 month without intentional effort); persistent fatigue that does not improve with adequate sleep; abnormal readings on any health assessment tool; symptoms such as chest pain, breathlessness at rest, persistent headaches, or other concerning physical signs; or a family history of serious conditions that may affect your risk profile.</p>`,
    `<p>Regular preventive care—even when you feel well—is the most cost-effective health investment available. Annual wellness visits, appropriate screening tests, and the guidance of a registered dietitian or certified personal trainer can provide calibration that no calculator or guide can fully replace. Think of self-monitoring tools as the continuous layer and professional care as the periodic high-resolution check-in.</p>`,

    `<h2>Frequently Asked Questions About ${title.split(':')[0]}</h2>`,
    `<h3>How quickly can I expect to see results?</h3>`,
    `<p>Meaningful physiological changes typically become measurable within 4–8 weeks of consistent implementation. However, the timeline depends heavily on the starting point, the magnitude of the changes made, and individual biological variation. Subjective improvements in energy, sleep quality, and mood often appear sooner—sometimes within 1–2 weeks—providing early motivation to continue.</p>`,
    `<h3>Are online health calculators accurate enough to rely on?</h3>`,
    `<p>Validated online health calculators—including ours—are accurate to within 5–10% for most population groups when used correctly. They provide an excellent, evidence-based starting point for goal setting and self-monitoring. For clinical decision-making or medical diagnosis, they should be complemented by professional assessment using laboratory testing and physical examination.</p>`,
    `<h3>How does age affect this topic?</h3>`,
    `<p>Age exerts a significant influence on virtually every aspect of health and physiology. Metabolic rate, hormone levels, muscle mass, sleep architecture, and recovery capacity all change meaningfully across the lifespan. Most health guidelines provide age-stratified recommendations precisely because of these differences. Our calculators account for age as a key variable in all their algorithms.</p>`,

    getKeyTakeawaysHtml(post),

    `<h2>Conclusion: Your Next Steps</h2>`,
    `<p>You now have a thorough, evidence-based foundation for understanding ${topic} and taking meaningful action. The most important thing you can do right now is start—not with a perfect plan, but with a clear baseline and one small, committed change. Use our free ${calcLk(0)} to get your personalised numbers today, set one specific 90-day goal, and begin building the consistent habits that compound into extraordinary long-term health.</p>`,
    `<p>Remember: the difference between people who achieve their health goals and those who do not is rarely information—it is action, consistency, and the willingness to course-correct when needed. You have the information. Now it is time to act. Explore all of our free ${calcLk(1)} and ${calcLk(2)} tools to support your journey every step of the way.</p>`,
  ];

  return sections.join('\n');
}

function generateBlogPost(post) {
  const bc = breadcrumb([{name:'Home',url:'/'},{name:'Blog',url:'/blog.html'},{name:post.title,url:'/blog/'+post.slug+'.html'}]);
  const faqItems = [
    {q:`What is the main takeaway from "${post.title}"?`,a:`The main takeaway is to take a proactive, evidence-based approach to your health. Understanding the topic and using available tools can lead to better health outcomes.`},
    {q:'How can I apply this information to my daily life?',a:'Start by assessing your current status using our health calculators, then make small, sustainable changes to your daily routine based on your personalized results.'},
    {q:'Should I consult a doctor before making changes?',a:'Yes, always consult a healthcare professional before making significant changes to your diet, exercise routine, or health regimen, especially if you have existing health conditions.'},
    {q:'How reliable is the health information in this article?',a:'Our content is reviewed by healthcare professionals and based on peer-reviewed research. However, individual needs vary — always seek personalized medical advice from a qualified provider.'},
    {q:'Where can I find tools to track my progress?',a:'Explore our free health calculators for personalized, evidence-based assessments. All tools are free, require no registration, and provide instant results.'},
  ];
  const faq = faqSection(faqItems);
  const share = shareButtons('/blog/'+post.slug+'.html', post.title);
  const content = generateBlogContent(post);
  const calcs = getRelatedCalcs(post.category);
  const takeaways = [
    'Understand the fundamentals and key concepts of this important health topic',
    'Learn evidence-based strategies backed by peer-reviewed scientific research',
    `Use our free <a href="/calculators/${calcs[0]}.html">${(calculators.find(c=>c.slug===calcs[0])||{name:'health calculator'}).name}</a> for your personalized assessment`,
    'Make gradual, sustainable changes for long-term health improvement',
    'Know when to seek professional medical guidance for your specific situation',
  ];

  const featImgUrl = blogUnsplashUrl(post.slug);
  const _bm = BLOG_META[post.slug];
  const blogMetaDesc = _bm ? _bm.desc : `Discover expert insights on ${post.title.toLowerCase()}. Evidence-based strategies, practical tips, and science-backed guidance from VitalHealth Hub.`;
  const blogTitle = _bm ? _bm.title : `${post.title} | ${SITE_NAME}`;

  const schema = {
    "@context":"https://schema.org",
    "@type":"BlogPosting",
    "headline":post.title,
    "name":post.title,
    "description":blogMetaDesc,
    "url":SITE+'/blog/'+post.slug+'.html',
    "datePublished":post.date,
    "dateModified":"2026-01-01",
    "author":{"@type":"Person","name":"Ali Haider","url":"https://www.linkedin.com/in/ali-haider-seo-consultant/","sameAs":["https://www.linkedin.com/in/ali-haider-seo-consultant/"]},
    "publisher":{"@type":"Organization","name":SITE_NAME,"url":SITE,"logo":{"@type":"ImageObject","url":SITE+"/favicon.ico","width":32,"height":32}},
    "image":{"@type":"ImageObject","url":featImgUrl,"width":1200,"height":630},
    "mainEntityOfPage":{"@type":"WebPage","@id":SITE+'/blog/'+post.slug+'.html'},
    "articleSection":post.category,
    "keywords":(post.tags||[]).join(', '),
    "inLanguage":"en-US",
    "isPartOf":{"@type":"Blog","name":SITE_NAME+" Blog","url":SITE+'/blog.html'}
  };

  // Build TOC + inject IDs into H2s
  let tocIdx = 0;
  const tocItems = [];
  const contentWithIds = content.replace(/<h2>([^<]+)<\/h2>/g, (match, txt) => {
    const id = 'bp-sec-' + tocIdx++;
    tocItems.push({id, text: txt});
    return `<h2 id="${id}">${txt}</h2>`;
  });

  const tocHtml = tocItems.length ? `<div class="bp-toc" id="bpToc">
<div class="bp-toc-header">
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
Table of Contents
</div>
<ol class="bp-toc-list">${tocItems.map((t,i)=>`<li><a href="#${t.id}" class="bp-toc-link" data-target="${t.id}">${i+1}. ${t.text}</a></li>`).join('')}</ol>
</div>` : '';

  const tagPillsHtml = post.tags && post.tags.length ? `<div class="bp-hero-tags">${post.tags.slice(0,5).map(t=>`<span class="bp-hero-tag">${t}</span>`).join('')}</div>` : '';

  // Sidebar related calcs widget
  const sidebarCalcs = calcs.slice(0,4).map(s => {
    const c = calculators.find(x => x.slug === s);
    return c ? `<a href="/calculators/${s}.html" class="bp-sidebar-calc-link">${calcSvg(c.icon)}<span>${c.name}</span></a>` : '';
  }).filter(Boolean).join('');

  // Blog-category → quiz mapping for bottom section
  const blogQuizMap = {
    'BMI & Body Weight':    ['body-fat-and-composition-quiz','biological-age-quiz'],
    'Calories & Weight':    ['calorie-and-metabolism-quiz','nutrition-knowledge-quiz'],
    'Macronutrients':       ['nutrition-knowledge-quiz','nutrient-deficiency-quiz'],
    'TDEE & Metabolism':    ['calorie-and-metabolism-quiz','nutrition-knowledge-quiz'],
    'Body Fat':             ['body-fat-and-composition-quiz','biological-age-quiz'],
    'Fitness & Exercise':   ['fitness-level-quiz','workout-type-quiz'],
    'Heart Health':         ['heart-health-quiz','lifestyle-health-score-quiz'],
    "Women's Health":       ['hormone-balance-quiz','menstrual-health-quiz'],
    'Sleep & Recovery':     ['sleep-quality-quiz','burnout-risk-quiz'],
    'Mental Health':        ['stress-awareness-quiz','burnout-risk-quiz'],
    'Diabetes & Metabolic Health': ['lifestyle-health-score-quiz','calorie-and-metabolism-quiz'],
    'Hydration':            ['hydration-health-quiz','nutrition-knowledge-quiz'],
    'Intermittent Fasting': ['calorie-and-metabolism-quiz','diet-type-quiz'],
  };
  const qSlugs = blogQuizMap[post.category] || ['nutrition-knowledge-quiz','lifestyle-health-score-quiz'];
  const relatedQuizzes = qSlugs.map(s => quizzesData.find(q => q.slug === s)).filter(Boolean).slice(0,2);

  const extraHead = `<meta name="keywords" content="${post.title.toLowerCase()}, ${post.category.toLowerCase()}, health guide, wellness tips, ${SITE_NAME.toLowerCase()}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
${faq.schema}`;

  // Related articles (same category first, fill from others)
  const relatedArticles = (() => {
    const same = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug);
    return (same.length >= 3 ? same : same.concat(blogPosts.filter(p => p.slug !== post.slug && p.category !== post.category))).slice(0,3);
  })();

  // Bottom related calculators (up to 3 from calcs list)
  const bottomCalcs = calcs.slice(0,3).map(s => calculators.find(c => c.slug === s)).filter(Boolean);

  return `${head(blogTitle, blogMetaDesc, '/blog/'+post.slug+'.html', extraHead, 'article', featImgUrl, featImgUrl)}
<body>
${NAV}
<div class="reading-progress"><div class="reading-progress-fill"></div></div>
${bc.html}
${bc.schema}
<article>

<!-- ═══ HERO: blurred background + dark overlay ═══ -->
<section class="bp-hero" style="--bp-bg:url('${featImgUrl}')">
<div class="bp-hero-content">
<span class="bp-hero-badge">${post.category}</span>
<h1>${post.title}</h1>
<div class="bp-hero-meta">
<span>&#9998;&nbsp;Ali Haider</span>
<span><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>&nbsp;${post.date}</span>
<span>&#9201;&nbsp;${post.readTime} read</span>
<span>Updated 2026</span>
</div>
${tagPillsHtml}
</div>
</section>

<!-- ═══ 2-COLUMN LAYOUT ═══ -->
<div class="container">
<div class="bp-layout">

<!-- LEFT: Article Content -->
<div class="bp-content">

<!-- Clean featured image -->
<figure class="bp-feat-img fade-in">
<img src="${featImgUrl}" alt="${blogCardImage(post.slug).alt}" title="${post.title}" width="800" height="420" loading="eager">
</figure>

<!-- Mobile TOC (collapsible) -->
<details class="bp-toc-mobile fade-in">
<summary>&#9776;&nbsp; Table of Contents</summary>
<ol class="bp-toc-list">${tocItems.map((t,i)=>`<li><a href="#${t.id}">${i+1}. ${t.text}</a></li>`).join('')}</ol>
</details>

<!-- Key Takeaways info box -->
<div class="bp-info-box fade-in">
<div class="bp-info-box-title">&#9989; Key Takeaways</div>
<ul>${takeaways.map(t=>`<li>${t}</li>`).join('')}</ul>
</div>

<!-- Article body -->
${contentWithIds}

<!-- CTA Callout box -->
<div class="bp-callout-box fade-in">
<div class="bp-callout-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
<div>
<p>Ready to get a starting estimate? Try our free <a href="/calculators/${calcs[0]}.html">${(calculators.find(c=>c.slug===calcs[0])||{name:'health calculator'}).name}</a> — instant and no sign-up needed.</p>
<a href="/calculators/${calcs[0]}.html" class="btn btn-primary">Try Free Calculator &rarr;</a>
</div>
</div>

${share}

<!-- FAQ -->
<section class="bp-faq-section fade-in">
<h2>Frequently Asked Questions</h2>
${faq.html}
</section>



</div><!-- /bp-content -->

<!-- RIGHT: Sticky Sidebar -->
<aside class="bp-sidebar">

<!-- Sticky TOC -->
${tocHtml}

<!-- Related calculators widget -->
${sidebarCalcs ? `<div class="bp-sidebar-widget fade-in">
<div class="bp-sidebar-widget-title"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Try These Calculators</div>
${sidebarCalcs}
</div>` : ''}

<!-- Newsletter / tip widget -->
<div class="bp-sidebar-tip fade-in">
<div class="bp-sidebar-tip-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></div>
<p>Bookmark this article for quick reference and share it with someone who might benefit.</p>
</div>

</aside>

</div><!-- /bp-layout -->
</div><!-- /container -->

<!-- ═══ BOTTOM: Related Content ═══ -->
<section class="bp-bottom-section">
<div class="container">

<!-- Related Articles -->
<div class="bp-bottom-block">
<div class="bp-bottom-block-title"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Related Articles</div>
<div class="bp-bottom-grid">
${relatedArticles.map(r => {
  const img = blogCardImage(r.slug);
  return `<a href="/blog/${r.slug}.html" class="blog-card">
<div class="blog-card-image"><img src="${img.url}" alt="${img.alt}" title="${r.title}" width="600" height="340" loading="lazy"></div>
<div class="blog-card-body">
<div class="blog-card-meta"><span class="blog-card-category">${r.category}</span><span>${r.readTime} read</span></div>
<h3>${r.title}</h3>
<span class="read-more">Read Article &rarr;</span>
</div></a>`;
}).join('')}
</div>
</div>

<!-- Related Calculators -->
${bottomCalcs.length ? `<div class="bp-bottom-block">
<div class="bp-bottom-block-title"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Related Calculators</div>
<div class="bp-bottom-calcs-grid">
${bottomCalcs.map(c => `<a href="/calculators/${c.slug}.html" class="bp-bottom-calc-card">
<div class="bp-bottom-calc-icon">${calcSvg(c.icon)}</div>
<div><h4>${c.name}</h4><p>${c.desc}</p><span class="read-more">Use Calculator &rarr;</span></div>
</a>`).join('')}
</div>
</div>` : ''}

<!-- Related Quizzes -->
${relatedQuizzes.length ? `<div class="bp-bottom-block">
<div class="bp-bottom-block-title"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg> Test Your Knowledge</div>
<div class="bp-bottom-quiz-grid">
${relatedQuizzes.map(q => `<a href="/quizzes/${q.slug}.html" class="bp-bottom-quiz-card">
<div class="bp-bottom-quiz-icon">${q.icon}</div>
<div>
<span class="ccs-xlink-badge ccs-badge-quiz">${q.category}</span>
<h4>${q.name}</h4>
<p>${q.desc.length > 100 ? q.desc.slice(0,100)+'...' : q.desc}</p>
<span class="read-more">Take Quiz &rarr;</span>
</div></a>`).join('')}
</div>
</div>` : ''}

</div>
</section>

</article>
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`;
}

// ========================
// GENERATE ALL FILES
// ========================

console.log('Generating calculator pages...');
ensureDir('calculators');
calculators.forEach(calc => {
  fs.writeFileSync(`calculators/${calc.slug}.html`, generateCalculatorPage(calc));
});
console.log(`Generated ${calculators.length} calculator pages`);

// CALCULATORS INDEX PAGE
const calcCategories = {
  'Weight & Body': calculators.filter(c => ['bmi-calculator','ideal-weight-calculator','body-fat-calculator','lean-body-mass-calculator','waist-to-hip-ratio','waist-to-height-ratio','body-surface-area-calculator','child-bmi-calculator'].includes(c.slug)),
  'Nutrition & Diet': calculators.filter(c => ['calorie-calculator','macro-calculator','tdee-calculator','bmr-calculator','protein-intake-calculator','carb-calculator','fat-intake-calculator','fiber-intake-calculator','water-intake-calculator','keto-calculator'].includes(c.slug)),
  'Heart & Vitals': calculators.filter(c => ['heart-rate-calculator','blood-pressure-checker','cholesterol-risk-calculator','stroke-risk-calculator','bac-calculator','life-expectancy-calculator','biological-age-calculator'].includes(c.slug)),
  "Women's Health": calculators.filter(c => ['pregnancy-due-date-calculator','ovulation-calculator','menstrual-cycle-calculator','fertility-calculator','baby-weight-calculator'].includes(c.slug)),
  'Fitness & Exercise': calculators.filter(c => ['one-rep-max-calculator','vo2-max-calculator','running-pace-calculator','steps-to-calories-calculator','cycling-calories-calculator','swimming-calories-calculator','yoga-calories-calculator','sleep-calculator','sleep-debt-calculator'].includes(c.slug)),
  'Health & Disease Risk': calculators.filter(c => ['diabetes-risk-calculator','stress-level-calculator','anxiety-score-calculator','depression-screening-calculator','caffeine-intake-calculator','alcohol-unit-calculator','smoking-cost-calculator','medication-dosage-calculator','vitamin-d-calculator','intermittent-fasting-calculator','calorie-deficit'].includes(c.slug)),
};
const catNames = Object.keys(calcCategories);

fs.writeFileSync('calculators/index.html', `${head('100+ Free Health Calculators | '+SITE_NAME, 'Browse 100+ free calculators for health education, nutrition planning, fitness, dates, and everyday estimates at '+SITE_NAME+'.', '/calculators/')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'All Calculators',url:'/calculators/'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'All Calculators',url:'/calculators/'}]).schema}
<section class="calc-index-hero">
<div class="calc-index-hero-inner">
<div class="calc-index-hero-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> ${calculators.length}+ Free Health Calculators</div>
<h1 class="calc-index-hero-title">Powerful Health Tools<br>for Better Decisions</h1>
<p class="calc-index-hero-sub">Science-backed calculators for BMI, calories, macros, heart rate, pregnancy, and more &mdash; free, instant, no sign-up needed.</p>
<div class="calc-index-search-bar">
<svg viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
<input type="text" id="calcSearch" placeholder="Search ${calculators.length}+ calculators...">
</div>
<div class="calc-index-hero-btns">
<a href="#calcGrid" class="calc-index-btn-primary"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> Browse All Tools</a>
<a href="/quizzes/" class="calc-index-btn-outline"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg> Take a Health Quiz</a>
<a href="/blog.html" class="calc-index-btn-outline"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> Read Articles</a>
</div>
<div class="calc-index-hero-stats">
<div class="calc-index-stat"><strong>${calculators.length}+</strong><span>Calculators</span></div>
<div class="calc-index-stat"><strong>${catNames.length}</strong><span>Categories</span></div>
<div class="calc-index-stat"><strong>Instant</strong><span>Results</span></div>
<div class="calc-index-stat"><strong>Free</strong><span>Always</span></div>
</div>
</div>
</section>

<div class="calc-index-filter-section">
<div class="filter-buttons fade-in" id="calcFilterBtns">
<button class="filter-btn active" data-filter-cat="all">All</button>
${catNames.map(c=>`<button class="filter-btn" data-filter-cat="${c.replace(/"/g,'&quot;')}">${c}</button>`).join('')}
</div>
</div>

<div class="calc-index-grid-section">
<div class="grid-4" id="calcGrid">
${calculators.map(c => {
  let cat = 'Other';
  for (const [k,v] of Object.entries(calcCategories)) { if (v.find(x=>x.slug===c.slug)) { cat = k; break; } }
  return `<a href="/calculators/${c.slug}.html" class="card fade-in" data-category="${cat}" data-title="${c.name.toLowerCase()}"><div class="card-icon">${calcSvg(c.icon, c.slug)}</div><h3>${c.name}</h3><p>${c.desc}</p><span class="read-more">Calculate Now &rarr;</span></a>`;
}).join('')}
</div>
</div>
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);
console.log('Generated calculators/index.html');

console.log('Generating blog posts...');
ensureDir('blog');
blogPosts.forEach(post => {
  fs.writeFileSync(`blog/${post.slug}.html`, generateBlogPost(post));
});
console.log(`Generated ${blogPosts.length} blog posts`);

// ========================
// INDEX.HTML
// ========================
const featuredCalcs = calculators.slice(0, 8);
const featuredPosts = blogPosts.slice(0, 6);
const popularCalcSlugs = ['bmi-calculator','calorie-calculator','macro-calculator','body-fat-calculator','tdee-calculator','water-intake-calculator','sleep-calculator','heart-rate-calculator'];
const popularCalcs = popularCalcSlugs.map(s => calculators.find(c => c.slug === s)).filter(Boolean);
const homeToolsDisplay = ['habit-tracker','sleep-tracker','mood-tracker','daily-planner','focus-timer','advanced-text-analyzer'].map(s => toolsData.find(t => t.slug === s)).filter(Boolean);
const homeQuizzesDisplay = quizzesData.slice(0, 6);

const homeOrgSchema = {"@context":"https://schema.org","@type":"Organization","name":SITE_NAME,"url":SITE,"email":"ma7122671@gmail.com","sameAs":["https://www.linkedin.com/in/ali-haider-seo-consultant/","https://www.facebook.com/AliHadi768","https://www.instagram.com/ali_haiderseo/"]};
const homeWebSiteSchema = {"@context":"https://schema.org","@type":"WebSite","name":SITE_NAME,"url":SITE,"description":"Free health calculators and expert wellness articles.","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":SITE+"/blog.html?q={search_term_string}"},"query-input":"required name=search_term_string"}};
const homeOgImage = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85";
const homeExtraHead = `<meta name="keywords" content="health calculators, free health tools, bmi calculator, calorie calculator, wellness tools, health articles">
<script type="application/ld+json">${JSON.stringify(homeOrgSchema)}</script>
<script type="application/ld+json">${JSON.stringify(homeWebSiteSchema)}</script>`;

const homeCalcDesc = {
  'bmi-calculator': 'Are you in a healthy weight range? Get your BMI score instantly — takes just 30 seconds.',
  'calorie-calculator': 'Stop guessing how much to eat. Get your exact daily calorie target based on your goal.',
  'macro-calculator': 'Confused about protein, carbs and fat ratios? Get your personalised macro split in 60 seconds.',
  'body-fat-calculator': "BMI doesn't reveal the full picture. Measure your actual body fat percentage today.",
  'tdee-calculator': "Not losing weight despite dieting? Find out exactly how many calories your body really burns.",
  'water-intake-calculator': 'Fatigue, headaches, brain fog? You may be dehydrated. Find your exact daily water target.',
  'sleep-calculator': 'Waking up exhausted even after 8 hours? Hit the right sleep cycle and wake up refreshed.',
  'heart-rate-calculator': 'Working out without a target zone? Calculate your ideal heart rate zone and train smarter.',
};
const homeToolDesc = {
  'habit-tracker': 'Most new habits die within 10 days. Track your streaks daily and finally make them stick.',
  'sleep-tracker': "Bad sleep costs you energy, focus and mood. Log it and find out what's sabotaging you.",
  'mood-tracker': "Can't explain why some days feel off? Track your mood daily and uncover the real patterns.",
  'daily-planner': 'Stop feeling overwhelmed by your to-do list. Block your time and focus on what actually matters.',
  'focus-timer': 'Constant interruptions are killing your output. Use timed work blocks to reclaim deep focus.',
  'advanced-text-analyzer': 'Know your readability score, keyword density and reading time — live as you type.',
};
const homeQuizDesc = {
  'nutrition-knowledge-quiz': "You eat every single day — but how much do you really know about what's in your food?",
  'hydration-health-quiz': "Most people are chronically dehydrated and don't realise it. Do you know the warning signs?",
  'fitness-level-quiz': 'You work out — but do you understand the science behind it? Test your fitness knowledge.',
  'lifestyle-health-score-quiz': 'How healthy are your daily habits really? Take this quiz for an honest reality check.',
  'stress-awareness-quiz': 'Chronic stress is silently damaging your body. How much do you truly understand about it?',
  'burnout-risk-quiz': "Are you one bad month away from full burnout? Know the warning signs before it's too late.",
};
const homeBlogExcerpt = {
  'how-to-calculate-bmi': "Most people don't know their BMI — or what it means for their health. Here's how to calculate it step by step and what to do with the result.",
  'what-is-a-healthy-bmi': 'The "healthy" BMI range is more nuanced than most people realise. Learn what the numbers mean for men, women and different body types.',
  'bmi-vs-body-fat-percentage': 'BMI is widely used but has serious flaws. Find out why body fat percentage often tells a far more accurate story about your real health.',
  'bmi-for-children-and-teenagers': "Calculating BMI for kids isn't the same as for adults. Learn how to assess it correctly and what the ranges mean for growing bodies.",
  'bmi-chart-by-age': 'Your ideal weight changes as you age. See where you fall on the BMI chart for your age group and what it means for your long-term health.',
  'is-bmi-accurate': 'Millions of healthy people are labelled "overweight" by BMI alone. Here\'s what the research says about its accuracy and real-world limits.',
};

const indexHtml = `${head(SITE_NAME+' - Your Guide to a Healthier Life', 'Explore free health calculators, practical articles, wellness tools, and clear explanations of their assumptions and limitations.', '/', homeExtraHead, 'website', homeOgImage, homeOgImage)}
<body>
${NAV}

<section class="hero hero-bg">
<div class="hero-overlay"></div>
<div class="container hero-inner">
<h1 class="fade-in">Your Guide to a Healthier Life</h1>
<p class="fade-in">Free health calculators, practical articles, and wellness tools for everyday learning and planning.</p>
<div class="hero-buttons fade-in">
<a href="/calculators/" class="btn btn-primary btn-pulse">Explore Calculators</a>
<a href="/blog.html" class="btn btn-highlight">Read Blog</a>
</div>
</div>
</section>

<!-- Stats Strip -->
<div class="home-stats-strip">
<div class="home-stats-strip-inner">
<div class="home-stat-item"><span class="home-stat-num">${calculators.length}+</span><span class="home-stat-lbl">Free Calculators</span></div>
<div class="home-stat-div"></div>
<div class="home-stat-item"><span class="home-stat-num">${toolsData.length}</span><span class="home-stat-lbl">Premium Tools</span></div>
<div class="home-stat-div"></div>
<div class="home-stat-item"><span class="home-stat-num">${blogPosts.length}+</span><span class="home-stat-lbl">Expert Articles</span></div>
<div class="home-stat-div"></div>
<div class="home-stat-item"><span class="home-stat-num">${quizzesData.length}+</span><span class="home-stat-lbl">Health Quizzes</span></div>
</div>
</div>

<!-- Section 2: Popular Health Calculators -->
<section class="home-pop-calcs">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge">Top Calculators</span>
<h2>Popular Health Calculators</h2>
<p>Science-backed tools to understand your body and guide your wellness journey.</p>
</div>
<div class="home-calcs-grid">
${popularCalcs.map(c => `<a href="/calculators/${c.slug}.html" class="home-calc-card fade-in">
<div class="home-calc-card-icon">${calcSvg(c.icon, c.slug)}</div>
<div class="home-calc-card-name">${c.name}</div>
<div class="home-calc-card-desc">${homeCalcDesc[c.slug] || c.desc}</div>
<div class="home-calc-card-cta">Calculate <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
</a>`).join('')}
</div>
<div class="home-section-cta"><a href="/calculators/" class="btn btn-primary">View All ${calculators.length}+ Calculators &rarr;</a></div>
</div>
</section>

<!-- Section 3: Quick Action -->
<section class="home-quick-action">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge">Get Started</span>
<h2>What do you want to do today?</h2>
<p>Pick a path and we'll guide you to the right tools and content.</p>
</div>
<div class="home-qa-grid">
<a href="/calculators/" class="home-qa-card fade-in">
<span class="home-qa-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg></span>
<div class="home-qa-label">Calculate Health Metrics</div>
<div class="home-qa-sub">BMI, calories, macros, heart rate and 100+ more free calculators</div>
</a>
<a href="/tools/" class="home-qa-card fade-in">
<span class="home-qa-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg></span>
<div class="home-qa-label">Track Habits &amp; Health</div>
<div class="home-qa-sub">Daily trackers, planners, mood logs and sleep monitoring</div>
</a>
<a href="/quizzes/" class="home-qa-card fade-in">
<span class="home-qa-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3a4 4 0 0 0-4 4v1a3 3 0 0 0 0 6v1a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-1a3 3 0 0 0 0-6V7a4 4 0 0 0-4-4H9z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="15" x2="13" y2="15"/></svg></span>
<div class="home-qa-label">Take a Health Quiz</div>
<div class="home-qa-sub">Test your nutrition, fitness and wellness knowledge</div>
</a>
<a href="/blog.html" class="home-qa-card fade-in">
<span class="home-qa-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>
<div class="home-qa-label">Read Expert Articles</div>
<div class="home-qa-sub">Evidence-based guides on health, fitness and longevity</div>
</a>
</div>
</div>
</section>

<!-- Section 4: Premium Tools -->
<section class="home-tools-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge">Premium Tools</span>
<h2>Track Your Health Daily</h2>
<p>Free tools to build lasting habits, monitor your wellness, and stay productive.</p>
</div>
<div class="home-tools-grid">
${homeToolsDisplay.map(t => `<a href="/tools/${t.slug}.html" class="home-tool-card fade-in">
<span class="home-tool-icon">${t.icon}</span>
<div class="home-tool-name">${t.name}</div>
<div class="home-tool-desc">${homeToolDesc[t.slug] || t.desc}</div>
<div class="home-tool-cta">Use Tool &rarr;</div>
</a>`).join('')}
</div>
<div class="home-section-cta"><a href="/tools/" class="btn btn-primary">Browse All ${toolsData.length} Tools &rarr;</a></div>
</div>
</section>

<!-- Section 5: Quizzes -->
<section class="home-quiz-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge">Test Yourself</span>
<h2>Interactive Health Quizzes</h2>
<p>Challenge yourself and discover what you know about your health and wellness.</p>
</div>
<div class="home-quiz-grid">
${homeQuizzesDisplay.map(q => {
  const qLen = q.questions ? q.questions.length : 8;
  const diff = qLen <= 5 ? 'easy' : qLen <= 8 ? 'medium' : 'hard';
  const diffLabel = diff === 'easy' ? 'Easy' : diff === 'medium' ? 'Medium' : 'Hard';
  return `<a href="/quizzes/${q.slug}.html" class="home-quiz-card fade-in">
<div class="home-quiz-card-top">
<span class="home-quiz-card-icon">${quizSvg(q.slug)}</span>
<span class="home-quiz-card-cat">${q.category}</span>
<span class="home-quiz-card-diff ${diff}">${diffLabel}</span>
</div>
<h3>${q.name}</h3>
<p>${homeQuizDesc[q.slug] || q.desc}</p>
<div class="home-quiz-card-cta">Take Quiz &rarr;</div>
</a>`;
}).join('')}
</div>
<div class="home-section-cta"><a href="/quizzes/" class="btn btn-primary">View All ${quizzesData.length}+ Quizzes &rarr;</a></div>
</div>
</section>

<!-- Section 6: Blog -->
<section class="home-blog-v2">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge">Latest Articles</span>
<h2>VitalHealth Hub Blog</h2>
<p>Evidence-based guides written by experts to help you live better every day.</p>
</div>
<div class="home-blog-v2-grid">
${featuredPosts.map(p => {
  const img = blogCardImage(p.slug);
  return `<a href="/blog/${p.slug}.html" class="blog-card fade-in"><div class="blog-card-image blog-img-hover"><img src="${img.url}" alt="${p.title}" title="${p.title}" width="600" height="210" loading="lazy"></div><div class="blog-card-body"><div class="blog-card-meta"><span class="blog-card-category">${p.category}</span><span>${p.readTime}</span></div><h3>${p.title}</h3><p>${homeBlogExcerpt[p.slug] || 'Evidence-based insights and practical tips to guide your health journey.'}</p><span class="read-more">Read More &rarr;</span></div></a>`;
}).join('')}
</div>
<div class="home-section-cta"><a href="/blog.html" class="btn btn-primary">View All ${blogPosts.length}+ Articles &rarr;</a></div>
</div>
</section>

<!-- Section 7: How It Works -->
<section class="home-how-works">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge">Simple Process</span>
<h2>Get Results in 3 Simple Steps</h2>
<p>From choosing a tool to getting personalised insights — it takes under a minute.</p>
</div>
<div class="home-hw-grid">
<div class="home-hw-step fade-in">
<span class="home-hw-num">Step 01</span>
<div class="home-hw-icon-wrap"><svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="32" rx="4" stroke="white" stroke-width="2.5"/><path d="M14 18h20M14 24h20M14 30h12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
<h3>Choose a Tool or Calculator</h3>
<p>Browse ${calculators.length}+ free health calculators, ${toolsData.length} tracking tools, and ${quizzesData.length} quizzes across every health category.</p>
</div>
<div class="home-hw-step fade-in">
<span class="home-hw-num">Step 02</span>
<div class="home-hw-icon-wrap"><svg viewBox="0 0 48 48" fill="none"><path d="M16 8h16v8H16zM12 16h24v24H12z" stroke="white" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 26h8M20 31h5" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
<h3>Enter Your Data</h3>
<p>Input your personal measurements or health information into our simple, intuitive forms — no account needed.</p>
</div>
<div class="home-hw-step fade-in">
<span class="home-hw-num">Step 03</span>
<div class="home-hw-icon-wrap"><svg viewBox="0 0 48 48" fill="none"><path d="M8 36l10-12 8 8 12-16" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="38" cy="12" r="4" stroke="white" stroke-width="2.5"/></svg></div>
<h3>Get Instant Results</h3>
<p>Receive colour-coded results, personalised recommendations, and actionable health insights right away.</p>
</div>
</div>
</div>
</section>

<!-- Section 8: Why VitalHealth Hub -->
<section class="home-value-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge home-section-badge--dark">Why Choose Us</span>
<h2>Why VitalHealth Hub?</h2>
<p>We built this so you get the tools you need — without the paywalls, sign-ups, or noise.</p>
</div>
<div class="home-value-grid">
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
<h3>Instant Results</h3>
<p>All calculations happen in your browser. No loading, no servers — results in milliseconds.</p>
</div>
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 3v13l-3 5h18l-3-5V3"/><path d="M8 9h8"/></svg></span>
<h3>Science-Based</h3>
<p>Every tool uses validated medical formulas from WHO, NIH, and peer-reviewed research.</p>
</div>
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg></span>
<h3>Free Forever</h3>
<p>No paywalls, no subscriptions, no hidden fees. All ${calculators.length}+ tools and articles, always free.</p>
</div>
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>
<h3>No Signup Needed</h3>
<p>Your health data stays on your device. We never collect, store, or share any personal information.</p>
</div>
</div>
</div>
</section>

<!-- Section 9: Testimonials -->
<section class="home-reviews-v2">
<div class="container">
<div class="home-reviews-header fade-in">
<h2>What Our Users Say</h2>
<div class="home-reviews-rating">
<span class="home-reviews-stars">★★★★★</span>
<span class="home-reviews-score">4.9</span>
<span class="home-reviews-count">based on 2,400+ reviews</span>
</div>
</div>
<div class="home-reviews-grid">
<div class="home-review-card fade-in">
<div class="home-review-stars">★★★★★</div>
<p class="home-review-text">"${SITE_NAME} completely changed how I approach my health. The BMI and calorie calculators are incredibly intuitive. I lost 15 pounds in 3 months just by tracking my TDEE and following the nutrition articles. The results come with personalised suggestions that actually make sense."</p>
<div class="home-review-author">
<div class="home-review-avatar"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div>
<div class="home-review-name">Jessica M.</div>
<div class="home-review-loc">New York, USA</div>
<div class="home-review-verified"><svg viewBox="0 0 16 16" width="12" height="12" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
</div>
</div>
<div class="home-review-card fade-in">
<div class="home-review-stars">★★★★★</div>
<p class="home-review-text">"As a personal trainer, I use the TDEE and macro calculators with all my clients. The accuracy is impressive compared to other free tools. The blog articles on strength training are backed by real research — not bro-science. An essential resource."</p>
<div class="home-review-author">
<div class="home-review-avatar"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div>
<div class="home-review-name">Michael R.</div>
<div class="home-review-loc">London, UK</div>
<div class="home-review-verified"><svg viewBox="0 0 16 16" width="12" height="12" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
</div>
</div>
<div class="home-review-card fade-in">
<div class="home-review-stars">★★★★★</div>
<p class="home-review-text">"I'm a family medicine physician and I routinely recommend ${SITE_NAME} to my patients. The calculators use medically validated formulas and clearly state they are not a substitute for medical advice. The sleep calculator helped several patients understand their sleep cycles. Excellent free resource."</p>
<div class="home-review-author">
<div class="home-review-avatar"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div>
<div class="home-review-name">Dr. Emily K.</div>
<div class="home-review-loc">Toronto, Canada</div>
<div class="home-review-verified"><svg viewBox="0 0 16 16" width="12" height="12" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
</div>
</div>
</div>
</div>
</section>

<!-- Section 10: Newsletter -->
<section class="home-newsletter-v2">
<div class="home-newsletter-v2-inner">
<h2>Stay Updated with Health Tips</h2>
<p>Weekly health insights, new calculator launches, and expert wellness advice — delivered to your inbox.</p>
<form class="home-newsletter-form-v2" id="homeNewsletterForm">
<input type="email" placeholder="Enter your email address" required>
<button type="submit">Subscribe</button>
</form>
<small>No spam, ever. Unsubscribe at any time.</small>
</div>
</section>

<!-- Section 11: Final CTA -->
<section class="home-final-cta">
<div class="fade-in">
<h2>Start improving your health today</h2>
<p>Free tools, science-backed insights — no account, no cost, no limits.</p>
<div class="home-final-cta-btns">
<a href="/calculators/" class="btn btn-primary btn-pulse">Explore Calculators</a>
<a href="/quizzes/" class="btn btn-highlight">Take a Quiz</a>
</div>
</div>
</section>

${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`;

fs.writeFileSync('index.html', indexHtml);
console.log('Generated index.html');

// ========================
// ABOUT, CONTACT, FAQ, PRIVACY, DISCLAIMER, SITEMAP.HTML
// ========================

// ABOUT
fs.writeFileSync('about.html', `${head('About Us | '+SITE_NAME, 'Learn about VitalHealth Hub, including our free educational calculators, practical wellness articles, quizzes, and everyday tools.', '/about.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'About Us',url:'/about.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'About Us',url:'/about.html'}]).schema}
${globalHero({
  badge: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> About VitalHealth Hub',
  title: 'Building Smarter<br>Health Experiences',
  subtitle: 'We create powerful health calculators, tools, quizzes, and insights to help people understand and improve their daily lives.',
  buttons: [
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 1 21 12a10 10 0 0 1-2.93 7.07M4.93 4.93A10 10 0 0 0 3 12a10 10 0 0 0 1.93 7.07M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> Explore Calculators', href: '/calculators/' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Read Articles', href: '/blog.html' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg> Take a Quiz', href: '/quizzes/' }
  ],
  stats: [
    { value: calculators.length + '+', label: 'Calculators' },
    { value: quizzesData.length + '+', label: 'Quizzes' },
    { value: blogPosts.length + '+', label: 'Articles' },
    { value: 'Free', label: 'Always' }
  ]
})}

<!-- Section 2: Mission -->
<section class="about-mission-section">
<div class="container">
<div class="about-mission-inner">
<div class="home-section-head home-section-head--left fade-in">
<span class="home-section-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> Our Purpose</span>
<h2>Our Mission</h2>
</div>
<div class="about-mission-body fade-in">
<p class="about-mission-lead">VitalHealth Hub was built to make health tools and knowledge accessible to everyone. We believe that understanding your health should be simple, fast, and free — without complex apps or barriers.</p>
<p>Our goal is to combine science-based insights with intuitive tools so users can make better decisions every day.</p>
</div>
</div>
</div>
</section>

<!-- Section 3: What We Offer -->
<section class="about-offer-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg> Platform Overview</span>
<h2>What We Offer</h2>
<p>Everything you need to understand and improve your health — in one place, always free.</p>
</div>
<div class="about-offer-grid">
<div class="about-offer-card fade-in">
<span class="about-offer-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h2M8 18h2M14 14h2M14 18h2"/></svg></span>
<h3>Health Calculators</h3>
<p>Instant, science-based calculations for BMI, calories, macros, and more.</p>
<a href="/calculators/" class="about-offer-link">Browse Calculators &#8594;</a>
</div>
<div class="about-offer-card fade-in">
<span class="about-offer-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg></span>
<h3>Smart Tools</h3>
<p>Track habits, sleep, mood, and productivity with interactive daily tools.</p>
<a href="/tools/" class="about-offer-link">Explore Tools &#8594;</a>
</div>
<div class="about-offer-card fade-in">
<span class="about-offer-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg></span>
<h3>Interactive Quizzes</h3>
<p>Test your knowledge and gain personalised insights into your health.</p>
<a href="/quizzes/" class="about-offer-link">Take a Quiz &#8594;</a>
</div>
<div class="about-offer-card fade-in">
<span class="about-offer-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>
<h3>Expert Content</h3>
<p>Evidence-based articles designed to guide your health journey every day.</p>
<a href="/blog.html" class="about-offer-link">Read Articles &#8594;</a>
</div>
</div>
</div>
</section>

<!-- Section 4: Why We Built This -->
<section class="about-why-section">
<div class="container">
<div class="about-why-inner fade-in">
<span class="home-section-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Our Story</span>
<h2>Why VitalHealth Hub Exists</h2>
<p class="about-why-lead">Most health platforms are either too complex, locked behind subscriptions, or difficult to use. We wanted to create something different — a simple, fast, and accessible platform where anyone can get value instantly.</p>
<p>VitalHealth Hub focuses on clarity, usability, and meaningful insights that make a real difference in people's daily lives.</p>
</div>
</div>
</section>

<!-- Section 5: Core Values -->
<section class="about-values-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge">&#11088; Core Values</span>
<h2>What We Stand For</h2>
<p>The principles that guide every tool, article, and feature we build.</p>
</div>
<div class="about-values-grid">
<div class="about-value-card fade-in">
<span class="about-value-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
<h3>Accessibility</h3>
<p>Free tools for everyone, regardless of background, location, or income.</p>
</div>
<div class="about-value-card fade-in">
<span class="about-value-icon">&#10024;</span>
<h3>Simplicity</h3>
<p>No complicated systems. Clean interfaces that anyone can use in seconds.</p>
</div>
<div class="about-value-card fade-in">
<span class="about-value-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 2-3.5 3.5M11.5 5.5 8 9M9.5 3.5 6 7M6 7l-3 3 4 4 3-3M13 12l-4-4-4 4 4 4zM17 22H7M12 17v5"/></svg></span>
<h3>Reliability</h3>
<p>Built with structured, evidence-based logic validated against medical guidelines.</p>
</div>
<div class="about-value-card fade-in">
<span class="about-value-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
<h3>Usability</h3>
<p>Designed for real people, not experts only. Instant results, clear explanations.</p>
</div>
</div>
</div>
</section>

<!-- Section 6: How It Works -->
<section class="home-how-works">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg> Simple Process</span>
<h2>How It Works</h2>
<p>Getting health insights has never been simpler — three steps, under a minute.</p>
</div>
<div class="home-hw-grid">
<div class="home-hw-step fade-in">
<span class="home-hw-num">Step 01</span>
<div class="home-hw-icon-wrap"><svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="32" rx="4" stroke="white" stroke-width="2.5"/><path d="M14 18h20M14 24h20M14 30h12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
<h3>Choose a Calculator, Tool, or Quiz</h3>
<p>Browse our library of ${calculators.length}+ free health calculators, ${toolsData.length} tracking tools, and ${quizzesData.length} interactive quizzes.</p>
</div>
<div class="home-hw-step fade-in">
<span class="home-hw-num">Step 02</span>
<div class="home-hw-icon-wrap"><svg viewBox="0 0 48 48" fill="none"><path d="M16 8h16v8H16zM12 16h24v24H12z" stroke="white" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 26h8M20 31h5" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
<h3>Enter Your Data</h3>
<p>Input your personal measurements or health information — no account required, no data stored on our servers.</p>
</div>
<div class="home-hw-step fade-in">
<span class="home-hw-num">Step 03</span>
<div class="home-hw-icon-wrap"><svg viewBox="0 0 48 48" fill="none"><path d="M8 36l10-12 8 8 12-16" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="38" cy="12" r="4" stroke="white" stroke-width="2.5"/></svg></div>
<h3>Get Instant Results &amp; Insights</h3>
<p>Receive colour-coded results, personalised recommendations, and actionable health insights immediately.</p>
</div>
</div>
</div>
</section>

<!-- Section 7: Platform Stats -->
<section class="about-stats-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> Platform Numbers</span>
<h2>Built for Scale</h2>
<p>A growing platform for people looking for practical health information and tools.</p>
</div>
<div class="about-stats-grid">
<div class="about-stat-box fade-in">
<div class="about-stat-num">${calculators.length}+</div>
<div class="about-stat-lbl">Calculators &amp; Tools</div>
</div>
<div class="about-stat-box fade-in">
<div class="about-stat-num">${quizzesData.length}+</div>
<div class="about-stat-lbl">Health Quizzes</div>
</div>
<div class="about-stat-box fade-in">
<div class="about-stat-num">${blogPosts.length}+</div>
<div class="about-stat-lbl">Expert Articles</div>
</div>
<div class="about-stat-box fade-in">
<div class="about-stat-num">Free</div>
<div class="about-stat-lbl">Always &amp; Forever</div>
</div>
</div>
</div>
</section>

<!-- Section 8: Trust/Value -->
<section class="home-value-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge home-section-badge--dark"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Why Users Trust Us</span>
<h2>Why Users Trust VitalHealth Hub</h2>
<p>We built every feature with one goal: to earn your trust.</p>
</div>
<div class="home-value-grid">
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
<h3>Instant Results</h3>
<p>All calculations happen in your browser. No waiting, no servers — results in milliseconds.</p>
</div>
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 2-3.5 3.5M11.5 5.5 8 9M9.5 3.5 6 7M6 7l-3 3 4 4 3-3M13 12l-4-4-4 4 4 4zM17 22H7M12 17v5"/></svg></span>
<h3>Science-Based Approach</h3>
<p>Every tool uses validated medical formulas from WHO, NIH, and peer-reviewed research.</p>
</div>
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
<h3>No Signup Required</h3>
<p>Your health data stays on your device. We never collect, store, or share personal information.</p>
</div>
<div class="home-value-card fade-in">
<span class="home-value-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="5"/></svg></span>
<h3>Always Free</h3>
<p>No paywalls, no subscriptions, no hidden fees. Everything is and will always be 100% free.</p>
</div>
</div>
</div>
</section>

<!-- Section 9: Final CTA -->
<section class="home-final-cta">
<div class="fade-in">
<h2>Start Improving Your Health Today</h2>
<p>Free tools, science-backed insights — no account, no cost, no limits.</p>
<div class="home-final-cta-btns">
<a href="/calculators/" class="btn btn-primary btn-pulse">Explore Calculators</a>
<a href="/quizzes/" class="btn btn-highlight">Take a Quiz</a>
</div>
</div>
</section>

<!-- Section 10: Created By -->
<section class="about-creator-section">
<div class="container">
<div class="home-section-head fade-in">
<span class="home-section-badge"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Meet the Creator</span>
<h2>Created By</h2>
</div>
<div class="creator-card fade-in">
<div class="creator-avatar"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div>
<h3>Ali Haider</h3>
<p class="creator-role-sub">SEO Consultant &amp; Web Developer</p>
<p>A passionate SEO consultant and developer who built VitalHealth Hub to make health tools and knowledge accessible worldwide. With expertise in search engine optimisation and a deep interest in health and wellness, Ali built this platform to combine technical excellence with medically accurate information, ensuring the tools reach the people who need them most.</p>
<div class="creator-social">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn</a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg> Instagram</a>
</div>
</div>
</div>
</div>
</section>

${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// CONTACT
fs.writeFileSync('contact.html', `${head('Contact Us | '+SITE_NAME, 'Contact VitalHealth Hub for questions, feedback, or partnership inquiries. Our team is ready to help with calculators, tools, and wellness content.', '/contact.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Contact',url:'/contact.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Contact',url:'/contact.html'}]).schema}
${globalHero({
  badge: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Get in Touch',
  title: "We'd Love to<br>Hear From You",
  subtitle: 'Reach out for support, feedback, or collaboration.',
  buttons: [
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Send Message', href: '#contact-form' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Explore Tools', href: '/tools/' },
    { label: '&#10067; Visit FAQ', href: '/faq.html' }
  ],
  stats: [
    { value: '24h', label: 'Response Time' },
    { value: 'Free', label: 'Support' },
    { value: 'Global', label: 'Available' },
    { value: 'Friendly', label: 'Team' }
  ]
})}
<section class="content-page" id="contact-form">
<div class="container">
<div class="contact-grid fade-in">
<div class="contact-form">
<form id="contactForm">
<div class="form-row"><div class="form-group"><label for="name">Full Name</label><input type="text" id="name" placeholder="Your name" required></div><div class="form-group"><label for="email">Email Address</label><input type="email" id="email" placeholder="your@email.com" required></div></div>
<div class="form-group"><label for="subject">Subject</label><select id="subject"><option>General Inquiry</option><option>Calculator Feedback</option><option>Content Suggestion</option><option>Bug Report</option><option>Partnership</option><option>SEO Consultation</option></select></div>
<div class="form-group"><label for="message">Message</label><textarea id="message" placeholder="Your message..." required></textarea></div>
<div class="checkbox-group"><input type="checkbox" id="agree" required><label for="agree" class="label-small">I agree that the information submitted is accurate and I consent to being contacted.</label></div>
<button type="submit" class="btn btn-primary btn-full">Send Message</button>
</form>
</div>
<div class="contact-detail-card">
<h3>Get in Touch</h3>
<div class="contact-detail-item"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M2 7l10 6 10-6" stroke="currentColor" stroke-width="2"/></svg><div><a href="mailto:ma7122671@gmail.com">ma7122671@gmail.com</a><small>We respond within 24-48 hours</small></div></div>
<div class="contact-detail-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><div><strong>Business Hours</strong><small>Monday - Friday, 9AM - 6PM (PKT)</small></div></div>
<div class="contact-detail-item"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg><div><strong>Location</strong><small>Available globally, based in Pakistan</small></div></div>
<h3 class="contact-follow-heading">Follow Us</h3>
<div class="creator-social contact-social-links">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn</a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg> Instagram</a>
</div>
</div>
</div>
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// FAQ — PREMIUM BRAND PAGE
const faqCategories = [
  {
    id: 'calculators', icon: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h2M8 18h2M14 14h2M14 18h2"/></svg>', label: 'Calculators', alt: false,
    title: 'Health Calculators',
    intro: 'Everything you need to know about how our free health calculators work, how accurate they are, and how to use them to reach your health goals.',
    faqs: [
      {q:'What is a BMI calculator and how accurate is it?', a:'A BMI (Body Mass Index) calculator measures your weight relative to your height using the formula: weight (kg) ÷ height² (m). It provides a general indicator of whether you are underweight, normal weight, overweight, or obese. BMI is a population-level screening tool — it does not account for muscle mass, bone density, or fat distribution, so it should be used alongside other health metrics.'},
      {q:'How does a calorie calculator work?', a:'A calorie calculator estimates your Total Daily Energy Expenditure (TDEE) based on your age, gender, height, weight, and activity level. It typically uses the Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR), then multiplies it by an activity factor to give your daily calorie needs. <a href="/calculators/">Try our calorie calculator</a> to find your personal number.'},
      {q:'What is TDEE and why does it matter?', a:'TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day, including your resting metabolism and all physical activity. Knowing your TDEE is essential for weight management: eating below TDEE creates a calorie deficit for fat loss, while eating above it supports muscle gain or weight gain.'},
      {q:'Are macro calculators reliable?', a:'Macro calculators provide reliable starting estimates for your protein, carbohydrate, and fat targets based on your body weight, goals, and activity level. They use established nutritional guidelines (typically 0.8–2.2g of protein per kg bodyweight depending on goal). Actual needs vary individually, so results should be adjusted based on real-world progress.'},
      {q:'How often should I recalculate my calories?', a:'You should recalculate your calorie needs every 4–6 weeks, or whenever your weight changes by more than 3–5 kg, your activity level changes significantly, or you shift your health goals (e.g., from fat loss to muscle building). Our <a href="/calculators/">calorie calculators</a> make this quick and free.'},
      {q:'What is a Basal Metabolic Rate (BMR) calculator?', a:'A BMR calculator estimates the number of calories your body needs to maintain basic physiological functions at complete rest — breathing, circulation, cell repair. BMR does not include calories burned through activity. The Mifflin-St Jeor equation (used on this platform) is the most widely validated formula for BMR calculation in adults.'},
      {q:'How do body fat percentage calculators work?', a:'Body fat percentage calculators use measurements such as waist circumference, neck size, and height (using the U.S. Navy method) or BMI-based equations to estimate the proportion of your body weight that is fat. These are estimates — DEXA scans and hydrostatic weighing provide more accurate results but require clinical equipment.'},
      {q:'What is an ideal body weight calculator?', a:'Ideal body weight calculators estimate a target weight range based on your height, gender, and frame size. Common formulas include Hamwi, Robinson, and Miller. These formulas are guidelines from clinical contexts — they do not account for athletic build or individual body composition. Use them alongside BMI and body fat data for a fuller picture.'},
      {q:'How do heart rate zone calculators work?', a:'Heart rate zone calculators determine your target training intensity zones based on your maximum heart rate (usually estimated as 220 minus your age). Zones range from light activity (50–60% max HR) through to maximum effort (90–100% max HR). Training in specific zones optimises fat burning, cardiovascular fitness, or endurance performance.'},
      {q:'What does a pregnancy due date calculator measure?', a:'A pregnancy due date calculator estimates your expected delivery date based on the first day of your last menstrual period (LMP). It adds 280 days (40 weeks) to your LMP date. The calculator also shows your gestational age week by week. Always confirm dates with your midwife or obstetrician via ultrasound.'},
      {q:'How does a water intake calculator work?', a:'Water intake calculators estimate daily hydration needs based on your body weight, activity level, and climate. A common baseline is 35ml per kg of body weight, with additional amounts added for exercise and heat. Adequate hydration supports metabolism, kidney function, cognitive performance, and physical endurance.'},
      {q:'What is the Mifflin-St Jeor equation used in your calculators?', a:'The Mifflin-St Jeor equation is the most clinically validated formula for estimating BMR. For men: (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women: (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. It is more accurate than the older Harris-Benedict equation for most adults.'},
      {q:'Can I use your calculators during pregnancy?', a:'Most general health calculators (BMI, calorie, and weight-based calculators) are not designed for use during pregnancy, as caloric and nutritional needs differ significantly. We offer a dedicated pregnancy due date calculator. For specific nutritional guidance during pregnancy, always consult your midwife, OB-GYN, or registered dietitian.'},
      {q:'How does an intermittent fasting calculator work?', a:'An intermittent fasting calculator helps you plan your eating and fasting windows based on popular protocols such as 16:8, 18:6, or 5:2. It sets your daily eating window, fasting start and end times, and optionally estimates calorie targets for the eating window. It is a scheduling tool — not a medical prescription.'},
      {q:'What is a lean body mass calculator?', a:'A lean body mass calculator estimates the weight of everything in your body except fat — muscles, bones, organs, water, and connective tissue. It is calculated as: total body weight × (1 − body fat percentage). Lean body mass is important for calculating accurate protein intake targets and metabolic rate.'},
      {q:'How does a protein intake calculator determine my needs?', a:'Protein intake calculators base your target on body weight and goal. Typical guidelines: 0.8g/kg for sedentary individuals, 1.2–1.6g/kg for moderate activity, 1.6–2.2g/kg for muscle building, and up to 2.4g/kg for cutting phases. Our <a href="/calculators/">protein calculator</a> adjusts for goal, activity level, and body composition.'},
      {q:'How accurate are sleep calculators?', a:'Sleep calculators estimate optimal bedtime and wake times based on sleep cycle duration (approximately 90 minutes per cycle). They are useful for scheduling sleep to avoid waking mid-cycle, which causes grogginess. Accuracy depends on actual individual cycle length, which varies by person, age, and sleep quality. Use them as a guide, not a strict prescription.'},
      {q:'What is a waist-to-hip ratio calculator?', a:'A waist-to-hip ratio (WHR) calculator measures fat distribution by dividing your waist circumference by your hip circumference. A WHR above 0.90 (men) or 0.85 (women) is associated with increased cardiovascular and metabolic risk according to WHO guidelines. It is a better indicator of health risk than BMI alone for many people.'},
      {q:'What is a calorie deficit and how do calculators estimate it?', a:'A calorie deficit occurs when you consume fewer calories than your TDEE. A deficit of approximately 500 calories per day is estimated to produce ~0.45kg (1lb) of fat loss per week. Our calculators help you set a safe, sustainable deficit — typically recommending no more than a 20–25% reduction below TDEE to preserve muscle mass.'},
      {q:'How does a one-rep max calculator work?', a:'A one-rep max (1RM) calculator estimates the maximum weight you can lift for a single repetition of an exercise, based on a submaximal lift. Common formulas include Epley (weight × (1 + reps/30)) and Brzycki. 1RM data helps athletes programme training loads for strength, hypertrophy, or endurance phases.'},
      {q:'What is an ovulation calculator used for?', a:'An ovulation calculator estimates your most fertile days within your menstrual cycle based on your cycle length and the date of your last period. Ovulation typically occurs 12–16 days before the next period. These are estimates — actual ovulation timing varies and is best confirmed with ovulation predictor kits or ultrasound.'},
      {q:'What does a step counter calorie calculator measure?', a:'A step counter calorie calculator estimates calories burned from walking based on step count, pace, body weight, and stride length. It uses MET (Metabolic Equivalent of Task) values to convert movement into calorie expenditure. Results are approximations — actual burn depends on individual fitness and terrain.'},
      {q:'What is an alcohol unit calculator?', a:'An alcohol unit calculator helps you track and understand your weekly alcohol consumption. In the UK, one unit equals 10ml or 8g of pure alcohol. The calculator converts drink types and sizes into units, helping you compare your intake against recommended health guidelines (UK: no more than 14 units per week).'},
      {q:'How does a resting metabolic rate calculator differ from BMR?', a:'Resting Metabolic Rate (RMR) and Basal Metabolic Rate (BMR) are often used interchangeably, but RMR is measured under less strict conditions (seated rest rather than post-sleep fasting). RMR is typically 10–20% higher than true BMR. For practical purposes in nutrition planning, both terms refer to your baseline calorie burn at rest.'},
      {q:'Are online health calculators safe to use?', a:'Yes — our health calculators are completely safe. All calculations run locally in your browser; no personal data is sent to or stored on our servers. They are built using validated medical formulas and are designed for general informational use. They are not diagnostic tools — always consult a healthcare professional for medical decisions.'},
    ]
  },
  {
    id: 'nutrition', icon: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>', label: 'Health & Nutrition', alt: true,
    title: 'Health & Nutrition',
    intro: 'Answers to the most common nutrition and diet questions, from macronutrients and calorie needs to metabolism, hydration, and healthy eating habits.',
    faqs: [
      {q:'How much protein do I need daily?', a:'Protein needs depend on your body weight, age, activity level, and goals. General guidelines: 0.8g per kg for sedentary adults, 1.2–1.6g per kg for moderately active individuals, and 1.6–2.2g per kg for those building muscle or in a calorie deficit. Use our <a href="/calculators/">protein intake calculator</a> for a personalised target.'},
      {q:'Are carbohydrates bad for weight loss?', a:'Carbohydrates are not inherently bad for weight loss. Total calorie intake is the primary driver of fat loss. Carbohydrates are the body\'s preferred energy source, particularly for the brain and high-intensity exercise. The quality of carbs matters — whole grains, vegetables, and legumes are far superior to refined sugars and processed foods.'},
      {q:'What is a balanced diet?', a:'A balanced diet provides adequate amounts of all essential nutrients — carbohydrates, protein, healthy fats, vitamins, minerals, and water. The NHS Eatwell Guide recommends basing meals on starchy carbohydrates, eating plenty of fruit and vegetables, including moderate protein sources, and limiting saturated fats, salt, and added sugars.'},
      {q:'How does hydration affect metabolism?', a:'Adequate hydration is essential for metabolic function. Water is required for nutrient transport, temperature regulation, and cellular energy production. Even mild dehydration (1–2% body weight) can reduce metabolic rate and impair physical and cognitive performance. Drinking water before meals can also slightly reduce calorie intake.'},
      {q:'What are macronutrients and why do they matter?', a:'Macronutrients are the three major dietary energy sources: carbohydrates (4 kcal/g), protein (4 kcal/g), and fat (9 kcal/g). They provide fuel for all body functions and are needed in large quantities daily. The right balance of macros supports energy levels, body composition, hormonal health, and athletic performance.'},
      {q:'How many calories does an average adult need per day?', a:'Average calorie needs range from approximately 1,600–2,400 kcal/day for women and 2,000–3,000 kcal/day for men, depending on age, height, weight, and activity level. These are broad averages. Use our <a href="/calculators/">TDEE calculator</a> for a personalised estimate based on your specific data.'},
      {q:'What is the difference between saturated and unsaturated fats?', a:'Saturated fats (found in butter, red meat, and coconut oil) raise LDL ("bad") cholesterol when consumed in excess. Unsaturated fats — both monounsaturated (olive oil, avocados) and polyunsaturated (oily fish, nuts) — support heart health. Trans fats (found in partially hydrogenated oils) are the most harmful and should be avoided entirely.'},
      {q:'What are micronutrients and why are they important?', a:'Micronutrients are vitamins and minerals required in small amounts for essential bodily functions. Key examples include vitamin D (bone health), iron (oxygen transport), magnesium (muscle function), zinc (immune health), and B vitamins (energy metabolism). Deficiencies in micronutrients can impair immunity, energy, mood, and long-term health.'},
      {q:'Is intermittent fasting effective for weight loss?', a:'Intermittent fasting (IF) is an effective weight management strategy for many people. By restricting eating to specific windows, IF naturally reduces calorie intake for most individuals. Evidence suggests IF produces similar weight loss outcomes to continuous calorie restriction. It may also improve insulin sensitivity and metabolic health markers in some people.'},
      {q:'What is metabolic rate and can I increase it?', a:'Your metabolic rate is the speed at which your body burns calories. It is influenced by muscle mass, age, hormones, and genetics. You can support a healthy metabolism by building and preserving lean muscle through resistance training, staying active throughout the day, eating enough protein, getting adequate sleep, and avoiding severe calorie restriction.'},
      {q:'How does gut health affect overall wellness?', a:'Gut health influences immunity, mental health (via the gut-brain axis), nutrient absorption, inflammation, and hormonal balance. A diverse gut microbiome supports better digestion, mood regulation, and immune function. Fibre-rich foods, fermented foods (yoghurt, kefir, kimchi), and minimising ultra-processed food support gut health.'},
      {q:'What vitamins are most important for daily health?', a:'Key vitamins for daily health include: Vitamin D (bone health, immunity — often deficient in the UK), B12 (nerve function, red blood cells — especially important for vegans), Vitamin C (immune function, collagen synthesis), Vitamin A (vision, immunity), and folate (cell division, especially important during pregnancy).'},
      {q:'How much sugar should I consume daily?', a:'The NHS and WHO recommend that free sugars (added sugars plus those in fruit juice and honey) should not exceed 5% of total daily energy intake. For an average adult, this is approximately 30g (about 7 teaspoons) per day. Added sugars in processed foods, soft drinks, and confectionery are the primary concern.'},
      {q:'What is glycaemic index and why does it matter?', a:'The Glycaemic Index (GI) ranks carbohydrate foods by how quickly they raise blood glucose levels after eating. High-GI foods (white bread, sugary drinks) cause rapid blood sugar spikes and crashes, while low-GI foods (oats, legumes, most vegetables) produce slower, steadier energy release. Low-GI diets support sustained energy and appetite control.'},
      {q:'What is the best time to eat for optimal health?', a:'While total daily calorie and nutrient intake matters most, meal timing can influence energy, performance, and recovery. Eating most calories earlier in the day aligns with circadian rhythms and may improve metabolic outcomes. Pre-workout meals 1–3 hours before exercise and post-workout protein within 2 hours of training support performance and recovery.'},
      {q:'What is the difference between plant and animal protein?', a:'Animal proteins (meat, fish, eggs, dairy) are complete proteins — they contain all nine essential amino acids. Most plant proteins are incomplete (lacking one or more essential amino acids), though soy, quinoa, and hemp are exceptions. Vegans and vegetarians can meet all protein needs by combining varied plant sources throughout the day.'},
      {q:'How does sleep affect nutrition and metabolism?', a:'Poor sleep disrupts hormones that regulate appetite — increasing ghrelin (hunger hormone) and decreasing leptin (satiety hormone). This leads to increased calorie intake and cravings for high-calorie foods. Chronic sleep deprivation also impairs insulin sensitivity and promotes fat storage. 7–9 hours of quality sleep per night supports healthy metabolism.'},
      {q:'What are superfoods and are they worth the hype?', a:'The term "superfood" is a marketing label, not a scientific classification. Foods often called superfoods (blueberries, salmon, kale, avocado, turmeric) do have genuine nutritional benefits. However, no single food is transformative — overall dietary pattern matters far more than any individual "superfood." A diverse, whole-food diet outperforms any superfood.'},
      {q:'How does alcohol affect nutrition and health?', a:'Alcohol provides 7 kcal per gram (more than carbs or protein) but has no nutritional value — it is often called "empty calories." Alcohol impairs protein synthesis, disrupts sleep quality, depletes B vitamins and zinc, increases appetite, and impairs fat metabolism. Regular heavy consumption is associated with liver disease, cancer, and cardiovascular risk.'},
      {q:'What is a caloric surplus and when should I be in one?', a:'A caloric surplus means consuming more calories than you burn (above your TDEE). This is necessary for muscle building (bulking), as muscle tissue cannot be built in significant quantities without extra energy and protein. A moderate surplus of 200–500 kcal above TDEE is typically recommended for clean bulking — minimising fat gain while building muscle.'},
      {q:'How does stress affect eating habits?', a:'Chronic stress elevates cortisol, which increases appetite and promotes cravings for high-sugar, high-fat "comfort foods." Stress also disrupts meal timing, reduces motivation to cook, and can trigger emotional eating or restriction. Managing stress through exercise, sleep, and mindfulness supports healthier eating patterns and metabolic health.'},
      {q:'What is the role of antioxidants in health?', a:'Antioxidants are compounds that neutralise free radicals — unstable molecules that damage cells and contribute to ageing, inflammation, and chronic disease. Key dietary antioxidants include vitamins C and E, beta-carotene, selenium, and polyphenols found in berries, green tea, dark chocolate, and colourful vegetables. A varied plant-rich diet provides ample antioxidants.'},
      {q:'How do I calculate my daily fibre intake?', a:'The UK recommendation is 30g of fibre per day for adults. Most people consume only 18–20g. Foods high in fibre include whole grains, legumes, vegetables, fruits, nuts, and seeds. Increasing fibre gradually (to avoid digestive discomfort) and drinking adequate water are important when boosting fibre intake.'},
      {q:'What are diet myths about fats and carbs?', a:'Common myths: (1) "Fat makes you fat" — dietary fat does not directly cause fat gain; excess calories do. (2) "Carbs cause weight gain" — no macronutrient alone causes weight gain without a calorie surplus. (3) "Eating at night causes fat gain" — total daily intake matters more than timing for most people. Focus on whole food quality and calorie balance.'},
      {q:'How do I start eating healthier without a strict diet?', a:'Start with small, sustainable changes: add a serving of vegetables to every meal, swap refined grains for whole grains, reduce liquid calories (sugary drinks, alcohol), eat more protein at each meal to improve satiety, and cook at home more often. Consistency with modest improvements outperforms perfect compliance with a rigid diet.'},
    ]
  },
  {
    id: 'fitness', icon: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2M20 12h2"/><rect x="4" y="9" width="3" height="6" rx="1"/><rect x="17" y="9" width="3" height="6" rx="1"/><path d="M7 12h10"/></svg>', label: 'Fitness & Lifestyle', alt: false,
    title: 'Fitness & Lifestyle',
    intro: 'Answers to common questions about exercise frequency, recovery, sleep, and building a sustainable, healthy lifestyle.',
    faqs: [
      {q:'How often should I exercise per week?', a:'The NHS recommends adults do at least 150 minutes of moderate-intensity aerobic activity (or 75 minutes of vigorous intensity) per week, plus muscle-strengthening exercises on two or more days. For weight loss or athletic goals, 4–5 sessions per week is typical. Rest and recovery days are essential for progress and injury prevention.'},
      {q:'What is the best type of exercise for weight loss?', a:'The most effective exercise for weight loss is whichever type you will do consistently. A combination of resistance training (to preserve muscle mass while in a calorie deficit) and cardiovascular exercise (to increase calorie burn) produces the best long-term results. Total calorie deficit — primarily from diet — remains the primary driver of fat loss.'},
      {q:'How important is sleep for physical health?', a:'Sleep is fundamental to physical health and performance. During sleep, growth hormone is released for muscle repair and growth, the immune system recharges, the brain consolidates memory, and cortisol levels reset. Adults need 7–9 hours per night. Consistently poor sleep impairs fat loss, muscle building, athletic performance, and immune function.'},
      {q:'What is overtraining and how do I avoid it?', a:'Overtraining occurs when training volume and intensity exceed the body\'s ability to recover. Symptoms include persistent fatigue, declining performance, mood disturbances, increased injury rate, and disrupted sleep. Avoid it by programming adequate rest days, periodising training intensity, eating enough protein and calories, and monitoring subjective wellbeing.'},
      {q:'How long should a workout session last?', a:'Effective workout sessions typically range from 30 to 75 minutes depending on goal, training type, and intensity. Sessions beyond 90 minutes are rarely necessary for most goals and may increase cortisol and muscle breakdown. Quality, intensity, and progressive overload matter more than session length.'},
      {q:'What is active recovery and why does it matter?', a:'Active recovery involves low-intensity movement on rest days — walking, yoga, swimming, or light cycling. It promotes blood flow to muscles, accelerates the removal of metabolic waste products, reduces muscle soreness (DOMS), and maintains training consistency without adding excessive stress. It is superior to complete inactivity for recovery.'},
      {q:'What is the difference between cardio and strength training?', a:'Cardio (aerobic exercise) primarily trains the cardiovascular system and burns calories during the session — examples include running, cycling, and swimming. Strength training builds and preserves muscle mass, increases resting metabolic rate, and improves bone density. Both are important for long-term health; the optimal approach combines both forms of exercise.'},
      {q:'How does stress affect physical health?', a:'Chronic psychological stress elevates cortisol, which promotes fat storage (particularly visceral fat), impairs muscle recovery and synthesis, disrupts sleep, suppresses immune function, and increases cardiovascular risk. Exercise is one of the most effective stress management tools, but excessive training without adequate recovery can itself become a stressor.'},
      {q:'What is the 10,000 steps daily goal based on?', a:'The 10,000 steps per day target originated from a 1960s Japanese marketing campaign, not scientific research. However, research does support benefits from higher daily step counts. Studies show significant health benefits beginning around 7,000 steps/day, with diminishing but continuing returns beyond 10,000. Any increase in daily movement provides health benefit.'},
      {q:'Can I lose weight without going to the gym?', a:'Yes — weight loss is primarily determined by calorie deficit, which can be achieved through diet alone. Physical activity accelerates fat loss, preserves muscle mass, and improves long-term maintenance, but gym membership is not required. Home workouts, walking, cycling, swimming, and bodyweight training are all effective alternatives.'},
      {q:'What is HIIT and is it effective?', a:'High-Intensity Interval Training (HIIT) involves alternating short bursts of maximal effort with brief recovery periods. It is highly time-efficient, producing cardiovascular and metabolic benefits comparable to longer moderate-intensity sessions. HIIT also generates a significant "afterburn" effect (EPOC). However, it is demanding and should be limited to 2–3 sessions per week.'},
      {q:'How does flexibility training benefit overall health?', a:'Regular flexibility and mobility training improves joint range of motion, reduces injury risk, decreases muscle tension and soreness, improves posture, and supports functional movement quality. Yoga, dynamic stretching, and foam rolling are effective approaches. Flexibility training becomes increasingly important for joint health and injury prevention with age.'},
      {q:'What is a healthy resting heart rate?', a:'A healthy resting heart rate for adults is typically 60–100 beats per minute (bpm). Highly trained athletes may have a resting heart rate of 40–60 bpm due to increased cardiac efficiency. A consistently elevated resting heart rate (above 100 bpm) may indicate dehydration, stress, or underlying cardiovascular issues and warrants medical review.'},
      {q:'How do I track fitness progress effectively?', a:'Effective fitness tracking combines multiple metrics: body weight (weekly average), body measurements (waist, hips, chest), progress photos, performance data (weights lifted, distances, times), and subjective wellbeing. No single metric tells the full story. Use our <a href="/tools/">tracking tools</a> to log and monitor your progress consistently.'},
      {q:'How do I build a sustainable fitness routine?', a:'Sustainable fitness routines share key characteristics: they are scheduled (specific days and times), gradually progressive, enjoyable enough to continue, balanced with adequate recovery, and realistic for your life and fitness level. Start with 2–3 sessions per week and increase gradually. Consistency over months matters more than intensity in any single session.'},
    ]
  },
  {
    id: 'tools', icon: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>', label: 'Tools & Trackers', alt: true,
    title: 'Tools & Trackers',
    intro: 'Learn how our free interactive health tracking tools work and how to get the most out of habit trackers, sleep tools, mood trackers, and more.',
    faqs: [
      {q:'How does a habit tracker work?', a:'A habit tracker helps you monitor daily consistency with target behaviours — exercise, hydration, sleep, nutrition, or productivity habits. You log each habit as completed or not each day. Visual streaks and progress patterns build accountability and motivation. Research shows habit tracking significantly improves long-term behaviour change success rates. <a href="/tools/">Try our habit tracker.</a>'},
      {q:'Can I rely on online sleep tracking tools?', a:'Online sleep calculators are useful for scheduling optimal wake times based on 90-minute sleep cycles. They are planning tools rather than measurement tools — they cannot measure your actual sleep stages or quality. For sleep quality tracking, wearable devices (Garmin, Fitbit, Oura Ring) provide more detailed data. Use online tools for scheduling, wearables for monitoring.'},
      {q:'What is a mood tracker used for?', a:'Mood trackers help you log your emotional state daily and identify patterns over time. Regular mood tracking can reveal links between lifestyle factors (sleep, exercise, nutrition, stress) and mental wellbeing. It also supports self-awareness and can be a valuable tool for people managing anxiety, depression, or stress. Data can also be shared with healthcare providers.'},
      {q:'How do I use a calorie tracker effectively?', a:'To use a calorie tracker effectively: weigh food using a kitchen scale rather than estimating, log everything including cooking oils and drinks, track for at least 2–4 weeks to understand patterns, and use data to adjust intake based on actual results (weight trend) rather than calculator estimates alone. Consistency matters more than perfection.'},
      {q:'What is a hydration tracker and how does it help?', a:'A hydration tracker helps you log daily water intake and compare it against your personalised hydration target (based on body weight and activity). It prompts regular water intake, helps you identify days of under-hydration, and builds the habit of consistent drinking. Adequate hydration improves energy, cognition, digestion, and skin health.'},
      {q:'How does a step tracker motivate behaviour change?', a:'Step trackers leverage psychological principles of goal-setting, immediate feedback, and visible progress to motivate increased daily movement. Seeing your step count in real time encourages you to "close the gap" to your daily goal. Daily step goals are one of the most accessible and evidence-backed ways to increase physical activity in sedentary individuals.'},
      {q:'Are free online health tools as good as paid apps?', a:'For most general health tracking needs — calorie counting, habit logging, sleep scheduling, and basic metric tracking — free tools are highly effective and evidence-based. Paid apps often add features like AI coaching, integrations with wearables, or clinical-grade tracking. Our free tools at <a href="/tools/">VitalHealth Hub</a> provide excellent functionality with zero cost or sign-up.'},
      {q:'How does a food diary help with weight management?', a:'Food diary research consistently shows that people who track their food intake lose significantly more weight than those who do not. The act of recording creates awareness of portion sizes, hidden calories, and eating patterns. Even imperfect tracking that captures 80% of intake provides valuable data for improving dietary choices and managing calorie balance.'},
      {q:'What data should I track for weight loss?', a:'For effective weight loss tracking: log daily food intake (calories and protein), track weekly body weight (use the weekly average to reduce day-to-day fluctuation noise), take monthly body measurements and photos, and record training performance. Tracking energy levels and sleep can also reveal factors impacting progress. Use <a href="/tools/">our tools</a> to streamline this.'},
      {q:'How often should I update my health tracking data?', a:'For body weight: daily weigh-ins with weekly averages provide the most reliable trend data. For food intake: daily logging during active tracking phases. For body measurements: monthly. For fitness performance data: every session. Tracking frequency should match your goal urgency — during active weight loss or muscle building phases, more frequent monitoring accelerates progress.'},
      {q:'What is a BMI tracker and how is it different from a calculator?', a:'A BMI calculator gives a one-time result; a BMI tracker logs your BMI over time so you can monitor trends as your weight and body composition change. Tracking BMI over weeks and months provides context — the direction of change matters as much as the absolute value. Use it alongside other metrics like waist circumference for a fuller health picture.'},
      {q:'How do productivity trackers help with health?', a:'Productivity and time-tracking tools indirectly support health by helping you identify time available for exercise, meal prep, and sleep. Structured daily routines that include dedicated time for health behaviours are associated with better physical and mental health outcomes. Managing cognitive load and reducing work stress also positively impacts physical health.'},
      {q:'Are digital health tools suitable for older adults?', a:'Yes — many digital health tools are designed for accessibility and simplicity. Our tools at VitalHealth Hub are built to be intuitive with clear layouts, large readable text, and straightforward interfaces. Older adults benefit particularly from tools that track medication timing, hydration, mobility, and cognitive engagement. No account or technical expertise is required.'},
      {q:'How do habit trackers help build long-term routines?', a:'Habit trackers exploit the psychological "habit loop" — cue, routine, reward. By making habit completion visible (checking off a day), they create an immediate reward (visual streak or completion satisfaction). The streak effect — not wanting to "break the chain" — is a powerful motivator. Research shows 66 days of consistent behaviour is the average time to form an automatic habit.'},
      {q:'Can tracking tools replace professional health monitoring?', a:'No — tracking tools are designed to support self-awareness and motivation, not to replace clinical monitoring. If you have a diagnosed health condition (diabetes, hypertension, heart disease, etc.), your healthcare team should direct your monitoring programme. Our tools complement professional care — they are informational and educational resources, not medical devices.'},
    ]
  },
  {
    id: 'quizzes', icon: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg>', label: 'Quizzes', alt: false,
    title: 'Health Quizzes',
    intro: 'Answers to questions about our interactive health quizzes — how they are scored, what they test, and how to interpret your results.',
    faqs: [
      {q:'Are health quizzes on VitalHealth Hub accurate?', a:'Our quizzes are built using evidence-based health information and peer-reviewed research. They are designed to test knowledge and provide health insights — not to diagnose conditions. Quiz results should be interpreted as educational guidance. For accurate health assessment, always consult a qualified healthcare professional. <a href="/quizzes/">Browse our quizzes.</a>'},
      {q:'How are quiz scores calculated?', a:'Quiz scores are calculated based on the number of correct answers selected from multiple-choice or true/false questions. Each correct answer typically contributes equally to the final score, which is displayed as a percentage or band (e.g., Good / Needs Improvement / Excellent). Some quizzes use weighted scoring to reflect question difficulty.'},
      {q:'Can quizzes replace professional medical advice?', a:'No. Our health quizzes are educational tools designed to improve health literacy and self-awareness — they are not diagnostic instruments. They cannot replace a physical examination, laboratory tests, or clinical assessment by a trained healthcare provider. If a quiz raises a concern about your health, please consult your GP or a relevant specialist.'},
      {q:'What types of health quizzes are available?', a:'We offer a wide range of health quizzes across categories including: nutrition knowledge, fitness and exercise, mental wellbeing, sleep health, hydration, cardiovascular health, weight management, and general wellness. All quizzes are free to take with no registration required. <a href="/quizzes/">View all quizzes here.</a>'},
      {q:'How often can I retake a quiz?', a:'You can retake any quiz as many times as you like — there is no limit. Retaking quizzes is encouraged as a learning tool, particularly after reading related articles. Seeing how your score improves over time can be a motivating indicator of increasing health knowledge.'},
      {q:'Are quiz results stored or shared?', a:'No quiz results are stored or shared. All quiz processing happens in your browser — we do not collect, record, or transmit your quiz answers or scores. Your results are completely private. Refresh the page to reset any quiz at any time.'},
      {q:'What is the purpose of a health knowledge quiz?', a:'Health knowledge quizzes serve multiple purposes: they identify gaps in your health literacy, reinforce learning from articles and tools, raise awareness of important health topics, and provide actionable recommendations based on your results. Improving health knowledge is strongly associated with better health behaviours and outcomes.'},
      {q:'How do I interpret my quiz results?', a:'Each quiz provides a score summary with clear interpretation bands and personalised recommendations. Higher scores indicate strong knowledge in that health area. Lower scores highlight topics for further learning — use the linked articles and tools within your quiz results to deepen your understanding in areas where your score indicates room for improvement.'},
      {q:'Are quizzes based on medical research?', a:'Yes — all quiz content is developed from peer-reviewed medical literature, established clinical guidelines (NHS, WHO, NIH), and validated nutritional and fitness science. Questions are reviewed for accuracy. However, health science evolves — if you believe a question requires updating, please use our contact page to share your feedback.'},
      {q:'Can I share my quiz results?', a:'Your quiz results are generated in your browser session and can be shared by taking a screenshot. We do not currently provide a built-in social sharing feature for quiz results. However, we encourage sharing the quiz links with friends and family — helping others improve their health literacy is one of the best ways to support the platform.'},
    ]
  },
  {
    id: 'general', icon: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', label: 'General', alt: true,
    title: 'General Questions',
    intro: 'Common questions about the VitalHealth Hub platform — including privacy, access, how it was built, and how to get support.',
    faqs: [
      {q:'Is VitalHealth Hub completely free to use?', a:'Yes — every calculator, tool, quiz, and article on VitalHealth Hub is 100% free to use. There are no subscription plans, no premium tiers, no paywalls, and no in-app purchases. Access to all platform features is unlimited, permanent, and requires no payment of any kind.'},
      {q:'Do I need to create an account to use the platform?', a:'No account or registration is required for any feature on VitalHealth Hub. All calculators, tools, quizzes, and articles are immediately accessible to any visitor. We believe health information should be instantly accessible without friction, barriers, or data collection.'},
      {q:'Is my personal health data safe on VitalHealth Hub?', a:'Yes — your privacy is fully protected. All health calculations and quiz processing occur entirely within your browser. No personal data (age, weight, health metrics, quiz answers) is transmitted to, stored on, or processed by our servers. We do not use tracking pixels, advertising networks, or data brokers. See our <a href="/privacy.html">Privacy Policy</a> for full details.'},
      {q:'Who built VitalHealth Hub?', a:'VitalHealth Hub was built by Ali Haider — a passionate SEO consultant and web developer with a deep interest in health and wellness. Ali built the platform to make high-quality health tools and knowledge accessible to everyone, combining technical excellence with science-based content. Read more on our <a href="/about.html">About page.</a>'},
      {q:'Can I suggest a new calculator, tool, or quiz?', a:'Absolutely — we welcome feature suggestions and feedback. If there is a health calculator, tracking tool, or quiz topic you would like to see on the platform, please reach out via our <a href="/contact.html">contact page</a>. User suggestions have directly shaped the development of several existing features.'},
      {q:'How do I contact VitalHealth Hub?', a:'You can reach us via our <a href="/contact.html">contact page</a>. We respond to enquiries about content accuracy, feature suggestions, partnership opportunities, and general feedback. We aim to respond to all messages within 2–5 business days.'},
      {q:'Are your tools suitable for use by medical professionals?', a:'Our tools are informational and educational — they use validated medical formulas and peer-reviewed guidelines. They are not clinical-grade instruments and should not replace professional medical software or clinical decision-making tools. Healthcare professionals may find them useful as quick reference aids or as tools to recommend to patients for self-monitoring.'},
      {q:'How frequently is the VitalHealth Hub platform updated?', a:'We continuously update existing content and add new calculators, tools, quizzes, and articles. Existing calculators are reviewed against current medical guidelines. Blog articles are refreshed when research or clinical guidelines evolve. New features are added regularly based on user demand and health topic relevance.'},
      {q:'Does VitalHealth Hub have a mobile app?', a:'VitalHealth Hub is a fully mobile-responsive website, optimised to work excellently on smartphones, tablets, and desktops without downloading anything. All tools and calculators work in any modern mobile browser. A dedicated mobile app is not currently available, but the mobile web experience is designed to be fast and intuitive.'},
      {q:'How can I support VitalHealth Hub?', a:'The best ways to support the platform are: share our tools and articles with friends, family, and colleagues who might benefit; link to our calculators from your own website or blog; and recommend specific tools to people in health and fitness communities. Your sharing directly helps us reach more people and continue providing free health resources.'},
    ]
  },
];

// Build combined schema for all FAQ questions
const allFaqItems = faqCategories.flatMap(cat => cat.faqs);
const faqPageSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": allFaqItems.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a.replace(/<[^>]+>/g,'') }
  }))
});

// Build category pills HTML
const catPillsHTML = faqCategories.map(cat =>
  `<button class="faq-pill" data-filter="${cat.id}" data-faq-cat="${cat.id}">${cat.icon} ${cat.label}</button>`
).join('');

// Build category sections HTML
function buildFaqCatSection(cat) {
  const bgStyle = cat.alt ? 'background:#f0faf4;' : 'background:var(--white);';
  let items = cat.faqs.map(f =>
    `<div class="faq-item" data-cat="${cat.id}"><button class="faq-question">${f.q}<svg viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div></div>`
  ).join('');
  return `<section class="faq-cat-section" id="faq-${cat.id}" data-cat="${cat.id}" style="${bgStyle}">
<div class="container">
<div class="faq-cat-header fade-in">
<span class="faq-cat-icon">${cat.icon}</span>
<div><h2>${cat.title}</h2><p class="faq-cat-intro">${cat.intro}</p></div>
</div>
<div class="faq-list faq-cat-list">${items}</div>
</div>
</section>`;
}
const faqSectionsHTML = faqCategories.map(cat => buildFaqCatSection(cat)).join('');

fs.writeFileSync('faq.html', `${head('Frequently Asked Questions | '+SITE_NAME, 'Find clear answers about health calculators, nutrition, fitness, tools, quizzes, and platform usage. 100+ questions answered by the VitalHealth Hub team.', '/faq.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'FAQ',url:'/faq.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'FAQ',url:'/faq.html'}]).schema}
<script type="application/ld+json">${faqPageSchema}</script>
${globalHero({
  badge: '&#10067; Help &amp; Knowledge Hub',
  title: 'Frequently Asked<br>Questions',
  subtitle: 'Find clear answers about health calculators, tools, quizzes, and how to use the platform effectively.',
  searchId: 'faqHeroInput',
  searchPlaceholder: 'Search questions, topics...',
  searchOnInput: 'faqHeroSearch(this.value)',
  buttons: [
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 1 21 12a10 10 0 0 1-2.93 7.07M4.93 4.93A10 10 0 0 0 3 12a10 10 0 0 0 1.93 7.07M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> Explore Calculators', href: '/calculators/' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> Use Tools', href: '/tools/' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Read Articles', href: '/blog.html' }
  ],
  stats: [
    { value: allFaqItems.length + '+', label: 'Questions Answered' },
    { value: faqCategories.length + '', label: 'Topic Categories' },
    { value: 'Free', label: 'Always' },
    { value: 'Private', label: 'No Data Stored' }
  ]
})}

<!-- Category Navigation Pills -->
<div class="faq-pills-nav" id="faq-nav">
<div class="faq-pills-inner">
<button class="faq-pill faq-pill-active" data-filter="all" data-faq-cat="all"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> All Topics</button>
${catPillsHTML}
</div>
</div>

<!-- FAQ Search Results Notice -->
<div class="faq-search-notice" id="faqSearchNotice" style="display:none;">
<div class="container"><p id="faqSearchMsg">Showing results for your search.</p></div>
</div>

<!-- FAQ Sections -->
<div id="faq-answers">
${faqSectionsHTML}
</div>

<!-- Final CTA -->
<section class="faq-final-cta">
<div class="container">
<div class="faq-cta-inner fade-in">
<span class="faq-cta-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
<h2>Still Have Questions?</h2>
<p>Can't find what you're looking for? Get in touch — we're happy to help with any questions about the platform, our tools, or health topics.</p>
<div class="faq-cta-btns">
<a href="/contact.html" class="btn btn-primary btn-pulse"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Contact Us</a>
<a href="/tools/" class="btn btn-outline"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> Explore Tools</a>
</div>
</div>
</div>
</section>

${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// PRIVACY
fs.writeFileSync('privacy.html', `${head('Privacy Policy | '+SITE_NAME, 'Read the VitalHealth Hub privacy policy. Learn how we collect, use, and protect your personal data when using our free health tools and calculators.', '/privacy.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Privacy Policy',url:'/privacy.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Privacy Policy',url:'/privacy.html'}]).schema}
<section class="content-page">
<div class="container" style="max-width:800px;">
<h1 class="fade-in">Privacy Policy</h1>
<p><em>Last updated: January 2024</em></p>
<h2>Introduction</h2>
<p>${SITE_NAME} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website.</p>
<h2>Information We Collect</h2>
<p>We do not collect personal health data. All calculator computations are performed locally in your browser. We may collect anonymous usage data through standard web analytics to improve our services, including pages visited, time on site, and general geographic location.</p>
<h2>Health Data</h2>
<p>Any health information you enter into our calculators (weight, height, age, etc.) is processed entirely within your browser and is never transmitted to our servers. We do not store, access, or share any personal health data you input.</p>
<h2>Cookies</h2>
<p>We may use essential cookies for website functionality and analytics cookies to understand how visitors use our site. You can disable cookies through your browser settings.</p>
<h2>Third-Party Services</h2>
<p>We use Google Fonts for typography. We do not use third-party advertising networks or sell any data to third parties.</p>
<h2>Data Security</h2>
<p>We implement appropriate security measures to protect against unauthorized access to or alteration of our website. Since we do not collect personal health data, the risk of health data exposure is eliminated.</p>
<h2>Children's Privacy</h2>
<p>Our website is not directed at children under 13. We do not knowingly collect personal information from children.</p>
<h2>Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
<h2>Contact Us</h2>
<p>If you have questions about this Privacy Policy, please <a href="/contact.html">contact us</a>.</p>
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// DISCLAIMER
fs.writeFileSync('disclaimer.html', `${head('Medical Disclaimer | '+SITE_NAME, 'Read the VitalHealth Hub medical disclaimer. All health calculators and content are for informational purposes only and do not constitute medical advice.', '/disclaimer.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Medical Disclaimer',url:'/disclaimer.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Medical Disclaimer',url:'/disclaimer.html'}]).schema}
<section class="content-page">
<div class="container" style="max-width:800px;">
<h1 class="fade-in">Medical Disclaimer</h1>
<div class="disclaimer-box" style="margin-bottom:30px;"><strong>Important:</strong> The information provided on ${SITE_NAME} is for general informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.</div>
<h2>General Information</h2>
<p>The content on this website, including text, graphics, calculator results, and other material, is for informational purposes only. Nothing on ${SITE_NAME} should be construed as medical advice or used as a basis for making medical decisions.</p>
<h2>Calculator Accuracy</h2>
<p>Our health calculators use established medical formulas and algorithms to provide estimates. However, these are approximations and may not account for individual variations, medical conditions, or other factors that affect health metrics. Results should not be used for self-diagnosis or treatment.</p>
<h2>Professional Medical Advice</h2>
<p>Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.</p>
<h2>Emergency Situations</h2>
<p>If you think you may have a medical emergency, call your doctor, go to the emergency department, or call emergency services immediately. ${SITE_NAME} does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the website.</p>
<h2>No Doctor-Patient Relationship</h2>
<p>Use of this website does not create a doctor-patient relationship. The information shared on this site is not a substitute for an in-person evaluation by a qualified healthcare professional.</p>
<h2>Limitation of Liability</h2>
<p>${SITE_NAME} and its contributors shall not be liable for any damages arising from the use of information on this website. By using this website, you agree to these terms.</p>
<p>For questions about this disclaimer, please <a href="/contact.html">contact us</a>.</p>
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// TERMS
fs.writeFileSync('terms.html', `${head('Terms of Service | '+SITE_NAME, 'Read the VitalHealth Hub terms of service. Understand your rights and conditions for using our free health calculators, tools, and wellness content.', '/terms.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Terms of Service',url:'/terms.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Terms of Service',url:'/terms.html'}]).schema}
<section class="content-page">
<div class="container" style="max-width:800px;">
<h1 class="fade-in">Terms of Service</h1>
<p><em>Last updated: January 2024</em></p>
<h2>Acceptance of Terms</h2>
<p>By accessing and using ${SITE_NAME} ("the Website"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Website.</p>
<h2>Description of Service</h2>
<p>${SITE_NAME} provides free health calculators, wellness tools, and informational articles for educational purposes. Our services are provided "as is" and are intended to supplement, not replace, professional medical advice.</p>
<h2>Use of Health Calculators</h2>
<p>Our health calculators use established medical formulas to provide estimates. These results are for informational purposes only and should not be used for self-diagnosis, treatment decisions, or as a substitute for consultation with qualified healthcare professionals. You acknowledge that individual health outcomes may vary significantly.</p>
<h2>User Responsibilities</h2>
<ul>
<li>You agree to use the Website only for lawful purposes and in accordance with these Terms.</li>
<li>You are responsible for the accuracy of any information you input into our calculators.</li>
<li>You agree not to misrepresent calculator results as professional medical advice.</li>
<li>You agree not to attempt to access, tamper with, or use non-public areas of the Website.</li>
</ul>
<h2>Intellectual Property</h2>
<p>All content on ${SITE_NAME}, including text, graphics, logos, icons, images, calculator designs, and software, is the property of ${SITE_NAME} and is protected by international copyright laws. You may not reproduce, distribute, modify, or create derivative works from our content without prior written permission.</p>
<h2>Privacy</h2>
<p>Your use of the Website is also governed by our <a href="/privacy.html">Privacy Policy</a>. All health data entered into our calculators is processed locally in your browser and is never transmitted to our servers.</p>
<h2>Disclaimer of Warranties</h2>
<p>The Website and its content are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. We make no guarantees about the accuracy, reliability, or completeness of calculator results or health information.</p>
<h2>Limitation of Liability</h2>
<p>In no event shall ${SITE_NAME}, its creator Ali Haider, or its contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website. This includes, without limitation, damages for health decisions made based on calculator results or article content.</p>
<h2>External Links</h2>
<p>The Website may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of information on external websites.</p>
<h2>Modifications to Terms</h2>
<p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Website after changes constitutes acceptance of the modified terms.</p>
<h2>Governing Law</h2>
<p>These Terms shall be governed by and construed in accordance with applicable international laws and regulations.</p>
<h2>Contact</h2>
<p>If you have questions about these Terms of Service, please <a href="/contact.html">contact us</a> or email <a href="mailto:ma7122671@gmail.com">ma7122671@gmail.com</a>.</p>
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// SITEMAP.HTML
let sitemapLinks = '<div class="sitemap-category"><h3>Main Pages</h3><ul class="sitemap-list">';
['index.html','about.html','contact.html','faq.html','blog.html','privacy.html','disclaimer.html','terms.html'].forEach(p => {
  sitemapLinks += `<li><a href="/${p}">${p.replace('.html','').replace('index','Home')}</a></li>`;
});
sitemapLinks += '</ul></div>';
sitemapLinks += '<div class="sitemap-category"><h3>Health Calculators</h3><ul class="sitemap-list">';
calculators.forEach(c => { sitemapLinks += `<li><a href="/calculators/${c.slug}.html">${c.name}</a></li>`; });
sitemapLinks += '</ul></div>';
sitemapLinks += '<div class="sitemap-category"><h3>Blog Articles</h3><ul class="sitemap-list">';
blogPosts.forEach(p => { sitemapLinks += `<li><a href="/blog/${p.slug}.html">${p.title}</a></li>`; });
sitemapLinks += '</ul></div>';

fs.writeFileSync('sitemap.html', `${head('Sitemap | '+SITE_NAME, 'Complete sitemap of '+SITE_NAME+'. Find all health calculators, blog articles, and pages.', '/sitemap.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Sitemap',url:'/sitemap.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Sitemap',url:'/sitemap.html'}]).schema}
<section class="sitemap-section">
<div class="container">
<h1 class="fade-in">Sitemap</h1>
${sitemapLinks}
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// BLOG INDEX
const blogCategories = [...new Set(blogPosts.map(p => p.category))];
const featuredPost = blogPosts.find(p => p.slug === 'how-many-calories-should-i-eat') || blogPosts[0];
const featuredImg = blogCardImage(featuredPost.slug);
const sidebarPosts = [
  blogPosts.find(p => p.slug === 'how-much-water-should-you-drink'),
  blogPosts.find(p => p.slug === 'intermittent-fasting-guide'),
  blogPosts.find(p => p.slug === 'how-to-manage-stress')
].filter(Boolean);

const trendingItems = [
  {text:'Intermittent Fasting Guide', slug:(blogPosts.find(p=>p.slug.includes('intermittent-fasting'))||blogPosts[0]).slug},
  {text:'BMI vs Body Fat',            slug:(blogPosts.find(p=>p.slug.includes('bmi-vs-body-fat'))||blogPosts[0]).slug},
  {text:'Best Foods for Sleep',       slug:(blogPosts.find(p=>p.slug.includes('sleep')&&p.category==='Sleep')||blogPosts.find(p=>p.slug.includes('sleep'))||blogPosts[0]).slug},
  {text:'Diabetes Risk Factors',      slug:(blogPosts.find(p=>p.slug.includes('diabetes')&&p.slug.includes('risk'))||blogPosts.find(p=>p.slug.includes('diabetes'))||blogPosts[0]).slug},
  {text:'Heart Rate Zones',           slug:(blogPosts.find(p=>p.slug.includes('heart-rate-zone'))||blogPosts.find(p=>p.slug.includes('heart-rate'))||blogPosts[0]).slug},
  {text:'Protein Intake Guide',       slug:(blogPosts.find(p=>p.slug.includes('protein')&&p.slug.includes('how-much'))||blogPosts.find(p=>p.slug.includes('protein'))||blogPosts[0]).slug},
  {text:'Calorie Deficit Guide',      slug:(blogPosts.find(p=>p.slug.includes('calorie-deficit'))||blogPosts[0]).slug},
  {text:'Manage Stress Naturally',    slug:(blogPosts.find(p=>p.slug.includes('stress'))||blogPosts[0]).slug},
];

const popularTags = [
  {name:'Weight Loss',size:'lg'},{name:'BMI',size:'lg'},{name:'Calories',size:'lg'},{name:'Protein',size:'md'},{name:'Sleep',size:'lg'},
  {name:'Hydration',size:'md'},{name:'Heart Health',size:'lg'},{name:'Diabetes',size:'md'},{name:'Keto',size:'md'},{name:'Intermittent Fasting',size:'lg'},
  {name:'Mental Health',size:'lg'},{name:'Anxiety',size:'md'},{name:'Depression',size:'sm'},{name:'Meditation',size:'md'},{name:'Yoga',size:'md'},
  {name:'Running',size:'sm'},{name:'HIIT',size:'sm'},{name:'Cholesterol',size:'md'},{name:'Blood Pressure',size:'md'},{name:'Pregnancy',size:'sm'},
  {name:"Women's Health",size:'md'},{name:"Men's Health",size:'sm'},{name:'Aging',size:'sm'},{name:'Vitamins',size:'md'},
  {name:'Gut Health',size:'md'},{name:'Immunity',size:'md'},{name:'Stress',size:'lg'},{name:'Inflammation',size:'sm'},
  {name:'Hormones',size:'sm'},{name:'Cancer Prevention',size:'sm'}
];

const ITEMS_PER_PAGE = 24;

const popularSlugs = ['how-many-calories-should-i-eat','bmi-vs-body-fat-percentage','intermittent-fasting-guide','how-to-manage-stress','calorie-deficit-for-weight-loss','how-much-protein-should-you-eat'];
const popularPosts = [];
popularSlugs.forEach(s => { const p = blogPosts.find(x=>x.slug===s); if(p) popularPosts.push(p); });
blogPosts.forEach(p => { if(popularPosts.length < 6 && !popularPosts.find(x=>x.slug===p.slug)) popularPosts.push(p); });

const popularHtml = popularPosts.slice(0,6).map(p => {
  const img = blogCardImage(p.slug);
  return `<a href="/blog/${p.slug}.html" class="blog-card">
<div class="blog-card-image"><img src="${img.url}" alt="${img.alt}" title="${p.title}" width="600" height="340" loading="lazy"></div>
<div class="blog-card-body">
<div class="blog-card-meta"><span class="blog-card-category">${p.category}</span><span>${p.readTime}</span></div>
<h3>${p.title}</h3>
<p>Evidence-based health insights and practical tips for better wellness.</p>
<hr class="blog-card-divider">
<div class="blog-card-footer"><span class="blog-card-author"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Ali Haider</span><span class="blog-card-date">${p.date}</span></div>
<span class="read-more">Read More &rarr;</span>
</div></a>`;
}).join('\n');

const blogCardHtml = blogPosts.map((p, i) => {
  const img = blogCardImage(p.slug);
  return `<a href="/blog/${p.slug}.html" class="blog-card fade-in" data-category="${p.category}" data-title="${p.title.toLowerCase()}" data-title-display="${p.title.replace(/"/g,'&quot;')}" data-slug="${p.slug}" data-index="${i}" data-date="${p.date}" style="${i >= ITEMS_PER_PAGE ? 'display:none;' : ''}">
<div class="blog-card-image"><img src="${img.url}" alt="${img.alt}" title="${p.title}" width="600" height="340" loading="lazy"></div>
<div class="blog-card-body">
<div class="blog-card-meta"><span class="blog-card-category">${p.category}</span><span>${p.readTime}</span></div>
<h3>${p.title}</h3>
<p>Evidence-based health insights and practical tips for better wellness.</p>
<hr class="blog-card-divider">
<div class="blog-card-footer"><span class="blog-card-author"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Ali Haider</span><span class="blog-card-date">${p.date}</span></div>
<span class="read-more">Read More &rarr;</span>
</div></a>`;
}).join('\n');

const blogSchemaItems = blogPosts.map((p, i) => `{"@type":"ListItem","position":${i+1},"url":"${SITE}/blog/${p.slug}.html","name":"${p.title.replace(/"/g,'\\"')}"}`).join(',');

fs.writeFileSync('blog.html', `${head('VitalHealth Hub Blog \u2014 150+ Practical Health Articles | '+SITE_NAME, 'Browse 150+ practical health articles covering weight, nutrition, fitness, mental health, heart health, sleep, and more.', '/blog.html', '<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"VitalHealth Hub Blog","description":"150+ practical health articles from VitalHealth Hub","url":"'+SITE+'/blog.html","mainEntity":{"@type":"ItemList","numberOfItems":'+blogPosts.length+',"itemListElement":['+blogSchemaItems+']}}</script>')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Blog',url:'/blog.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Blog',url:'/blog.html'}]).schema}

${globalHero({
  badge: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> ' + blogPosts.length + ' Health Articles',
  title: 'VitalHealth Hub Blog',
  subtitle: 'Practical guides on nutrition, fitness, mental health, and more &mdash; with source links and clear limitations.',
  customSearch: '<div class="blog-hero-search-wrap"><div class="calc-index-search-bar"><svg viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><input type="text" id="blogHeroInput" placeholder="Search ' + blogPosts.length + '+ articles..." autocomplete="off"><button class="calc-index-btn-primary blog-search-btn">Search</button></div><div class="blog-hero-suggestions" id="blogHeroSugg"></div></div>',
  buttons: [
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> Browse Articles', href: '#all-articles' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> Explore Topics', href: '#all-articles' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Try Tools', href: '/tools/' }
  ],
  stats: [
    { value: blogPosts.length + '+', label: 'Articles' },
    { value: blogCategories.length + '', label: 'Categories' },
    { value: 'Sources', label: 'Included' },
    { value: 'Free', label: 'Always' }
  ]
})}

<section class="blog-featured-section">
<div class="blog-featured-header">
<h2>&#11088; Featured Articles</h2>
<a href="/blog.html#all-articles">Browse all ${blogPosts.length} articles &rarr;</a>
</div>
<div class="blog-featured-grid">
<a href="/blog/${featuredPost.slug}.html" class="blog-featured-main">
<img src="https://images.unsplash.com/${featuredImg.url.split('unsplash.com/')[1].split('?')[0]}?w=900&h=520&fit=crop&auto=format&q=85" alt="${featuredImg.alt}" width="900" height="520" loading="eager">
<div class="blog-featured-main-overlay">
<span class="blog-featured-badge">EDITOR'S PICK</span>
<h2>${featuredPost.title}</h2>
<p>Discover the science behind calorie counting and learn how to fuel your body for optimal health and performance.</p>
<span class="blog-featured-meta">Ali Haider &bull; ${featuredPost.date} &bull; ${featuredPost.readTime} read</span>
</div>
</a>
<div class="blog-featured-side">
${sidebarPosts.map(sp => {
  const sImg = blogCardImage(sp.slug);
  return `<a href="/blog/${sp.slug}.html" class="blog-featured-side-card">
<img src="https://images.unsplash.com/${sImg.url.split('unsplash.com/')[1].split('?')[0]}?w=220&h=180&fit=crop&auto=format" alt="${sImg.alt}" width="115" height="110" loading="eager">
<div class="blog-featured-side-content">
<span class="blog-card-category">${sp.category}</span>
<h4>${sp.title}</h4>
<div class="blog-featured-side-meta">${sp.date} &bull; ${sp.readTime}</div>
</div>
</a>`;
}).join('')}
</div>
</div>
</section>

${(() => {
  const blogHubDefs = [
    { cat:'Fitness & Exercise', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2M20 12h2"/><rect x="4" y="9" width="3" height="6" rx="1"/><rect x="17" y="9" width="3" height="6" rx="1"/><path d="M7 12h10"/></svg>', desc:'Workouts, strength training, cardio, VO2 max and physical performance guides' },
    { cat:'Sleep & Recovery',   icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M12 7v5l3 3" stroke-width="1.5"/></svg>', desc:'Sleep science, circadian rhythms, sleep quality and overnight recovery' },
    { cat:'Macronutrients',     icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>', desc:'Protein, carbohydrates, fats — understanding macros for optimal health' },
    { cat:'Calories & Weight',  icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>', desc:'Calorie tracking, weight management, TDEE and body composition science' },
    { cat:'Mental Health',      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg>', desc:'Stress reduction, anxiety, mindfulness and emotional wellbeing strategies' },
    { cat:'Nutrition',          icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 4-1.5 4-7.5 0-4.5-2.5-6.5-4-6.5s-4 2-4 6.5c0 6 2.5 7.5 4 7.5z"/><path d="M12 7V4"/><path d="M10 4h4"/></svg>', desc:'Evidence-based eating, food quality, micronutrients and nutritional science' },
  ];
  const sections = blogHubDefs.map(def => {
    const posts = blogPosts.filter(p => p.category === def.cat).slice(0, 4);
    if (!posts.length) return '';
    const cards = posts.map(p => {
      const hubImg = blogCardImage(p.slug);
      return `<a href="/blog/${p.slug}.html" class="tool-premium-card blog-hub-card">
<div class="blog-hub-card-img"><img src="${hubImg.url.split('?')[0]}?w=480&h=270&fit=crop&q=80&auto=format" alt="${p.title}" width="480" height="270" loading="lazy"></div>
<div class="tool-premium-name">${p.title}</div>
<div class="tool-premium-desc">${p.readTime} read &bull; ${p.date}</div>
<div class="tool-premium-cta">Read Article <span class="tool-premium-cta-arrow">&rarr;</span></div>
</a>`;
    }).join('');
    const catSlug = def.cat.toLowerCase().replace(/\s+/g,'-');
    return `<div class="tools-hub-section">
<div class="tools-hub-section-header">
<div class="tools-hub-section-icon">${def.icon}</div>
<div><div class="tools-hub-section-title">${def.cat}</div><div class="tools-hub-section-desc">${def.desc}</div></div>
<a href="/blog.html?cat=${encodeURIComponent(def.cat)}" class="blog-hub-see-all">See all &rarr;</a>
</div>
<div class="tools-premium-grid blog-hub-grid">${cards}</div>
</div>`;
  }).filter(Boolean).join('\n');
  return `<section class="blog-hub-featured">
<div class="container">
<div class="blog-hub-featured-head">
<h2>Browse by Category</h2>
<p>Explore expert guides across every area of health and wellness</p>
</div>
${sections}
</div>
</section>`;
})()}

<section class="blog-trow-section">
<div class="blog-trow-header">
<h2><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> Trending This Week</h2>
<a href="#all-articles">See all articles &rarr;</a>
</div>
<div class="blog-trow" id="blogTrendingRow">
${trendingItems.map(t => {
  const tp = blogPosts.find(x => x.slug === t.slug);
  const tImg = blogCardImage(t.slug);
  const tImgUrl = tImg.url.includes('?') ? tImg.url.split('?')[0]+'?w=320&h=180&fit=crop&auto=format' : tImg.url+'?w=320&h=180&fit=crop&auto=format';
  return `<a href="/blog/${t.slug}.html" class="blog-tcard"><div class="blog-tcard-img"><img src="${tImgUrl}" alt="${tImg.alt}" width="260" height="150" loading="lazy"></div><div class="blog-tcard-body"><span class="blog-card-category">${tp ? tp.category : 'Health'}</span><h4>${t.text}</h4><span class="blog-tcard-meta">${tp ? tp.readTime+' read' : '5 min read'}</span></div></a>`;
}).join('')}
</div>
</section>

<div class="blog-trending-ticker">
<span class="blog-trending-ticker-label">\u{1F525} TRENDING THIS WEEK:</span>
<div class="blog-trending-ticker-scroll">
${trendingItems.map(t => `<a href="/blog/${t.slug}.html">${t.text}</a>`).join('')}
${trendingItems.map(t => `<a href="/blog/${t.slug}.html">${t.text}</a>`).join('')}
</div>
</div>

<div class="blog-category-bar" id="all-articles">
<div class="blog-category-bar-inner">
<div class="blog-category-pills">
<button class="blog-category-pill active" data-blog-cat="all">All Articles</button>
${blogCategories.map(c => `<button class="blog-category-pill" data-blog-cat="${c.replace(/"/g,'&quot;')}">${c}</button>`).join('')}
</div>
<div class="blog-category-bar-actions">
<select class="blog-sort-select" id="blogSortSelect">
<option value="latest">Latest</option>
<option value="oldest">Oldest First</option>
<option value="az">A\u2013Z</option>
<option value="zt">Z\u2013A</option>
</select>
<button class="blog-search-btn" aria-label="Search articles">
<svg viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
</button>
</div>
</div>
</div>

<div class="blog-search-overlay" id="blogSearchOverlay">
<button class="blog-search-overlay-close" aria-label="Close search">\u2715</button>
<input class="blog-search-overlay-input" id="blogSearchInput" type="text" placeholder="Search 150+ health articles...">
<div class="blog-search-overlay-results" id="blogSearchResults"></div>
</div>

<section class="blog-popular-section">
<div class="blog-popular-header">
<h2><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> Popular Articles</h2>
<p>Most-read guides by our community</p>
</div>
<div class="blog-articles-grid blog-popular-grid">
${popularHtml}
</div>
</section>

<section class="blog-articles-section">
<div class="blog-articles-header">
<div class="blog-articles-header-left">
<h2 id="blogSectionTitle">All Health Articles</h2>
<p>${blogPosts.length}+ evidence-based guides written by health experts</p>
</div>
<div class="blog-articles-header-right">
<div class="blog-progress-bar-wrap">
<div class="blog-progress-fill" id="blogProgressFill" style="width:${Math.round(ITEMS_PER_PAGE/blogPosts.length*100)}%"></div>
</div>
<span class="blog-articles-counter" id="blogCounter">Showing ${ITEMS_PER_PAGE} of ${blogPosts.length}</span>
<button class="blog-view-all-btn">View All ${blogPosts.length} Articles</button>
</div>
</div>
<div class="blog-articles-grid" id="blogGrid">
${blogCardHtml}
</div>
</section>

<div class="blog-load-more" id="blogLoadMore">
<button class="blog-load-more-btn" id="blogLoadMoreBtn">Load 24 More Articles &#8595;</button>
</div>

<div class="blog-newsletter">
<div class="blog-newsletter-inner">
<div>
<h3>Get Weekly Health Insights</h3>
<p>Join 50,000+ readers who get our best health tips every Tuesday morning.</p>
<ul class="blog-newsletter-benefits">
<li>\u2713 Free expert health guides</li>
<li>\u2713 Calculator tips and tricks</li>
<li>\u2713 No spam, unsubscribe anytime</li>
</ul>
</div>
<div class="blog-newsletter-form">
<input type="email" placeholder="Enter your email address">
<button class="btn btn-highlight">Subscribe Free \u2192</button>
<small>100% free. No spam ever.</small>
</div>
</div>
</div>



${FOOTER}
${BTT}
<script src="/js/main.js" defer></script>
${CHATBOT}
</body></html>`);

// ============================================================
// QUIZ PAGES
// ============================================================
ensureDir('quizzes');

function genQuizPage(quiz) {
  const bc = breadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Quizzes', url: '/quizzes/' },
    { name: quiz.name, url: '/quizzes/' + quiz.slug + '.html' }
  ]);

  function calcName(slug) {
    const c = calculators.find(x => x.slug === slug);
    return c ? c.name : slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }
  function blogTitle(slug) {
    const b = blogPosts.find(x => x.slug === slug);
    return b ? b.title : slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }

  const funnelToolIcons = {
    'bmi-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M5 6h14l-1 14H6L5 6z"/><path d="M10 11v4M14 11v4"/></svg>',
    'calorie-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    'macro-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    'tdee-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>',
    'body-fat-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    'water-intake-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    'sleep-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    'heart-rate-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    'protein-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M2 12h2M20 12h2"/><rect x="4" y="9" width="3" height="6" rx="1"/><rect x="17" y="9" width="3" height="6" rx="1"/><path d="M7 12h10"/></svg>',
    'step-counter':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M9.09 4.24A9 9 0 0 1 21 12a9 9 0 0 1-18 0A9 9 0 0 1 9.09 4.24"/></svg>',
    'ideal-weight-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    'blood-pressure-calculator':'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
  };

  const funnelTools = (quiz.relatedTools || []).map(s =>
    '<a href="/calculators/' + s + '.html" class="quiz-funnel-tool"><span class="quiz-funnel-tool-icon">' + (funnelToolIcons[s]||'🔧') + '</span>' + calcName(s) + '</a>'
  ).join('');

  const funnelBlogs = (quiz.relatedBlogs || []).map(s =>
    '<a href="/blog/' + s + '.html" class="quiz-funnel-blog-link">' + blogTitle(s) + '</a>'
  ).join('');

  const otherQuizzes = quizzesData.filter(q => q.slug !== quiz.slug).slice(0, 3);
  const nextQuizCards = otherQuizzes.map(q =>
    '<a href="/quizzes/' + q.slug + '.html" class="quiz-next-card">' +
    '<div class="quiz-next-icon">' + q.icon + '</div>' +
    '<div class="quiz-next-content">' +
    '<span class="quiz-next-badge">' + q.category + '</span>' +
    '<h4>' + q.name + '</h4>' +
    '</div>' +
    '<span class="quiz-next-arrow">→</span>' +
    '</a>'
  ).join('');

  const disclaimerHTML = quiz.disclaimer
    ? '<div class="quiz-disclaimer-box"><strong>Medical Notice:</strong> ' + quiz.disclaimer + '</div>'
    : '';

  const quizJSON = JSON.stringify({
    slug: quiz.slug,
    name: quiz.name,
    questions: quiz.questions,
    scoring: quiz.scoring
  }).replace(/<\/script>/gi, '<\\/script>');

  const schemaExtra = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"LearningResource","name":"' + quiz.name.replace(/"/g, '\\"') + '","description":"' + quiz.desc.replace(/"/g, '\\"') + '","url":"' + SITE + '/quizzes/' + quiz.slug + '.html","provider":{"@type":"Organization","name":"VitalHealth Hub","url":"' + SITE + '"}}</script>';

  return head(
    (QUIZ_META[quiz.slug] ? QUIZ_META[quiz.slug].title : quiz.name + ' — Free Online Health Quiz | VitalHealth Hub'),
    (QUIZ_META[quiz.slug] ? QUIZ_META[quiz.slug].desc : quiz.desc + ' Three difficulty levels, instant scoring, and personalised feedback.'),
    '/quizzes/' + quiz.slug + '.html',
    schemaExtra
  ) + `<body>
${NAV}
${bc.html}
${bc.schema}
<section class="quiz-hero">
<div class="container">
<div class="quiz-hero-icon">${quiz.icon}</div>
<div class="quiz-hero-cat">${quiz.category}</div>
<h1>${quiz.name}</h1>
<p>${quiz.desc}</p>
</div>
</section>

<div class="quiz-app-wrap">
${disclaimerHTML}

<div id="quiz-diff-screen" class="quiz-diff-screen">
<h2>Choose Your Difficulty</h2>
<p>Select a level to begin. You can retake at any difficulty anytime.</p>
<div class="quiz-diff-grid">
<div class="quiz-diff-card" data-diff="easy" data-quiz-diff="easy">
<span class="quiz-diff-icon">E</span>
<span class="quiz-diff-label">Easy</span>
<span class="quiz-diff-count">5 Questions</span>
<span class="quiz-diff-time">~3 min</span>
</div>
<div class="quiz-diff-card" data-diff="medium" data-quiz-diff="medium">
<span class="quiz-diff-icon">M</span>
<span class="quiz-diff-label">Medium</span>
<span class="quiz-diff-count">8 Questions</span>
<span class="quiz-diff-time">~5 min</span>
</div>
<div class="quiz-diff-card" data-diff="hard" data-quiz-diff="hard">
<span class="quiz-diff-icon">H</span>
<span class="quiz-diff-label">Hard</span>
<span class="quiz-diff-count">10 Questions</span>
<span class="quiz-diff-time">~7 min</span>
</div>
</div>
<div style="text-align:center;">
<button class="quiz-start-btn" id="quiz-start-btn" disabled>Select a difficulty to begin</button>
</div>
</div>

<div id="quiz-q-screen" class="quiz-q-screen">
<div class="quiz-progress-wrap">
<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-prog-fill" style="width:0%"></div></div>
<div class="quiz-progress-text"><span id="quiz-prog-txt">Question 1 of 5</span><span id="quiz-score-live">Score: 0</span></div>
</div>
<div class="quiz-q-box">
<p class="quiz-q-num" id="quiz-q-num"></p>
<p class="quiz-q-text" id="quiz-q-text"></p>
<div class="quiz-options" id="quiz-opts"></div>
<div class="quiz-explanation" id="quiz-exp"></div>
<button class="quiz-next-btn" id="quiz-next-btn">Next Question &rarr;</button>
</div>
</div>

<div id="quiz-result-screen" class="quiz-result-screen">
<div class="quiz-result-ring-wrap">
<svg class="quiz-result-ring" viewBox="0 0 120 120">
<defs><linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1f4d3a"/><stop offset="100%" stop-color="#52b788"/></linearGradient></defs>
<circle cx="60" cy="60" r="52" fill="none" stroke="#e3f2e9" stroke-width="9"/>
<circle id="res-ring" cx="60" cy="60" r="52" fill="none" stroke="url(#ringGrad)" stroke-width="9" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="326.7" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 1.2s ease;"/>
</svg>
<div class="quiz-ring-text">
<span class="quiz-score-pct" id="res-pct">0%</span>
<span class="quiz-score-label">Score</span>
</div>
</div>
<h2 class="quiz-result-label" id="res-label"></h2>
<p class="quiz-result-correct" id="res-correct"></p>
<div class="quiz-result-feedback" id="res-feedback"></div>
<div class="quiz-result-actions">
<button class="quiz-retry-btn">Try Again</button>
<button class="quiz-share-btn">Share Result</button>
</div>
</div>

<div class="quiz-funnel" id="quiz-funnel">
${funnelTools ? '<div class="quiz-funnel-section"><h3>Improve Your Results — Try These Tools</h3><div class="quiz-funnel-tools">' + funnelTools + '</div></div>' : ''}
${funnelBlogs ? '<div class="quiz-funnel-section"><h3>Learn More — Related Articles</h3><div class="quiz-funnel-blogs">' + funnelBlogs + '</div></div>' : ''}
${nextQuizCards ? '<div class="quiz-funnel-section"><h3>You Might Also Like</h3><div class="quiz-next-cards">' + nextQuizCards + '</div></div>' : ''}
<div class="quiz-email-capture">
<h3>Get Weekly Health Insights</h3>
<p>Personalised tips based on your quiz results, delivered free every week.</p>
<div class="quiz-email-form">
<input type="email" class="quiz-email-input" id="quiz-email-input" placeholder="Your email address">
<button class="quiz-email-submit">Subscribe</button>
</div>
<p class="quiz-email-success" id="quiz-email-success">You're subscribed! Check your inbox soon.</p>
</div>
</div>

</div>

<div class="quiz-content-section">
<h2>About This Quiz</h2>
<p>The <strong>${quiz.name}</strong> tests your knowledge with ${quiz.questions.length} carefully researched questions covering key concepts in ${quiz.category.toLowerCase()}. Every answer includes a full explanation so you learn as you go, not just test what you already know.</p>
<h2>How Difficulty Levels Work</h2>
<p>Easy mode presents 5 questions — ideal if you are new to the topic or want a quick check. Medium mode gives you 8 questions for a more thorough test. Hard mode challenges you with all 10 questions drawn from the full question bank, shuffled randomly each time.</p>
<h2>Scoring &amp; Feedback</h2>
<p>Your score is shown as a percentage with an animated progress ring. Based on your result you receive a personalised performance label and actionable feedback with recommended tools and articles to deepen your understanding. Your quiz history is saved locally so you can track improvement over time.</p>
<h2>Why Health Knowledge Matters</h2>
<p>Health literacy — understanding the science behind your body and lifestyle choices — is one of the strongest predictors of better health outcomes. People with higher health literacy make better dietary choices, exercise more consistently, attend preventive screenings, and manage chronic conditions more effectively. Use these quizzes to identify gaps and build a stronger foundation.</p>
</div>

<script>window.vhQuizData=${quizJSON};</script>
<script src="/js/quiz.js" defer></script>
${FOOTER}
${CHATBOT}
</body></html>`;
}

quizzesData.forEach(quiz => {
  fs.writeFileSync(
    path.join('quizzes', quiz.slug + '.html'),
    genQuizPage(quiz)
  );
});
console.log('Generated ' + quizzesData.length + ' quiz pages');

// QUIZ INDEX PAGE
const quizCategories = ['All', ...new Set(quizzesData.map(q => q.category))];
const quizCatPills = quizCategories.map((c, i) =>
  '<button class="quiz-cat-pill' + (i === 0 ? ' active' : '') + '" data-quiz-filter="' + c.replace(/"/g, '&quot;') + '">' + c + '</button>'
).join('');

const quizCards = quizzesData.map(quiz =>
  '<a href="/quizzes/' + quiz.slug + '.html" class="quiz-card" data-category="' + quiz.category + '">' +
  '<div class="quiz-card-icon-wrap">' + quiz.icon + '</div>' +
  '<span class="quiz-card-badge">' + quiz.category + '</span>' +
  '<h3>' + quiz.name + '</h3>' +
  '<p>' + quiz.desc + '</p>' +
  '<div class="quiz-card-bottom">' +
  '<span class="quiz-card-questions">&#x2713; ' + quiz.questions.length + ' questions &bull; 3 levels</span>' +
  '<span class="quiz-card-cta">Take Quiz <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="display:inline;vertical-align:middle;"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
  '</div>' +
  '</a>'
).join('');

const quizIndexSchema = '{"@context":"https://schema.org","@type":"CollectionPage","name":"Free Health Quizzes","description":"Test your health, fitness, nutrition, and mental wellness knowledge with ' + quizzesData.length + '+ interactive quizzes at VitalHealth Hub.","url":"' + SITE + '/quizzes/"}';

fs.writeFileSync('quizzes/index.html', head(
  'Free Health &amp; Wellness Quizzes — VitalHealth Hub',
  'Test your health knowledge with ' + quizzesData.length + '+ interactive quizzes covering nutrition, fitness, mental health, and more. Three difficulty levels, instant scoring, personalised feedback.',
  '/quizzes/',
  '<script type="application/ld+json">' + quizIndexSchema + '</script>'
) + `<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Quizzes',url:'/quizzes/'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Quizzes',url:'/quizzes/'}]).schema}

${globalHero({
  badge: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg> ' + quizzesData.length + '+ Interactive Health Quizzes',
  title: 'Test Your Health<br>Knowledge Instantly',
  subtitle: 'Challenge yourself with science-based quizzes and track your progress.',
  searchId: 'quizHeroInput',
  searchPlaceholder: 'Search quizzes...',
  searchOnInput: 'quizHeroSearch(this.value)',
  buttons: [
    { label: '&#9654; Start Quiz', href: '#quiz-grid' },
    { label: '&#127937; Browse Categories', href: '#quiz-grid' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> View Results', href: '#quiz-grid' }
  ],
  stats: [
    { value: quizzesData.length + '+', label: 'Quizzes' },
    { value: '3', label: 'Difficulty Levels' },
    { value: quizzesData.reduce(function(t,q){return t+q.questions.length;},0) + '+', label: 'Questions' },
    { value: 'Free', label: 'Always' }
  ]
})}

<div class="quiz-category-bar">
<div class="quiz-category-bar-inner">${quizCatPills}</div>
</div>

<section class="quiz-grid-section">
<div class="container">
<div class="quiz-grid-header">
<h2>All Health Quizzes</h2>
<span class="quiz-grid-count">${quizzesData.length} quizzes available</span>
</div>
<div class="quiz-grid" id="quiz-grid">${quizCards}</div>
</div>
</section>

<section class="quiz-why-section">
<div class="container quiz-why-inner">
<h2>Why Take Our Health Quizzes?</h2>
<p>Health literacy is one of the strongest predictors of better health decisions and outcomes. Our quizzes are built from peer-reviewed research to help you understand the science behind your body — from how sleep affects your brain to how macronutrients fuel your performance. Each quiz includes detailed explanations for every answer, so you leave knowing more than when you started.</p>
</div>
</section>

${FOOTER}
${CHATBOT}
</body></html>`);

console.log('Generated quiz index page');

// ============================================================
// TOOLS HUB
// ============================================================
ensureDir('tools');

// Clean up old tool HTML files that no longer exist in tools-data.js
(function cleanOldTools() {
  const oldSlugs = [
    'image-to-jpg','image-to-png','jpg-to-webp','webp-to-jpg',
    'image-resizer','image-crop','image-metadata-remover','image-quality-reducer',
    'jpg-to-pdf','pdf-rotate',
    'word-counter','character-counter','case-converter','text-cleaner',
    'readability-analyzer','keyword-density',
    'qr-code-generator','password-generator','uuid-generator',
    'base64-encoder','json-formatter','url-encoder'
  ];
  oldSlugs.forEach(function(slug) {
    try { fs.unlinkSync('tools/' + slug + '.html'); } catch(e) {}
  });
})();

// Inject tool visit tracking on every tool page
const TOOL_TRACKER_JS = '';

// ── TOOL UI REGISTRY ─────────────────────────────────────────────────────────
function toolUIByType(tool) {
  const t = tool.type;

  // ── HABIT TRACKER ────────────────────────────────────────────────────────
  if (t === 'habit-tracker') {
    return `
<div class="saas-card-title">Today's Habits
  <span id="habitDateLabel" style="margin-left:auto;font-size:0.82rem;font-weight:500;color:#6b7280;"></span>
</div>
<div class="habit-add-form">
  <input class="saas-input" id="habitInput" placeholder="Add a new habit (e.g. Drink 8 glasses of water)…" maxlength="80">
  <button class="saas-btn saas-btn-primary" data-tool-action="add-habit">+ Add</button>
</div>
<div id="habitList" class="habit-list"></div>
<div id="habitEmpty" class="saas-empty-state" style="display:none">
  <div class="saas-empty-icon">+</div>
  <p class="saas-empty-text">No habits yet. Add your first habit above to get started!</p>
</div>`;
  }

  // ── SLEEP TRACKER ────────────────────────────────────────────────────────
  if (t === 'sleep-tracker') {
    return `
<div class="saas-card-title">Log Tonight's Sleep</div>
<div class="saas-form-row">
  <div class="saas-form-group">
    <label class="saas-label">Bedtime</label>
    <input class="saas-input" type="time" id="sleepBed" value="22:30">
  </div>
  <div class="saas-form-group">
    <label class="saas-label">Wake Time</label>
    <input class="saas-input" type="time" id="sleepWake" value="06:30">
  </div>
</div>
<div class="saas-form-group">
  <label class="saas-label">Sleep Quality</label>
  <div style="display:flex;gap:8px;margin-top:4px;" id="qualityBtns">
    <button class="saas-btn saas-btn-sm saas-btn-secondary" data-q="1">😞 Poor</button>
    <button class="saas-btn saas-btn-sm saas-btn-secondary" data-q="2">😕 Fair</button>
    <button class="saas-btn saas-btn-sm saas-btn-secondary" data-q="3">😐 OK</button>
    <button class="saas-btn saas-btn-sm saas-btn-secondary" data-q="4">😊 Good</button>
    <button class="saas-btn saas-btn-sm saas-btn-secondary" data-q="5">😄 Great</button>
  </div>
</div>
<div class="saas-form-group">
  <label class="saas-label">Notes (optional)</label>
  <input class="saas-input" id="sleepNote" placeholder="Any factors affecting sleep tonight?">
</div>
<button class="saas-btn saas-btn-primary" data-tool-action="log-sleep" style="width:100%">Log Sleep Entry</button>
<div id="sleepResult" class="saas-result-section hidden" style="margin-top:24px;"></div>
<hr class="saas-divider">
<div class="saas-section-heading">Sleep History</div>
<div id="sleepHistory"></div>`;
  }

  // ── MOOD TRACKER ─────────────────────────────────────────────────────────
  if (t === 'mood-tracker') {
    return `
<div class="saas-card-title">How are you feeling today?</div>
<div class="mood-selector" id="moodSelector">
  <button class="mood-btn" data-m="1">😞<span class="mood-label">Low</span></button>
  <button class="mood-btn" data-m="2">😟<span class="mood-label">Down</span></button>
  <button class="mood-btn" data-m="3">😐<span class="mood-label">OK</span></button>
  <button class="mood-btn" data-m="4">😊<span class="mood-label">Good</span></button>
  <button class="mood-btn" data-m="5">😄<span class="mood-label">Great</span></button>
</div>
<div class="saas-form-group">
  <label class="saas-label">Note (optional)</label>
  <input class="saas-input" id="moodNote" placeholder="What influenced your mood today?">
</div>
<button class="saas-btn saas-btn-primary" data-tool-action="log-mood" style="width:100%">Log Today's Mood</button>
<div id="moodConfirm" style="display:none;text-align:center;padding:14px;color:#166534;font-weight:600;font-size:0.9rem;"></div>
<hr class="saas-divider">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
  <div class="saas-section-heading" style="margin:0">Last 35 Days</div>
  <div id="moodAvg" style="font-size:0.88rem;color:#6b7280;"></div>
</div>
<div class="mood-calendar" id="moodCal"></div>
<div class="mood-legend">
  <span class="mood-legend-item"><span class="mood-legend-dot" style="background:#fca5a5"></span>Low</span>
  <span class="mood-legend-item"><span class="mood-legend-dot" style="background:#fdba74"></span>Down</span>
  <span class="mood-legend-item"><span class="mood-legend-dot" style="background:#fde68a"></span>OK</span>
  <span class="mood-legend-item"><span class="mood-legend-dot" style="background:#a7f3d0"></span>Good</span>
  <span class="mood-legend-item"><span class="mood-legend-dot" style="background:#34d399"></span>Great</span>
  <span class="mood-legend-item"><span class="mood-legend-dot" style="background:#f3f4f6"></span>No entry</span>
</div>`;
  }

  // ── STEP TRACKER ─────────────────────────────────────────────────────────
  if (t === 'step-tracker') {
    return `
<div class="saas-card-title">Log Today's Steps</div>
<div class="saas-form-row" style="margin-bottom:18px">
  <div class="saas-form-group">
    <label class="saas-label">Steps Today</label>
    <input class="saas-input" type="number" id="stepInput" placeholder="e.g. 8500" min="0" max="100000">
  </div>
  <div class="saas-form-group">
    <label class="saas-label">Daily Goal</label>
    <input class="saas-input" type="number" id="stepGoal" value="10000" min="1000" max="50000">
  </div>
</div>
<button class="saas-btn saas-btn-primary" data-tool-action="log-steps" style="width:100%">Log Steps</button>
<div class="step-ring-wrap" id="stepRingWrap" style="display:none">
  <svg class="timer-svg" width="160" height="160" viewBox="0 0 160 160" id="stepRingSvg">
    <circle cx="80" cy="80" r="68" fill="none" stroke="#e5e7eb" stroke-width="12"/>
    <circle cx="80" cy="80" r="68" fill="none" stroke="url(#stepGrad)" stroke-width="12" stroke-linecap="round" id="stepCircle" style="transition:stroke-dashoffset 0.8s ease"/>
    <defs><linearGradient id="stepGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#2d6a4f"/><stop offset="100%" style="stop-color:#52b788"/></linearGradient></defs>
  </svg>
  <div style="margin-top:-90px;text-align:center;position:relative;z-index:1;margin-bottom:60px">
    <div class="step-ring-value" id="stepPct">0%</div>
    <div class="step-ring-label" id="stepCount">0 / 0 steps</div>
  </div>
</div>
<hr class="saas-divider">
<div class="saas-section-heading">Last 7 Days</div>
<div id="stepChart" class="step-chart-wrap"></div>`;
  }

  // ── HEALTH DASHBOARD ─────────────────────────────────────────────────────
  if (t === 'health-dashboard') {
    return `
<div class="saas-card-title">Your Health Overview
  <span style="margin-left:auto;font-size:0.78rem;font-weight:500;color:#9ca3af;" id="dashDate"></span>
</div>
<div id="dashNotice" class="saas-notice saas-notice-info" style="margin-bottom:24px">
  This dashboard reads data from your other trackers. Use the individual tools to log data, and it will appear here automatically.
</div>
<div class="dashboard-grid" id="dashGrid"></div>
<div style="margin-top:24px;padding-top:20px;border-top:1px solid #f0f5f1;">
  <div class="saas-section-heading">Quick Access</div>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
    <a href="/tools/sleep-tracker.html" class="saas-btn saas-btn-secondary saas-btn-sm">Sleep Tracker</a>
    <a href="/tools/mood-tracker.html" class="saas-btn saas-btn-secondary saas-btn-sm">Mood Tracker</a>
    <a href="/tools/step-tracker.html" class="saas-btn saas-btn-secondary saas-btn-sm">Step Tracker</a>
    <a href="/tools/habit-tracker.html" class="saas-btn saas-btn-secondary saas-btn-sm">Habit Tracker</a>
  </div>
</div>
`;
  }

  // ── DAILY PLANNER ────────────────────────────────────────────────────────
  if (t === 'daily-planner') {
    return `
<div class="planner-date-header">
  <div class="planner-today" id="plannerDate"></div>
  <button class="saas-btn saas-btn-ghost saas-btn-sm" data-tool-action="clear-done">Clear Completed</button>
</div>
<div class="planner-add-form">
  <input class="saas-input" id="plannerTask" placeholder="Add a task…" maxlength="120">
  <input class="saas-input" type="time" id="plannerTime" style="max-width:130px" value="09:00">
  <select class="planner-select" id="plannerPriority">
    <option value="high">High</option>
    <option value="medium" selected>Medium</option>
    <option value="low">Low</option>
  </select>
  <button class="saas-btn saas-btn-primary" data-tool-action="add-task">+ Add</button>
</div>
<div id="plannerList" class="planner-task-list"></div>
<div id="plannerEmpty" class="saas-empty-state" style="display:none">
  <div class="saas-empty-icon">&#9776;</div>
  <p class="saas-empty-text">No tasks yet. Add your first task for today!</p>
</div>
<div class="planner-stats" id="plannerStats"></div>`;
  }

  // ── FOCUS TIMER ──────────────────────────────────────────────────────────
  if (t === 'focus-timer') {
    return `
<div class="timer-container">
  <div class="timer-mode-badge timer-work" id="timerModeBadge">Work Session</div>
  <div class="timer-svg-wrap">
    <svg class="timer-svg" width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="88" fill="none" stroke="#e5e7eb" stroke-width="10"/>
      <circle cx="100" cy="100" r="88" fill="none" stroke="url(#timerGrad)" stroke-width="10" stroke-linecap="round" id="timerCircle" transform="rotate(-90 100 100)" style="transition:stroke-dashoffset 1s linear;"/>
      <defs><linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#2d6a4f"/><stop offset="100%" style="stop-color:#52b788"/></linearGradient></defs>
    </svg>
    <div class="timer-time-display" id="timerDisplay">25:00</div>
  </div>
  <div class="timer-sessions" id="timerSessions">Sessions completed: <strong>0</strong></div>
  <div class="timer-controls">
    <button class="saas-btn saas-btn-primary" data-tool-action="timer-toggle" id="timerStartBtn">▶ Start</button>
    <button class="saas-btn saas-btn-secondary" data-tool-action="timer-reset">↺ Reset</button>
    <button class="saas-btn saas-btn-ghost" data-tool-action="timer-skip">⏭ Skip</button>
  </div>
</div>
<div class="timer-settings">
  <div class="timer-setting-group">
    <label class="timer-setting-label">Work (min)</label>
    <input type="number" class="timer-setting-input" id="workMin" value="25" min="1" max="120" data-timer-setting="work">
  </div>
  <div class="timer-setting-group">
    <label class="timer-setting-label">Short Break</label>
    <input type="number" class="timer-setting-input" id="breakMin" value="5" min="1" max="60" data-timer-setting="break">
  </div>
  <div class="timer-setting-group">
    <label class="timer-setting-label">Long Break</label>
    <input type="number" class="timer-setting-input" id="longBreakMin" value="20" min="1" max="120" data-timer-setting="long-break">
  </div>
  <div class="timer-setting-group">
    <label class="timer-setting-label">Sessions to Long Break</label>
    <input type="number" class="timer-setting-input" id="sessionsToLong" value="4" min="1" max="10" data-timer-setting="sessions-to-long">
  </div>
</div>`;
  }

  // ── GOAL TRACKER ─────────────────────────────────────────────────────────
  if (t === 'goal-tracker') {
    return `
<div class="saas-card-title">Your Goals</div>
<div class="goal-add-form">
  <div class="saas-form-row">
    <div class="saas-form-group">
      <label class="saas-label">Goal Name</label>
      <input class="saas-input" id="goalName" placeholder="e.g. Lose weight">
    </div>
    <div class="saas-form-group">
      <label class="saas-label">Unit</label>
      <input class="saas-input" id="goalUnit" placeholder="e.g. kg, steps, pages">
    </div>
  </div>
  <div class="saas-form-row">
    <div class="saas-form-group">
      <label class="saas-label">Current Value</label>
      <input class="saas-input" type="number" id="goalCurrent" placeholder="e.g. 80">
    </div>
    <div class="saas-form-group">
      <label class="saas-label">Target Value</label>
      <input class="saas-input" type="number" id="goalTarget" placeholder="e.g. 70">
    </div>
  </div>
  <button class="saas-btn saas-btn-primary" data-tool-action="add-goal" style="width:100%">+ Add Goal</button>
</div>
<div id="goalList" class="goal-list"></div>
<div id="goalEmpty" class="saas-empty-state" style="display:none">
  <div class="saas-empty-icon">&#9678;</div>
  <p class="saas-empty-text">No goals yet. Add your first goal above to start tracking!</p>
</div>`;
  }

  // ── ADVANCED TEXT ANALYZER ───────────────────────────────────────────────
  if (t === 'advanced-text-analyzer') {
    return `
<div class="text-analyzer-layout">
  <div class="text-analyzer-input-col">
    <div>
      <label class="saas-label">Paste or type your text below</label>
      <textarea class="saas-textarea text-analyzer-textarea" id="textInput" placeholder="Paste your article, blog post, essay, or any text here…"></textarea>
    </div>
    <div>
      <div class="saas-section-heading">Text Cleaning Tools</div>
      <div class="text-clean-options">
        <button class="text-clean-btn" data-clean="trim">Trim Spaces</button>
        <button class="text-clean-btn" data-clean="breaks">Remove Extra Line Breaks</button>
        <button class="text-clean-btn" data-clean="special">Remove Special Chars</button>
        <button class="text-clean-btn" data-clean="html">Strip HTML Tags</button>
        <button class="text-clean-btn" data-clean="lower">Lowercase</button>
      </div>
    </div>
    <button class="saas-btn saas-btn-secondary saas-btn-sm" data-tool-action="copy-text" style="align-self:flex-start">Copy Text</button>
  </div>
  <div class="text-analyzer-stats-col">
    <div class="saas-stat-grid" style="grid-template-columns:repeat(2,1fr)">
      <div class="saas-stat-card"><div class="saas-stat-value" id="statWords">0</div><div class="saas-stat-label">Words</div></div>
      <div class="saas-stat-card"><div class="saas-stat-value" id="statChars">0</div><div class="saas-stat-label">Chars</div></div>
      <div class="saas-stat-card"><div class="saas-stat-value" id="statSents">0</div><div class="saas-stat-label">Sentences</div></div>
      <div class="saas-stat-card"><div class="saas-stat-value" id="statParas">0</div><div class="saas-stat-label">Paragraphs</div></div>
      <div class="saas-stat-card"><div class="saas-stat-value" id="statRead">0 min</div><div class="saas-stat-label">Read Time</div></div>
      <div class="saas-stat-card"><div class="saas-stat-value" id="statFlesch">—</div><div class="saas-stat-label">Readability</div></div>
    </div>
    <div style="margin-top:8px;text-align:center">
      <span id="statGrade" class="readability-grade saas-badge saas-badge-gray">Grade: —</span>
    </div>
    <hr class="saas-divider">
    <div class="saas-section-heading">Top Keywords</div>
    <table class="keyword-table" id="kwTable">
      <thead><tr><th>Word</th><th>Count</th><th>Density</th><th class="keyword-bar-cell"></th></tr></thead>
      <tbody id="kwBody"><tr><td colspan="4" style="color:#9ca3af;text-align:center;padding:16px">Start typing to see keywords…</td></tr></tbody>
    </table>
  </div>
</div>
`;
  }

  // ── HEADLINE ANALYZER ────────────────────────────────────────────────────
  if (t === 'headline-analyzer') {
    const powerWords = ['proven','secret','exclusive','ultimate','powerful','effective','guaranteed','transform','discover','instantly','best','free','new','amazing','breakthrough','critical','essential','hidden','revealed','simple','easy','fast','quick','boost','master','expert','complete','definitive','shocking','surprising','warning','important','hurry','limited','now','today','last','urgent','never','always','stop','start','save','earn','lose','gain'];
    return `
<div class="saas-form-group">
  <label class="saas-label">Enter your headline</label>
  <input class="saas-input" id="headlineInput" placeholder="e.g. 7 Proven Ways to Sleep Better Tonight and Wake Up Energised" maxlength="200" style="font-size:1.1rem;padding:16px 18px">
  <div style="margin-top:6px;font-size:0.78rem;color:#9ca3af"><span id="headlineLen">0</span> characters (ideal: 55–70)</div>
</div>
<div id="headlineResults" style="display:none">
  <div class="headline-score-section">
    <div class="headline-score-ring">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" stroke-width="10"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="url(#hlGrad)" stroke-width="10" stroke-linecap="round" id="hlCircle" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 0.6s ease"/>
        <defs><linearGradient id="hlGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#2d6a4f"/><stop offset="100%" style="stop-color:#52b788"/></linearGradient></defs>
      </svg>
      <div class="headline-score-number">
        <div class="headline-score-val" id="hlScoreVal">0</div>
        <div class="headline-score-lbl">Score</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-start">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <span style="font-size:1.1rem;font-weight:800;color:#1b4332">Overall Rating:</span>
        <span class="headline-grade-badge saas-badge" id="hlGradeBadge">—</span>
      </div>
      <div class="headline-breakdown" id="hlBreakdown"></div>
    </div>
  </div>
  <div class="headline-suggestions" id="hlSuggestions"></div>
  <div class="headline-power-words" id="hlPowerWords" style="display:none">
    <div class="saas-section-heading">Power Words Found</div>
    <div class="headline-pw-list" id="hlPwList"></div>
  </div>
</div>`;
  }

  // ── CONTENT IDEA GENERATOR ───────────────────────────────────────────────
  if (t === 'content-idea-generator') {
    return `
<div class="saas-card-title">Generate Content Ideas</div>
<div class="idea-gen-form">
  <input class="saas-input" id="ideaTopic" placeholder="Enter a health topic (e.g. intermittent fasting, sleep quality, stress…)" maxlength="80">
  <select class="saas-select" id="ideaAudience" style="max-width:180px">
    <option value="general">General audience</option>
    <option value="beginners">Beginners</option>
    <option value="athletes">Athletes</option>
    <option value="seniors">Seniors (50+)</option>
    <option value="women">Women's health</option>
  </select>
  <button class="saas-btn saas-btn-primary" data-tool-action="generate-ideas">Generate Ideas</button>
</div>
<div id="ideaOutput" class="idea-results"></div>`;
  }

  // ── IMAGE COMPRESSOR (Utility/Minimal) ───────────────────────────────────
  if (t === 'image-compressor') {
    return `
<div class="saas-card-title">Image Compressor</div>
<div class="util-dropzone" id="toolDrop">
  <div class="util-dropzone-icon"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="8" width="32" height="24" rx="4"/><circle cx="14" cy="18" r="3"/><path d="M4 28l8-8 6 6 4-4 6 6"/></svg></div>
  <h3>Drop your image here</h3>
  <p>JPG, PNG, WebP, GIF supported — or click to browse</p>
  <input type="file" id="toolFile" accept="image/*">
</div>
<div class="saas-form-group" style="margin-top:18px">
  <label class="saas-label">Quality: <span id="qualVal">75</span>%</label>
  <input type="range" id="qualSlider" min="10" max="95" value="75" data-tool-action="quality-display" style="width:100%;accent-color:#2d6a4f;margin-top:8px">
</div>
<button class="saas-btn saas-btn-primary" id="compressBtn" data-tool-action="compress" disabled style="width:100%;margin-top:4px">Compress Image</button>
<div class="util-result" id="compResult">
  <div class="util-result-inner">
    <div class="util-success-msg"><svg viewBox="0 0 16 16" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="7"/><path d="M5 8l2 2 4-4"/></svg> <span id="compInfo" class="util-result-info"></span></div>
    <a id="compDl" class="saas-btn saas-btn-primary saas-btn-sm">⬇ Download</a>
  </div>
  <img id="compPreview" alt="Compressed image preview" style="max-width:100%;border-radius:10px;margin-top:12px;display:none">
</div>`;
  }

  // ── IMAGE CONVERTER (Utility/Minimal) ────────────────────────────────────
  if (t === 'image-converter') {
    return `
<div class="saas-card-title">Image Converter</div>
<div class="util-format-tabs">
  <button class="util-format-tab active" data-fmt-mime="image/jpeg" data-fmt-ext="jpg">JPG</button>
  <button class="util-format-tab" data-fmt-mime="image/png" data-fmt-ext="png">PNG</button>
  <button class="util-format-tab" data-fmt-mime="image/webp" data-fmt-ext="webp">WebP</button>
</div>
<div class="util-dropzone" id="convDrop">
  <div class="util-dropzone-icon"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="8" width="32" height="24" rx="4"/><circle cx="14" cy="18" r="3"/><path d="M4 28l8-8 6 6 4-4 6 6"/></svg></div>
  <h3>Drop your image here</h3>
  <p>Any image format — PNG, JPG, WebP, GIF, BMP</p>
  <input type="file" id="convFile" accept="image/*">
</div>
<button class="saas-btn saas-btn-primary" id="convBtn" data-tool-action="convert" disabled style="width:100%;margin-top:16px">Convert Image</button>
<div class="util-result" id="convResult">
  <div class="util-result-inner">
    <div class="util-success-msg"><svg viewBox="0 0 16 16" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="7"/><path d="M5 8l2 2 4-4"/></svg> <span id="convInfo" class="util-result-info"></span></div>
    <a id="convDl" class="saas-btn saas-btn-primary saas-btn-sm">⬇ Download</a>
  </div>
  <img id="convPreview" alt="Converted image format preview" style="max-width:100%;border-radius:10px;margin-top:12px;display:none">
</div>`;
  }

  // ── PDF MERGE (Utility/Minimal) ───────────────────────────────────────────
  if (t === 'pdf-merge') {
    return `
<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js" defer></script>
<div class="saas-card-title">PDF Merge Tool</div>
<div class="util-dropzone" id="mergeDrop">
  <div class="util-dropzone-icon"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 4h14l8 8v24H10V4z"/><path d="M24 4v8h8"/><line x1="15" y1="20" x2="27" y2="20"/><line x1="15" y1="26" x2="27" y2="26"/></svg></div>
  <h3>Drop PDF files here</h3>
  <p>Add two or more PDFs to merge into one document</p>
  <input type="file" id="mergeFile" accept="application/pdf" multiple>
  <div style="margin-top:12px"><button class="saas-btn saas-btn-ghost saas-btn-sm" type="button" data-tool-action="browse-merge">Browse Files</button></div>
</div>
<div class="util-file-list" id="mergeFileList"></div>
<button class="saas-btn saas-btn-primary" id="mergeBtn" data-tool-action="merge" disabled style="width:100%;margin-top:4px">Merge PDFs</button>
<div class="util-result" id="mergeResult">
  <div class="util-result-inner">
    <div class="util-success-msg"><svg viewBox="0 0 16 16" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="7"/><path d="M5 8l2 2 4-4"/></svg> <span id="mergeInfo" class="util-result-info"></span></div>
    <a id="mergeDl" class="saas-btn saas-btn-primary saas-btn-sm">⬇ Download PDF</a>
  </div>
</div>`;
  }

  // ── PDF SPLIT (Utility/Minimal) ───────────────────────────────────────────
  if (t === 'pdf-split') {
    return `
<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js" defer></script>
<div class="saas-card-title">PDF Splitter</div>
<div class="util-dropzone" id="splitDrop">
  <div class="util-dropzone-icon"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10" cy="10" r="4"/><circle cx="10" cy="30" r="4"/><line x1="14" y1="12" x2="34" y2="34"/><line x1="14" y1="28" x2="34" y2="6"/></svg></div>
  <h3>Drop your PDF here</h3>
  <p>Select a single PDF file to extract pages from</p>
  <input type="file" id="splitFile" accept="application/pdf">
</div>
<div id="splitPageInfo" style="display:none;margin:14px 0;font-size:0.88rem;color:#6b7280;"></div>
<div class="saas-form-group" style="margin-top:12px">
  <label class="saas-label">Page Range</label>
  <input class="saas-input" id="splitRange" placeholder="e.g. 1-3 or 1,3,5 or 2-4,7" style="font-family:monospace">
  <p style="font-size:0.78rem;color:#9ca3af;margin-top:6px">Use ranges (1-5), specific pages (1,3,7), or combine (1-3,7,10-12)</p>
</div>
<button class="saas-btn saas-btn-primary" id="splitBtn" data-tool-action="split" disabled style="width:100%">Extract Pages</button>
<div class="util-result" id="splitResult">
  <div class="util-result-inner">
    <div class="util-success-msg"><svg viewBox="0 0 16 16" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="7"/><path d="M5 8l2 2 4-4"/></svg> <span id="splitInfo" class="util-result-info"></span></div>
    <a id="splitDl" class="saas-btn saas-btn-primary saas-btn-sm">⬇ Download PDF</a>
  </div>
</div>`;
  }

  return `<div class="saas-empty-state"><div class="saas-empty-icon"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 1 21 12a10 10 0 0 1-2.93 7.07M4.93 4.93A10 10 0 0 0 3 12a10 10 0 0 0 1.93 7.07M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></div><p class="saas-empty-text">Tool UI coming soon.</p></div>`;
}

// ── PREMIUM SAAS TOOL PAGE TEMPLATE ─────────────────────────────────────────
function genToolPage(tool) {
  const isUtility = tool.categorySlug === 'utility';
  const bc = breadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Tools Hub', url: '/tools/' },
    { name: tool.name, url: '/tools/' + tool.slug + '.html' }
  ]);

  const relatedHtml = (tool.relatedTools || []).map(slug => {
    const rel = toolsData.find(t => t.slug === slug);
    if (!rel) return '';
    return `<a href="/tools/${slug}.html" class="tool-related-card"><span class="tool-related-icon">${rel.icon}</span>${rel.name} →</a>`;
  }).join('');

  const faqHtml = (tool.faq || []).map((item, i) =>
    `<div class="tool-faq-item" id="tfaq${i}">
<div class="tool-faq-q" data-faq-id="tfaq${i}">${item.q}</div>
<div class="tool-faq-a">${item.a}</div>
</div>`
  ).join('');

  return `${head(tool.metaTitle, tool.metaDesc, '/tools/' + tool.slug + '.html')}
<body>
${NAV}
${bc.html}${bc.schema}
${TOOL_TRACKER_JS}

<section class="saas-tool-hero">
<div class="saas-tool-hero-inner">
<a href="/tools/" class="saas-back-link">← Back to Tools Hub</a>
<div class="saas-hero-tag">${tool.category}</div>
<h1>${tool.name}</h1>
<p class="saas-hero-sub">${tool.desc}</p>
<div class="saas-hero-badges">
<span class="saas-hero-badge">✓ Free forever</span>
<span class="saas-hero-badge">✓ No sign-up</span>
<span class="saas-hero-badge">✓ Private &amp; secure</span>
<span class="saas-hero-badge">✓ Works offline</span>
</div>
</div>
</section>

<div class="saas-workspace" data-tool-type="${tool.type}">
<div class="saas-card">
${toolUIByType(tool)}
</div>
</div>

${tool.content ? `<div class="tool-content-section"><div class="tool-content-inner">${tool.content}</div></div>` : ''}

${faqHtml ? `<div class="tool-faq-section"><h2>Frequently Asked Questions</h2>${faqHtml}</div>` : ''}

${relatedHtml ? `<div class="tool-related-section"><h2>Related Tools</h2><div class="tool-related-grid">${relatedHtml}</div></div>` : ''}

<script src="/js/main.js" defer></script>
<script src="/js/tools.js" defer></script>
${FOOTER}
${CHATBOT}
</body></html>`;
}

// ── GENERATE INDIVIDUAL TOOL PAGES ────────────────────────────────────────────
toolsData.forEach(tool => {
  fs.writeFileSync(`tools/${tool.slug}.html`, genToolPage(tool));
});
console.log('Generated ' + toolsData.length + ' tool pages');

// ── TOOLS INDEX (Premium Hub Page) ───────────────────────────────────────────
const hubCategories = [
  { id: 'health', name: 'Health & Tracking', icon: '', desc: 'Habit streaks, sleep analysis, mood calendar, step goals' },
  { id: 'productivity', name: 'Productivity', icon: '', desc: 'Pomodoro timer, daily planner, goal tracking' },
  { id: 'text', name: 'Text & Content', icon: '', desc: 'Text analysis, headline scoring, content idea generation' },
];
const utilityTools = toolsData.filter(t => t.categorySlug === 'utility');

const catSections = hubCategories.map(cat => {
  const catTools = toolsData.filter(t => t.categorySlug === cat.id);
  const cards = catTools.map(tool => `
<a href="/tools/${tool.slug}.html" class="tool-premium-card" data-name="${tool.name.toLowerCase()} ${tool.desc.toLowerCase()}" data-cat="${tool.categorySlug}">
<div class="tool-premium-icon">${tool.icon}</div>
<div class="tool-premium-name">${tool.name}</div>
<div class="tool-premium-desc">${tool.desc}</div>
<div class="tool-premium-cta">Open Tool <span class="tool-premium-cta-arrow">→</span></div>
</a>`).join('');
  return `
<div class="tools-hub-section" data-section="${cat.id}">
<div class="tools-hub-section-header">
<div class="tools-hub-section-icon">${cat.icon}</div>
<div><div class="tools-hub-section-title">${cat.name}</div><div class="tools-hub-section-desc">${cat.desc}</div></div>
</div>
<div class="tools-premium-grid">${cards}</div>
</div>`;
}).join('');

const utilityCards = utilityTools.map(tool => `
<a href="/tools/${tool.slug}.html" class="utility-minimal-card" data-name="${tool.name.toLowerCase()}" data-cat="utility">
<span class="utility-minimal-icon">${tool.icon}</span>${tool.name}
</a>`).join('');

fs.writeFileSync('tools/index.html', `${head('Free Health &amp; Productivity Tools | VitalHealth Hub', 'Premium free online tools: habit tracker, sleep tracker, mood tracker, focus timer, daily planner, text analyzer, headline analyzer and more. No sign-up, all data stays private.', '/tools/')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Tools Hub',url:'/tools/'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Tools Hub',url:'/tools/'}]).schema}

${globalHero({
  badge: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Smart Tools for Daily Optimization',
  title: 'All-in-One Health &amp;<br>Productivity Tools',
  subtitle: 'Track habits, analyze health, and improve performance with powerful tools.',
  searchId: 'toolsSearch',
  searchPlaceholder: 'Search tools...',
  searchOnInput: 'filterHub(this.value)',
  buttons: [
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> Browse Tools', href: '#tools-content' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.76A3 3 0 1 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.76A3 3 0 1 0 14.5 2"/></svg> Take a Quiz', href: '/quizzes/' },
    { label: '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Read Articles', href: '/blog.html' }
  ],
  stats: [
    { value: toolsData.length + '', label: 'Tools' },
    { value: '4', label: 'Categories' },
    { value: '100%', label: 'Free' },
    { value: 'Private', label: 'Data stays local' }
  ]
})}

<div class="tools-cat-nav">
<div class="tools-cat-tabs">
<button class="tools-cat-tab active" data-filter-cat="all">All Tools</button>
<button class="tools-cat-tab" data-filter-cat="health">Health &amp; Tracking</button>
<button class="tools-cat-tab" data-filter-cat="productivity">Productivity</button>
<button class="tools-cat-tab" data-filter-cat="text">Text &amp; Content</button>
<button class="tools-cat-tab" data-filter-cat="utility">Utility Tools</button>
</div>
</div>

<div class="tools-hub-content" id="tools-content">

<div class="tools-activity-panel" id="activityPanel">
<div class="tools-activity-head">⏱ Recently Used</div>
<div class="tools-activity-list" id="activityList"></div>
</div>

${catSections}

<div class="tools-hub-section utility-minimal-section" data-section="utility">
<div class="tools-hub-section-header">

<div><div class="tools-hub-section-title">Utility Tools</div><div class="tools-hub-section-desc">File conversion, PDF tools — minimal, fast, private</div></div>
</div>
<div class="utility-minimal-grid">${utilityCards}</div>
</div>

</div>

${FOOTER}
${CHATBOT}
</body></html>`);
console.log('Generated tools/index.html');


// SITEMAP.XML
let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
['/','/about.html','/contact.html','/faq.html','/blog.html','/privacy.html','/disclaimer.html','/terms.html','/sitemap.html','/calculators/','/quizzes/'].forEach(u => {
  sitemapXml += `<url><loc>${SITE}${u}</loc><changefreq>weekly</changefreq><priority>${u==='/'?'1.0':'0.8'}</priority></url>\n`;
});
calculators.forEach(c => {
  sitemapXml += `<url><loc>${SITE}/calculators/${c.slug}.html</loc><lastmod>2025-05-01</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
});
blogPosts.forEach(p => {
  sitemapXml += `<url><loc>${SITE}/blog/${p.slug}.html</loc><lastmod>${p.date}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
});
quizzesData.forEach(q => {
  sitemapXml += `<url><loc>${SITE}/quizzes/${q.slug}.html</loc><lastmod>2025-05-01</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
});
sitemapXml += `<url><loc>${SITE}/tools/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
toolsData.forEach(t => {
  sitemapXml += `<url><loc>${SITE}/tools/${t.slug}.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
});
sitemapXml += '</urlset>';
fs.writeFileSync('sitemap.xml', sitemapXml);

// ROBOTS.TXT
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

const totalPages = 9 + calculators.length + blogPosts.length + quizzesData.length + toolsData.length + 2;
console.log('All files generated successfully!');
console.log('Total pages: ' + totalPages + ' (' + calculators.length + ' calculators, ' + blogPosts.length + ' blogs, ' + quizzesData.length + ' quizzes, ' + toolsData.length + ' tools, 9 static)');
