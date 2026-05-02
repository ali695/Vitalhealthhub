/* VitalHealth Tools — Main JavaScript
   ====================================== */

(function () {
    'use strict';

    /* ── Utility: show result box ── */
    window.vhtShowResult = function (wrapperId) {
        var el = document.getElementById(wrapperId);
        if (el) {
            el.classList.add('vht-visible');
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    /* ── Utility: get form value ── */
    window.vhtVal = function (id) {
        var el = document.getElementById(id);
        return el ? parseFloat(el.value) || 0 : 0;
    };
    window.vhtStr = function (id) {
        var el = document.getElementById(id);
        return el ? el.value : '';
    };
    window.vhtRadio = function (name) {
        var el = document.querySelector('input[name="' + name + '"]:checked');
        return el ? el.value : '';
    };

    /* ── Utility: set result content ── */
    window.vhtSetResult = function (opts) {
        var primary   = document.getElementById(opts.primaryId);
        var label     = document.getElementById(opts.labelId);
        var breakdown = document.getElementById(opts.breakdownId);
        if (primary   && opts.primary   !== undefined) primary.innerHTML   = opts.primary;
        if (label     && opts.label     !== undefined) label.innerHTML     = opts.label;
        if (breakdown && opts.breakdown !== undefined) breakdown.innerHTML = opts.breakdown;
        vhtShowResult(opts.resultId);
    };

    /* ── Utility: badge HTML ── */
    window.vhtBadge = function (text, colour) {
        return '<span class="vht-badge vht-badge-' + colour + '">' + text + '</span>';
    };

    /* ── BMI helper ── */
    window.vhtBMI = function (weight, height) {
        if (!weight || !height) return null;
        return weight / ((height / 100) * (height / 100));
    };
    window.vhtBMICategory = function (bmi) {
        if (bmi < 18.5) return { label: 'Underweight', colour: 'yellow' };
        if (bmi < 25)   return { label: 'Normal',      colour: 'green'  };
        if (bmi < 30)   return { label: 'Overweight',  colour: 'orange' };
        return                  { label: 'Obese',       colour: 'red'    };
    };

    /* ── Healthy Weight Range Calculator ── */
    window.vhtCalcHealthyWeight = function () {
        var h = vhtVal('vht-hwrc-height');
        if (!h) { alert('Please enter your height.'); return; }
        var hm = h / 100;
        var low  = (18.5 * hm * hm).toFixed(1);
        var high = (24.9 * hm * hm).toFixed(1);
        vhtSetResult({
            resultId:    'vht-hwrc-result',
            primaryId:   'vht-hwrc-primary',
            labelId:     'vht-hwrc-label',
            breakdownId: 'vht-hwrc-breakdown',
            primary:     low + ' – ' + high + ' kg',
            label:       'Healthy weight range for your height (' + h + ' cm)',
            breakdown:   '<strong>BMI 18.5:</strong> ' + low + ' kg &nbsp;|&nbsp; <strong>BMI 24.9:</strong> ' + high + ' kg<br>Based on WHO BMI classification for adults (18–65 years).'
        });
    };

    /* ── Weight Loss Goal Calculator ── */
    window.vhtCalcWeightLossGoal = function () {
        var current = vhtVal('vht-wlgc-current');
        var target  = vhtVal('vht-wlgc-target');
        var deficit = vhtVal('vht-wlgc-deficit') || 500;
        if (!current || !target || target >= current) { alert('Please enter valid weights (target must be less than current).'); return; }
        var diff    = current - target;
        var kcalPerKg = 7700;
        var totalKcal = diff * kcalPerKg;
        var days    = Math.round(totalKcal / deficit);
        var weeks   = Math.round(days / 7);
        var months  = (weeks / 4.33).toFixed(1);
        var weekly  = (diff / (days / 7)).toFixed(2);
        vhtSetResult({
            resultId:    'vht-wlgc-result',
            primaryId:   'vht-wlgc-primary',
            labelId:     'vht-wlgc-label',
            breakdownId: 'vht-wlgc-breakdown',
            primary:     weeks + ' weeks',
            label:       'Estimated time to reach your goal (approx. ' + months + ' months)',
            breakdown:   '<strong>Weight to lose:</strong> ' + diff.toFixed(1) + ' kg<br>'
                       + '<strong>Daily deficit:</strong> ' + deficit + ' kcal<br>'
                       + '<strong>Rate:</strong> ' + weekly + ' kg/week<br>'
                       + '<strong>Tip:</strong> A deficit of 500 kcal/day is generally safe and sustainable for most adults.'
        });
    };

    /* ── Weight Gain Calculator ── */
    window.vhtCalcWeightGain = function () {
        var current = vhtVal('vht-wgc-current');
        var target  = vhtVal('vht-wgc-target');
        var surplus = vhtVal('vht-wgc-surplus') || 300;
        if (!current || !target || target <= current) { alert('Please enter valid weights (target must be greater than current).'); return; }
        var diff    = target - current;
        var kcalPerKg = 7700;
        var totalKcal = diff * kcalPerKg;
        var weeks   = Math.round(totalKcal / (surplus * 7));
        var months  = (weeks / 4.33).toFixed(1);
        vhtSetResult({
            resultId:    'vht-wgc-result',
            primaryId:   'vht-wgc-primary',
            labelId:     'vht-wgc-label',
            breakdownId: 'vht-wgc-breakdown',
            primary:     weeks + ' weeks',
            label:       'Estimated time to reach your target weight (' + months + ' months)',
            breakdown:   '<strong>Weight to gain:</strong> ' + diff.toFixed(1) + ' kg<br>'
                       + '<strong>Daily surplus:</strong> ' + surplus + ' kcal<br>'
                       + '<strong>Tip:</strong> A modest surplus of 200–400 kcal/day with resistance training builds muscle with minimal fat gain.'
        });
    };

    /* ── Maintenance Calories Calculator ── */
    window.vhtCalcMaintenance = function () {
        var weight   = vhtVal('vht-mcc-weight');
        var height   = vhtVal('vht-mcc-height');
        var age      = vhtVal('vht-mcc-age');
        var sex      = vhtRadio('vht-mcc-sex');
        var activity = parseFloat(vhtStr('vht-mcc-activity')) || 1.55;
        if (!weight || !height || !age || !sex) { alert('Please complete all fields.'); return; }
        var bmr = sex === 'male'
            ? (10 * weight) + (6.25 * height) - (5 * age) + 5
            : (10 * weight) + (6.25 * height) - (5 * age) - 161;
        var tdee = Math.round(bmr * activity);
        vhtSetResult({
            resultId:    'vht-mcc-result',
            primaryId:   'vht-mcc-primary',
            labelId:     'vht-mcc-label',
            breakdownId: 'vht-mcc-breakdown',
            primary:     tdee.toLocaleString() + ' kcal',
            label:       'Daily calories to maintain your current weight',
            breakdown:   '<strong>BMR:</strong> ' + Math.round(bmr) + ' kcal/day (calories at rest)<br>'
                       + '<strong>TDEE:</strong> ' + tdee + ' kcal/day (including activity)<br>'
                       + '<strong>For fat loss:</strong> eat ' + (tdee - 500) + ' kcal/day<br>'
                       + '<strong>For muscle gain:</strong> eat ' + (tdee + 300) + ' kcal/day'
        });
    };

    /* ── Meal Calorie Split Calculator ── */
    window.vhtCalcMealSplit = function () {
        var total  = vhtVal('vht-mcsc-total');
        var meals  = parseInt(vhtStr('vht-mcsc-meals')) || 3;
        if (!total) { alert('Please enter your daily calorie target.'); return; }
        var splits = {
            3: [0.30, 0.40, 0.30],
            4: [0.25, 0.35, 0.25, 0.15],
            5: [0.20, 0.25, 0.30, 0.15, 0.10],
            6: [0.17, 0.20, 0.25, 0.17, 0.12, 0.09]
        };
        var labels = {
            3: ['Breakfast', 'Lunch', 'Dinner'],
            4: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
            5: ['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner'],
            6: ['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner', 'Evening Snack']
        };
        var s = splits[meals] || splits[3];
        var l = labels[meals] || labels[3];
        var rows = s.map(function (pct, i) {
            return '<strong>' + l[i] + ':</strong> ' + Math.round(total * pct) + ' kcal (' + Math.round(pct * 100) + '%)';
        });
        vhtSetResult({
            resultId:    'vht-mcsc-result',
            primaryId:   'vht-mcsc-primary',
            labelId:     'vht-mcsc-label',
            breakdownId: 'vht-mcsc-breakdown',
            primary:     Math.round(total / meals) + ' kcal',
            label:       'Average calories per meal (' + meals + ' meals/day)',
            breakdown:   rows.join('<br>')
        });
    };

    /* ── Daily Sugar Intake Calculator ── */
    window.vhtCalcSugar = function () {
        var calories = vhtVal('vht-dsic-calories') || 2000;
        var goal     = vhtStr('vht-dsic-goal');
        var whoMax   = Math.round(calories * 0.10 / 4);   // 10% of kcal / 4 kcal per g
        var aha      = goal === 'male' ? 36 : 25;          // AHA: 36g men, 25g women
        var idealMax = Math.min(whoMax, aha);
        vhtSetResult({
            resultId:    'vht-dsic-result',
            primaryId:   'vht-dsic-primary',
            labelId:     'vht-dsic-label',
            breakdownId: 'vht-dsic-breakdown',
            primary:     idealMax + ' g',
            label:       'Recommended maximum daily added sugar',
            breakdown:   '<strong>WHO guideline (10% of kcal):</strong> ' + whoMax + ' g/day<br>'
                       + '<strong>AHA guideline:</strong> ' + aha + ' g/day<br>'
                       + '<strong>Stricter WHO target (5%):</strong> ' + Math.round(whoMax / 2) + ' g/day<br>'
                       + 'This applies to <em>added</em> sugars, not sugars naturally in whole fruits, vegetables, or dairy.'
        });
    };

    /* ── Sodium Intake Calculator ── */
    window.vhtCalcSodium = function () {
        var condition = vhtStr('vht-sic-condition');
        var limits = {
            healthy: { who: 2000, aha: 2300, label: 'Healthy adult' },
            hypertension: { who: 1500, aha: 1500, label: 'Hypertension' },
            diabetes: { who: 1500, aha: 2300, label: 'Diabetes' },
            kidney: { who: 1000, aha: 1500, label: 'Kidney disease' }
        };
        var l = limits[condition] || limits.healthy;
        var rec = Math.min(l.who, l.aha);
        vhtSetResult({
            resultId:    'vht-sic-result',
            primaryId:   'vht-sic-primary',
            labelId:     'vht-sic-label',
            breakdownId: 'vht-sic-breakdown',
            primary:     rec.toLocaleString() + ' mg',
            label:       'Recommended maximum daily sodium intake for: ' + l.label,
            breakdown:   '<strong>WHO guideline:</strong> ' + l.who.toLocaleString() + ' mg/day<br>'
                       + '<strong>AHA guideline:</strong> ' + l.aha.toLocaleString() + ' mg/day<br>'
                       + '<strong>Equivalent salt:</strong> ' + (rec / 400).toFixed(1) + ' g/day (1 tsp ≈ 2,300 mg sodium)<br>'
                       + 'Most dietary sodium comes from processed foods — not the salt shaker.'
        });
    };

    /* ── Potassium Intake Calculator ── */
    window.vhtCalcPotassium = function () {
        var sex = vhtRadio('vht-pic-sex');
        var preg = vhtStr('vht-pic-status');
        var rec = (preg === 'pregnant') ? 2900 : (preg === 'breastfeeding') ? 2800 : (sex === 'male' ? 3400 : 2600);
        vhtSetResult({
            resultId:    'vht-pic-result',
            primaryId:   'vht-pic-primary',
            labelId:     'vht-pic-label',
            breakdownId: 'vht-pic-breakdown',
            primary:     rec.toLocaleString() + ' mg',
            label:       'Daily recommended potassium intake',
            breakdown:   'Best food sources:<br>'
                       + '• Sweet potato (100g): 475 mg<br>'
                       + '• Avocado (1 fruit): 690 mg<br>'
                       + '• Banana (1 medium): 422 mg<br>'
                       + '• Spinach (100g cooked): 540 mg<br>'
                       + '• White beans (100g cooked): 561 mg'
        });
    };

    /* ── Magnesium Intake Calculator ── */
    window.vhtCalcMagnesium = function () {
        var age = vhtVal('vht-mgc-age');
        var sex = vhtRadio('vht-mgc-sex');
        var rec;
        if (age < 19)       rec = (sex === 'male') ? 410 : 360;
        else if (age < 31)  rec = (sex === 'male') ? 400 : 310;
        else                rec = (sex === 'male') ? 420 : 320;
        vhtSetResult({
            resultId:    'vht-mgc-result',
            primaryId:   'vht-mgc-primary',
            labelId:     'vht-mgc-label',
            breakdownId: 'vht-mgc-breakdown',
            primary:     rec + ' mg',
            label:       'Recommended daily magnesium intake',
            breakdown:   '<strong>Best food sources:</strong><br>'
                       + '• Pumpkin seeds (28g): 156 mg<br>'
                       + '• Almonds (28g): 80 mg<br>'
                       + '• Spinach (100g cooked): 87 mg<br>'
                       + '• Dark chocolate 70% (28g): 64 mg<br>'
                       + '• Black beans (100g cooked): 60 mg<br><br>'
                       + 'Supplement form: Magnesium glycinate is best absorbed and least likely to cause GI upset.'
        });
    };

    /* ── Zinc Intake Calculator ── */
    window.vhtCalcZinc = function () {
        var age = vhtVal('vht-zic-age');
        var sex = vhtRadio('vht-zic-sex');
        var rec = (age >= 14 && sex === 'male') ? 11 : (age >= 14 ? 8 : 9);
        var ul  = 40;
        vhtSetResult({
            resultId:    'vht-zic-result',
            primaryId:   'vht-zic-primary',
            labelId:     'vht-zic-label',
            breakdownId: 'vht-zic-breakdown',
            primary:     rec + ' mg',
            label:       'Recommended daily zinc intake (Upper limit: ' + ul + ' mg/day)',
            breakdown:   '<strong>Top food sources:</strong><br>'
                       + '• Oysters (85g): 74 mg<br>'
                       + '• Beef (100g): 4.8 mg<br>'
                       + '• Pumpkin seeds (28g): 2.2 mg<br>'
                       + '• Chickpeas (100g cooked): 1.5 mg<br>'
                       + '• Cashews (28g): 1.6 mg<br><br>'
                       + '<em>Vegetarians may need 50% more due to lower bioavailability from plant sources.</em>'
        });
    };

    /* ── Omega-3 Intake Calculator ── */
    window.vhtCalcOmega3 = function () {
        var goal = vhtStr('vht-o3c-goal');
        var recs = {
            general:  { amount: '250–500 mg', note: 'EPA+DHA from 2 portions of oily fish per week' },
            cardio:   { amount: '1,000 mg',   note: 'EPA+DHA; consult your doctor about prescription omega-3 for very high triglycerides' },
            mental:   { amount: '1,000–2,000 mg', note: 'EPA-dominant formulation; adjunct to professional mental health care' },
            pregnant: { amount: '200–300 mg DHA', note: 'Critical for foetal brain and retinal development' },
            athlete:  { amount: '2,000–3,000 mg', note: 'Supports muscle recovery and reduces exercise-induced inflammation' }
        };
        var r = recs[goal] || recs.general;
        vhtSetResult({
            resultId:    'vht-o3c-result',
            primaryId:   'vht-o3c-primary',
            labelId:     'vht-o3c-label',
            breakdownId: 'vht-o3c-breakdown',
            primary:     r.amount,
            label:       'Recommended daily EPA+DHA omega-3',
            breakdown:   '<strong>Note:</strong> ' + r.note + '<br><br>'
                       + '<strong>Best food sources:</strong> Salmon, sardines, mackerel, herring, trout<br>'
                       + '<strong>Plant sources (ALA):</strong> Flaxseed, chia seeds, walnuts<br>'
                       + '<strong>Vegan option:</strong> Algae-based DHA+EPA supplement'
        });
    };

    /* ── Meal Protein Distribution Calculator ── */
    window.vhtCalcProteinDistrib = function () {
        var total = vhtVal('vht-mpdc-total');
        var meals = parseInt(vhtStr('vht-mpdc-meals')) || 4;
        if (!total) { alert('Please enter your daily protein target.'); return; }
        var perMeal = Math.round(total / meals);
        vhtSetResult({
            resultId:    'vht-mpdc-result',
            primaryId:   'vht-mpdc-primary',
            labelId:     'vht-mpdc-label',
            breakdownId: 'vht-mpdc-breakdown',
            primary:     perMeal + ' g',
            label:       'Protein per meal for optimal muscle protein synthesis (' + meals + ' meals/day)',
            breakdown:   '<strong>Total daily protein:</strong> ' + total + ' g<br>'
                       + '<strong>Per meal:</strong> ' + perMeal + ' g (target: 25–40 g per meal)<br>'
                       + '<strong>Why distribute?</strong> Each protein-containing meal stimulates muscle protein synthesis (MPS) independently. One large protein meal is less effective than distributed intake.<br>'
                       + '<strong>Leucine threshold:</strong> Each meal needs ~3 g leucine to maximally stimulate MPS (provided by ~25 g of complete protein).'
        });
    };

    /* ── Hydration by Activity Calculator ── */
    window.vhtCalcHydration = function () {
        var weight   = vhtVal('vht-hbac-weight');
        var duration = vhtVal('vht-hbac-duration');
        var intensity = vhtStr('vht-hbac-intensity');
        if (!weight || !duration) { alert('Please enter your weight and exercise duration.'); return; }
        var sweatRates = { light: 0.5, moderate: 0.8, intense: 1.2 };
        var sweat = (sweatRates[intensity] || 0.8) * (duration / 60);
        var base  = weight * 0.035;
        var total = (base + sweat).toFixed(1);
        vhtSetResult({
            resultId:    'vht-hbac-result',
            primaryId:   'vht-hbac-primary',
            labelId:     'vht-hbac-label',
            breakdownId: 'vht-hbac-breakdown',
            primary:     total + ' L',
            label:       'Total daily fluid target including ' + duration + ' min of ' + (intensity || 'moderate') + ' exercise',
            breakdown:   '<strong>Baseline (35 mL/kg):</strong> ' + base.toFixed(1) + ' L<br>'
                       + '<strong>Exercise additional need:</strong> ' + sweat.toFixed(1) + ' L<br>'
                       + '<strong>Before exercise:</strong> Drink 400–600 mL in the 2 hours prior<br>'
                       + '<strong>During exercise:</strong> 150–250 mL every 15–20 minutes<br>'
                       + '<strong>After exercise:</strong> 1.2–1.5 L per kg body weight lost'
        });
    };

    /* ── Electrolyte Needs Calculator ── */
    window.vhtCalcElectrolytes = function () {
        var weight   = vhtVal('vht-enc-weight');
        var duration = vhtVal('vht-enc-duration');
        var sweat    = vhtStr('vht-enc-sweat');
        if (!weight || !duration) { alert('Please enter your weight and duration.'); return; }
        var sweatMults = { low: 0.8, medium: 1.2, high: 1.8 };
        var sweatL = (sweatMults[sweat] || 1.2) * (duration / 60);
        var sodium = Math.round(sweatL * 900);
        var potassium = Math.round(sweatL * 200);
        var magnesium = Math.round(sweatL * 36);
        vhtSetResult({
            resultId:    'vht-enc-result',
            primaryId:   'vht-enc-primary',
            labelId:     'vht-enc-label',
            breakdownId: 'vht-enc-breakdown',
            primary:     sodium.toLocaleString() + ' mg sodium',
            label:       'Primary electrolyte to replace after your session',
            breakdown:   '<strong>Estimated sweat loss:</strong> ' + sweatL.toFixed(1) + ' L<br>'
                       + '<strong>Sodium to replace:</strong> ' + sodium + ' mg<br>'
                       + '<strong>Potassium to replace:</strong> ' + potassium + ' mg<br>'
                       + '<strong>Magnesium to replace:</strong> ' + magnesium + ' mg<br><br>'
                       + 'Replace via: sports drink, electrolyte tablet, salted snacks + banana for potassium.'
        });
    };

    /* ── Walking Calories Calculator ── */
    window.vhtCalcWalking = function () {
        var weight   = vhtVal('vht-wcc-weight');
        var speed    = parseFloat(vhtStr('vht-wcc-speed')) || 5;
        var duration = vhtVal('vht-wcc-duration');
        if (!weight || !duration) { alert('Please complete all fields.'); return; }
        var metVals = { 3: 2.8, 4: 3.5, 5: 4.3, 6: 5.0, 7: 6.3 };
        var met = metVals[Math.round(speed)] || 4.3;
        var kcal = Math.round((met * 3.5 * weight / 200) * duration);
        var steps = Math.round((speed * 1000 / 60) * duration / 0.762);
        vhtSetResult({
            resultId:    'vht-wcc-result',
            primaryId:   'vht-wcc-primary',
            labelId:     'vht-wcc-label',
            breakdownId: 'vht-wcc-breakdown',
            primary:     kcal.toLocaleString() + ' kcal',
            label:       'Calories burned walking ' + duration + ' minutes at ' + speed + ' km/h',
            breakdown:   '<strong>Distance covered:</strong> ' + ((speed * duration) / 60).toFixed(2) + ' km<br>'
                       + '<strong>Estimated steps:</strong> ~' + steps.toLocaleString() + '<br>'
                       + '<strong>MET value used:</strong> ' + met + '<br>'
                       + 'Actual burn varies by terrain, fitness level, and individual metabolism.'
        });
    };

    /* ── HIIT Calories Calculator ── */
    window.vhtCalcHIIT = function () {
        var weight   = vhtVal('vht-hiitc-weight');
        var duration = vhtVal('vht-hiitc-duration');
        var level    = vhtStr('vht-hiitc-level');
        if (!weight || !duration) { alert('Please complete all fields.'); return; }
        var mets = { beginner: 8, intermediate: 10, advanced: 12 };
        var met  = mets[level] || 10;
        var kcal = Math.round((met * 3.5 * weight / 200) * duration);
        var epoc = Math.round(kcal * 0.12);
        vhtSetResult({
            resultId:    'vht-hiitc-result',
            primaryId:   'vht-hiitc-primary',
            labelId:     'vht-hiitc-label',
            breakdownId: 'vht-hiitc-breakdown',
            primary:     kcal.toLocaleString() + ' kcal',
            label:       'Calories burned during ' + duration + ' min HIIT session',
            breakdown:   '<strong>During session:</strong> ' + kcal + ' kcal<br>'
                       + '<strong>EPOC (afterburn, est.):</strong> +' + epoc + ' kcal over 24 hours<br>'
                       + '<strong>Total estimated burn:</strong> ~' + (kcal + epoc) + ' kcal<br>'
                       + 'EPOC (excess post-exercise oxygen consumption) adds meaningful calorie burn after HIIT.'
        });
    };

    /* ── Strength Training Calories Calculator ── */
    window.vhtCalcStrength = function () {
        var weight   = vhtVal('vht-stcc-weight');
        var duration = vhtVal('vht-stcc-duration');
        var intensity = vhtStr('vht-stcc-intensity');
        if (!weight || !duration) { alert('Please complete all fields.'); return; }
        var mets = { light: 3.0, moderate: 5.0, heavy: 6.0 };
        var met  = mets[intensity] || 5.0;
        var kcal = Math.round((met * 3.5 * weight / 200) * duration);
        vhtSetResult({
            resultId:    'vht-stcc-result',
            primaryId:   'vht-stcc-primary',
            labelId:     'vht-stcc-label',
            breakdownId: 'vht-stcc-breakdown',
            primary:     kcal.toLocaleString() + ' kcal',
            label:       'Calories burned during ' + duration + ' min of strength training',
            breakdown:   'Actual burn varies significantly by training density (sets, reps, rest periods) and exercise selection.<br><br>'
                       + '<strong>EPOC benefit:</strong> Strength training elevates metabolism for 24–48 hours post-session, contributing additional calorie burn beyond the session itself.'
        });
    };

    /* ── Plank Calories Calculator ── */
    window.vhtCalcPlank = function () {
        var weight  = vhtVal('vht-plancc-weight');
        var minutes = vhtVal('vht-plancc-minutes');
        if (!weight || !minutes) { alert('Please enter your weight and plank duration.'); return; }
        var kcal = Math.round((3.8 * 3.5 * weight / 200) * minutes);
        vhtSetResult({
            resultId:    'vht-plancc-result',
            primaryId:   'vht-plancc-primary',
            labelId:     'vht-plancc-label',
            breakdownId: 'vht-plancc-breakdown',
            primary:     kcal + ' kcal',
            label:       'Calories burned holding a plank for ' + minutes + ' minutes',
            breakdown:   'While planks burn fewer calories than cardio, they significantly strengthen the core, improve posture, and support spinal stability — benefits beyond calorie burn alone.'
        });
    };

    /* ── Push-Up Calories Calculator ── */
    window.vhtCalcPushUp = function () {
        var weight = vhtVal('vht-pucc-weight');
        var reps   = vhtVal('vht-pucc-reps');
        if (!weight || !reps) { alert('Please enter your weight and number of reps.'); return; }
        var minutes = reps / 20;
        var kcal    = Math.round((8 * 3.5 * weight / 200) * minutes);
        vhtSetResult({
            resultId:    'vht-pucc-result',
            primaryId:   'vht-pucc-primary',
            labelId:     'vht-pucc-label',
            breakdownId: 'vht-pucc-breakdown',
            primary:     kcal + ' kcal',
            label:       'Calories burned doing ' + reps + ' push-ups',
            breakdown:   '<strong>Estimated at:</strong> ~20 reps/minute pace<br>'
                       + 'Push-ups primarily develop chest, triceps, and anterior deltoids. Combine with back exercises for muscular balance.'
        });
    };

    /* ── Squat Calories Calculator ── */
    window.vhtCalcSquat = function () {
        var weight = vhtVal('vht-sqcc-weight');
        var reps   = vhtVal('vht-sqcc-reps');
        if (!weight || !reps) { alert('Please enter your weight and number of reps.'); return; }
        var minutes = reps / 15;
        var kcal    = Math.round((5.5 * 3.5 * weight / 200) * minutes);
        vhtSetResult({
            resultId:    'vht-sqcc-result',
            primaryId:   'vht-sqcc-primary',
            labelId:     'vht-sqcc-label',
            breakdownId: 'vht-sqcc-breakdown',
            primary:     kcal + ' kcal',
            label:       'Calories burned doing ' + reps + ' bodyweight squats',
            breakdown:   'Squats recruit the largest muscle groups in the body (quads, hamstrings, glutes) — making them one of the most metabolically efficient exercises per rep.'
        });
    };

    /* ── Target Heart Rate Zone Calculator ── */
    window.vhtCalcHRZones = function () {
        var age   = vhtVal('vht-thrzc-age');
        var rhr   = vhtVal('vht-thrzc-rhr') || 65;
        if (!age) { alert('Please enter your age.'); return; }
        var maxHR = 220 - age;
        var hrr   = maxHR - rhr;
        var zones = [
            { name: 'Zone 1 — Active Recovery', min: Math.round(rhr + hrr * 0.50), max: Math.round(rhr + hrr * 0.60) },
            { name: 'Zone 2 — Fat Burn',         min: Math.round(rhr + hrr * 0.60), max: Math.round(rhr + hrr * 0.70) },
            { name: 'Zone 3 — Aerobic',           min: Math.round(rhr + hrr * 0.70), max: Math.round(rhr + hrr * 0.80) },
            { name: 'Zone 4 — Threshold',         min: Math.round(rhr + hrr * 0.80), max: Math.round(rhr + hrr * 0.90) },
            { name: 'Zone 5 — Maximum',           min: Math.round(rhr + hrr * 0.90), max: maxHR }
        ];
        var breakdown = zones.map(function (z) {
            return '<strong>' + z.name + ':</strong> ' + z.min + '–' + z.max + ' bpm';
        }).join('<br>');
        vhtSetResult({
            resultId:    'vht-thrzc-result',
            primaryId:   'vht-thrzc-primary',
            labelId:     'vht-thrzc-label',
            breakdownId: 'vht-thrzc-breakdown',
            primary:     maxHR + ' bpm',
            label:       'Estimated maximum heart rate (Karvonen method zones below)',
            breakdown:   breakdown
        });
    };

    /* ── Resting Heart Rate Checker ── */
    window.vhtCheckRHR = function () {
        var rhr = vhtVal('vht-rhrc-rhr');
        var age = vhtVal('vht-rhrc-age');
        if (!rhr) { alert('Please enter your resting heart rate.'); return; }
        var cat, colour;
        if (rhr < 40)        { cat = 'Very low — consult a doctor';  colour = 'yellow'; }
        else if (rhr < 50)   { cat = 'Athletic — excellent fitness'; colour = 'green'; }
        else if (rhr < 60)   { cat = 'Good — below average RHR';     colour = 'green'; }
        else if (rhr < 70)   { cat = 'Normal — healthy range';       colour = 'green'; }
        else if (rhr < 80)   { cat = 'Normal-high — room to improve';colour = 'yellow'; }
        else if (rhr < 100)  { cat = 'Elevated — consider more cardio'; colour = 'orange'; }
        else                 { cat = 'High — medical review advised'; colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-rhrc-result',
            primaryId:   'vht-rhrc-primary',
            labelId:     'vht-rhrc-label',
            breakdownId: 'vht-rhrc-breakdown',
            primary:     rhr + ' bpm ' + vhtBadge(cat, colour),
            label:       'Your resting heart rate classification',
            breakdown:   'RHR is best measured in the morning before getting out of bed, after at least 5 minutes of rest.<br><br>'
                       + 'Regular aerobic exercise is the most effective way to lower resting heart rate — typically by 5–25 bpm over 12–16 weeks of consistent training.'
        });
    };

    /* ── Recovery Heart Rate Calculator ── */
    window.vhtCalcRecoveryHR = function () {
        var peakHR   = vhtVal('vht-rrhrc-peak');
        var recovery = vhtVal('vht-rrhrc-recovery1min');
        if (!peakHR || !recovery) { alert('Please enter both peak HR and 1-minute recovery HR.'); return; }
        var drop = peakHR - recovery;
        var cat, colour;
        if (drop >= 25)        { cat = 'Excellent cardiac fitness'; colour = 'green'; }
        else if (drop >= 15)   { cat = 'Good';                      colour = 'green'; }
        else if (drop >= 12)   { cat = 'Average';                   colour = 'yellow'; }
        else                   { cat = 'Below average — monitor';   colour = 'orange'; }
        vhtSetResult({
            resultId:    'vht-rrhrc-result',
            primaryId:   'vht-rrhrc-primary',
            labelId:     'vht-rrhrc-label',
            breakdownId: 'vht-rrhrc-breakdown',
            primary:     drop + ' bpm drop ' + vhtBadge(cat, colour),
            label:       '1-minute heart rate recovery',
            breakdown:   'A 1-minute HR drop of 12+ bpm is considered normal. 25+ bpm indicates excellent cardiovascular fitness.<br><br>'
                       + 'Poor heart rate recovery (below 12 bpm drop in 1 minute) is an independent predictor of cardiovascular mortality.'
        });
    };

    /* ── Sleep Cycle Calculator ── */
    window.vhtCalcSleepCycle = function () {
        var bedH   = parseInt(document.getElementById('vht-scc-hour').value)   || 22;
        var bedM   = parseInt(document.getElementById('vht-scc-minute').value) || 30;
        var fallAsleep = 15;
        var totalMins  = bedH * 60 + bedM + fallAsleep;
        var wakeOptions = [];
        for (var c = 3; c <= 6; c++) {
            var wakeMins = totalMins + c * 90;
            var wh = Math.floor(wakeMins / 60) % 24;
            var wm = wakeMins % 60;
            wakeOptions.push(c + ' cycles (' + c * 1.5 + ' hrs): <strong>' + vhtPadTime(wh) + ':' + vhtPadTime(wm) + '</strong>');
        }
        vhtSetResult({
            resultId:    'vht-scc-result',
            primaryId:   'vht-scc-primary',
            labelId:     'vht-scc-label',
            breakdownId: 'vht-scc-breakdown',
            primary:     'Optimal Wake Times',
            label:       'Based on bedtime ' + vhtPadTime(bedH) + ':' + vhtPadTime(bedM) + ' + 15 min to fall asleep',
            breakdown:   wakeOptions.join('<br>')
        });
    };

    /* ── Bedtime Calculator ── */
    window.vhtCalcBedtime = function () {
        var wakeH = parseInt(document.getElementById('vht-btc-hour').value)   || 7;
        var wakeM = parseInt(document.getElementById('vht-btc-minute').value) || 0;
        var wakeMins = wakeH * 60 + wakeM;
        var options  = [];
        for (var c = 3; c <= 6; c++) {
            var bedMins = wakeMins - (c * 90) - 15;
            if (bedMins < 0) bedMins += 1440;
            var bh = Math.floor(bedMins / 60) % 24;
            var bm = bedMins % 60;
            options.push(c + ' cycles (' + (c * 1.5) + ' hrs sleep): <strong>' + vhtPadTime(bh) + ':' + vhtPadTime(bm) + '</strong>');
        }
        vhtSetResult({
            resultId:    'vht-btc-result',
            primaryId:   'vht-btc-primary',
            labelId:     'vht-btc-label',
            breakdownId: 'vht-btc-breakdown',
            primary:     'Bedtime Options',
            label:       'Go to sleep at one of these times to wake at ' + vhtPadTime(wakeH) + ':' + vhtPadTime(wakeM) + ' refreshed',
            breakdown:   options.join('<br>')
        });
    };

    /* ── Nap Time Calculator ── */
    window.vhtCalcNap = function () {
        var goal = vhtStr('vht-ntc-goal');
        var naps = {
            energy:    { duration: '10–20 min', note: 'Power nap. Boosts alertness and mood without sleep inertia. Ideal 1–3 pm.' },
            recovery:  { duration: '30 min',    note: 'Moderate nap. Includes light sleep. May cause slight grogginess on waking.' },
            learning:  { duration: '60 min',    note: 'Includes slow-wave sleep for memory consolidation. Set an alarm to avoid oversleeping into REM.' },
            full:      { duration: '90 min',    note: 'Full sleep cycle. REM + deep sleep. Most restorative — allows you to dream. Wake feeling refreshed if completed fully.' }
        };
        var n = naps[goal] || naps.energy;
        vhtSetResult({
            resultId:    'vht-ntc-result',
            primaryId:   'vht-ntc-primary',
            labelId:     'vht-ntc-label',
            breakdownId: 'vht-ntc-breakdown',
            primary:     n.duration,
            label:       'Ideal nap duration for your goal',
            breakdown:   n.note + '<br><br><strong>Important:</strong> Avoid napping after 3 pm as it can reduce night-time sleep pressure and make falling asleep harder.'
        });
    };

    /* ── Screen Time Wellness Calculator ── */
    window.vhtCalcScreenTime = function () {
        var hours = vhtVal('vht-stwc-hours');
        var work  = vhtVal('vht-stwc-work');
        var rec   = hours - work;
        var cat, colour;
        if (rec <= 1)        { cat = 'Healthy';  colour = 'green';  }
        else if (rec <= 2.5) { cat = 'Moderate'; colour = 'yellow'; }
        else if (rec <= 4)   { cat = 'High';     colour = 'orange'; }
        else                 { cat = 'Very high'; colour = 'red';   }
        vhtSetResult({
            resultId:    'vht-stwc-result',
            primaryId:   'vht-stwc-primary',
            labelId:     'vht-stwc-label',
            breakdownId: 'vht-stwc-breakdown',
            primary:     rec.toFixed(1) + ' hrs recreational ' + vhtBadge(cat, colour),
            label:       'Daily recreational screen time',
            breakdown:   'WHO and NHS recommend limiting recreational screen time for adults to under 2 hours/day.<br><br>'
                       + '<strong>Tips to reduce:</strong><br>'
                       + '• Use app timers to set daily limits<br>'
                       + '• No screens 60–90 min before bed (disrupts melatonin)<br>'
                       + '• Replace 30 min of scrolling with a walk, book, or social call'
        });
    };

    /* ── Stress Recovery Time Calculator ── */
    window.vhtCalcStressRecovery = function () {
        var score = vhtVal('vht-srtc-score');
        if (!score) { alert('Please enter your stress score (1–10).'); return; }
        var days, tips;
        if (score <= 3)      { days = '1–2 days';  tips = 'Continue your current routine. A good night\'s sleep and a restful activity should restore you.'; }
        else if (score <= 5) { days = '3–5 days';  tips = 'Prioritise sleep, reduce commitments, and include daily light movement.'; }
        else if (score <= 7) { days = '1–2 weeks'; tips = 'Implement full recovery protocol: prioritise sleep, reduce intense exercise, increase social time, consider journalling.'; }
        else                 { days = '2–4 weeks'; tips = 'Your stress level is high. Consider speaking with a healthcare provider or mental health professional alongside lifestyle changes.'; }
        vhtSetResult({
            resultId:    'vht-srtc-result',
            primaryId:   'vht-srtc-primary',
            labelId:     'vht-srtc-label',
            breakdownId: 'vht-srtc-breakdown',
            primary:     days,
            label:       'Estimated recovery time for your stress level (' + score + '/10)',
            breakdown:   tips
        });
    };

    /* ── Mindfulness Minutes Calculator ── */
    window.vhtCalcMindfulness = function () {
        var stress   = vhtVal('vht-mmc-stress');
        var current  = vhtVal('vht-mmc-current');
        var goal     = vhtStr('vht-mmc-goal');
        var rec;
        if (stress >= 8)     rec = 20;
        else if (stress >= 5) rec = 15;
        else                  rec = 10;
        if (goal === 'clinical') rec = 45;
        var additional = Math.max(0, rec - current);
        vhtSetResult({
            resultId:    'vht-mmc-result',
            primaryId:   'vht-mmc-primary',
            labelId:     'vht-mmc-label',
            breakdownId: 'vht-mmc-breakdown',
            primary:     rec + ' min/day',
            label:       'Recommended daily mindfulness practice',
            breakdown:   '<strong>Your current practice:</strong> ' + current + ' min/day<br>'
                       + '<strong>Additional recommended:</strong> ' + additional + ' min/day<br><br>'
                       + 'Even 10 minutes of mindfulness daily has measurable effects on perceived stress within 3–4 weeks. MBSR programmes (clinical standard) use 45 min/day for 8 weeks.'
        });
    };

    /* ── Work-Life Balance Score ── */
    window.vhtCalcWorkLifeBalance = function () {
        var qs = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];
        var total = 0;
        qs.forEach(function (q) { total += parseInt(vhtStr('vht-wlbs-' + q)) || 0; });
        var score = Math.round((total / (qs.length * 5)) * 100);
        var cat, colour;
        if (score >= 80)     { cat = 'Excellent balance'; colour = 'green'; }
        else if (score >= 60){ cat = 'Good balance';      colour = 'green'; }
        else if (score >= 40){ cat = 'Moderate imbalance';colour = 'yellow'; }
        else                 { cat = 'Significant imbalance'; colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-wlbs-result',
            primaryId:   'vht-wlbs-primary',
            labelId:     'vht-wlbs-label',
            breakdownId: 'vht-wlbs-breakdown',
            primary:     score + ' / 100 ' + vhtBadge(cat, colour),
            label:       'Your Work-Life Balance Score',
            breakdown:   'Scores below 60 suggest areas needing attention. Focus on whichever of the following is lowest for you: sleep quality, social time, physical activity, personal boundaries, or enjoyment of leisure time.'
        });
    };

    /* ── Posture Risk Calculator ── */
    window.vhtCalcPostureRisk = function () {
        var sitting = vhtVal('vht-prc-sitting');
        var screen  = vhtVal('vht-prc-screen');
        var breaks  = vhtVal('vht-prc-breaks');
        var exercise = vhtVal('vht-prc-exercise');
        var score = 0;
        if (sitting >= 8)  score += 3;
        else if (sitting >= 6) score += 2;
        else if (sitting >= 4) score += 1;
        if (screen >= 8)   score += 2;
        else if (screen >= 5)  score += 1;
        if (breaks <= 1)   score += 2;
        else if (breaks <= 2)  score += 1;
        if (exercise < 3)  score += 2;
        else if (exercise < 5) score += 1;
        var cat, colour;
        if (score <= 2)      { cat = 'Low risk';      colour = 'green'; }
        else if (score <= 5) { cat = 'Moderate risk'; colour = 'yellow'; }
        else                 { cat = 'High risk';     colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-prc-result',
            primaryId:   'vht-prc-primary',
            labelId:     'vht-prc-label',
            breakdownId: 'vht-prc-breakdown',
            primary:     vhtBadge(cat, colour),
            label:       'Posture and musculoskeletal risk level',
            breakdown:   '<strong>Key recommendations:</strong><br>'
                       + '• Stand and move for 2–3 minutes every 30–45 minutes<br>'
                       + '• Ensure monitor is at eye level, arms-length distance<br>'
                       + '• Daily chin tucks, thoracic extension, and hip flexor stretches<br>'
                       + '• Strengthen posterior chain (rows, face pulls, glute bridges)'
        });
    };

    /* ── Desk Break Reminder Calculator ── */
    window.vhtCalcDeskBreak = function () {
        var hours   = vhtVal('vht-dbrc-hours');
        var current = vhtVal('vht-dbrc-breaks');
        var recFreq = 1;    // break every 1 hour minimum
        var recDur  = 5;    // 5 minutes
        var total   = Math.floor(hours / recFreq);
        vhtSetResult({
            resultId:    'vht-dbrc-result',
            primaryId:   'vht-dbrc-primary',
            labelId:     'vht-dbrc-label',
            breakdownId: 'vht-dbrc-breakdown',
            primary:     'Every 45–60 min',
            label:       'Recommended desk break frequency for your ' + hours + '-hour workday',
            breakdown:   '<strong>Recommended breaks today:</strong> ' + total + ' breaks × ' + recDur + ' minutes = ' + total * recDur + ' minutes total<br>'
                       + '<strong>Your current:</strong> ' + current + ' breaks per day<br><br>'
                       + 'What to do in your break: stand, walk to a window, perform 5 neck rolls and 5 shoulder rolls, and drink a glass of water. Set an hourly phone alarm to remind yourself.'
        });
    };

    /* ── Pregnancy Weight Gain Calculator ── */
    window.vhtCalcPregWeight = function () {
        var preBMI    = vhtVal('vht-pwgc-bmi');
        var trimester = parseInt(vhtStr('vht-pwgc-trimester')) || 2;
        var twins     = vhtStr('vht-pwgc-twins') === 'yes';
        var ranges = {
            underweight: [12.7, 18.1],
            normal:      [11.3, 15.9],
            overweight:  [6.8, 11.3],
            obese:       [5.0, 9.1]
        };
        var cat = preBMI < 18.5 ? 'underweight' : preBMI < 25 ? 'normal' : preBMI < 30 ? 'overweight' : 'obese';
        var r = ranges[cat];
        if (twins) { r = [r[0] + 6, r[1] + 9]; }
        var trimPct = [0.1, 0.5, 1.0];
        var minGain = (r[0] * trimPct[trimester - 1]).toFixed(1);
        var maxGain = (r[1] * trimPct[trimester - 1]).toFixed(1);
        vhtSetResult({
            resultId:    'vht-pwgc-result',
            primaryId:   'vht-pwgc-primary',
            labelId:     'vht-pwgc-label',
            breakdownId: 'vht-pwgc-breakdown',
            primary:     r[0] + ' – ' + r[1] + ' kg total',
            label:       'Recommended total pregnancy weight gain (' + cat + ' pre-pregnancy BMI' + (twins ? ', twins' : '') + ')',
            breakdown:   '<strong>Total recommended range:</strong> ' + r[0] + '–' + r[1] + ' kg<br>'
                       + '<strong>By trimester ' + trimester + ':</strong> approx. ' + minGain + '–' + maxGain + ' kg gained by now<br>'
                       + 'Based on Institute of Medicine (IOM) guidelines. Always discuss weight gain with your midwife or OB-GYN.'
        });
    };

    /* ── Baby Feeding Amount Calculator ── */
    window.vhtCalcBabyFeeding = function () {
        var weight = vhtVal('vht-bfac-weight');
        var ageW   = vhtVal('vht-bfac-age');
        var method = vhtStr('vht-bfac-method');
        if (!weight) { alert('Please enter baby\'s weight.'); return; }
        var dailyMlPerKg = ageW < 4 ? 150 : ageW < 8 ? 120 : 90;
        var totalMl      = Math.round(weight * dailyMlPerKg);
        var feeds        = ageW < 2 ? 8 : ageW < 4 ? 7 : ageW < 6 ? 6 : 5;
        var perFeed      = Math.round(totalMl / feeds);
        vhtSetResult({
            resultId:    'vht-bfac-result',
            primaryId:   'vht-bfac-primary',
            labelId:     'vht-bfac-label',
            breakdownId: 'vht-bfac-breakdown',
            primary:     perFeed + ' mL',
            label:       'Per feeding (approx. ' + feeds + ' feeds/day)',
            breakdown:   '<strong>Daily total:</strong> ~' + totalMl + ' mL<br>'
                       + '<strong>Daily feeds:</strong> ' + feeds + '<br>'
                       + '<strong>Method:</strong> ' + method + '<br>'
                       + '<em>These are estimates. Breastfed babies self-regulate; bottle-fed amounts can be measured. Always follow your paediatrician\'s guidance.</em>'
        });
    };

    /* ── Baby Sleep Needs Calculator ── */
    window.vhtCalcBabySleep = function () {
        var ageM = vhtVal('vht-bsnc-age');
        var needs = [
            { maxAge: 3,  total: '14–17 hrs', night: '8–9 hrs', naps: '2–5 hrs (3–5 naps)' },
            { maxAge: 11, total: '12–16 hrs', night: '9–10 hrs', naps: '2–4 hrs (2–3 naps)' },
            { maxAge: 24, total: '11–14 hrs', night: '10–11 hrs', naps: '1–2 hrs (1 nap)' },
            { maxAge: 60, total: '10–13 hrs', night: '10–11 hrs', naps: '0–1 hr (1 optional nap)' },
            { maxAge: 156, total: '9–11 hrs', night: '9–11 hrs',  naps: '—' }
        ];
        var n = needs.find(function (x) { return ageM <= x.maxAge; }) || needs[needs.length - 1];
        vhtSetResult({
            resultId:    'vht-bsnc-result',
            primaryId:   'vht-bsnc-primary',
            labelId:     'vht-bsnc-label',
            breakdownId: 'vht-bsnc-breakdown',
            primary:     n.total,
            label:       'Recommended total daily sleep for your baby\'s age',
            breakdown:   '<strong>Night sleep:</strong> ' + n.night + '<br>'
                       + '<strong>Daytime naps:</strong> ' + n.naps + '<br>'
                       + 'Based on AAP and National Sleep Foundation guidelines. Individual variation is normal.'
        });
    };

    /* ── Baby Growth Percentile Helper ── */
    window.vhtCalcBabyGrowth = function () {
        var weightKg = vhtVal('vht-bgph-weight');
        var ageM     = vhtVal('vht-bgph-age');
        var sex      = vhtStr('vht-bgph-sex');
        if (!weightKg || !ageM) { alert('Please enter weight and age.'); return; }
        vhtSetResult({
            resultId:    'vht-bgph-result',
            primaryId:   'vht-bgph-primary',
            labelId:     'vht-bgph-label',
            breakdownId: 'vht-bgph-breakdown',
            primary:     'See your paediatrician',
            label:       'For an accurate WHO percentile chart assessment',
            breakdown:   '<strong>Your entry:</strong> ' + weightKg + ' kg at ' + ageM + ' months (' + sex + ')<br><br>'
                       + 'For accurate percentile calculation, WHO growth charts require comparison against population data tables. Please bring this weight and age to your paediatrician or health visitor — they use validated software and printed charts for accurate plotting.<br><br>'
                       + '<em>As a general guide: a healthy baby\'s weight should follow a consistent percentile track over time. A drop of more than 2 centile lines (e.g., from 50th to 9th) warrants medical assessment.</em>'
        });
    };

    /* ── Fertile Window Calculator ── */
    window.vhtCalcFertileWindow = function () {
        var lastPeriod = vhtStr('vht-fwc-lastperiod');
        var cycleLen   = vhtVal('vht-fwc-cycle') || 28;
        if (!lastPeriod) { alert('Please enter your last period start date.'); return; }
        var lp         = new Date(lastPeriod);
        var ovulation  = new Date(lp.getTime() + (cycleLen - 14) * 86400000);
        var windowStart= new Date(ovulation.getTime() - 5 * 86400000);
        var windowEnd  = new Date(ovulation.getTime() + 1 * 86400000);
        var nextPeriod = new Date(lp.getTime() + cycleLen * 86400000);
        vhtSetResult({
            resultId:    'vht-fwc-result',
            primaryId:   'vht-fwc-primary',
            labelId:     'vht-fwc-label',
            breakdownId: 'vht-fwc-breakdown',
            primary:     vhtFmtDate(windowStart) + ' – ' + vhtFmtDate(windowEnd),
            label:       'Estimated fertile window (highest conception probability)',
            breakdown:   '<strong>Estimated ovulation:</strong> ' + vhtFmtDate(ovulation) + '<br>'
                       + '<strong>Next period due:</strong> ' + vhtFmtDate(nextPeriod) + '<br>'
                       + '<em>This is an estimate based on average cycle patterns. Actual ovulation varies. Use as a guide only — not as a contraception method.</em>'
        });
    };

    /* ── Period Length Calculator ── */
    window.vhtCalcPeriodLength = function () {
        var lastStart   = vhtStr('vht-plc-last');
        var prevStart   = vhtStr('vht-plc-prev');
        var periodDays  = vhtVal('vht-plc-days') || 5;
        if (!lastStart || !prevStart) { alert('Please enter both period start dates.'); return; }
        var cycleLen = Math.round((new Date(lastStart) - new Date(prevStart)) / 86400000);
        var nextStart = new Date(new Date(lastStart).getTime() + cycleLen * 86400000);
        var nextEnd   = new Date(nextStart.getTime() + periodDays * 86400000);
        vhtSetResult({
            resultId:    'vht-plc-result',
            primaryId:   'vht-plc-primary',
            labelId:     'vht-plc-label',
            breakdownId: 'vht-plc-breakdown',
            primary:     cycleLen + ' days',
            label:       'Your estimated cycle length',
            breakdown:   '<strong>Next period expected:</strong> ' + vhtFmtDate(nextStart) + '<br>'
                       + '<strong>Period end (est.):</strong> ' + vhtFmtDate(nextEnd) + '<br>'
                       + 'A normal menstrual cycle ranges from 21–35 days. Variations of 2–3 days are common. Track 3–6 consecutive cycles for a more accurate average.'
        });
    };

    /* ── PMS Symptom Tracker ── */
    window.vhtCalcPMS = function () {
        var symptoms = ['mood','cramps','bloating','headache','fatigue','anxiety','cravings','sleep'];
        var total = 0;
        symptoms.forEach(function (s) { total += parseInt(vhtStr('vht-pmst-' + s)) || 0; });
        var maxScore = symptoms.length * 3;
        var score    = Math.round((total / maxScore) * 100);
        var cat, colour;
        if (score <= 30)     { cat = 'Mild PMS';     colour = 'green'; }
        else if (score <= 60){ cat = 'Moderate PMS'; colour = 'yellow'; }
        else                 { cat = 'Severe PMS — discuss with your GP'; colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-pmst-result',
            primaryId:   'vht-pmst-primary',
            labelId:     'vht-pmst-label',
            breakdownId: 'vht-pmst-breakdown',
            primary:     score + ' / 100 ' + vhtBadge(cat, colour),
            label:       'PMS Severity Score',
            breakdown:   'Effective evidence-based PMS management strategies include: regular aerobic exercise, calcium (1,200 mg/day), vitamin B6 (80 mg/day), magnesium, reducing caffeine and alcohol, and stress management. Severe PMS (PMDD) may benefit from medical treatment.'
        });
    };

    /* ── Menopause Symptom Score ── */
    window.vhtCalcMenopause = function () {
        var domains = ['hot_flashes','sweating','sleep','mood','anxiety','fatigue','sexual','bladder'];
        var total = 0;
        domains.forEach(function (d) { total += parseInt(vhtStr('vht-mss-' + d)) || 0; });
        var maxScore = domains.length * 3;
        var pct      = Math.round((total / maxScore) * 100);
        var cat, colour;
        if (pct <= 30)     { cat = 'Mild symptoms';     colour = 'green'; }
        else if (pct <= 60){ cat = 'Moderate symptoms'; colour = 'yellow'; }
        else               { cat = 'Significant symptoms — discuss with your doctor'; colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-mss-result',
            primaryId:   'vht-mss-primary',
            labelId:     'vht-mss-label',
            breakdownId: 'vht-mss-breakdown',
            primary:     pct + ' / 100 ' + vhtBadge(cat, colour),
            label:       'Menopause Symptom Severity Score',
            breakdown:   'Lifestyle-based approaches: regular aerobic exercise significantly reduces hot flash frequency; CBT is effective for sleep disruption and psychological symptoms. Hormone replacement therapy (HRT) is the most effective medical treatment — discuss risks and benefits with your doctor.'
        });
    };

    /* ── Waist Circumference Risk Checker ── */
    window.vhtCheckWaistRisk = function () {
        var waist = vhtVal('vht-wcrc-waist');
        var sex   = vhtRadio('vht-wcrc-sex');
        if (!waist || !sex) { alert('Please enter your waist measurement and select sex.'); return; }
        var highThresh = sex === 'male' ? 102 : 88;
        var modThresh  = sex === 'male' ? 94  : 80;
        var cat, colour;
        if (waist < modThresh)   { cat = 'Low risk';      colour = 'green'; }
        else if (waist < highThresh) { cat = 'Moderate risk'; colour = 'yellow'; }
        else                    { cat = 'High risk';     colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-wcrc-result',
            primaryId:   'vht-wcrc-primary',
            labelId:     'vht-wcrc-label',
            breakdownId: 'vht-wcrc-breakdown',
            primary:     waist + ' cm ' + vhtBadge(cat, colour),
            label:       'Waist circumference cardiovascular and metabolic risk',
            breakdown:   '<strong>Moderate risk threshold (' + sex + '):</strong> ' + modThresh + ' cm<br>'
                       + '<strong>High risk threshold (' + sex + '):</strong> ' + highThresh + ' cm<br>'
                       + 'Waist circumference reflects visceral fat — the metabolically active fat surrounding your organs. Reducing it through diet and exercise reduces risk of type 2 diabetes, heart disease, and metabolic syndrome.'
        });
    };

    /* ── Metabolic Age Calculator ── */
    window.vhtCalcMetabolicAge = function () {
        var weight = vhtVal('vht-mac-weight');
        var height = vhtVal('vht-mac-height');
        var age    = vhtVal('vht-mac-age');
        var sex    = vhtRadio('vht-mac-sex');
        if (!weight || !height || !age || !sex) { alert('Please complete all fields.'); return; }
        var bmr = sex === 'male'
            ? (10 * weight) + (6.25 * height) - (5 * age) + 5
            : (10 * weight) + (6.25 * height) - (5 * age) - 161;
        var avgBMRForAge = sex === 'male' ? 1800 - (age - 20) * 7 : 1530 - (age - 20) * 6;
        var metAge = Math.round(20 + (avgBMRForAge - bmr) / 7 + (age - 20));
        var diff = metAge - age;
        var cat, colour;
        if (diff <= -5)      { cat = 'Metabolically younger — excellent!'; colour = 'green'; }
        else if (diff <= 0)  { cat = 'On par with your age';               colour = 'green'; }
        else if (diff <= 5)  { cat = 'Slightly older metabolically';       colour = 'yellow'; }
        else                 { cat = 'Significantly older — action needed'; colour = 'orange'; }
        vhtSetResult({
            resultId:    'vht-mac-result',
            primaryId:   'vht-mac-primary',
            labelId:     'vht-mac-label',
            breakdownId: 'vht-mac-breakdown',
            primary:     metAge + ' years ' + vhtBadge(cat, colour),
            label:       'Your estimated metabolic age (chronological age: ' + age + ')',
            breakdown:   '<strong>Your BMR:</strong> ' + Math.round(bmr) + ' kcal/day<br>'
                       + 'The best ways to improve metabolic age: build muscle mass through resistance training, eat adequate protein (1.6+ g/kg), improve sleep quality, and reduce sedentary time.'
        });
    };

    /* ── Insulin Resistance Risk Estimator ── */
    window.vhtCalcInsulinRisk = function () {
        var waist    = vhtVal('vht-irre-waist');
        var activity = parseInt(vhtStr('vht-irre-activity')) || 3;
        var sugar    = parseInt(vhtStr('vht-irre-sugar')) || 2;
        var family   = vhtStr('vht-irre-family') === 'yes' ? 2 : 0;
        var sex      = vhtRadio('vht-irre-sex');
        var threshold = sex === 'male' ? 94 : 80;
        var waistScore = waist > threshold + 12 ? 3 : waist > threshold ? 2 : 0;
        var actScore = activity < 2 ? 3 : activity < 4 ? 1 : 0;
        var sugarScore = sugar > 3 ? 2 : sugar > 1 ? 1 : 0;
        var total = waistScore + actScore + sugarScore + family;
        var cat, colour;
        if (total <= 2)      { cat = 'Low risk';      colour = 'green'; }
        else if (total <= 5) { cat = 'Moderate risk'; colour = 'yellow'; }
        else                 { cat = 'High risk';     colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-irre-result',
            primaryId:   'vht-irre-primary',
            labelId:     'vht-irre-label',
            breakdownId: 'vht-irre-breakdown',
            primary:     vhtBadge(cat, colour),
            label:       'Estimated insulin resistance risk level',
            breakdown:   'Primary risk reducers: 5–10% body weight loss if overweight, 150 min/week of moderate aerobic exercise, low-glycaemic-index diet high in fibre, reduced added sugar and refined carbohydrates, and improving sleep quality.'
        });
    };

    /* ── Family Health Risk Score ── */
    window.vhtCalcFamilyRisk = function () {
        var heart    = vhtStr('vht-fhrs-heart')    === 'yes' ? 3 : 0;
        var diabetes = vhtStr('vht-fhrs-diabetes') === 'yes' ? 2 : 0;
        var cancer   = vhtStr('vht-fhrs-cancer')   === 'yes' ? 2 : 0;
        var stroke   = vhtStr('vht-fhrs-stroke')   === 'yes' ? 2 : 0;
        var early    = vhtStr('vht-fhrs-early')    === 'yes' ? 2 : 0;
        var total    = heart + diabetes + cancer + stroke + early;
        var cat, colour;
        if (total <= 2)      { cat = 'Average family risk';  colour = 'green'; }
        else if (total <= 5) { cat = 'Elevated family risk'; colour = 'yellow'; }
        else                 { cat = 'High family risk';     colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-fhrs-result',
            primaryId:   'vht-fhrs-primary',
            labelId:     'vht-fhrs-label',
            breakdownId: 'vht-fhrs-breakdown',
            primary:     total + ' / 11 ' + vhtBadge(cat, colour),
            label:       'Family health risk score',
            breakdown:   'Family history increases your risk but does not determine your fate. Lifestyle factors modify genetic risk substantially. Discuss your family history with your GP to ensure appropriate preventive screening is in place.'
        });
    };

    /* ── Heart Health Lifestyle Score ── */
    window.vhtCalcHeartHealth = function () {
        var smoking  = vhtStr('vht-hhls-smoking')  === 'no'     ? 3 : 0;
        var exercise = parseInt(vhtStr('vht-hhls-exercise')) || 0;
        var diet     = parseInt(vhtStr('vht-hhls-diet'))     || 0;
        var bpCheck  = vhtStr('vht-hhls-bp')       === 'yes'    ? 1 : 0;
        var stress   = parseInt(vhtStr('vht-hhls-stress'))   || 0;
        var sleep    = parseInt(vhtStr('vht-hhls-sleep'))    || 0;
        var total    = smoking + exercise + diet + bpCheck + stress + sleep;
        var maxScore = 3 + 3 + 3 + 1 + 3 + 3;
        var pct      = Math.round((total / maxScore) * 100);
        var cat, colour;
        if (pct >= 80)       { cat = 'Heart-healthy lifestyle';  colour = 'green'; }
        else if (pct >= 55)  { cat = 'Good with room to improve'; colour = 'green'; }
        else if (pct >= 35)  { cat = 'Moderate heart risk habits'; colour = 'yellow'; }
        else                 { cat = 'High-risk habits'; colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-hhls-result',
            primaryId:   'vht-hhls-primary',
            labelId:     'vht-hhls-label',
            breakdownId: 'vht-hhls-breakdown',
            primary:     pct + ' / 100 ' + vhtBadge(cat, colour),
            label:       'Heart Health Lifestyle Score',
            breakdown:   'The single highest-impact change is quitting smoking, followed by regular aerobic exercise and blood pressure monitoring. Even small improvements in multiple factors compound into significant cardiovascular risk reduction.'
        });
    };

    /* ── Liver Health Lifestyle Score ── */
    window.vhtCalcLiverHealth = function () {
        var alcohol  = parseInt(vhtStr('vht-lhls-alcohol')) || 0;
        var weight   = vhtStr('vht-lhls-weight')   === 'healthy' ? 2 : vhtStr('vht-lhls-weight') === 'slightly' ? 1 : 0;
        var exercise = parseInt(vhtStr('vht-lhls-exercise')) || 0;
        var diet     = parseInt(vhtStr('vht-lhls-diet'))     || 0;
        var water    = parseInt(vhtStr('vht-lhls-water'))    || 0;
        var total    = alcohol + weight + exercise + diet + water;
        var maxScore = 3 + 2 + 3 + 3 + 3;
        var pct      = Math.round((total / maxScore) * 100);
        var cat, colour;
        if (pct >= 75)       { cat = 'Liver-friendly lifestyle'; colour = 'green'; }
        else if (pct >= 50)  { cat = 'Moderate liver risk';      colour = 'yellow'; }
        else                 { cat = 'Elevated liver risk';      colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-lhls-result',
            primaryId:   'vht-lhls-primary',
            labelId:     'vht-lhls-label',
            breakdownId: 'vht-lhls-breakdown',
            primary:     pct + ' / 100 ' + vhtBadge(cat, colour),
            label:       'Liver Health Lifestyle Score',
            breakdown:   'The liver can regenerate significantly with lifestyle improvement. Key actions: reduce alcohol to within guidelines, achieve and maintain healthy weight, exercise regularly, and eat a fibre-rich, minimally processed diet.'
        });
    };

    /* ── Kidney Hydration Risk Checker ── */
    window.vhtCheckKidneyRisk = function () {
        var water   = vhtVal('vht-khrc-water');
        var urine   = vhtStr('vht-khrc-urine');
        var alcohol = parseInt(vhtStr('vht-khrc-alcohol')) || 0;
        var weight  = vhtVal('vht-khrc-weight') || 70;
        var recommended = weight * 0.035;
        var score = 0;
        if (water < recommended * 0.6) score += 3;
        else if (water < recommended) score += 1;
        if (urine === 'dark') score += 2;
        else if (urine === 'yellow') score += 1;
        score += alcohol;
        var cat, colour;
        if (score <= 1)      { cat = 'Well hydrated';        colour = 'green'; }
        else if (score <= 3) { cat = 'Moderate dehydration risk'; colour = 'yellow'; }
        else                 { cat = 'High dehydration/kidney risk'; colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-khrc-result',
            primaryId:   'vht-khrc-primary',
            labelId:     'vht-khrc-label',
            breakdownId: 'vht-khrc-breakdown',
            primary:     vhtBadge(cat, colour),
            label:       'Kidney hydration risk level',
            breakdown:   '<strong>Your daily water target:</strong> ~' + recommended.toFixed(1) + ' L/day (35 mL/kg)<br>'
                       + 'Chronic mild dehydration is a significant risk factor for kidney stones and urinary tract infections. Light yellow urine throughout the day is the simplest indicator of adequate hydration.'
        });
    };

    /* ── Alcohol Calorie Calculator ── */
    window.vhtCalcAlcohol = function () {
        var beer   = vhtVal('vht-acc-beer');
        var wine   = vhtVal('vht-acc-wine');
        var spirit = vhtVal('vht-acc-spirit');
        var beerKcal   = beer   * 215;
        var wineKcal   = wine   * 160;
        var spiritKcal = spirit * 110;
        var total      = beerKcal + wineKcal + spiritKcal;
        vhtSetResult({
            resultId:    'vht-acc-result',
            primaryId:   'vht-acc-primary',
            labelId:     'vht-acc-label',
            breakdownId: 'vht-acc-breakdown',
            primary:     total.toLocaleString() + ' kcal',
            label:       'Estimated calories from alcohol today',
            breakdown:   (beer   ? '• Beer (pints): ' + beer   + ' × 215 kcal = ' + beerKcal   + ' kcal<br>' : '')
                       + (wine   ? '• Wine (glasses): ' + wine   + ' × 160 kcal = ' + wineKcal   + ' kcal<br>' : '')
                       + (spirit ? '• Spirits (shots): ' + spirit + ' × 110 kcal = ' + spiritKcal + ' kcal<br>' : '')
                       + '<br>Alcohol provides 7 kcal/gram — almost double carbohydrates. These calories provide no nutritional value and may displace food with actual nutrient benefit.'
        });
    };

    /* ── Nicotine Savings Calculator ── */
    window.vhtCalcNicotine = function () {
        var cigs  = vhtVal('vht-nsc-cigs');
        var price = vhtVal('vht-nsc-price') || 14;
        if (!cigs) { alert('Please enter your daily cigarette count.'); return; }
        var packsPerDay = cigs / 20;
        var dayly  = (packsPerDay * price).toFixed(2);
        var weekly = (dayly * 7).toFixed(2);
        var monthly= (dayly * 30).toFixed(2);
        var yearly = (dayly * 365).toFixed(2);
        vhtSetResult({
            resultId:    'vht-nsc-result',
            primaryId:   'vht-nsc-primary',
            labelId:     'vht-nsc-label',
            breakdownId: 'vht-nsc-breakdown',
            primary:     '£' + yearly + ' / year',
            label:       'Money saved by quitting smoking entirely',
            breakdown:   '<strong>Per day:</strong> £' + dayly + '<br>'
                       + '<strong>Per week:</strong> £' + weekly + '<br>'
                       + '<strong>Per month:</strong> £' + monthly + '<br>'
                       + '<strong>Per year:</strong> £' + yearly + '<br><br>'
                       + 'Plus: beyond the financial savings, quitting smoking reduces cardiovascular disease risk, cancer risk, and adds an estimated 10+ years to life expectancy.'
        });
    };

    /* ── Wellness Score Calculator ── */
    window.vhtCalcWellness = function () {
        var domains = ['nutrition','sleep','exercise','stress','hydration','social','purpose'];
        var total = 0;
        domains.forEach(function (d) {
            total += parseInt(vhtStr('vht-wsc-' + d)) || 0;
        });
        var maxScore = domains.length * 5;
        var pct      = Math.round((total / maxScore) * 100);
        var cat, colour;
        if (pct >= 80)       { cat = 'Excellent overall wellness'; colour = 'green'; }
        else if (pct >= 60)  { cat = 'Good wellness';              colour = 'green'; }
        else if (pct >= 40)  { cat = 'Fair — focus on weak areas'; colour = 'yellow'; }
        else                 { cat = 'Needs significant improvement'; colour = 'red'; }
        vhtSetResult({
            resultId:    'vht-wsc-result',
            primaryId:   'vht-wsc-primary',
            labelId:     'vht-wsc-label',
            breakdownId: 'vht-wsc-breakdown',
            primary:     pct + ' / 100 ' + vhtBadge(cat, colour),
            label:       'Your Overall Wellness Score',
            breakdown:   'Review each domain where you scored lowest and pick one to focus on improving this month. Small, consistent improvements in your lowest-scoring areas produce the greatest overall wellness gains.'
        });
    };

    /* ── Helper: pad time digits ── */
    window.vhtPadTime = function (n) { return n < 10 ? '0' + n : '' + n; };

    /* ── Helper: format date ── */
    window.vhtFmtDate = function (d) {
        var days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
    };

    /* ── Range sliders: live value display ── */
    document.addEventListener('DOMContentLoaded', function () {
        var ranges = document.querySelectorAll('input[type="range"][data-vht-range]');
        ranges.forEach(function (r) {
            var display = document.getElementById(r.getAttribute('data-vht-range'));
            if (display) {
                display.textContent = r.value;
                r.addEventListener('input', function () { display.textContent = r.value; });
            }
        });
    });

}());
