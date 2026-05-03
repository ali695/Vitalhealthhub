# VitalHealth Hub

## Overview
A complete health and wellness website built with pure HTML, CSS, and vanilla JavaScript. No frameworks or build tools. Served via Express.js static file server.

## Site Identity
- **Name**: VitalHealth Hub
- **Tagline**: "Your Guide to a Healthier Life"
- **Niche**: General Health & Wellness
- **Creator**: Ali Haider (SEO Consultant & Web Developer)
- **Email**: ma7122671@gmail.com

## Architecture
- **Server**: Express.js static file server (`server.js`) on port 5000
- **CSS**: Single shared stylesheet (`css/style.css`)
- **JS**: Single shared script (`js/main.js`) for navbar, animations, FAQ toggles, scroll effects + AI health chatbot (`vhChat` object)
- **Generator**: `generate.js` — Node.js script that generates all 315 HTML pages programmatically
- **Extra Calculators**: `calculators-extra.js` — Module exporting 65 additional calculators
- **Quiz Data**: `quizzes-data.js` — Module exporting 22 quiz objects with full questions, scoring, and metadata
- **Tools Data**: `tools-data.js` — Module exporting 15 premium tool objects with SEO content, FAQs, and related tools

## File Structure
```
/index.html              - Homepage
/about.html              - About Us
/contact.html            - Contact Page
/faq.html                - General FAQ
/blog.html               - Blog Index (search + category filters)
/privacy.html            - Privacy Policy
/disclaimer.html         - Medical Disclaimer
/terms.html              - Terms of Service
/sitemap.html            - HTML Sitemap
/sitemap.xml             - XML Sitemap
/robots.txt              - Robots file
/css/style.css           - Shared styles (chatbot + quiz + tools CSS)
/js/main.js              - Shared JavaScript (includes vhChat AI chatbot)
/calculators/            - 103 calculator HTML pages + index.html
/blog/                   - 155 blog post HTML pages
/quizzes/                - 22 quiz HTML pages + index.html
/tools/                  - 24 tool HTML pages + index.html
/server.js               - Express static server (with all security headers)
/generate.js             - Page generator script (generates all 315 pages)
/calculators-extra.js    - 65 additional calculator definitions
/quizzes-data.js         - 22 quiz definitions with questions, scoring, metadata
/tools-data.js           - 24 tool definitions with SEO content, FAQs, related tools
/calculator-svgs.js      - Combines all SVG batch files for calculator illustrations
/svgs/batch1-5.js        - 51 unique SVG illustrations (10-11 per batch)
```

## Calculator Page Design (All 103 pages)
Premium SaaS-style two-section layout applied to all calculator pages via `generateCalculatorPage()`:

**Section 1 — Hero** (`.calc-page-hero`): dark green gradient, two-column grid
- Left: "⚡ Instant Health Calculator" badge + calculator name (Playfair serif h1) + description + 3 trust pills (Free Forever / Science-Based / Instant Results)
- Right: unique SVG illustration per calculator (rounded card with shadow, hidden on mobile)

**Section 2 — Calculator App** (`.calc-app-section`): light background, two-column grid
- Left column (`.calc-input-panel`): white input card with clipboard icon header, all form fields, "⚡ Calculate Results" primary button + "↺ Reset" secondary button; green-bordered medical disclaimer card below
- Right column (`.calc-result-panel`): sticky; shows dashed-border placeholder (step indicators 1→2→3) before calculation; on calculate → placeholder hides (CSS `:has()`) and result-box slides in with color-coded result + Copy / Print / Share action buttons

**JS enhancements**: inline script per page — `vhAutoCalc()` wired to every field's change event (live results); `vhReset()` clears fields + restores placeholder; `vhCopyResult()` copies result text to clipboard with "✓ Copied!" feedback; `vhShareResult()` uses Web Share API with clipboard fallback; `showResult()` intercepted to auto-hide placeholder.

**Responsive**: hero right column hidden at ≤900px, stacks to single column; full print stylesheet hides non-essential elements.

## Homepage Design (index.html)
Premium SaaS-level homepage generated via `generate.js`. Sections below hero:
1. **Stats Strip** — dark bar: live counts of calculators, tools, articles, quizzes
2. **Popular Health Calculators** — 8 specific cards (BMI, Calorie, Macro, Body Fat, TDEE, Water, Sleep, Heart Rate) with SVG icon, name, desc, "Calculate →" CTA; 4-col grid
3. **Quick Action** — 4 SaaS cards: Calculate / Track / Quiz / Read; links to main sections
4. **Premium Tools** — 6 tool cards (Habit Tracker, Sleep Tracker, Mood Tracker, Daily Planner, Focus Timer, Text Analyzer); 3-col grid
5. **Interactive Quizzes** — first 6 quizzes; larger cards with category badge + difficulty tag (easy/medium/hard)
6. **Blog** — first 6 posts; 3-col grid with category, read time, image
7. **How It Works** — 3 steps with gradient circle icons + connecting line; Step 01/02/03
8. **Why VitalHealth Hub?** — dark green section; 4 value cards (Instant Results, Science-Based, Free Forever, No Signup)
9. **Testimonials** — 3 review cards; cleaner design with stars, italic quote, author info, verified badge
10. **Newsletter** — gradient green section; pill-style input+button form
11. **Final CTA** — "Start improving your health today"; two CTA buttons

Hero background: `photo-1571019614242-c5c5dee9f50b` (premium fitness lifestyle, Unsplash)

## Total Pages: 306
- **103** calculator pages + index
- **155** blog post pages
- **22** quiz pages + index
- **24** tool pages + index
- **9** static pages (home, about, contact, faq, blog, privacy, disclaimer, terms, sitemap)

## Key Features
- **103 fully functional health calculators** with real JS logic across 10+ categories
- **155 SEO blog posts** covering 8 categories with full content, FAQs, author boxes, related articles
- **22 interactive quizzes** with 3 difficulty levels (Easy 5Q / Medium 8Q / Hard 10Q), instant scoring, localStorage history
- **24 real working tools** across 4 categories (Image, PDF, Text, Utility) — all browser-side, no upload, no API
- **AI Health Chatbot** — pure vanilla JS, no external APIs, 20+ topic knowledge base, floating on all pages
- **Full security headers** on every response (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection)
- **Mega dropdown navigation** for Calculators (6-column categorized layout)
- **Top bar** (fixed) with email link and social media icons
- **5-column footer** with brand, tools, links, legal, creator sections
- **Redesigned quiz system** — difficulty selector → randomised questions → result screen with personalised feedback
- Breadcrumb navigation with BreadcrumbList schema on all pages
- SEO: unique meta tags, canonical URLs, Open Graph, Schema.org JSON-LD, sitemap.xml
- Responsive design (mobile-first CSS Grid + Flexbox)
- FAQ accordion on calculator and blog pages
- Social share buttons, back-to-top, reading progress bar

## Quiz System Details (`quizzes-data.js` + `generate.js`)
Each quiz has:
- `slug`, `name`, `desc`, `icon`, `category`, `disclaimer` (null or medical notice string)
- `relatedTools` (array of calculator slugs → linked in result screen)
- `relatedBlogs` (array of blog slugs → linked in result screen)
- `questions` — array of `{q, opts[4], ans (index), exp (explanation)}`
- `scoring` — array of `{min, max, label, icon, feedback}` (3 ranges: 0-40, 41-70, 71-100)

**Quiz categories:** Health, Fitness, Mental Health, Women's Health, Nutrition & Diet, General Health

**Quiz engine (inline JS IIFE per page):**
- Shuffles questions on each attempt
- Slices to difficulty count: `{easy:5, medium:8, hard:10}`
- Highlights correct/wrong answers after each selection
- Shows explanation text after each answer
- Calculates percentage score → finds scoring range → shows personalised feedback
- Saves result to `localStorage` key `vhh_quiz_hist` (last 20 entries)
- Share result via Web Share API or clipboard fallback

## Security Headers (server.js)
All responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com ...`

Session cookie also hardened: `httpOnly: true, sameSite: 'lax'`

## Calculator Categories (103 total)
- **Weight & Body** (10): BMI, Ideal Weight, Body Fat, Lean Mass, Waist Ratios, Visceral Fat, BMI Prime, Body Recomposition, Lean Mass Goal, Waist Reduction
- **Nutrition & Diet** (15+): Calorie, Macro, TDEE, BMR, Protein, Carb, Fat, Fiber, Water, Keto, Sugar Intake, Electrolytes, Omega-3, Anti-Inflammatory, Diet Comparison, Intermittent Fasting
- **Heart & Vitals** (10): Heart Rate, Blood Pressure, Cholesterol, Stroke Risk, Life Expectancy, Biological Age, Heart Age, Metabolic Age, Sodium Intake, HOMA-IR, Testosterone Estimator, Thyroid Risk
- **Women's Health** (10): Pregnancy Due Date, Pregnancy Week, Pregnancy Weight Gain, Breastfeeding Calories, Ovulation, Menstrual Cycle, Fertility, PCOS Risk, Menopause Symptoms, Child Growth
- **Fitness & Performance** (10): One Rep Max, VO2 Max, Running Pace, Steps to Calories, Strength Level, Marathon Predictor, HIIT Calories, Calorie Burn, Step Goal, Injury Risk
- **Mental Health** (8): Stress, Anxiety, Sleep, Sleep Debt, Sleep Hygiene, Burnout Risk, Focus Score, Productivity Score, Digital Detox, Work-Life Balance
- **General Tools** (10): Age, Birthday, Date Difference, Percentage, Loan EMI, Countdown Timer, etc.

## Social Links
- LinkedIn: https://www.linkedin.com/in/ali-haider-seo-consultant/
- Facebook: https://www.facebook.com/AliHadi768
- Instagram: https://www.instagram.com/ali_haiderseo/

## Color Palette
- Primary: #2d6a4f (deep green)
- Accent: #52b788 (light green)
- Highlight: #f4a261 (warm orange)
- Background: #f0faf2 (pale green-white)
- Dark: #1b1f1e

## Fonts
- Headings: Playfair Display (Google Fonts)
- Body: DM Sans (Google Fonts)

## CMS Admin Dashboard
Accessible at `/admin` — full CMS on Node.js/Express + SQLite + EJS + Multer.

### Admin Routes
| Route | Description |
|---|---|
| GET /admin | Overview dashboard |
| GET/POST /admin/blogs | Blog CRUD |
| GET/POST /admin/calculators | Calculator CRUD |
| GET /admin/seo-audit | SEO audit scanner |
| GET /admin/media | Media library |
| POST /admin/upload | Multer image upload |
| POST /admin/regenerate-blogs | Regenerate all blog HTML |

## Adding New Content
**New Quizzes:** Add entries to `quizzes-data.js` then run `node generate.js` + restart.

**New Calculators:** Add to `calculators-extra.js` (or new module), require in `generate.js`, then run `node generate.js` + restart.

**New Blog Posts:** Add to `blogPosts` array in `generate.js`, then run `node generate.js` + restart.

Each calculator needs: `slug`, `name`, `desc`, `icon`, `category`, `fields` (array), `logic` (JS string, single-line, no backticks inside).
Optional: `article` (HTML), `faqs` (array of {q,a}), `related` (array of slugs).

## Dependencies
- express
- express-session
- better-sqlite3
- ejs
- multer
