const fs = require('fs');
const path = require('path');
const profiles = require('../content/remaining-blog-profiles');

const root = path.resolve(__dirname, '..');
const modified = '2026-08-06';

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

function descriptionFor(profile) {
  if (profile.description) return profile.description;
  const text = textOnly(profile.overview);
  if (text.length <= 155) return text;
  return `${text.slice(0, 151).replace(/\s+\S*$/, '')}.`;
}

function questionsFor(profile, variant) {
  const faqLabel = `${profile.shortTopic.charAt(0).toLowerCase()}${profile.shortTopic.slice(1)}`;
  const sets = [
    [`What should I know about ${faqLabel}?`, `Which factors affect guidance on ${faqLabel}?`, 'What is a sensible first step?', 'What are the main limitations?', 'When is professional advice important?'],
    [`How should I approach ${faqLabel}?`, `What can change the answer for ${faqLabel}?`, 'How can I apply this information?', 'What common mistake should I avoid?', 'Who needs individual guidance?'],
    [`What is the most useful way to think about ${faqLabel}?`, `Why does advice about ${faqLabel} vary?`, 'Where should a beginner start?', 'Can one number or habit tell the whole story?', 'When should I speak with a qualified professional?'],
    [`What matters most for ${faqLabel}?`, `How reliable are general rules about ${faqLabel}?`, 'What action can I take today?', 'What should I not assume?', 'Are there situations that need medical advice?']
  ];
  const q = sets[variant % sets.length];
  return [
    { question: q[0], answer: profile.overview },
    { question: q[1], answer: profile.facts[1] || profile.facts[0] },
    { question: q[2], answer: profile.actions[0] },
    { question: q[3], answer: profile.cautions[0] },
    { question: q[4], answer: profile.guidance }
  ];
}

function headingsFor(profile, variant) {
  const sets = [
    [`${profile.topic}: The Essential Context`, `Key Facts About ${profile.shortTopic}`, `What Changes the Answer`, `How to Use This Information`, `Mistakes and Misleading Shortcuts`, `When General Advice Is Not Enough`, 'Sources and Further Reading'],
    [`Understanding ${profile.topic}`, `The Numbers and Terms Explained`, `Why Results Differ Between People`, `A Practical Starting Plan`, `Limits to Keep in Mind`, `Questions to Discuss With a Professional`, 'References and Further Reading'],
    [`${profile.topic} in Plain Language`, `What the Main Evidence Shows`, `Personal Factors That Matter`, `Step-by-Step: What to Do Next`, `Common Errors to Avoid`, `Safety and Individual Guidance`, 'Authoritative Sources'],
    [`A Clear Guide to ${profile.topic}`, `Important Details Behind the Headline`, `How to Interpret the Information`, `Practical Actions That Fit Real Life`, `What This Guide Cannot Tell You`, `When to Seek Qualified Help`, 'Sources Used for This Guide']
  ];
  return sets[variant % sets.length];
}

function sourcesHtml(profile) {
  return `<ul>${profile.sources.map((id) => {
    const source = sourceLibrary[id];
    if (!source) throw new Error(`Unknown source id ${id}`);
    return `<li><a href="${source[1]}" target="_blank" rel="noopener noreferrer">${htmlEscape(source[0])}</a></li>`;
  }).join('')}</ul><p><strong>Editorial status:</strong> This educational draft remains noindexed pending final editorial or clinical review. It does not replace individual medical care.</p>`;
}

function sectionsFor(profile, variant) {
  const headings = headingsFor(profile, variant);
  const nuance = [
    'Population guidance is useful for orientation, but it should be adjusted to the person, setting, and goal.',
    'A single reading or short observation window rarely tells the whole story; patterns and context are more useful.',
    'Use ranges and trends rather than treating an estimated value as exact.',
    'Good decisions combine the general evidence with symptoms, preferences, access, and medical history.',
    'Separate what is measured directly from what is estimated, then note the assumptions that connect the two.',
    'The most useful comparison is usually with a consistent earlier measurement, not with an idealised person online.',
    'Before changing a routine, identify the outcome you want and a realistic way to observe whether it improves.',
    'Definitions, units, and time frames can change the meaning of a number even when the arithmetic is correct.',
    'A recommendation for a population is a starting point; tolerance, resources, health, and priorities shape the individual plan.',
    'Quality matters alongside quantity, especially when a target can be reached through several very different behaviours.',
    'Short-term fluctuations are expected, so look for a consistent pattern before drawing a strong conclusion.',
    'Reliable self-tracking uses the same method, similar conditions, and enough time for a meaningful change to appear.'
  ];
  const interpretation = [
    `For ${profile.shortTopic}, first distinguish a screening estimate from a diagnosis or direct measurement. That distinction determines how confidently you can act on the result.`,
    `When reading advice about ${profile.shortTopic}, check who the guidance was written for, what outcome it addresses, and whether your circumstances match those assumptions.`,
    `A practical interpretation of ${profile.shortTopic} starts with the units, the time period, and the method. Small differences may reflect measurement conditions rather than real change.`,
    `To make ${profile.shortTopic} useful, connect each number or recommendation with a concrete question. If it does not change a sensible decision, extra precision may add little value.`,
    `Good information about ${profile.shortTopic} should state both what is known and what remains uncertain. Treat a confident promise without limitations as a warning sign.`,
    `For decisions involving ${profile.shortTopic}, compare like with like. Changing the device, formula, serving definition, or timing can create an apparent trend that is not real.`,
    `The headline result for ${profile.shortTopic} is only one part of the picture. Symptoms, function, consistency, and the direction of change often add more useful context.`,
    `Interpret ${profile.shortTopic} on the time scale that matches the goal. A daily fluctuation should not be judged as though it were a long-term outcome.`,
    `Before applying a general rule to ${profile.shortTopic}, identify exceptions that matter for age, pregnancy, medicines, diagnosed conditions, training status, or access to food and care.`,
    `With ${profile.shortTopic}, a range is usually more honest than a single perfect target. Build in room for normal variation and measurement error.`,
    `Use ${profile.shortTopic} to support a decision, not to create a grade about your body or behaviour. The goal is a safer, more workable next step.`,
    `For ${profile.shortTopic}, write down the source and date alongside the result. This makes it easier to spot outdated guidance and compare future readings fairly.`
  ];
  const progress = [
    `Review progress in ${profile.shortTopic} after a realistic interval and keep other variables as consistent as practical. Change the plan when the outcome, not just motivation, shows it is needed.`,
    `Choose one primary measure for ${profile.shortTopic} and one supporting observation, such as symptoms, performance, hunger, mood, or sleep. More tracking is not always more informative.`,
    `For ${profile.shortTopic}, decide in advance what would count as improvement, no change, or a reason to stop. Clear criteria reduce impulsive decisions from one result.`,
    `Make the first step for ${profile.shortTopic} small enough to repeat in an ordinary week. A sustainable action provides better information than a brief extreme effort.`,
    `Record the circumstances around ${profile.shortTopic}, including timing and relevant changes. Context helps explain why two apparently similar readings may differ.`,
    `If a change related to ${profile.shortTopic} produces pain, marked fatigue, dizziness, worsening symptoms, or loss of function, stop treating it as a self-improvement problem and seek advice.`,
    `Use a short review cycle for ${profile.shortTopic}: plan one action, observe the relevant outcome, and then keep, adjust, or discontinue it based on what happened.`,
    `Avoid changing several parts of ${profile.shortTopic} at once. A simpler experiment is easier to follow and makes the result easier to interpret.`,
    `When monitoring ${profile.shortTopic}, expect imperfect weeks. Return to the core action without compensating through unsafe restriction, excessive exercise, or an unrealistic catch-up plan.`,
    `Compare progress in ${profile.shortTopic} with your own baseline and goal. Online examples may use different methods, starting points, resources, and health circumstances.`,
    `For ${profile.shortTopic}, keep the plan flexible enough for work, caregiving, culture, disability, budget, and access. A theoretically ideal plan that cannot be followed has limited value.`,
    `Recheck the evidence behind ${profile.shortTopic} when the goal, health situation, medicine, life stage, or measurement method changes.`
  ];
  const intro = [
    `Use this guide to separate the main evidence about ${profile.shortTopic} from assumptions that need individual interpretation.`,
    `The aim is to make ${profile.shortTopic} understandable enough to support a sensible decision without creating false precision.`,
    `Start with the definition of ${profile.shortTopic}, then check the population, measurement method, and limits behind any recommendation.`,
    `This guide focuses on the details that make ${profile.shortTopic} useful in everyday life and the situations in which general advice is not enough.`,
    `A clear view of ${profile.shortTopic} requires both the headline facts and the context that can change their meaning.`,
    `Read the guidance on ${profile.shortTopic} as a practical framework, then adjust it for real symptoms, resources, preferences, and professional advice.`,
    `Use the sections below to understand ${profile.shortTopic}, avoid common shortcuts, and choose a next step that can be reviewed safely.`,
    `Good decisions about ${profile.shortTopic} begin with accurate terms and realistic expectations rather than a perfect score or guaranteed outcome.`,
    `The most useful question about ${profile.shortTopic} is not only “what is typical?” but also “what does this change for me?”`,
    `Approach ${profile.shortTopic} by checking the evidence, the limits of the method, and the action that best fits the actual goal.`,
    `This explanation of ${profile.shortTopic} is designed for orientation and planning; diagnosis and treatment still require individual assessment.`,
    `Use this page as a map for ${profile.shortTopic}: identify the reliable landmarks, recognise uncertainty, and avoid acting on one isolated number.`
  ];
  const cautionClosers = [
    'Be wary of guaranteed outcomes or urgency that is used in place of a clear method and honest limitations.',
    'A trustworthy recommendation explains trade-offs and uncertainty instead of presenting one rule as suitable for everyone.',
    'Products and programmes should not borrow medical language to make an unvalidated promise sound certain.',
    'If a claim cannot explain its measurement, population, time frame, and limits, do not base a high-stakes decision on it.',
    'More data is not automatically better when the underlying device, formula, or interpretation has not been shown to answer the question.',
    'Avoid plans that demand rapid escalation, unsafe restriction, secrecy, or stopping prescribed care.',
    'Testimonials can describe an experience, but they cannot establish what result another person will have.',
    'A dramatic before-and-after result may hide differences in time, method, starting point, health, and access to support.',
    'Treat “natural,” “clinical,” and “doctor recommended” as claims to verify, not as proof of safety or effectiveness.',
    'Do not let a colour, badge, or confident label replace the explanation of how the conclusion was reached.',
    'A plan becomes less credible when it hides costs, side effects, exclusions, or the possibility that no meaningful change will occur.',
    'Prefer sources that update their guidance, show who it applies to, and acknowledge where evidence is limited.'
  ];
  const safetyClosers = [
    'New, severe, or rapidly worsening symptoms deserve prompt assessment rather than another online calculation.',
    'If symptoms create immediate danger or major loss of function, use urgent local medical services.',
    'A professional review is especially important when several symptoms or risk factors occur together.',
    'Do not wait for a routine follow-up when there is sudden deterioration, severe pain, fainting, confusion, or breathing difficulty.',
    'Bring the relevant measurements, dates, medicines, and questions to an appointment so the result can be interpreted in context.',
    'When advice from a calculator conflicts with a treatment plan, follow the responsible clinician and ask for clarification.',
    'Children, pregnancy, frailty, and complex medical conditions often need population-specific assessment rather than general adult guidance.',
    'Professional advice is not only for abnormal numbers; it is also useful when the correct target or measurement method is uncertain.',
    'Use emergency services for immediate danger and routine clinical care for persistent, unexplained, or function-limiting concerns.',
    'A reassuring result should never be used to dismiss symptoms that would otherwise need medical attention.',
    'If self-monitoring is increasing fear, compulsive checking, or unsafe behaviour, pause it and seek appropriate support.',
    'Keep online guidance in its proper role: preparation for a better conversation, not a replacement for individual care.'
  ];
  return [
    { heading: headings[0], html: `<p>${profile.overview}</p><p>${profile.facts[0]}</p><p>${intro[variant % intro.length]}</p>` },
    { heading: headings[1], html: `<ul>${profile.facts.slice(1).map((fact) => `<li>${fact}</li>`).join('')}</ul><p>${nuance[variant % nuance.length]}</p><p>${interpretation[variant % interpretation.length]}</p>` },
    { heading: headings[2], html: `<p>${profile.context}</p><p>${nuance[(variant + 1) % nuance.length]}</p>` },
    { heading: headings[3], html: `<ol>${profile.actions.map((action) => `<li>${action}</li>`).join('')}</ol><p>${progress[variant % progress.length]}</p>` },
    { heading: headings[4], html: `<ul>${profile.cautions.map((item) => `<li>${item}</li>`).join('')}</ul><p>${cautionClosers[variant % cautionClosers.length]}</p>` },
    { heading: headings[5], html: `<p>${profile.guidance}</p><p>${safetyClosers[variant % safetyClosers.length]}</p>` },
    { heading: headings[6], html: sourcesHtml(profile) }
  ];
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
for (const [profileIndex, profile] of profiles.entries()) {
  const file = path.join(root, 'blog', `${profile.slug}.html`);
  let html = fs.readFileSync(file, 'utf8');
  if (!/<meta name="robots" content="noindex, follow">/i.test(html)) throw new Error(`${profile.slug}: expected noindex, follow`);

  const slugSeed = [...profile.slug].reduce((total, char) => total + char.charCodeAt(0), 0);
  const variant = (profileIndex + slugSeed) % 12;
  const sections = sectionsFor(profile, variant);
  const faqs = questionsFor(profile, variant);
  const description = descriptionFor(profile);
  const keywords = [profile.primaryKeyword, ...profile.variations].join(', ');
  const calculatorWidget = html.match(/<div class="calc-embed-widget fade-in">[\s\S]*?<\/div>/)?.[0] || '';
  const body = sections.map((section, index) => `<h2 id="bp-sec-${index}">${htmlEscape(section.heading)}</h2>\n${section.html}${index === 2 ? `\n${calculatorWidget}` : ''}`).join('\n');
  const toc = (sidebar) => `<ol class="bp-toc-list">${sections.map((section, index) => `<li><a href="#bp-sec-${index}"${sidebar ? ` class="bp-toc-link" data-target="bp-sec-${index}"` : ''}>${index + 1}. ${htmlEscape(section.heading)}</a></li>`).join('')}</ol>`;
  const takeaways = [...profile.facts.slice(0, 3), profile.actions[0], profile.cautions[0]];
  const faqList = `<div class="faq-list">${faqs.map((faq) => `<div class="faq-item"><button class="faq-question">${htmlEscape(faq.question)}<svg viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><div class="faq-answer"><div class="faq-answer-inner">${faq.answer}</div></div></div>`).join('')}</div>`;
  const visibleFaq = `<section class="bp-faq-section fade-in">\n<h2>Frequently Asked Questions</h2>\n${faqList}\n</section>`;

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
