const profiles = [];

const defaults = {
  'BMI & Body Weight': {
    context: 'BMI is most useful when accurate height and weight are interpreted with age, growth stage, waist size, body composition, symptoms, and other health markers.',
    guidance: 'Ask a healthcare professional to interpret BMI when assessing a child, during pregnancy, after unexplained weight change, or when body composition or a medical condition makes the adult categories less informative.'
  },
  'Body Fat': {
    context: 'Body-composition estimates change with the method, hydration, recent food and exercise, age, sex, and the equation used by the device.',
    guidance: 'Get individual advice when weight or composition changes unexpectedly, when restrictive eating is developing, or when a medical condition affects safe nutrition or exercise.'
  },
  'Calories & Weight': {
    context: 'Energy needs change with body size, lean mass, age, movement, training, health, medication, environment, and life stage, so calculator outputs are starting estimates.',
    guidance: 'A registered dietitian or clinician can tailor energy targets for pregnancy, adolescence, chronic disease, medication changes, athletic competition, or eating-disorder recovery.'
  },
  'Fitness & Exercise': {
    context: 'Training response depends on current fitness, technique, total weekly load, recovery, health, pain, equipment, and how quickly volume or intensity is increased.',
    guidance: 'Seek qualified help for chest symptoms, fainting, severe breathlessness, new neurological symptoms, persistent pain, or a condition that changes exercise safety.'
  },
  'General Tools': {
    context: 'A calculator or reference range is an educational estimate. Measurement method, timing, medicines, health history, and the population used to create the range can change interpretation.',
    guidance: 'Use a qualified clinician for diagnosis, treatment decisions, abnormal readings, concerning symptoms, or results that conflict with how you feel.'
  },
  'Health Checks': {
    context: 'Screening decisions depend on age, symptoms, family history, pregnancy, medicines, prior results, and national guidance; more testing is not always better.',
    guidance: 'Discuss a personalised prevention plan with a clinician and seek prompt care for new or severe symptoms rather than waiting for a routine screening visit.'
  },
  'Heart Rate': {
    context: 'Heart rate varies with fitness, age, temperature, hydration, stress, caffeine, illness, medication, body position, and the accuracy of the measuring device.',
    guidance: 'Seek care for fainting, chest pressure, severe breathlessness, or a new sustained fast, slow, or irregular heartbeat, especially when symptoms accompany it.'
  },
  'Hydration': {
    context: 'Fluid needs depend on food moisture, sweat rate, activity, heat, altitude, illness, pregnancy, medication, and kidney or heart function.',
    guidance: 'People with heart, kidney, or liver disease and anyone given a fluid limit should follow their clinical plan rather than a general hydration formula.'
  },
  'Lifestyle & Habits': {
    context: 'Habit change is shaped by cues, convenience, stress, sleep, social setting, access, and the reward a behaviour provides—not motivation alone.',
    guidance: 'Seek professional support when a habit causes withdrawal, unsafe behaviour, severe distress, loss of control, or continuing harm to health, work, or relationships.'
  },
  'Macronutrients': {
    context: 'Nutrient needs vary with total energy intake, body size, activity, age, pregnancy, health, food preferences, and how the whole eating pattern is constructed.',
    guidance: 'Use a registered dietitian for allergies, kidney or liver disease, diabetes medication, pregnancy, restrictive diets, digestive disease, or persistent difficulty meeting needs.'
  },
  'Mental Health': {
    context: 'Mental wellbeing reflects sleep, stressors, relationships, physical health, substance use, environment, and access to support; one wellness habit cannot address every cause.',
    guidance: 'Contact a qualified mental-health professional when symptoms persist, worsen, impair daily life, or include thoughts of self-harm; use emergency services for immediate danger.'
  },
  'Mental Health & Productivity': {
    context: 'Focus and productivity vary with sleep, workload, role clarity, mental and physical health, interruptions, environment, and whether the workload is realistically achievable.',
    guidance: 'Seek professional help when concentration or exhaustion changes suddenly, causes major impairment, or occurs with depression, anxiety, substance use, or safety concerns.'
  },
  'Nutrition & Diet': {
    context: 'A food or nutrient should be judged within the whole dietary pattern, including portions, preparation, variety, energy needs, medical conditions, culture, and affordability.',
    guidance: 'A registered dietitian or clinician can individualise nutrition for diagnosed disease, pregnancy, medication interactions, food allergy, significant deficiency, or unintended weight change.'
  },
  'Sleep & Recovery': {
    context: 'Sleep quality reflects duration, timing, regularity, environment, stress, substances, pain, medication, breathing, and circadian rhythm.',
    guidance: 'Speak with a clinician about chronic insomnia, loud snoring, witnessed breathing pauses, severe daytime sleepiness, unusual night-time behaviour, or symptoms that make driving unsafe.'
  },
  'TDEE & Metabolism': {
    context: 'Energy expenditure varies with body size, lean mass, movement, training, food intake, age, health, medication, and adaptive changes during weight loss.',
    guidance: 'Seek individual assessment for unexplained weight change, persistent fatigue, temperature intolerance, palpitations, tremor, menstrual changes, or a suspected endocrine condition.'
  },
  'Weight Loss': {
    context: 'Weight trends reflect energy balance plus short-term changes in water, glycogen, food volume, medication, illness, sleep, and hormonal state.',
    guidance: 'Get individual support for rapid or unexplained change, pregnancy, adolescence, diabetes medication, eating-disorder history, or symptoms caused by restriction or exercise.'
  },
  "Women's Health": {
    context: 'Needs and symptoms vary with age, menstrual status, pregnancy, breastfeeding, medication, health history, and the individual pattern over time.',
    guidance: 'Use an obstetric, gynaecology, fertility, or primary-care professional for persistent symptoms, pregnancy concerns, severe pain or bleeding, or treatment decisions.'
  }
};

function p(category, slug, topic, overview, facts, actions, cautions, sources, options = {}) {
  const base = defaults[category];
  profiles.push({
    category,
    slug,
    topic,
    shortTopic: options.shortTopic || topic,
    primaryKeyword: options.primaryKeyword || topic.toLowerCase(),
    variations: options.variations || [`${topic.toLowerCase()} guide`, `${topic.toLowerCase()} explained`, category.toLowerCase()],
    description: options.description,
    overview,
    facts,
    actions,
    cautions,
    sources,
    context: options.context || base.context,
    guidance: options.guidance || base.guidance
  });
}

// BMI & Body Weight
p('BMI & Body Weight', 'bmi-and-chronic-disease', 'BMI and chronic disease risk', 'BMI can help identify population-level patterns in weight-related risk, but it cannot diagnose diabetes, heart disease, or any other condition.', [
  'Higher BMI is associated with increased risk for several chronic conditions, yet association does not show an individual’s current health or prove a single cause.',
  'Blood pressure, glucose, lipids, waist size, fitness, smoking, sleep, medication, and family history add information that BMI cannot provide.',
  'A person can have risk factors at any BMI, so preventive care should not be withheld because a number falls in a particular category.'
], ['Confirm height and weight, then calculate BMI consistently.', 'Review the result with other measurable risk factors rather than in isolation.', 'Choose one sustainable nutrition, movement, sleep, or care goal based on the full picture.'], ['Do not describe BMI as a direct body-fat or disease measurement.', 'Do not assume a “healthy” category rules out high blood pressure, diabetes, or other conditions.'], ['cdcBmi', 'cdcAdultBmi', 'niddkWeight']);

p('BMI & Body Weight', 'bmi-chart-by-age', 'BMI charts by age', 'Adult BMI categories do not change decade by decade, while children and teenagers require age- and sex-specific BMI-for-age percentiles.', [
  'For adults aged 20 and older, standard screening cutoffs are below 18.5, 18.5 to under 25, 25 to under 30, and 30 or higher.',
  'For ages 2–19, growth charts compare a child’s BMI with peers of the same age and sex because normal body composition changes during growth.',
  'In older adults, muscle loss, frailty, and unintentional weight change can matter even when BMI remains in an adult reference range.'
], ['Use the adult chart only for people aged 20 or older.', 'For a child or teenager, record exact age and use a recognised BMI-for-age calculator.', 'Interpret any value as part of a growth or health trend rather than a one-time grade.'], ['Do not apply adult cutoffs to children.', 'Do not set a weight goal for an older adult without considering strength, appetite, function, and medical history.'], ['cdcAdultBmi', 'cdcChildBmi', 'cdcBmi']);

p('BMI & Body Weight', 'bmi-for-children-and-teenagers', 'BMI for children and teenagers', 'Child and teen BMI uses the same height-and-weight formula as adult BMI, but the result is interpreted on age- and sex-specific growth charts.', [
  'CDC growth charts classify BMI-for-age below the 5th percentile, 5th to under the 85th, 85th to under the 95th, and at or above the 95th percentile.',
  'Percentiles compare with a reference population; they do not measure body fat or diagnose a disease.',
  'Growth direction, puberty, family growth patterns, nutrition, activity, sleep, medicines, and symptoms all affect clinical interpretation.'
], ['Measure height without shoes and weight on a suitable scale.', 'Use exact date of birth, measurement date, and sex required by the growth chart.', 'Discuss an unexpected percentile or changing growth pattern with a paediatric professional.'], ['Avoid adult dieting advice or calorie restriction for a child without clinical supervision.', 'Do not shame a child or treat the percentile as a judgement of character or parenting.'], ['cdcChildBmi', 'cdcBmi', 'niddkWeight']);

p('BMI & Body Weight', 'bmi-vs-body-fat-percentage', 'BMI versus body-fat percentage', 'BMI compares weight with height; body-fat percentage estimates the share of body weight that is fat. They answer related but different questions.', [
  'BMI is inexpensive and repeatable but cannot distinguish fat, muscle, bone, and fluid.',
  'Body-fat methods use skinfolds, electrical impedance, imaging, or other assumptions, and different methods can disagree.',
  'Waist circumference, metabolic markers, strength, and health history can add context to either measure.'
], ['Choose the measurement that matches the question you are trying to answer.', 'Use the same body-fat method under similar conditions when tracking change.', 'Compare trends over weeks or months and include performance or health outcomes.'], ['Do not compare a home-scale estimate directly with a DXA result as if they were interchangeable.', 'Do not assume a muscular person with higher BMI or a lean-looking person with normal BMI has a known health status.'], ['cdcBmi', 'niddkWeight']);

p('BMI & Body Weight', 'how-to-lower-your-bmi', 'How to lower BMI safely', 'Lowering BMI means reducing weight relative to height, but the useful goal is improving health through a sustainable plan rather than chasing the lowest possible number.', [
  'A moderate energy deficit can support gradual loss while making it easier to meet nutrient needs and maintain activity.',
  'Resistance training, aerobic activity, adequate protein, sleep, and food quality support health even when scale change is slow.',
  'As weight changes, energy needs and the appropriate plan may also change.'
], ['Confirm whether weight loss is an appropriate goal for your health and life stage.', 'Choose a manageable eating pattern and build toward regular aerobic and strength activity.', 'Track multi-week weight and waist trends plus energy, hunger, sleep, and performance.'], ['Avoid crash diets, dehydration, purging, or excessive exercise.', 'Do not use adult BMI-loss advice during pregnancy, for children, or during eating-disorder recovery.'], ['niddkWeight', 'niddkPlanner', 'hhsActivity']);

p('BMI & Body Weight', 'is-bmi-accurate', 'Is BMI accurate?', 'BMI accurately performs its calculation when height and weight are correct, but its interpretation has limits because it is a screening ratio rather than a direct test of body fat or disease.', [
  'BMI works well for describing weight patterns in populations and can flag when additional assessment may be useful.',
  'It may classify muscular people at a higher category and can miss high body fat or low muscle at a seemingly typical weight.',
  'The same BMI can have different implications depending on waist size, age, health markers, fitness, and clinical history.'
], ['Check measurement accuracy before interpreting the result.', 'Use BMI as one part of assessment alongside other relevant markers.', 'Ask what decision the number is meant to support before acting on it.'], ['Do not call a BMI calculator diagnostic or exact body-fat testing.', 'Do not make major treatment or diet decisions from a boundary value alone.'], ['cdcBmi', 'cdcAdultBmi']);

p('BMI & Body Weight', 'overweight-vs-obese-bmi', 'Overweight versus obesity by BMI', 'In adult BMI screening, “overweight” and “obesity” are adjacent statistical categories, not diagnoses or descriptions of a person’s worth.', [
  'For adults, overweight is BMI 25 to under 30; obesity begins at 30 and is divided into three classes.',
  'Risk generally changes along a continuum, so 29.9 and 30.0 are not biologically opposite states.',
  'Health assessment should include other risk factors and person-first, non-stigmatising language.'
], ['Calculate with current measurements and identify the adult screening category.', 'Review waist size, blood pressure, glucose, lipids, symptoms, and family history as appropriate.', 'Choose health goals that are specific and achievable rather than focusing only on a label.'], ['Do not apply these adult categories to children or pregnancy.', 'Do not assume category alone determines treatment or individual disease risk.'], ['cdcAdultBmi', 'cdcBmi', 'niddkWeight']);

p('BMI & Body Weight', 'underweight-bmi-health-risks', 'Underweight BMI and health risks', 'An adult BMI below 18.5 is classified as underweight, but the cause, recent trend, symptoms, and nutritional status determine what the result means.', [
  'Low weight may reflect natural build, inadequate intake, malabsorption, illness, medication effects, stress, or an eating disorder.',
  'Possible concerns include nutrient deficiency, low bone density, menstrual changes, reduced immunity, weakness, and loss of muscle.',
  'Unintentional loss or a rapid downward trend is more concerning than a stable lifelong pattern by itself.'
], ['Confirm measurements and review how weight has changed over time.', 'Note appetite, digestive symptoms, fatigue, menstrual changes, medication, and food access.', 'Seek assessment before using supplements or an aggressive weight-gain plan.'], ['Do not assume “eat more” addresses the underlying cause.', 'Urgent assessment is appropriate for fainting, severe weakness, dehydration, inability to eat, or rapid unexplained loss.'], ['cdcAdultBmi', 'niddkWeight']);

p('BMI & Body Weight', 'what-is-a-healthy-bmi', 'What is a healthy BMI?', 'For adults, BMI 18.5 to under 25 is labelled the healthy-weight range, but health cannot be confirmed from BMI alone.', [
  'Adult categories are screening ranges based on weight relative to height and are the same for adult men and women.',
  'A value inside the range can coexist with high blood pressure, abnormal glucose or lipids, low fitness, or low muscle mass.',
  'A value outside the range does not reveal the cause or automatically determine the right treatment.'
], ['Calculate BMI with accurate current measurements.', 'Review other markers that match your age, symptoms, and risk profile.', 'Focus on sustainable behaviours and preventive care instead of maintaining a number at any cost.'], ['Do not apply the adult range to children and teenagers.', 'Do not pursue weight loss when pregnant, underweight, unwell, or at risk of disordered eating without professional advice.'], ['cdcAdultBmi', 'cdcBmi']);

// Body Fat
p('Body Fat', 'body-recomposition', 'Body recomposition', 'Body recomposition aims to reduce fat mass while maintaining or increasing lean tissue, so progress may occur with little change in total scale weight.', [
  'Progressive resistance training provides the main muscle-building or muscle-retention stimulus.',
  'Adequate protein and an appropriate energy intake support recovery; a large deficit makes muscle gain harder.',
  'Waist, strength, photos, clothing fit, and a consistent body-composition method can show changes the scale misses.'
], ['Use a repeatable full-body resistance program and track performance.', 'Set a realistic protein and calorie range that fits the primary goal.', 'Evaluate trends over at least several months rather than expecting weekly transformation.'], ['Do not combine an extreme calorie deficit with high training volume.', 'Do not treat a home body-fat reading as exact or react to one fluctuating result.'], ['hhsActivity', 'acsmResistance', 'niddkWeight']);

p('Body Fat', 'essential-body-fat-vs-storage-fat', 'Essential body fat versus storage fat', 'Essential fat supports normal cells, nerves, organs, hormones, and reproductive functions; storage fat is energy stored in adipose tissue beneath the skin and around organs.', [
  'Women generally require a higher essential-fat range than men because of reproductive biology.',
  'Storage fat is normal and protective in appropriate amounts; it is not all harmful tissue.',
  'Very low body-fat levels can disrupt hormones, bone health, immunity, mood, and performance.'
], ['Use body-fat categories as broad references rather than targets.', 'Choose goals that protect energy, menstrual or hormonal function, strength, and wellbeing.', 'Discuss persistent symptoms or extreme targets with a qualified clinician or sports dietitian.'], ['Do not aim for an “essential fat” percentage as a normal year-round target.', 'Do not diagnose visceral-fat risk from appearance or one consumer scale.'], ['niddkWeight', 'cdcBmi']);

p('Body Fat', 'how-long-to-lose-1-percent-body-fat', 'How long it takes to lose one percent body fat', 'There is no fixed timetable for losing one percentage point of body fat because the starting estimate, measurement error, body size, and actual fat-loss rate all vary.', [
  'Consumer body-fat devices can fluctuate by more than the change someone expects to see in a short period.',
  'A moderate calorie deficit may produce gradual fat loss while supporting training and lean-tissue retention.',
  'As body fat becomes lower, progress often slows and the cost to hunger, recovery, or hormones may rise.'
], ['Choose one measurement method and standardise time, hydration, meals, and exercise.', 'Track average weight, waist, and strength for several weeks.', 'Adjust the plan only after a clear trend rather than a single reading.'], ['Do not promise that one percentage point equals the same kilograms or weeks for everyone.', 'Stop aggressive loss if it causes fainting, persistent fatigue, menstrual disruption, bingeing, or declining performance.'], ['niddkPlanner', 'niddkWeight']);

p('Body Fat', 'how-to-lose-body-fat-without-losing-muscle', 'Lose body fat without losing muscle', 'Muscle retention during fat loss is supported by a moderate deficit, resistance training, adequate protein, and enough recovery.', [
  'Faster scale loss increases the chance that water and lean tissue contribute to the change.',
  'Strength training signals the body to retain muscle more effectively than cardio alone.',
  'Protein distribution, sleep, training experience, and starting body fat affect the outcome.'
], ['Set a conservative calorie deficit and a realistic rate of loss.', 'Train major muscle groups consistently and keep useful loads in the program.', 'Monitor strength, recovery, hunger, and multi-week weight and waist trends.'], ['Do not keep cutting calories when performance and health are deteriorating.', 'Do not add excessive cardio while removing recovery and resistance work.'], ['niddkWeight', 'hhsActivity', 'acsmResistance']);

p('Body Fat', 'how-to-measure-body-fat-at-home', 'How to measure body fat at home', 'Home body-fat methods estimate rather than directly measure fat mass, and repeatability is often more useful than the displayed precision.', [
  'Bioelectrical-impedance scales are affected by hydration, food, exercise, skin temperature, and device equations.',
  'Skinfold callipers depend on site selection, technique, and the prediction equation used.',
  'Waist measurement does not provide body-fat percentage but can track abdominal size with less equipment.'
], ['Select one method and learn its instructions.', 'Measure at a similar time under similar hydration, meal, and exercise conditions.', 'Record several readings and compare longer trends with waist and performance.'], ['Do not compare values from different devices as if they share the same scale.', 'Do not use a home estimate to diagnose a disease or justify extreme restriction.'], ['cdcBmi', 'niddkWeight']);

p('Body Fat', 'visceral-fat-vs-subcutaneous-fat', 'Visceral fat versus subcutaneous fat', 'Subcutaneous fat sits beneath the skin, while visceral fat is stored deeper around abdominal organs; the two locations have different metabolic associations.', [
  'Higher visceral-fat levels are associated with greater cardiometabolic risk than the same amount of subcutaneous fat.',
  'Waist circumference can help screen abdominal fat but does not directly separate visceral and subcutaneous stores.',
  'Overall fat loss, physical activity, sleep, and management of blood pressure, glucose, and lipids matter more than spot-reduction claims.'
], ['Measure waist consistently if it is appropriate for your goal.', 'Combine aerobic and resistance activity with a sustainable eating pattern.', 'Use clinical risk factors and professional assessment when risk is a concern.'], ['Do not diagnose visceral fat by pinching the skin or looking in a mirror.', 'Do not trust products claiming to selectively burn deep abdominal fat.'], ['niddkWeight', 'hhsActivity']);

// Calories & Weight
p('Calories & Weight', 'calorie-cycling', 'Calorie cycling', 'Calorie cycling varies intake across days while keeping the weekly average aligned with maintenance, loss, or gain goals.', [
  'Higher- and lower-calorie days do not bypass energy balance; the average over time still matters.',
  'Some people prefer more food on training or social days, while others find a steady target simpler.',
  'Large swings can increase hunger, complicate nutrition, or trigger restrict-and-binge patterns.'
], ['Estimate a weekly calorie range from a reasonable daily target.', 'Plan modest differences around training, appetite, and schedule.', 'Review weekly intake and weight trends, then simplify if cycling reduces adherence.'], ['Do not use very low days to compensate for overeating or as punishment.', 'Avoid cycling without clinical guidance when pregnant, under 18, using glucose-lowering medicine, or recovering from an eating disorder.'], ['niddkPlanner', 'niddkWeight']);

p('Calories & Weight', 'calorie-needs-by-age', 'Calorie needs by age', 'Average calorie needs often change with age because body size, growth, muscle mass, hormones, and activity change, but age alone cannot determine an individual target.', [
  'Children and teenagers need energy for growth and should not use adult weight-loss calculators.',
  'Adult needs often decline when activity and lean mass decline, not because every birthday produces a fixed metabolic drop.',
  'Older adults may need fewer calories but still require nutrient-dense food and sufficient protein.'
], ['Use an age-appropriate energy equation or professional assessment.', 'Enter current size and an honest description of usual activity.', 'Calibrate estimates with appetite, function, growth or weight trends, and health.'], ['Do not copy a calorie target from another age group or body size.', 'Do not reduce an older adult’s intake without assessing unintentional loss, frailty, appetite, and medical causes.'], ['nasEnergy', 'dietaryGuidelines', 'niddkPlanner']);

p('Calories & Weight', 'calorie-surplus-for-muscle-gain', 'Calorie surplus for muscle gain', 'A modest calorie surplus can support muscle gain, but a larger surplus does not force proportionally faster muscle growth and usually increases fat gain.', [
  'Training experience, genetics, program quality, protein, sleep, and starting body composition affect the rate of gain.',
  'Beginners or people returning to training may gain muscle near maintenance, while advanced lifters often progress slowly.',
  'Weekly average weight, waist, and gym performance are more useful than one daily calorie number.'
], ['Estimate maintenance and add a small, manageable amount.', 'Follow a progressive resistance program and meet protein needs.', 'Track monthly strength and body trends and adjust the surplus gradually.'], ['Do not use rapid weight gain as proof of rapid muscle gain.', 'Do not ignore digestive comfort, blood lipids, food quality, or declining fitness during a bulk.'], ['nasEnergy', 'acsmResistance', 'dietaryGuidelines']);

p('Calories & Weight', 'calories-burned-walking-10000-steps', 'Calories burned walking 10,000 steps', 'The calories burned in 10,000 steps vary widely with body size, pace, terrain, stride, load, and whether the steps replace sitting or other activity.', [
  'Ten thousand steps is a convenient round goal, not a physiological threshold required for health.',
  'Distance differs because step length differs, and watches estimate rather than measure energy expenditure.',
  'Health benefits can begin below 10,000 steps, especially when someone increases from a low baseline.'
], ['Measure a normal week before setting a step goal.', 'Increase steps gradually with short walks or active routines.', 'Use the calorie estimate as context, not permission to match it with extra food automatically.'], ['Do not force 10,000 steps through pain, illness, or unsafe conditions.', 'Do not treat a watch calorie value as exact or double-count walking already included in TDEE.'], ['hhsActivity', 'cdcActivity', 'niddkPlanner']);

p('Calories & Weight', 'eating-late-at-night-weight-gain', 'Eating late at night and weight gain', 'Eating late does not create body fat independently of total intake, but timing can influence appetite, food choice, reflux, sleep, and how easily someone exceeds energy needs.', [
  'Late eating often involves snacks, alcohol, or convenience foods consumed after normal meals.',
  'Circadian timing affects metabolism, yet real-world weight change still reflects the whole pattern.',
  'Shift workers and people with diabetes, reflux, or sleep problems may need a more individual plan.'
], ['Track what, why, and how much is eaten late for one week.', 'Move a balanced meal or planned snack earlier if long gaps drive night hunger.', 'Create a clear kitchen-closing or post-work routine that still allows needed nutrition.'], ['Do not assume any food eaten after a fixed clock time becomes fat automatically.', 'Do not skip daytime meals to compensate if that causes bingeing or low glucose.'], ['niddkWeight', 'nhlbiSleepEffects', 'dietaryGuidelines']);

p('Calories & Weight', 'how-to-break-weight-loss-plateau', 'How to break a weight-loss plateau', 'A plateau is a sustained lack of change over several weeks, not a few days of water fluctuation after normal progress.', [
  'A smaller body generally uses less energy, and unplanned movement or logging accuracy can change over time.',
  'Sodium, carbohydrate, menstrual cycle, constipation, travel, and hard training can temporarily hide fat loss.',
  'Maintenance periods, food-quality improvements, or small activity changes can be more useful than a severe cut.'
], ['Confirm the plateau with several weeks of average weights and waist measurements.', 'Review portions, drinks, oils, weekends, steps, sleep, and training honestly.', 'Make one small adjustment and observe again before changing something else.'], ['Do not respond to one high weigh-in with extreme restriction.', 'Seek assessment for unexplained symptoms, medication changes, or a plateau following very low intake.'], ['niddkPlanner', 'niddkWeight']);

p('Calories & Weight', 'how-to-count-calories', 'How to count calories', 'Calorie counting estimates energy intake by combining portion size with food-label or database values; it can teach patterns but is never perfectly precise.', [
  'Cooking oils, drinks, sauces, restaurant portions, and serving-size assumptions are common sources of error.',
  'Weekly averages often match real life better than demanding the same number every day.',
  'Calorie data does not describe protein, fibre, micronutrients, or food quality by itself.'
], ['Define a short learning period and a reasonable target range.', 'Use a scale or standard portions for foods that are difficult to estimate.', 'Review patterns and build repeatable meals rather than chasing perfect logging.'], ['Do not let tracking become compulsive, punitive, or a reason to avoid social eating.', 'Do not use counting alone to manage a medical condition or eating disorder.'], ['foodData', 'fdaLabels', 'niddkWeight']);

p('Calories & Weight', 'liquid-calories-weight-loss', 'Liquid calories and weight loss', 'Calories from sweetened drinks, alcohol, speciality coffee, juice, and large smoothies can add up quickly and may be less filling than solid food.', [
  'Beverage portions and add-ins such as syrups, cream, and sugar determine the energy content.',
  'Milk, fortified alternatives, and smoothies can provide nutrients, so context matters more than labelling all liquid calories “bad.”',
  'Replacing frequent sugary drinks with water or unsweetened options can reduce intake without shrinking meals.'
], ['Record beverages and additions for a normal week.', 'Choose the highest-frequency high-calorie drink for the first change.', 'Use smaller portions, less sugar, or a satisfying lower-calorie alternative.'], ['Do not rely on juice cleanses or liquid diets for sustainable fat loss.', 'Alcohol affects sleep, safety, medication, and health beyond its calorie content.'], ['dietaryGuidelines', 'cdcAlcohol', 'niddkWeight']);

p('Calories & Weight', 'low-calorie-foods-keep-you-full', 'Low-calorie foods that keep you full', 'Foods with water, fibre, protein, or volume can make a calorie target more satisfying, but fullness also depends on taste, meal structure, habits, and the person.', [
  'Vegetables, fruit, broth-based soups, legumes, potatoes, whole grains, lean protein, and lower-fat dairy can provide substantial portions.',
  'Protein and fibre generally support satiety, while added fats are nutritious but energy-dense.',
  'A meal made only from very low-calorie foods may leave someone hungry if protein, carbohydrate, or fat is inadequate.'
], ['Add vegetables or fruit to meals you already enjoy.', 'Include a meaningful protein and fibre source at main meals.', 'Adjust portions based on hunger, energy, and the overall target.'], ['Do not classify foods as unlimited because they are low in calories.', 'Do not let volume eating replace dietary variety or trigger uncomfortable overeating.'], ['foodData', 'dietaryGuidelines', 'niddkWeight']);

p('Calories & Weight', 'maintenance-calories-explained', 'Maintenance calories', 'Maintenance calories are the approximate average intake at which body weight remains relatively stable over time.', [
  'Maintenance is a range rather than a fixed number because activity and intake vary by day.',
  'A calculator estimates TDEE, but several weeks of intake and weight trends provide personal feedback.',
  'Maintenance changes after significant weight, activity, health, or life-stage changes.'
], ['Calculate a starting TDEE range with current information.', 'Track consistent intake and several morning weights for two to four weeks.', 'Compare weekly averages and adjust gradually if the trend is clearly rising or falling.'], ['Do not call a calculator result exact to the final calorie.', 'Do not double-count exercise calories already included in an activity multiplier.'], ['nasEnergy', 'niddkPlanner']);

// Fitness & Exercise
p('Fitness & Exercise', 'beginner-workout-plan-30-days', 'A 30-day beginner workout plan', 'A useful first month builds the habit, movement skill, and recovery capacity needed for longer-term training rather than promising a complete transformation in 30 days.', [
  'Beginners benefit from starting below maximum capacity and increasing one variable at a time.',
  'A complete plan includes aerobic movement, basic strength patterns, mobility as needed, and easier recovery days.',
  'Progress can mean improved technique, more repetitions, a longer walk, or less effort at the same workload.'
], ['Week 1: complete two short strength sessions and three easy walks.', 'Weeks 2–3: add a little duration or one set while keeping good technique.', 'Week 4: repeat the schedule, note progress, and choose a sustainable next-month goal.'], ['Do not train through sharp pain, chest symptoms, faintness, or severe breathlessness.', 'Do not add daily high-intensity workouts simply because the plan lasts 30 days.'], ['hhsActivity', 'cdcActivity', 'acsmResistance']);

p('Fitness & Exercise', 'best-exercises-for-each-muscle-group', 'Best exercises for each muscle group', 'The “best” exercise is one that trains the intended muscles through a comfortable range, can be progressed, and fits the person’s body, skill, and equipment.', [
  'Squat, hinge, push, pull, carry, and single-leg patterns cover most major muscle functions efficiently.',
  'Machines, free weights, cables, bands, and body-weight exercises can all build strength and muscle.',
  'Exercise selection matters less than consistent effort, sufficient weekly work, progression, and recovery.'
], ['Choose one stable exercise for each major movement pattern.', 'Learn technique with a manageable load and controlled repetitions.', 'Track repetitions and resistance, changing exercises only when there is a clear reason.'], ['Do not copy an exercise that causes persistent joint pain because it is popular.', 'Do not confuse novelty, soreness, or exhaustion with better muscle growth.'], ['acsmResistance', 'hhsActivity']);

p('Fitness & Exercise', 'cycling-calories-and-benefits', 'Cycling calories and health benefits', 'Cycling can develop aerobic fitness and leg endurance with relatively low impact, while calorie burn varies with body size, resistance, speed, terrain, wind, and duration.', [
  'Outdoor speed is affected by hills, wind, stops, surface, and bicycle type, so speed alone does not describe effort.',
  'Stationary-bike displays estimate calories and can differ between machines.',
  'Bike fit, gradual volume, visibility, helmet use, and road awareness influence safety and comfort.'
], ['Begin with an easy pace that allows conversation.', 'Increase weekly time gradually before adding frequent hard intervals.', 'Use perceived effort or heart rate trends rather than relying only on calorie displays.'], ['Do not set resistance so high that technique breaks down or knee pain develops.', 'Do not eat back every displayed exercise calorie automatically.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'hiit-workout-guide-for-beginners', 'HIIT workouts for beginners', 'High-intensity interval training alternates hard efforts with recovery, but a beginner does not need all-out sprints to gain fitness.', [
  'The work interval should be challenging yet controlled enough to maintain safe technique.',
  'One or two interval sessions per week are usually plenty while building an aerobic and strength base.',
  'Warm-up, recovery, sleep, and spacing from other hard sessions affect how well HIIT is tolerated.'
], ['Build several weeks of regular moderate activity first.', 'Start with short controlled work intervals and longer easy recovery.', 'End the session while form remains good and progress one variable gradually.'], ['Avoid HIIT when ill, injured, severely sleep deprived, or medically advised against vigorous exercise.', 'Stop for chest pressure, faintness, severe breathlessness, or unusual heart symptoms.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'home-workout-routine-no-equipment', 'A no-equipment home workout', 'A home program can train the whole body using body weight, leverage, tempo, unilateral movements, and household support points.', [
  'Sit-to-stands or squats, split squats, hip bridges, push-up variations, rows with safe equipment, and trunk exercises cover major patterns.',
  'Difficulty can increase through range of motion, slower lowering, pauses, repetitions, sets, or harder leverage.',
  'A clear schedule and progression plan matter more than owning specialised equipment.'
], ['Choose five or six movements that can be performed safely in the available space.', 'Complete two controlled sets and leave a few good repetitions in reserve.', 'Repeat two or three times weekly and progress only when technique is stable.'], ['Do not improvise pulling equipment or elevated surfaces that may slip or break.', 'Do not use advanced jumping exercises before landing skill and joint tolerance are established.'], ['hhsActivity', 'acsmResistance']);

p('Fitness & Exercise', 'how-many-days-per-week-workout', 'How many days per week to work out', 'The right weekly frequency depends on the goal, session length, total workload, schedule, recovery, and current fitness—not a universal perfect number.', [
  'Public-health guidance can be accumulated across the week and does not require daily gym sessions.',
  'Two full-body strength days can train major muscle groups effectively for many beginners.',
  'More days may distribute the same workload rather than increase the total amount of effective training.'
], ['Start with a schedule you can repeat for at least a month.', 'Include aerobic activity and two strength exposures across the week.', 'Add a day only when sleep, soreness, motivation, and performance remain stable.'], ['Do not copy a six-day program when your recovery and schedule support three.', 'Do not assume rest days require complete inactivity; easy movement can be appropriate.'], ['hhsActivity', 'cdcActivity', 'acsmResistance']);

p('Fitness & Exercise', 'how-many-steps-per-day', 'How many steps per day', 'Step count is a practical activity measure, but there is no single threshold that separates healthy from unhealthy adults.', [
  'Benefits can occur when a sedentary person adds steps well below 10,000 per day.',
  'Phone and watch counts differ with device placement, gait, pushing a stroller, and non-walking movement.',
  'Walking pace, hills, strength training, cycling, and other exercise provide benefits that step count does not capture.'
], ['Measure a typical week without changing behaviour.', 'Set a modest increase that fits time, mobility, and safety.', 'Use short walks and movement breaks, then reassess energy, pain, and consistency.'], ['Do not force a round-number target through injury, dizziness, or unsafe conditions.', 'Do not judge an active cyclist, swimmer, or wheelchair user solely by steps.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'how-to-improve-running-endurance', 'How to improve running endurance', 'Running endurance improves when easy aerobic volume, appropriate intensity, strength, technique, and recovery progress gradually.', [
  'Most running should feel controlled enough to sustain conversation, with harder work used selectively.',
  'Increasing distance and intensity at the same time raises fatigue and injury risk.',
  'Sleep, footwear comfort, fuelling, hydration, prior injury, and total life stress affect adaptation.'
], ['Run or walk-run at an easy effort on consistent days.', 'Increase weekly time gradually and keep at least one easier or rest day.', 'Add short controlled tempo or interval work only after building regular volume.'], ['Do not run through worsening focal bone pain, altered gait, chest symptoms, or faintness.', 'Do not use pace from another runner as your required easy pace.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'how-to-run-5k-training-plan', 'How to train for a 5K', 'A beginner 5K plan builds enough continuous or run-walk endurance to cover the distance comfortably before focusing on speed.', [
  'Three weekly run or run-walk sessions can be sufficient when separated by recovery.',
  'Easy effort should make up most training; race-pace work is added in small amounts.',
  'Strength and mobility can support tolerance, while the longest session prepares confidence and endurance.'
], ['Establish a starting run-walk interval that feels controlled.', 'Add time gradually across six to ten weeks with an easier week if fatigue accumulates.', 'Practise pacing, footwear, breakfast, and hydration before event day.'], ['Do not compress missed weeks into a few hard sessions.', 'Stop and seek assessment for chest symptoms, fainting, severe breathlessness, or persistent injury pain.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'jump-rope-workout-benefits', 'Jump-rope workouts and benefits', 'Jumping rope is a vigorous, portable activity that develops coordination and aerobic fitness, but it also places repeated impact on feet, calves, and joints.', [
  'Short intervals can raise heart rate quickly and do not require a long session.',
  'Rope length, surface, footwear, landing softly, and keeping jumps low affect technique.',
  'Calf and Achilles tolerance should be built gradually, especially after inactivity.'
], ['Learn basic two-foot jumps in short sets on a forgiving surface.', 'Keep the rope speed controlled and add total contacts gradually.', 'Alternate jump-rope days with lower-impact activity and strength work.'], ['Avoid large daily increases or high-impact tricks before mastering basic landings.', 'Choose lower-impact cardio if jumping worsens joint, pelvic-floor, balance, or bone symptoms.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'progressive-overload-explained', 'Progressive overload', 'Progressive overload means gradually increasing the training challenge so the body continues adapting without sacrificing technique or recovery.', [
  'Progress can come from load, repetitions, sets, range of motion, control, exercise difficulty, or shorter rest.',
  'Not every variable should increase every workout, and progress slows with experience.',
  'A training log helps distinguish a real plateau from normal day-to-day variation.'
], ['Choose a repetition range and record each working set.', 'Add a small amount only after completing the current work with stable form.', 'Use easier sessions or weeks when fatigue prevents normal performance.'], ['Do not call poor form or shortened range a successful load increase.', 'Do not add volume indefinitely when sleep, joints, motivation, and performance are declining.'], ['acsmResistance', 'hhsActivity']);

p('Fitness & Exercise', 'rest-days-importance-recovery', 'Rest days and exercise recovery', 'Recovery days allow fatigue to fall and adaptation to occur; they are a planned part of training rather than evidence of low commitment.', [
  'Muscle soreness, connective-tissue stress, nervous-system fatigue, and depleted energy recover on different timelines.',
  'Easy walking, mobility, or recreation can be appropriate when it feels restorative.',
  'Persistent falling performance, disturbed sleep, irritability, and repeated illness can signal inadequate recovery.'
], ['Place easier days after the most demanding sessions.', 'Maintain food, fluid, and sleep routines rather than treating rest as a nutrition-free day.', 'Adjust the next week if fatigue is still accumulating.'], ['Do not train a painful injury aggressively to “keep momentum.”', 'Do not assume more soreness means more effective exercise.'], ['hhsActivity', 'nhlbiSleepEffects']);

p('Fitness & Exercise', 'strength-training-for-women-guide', 'Strength training for women', 'Women can use the same core resistance-training principles as men while adapting the program to goals, experience, life stage, symptoms, and recovery.', [
  'Progressive resistance supports strength, muscle, bone loading, function, and confidence.',
  'Heavy-looking weights do not cause instant excessive muscle gain; muscle development is gradual.',
  'Menstrual cycle, pregnancy, postpartum recovery, menopause, pelvic-floor symptoms, and iron status may influence training decisions.'
], ['Train major movement patterns two or more times weekly.', 'Progress repetitions or resistance gradually while keeping technique stable.', 'Track strength and function, not only scale weight or appearance.'], ['Do not use programmes that treat women as unable to lift challenging loads.', 'Get tailored advice for pregnancy, postpartum symptoms, severe pelvic pain, dizziness, or unexplained fatigue.'], ['hhsActivity', 'acsmResistance', 'acogExercise']);

p('Fitness & Exercise', 'stretching-guide-static-vs-dynamic', 'Static versus dynamic stretching', 'Dynamic stretching moves joints through controlled ranges and often suits warm-ups; static stretching holds a position and can suit cooldowns or dedicated flexibility work.', [
  'A warm-up should also raise temperature and rehearse the activity, not rely on stretching alone.',
  'Long intense static holds immediately before maximal strength or speed may temporarily affect performance.',
  'Flexibility is joint- and task-specific, and more range is not always better or safer.'
], ['Use easy movement followed by dynamic drills before training.', 'Hold gentle static stretches after training or in a separate session if flexibility is a goal.', 'Progress range without bouncing, numbness, or sharp pain.'], ['Do not force a joint beyond control or use another person to push aggressively.', 'Persistent restriction, pain, or nerve symptoms require assessment rather than more stretching.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'swimming-calories-and-fitness', 'Swimming calories and fitness benefits', 'Swimming trains aerobic fitness and muscular endurance with low joint impact, while calorie use varies with stroke, skill, pace, water temperature, body size, and rest.', [
  'Efficient swimmers may cover more distance with less energy at the same apparent speed.',
  'Water reduces weight-bearing impact but does not eliminate shoulder, neck, or breathing-related issues.',
  'Pool watches and online tables estimate calories and may handle stroke changes poorly.'
], ['Begin with short lengths and generous rest while developing breathing and technique.', 'Increase total swim time before adding frequent hard intervals.', 'Use supervised facilities and follow water-safety rules appropriate to skill.'], ['Do not swim alone when inexperienced or when a medical condition increases risk.', 'Do not treat a calorie estimate as exact or ignore shoulder pain and breathlessness.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'vo2-max-explained', 'VO2 max explained', 'VO2 max represents the highest rate at which the body can use oxygen during intense exercise and is one marker of aerobic fitness.', [
  'Laboratory testing measures oxygen exchange; watches estimate VO2 max from heart rate, pace, power, and proprietary equations.',
  'Age, genetics, training, altitude, illness, medication, heat, and test protocol affect the value.',
  'Improving fitness, health, and performance may matter more than comparing scores across devices.'
], ['Use the same device or test protocol when tracking change.', 'Build regular easy aerobic work and add controlled higher-intensity sessions.', 'Reassess after several consistent weeks rather than after every workout.'], ['Do not compare a running estimate directly with a cycling or laboratory value.', 'Do not perform maximal testing without appropriate screening, supervision, and emergency planning.'], ['hhsActivity', 'cdcActivity']);

p('Fitness & Exercise', 'yoga-for-weight-loss', 'Yoga for weight loss', 'Yoga can support movement, strength, balance, stress management, and body awareness, but it does not guarantee weight loss or selectively burn fat.', [
  'Energy expenditure varies greatly between gentle, flowing, heated, and demanding classes.',
  'Yoga may support a broader plan by improving consistency, mobility, sleep routines, or stress-related eating.',
  'Weight change still depends on the overall energy pattern and other activity.'
], ['Choose a beginner class and tell the instructor about injuries or limitations.', 'Practise consistently and combine yoga with aerobic and strengthening activity.', 'Evaluate benefits such as balance, strength, pain, stress, and function as well as weight.'], ['Do not use heat or sweating as proof of fat loss.', 'Avoid painful poses, forceful adjustments, or unsupported inversions beyond your skill.'], ['hhsActivity', 'nccihMeditation']);

// General Tools
p('General Tools', 'blood-pressure-ranges-explained', 'Blood pressure ranges', 'Blood pressure is recorded as systolic pressure over diastolic pressure, and categories help guide follow-up but a single reading does not usually establish a diagnosis.', [
  'Correct cuff size, seated rest, arm position, talking, caffeine, exercise, stress, and technique can change a reading.',
  'Home monitoring is most useful when readings are taken consistently and recorded over several days.',
  'Very high readings with chest pain, breathlessness, neurological symptoms, or severe headache can require emergency care.'
], ['Use a validated upper-arm monitor and the correct cuff size.', 'Rest quietly, take two readings, and record the average as advised.', 'Share the log with a clinician rather than changing medicine yourself.'], ['Do not diagnose or dismiss hypertension from one unusual reading.', 'Do not delay emergency assessment when a very high reading occurs with concerning symptoms.'], ['ahaBloodPressure', 'uspstf']);

p('General Tools', 'heart-age-calculator-guide', 'Heart-age calculators', 'A heart-age calculator translates cardiovascular risk factors into an age comparison to make risk easier to discuss, but it is not a measurement of how old the heart physically is.', [
  'Results depend on the risk equation, population, age range, and inputs such as blood pressure, cholesterol, smoking, and diabetes.',
  'Missing or estimated inputs can change the answer substantially.',
  'The useful outcome is identifying modifiable risk factors, not feeling reassured or alarmed by the age label.'
], ['Enter measured rather than guessed blood pressure and laboratory values when possible.', 'Review which factors drive the result.', 'Discuss validated cardiovascular-risk assessment and prevention options with a clinician.'], ['Do not use heart age to diagnose blocked arteries or predict an individual event.', 'Do not start, stop, or change blood-pressure or cholesterol medicine from the result.'], ['ahaBloodPressure', 'uspstf']);

p('General Tools', 'how-to-use-bmi-calculator-correctly', 'How to use a BMI calculator correctly', 'A BMI calculator needs accurate height and weight, the correct unit system, and age-appropriate interpretation to produce a useful screening result.', [
  'Metric BMI is kilograms divided by metres squared; US units multiply pounds divided by inches squared by 703.',
  'Adults use standard categories, while ages 2–19 require BMI-for-age percentiles.',
  'BMI is not a direct measure of body fat and should be combined with other information.'
], ['Measure height without shoes and weight on a suitable scale.', 'Check units before calculating and retain one decimal place for interpretation.', 'Use the correct adult or child reference and note the result as a screening estimate.'], ['Do not enter centimetres in a field expecting metres or pounds in a kilogram field.', 'Do not use adult BMI to set pregnancy or child weight goals.'], ['cdcAdultBmi', 'cdcChildBmi', 'cdcBmi']);

p('General Tools', 'protein-calculator-how-to-use', 'How to use a protein calculator', 'A protein calculator converts body weight and an activity or goal range into an estimated daily amount; it does not measure protein status or prescribe a medical diet.', [
  'The adult RDA is a population baseline, while active or older adults may use higher planning ranges.',
  'Body weight, training, calorie intake, age, pregnancy, and health influence the appropriate target.',
  'Total daily intake and a workable meal distribution matter more than exact timing.'
], ['Enter current body weight in the correct unit.', 'Select the activity and goal that reflect current—not planned—training.', 'Divide the result across meals and compare it with actual food portions.'], ['Do not treat the highest setting as automatically better.', 'Use clinical advice for kidney disease, liver disease, pregnancy, or therapeutic diets.'], ['dietaryGuidelines', 'foodData', 'ods']);

p('General Tools', 'testosterone-levels-by-age-guide', 'Testosterone levels by age', 'Testosterone changes across the lifespan and during the day, but symptoms and properly timed laboratory testing matter more than comparing one result with an online age chart.', [
  'Laboratories may use different assays and reference ranges, so the report’s range and units matter.',
  'Illness, sleep, medication, obesity, nutrition, and timing can affect a result.',
  'Low or high values require confirmation and clinical evaluation of causes before treatment.'
], ['Record symptoms, medicines, supplements, sleep, and the time of the blood draw.', 'Review the laboratory’s units and reference interval.', 'Discuss whether repeat morning testing and additional hormone tests are appropriate.'], ['Do not buy testosterone or “boosters” from an age chart or one result.', 'Seek prompt care for severe symptoms, and keep prescribed hormone therapy under clinician monitoring.'], ['nihTestosterone', 'uspstf']);

// Health Checks
p('Health Checks', 'bmi-for-athletes', 'BMI for athletes', 'BMI can place a muscular athlete in a higher weight category because it cannot distinguish muscle from fat, yet athletes are not automatically free of cardiometabolic risk.', [
  'Sport, position, training phase, sex, age, and body composition affect interpretation.',
  'Waist size, blood pressure, laboratory markers, performance, diet, and a repeatable body-composition method add context.',
  'Low BMI or rapid weight loss can also signal inadequate fuelling or low energy availability.'
], ['Calculate BMI accurately but label it as a screening ratio.', 'Review sport-relevant body composition, health, and performance measures.', 'Use a sports dietitian or clinician when changing weight for competition.'], ['Do not dismiss every high BMI as muscle without further context.', 'Do not pursue rapid cutting, dehydration, or extreme leanness for a weight class.'], ['cdcBmi', 'hhsActivity', 'niddkWeight']);

p('Health Checks', 'fitness-after-40', 'Fitness after 40', 'Fitness after 40 can improve at any starting point, with particular value from preserving strength, aerobic capacity, balance, mobility, and recovery.', [
  'Age-related changes are variable and are strongly influenced by activity, health, sleep, and prior training.',
  'Resistance training helps preserve muscle and function; aerobic activity supports cardiovascular fitness.',
  'Progression may need to be slower when returning after inactivity, illness, injury, or menopause-related changes.'
], ['Begin with two strength sessions and regular moderate aerobic activity.', 'Progress volume gradually and include balance work when appropriate.', 'Review recovery, joint symptoms, blood pressure, and medication effects.'], ['Do not use age as a reason to avoid all challenging exercise.', 'Get medical advice for symptoms or conditions that affect exercise safety.'], ['hhsActivity', 'cdcActivity', 'acsmResistance']);

p('Health Checks', 'health-calculators-for-men', 'Health calculators for men', 'Health calculators can organise questions about weight, energy, heart rate, and risk, but they cannot replace screening, physical examination, or laboratory testing.', [
  'BMI and waist measures provide different information about size and abdominal distribution.',
  'TDEE and protein tools estimate planning ranges rather than exact metabolism or nutrient need.',
  'Blood-pressure and cardiovascular-risk tools are most useful with measured inputs and clinical follow-up.'
], ['Choose a calculator tied to a specific decision.', 'Enter current measured values and read the methodology and limitations.', 'Discuss abnormal or concerning results within an age- and risk-appropriate check-up.'], ['Do not use a testosterone, heart-age, or disease-risk result as a diagnosis.', 'Do not delay care for symptoms because a calculator appears reassuring.'], ['uspstf', 'cdcBmi', 'ahaBloodPressure']);

p('Health Checks', 'health-calculators-for-women', 'Health calculators for women', 'General health calculators can support planning, while menstrual status, pregnancy, breastfeeding, menopause, medication, and body-composition differences may change interpretation.', [
  'Adult BMI categories are the same by sex but do not measure body fat or pregnancy weight gain.',
  'Calorie, hydration, and protein needs change during pregnancy and breastfeeding.',
  'Ovulation calculators estimate a fertile window and cannot confirm ovulation or rule out pregnancy.'
], ['Identify the specific question and whether a general calculator applies.', 'Use current measurements and note cycle, pregnancy, or medication factors.', 'Take persistent symptoms or abnormal results to an appropriate clinician.'], ['Do not use adult weight-loss targets during pregnancy.', 'Do not use an ovulation estimate as contraception or a diagnosis of infertility.'], ['womensHealth', 'acogPregnancy', 'cdcBmi']);

p('Health Checks', 'health-checks-every-year', 'Annual health checks', 'An annual visit can review prevention, symptoms, medicines, vaccines, and risk, but not every test is needed every year for every adult.', [
  'Screening intervals depend on age, sex, pregnancy, family history, previous results, and national recommendations.',
  'Blood pressure, tobacco and alcohol use, mental health, vaccines, and medication review are common preventive topics.',
  'Unnecessary testing can create false alarms and follow-up harms, so shared decision-making matters.'
], ['Prepare a list of medicines, family history changes, symptoms, and questions.', 'Review which screenings and vaccines are due rather than ordering a fixed package.', 'Agree on follow-up dates and how results will be communicated.'], ['Do not wait for an annual visit when symptoms are urgent or worsening.', 'Do not assume a large test panel is automatically more preventive.'], ['uspstf']);

p('Health Checks', 'healthy-lifestyle-checklist', 'A healthy lifestyle checklist', 'A useful health checklist covers eating, movement, sleep, substance use, stress, social connection, preventive care, and safety without demanding perfection.', [
  'Public-health activity guidance includes aerobic movement and muscle strengthening.',
  'A varied dietary pattern, adequate sleep, and not smoking provide broad health value.',
  'Social and environmental barriers can make change difficult, so goals should fit resources and context.'
], ['Choose one area with meaningful benefit and a realistic next action.', 'Define when, where, and how the action will happen.', 'Review progress weekly and adjust the environment rather than relying on motivation.'], ['Do not attempt a complete lifestyle overhaul in one week.', 'Do not use a checklist to blame someone for health factors outside their control.'], ['hhsActivity', 'dietaryGuidelines', 'uspstf']);

p('Health Checks', 'pregnancy-weight-gain', 'Pregnancy weight gain', 'Recommended pregnancy weight gain is based on pre-pregnancy BMI, whether the pregnancy is singleton or multiple, and the health of the pregnant person and baby.', [
  'Weight gain supports fetal growth, placenta, blood volume, fluid, breast tissue, and energy stores—not only body fat.',
  'The recommended total and rate differ by pre-pregnancy category and trimester.',
  'Severe nausea, swelling, blood-pressure changes, diabetes, and fetal growth can alter the clinical plan.'
], ['Use pre-pregnancy weight and height to identify the starting category.', 'Discuss an individual range and growth monitoring with the prenatal team.', 'Focus on nutrient-dense food, safe activity, and regular prenatal care rather than dieting.'], ['Do not use a general adult weight-loss calculator during pregnancy.', 'Seek urgent maternity advice for severe headache, visual changes, sudden swelling, bleeding, or reduced fetal movement.'], ['cdcPregnancyWeight', 'acogPregnancy', 'acogExercise']);

p('Health Checks', 'realistic-fitness-goals', 'Realistic fitness goals', 'A realistic fitness goal describes a behaviour or performance that can be measured, practised, and adjusted within the person’s time, health, and starting point.', [
  'Outcome goals such as weight or appearance are influenced by factors beyond one workout.',
  'Process goals—sessions completed, walking time, repetitions, or sleep opportunity—are more directly controllable.',
  'Baseline data helps set an appropriate challenge and reveals meaningful progress.'
], ['Record a simple baseline related to the goal.', 'Choose a 4–12 week process goal with specific days and minimum versions.', 'Review progress and barriers, then adjust the plan rather than abandoning the goal.'], ['Do not base timelines on transformation marketing or another person’s progress.', 'Do not let a missed session become evidence that the entire plan failed.'], ['hhsActivity', 'cdcActivity']);

p('Health Checks', 'understanding-lab-results', 'Understanding laboratory results', 'A laboratory result must be interpreted with its units, reference interval, test method, symptoms, medicines, fasting status, and reason the test was ordered.', [
  'A result outside the reference interval is not automatically a diagnosis, and a result inside it does not rule out every condition.',
  'Reference ranges describe a population and can differ between laboratories.',
  'Trends and related tests often matter more than one isolated value.'
], ['Confirm the test name, units, reference interval, and collection conditions.', 'Compare with prior results from the same laboratory when available.', 'Ask the ordering clinician what the result means, whether it needs repeating, and what action follows.'], ['Do not change medicine or buy supplements from one flagged result.', 'Seek prompt care for severe symptoms regardless of whether a portal result appears normal.'], ['niddkLabs', 'uspstf']);

p('Health Checks', 'weight-loss-after-50', 'Weight loss after 50', 'Weight loss after 50 should protect muscle, bone, nutrition, and function while addressing the person’s health priorities and medications.', [
  'Lower activity, menopause, illness, sleep, and gradual muscle loss can reduce energy needs, but large metabolic collapse is not inevitable.',
  'Resistance training and adequate protein help preserve lean tissue during a calorie deficit.',
  'Unintentional loss, poor appetite, weakness, or frailty requires assessment rather than further restriction.'
], ['Confirm that intentional loss is appropriate and review medicines and conditions.', 'Use a modest deficit with nutrient-dense meals and progressive resistance training.', 'Track waist and weight alongside strength, balance, energy, and daily function.'], ['Do not use very low-calorie diets or rapid-loss products without supervision.', 'Do not ignore bone health, falls risk, or unexplained appetite and weight changes.'], ['niddkWeight', 'hhsActivity', 'dietaryGuidelines']);

// Heart Rate
p('Heart Rate', 'heart-rate-variability-hrv', 'Heart-rate variability (HRV)', 'HRV is the variation in timing between heartbeats and reflects autonomic regulation; it is not the same as heart rate and has no universal ideal number.', [
  'Device, measurement position, time of day, breathing, sleep, alcohol, illness, and training affect the reading.',
  'Values differ greatly between people, so personal trends under consistent conditions are more useful than rankings.',
  'A lower day can reflect normal stress and does not diagnose overtraining or heart disease.'
], ['Use the same validated device and measurement routine.', 'Compare weekly trends with sleep, illness, training, and how you feel.', 'Reduce training load when multiple recovery signs—not HRV alone—suggest a need.'], ['Do not compare wrist and chest-device values as interchangeable.', 'Do not use HRV to diagnose an arrhythmia or ignore heart symptoms.'], ['ahaHeartRate', 'hhsActivity']);

p('Heart Rate', 'how-to-lower-resting-heart-rate', 'How to lower resting heart rate', 'Regular aerobic training can lower resting heart rate over time by improving cardiovascular efficiency, but genetics, medication, illness, stress, and sleep also affect it.', [
  'A low resting heart rate can be normal in trained people but concerning when accompanied by symptoms.',
  'Measurement is most consistent after waking or after several quiet seated minutes.',
  'Changes usually occur across weeks and months rather than after one workout.'
], ['Measure under similar resting conditions and track the trend.', 'Build toward regular moderate aerobic activity and include recovery.', 'Address smoking, sleep, hydration, stress, and medication questions with appropriate support.'], ['Do not chase the lowest possible number.', 'Seek care for fainting, chest pain, severe weakness, or a new unusually slow or fast rate.'], ['ahaHeartRate', 'hhsActivity', 'cdcActivity']);

p('Heart Rate', 'maximum-heart-rate-by-age', 'Maximum heart rate by age', 'Age-based formulas estimate average maximum heart rate for populations; an individual maximum can be meaningfully higher or lower.', [
  'The common 220-minus-age formula is simple but has substantial individual error.',
  'Medication, testing mode, training, and medical conditions can affect observed peak heart rate.',
  'Training zones calculated from an estimate should be checked against breathing, perceived effort, and symptoms.'
], ['Use an age formula only as a starting estimate.', 'Begin training below maximal effort and compare the zone with perceived intensity.', 'Use supervised testing when an accurate maximum is important and medically appropriate.'], ['Do not perform an unsupervised maximal test when untrained or medically at risk.', 'Do not treat failure to reach the formula as proof of poor fitness.'], ['ahaHeartRate', 'hhsActivity']);

p('Heart Rate', 'resting-heart-rate-normal', 'Normal resting heart rate', 'A typical adult resting heart rate is often described as 60–100 beats per minute, but fitness, medication, age, illness, and symptoms determine the meaning.', [
  'Trained adults may have rates below 60 without a problem.',
  'Fever, dehydration, stress, caffeine, pain, and recent activity can temporarily raise the rate.',
  'Rhythm, symptoms, and change from personal baseline can matter more than category alone.'
], ['Rest quietly for several minutes and count accurately or use a suitable device.', 'Repeat at the same time on several days.', 'Discuss a sustained change or symptoms with a clinician.'], ['Do not diagnose fitness or disease from one reading.', 'Seek urgent care for chest pressure, fainting, severe breathlessness, or a rapid or irregular rate with symptoms.'], ['ahaHeartRate']);

p('Heart Rate', 'target-heart-rate-zones', 'Target heart-rate zones', 'Target heart-rate zones organise exercise intensity as a percentage of estimated maximum or heart-rate reserve, but the boundaries are approximate.', [
  'Moderate activity usually allows conversation, while vigorous work makes speech more difficult.',
  'Heart-rate reserve uses resting and maximum rates and can better reflect individual baseline.',
  'Heat, dehydration, caffeine, medication, cardiac conditions, and sensor error can shift the reading.'
], ['Estimate maximum and record a true resting heart rate if using reserve.', 'Match the zone with perceived effort and breathing.', 'Spend most early training at manageable intensities before adding hard intervals.'], ['Do not ignore symptoms because the watch says the heart rate is “in zone.”', 'Ask a clinician for tailored zones when taking rate-limiting medication or managing heart disease.'], ['ahaHeartRate', 'hhsActivity']);

// Hydration
p('Hydration', 'benefits-of-drinking-more-water', 'Benefits of drinking more water', 'Drinking more water is helpful when it corrects inadequate intake or replaces high-sugar drinks, but forcing extra fluid beyond need does not create unlimited health benefits.', [
  'Water supports temperature regulation, circulation, digestion, and normal cellular function.',
  'Food and other beverages contribute to total water intake, so plain-water volume is not the entire hydration picture.',
  'Improved alertness or headache may occur when dehydration was the cause, but these symptoms have many other causes.'
], ['Keep water accessible and drink with meals and activity.', 'Use thirst, urine pattern, weather, and sweat as practical feedback.', 'Replace one frequent sugary drink with water or an unsweetened option.'], ['Do not force large volumes rapidly or use water as a meal replacement.', 'Follow medical fluid restrictions rather than general advice.'], ['nasWater', 'dietaryGuidelines']);

p('Hydration', 'best-hydrating-foods', 'Best hydrating foods', 'Fruit, vegetables, soups, yogurt, and cooked grains can contribute meaningful water along with nutrients, but no single food replaces fluid during substantial sweat loss.', [
  'Cucumber, tomatoes, melon, berries, oranges, lettuce, and similar produce contain a high proportion of water.',
  'Soups and dairy can provide fluid and electrolytes, while sodium and added sugar vary by product.',
  'Food moisture is included in total-water reference intakes.'
], ['Add produce to meals and snacks you already eat.', 'Use soup, yogurt, fruit, or vegetables when appetite and hydration both need support.', 'Drink additional fluid during heat, illness, or exercise according to need.'], ['Do not rely on watery foods alone during prolonged heavy sweating.', 'Use safe food handling and consider sodium, sugar, allergy, and medical restrictions.'], ['nasWater', 'foodData', 'dietaryGuidelines']);

p('Hydration', 'does-drinking-water-help-weight-loss', 'Does drinking water help weight loss?', 'Water can support weight management when it replaces caloric beverages or helps a person follow regular meals, but water itself does not directly dissolve body fat.', [
  'Drinking water before meals may help some people feel fuller, but responses vary.',
  'Replacing sugary drinks can reduce energy intake without changing solid-food portions.',
  'Short-term scale changes after drinking or sweating reflect fluid, not fat gain or loss.'
], ['Track beverage calories and identify the easiest replacement.', 'Drink according to thirst and keep normal hydration during a calorie deficit.', 'Judge progress from multi-week weight trends rather than immediate water shifts.'], ['Do not overdrink to suppress hunger or replace nutritionally needed meals.', 'Do not use dehydration, sweating, or diuretics as weight-loss methods.'], ['nasWater', 'niddkWeight']);

p('Hydration', 'hydration-during-exercise', 'Hydration during exercise', 'Exercise fluid needs depend on session length, intensity, climate, clothing, body size, acclimatisation, and individual sweat rate.', [
  'For many shorter sessions, drinking to thirst and starting normally hydrated is adequate.',
  'Long hot sessions may require a planned balance of fluid and sodium based on sweat loss.',
  'Gaining body weight during endurance activity can indicate overdrinking and increased hyponatraemia risk.'
], ['Start the session hydrated without forcing excess fluid.', 'For prolonged exercise, compare before-and-after body weight to estimate net sweat loss.', 'Practise the fluid and electrolyte plan in training rather than first using it on event day.'], ['Do not drink beyond sweat losses or ignore nausea, confusion, headache, and swelling.', 'Seek individual guidance for kidney, heart, endocrine, or medication-related fluid issues.'], ['nasWater', 'hhsActivity']);

p('Hydration', 'signs-of-dehydration', 'Signs of dehydration', 'Thirst, dry mouth, darker urine, reduced urination, headache, dizziness, and fatigue can occur with dehydration, but no single sign is specific.', [
  'Infants, older adults, people with fever or diarrhoea, and those working in heat can deteriorate more quickly.',
  'Urine colour is a practical general clue but is affected by vitamins, foods, medicines, and illness.',
  'Confusion, fainting, inability to drink, very low urine output, or severe weakness can indicate urgent illness.'
], ['Consider recent fluid loss, heat, activity, urine, thirst, and symptoms together.', 'Use small frequent fluids when tolerated and appropriate.', 'Seek medical advice when losses continue or oral fluid cannot be kept down.'], ['Do not assume every headache or dark urine is simple dehydration.', 'Do not delay urgent care for confusion, fainting, shock signs, or severe ongoing vomiting or diarrhoea.'], ['nasWater']);

// Lifestyle & Habits
p('Lifestyle & Habits', 'alcohol-effects-on-health-and-weight', 'Alcohol, health, and body weight', 'Alcohol affects judgement, sleep, liver and cardiovascular health, cancer risk, medication safety, and energy intake; no amount is required for health.', [
  'Alcohol provides about seven calories per gram before mixers or food eaten alongside it are counted.',
  'It can reduce sleep quality even when it makes falling asleep feel easier.',
  'Risk depends on amount, pattern, individual health, pregnancy, medication, driving, and family or personal history.'
], ['Measure actual drinks and compare them with standard serving sizes.', 'Choose alcohol-free days and alternatives that fit social settings.', 'Ask a clinician for help reducing safely if withdrawal or loss of control is possible.'], ['Do not start drinking for a claimed heart benefit.', 'Never combine alcohol with driving, pregnancy, contraindicated medicines, or activities requiring safe coordination.'], ['cdcAlcohol', 'nhlbiSleepEffects']);

p('Lifestyle & Habits', 'date-difference-calculator-guide', 'How a date-difference calculator works', 'A date-difference calculator counts elapsed calendar time between two dates, but results depend on whether endpoints, time zones, and calendar units are included.', [
  'Months and years have unequal lengths, so “one month” is not a fixed number of days.',
  'Inclusive counting adds both the start and end date, while elapsed time normally excludes the starting instant.',
  'Daylight-saving and time-zone changes matter when times—not only dates—are compared.'
], ['Choose whether the question needs calendar units or total days.', 'Confirm date format, time zone, and inclusive or exclusive counting.', 'Check a known example before using the result for legal, financial, or medical deadlines.'], ['Do not assume every month equals 30 days.', 'Use the responsible authority for official deadlines rather than relying only on a general tool.'], ['ecmaDate'], { guidance: 'For legal, immigration, employment, medication, pregnancy, or financial deadlines, confirm the rule with the responsible professional or institution.' });

p('Lifestyle & Habits', 'healthy-morning-routine-guide', 'A healthy morning routine', 'A useful morning routine reduces friction around sleep timing, light, food, movement, medication, and the first important task; it does not need to begin before sunrise.', [
  'Consistent wake time and morning light help anchor the circadian rhythm.',
  'The best routine fits work, caregiving, disability, culture, and sleep need.',
  'A short repeatable sequence is more sustainable than a long checklist copied from someone else.'
], ['Choose a consistent wake window and get daylight when possible.', 'Prepare one nourishing meal, movement, or planning action the night before.', 'Keep a minimum five-minute version for difficult mornings.'], ['Do not sacrifice needed sleep to perform an elaborate routine.', 'Do not treat a missed morning as failure or use wellness habits to avoid medical care.'], ['nhlbiSleep', 'hhsActivity']);

p('Lifestyle & Habits', 'how-age-calculator-works', 'How an age calculator works', 'An age calculator subtracts a birth date from a reference date using calendar years, months, and days, borrowing across months of unequal length when needed.', [
  'Age changes at the anniversary of the birth date rather than at the start of the calendar year.',
  'Leap-day birthdays require a rule for non-leap years in legal or administrative settings.',
  'Time zone and exact time of birth matter only when precise elapsed hours or days are required.'
], ['Enter dates in an unambiguous format and verify the reference date.', 'Choose completed years for ordinary age reporting.', 'Confirm jurisdiction-specific rules for eligibility or legal age.'], ['Do not use an online age tool as the final authority for legal deadlines.', 'Protect birth-date information because it is personal data.'], ['ecmaDate'], { guidance: 'For school, insurance, immigration, employment, legal eligibility, or clinical age cutoffs, confirm the official calculation rule with the responsible institution.' });

p('Lifestyle & Habits', 'how-birthday-calculator-works', 'How a birthday calculator works', 'A birthday calculator finds the next calendar occurrence of a birth month and day, then compares it with the current date to report remaining time and sometimes weekday.', [
  'The result changes with the user’s time zone and whether the current day is counted.',
  'Leap-day birthdays need a chosen convention in non-leap years.',
  'Day-of-week calculations follow the selected calendar and local date.'
], ['Confirm the current date and time zone.', 'Check how the tool handles today and leap-day birthdays.', 'Use calendar reminders rather than relying on a one-time result.'], ['Do not share another person’s full birth date without permission.', 'Do not treat a novelty result as an official legal-age calculation.'], ['ecmaDate'], { guidance: 'Use official records and local rules when a birth date affects identity, eligibility, benefits, or a legal deadline.' });

p('Lifestyle & Habits', 'how-to-quit-sugar-21-days', 'Reducing added sugar over 21 days', 'A 21-day plan can start a lower-sugar routine, but it does not “detox” the body or guarantee that cravings disappear on a fixed date.', [
  'Added sugars are concentrated in sweetened drinks, desserts, flavoured dairy, sauces, and many packaged foods.',
  'Whole fruit contains natural sugar with water, fibre, and nutrients and usually does not need to be eliminated.',
  'Regular meals, sleep, protein, fibre, and the food environment can make cravings easier to manage.'
], ['Days 1–7: identify the largest added-sugar sources and read labels.', 'Days 8–14: replace one frequent source and plan satisfying meals.', 'Days 15–21: practise social situations and choose a sustainable limit rather than total prohibition.'], ['Do not label all carbohydrates or fruit as sugar that must be removed.', 'Avoid rigid rules that trigger bingeing, guilt, or inadequate intake.'], ['whoSugar', 'fdaLabels', 'dietaryGuidelines']);

// Macronutrients
p('Macronutrients', 'best-post-workout-meals', 'Best post-workout meals', 'A post-workout meal should support recovery with protein, carbohydrate, fluid, and enough total daily energy; the exact choice depends on session demands and the next training time.', [
  'Protein supports muscle repair, while carbohydrate replenishes glycogen used during longer or harder exercise.',
  'The total daily pattern matters more than consuming a supplement within a few minutes.',
  'After light activity, the next normal balanced meal is often sufficient.'
], ['Choose a practical protein source and carbohydrate-rich food.', 'Add fluid and sodium according to sweat and conditions.', 'Use a larger or faster-digesting meal when another demanding session is soon.'], ['Do not treat a recovery shake as required after every easy workout.', 'Do not ignore allergy, digestive tolerance, diabetes medication, or overall calorie goals.'], ['dietaryGuidelines', 'foodData', 'ods']);

p('Macronutrients', 'best-pre-workout-meals', 'Best pre-workout meals', 'Pre-workout food should provide comfortable energy without causing digestive distress, and its size and composition depend on timing and exercise intensity.', [
  'Carbohydrate is a useful fuel for moderate-to-high intensity work.',
  'Protein before training can contribute to daily needs, while very high fat or fibre close to exercise may slow digestion.',
  'Some people tolerate a full meal several hours before; others prefer a small snack closer to training.'
], ['Choose familiar foods and allow enough digestion time.', 'Use a smaller carbohydrate-focused snack when training begins soon.', 'Practise timing in ordinary sessions before competition.'], ['Do not test unfamiliar supplements or large meals on event day.', 'People using glucose-lowering medicine need an individual fuelling plan.'], ['dietaryGuidelines', 'foodData']);

p('Macronutrients', 'carbohydrates-good-vs-bad', '“Good” versus “bad” carbohydrates', 'Carbohydrate foods differ in fibre, processing, added sugar, portion, and nutrient content, so a simple good-versus-bad label hides useful distinctions.', [
  'Whole grains, legumes, fruit, vegetables, and dairy can provide carbohydrate with fibre or nutrients.',
  'Refined grains and added sugars are easier to overconsume when they dominate the diet, but context and frequency matter.',
  'Athletes or people treating low glucose may appropriately use faster-digesting carbohydrate.'
], ['Choose mostly fibre-rich carbohydrate sources at regular meals.', 'Read serving size, fibre, and added sugar rather than judging by marketing words.', 'Match portions and timing to activity, appetite, and medical needs.'], ['Do not eliminate all carbohydrate because some foods are highly processed.', 'Do not assume “natural sugar” on a package is metabolically free or unlimited.'], ['dietaryGuidelines', 'fdaLabels', 'foodData']);

p('Macronutrients', 'fiber-why-not-getting-enough', 'Why many diets are low in fibre', 'Fibre intake is often low when meals rely on refined grains, meat, cheese, snacks, and drinks while including few legumes, whole grains, vegetables, fruit, nuts, and seeds.', [
  'Different fibres support stool bulk, fermentation, cholesterol management, and glucose response in different ways.',
  'Increasing fibre too quickly can cause gas, bloating, or discomfort.',
  'Adequate fluid and gradual change help, while some digestive conditions require tailored fibre type and amount.'
], ['Estimate current fibre from labels and common foods.', 'Add one serving of legumes, whole grain, produce, nuts, or seeds at a time.', 'Increase gradually and monitor bowel pattern and comfort.'], ['Do not use large fibre supplements without checking fluid, medicine timing, and symptoms.', 'Seek care for blood in stool, unexplained weight loss, severe pain, or persistent bowel change.'], ['dietaryGuidelines', 'foodData']);

p('Macronutrients', 'healthy-fats-vs-unhealthy-fats', 'Healthy and less healthy dietary fats', 'Unsaturated fats from fish, nuts, seeds, avocado, and plant oils generally support a heart-healthy pattern, while saturated and trans fats should be limited in context.', [
  'Fat provides essential fatty acids, supports vitamin absorption, and contributes flavour and fullness.',
  'Replacing saturated fat with unsaturated fat is different from simply adding more fat to the same diet.',
  'All fats are energy-dense, so portions still matter for an energy goal.'
], ['Use olive or other unsaturated plant oils in place of butter where practical.', 'Include fish, nuts, seeds, or avocado in sensible portions.', 'Read labels for saturated fat and partially hydrogenated oils.'], ['Do not treat “healthy fat” as calorie-free.', 'Do not replace saturated fat mainly with refined starch and added sugar.'], ['dietaryGuidelines', 'fdaLabels', 'odsOmega3']);

p('Macronutrients', 'how-to-calculate-macros-weight-loss', 'How to calculate macros for weight loss', 'A macro target divides an estimated calorie range among protein, carbohydrate, and fat; it is a planning framework, not a guarantee of fat loss.', [
  'Protein can support fullness and lean-tissue retention, while minimum fat and varied carbohydrate sources support diet quality and training.',
  'Different macro ratios can work when total intake, nutrition, and adherence are appropriate.',
  'Food labels and tracking have measurement error, so exact gram precision is unnecessary.'
], ['Estimate maintenance and choose a moderate calorie deficit.', 'Set a reasonable protein range, then allocate fat and carbohydrate to preference and activity.', 'Track the weekly pattern and adjust based on hunger, performance, and weight trend.'], ['Do not set fat or carbohydrate near zero without a clinical reason.', 'Avoid macro tracking when it worsens obsessive or disordered eating.'], ['niddkPlanner', 'dietaryGuidelines', 'foodData']);

p('Macronutrients', 'how-to-read-nutrition-labels', 'How to read Nutrition Facts labels', 'Nutrition Facts labels help compare serving size, calories, nutrients, and added sugars, but the listed serving may not match the amount actually eaten.', [
  'Percent Daily Value is a reference for comparing foods, not an individual prescription.',
  'Ingredients are listed by weight, while allergen statements and claims provide different information.',
  '“Natural,” “multigrain,” and front-of-pack health words do not replace reading the full label.'
], ['Check serving size and servings per container first.', 'Compare fibre, added sugar, sodium, saturated fat, and nutrients relevant to your needs.', 'Use the ingredient and allergen lists to answer questions the nutrient panel cannot.'], ['Do not compare products using different serving sizes without converting them.', 'Do not rely on one nutrient claim to decide whether the whole food fits your diet.'], ['fdaLabels', 'dietaryGuidelines']);

p('Macronutrients', 'micronutrients-vs-macronutrients', 'Micronutrients versus macronutrients', 'Macronutrients are needed in larger amounts and provide energy or building material; vitamins and minerals are micronutrients needed in smaller amounts for specific functions.', [
  'Protein, carbohydrate, and fat are macronutrients; vitamins and minerals do not provide calories.',
  'A diet can meet calories and macros while still lacking important micronutrients.',
  'Supplements can help a diagnosed or predictable gap but do not reproduce the full value of varied food.'
], ['Build meals from several food groups and colours across the week.', 'Use labels or a short food record to identify likely gaps.', 'Confirm suspected deficiency with appropriate clinical assessment before high-dose supplements.'], ['Do not assume more of a vitamin is always safer or better.', 'Check supplement interactions, pregnancy limits, and upper intake levels.'], ['dietaryGuidelines', 'ods']);

p('Macronutrients', 'sugar-addiction-reduce-sugar', 'Sugar cravings and reducing added sugar', 'People can experience strong learned cravings and loss-of-control eating around sweet foods, but “sugar addiction” is not diagnosed by liking sugar or eating dessert.', [
  'Restriction, irregular meals, stress, sleep loss, and a highly available food environment can intensify cravings.',
  'Added sugar is different from sugar naturally present in whole fruit and unsweetened dairy.',
  'Reducing frequent sweet drinks and packaged snacks can be more sustainable than banning every sweet taste.'
], ['Eat regular satisfying meals with protein and fibre.', 'Identify the time, cue, and food linked to the strongest craving.', 'Change access or portion and plan an alternative without using shame.'], ['Do not use extreme restriction that leads to binge-restrict cycles.', 'Seek eating-disorder or mental-health support when eating feels uncontrollable or causes distress and impairment.'], ['whoSugar', 'dietaryGuidelines', 'nimhHelp']);

p('Macronutrients', 'what-are-macronutrients', 'What are macronutrients?', 'Protein, carbohydrate, and fat are the main macronutrients; the body needs them in relatively large amounts for energy, structure, and normal function.', [
  'Protein and carbohydrate provide about four calories per gram, while fat provides about nine; alcohol provides energy but is not an essential nutrient.',
  'Each macronutrient category contains foods with very different fibre, fatty-acid, amino-acid, vitamin, and mineral profiles.',
  'The best ratio depends on total energy, activity, health, preference, and the quality of food choices.'
], ['Estimate needs from the whole dietary pattern rather than choosing a trendy ratio.', 'Include a protein source, fibre-rich carbohydrate, and appropriate fats across meals.', 'Adjust portions using appetite, performance, health markers, and goals.'], ['Do not eliminate an entire macronutrient without a clear reason and adequate planning.', 'Do not judge food quality only by macro numbers.'], ['dietaryGuidelines', 'foodData']);

// Mental Health
p('Mental Health', 'exercise-reduces-stress-anxiety', 'Exercise for stress and anxiety', 'Regular physical activity can reduce stress and anxiety symptoms for many people and support sleep and confidence, but it is not a substitute for all mental-health treatment.', [
  'Even short bouts of movement can provide immediate mood and anxiety benefits.',
  'Enjoyable moderate activity may be easier to maintain than punishing high-intensity sessions.',
  'Anxiety can also cause exercise-like sensations, so gradual exposure and a safe plan may help.'
], ['Choose a familiar five- to twenty-minute activity.', 'Schedule it consistently and track mood before and after without demanding a perfect change.', 'Build toward public-health activity guidance as tolerance improves.'], ['Do not use exercise as punishment or train compulsively to manage every emotion.', 'Seek professional care when anxiety is persistent, severe, or impairing daily life.'], ['hhsActivity', 'nimhStress', 'nimhHelp']);

p('Mental Health', 'how-to-build-healthy-habits', 'How to build healthy habits', 'Healthy habits become more repeatable when the cue, action, reward, and environment are designed clearly rather than left to motivation.', [
  'A small action performed consistently creates useful evidence and reduces the effort of starting.',
  'Specific context—after breakfast, at lunch, beside the bed—works better than “sometime today.”',
  'Missed days are normal; recovery speed matters more than maintaining a perfect streak.'
], ['Choose one behaviour and define its minimum version.', 'Attach it to a reliable cue and prepare the environment.', 'Review weekly, celebrate completion, and adjust barriers.'], ['Do not add many major habits at once.', 'Do not turn a tracking streak into shame, punishment, or unsafe persistence.'], ['nimhStress', 'hhsActivity']);

p('Mental Health', 'how-to-stay-consistent-with-fitness', 'How to stay consistent with fitness', 'Fitness consistency improves when the programme fits real time, access, enjoyment, health, and recovery and includes a smaller fallback option for difficult days.', [
  'A scheduled moderate plan is easier to repeat than relying on spontaneous motivation.',
  'Environment and social support often matter more than willpower.',
  'Progress naturally includes interruptions from illness, travel, caregiving, work, and stress.'
], ['Choose specific training days and a minimum ten-minute version.', 'Prepare clothing, transport, or home space before the session.', 'Restart with reduced volume after interruptions instead of compensating.'], ['Do not treat one missed week as total failure.', 'Do not preserve a streak by training through illness, injury, or severe exhaustion.'], ['hhsActivity', 'cdcActivity']);

p('Mental Health', 'meditation-for-beginners', 'Meditation for beginners', 'Meditation trains attention and awareness through practices such as breath focus, body scan, or open monitoring; it is a skill, not a requirement to stop all thoughts.', [
  'Brief regular practice can be more approachable than long sessions.',
  'Mindfulness may help stress, anxiety, sleep, or pain for some people, while evidence and response vary by condition.',
  'Meditation can feel uncomfortable or intensify symptoms for some trauma or psychiatric experiences.'
], ['Set a timer for two to five minutes in a quiet enough place.', 'Notice a chosen anchor and gently return when attention wanders.', 'Increase duration only if the practice remains useful and tolerable.'], ['Do not judge normal mind wandering as failure.', 'Stop and seek appropriate support if practice triggers severe distress, dissociation, panic, or worsening symptoms.'], ['nccihMeditation', 'nimhHelp']);

p('Mental Health', 'mindful-eating-emotional-eating', 'Mindful eating and emotional eating', 'Mindful eating brings non-judgemental attention to hunger, fullness, taste, pace, emotion, and context; it does not require perfect intuitive control.', [
  'Emotional eating can be a learned coping response and is not evidence of weak character.',
  'Restriction and irregular meals can increase vulnerability to loss-of-control eating.',
  'Mindfulness may create a pause, but the underlying stressor or eating disorder may still need treatment.'
], ['Eat one meal without optional screens and notice physical and emotional cues.', 'Use regular adequate meals to reduce extreme hunger.', 'Name the emotion and choose from food plus other coping options without shame.'], ['Do not use mindful eating to justify further restriction.', 'Seek specialist care for bingeing, purging, severe restriction, rapid weight change, or significant distress.'], ['nccihMeditation', 'nimhHelp']);

p('Mental Health', 'morning-routines-healthy-people', 'Morning routines for wellbeing', 'There is no universal routine shared by all healthy people; the useful routine supports adequate sleep and the responsibilities, values, and health needs of the individual.', [
  'Consistent wake timing and morning light can support the body clock.',
  'Food, medication, movement, and planning needs differ by person and schedule.',
  'A routine should reduce decision burden, not create a new performance contest.'
], ['Protect sufficient sleep before adding early activities.', 'Choose one anchor such as light, medication, breakfast, or planning.', 'Create a short version for weekends, illness, or demanding days.'], ['Do not copy extreme wake times that reduce sleep.', 'Do not interpret a disrupted routine as a moral failure or ignore symptoms needing care.'], ['nhlbiSleep', 'nimhStress']);

p('Mental Health', 'sleep-affects-mental-health', 'How sleep affects mental health', 'Sleep and mental health influence each other: insufficient or disrupted sleep can worsen emotion regulation and concentration, while anxiety, depression, trauma, and other conditions can disrupt sleep.', [
  'Sleep deficiency can increase irritability, impulsivity, low mood, and difficulty coping.',
  'Improving sleep opportunity may support wellbeing but does not replace treatment for a mental-health condition.',
  'Persistent insomnia and severe daytime sleepiness deserve assessment.'
], ['Keep a consistent wake time and record sleep and mood patterns.', 'Reduce late caffeine, alcohol, and optional screen use.', 'Discuss persistent symptoms with a clinician or mental-health professional.'], ['Do not blame all mental-health symptoms on sleep alone.', 'Seek urgent help for self-harm thoughts, mania, psychosis, or immediate safety risk.'], ['nhlbiSleepEffects', 'nimhHelp']);

// Mental Health & Productivity
p('Mental Health & Productivity', 'burnout-symptoms-and-recovery', 'Burnout symptoms and recovery', 'Burnout describes exhaustion, cynicism or detachment, and reduced effectiveness related to chronic unmanaged occupational stress; it is not a personal failure.', [
  'Burnout symptoms overlap with depression, anxiety, sleep disorders, medical illness, and unsafe workload.',
  'Individual coping cannot fully solve organisational causes such as impossible demands, low control, unfairness, or harassment.',
  'Recovery often requires workload change, rest, boundaries, support, and sometimes professional care.'
], ['Identify the main demand, what can change, and who has authority to change it.', 'Protect sleep, meals, movement, and genuine time away from work.', 'Discuss workload, leave, role clarity, or accommodations with the appropriate person.'], ['Do not self-diagnose every fatigue symptom as burnout.', 'Seek clinical help for persistent low mood, severe anxiety, substance use, inability to function, or self-harm thoughts.'], ['nimhStress', 'nimhHelp']);

p('Mental Health & Productivity', 'dopamine-detox-complete-guide', 'The “dopamine detox” idea', 'A dopamine detox does not remove dopamine from the brain; the useful part is temporarily reducing high-frequency cues so attention and habits can be redesigned.', [
  'Dopamine is essential for movement, learning, motivation, and reward and is not a toxin.',
  'Compulsive checking is reinforced by cues, variable rewards, stress relief, and easy access.',
  'A planned screen or entertainment break can reveal triggers without requiring deprivation from food, exercise, or social contact.'
], ['Choose one problematic behaviour and a defined reduction period.', 'Remove cues, add friction, and prepare a replacement activity.', 'Review what improved and create a sustainable access rule.'], ['Do not fast, isolate, stop medication, or avoid all pleasure in the name of detoxing dopamine.', 'Seek mental-health support when compulsive behaviour causes major impairment or distress.'], ['nimhStress', 'nimhHelp']);

p('Mental Health & Productivity', 'how-to-improve-focus-and-concentration', 'How to improve focus and concentration', 'Concentration improves when tasks are clear, distractions are controlled, breaks are planned, and sleep and health needs are addressed.', [
  'Attention naturally fluctuates and is limited by unclear priorities, multitasking, interruption, fatigue, anxiety, pain, and medication.',
  'A single-task environment reduces switching costs more reliably than motivation hacks.',
  'Sudden or persistent concentration change can signal a medical or mental-health issue.'
], ['Define the next visible action and a short work interval.', 'Remove notifications and keep only required materials open.', 'Take a real break, then review which distractions or symptoms remain.'], ['Do not use excessive caffeine, stimulants, or sleep loss to extend focus.', 'Seek assessment when change is sudden, severe, or accompanied by neurological or mental-health symptoms.'], ['nimhStress', 'nhlbiSleepEffects', 'nimhHelp']);

p('Mental Health & Productivity', 'productivity-score-and-improvement', 'Productivity scores and improvement', 'A productivity score combines selected behaviours or outputs into one number, but the result reflects the scoring rules and cannot measure a person’s worth or all valuable work.', [
  'Output count can reward easy tasks while hiding quality, complexity, caregiving, collaboration, or recovery.',
  'A score becomes more useful when tied to a clear purpose and reviewed with context.',
  'Trends within the same system are more interpretable than comparisons between people.'
], ['Define the outcome and choose two or three meaningful inputs.', 'Track for a short period without changing behaviour.', 'Review the trend with quality, workload, health, and satisfaction before adjusting.'], ['Do not optimise the score at the expense of important unmeasured work.', 'Do not use a self-assessment to diagnose ADHD, depression, burnout, or another condition.'], ['nimhStress', 'nimhHelp']);

p('Mental Health & Productivity', 'stress-level-test-meaning', 'What a stress-level test means', 'An online stress test can organise self-reported symptoms and triggers, but it cannot measure cortisol, diagnose a disorder, or determine treatment.', [
  'Results depend on the questions, time period, scoring thresholds, and honest self-report.',
  'Physical illness, sleep loss, anxiety, depression, substance use, and unsafe circumstances can produce overlapping symptoms.',
  'The most useful result identifies patterns and prompts an appropriate next step.'
], ['Answer for the stated time period rather than only the worst day.', 'Review which items drive the score and what stressors they reflect.', 'Use the result to plan support, workload change, or professional assessment.'], ['Do not label yourself from one score or use it as a cortisol test.', 'Seek urgent help for self-harm thoughts, inability to stay safe, or severe physical symptoms.'], ['nimhStress', 'nimhHelp']);

p('Mental Health & Productivity', 'work-life-balance-practical-guide', 'Practical work-life balance', 'Work-life balance means allocating time, energy, boundaries, and recovery in a way that is sustainable for the current season; it is not a perfect daily split.', [
  'Workload, control, financial pressure, caregiving, commute, health, and workplace culture affect what is possible.',
  'Boundaries work best when specific, communicated, and supported by systems.',
  'Recovery requires genuine psychological detachment, not only switching to household tasks.'
], ['Map fixed responsibilities and identify the most harmful spillover.', 'Set one boundary with a time, communication rule, or workload decision.', 'Review with family, manager, or support person and revise what is unrealistic.'], ['Do not treat an impossible workload as a personal time-management failure.', 'Seek support for harassment, unsafe work, severe burnout symptoms, or mental-health deterioration.'], ['nimhStress', 'nimhHelp']);

// Nutrition & Diet
p('Nutrition & Diet', 'anti-inflammatory-diet-guide', 'An anti-inflammatory eating pattern', 'An anti-inflammatory diet is a varied eating pattern rich in plants, fibre, unsaturated fats, and minimally processed foods—not a detox or a cure for every inflammatory condition.', [
  'Vegetables, fruit, legumes, whole grains, nuts, seeds, fish, and olive oil fit common heart-healthy patterns.',
  'Inflammation is a normal immune process, and blood markers or symptoms require clinical interpretation.',
  'Removing many foods without evidence can reduce variety and create nutritional gaps.'
], ['Add colourful produce and a fibre-rich plant food to regular meals.', 'Replace some saturated fat and refined snacks with fish, nuts, seeds, or unsaturated oils.', 'Track symptoms with a clinician when evaluating a diagnosed condition.'], ['Do not promise that one food cures autoimmune disease or chronic pain.', 'Avoid broad elimination diets without a plan to test, reintroduce, and maintain nutrition.'], ['dietaryGuidelines', 'odsOmega3']);

p('Nutrition & Diet', 'best-vitamins-for-energy-and-health', 'Vitamins for energy and health', 'Vitamins help enzymes and cells perform normal functions, but they do not provide calories or act as stimulants; supplements improve energy mainly when they correct a deficiency.', [
  'Iron, vitamin B12, folate, vitamin D, thyroid disease, sleep, infection, mood, and many other factors can relate to fatigue.',
  'Needs differ by age, pregnancy, diet, absorption, medicine, and health history.',
  'High doses can cause toxicity or interact with medicines even when sold without prescription.'
], ['Review diet, sleep, symptoms, medicines, and risk factors before choosing a product.', 'Use appropriate testing when deficiency is suspected.', 'Choose a dose near recognised needs unless a clinician prescribes otherwise.'], ['Do not treat persistent or severe fatigue with supplements alone.', 'Avoid megadoses and check pregnancy, liver, kidney, bleeding, and medicine interactions.'], ['ods', 'dietaryGuidelines']);

p('Nutrition & Diet', 'daily-sodium-intake-guide', 'Daily sodium intake', 'Sodium is essential for fluid and nerve function, but high average intake can raise blood pressure in many people; most dietary sodium comes from packaged and restaurant food.', [
  'Salt and sodium are related but not identical: sodium is one component of table salt.',
  'Labels list milligrams of sodium per serving, and the actual portion may contain several servings.',
  'Sweat loss, blood pressure, kidney or heart disease, and medication can change individual advice.'
], ['Compare sodium per serving across frequently eaten foods.', 'Use herbs, spices, acid, and gradual reduction to maintain flavour.', 'Discuss a suitable target when managing blood pressure or fluid balance.'], ['Do not assume sea salt, pink salt, or “natural” salt is sodium-free.', 'Do not aggressively restrict sodium during prolonged heavy sweating without an appropriate plan.'], ['dietaryGuidelines', 'fdaLabels', 'ahaBloodPressure']);

p('Nutrition & Diet', 'gut-health-and-weight-loss', 'Gut health and weight loss', 'Gut microbes participate in digestion and metabolism, but current microbiome science does not support a universal bacteria profile or supplement that guarantees weight loss.', [
  'Dietary fibre, varied plant foods, sleep, medication, illness, and environment influence the gut ecosystem.',
  'Weight change still depends on the broader energy and behaviour pattern.',
  'Probiotic effects are strain- and condition-specific rather than interchangeable across products.'
], ['Increase varied fibre-rich foods gradually as tolerated.', 'Include fermented foods if enjoyed and medically appropriate.', 'Track digestive symptoms separately from scale weight and seek assessment when persistent.'], ['Do not buy expensive microbiome tests expecting a precise weight-loss diet.', 'Seek care for blood in stool, severe pain, persistent diarrhoea, fever, or unexplained loss.'], ['dietaryGuidelines', 'ods']);

p('Nutrition & Diet', 'how-to-track-macros-guide', 'How to track macros', 'Macro tracking estimates grams of protein, carbohydrate, and fat from portions and labels; it can support planning but has measurement error and is not necessary for everyone.', [
  'A food scale improves consistency for calorie-dense or unfamiliar foods, while labels and database entries still vary.',
  'Restaurant meals, recipes, cooking fats, and raw-versus-cooked entries are common error sources.',
  'Weekly adherence and diet quality matter more than hitting each gram exactly.'
], ['Set ranges rather than exact single-number targets.', 'Build several repeatable meals and verify the entries used most often.', 'Review hunger, training, digestion, and weight trend before changing targets.'], ['Do not let tracking create guilt, social avoidance, or compulsive checking.', 'Do not use a general app target for pregnancy, disease treatment, or eating-disorder recovery.'], ['foodData', 'fdaLabels', 'dietaryGuidelines']);

p('Nutrition & Diet', 'omega-3-fatty-acids-complete-guide', 'Omega-3 fatty acids', 'Omega-3 fats include ALA from plant foods and EPA and DHA mainly from seafood and algae; they have different roles and conversion between forms is limited.', [
  'Fatty fish, some seafood, walnuts, chia, flax, canola oil, and algae products are common sources.',
  'Supplements vary in EPA and DHA dose, oxidation, purity, and claims.',
  'Omega-3 intake can support a healthy dietary pattern but does not replace prescribed cardiovascular treatment.'
], ['Include seafood according to dietary guidance or use suitable plant sources.', 'Check the EPA and DHA amount rather than only total fish-oil weight.', 'Discuss supplements when pregnant, taking anticoagulants, or treating high triglycerides.'], ['Do not assume more fish oil is always better.', 'Check allergy, bleeding, medicine, contaminant, and pregnancy considerations.'], ['odsOmega3', 'dietaryGuidelines']);

p('Nutrition & Diet', 'plant-based-diet-for-beginners', 'A plant-based diet for beginners', 'Plant-based eating emphasises plant foods and can be vegan, vegetarian, or flexible; nutritional quality depends on the foods included, not the label alone.', [
  'Legumes, soy foods, whole grains, vegetables, fruit, nuts, and seeds can form balanced meals.',
  'Vitamin B12 requires particular attention in vegan diets, while iron, calcium, iodine, vitamin D, zinc, protein, and omega-3 may also need planning.',
  'Highly processed plant products can still be high in sodium, saturated fat, or added sugar.'
], ['Replace one familiar meal with a legume- or soy-based version.', 'Plan a protein source and varied produce at main meals.', 'Use fortified foods or appropriate supplements for predictable gaps such as vitamin B12.'], ['Do not remove animal foods without replacing their nutrients and energy.', 'Seek individual planning for pregnancy, childhood, allergy, digestive disease, or a highly restrictive diet.'], ['dietaryGuidelines', 'ods', 'foodData']);

// Sleep & Recovery
p('Sleep & Recovery', 'best-foods-for-sleep', 'Foods and eating habits for sleep', 'No single food reliably causes sleep, but meal timing, caffeine, alcohol, hunger, reflux, and the overall diet can affect sleep quality.', [
  'Large heavy meals close to bed can worsen discomfort or reflux in some people.',
  'Caffeine can remain active for hours, and alcohol can fragment later sleep.',
  'A small balanced snack may help when genuine hunger prevents sleep.'
], ['Keep meals regular and note foods or timing linked to symptoms.', 'Move caffeine earlier and reduce evening alcohol.', 'Choose a light snack with carbohydrate and protein if bedtime hunger is recurring.'], ['Do not rely on a “sleep food” while ignoring chronic insomnia or sleep apnoea symptoms.', 'Avoid restrictive diets or large supplement doses marketed as sedatives.'], ['nhlbiSleep', 'nhlbiSleepEffects', 'dietaryGuidelines']);

p('Sleep & Recovery', 'best-sleep-position-for-health', 'The best sleep position for health', 'There is no universally best sleep position; comfort and symptom control depend on pregnancy, pain, reflux, snoring, breathing, and personal anatomy.', [
  'Side sleeping may reduce snoring or reflux for some people, while back sleeping can worsen airway obstruction in others.',
  'Pregnancy guidance can change as the pregnancy progresses.',
  'Pillow height and mattress support can matter as much as the named position.'
], ['Identify the symptom or comfort goal rather than forcing a position.', 'Adjust pillow support to keep the neck and spine comfortable.', 'Discuss persistent pain, numbness, reflux, snoring, or breathing pauses with a clinician.'], ['Do not use positional advice as the sole treatment for suspected sleep apnoea.', 'Seek urgent care for new neurological weakness, severe breathing difficulty, or traumatic pain.'], ['nhlbiSleep', 'nhlbiSleepEffects']);

p('Sleep & Recovery', 'exercise-timing-sleep-quality', 'Exercise timing and sleep quality', 'Regular exercise generally supports sleep, while the best time depends on schedule, chronotype, intensity, temperature, and individual response.', [
  'Morning or daytime activity can reinforce routine and light exposure.',
  'Vigorous late exercise may delay sleep for some people but has little effect for others.',
  'Consistency and total weekly activity matter more than a universal clock time.'
], ['Choose a time you can repeat without reducing sleep opportunity.', 'Track sleep after different exercise intensities and finishing times.', 'Move hard sessions earlier if late training repeatedly delays sleep.'], ['Do not skip all exercise because only evening time is available.', 'Do not use intense late workouts to compensate for inactivity when they worsen insomnia or recovery.'], ['hhsActivity', 'nhlbiSleep']);

p('Sleep & Recovery', 'how-much-sleep-do-you-need-by-age', 'Sleep needs by age', 'Recommended sleep duration changes across childhood and adulthood because growth, development, and physiology change; individual need still varies within each range.', [
  'Infants and children need substantially more sleep than adults and may include naps.',
  'Teenagers generally need more sleep than adults but often experience later circadian timing.',
  'Adults commonly need at least seven hours, while quality, regularity, and daytime function also matter.'
], ['Use an age-appropriate recommended range as the starting point.', 'Allow enough time in bed and track alertness and function.', 'Address schedules, snoring, insomnia, pain, or medication if adequate opportunity does not feel restorative.'], ['Do not assume older adults need only a few hours.', 'Seek assessment for severe daytime sleepiness, breathing pauses, or major sleep change.'], ['nhlbiSleepHours', 'nhlbiSleep']);

p('Sleep & Recovery', 'how-to-fix-sleep-schedule', 'How to fix a sleep schedule', 'A sleep schedule shifts more reliably when wake time, morning light, evening light, meals, activity, and bedtime are moved consistently rather than corrected with one all-nighter.', [
  'The circadian system usually shifts gradually, and large weekend changes can reset progress.',
  'Morning light tends to move sleep earlier, while bright late-evening light can delay it.',
  'Sleep debt and circadian timing are related but not the same problem.'
], ['Set a consistent wake time and get morning daylight.', 'Move the schedule in small steps while protecting enough total sleep.', 'Dim evening light and keep caffeine well before the planned bedtime.'], ['Do not drive or perform hazardous work after an all-nighter.', 'Shift workers, bipolar disorder, severe insomnia, or medication-related sleep problems need tailored advice.'], ['nhlbiSleep', 'nhlbiSleepHours']);

p('Sleep & Recovery', 'how-to-improve-sleep-quality', 'How to improve sleep quality', 'Sleep quality improves when sufficient time, regular timing, a suitable environment, and treatable sleep or health problems are addressed together.', [
  'A dark, quiet, cool room and a consistent wake time support normal sleep cues.',
  'Alcohol, late caffeine, nicotine, pain, reflux, medicines, and screen use can interfere.',
  'Feeling unrefreshed despite adequate time can signal sleep apnoea, insomnia, restless legs, or another condition.'
], ['Keep a two-week sleep and symptom diary.', 'Set a stable wake time and a short wind-down routine.', 'Address the most likely disruptor and evaluate the change before adding supplements.'], ['Do not spend increasingly long awake periods in bed trying to force sleep.', 'Do not ignore loud snoring, breathing pauses, severe sleepiness, or unsafe driving.'], ['nhlbiSleep', 'nhlbiSleepEffects']);

p('Sleep & Recovery', 'insomnia-natural-remedies', 'Non-drug approaches for insomnia', 'Chronic insomnia is best addressed with cognitive behavioural therapy for insomnia (CBT-I); “natural” products are not automatically effective or safe.', [
  'CBT-I uses stimulus control, sleep scheduling, cognitive strategies, and sleep education.',
  'Relaxation and mindfulness may help some people but are not complete substitutes for CBT-I.',
  'Melatonin and herbal products vary in dose, purity, indication, and interaction risk.'
], ['Keep a consistent wake time and record sleep patterns.', 'Ask for CBT-I through a trained clinician or validated programme.', 'Review pain, mood, breathing, substances, and medicines that may maintain insomnia.'], ['Do not combine sedating products or use alcohol as a sleep treatment.', 'Seek care for chronic insomnia, severe daytime impairment, pregnancy, or complex medical and psychiatric conditions.'], ['aasmInsomnia', 'nhlbiSleep', 'nccihMeditation']);

p('Sleep & Recovery', 'magnesium-for-better-sleep', 'Magnesium and sleep', 'Magnesium is an essential mineral, but evidence that supplements improve sleep in people without deficiency is limited and product claims often exceed the research.', [
  'Food sources include nuts, seeds, legumes, whole grains, and leafy vegetables.',
  'Supplement forms differ in absorption and gastrointestinal effects.',
  'High supplemental amounts can cause diarrhoea and can interact with medicines; kidney disease raises risk.'
], ['Review dietary sources and whether deficiency risk is plausible.', 'Discuss supplement form, dose, and medicine timing with a clinician or pharmacist.', 'Address sleep schedule, insomnia, breathing, and caffeine before relying on a mineral.'], ['Do not exceed supplement limits because a product is labelled natural.', 'Avoid unsupervised supplementation with significant kidney disease or interacting medicines.'], ['odsMagnesium', 'nhlbiSleep']);

p('Sleep & Recovery', 'napping-benefits-risks', 'Napping benefits and risks', 'A short nap can improve alertness, but long or late naps can increase grogginess and make night-time sleep harder for some people.', [
  'Sleep inertia is the temporary impaired feeling after waking, especially from deeper sleep.',
  'Shift workers and people with restricted sleep may use planned naps differently from someone treating insomnia.',
  'Frequent unintended naps can signal insufficient sleep, sleep apnoea, medication effects, or another condition.'
], ['Keep an optional daytime nap short and earlier when protecting night sleep.', 'Use an alarm and allow time to regain alertness before driving.', 'Track whether naps improve function or delay bedtime.'], ['Do not use naps to make chronic sleep deprivation safe.', 'Seek assessment for irresistible sleep attacks or severe daytime sleepiness.'], ['nhlbiSleepHours', 'nhlbiSleepEffects']);

p('Sleep & Recovery', 'sleep-cycles-explained', 'Sleep cycles explained', 'Sleep moves through non-REM and REM stages in repeating cycles, but cycle length and stage proportions vary across the night and between people.', [
  'Deep non-REM sleep is concentrated earlier, while REM periods generally lengthen later.',
  'Consumer wearables estimate stages from movement and heart signals rather than measuring brain waves like a sleep study.',
  'Waking between cycles is not inherently harmful and exact 90-minute timing is an oversimplification.'
], ['Prioritise adequate total sleep and regular timing.', 'Use wearable stage data as a rough trend, not a diagnosis.', 'Focus on daytime function and symptoms when deciding whether sleep needs assessment.'], ['Do not shorten sleep to wake at a mathematically perfect cycle.', 'Do not use a wearable to rule out sleep apnoea or another disorder.'], ['nhlbiSleep']);

p('Sleep & Recovery', 'sleep-debt-how-to-recover', 'Sleep debt and recovery', 'Sleep debt describes accumulated sleep loss, but one long weekend sleep does not always restore attention, mood, and metabolic effects immediately.', [
  'Repeatedly losing one or two hours adds up across the week.',
  'Extra sleep can reduce sleepiness, while large schedule shifts may disturb circadian timing.',
  'Prevention through adequate regular sleep is more reliable than repeated catch-up cycles.'
], ['Restore a consistent wake time and allow additional sleep opportunity for several nights.', 'Use short naps cautiously when immediate alertness is needed.', 'Reduce the schedule pressure or untreated condition causing recurring debt.'], ['Do not drive when struggling to stay awake.', 'Seek help when adequate opportunity does not restore alertness or when breathing symptoms are present.'], ['nhlbiSleepHours', 'nhlbiSleepEffects']);

p('Sleep & Recovery', 'sleep-hygiene-complete-checklist', 'A sleep-hygiene checklist', 'Sleep hygiene creates conditions that support sleep, but chronic insomnia or sleep disorders often need more than a checklist.', [
  'Consistent wake time, morning light, activity, and a suitable bedroom reinforce sleep timing.',
  'Late caffeine, nicotine, alcohol, heavy meals, and optional screens can interfere.',
  'Spending long frustrated periods awake in bed can strengthen an unwanted wakefulness association.'
], ['Anchor wake time and morning light first.', 'Create a repeatable wind-down and keep the bedroom dark, quiet, and comfortable.', 'If awake for a prolonged period, use a calm low-light activity until sleepy.'], ['Do not blame yourself when hygiene does not resolve a clinical sleep disorder.', 'Ask for CBT-I or sleep assessment when insomnia, snoring, or sleepiness persists.'], ['nhlbiSleep', 'aasmInsomnia']);

// TDEE & Metabolism
p('TDEE & Metabolism', 'activity-level-affects-calorie-needs', 'How activity level affects calorie needs', 'Activity changes total daily energy expenditure through exercise and routine movement, but calculator labels cannot capture every job, step, workout, and compensatory change.', [
  'Non-exercise movement can vary substantially even between people with similar workouts.',
  'Hard exercise may change appetite, fatigue, and movement later in the day.',
  'Activity factors are broad averages and should be calibrated with real trends.'
], ['Choose the activity description that matches a normal full week.', 'Avoid adding exercise calories again when the multiplier already includes them.', 'Compare several weeks of intake and weight trend and adjust gradually.'], ['Do not choose “very active” solely because workouts feel difficult.', 'Do not treat watch calorie estimates as measured energy expenditure.'], ['nasEnergy', 'niddkPlanner', 'hhsActivity']);

p('TDEE & Metabolism', 'adaptive-thermogenesis', 'Adaptive thermogenesis', 'Adaptive thermogenesis describes changes in energy expenditure during weight loss beyond what is expected from a smaller body, and it is one reason predicted loss may slow.', [
  'A smaller body requires less energy, and spontaneous movement may also decline.',
  'Hunger and food-related thoughts can rise, making adherence harder.',
  'The response varies and does not mean metabolism is permanently damaged.'
], ['Use a moderate deficit and continue resistance and routine activity.', 'Recalculate needs after meaningful weight change.', 'Consider a maintenance period when fatigue, hunger, and performance make the plan unsustainable.'], ['Do not answer a plateau with an immediate extreme calorie cut.', 'Seek assessment when fatigue, temperature intolerance, or other symptoms suggest a medical issue.'], ['niddkPlanner', 'niddkWeight']);

p('TDEE & Metabolism', 'does-muscle-burn-more-calories', 'Does muscle burn more calories?', 'Muscle uses more energy at rest than fat tissue, but each additional kilogram produces a modest resting increase rather than a dramatic metabolism boost.', [
  'Muscle’s larger value is supporting strength, function, glucose use, and higher-capacity activity.',
  'Resistance training also uses energy and helps preserve lean tissue during weight loss.',
  'Total daily expenditure still depends heavily on body size and overall movement.'
], ['Use progressive resistance training at least twice weekly.', 'Meet protein and recovery needs that support adaptation.', 'Judge progress through strength and body trends rather than expected calorie bonuses.'], ['Do not promise that muscle gain allows unlimited food without weight change.', 'Do not chase muscle with unsafe supplements or excessive surplus.'], ['acsmResistance', 'hhsActivity', 'nasEnergy']);

p('TDEE & Metabolism', 'how-age-affects-metabolism', 'How age affects metabolism', 'Energy needs often decline with age because growth ends and body composition and activity may change, but there is no identical metabolic drop for every adult at a fixed birthday.', [
  'Loss of lean mass and reduced daily movement can lower expenditure over time.',
  'Resistance training and regular activity help preserve function and energy use.',
  'Menopause, illness, medication, sleep, and appetite can also change weight patterns.'
], ['Reassess current activity, strength, intake, sleep, and medicines.', 'Include resistance training and routine walking or other aerobic movement.', 'Adjust portions gradually based on multi-week trends and nutritional needs.'], ['Do not assume all midlife weight change is unavoidable or caused by “broken metabolism.”', 'Do not ignore rapid unexplained change or symptoms needing medical assessment.'], ['nasEnergy', 'hhsActivity', 'niddkWeight']);

p('TDEE & Metabolism', 'slow-metabolism-is-it-real', 'Is a slow metabolism real?', 'People do differ in energy expenditure, but “slow metabolism” is often used for a mix of body size, low activity, adaptive changes, intake-estimation error, sleep, medicine, and health conditions.', [
  'Prediction equations have individual error and cannot directly measure metabolism.',
  'Under-recorded intake and changes in non-exercise movement are common and not moral failings.',
  'Thyroid and other disorders can affect weight but require symptoms, examination, and testing to diagnose.'
], ['Compare a calculator estimate with several weeks of consistent real-world data.', 'Review steps, training, food portions, sleep, medicines, and recent weight change.', 'Ask for medical evaluation when symptoms support an endocrine or other condition.'], ['Do not diagnose thyroid disease from difficulty losing weight alone.', 'Avoid stimulant “metabolism boosters” and extreme diets.'], ['niddkPlanner', 'niddkWeight']);

// Weight Loss
p('Weight Loss', 'best-time-to-walk-for-fat-loss', 'Best time to walk for fat loss', 'There is no universal clock time when walking burns uniquely more body fat; consistency, total activity, pace, duration, and the overall energy pattern matter more.', [
  'Morning walking can support routine and light exposure, while after-meal walking may fit glucose-management goals.',
  'A walk at any sustainable time adds activity and cardiovascular benefit.',
  'Fasted walking is not required for long-term fat loss.'
], ['Choose the time with the fewest barriers and safe conditions.', 'Walk at a manageable pace and build duration gradually.', 'Pair walking with an eating pattern that supports the goal.'], ['Do not skip needed food or medication to force fasted exercise.', 'Do not walk in unsafe heat, darkness, pain, or severe fatigue for a timing claim.'], ['hhsActivity', 'niddkWeight']);

p('Weight Loss', 'fat-loss-vs-weight-loss-difference', 'Fat loss versus weight loss', 'Weight loss is any reduction in total body mass; fat loss specifically reduces fat tissue, while water, glycogen, digestive contents, and muscle can also change scale weight.', [
  'Early diet changes can produce rapid water shifts that are not the same as rapid fat loss.',
  'A moderate deficit, resistance training, and adequate protein support lean-tissue retention.',
  'Waist, strength, and consistent body-composition estimates can add context to scale trends.'
], ['Track weekly average weight under similar conditions.', 'Include resistance training and sufficient protein in a moderate deficit.', 'Use waist and performance trends to check whether the plan supports the intended outcome.'], ['Do not celebrate dehydration or severe food restriction as fat loss.', 'Do not assume a stable scale means no recomposition or health improvement.'], ['niddkWeight', 'hhsActivity', 'acsmResistance']);

p('Weight Loss', 'how-many-steps-to-lose-weight', 'How many steps to lose weight', 'No fixed step count guarantees weight loss because body size, pace, food intake, other activity, and adaptation determine the net energy balance.', [
  'Increasing from a low baseline can improve health even before substantial weight change.',
  'Ten thousand steps is a convenient target, not a required threshold.',
  'Step devices do not capture cycling, swimming, lifting, or all wheelchair activity well.'
], ['Measure current steps for a normal week.', 'Add a manageable daily or weekly increase.', 'Review weight, waist, hunger, and adherence over several weeks before adjusting.'], ['Do not force a high target through pain or unsafe conditions.', 'Do not eat back every estimated walking calorie automatically.'], ['hhsActivity', 'cdcActivity', 'niddkWeight']);

p('Weight Loss', 'protein-for-fat-loss', 'Protein for fat loss', 'Protein can support fullness and lean-tissue retention during a calorie deficit, especially with resistance training, but it does not directly cancel excess energy intake.', [
  'Needs vary with body size, age, training, energy intake, and health.',
  'Spreading protein across meals can make the target easier to meet.',
  'Whole-food sources also contribute fibre, fats, vitamins, minerals, or carbohydrate depending on the choice.'
], ['Calculate a reasonable body-weight-based range.', 'Include a protein source at each main meal.', 'Pair adequate protein with resistance training and a moderate deficit.'], ['Do not push protein so high that fibre, produce, or other nutrients disappear.', 'Use individual advice for kidney or liver disease and other therapeutic diets.'], ['dietaryGuidelines', 'foodData', 'niddkWeight']);

p('Weight Loss', 'walking-vs-running-for-weight-loss', 'Walking versus running for weight loss', 'Running generally uses more energy per minute, while walking is lower impact and often easier to recover from and repeat; either can support weight loss.', [
  'Equal distance narrows the energy difference compared with equal time, but body size, pace, hills, and efficiency matter.',
  'Running carries greater impact and may require gradual preparation.',
  'The activity that can be performed consistently without excessive hunger or injury may be more useful.'
], ['Choose based on current fitness, joint tolerance, time, and preference.', 'Build walking volume before adding run-walk intervals if new to running.', 'Combine the activity with strength work and a sustainable eating pattern.'], ['Do not start frequent hard running solely for faster scale change.', 'Stop for chest symptoms, faintness, severe breathlessness, or worsening focal pain.'], ['hhsActivity', 'cdcActivity', 'niddkWeight']);

p('Weight Loss', 'why-you-are-not-losing-weight', 'Why weight may not be decreasing', 'A flat scale can result from no sustained energy deficit, inconsistent measurement, water changes, lower activity, medication, health conditions, or a time window that is too short.', [
  'Portions, drinks, oils, weekends, and restaurant meals are common sources of intake-estimation error.',
  'Sodium, carbohydrate, menstrual cycle, constipation, travel, soreness, and stress can mask fat loss temporarily.',
  'Weight-loss adaptation and a smaller body reduce energy needs as progress occurs.'
], ['Confirm the trend with several weeks of average weights and waist measurements.', 'Review intake and movement without blame and identify the largest uncertainty.', 'Make one modest adjustment or seek professional assessment when appropriate.'], ['Do not cut calories aggressively after a few unchanged days.', 'Seek care for rapid unexplained gain, swelling, breathlessness, severe fatigue, or other new symptoms.'], ['niddkPlanner', 'niddkWeight']);

// Women's Health
p("Women's Health", 'breastfeeding-calorie-and-nutrition-guide', 'Breastfeeding calories and nutrition', 'Breastfeeding increases energy and nutrient demands, but needs vary with milk production, postpartum recovery, body size, activity, and whether feeding is exclusive.', [
  'Adequate food, fluid, protein, iodine, choline, vitamin D, vitamin B12, and omega-3 sources may require attention depending on diet.',
  'Milk supply is influenced by feeding frequency, milk removal, latch, health, and medication—not one “lactation food.”',
  'Gradual postpartum weight change is safer than severe restriction.'
], ['Eat regular varied meals and drink according to thirst.', 'Review supplements and medicines with the maternity or paediatric team.', 'Get lactation support for pain, poor transfer, low infant output, or growth concerns.'], ['Do not use crash diets, detoxes, or unverified milk-supply supplements.', 'Seek urgent care for severe headache, chest pain, breathlessness, heavy bleeding, fever, or mental-health crisis postpartum.'], ['acogPregnancy', 'ods', 'dietaryGuidelines']);

p("Women's Health", 'fertility-boosting-nutrition', 'Nutrition and fertility', 'A balanced dietary pattern supports general reproductive health, but no food, tea, or supplement can guarantee conception or treat every cause of infertility.', [
  'Adequate energy, folate, iron, iodine, protein, and varied foods matter before pregnancy.',
  'Very low or high energy intake, eating disorders, smoking, alcohol, age, ovulatory disorders, and sperm factors can affect fertility.',
  'Prenatal folic-acid guidance should begin before conception when pregnancy is possible.'
], ['Use a varied eating pattern and appropriate prenatal supplement guidance.', 'Review alcohol, smoking, medicines, weight change, and cycle pattern.', 'Seek fertility evaluation based on age, duration trying, irregular cycles, or known risk factors.'], ['Do not delay evaluation while trying unproven fertility foods or supplements.', 'Check supplement and herbal-product safety before conception and pregnancy.'], ['acogPregnancy', 'womensHealth', 'ods']);

p("Women's Health", 'hormone-balance-for-women', 'Hormone balance for women', 'Hormones naturally fluctuate across the menstrual cycle and life stages; “balancing hormones” is a vague marketing phrase, not a diagnosis or single treatment goal.', [
  'Symptoms such as irregular periods, acne, hair change, hot flashes, fatigue, or weight change have multiple possible causes.',
  'Sleep, nutrition, stress, exercise, medication, pregnancy, thyroid disease, PCOS, and menopause can all be relevant.',
  'Testing should be selected and timed for a clinical question rather than ordered as a broad wellness panel.'
], ['Track symptoms, cycle timing, medicines, and relevant life changes.', 'Support regular meals, sleep, and appropriate activity without extreme restriction.', 'Discuss persistent or severe symptoms with a qualified clinician.'], ['Do not use “hormone detox” products or stop prescribed medicine without advice.', 'Seek urgent care for severe pain, very heavy bleeding, fainting, pregnancy concerns, or neurological symptoms.'], ['womensHealth', 'niddkPcos']);

p("Women's Health", 'menopause-weight-gain-tips', 'Menopause and weight change', 'Menopause can change fat distribution, sleep, symptoms, and body composition, while ageing, activity, diet, medication, and muscle loss also influence weight.', [
  'Abdominal fat may increase even when total scale change is modest.',
  'Resistance training, aerobic activity, protein, fibre, and sleep support health through the transition.',
  'Hormone therapy has specific indications and risks and is not a general weight-loss treatment.'
], ['Review sleep, symptoms, activity, strength, food pattern, and medicines.', 'Use a modest energy adjustment and progressive resistance training if loss is appropriate.', 'Discuss troublesome symptoms and treatment options with a menopause-informed clinician.'], ['Do not answer midlife change with severe restriction or unregulated hormone products.', 'Seek care for postmenopausal bleeding, chest symptoms, or rapid unexplained change.'], ['womensHealth', 'hhsActivity', 'dietaryGuidelines']);

p("Women's Health", 'menstrual-cycle-and-fitness', 'The menstrual cycle and fitness', 'The menstrual cycle can affect symptoms, temperature, fluid, appetite, and perceived performance, but responses vary widely and do not require a universal phase-based training plan.', [
  'Research averages do not predict how every individual will feel or perform in each phase.',
  'Tracking can reveal a personal pattern in pain, bleeding, energy, sleep, and training.',
  'Adequate energy and iron are important when training, especially with heavy periods.'
], ['Track symptoms and performance for several cycles.', 'Adjust intensity when symptoms warrant while maintaining activity when comfortable.', 'Discuss heavy bleeding, severe pain, missed periods, or declining performance with a clinician.'], ['Do not assume women are weak or unable to train during menstruation.', 'Do not ignore absent periods or recurrent injury during high training and low energy intake.'], ['womensHealth', 'hhsActivity', 'ods']);

p("Women's Health", 'ovulation-calculator-complete-guide', 'How ovulation calculators work', 'Ovulation calculators estimate a fertile window from cycle dates and average cycle length; they cannot confirm ovulation or predict it precisely in every cycle.', [
  'Ovulation commonly occurs before the next period, but timing varies within and between people.',
  'Irregular cycles, postpartum status, perimenopause, illness, travel, PCOS, and medication reduce calendar accuracy.',
  'Urine LH tests, cervical mucus, temperature tracking, or clinical evaluation provide different information.'
], ['Record several cycle start dates and note cycle variability.', 'Treat the result as an estimated window, not one guaranteed day.', 'Use appropriate fertility or contraception guidance for the actual goal.'], ['Do not use a calendar estimate as reliable contraception.', 'Seek assessment for very irregular cycles, severe pain, abnormal bleeding, or difficulty conceiving.'], ['womensHealth', 'niddkPcos']);

p("Women's Health", 'pcos-symptoms-and-management', 'PCOS symptoms and management', 'Polycystic ovary syndrome is a hormonal and metabolic condition diagnosed from a clinical pattern—not from one symptom, ultrasound finding, or online quiz.', [
  'Possible features include irregular ovulation, androgen-related symptoms, and polycystic ovarian morphology after other causes are considered.',
  'PCOS can affect fertility, glucose regulation, lipids, sleep, and emotional wellbeing.',
  'Management may include lifestyle support, cycle protection, fertility treatment, and medicines based on the goal.'
], ['Track cycles and symptoms and prepare medication and family history.', 'Seek evaluation for diagnosis and screening of related risks.', 'Choose nutrition and activity changes that are sustainable and not weight-stigmatising.'], ['Do not self-diagnose from acne, weight, or an ultrasound alone.', 'Seek prompt care for very heavy bleeding, severe pain, pregnancy concerns, or acute mental-health risk.'], ['niddkPcos', 'womensHealth']);

p("Women's Health", 'pregnancy-week-by-week-guide', 'Pregnancy week-by-week development', 'Week-by-week pregnancy guides describe typical development using gestational age from the last menstrual period, but dating and development vary and ultrasound may revise the estimate.', [
  'Gestational age begins about two weeks before conception in a typical cycle.',
  'Symptoms vary widely and do not reliably show whether a pregnancy is healthy.',
  'Prenatal visits, screening choices, nutrition, medicines, vaccines, and warning signs change across pregnancy.'
], ['Confirm dating and prenatal-care schedule with the maternity team.', 'Review medicines, supplements, food safety, activity, and vaccinations.', 'Use the weekly description as orientation while following individual clinical advice.'], ['Do not compare symptoms or fetal size rigidly with an app.', 'Seek urgent maternity advice for heavy bleeding, severe pain, fluid leakage, severe headache, breathing difficulty, or reduced fetal movement when relevant.'], ['acogPregnancy', 'cdcPregnancyWeight', 'womensHealth']);

if (profiles.length !== 134) {
  throw new Error(`Expected 134 remaining blog profiles, found ${profiles.length}`);
}

module.exports = profiles;
