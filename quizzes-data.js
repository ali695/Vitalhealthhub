module.exports = [

  // ── HEALTH QUIZZES ──
  {
    slug: 'nutrition-knowledge-quiz',
    name: 'Nutrition Knowledge Quiz',
    desc: 'How well do you understand macros, vitamins, and healthy eating? Test your nutrition IQ with 10 evidence-based questions.',
    icon: '🥗',
    category: 'Health',
    disclaimer: null,
    relatedTools: ['macro-calculator','calorie-calculator','protein-intake-calculator'],
    relatedBlogs: ['what-are-macronutrients','how-much-protein-per-day','how-to-read-nutrition-labels'],
    questions: [
      { q: 'How many calories does 1 gram of protein provide?', opts: ['2 kcal','4 kcal','7 kcal','9 kcal'], ans: 1, exp: 'Protein provides 4 kcal/g. Carbohydrates also provide 4 kcal/g, while fat provides 9 kcal/g.' },
      { q: 'Which vitamin is primarily produced through sun exposure?', opts: ['Vitamin A','Vitamin B12','Vitamin C','Vitamin D'], ans: 3, exp: 'Vitamin D is synthesised in the skin when exposed to UVB radiation from sunlight.' },
      { q: 'What is the recommended daily fibre intake for adults?', opts: ['10–15 g','25–38 g','50 g','60 g'], ans: 1, exp: 'Health guidelines recommend 25–38 g of dietary fibre per day for adults.' },
      { q: 'Which macronutrient has the highest calories per gram?', opts: ['Protein','Carbohydrates','Fat','Alcohol'], ans: 2, exp: 'Fat provides 9 kcal per gram, making it the most calorie-dense macronutrient.' },
      { q: 'What does BMR stand for?', opts: ['Basic Metabolic Range','Basal Metabolic Rate','Body Mass Ratio','Blood Mineral Reading'], ans: 1, exp: 'BMR is the Basal Metabolic Rate — calories your body burns at complete rest.' },
      { q: 'Which food is the richest natural source of Omega-3 fatty acids?', opts: ['Chicken breast','Salmon','Brown rice','Lentils'], ans: 1, exp: 'Fatty fish like salmon are the best source of EPA and DHA omega-3s.' },
      { q: 'What percentage of your plate should be vegetables and fruits according to MyPlate?', opts: ['10%','25%','50%','75%'], ans: 2, exp: 'MyPlate recommends half your plate (50%) be fruits and vegetables.' },
      { q: 'Iron deficiency most commonly leads to which condition?', opts: ['Scurvy','Rickets','Anaemia','Goitre'], ans: 2, exp: 'Iron is essential for haemoglobin production; deficiency causes anaemia.' },
      { q: 'How much water do most adults need per day from all sources?', opts: ['Less than 1 litre','1–2 litres','2–3.5 litres','5+ litres'], ans: 2, exp: 'Most adults need roughly 2–3.5 litres per day from water, food, and drinks combined.' },
      { q: 'Which mineral is most critical for bone strength?', opts: ['Iron','Magnesium','Calcium','Zinc'], ans: 2, exp: 'Calcium is the primary mineral in bone tissue; vitamin D helps its absorption.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Nutrition Beginner', icon: '📚', feedback: 'Great start! Learning about nutrition will transform your health. Explore our calorie and macro calculators to get personalised guidance.' },
      { min: 41, max: 70, label: 'Nutrition Aware', icon: '💡', feedback: 'Good knowledge base! You understand the essentials. Dive deeper into macros, micronutrients, and meal timing to level up.' },
      { min: 71, max: 100, label: 'Nutrition Expert', icon: '🏆', feedback: 'Outstanding! You have a solid grasp of nutrition science. Use our advanced tools to fine-tune your diet further.' }
    ]
  },

  {
    slug: 'hydration-health-quiz',
    name: 'Hydration Health Quiz',
    desc: 'Do you drink enough water? Test your knowledge of hydration, electrolytes, and fluid balance.',
    icon: '💧',
    category: 'Health',
    disclaimer: null,
    relatedTools: ['water-intake-calculator','electrolyte-calculator'],
    relatedBlogs: ['how-much-water-should-you-drink','signs-of-dehydration','hydration-during-exercise'],
    questions: [
      { q: 'What colour urine best indicates good hydration?', opts: ['Dark yellow','Amber brown','Pale yellow / clear','Orange'], ans: 2, exp: 'Pale yellow to clear urine indicates adequate hydration.' },
      { q: 'Approximately what percentage of the adult body is water?', opts: ['30%','45%','60%','80%'], ans: 2, exp: 'The human body is roughly 55–65% water, averaging about 60%.' },
      { q: 'Which electrolyte is lost most during sweating?', opts: ['Calcium','Sodium','Iron','Potassium'], ans: 1, exp: 'Sodium is the primary electrolyte in sweat and is most depleted during exercise.' },
      { q: 'What is a reliable early sign of mild dehydration?', opts: ['Frequent urination','Headache and fatigue','Increased energy','Overly clear urine'], ans: 1, exp: 'Headache and fatigue are among the earliest signs of mild dehydration (1–2% body weight loss).' },
      { q: 'Does coffee count toward your daily fluid intake?', opts: ['No — it is a net dehydrator','Yes — it partially counts','Only decaf counts','No — never'], ans: 1, exp: 'Coffee does count as fluid. Moderate coffee consumption has only a mild diuretic effect, not enough to negate hydration.' },
      { q: 'How much extra water is recommended per hour of vigorous exercise?', opts: ['100 ml','250–750 ml','2 litres','No extra needed'], ans: 1, exp: 'Sports guidelines recommend drinking 250–750 ml per hour of exercise, varying with sweat rate.' },
      { q: 'Which food has the highest water content?', opts: ['Avocado','Banana','Cucumber','Bread'], ans: 2, exp: 'Cucumber is about 96% water, making it one of the most hydrating foods.' },
      { q: 'Is thirst a reliable early indicator of dehydration?', opts: ['Yes, always','No — thirst lags behind actual fluid needs','Only in children','Only in hot weather'], ans: 1, exp: 'Thirst typically kicks in after you are already 1–2% dehydrated, making it a late signal.' },
      { q: 'Drinking excessive amounts of water can cause which medical condition?', opts: ['Stronger bones','Hyponatremia (dangerously low sodium)','Better sleep quality','Higher energy levels'], ans: 1, exp: 'Overhydration dilutes sodium levels, causing hyponatremia — a potentially dangerous condition.' },
      { q: 'What percentage of blood is made up of water?', opts: ['30%','50%','78%','95%'], ans: 2, exp: 'Blood plasma is about 90–92% water, and whole blood is approximately 78% water.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Dehydration Risk', icon: '🌵', feedback: 'Your hydration knowledge needs a top-up! Use our Water Intake Calculator to find your personal daily target.' },
      { min: 41, max: 70, label: 'Hydration Aware', icon: '💧', feedback: 'Good awareness! You understand the basics of hydration. Track your intake daily for even better results.' },
      { min: 71, max: 100, label: 'Hydration Expert', icon: '🏆', feedback: 'Excellent! You know your hydration science inside out. Keep leading a well-hydrated lifestyle!' }
    ]
  },

  {
    slug: 'fitness-level-quiz',
    name: 'Fitness Level Knowledge Quiz',
    desc: 'How much do you know about exercise science, training principles, and fitness fundamentals?',
    icon: '🏋️',
    category: 'Fitness',
    disclaimer: null,
    relatedTools: ['heart-rate-calculator','vo2-max-calculator','one-rep-max-calculator'],
    relatedBlogs: ['cardio-vs-strength-training','progressive-overload-explained','how-many-days-per-week-workout'],
    questions: [
      { q: 'What is the WHO-recommended amount of moderate aerobic exercise per week for adults?', opts: ['60 minutes','150 minutes','300 minutes','30 minutes'], ans: 1, exp: 'WHO guidelines recommend at least 150–300 minutes of moderate-intensity activity per week.' },
      { q: 'A resting heart rate of 60–70 bpm is generally considered?', opts: ['High','Normal to excellent','Dangerously low','A sign of disease'], ans: 1, exp: 'A resting HR of 60–70 bpm is normal. Athletes can have rates as low as 40 bpm.' },
      { q: 'What does VO2 max measure?', opts: ['Blood pressure','Maximum aerobic capacity (oxygen uptake)','Muscle strength','Flexibility'], ans: 1, exp: 'VO2 max is the maximum rate at which your body can use oxygen during intense exercise — the gold standard for cardio fitness.' },
      { q: 'Progressive overload means?', opts: ['Eating more protein each week','Gradually increasing exercise demands over time','Taking extra rest days','Reducing workout volume'], ans: 1, exp: 'Progressive overload is the principle of gradually increasing stress on the body to continue making fitness gains.' },
      { q: 'What does HIIT stand for?', opts: ['Heavy Interval Intense Training','High Intensity Interval Training','High Impact Indoor Training','Heart Interval Intensity Test'], ans: 1, exp: 'HIIT is High Intensity Interval Training — alternating short bursts of intense effort with recovery periods.' },
      { q: 'Which muscle group does a deadlift primarily target?', opts: ['Chest and shoulders','Biceps and forearms','Posterior chain (back, glutes, hamstrings)','Core only'], ans: 2, exp: 'The deadlift is a compound movement primarily working the posterior chain — lower back, glutes, and hamstrings.' },
      { q: 'What heart rate zone is considered optimal for fat burning?', opts: ['90–100% max HR','70–85% max HR','50–70% max HR','30–50% max HR'], ans: 2, exp: 'The fat-burning zone is roughly 50–70% of maximum heart rate, where fat is the primary fuel source.' },
      { q: 'Flexibility is best improved through?', opts: ['Weightlifting','Cardio only','Regular static and dynamic stretching','HIIT training'], ans: 2, exp: 'Regular stretching — both static (holding) and dynamic (moving) — is the most effective way to improve flexibility.' },
      { q: 'What does DOMS stand for?', opts: ['Daily Overload Muscle Strain','Delayed Onset Muscle Soreness','Deep Oxygen Muscle Stress','Dynamic Over-training Muscle Syndrome'], ans: 1, exp: 'DOMS (Delayed Onset Muscle Soreness) is the muscle tenderness felt 24–72 hours after unaccustomed exercise.' },
      { q: 'What does RPE stand for in exercise?', opts: ['Rate of Perceived Exertion','Resting Physical Energy','Repetition Performance Evaluation','Recovery Period Exercise'], ans: 0, exp: 'RPE (Rate of Perceived Exertion) is a self-reported measure of how hard you feel you are working during exercise.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Fitness Beginner', icon: '🌱', feedback: 'Everyone starts somewhere! Use our heart rate and VO2 max calculators to set your baseline fitness goals.' },
      { min: 41, max: 70, label: 'Fitness Enthusiast', icon: '💪', feedback: 'Solid foundations! You understand the key principles. Now apply them consistently with our fitness tools.' },
      { min: 71, max: 100, label: 'Fitness Expert', icon: '🏆', feedback: 'Impressive knowledge! You clearly understand exercise science. Use our 1RM and VO2 max calculators to optimise performance.' }
    ]
  },

  {
    slug: 'lifestyle-health-score-quiz',
    name: 'Lifestyle Health Score Quiz',
    desc: 'How healthy is your daily lifestyle? This quiz covers sleep, diet, stress, activity, and prevention habits.',
    icon: '🌿',
    category: 'Health',
    disclaimer: null,
    relatedTools: ['bmi-calculator','biological-age-calculator','sleep-calculator'],
    relatedBlogs: ['healthy-lifestyle-checklist','health-checks-every-year','realistic-fitness-goals'],
    questions: [
      { q: 'How many hours of sleep do most adults need per night?', opts: ['5–6 hours','6–7 hours','7–9 hours','10–12 hours'], ans: 2, exp: 'The National Sleep Foundation recommends 7–9 hours per night for adults aged 18–64.' },
      { q: 'How many servings of fruits and vegetables are recommended daily?', opts: ['2 servings','3 servings','5 servings','8 servings'], ans: 2, exp: 'WHO and most national guidelines recommend at least 5 servings (400 g) of fruit and veg per day.' },
      { q: 'Chronic stress primarily elevates which hormone?', opts: ['Insulin','Cortisol','Testosterone','Oestrogen'], ans: 1, exp: 'Cortisol is the primary stress hormone, elevated by the HPA axis during chronic stress.' },
      { q: 'Sitting for more than 8 hours daily is associated with?', opts: ['Improved posture','Increased mortality risk','Better productivity','No measurable health effects'], ans: 1, exp: 'Prolonged sitting is an independent risk factor for cardiovascular disease and all-cause mortality, even in those who exercise.' },
      { q: 'What is the healthy BMI range for most adults?', opts: ['15–18','18.5–24.9','25–29','30+'], ans: 1, exp: 'A BMI of 18.5–24.9 is classified as "normal weight" by WHO, though BMI has limitations.' },
      { q: 'Smoking significantly increases risk of which set of diseases?', opts: ['Heart disease only','Lung cancer only','Heart disease, multiple cancers, stroke, and COPD','Diabetes only'], ans: 2, exp: 'Smoking is a risk factor for heart disease, many cancers, stroke, COPD, and numerous other conditions.' },
      { q: 'How often should adults ideally have a general health check?', opts: ['Every 10 years','Only when sick','Annually or as clinically advised','Every 5 years'], ans: 2, exp: 'Annual health screenings allow early detection of conditions like hypertension, diabetes, and high cholesterol.' },
      { q: 'Which single habit has the strongest evidence for improving longevity?', opts: ['Taking supplements','Not smoking','Daily multivitamins','Avoiding coffee'], ans: 1, exp: 'Not smoking is the single most impactful lifestyle change for longevity, reducing risk of dozens of diseases.' },
      { q: 'The recommended daily step count for general health is around?', opts: ['2,000 steps','5,000 steps','8,000–10,000 steps','15,000 steps'], ans: 2, exp: 'Research supports 8,000–10,000 steps per day for general health benefits, though any increase helps.' },
      { q: 'Which healthy habit reduces dementia risk most significantly?', opts: ['Puzzle games only','Regular physical exercise','Supplements','Watching educational content'], ans: 1, exp: 'Regular physical exercise is the most evidence-backed intervention for reducing dementia risk.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Lifestyle Overhaul Needed', icon: '🔄', feedback: 'Small changes add up. Start with one habit — better sleep or daily walks — and build from there. Our tools can help.' },
      { min: 41, max: 70, label: 'Health Conscious', icon: '🌱', feedback: 'You are making good choices! Identify your weak areas using our health calculators and keep building.' },
      { min: 71, max: 100, label: 'Lifestyle Champion', icon: '🏆', feedback: 'Excellent lifestyle knowledge! You clearly prioritise your wellbeing. Keep tracking with our free health tools.' }
    ]
  },

  // ── MENTAL HEALTH QUIZZES ──
  {
    slug: 'stress-awareness-quiz',
    name: 'Stress Awareness Quiz',
    desc: 'Test your understanding of stress biology, stress management strategies, and the science behind the stress response.',
    icon: '🧠',
    category: 'Mental Health',
    disclaimer: 'This quiz is for educational purposes only and is not a clinical stress assessment or medical diagnosis.',
    relatedTools: ['stress-level-calculator','burnout-risk-calculator'],
    relatedBlogs: ['exercise-reduces-stress-anxiety','cortisol-and-weight-gain','work-life-balance-practical-guide'],
    questions: [
      { q: 'Which hormone is the primary driver of the physiological stress response?', opts: ['Serotonin','Dopamine','Cortisol','Melatonin'], ans: 2, exp: 'Cortisol is released by the adrenal glands in response to stress, mobilising energy and suppressing non-essential functions.' },
      { q: 'Chronic stress is linked to?', opts: ['Weight loss and better sleep','Heart disease, high blood pressure, and depression','Stronger immunity','Improved digestion'], ans: 1, exp: 'Prolonged elevated cortisol increases risk of cardiovascular disease, mental health issues, metabolic disorders, and more.' },
      { q: 'Deep breathing reduces stress by activating the?', opts: ['Sympathetic nervous system','Parasympathetic nervous system','Central nervous system only','Somatic nervous system'], ans: 1, exp: 'Slow diaphragmatic breathing activates the parasympathetic "rest and digest" system, reducing cortisol.' },
      { q: 'Which of these is a physical symptom of chronic stress?', opts: ['Improved working memory','Muscle tension and persistent headaches','Faster digestion','Increased creativity'], ans: 1, exp: 'Chronic stress commonly manifests as muscle tension, headaches, gut problems, and fatigue.' },
      { q: 'Exercise reduces stress primarily by?', opts: ['Increasing cortisol','Releasing adrenaline','Releasing endorphins and BDNF','Raising blood sugar'], ans: 2, exp: 'Exercise triggers endorphin release and increases BDNF (brain growth factor), both of which elevate mood and reduce stress.' },
      { q: 'How many minutes of mindfulness daily shows measurable stress reduction benefits?', opts: ['1 minute','10 minutes','1 hour','5 hours'], ans: 1, exp: 'Research shows as little as 10 minutes of mindfulness practice daily produces measurable reductions in perceived stress.' },
      { q: 'Social connection helps reduce stress because it?', opts: ['Distracts you from problems','Releases oxytocin and reduces cortisol','Increases adrenaline','Has no proven biological mechanism'], ans: 1, exp: 'Social bonding triggers oxytocin release, which directly counteracts cortisol and reduces blood pressure.' },
      { q: 'Which dietary approach best supports stress reduction?', opts: ['More caffeine and energy drinks','More refined sugar','Whole foods rich in magnesium, B vitamins, and omega-3s','Fasting all day'], ans: 2, exp: 'Magnesium, B vitamins, and omega-3s all play roles in regulating the stress response and supporting brain health.' },
      { q: 'Journaling helps manage stress because it?', opts: ['Is physically tiring','Externalises and helps process emotions','Increases rumination','Has no proven psychological benefit'], ans: 1, exp: 'Expressive writing helps people process stressful events, reducing their emotional charge over time — supported by research.' },
      { q: 'What does the "window of tolerance" concept in stress management refer to?', opts: ['Time spent exercising','The optimal arousal zone where you can function effectively','How long you can ignore stress','Sleep duration'], ans: 1, exp: 'The window of tolerance is the zone of arousal where you feel regulated — not too stressed (hyperarousal) or too shut down (hypoarousal).' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Stress Novice', icon: '📚', feedback: 'Understanding stress is the first step to managing it. Try our Stress Level Calculator and explore stress management resources.' },
      { min: 41, max: 70, label: 'Stress Aware', icon: '🌿', feedback: 'Good awareness! You understand many stress mechanisms. Use this knowledge to build your personal stress toolkit.' },
      { min: 71, max: 100, label: 'Stress Science Expert', icon: '🏆', feedback: 'Excellent! Your deep understanding of stress science puts you in a strong position to manage and prevent burnout.' }
    ]
  },

  {
    slug: 'burnout-risk-quiz',
    name: 'Burnout Knowledge Quiz',
    desc: 'How much do you know about burnout — its causes, stages, symptoms, and evidence-based recovery strategies?',
    icon: '🔥',
    category: 'Mental Health',
    disclaimer: 'This is an educational quiz, not a clinical burnout assessment. If you are experiencing burnout, please consult a healthcare professional.',
    relatedTools: ['burnout-risk-calculator','work-life-balance-calculator','stress-level-calculator'],
    relatedBlogs: ['burnout-symptoms-and-recovery','work-life-balance-practical-guide','digital-detox-how-to-guide'],
    questions: [
      { q: 'Burnout is primarily caused by?', opts: ['Sleeping too much','Chronic unmanaged workplace stress','Not eating enough protein','Exercising too little'], ans: 1, exp: 'WHO defines burnout as resulting from "chronic workplace stress that has not been successfully managed."' },
      { q: 'The three core dimensions of burnout are?', opts: ['Sadness, anger, fear','Exhaustion, cynicism, reduced efficacy','Insomnia, weight gain, irritability','Anxiety, depression, OCD'], ans: 1, exp: 'Maslach\'s Burnout Inventory identifies exhaustion, cynicism/depersonalisation, and reduced personal accomplishment as the three burnout dimensions.' },
      { q: 'Physical symptoms of burnout include?', opts: ['Increased motivation and energy','Chronic fatigue, headaches, and frequent illness','Better concentration','Improved mood and creativity'], ans: 1, exp: 'Chronic stress from burnout manifests physically as persistent fatigue, headaches, digestive issues, and reduced immune function.' },
      { q: 'Burnout is officially recognised by?', opts: ['No medical body','AMA only','WHO as an occupational phenomenon','CDC as a mental illness'], ans: 2, exp: 'WHO classifies burnout as an "occupational phenomenon" in ICD-11, not a medical condition, but acknowledges its impact on health.' },
      { q: 'Which profession category has statistically the highest burnout rates?', opts: ['Artists','Healthcare workers and teachers','Professional athletes','Software developers'], ans: 1, exp: 'Healthcare workers and teachers consistently show the highest burnout rates globally, particularly post-pandemic.' },
      { q: 'Recovery from moderate burnout typically takes?', opts: ['1–2 days','3–7 days','Several weeks to months','It is permanent and never improves'], ans: 2, exp: 'Meaningful burnout recovery takes weeks to months and requires addressing root causes, not just rest alone.' },
      { q: 'Cynicism and emotional detachment from work are symptoms of which burnout stage?', opts: ['Early stage — just getting started','Middle stage — deepening burnout','Advanced burnout — full collapse','Post-burnout recovery'], ans: 1, exp: 'Cynicism and depersonalisation typically emerge in the middle stages of burnout, as a self-protective mechanism.' },
      { q: 'The most effective first step when you recognise burnout is?', opts: ['Work even harder to clear the backlog','Quit your job immediately','Acknowledge it and reduce stressors — seek support','Ignore it and hope it passes'], ans: 2, exp: 'Early recognition and intervention are key. Reducing demands, improving recovery, and seeking support are most effective.' },
      { q: 'How significantly does chronic sleep deprivation contribute to burnout risk?', opts: ['It has no connection to burnout','Slightly — only a minor factor','Significantly — poor sleep worsens stress reactivity and emotional regulation','Only in night-shift workers'], ans: 2, exp: 'Sleep deprivation amplifies the HPA stress axis, impairs emotional regulation, and is a major driver of burnout vulnerability.' },
      { q: 'Setting firm boundaries between work and personal time is?', opts: ['Selfish and unprofessional','An essential burnout prevention strategy supported by research','Ineffective — burnout happens regardless','Only useful for managers'], ans: 1, exp: 'Research consistently shows that work-life boundaries protect against burnout by preserving psychological recovery time.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Burnout Beginner', icon: '📚', feedback: 'Learning about burnout is the first step to preventing it. Use our Burnout Risk Calculator to assess your current risk level.' },
      { min: 41, max: 70, label: 'Burnout Aware', icon: '🌿', feedback: 'Good knowledge! You understand burnout risks and recovery. Apply these insights to protect your energy and wellbeing.' },
      { min: 71, max: 100, label: 'Burnout Expert', icon: '🏆', feedback: 'Excellent! Your deep understanding of burnout means you are well-equipped to prevent and address it in yourself and others.' }
    ]
  },

  {
    slug: 'sleep-quality-quiz',
    name: 'Sleep Quality Knowledge Quiz',
    desc: 'Test your knowledge of sleep cycles, sleep hygiene, and evidence-based strategies for better rest.',
    icon: '😴',
    category: 'Mental Health',
    disclaimer: null,
    relatedTools: ['sleep-calculator','sleep-debt-calculator','sleep-hygiene-calculator'],
    relatedBlogs: ['sleep-cycles-explained','how-to-improve-sleep-quality','sleep-hygiene-complete-checklist'],
    questions: [
      { q: 'REM sleep is most important for?', opts: ['Physical tissue repair','Memory consolidation and emotional processing','Growth hormone release','Body temperature regulation'], ans: 1, exp: 'REM (Rapid Eye Movement) sleep is critical for memory consolidation, emotional processing, and creative thinking.' },
      { q: 'Blue light from screens affects sleep by?', opts: ['Helping you relax before bed','Suppressing melatonin production','Causing nightmares','Having no measurable effect'], ans: 1, exp: 'Blue light (wavelength ~480 nm) inhibits pineal gland melatonin release, delaying sleep onset.' },
      { q: 'What is the ideal bedroom temperature for optimal sleep?', opts: ['10–14°C','16–19°C (60–67°F)','24–28°C','30°C+'], ans: 1, exp: 'Core body temperature drops during sleep onset. A cool room of 16–19°C facilitates this drop, improving sleep quality.' },
      { q: 'Adults should avoid caffeine at minimum how many hours before bedtime?', opts: ['1 hour','3 hours','6–8 hours','No restriction'], ans: 2, exp: 'Caffeine has a half-life of 5–6 hours, meaning coffee consumed 6 hours before bed still significantly impairs sleep.' },
      { q: 'Sleep inertia refers to?', opts: ['Snoring during sleep','The grogginess felt immediately upon waking','Clinical insomnia','Sleepwalking episodes'], ans: 1, exp: 'Sleep inertia is the transitional state between sleep and wakefulness — the groggy feeling lasting 15–60 minutes after waking.' },
      { q: 'Keeping consistent sleep and wake times improves sleep because?', opts: ['Being boring reduces stimulation','It regulates your circadian rhythm (internal clock)','It reduces dreaming','It increases REM duration'], ans: 1, exp: 'A regular sleep schedule entrains the circadian rhythm, optimising hormone release (melatonin, cortisol) for natural sleep-wake cycles.' },
      { q: 'How long does a typical complete sleep cycle last?', opts: ['30 minutes','60 minutes','90 minutes','120 minutes'], ans: 2, exp: 'A complete sleep cycle (NREM 1-2-3 + REM) takes approximately 90 minutes. Most people have 4–6 cycles per night.' },
      { q: 'Which supplement has the strongest scientific evidence for improving sleep onset?', opts: ['Vitamin C','Zinc','Melatonin','Iron'], ans: 2, exp: 'Melatonin supplementation (0.5–5 mg) has the most robust evidence for reducing sleep onset latency, especially for jet lag and shift work.' },
      { q: 'Sleep apnoea is most strongly associated with?', opts: ['Being underweight','Obesity and loud snoring','Teenagers and young adults','Anxiety disorder alone'], ans: 1, exp: 'Obesity is the primary risk factor for obstructive sleep apnoea, as excess tissue narrows the airway during sleep.' },
      { q: 'In a healthy person, how long does it typically take to fall asleep?', opts: ['Instantly (under 1 minute)','5–20 minutes','30–60 minutes','Over 1 hour'], ans: 1, exp: 'A sleep latency of 5–20 minutes is considered normal. Under 5 minutes may indicate sleep deprivation; over 30 suggests insomnia.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Sleep Novice', icon: '😪', feedback: 'Improving your sleep knowledge can transform your health. Use our Sleep Calculator to find your ideal bedtime and wake time.' },
      { min: 41, max: 70, label: 'Sleep Aware', icon: '🌙', feedback: 'Good foundations! You understand key sleep principles. Try our Sleep Debt and Sleep Hygiene calculators to optimise your rest.' },
      { min: 71, max: 100, label: 'Sleep Expert', icon: '⭐', feedback: 'Excellent! You clearly prioritise sleep science. Keep applying these principles for peak cognitive and physical recovery.' }
    ]
  },

  {
    slug: 'anxiety-awareness-quiz',
    name: 'Anxiety Awareness Quiz',
    desc: 'Test your understanding of anxiety — its biology, evidence-based treatments, and practical coping strategies.',
    icon: '💭',
    category: 'Mental Health',
    disclaimer: 'This quiz is educational only and is not a diagnostic tool. If you are experiencing anxiety symptoms, please speak to a qualified healthcare professional.',
    relatedTools: ['anxiety-score-calculator','stress-level-calculator'],
    relatedBlogs: ['exercise-reduces-stress-anxiety','meditation-for-beginners','how-to-improve-focus-and-concentration'],
    questions: [
      { q: 'Anxiety disorders are the most common mental health condition globally?', opts: ['No — depression is more common','Yes — affecting approximately 1 in 13 people','Only in high-income countries','Only in women'], ans: 1, exp: 'WHO estimates anxiety disorders affect approximately 301 million people globally, making them the most common mental health condition.' },
      { q: 'The "fight or flight" stress response is primarily triggered by?', opts: ['Serotonin release','Adrenaline and norepinephrine','Dopamine','Insulin'], ans: 1, exp: 'The amygdala triggers adrenaline (epinephrine) and norepinephrine release during perceived threat, causing the fight-or-flight response.' },
      { q: 'Which psychological therapy has the strongest evidence for treating anxiety disorders?', opts: ['Hypnotherapy','Medication alone','Cognitive Behavioural Therapy (CBT)','Meditation alone'], ans: 2, exp: 'CBT has the strongest evidence base for anxiety disorders, including generalised anxiety, phobias, panic disorder, and social anxiety.' },
      { q: 'Box breathing (4-4-4-4 pattern) reduces anxiety by?', opts: ['Increasing CO2 to induce drowsiness','Activating the parasympathetic nervous system','Simply distracting the mind','Having no proven physiological effect'], ans: 1, exp: 'Controlled breathing lengthens the exhale relative to inhale, stimulating the vagus nerve and activating the parasympathetic system.' },
      { q: 'Avoidance of anxiety-provoking situations typically?', opts: ['Cures anxiety over time','Worsens anxiety long-term by reinforcing fear','Has no long-term effect','Helps both short-term and long-term'], ans: 1, exp: 'Avoidance provides short-term relief but prevents habituation to the feared stimulus, strengthening the anxiety response long-term.' },
      { q: 'Regular aerobic exercise has been shown to reduce anxiety symptoms by?', opts: ['5%','10–20%','Up to 48%','It worsens anxiety'], ans: 2, exp: 'Meta-analyses show aerobic exercise reduces anxiety symptoms by up to 48% — comparable to some pharmacological treatments.' },
      { q: 'Anxiety and stress are the same thing?', opts: ['Yes, they are identical','No — anxiety persists even without an identifiable trigger','Only in clinical cases are they different','Sometimes, depending on severity'], ans: 1, exp: 'Stress typically has an identifiable cause and resolves when the stressor is removed. Anxiety can persist without a clear trigger.' },
      { q: 'Caffeine can worsen anxiety in sensitive individuals because it?', opts: ['Calms the nervous system','Increases heart rate and mimics anxiety symptoms','Only affects mood in high doses','Only affects sleep, not anxiety'], ans: 1, exp: 'Caffeine blocks adenosine receptors and increases adrenaline, which can amplify physiological anxiety symptoms in sensitive individuals.' },
      { q: 'The gut-brain axis is relevant to anxiety because?', opts: ['Your gut has no connection to your brain','Gut microbiome influences neurotransmitter production and mood','Anxiety only exists in the brain','Diet has no proven effect on mood'], ans: 1, exp: 'The gut produces ~90% of serotonin. Gut microbiome imbalance (dysbiosis) is linked to higher anxiety and depression rates.' },
      { q: 'Social support reduces anxiety primarily because?', opts: ['It distracts you from worries','Other people solve your problems','Connection releases oxytocin and reduces cortisol','It has no proven biological mechanism'], ans: 2, exp: 'Social bonding releases oxytocin ("bonding hormone") which directly suppresses cortisol and reduces amygdala reactivity.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Anxiety Novice', icon: '📚', feedback: 'Understanding anxiety science helps demystify it. Explore our stress calculators and mental health articles to learn more.' },
      { min: 41, max: 70, label: 'Anxiety Aware', icon: '🧘', feedback: 'Good understanding of anxiety fundamentals! Apply evidence-based strategies like CBT principles, exercise, and breathing techniques.' },
      { min: 71, max: 100, label: 'Mental Health Expert', icon: '🏆', feedback: 'Outstanding knowledge of anxiety science! You are well-equipped to understand, manage, and support others with anxiety.' }
    ]
  },

  // ── WOMEN'S HEALTH QUIZZES ──
  {
    slug: 'hormone-balance-quiz',
    name: "Women's Hormone Balance Quiz",
    desc: 'How much do you know about female hormones, the menstrual cycle, and hormonal health? Test your knowledge.',
    icon: '⚡',
    category: "Women's Health",
    disclaimer: 'This quiz is educational only and is not a substitute for medical advice or hormonal testing.',
    relatedTools: ['pcos-risk-calculator','menopause-symptom-calculator','ovulation-calculator'],
    relatedBlogs: ['hormone-balance-for-women','pcos-symptoms-and-management','menopause-weight-gain-tips'],
    questions: [
      { q: 'Oestrogen primarily regulates which functions in women?', opts: ['Blood sugar control only','Reproductive cycle, bone density, and cardiovascular health','Muscle growth','Blood pressure alone'], ans: 1, exp: 'Oestrogen regulates the menstrual cycle, maintains bone density, supports cardiovascular health, and affects mood and cognition.' },
      { q: 'Signs of low progesterone commonly include?', opts: ['Oily skin and acne','Irregular periods, anxiety, and spotting between cycles','Unexplained weight loss','Increased energy and libido'], ans: 1, exp: 'Progesterone deficiency is linked to irregular cycles, PMS, spotting, anxiety, and difficulty sleeping — especially in perimenopause.' },
      { q: 'PCOS (Polycystic Ovary Syndrome) is most closely linked to?', opts: ['Low oestrogen only','Insulin resistance and elevated androgens','Thyroid issues exclusively','Low cortisol levels'], ans: 1, exp: 'PCOS is driven by insulin resistance and androgen excess, leading to irregular cycles, cysts, hirsutism, and fertility challenges.' },
      { q: 'The thyroid gland primarily controls?', opts: ['Digestion and gut motility','Metabolism, energy levels, and body temperature','Reproduction and fertility','Blood pressure and heart rate'], ans: 1, exp: 'The thyroid regulates metabolism through T3 and T4 hormones, affecting energy, weight, temperature, and heart rate.' },
      { q: 'Cortisol disrupts female hormones by?', opts: ['Increasing oestrogen production','Suppressing reproductive hormones (reducing LH and FSH)','Increasing progesterone','No significant effect on reproductive hormones'], ans: 1, exp: 'Chronic cortisol elevation suppresses the HPG axis, reducing LH, FSH, and progesterone — potentially causing irregular cycles.' },
      { q: 'Phytoestrogens (plant oestrogens) are naturally found in?', opts: ['Red meat','Dairy products','Soy, flaxseed, and legumes','Fish and seafood'], ans: 2, exp: 'Phytoestrogens are plant compounds that weakly mimic oestrogen and are found in soy, flaxseed, chickpeas, and other legumes.' },
      { q: 'Perimenopause typically begins at what age?', opts: ['25–30','30–35','40–50','55+'], ans: 2, exp: 'Perimenopause usually begins in the early to mid-40s, though it can start earlier. It ends with the last menstrual period (menopause).' },
      { q: 'Which nutrients most support progesterone production?', opts: ['Vitamin C only','Vitamin B6, zinc, and magnesium','Iron and folate','Omega-6 fatty acids'], ans: 1, exp: 'Vitamin B6, zinc, and magnesium are co-factors in progesterone synthesis and help regulate the HPG axis.' },
      { q: 'Insulin resistance contributes to hormonal imbalance by?', opts: ['Reducing testosterone only','Driving excess androgen production and disrupting the menstrual cycle','Lowering oestrogen directly','Having no direct hormonal effect'], ans: 1, exp: 'Hyperinsulinaemia stimulates the ovaries and adrenal glands to produce excess androgens — the core mechanism of PCOS.' },
      { q: 'The best dietary approach for hormone balance is generally?', opts: ['High sugar, high refined carb diet','High ultra-processed food diet','Whole foods with quality fats, fibre, and adequate protein','Extremely low calorie restriction'], ans: 2, exp: 'Whole food diets support hormone production, liver detoxification of hormones, and gut microbiome health — all critical for balance.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Hormone Novice', icon: '📚', feedback: 'Understanding your hormones empowers your health. Use our PCOS Risk and Menopause calculators to start tracking your hormonal health.' },
      { min: 41, max: 70, label: 'Hormone Aware', icon: '⚡', feedback: 'Good knowledge of hormonal health! Apply nutrition, stress management, and sleep strategies to support natural hormone balance.' },
      { min: 71, max: 100, label: 'Hormone Health Expert', icon: '🏆', feedback: 'Impressive! Your hormonal health knowledge is excellent. Use this understanding to optimise your wellbeing at every life stage.' }
    ]
  },

  {
    slug: 'menstrual-health-quiz',
    name: 'Menstrual Health Knowledge Quiz',
    desc: 'Test your knowledge of the menstrual cycle, common conditions, and how to optimise fitness around your cycle.',
    icon: '🌸',
    category: "Women's Health",
    disclaimer: 'This quiz is for educational purposes only. Consult a healthcare provider for any menstrual health concerns.',
    relatedTools: ['menstrual-cycle-calculator','ovulation-calculator','fertility-calculator'],
    relatedBlogs: ['menstrual-cycle-and-fitness','ovulation-calculator-complete-guide','fertility-boosting-nutrition'],
    questions: [
      { q: 'The average menstrual cycle length is?', opts: ['21 days','28 days (normal range: 21–35 days)','35 days','14 days'], ans: 1, exp: 'While 28 days is average, a normal cycle ranges from 21–35 days. What matters most is consistency.' },
      { q: 'Heavy menstrual bleeding is clinically defined as?', opts: ['Any amount of bleeding','Soaking a pad or tampon fully within an hour for consecutive hours','Bleeding for exactly 3 days','The presence of any clots'], ans: 1, exp: 'Menorrhagia (heavy bleeding) is defined as soaking protection hourly for 2+ consecutive hours — affecting quality of life.' },
      { q: 'Dysmenorrhea means?', opts: ['Irregular periods','Painful menstrual cramps','Abnormally heavy bleeding','Complete absence of periods'], ans: 1, exp: 'Dysmenorrhea is the medical term for painful menstruation caused by prostaglandin release causing uterine contractions.' },
      { q: 'Women who menstruate are at higher risk of iron deficiency because?', opts: ['They exercise more','Monthly blood loss depletes iron stores','Their diet is typically lower in meat','Oestrogen blocks iron absorption'], ans: 1, exp: 'Menstrual blood loss can deplete iron, particularly in women with heavy periods — making dietary iron and monitoring essential.' },
      { q: 'The luteal phase of the menstrual cycle occurs?', opts: ['During menstruation (days 1–5)','Before ovulation (follicular phase)','After ovulation until next period','Only at puberty'], ans: 2, exp: 'The luteal phase begins after ovulation (~day 14) and ends with menstruation. Progesterone dominates this phase.' },
      { q: 'PMS (Premenstrual Syndrome) symptoms typically occur?', opts: ['During ovulation','1–2 weeks before menstruation (luteal phase)','Immediately after menstruation','Randomly throughout the month'], ans: 1, exp: 'PMS symptoms arise during the luteal phase (after ovulation), driven by hormonal fluctuations in oestrogen and progesterone.' },
      { q: 'Endometriosis is characterised by?', opts: ['Absence of menstrual periods','Endometrial-like tissue growing outside the uterus','Exclusively high oestrogen levels','A viral or bacterial infection'], ans: 1, exp: 'Endometriosis affects ~10% of reproductive-age women and causes endometrial tissue to implant on organs outside the uterus.' },
      { q: 'Light-to-moderate exercise during menstruation?', opts: ['Should be completely avoided','Can reduce cramps by increasing endorphins and circulation','Causes heavier bleeding','Has no physiological effect'], ans: 1, exp: 'Exercise increases endorphins and improves blood flow, which can reduce prostaglandin-driven cramps during menstruation.' },
      { q: 'Hormonal contraceptives primarily prevent pregnancy by?', opts: ['Physically blocking sperm in the vagina','Suppressing ovulation and thickening cervical mucus','Changing vaginal pH to acidic','Creating a physical barrier in the uterus'], ans: 1, exp: 'Combined hormonal contraceptives suppress the LH surge preventing ovulation and increase cervical mucus viscosity.' },
      { q: 'A typical healthy period lasts?', opts: ['1–2 days','3–7 days','10+ days','2 full weeks'], ans: 1, exp: 'Normal menstrual bleeding lasts 3–7 days. Periods outside this range may warrant investigation.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Cycle Beginner', icon: '📚', feedback: 'Understanding your cycle is empowering. Use our Menstrual Cycle and Ovulation calculators to start tracking yours.' },
      { min: 41, max: 70, label: 'Cycle Aware', icon: '🌸', feedback: 'Good knowledge! You understand the basics of menstrual health. Explore cycle syncing to optimise your fitness and nutrition.' },
      { min: 71, max: 100, label: 'Menstrual Health Expert', icon: '🏆', feedback: 'Excellent! Your menstrual health knowledge is impressive. Use this understanding to optimise training, nutrition, and wellbeing.' }
    ]
  },

  // ── FITNESS & LIFESTYLE QUIZZES ──
  {
    slug: 'workout-type-quiz',
    name: 'Exercise Science Knowledge Quiz',
    desc: 'How well do you understand different training methods, recovery principles, and exercise fundamentals?',
    icon: '🤸',
    category: 'Fitness',
    disclaimer: null,
    relatedTools: ['heart-rate-calculator','one-rep-max-calculator','strength-level-calculator'],
    relatedBlogs: ['cardio-vs-strength-training','strength-training-for-women-guide','beginner-workout-plan-30-days'],
    questions: [
      { q: 'Which type of exercise is most beneficial for cardiovascular health?', opts: ['Bodybuilding (high load, low rep)','Static stretching','Aerobic / cardio exercise','Heavy powerlifting'], ans: 2, exp: 'Aerobic exercise (running, cycling, swimming) most directly improves VO2 max, cardiac output, and cardiovascular risk profiles.' },
      { q: 'Compound exercises are superior to isolation exercises because they?', opts: ['Target only one muscle group more precisely','Involve multiple muscle groups and joints simultaneously','Require no equipment','Are always safer'], ans: 1, exp: 'Compound movements (squats, deadlifts, bench press) recruit multiple muscle groups, providing greater hormonal response and calorie burn.' },
      { q: 'The minimum recommended recovery time between training the same muscle group?', opts: ['12 hours','24–48 hours','72+ hours','1 week'], ans: 1, exp: 'Most research supports 48–72 hours recovery between sessions targeting the same muscle group for optimal hypertrophy.' },
      { q: 'LISS (Low Intensity Steady State) cardio refers to?', opts: ['Low Impact Sprint Sessions','Low Intensity Steady State cardio — sustained moderate effort','Light Interval Speed Sets','Long Interval Strength Sessions'], ans: 1, exp: 'LISS is continuous cardio performed at a steady, moderate intensity (60–70% max HR) — e.g., a 45-minute brisk walk.' },
      { q: 'Weight-bearing exercise is particularly important for?', opts: ['Lung capacity','Bone density — stimulating osteoblast activity','Cardiovascular health only','Flexibility'], ans: 1, exp: 'Weight-bearing activities (walking, running, weightlifting) mechanically stress bones, promoting bone formation and reducing osteoporosis risk.' },
      { q: 'Active recovery involves?', opts: ['Complete bed rest','Light activity (walking, yoga, swimming) to promote blood flow','High-intensity cardio the day after lifting','Only massage and stretching'], ans: 1, exp: 'Active recovery uses gentle movement to increase blood flow, clear metabolic waste, and reduce soreness without adding training stress.' },
      { q: 'An effective warm-up should last at minimum?', opts: ['30 seconds','2 minutes','5–10 minutes','30 minutes'], ans: 2, exp: 'A proper warm-up of 5–10 minutes elevates core temperature, increases joint mobility, and primes the nervous system for exercise.' },
      { q: 'Eccentric muscle contractions occur when?', opts: ['Muscle shortens under load (concentric)','Muscle lengthens under load (lowering phase)','No load is present','Muscle is completely relaxed'], ans: 1, exp: 'Eccentric contractions happen when a muscle lengthens while resisting force — e.g., lowering a dumbbell. They cause the most DOMS.' },
      { q: 'Periodisation in training means?', opts: ['Training at the same intensity every session','Systematically varying volume and intensity over planned cycles','Only training in winter months','Doing only HIIT'], ans: 1, exp: 'Periodisation divides training into cycles (micro, meso, macrocycle) with planned variation to optimise adaptation and prevent overtraining.' },
      { q: 'What is the primary purpose of creatine monohydrate supplementation?', opts: ['Increase fat burning','Replenish ATP for short, high-intensity bursts (3–10 seconds)','Replace protein','Improve cardiovascular endurance'], ans: 1, exp: 'Creatine replenishes phosphocreatine stores, enabling faster ATP regeneration during high-intensity, short-duration exercise.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Exercise Novice', icon: '🌱', feedback: 'Great starting point! Use our heart rate and strength calculators to build your first workout plan with proper foundations.' },
      { min: 41, max: 70, label: 'Active Learner', icon: '💪', feedback: 'Solid exercise knowledge! Apply progressive overload, compound movements, and smart recovery to accelerate your progress.' },
      { min: 71, max: 100, label: 'Exercise Science Expert', icon: '🏆', feedback: 'Impressive! Your exercise science knowledge is at an advanced level. Use our 1RM and VO2 Max calculators for precision training.' }
    ]
  },

  {
    slug: 'diet-type-quiz',
    name: 'Diet Types Knowledge Quiz',
    desc: 'How well do you know the major dietary approaches — Mediterranean, keto, intermittent fasting, and more?',
    icon: '🥦',
    category: 'Nutrition & Diet',
    disclaimer: null,
    relatedTools: ['keto-calculator','macro-calculator','calorie-calculator'],
    relatedBlogs: ['mediterranean-diet-complete-guide','keto-diet-beginners-guide','intermittent-fasting-for-weight-loss'],
    questions: [
      { q: 'The Mediterranean diet is primarily characterised by?', opts: ['High red meat and low fat','Olive oil, fish, vegetables, whole grains, and moderate wine','Dairy as the primary fat source','Complete elimination of carbohydrates'], ans: 1, exp: 'The Mediterranean diet is associated with reduced cardiovascular disease, dementia, and all-cause mortality — one of the most researched diets.' },
      { q: 'A ketogenic diet works by putting the body into?', opts: ['Glucolysis — burning carbohydrates','Ketosis — burning fat and producing ketone bodies','Anaerobic state from lack of carbs','A caloric surplus'], ans: 1, exp: 'Ketosis occurs when carb intake drops below ~50g/day, forcing the liver to produce ketones from fat as an alternative fuel.' },
      { q: 'Intermittent fasting primarily produces results by?', opts: ['Dramatically reducing food choices','Creating a caloric deficit and improving insulin sensitivity','Eliminating all carbohydrates','Increasing protein intake'], ans: 1, exp: 'IF works mainly through calorie reduction and improvements in insulin sensitivity, inflammation markers, and cellular autophagy.' },
      { q: 'A vegan diet excludes which foods?', opts: ['Only meat and fish','All animal products including dairy, eggs, and honey','Only gluten-containing grains','Only dairy and eggs'], ans: 1, exp: 'Veganism excludes all animal products — meat, fish, dairy, eggs, and honey — for ethical, environmental, or health reasons.' },
      { q: 'The DASH diet was specifically designed to address?', opts: ['Athletic performance','High blood pressure (Hypertension)','Weight loss only','Children\'s nutrition'], ans: 1, exp: 'DASH (Dietary Approaches to Stop Hypertension) was developed specifically to reduce blood pressure through food choices.' },
      { q: 'The Zone diet\'s macro ratio (carb/protein/fat) is approximately?', opts: ['80/10/10','40/30/30','70/15/15','60/20/20'], ans: 1, exp: 'The Zone diet prescribes 40% carbs, 30% protein, 30% fat at every meal to optimise hormonal balance according to its creator.' },
      { q: 'The Paleo diet allows which foods?', opts: ['Grains and legumes','Dairy products','Lean meats, vegetables, fruits, nuts, and seeds','Processed foods and refined sugar'], ans: 2, exp: 'The Paleo diet mimics pre-agricultural eating — including whole meats, fish, vegetables, fruits, and nuts, but not grains or dairy.' },
      { q: 'Calorie density refers to?', opts: ['How filling a food is','Calories per unit weight of food (kcal/100g)','Total calorie count of a meal','How quickly calories are absorbed'], ans: 1, exp: 'Calorie density (kcal per gram) determines how much food you get per calorie — vegetables are low density, oils are high density.' },
      { q: 'Which diet has the strongest scientific evidence for longevity and disease prevention?', opts: ['Strict ketogenic','Very low fat','Mediterranean diet','Carnivore diet'], ans: 2, exp: 'The Mediterranean diet has the most robust evidence for reducing heart disease, dementia, type 2 diabetes, and overall mortality.' },
      { q: 'FODMAPs (Fermentable Oligosaccharides, Disaccharides, Monosaccharides, and Polyols) are most relevant for people with?', opts: ['Type 2 diabetes','IBS (Irritable Bowel Syndrome)','Heart disease','Arthritis'], ans: 1, exp: 'A low-FODMAP diet reduces fermentable carbohydrates that cause bloating and pain in IBS sufferers — effective in ~75% of cases.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Diet Beginner', icon: '📚', feedback: 'There are many ways to eat well! Start with our Calorie and Macro calculators to find the approach that fits your lifestyle.' },
      { min: 41, max: 70, label: 'Diet Knowledgeable', icon: '🥗', feedback: 'Good understanding of different dietary approaches! Use our diet comparison and macro tools to personalise your eating plan.' },
      { min: 71, max: 100, label: 'Nutrition Strategy Expert', icon: '🏆', feedback: 'Outstanding! You have a deep understanding of dietary strategies. Apply this to help yourself and others make informed food choices.' }
    ]
  },

  // ── GENERAL / FUN QUIZZES ──
  {
    slug: 'biological-age-quiz',
    name: 'Biological Ageing Knowledge Quiz',
    desc: 'How much do you know about biological ageing, longevity science, and the habits that extend a healthy lifespan?',
    icon: '🕐',
    category: 'General Health',
    disclaimer: null,
    relatedTools: ['biological-age-calculator','life-expectancy-calculator','metabolic-age-calculator'],
    relatedBlogs: ['fitness-after-40','weight-loss-after-50','healthy-lifestyle-checklist'],
    questions: [
      { q: 'Biological age differs from chronological age because?', opts: ['It measures your exact date of birth','It measures how well your body functions relative to average','They are always identical','It measures intelligence quotient'], ans: 1, exp: 'Biological age reflects cellular and physiological health — you can be 50 chronologically but have the biology of a 35-year-old with good habits.' },
      { q: 'Which combination of factors most accelerates biological ageing?', opts: ['Regular exercise and good sleep','Chronic stress, smoking, and poor diet','Healthy diet and socialising','Good sleep and avoiding alcohol'], ans: 1, exp: 'Chronic stress, smoking, ultra-processed diets, and sedentary behaviour are the most potent accelerators of cellular ageing.' },
      { q: 'Telomeres are associated with?', opts: ['Muscle contraction','Cellular ageing — shorter telomeres indicate older cells','Blood pressure regulation','Brain function exclusively'], ans: 1, exp: 'Telomeres are protective caps on chromosomes that shorten with each cell division. Short telomeres are associated with disease and ageing.' },
      { q: 'The maximum scientifically confirmed human lifespan is around?', opts: ['100 years','115–122 years (Jeanne Calment lived to 122)','130 years','150 years'], ans: 1, exp: 'Jeanne Calment of France lived to 122 years and 164 days — the verified longest human lifespan on record.' },
      { q: 'Which lifestyle factor has the strongest evidence for extending healthy lifespan?', opts: ['Supplement regimens','Regular physical activity combined with caloric balance','Positive thinking alone','Sleeping 12+ hours daily'], ans: 1, exp: 'Regular physical activity is the single most evidence-backed intervention for extending both lifespan and healthspan.' },
      { q: 'Blue Zones (Okinawa, Sardinia, Loma Linda, Nicoya, Ikaria) are notable for?', opts: ['High pollution and industrial output','The highest concentrations of people living past 100','Extreme sports and athletics','High-fat dietary traditions'], ans: 1, exp: 'Blue Zones have 10× more centenarians than average. Common factors: plant-heavy diets, movement, community, and purpose.' },
      { q: 'Grip strength is used as a biomarker for ageing because?', opts: ['It only measures hand muscles','It correlates strongly with overall muscle mass, health, and longevity','It measures heart rate variability','It predicts bone density exclusively'], ans: 1, exp: 'Large population studies show grip strength is one of the strongest predictors of all-cause mortality and functional health in ageing.' },
      { q: 'Which activity is most strongly linked to preserving brain function with age?', opts: ['Watching educational television','Learning new complex skills and physical exercise','Sleeping 10+ hours','Avoiding all social interaction'], ans: 1, exp: 'Both cognitive challenge (learning languages, instruments) and aerobic exercise increase BDNF and new neuron growth in the hippocampus.' },
      { q: 'Chronic inflammation (inflammaging) is associated with ageing because?', opts: ['It has no link to ageing','It accelerates cellular damage, telomere shortening, and organ decline','It only affects the immune system','It improves with age automatically'], ans: 1, exp: 'Low-grade chronic inflammation damages tissue, shortens telomeres, and drives age-related diseases like cardiovascular disease and dementia.' },
      { q: 'Regular social connection is associated with?', opts: ['No significant health effect','Up to 50% reduced risk of premature death','Higher cortisol levels','Worse sleep quality'], ans: 1, exp: 'Julianne Holt-Lunstad\'s meta-analysis found strong social connections reduce mortality risk by 50% — comparable to quitting smoking.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Ageing Novice', icon: '📚', feedback: 'Fascinating field! Understanding biological ageing helps you make choices that keep you younger longer. Try our Biological Age Calculator.' },
      { min: 41, max: 70, label: 'Longevity Aware', icon: '🌱', feedback: 'Good knowledge of longevity science! Apply Blue Zone principles — movement, community, plant foods, and purpose — to your daily life.' },
      { min: 71, max: 100, label: 'Longevity Expert', icon: '🏆', feedback: 'Impressive! You clearly understand the science of healthy ageing. Track your biological age progress with our calculator tools.' }
    ]
  },

  {
    slug: 'health-trivia-quiz',
    name: 'Human Body Trivia Quiz',
    desc: 'Fun and fascinating facts about the human body — from organs and bones to cells and senses. How many do you know?',
    icon: '🫀',
    category: 'General Health',
    disclaimer: null,
    relatedTools: ['bmi-calculator','biological-age-calculator','heart-rate-calculator'],
    relatedBlogs: ['understanding-lab-results','health-checks-every-year','blood-pressure-ranges-explained'],
    questions: [
      { q: 'The human heart beats approximately how many times per day?', opts: ['50,000 times','86,400 times','100,000 times','200,000 times'], ans: 2, exp: 'At a resting rate of ~70 bpm, the heart beats approximately 100,800 times per day — over 3 billion times in a lifetime.' },
      { q: 'Which organ produces insulin?', opts: ['Liver','Kidney','Pancreas','Stomach'], ans: 2, exp: 'The pancreatic beta cells (islets of Langerhans) produce insulin, which regulates blood glucose levels.' },
      { q: 'The longest bone in the human body is?', opts: ['Humerus (upper arm)','Tibia (shin)','Femur (thigh)','Vertebral column'], ans: 2, exp: 'The femur (thigh bone) is the longest, strongest, and heaviest bone — typically 25–30% of a person\'s height.' },
      { q: 'How many bones does the adult human body contain?', opts: ['106','206','306','406'], ans: 1, exp: 'Adults have 206 bones. Babies are born with ~270, which fuse over time. The smallest bone is the stapes in the ear.' },
      { q: 'The largest organ of the human body (by surface area) is?', opts: ['Liver','Brain','Skin','Lungs'], ans: 2, exp: 'The skin is the largest organ, covering approximately 1.5–2 m² in adults and weighing 3–4 kg.' },
      { q: 'Blood type O negative is known as the universal?', opts: ['Recipient — can receive any blood type','Donor — can give to any recipient','Blood type for athletes','None — this is a myth'], ans: 1, exp: 'O negative blood lacks A, B, and Rh antigens, so it can be given to anyone in emergencies — hence "universal donor."' },
      { q: 'The frontal lobe of the brain primarily controls?', opts: ['Balance and coordination','Vision and spatial processing','Personality, decision-making, and voluntary movement','Hearing and speech comprehension'], ans: 2, exp: 'The frontal lobe handles executive functions — decision-making, personality, voluntary movement, and working memory.' },
      { q: 'Red blood cells survive in the body for approximately?', opts: ['24 hours','7 days','120 days','1 year'], ans: 2, exp: 'Red blood cells live approximately 120 days before being broken down in the spleen and recycled by the liver.' },
      { q: 'Peristalsis refers to?', opts: ['Blood pumping through arteries','Wave-like muscle contractions moving food through the digestive tract','Air movement through the lungs','Electrical signals in the brain'], ans: 1, exp: 'Peristalsis is the coordinated smooth muscle contraction that propels food from the oesophagus through the intestines.' },
      { q: 'The brain uses approximately what percentage of the body\'s total energy?', opts: ['5%','10%','20%','35%'], ans: 2, exp: 'Despite being only ~2% of body weight, the brain consumes ~20% of total energy — about 400 kcal per day at rest.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Body Trivia Novice', icon: '📚', feedback: 'The human body is truly amazing! Explore our health tools and blog articles to discover more fascinating body science.' },
      { min: 41, max: 70, label: 'Body Aware', icon: '🫀', feedback: 'Good knowledge of human body facts! Keep exploring health topics through our 150+ evidence-based articles.' },
      { min: 71, max: 100, label: 'Body Science Expert', icon: '🏆', feedback: 'Outstanding! You know the human body inside out. You would ace a biology exam!' }
    ]
  },

  {
    slug: 'brain-health-quiz',
    name: 'Brain Health & Neuroplasticity Quiz',
    desc: 'How much do you know about brain health, neuroplasticity, cognitive enhancement, and mental performance?',
    icon: '🧠',
    category: 'Mental Health',
    disclaimer: null,
    relatedTools: ['focus-score-calculator','productivity-score-calculator','sleep-calculator'],
    relatedBlogs: ['how-to-improve-focus-and-concentration','exercise-reduces-stress-anxiety','best-foods-for-sleep'],
    questions: [
      { q: 'Neuroplasticity means?', opts: ['The physical flexibility of the skull','The brain\'s ability to form new neural connections throughout life','Irreversible nerve damage','Natural brain shrinkage with age'], ans: 1, exp: 'Neuroplasticity is the brain\'s lifelong ability to reorganise itself by forming new neural connections in response to experience.' },
      { q: 'Which activity most powerfully increases BDNF (Brain-Derived Neurotrophic Factor)?', opts: ['Watching educational TV','Aerobic exercise (especially running)','Increasing sugar intake','Prolonged sitting'], ans: 1, exp: 'Aerobic exercise is the most potent evidence-based way to increase BDNF — sometimes called "Miracle-Gro for the brain."' },
      { q: 'Sleep supports brain health primarily because?', opts: ['It rests your eyes from screens','It activates the glymphatic system — clearing toxic waste proteins like amyloid-beta','It has no proven cognitive effect','It only prevents dreams'], ans: 1, exp: 'The glymphatic system clears metabolic waste (including Alzheimer\'s-linked amyloid-beta) from the brain primarily during deep sleep.' },
      { q: 'The hippocampus is most associated with?', opts: ['Voluntary motor control','Processing visual information','Memory formation and spatial navigation','Triggering the fear/threat response'], ans: 2, exp: 'The hippocampus is critical for converting short-term memories to long-term storage and for spatial navigation.' },
      { q: 'Omega-3 DHA is especially critical for brain function because?', opts: ['It provides energy for neurons','It forms the structural component of neuronal cell membranes','It only helps muscle recovery','It improves digestion'], ans: 1, exp: 'DHA (docosahexaenoic acid) makes up ~25% of brain fat content and is essential for membrane fluidity, synaptic function, and cognition.' },
      { q: 'When does cognitive decline typically become noticeable in most people?', opts: ['Around age 30','Around age 45','Around age 60–70','Only after age 80'], ans: 2, exp: 'While some cognitive changes begin in the 40s–50s, meaningful functional decline is typically noticeable around age 60–70.' },
      { q: 'Learning a new skill or language benefits the brain by?', opts: ['Having no measurable neurological effect','Creating new synaptic connections and dendritic growth','Only helping children\'s development','Causing cognitive confusion'], ans: 1, exp: 'Skill acquisition drives synaptogenesis (new synapses) and axonal growth — keeping the brain structurally resilient with age.' },
      { q: 'Social isolation in older adults significantly increases risk of?', opts: ['No measurable health risk','Dementia and depression — up to 50% higher risk','Better sleep through increased solitude','Improved cognitive focus'], ans: 1, exp: 'Chronic loneliness and isolation are as harmful as smoking 15 cigarettes per day and dramatically increase dementia risk.' },
      { q: 'Chronic sleep deprivation damages the brain by?', opts: ['Having no lasting effect','Accumulating amyloid-beta plaques and damaging neural tissue','Only temporarily reducing concentration','Only affecting emotional regulation'], ans: 1, exp: 'Without adequate sleep, amyloid-beta and tau proteins accumulate — the hallmarks of Alzheimer\'s — increasing long-term dementia risk.' },
      { q: 'Which vitamin deficiency is most strongly linked to cognitive decline?', opts: ['Vitamin A','Vitamin B12','Vitamin C','Vitamin E'], ans: 1, exp: 'Vitamin B12 deficiency causes myelin sheath degeneration, leading to memory loss, confusion, and nerve damage if untreated.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Brain Health Novice', icon: '📚', feedback: 'Your brain is your most important organ — learn how to protect it! Check out our focus and sleep tools for practical brain health tips.' },
      { min: 41, max: 70, label: 'Brain Aware', icon: '💡', feedback: 'Good brain health knowledge! Apply exercise, quality sleep, omega-3s, and learning to keep your brain sharp and resilient.' },
      { min: 71, max: 100, label: 'Neuroscience Expert', icon: '🏆', feedback: 'Outstanding! Your brain health knowledge is at an expert level. Apply this science daily to protect and enhance your cognitive performance.' }
    ]
  },

  {
    slug: 'body-fat-and-composition-quiz',
    name: 'Body Composition Knowledge Quiz',
    desc: 'Test your understanding of body fat, lean mass, BMI, and the science of body composition assessment.',
    icon: '📊',
    category: 'Health',
    disclaimer: null,
    relatedTools: ['body-fat-calculator','bmi-calculator','lean-body-mass-calculator'],
    relatedBlogs: ['body-fat-percentage-chart','bmi-vs-body-fat-percentage','body-recomposition'],
    questions: [
      { q: 'What is the primary limitation of BMI as a health metric?', opts: ['It is too complicated to calculate','It does not distinguish between muscle mass and fat mass','It only works for people under 40','It requires blood tests'], ans: 1, exp: 'BMI uses only weight and height, so muscular athletes and elderly people with low muscle but high fat both give misleading readings.' },
      { q: 'A healthy body fat percentage for adult women is approximately?', opts: ['5–10%','10–15%','20–35%','40–50%'], ans: 2, exp: 'Healthy body fat for women is approximately 20–35%, with athletes typically at 14–20% and essential fat at ~10–13%.' },
      { q: 'The Navy Method for measuring body fat uses?', opts: ['A DEXA scan','Underwater weighing','Measurements of neck, waist, and hip circumferences','Skinfold calipers only'], ans: 2, exp: 'The US Navy method uses circumference measurements (neck, waist, hip for women) with a formula to estimate body fat percentage.' },
      { q: 'Visceral fat is more dangerous than subcutaneous fat because?', opts: ['It weighs more','It surrounds organs and releases inflammatory cytokines affecting metabolism','It is harder to measure','It is more visible'], ans: 1, exp: 'Visceral fat is metabolically active, releasing pro-inflammatory cytokines linked to insulin resistance, heart disease, and type 2 diabetes.' },
      { q: 'Body recomposition (losing fat while gaining muscle simultaneously) is?', opts: ['Impossible for everyone','Possible — particularly in beginners, those returning from injury, and those in a caloric deficit with high protein','Only possible with anabolic steroids','Only achievable with perfect genetics'], ans: 1, exp: 'Body recomposition is achievable, especially in beginners, with a high protein intake, strength training, and slight caloric deficit.' },
      { q: 'Which component makes up lean body mass?', opts: ['Fat only','Muscle, bone, organs, and water (everything except fat)','Muscle and bone only','Muscle, fat, and water'], ans: 1, exp: 'Lean body mass (LBM) includes all body components except fat — muscle, bone, organs, connective tissue, and water.' },
      { q: 'Waist circumference is a useful health measure because?', opts: ['It is easier than BMI','It specifically estimates abdominal (visceral) fat, a stronger predictor of metabolic disease','It measures total body fat','It works better than body fat percentage'], ans: 1, exp: 'Waist circumference correlates directly with visceral fat — a risk cutoff of >88 cm (women) or >102 cm (men) indicates elevated metabolic risk.' },
      { q: 'The most accurate method for measuring body composition is?', opts: ['BMI calculation','Bathroom scale','DEXA (Dual-energy X-ray Absorptiometry) scan','Visual assessment'], ans: 2, exp: 'DEXA scans provide precise three-compartment body composition (fat, lean tissue, bone mineral density) and are the clinical gold standard.' },
      { q: 'Losing body fat while preserving muscle requires?', opts: ['Severe calorie restriction only','A caloric deficit with high protein intake (1.6–2.2 g/kg) and resistance training','No exercise — diet alone works','Supplements only'], ans: 1, exp: 'Protein preserves lean mass during a deficit by providing amino acids for muscle protein synthesis; resistance training provides the stimulus.' },
      { q: 'Essential body fat in men is approximately?', opts: ['0%','2–5% (needed for organ protection and hormone production)','10–15%','20%'], ans: 1, exp: 'Essential fat in men is 2–5%, required for nerve tissue, bone marrow, and organ protection. Below this level is medically dangerous.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Body Comp Beginner', icon: '📚', feedback: 'Body composition knowledge helps you set smarter goals. Use our Body Fat and Lean Body Mass calculators for personalised insights.' },
      { min: 41, max: 70, label: 'Body Comp Aware', icon: '💪', feedback: 'Good understanding of body composition! Apply this knowledge to set realistic goals and track progress beyond the scale.' },
      { min: 71, max: 100, label: 'Body Composition Expert', icon: '🏆', feedback: 'Excellent! You clearly understand body composition science. Use our advanced calculators to optimise your training and nutrition.' }
    ]
  },

  {
    slug: 'calorie-and-metabolism-quiz',
    name: 'Calories & Metabolism Quiz',
    desc: 'How well do you understand calorie needs, TDEE, BMR, and the science of how your body burns energy?',
    icon: '🔥',
    category: 'Nutrition & Diet',
    disclaimer: null,
    relatedTools: ['calorie-calculator','tdee-calculator','bmr-calculator'],
    relatedBlogs: ['what-is-tdee','bmr-vs-tdee','how-to-boost-metabolism'],
    questions: [
      { q: 'TDEE stands for?', opts: ['Total Daily Exercise Expenditure','Total Daily Energy Expenditure','Total Diet Energy Estimation','Typical Daily Exercise Effect'], ans: 1, exp: 'TDEE (Total Daily Energy Expenditure) is all calories your body burns in 24 hours — BMR + physical activity + thermic effect of food.' },
      { q: 'The Mifflin-St Jeor equation is used to calculate?', opts: ['Body fat percentage','Basal Metabolic Rate (BMR)','Ideal protein intake','Blood pressure'], ans: 1, exp: 'The Mifflin-St Jeor equation is the most accurate commonly used formula for estimating BMR based on age, sex, height, and weight.' },
      { q: 'The thermic effect of food (TEF) accounts for approximately what percentage of TDEE?', opts: ['0–1%','5–10%','20–30%','40%'], ans: 1, exp: 'TEF — the energy cost of digesting and absorbing food — accounts for approximately 5–10% of TDEE. Protein has the highest TEF (~20–30%).' },
      { q: 'How much of a caloric deficit is needed to lose approximately 0.5 kg (1 lb) of fat per week?', opts: ['250 kcal/day','500 kcal/day','1,000 kcal/day','2,000 kcal/day'], ans: 1, exp: 'Fat has ~7,700 kcal/kg. A 500 kcal/day deficit creates a ~3,500 kcal/week deficit, producing approximately 0.5 kg fat loss per week.' },
      { q: 'Adaptive thermogenesis refers to?', opts: ['Increased metabolism after eating','The body reducing metabolic rate in response to caloric restriction to resist weight loss','Thermogenesis from cold exposure','Calorie burning during exercise'], ans: 1, exp: 'Adaptive thermogenesis is the body\'s ability to downregulate BMR during a diet, making it harder to lose weight over time.' },
      { q: 'NEAT (Non-Exercise Activity Thermogenesis) includes?', opts: ['Deliberate gym workouts only','All movement other than formal exercise — fidgeting, walking, daily tasks','Sleep energy expenditure','Digestion energy cost'], ans: 1, exp: 'NEAT can vary by up to 2,000 kcal/day between individuals and is a major (often underestimated) component of total energy expenditure.' },
      { q: 'After age 30, resting metabolic rate typically decreases by approximately?', opts: ['0% — it stays constant','1–2% per decade','10% per decade','25% per decade'], ans: 1, exp: 'BMR declines roughly 1–2% per decade after age 30, primarily due to muscle mass loss (sarcopenia) — but exercise significantly offsets this.' },
      { q: 'Protein has the highest thermic effect of food. What percentage of protein calories are burned in digestion?', opts: ['0–5%','10–15%','20–30%','40–50%'], ans: 2, exp: 'Digesting protein costs 20–30% of its calorie content — so 100 kcal of protein only nets ~70–80 kcal after digestion.' },
      { q: 'Which eating pattern has been shown NOT to meaningfully boost metabolism?', opts: ['Eating smaller, frequent meals (5–6 per day) vs 3 meals','Exercising after fasting','Increasing protein intake','Adding resistance training'], ans: 0, exp: 'Meal frequency has minimal effect on metabolism. The "eat 6 meals to boost metabolism" idea is largely a myth — total calories matter most.' },
      { q: 'Muscle tissue burns more calories at rest than fat tissue by approximately?', opts: ['No difference — identical','Slightly — 6 kcal/kg vs 2 kcal/kg per day','10× more than fat','100× more than fat'], ans: 1, exp: 'Per kilogram, muscle burns ~6 kcal/day at rest vs fat\'s ~2 kcal/day. While modest, more muscle mass meaningfully increases BMR over time.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Metabolism Beginner', icon: '📚', feedback: 'Understanding your metabolism helps you lose fat and build muscle more effectively. Use our TDEE and BMR calculators to start.' },
      { min: 41, max: 70, label: 'Calorie Aware', icon: '🔥', feedback: 'Good grasp of calorie and metabolism concepts! Use this knowledge with our calculators to precisely dial in your nutrition.' },
      { min: 71, max: 100, label: 'Metabolism Expert', icon: '🏆', feedback: 'Exceptional! You understand the science of metabolism at an expert level. Apply this to optimise body composition with precision.' }
    ]
  },

  {
    slug: 'heart-health-quiz',
    name: 'Heart Health Knowledge Quiz',
    desc: 'How much do you know about cardiovascular health, blood pressure, cholesterol, and heart disease prevention?',
    icon: '❤️',
    category: 'Health',
    disclaimer: null,
    relatedTools: ['heart-rate-calculator','blood-pressure-checker','cholesterol-risk-calculator'],
    relatedBlogs: ['target-heart-rate-zones','resting-heart-rate-normal','how-to-lower-resting-heart-rate'],
    questions: [
      { q: 'Normal resting blood pressure for adults is approximately?', opts: ['90/60 mmHg','120/80 mmHg','140/90 mmHg','160/100 mmHg'], ans: 1, exp: 'Optimal blood pressure is around 120/80 mmHg (systolic/diastolic). Above 130/80 is considered elevated.' },
      { q: 'LDL cholesterol is often called "bad" cholesterol because?', opts: ['It tastes unpleasant','It deposits in artery walls, forming plaques (atherosclerosis)','It is always elevated in overweight people','It reduces blood flow to muscles'], ans: 1, exp: 'LDL particles deposit cholesterol in arterial walls, forming plaques that narrow arteries — the primary cause of heart attacks and stroke.' },
      { q: 'A resting heart rate below 60 bpm in adults is called?', opts: ['Tachycardia','Bradycardia','Arrhythmia','Fibrillation'], ans: 1, exp: 'Bradycardia is a resting HR below 60 bpm. In athletes it\'s normal (40–50 bpm); in sedentary individuals it may need investigation.' },
      { q: 'Which lifestyle change most effectively lowers LDL cholesterol without medication?', opts: ['Increasing dietary fat','Replacing saturated fat with unsaturated fat and increasing soluble fibre','Reducing water intake','Increasing red meat consumption'], ans: 1, exp: 'Replacing saturated fat (from butter, fatty meat) with unsaturated fat (nuts, olive oil, oily fish) and adding oats/legumes reduces LDL most effectively.' },
      { q: 'Heart rate variability (HRV) is a measure of?', opts: ['Your maximum heart rate','Variation in time between heartbeats — a marker of autonomic nervous system health','Blood pressure fluctuation','Cardiac output'], ans: 1, exp: 'Higher HRV indicates better autonomic nervous system balance, cardiovascular fitness, and resilience to stress.' },
      { q: 'Aerobic exercise improves heart health by?', opts: ['Increasing resting heart rate','Strengthening the heart muscle, reducing resting HR and blood pressure, improving lipid profile','Reducing blood volume','Only burning calories'], ans: 1, exp: 'Regular cardio enlarges and strengthens the heart, improving stroke volume so it pumps more blood per beat — lowering resting HR.' },
      { q: 'Smoking increases cardiovascular disease risk by?', opts: ['10%','2–4× compared to non-smokers','No significant increase','Only in combination with poor diet'], ans: 1, exp: 'Smoking 2–4× increases cardiovascular disease risk through endothelial damage, inflammation, and arterial stiffness.' },
      { q: 'Which type of fat increases LDL cholesterol most?', opts: ['Monounsaturated fat','Polyunsaturated fat','Saturated and trans fat','Omega-3 fat'], ans: 2, exp: 'Saturated fat (coconut oil, butter, fatty meat) and especially trans fat raise LDL and lower HDL — the most atherogenic combination.' },
      { q: 'Target heart rate zone for cardiovascular fitness (aerobic zone) is?', opts: ['30–40% of maximum HR','50–60% of maximum HR','70–85% of maximum HR','95–100% of maximum HR'], ans: 2, exp: 'The aerobic training zone (70–85% max HR) improves cardiovascular efficiency and VO2 max most effectively.' },
      { q: 'The DASH diet was specifically developed to?', opts: ['Maximise athletic performance','Lower blood pressure through dietary changes','Treat type 2 diabetes','Help with weight loss exclusively'], ans: 1, exp: 'The DASH diet (low sodium, high potassium, magnesium, calcium) reduces systolic blood pressure by 8–14 mmHg in clinical trials.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Heart Health Novice', icon: '📚', feedback: 'Your heart is your engine. Use our Blood Pressure Checker and Heart Rate Calculator to understand your cardiovascular health better.' },
      { min: 41, max: 70, label: 'Heart Health Aware', icon: '❤️', feedback: 'Good cardiovascular knowledge! Apply exercise, dietary changes, and stress management to protect your heart for life.' },
      { min: 71, max: 100, label: 'Cardio Health Expert', icon: '🏆', feedback: 'Outstanding! You clearly understand heart health science. Use our cholesterol and heart rate tools to keep your heart in peak condition.' }
    ]
  },

  {
    slug: 'nutrient-deficiency-quiz',
    name: 'Nutrient & Vitamin Deficiency Quiz',
    desc: 'Can you identify which deficiency causes which health problem? Test your knowledge of vitamins, minerals, and their functions.',
    icon: '💊',
    category: 'Nutrition & Diet',
    disclaimer: null,
    relatedTools: ['vitamin-d-calculator','calorie-calculator','protein-intake-calculator'],
    relatedBlogs: ['best-vitamins-for-energy-and-health','fiber-why-not-getting-enough','omega-3-fatty-acids-complete-guide'],
    questions: [
      { q: 'Vitamin C deficiency causes which classic disease?', opts: ['Rickets','Scurvy (bleeding gums, poor wound healing)','Iron-deficiency anaemia','Pellagra'], ans: 1, exp: 'Scurvy (Vitamin C deficiency) causes collagen breakdown — bleeding gums, bruising, joint pain, and impaired healing.' },
      { q: 'Which B vitamin is essential for preventing neural tube defects in early pregnancy?', opts: ['B1 (Thiamine)','B6 (Pyridoxine)','B9 (Folate/Folic Acid)','B12 (Cobalamin)'], ans: 2, exp: 'Folate is critical in the first 28 days of pregnancy for neural tube closure. Deficiency causes spina bifida and anencephaly.' },
      { q: 'Zinc is most important for?', opts: ['Bone strength only','Immune function, wound healing, and protein synthesis','Regulating heart rate','Blood sugar control alone'], ans: 1, exp: 'Zinc supports over 300 enzyme functions, immune cell production, wound healing, taste/smell, and testosterone synthesis.' },
      { q: 'The best natural source of Vitamin D is?', opts: ['Orange juice','Milk alone','Sunlight (UVB) exposure — triggering skin synthesis','Red meat'], ans: 2, exp: 'Skin exposure to UVB rays (wavelength 290–315 nm) triggers cholesterol conversion to pre-vitamin D3 — far more efficient than diet alone.' },
      { q: 'Magnesium is involved in approximately how many enzymatic reactions in the body?', opts: ['About 10','About 50','Over 300','About 5'], ans: 2, exp: 'Magnesium is a cofactor in over 300 enzymatic reactions including energy production (ATP), protein synthesis, and muscle contraction.' },
      { q: 'Iodine deficiency primarily causes?', opts: ['Scurvy','Goitre and hypothyroidism (impaired thyroid hormone production)','Iron-deficiency anaemia','Night blindness'], ans: 1, exp: 'Iodine is required for thyroid hormone synthesis. Deficiency causes goitre (enlarged thyroid) and is the leading cause of preventable brain damage.' },
      { q: 'Night blindness is classically associated with deficiency of?', opts: ['Vitamin C','Vitamin D','Vitamin A','Vitamin E'], ans: 2, exp: 'Vitamin A is required for rhodopsin production in rod cells. Deficiency first manifests as night blindness, then corneal damage.' },
      { q: 'Vitamin K2 (menaquinone) plays a unique role in?', opts: ['Vitamin D synthesis','Blood clotting alone','Directing calcium into bones (not arteries) — arterial calcification prevention','Energy production'], ans: 2, exp: 'K2 activates osteocalcin (bone building) and matrix-Gla protein (prevents arterial calcification) — distinct from K1\'s role in clotting.' },
      { q: 'The best plant-based sources of non-haem iron are?', opts: ['Apples and bananas','Spinach, lentils, chickpeas, and tofu','Potatoes and bread','Rice and pasta only'], ans: 1, exp: 'Non-haem iron from plants has lower bioavailability but spinach, lentils, tofu, and fortified cereals are the best sources. Vitamin C enhances absorption.' },
      { q: 'Biotin (Vitamin B7) deficiency classically causes?', opts: ['Night blindness','Scurvy','Hair loss, brittle nails, and skin rash','Peripheral neuropathy'], ans: 2, exp: 'Biotin is essential for fatty acid synthesis and keratin production. Deficiency causes hair thinning, brittle nails, and skin inflammation.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Nutrition Novice', icon: '📚', feedback: 'Nutrient knowledge is powerful for preventive health. Explore our vitamin and mineral guides to understand what your body needs.' },
      { min: 41, max: 70, label: 'Nutrition Aware', icon: '💊', feedback: 'Good understanding of vitamins and minerals! Use our Vitamin D calculator and nutrition articles to optimise your micronutrient intake.' },
      { min: 71, max: 100, label: 'Micronutrition Expert', icon: '🏆', feedback: 'Excellent! Your micronutrition knowledge is impressive. Apply it to identify gaps in your diet and support optimal health.' }
    ]
  },

  {
    slug: 'weight-loss-science-quiz',
    name: 'Weight Loss Science Quiz',
    desc: 'Separate myth from fact! Test your understanding of the real science behind fat loss, metabolism, and sustainable weight management.',
    icon: '⚖️',
    category: 'Health',
    disclaimer: null,
    relatedTools: ['calorie-calculator','intermittent-fasting-calculator','steps-to-calories-calculator'],
    relatedBlogs: ['calorie-deficit-for-weight-loss','why-you-are-not-losing-weight','fat-loss-vs-weight-loss-difference'],
    questions: [
      { q: '"Eat less, move more" — is this the complete picture of weight loss?', opts: ['Yes — it is exactly that simple','No — hormones, sleep, stress, and metabolic adaptation also significantly affect weight regulation','Only diet matters — exercise has no effect','Only exercise matters — diet has no effect'], ans: 1, exp: 'While calorie balance is central, hormones (cortisol, insulin, leptin), sleep quality, stress, and gut health significantly influence weight.' },
      { q: 'How fast is sustainable fat loss typically recommended to be?', opts: ['1–2 kg/week consistently','0.25–1 kg/week depending on starting weight','5 kg/week with a strict approach','No upper limit'], ans: 1, exp: 'Losing 0.5–1 kg/week for most people (up to 1.5 kg for those with higher BMI) minimises muscle loss while preserving metabolic rate.' },
      { q: '"Spot reduction" — burning fat from a specific body part through targeted exercise — is?', opts: ['Effective if done correctly','A myth — the body burns fat systemically, not from the area being exercised','Only possible with abs exercises','Possible for women but not men'], ans: 1, exp: 'Spot reduction is scientifically disproved. Fat is mobilised systemically based on genetics, not from the muscle being worked.' },
      { q: 'Liquid calories contribute to weight gain more than solid calories because?', opts: ['They have more calories per ml','Liquid foods are less satiating and easier to overconsume without triggering fullness signals','They are absorbed faster','Liquids always contain more sugar'], ans: 1, exp: 'Liquids bypass satiety signals (chewing, stomach distension) — it is easy to drink 500 kcal without feeling fuller than before.' },
      { q: 'After significant weight loss, why is keeping the weight off hard?', opts: ['Willpower decreases','Adaptive thermogenesis reduces metabolic rate by 10–15%, and hunger hormones (ghrelin) remain elevated','The body forgets how to burn fat','It is not actually harder — it gets easier'], ans: 1, exp: 'Adaptive thermogenesis after weight loss (metabolic rate suppression) combined with elevated ghrelin makes relapse physiologically challenging.' },
      { q: 'The "fat-burning zone" of low-intensity cardio burns the most fat overall compared to HIIT?', opts: ['Yes — always choose low intensity for fat loss','No — while fat is the primary fuel, HIIT burns more total calories and more total fat over 24 hours','Only if done for 60+ minutes','Only for beginners'], ans: 1, exp: 'HIIT burns more total calories and triggers greater excess post-exercise oxygen consumption (EPOC), resulting in more total fat loss.' },
      { q: 'Can you lose weight without counting calories?', opts: ['No — you must count every calorie','Yes — by focusing on food quality and satiety cues, many people lose weight without tracking','Only with intermittent fasting','Only athletes can do this'], ans: 1, exp: 'Calorie awareness matters, but many succeed by eating whole foods, adequate protein, and minimising hyper-palatable processed foods.' },
      { q: 'What is the primary reason high-protein diets support fat loss?', opts: ['Protein has fewer calories','Protein increases satiety, has highest thermic effect, and protects muscle mass','Protein shuts down fat storage','Protein is illegal to store as fat'], ans: 1, exp: 'Protein scores highest on satiety, costs 20–30% of its calories to digest, and provides amino acids to maintain lean mass during a deficit.' },
      { q: 'Sleep deprivation affects weight by?', opts: ['Having no effect on weight','Increasing ghrelin (hunger hormone) and decreasing leptin (fullness hormone), driving overeating','Reducing appetite and helping weight loss','Only affecting energy for exercise'], ans: 1, exp: 'Just 2 nights of poor sleep increases ghrelin by 28% and reduces leptin by 18%, significantly increasing appetite — especially for high-calorie foods.' },
      { q: 'Strength training is important during a weight loss diet because?', opts: ['It is not important — only cardio matters','It preserves muscle mass, maintains metabolic rate, and improves body composition even at the same scale weight','It burns more calories than cardio','Only for men'], ans: 1, exp: 'Without resistance training during a deficit, up to 25% of weight lost can be muscle, reducing metabolic rate and physical function.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Weight Loss Novice', icon: '📚', feedback: 'Great opportunity to separate fact from fiction! Use our Calorie Calculator to set a science-backed deficit for your fat loss journey.' },
      { min: 41, max: 70, label: 'Weight Loss Aware', icon: '⚖️', feedback: 'Good understanding of weight loss science! Apply protein prioritisation, strength training, and sleep optimisation for the best results.' },
      { min: 71, max: 100, label: 'Fat Loss Expert', icon: '🏆', feedback: 'Excellent! Your weight loss science knowledge is outstanding. You are equipped to make evidence-based decisions to reach and maintain your goals.' }
    ]
  },

  {
    slug: 'diabetes-and-blood-sugar-quiz',
    name: 'Diabetes & Blood Sugar Knowledge Quiz',
    desc: 'Test your understanding of blood sugar regulation, diabetes risk factors, and evidence-based prevention strategies.',
    icon: '🩸',
    category: 'Health',
    disclaimer: 'This quiz is for educational purposes only. Consult your doctor for diabetes screening and management.',
    relatedTools: ['diabetes-risk-calculator','calorie-calculator','bmi-calculator'],
    relatedBlogs: ['how-to-boost-metabolism','calorie-deficit-for-weight-loss','mediterranean-diet-complete-guide'],
    questions: [
      { q: 'Type 2 diabetes is primarily characterised by?', opts: ['The immune system destroying insulin-producing cells','Insulin resistance — cells failing to respond adequately to insulin','No insulin being produced at all','A viral infection attacking the pancreas'], ans: 1, exp: 'Type 2 diabetes develops when cells become resistant to insulin signals, causing blood sugar to remain elevated — often linked to lifestyle factors.' },
      { q: 'A fasting blood glucose level of 100–125 mg/dL (5.6–6.9 mmol/L) indicates?', opts: ['Normal blood sugar','Prediabetes (impaired fasting glucose)','Type 2 diabetes','Hypoglycaemia'], ans: 1, exp: 'Prediabetes (100–125 mg/dL fasting) is a reversible condition with lifestyle intervention. Diabetes is confirmed at ≥126 mg/dL on two tests.' },
      { q: 'Which lifestyle change most reduces risk of developing type 2 diabetes?', opts: ['Taking vitamin supplements','Losing 5–10% body weight through diet and exercise — reduces risk by up to 58%','Avoiding all sugar completely','Increasing cardio by 1 hour per day'], ans: 1, exp: 'The Diabetes Prevention Program found 5–7% body weight loss + 150 min/week activity reduced T2D risk by 58% — more effective than metformin.' },
      { q: 'Glycated haemoglobin (HbA1c) reflects?', opts: ['Fasting blood sugar only','Average blood glucose over the previous 2–3 months','Cholesterol levels','Kidney function'], ans: 1, exp: 'HbA1c measures the percentage of haemoglobin with attached glucose — reflecting average blood sugar control over 2–3 months.' },
      { q: 'Fibre slows blood sugar spikes because?', opts: ['It is calorie-free','It slows gastric emptying and glucose absorption in the small intestine','It binds to insulin directly','Fibre converts to fat instead of glucose'], ans: 1, exp: 'Soluble fibre forms a gel in the gut, slowing glucose absorption and blunting post-meal blood sugar spikes.' },
      { q: 'Which foods have the highest glycaemic index (GI)?', opts: ['Lentils and chickpeas','White bread, refined cereals, and sugary drinks','Whole oats and sweet potato','Nuts and olive oil'], ans: 1, exp: 'Highly refined carbohydrates raise blood sugar rapidly. White bread has a GI of ~75, similar to pure glucose (GI 100).' },
      { q: 'Insulin resistance is strongly associated with?', opts: ['Low body weight','Visceral fat accumulation and physical inactivity','High protein intake','Regular strength training'], ans: 1, exp: 'Excess visceral fat releases free fatty acids and inflammatory cytokines that impair insulin receptor signalling — causing insulin resistance.' },
      { q: 'Which nutrient has been shown to improve insulin sensitivity?', opts: ['Saturated fat','Trans fat','Magnesium and omega-3 fatty acids','Refined sugar'], ans: 2, exp: 'Magnesium is a cofactor in glucose metabolism; deficiency is linked to insulin resistance. Omega-3s reduce inflammation impairing insulin signalling.' },
      { q: 'Exercise improves blood sugar control by?', opts: ['Reducing the need for insulin','Allowing muscles to take up glucose without needing insulin (via GLUT4 translocation)','Only burning glucose during exercise','Increasing insulin production from the pancreas'], ans: 1, exp: 'Muscle contractions translocate GLUT4 transporters to cell membranes, enabling insulin-independent glucose uptake — effective for 24–48 hours.' },
      { q: 'Type 1 diabetes is different from Type 2 because?', opts: ['It is caused by poor diet','It is an autoimmune condition where beta cells are destroyed — no insulin is produced','It only occurs in adults','It can be reversed with lifestyle changes'], ans: 1, exp: 'Type 1 diabetes is an autoimmune condition (often childhood-onset) where the immune system destroys pancreatic beta cells, requiring lifelong insulin.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Blood Sugar Novice', icon: '📚', feedback: 'Blood sugar knowledge can transform your health. Use our Diabetes Risk Calculator to assess your personal risk and learn prevention strategies.' },
      { min: 41, max: 70, label: 'Glucose Aware', icon: '🩸', feedback: 'Good understanding of blood sugar science! Apply fibre, exercise, and weight management strategies to keep your glucose levels healthy.' },
      { min: 71, max: 100, label: 'Metabolic Health Expert', icon: '🏆', feedback: 'Excellent! Your diabetes and metabolic health knowledge is at an expert level — invaluable for prevention, education, and personal health management.' }
    ]
  },

  {
    slug: 'gut-health-quiz',
    name: 'Gut Health & Microbiome Quiz',
    desc: 'Test your knowledge of the gut microbiome, digestive health, and the gut-brain connection.',
    icon: '🦠',
    category: 'Health',
    disclaimer: null,
    relatedTools: ['fiber-intake-calculator','calorie-calculator','water-intake-calculator'],
    relatedBlogs: ['gut-health-and-weight-loss','fiber-why-not-getting-enough','best-hydrating-foods'],
    questions: [
      { q: 'The human gut microbiome contains approximately how many microbial genes?', opts: ['Same as the human genome','10× fewer than human genes','150× more genes than the human genome','Exactly the same number'], ans: 2, exp: 'The gut microbiome contains ~3.3 million unique microbial genes — approximately 150× more than the ~22,000 human genes.' },
      { q: 'The gut is often called the "second brain" because?', opts: ['It is the same size as the brain','The enteric nervous system contains ~100 million neurons and communicates bidirectionally with the brain','It controls conscious thought','It produces most hormones'], ans: 1, exp: 'The enteric nervous system (ENS) is so complex it can function independently of the brain, driving the gut-brain axis and mood regulation.' },
      { q: 'Which foods most effectively increase beneficial gut bacteria diversity?', opts: ['Ultra-processed foods','A wide variety of plant foods rich in diverse fibre types','Red meat and dairy','Alcohol and caffeine'], ans: 1, exp: 'Plant diversity (30+ different plant foods per week) is the strongest predictor of microbiome diversity — associated with better health outcomes.' },
      { q: 'Leaky gut (intestinal permeability) occurs when?', opts: ['You eat too much fibre','Tight junctions between intestinal cells loosen, allowing particles into the bloodstream','Gut bacteria die completely','Stomach acid becomes too strong'], ans: 1, exp: 'Increased intestinal permeability allows bacteria, undigested food particles, and toxins to enter the bloodstream, potentially driving systemic inflammation.' },
      { q: 'Probiotics are?', opts: ['Antibiotics that kill bad bacteria','Live beneficial microorganisms that confer health benefits to the host','Prebiotics that feed bacteria','Digestive enzymes'], ans: 1, exp: 'Probiotics are live bacteria (e.g., Lactobacillus, Bifidobacterium) that when consumed in adequate amounts, confer health benefits to the host.' },
      { q: 'Prebiotics are?', opts: ['Another name for probiotics','Live bacteria supplements','Non-digestible fibres that feed and stimulate beneficial gut bacteria','Antibiotics for gut bacteria'], ans: 2, exp: 'Prebiotics (found in onion, garlic, leek, oats, banana) are selectively fermented by beneficial bacteria, promoting their growth.' },
      { q: 'Antibiotics affect gut health by?', opts: ['Only killing dangerous bacteria','Reducing overall microbial diversity, including beneficial bacteria — which may take months to recover','Having no effect on gut microbiome','Permanently eliminating all gut bacteria'], ans: 1, exp: 'Broad-spectrum antibiotics significantly reduce gut microbial diversity. Dysbiosis after antibiotics can persist 6–12 months without targeted recovery.' },
      { q: 'The gut microbiome influences mood because?', opts: ['Gut bacteria control breathing','Gut bacteria produce ~90% of the body\'s serotonin and communicate via the vagus nerve','The gut and brain have no connection','Gut bacteria only affect digestion'], ans: 1, exp: 'Enterochromaffin cells in the gut produce ~90–95% of the body\'s serotonin. Dysbiosis is linked to depression, anxiety, and autism spectrum traits.' },
      { q: 'IBS (Irritable Bowel Syndrome) is best managed by?', opts: ['Ignoring symptoms','A low-FODMAP diet, stress management, and identifying personal triggers','Complete fasting','Surgical intervention'], ans: 1, exp: 'A low-FODMAP diet reduces fermentable carbohydrates triggering IBS symptoms in ~75% of sufferers. Stress management and gut-directed hypnotherapy also help.' },
      { q: 'Which drug class most severely disrupts the gut microbiome?', opts: ['Antihistamines','Statins','Proton pump inhibitors (PPIs) and broad-spectrum antibiotics','Pain relief medication'], ans: 2, exp: 'PPIs reduce stomach acid, changing gut environment allowing bacterial overgrowth; antibiotics directly kill gut bacteria — both causing significant dysbiosis.' }
    ],
    scoring: [
      { min: 0, max: 40, label: 'Gut Health Novice', icon: '📚', feedback: 'The gut microbiome is one of the most exciting areas of health research. Start by eating 30 different plant foods per week and tracking your fibre intake.' },
      { min: 41, max: 70, label: 'Gut Health Aware', icon: '🦠', feedback: 'Good gut health knowledge! Apply plant diversity, fermented foods, and stress management to cultivate a thriving microbiome.' },
      { min: 71, max: 100, label: 'Microbiome Expert', icon: '🏆', feedback: 'Excellent! Your gut microbiome knowledge is impressive. Apply it to support immunity, mental health, and metabolic health through your diet.' }
    ]
  },

];
