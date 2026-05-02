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
- **Generator**: `generate.js` - Node.js script that generates all HTML pages programmatically
- **Extra Calculators**: `calculators-extra.js` - Module exporting 65 additional calculators (required by generate.js)

## File Structure
```
/index.html              - Homepage (with reviews section)
/about.html              - About Us (creator bio, stats, social links)
/contact.html            - Contact Page (two-column layout with contact details)
/faq.html                - General FAQ
/blog.html               - Blog Index (search + category filters)
/privacy.html            - Privacy Policy
/disclaimer.html         - Medical Disclaimer
/terms.html              - Terms of Service
/sitemap.html            - HTML Sitemap
/sitemap.xml             - XML Sitemap
/robots.txt              - Robots file
/css/style.css           - Shared styles (includes chatbot CSS)
/js/main.js              - Shared JavaScript (includes vhChat AI chatbot object)
/calculators/            - 103 calculator HTML pages (with SVG hero illustrations) + index.html
/blog/                   - 100 blog post HTML pages (with Unsplash hero images)
/server.js               - Express static server
/generate.js             - Page generator script
/calculators-extra.js    - 65 additional calculator definitions (module.exports array)
/calculator-svgs.js      - Combines all SVG batch files for calculator hero illustrations
/svgs/batch1-5.js        - 51 unique SVG illustrations (10-11 per batch file)
```

## Key Features
- **103 fully functional health calculators** with real JS logic across 10+ categories
- 100 blog posts with full content, FAQs, author boxes, related articles section
- **Top bar** (fixed, z-index 1001) with email link and social media icons (LinkedIn, Facebook, Instagram)
- **Redesigned footer** with 5-column grid: brand+socials, quick links, popular tools, legal, creator info
- **Reviews section** on homepage with 5 detailed testimonials (horizontal scroll, star ratings, verified badges)
- **51 unique premium SVG hero illustrations** on original calculator pages (each slug has its own detailed SVG)
- **Unsplash hero images** on all blog post pages (1200x500, eager loading, descriptive alt text)
- **Premium blog archive page** (blog.html) with editorial hero, trending ticker, category filter bar, search overlay
- **Related articles** section on every blog post (3 cards with images, same-category matching)
- **AI Health Chatbot** — pure vanilla JS, no external APIs, 20+ topic knowledge base, floating button on all pages
- Color-coded results (green/yellow/red) for calculators
- Responsive design (CSS Grid + Flexbox)
- SEO: unique meta tags, canonical URLs, Open Graph, Schema.org JSON-LD
- **Mega dropdown navigation** for Calculators (6-column categorized layout with 10 links each)
- **Calculators index page** (/calculators/) with search bar, category filter buttons, 4-column card grid
- Breadcrumb navigation with BreadcrumbList schema
- Fade-in animations via IntersectionObserver
- Animated stats counter on homepage (115+ tools)
- FAQ accordion on all calculator and blog pages
- Social share buttons (Twitter, Facebook, WhatsApp)
- Back-to-top button
- Reading progress bar on blog posts
- Print-friendly styles
- Medical disclaimer on all calculator pages

## Calculator Categories (103 total)
- **Weight & Body** (10): BMI, Ideal Weight, Body Fat, Lean Mass, Waist Ratios, Visceral Fat, BMI Prime, Body Recomposition, Lean Mass Goal, Waist Reduction
- **Nutrition & Diet** (15+): Calorie, Macro, TDEE, BMR, Protein, Carb, Fat, Fiber, Water, Keto, Sugar Intake, Electrolytes, Omega-3, Fiber Score, Anti-Inflammatory, Diet Comparison, Macro Timing, Protein Timing, Hydration, Intermittent Fasting Window
- **Heart & Vitals** (10): Heart Rate, Blood Pressure, Cholesterol, Stroke Risk, BAC, Life Expectancy, Biological Age, Heart Age, Metabolic Age, Sodium Intake, HOMA-IR, Testosterone Estimator, Thyroid Risk
- **Women's Health** (10): Pregnancy Due Date, Pregnancy Week, Pregnancy Weight Gain, Breastfeeding Calories, Ovulation, Menstrual Cycle, Fertility, Baby Weight, PCOS Risk, Menopause Symptoms, Child Growth
- **Fitness & Performance** (10): One Rep Max, VO2 Max, Running Pace, Steps to Calories, Cycling/Swimming/Yoga Calories, Strength Level, Marathon Predictor, HIIT Calories, Calorie Burn, Step Goal, Injury Risk
- **Mental Health** (8): Stress, Anxiety, Depression, Sleep, Sleep Debt, Sleep Hygiene, Burnout Risk, Focus Score, Productivity Score, Digital Detox, Work-Life Balance
- **Health Risk** (8): Diabetes, Caffeine, Alcohol, Smoking Cost, Medication Dosage, Vitamin D, Visceral Fat, HOMA-IR
- **General Tools** (10): Age Calculator, Birthday Calculator, Date Difference, Percentage, Loan EMI, Tip, Password Generator, Random Numbers, Text Counter, Countdown Timer, Age in Days, Pomodoro

## Social Links (target="_blank" rel="noopener noreferrer")
- LinkedIn: https://www.linkedin.com/in/ali-haider-seo-consultant/
- Facebook: https://www.facebook.com/AliHadi768
- Instagram: https://www.instagram.com/ali_haiderseo/

## Layout Structure
- Top bar: 37px fixed at top (z-index 1001), green background, email + social icons
- Navbar: fixed at top: 37px (z-index 1000), white with blur backdrop
- Content: padded 175px top for hero sections, 155px for content pages, 125px for breadcrumbs

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
Accessible at `/admin` — a full CMS built on Node.js/Express, SQLite, EJS, and Multer.

### Architecture
- **server/admin.js** — Express router with all CRUD routes; two-pass EJS rendering (content view → body string → layout injection)
- **database/db.js** — SQLite (better-sqlite3) with `blogs`, `calculators`, `media` tables
- **shared/site-parts.js** — Exports NAV, FOOTER, CHATBOT, BTT HTML strings for template generation
- **admin/views/layout.ejs** — Dark-green sidebar layout shell; receives `body`, `pageTitle`, `topbarActions`, `currentPage`
- **admin/views/*.ejs** — Pure EJS partials (no `require` calls): overview, blogs, blog-form, calculators, calculator-form, seo-audit, media
- **templates/blog.ejs** — EJS template for generating static `/blog/<slug>.html` files
- **templates/calculator.ejs** — EJS template for generating static `/calculators/<slug>.html` files
- **uploads/** — multer upload directory for media library images

### Admin Routes
| Route | Description |
|---|---|
| GET /admin | Overview dashboard with stats |
| GET/POST /admin/blogs | Blog list + create |
| GET/POST /admin/blogs/:id/edit | Edit + regenerate blog HTML |
| POST /admin/blogs/:id/delete | Delete blog + HTML file |
| GET/POST /admin/calculators | Calculator list + create |
| GET/POST /admin/calculators/:id/edit | Edit + regenerate calculator HTML |
| POST /admin/calculators/:id/delete | Delete calculator + HTML file |
| GET /admin/seo-audit | Scans all HTML files for missing title/desc/H1/alt |
| GET /admin/media | Media library grid |
| POST /admin/upload | Multer image upload (10MB limit, images only) |
| POST /admin/media/:id/delete | Delete media file + DB record |
| POST /admin/regenerate-blogs | Regenerate all blog HTML files |

## Dependencies
- express
- express-session
- better-sqlite3
- ejs
- multer

## Adding New Calculators
To add more calculators:
1. Add entries to `calculators-extra.js` array (or create a new module)
2. In `generate.js`, after `calculators.push(...newCalcs2)`, add: `const newCalcs3 = require('./new-file.js'); calculators.push(...newCalcs3);`
3. Run `node generate.js` to regenerate all pages
4. Restart the workflow

Each calculator needs: `slug`, `name`, `desc`, `icon`, `category`, `fields` (array), `logic` (JS string, single-line, no backticks inside)
Optional: `article` (HTML string), `faqs` (array of {q,a}), `related` (array of slugs)
