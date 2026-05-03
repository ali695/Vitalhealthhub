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

## Master Theme System v2 (Completed)
Applied globally across all 306 pages via css/style.css:

### Design Tokens (`:root`)
- `--vh-green: #22C55E` / `--vh-green-dark: #16A34A` — primary brand
- `--vh-dark: #052e1f` / `--vh-dark-2: #064e3b` — dark backgrounds
- `--vh-text-primary: #111827` / `--vh-text-secondary: #374151` / `--vh-text-muted: #6B7280`
- `--vh-on-dark-heading: #ECFDF5` / `--vh-on-dark-body: #D1FAE5` / `--vh-on-dark-sub: #A7F3D0` — dark bg text
- `--shadow` / `--shadow-hover` / `--shadow-green` / `--shadow-green-lg` — unified shadows
- `--radius-pill: 999px` / `--radius-sm: 10px` / `--transition: 0.25s ease`

### Typography
- Body font: Inter → DM Sans → system-ui (modern stack, smooth rendering)
- Body: 16px / line-height 1.7 / color `--vh-text-secondary`
- Headings: Playfair Display, weight 700, letter-spacing -0.02em, line-height 1.2

### Button System
- `.btn-primary`: `--vh-green` bg, white text, `--shadow-green` box-shadow, pill border-radius
- Hover: `--vh-green-dark`, translateY(-2px), `--shadow-green-lg`
- `.btn-outline`: transparent bg, green border, fills on hover

### Card System
- White bg, 16px border-radius, `--shadow` (4px/12px subtle depth), 1px rgba border
- Hover: translateY(-4px), `--shadow-hover`

### Dark Section Text (contrast fixed globally)
- `.home-value-section` (bg #0d1f17): headings → #ECFDF5, body → #D1FAE5
- `.home-stats-strip` (bg #0a160f): stat labels → rgba(255,255,255,0.75)
- All hero sections (`calc-index-hero`, `tools-hero`, `quiz-hero`): heading/body text uses on-dark tokens
- Blog hero, About hero: heading/body text uses on-dark tokens

### Icon System (all 306 pages)
- All 72 HTML entity emojis replaced with inline SVGs (`class="icon-svg"`)
- Each icon unique per context (fire, brain, book, chart, lightning, globe, target, etc.)
- `funnelToolIcons` object replaced: 12 quiz tool icons now use SVG strings
- CSS: `.icon-svg { width:1.15em; height:1.15em; vertical-align:-0.2em }` for inline text
- Icon container spans (`.about-offer-icon`, `.home-value-icon`, etc.) sized via CSS child rules

### Blog Hub Cards
- Category hub cards replaced: SVG icon divs → actual post `<img>` tags (16:9, `w=480&h=270`)
- `.blog-hub-card-img` with `aspect-ratio:16/9`, `object-fit:cover`, zoom-on-hover

### Blog Section Heading (Dynamic)
- `<h2 id="blogSectionTitle">All Health Articles</h2>` — id added
- `window.blogFilterCat()` in main.js updates heading: "Calories & Weight Articles" etc.

### Blog CTA Widget (High Contrast)
- Badge: white text/border on rgba(255,255,255,0.1) background
- Description: rgba(255,255,255,0.88)
- Trust line: rgba(255,255,255,0.72), opacity:1
- Button: `--vh-green`, white text, `--shadow-green`

### Previous Design System
- **Buttons**: Pill border-radius (50px), primary button has green box-shadow + translateY(-3px) hover lift
- **Cards**: border-radius 16px, box-shadow 0 10px 25px rgba(0,0,0,0.05), translateY(-4px) hover
- **Tables**: Dark row system — odd rows #052e1f, even rows #064e3b, full-width with overflow scroll
- **Inputs**: Focus ring via box-shadow 0 0 0 3px rgba(34,197,94,0.2), green border on focus

## Key Features
- **103 fully functional health calculators** with real JS logic across 10+ categories
- **155 SEO blog posts** covering 8 categories with full content, FAQs, author boxes, related articles
- **22 interactive quizzes** with 3 difficulty levels (Easy 5Q / Medium 8Q / Hard 10Q), instant scoring, localStorage history
- **24 real working tools** across 4 categories (Image, PDF, Text, Utility) — all browser-side, no upload, no API
- **AI Health Chatbot** — pure vanilla JS, no external APIs, 20+ topic knowledge base, floating on all pages; **lazy-loads on first user click** (not DOMContentLoaded) for page performance
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

## SEO + Structure Optimization (Completed)
All 5 sections applied and regenerated across all 306 pages:

### Section 1 — Inline JS Removal (COMPLETE — 0 inline handlers across all 306 pages)
All inline `onclick`/`oninput`/`onchange`/`onsubmit` handlers removed from every generated HTML page and moved to modular external JS (`js/main.js`, `js/calculators.js`, `js/quiz.js`, `js/tools.js`):
- **NAV**: `vhhDdSearch` + `vhhToggleCol` moved from inline `<script>` block → `js/main.js`; mega-col-title `onclick` removed; `ddSearchInput` `oninput` removed
- **Chatbot topics**: `onclick="vhChat.quickAsk('X')"` → `data-vh-ask="X"` (all pages)
- **Calculator buttons**: `onclick` removed from Submit, Reset, Copy; `onclick="window.print()"` → `data-print="1"`; `onclick="vhShareResult()"` → `data-share="1"`
- **Calc index**: `oninput="filterCalcs()"` removed; filter pills use `data-filter-cat`; `window.filterCalcs()` + `window.filterCat()` (context-aware) implemented in main.js
- **Blog**: sort select `onchange` removed; search open/close `onclick` removed; search input `oninput` removed; category pills use `data-blog-cat`; tag cloud uses `data-blog-tag`; hero search inline handlers removed; all `window.blogFilterCat/applyBlogFilters/loadMoreBlog/blogViewAll/blogSort/blogHeroSearch/openBlogSearch/closeBlogSearch/liveSearchBlog/blogTagClick` implemented in main.js
- **FAQ**: filter pills use `data-faq-cat`; hero search `oninput` removed; `window.faqFilterCat()` + `window.faqHeroSearch()` implemented in main.js
- **Quiz page**: diff cards use `data-quiz-diff`; Start/Next/Retry/Share/Subscribe `onclick` removed
- **Quiz index**: category pills use `data-quiz-filter`
- **Tools hub**: category tabs use `data-filter-cat`
- **Blog posts (TOC)**: scroll-spy moved from inline `<script>` block → main.js DOMContentLoaded IIFE
- **Blog index (large script)**: entire `blogCurrentCat/blogCurrentPage/blogViewAllMode/allBlogData` state + all 11 functions removed from inline block → window.* functions in main.js; blog cards now carry `data-slug` + `data-title-display` for DOM-driven data sourcing
- **Orphan cleanup**: 85 old blog HTML files (from previous slug scheme with old onclick chatbot) deleted; all 155 current blog pages regenerated cleanly with `data-vh-ask` chatbot

### Section 2 — Internal Linking
`calcDepthSections()` function inserts category-specific contextual paragraph links on every calculator page pointing to 2–3 related calculators (33 internal links per page average).

### Section 3 — Content Depth
`calcDepthSections(calc)` added to `generateCalculatorPage()` — generates two new H2 sections after the main article on all 103 calculator pages:
- **"Who Should Use the [Calculator]?"** — audience description + age/condition guidance + 3-calculator contextual link paragraph (category-specific)
- **"Common Mistakes to Avoid"** — 4–5 specific, category-tailored bullet points with `<strong>` labels
- Result: all calculator pages now 1,800–2,000+ words (up from ~1,200 average)

### Section 4 — Image Alt Text
- Chatbot avatar: `alt="VitalHealth Hub"` → `alt="VitalHealth Hub health assistant chatbot"`
- Image compressor tool: `<img id="compPreview">` → `alt="Compressed image preview"`
- Image converter tool: `<img id="convPreview">` → `alt="Converted image format preview"`

### Section 5 — Chatbot Lazy Load
`vhChat.init()` no longer called on `DOMContentLoaded`. Instead: one-time click listener on `#vh-chat-toggle` calls `vhChat.init()` + `vhChat.toggle()` on first interaction, then removes itself so `bindEvents()` handles all subsequent clicks.

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

## Color Palette (updated — premium design system)
- Primary: #22C55E (vibrant green)
- Primary Hover: #16A34A
- Accent: #16A34A
- Highlight: #f4a261 (warm orange)
- Background: #ECFDF5 (pale mint)
- Dark: #111827
- Dark BG: #052e1f
- Dark Secondary: #064e3b
- Text Body: #374151
- Text Soft: #6B7280

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
