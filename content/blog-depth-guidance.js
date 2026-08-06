/*
 * Editorial guidance shared by both blog content pipelines.
 *
 * These modules add category-specific context without changing the visual page
 * shell. Individual claims, actions, cautions, and sources still come from each
 * article profile; this file explains how readers should interpret and apply
 * those details.
 */

const guidance = {
  'BMI & Body Weight': {
    meaning: 'BMI is a screening ratio based on height and weight. It is useful for describing broad weight patterns, but it does not directly measure body fat, muscle mass, fitness, blood pressure, glucose, cholesterol, or an individual diagnosis.',
    evidence: 'Interpret the number as one part of a wider assessment. Waist size, weight history, growth or life stage, body composition, symptoms, laboratory results, medicines, and family history can materially change what the same BMI means for two people.',
    personal: 'Measurement quality matters before category labels are discussed. Use a current weight, measure height without shoes, apply an age-appropriate method, and pay more attention to a repeated trend than to a tiny change around a category boundary.',
    practice: 'A useful next step should improve health rather than simply force the number downward. Depending on the person, that may mean maintaining weight, improving food quality, building strength, increasing daily movement, investigating unintended change, or getting tailored clinical support.',
    review: 'Review progress with more than the scale. Energy, strength, waist trend, blood pressure, relevant laboratory markers, sleep, menstrual function, mobility, and the sustainability of the routine can show whether a plan is helping.',
    limits: 'Avoid treating adult BMI cutoffs as universal targets. Children and teenagers use BMI-for-age growth charts, pregnancy changes weight interpretation, and high muscularity, frailty, fluid shifts, or illness can make the adult category less informative.',
    safety: 'Rapid or unexplained weight change, fainting, persistent weakness, swelling, severe restriction, purging, or concern about an eating disorder deserves professional assessment rather than repeated calculator use.'
  },
  'Body Fat': {
    meaning: 'Body composition separates total weight into components such as fat mass and fat-free mass. Every practical method is an estimate: skinfolds, bioelectrical-impedance scales, circumference equations, air displacement, and imaging use different assumptions and can produce different results.',
    evidence: 'The most informative result is usually a trend collected with the same method under similar conditions. Hydration, food, recent exercise, skin temperature, device settings, and technician technique can move an estimate even when body tissue has not meaningfully changed.',
    personal: 'Body-fat goals should account for age, sex, training demands, menstrual or hormonal function, medical history, and the reason for measuring. A lower percentage is not automatically healthier, and a single reference chart cannot define the best level for every person.',
    practice: 'When fat loss is appropriate, combine a moderate energy deficit with progressive resistance training, adequate protein, varied food, sleep, and recovery. That approach is more protective of lean tissue and performance than rapid restriction or large volumes of compensatory exercise.',
    review: 'Use several indicators over a realistic time frame: waist measurements, strength, clothing fit, average body weight, and one consistent composition method. Day-to-day readings are too noisy to justify abrupt calorie or training changes.',
    limits: 'Home devices cannot identify exactly where fat is stored or diagnose metabolic disease. Comparisons are also misleading when one reading comes from a home scale and another comes from a different equation, scanner, or testing protocol.',
    safety: 'Stop and seek qualified advice if the pursuit of a body-fat target causes dizziness, recurrent injury, missed periods, loss of libido, persistent fatigue, compulsive checking, bingeing, purging, or severe food restriction.'
  },
  'Calories & Weight': {
    meaning: 'Calories describe energy in food and energy used by the body. Body weight changes through energy balance over time, but short-term scale movement also reflects water, glycogen, sodium, digestive contents, menstrual changes, illness, and medication.',
    evidence: 'Calorie calculators use population equations and reported activity, so their outputs are starting estimates rather than measured personal requirements. Food labels, portions, restaurant meals, wearable devices, and activity multipliers all introduce uncertainty.',
    personal: 'Energy needs vary with body size, lean mass, age, occupation, steps, training, sleep, environment, health, medication, and life stage. The same intake can therefore produce different outcomes between people or at different points in one person’s life.',
    practice: 'Start with a reasonable range, keep meals nutritionally adequate, and compare it with several weeks of consistent real-world data. Make small adjustments only after a trend is visible; large corrections based on a few days often react to water change rather than tissue change.',
    review: 'Track weekly average weight and, when relevant, waist, hunger, energy, training performance, sleep, and adherence. A plan that changes the scale but produces marked fatigue, poor nutrition, or repeated rebound eating is not working well.',
    limits: 'Counting is optional and is never perfectly exact. It can be useful for learning portions or testing an estimate, but it should not create false precision, moral labels for food, or the belief that nutrient quality no longer matters.',
    safety: 'Children, pregnancy, breastfeeding, frailty, diabetes treated with glucose-lowering medicine, chronic disease, and eating-disorder recovery require individual energy guidance. Rapid unexplained change or symptoms caused by restriction should be assessed promptly.'
  },
  'Fitness & Exercise': {
    meaning: 'Exercise improves health through repeated training and recovery, not through one ideal workout. Aerobic fitness, muscular strength, power, mobility, skill, and balance are different qualities, so a useful program matches the activity to the actual goal.',
    evidence: 'For general adult health, current guidance combines regular aerobic activity with muscle-strengthening work. Benefits begin below the full weekly target, especially for someone currently inactive, and workload should increase gradually as technique and tolerance improve.',
    personal: 'Training frequency and intensity depend on current fitness, age, injury history, health conditions, available equipment, schedule, sleep, nutrition, and recovery. A plan copied from an advanced athlete may supply more fatigue than useful stimulus for a beginner.',
    practice: 'Build a repeatable week before adding complexity. Use controlled technique, a manageable starting dose, gradual progression, and easier sessions or rest between demanding workouts; consistency over months matters more than exhaustion in one session.',
    review: 'Record the exercise, duration, sets or distance, effort, and any symptoms. Improvement may appear as better technique, more repetitions, greater load, a faster comfortable pace, lower effort at the same work, or better daily function—not only calorie burn or body weight.',
    limits: 'Wearable calorie estimates, heart-rate zones, and generic programs are approximate. Pain is not proof that a workout is effective, and soreness is not required for adaptation; compare performance using consistent conditions and avoid changing several variables at once.',
    safety: 'Stop exercise and seek urgent assessment for chest pressure, fainting, severe or unusual breathlessness, or new neurological symptoms. Persistent focal pain, swelling, loss of function, or a medical condition that changes exercise safety needs qualified guidance.'
  },
  'Swimming & Aquatics': {
    meaning: 'Swimming can train aerobic fitness and muscular endurance while water reduces weight-bearing load. Technique has an unusually large effect on pace and energy cost, so distance, speed, and calorie estimates do not mean the same thing for a beginner and an efficient swimmer.',
    evidence: 'Stroke choice, water temperature, pool length, turns, rest intervals, body size, skill, and pace all influence the workload. A watch or pool-machine estimate cannot directly measure personal energy expenditure.',
    personal: 'Swimming ability, confidence in deep water, shoulder or neck symptoms, breathing conditions, seizure risk, pregnancy, disability, and access to supervision all affect the safest session design.',
    practice: 'Begin in a supervised setting with short lengths and generous recovery. Improve breathing position and stroke control before adding continuous distance or hard intervals, and choose a stroke that can be performed without worsening pain.',
    review: 'Track completed lengths, rest time, perceived effort, stroke comfort, and breathing rather than focusing only on calories. Progress may appear as covering the same distance with better control or needing less recovery.',
    limits: 'Low impact does not mean risk free. Repetitive overhead work can irritate the shoulder, poor technique can strain the neck, and calorie tables may misrepresent a session that includes drills, rests, or several strokes.',
    safety: 'Do not swim alone when inexperienced or when a health condition increases the risk of losing consciousness. Stop for chest pressure, faintness, severe breathlessness, or sudden loss of coordination, and follow local water-safety rules.'
  },
  'General Tools': {
    meaning: 'A health calculator converts a small set of inputs into an estimate, category, or date. The arithmetic may be correct while the interpretation remains limited because the tool cannot examine symptoms, confirm measurement quality, or include every relevant clinical factor.',
    evidence: 'Before using a result, identify the equation, units, intended population, and outcome it was designed to estimate. A reference range or score should not be presented as a diagnosis, and a boundary value should not be treated as a sharp biological divide.',
    personal: 'Age, sex used by the equation, pregnancy, medication, fitness, body composition, timing, device accuracy, and health history may change the answer or whether the tool applies at all. Incorrect units or old measurements can create a convincing but unusable result.',
    practice: 'Enter accurate information, keep the calculation date, and read the assumptions beside the result. Use the output to frame a question, compare a consistent trend, or prepare for a professional conversation—not to start, stop, or change treatment independently.',
    review: 'Recalculate only when an input or goal meaningfully changes. If different tools disagree, compare their formulas and populations rather than averaging the numbers; sometimes the honest conclusion is that a precise personal estimate is not available.',
    limits: 'Extra decimal places do not create extra accuracy. Online tools cannot rule out disease, explain abnormal symptoms, or replace validated testing, physical examination, and clinical judgement where those are needed.',
    safety: 'Seek medical care for concerning symptoms even when a calculator result appears reassuring. Abnormal readings, pregnancy decisions, medication changes, and results that conflict with a clinician’s plan require individual interpretation.'
  },
  'Date Tools': {
    meaning: 'A calendar calculator compares civil dates, not fixed blocks of identical length. Years and months contain different numbers of days, leap years add an extra date, and a result can change depending on whether the start date, end date, local time, or time zone is included.',
    evidence: 'Calendar units and elapsed time answer different questions. “One month later” follows the calendar, while a duration in days or hours counts fixed intervals; converting between them without stating a convention can produce an apparently inconsistent answer.',
    personal: 'The correct convention depends on the purpose. Birthday age usually counts completed calendar years, countdowns may include or exclude today, and legal, school, employment, immigration, insurance, and clinical rules may define deadlines differently.',
    practice: 'Enter an unambiguous date, confirm day–month order and time zone, and decide whether the calculation is inclusive before relying on the result. For important dates, test a simple example by hand and verify the rule with the organisation that will use it.',
    review: 'Check how the tool handles month ends, leap days, dates before the reference date, and daylight-saving changes when times are involved. Save both input dates and the chosen convention so another person can reproduce the result.',
    limits: 'A mathematically correct calendar result is not automatically the official legal or administrative answer. Software libraries also have different date-handling behaviours, especially when a date is silently converted to a time stamp or another time zone.',
    safety: 'Treat birth dates as personal information and avoid entering them on untrusted services. Confirm consequential eligibility, filing, medication, pregnancy, or appointment dates with the responsible professional or institution.'
  },
  'Health Checks': {
    meaning: 'Preventive care aims to find important risks early while avoiding unnecessary tests and treatment. The right health checks depend on age, sex, pregnancy status, symptoms, family history, prior results, medicines, exposures, and the recommendations used in the reader’s country.',
    evidence: 'A screening test is offered before symptoms appear and is different from diagnostic testing for an active concern. Benefits, false positives, false negatives, follow-up procedures, cost, and the interval between tests all matter when deciding whether screening is worthwhile.',
    personal: 'A general checklist cannot capture every risk. Earlier, later, or different testing may be appropriate because of family history, pregnancy, smoking, occupational exposure, existing disease, previous abnormal results, or treatment that needs monitoring.',
    practice: 'Keep an updated list of medicines, vaccinations, family history, previous results, and current questions. A primary-care visit is more useful when priorities are agreed in advance instead of ordering a broad panel without a clinical reason.',
    review: 'Track whether recommended follow-up actually occurred, not only whether a test was completed. Record the result, reference range, date, next interval, and the person responsible for explaining an abnormal or uncertain finding.',
    limits: 'More testing is not always safer. Reference ranges vary by laboratory and population, and a value outside the printed range may be unimportant while a value inside it can still require attention when symptoms or trends are concerning.',
    safety: 'New or severe symptoms should not wait for a routine screening appointment. Chest pain, severe breathlessness, sudden weakness, confusion, heavy bleeding, or other urgent warning signs need prompt local medical care.'
  },
  'Heart Rate': {
    meaning: 'Heart rate is the number of heartbeats per minute, but its meaning changes with rest, exercise, body position, temperature, hydration, emotion, illness, caffeine, medication, and fitness. One value is less informative than the conditions in which it was measured.',
    evidence: 'Wrist devices and exercise equations estimate rather than directly diagnose. Manual pulse checks, chest straps, watches, and clinical electrocardiograms use different methods, so small disagreements are expected and an irregular rhythm may reduce consumer-device accuracy.',
    personal: 'Resting rate, maximum-rate estimates, recovery, and training zones vary between individuals. Medicines such as beta blockers, pregnancy, autonomic conditions, fever, anaemia, thyroid disease, and endurance training can change the expected response.',
    practice: 'Measure a resting pulse after several quiet minutes and use the same position and time when following a trend. During exercise, combine heart rate with breathing, perceived effort, pace, and symptoms rather than chasing an exact zone from an age formula.',
    review: 'Look for a persistent change across comparable days and note illness, sleep, stress, caffeine, medication, and training load. A lower number is not always better, and a higher number is not automatically dangerous without context.',
    limits: 'Maximum-heart-rate equations describe population averages and can be wrong for an individual. Consumer HRV and recovery scores also depend on proprietary calculations; compare only within the same device and avoid using them as medical tests.',
    safety: 'Fainting, chest pressure, severe breathlessness, or a new sustained fast, slow, or irregular heartbeat—especially with symptoms—requires medical assessment. Do not use a normal watch reading to dismiss concerning symptoms.'
  },
  'Hydration': {
    meaning: 'Hydration reflects the balance between fluid intake and losses through urine, sweat, breathing, and the digestive tract. Water also comes from food, so a beverage target is not the same as total daily water intake.',
    evidence: 'Population reference intakes are broad planning values, not compulsory quotas for every person. Needs rise with heat, altitude, exercise, fever, vomiting, diarrhoea, pregnancy, and breastfeeding, while kidney, heart, or liver disease may require a clinician-set limit.',
    personal: 'Body size alone cannot determine fluid needs. Sweat rate, clothing, activity duration, climate, food moisture, sodium losses, medicines, and access to breaks all influence what is practical and safe.',
    practice: 'Drink regularly according to thirst and circumstances, include water-rich foods, and plan extra access during heat or prolonged activity. For long or very sweaty sessions, replacing some sodium may matter; more plain water is not always the complete answer.',
    review: 'Use thirst, urine pattern, body-weight change around prolonged exercise, weather, and symptoms together. Urine colour can offer a rough clue but is affected by supplements, foods, medicines, and the time of day.',
    limits: 'Drinking beyond the body’s ability to excrete water can dilute blood sodium and become dangerous. Hydration products are not automatically superior to water, and sweating more does not mean more body fat was lost.',
    safety: 'Confusion, fainting, inability to keep fluids down, very low urine output, severe weakness, or symptoms after excessive water intake need prompt care. Follow prescribed fluid limits rather than a general online formula.'
  },
  'Lifestyle & Habits': {
    meaning: 'Daily habits are repeated responses to cues, opportunity, effort, reward, and social context. Motivation matters, but routines are easier to maintain when the desired behaviour is specific, convenient, visible, and compatible with ordinary life.',
    evidence: 'A dramatic short challenge can create awareness, yet long-term change depends on what happens after the challenge ends. Sleep, stress, food access, alcohol, work schedules, caregiving, and environment can reinforce or disrupt the same intention.',
    personal: 'The useful target differs by starting point and purpose. Some people need a small routine adjustment; others are dealing with dependence, withdrawal, compulsive behaviour, unsafe use, or a health condition that cannot be managed as a productivity experiment.',
    practice: 'Define the behaviour in observable terms, identify its usual cue, and make the first alternative easier to perform. Plan for high-risk situations and lapses in advance instead of relying on a perfect streak.',
    review: 'Track frequency and context rather than judging character. A good plan should improve the intended outcome—such as sleep, energy, safety, or time use—without creating a different harmful or rigid behaviour.',
    limits: 'Popular labels such as detox, reset, addiction, or discipline are often used loosely. They should not replace a clear description of the behaviour, the evidence for the proposed change, and the risks of stopping suddenly.',
    safety: 'Alcohol withdrawal and some other withdrawal states can be medically dangerous. Seek qualified support for loss of control, severe distress, self-harm risk, unsafe behaviour, or a habit that continues to damage health, work, or relationships.'
  },
  'Macronutrients': {
    meaning: 'Carbohydrate, protein, and fat are macronutrients because the body needs them in relatively large amounts. Each has several roles beyond calories, and food quality, fibre, essential fats, vitamins, minerals, and the overall eating pattern matter alongside any macro target.',
    evidence: 'No single percentage split is best for everyone. Appropriate ranges depend on total energy, body size, age, activity, training, pregnancy, health conditions, food preferences, culture, affordability, and whether the plan can meet micronutrient and fibre needs.',
    personal: 'Two foods with similar macros can differ substantially in fibre, sodium, micronutrients, processing, portion size, and how filling they are. Labels and tracking apps also use rounded values, so macro totals should be treated as workable estimates.',
    practice: 'Build meals around a varied mix of protein sources, high-fibre carbohydrate foods, vegetables or fruit, and mostly unsaturated fat sources. Adjust portions and timing for appetite, training, glucose management, digestive tolerance, and the main goal.',
    review: 'Evaluate hunger, energy, digestion, training performance, food variety, relevant laboratory results, and adherence—not only whether the app reached three exact numbers. A plan should remain nutritionally adequate on busy and imperfect days.',
    limits: 'Macro tracking cannot diagnose deficiency or guarantee diet quality. Extreme restriction of an entire macronutrient can reduce food variety and may be inappropriate with pregnancy, growth, diabetes medication, kidney disease, or an eating-disorder history.',
    safety: 'Use a registered dietitian or clinician for therapeutic diets, allergy, digestive disease, kidney or liver disease, pregnancy, significant deficiency, or medication that can make abrupt carbohydrate or intake changes unsafe.'
  },
  'Mental Health': {
    meaning: 'Mental wellbeing is shaped by biology, physical health, sleep, relationships, stressors, substances, environment, and access to support. Exercise, mindfulness, routines, and nutrition can support wellbeing, but no single wellness practice treats every cause of distress.',
    evidence: 'A strategy is useful when it is tolerable, repeatable, and connected to a clear outcome. Claims that one habit will cure anxiety, depression, trauma, or another condition overlook differences in severity, diagnosis, safety, and the need for evidence-based care.',
    personal: 'Symptoms may look different between people and across time. Duration, intensity, effect on daily function, physical symptoms, medication, substance use, and thoughts of self-harm are more important than a quiz score or social-media label.',
    practice: 'Choose a small practice, decide when and where it will happen, and connect it to existing support rather than using it as a test of willpower. Reduce barriers and keep alternatives for days when energy or concentration is limited.',
    review: 'Notice whether sleep, mood, avoidance, concentration, relationships, and daily functioning improve over several weeks. Stop or modify a practice that increases panic, shame, compulsive behaviour, pain, or isolation.',
    limits: 'Self-help information cannot diagnose a mental-health condition or assess immediate risk. A temporary lift in mood does not prove that an underlying problem has resolved, and difficulty maintaining a habit is not a personal failure.',
    safety: 'Seek a qualified mental-health professional when symptoms persist, worsen, or impair daily life. Thoughts of self-harm, inability to stay safe, severe confusion, or immediate danger require urgent local crisis or emergency support.'
  },
  'Mental Health & Productivity': {
    meaning: 'Focus and productivity depend on attention, task clarity, workload, sleep, physical and mental health, interruptions, environment, skills, and available time. A score or routine can describe one part of performance but cannot determine a person’s value or diagnose a disorder.',
    evidence: 'Low output is not always a time-management problem. Burnout, depression, anxiety, attention disorders, pain, caregiving, unrealistic targets, unclear priorities, and unsafe working conditions require different responses.',
    personal: 'The right strategy depends on whether the main barrier is starting, sustaining attention, choosing priorities, recovering from overload, or having more work than the available hours allow. Sudden or severe change also deserves health assessment.',
    practice: 'Clarify the next visible action, reduce avoidable interruptions, work for a realistic interval, and protect breaks and sleep. When capacity is the constraint, renegotiating scope or deadlines is more honest than adding another optimisation technique.',
    review: 'Track completed priorities, error rate, energy, recovery, and whether work is intruding on health and relationships. More hours are not necessarily more productive if fatigue increases rework or prevents recovery.',
    limits: 'Popular ideas such as dopamine detoxes and universal morning routines often simplify brain science. Reducing distracting habits may help, but ordinary rewarding activities do not need to be removed to “reset” a neurotransmitter.',
    safety: 'Persistent exhaustion, major functional decline, panic, depression, substance use, or thoughts of self-harm require professional support. Immediate danger should be handled through local crisis or emergency services.'
  },
  'Nutrition & Diet': {
    meaning: 'Nutrition is best evaluated as an overall pattern rather than a list of miracle foods or forbidden ingredients. Adequacy, variety, portions, preparation, enjoyment, culture, affordability, and the person’s medical needs all influence whether a pattern supports health.',
    evidence: 'Observational associations, laboratory findings, and clinical trials answer different questions. A food can contain a useful nutrient without treating a disease, and a supplement dose can behave differently from the amount normally found in food.',
    personal: 'Energy and nutrient needs vary with age, body size, activity, pregnancy, medication, health conditions, allergies, food access, and dietary pattern. Symptoms attributed to one food may also have several possible causes.',
    practice: 'Make changes at the meal and weekly-pattern level: add nutrient-dense foods, protect adequate protein and fibre, use mostly unsaturated fats, plan realistic portions, and retain foods that make the pattern culturally and practically sustainable.',
    review: 'Assess energy, hunger, digestion, food variety, relevant laboratory markers, symptom patterns, and the ability to continue the plan. Change one major variable at a time when trying to understand a response.',
    limits: 'Terms such as anti-inflammatory, clean, detox, natural, and metabolism boosting can imply more certainty than evidence supports. Supplement quality and dose also vary, and more is not automatically safer.',
    safety: 'Get individual advice for pregnancy, diagnosed disease, significant deficiency, unintended weight change, allergy, restrictive eating, or potential medicine–supplement interactions. Severe or rapidly worsening symptoms need medical assessment.'
  },
  'Sleep & Recovery': {
    meaning: 'Healthy sleep involves duration, timing, regularity, continuity, and how alert and functional a person feels during the day. Sleep is regulated by circadian timing and accumulating sleep pressure, so both schedule and time awake influence the ability to sleep.',
    evidence: 'Adults commonly need about seven to nine hours, while children and teenagers need more according to age. Individual variation exists, but routinely sacrificing sleep is not made harmless by caffeine, weekend lie-ins, supplements, or fitness.',
    personal: 'Light exposure, work shifts, travel, stress, pain, exercise, naps, alcohol, caffeine, medicines, breathing disorders, and the sleep environment can change the pattern. The same bedtime advice will not address every cause of poor sleep.',
    practice: 'Anchor a realistic wake time, allow enough opportunity for sleep, use daytime light and activity, and create a quieter wind-down period. Change the schedule gradually and reserve the bed for sleep when insomnia has made wakefulness in bed a habit.',
    review: 'Keep a simple sleep diary of bedtimes, wake times, estimated sleep, naps, substances, and daytime sleepiness for one or two weeks. Wearables can show rough trends but do not replace assessment for a sleep disorder.',
    limits: 'One bad night is not chronic insomnia, and a supplement is not a complete sleep plan. “Natural” products can cause side effects or interactions, while alcohol may shorten sleep onset but disrupt sleep later in the night.',
    safety: 'Discuss chronic insomnia, loud snoring, witnessed breathing pauses, severe daytime sleepiness, unusual night behaviour, or restless legs with a clinician. Do not drive or operate dangerous equipment when struggling to stay awake.'
  },
  'TDEE & Metabolism': {
    meaning: 'Total daily energy expenditure combines resting needs, digestion, deliberate exercise, and routine movement. Calculators predict these components from population equations and activity descriptions; they do not directly measure an individual’s metabolism.',
    evidence: 'The activity multiplier is often the largest source of uncertainty because job demands, steps, training, and compensatory changes in movement cannot be captured by one label. Wearable calorie totals add another estimate rather than a laboratory measurement.',
    personal: 'Body size, lean mass, age, movement, training, food intake, environment, health, medicines, and weight change affect expenditure. A person’s current maintenance intake can therefore move over time even when the calculator inputs look similar.',
    practice: 'Use the calculated value as a starting range and compare it with consistent intake and average weight trends over two to four weeks. Adjust gradually and re-estimate after a meaningful change in body weight, activity, life stage, or health.',
    review: 'Follow average weight, waist when relevant, hunger, energy, training, steps, and adherence. If the observed trend differs from the prediction, the real-world trend is more useful for planning than repeatedly selecting a different activity label.',
    limits: 'Metabolic adaptation is real, but it does not mean energy balance stops applying or that every plateau reflects a damaged metabolism. Measurement error, water change, reduced body size, and altered movement often contribute at the same time.',
    safety: 'Unexplained weight change, persistent fatigue, temperature intolerance, palpitations, tremor, menstrual change, or other signs of illness deserve medical assessment. Avoid stimulant products and extreme intake changes sold as metabolism repairs.'
  },
  'Weight Loss': {
    meaning: 'Weight loss and fat loss are related but not identical. Scale weight includes fat, lean tissue, water, glycogen, and digestive contents, so a sustainable plan is judged over weeks and months rather than by the fastest short-term drop.',
    evidence: 'A calorie deficit supports fat loss, yet the size and consistency of the deficit are estimated in ordinary life. Physical activity provides important health benefits at any weight and helps preserve function, while resistance training and adequate protein support lean tissue.',
    personal: 'Starting weight, body composition, medication, sleep, stress, food access, disability, hormones, health conditions, and previous dieting influence the safest and most workable approach. The same rate or target is not appropriate for every person.',
    practice: 'Choose an eating pattern that creates a modest, tolerable deficit without removing nutritional adequacy. Pair it with routine movement, strength work, sleep, and an environment that makes the intended choices easier to repeat.',
    review: 'Use several morning weights to form a weekly average and compare multi-week trends. Waist, strength, hunger, energy, sleep, menstrual function, and adherence help distinguish useful progress from a plan that is too aggressive.',
    limits: 'Plateaus and temporary gains do not automatically mean failure. Sodium, carbohydrate, constipation, travel, soreness, and the menstrual cycle can mask fat change; reacting with severe restriction often makes the plan less sustainable.',
    safety: 'Avoid crash diets, dehydration, purging, unprescribed weight-loss drugs, or exercise used as punishment. Pregnancy, adolescence, diabetes medication, frailty, rapid unexplained change, and eating-disorder history need individual clinical support.'
  },
  "Women's Health": {
    meaning: 'Women’s health guidance changes across puberty, reproductive years, pregnancy, postpartum recovery, breastfeeding, perimenopause, and later life. Symptoms and needs also vary within each stage, so a calendar, calculator, or broad hormone claim cannot provide a diagnosis.',
    evidence: 'Cycle dates, symptoms, laboratory tests, ultrasound, and physical findings answer different questions. Hormones fluctuate normally, and testing is most useful when selected and timed to investigate a specific clinical concern.',
    personal: 'Age, menstrual pattern, pregnancy possibility, medicines, contraception, nutrition, training, sleep, health history, and fertility goals can all change interpretation. Persistent change from a person’s usual pattern is often more informative than comparison with an idealised schedule.',
    practice: 'Track dates, symptoms, severity, medicines, and relevant life changes in a simple record. Support adequate food, sleep, and appropriate activity, then bring the pattern and specific questions to a qualified clinician when assessment is needed.',
    review: 'Judge progress by the goal: symptom control, regular cycles where relevant, safe pregnancy care, feeding outcomes, fertility evaluation, strength, sleep, or metabolic health. Weight alone does not show whether care is effective.',
    limits: '“Hormone balance,” fertility foods, cycle syncing, and supplement protocols are frequently marketed with more certainty than the evidence allows. Do not delay indicated evaluation or stop prescribed treatment for an unverified plan.',
    safety: 'Severe pelvic or abdominal pain, very heavy bleeding, fainting, pregnancy warning signs, chest pain, severe breathlessness, postpartum mental-health crisis, or thoughts of self-harm require prompt local medical care.'
  }
};

function getGuidance(category) {
  const result = guidance[category];
  if (!result) throw new Error(`Missing blog depth guidance for category: ${category}`);
  return result;
}

module.exports = { guidance, getGuidance };
