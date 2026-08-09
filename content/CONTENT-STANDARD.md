# VitalHealth Hub content standard

The rules every calculator and main page is written to. Written down because "make it
better" is not reviewable and "does it follow the standard" is.

---

## 1. Why the old content underperformed

Measured, not guessed:

| Problem | Extent |
|---|---|
| Identical "Who Should Use" paragraph, word for word | **103 of 103** calculators |
| "Step 1 — Weight (kg): Enter your weight (kg) in the input field" | **98** pages |
| Claims with no number and no source ("research has shown strong correlations") | throughout |
| Factual error: "BMI estimates body fat" | BMI is a weight-for-height ratio, it estimates nothing about fat |
| Self-referential link ("pair this tool with our BMI Calculator" *on* the BMI page) | present |

The pattern is padding. Every section adds words without adding information a reader
could not have guessed. Google's helpful-content guidance targets exactly this, and on
YMYL health queries the bar is higher still.

---

## 2. The test every page must pass

> **Could a reader get this specific number, threshold, or caveat anywhere else on the
> first page of results?** If no, the section earns its place. If yes, cut it.

A second test, for tone:

> **Would a knowledgeable friend say this sentence out loud?** Nobody says "it is
> important to note that BMI may potentially serve as a useful screening indicator."

---

## 3. Calculator page structure

Fixed order. Sections 3 and 4 are the ones that win rankings; sections 1 and 2 are the
tool itself and already exist.

**1. H1 + the tool** — primary keyword phrased how people search it. Tool above the fold.

**2. Direct answer (80–120 words).**
Answer the query in the first two sentences, before any context. This is the featured
snippet target. For BMI: what the number is, what the ranges are, what it cannot tell
you. No preamble, no "in this article we will".

**3. The reference table.**
The actual thresholds. This is what people screenshot and what other sites link to.
Unique to each calculator by definition — it is the metric's own data. Include the
cut-offs that competitors omit (WHO's separate Asian BMI thresholds, for instance).

**4. How the number is produced.**
Name the equation. Show it. Define each variable and its unit. If several competing
equations exist (Mifflin-St Jeor vs Harris-Benedict vs Katch-McArdle), say which one
this page uses and why. Never hide the formula.

**5. Reading your own result.**
Segmented by outcome, not generic. What a 27 means is a different paragraph from what a
17 means. Each segment ends in an action, not a feeling.

**6. Where this number is wrong.**
The honest section, and the one that builds trust fastest. Specific to the metric:
which populations it misreads, by how much, and what to use instead. Generic hedging
("consult a professional") does not count.

**7. What to do next.**
Concrete and tied to the result. Numbers, not encouragement.

**8. FAQ.**
Real questions people ask, taken from search behaviour. 40–60 words each, answered in
the first sentence. Marked up as FAQPage schema.

**9. Sources.**
See section 5.

---

## 4. Tone

**Do:**
- Second person. "Your BMI" not "one's BMI".
- Numbers instead of adjectives. "25 kg/m²" not "a raised value".
- Vary sentence length. A short one lands. Then a longer one that carries the detail,
  the caveat, and the consequence together.
- Name things. "The Mifflin-St Jeor equation", "the WHO Asian cut-off", "NHS guidance".
- State uncertainty once, plainly, and move on.

**Never:**
- "It is important to note", "in today's fast-paced world", "delve", "leverage",
  "robust", "unlock", "empower", "journey", "when it comes to".
- Stacked hedges: "may potentially sometimes contribute to".
- Rhetorical questions as headings ("So what is BMI, exactly?").
- Sentences that restate the heading they sit under.
- Any paragraph that could be pasted onto a different calculator unchanged.

---

## 5. Citation rules

Citations exist to support a claim, not to decorate the page.

**A citation is required when** the text states a number, a threshold, a risk
relationship, or a clinical recommendation.

**A citation is banned when** it does not support the sentence it sits next to.
Three links to NIH homepages is not authority, it is noise.

**Each citation must:**
1. Point at the specific page carrying the claim, never an institution's homepage.
2. Be named inline so the reader knows the weight without clicking: "the WHO sets…",
   "NHS guidance puts…", "the CDC's growth charts define…".
3. Be checked to still resolve. A dead citation is worse than none.

**Source mix, for US + UK + EU reach:**

| Source | Use for | Signals to |
|---|---|---|
| NIH / NHLBI / MedlinePlus | Formulas, clinical thresholds | US |
| CDC | Population data, growth charts | US |
| health.gov | Activity and dietary guidelines | US |
| NHS | Same claim, UK phrasing and thresholds | UK |
| WHO | International cut-offs, definitions | Global / EU |
| EFSA | Nutrient reference values | EU |

Three to five real citations beats fifteen decorative ones. Where US and UK guidance
differ, say so and give both — that difference is itself a reason to rank in both.

---

## 6. Keywords

- Primary keyword in H1, title, meta description, and the first 100 words. Once each,
  phrased naturally.
- Secondary and long-tail terms earn their place as **section headings** where a real
  question exists ("Is BMI accurate for athletes?"), never sprinkled mid-sentence.
- Write for the intent behind the query, not the string. Someone searching "BMI
  calculator" wants a number in three seconds; someone searching "is BMI accurate"
  wants section 6.
- No keyword repeated to hit a density target. Density is not a ranking factor;
  covering the topic is.

---

## 7. Anti-duplication

Hard rules, checkable by script:

1. No paragraph may appear on more than one calculator page.
2. The limitations section must reference the specific metric, not "this tool".
3. A page may never link to itself as a recommendation.
4. Shared text is allowed **only** in: navigation, footer, medical disclaimer.
5. Maximum similarity between any two pages: **25%** (currently 42.9% at worst).

---

## 8. Length

Length is an output, not a target. Cover the topic and stop.

In practice a calculator page lands at 1,200–1,800 words once padding is gone and real
tables, thresholds and caveats are in. If a page needs 900 words, ship 900. Padding to
reach a number is the exact failure this document exists to prevent.
