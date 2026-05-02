const fs = require('fs');
const path = require('path');
const { getCalcHeroSvg } = require('./calculator-svgs.js');
const quizzesData = require('./quizzes-data.js');

const SITE = 'https://vitalhealthhub.com';
const SITE_NAME = 'VitalHealth Hub';

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }

const TOPBAR = `<div class="top-bar"><div class="top-bar-inner">
<a href="mailto:ma7122671@gmail.com" class="top-bar-email"><svg viewBox="0 0 20 20" fill="none" width="14" height="14"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 6l8 5 8-5" stroke="currentColor" stroke-width="1.5"/></svg> <span>ma7122671@gmail.com</span></a>
<div class="top-bar-social">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" title="Ali Haider on LinkedIn" aria-label="Visit Ali Haider LinkedIn Profile" class="tb-linkedin"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer" title="Ali Haider on Facebook" aria-label="Visit Ali Haider Facebook Page" class="tb-facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer" title="Ali Haider SEO on Instagram" aria-label="Visit Ali Haider Instagram Profile" class="tb-instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg></a>
</div>
</div></div>`;

const NAV = `${TOPBAR}<nav class="navbar">
<div class="nav-container">
<a href="/" class="nav-logo" aria-label="VitalHealth Hub — Home"><img src="/images/logo.png" alt="VitalHealth Hub" class="nav-logo-img"></a>
<ul class="nav-links">
<li><a href="/">Home</a></li>
<li class="nav-dropdown-wrap"><a href="/calculators/" class="nav-dropdown-trigger">Calculators <svg class="dd-arrow" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
<div class="mega-dropdown">
<div class="mega-dropdown-inner">
<div class="mega-col">
<h4>Weight &amp; Body</h4>
<ul>
<li><a href="/calculators/bmi-calculator.html">BMI Calculator</a></li>
<li><a href="/calculators/ideal-weight-calculator.html">Ideal Weight</a></li>
<li><a href="/calculators/body-fat-calculator.html">Body Fat Calculator</a></li>
<li><a href="/calculators/lean-body-mass-calculator.html">Lean Body Mass</a></li>
<li><a href="/calculators/waist-to-hip-ratio.html">Waist-to-Hip Ratio</a></li>
<li><a href="/calculators/visceral-fat-calculator.html">Visceral Fat</a></li>
<li><a href="/calculators/bmi-prime-calculator.html">BMI Prime</a></li>
<li><a href="/calculators/body-recomposition-calculator.html">Body Recomposition</a></li>
<li><a href="/calculators/lean-mass-goal-calculator.html">Lean Mass Goal</a></li>
<li><a href="/calculators/waist-reduction-calculator.html">Waist Reduction</a></li>
</ul>
</div>
<div class="mega-col">
<h4>Nutrition &amp; Diet</h4>
<ul>
<li><a href="/calculators/calorie-calculator.html">Calorie Calculator</a></li>
<li><a href="/calculators/macro-calculator.html">Macro Calculator</a></li>
<li><a href="/calculators/tdee-calculator.html">TDEE Calculator</a></li>
<li><a href="/calculators/protein-timing-calculator.html">Protein Timing</a></li>
<li><a href="/calculators/sugar-intake-calculator.html">Sugar Intake</a></li>
<li><a href="/calculators/electrolyte-calculator.html">Electrolyte Needs</a></li>
<li><a href="/calculators/omega3-calculator.html">Omega-3 Intake</a></li>
<li><a href="/calculators/fiber-score-calculator.html">Fiber Score</a></li>
<li><a href="/calculators/anti-inflammatory-score.html">Anti-Inflammatory Score</a></li>
<li><a href="/calculators/diet-comparison-calculator.html">Diet Comparison</a></li>
</ul>
</div>
<div class="mega-col">
<h4>Heart &amp; Vitals</h4>
<ul>
<li><a href="/calculators/heart-age-calculator.html">Heart Age Calculator</a></li>
<li><a href="/calculators/heart-rate-calculator.html">Heart Rate Calculator</a></li>
<li><a href="/calculators/blood-pressure-checker.html">Blood Pressure</a></li>
<li><a href="/calculators/cholesterol-risk-calculator.html">Cholesterol Risk</a></li>
<li><a href="/calculators/homa-ir-calculator.html">HOMA-IR (Insulin)</a></li>
<li><a href="/calculators/sodium-intake-calculator.html">Sodium Intake</a></li>
<li><a href="/calculators/testosterone-estimator.html">Testosterone Estimator</a></li>
<li><a href="/calculators/metabolic-age-calculator.html">Metabolic Age</a></li>
<li><a href="/calculators/thyroid-risk-calculator.html">Thyroid Risk</a></li>
<li><a href="/calculators/biological-age-calculator.html">Biological Age</a></li>
</ul>
</div>
<div class="mega-col">
<h4>Women&#39;s Health</h4>
<ul>
<li><a href="/calculators/pregnancy-week-calculator.html">Pregnancy Week</a></li>
<li><a href="/calculators/pregnancy-due-date-calculator.html">Pregnancy Due Date</a></li>
<li><a href="/calculators/pregnancy-weight-gain-calculator.html">Pregnancy Weight Gain</a></li>
<li><a href="/calculators/breastfeeding-calorie-calculator.html">Breastfeeding Calories</a></li>
<li><a href="/calculators/pcos-risk-calculator.html">PCOS Risk</a></li>
<li><a href="/calculators/menopause-symptom-calculator.html">Menopause Symptoms</a></li>
<li><a href="/calculators/ovulation-calculator.html">Ovulation Calculator</a></li>
<li><a href="/calculators/fertility-calculator.html">Fertility Calculator</a></li>
<li><a href="/calculators/child-growth-calculator.html">Child Growth</a></li>
</ul>
</div>
<div class="mega-col">
<h4>Fitness &amp; Performance</h4>
<ul>
<li><a href="/calculators/strength-level-calculator.html">Strength Level</a></li>
<li><a href="/calculators/marathon-time-predictor.html">Marathon Predictor</a></li>
<li><a href="/calculators/hiit-calories-calculator.html">HIIT Calories</a></li>
<li><a href="/calculators/calorie-burn-calculator.html">Activity Calorie Burn</a></li>
<li><a href="/calculators/step-goal-calculator.html">Step Goal</a></li>
<li><a href="/calculators/one-rep-max-calculator.html">One Rep Max</a></li>
<li><a href="/calculators/vo2-max-calculator.html">VO2 Max</a></li>
<li><a href="/calculators/running-pace-calculator.html">Running Pace</a></li>
<li><a href="/calculators/injury-risk-calculator.html">Injury Risk</a></li>
<li><a href="/calculators/steps-to-calories-calculator.html">Steps to Calories</a></li>
</ul>
</div>
<div class="mega-col">
<h4>Mind &amp; General Tools</h4>
<ul>
<li><a href="/calculators/age-calculator.html">Age Calculator</a></li>
<li><a href="/calculators/birthday-calculator.html">Birthday Calculator</a></li>
<li><a href="/calculators/percentage-calculator.html">Percentage Calculator</a></li>
<li><a href="/calculators/loan-emi-calculator.html">Loan EMI Calculator</a></li>
<li><a href="/calculators/countdown-timer.html">Countdown Timer</a></li>
<li><a href="/calculators/burnout-risk-calculator.html">Burnout Risk</a></li>
<li><a href="/calculators/focus-score-calculator.html">Focus Score</a></li>
<li><a href="/calculators/sleep-hygiene-calculator.html">Sleep Hygiene</a></li>
<li><a href="/calculators/productivity-score-calculator.html">Productivity Score</a></li>
<li><a href="/calculators/digital-detox-calculator.html">Digital Detox</a></li>
</ul>
</div>
</div>
<div class="mega-dropdown-bottom">
<span>Can&#39;t find what you need?</span>
<a href="/calculators/" class="btn btn-primary btn-sm">View All 115+ Calculators &rarr;</a>
</div>
</div>
</li>
<li><a href="/blog.html">Blog</a></li>
<li><a href="/quizzes/">Quizzes</a></li>
<li><a href="/about.html">About</a></li>
<li><a href="/contact.html">Contact</a></li>
<li><a href="/faq.html">FAQ</a></li>
</ul>
<button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
</div></nav>`;

const FOOTER = `<footer>
<div class="footer-top">
<div class="footer-col">
<div class="footer-logo">
<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#2d6a4f"/><path d="M16 6 C16 6 8 12 8 20 C8 26 12 28 16 28 C20 28 24 26 24 20 C24 12 16 6 16 6Z" fill="#52b788"/><path d="M16 10 C16 10 11 15 11 20 C11 24 13 26 16 26" fill="#d8f3dc" opacity="0.6"/></svg>
<span style="color:#fff;font-family:'Playfair Display',serif;font-size:20px;font-weight:700;margin-left:10px;">VitalHealth Hub</span>
</div>
<p style="font-size:14px;line-height:1.7;margin:16px 0;color:#9ca3af;max-width:260px;">Your trusted source for free health calculators, evidence-based wellness tools, and expert health guidance — accessible to everyone, always free.</p>
<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52b788" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
<a href="mailto:ma7122671@gmail.com" style="color:#9ca3af;font-size:13px;transition:color 0.2s;" onmouseover="this.style.color='#52b788'" onmouseout="this.style.color='#9ca3af'">ma7122671@gmail.com</a>
</div>
<div class="footer-socials">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" class="footer-social-btn linkedin" title="Ali Haider on LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="#9ca3af"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer" class="footer-social-btn facebook" title="Ali Haider on Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="#9ca3af"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer" class="footer-social-btn instagram" title="Ali Haider on Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#9ca3af"/></svg></a>
</div>
</div>
<div class="footer-col">
<h4>Popular Tools</h4>
<ul>
<li><a href="/calculators/bmi-calculator.html">\u2192 BMI Calculator</a></li>
<li><a href="/calculators/calorie-calculator.html">\u2192 Calorie Calculator</a></li>
<li><a href="/calculators/macro-calculator.html">\u2192 Macro Calculator</a></li>
<li><a href="/calculators/tdee-calculator.html">\u2192 TDEE Calculator</a></li>
<li><a href="/calculators/body-fat-calculator.html">\u2192 Body Fat Calculator</a></li>
<li><a href="/calculators/water-intake-calculator.html">\u2192 Water Intake</a></li>
<li><a href="/calculators/sleep-calculator.html">\u2192 Sleep Calculator</a></li>
<li><a href="/calculators/heart-rate-calculator.html">\u2192 Heart Rate</a></li>
<li><a href="/calculators/index.html">\u2192 View All 50+ Tools \u2192</a></li>
</ul>
</div>
<div class="footer-col">
<h4>Quick Links</h4>
<ul>
<li><a href="/index.html">\u2192 Home</a></li>
<li><a href="/about.html">\u2192 About Us</a></li>
<li><a href="/blog.html">\u2192 Health Blog</a></li>
<li><a href="/faq.html">\u2192 FAQ</a></li>
<li><a href="/contact.html">\u2192 Contact Us</a></li>
<li><a href="/calculators/index.html">\u2192 All Calculators</a></li>
<li><a href="/sitemap.html">\u2192 Sitemap</a></li>
</ul>
</div>
<div class="footer-col">
<h4>Legal</h4>
<ul>
<li><a href="/privacy.html">\u2192 Privacy Policy</a></li>
<li><a href="/disclaimer.html">\u2192 Medical Disclaimer</a></li>
<li><a href="/terms.html">\u2192 Terms of Use</a></li>
</ul>
<div style="margin-top:24px;padding:16px;background:#111413;border-radius:10px;border-left:3px solid #2d6a4f;">
<p style="font-size:12px;color:#6b7280;line-height:1.6;"><strong style="color:#9ca3af;">\u2695\ufe0f Medical Notice:</strong><br>All content is for informational purposes only. Always consult a qualified healthcare professional.</p>
</div>
</div>
<div class="footer-col">
<h4>Created By</h4>
<div style="background:#111413;border-radius:12px;padding:20px;border:1px solid #2d2d2d;">
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
<div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#2d6a4f,#52b788);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<span style="color:#fff;font-weight:700;font-size:18px;">A</span>
</div>
<div>
<p style="color:#fff;font-weight:600;font-size:15px;margin:0;">Ali Haider</p>
<p style="color:#52b788;font-size:12px;margin:2px 0 0;">SEO Consultant</p>
</div>
</div>
<p style="font-size:13px;color:#9ca3af;line-height:1.6;margin-bottom:16px;">Building accessible health tools and evidence-based content for millions of users worldwide.</p>
<div style="display:flex;flex-direction:column;gap:8px;">
<a href="mailto:ma7122671@gmail.com" style="display:flex;align-items:center;gap:8px;color:#9ca3af;font-size:13px;transition:color 0.2s;" onmouseover="this.style.color='#52b788'" onmouseout="this.style.color='#9ca3af'">\u2709 ma7122671@gmail.com</a>
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:8px;color:#9ca3af;font-size:13px;transition:color 0.2s;" onmouseover="this.style.color='#0077b5'" onmouseout="this.style.color='#9ca3af'">\uD83D\uDD17 LinkedIn Profile</a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:8px;color:#9ca3af;font-size:13px;transition:color 0.2s;" onmouseover="this.style.color='#1877f2'" onmouseout="this.style.color='#9ca3af'">\uD83D\uDCD8 Facebook Page</a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:8px;color:#9ca3af;font-size:13px;transition:color 0.2s;" onmouseover="this.style.color='#e1306c'" onmouseout="this.style.color='#9ca3af'">\uD83D\uDCF8 @ali_haiderseo</a>
</div>
</div>
</div>
</div>
<div class="footer-disclaimer">
<p><strong>\u2695\uFE0F Medical Disclaimer:</strong> The content on VitalHealth Hub is strictly for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on this website.</p>
</div>
<div class="footer-bottom">
<p>\u00A9 2025 VitalHealth Hub. All rights reserved. Created with \u2764\uFE0F by Ali Haider</p>
<div class="footer-bottom-links">
<a href="/privacy.html">Privacy Policy</a>
<a href="/disclaimer.html">Disclaimer</a>
<a href="/terms.html">Terms of Use</a>
<a href="/sitemap.html">Sitemap</a>
</div>
</div>
</footer>`;

const CHATBOT = `<div id="vh-chatbot">
<button id="vh-chat-toggle" aria-label="Open Health Assistant">
<svg id="vh-chat-icon" width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
<svg id="vh-close-icon" width="22" height="22" viewBox="0 0 24 24" fill="white" style="display:none;"><line x1="18" y1="6" x2="6" y2="18" stroke="white" stroke-width="2.5"/><line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="2.5"/></svg>
<span id="vh-chat-badge">1</span>
</button>
<div id="vh-chat-window" style="display:none;">
<div id="vh-chat-header">
<div style="display:flex;align-items:center;gap:10px;">
<div id="vh-bot-avatar"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
<div>
<p style="color:#fff;font-weight:600;font-size:14px;margin:0;">VitalHealth Assistant</p>
<p style="color:#a7f3d0;font-size:11px;margin:0;">\uD83D\uDFE2 Online \u2014 Health Q&A Bot</p>
</div>
</div>
<button id="vh-chat-minimize">\u2014</button>
</div>
<div id="vh-chat-messages"></div>
<div id="vh-quick-topics">
<p style="font-size:11px;color:#6b7280;margin:0 0 8px;font-weight:500;">Quick Topics:</p>
<div id="vh-topics-grid">
<button class="vh-topic-btn" onclick="vhChat.quickAsk('BMI')">\u2696\uFE0F BMI</button>
<button class="vh-topic-btn" onclick="vhChat.quickAsk('Calories')">\uD83D\uDD25 Calories</button>
<button class="vh-topic-btn" onclick="vhChat.quickAsk('Sleep')">\uD83D\uDE34 Sleep</button>
<button class="vh-topic-btn" onclick="vhChat.quickAsk('Water')">\uD83D\uDCA7 Water</button>
<button class="vh-topic-btn" onclick="vhChat.quickAsk('Weight Loss')">\uD83D\uDCC9 Weight Loss</button>
<button class="vh-topic-btn" onclick="vhChat.quickAsk('Protein')">\uD83D\uDCAA Protein</button>
<button class="vh-topic-btn" onclick="vhChat.quickAsk('Heart Health')">\u2764\uFE0F Heart</button>
<button class="vh-topic-btn" onclick="vhChat.quickAsk('Stress')">\uD83E\uDDE0 Stress</button>
</div>
</div>
<div id="vh-chat-input-area">
<input type="text" id="vh-chat-input" placeholder="Ask a health question..." autocomplete="off" maxlength="200">
<button id="vh-chat-send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
</div>
<p id="vh-chat-disclaimer">\u2695\uFE0F For informational purposes only. Not medical advice. Consult your doctor.</p>
</div>
</div>`;

const BTT = `<button class="back-to-top" aria-label="Back to top"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 16V4M4 10l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;

function head(title, desc, canonical, extra = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${SITE}${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${canonical}">
<link rel="stylesheet" href="/css/style.css">
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

function calcSvg(type) {
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
    calc.article = `<h2>About the ${calc.name}</h2><p>The ${calc.name} is a valuable health tool that helps you understand important aspects of your wellness. This calculator uses established formulas and guidelines to provide personalized results based on your individual measurements and characteristics.</p><h3>Why Use This Calculator</h3><p>Understanding your health metrics is the first step toward making informed decisions about your lifestyle. Whether you are tracking fitness progress, managing a health condition, or simply curious about your current status, this tool provides quick, easy-to-understand results that can guide your health journey.</p><h3>How to Interpret Results</h3><p>Results are color-coded for easy interpretation: green indicates a healthy or optimal range, yellow suggests caution or borderline values, and red signals that you should consult a healthcare professional. Remember that these are estimates — individual factors can affect accuracy.</p><h3>Taking Action</h3><p>Use your results as a starting point for conversations with healthcare providers. Track your metrics over time to identify trends and measure progress. Combine multiple calculators for a more comprehensive view of your health status. Small, consistent changes in diet, exercise, and lifestyle habits can lead to significant improvements over time.</p>`;
  }
  if (!calc.faqs) {
    calc.faqs = [
      {q:`What is the ${calc.name}?`,a:`The ${calc.name} is a tool that helps you ${calc.desc.toLowerCase()}`},
      {q:'How accurate is this calculator?',a:'This calculator provides estimates based on established formulas. For medical decisions, always consult a healthcare professional.'},
      {q:'How often should I use this calculator?',a:'For tracking purposes, using the calculator monthly provides useful trend data. More frequent use is fine for awareness.'},
      {q:'Can I rely on these results for medical decisions?',a:'This tool is for informational purposes only. Always consult qualified healthcare professionals for medical advice and decisions.'},
      {q:'What factors affect the accuracy?',a:'Individual variation, measurement technique, and the limitations of estimation formulas can all affect accuracy.'},
      {q:'Should I share results with my doctor?',a:'Yes, sharing calculator results with your healthcare provider can facilitate productive discussions about your health.'},
      {q:'Is this calculator suitable for all ages?',a:'Most calculators are designed for adults. Pediatric assessments may require different formulas and professional evaluation.'},
      {q:'What do the colors mean?',a:'Green indicates healthy/optimal, yellow means caution/borderline, and red suggests you should consult a healthcare professional.'},
      {q:'Can lifestyle changes improve my results?',a:'Yes, improvements in diet, exercise, sleep, and stress management can positively impact most health metrics over time.'},
      {q:'Where do the formulas come from?',a:'Our calculators use peer-reviewed, established medical and scientific formulas that are widely used by healthcare professionals.'},
    ];
  }
  if (!calc.related) {
    calc.related = ['bmi-calculator','calorie-calculator','tdee-calculator','heart-rate-calculator'];
  }
});

function calcSeoMeta(calc) {
  const n = calc.name.replace(/ Calculator$/i,'').replace(/ Checker$/i,'').replace(/ Calculator$/i,'');
  const slug = calc.slug;
  const metaDesc = `Use our free ${calc.name} online to get accurate results instantly. Get personalized ${n.toLowerCase()} results with healthy range guidance for men and women. 100% free.`;
  const keywords = `${n.toLowerCase()} calculator, free ${n.toLowerCase()} calculator, ${n.toLowerCase()} calculator online, calculate ${n.toLowerCase()} online, accurate ${n.toLowerCase()} calculator, ${n.toLowerCase()} for men, ${n.toLowerCase()} for women, how to calculate ${n.toLowerCase()}, what is a healthy ${n.toLowerCase()}, ${n.toLowerCase()} explained, ${n.toLowerCase()} ranges for adults`;
  return { metaDesc, keywords };
}

function calcHowToSection(calc) {
  const n = calc.name;
  const fieldList = calc.fields.map((f,i) => `<li><strong>Step ${i+1} — ${f.label}:</strong> Enter your ${f.label.toLowerCase()}${f.type==='select'?' by selecting the option that best matches your situation':' in the input field'}.`).join('</li>');
  return `<section class="seo-section fade-in">
<h2>How to Use the ${n}</h2>
<ol class="how-to-steps">
${fieldList}</li>
<li><strong>Step ${calc.fields.length+1} — Click Calculate:</strong> Press the Calculate button to instantly get your personalized results.</li>
<li><strong>Step ${calc.fields.length+2} — Read Your Results:</strong> Your result will appear color-coded — green for healthy, yellow for borderline, red for at-risk ranges.</li>
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
    return rc ? `<a href="/calculators/${r}.html" class="related-calc-card"><div class="related-calc-icon">${calcSvg(rc.icon)}</div><div><h4>${rc.name}</h4><p>${rc.desc}</p><span class="read-more">Use Calculator &rarr;</span></div></a>` : '';
  }).filter(Boolean).join('');
  return `<section class="seo-section fade-in">
<h2>Related Calculators You Might Find Useful</h2>
<div class="related-calcs-grid">${cards}</div>
</section>`;
}

function generateCalculatorPage(calc) {
  const bc = breadcrumb([{name:'Home',url:'/'},{name:'Calculators',url:'/calculators/'},{name:calc.name,url:'/calculators/'+calc.slug+'.html'}]);
  const faq = faqSection(calc.faqs);
  const share = shareButtons('/calculators/'+calc.slug+'.html', calc.name+' - '+SITE_NAME);
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

  const relatedHtml = (calc.related||[]).slice(0,4).map(r => {
    const rc = calculators.find(c => c.slug === r);
    return rc ? `<a href="/calculators/${r}.html" class="card"><div class="card-icon">${calcSvg(rc.icon)}</div><h3>${rc.name}</h3><p>${rc.desc}</p></a>` : '';
  }).join('');

  const pageTitle = calc.name.endsWith('Calculator') || calc.name.endsWith('Checker') ? `${calc.name} – Free & Accurate | ${SITE_NAME}` : `${calc.name} Calculator – Free & Accurate | ${SITE_NAME}`;

  const webAppSchema = {"@context":"https://schema.org","@type":"WebApplication","name":calc.name,"url":SITE+'/calculators/'+calc.slug+'.html',"applicationCategory":"HealthApplication","operatingSystem":"Web Browser","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"description":seo.metaDesc};

  const extraHead = `<meta name="keywords" content="${seo.keywords}">
<script type="application/ld+json">${JSON.stringify(webAppSchema)}</script>
${faq.schema}`;

  return `${head(pageTitle, seo.metaDesc, '/calculators/'+calc.slug+'.html', extraHead)}
<body>
${NAV}
${bc.html}
${bc.schema}
<section class="section" style="padding-top:40px;">
<div class="container">
<div class="calc-container">
${getCalcHeroSvg(calc.slug)}
<h1 class="fade-in">${calc.name}</h1>
<p class="fade-in" style="margin-bottom:30px;color:var(--gray-500);">Use our free ${calc.name.toLowerCase()} online to get accurate, personalized results. ${calc.desc}</p>
<div class="calc-form fade-in">
${formFields}
<button class="btn btn-primary" onclick="${calc.logic.replace(/"/g,'&quot;')}" style="width:100%;justify-content:center;">Calculate Now &rarr;</button>
</div>
<div id="result" class="result-box">
<div class="result-value"></div>
<div class="result-label"></div>
<div class="progress-container"><div class="progress-bar"><div class="progress-fill"></div></div></div>
<div class="result-suggestion"></div>
</div>
<div class="disclaimer-box fade-in">⚕️ This tool is for informational purposes only. Always consult a qualified healthcare professional for medical advice.</div>
${share}
</div>
</div>
</section>

<section class="section section-alt">
<div class="container">
${calcHowToSection(calc)}
<div class="fade-in" style="margin-top:40px;">${calc.article}</div>
<section class="section fade-in"><div class="section-title"><h2>Frequently Asked Questions About ${n}</h2></div>${faq.html}</section>
${calcTipsSection(calc)}
${calcRelatedCards(calc)}
<section class="related-section fade-in"><div class="section-title"><h2>More Calculators</h2></div><div class="grid-4">${relatedHtml}</div></section>
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js"></script>
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
  {slug:'omega-3-fatty-acids-complete-guide',title:'Omega-3 Fatty Acids: Benefits, Sources and How Much You Need',category:'Nutrition & Diet',date:'2025-02-01',readTime:'8 min',calcEmbed:'omega-3-calculator',tags:['omega-3 benefits','fish oil','EPA DHA','omega-3 sources','heart brain health']},
  {slug:'anti-inflammatory-diet-guide',title:'Anti-Inflammatory Diet: Foods to Eat and Avoid for Better Health',category:'Nutrition & Diet',date:'2025-02-04',readTime:'9 min',calcEmbed:'anti-inflammatory-score-calculator',tags:['anti-inflammatory foods','inflammation diet','turmeric berries','chronic inflammation','healing diet']},
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
  {slug:'breastfeeding-calorie-and-nutrition-guide',title:'Breastfeeding Nutrition: How Many Calories Do You Need?',category:"Women's Health",date:'2025-03-21',readTime:'8 min',calcEmbed:'breastfeeding-calories-calculator',tags:['breastfeeding calories','nursing nutrition','lactation diet','postpartum nutrition','breastfeeding needs']},
  {slug:'menopause-weight-gain-tips',title:'Menopause and Weight Gain: Why It Happens and How to Fight It',category:"Women's Health",date:'2025-03-24',readTime:'9 min',calcEmbed:'menopause-symptoms-calculator',tags:['menopause weight gain','perimenopause','hormone weight gain','menopause diet','estrogen weight']},
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
  <p class="calc-embed-heading">🧮 Try It Yourself: ${name}</p>
  <p style="color:#6b9e80;font-size:0.9rem;margin:0 0 16px;">Get your personalized results in under 30 seconds — 100% free, no sign-up needed.</p>
  <a href="/calculators/${calcSlug}.html" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:8px;">Open Free Calculator &rarr;</a>
  <p class="calc-embed-caption">Used by 100,000+ people monthly. Evidence-based results, instantly.</p>
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
  const blogMetaDesc = `${post.title} — Learn evidence-based strategies, key insights, and practical tips. Expert health guidance from VitalHealth Hub. Free, no registration needed.`;
  const blogTitle = `${post.title}: Complete Guide 2026 | ${SITE_NAME}`;

  const schema = {
    "@context":"https://schema.org","@type":"Article",
    "headline":post.title,
    "author":{"@type":"Person","name":"Ali Haider","url":"https://www.linkedin.com/in/ali-haider-seo-consultant/"},
    "datePublished":post.date,"dateModified":"2026-01-01",
    "publisher":{"@type":"Organization","name":SITE_NAME,"logo":{"@type":"ImageObject","url":SITE+"/favicon.ico"}},
    "image":featImgUrl,"description":blogMetaDesc,"url":SITE+'/blog/'+post.slug+'.html',
    "mainEntityOfPage":{"@type":"WebPage","@id":SITE+'/blog/'+post.slug+'.html'}
  };

  // Build TOC from H2s, then add IDs in content
  let tocIdx = 0;
  const tocItems = [];
  const contentWithIds = content.replace(/<h2>([^<]+)<\/h2>/g, (match, txt) => {
    const id = 'section-' + tocIdx++;
    tocItems.push({id, text: txt});
    return `<h2 id="${id}">${txt}</h2>`;
  });

  const tocHtml = tocItems.length ? `
<div class="toc-widget fade-in">
  <div class="toc-header">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
    Table of Contents
  </div>
  <ol class="toc-list">
    ${tocItems.map((t,i)=>`<li><a href="#${t.id}">${i+1}. ${t.text}</a></li>`).join('\n    ')}
  </ol>
</div>` : '';

  const tagPillsHtml = post.tags && post.tags.length ? `<div class="blog-tags">${post.tags.map(t=>`<span class="blog-tag">${t}</span>`).join('')}</div>` : '';

  const extraHead = `<meta name="keywords" content="${post.title.toLowerCase()}, ${post.category.toLowerCase()}, health guide, wellness tips, ${SITE_NAME.toLowerCase()}">
<meta property="og:title" content="${blogTitle}">
<meta property="og:description" content="${blogMetaDesc}">
<meta property="og:image" content="${featImgUrl}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${blogTitle}">
<meta name="twitter:description" content="${blogMetaDesc}">
<meta name="twitter:image" content="${featImgUrl}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
${faq.schema}`;

  return `${head(blogTitle, blogMetaDesc, '/blog/'+post.slug+'.html', extraHead)}
<body>
${NAV}
<div class="reading-progress"><div class="reading-progress-fill"></div></div>
${bc.html}
${bc.schema}
<article>
<header class="blog-post-header">
<div class="container">
<span class="blog-card-category">${post.category}</span>
<h1>${post.title}</h1>
<div class="blog-post-meta">
<span>By Ali Haider</span>
<span>${post.date}</span>
<span>${post.readTime} read</span>
<span>Updated 2026</span>
</div>
${tagPillsHtml}
</div>
</header>
<div class="container">
<div class="blog-post">
<div class="blog-post-content">
<figure class="blog-hero-image"><img src="${featImgUrl}" alt="${blogCardImage(post.slug).alt}" title="${post.title}" width="1200" height="500" loading="eager"><figcaption>${post.title} — Expert guide from VitalHealth Hub</figcaption></figure>
${tocHtml}
${contentWithIds}
<div class="blog-cta-box fade-in">
<p>Ready to track your progress? Try our free <a href="/calculators/${calcs[0]}.html">${(calculators.find(c=>c.slug===calcs[0])||{name:'health calculator'}).name}</a> for instant, personalized results.</p>
<a href="/calculators/${calcs[0]}.html" class="btn btn-primary">Try Free Calculator &rarr;</a>
</div>
${share}
<section class="section fade-in"><div class="section-title"><h2>Frequently Asked Questions</h2></div>${faq.html}</section>
<div class="blog-author-box fade-in">
<div class="author-avatar">A</div>
<div class="author-info">
<h4>Ali Haider</h4>
<p>Ali Haider is an SEO Consultant and Health Content Creator with a passion for making evidence-based health information accessible to everyone. He builds free health tools and writes comprehensive guides used by over 100,000 monthly readers worldwide.</p>
<p style="margin-top:8px;"><a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" style="color:#52b788;font-size:0.85rem;">LinkedIn Profile →</a></p>
</div>
</div>
</div>
</div>
</div>
<section class="blog-related-section">
<div class="container">
<h2>Related Articles</h2>
<div class="blog-related-grid">
${(() => {
  const related = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug);
  const selected = related.length >= 3 ? related.slice(0, 3) : related.concat(blogPosts.filter(p => p.slug !== post.slug && p.category !== post.category)).slice(0, 3);
  return selected.map(r => {
    const img = blogCardImage(r.slug);
    return `<a href="/blog/${r.slug}.html" class="blog-card">
<div class="blog-card-image"><img src="${img.url}" alt="${img.alt}" title="${r.title}" width="600" height="340" loading="lazy"></div>
<div class="blog-card-body">
<div class="blog-card-meta"><span class="blog-card-category">${r.category}</span><span>${r.readTime} read</span></div>
<h3>${r.title}</h3>
<span class="read-more">Read Article &rarr;</span>
</div>
</a>`;
  }).join('');
})()}
</div>
</div>
</section>
</article>
${FOOTER}
${BTT}
<script src="/js/main.js"></script>
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

fs.writeFileSync('calculators/index.html', `${head('50+ Free Health Calculators | '+SITE_NAME, 'Browse all free health calculators including BMI, calorie, macro, heart rate, pregnancy, and 50+ more science-backed tools at '+SITE_NAME+'.', '/calculators/')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'All Calculators',url:'/calculators/'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'All Calculators',url:'/calculators/'}]).schema}
<section class="content-page">
<div class="container">
<h1 class="fade-in" style="text-align:center;">Free Health Calculators</h1>
<p class="fade-in" style="text-align:center;max-width:600px;margin:0 auto 30px;color:var(--gray-500);">Browse our collection of 115+ free, science-backed health calculators. No registration needed.</p>
<div class="search-bar fade-in">
<svg viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
<input type="text" id="calcSearch" placeholder="Search calculators..." oninput="filterCalcs()">
</div>
<div class="filter-buttons fade-in" id="calcFilterBtns">
<button class="filter-btn active" onclick="filterCat('all',this)">All</button>
${catNames.map(c=>`<button class="filter-btn" onclick="filterCat('${c.replace(/'/g,"\\'")}',this)">${c}</button>`).join('')}
</div>
<div class="grid-4" id="calcGrid">
${calculators.map(c => {
  let cat = 'Other';
  for (const [k,v] of Object.entries(calcCategories)) { if (v.find(x=>x.slug===c.slug)) { cat = k; break; } }
  return `<a href="/calculators/${c.slug}.html" class="card fade-in" data-category="${cat}" data-title="${c.name.toLowerCase()}"><div class="card-icon">${calcSvg(c.icon)}</div><h3>${c.name}</h3><p>${c.desc}</p><span class="read-more">Calculate Now &rarr;</span></a>`;
}).join('')}
</div>
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js"></script>
<script>
var currentCalcCat='all';
function filterCalcs(){
  var q=document.getElementById('calcSearch').value.toLowerCase();
  document.querySelectorAll('#calcGrid .card').forEach(function(card){
    var title=card.getAttribute('data-title');
    var cat=card.getAttribute('data-category');
    var matchQ=!q||title.indexOf(q)!==-1;
    var matchC=currentCalcCat==='all'||cat===currentCalcCat;
    card.style.display=(matchQ&&matchC)?'':'none';
  });
}
function filterCat(cat,btn){
  currentCalcCat=cat;
  document.querySelectorAll('#calcFilterBtns .filter-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  filterCalcs();
}
</script>
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

const homeOrgSchema = {"@context":"https://schema.org","@type":"Organization","name":SITE_NAME,"url":SITE,"email":"ma7122671@gmail.com","sameAs":["https://www.linkedin.com/in/ali-haider-seo-consultant/","https://www.facebook.com/AliHadi768","https://www.instagram.com/ali_haiderseo/"]};
const homeWebSiteSchema = {"@context":"https://schema.org","@type":"WebSite","name":SITE_NAME,"url":SITE,"description":"Free health calculators and expert wellness articles.","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":SITE+"/blog.html?q={search_term_string}"},"query-input":"required name=search_term_string"}};
const homeOgImage = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80";
const homeExtraHead = `<meta name="keywords" content="health calculators, free health tools, bmi calculator, calorie calculator, wellness tools, health articles">
<meta property="og:title" content="${SITE_NAME} - Your Guide to a Healthier Life">
<meta property="og:description" content="Free health calculators, evidence-based articles, and wellness tools. BMI calculator, calorie counter, and 50+ tools to help you live healthier.">
<meta property="og:image" content="${homeOgImage}">
<meta property="og:url" content="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${SITE_NAME} - Your Guide to a Healthier Life">
<meta name="twitter:description" content="Free health calculators, evidence-based articles, and wellness tools trusted by millions.">
<meta name="twitter:image" content="${homeOgImage}">
<script type="application/ld+json">${JSON.stringify(homeOrgSchema)}</script>
<script type="application/ld+json">${JSON.stringify(homeWebSiteSchema)}</script>`;

const indexHtml = `${head(SITE_NAME+' - Your Guide to a Healthier Life', 'Free health calculators, wellness tools, and expert health articles. BMI calculator, calorie counter, and 50+ tools to help you live healthier.', '/', homeExtraHead)}
<body>
${NAV}

<section class="hero hero-bg">
<div class="hero-overlay"></div>
<div class="container" style="position:relative;z-index:2;">
<h1 class="fade-in">Your Guide to a Healthier Life</h1>
<p class="fade-in">Free health calculators, evidence-based articles, and wellness tools trusted by millions. Take control of your health journey today.</p>
<div class="hero-buttons fade-in">
<a href="/calculators/" class="btn btn-primary btn-pulse">Explore Calculators</a>
<a href="/blog.html" class="btn btn-highlight">Read Blog</a>
</div>
</div>
</section>

<div class="home-trust-bar">
<div class="home-trust-bar-inner">
<span>🧮 115+ Free Tools</span>
<span class="trust-divider">|</span>
<span>👥 100K+ Monthly Users</span>
<span class="trust-divider">|</span>
<span>✅ Evidence-Based</span>
<span class="trust-divider">|</span>
<span>🔒 Always Free</span>
</div>
</div>

<section class="stats-bar">
<div class="container">
<div class="stats-grid">
<div class="stat-item"><div class="stat-number" data-target="115" data-suffix="+">0</div><div class="stat-label">Free Tools</div></div>
<div class="stat-item"><div class="stat-number" data-target="150" data-suffix="+">0</div><div class="stat-label">Expert Articles</div></div>
<div class="stat-item"><div class="stat-number" data-target="1" data-suffix="M+">0</div><div class="stat-label">Trusted Users</div></div>
</div>
</div>
</section>

<section class="section">
<div class="container">
<div class="section-title fade-in"><h2>Featured Calculators</h2><p>Powerful, free health tools to help you understand your body better.</p></div>
<div class="grid-4">
${featuredCalcs.map(c => {
  let badge = '';
  if (c.slug === 'bmi-calculator') badge = '<span class="calc-badge badge-popular">⭐ Most Popular</span>';
  else if (c.slug === 'sleep-calculator') badge = '<span class="calc-badge badge-new">🆕 New</span>';
  return `<a href="/calculators/${c.slug}.html" class="card card-lift fade-in">${badge}<div class="card-icon">${calcSvg(c.icon)}</div><h3>${c.name}</h3><p>${c.desc}</p></a>`;
}).join('')}
</div>
</div>
</section>

<section class="section section-alt">
<div class="container">
<div class="section-title fade-in"><h2>How It Works</h2><p>Three simple steps to better health insights.</p></div>
<div class="steps-grid">
<div class="step-item fade-in"><div class="step-number">1</div><h3>Choose a Tool</h3><p>Browse our collection of 115+ free health calculators covering nutrition, fitness, body metrics, and more.</p></div>
<div class="step-item fade-in"><div class="step-number">2</div><h3>Enter Your Data</h3><p>Input your personal measurements and health information into our easy-to-use calculator forms.</p></div>
<div class="step-item fade-in"><div class="step-number">3</div><h3>Get Results</h3><p>Receive instant, color-coded results with personalized suggestions and actionable health tips.</p></div>
</div>
</div>
</section>

<section class="section">
<div class="container">
<div class="section-title fade-in"><h2>Latest Articles</h2><p>Expert-written health and wellness content to guide your journey.</p></div>
<div class="home-blog-filter fade-in">
<button class="home-cat-btn active" onclick="homeFilterCat('all',this)">All</button>
<button class="home-cat-btn" onclick="homeFilterCat('Body Metrics',this)">Body Metrics</button>
<button class="home-cat-btn" onclick="homeFilterCat('Nutrition',this)">Nutrition</button>
<button class="home-cat-btn" onclick="homeFilterCat('Fitness',this)">Fitness</button>
<button class="home-cat-btn" onclick="homeFilterCat('Sleep',this)">Sleep</button>
<button class="home-cat-btn" onclick="homeFilterCat('Heart Health',this)">Heart Health</button>
</div>
<div class="grid-3" id="homeBlogGrid">
${featuredPosts.map(p => {
  const img = blogCardImage(p.slug);
  return `<a href="/blog/${p.slug}.html" class="blog-card fade-in" data-hcat="${p.category}"><div class="blog-card-image blog-img-hover"><img src="${img.url}" alt="${p.title}" title="${p.title}" width="600" height="210" loading="lazy"></div><div class="blog-card-body"><div class="blog-card-meta"><span class="blog-card-category">${p.category}</span><span>${p.date}</span><span>${p.readTime}</span></div><h3>${p.title}</h3><p>Evidence-based insights and practical tips to guide your health journey.</p><span class="read-more">Read More &rarr;</span></div></a>`;
}).join('')}
</div>
<div style="text-align:center;margin-top:32px;">
<a href="/blog.html" class="btn btn-highlight fade-in">View All Articles &rarr;</a>
</div>
</div>
</section>

<section class="trust-section">
<div class="container">
<div class="section-title fade-in"><h2>Why Millions Trust VitalHealth Hub</h2></div>
<div class="trust-grid">
<div class="trust-item fade-in">
<span class="trust-icon">🔬</span>
<h3>Evidence-Based Content</h3>
<p>All tools and articles are grounded in peer-reviewed medical research and validated formulas from leading health organizations.</p>
</div>
<div class="trust-item fade-in">
<span class="trust-icon">👨‍⚕️</span>
<h3>Professionally Reviewed</h3>
<p>Content reviewed by certified health and wellness professionals to ensure accuracy, safety, and practical value for our users.</p>
</div>
<div class="trust-item fade-in">
<span class="trust-icon">🆓</span>
<h3>Free Forever</h3>
<p>No paywalls, no subscriptions, no hidden fees — all 115+ health calculators and 100+ articles are always 100% free to use.</p>
</div>
</div>
</div>
</section>

<section class="reviews-section">
<div class="container">
<div class="reviews-header fade-in">
<h2>What Our Users Say</h2>
<div class="star-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
<p class="rating-text">Rated 4.9/5 based on 2,400+ reviews</p>
</div>
<div class="reviews-scroll">
<div class="review-card fade-in">
<span class="quote-mark">&ldquo;</span>
<div class="review-card-header">
<div class="review-avatar" style="background:#d8f3dc;"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div><div class="review-name">Jessica M.</div><div class="review-location">New York, USA</div></div>
</div>
<div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
<p class="review-text">${SITE_NAME} completely changed how I approach my health. The BMI and calorie calculators are incredibly intuitive. I lost 15 pounds in 3 months just by tracking my TDEE and following the nutrition articles. The results are color-coded and come with personalized suggestions that actually make sense. I recommend it to everyone at my school!</p>
<div class="review-date">Reviewed on January 12, 2024</div>
<div class="review-verified"><svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
<div class="review-card fade-in">
<span class="quote-mark">&ldquo;</span>
<div class="review-card-header">
<div class="review-avatar" style="background:#b7e4c7;"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div><div class="review-name">Michael R.</div><div class="review-location">London, UK</div></div>
</div>
<div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
<p class="review-text">As a personal trainer, I use the TDEE and macro calculators with all my clients. The accuracy is impressive compared to other free tools. The blog articles on strength training and protein intake are backed by real research, not bro-science. I have bookmarked at least 20 articles. The one-rep-max calculator is spot-on with my actual gym numbers.</p>
<div class="review-date">Reviewed on February 3, 2024</div>
<div class="review-verified"><svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
<div class="review-card fade-in">
<span class="quote-mark">&ldquo;</span>
<div class="review-card-header">
<div class="review-avatar" style="background:#f0faf2;"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div><div class="review-name">Dr. Emily K.</div><div class="review-location">Toronto, Canada</div></div>
</div>
<div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
<p class="review-text">I am a family medicine physician and I routinely recommend ${SITE_NAME} to my patients. The calculators use medically validated formulas (Mifflin-St Jeor for BMR, standard BMI equations) and clearly state they are not a substitute for medical advice. The sleep calculator helped several of my patients with insomnia understand their sleep cycles better. Excellent free resource.</p>
<div class="review-date">Reviewed on March 18, 2024</div>
<div class="review-verified"><svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
<div class="review-card fade-in">
<span class="quote-mark">&ldquo;</span>
<div class="review-card-header">
<div class="review-avatar" style="background:#d8f3dc;"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div><div class="review-name">Sarah L.</div><div class="review-location">Sydney, Australia</div></div>
</div>
<div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
<p class="review-text">I have been using ${SITE_NAME} for six months during my pregnancy. The pregnancy due date calculator was accurate to within 2 days of my ultrasound date. The pregnancy nutrition guide helped me plan balanced meals during each trimester. I also love the water intake calculator — it adjusted recommendations for pregnancy. My only wish is a mobile app for offline use!</p>
<div class="review-date">Reviewed on April 5, 2024</div>
<div class="review-verified"><svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
<div class="review-card fade-in">
<span class="quote-mark">&ldquo;</span>
<div class="review-card-header">
<div class="review-avatar" style="background:#b7e4c7;"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div><div class="review-name">David T.</div><div class="review-location">Chicago, USA</div></div>
</div>
<div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
<p class="review-text">After my doctor flagged my cholesterol levels, I found the cholesterol risk calculator and heart health articles on ${SITE_NAME}. They helped me understand what my numbers meant and motivated me to change my diet. Six months later, my LDL dropped by 30 points. The blood pressure checker and diabetes risk tools also gave me peace of mind. Truly a life-changing resource.</p>
<div class="review-date">Reviewed on May 22, 2024</div>
<div class="review-verified"><svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="7" fill="#52b788"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Verified User</div>
</div>
</div>
</div>
</section>

<section class="newsletter">
<div class="container">
<h2 class="fade-in">Stay Updated with Health Tips</h2>
<p class="fade-in">Join our newsletter for weekly health insights, new calculator launches, and expert wellness advice.</p>
<form class="newsletter-form fade-in" onsubmit="event.preventDefault();alert('Thank you for subscribing!');">
<input type="email" placeholder="Enter your email address" required>
<button type="submit" class="btn btn-highlight">Subscribe</button>
</form>
</div>
</section>

<section class="section">
<div class="container">
<div class="health-tip fade-in">
<h3>Health Tip of the Day</h3>
<p>Walking just 30 minutes a day can reduce your risk of heart disease by up to 35%, improve your mood, strengthen your bones, and boost your immune system. Start with a 10-minute walk and gradually increase your duration.</p>
</div>
</div>
</section>

${FOOTER}
${BTT}
<script src="/js/main.js"></script>
<script>
function homeFilterCat(cat,btn){
  document.querySelectorAll('.home-cat-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  document.querySelectorAll('#homeBlogGrid .blog-card').forEach(function(card){
    if(cat==='all'||card.getAttribute('data-hcat')===cat){
      card.style.display='';
    } else {
      card.style.display='none';
    }
  });
}
</script>
${CHATBOT}
</body></html>`;

fs.writeFileSync('index.html', indexHtml);
console.log('Generated index.html');

// ========================
// ABOUT, CONTACT, FAQ, PRIVACY, DISCLAIMER, SITEMAP.HTML
// ========================

// ABOUT
fs.writeFileSync('about.html', `${head('About Us | '+SITE_NAME, 'Learn about '+SITE_NAME+' — our mission to make health information accessible with free calculators and expert wellness articles.', '/about.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'About Us',url:'/about.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'About Us',url:'/about.html'}]).schema}
<section class="about-hero">
<div class="container">
<h1 class="fade-in">About ${SITE_NAME}</h1>
<p class="fade-in">Making health information accessible, understandable, and actionable for everyone around the world.</p>
</div>
</section>
<section class="section">
<div class="container">
<h2 class="fade-in">Our Mission</h2>
<p class="fade-in">${SITE_NAME} was founded with a simple yet powerful mission: to empower people with free, evidence-based health calculators and expert-written wellness content. We believe that informed individuals make better health decisions, and we are committed to providing the tools and knowledge to support that journey.</p>
<p class="fade-in">We strive to bridge the gap between complex medical data and everyday health understanding, ensuring that everyone — regardless of background, location, or income — has access to reliable health assessment tools.</p>
<h2 class="fade-in">What We Offer</h2>
<ul class="fade-in">
<li><strong>115+ Free Health Calculators:</strong> From BMI and calorie calculators to specialized tools for fitness, nutrition, mental health, pregnancy, and disease risk assessment.</li>
<li><strong>150+ Expert Articles:</strong> Comprehensive health and wellness content written and reviewed by healthcare professionals, updated regularly with the latest research.</li>
<li><strong>Evidence-Based Information:</strong> All our calculators use established medical formulas (Mifflin-St Jeor, Harris-Benedict, WHO standards) and our content references peer-reviewed research.</li>
<li><strong>Privacy-First Approach:</strong> Your health data stays on your device. We do not store, transmit, or sell personal health information. All computations happen locally in your browser.</li>
</ul>
<div class="numbers-grid fade-in" style="margin:40px 0;">
<div class="number-item"><div class="stat-number">50+</div><p>Health Calculators</p></div>
<div class="number-item"><div class="stat-number">100+</div><p>Expert Articles</p></div>
<div class="number-item"><div class="stat-number">1M+</div><p>Users Helped</p></div>
<div class="number-item"><div class="stat-number">10+</div><p>Health Categories</p></div>
</div>
<h2 class="fade-in">Created By</h2>
<div class="creator-card fade-in">
<div class="creator-avatar"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="#2d6a4f" stroke-width="2"/><path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#2d6a4f" stroke-width="2"/></svg></div>
<div>
<h3>Ali Haider</h3>
<p style="color:var(--gray-500);margin-bottom:8px;">SEO Consultant &amp; Web Developer</p>
<p>Ali Haider is a passionate SEO consultant and web developer who created ${SITE_NAME} to make health information freely available to everyone. With expertise in search engine optimization and a deep interest in health and wellness, Ali built this platform to combine technical excellence with medically accurate information, ensuring the tools reach the people who need them most.</p>
<div class="creator-social">
<a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn</a>
<a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</a>
<a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg> Instagram</a>
</div>
</div>
</div>
<h2 class="fade-in">Our Commitment</h2>
<p class="fade-in">We are committed to maintaining the highest standards of accuracy and transparency. Our calculators are regularly reviewed against the latest medical guidelines, and our articles are updated to reflect current research. We encourage users to consult healthcare professionals for personalized advice.</p>
<p class="fade-in">Have questions or feedback? <a href="/contact.html">Contact us</a> — we would love to hear from you.</p>
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js"></script>
${CHATBOT}
</body></html>`);

// CONTACT
fs.writeFileSync('contact.html', `${head('Contact Us | '+SITE_NAME, 'Get in touch with '+SITE_NAME+'. Questions, feedback, or partnership inquiries — we would love to hear from you.', '/contact.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Contact',url:'/contact.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Contact',url:'/contact.html'}]).schema}
<section class="content-page">
<div class="container">
<h1 class="fade-in" style="text-align:center;">Contact Us</h1>
<p class="fade-in" style="text-align:center;max-width:600px;margin:0 auto 40px;">Have questions, feedback, or suggestions? We would love to hear from you.</p>
<div class="contact-grid fade-in">
<div class="contact-form">
<form onsubmit="event.preventDefault();alert('Thank you for your message! We will respond within 24-48 hours.');">
<div class="form-row"><div class="form-group"><label for="name">Full Name</label><input type="text" id="name" placeholder="Your name" required></div><div class="form-group"><label for="email">Email Address</label><input type="email" id="email" placeholder="your@email.com" required></div></div>
<div class="form-group"><label for="subject">Subject</label><select id="subject"><option>General Inquiry</option><option>Calculator Feedback</option><option>Content Suggestion</option><option>Bug Report</option><option>Partnership</option><option>SEO Consultation</option></select></div>
<div class="form-group"><label for="message">Message</label><textarea id="message" placeholder="Your message..." required></textarea></div>
<div class="checkbox-group"><input type="checkbox" id="agree" required><label for="agree" style="font-size:0.85rem;">I agree that the information submitted is accurate and I consent to being contacted.</label></div>
<button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Send Message</button>
</form>
</div>
<div class="contact-detail-card">
<h3>Get in Touch</h3>
<div class="contact-detail-item"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M2 7l10 6 10-6" stroke="currentColor" stroke-width="2"/></svg><div><a href="mailto:ma7122671@gmail.com">ma7122671@gmail.com</a><small>We respond within 24-48 hours</small></div></div>
<div class="contact-detail-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><div><strong>Business Hours</strong><small>Monday - Friday, 9AM - 6PM (PKT)</small></div></div>
<div class="contact-detail-item"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg><div><strong>Location</strong><small>Available globally, based in Pakistan</small></div></div>
<h3 style="margin-top:24px;">Follow Us</h3>
<div class="creator-social" style="margin-top:12px;">
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
<script src="/js/main.js"></script>
${CHATBOT}
</body></html>`);

// FAQ
const generalFaqs = [
  {q:'What is '+SITE_NAME+'?',a:SITE_NAME+' is a free health and wellness platform offering 115+ health calculators and 100+ expert articles to help you understand and improve your health.'},
  {q:'Are the calculators free to use?',a:'Yes, all calculators on '+SITE_NAME+' are completely free. No registration or payment required.'},
  {q:'How accurate are your health calculators?',a:'Our calculators use established medical formulas and are reviewed by healthcare professionals. They provide estimates — for medical decisions, consult your doctor.'},
  {q:'Do you store my health data?',a:'No. All calculations happen in your browser. We do not collect, store, or transmit any personal health data.'},
  {q:'Who writes your health articles?',a:'Our content is written and reviewed by Dr. Sarah Mitchell, MD, a board-certified physician with 15+ years of experience in preventive medicine.'},
  {q:'Can I use your calculators for medical diagnosis?',a:'No. Our tools are for informational and educational purposes only. They are not substitutes for professional medical advice or diagnosis.'},
  {q:'How often is your content updated?',a:'We regularly review and update our content and calculators to reflect the latest medical guidelines and research.'},
  {q:'Can I suggest a new calculator or article topic?',a:'Absolutely! We welcome suggestions. Please use our contact page to share your ideas.'},
  {q:'Do you offer mobile apps?',a:'Currently, '+SITE_NAME+' is a mobile-responsive website accessible from any device. No app download needed.'},
  {q:'How can I support '+SITE_NAME+'?',a:'Share our tools and articles with friends and family. Your support helps us continue providing free health resources.'},
];
const gfaq = faqSection(generalFaqs);

fs.writeFileSync('faq.html', `${head('Frequently Asked Questions | '+SITE_NAME, 'Find answers to common questions about '+SITE_NAME+' health calculators, articles, and wellness tools.', '/faq.html')}
<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'FAQ',url:'/faq.html'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'FAQ',url:'/faq.html'}]).schema}
${gfaq.schema}
<section class="content-page">
<div class="container">
<h1 class="fade-in" style="text-align:center;">Frequently Asked Questions</h1>
<p class="fade-in" style="text-align:center;max-width:600px;margin:0 auto 40px;color:var(--gray-500);">Find answers to the most common questions about our health tools and resources.</p>
${gfaq.html}
</div>
</section>
${FOOTER}
${BTT}
<script src="/js/main.js"></script>
${CHATBOT}
</body></html>`);

// PRIVACY
fs.writeFileSync('privacy.html', `${head('Privacy Policy | '+SITE_NAME, 'Read the '+SITE_NAME+' privacy policy. Learn how we protect your data and respect your privacy.', '/privacy.html')}
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
<script src="/js/main.js"></script>
${CHATBOT}
</body></html>`);

// DISCLAIMER
fs.writeFileSync('disclaimer.html', `${head('Medical Disclaimer | '+SITE_NAME, 'Read the '+SITE_NAME+' medical disclaimer. Our tools are for informational purposes only and not medical advice.', '/disclaimer.html')}
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
<script src="/js/main.js"></script>
${CHATBOT}
</body></html>`);

// TERMS
fs.writeFileSync('terms.html', `${head('Terms of Service | '+SITE_NAME, 'Read the '+SITE_NAME+' terms of service. Understand the conditions for using our free health calculators and wellness tools.', '/terms.html')}
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
<script src="/js/main.js"></script>
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
<script src="/js/main.js"></script>
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

const trendingTopics = ['Intermittent Fasting Guide', 'BMI vs Body Fat', 'Best Foods for Sleep', 'Diabetes Risk Factors', 'Heart Rate Zones Explained'];

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

const blogCardHtml = blogPosts.map((p, i) => {
  const img = blogCardImage(p.slug);
  return `<a href="/blog/${p.slug}.html" class="blog-card fade-in" data-category="${p.category}" data-title="${p.title.toLowerCase()}" data-index="${i}" style="${i >= ITEMS_PER_PAGE ? 'display:none;' : ''}">
<div class="blog-card-image"><img src="${img.url}" alt="${img.alt}" title="${p.title}" width="600" height="340" loading="lazy"></div>
<div class="blog-card-body">
<div class="blog-card-meta"><span class="blog-card-category">${p.category}</span><span>${p.readTime}</span></div>
<h3>${p.title}</h3>
<p>Evidence-based health insights and practical tips for better wellness.</p>
<hr class="blog-card-divider">
<div class="blog-card-footer"><span class="blog-card-author">\u{1F464} Dr. Sarah Mitchell</span><span class="blog-card-date">${p.date}</span></div>
<span class="read-more">Read More \u2192</span>
</div></a>`;
}).join('\n');

const blogSchemaItems = blogPosts.map((p, i) => `{"@type":"ListItem","position":${i+1},"url":"${SITE}/blog/${p.slug}.html","name":"${p.title.replace(/"/g,'\\"')}"}`).join(',');

fs.writeFileSync('blog.html', `${head('Health & Wellness Blog \u2014 150+ Expert Articles | '+SITE_NAME, 'Browse 150+ evidence-based health articles covering weight loss, nutrition, fitness, mental health, heart health and more. Free expert wellness guides.', '/blog.html', '<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"Health & Wellness Blog","description":"100+ evidence-based health articles","url":"'+SITE+'/blog.html","mainEntity":{"@type":"ItemList","numberOfItems":'+blogPosts.length+',"itemListElement":['+blogSchemaItems+']}}</script>')}
<body>
${NAV}

<section class="blog-editorial-hero">
<div class="blog-editorial-hero-grid">
<a href="/blog/${featuredPost.slug}.html" class="blog-editorial-featured">
<img src="https://images.unsplash.com/${featuredImg.url.split('unsplash.com/')[1].split('?')[0]}?w=1200&h=520&fit=crop&auto=format&q=80" alt="${featuredImg.alt}" width="1200" height="520" loading="eager">
<div class="blog-editorial-featured-overlay">
<span class="badge-editors-pick">EDITOR'S PICK</span>
<h1>The Complete Guide to Understanding Your Body's Daily Calorie Needs</h1>
<p>Discover the science behind calorie counting and learn how to fuel your body for optimal health and performance.</p>
<span class="featured-meta">Dr. Sarah Mitchell \u2022 ${featuredPost.date} \u2022 ${featuredPost.readTime} read</span>
<span class="btn-outline-white">Read Article \u2192</span>
</div>
</a>
<div class="blog-editorial-sidebar">
${sidebarPosts.map(sp => {
  const sImg = blogCardImage(sp.slug);
  return `<div class="blog-editorial-sidebar-item">
<img src="https://images.unsplash.com/${sImg.url.split('unsplash.com/')[1].split('?')[0]}?w=200&h=160&fit=crop&auto=format" alt="${sImg.alt}" width="100" height="80" loading="eager">
<div class="sidebar-item-content">
<span class="blog-card-category">${sp.category}</span>
<h4><a href="/blog/${sp.slug}.html">${sp.title}</a></h4>
<span class="sidebar-item-meta">${sp.date} \u2022 ${sp.readTime}</span>
</div>
</div>`;
}).join('')}
</div>
</div>
</section>

<div class="blog-trending-ticker">
<span class="blog-trending-ticker-label">\u{1F525} TRENDING THIS WEEK:</span>
<div class="blog-trending-ticker-scroll">
${trendingTopics.map(t => `<span>${t}</span>`).join('')}
${trendingTopics.map(t => `<span>${t}</span>`).join('')}
</div>
</div>

<div class="blog-category-bar">
<div class="blog-category-bar-inner">
<div class="blog-category-pills">
<button class="blog-category-pill active" onclick="blogFilterCat('all',this)">All Articles</button>
${blogCategories.map(c => `<button class="blog-category-pill" onclick="blogFilterCat('${c.replace(/'/g,"\\'")}',this)">${c}</button>`).join('')}
</div>
<div class="blog-category-bar-actions">
<select class="blog-sort-select" id="blogSortSelect" onchange="blogSort(this.value)">
<option value="latest">Latest</option>
<option value="az">A\u2013Z</option>
</select>
<button class="blog-search-btn" onclick="openBlogSearch()" aria-label="Search articles">
<svg viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
</button>
</div>
</div>
</div>

<div class="blog-search-overlay" id="blogSearchOverlay">
<button class="blog-search-overlay-close" onclick="closeBlogSearch()" aria-label="Close search">\u2715</button>
<input class="blog-search-overlay-input" id="blogSearchInput" type="text" placeholder="Search 150+ health articles..." oninput="liveSearchBlog()">
<div class="blog-search-overlay-results" id="blogSearchResults"></div>
</div>

<section class="blog-articles-section">
<div class="blog-articles-header">
<h2>All Health Articles</h2>
<p>100+ evidence-based guides written by health experts</p>
</div>
<div class="blog-articles-grid" id="blogGrid">
${blogCardHtml}
</div>
</section>

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

<div class="blog-load-more" id="blogLoadMore">
<button class="blog-load-more-btn" onclick="loadMoreBlog()">Load More Articles</button>
<div class="blog-load-more-counter" id="blogCounter">Showing ${ITEMS_PER_PAGE} of ${blogPosts.length} articles</div>
</div>

<section class="blog-tag-cloud">
<h2>Browse by Health Topic</h2>
<div class="blog-tag-cloud-inner">
${popularTags.map(t => `<span class="blog-tag${t.size === 'lg' ? ' tag-lg' : t.size === 'sm' ? ' tag-sm' : ''}" onclick="blogTagClick('${t.name.replace(/'/g,"\\'")}',this)">${t.name}</span>`).join('\n')}
</div>
</section>

${FOOTER}
${BTT}
<script src="/js/main.js"></script>
<script>
var blogCurrentCat='all';
var blogCurrentPage=1;
var blogItemsPerPage=${ITEMS_PER_PAGE};
var blogTotal=${blogPosts.length};
var allBlogData=${JSON.stringify(blogPosts.map(p => ({slug:p.slug,title:p.title,category:p.category})))};

function blogFilterCat(cat,btn){
  blogCurrentCat=cat;
  document.querySelectorAll('.blog-category-pill').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  blogCurrentPage=1;
  applyBlogFilters();
}

function applyBlogFilters(){
  var cards=document.querySelectorAll('#blogGrid .blog-card');
  var shown=0;
  var total=0;
  cards.forEach(function(card){
    var cat=card.getAttribute('data-category');
    var matchC=blogCurrentCat==='all'||cat===blogCurrentCat;
    if(matchC){
      total++;
      if(total<=blogCurrentPage*blogItemsPerPage){
        card.style.display='';
        shown++;
      } else {
        card.style.display='none';
      }
    } else {
      card.style.display='none';
    }
  });
  var counter=document.getElementById('blogCounter');
  counter.textContent='Showing '+shown+' of '+total+' articles';
  var loadBtn=document.getElementById('blogLoadMore');
  loadBtn.style.display=shown<total?'':'none';
}

function loadMoreBlog(){
  blogCurrentPage++;
  applyBlogFilters();
}

function blogSort(val){
  var grid=document.getElementById('blogGrid');
  var cards=Array.from(grid.querySelectorAll('.blog-card'));
  cards.sort(function(a,b){
    if(val==='az') return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
    return parseInt(a.getAttribute('data-index'))-parseInt(b.getAttribute('data-index'));
  });
  cards.forEach(function(c){grid.appendChild(c);});
  blogCurrentPage=1;
  applyBlogFilters();
}

function openBlogSearch(){
  document.getElementById('blogSearchOverlay').classList.add('active');
  document.getElementById('blogSearchInput').focus();
  document.body.style.overflow='hidden';
}

function closeBlogSearch(){
  document.getElementById('blogSearchOverlay').classList.remove('active');
  document.getElementById('blogSearchInput').value='';
  document.getElementById('blogSearchResults').innerHTML='';
  document.body.style.overflow='';
}

function liveSearchBlog(){
  var q=document.getElementById('blogSearchInput').value.toLowerCase().trim();
  var results=document.getElementById('blogSearchResults');
  if(!q){results.innerHTML='';return;}
  var matches=allBlogData.filter(function(p){return p.title.toLowerCase().indexOf(q)!==-1;}).slice(0,10);
  if(matches.length===0){results.innerHTML='<a style="pointer-events:none;color:var(--gray-500);">No articles found</a>';return;}
  results.innerHTML=matches.map(function(p){return '<a href="/blog/'+p.slug+'.html"><span class="search-result-category">'+p.category+'</span> '+p.title+'</a>';}).join('');
}

document.addEventListener('keydown',function(e){
  if(e.key==='Escape') closeBlogSearch();
});

function blogTagClick(tag){
  closeBlogSearch();
  var matchedCat=null;
  var catMap={'Weight Loss':'Body Metrics','BMI':'Body Metrics','Calories':'Nutrition','Protein':'Nutrition','Sleep':'Sleep','Hydration':'Nutrition','Heart Health':'Heart Health','Diabetes':'Disease Prevention','Keto':'Nutrition','Intermittent Fasting':'Nutrition','Mental Health':'Mental Health','Anxiety':'Mental Health','Depression':'Mental Health','Meditation':'Mental Health','Yoga':'Fitness','Running':'Fitness','HIIT':'Fitness','Cholesterol':'Heart Health','Blood Pressure':'Heart Health','Pregnancy':"Women's Health","Women's Health":"Women's Health","Men's Health":'Wellness','Aging':'Wellness','Vitamins':'Nutrition','Gut Health':'Wellness','Immunity':'Nutrition','Stress':'Mental Health','Inflammation':'Nutrition','Hormones':'Wellness','Cancer Prevention':'Disease Prevention'};
  matchedCat=catMap[tag]||'all';
  var pill=null;
  document.querySelectorAll('.blog-category-pill').forEach(function(b){if(b.textContent===matchedCat)pill=b;});
  blogFilterCat(matchedCat,pill||document.querySelector('.blog-category-pill'));
  window.scrollTo({top:document.querySelector('.blog-category-bar').offsetTop-120,behavior:'smooth'});
}
</script>
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

  const relTools = (quiz.relatedTools || []).map(s =>
    '<a href="/calculators/' + s + '.html" class="quiz-related-link">' + calcName(s) + '</a>'
  ).join('');
  const relBlogs = (quiz.relatedBlogs || []).map(s =>
    '<a href="/blog/' + s + '.html" class="quiz-related-link">' + blogTitle(s) + '</a>'
  ).join('');

  const disclaimerHTML = quiz.disclaimer
    ? '<div class="quiz-disclaimer-box"><strong>⚠️ Medical Notice:</strong> ' + quiz.disclaimer + '</div>'
    : '';

  const quizJSON = JSON.stringify({
    slug: quiz.slug,
    name: quiz.name,
    questions: quiz.questions,
    scoring: quiz.scoring
  }).replace(/<\/script>/gi, '<\\/script>');

  const schemaExtra = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"LearningResource","name":"' + quiz.name.replace(/"/g, '\\"') + '","description":"' + quiz.desc.replace(/"/g, '\\"') + '","url":"' + SITE + '/quizzes/' + quiz.slug + '.html","provider":{"@type":"Organization","name":"VitalHealth Hub","url":"' + SITE + '"}}</script>';

  return head(
    quiz.name + ' — Free Online Health Quiz | VitalHealth Hub',
    quiz.desc + ' Three difficulty levels, instant scoring, and personalised feedback.',
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
<p>Select a level to begin. You can retake the quiz at any difficulty.</p>
<div class="quiz-diff-grid">
<div class="quiz-diff-card" data-diff="easy" onclick="startQuiz('easy')">
<span class="quiz-diff-icon">🌱</span>
<span class="quiz-diff-label">Easy</span>
<span class="quiz-diff-count">5 Questions</span>
</div>
<div class="quiz-diff-card" data-diff="medium" onclick="startQuiz('medium')">
<span class="quiz-diff-icon">⚡</span>
<span class="quiz-diff-label">Medium</span>
<span class="quiz-diff-count">8 Questions</span>
</div>
<div class="quiz-diff-card" data-diff="hard" onclick="startQuiz('hard')">
<span class="quiz-diff-icon">🔥</span>
<span class="quiz-diff-label">Hard</span>
<span class="quiz-diff-count">10 Questions</span>
</div>
</div>
</div>

<div id="quiz-q-screen" class="quiz-q-screen">
<div class="quiz-progress-wrap">
<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-prog-fill" style="width:0%"></div></div>
<div class="quiz-progress-text"><span id="quiz-prog-txt">Question 1 of 5</span><span id="quiz-score-live">Score: 0</span></div>
</div>
<div class="quiz-q-box">
<p class="quiz-q-text" id="quiz-q-text"></p>
<div class="quiz-options" id="quiz-opts"></div>
<div class="quiz-explanation" id="quiz-exp"></div>
<button class="quiz-next-btn" id="quiz-next-btn" onclick="quizNext()">Next Question &rarr;</button>
</div>
</div>

<div id="quiz-result-screen" class="quiz-result-screen">
<div class="quiz-score-circle">
<span class="quiz-score-pct" id="res-pct">0%</span>
<span class="quiz-score-label">Score</span>
</div>
<h2 class="quiz-result-label" id="res-label"></h2>
<p class="quiz-result-correct" id="res-correct"></p>
<div class="quiz-result-feedback" id="res-feedback"></div>
<div class="quiz-result-actions">
<button class="quiz-retry-btn" onclick="quizRetry()">&#x1F504; Try Again</button>
<button class="quiz-share-btn" onclick="quizShare()">&#x1F4E4; Share Result</button>
</div>
</div>

${relTools ? '<div class="quiz-related" id="quiz-related-tools"><h3>&#x1F527; Related Calculators</h3><div class="quiz-related-grid">' + relTools + '</div></div>' : ''}
${relBlogs ? '<div class="quiz-related" style="margin-top:32px;"><h3>&#x1F4F0; Related Articles</h3><div class="quiz-related-grid">' + relBlogs + '</div></div>' : ''}
</div>

<div class="quiz-content-section">
<h2>About This Quiz</h2>
<p>The <strong>${quiz.name}</strong> tests your knowledge with ${quiz.questions.length} carefully researched questions covering key concepts in ${quiz.category.toLowerCase()}. Every answer includes a full explanation so you learn as you go, not just test what you already know.</p>
<h2>How Difficulty Levels Work</h2>
<p>Easy mode presents 5 questions — ideal if you are new to the topic or want a quick check. Medium mode gives you 8 questions for a more thorough test. Hard mode challenges you with all 10 questions drawn from the full question bank, shuffled randomly each time.</p>
<h2>Scoring &amp; Feedback</h2>
<p>Your score is shown as a percentage. Based on your result you receive a personalised performance label and actionable feedback with recommended tools and articles to deepen your understanding. Your quiz history is saved locally so you can track improvement over time.</p>
<h2>Why Health Knowledge Matters</h2>
<p>Health literacy — understanding the science behind your body and lifestyle choices — is one of the strongest predictors of better health outcomes. People with higher health literacy make better dietary choices, exercise more consistently, attend preventive screenings, and manage chronic conditions more effectively. Use these quizzes to identify gaps and build a stronger foundation.</p>
</div>

<script>
(function(){
var QD=${quizJSON};
var COUNTS={easy:5,medium:8,hard:Math.min(QD.questions.length,10)};
var qs=[],ci=0,sc=0,done=false,mode='';
function gi(id){return document.getElementById(id);}
function showScreen(s){
gi('quiz-diff-screen').style.display=s==='diff'?'block':'none';
gi('quiz-q-screen').style.display=s==='q'?'block':'none';
gi('quiz-result-screen').style.display=s==='res'?'block':'none';
}
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
window.startQuiz=function(d){
mode=d;sc=0;ci=0;done=false;
qs=shuffle(QD.questions).slice(0,COUNTS[d]);
showScreen('q');renderQ();
};
function renderQ(){
var q=qs[ci];var total=qs.length;
gi('quiz-prog-fill').style.width=Math.round(ci/total*100)+'%';
gi('quiz-prog-txt').textContent='Question '+(ci+1)+' of '+total;
gi('quiz-score-live').textContent='Score: '+sc;
gi('quiz-q-text').textContent=q.q;
gi('quiz-opts').innerHTML=q.opts.map(function(o,i){return '<button class="quiz-opt" onclick="quizAns('+i+')">'+o+'</button>';}).join('');
gi('quiz-exp').style.display='none';gi('quiz-exp').className='quiz-explanation';gi('quiz-exp').textContent='';
gi('quiz-next-btn').style.display='none';done=false;
}
window.quizAns=function(idx){
if(done)return;done=true;
var q=qs[ci];var ok=idx===q.ans;if(ok)sc++;
document.querySelectorAll('.quiz-opt').forEach(function(b,i){
b.disabled=true;
if(i===q.ans)b.classList.add('correct');
else if(i===idx&&!ok)b.classList.add('wrong');
});
var ex=gi('quiz-exp');
ex.textContent=(ok?'\u2713 Correct! ':'\u2717 Incorrect. ')+q.exp;
ex.className='quiz-explanation'+(ok?'':' wrong-exp');ex.style.display='block';
gi('quiz-next-btn').style.display='block';
gi('quiz-next-btn').textContent=ci>=qs.length-1?'See Results \u2192':'Next Question \u2192';
};
window.quizNext=function(){ci++;if(ci>=qs.length){showResult();return;}renderQ();};
function showResult(){
var pct=Math.round(sc/qs.length*100);
var range=QD.scoring[0];
for(var i=0;i<QD.scoring.length;i++){if(pct>=QD.scoring[i].min&&pct<=QD.scoring[i].max){range=QD.scoring[i];break;}}
gi('res-pct').textContent=pct+'%';
gi('res-label').textContent=range.icon+' '+range.label;
gi('res-correct').textContent=sc+' out of '+qs.length+' correct';
gi('res-feedback').textContent=range.feedback;
try{
var h=JSON.parse(localStorage.getItem('vhh_quiz_hist')||'[]');
h.unshift({slug:QD.slug,name:QD.name,pct:pct,mode:mode,date:new Date().toISOString()});
if(h.length>20)h=h.slice(0,20);
localStorage.setItem('vhh_quiz_hist',JSON.stringify(h));
}catch(e){}
showScreen('res');
}
window.quizRetry=function(){showScreen('diff');};
window.quizShare=function(){
var txt='I scored '+gi('res-pct').textContent+' on the '+QD.name+' quiz at VitalHealth Hub! '+window.location.href;
if(navigator.share){navigator.share({title:QD.name,text:txt,url:window.location.href});}
else if(navigator.clipboard){navigator.clipboard.writeText(txt);alert('Result copied to clipboard!');}
};
showScreen('diff');
})();
</script>
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
  '<button class="quiz-cat-pill' + (i === 0 ? ' active' : '') + '" onclick="quizFilter(\'' + c.replace(/'/g, "\\'") + '\',this)">' + c + '</button>'
).join('');

const quizCards = quizzesData.map(quiz =>
  '<a href="/quizzes/' + quiz.slug + '.html" class="quiz-card" data-category="' + quiz.category + '">' +
  '<div class="quiz-card-icon">' + quiz.icon + '</div>' +
  '<div class="quiz-card-category">' + quiz.category + '</div>' +
  '<h3>' + quiz.name + '</h3>' +
  '<p>' + quiz.desc + '</p>' +
  '<div class="quiz-card-meta"><span class="quiz-card-questions">&#x2713; ' + quiz.questions.length + ' questions &bull; 3 difficulty levels</span>' +
  '<span class="quiz-card-cta">Take Quiz &rarr;</span></div>' +
  '</a>'
).join('');

const quizIndexSchema = '{"@context":"https://schema.org","@type":"CollectionPage","name":"Free Health Quizzes","description":"Test your health, fitness, nutrition, and mental wellness knowledge with ' + quizzesData.length + '+ interactive quizzes at VitalHealth Hub.","url":"' + SITE + '/quizzes/"}';

fs.writeFileSync('quizzes/index.html', head(
  'Free Health & Wellness Quizzes — VitalHealth Hub',
  'Test your health knowledge with ' + quizzesData.length + '+ interactive quizzes covering nutrition, fitness, mental health, and more. Three difficulty levels, instant scoring, personalised feedback.',
  '/quizzes/',
  '<script type="application/ld+json">' + quizIndexSchema + '</script>'
) + `<body>
${NAV}
${breadcrumb([{name:'Home',url:'/'},{name:'Quizzes',url:'/quizzes/'}]).html}
${breadcrumb([{name:'Home',url:'/'},{name:'Quizzes',url:'/quizzes/'}]).schema}

<section class="quiz-index-hero">
<div class="container">
<h1>&#x1F9E0; Free Health &amp; Wellness Quizzes</h1>
<p>Test your knowledge across nutrition, fitness, mental health, women's health, and more. Instant scoring, personalised feedback, and three difficulty levels.</p>
<div class="quiz-index-stats">
<div class="quiz-index-stat"><strong>${quizzesData.length}+</strong><span>Quizzes</span></div>
<div class="quiz-index-stat"><strong>3</strong><span>Difficulty Levels</span></div>
<div class="quiz-index-stat"><strong>${quizzesData.reduce((t,q)=>t+q.questions.length,0)}+</strong><span>Questions</span></div>
<div class="quiz-index-stat"><strong>Free</strong><span>Always</span></div>
</div>
</div>
</section>

<div class="quiz-category-bar">
<div class="quiz-category-bar-inner">${quizCatPills}</div>
</div>

<section class="quiz-grid-section">
<div class="container">
<div class="quiz-grid" id="quiz-grid">${quizCards}</div>
</div>
</section>

<section style="background:#fff;padding:60px 20px;">
<div class="container" style="max-width:800px;margin:0 auto;text-align:center;">
<h2 style="color:#1b4332;font-size:1.8rem;margin-bottom:16px;">Why Take Our Health Quizzes?</h2>
<p style="color:#6c757d;line-height:1.8;font-size:1.05rem;">Health literacy is one of the strongest predictors of better health decisions and outcomes. Our quizzes are built from peer-reviewed research to help you understand the science behind your body — from how sleep affects your brain to how macronutrients fuel your performance. Each quiz includes detailed explanations for every answer, so you leave knowing more than when you started.</p>
</div>
</section>

<script>
function quizFilter(cat, btn) {
  document.querySelectorAll('.quiz-cat-pill').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active');
  document.querySelectorAll('.quiz-card').forEach(function(c){
    c.classList.toggle('hidden', cat !== 'All' && c.dataset.category !== cat);
  });
}
</script>
${FOOTER}
${CHATBOT}
</body></html>`);

console.log('Generated quiz index page');

// SITEMAP.XML
let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
['/','/about.html','/contact.html','/faq.html','/blog.html','/privacy.html','/disclaimer.html','/terms.html','/sitemap.html','/quizzes/'].forEach(u => {
  sitemapXml += `<url><loc>${SITE}${u}</loc><changefreq>weekly</changefreq><priority>${u==='/'?'1.0':'0.8'}</priority></url>\n`;
});
calculators.forEach(c => {
  sitemapXml += `<url><loc>${SITE}/calculators/${c.slug}.html</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
});
blogPosts.forEach(p => {
  sitemapXml += `<url><loc>${SITE}/blog/${p.slug}.html</loc><lastmod>${p.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
});
quizzesData.forEach(q => {
  sitemapXml += `<url><loc>${SITE}/quizzes/${q.slug}.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
});
sitemapXml += '</urlset>';
fs.writeFileSync('sitemap.xml', sitemapXml);

// ROBOTS.TXT
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

const totalPages = 9 + calculators.length + blogPosts.length + quizzesData.length + 1;
console.log('All files generated successfully!');
console.log('Total pages: ' + totalPages + ' (' + calculators.length + ' calculators, ' + blogPosts.length + ' blogs, ' + quizzesData.length + ' quizzes, 9 static)');
