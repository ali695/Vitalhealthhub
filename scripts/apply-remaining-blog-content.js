const fs = require('fs');
const path = require('path');
const profiles = require('../content/remaining-blog-profiles');
const { getGuidance } = require('../content/blog-depth-guidance');

const root = path.resolve(__dirname, '..');
const modified = '2026-08-07';

const sourceLibrary = {
  cdcBmi: ['CDC: About BMI', 'https://www.cdc.gov/bmi/about/index.html'],
  cdcAdultBmi: ['CDC: Adult BMI categories', 'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html'],
  cdcChildBmi: ['CDC: BMI-for-age growth charts', 'https://www.cdc.gov/growth-chart-training/hcp/using-bmi/summary.html'],
  niddkWeight: ['NIDDK: Weight management', 'https://www.niddk.nih.gov/health-information/weight-management'],
  niddkPlanner: ['NIDDK: Body Weight Planner', 'https://www.niddk.nih.gov/bwp'],
  nasEnergy: ['National Academies: Dietary Reference Intakes for Energy', 'https://nap.nationalacademies.org/catalog/26818/dietary-reference-intakes-for-energy'],
  dietaryGuidelines: ['Dietary Guidelines for Americans', 'https://www.dietaryguidelines.gov/'],
  foodData: ['USDA FoodData Central', 'https://fdc.nal.usda.gov/'],
  hhsActivity: ['HHS: Physical Activity Guidelines', 'https://odphp.health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines/current-guidelines/top-10-things-know'],
  cdcActivity: ['CDC: Benefits of physical activity', 'https://www.cdc.gov/physical-activity/php/about/index.html'],
  acsmResistance: ['ACSM: Resistance-training progression models', 'https://pubmed.ncbi.nlm.nih.gov/19204579/'],
  nhlbiSleep: ['NHLBI: How sleep works', 'https://www.nhlbi.nih.gov/health/sleep'],
  nhlbiSleepEffects: ['NHLBI: Health effects of sleep deficiency', 'https://www.nhlbi.nih.gov/health/sleep-deprivation/health-effects'],
  nhlbiSleepHours: ['NHLBI: How much sleep is enough', 'https://www.nhlbi.nih.gov/health/sleep-deprivation/how-much-sleep'],
  nasWater: ['National Academies: Dietary Reference Intakes for Water', 'https://nap.nationalacademies.org/read/10925/chapter/2'],
  ahaHeartRate: ['American Heart Association: Target heart rates', 'https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates'],
  ahaBloodPressure: ['American Heart Association: Blood pressure categories', 'https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings'],
  nccihMeditation: ['NCCIH: Meditation and mindfulness', 'https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety'],
  nimhStress: ['NIMH: Understanding stress', 'https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet'],
  nimhHelp: ['NIMH: Help for mental illnesses', 'https://www.nimh.nih.gov/health/find-help'],
  ods: ['NIH Office of Dietary Supplements: Fact sheets', 'https://ods.od.nih.gov/factsheets/list-all/'],
  odsOmega3: ['NIH ODS: Omega-3 fatty acids', 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/'],
  odsMagnesium: ['NIH ODS: Magnesium', 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/'],
  fdaLabels: ['FDA: How to understand Nutrition Facts labels', 'https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label'],
  uspstf: ['US Preventive Services Task Force: Recommendations', 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations'],
  acogPregnancy: ['ACOG: Healthy eating during pregnancy', 'https://www.acog.org/womens-health/faqs/healthy-eating-during-pregnancy'],
  acogExercise: ['ACOG: Exercise during pregnancy', 'https://www.acog.org/womens-health/faqs/exercise-during-pregnancy'],
  womensHealth: ['Office on Women’s Health: Health topics', 'https://womenshealth.gov/a-z-topics'],
  cdcPregnancyWeight: ['CDC: Weight gain during pregnancy', 'https://www.cdc.gov/maternal-infant-health/pregnancy-weight/index.html'],
  niddkPcos: ['NICHD: Polycystic ovary syndrome', 'https://www.nichd.nih.gov/health/topics/pcos'],
  niddkLabs: ['MedlinePlus: Understanding laboratory tests', 'https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/'],
  cdcAlcohol: ['CDC: Alcohol use and health', 'https://www.cdc.gov/alcohol/about-alcohol-use/index.html'],
  whoSugar: ['WHO: Sugars intake guideline', 'https://www.who.int/publications/i/item/9789241549028'],
  aasmInsomnia: ['AASM: Behavioral treatment of chronic insomnia', 'https://pubmed.ncbi.nlm.nih.gov/33164742/'],
  nihTestosterone: ['MedlinePlus: Testosterone levels test', 'https://medlineplus.gov/lab-tests/testosterone-levels-test/'],
  ecmaDate: ['ECMAScript specification: Date objects', 'https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-objects']
};

const htmlEscape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const textOnly = (value) => String(value).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();

const guidanceOverrides = {
  'bmi-for-athletes': 'BMI & Body Weight',
  'date-difference-calculator-guide': 'Date Tools',
  'fitness-after-40': 'Fitness & Exercise',
  'healthy-lifestyle-checklist': 'Lifestyle & Habits',
  'how-to-build-healthy-habits': 'Lifestyle & Habits',
  'how-to-stay-consistent-with-fitness': 'Fitness & Exercise',
  'how-age-calculator-works': 'Date Tools',
  'how-birthday-calculator-works': 'Date Tools',
  'pregnancy-weight-gain': "Women's Health",
  'realistic-fitness-goals': 'Fitness & Exercise',
  'morning-routines-healthy-people': 'Lifestyle & Habits',
  'swimming-calories-and-fitness': 'Swimming & Aquatics',
  'weight-loss-after-50': 'Weight Loss'
};

const guidanceFor = (profile) => getGuidance(guidanceOverrides[profile.slug] || profile.category);

function naturalTopicLabel(value) {
  const text = String(value).trim();
  const firstWord = text.split(/\s+/)[0];
  if (/^[A-Z0-9&-]{2,}$/.test(firstWord)) return text;
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

const lowerFirst = (value) => `${String(value).charAt(0).toLowerCase()}${String(value).slice(1)}`;
const withoutFinalPeriod = (value) => String(value).replace(/[.!?]+$/, '');

function stableHash(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function guidanceExcerpt(value, slug, slot) {
  const sentences = String(value).match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item) => item.trim()).filter(Boolean) || [String(value)];
  return sentences[stableHash(`${slug}:guidance:${slot}`) % sentences.length];
}

function descriptionFor(profile) {
  if (profile.description) return profile.description;
  const text = textOnly(profile.overview);
  if (text.length <= 155) return text;
  return `${text.slice(0, 151).replace(/\s+\S*$/, '')}.`;
}

function questionsFor(profile) {
  const guide = guidanceFor(profile);
  const label = naturalTopicLabel(profile.shortTopic);
  const sections = [
    {
      question: `What is the most important thing to understand about ${label}?`,
      answer: `${profile.overview} ${guide.meaning}`
    },
    {
      question: `Why can guidance about ${label} differ between people?`,
      answer: `${profile.context} ${guide.personal}`
    },
    {
      question: `How can I use this ${label} information in practice?`,
      answer: `${profile.actions[0]} ${profile.actions[1]} ${guide.practice}`
    },
    {
      question: `What common mistakes should I avoid with ${label}?`,
      answer: `${profile.cautions.join(' ')} ${guide.limits}`
    },
    {
      question: `When should I get professional advice about ${label}?`,
      answer: `${profile.guidance} ${guide.safety}`
    }
  ];
  return sections;
}

function headingsFor(profile) {
  const label = naturalTopicLabel(profile.shortTopic);
  return [
    `Understanding ${label}`,
    `${profile.topic}: Evidence and Practical Meaning`,
    `Factors That Change the Answer`,
    `How to Apply This Information`,
    `How to Monitor Progress`,
    `Common Mistakes and Important Limits`,
    `When to Seek Qualified Help`,
    'Sources and Further Reading'
  ];
}

function sourcesHtml(profile) {
  return `<ul>${profile.sources.map((id) => {
    const source = sourceLibrary[id];
    if (!source) throw new Error(`Unknown source id ${id}`);
    return `<li><a href="${source[1]}" target="_blank" rel="noopener noreferrer">${htmlEscape(source[0])}</a></li>`;
  }).join('')}</ul>`;
}

function sectionsFor(profile) {
  const headings = headingsFor(profile);
  const guide = guidanceFor(profile);
  const topic = naturalTopicLabel(profile.shortTopic);
  const sections = [
    {
      heading: headings[0],
      html: `<p>${htmlEscape(profile.overview)}</p><p>In this article, ${htmlEscape(topic)} is used within a wider definition: ${htmlEscape(lowerFirst(guidanceExcerpt(guide.meaning, profile.slug, 0)))}</p><p>${htmlEscape(profile.facts[0])}</p>`
    },
    {
      heading: headings[1],
      html: `<h3>The main influence on the answer</h3><p>${htmlEscape(profile.facts[1])} This detail changes how ${htmlEscape(topic)} should be interpreted and why one person’s experience cannot automatically predict another person’s outcome.</p><h3>The limit behind the headline</h3><p>${htmlEscape(profile.facts[2])} Keep that qualification beside the main claim; leaving it out would make the article sound more certain than the available information allows.</p><h3>What the facts support</h3><p>Taken together, these points support a measured approach: ${htmlEscape(lowerFirst(profile.actions[0]))} They do not support ignoring the warning to ${htmlEscape(withoutFinalPeriod(lowerFirst(profile.cautions[0])))}.</p>`
    },
    {
      heading: headings[2],
      html: `<p>Personal interpretation of ${htmlEscape(topic)} should account for this context: ${htmlEscape(lowerFirst(profile.context))}</p><p>The individual factors for ${htmlEscape(topic)} also include the following: ${htmlEscape(lowerFirst(guidanceExcerpt(guide.personal, profile.slug, 1)))}</p><p>Before applying the guidance, identify which of these circumstances are present and whether they alter the starting assumption that ${htmlEscape(lowerFirst(profile.facts[0]))}</p>`
    },
    {
      heading: headings[3],
      html: `<h3>1. Establish a reliable starting point</h3><p>${htmlEscape(profile.actions[0])} This step is designed to address the first key finding: ${htmlEscape(lowerFirst(profile.facts[0]))}</p><h3>2. Make the next step workable</h3><p>${htmlEscape(profile.actions[1])} ${htmlEscape(guidanceExcerpt(guide.practice, profile.slug, 2))}</p><h3>3. Review before changing the plan again</h3><p>${htmlEscape(profile.actions[2])} Use the review to test whether ${htmlEscape(lowerFirst(profile.facts[2]))} If the picture is still unclear, improve consistency or allow a more suitable observation period rather than changing several variables at once.</p>`
    },
    {
      heading: headings[4],
      html: `<p>Progress on ${htmlEscape(topic)} should be assessed in this way: ${htmlEscape(lowerFirst(guidanceExcerpt(guide.review, profile.slug, 3)))}</p><p>For ${htmlEscape(topic)}, the review should show whether ${htmlEscape(withoutFinalPeriod(lowerFirst(profile.actions[0])))} helped without creating the problem described in this caution: ${htmlEscape(lowerFirst(profile.cautions[0]))}</p><p>If progress is unclear, revisit the evidence that ${htmlEscape(lowerFirst(profile.facts[1]))} Then check measurement consistency, changing circumstances, and whether the plan was actually repeatable before making it more restrictive or difficult.</p>`
    },
    {
      heading: headings[5],
      html: `<h3>Do not overstate what the result proves</h3><p>${htmlEscape(profile.cautions[0])} That limit follows directly from the fact that ${htmlEscape(lowerFirst(profile.facts[0]))}</p><h3>Avoid a shortcut that creates a new problem</h3><p>${htmlEscape(profile.cautions[1])} A safer approach remains consistent with the practical recommendation to ${htmlEscape(withoutFinalPeriod(lowerFirst(profile.actions[1])))}.</p><p>One further limit applies specifically when using this ${htmlEscape(topic)} guidance: ${htmlEscape(lowerFirst(guidanceExcerpt(guide.limits, profile.slug, 4)))}</p>`
    },
    {
      heading: headings[6],
      html: `<p>Individual advice about ${htmlEscape(topic)} is especially important in these situations: ${htmlEscape(lowerFirst(profile.guidance))}</p><p>A separate safety boundary also applies to ${htmlEscape(topic)}: ${htmlEscape(lowerFirst(guidanceExcerpt(guide.safety, profile.slug, 5)))}</p><p>When asking for individual advice about ${htmlEscape(topic)}, bring the relevant measurements, dates, symptoms, medicines, and a record of the attempt to ${htmlEscape(withoutFinalPeriod(lowerFirst(profile.actions[2])))}.</p>`
    },
    { heading: headings[7], html: sourcesHtml(profile) }
  ];
  return sections;
}

function replaceOnce(html, pattern, replacement, label, file) {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
  const matches = html.match(new RegExp(pattern.source, flags));
  if (!matches || matches.length !== 1) throw new Error(`${file}: expected one ${label}, found ${matches ? matches.length : 0}`);
  return html.replace(pattern, replacement);
}

function updateJsonLd(html, type, updater, file) {
  let count = 0;
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (full, value) => {
    let data;
    try { data = JSON.parse(value); } catch { return full; }
    if (data['@type'] !== type) return full;
    count += 1;
    return `<script type="application/ld+json">${JSON.stringify(updater(data))}</script>`;
  });
  if (count !== 1) throw new Error(`${file}: expected one ${type} schema, found ${count}`);
  return html;
}

const plannedSlugs = profiles.map((profile) => profile.slug).sort();
const actualSlugs = fs.readdirSync(path.join(root, 'blog'))
  .filter((name) => name.endsWith('.html'))
  .filter((name) => /<meta name="robots" content="noindex, follow">/i.test(fs.readFileSync(path.join(root, 'blog', name), 'utf8')))
  .map((name) => name.slice(0, -5))
  .sort();
const missingProfiles = actualSlugs.filter((slug) => !plannedSlugs.includes(slug));
const unexpectedProfiles = plannedSlugs.filter((slug) => !actualSlugs.includes(slug));
if (missingProfiles.length || unexpectedProfiles.length) {
  throw new Error(`Profile inventory mismatch. Missing: ${missingProfiles.join(', ') || 'none'}. Unexpected: ${unexpectedProfiles.join(', ') || 'none'}.`);
}

for (const profile of profiles) {
  if (!profile.topic || !profile.overview || profile.facts.length !== 3 || profile.actions.length !== 3 || profile.cautions.length !== 2 || !profile.sources.length) {
    throw new Error(`${profile.slug}: incomplete profile`);
  }
  for (const sourceId of profile.sources) {
    if (!sourceLibrary[sourceId]) throw new Error(`${profile.slug}: unknown source id ${sourceId}`);
  }
}

const updates = [];
for (const profile of profiles) {
  const file = path.join(root, 'blog', `${profile.slug}.html`);
  let html = fs.readFileSync(file, 'utf8');
  if (!/<meta name="robots" content="noindex, follow">/i.test(html)) throw new Error(`${profile.slug}: expected noindex, follow`);

  const sections = sectionsFor(profile);
  const faqs = questionsFor(profile);
  const description = descriptionFor(profile);
  const keywords = [profile.primaryKeyword, ...profile.variations].join(', ');
  const calculatorWidget = html.match(/<div class="calc-embed-widget fade-in">[\s\S]*?<\/div>/)?.[0] || '';
  const body = sections.map((section, index) => `<h2 id="bp-sec-${index}">${htmlEscape(section.heading)}</h2>\n${section.html}${index === 2 ? `\n${calculatorWidget}` : ''}`).join('\n');
  const toc = (sidebar) => `<ol class="bp-toc-list">${sections.map((section, index) => `<li><a href="#bp-sec-${index}"${sidebar ? ` class="bp-toc-link" data-target="bp-sec-${index}"` : ''}>${index + 1}. ${htmlEscape(section.heading)}</a></li>`).join('')}</ol>`;
  const takeaways = [...profile.facts.slice(0, 3), profile.actions[0], profile.cautions[0]];
  const faqList = `<div class="faq-list">${faqs.map((faq) => `<div class="faq-item"><button class="faq-question">${htmlEscape(faq.question)}<svg viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><div class="faq-answer"><div class="faq-answer-inner">${htmlEscape(faq.answer)}</div></div></div>`).join('')}</div>`;
  const visibleFaq = `<section class="bp-faq-section fade-in">\n<h2>Important FAQs About ${htmlEscape(naturalTopicLabel(profile.shortTopic))}</h2>\n${faqList}\n</section>`;

  html = replaceOnce(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${htmlEscape(description)}">`, 'description', profile.slug);
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${htmlEscape(description)}">`, 'OG description', profile.slug);
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${htmlEscape(description)}">`, 'Twitter description', profile.slug);
  html = replaceOnce(html, /<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${htmlEscape(keywords)}">`, 'keywords', profile.slug);
  html = updateJsonLd(html, 'BlogPosting', (data) => ({ ...data, description, dateModified: modified, keywords }), profile.slug);
  html = updateJsonLd(html, 'FAQPage', (data) => ({ ...data, mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: textOnly(faq.answer) } })) }), profile.slug);
  html = replaceOnce(html, /(<details class="bp-toc-mobile fade-in">[\s\S]*?<summary>[\s\S]*?<\/summary>\s*)<ol class="bp-toc-list">[\s\S]*?<\/ol>(\s*<\/details>)/, `$1${toc(false)}$2`, 'mobile TOC', profile.slug);
  html = replaceOnce(html, /(<div class="bp-info-box-title">[\s\S]*?<\/div>\s*)<ul>[\s\S]*?<\/ul>(\s*<\/div>)/, `$1<ul>${takeaways.map((item) => `<li>${item}</li>`).join('')}</ul>$2`, 'takeaways', profile.slug);
  html = replaceOnce(html, /(<!-- Article body -->\s*)[\s\S]*?(\s*<!-- CTA Callout box -->)/, `$1${body}$2`, 'article body', profile.slug);
  html = replaceOnce(html, /(<!-- FAQ -->\s*)<section class="bp-faq-section fade-in">[\s\S]*?<\/section>/, `$1${visibleFaq}`, 'FAQ', profile.slug);
  html = replaceOnce(html, /(<div class="bp-toc" id="bpToc">[\s\S]*?<\/div>\s*)<ol class="bp-toc-list">[\s\S]*?<\/ol>(\s*<\/div>)/, `$1${toc(true)}$2`, 'sidebar TOC', profile.slug);
  html = html.replace(/<span>Updated 2026<\/span>/, '<span>Updated August 2026</span>');
  updates.push({ file, html });
}

for (const update of updates) fs.writeFileSync(update.file, update.html, 'utf8');

console.log(`Updated ${profiles.length} noindexed article drafts while preserving their page shells and robots directives.`);
