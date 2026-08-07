const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const calculatorDirectory = path.join(root, 'calculators');

const repairs = {
  'anti-inflammatory-score': function () {
    var yes = function (id) { return document.getElementById(id).value === 'Yes' ? 1 : 0; };
    var score = yes('omega3') + yes('veggies') + yes('olive') + yes('sugar') + yes('refined') + yes('spice') + yes('alcohol');
    var pct = Math.round(score / 7 * 100);
    var color = score >= 5 ? 'green' : score >= 3 ? 'yellow' : 'red';
    var label = score >= 5 ? 'Many supportive habits' : score >= 3 ? 'Mixed dietary pattern' : 'Few supportive habits';
    var tips = [];
    if (!yes('omega3')) tips.push('add fatty fish twice weekly');
    if (!yes('veggies')) tips.push('increase fruit and vegetable variety');
    if (!yes('olive')) tips.push('choose unsaturated oils');
    if (!yes('sugar')) tips.push('reduce added sugar');
    var note = tips.length ? 'Possible priorities: ' + tips.join(', ') + '.' : 'Your answers include all seven habits in this checklist.';
    showResult('result', score + '/7 (' + pct + '%)', label, 'This is a food-habit checklist, not a measurement of inflammation. ' + note, color);
  },
  'baby-weight-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 0 || age > 36 || !Number.isFinite(weight) || weight <= 0) {
      alert('Enter an age from 0 to 36 months and a valid weight');
      return;
    }
    showResult('result', weight.toFixed(2) + ' kg', 'Growth-chart measurement', 'A valid infant weight percentile requires an official WHO or CDC table for exact age and sex. Record this measurement for a clinician to plot for a ' + sex.toLowerCase() + ' child; a single measurement cannot establish a growth trend.', 'yellow');
  },
  'birthday-calculator': function () {
    var raw = document.getElementById('dob').value;
    if (!raw) { alert('Enter date of birth'); return; }
    var dob = new Date(raw + 'T00:00:00');
    var now = new Date();
    if (Number.isNaN(dob.getTime()) || dob > now) { alert('Enter a valid date of birth'); return; }
    var name = document.getElementById('name').value || 'You';
    var next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (next < now || next.toDateString() === now.toDateString()) next.setFullYear(now.getFullYear() + 1);
    var days = Math.ceil((next - now) / 86400000);
    var age = next.getFullYear() - dob.getFullYear();
    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][next.getDay()];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    showResult('result', days + ' days', 'Next Birthday', name + "'s next birthday is in " + days + ' days, on ' + day + ', ' + months[next.getMonth()] + ' ' + next.getDate() + ', ' + next.getFullYear() + '. Turning ' + age + '.', 'green');
  },
  'child-bmi-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value) / 100;
    var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 2 || age >= 20 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) {
      alert('Enter age 2 to 19, sex, weight, and height');
      return;
    }
    var bmi = weight / (height * height);
    showResult('result', bmi.toFixed(1), 'BMI needs an age-and-sex percentile', 'For children, BMI categories cannot be determined from BMI alone. Use this BMI with an official CDC or WHO chart for exact age and sex, or ask a pediatric clinician to interpret it for a ' + sex.toLowerCase() + ' child.', 'yellow');
  },
  'blood-pressure-checker': function () {
    var systolic = parseFloat(document.getElementById('systolic').value);
    var diastolic = parseFloat(document.getElementById('diastolic').value);
    if (!Number.isFinite(systolic) || !Number.isFinite(diastolic) || systolic < 40 || systolic > 300 || diastolic < 30 || diastolic > 200) {
      alert('Enter a valid systolic and diastolic reading');
      return;
    }
    var color = 'green';
    var label = 'Normal';
    var note = 'This single reading is in the normal category. Diagnosis requires properly taken readings over time.';
    if (systolic >= 180 || diastolic >= 120) {
      color = 'red'; label = 'Severely high reading';
      note = 'Wait at least 1 minute and measure again. If it remains this high, contact a healthcare professional immediately. Call emergency services now if you also have chest pain, shortness of breath, weakness, vision change, back pain, numbness, or difficulty speaking.';
    } else if (systolic >= 140 || diastolic >= 90) {
      color = 'red'; label = 'Stage 2 hypertension range'; note = 'Repeat the measurement correctly and arrange prompt clinical follow-up. One reading alone does not diagnose hypertension.';
    } else if (systolic >= 130 || diastolic >= 80) {
      color = 'yellow'; label = 'Stage 1 hypertension range'; note = 'Track correctly taken readings and discuss the pattern with a healthcare professional.';
    } else if (systolic >= 120 && diastolic < 80) {
      color = 'yellow'; label = 'Elevated range'; note = 'Your systolic reading is elevated. Monitor the pattern and discuss persistent elevation during routine care.';
    }
    showResult('result', systolic + '/' + diastolic + ' mmHg', label, note, color);
  },
  'bmi-prime-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value) / 100;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid weight and height'); return; }
    var bmi = weight / (height * height);
    var prime = bmi / 25;
    var color = prime < 0.74 ? 'yellow' : prime <= 1 ? 'green' : prime <= 1.2 ? 'yellow' : 'red';
    var label = bmi < 18.5 ? 'Below adult healthy range' : bmi < 25 ? 'Within adult healthy range' : bmi < 30 ? 'Above adult healthy range' : 'Obesity range';
    showResult('result', prime.toFixed(2), 'BMI Prime: ' + label, 'BMI ' + bmi.toFixed(1) + ' divided by 25 equals ' + prime.toFixed(2) + '. This screening measure is for adults and does not diagnose health status.', color);
  },
  'body-fat-calculator': function () {
    var sex = document.getElementById('gender').value;
    var waist = parseFloat(document.getElementById('waist').value);
    var neck = parseFloat(document.getElementById('neck').value);
    var height = parseFloat(document.getElementById('height').value);
    var hip = parseFloat(document.getElementById('hip').value);
    if (!Number.isFinite(waist) || !Number.isFinite(neck) || !Number.isFinite(height) || waist <= neck || height <= 0 || (sex === 'Female' && (!Number.isFinite(hip) || hip <= 0))) {
      alert(sex === 'Female' ? 'Enter valid waist, hip, neck, and height measurements' : 'Enter valid waist, neck, and height measurements');
      return;
    }
    var denominator = sex === 'Male'
      ? 1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)
      : 1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height);
    var bodyFat = 495 / denominator - 450;
    if (!Number.isFinite(bodyFat) || bodyFat <= 0 || bodyFat >= 75) { alert('These measurements cannot produce a valid estimate; check the tape measurements'); return; }
    showResult('result', bodyFat.toFixed(1) + '%', 'U.S. Navy circumference estimate', 'This estimate uses measured waist, neck, height' + (sex === 'Female' ? ', and hip' : '') + '. Tape placement and body shape affect accuracy; it is not a clinical measurement.', 'green');
  },
  'child-growth-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    var sex = document.getElementById('gender').value;
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    if (!Number.isFinite(age) || age < 2 || age >= 20 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(weight) || weight <= 0) {
      alert('Enter valid measurements for age 2 to 19'); return;
    }
    var bmi = weight / Math.pow(height / 100, 2);
    showResult('result', 'BMI ' + bmi.toFixed(1), 'Measurements recorded', 'Height: ' + height.toFixed(1) + ' cm | Weight: ' + weight.toFixed(1) + ' kg | Sex: ' + sex + '. Accurate height, weight, and BMI percentiles require official age-in-months and sex-specific growth-chart data; this tool no longer fabricates percentiles.', 'yellow');
  },
  'depression-screening-calculator': function () {
    var total = 0;
    for (var index = 1; index <= 9; index += 1) {
      var value = parseInt(document.getElementById('q' + index).value, 10);
      if (!Number.isInteger(value) || value < 0 || value > 3) { alert('Answer every question with a value from 0 to 3'); return; }
      total += value;
    }
    var selfHarm = parseInt(document.getElementById('q9').value, 10);
    var color = total < 5 ? 'green' : total < 10 ? 'yellow' : 'red';
    var label = total < 5 ? 'Minimal symptoms' : total < 10 ? 'Mild symptoms' : total < 15 ? 'Moderate symptoms' : total < 20 ? 'Moderately severe symptoms' : 'Severe symptoms';
    var note = 'PHQ-9 screening result; this is not a diagnosis. Discuss persistent symptoms or functional difficulty with a qualified professional.';
    if (selfHarm > 0) note = 'You reported thoughts of death or self-harm. Seek immediate support from local emergency or crisis services and tell someone you trust now. This screening result is not a diagnosis.';
    showResult('result', total + '/27', label, note, color);
  },
  'diabetes-risk-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    var bmi = parseFloat(document.getElementById('bmi').value);
    var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 18 || age > 120 || !Number.isFinite(bmi) || bmi < 10 || bmi > 80) { alert('Enter a valid adult age and BMI'); return; }
    var score = age >= 60 ? 3 : age >= 50 ? 2 : age >= 40 ? 1 : 0;
    if (sex === 'Male') score += 1;
    if (sex === 'Female' && document.getElementById('gestational').value === 'Yes') score += 1;
    if (document.getElementById('family').value === 'Yes') score += 1;
    if (document.getElementById('bloodpressure').value === 'Yes') score += 1;
    if (document.getElementById('activity').value === 'No') score += 1;
    score += bmi >= 40 ? 3 : bmi >= 30 ? 2 : bmi >= 25 ? 1 : 0;
    var high = score >= 5;
    showResult('result', score + '/10', high ? 'Increased prediabetes risk' : 'Below the test threshold', high ? 'This matches the CDC/ADA screening threshold. Only a blood test can diagnose prediabetes or diabetes; arrange testing with a healthcare professional.' : 'This CDC/ADA screening score is below 5, but it cannot rule out prediabetes. Ask about blood testing if you have symptoms, previous abnormal results, or clinical concerns.', high ? 'red' : 'green');
  },
  'diet-comparison-calculator': function () {
    var calories = parseFloat(document.getElementById('calories').value);
    var diet = document.getElementById('diet').value;
    if (!Number.isFinite(calories) || calories < 800 || calories > 10000) { alert('Enter a valid daily calorie amount'); return; }
    var profiles = {
      'Standard Western': [0.15, 0.55, 0.30], 'Mediterranean': [0.20, 0.50, 0.30], 'Ketogenic': [0.20, 0.05, 0.75],
      'High Protein': [0.35, 0.40, 0.25], 'Plant-Based': [0.15, 0.60, 0.25], 'Paleo': [0.30, 0.35, 0.35],
      'Low Carb': [0.30, 0.20, 0.50], 'Intermittent Fasting (16:8)': [0.25, 0.45, 0.30]
    };
    var profile = profiles[diet];
    if (!profile) { alert('Choose a diet pattern'); return; }
    var protein = Math.round(calories * profile[0] / 4);
    var carbs = Math.round(calories * profile[1] / 4);
    var fat = Math.round(calories * profile[2] / 9);
    showResult('result', diet, 'Illustrative macro profile', 'At ' + calories + ' kcal: approximately ' + protein + ' g protein, ' + carbs + ' g carbohydrate, and ' + fat + ' g fat. These are example ratios, not an evidence ranking or personalized prescription.', 'green');
  },
  'electrolyte-calculator': function () {
    var activity = document.getElementById('activity').value;
    var climate = document.getElementById('climate').value;
    var sweat = document.getElementById('sweat').value;
    var note = 'General adult reference amounts: sodium under 2,300 mg/day, potassium about 2,600 mg/day for adult women or 3,400 mg/day for adult men, and magnesium 310-420 mg/day depending on age and sex.';
    if (activity !== 'Sedentary' || climate === 'Hot/Humid' || sweat !== 'Light Sweater') note += ' Exercise and heat losses vary widely; replace fluids and electrolytes according to duration, measured sweat loss, medical conditions, and professional advice rather than a fixed body-weight formula.';
    showResult('result', 'Individual needs vary', 'Electrolyte reference, not a prescription', note, 'yellow');
  },
  'heart-age-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 100) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if (document.getElementById('smoker').value === 'Yes') factors.push('current smoking');
    if (parseFloat(document.getElementById('bp').value) >= 130) factors.push('systolic blood pressure at or above 130');
    if (parseFloat(document.getElementById('chol').value) >= 200) factors.push('total cholesterol at or above 200');
    if (document.getElementById('diabetic').value === 'Yes') factors.push('diabetes');
    if ((parseFloat(document.getElementById('exercise').value) || 0) < 2) factors.push('low reported activity');
    var label = factors.length ? factors.length + ' modifiable factor' + (factors.length === 1 ? '' : 's') + ' identified' : 'No listed modifiable factors identified';
    showResult('result', label, 'Cardiovascular factor summary', factors.length ? 'Review with a healthcare professional: ' + factors.join(', ') + '. A valid heart-age estimate requires a validated regional model and additional clinical inputs; this tool does not invent an age.' : 'This short checklist is not a cardiovascular risk calculation. Routine clinical screening is still important.', factors.length >= 3 ? 'red' : factors.length ? 'yellow' : 'green');
  },
  'hiit-calories-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var duration = parseFloat(document.getElementById('duration').value);
    var intensity = document.getElementById('intensity').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0) { alert('Enter valid weight and duration'); return; }
    var mets = {'Moderate (e.g., basic circuits)': 8, 'High (e.g., sprint intervals)': 12, 'Very High (e.g., Tabata, CrossFit)': 15};
    var met = mets[intensity] || 10;
    var calories = Math.round(met * 3.5 * weight / 200 * duration);
    showResult('result', '~' + calories + ' kcal', 'Estimated workout energy use', 'Calculated from the selected MET value for ' + duration + ' minutes. HIIT varies substantially by work-to-rest ratio and actual intensity; no fixed afterburn percentage has been added.', 'green');
  },
  'homa-ir-calculator': function () {
    var glucose = parseFloat(document.getElementById('glucose').value);
    var insulin = parseFloat(document.getElementById('insulin').value);
    if (!Number.isFinite(glucose) || glucose <= 0 || !Number.isFinite(insulin) || insulin <= 0) { alert('Enter valid fasting glucose and insulin values'); return; }
    var homa = (glucose / 18 * insulin) / 22.5;
    showResult('result', homa.toFixed(2), 'HOMA-IR estimate', 'Formula: fasting insulin (µU/mL) × fasting glucose (mmol/L) ÷ 22.5. Cutoffs vary by laboratory and population, so this result must be interpreted by a clinician and is not a diagnosis.', 'yellow');
  },
  'intermittent-fasting-calculator': function () {
    var method = document.getElementById('method').value;
    var start = document.getElementById('start').value;
    if (!start) { alert('Enter an eating-window start time'); return; }
    if (method === '5:2') {
      showResult('result', '5:2 weekly pattern', 'Choose two non-consecutive reduced-intake days', 'The 5:2 method is based on days, not a daily eating window. Eat normally on five days and use the two reduced-intake days only if appropriate for you. Avoid fasting during pregnancy, eating-disorder recovery, or when medication/medical conditions require regular meals.', 'yellow');
      return;
    }
    var hours = {'16:8': 8, '18:6': 6, '20:4': 4};
    var eating = hours[method];
    if (!eating) { alert('Choose a supported fasting method'); return; }
    var parts = start.split(':');
    var startMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    var endMinutes = (startMinutes + eating * 60) % 1440;
    var format = function (minutes) { var hour = Math.floor(minutes / 60); var minute = minutes % 60; return (hour % 12 || 12) + ':' + (minute < 10 ? '0' : '') + minute + ' ' + (hour < 12 ? 'AM' : 'PM'); };
    showResult('result', method + ' schedule', 'Eating window', format(startMinutes) + ' to ' + format(endMinutes) + ' (' + eating + ' hours). This is a scheduling aid, not a medical recommendation.', 'green');
  },
  'lean-mass-goal-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var bodyFat = parseFloat(document.getElementById('bodyfat').value);
    var targetBodyFat = parseFloat(document.getElementById('targetbf').value);
    var goal = document.getElementById('goal').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(bodyFat) || bodyFat <= 0 || bodyFat >= 70 || !Number.isFinite(targetBodyFat) || targetBodyFat <= 0 || targetBodyFat >= 70) { alert('Enter valid weight and body-fat percentages'); return; }
    var leanMass = weight * (1 - bodyFat / 100);
    if (goal === 'Lose Fat (maintain muscle)') {
      var targetWeight = leanMass / (1 - targetBodyFat / 100);
      var change = weight - targetWeight;
      showResult('result', change > 0 ? change.toFixed(1) + ' kg' : 'Target is not below current fat level', 'Theoretical fat-mass change', 'If lean mass stayed exactly constant, target weight would be ' + targetWeight.toFixed(1) + ' kg. Real changes are not perfectly linear, and body-fat estimates contain measurement error.', change > 0 ? 'green' : 'yellow');
    } else {
      showResult('result', leanMass.toFixed(1) + ' kg', 'Current estimated lean mass', 'Current estimated fat mass: ' + (weight - leanMass).toFixed(1) + ' kg. Muscle-gain speed and resulting body-fat percentage cannot be predicted accurately from these inputs; track repeated measurements instead.', 'green');
    }
  },
  'life-expectancy-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 120) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if (document.getElementById('smoking').value === 'Current') factors.push('current smoking');
    if (document.getElementById('exercise').value === 'None') factors.push('no regular exercise');
    if (document.getElementById('diet').value === 'Poor') factors.push('poor self-rated diet');
    if (document.getElementById('bmi').value === 'Obese') factors.push('BMI in the obesity category');
    showResult('result', factors.length + ' flagged factor' + (factors.length === 1 ? '' : 's'), 'Longevity habit summary', factors.length ? 'This checklist identified: ' + factors.join(', ') + '. It cannot calculate an individual lifespan. Population life tables and clinical risk models require country, health history, and other data.' : 'No listed factors were flagged, but this short checklist cannot predict lifespan or replace preventive care.', factors.length >= 3 ? 'red' : factors.length ? 'yellow' : 'green');
  },
  'loan-emi-calculator': function () {
    var principal = parseFloat(document.getElementById('principal').value);
    var annualRate = parseFloat(document.getElementById('rate').value);
    var months = parseInt(document.getElementById('tenure').value, 10);
    if (!Number.isFinite(principal) || principal <= 0 || !Number.isFinite(annualRate) || annualRate < 0 || !Number.isInteger(months) || months <= 0) { alert('Enter a valid principal, non-negative rate, and loan term'); return; }
    var monthlyRate = annualRate / 100 / 12;
    var payment = monthlyRate === 0 ? principal / months : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    var total = payment * months;
    showResult('result', '$' + payment.toFixed(2) + '/mo', 'Monthly payment', 'Total repayment: $' + total.toFixed(2) + ' | Total interest: $' + (total - principal).toFixed(2) + '. Excludes fees, taxes, insurance, and rate changes.', 'green');
  },
  'medication-dosage-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var dosePerKgPerDay = parseFloat(document.getElementById('dose').value);
    var frequency = parseInt(document.getElementById('frequency').value, 10);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(dosePerKgPerDay) || dosePerKgPerDay <= 0 || !Number.isInteger(frequency) || frequency < 1 || frequency > 24) { alert('Enter valid values from a written clinician or pharmacist instruction'); return; }
    var totalDaily = weight * dosePerKgPerDay;
    var perDose = totalDaily / frequency;
    showResult('result', perDose.toFixed(2) + ' mg', 'Arithmetic result—not a dose recommendation', 'Math only: ' + weight + ' kg × ' + dosePerKgPerDay + ' mg/kg/day = ' + totalDaily.toFixed(2) + ' mg/day; divided into ' + frequency + ' doses = ' + perDose.toFixed(2) + ' mg each. Do not administer from this result. Drug-specific maximums, route, concentration, age, organ function, interactions, and rounding must be checked by a pharmacist or prescriber.', 'red');
  },
  'metabolic-age-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value);
    var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 18 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid adult age, weight, and height'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    showResult('result', Math.round(bmr) + ' kcal/day', 'Estimated resting energy expenditure', 'Calculated with the Mifflin–St Jeor equation. “Metabolic age” has no standardized clinical formula, so this tool reports the supported BMR estimate instead of inventing an age.', 'green');
  },
  'ovulation-calculator': function () {
    var raw = document.getElementById('lmp').value;
    var cycle = parseFloat(document.getElementById('cycle').value);
    if (!raw || !Number.isFinite(cycle) || cycle < 21 || cycle > 45) { alert('Enter a period start date and a typical cycle length from 21 to 45 days'); return; }
    var start = new Date(raw + 'T00:00:00');
    var ovulation = new Date(start); ovulation.setDate(ovulation.getDate() + cycle - 14);
    var fertileStart = new Date(ovulation); fertileStart.setDate(fertileStart.getDate() - 5);
    var fertileEnd = new Date(ovulation); fertileEnd.setDate(fertileEnd.getDate() + 1);
    var format = function (date) { return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(); };
    showResult('result', format(ovulation), 'Estimated ovulation date', 'Estimated fertile window: ' + format(fertileStart) + ' to ' + format(fertileEnd) + '. Calendar estimates are unreliable with irregular cycles and cannot prevent or confirm pregnancy.', 'yellow');
  },
  'password-generator': function () {
    var length = Math.max(8, Math.min(64, parseInt(document.getElementById('length').value, 10) || 16));
    var groups = ['abcdefghijklmnopqrstuvwxyz'];
    if (document.getElementById('upper').value === 'Yes') groups.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (document.getElementById('nums').value === 'Yes') groups.push('0123456789');
    if (document.getElementById('sym').value === 'Yes') groups.push('!@#$%^&*_+-=?');
    if (!window.crypto || !window.crypto.getRandomValues) { alert('Secure randomness is unavailable in this browser'); return; }
    var all = groups.join('');
    var randomIndex = function (limit) { var value = new Uint32Array(1); var ceiling = Math.floor(4294967296 / limit) * limit; do { window.crypto.getRandomValues(value); } while (value[0] >= ceiling); return value[0] % limit; };
    var characters = groups.map(function (group) { return group[randomIndex(group.length)]; });
    while (characters.length < length) characters.push(all[randomIndex(all.length)]);
    for (var index = characters.length - 1; index > 0; index -= 1) { var swap = randomIndex(index + 1); var temp = characters[index]; characters[index] = characters[swap]; characters[swap] = temp; }
    var password = characters.join('');
    showResult('result', password, 'Cryptographically generated password', 'Generated with the browser Web Crypto API and includes at least one character from every selected group. Store it in a password manager and do not reuse it.', 'green');
  },
  'pcos-risk-calculator': function () {
    var symptoms = [];
    if (document.getElementById('cycle').value !== 'No') symptoms.push('irregular or absent cycles');
    if (document.getElementById('acne').value !== 'None') symptoms.push('acne');
    if (document.getElementById('hair').value !== 'No') symptoms.push('increased hair growth');
    if (document.getElementById('weight').value !== 'No') symptoms.push('weight change');
    if (document.getElementById('hairloss').value !== 'No') symptoms.push('hair loss');
    if (document.getElementById('family').value === 'Yes') symptoms.push('family history');
    showResult('result', symptoms.length + ' item' + (symptoms.length === 1 ? '' : 's') + ' reported', 'PCOS symptom checklist', symptoms.length ? 'Reported: ' + symptoms.join(', ') + '. This is not a PCOS probability or diagnosis. Similar symptoms have other causes; discuss persistent cycle or androgen-related symptoms with a qualified clinician.' : 'No listed features were reported. This checklist cannot rule out PCOS or other hormonal conditions.', symptoms.length >= 3 ? 'yellow' : 'green');
  },
  'percentage-calculator': function () {
    var mode = document.getElementById('mode').value;
    var x = parseFloat(document.getElementById('val1').value);
    var y = parseFloat(document.getElementById('val2').value);
    if (!Number.isFinite(x) || !Number.isFinite(y)) { alert('Enter both values'); return; }
    var result; var label; var note;
    if (mode === 'What is X% of Y?') { result = x / 100 * y; label = x + '% of ' + y; note = x + '% × ' + y + ' = ' + result.toFixed(2); }
    else if (mode === 'X is what % of Y?') { if (y === 0) { alert('The comparison value cannot be zero'); return; } result = x / y * 100; label = 'Percentage result'; note = x + ' is ' + result.toFixed(2) + '% of ' + y + '.'; }
    else if (mode === '% Change from X to Y') { if (x === 0) { alert('Percent change is undefined when the starting value is zero'); return; } result = (y - x) / Math.abs(x) * 100; label = result > 0 ? 'Increase' : result < 0 ? 'Decrease' : 'No change'; note = 'Difference: ' + (y - x).toFixed(2) + '.'; }
    else if (mode === 'Add X% to Y') { result = y * (1 + x / 100); label = 'After adding ' + x + '%'; note = 'Added amount: ' + (y * x / 100).toFixed(2) + '.'; }
    else { result = y * (1 - x / 100); label = 'After subtracting ' + x + '%'; note = 'Subtracted amount: ' + (y * x / 100).toFixed(2) + '.'; }
    showResult('result', result.toFixed(2) + (mode === '% Change from X to Y' ? '%' : ''), label, note, 'green');
  },
  'running-pace-calculator': function () {
    var distance = parseFloat(document.getElementById('distance').value);
    var time = parseFloat(document.getElementById('time').value);
    if (!Number.isFinite(distance) || distance <= 0 || !Number.isFinite(time) || time <= 0) { alert('Enter a valid distance and time'); return; }
    var paceSeconds = Math.round(time * 60 / distance);
    var minutes = Math.floor(paceSeconds / 60);
    var seconds = paceSeconds % 60;
    var speed = distance / (time / 60);
    showResult('result', minutes + ':' + (seconds < 10 ? '0' : '') + seconds + '/km', 'Average running pace', 'Average speed: ' + speed.toFixed(1) + ' km/h. Same-pace projections: 5 km ' + Math.round(paceSeconds * 5 / 60) + ' min; 10 km ' + Math.round(paceSeconds * 10 / 60) + ' min. Longer-race performance usually slows, so these are not race predictions.', 'green');
  },
  'sleep-calculator': function () {
    var wake = document.getElementById('wakeup').value;
    var age = parseFloat(document.getElementById('age').value);
    if (!wake || !Number.isFinite(age) || age < 6 || age > 120) { alert('Enter a wake time and age 6 or older'); return; }
    var range = age <= 12 ? [9, 12] : age <= 18 ? [8, 10] : age <= 64 ? [7, 9] : [7, 8];
    var parts = wake.split(':');
    var wakeMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    var format = function (minutes) { minutes = (minutes + 1440) % 1440; var hour = Math.floor(minutes / 60); var minute = minutes % 60; return (hour % 12 || 12) + ':' + (minute < 10 ? '0' : '') + minute + ' ' + (hour < 12 ? 'AM' : 'PM'); };
    var latest = wakeMinutes - range[0] * 60;
    var earliest = wakeMinutes - range[1] * 60;
    showResult('result', range[0] + '-' + range[1] + ' hours', 'Age-based sleep range', 'For a ' + age + '-year-old waking at ' + format(wakeMinutes) + ', the corresponding sleep window is approximately ' + format(earliest) + ' to ' + format(latest) + '. Individual needs vary; fixed 90-minute cycles are not precise enough to prescribe a bedtime.', 'green');
  },
  'sodium-intake-calculator': function () {
    var current = parseFloat(document.getElementById('current').value);
    var condition = document.getElementById('condition').value;
    if (!Number.isFinite(current) || current < 0 || current > 30000) { alert('Enter a valid estimated sodium intake'); return; }
    var limit = 2300;
    var color = current <= limit ? 'green' : current <= limit * 1.3 ? 'yellow' : 'red';
    var note = 'General adult limit used here: less than 2,300 mg/day. Your estimate is ' + Math.abs(current - limit).toFixed(0) + ' mg ' + (current > limit ? 'above' : 'below') + ' that level.';
    if (condition !== 'Healthy Adult') note += ' A fixed 1,500 mg target should not be assigned solely from this dropdown; ask your clinician for an individualized target.';
    note += ' Heavy prolonged exercise can change replacement needs, but this tool does not add an arbitrary exercise allowance.';
    showResult('result', current.toFixed(0) + ' mg/day', current <= limit ? 'At or below general limit' : 'Above general limit', note, color);
  },
  'strength-level-calculator': function () {
    var bodyWeight = parseFloat(document.getElementById('weight').value);
    if (!Number.isFinite(bodyWeight) || bodyWeight <= 0) { alert('Enter body weight'); return; }
    var lifts = [['Bench', parseFloat(document.getElementById('bench').value)], ['Squat', parseFloat(document.getElementById('squat').value)], ['Deadlift', parseFloat(document.getElementById('deadlift').value)]];
    var valid = lifts.filter(function (item) { return Number.isFinite(item[1]) && item[1] > 0; });
    if (!valid.length) { alert('Enter at least one lift'); return; }
    var details = valid.map(function (item) { return item[0] + ': ' + item[1] + ' kg (' + (item[1] / bodyWeight).toFixed(2) + '× body weight)'; });
    var average = valid.reduce(function (sum, item) { return sum + item[1] / bodyWeight; }, 0) / valid.length;
    showResult('result', average.toFixed(2) + '× average', 'Body-weight-relative lift summary', details.join(' | ') + '. Strength standards depend on lift, sex, age, technique, equipment, and training population, so this tool does not assign a universal rank.', 'green');
  },
  'stress-level-calculator': function () {
    var sleep = parseFloat(document.getElementById('sleep').value);
    var work = parseFloat(document.getElementById('work').value);
    var exercise = parseFloat(document.getElementById('exercise').value);
    var social = parseFloat(document.getElementById('social').value);
    var worry = parseFloat(document.getElementById('worry').value);
    if ([sleep, work, exercise, social, worry].some(function (value) { return !Number.isFinite(value) || value < 1 || value > 5; })) { alert('Answer every item from 1 to 5'); return; }
    var concerns = [];
    if (sleep <= 2) concerns.push('poor sleep quality'); if (work >= 4) concerns.push('high work stress'); if (exercise <= 2) concerns.push('low activity'); if (social <= 2) concerns.push('limited support'); if (worry >= 4) concerns.push('frequent worry');
    showResult('result', concerns.length + '/5 concerns', 'Wellbeing check-in', concerns.length ? 'Reported concerns: ' + concerns.join(', ') + '. This five-item check-in is not a validated stress scale or diagnosis. Seek professional support if distress is persistent, severe, or affects safety.' : 'No major concerns were flagged by this short check-in. It is not a validated stress measurement.', concerns.length >= 3 ? 'red' : concerns.length ? 'yellow' : 'green');
  },
  'stroke-risk-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 120) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if (age >= 65) factors.push('age 65 or older');
    if (document.getElementById('bp').value === 'Yes') factors.push('high blood pressure');
    if (document.getElementById('smoking').value === 'Yes') factors.push('smoking');
    if (document.getElementById('diabetes').value === 'Yes') factors.push('diabetes');
    if (document.getElementById('afib').value === 'Yes') factors.push('atrial fibrillation');
    showResult('result', factors.length + ' factor' + (factors.length === 1 ? '' : 's'), 'Stroke risk-factor summary', factors.length ? 'Reported: ' + factors.join(', ') + '. This is not a percentage or validated stroke-risk score. Atrial fibrillation requires a specific clinician-assessed model, and sudden stroke symptoms require emergency services.' : 'No listed factors were reported, but this short checklist cannot calculate or rule out stroke risk.', factors.length >= 3 ? 'red' : factors.length ? 'yellow' : 'green');
  },
  'testosterone-estimator': function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 100) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if ((parseFloat(document.getElementById('sleep').value) || 0) < 7) factors.push('short sleep');
    if ((parseFloat(document.getElementById('exercise').value) || 0) < 2) factors.push('low activity');
    if ((parseFloat(document.getElementById('stress').value) || 0) >= 4) factors.push('high stress');
    if (document.getElementById('bmi').value === 'Obese') factors.push('obesity category');
    if (document.getElementById('alcohol').value === 'Heavy (8+ drinks/week)') factors.push('higher alcohol intake');
    showResult('result', factors.length + ' relevant factor' + (factors.length === 1 ? '' : 's'), 'Hormone-health checklist', factors.length ? 'Reported: ' + factors.join(', ') + '. Testosterone concentration cannot be calculated from lifestyle answers. Diagnosis requires symptoms plus properly timed laboratory testing interpreted by a clinician.' : 'No listed lifestyle factors were flagged. This cannot estimate a testosterone level; only appropriate laboratory testing can do that.', factors.length >= 3 ? 'yellow' : 'green');
  },
  'thyroid-risk-calculator': function () {
    var symptoms = [];
    [['fatigue', 'fatigue'], ['weight', 'weight change'], ['cold', 'temperature sensitivity'], ['hair', 'hair or skin change'], ['mood', 'mood change']].forEach(function (item) { if ((parseFloat(document.getElementById(item[0]).value) || 0) >= 3) symptoms.push(item[1]); });
    if (document.getElementById('family').value === 'Yes') symptoms.push('family history');
    showResult('result', symptoms.length + ' item' + (symptoms.length === 1 ? '' : 's') + ' reported', 'Thyroid-related symptom checklist', symptoms.length ? 'Reported: ' + symptoms.join(', ') + '. These symptoms are nonspecific and cannot produce a thyroid-risk score. Diagnosis requires clinical evaluation and thyroid blood tests.' : 'No major listed features were reported. This checklist cannot rule out thyroid disease.', symptoms.length >= 3 ? 'yellow' : 'green');
  },
  'visceral-fat-calculator': function () {
    var waist = parseFloat(document.getElementById('waist').value);
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    if (!Number.isFinite(waist) || waist <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(weight) || weight <= 0) { alert('Enter valid waist, height, and weight'); return; }
    var ratio = waist / height;
    var bmi = weight / Math.pow(height / 100, 2);
    var color = ratio < 0.5 ? 'green' : ratio < 0.6 ? 'yellow' : 'red';
    showResult('result', ratio.toFixed(2), 'Waist-to-height ratio', 'BMI: ' + bmi.toFixed(1) + '. Tape measurements can screen central size, but they cannot measure visceral-fat mass or assign a CT-style visceral-fat level. Medical imaging is required for direct assessment.', color);
  },
  'vitamin-d-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 1 || age > 120) { alert('Enter a valid age'); return; }
    var amount = age > 70 ? 800 : 600;
    showResult('result', amount + ' IU (15' + (age > 70 ? '–20' : '') + ' mcg)', 'General daily reference amount', 'The adult reference amount is 600 IU through age 70 and 800 IU after 70. Sun exposure and skin tone do not translate into a safe supplement dose; testing, diet, medications, and medical history should guide individualized advice.', 'green');
  },
  'waist-reduction-calculator': function () {
    var current = parseFloat(document.getElementById('current').value);
    var target = parseFloat(document.getElementById('target').value);
    if (!Number.isFinite(current) || current <= 0 || !Number.isFinite(target) || target <= 0) { alert('Enter valid current and target waist measurements'); return; }
    var difference = current - target;
    showResult('result', Math.abs(difference).toFixed(1) + ' cm', difference > 0 ? 'Difference to target' : difference < 0 ? 'Current measurement is below target' : 'Target reached', 'Waist change cannot be converted reliably into a number of weeks from calorie deficit and exercise inputs. Measure under consistent conditions and track the observed trend rather than using a fabricated centimetres-per-week formula.', difference > 0 ? 'green' : 'yellow');
  },
  'work-life-balance-calculator': function () {
    var work = parseFloat(document.getElementById('workhours').value);
    var commute = parseFloat(document.getElementById('commute').value);
    var vacation = parseFloat(document.getElementById('vacation').value);
    var exercise = parseFloat(document.getElementById('exercise').value);
    var social = parseFloat(document.getElementById('social').value);
    var sleep = parseFloat(document.getElementById('sleep').value);
    if ([work, commute, vacation, exercise, social, sleep].some(function (value) { return !Number.isFinite(value) || value < 0; })) { alert('Complete every field with a non-negative value'); return; }
    var concerns = [];
    if (work > 50) concerns.push('more than 50 work hours'); if (commute > 60) concerns.push('long daily commute'); if (vacation < 10) concerns.push('limited annual leave'); if (exercise < 2) concerns.push('low activity'); if (social < 5) concerns.push('limited social time'); if (sleep < 7) concerns.push('short sleep');
    showResult('result', concerns.length + '/6 concerns', 'Work-life check-in', concerns.length ? 'Reported: ' + concerns.join(', ') + '. This is a transparent checklist, not a validated wellbeing score. Use it to choose one realistic change or seek support if strain is persistent.' : 'No listed concerns were flagged. This short checklist is not a clinical wellbeing measure.', concerns.length >= 4 ? 'red' : concerns.length ? 'yellow' : 'green');
  },
  'age-calculator': function () {
    var raw = document.getElementById('dob').value;
    if (!raw) { alert('Enter your date of birth'); return; }
    var birth = new Date(raw + 'T00:00:00');
    var today = new Date();
    if (Number.isNaN(birth.getTime()) || birth > today) { alert('Enter a valid past date'); return; }
    var years = today.getFullYear() - birth.getFullYear();
    var months = today.getMonth() - birth.getMonth();
    var days = today.getDate() - birth.getDate();
    if (days < 0) { months -= 1; var previousMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += previousMonth.getDate(); }
    if (months < 0) { years -= 1; months += 12; }
    var totalDays = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(birth.getFullYear(), birth.getMonth(), birth.getDate())) / 86400000);
    var next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (next < today || next.toDateString() === today.toDateString()) next.setFullYear(today.getFullYear() + 1);
    var daysLeft = Math.ceil((Date.UTC(next.getFullYear(), next.getMonth(), next.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
    showResult('result', years + ' years ' + months + 'mo ' + days + 'd', 'Calendar age', totalDays.toLocaleString() + ' complete days since birth. Next birthday in ' + daysLeft + ' days.', 'green');
  },
  'age-in-days-calculator': function () {
    var raw = document.getElementById('dob').value;
    if (!raw) { alert('Enter date of birth'); return; }
    var birth = new Date(raw + 'T00:00:00'); var today = new Date();
    if (Number.isNaN(birth.getTime()) || birth > today) { alert('Enter a valid past date'); return; }
    var days = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(birth.getFullYear(), birth.getMonth(), birth.getDate())) / 86400000);
    var unit = document.getElementById('unit').value; var value; var label;
    if (unit === 'Hours') { value = (days * 24).toLocaleString(); label = 'Complete calendar-day hours'; }
    else if (unit === 'Minutes') { value = (days * 1440).toLocaleString(); label = 'Complete calendar-day minutes'; }
    else if (unit === 'Weeks + Days') { value = Math.floor(days / 7).toLocaleString() + ' wk ' + (days % 7) + 'd'; label = 'Weeks and days'; }
    else { value = days.toLocaleString(); label = 'Complete days'; }
    showResult('result', value, label, 'Calculated from calendar dates at midnight, avoiding daylight-saving-hour errors. Hours and minutes are derived from complete calendar days, not a birth time.', 'green');
  },
  'alcohol-unit-calculator': function () {
    var volume = parseFloat(document.getElementById('volume').value);
    var abv = parseFloat(document.getElementById('abv').value);
    var drinks = parseFloat(document.getElementById('drinks').value);
    if (!Number.isFinite(volume) || volume <= 0 || !Number.isFinite(abv) || abv <= 0 || abv > 100 || !Number.isFinite(drinks) || drinks <= 0) { alert('Enter valid drink volume, ABV, and count'); return; }
    var units = volume * abv / 1000 * drinks;
    var grams = units * 8;
    var alcoholCalories = grams * 7;
    showResult('result', units.toFixed(1) + ' UK units', 'Pure alcohol estimate', grams.toFixed(1) + ' g alcohol and at least ' + Math.round(alcoholCalories) + ' kcal from alcohol alone. This does not estimate impairment and excludes sugar or other drink calories.', units > 6 ? 'red' : units > 3 ? 'yellow' : 'green');
  },
  'bac-calculator': function () {
    var drinks = parseFloat(document.getElementById('drinks').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var sex = document.getElementById('gender').value;
    var hours = parseFloat(document.getElementById('hours').value);
    if (!Number.isFinite(drinks) || drinks < 0 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(hours) || hours < 0) { alert('Enter valid drinks, weight, and elapsed time'); return; }
    var ratio = sex === 'Male' ? 0.68 : 0.55;
    var estimate = drinks * 14 / (weight * 1000 * ratio) * 100 - 0.015 * hours;
    estimate = Math.max(0, estimate);
    var note = 'Widmark-style estimate only. Drink strength, timing, food, medications, physiology, and pour size can change actual BAC. Never use a calculator to decide whether to drive; use alternate transportation after drinking.';
    showResult('result', estimate.toFixed(3) + '%', 'Estimated BAC—not a measurement', note, estimate >= 0.08 ? 'red' : estimate > 0 ? 'yellow' : 'green');
  },
  'biological-age-calculator': function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 120) { alert('Enter a valid adult age'); return; }
    var concerns = [];
    var exercise = parseFloat(document.getElementById('exercise').value); var sleep = parseFloat(document.getElementById('sleep').value); var stress = parseFloat(document.getElementById('stress').value); var diet = parseFloat(document.getElementById('diet').value);
    if (exercise < 2) concerns.push('low activity'); if (sleep < 7 || sleep > 9) concerns.push('sleep outside 7–9 hours'); if (document.getElementById('smoking').value === 'Yes') concerns.push('smoking'); if (stress >= 4) concerns.push('high stress'); if (diet <= 2) concerns.push('low diet rating');
    showResult('result', concerns.length + '/5 concerns', 'Healthy-aging habit summary', concerns.length ? 'Reported: ' + concerns.join(', ') + '. Lifestyle answers cannot calculate biological age; validated biomarker models require clinical measurements.' : 'No listed concerns were flagged. This checklist cannot determine biological age.', concerns.length >= 3 ? 'red' : concerns.length ? 'yellow' : 'green');
  },
  'breastfeeding-calorie-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var age = parseFloat(document.getElementById('age').value); var activity = document.getElementById('activity').value; var stage = document.getElementById('stage').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(age) || age < 14 || age > 70) { alert('Enter valid age, weight, and height'); return; }
    var bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    var multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725};
    var baseline = Math.round(bmr * (multipliers[activity] || 1.2));
    var extra = stage === '0-6 months (exclusive)' ? 330 : stage === '6-12 months (partial)' ? 400 : 0;
    var total = baseline + extra;
    showResult('result', '~' + total + ' kcal/day', 'Estimated energy need while lactating', 'Estimated non-lactation maintenance: ' + baseline + ' kcal; general lactation adjustment: +' + extra + ' kcal. Needs vary with milk production, postpartum goals, body changes, and activity; use clinical guidance when nutrition or milk supply is a concern.', 'green');
  },
  'burnout-risk-calculator': function () {
    var ids = ['exhaust', 'detach', 'ineffect', 'workload', 'control', 'sleep', 'recovery']; var concerns = [];
    ids.forEach(function (id) { var value = parseFloat(document.getElementById(id).value); if (Number.isFinite(value) && value >= 3) concerns.push(id); });
    showResult('result', concerns.length + '/7 elevated items', 'Burnout check-in', concerns.length ? 'Elevated areas: ' + concerns.join(', ') + '. This custom checklist is not a validated diagnosis or percentage. Persistent exhaustion, detachment, or impaired functioning deserves professional support and workplace changes.' : 'No elevated items were reported. This short checklist cannot rule out burnout or another health condition.', concerns.length >= 5 ? 'red' : concerns.length >= 2 ? 'yellow' : 'green');
  },
  'calcium-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 1 || age > 120) { alert('Enter a valid age'); return; }
    var calcium = age <= 3 ? 700 : age <= 8 ? 1000 : age <= 18 ? 1300 : age <= 50 ? 1000 : age <= 70 ? (sex === 'Female' ? 1200 : 1000) : 1200;
    showResult('result', calcium + ' mg/day', 'Calcium RDA', 'Reference amount for age ' + age + ' and ' + sex.toLowerCase() + ' sex. This is total intake from food and supplements; medical conditions and medications can change advice.', 'green');
  },
  'cholesterol-risk-calculator': function () {
    var total = parseFloat(document.getElementById('total').value); var hdl = parseFloat(document.getElementById('hdl').value); var ldl = parseFloat(document.getElementById('ldl').value);
    if (![total, hdl, ldl].every(function (value) { return Number.isFinite(value) && value > 0; })) { alert('Enter valid lipid values'); return; }
    var ratio = total / hdl; var flags = [];
    if (total >= 240) flags.push('high total cholesterol'); else if (total >= 200) flags.push('borderline-high total cholesterol');
    if (ldl >= 190) flags.push('very high LDL'); else if (ldl >= 160) flags.push('high LDL'); else if (ldl >= 130) flags.push('borderline-high LDL');
    if (hdl < 40) flags.push('low HDL');
    showResult('result', 'Total/HDL ' + ratio.toFixed(1), 'Lipid summary', (flags.length ? 'Flags: ' + flags.join(', ') + '. ' : 'No listed threshold flags. ') + 'A total/HDL ratio alone is not a cardiovascular-risk calculation; age, blood pressure, smoking, diabetes, treatment, and other factors matter.', flags.length >= 2 ? 'red' : flags.length ? 'yellow' : 'green');
  },
  'date-difference-calculator': function () {
    var raw1 = document.getElementById('date1').value; var raw2 = document.getElementById('date2').value;
    if (!raw1 || !raw2) { alert('Enter both dates'); return; }
    var first = new Date(raw1 + 'T00:00:00'); var second = new Date(raw2 + 'T00:00:00'); if (second < first) { var swap = first; first = second; second = swap; }
    var days = Math.round((Date.UTC(second.getFullYear(), second.getMonth(), second.getDate()) - Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) / 86400000);
    var fullWeeks = Math.floor(days / 7); var businessDays = fullWeeks * 5; for (var offset = fullWeeks * 7; offset < days; offset += 1) { var weekday = new Date(first.getTime() + offset * 86400000).getDay(); if (weekday !== 0 && weekday !== 6) businessDays += 1; }
    showResult('result', days.toLocaleString() + ' days', 'Exact calendar-day difference', fullWeeks.toLocaleString() + ' complete weeks plus ' + (days % 7) + ' days. Weekdays excluding Saturdays and Sundays: ' + businessDays.toLocaleString() + ' (public holidays not removed).', 'green');
  },
  'digital-detox-calculator': function () {
    var phone = parseFloat(document.getElementById('phone').value) || 0; var computer = parseFloat(document.getElementById('computer').value) || 0; var tv = parseFloat(document.getElementById('tv').value) || 0; var social = parseFloat(document.getElementById('social').value) || 0;
    if ([phone, computer, tv, social].some(function (value) { return value < 0 || value > 24; })) { alert('Enter daily hours from 0 to 24'); return; }
    var total = phone + computer + tv; if (total > 24) { alert('Combined daily screen time cannot exceed 24 hours unless activities overlap'); return; }
    var wakingShare = Math.min(100, Math.round(total / 16 * 100));
    showResult('result', total.toFixed(1) + ' h/day', 'Screen-time summary', Math.round(total * 7) + ' hours/week, about ' + wakingShare + '% of a 16-hour waking day. Social media entered: ' + social + ' h/day. This is a time summary, not a diagnosis or universal healthy limit.', total > 8 ? 'red' : total > 4 ? 'yellow' : 'green');
  },
  'focus-score-calculator': function () {
    var concerns = [];
    if ((parseFloat(document.getElementById('distract').value) || 0) >= 3) concerns.push('frequent distraction'); if ((parseFloat(document.getElementById('complete').value) || 0) >= 3) concerns.push('difficulty completing tasks'); if ((parseFloat(document.getElementById('forget').value) || 0) >= 3) concerns.push('forgetfulness'); if ((parseFloat(document.getElementById('wander').value) || 0) >= 3) concerns.push('mind wandering'); if ((parseFloat(document.getElementById('sleep').value) || 0) <= 2) concerns.push('poor sleep'); if ((parseFloat(document.getElementById('exercise').value) || 0) <= 1) concerns.push('low activity');
    showResult('result', concerns.length + '/6 concerns', 'Focus check-in', concerns.length ? 'Reported: ' + concerns.join(', ') + '. This custom checklist is not an ADHD test or cognitive assessment. Persistent difficulties should be discussed with a qualified professional.' : 'No major listed concerns were reported. This checklist cannot measure attention or rule out a condition.', concerns.length >= 4 ? 'red' : concerns.length ? 'yellow' : 'green');
  },
  'ideal-weight-calculator': function () {
    var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value;
    if (!Number.isFinite(height) || height < 152.4 || height > 250) { alert('The Devine formula is intended for heights of at least 152.4 cm (5 ft)'); return; }
    var inches = height / 2.54; var estimate = (sex === 'Male' ? 50 : 45.5) + 2.3 * (inches - 60);
    showResult('result', estimate.toFixed(1) + ' kg', 'Devine formula estimate', 'This historical formula gives one reference value, not a medically ideal weight or a 10% “ideal range.” Body composition, health, and individual context are not included.', 'green');
  },
  'injury-risk-calculator': function () {
    var factors = [];
    if ((parseFloat(document.getElementById('increase').value) || 0) > 10) factors.push('training increase above 10%'); if ((parseFloat(document.getElementById('warmup').value) || 0) <= 2) factors.push('limited warm-up'); if ((parseFloat(document.getElementById('sleep').value) || 0) <= 2) factors.push('poor sleep'); if (document.getElementById('history').value !== 'None') factors.push('injury history'); if (document.getElementById('pain').value !== 'Never') factors.push('current or recurring pain'); if ((parseFloat(document.getElementById('rest').value) || 0) < 1) factors.push('little recovery time');
    showResult('result', factors.length + '/6 factors', 'Training risk-factor checklist', factors.length ? 'Reported: ' + factors.join(', ') + '. This is not a validated injury probability. Stop or modify activity for significant pain and seek an appropriate clinical assessment.' : 'No listed factors were reported. Injury risk still depends on sport, workload, technique, health, and prior injury.', factors.length >= 4 ? 'red' : factors.length ? 'yellow' : 'green');
  },
  'iron-intake-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value; var state = document.getElementById('pregnant').value;
    if (!Number.isFinite(age) || age < 1 || age > 120) { alert('Enter a valid age'); return; }
    var iron = age <= 3 ? 7 : age <= 8 ? 10 : age <= 13 ? 8 : age <= 18 ? (sex === 'Male' ? 11 : 15) : age <= 50 ? (sex === 'Male' ? 8 : 18) : 8;
    if (state === 'Pregnant') iron = 27; else if (state === 'Breastfeeding') iron = age <= 18 ? 10 : 9;
    showResult('result', iron + ' mg/day', 'Iron RDA', 'Reference amount for the selected age, sex, and life stage. Do not use this as an iron-supplement dose; excess iron can be harmful and suspected deficiency needs appropriate testing.', 'green');
  },
  'keto-calculator': function () {
    var calories = parseFloat(document.getElementById('calories').value); var weight = parseFloat(document.getElementById('weight').value); var proteinMultiplier = parseFloat(document.getElementById('protein').value);
    if (!Number.isFinite(calories) || calories < 800 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(proteinMultiplier) || proteinMultiplier <= 0) { alert('Enter valid calories, weight, and protein target'); return; }
    var protein = Math.round(weight * proteinMultiplier); var carbs = 25; var fatCalories = calories - protein * 4 - carbs * 4;
    if (fatCalories <= 0) { alert('The calorie target is too low for the selected protein and carbohydrate amounts'); return; }
    var fat = Math.round(fatCalories / 9);
    showResult('result', 'P ' + protein + 'g | C ' + carbs + 'g | F ' + fat + 'g', 'Illustrative ketogenic macro split', 'This arithmetic fills remaining calories with fat after the selected protein target and 25 g net carbohydrate. It does not confirm ketosis or medical suitability.', 'yellow');
  },
  'menopause-symptom-calculator': function () {
    var symptoms = [['hotflash', 'hot flashes'], ['sleep', 'sleep difficulty'], ['mood', 'mood symptoms'], ['vaginal', 'vaginal symptoms'], ['cognitive', 'cognitive concerns']].filter(function (item) { return (parseFloat(document.getElementById(item[0]).value) || 0) >= 2; }).map(function (item) { return item[1]; });
    var period = document.getElementById('period').value; var stage = period === 'No period 12+ months' ? 'postmenopause may be consistent if other causes are excluded' : period === 'No period 3-11 months' || period === 'Irregular periods' ? 'menopause transition may be possible' : 'cycle pattern alone does not indicate menopause';
    showResult('result', symptoms.length + '/5 notable symptoms', 'Menopause symptom check-in', (symptoms.length ? 'Reported: ' + symptoms.join(', ') + '. ' : '') + 'Period response: ' + stage + '. This is not a diagnostic score; discuss concerning bleeding or disruptive symptoms with a clinician.', symptoms.length >= 3 ? 'yellow' : 'green');
  },
  'omega3-calculator': function () {
    var condition = document.getElementById('condition').value; var fishPerWeek = parseFloat(document.getElementById('fish').value) || 0; var flaxPerDay = parseFloat(document.getElementById('flax').value) || 0; var nutsPerDay = parseFloat(document.getElementById('nuts').value) || 0;
    if ([fishPerWeek, flaxPerDay, nutsPerDay].some(function (value) { return value < 0; })) { alert('Enter non-negative servings'); return; }
    var marineDaily = fishPerWeek * 1500 / 7; var alaDaily = flaxPerDay * 2300 + nutsPerDay * 1600;
    showResult('result', '~' + Math.round(marineDaily) + ' mg EPA+DHA/day', 'Food-based omega-3 estimate', 'Estimated plant ALA: ~' + Math.round(alaDaily) + ' mg/day. Plant ALA is not equivalent to EPA+DHA and should not be added as though conversion were complete. Medical-dose omega-3 for triglycerides or other conditions requires clinician guidance; selected goal: ' + condition + '.', 'green');
  },
  'one-rep-max-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var reps = parseInt(document.getElementById('reps').value, 10);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isInteger(reps) || reps < 1 || reps > 12) { alert('Enter a lifted weight and 1 to 12 repetitions'); return; }
    var estimate = weight * (1 + reps / 30);
    showResult('result', Math.round(estimate) + ' kg', 'Epley estimated 1RM', 'Estimate based on ' + weight + ' kg for ' + reps + ' reps. Accuracy decreases at higher repetitions and varies by exercise, technique, fatigue, and athlete.', 'green');
  },
  'protein-intake-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(weight) || weight <= 0) { alert('Enter a valid body weight'); return; }
    var ranges = {'Sedentary Adult': [0.8, 0.8], 'Active/Fitness': [1.2, 1.6], 'Muscle Building': [1.6, 2.2], 'Weight Loss': [1.2, 1.6], 'Endurance Athlete': [1.2, 1.6]}; var range = ranges[goal] || [0.8, 0.8];
    var low = Math.round(weight * range[0]); var high = Math.round(weight * range[1]);
    showResult('result', low === high ? low + ' g/day' : low + '–' + high + ' g/day', 'Protein reference range', 'Based on ' + range[0] + (range[0] === range[1] ? '' : '–' + range[1]) + ' g/kg/day for the selected goal. Kidney disease, pregnancy, older age, total energy intake, and clinical care can change needs. Protein is digested across meals; this tool does not claim a fixed absorption limit.', 'green');
  },
  'random-number-generator': function () {
    var min = parseInt(document.getElementById('min').value, 10); var max = parseInt(document.getElementById('max').value, 10); var count = Math.max(1, Math.min(20, parseInt(document.getElementById('count').value, 10) || 1));
    if (!Number.isInteger(min) || !Number.isInteger(max) || min > max || max - min >= 4294967296) { alert('Enter a valid integer range smaller than 2^32'); return; }
    if (!window.crypto || !window.crypto.getRandomValues) { alert('Secure random generation is unavailable'); return; }
    var size = max - min + 1; var ceiling = Math.floor(4294967296 / size) * size; var values = [];
    while (values.length < count) { var buffer = new Uint32Array(1); window.crypto.getRandomValues(buffer); if (buffer[0] < ceiling) values.push(min + buffer[0] % size); }
    showResult('result', values.join(', '), 'Random integers', 'Generated with the browser Web Crypto API. Repeats are allowed.', 'green');
  },
  'sleep-debt-calculator': function () {
    var needed = parseFloat(document.getElementById('needed').value); var actual = parseFloat(document.getElementById('actual').value); var days = parseInt(document.getElementById('days').value, 10);
    if (!Number.isFinite(needed) || needed <= 0 || needed > 16 || !Number.isFinite(actual) || actual < 0 || actual > 24 || !Number.isInteger(days) || days <= 0 || days > 365) { alert('Enter valid sleep hours and number of days'); return; }
    var shortfall = Math.max(0, (needed - actual) * days);
    showResult('result', shortfall.toFixed(1) + ' hours', 'Cumulative reported sleep shortfall', shortfall ? 'This is arithmetic, not a clinical “debt” that can be repaid hour for hour. Aim for a consistent opportunity to sleep and seek care for persistent insomnia, excessive sleepiness, or breathing symptoms.' : 'Reported sleep meets or exceeds the selected need. Sleep quality and symptoms still matter.', shortfall > 14 ? 'red' : shortfall > 0 ? 'yellow' : 'green');
  },
  'step-goal-calculator': function () {
    var height = parseFloat(document.getElementById('height').value); var current = parseFloat(document.getElementById('current').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(height) || height <= 0 || !Number.isFinite(current) || current < 0) { alert('Enter valid height and current steps'); return; }
    var increase = current < 5000 ? 500 : current < 10000 ? 1000 : Math.round(current * 0.1); var target = Math.round((current + increase) / 100) * 100; var distance = target * (height * 0.413 / 100) / 1000;
    showResult('result', target.toLocaleString() + ' steps/day', 'Gradual next target', 'Current: ' + current.toLocaleString() + '; suggested initial increase: ' + increase.toLocaleString() + ' steps. Approximate distance: ' + distance.toFixed(1) + ' km. There is no universal goal for ' + goal.toLowerCase() + '; adjust for ability, symptoms, and clinical advice.', 'green');
  },
  'tdee-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value; var activity = document.getElementById('activity').value;
    if (!Number.isFinite(age) || age < 18 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid adult age, weight, and height'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161; var multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725, 'Extra Active': 1.9}; var tdee = Math.round(bmr * (multipliers[activity] || 1.2));
    showResult('result', '~' + tdee + ' kcal/day', 'Estimated total daily energy expenditure', 'Mifflin–St Jeor BMR multiplied by the selected activity factor. Treat this as a starting estimate and adjust from observed weight and intake trends; a fixed 500-kcal change does not guarantee a specific weekly result.', 'green');
  },
  'vo2-max-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var resting = parseFloat(document.getElementById('rhr').value);
    if (!Number.isFinite(age) || age < 18 || age > 100 || !Number.isFinite(resting) || resting < 30 || resting > 220) { alert('Enter valid adult age and resting heart rate'); return; }
    var maxHeartRate = 208 - 0.7 * age; var estimate = 15.3 * maxHeartRate / resting;
    showResult('result', estimate.toFixed(1) + ' mL/kg/min', 'Non-exercise VO₂ max estimate', 'Uses estimated maximum heart rate (208 − 0.7 × age) and resting heart rate. It is not a measured exercise-test result, and age/sex fitness categories are intentionally not assigned from this limited estimate.', 'green');
  },
  'water-intake-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var activity = document.getElementById('activity').value; var climate = document.getElementById('climate').value;
    if (!Number.isFinite(weight) || weight <= 0 || weight > 500) { alert('Enter a valid body weight'); return; }
    var low = weight * 0.03; var high = weight * 0.035; var add = {'Sedentary': 0, 'Moderate': 0.35, 'Active': 0.7, 'Very Active': 1}[activity] || 0; if (climate === 'Hot') add += 0.5;
    low += add; high += add;
    showResult('result', low.toFixed(1) + '–' + high.toFixed(1) + ' L/day', 'Rough total-fluid starting range', 'Includes fluid from beverages and foods. Thirst, urine, sweat loss, pregnancy, illness, kidney/heart conditions, and medications can change needs; avoid forcing a fixed volume.', 'green');
  },
  'anxiety-score-calculator': function () {
    var total = 0;
    for (var index = 1; index <= 7; index += 1) { var value = parseInt(document.getElementById('q' + index).value, 10); if (!Number.isInteger(value) || value < 0 || value > 3) { alert('Answer every question with a value from 0 to 3'); return; } total += value; }
    var label = total < 5 ? 'Minimal anxiety symptoms' : total < 10 ? 'Mild anxiety symptoms' : total < 15 ? 'Moderate anxiety symptoms' : 'Severe anxiety symptoms';
    showResult('result', total + '/21', 'GAD-7: ' + label, 'A screening result is not a diagnosis. Discuss persistent symptoms, functional difficulty, panic, or safety concerns with a qualified mental-health professional.', total >= 15 ? 'red' : total >= 5 ? 'yellow' : 'green');
  },
  'bmi-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value) / 100;
    if (!Number.isFinite(weight) || weight <= 0 || weight > 700 || !Number.isFinite(height) || height < 0.5 || height > 2.8) { alert('Enter valid weight and height'); return; }
    var bmi = weight / (height * height); var label = bmi < 18.5 ? 'Underweight range' : bmi < 25 ? 'Healthy-weight range' : bmi < 30 ? 'Overweight range' : 'Obesity range'; var color = bmi < 18.5 ? 'yellow' : bmi < 25 ? 'green' : bmi < 30 ? 'yellow' : 'red';
    showResult('result', bmi.toFixed(1), label, 'Adult BMI screening category. BMI does not directly measure body fat or diagnose health and should be interpreted with clinical context.', color);
  },
  'bmr-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 18 || age > 120 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid adult age, weight, and height'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    showResult('result', Math.round(bmr) + ' kcal/day', 'Mifflin–St Jeor BMR estimate', 'Estimated energy use at rest. It is not total daily energy expenditure and may be less accurate for pregnancy, illness, very high muscularity, or unusual body composition.', 'green');
  },
  'body-recomposition-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value; var activity = document.getElementById('activity').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(age) || age < 18) { alert('Enter valid adult measurements'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161; var multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725}; var maintenance = Math.round(bmr * (multipliers[activity] || 1.375));
    var proteinLow = Math.round(weight * 1.6); var proteinHigh = Math.round(weight * 2.2);
    showResult('result', '~' + maintenance + ' kcal/day', 'Recomposition starting estimates', 'Estimated maintenance energy: ' + maintenance + ' kcal/day; protein reference range: ' + proteinLow + '–' + proteinHigh + ' g/day. A fixed 5% deficit does not guarantee recomposition; adjust from measured trends and resistance-training performance.', 'green');
  },
  'body-surface-area-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid weight and height'); return; }
    var bsa = Math.sqrt(height * weight / 3600);
    showResult('result', bsa.toFixed(2) + ' m²', 'Mosteller body surface area', 'Formula: √(height in cm × weight in kg ÷ 3600). Clinical dosing or treatment decisions require professional verification and drug-specific protocols.', 'green');
  },
  'caffeine-intake-calculator': function () {
    var coffee = parseFloat(document.getElementById('coffee').value) || 0; var tea = parseFloat(document.getElementById('tea').value) || 0; var soda = parseFloat(document.getElementById('soda').value) || 0;
    if ([coffee, tea, soda].some(function (value) { return value < 0 || value > 50; })) { alert('Enter valid daily serving counts'); return; }
    var total = coffee * 95 + tea * 47 + soda * 80;
    showResult('result', '~' + Math.round(total) + ' mg/day', 'Caffeine estimate', 'Assumptions per entered serving: coffee 95 mg, tea 47 mg, and the third beverage 80 mg. Actual products vary widely. The general 400 mg/day reference is for most healthy adults; pregnancy, adolescence, medications, heart conditions, anxiety, and sleep problems require lower or individualized limits.', total > 400 ? 'yellow' : 'green');
  },
  'calorie-burn-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var activity = document.getElementById('activity').value; var duration = parseFloat(document.getElementById('duration').value);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0 || duration > 1440) { alert('Enter valid weight and duration'); return; }
    var mets = {'Walking (moderate)': 3.5, 'Running (8 km/h)': 8.3, 'Running (12 km/h)': 11.8, 'Cycling (moderate)': 6.8, 'Swimming': 7, 'HIIT Training': 12, 'Weight Training': 4, 'Yoga': 2.5, 'Pilates': 3, 'Dancing': 5, 'Hiking': 6, 'Rowing': 7, 'Jump Rope': 11, 'Basketball': 8, 'Tennis': 7.3, 'Golf': 4, 'Gardening': 4, 'Cleaning House': 3.5, 'Cooking': 2.5, 'Office Work': 1.5}; var met = mets[activity];
    if (!met) { alert('Choose an activity'); return; } var calories = met * 3.5 * weight / 200 * duration;
    showResult('result', '~' + Math.round(calories) + ' kcal', 'MET-based energy estimate', met + ' MET × ' + duration + ' minutes. Actual energy use varies with pace, efficiency, fitness, environment, and equipment.', 'green');
  },
  'calorie-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value; var activity = document.getElementById('activity').value;
    if (!Number.isFinite(age) || age < 18 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid adult age, weight, and height'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161; var multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725, 'Extra Active': 1.9}; var maintenance = Math.round(bmr * (multipliers[activity] || 1.2));
    showResult('result', '~' + maintenance + ' kcal/day', 'Estimated maintenance calories', 'Mifflin–St Jeor BMR with the selected activity factor. Use this as a starting estimate and adjust from actual intake and weight trends; do not assume a fixed daily change guarantees a specific result.', 'green');
  },
  'carb-calculator': function () {
    var calories = parseFloat(document.getElementById('calories').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(calories) || calories < 800 || calories > 10000) { alert('Enter a valid calorie target'); return; }
    var ranges = {'Balanced': [0.45, 0.65], 'Low Carb': [0.20, 0.35], 'Keto': [0.05, 0.10], 'High Performance': [0.50, 0.65]}; var range = ranges[goal] || ranges.Balanced; var low = Math.round(calories * range[0] / 4); var high = Math.round(calories * range[1] / 4);
    showResult('result', low + '–' + high + ' g/day', 'Illustrative carbohydrate range', Math.round(range[0] * 100) + '–' + Math.round(range[1] * 100) + '% of entered calories. Medical conditions, training load, pregnancy, and medication can make restrictive patterns inappropriate.', 'green');
  },
  'countdown-timer': function () {
    var hours = parseInt(document.getElementById('hours').value, 10) || 0; var minutes = parseInt(document.getElementById('minutes').value, 10) || 0; var seconds = parseInt(document.getElementById('seconds').value, 10) || 0;
    if ([hours, minutes, seconds].some(function (value) { return value < 0; }) || minutes > 59 || seconds > 59) { alert('Use non-negative hours and 0–59 minutes/seconds'); return; } var total = hours * 3600 + minutes * 60 + seconds; if (!total) { alert('Enter a time duration'); return; }
    var end = Date.now() + total * 1000; var box = document.getElementById('result'); box.style.display = 'block'; box.className = 'result-box show green'; clearInterval(window._cdTimer); window._cdTimer = setInterval(function () { var remaining = Math.max(0, Math.ceil((end - Date.now()) / 1000)); var h = Math.floor(remaining / 3600); var m = Math.floor(remaining % 3600 / 60); var s = remaining % 60; box.querySelector('.result-value').textContent = (h ? h + 'h ' : '') + m + 'm ' + s + 's'; box.querySelector('.result-label').textContent = remaining ? 'Countdown running' : 'Time is up'; box.querySelector('.result-suggestion').textContent = remaining ? 'The timer continues while this page remains open.' : 'Countdown finished.'; if (!remaining) clearInterval(window._cdTimer); }, 250);
  },
  'cycling-calories-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var duration = parseFloat(document.getElementById('duration').value); var intensity = document.getElementById('intensity').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0) { alert('Enter valid weight and duration'); return; } var mets = {'Light (< 16 km/h)': 4, 'Moderate (16-19 km/h)': 6.8, 'Vigorous (19-22 km/h)': 8, 'Racing (> 22 km/h)': 10}; var met = mets[intensity]; if (!met) { alert('Choose intensity'); return; } var calories = met * 3.5 * weight / 200 * duration;
    showResult('result', '~' + Math.round(calories) + ' kcal', 'MET-based cycling estimate', met + ' MET for ' + duration + ' minutes. Terrain, wind, drafting, bicycle type, and actual power can substantially change energy use.', 'green');
  },
  'fat-intake-calculator': function () {
    var calories = parseFloat(document.getElementById('calories').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(calories) || calories < 800 || calories > 10000) { alert('Enter a valid calorie target'); return; } var ranges = {'Standard': [0.20, 0.35], 'Low Fat': [0.20, 0.25], 'Moderate': [0.25, 0.35], 'High Fat/Keto': [0.60, 0.75]}; var range = ranges[goal] || ranges.Standard; var low = Math.round(calories * range[0] / 9); var high = Math.round(calories * range[1] / 9);
    showResult('result', low + '–' + high + ' g/day', 'Illustrative dietary-fat range', Math.round(range[0] * 100) + '–' + Math.round(range[1] * 100) + '% of calories. Prioritize unsaturated fats; restrictive diets require attention to total nutrition and individual medical needs.', 'green');
  },
  'fertility-calculator': function () {
    var raw = document.getElementById('lmp').value; var cycle = parseFloat(document.getElementById('cycle').value); if (!raw || !Number.isFinite(cycle) || cycle < 21 || cycle > 45) { alert('Enter a date and typical cycle length from 21 to 45 days'); return; } var start = new Date(raw + 'T00:00:00'); var ovulation = new Date(start); ovulation.setDate(ovulation.getDate() + cycle - 14); var first = new Date(ovulation); first.setDate(first.getDate() - 5); var last = new Date(ovulation); last.setDate(last.getDate() + 1); var format = function (date) { return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(); };
    showResult('result', format(first) + ' – ' + format(last), 'Estimated fertile window', 'Estimated ovulation: ' + format(ovulation) + '. Calendar estimates vary and cannot confirm fertility, ovulation, or safe days for contraception.', 'yellow');
  },
  'fiber-intake-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value; var calories = parseFloat(document.getElementById('calories').value); if (!Number.isFinite(age) || age < 19 || !Number.isFinite(calories) || calories < 800) { alert('Enter adult age and valid calories'); return; } var ageSex = age > 50 ? (sex === 'Male' ? 30 : 21) : (sex === 'Male' ? 38 : 25); var energyBased = Math.round(calories / 1000 * 14);
    showResult('result', ageSex + ' g/day', 'Age-and-sex fiber reference', 'The 14 g per 1,000 kcal method gives ' + energyBased + ' g for the entered calories. These are alternative reference approaches, not values that should automatically be combined or whichever is higher.', 'green');
  },
  'fiber-score-calculator': function () {
    var fruit = parseFloat(document.getElementById('fruits').value) || 0; var vegetables = parseFloat(document.getElementById('veggies').value) || 0; var grains = parseFloat(document.getElementById('grains').value) || 0; var legumes = parseFloat(document.getElementById('legumes').value) || 0; var nuts = parseFloat(document.getElementById('nuts').value) || 0; if ([fruit, vegetables, grains, legumes, nuts].some(function (value) { return value < 0; })) { alert('Enter non-negative servings'); return; } var estimate = fruit * 2.5 + vegetables * 2.5 + grains * 3 + legumes * 7 + nuts * 3;
    showResult('result', '~' + Math.round(estimate) + ' g/day', 'Serving-based fiber estimate', 'Uses broad assumptions per serving, so package labels or a food database will be more accurate. Adult reference amounts commonly range from about 21 to 38 g/day depending on age and sex.', estimate >= 25 ? 'green' : 'yellow');
  },
  'heart-rate-calculator': function () {
    var age = parseFloat(document.getElementById('age').value); var resting = parseFloat(document.getElementById('rhr').value); if (!Number.isFinite(age) || age < 18 || age > 100 || !Number.isFinite(resting) || resting < 30 || resting > 150) { alert('Enter valid adult age and resting heart rate'); return; } var maximum = 208 - 0.7 * age; var reserve = maximum - resting; var zone = function (low, high) { return Math.round(resting + reserve * low) + '–' + Math.round(resting + reserve * high); };
    showResult('result', 'Est. max ' + Math.round(maximum) + ' bpm', 'Heart-rate reserve training zones', '50–60%: ' + zone(0.5, 0.6) + ' bpm | 60–70%: ' + zone(0.6, 0.7) + ' bpm | 70–80%: ' + zone(0.7, 0.8) + ' bpm | 80–90%: ' + zone(0.8, 0.9) + ' bpm. Estimated maximum heart rate has individual error; medications and conditions can change safe targets.', 'green');
  },
  'hydration-level-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var activity = document.getElementById('activity').value; var climate = document.getElementById('climate').value; var symptoms = document.getElementById('symptoms').value; if (!Number.isFinite(weight) || weight <= 0) { alert('Enter a valid weight'); return; } var add = {'Sedentary': 0, 'Lightly Active': 0.3, 'Moderately Active': 0.5, 'Very Active': 0.8}[activity] || 0; if (climate === 'Hot/Humid') add += 0.5; else if (climate === 'Warm') add += 0.3; var low = weight * 0.03 + add; var high = weight * 0.035 + add; var urgent = symptoms === 'Very dark urine + dizziness';
    showResult('result', low.toFixed(1) + '–' + high.toFixed(1) + ' L/day', 'Rough total-fluid range', 'Symptom response: ' + symptoms + '. Symptoms and urine color cannot precisely measure hydration. ' + (urgent ? 'Dizziness with very dark urine can require urgent assessment, especially with confusion, fainting, inability to drink, or severe illness.' : 'Adjust for thirst, sweat loss, illness, food fluids, and medical conditions.'), urgent ? 'red' : symptoms === 'None' ? 'green' : 'yellow');
  },
  'hydration-reminder-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var wake = document.getElementById('wakeup').value; var bed = document.getElementById('bedtime').value; var container = parseFloat(document.getElementById('container').value); if (!Number.isFinite(weight) || weight <= 0 || !wake || !bed || !Number.isFinite(container) || container <= 0) { alert('Enter valid weight, times, and container size'); return; } var toMinutes = function (value) { var parts = value.split(':'); return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10); }; var awake = (toMinutes(bed) - toMinutes(wake) + 1440) % 1440; if (awake < 240) { alert('Wake and bedtime produce an implausibly short waking period'); return; } var target = weight * 32.5; var portions = Math.ceil(target / container); var interval = Math.round(awake / portions);
    showResult('result', '~' + Math.round(target) + ' mL/day', 'Optional reminder schedule', portions + ' portions of about ' + container + ' mL, roughly every ' + interval + ' minutes while awake. This is a convenience estimate, not a requirement to force fluids; medical conditions can require different limits.', 'green');
  },
  'intermittent-fasting-window': function () {
    var protocol = document.getElementById('protocol').value; var wake = document.getElementById('wakeup').value; var preference = document.getElementById('pref').value; if (!wake) { alert('Enter wake-up time'); return; } var eatingHours = {'12:12': 12, '14:10': 10, '16:8': 8, '18:6': 6, '20:4': 4, 'OMAD (23:1)': 1}[protocol]; if (!eatingHours) { alert('Choose a protocol'); return; } var parts = wake.split(':'); var wakeMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10); var start = preference === 'Eat Earlier (skip dinner)' ? wakeMinutes + 60 : preference === 'Eat Later (skip breakfast)' ? wakeMinutes + 5 * 60 : wakeMinutes + 3 * 60; start %= 1440; var end = (start + eatingHours * 60) % 1440; var format = function (minutes) { var hour = Math.floor(minutes / 60); var minute = minutes % 60; return (hour % 12 || 12) + ':' + (minute < 10 ? '0' : '') + minute + ' ' + (hour < 12 ? 'AM' : 'PM'); };
    showResult('result', protocol, 'Example eating window', format(start) + ' to ' + format(end) + ' (' + eatingHours + ' hours). This is a schedule preference, not evidence that longer fasting is better or medically appropriate.', 'yellow');
  },
  'lean-body-mass-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value; if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid weight and height'); return; } var lean = sex === 'Male' ? 0.407 * weight + 0.267 * height - 19.2 : 0.252 * weight + 0.473 * height - 48.3; if (!Number.isFinite(lean) || lean <= 0 || lean > weight) { alert('These measurements are outside the valid range for this estimate'); return; }
    showResult('result', lean.toFixed(1) + ' kg', 'Hume lean-body-mass estimate', 'Estimated lean mass is ' + (lean / weight * 100).toFixed(0) + '% of body weight. This regression estimate is not a direct body-composition measurement.', 'green');
  },
  'macro-calculator': function () {
    var calories = parseFloat(document.getElementById('calories').value); var goal = document.getElementById('goal').value; if (!Number.isFinite(calories) || calories < 800 || calories > 10000) { alert('Enter a valid calorie target'); return; } var profiles = {'Balanced': [0.30, 0.40, 0.30], 'Low Carb': [0.35, 0.25, 0.40], 'High Protein': [0.40, 0.30, 0.30], 'Keto': [0.25, 0.05, 0.70]}; var profile = profiles[goal]; if (!profile) { alert('Choose a macro profile'); return; } var protein = Math.round(calories * profile[0] / 4); var carbs = Math.round(calories * profile[1] / 4); var fat = Math.round(calories * profile[2] / 9);
    showResult('result', 'P ' + protein + 'g | C ' + carbs + 'g | F ' + fat + 'g', 'Illustrative macro split', 'Arithmetic conversion from the selected percentage profile. This is not personalized to body weight, training, pregnancy, or medical conditions.', 'green');
  },
  'macro-timing-calculator': function () {
    var calories = parseFloat(document.getElementById('calories').value); var protein = parseFloat(document.getElementById('protein').value); var meals = parseInt(document.getElementById('meals').value, 10); var workout = document.getElementById('workouttime').value; if (!Number.isFinite(calories) || calories < 800 || !Number.isFinite(protein) || protein <= 0 || !Number.isInteger(meals) || meals < 2 || meals > 6) { alert('Enter valid calories, protein, and 2–6 meals'); return; } var perMeal = protein / meals;
    showResult('result', '~' + Math.round(perMeal) + ' g protein/meal', 'Simple distribution plan', 'Spread ' + protein + ' g across ' + meals + ' meals around a ' + workout + ' workout. A practical per-meal average is ' + perMeal.toFixed(1) + ' g; there is no requirement for exactly 25% before and 35% within one hour after training.', 'green');
  },
  'marathon-time-predictor': function () {
    var sourceDistance = {'5K': 5, '10K': 10, 'Half Marathon': 21.0975, 'Recent Long Run': 16}[document.getElementById('dist').value]; var time = parseFloat(document.getElementById('time').value); var targetDistance = {'5K': 5, '10K': 10, 'Half Marathon (21.1km)': 21.0975, 'Marathon (42.2km)': 42.195}[document.getElementById('goal').value]; if (!sourceDistance || !targetDistance || !Number.isFinite(time) || time <= 0) { alert('Enter a valid recent race time'); return; } var predictedMinutes = time * Math.pow(targetDistance / sourceDistance, 1.06); var totalSeconds = Math.round(predictedMinutes * 60); var hours = Math.floor(totalSeconds / 3600); var minutes = Math.floor(totalSeconds % 3600 / 60); var seconds = totalSeconds % 60; var paceSeconds = Math.round(totalSeconds / targetDistance);
    showResult('result', (hours ? hours + 'h ' : '') + minutes + 'm ' + seconds + 's', 'Riegel race-time estimate', 'Exponent 1.06 from a ' + sourceDistance + ' km performance. Estimated pace: ' + Math.floor(paceSeconds / 60) + ':' + String(paceSeconds % 60).padStart(2, '0') + '/km. Training specificity, terrain, weather, fueling, and endurance can produce large differences.', 'green');
  },
  'menstrual-cycle-calculator': function () {
    var raw = document.getElementById('lmp').value; var cycle = parseFloat(document.getElementById('cycle').value); if (!raw || !Number.isFinite(cycle) || cycle < 21 || cycle > 45) { alert('Enter a period start date and typical cycle length from 21 to 45 days'); return; } var start = new Date(raw + 'T00:00:00'); var next = new Date(start); next.setDate(next.getDate() + cycle); var ovulation = new Date(start); ovulation.setDate(ovulation.getDate() + cycle - 14); var fertileStart = new Date(ovulation); fertileStart.setDate(fertileStart.getDate() - 5); var format = function (date) { return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(); };
    showResult('result', format(next), 'Estimated next period', 'Estimated ovulation: ' + format(ovulation) + '; possible fertile window begins around ' + format(fertileStart) + '. Cycle timing varies and calendar estimates cannot confirm ovulation or provide reliable contraception.', 'yellow');
  },
  'pomodoro-calculator': function () {
    var tasks = parseInt(document.getElementById('tasks').value, 10); var perTask = parseInt(document.getElementById('pomodoros').value, 10); var start = document.getElementById('workstart').value; var type = document.getElementById('breaktype').value; if (!Number.isInteger(tasks) || tasks < 1 || !Number.isInteger(perTask) || perTask < 1 || !start) { alert('Enter valid tasks, sessions, and start time'); return; } var work = type === 'Classic (25/5/15)' ? 25 : type === 'Extended (50/10/30)' ? 50 : 15; var shortBreak = type === 'Classic (25/5/15)' ? 5 : type === 'Extended (50/10/30)' ? 10 : 3; var longBreak = type === 'Classic (25/5/15)' ? 15 : type === 'Extended (50/10/30)' ? 30 : 10; var sessions = tasks * perTask; var totalMinutes = sessions * work; for (var index = 1; index < sessions; index += 1) totalMinutes += index % 4 === 0 ? longBreak : shortBreak; var parts = start.split(':'); var finish = (parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) + totalMinutes) % 1440; var hour = Math.floor(finish / 60); var minute = finish % 60;
    showResult('result', sessions + ' sessions', 'Pomodoro plan', 'Total scheduled time: ' + totalMinutes + ' minutes; estimated finish: ' + (hour % 12 || 12) + ':' + String(minute).padStart(2, '0') + ' ' + (hour < 12 ? 'AM' : 'PM') + '. No break is added after the final work session.', 'green');
  },
  'pregnancy-due-date-calculator': function () {
    var raw = document.getElementById('lmp').value; if (!raw) { alert('Enter the first day of the last menstrual period'); return; } var lmp = new Date(raw + 'T00:00:00'); var today = new Date(); if (Number.isNaN(lmp.getTime()) || lmp > today) { alert('Enter a valid past date'); return; } var due = new Date(lmp); due.setDate(due.getDate() + 280); var gestationDays = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(lmp.getFullYear(), lmp.getMonth(), lmp.getDate())) / 86400000); if (gestationDays > 308) { alert('The entered date is outside a typical current-pregnancy range'); return; } var format = function (date) { return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}); };
    showResult('result', format(due), 'Estimated due date', 'Based on 280 days from LMP: approximately ' + Math.floor(gestationDays / 7) + ' weeks ' + gestationDays % 7 + ' days today. Cycle length and ultrasound dating can change the clinical due date.', 'green');
  },
  'pregnancy-week-calculator': function () {
    var raw = document.getElementById('lmp').value; var cycle = parseFloat(document.getElementById('cycle').value); if (!raw || !Number.isFinite(cycle) || cycle < 21 || cycle > 45) { alert('Enter LMP and cycle length from 21 to 45 days'); return; } var lmp = new Date(raw + 'T00:00:00'); var today = new Date(); var adjustment = cycle - 28; var due = new Date(lmp); due.setDate(due.getDate() + 280 + adjustment); var days = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(lmp.getFullYear(), lmp.getMonth(), lmp.getDate())) / 86400000); if (days < 0 || days > 308) { alert('The entered date is outside a typical current-pregnancy range'); return; } var weeks = Math.floor(days / 7); var extraDays = days % 7; var trimester = weeks < 14 ? 'First trimester' : weeks < 28 ? 'Second trimester' : 'Third trimester';
    showResult('result', weeks + ' weeks ' + extraDays + ' days', trimester, 'Cycle-adjusted estimated due date: ' + due.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) + '. Ultrasound and clinician dating take priority; this tool does not estimate fetal size.', 'green');
  },
  'pregnancy-weight-gain-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value) / 100; var pregnancy = document.getElementById('twins').value; var week = parseFloat(document.getElementById('week').value); if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(week) || week < 0 || week > 42) { alert('Enter valid prepregnancy measurements and week'); return; } var bmi = weight / (height * height); if (pregnancy === 'Triplets+') { showResult('result', 'Individual specialist plan', 'Higher-order multiple pregnancy', 'Standard singleton or twin ranges should not be applied to triplets. Use maternal-fetal medicine and obstetric guidance.', 'yellow'); return; } var category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obesity'; var total; var rate; if (pregnancy === 'Twins') { total = bmi < 18.5 ? null : bmi < 25 ? [16.8, 24.5] : bmi < 30 ? [14.1, 22.7] : [11.3, 19.1]; } else { total = bmi < 18.5 ? [12.5, 18] : bmi < 25 ? [11.5, 16] : bmi < 30 ? [7, 11.5] : [5, 9]; rate = bmi < 18.5 ? [0.44, 0.58] : bmi < 25 ? [0.35, 0.5] : bmi < 30 ? [0.23, 0.33] : [0.17, 0.27]; } if (!total) { showResult('result', 'Individual twin-pregnancy plan', category, 'Published twin guidance does not provide a standard range for this prepregnancy BMI category; use obstetric care.', 'yellow'); return; } var progress = pregnancy === 'Single Baby' && week > 13 ? ' A broad week-' + week + ' cumulative range is roughly ' + (0.5 + (week - 13) * rate[0]).toFixed(1) + '–' + (2 + (week - 13) * rate[1]).toFixed(1) + ' kg.' : '';
    showResult('result', total[0] + '–' + total[1] + ' kg total', category + ', ' + pregnancy.toLowerCase(), 'Prepregnancy BMI: ' + bmi.toFixed(1) + '.' + progress + ' These population ranges do not replace obstetric monitoring, especially with severe nausea, swelling, diabetes, hypertension, or fetal-growth concerns.', 'green');
  },
  'productivity-score-calculator': function () {
    var items = [['goals', 'unclear goals'], ['priority', 'weak prioritization'], ['distract', 'frequent distraction'], ['breaks', 'insufficient breaks'], ['sleep', 'poor sleep'], ['exercise', 'low activity']]; var concerns = items.filter(function (item) { return (parseFloat(document.getElementById(item[0]).value) || 0) <= 2; }).map(function (item) { return item[1]; });
    showResult('result', concerns.length + '/6 improvement areas', 'Productivity habit check-in', concerns.length ? 'Reported: ' + concerns.join(', ') + '. This is a transparent checklist, not a scientific productivity percentage.' : 'No listed improvement areas were flagged. This checklist does not measure actual output or effectiveness.', concerns.length >= 4 ? 'red' : concerns.length ? 'yellow' : 'green');
  },
  'protein-timing-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var meals = parseInt(document.getElementById('meals').value, 10); var goal = document.getElementById('goal').value; var training = document.getElementById('training').value; if (!Number.isFinite(weight) || weight <= 0 || !Number.isInteger(meals) || meals < 2 || meals > 6) { alert('Enter valid weight and 2–6 meals'); return; } var multipliers = {'Muscle Building': 1.6, 'Weight Loss (muscle preservation)': 1.6, 'Athletic Performance': 1.6, 'General Health': 0.8}; var total = Math.round(weight * (multipliers[goal] || 1.6)); var mealLow = Math.round(weight * 0.25); var mealHigh = Math.round(weight * 0.4);
    showResult('result', '~' + total + ' g/day', 'Protein distribution starting point', 'Across ' + meals + ' meals, a practical exercise-oriented range is about ' + mealLow + '–' + mealHigh + ' g per meal, including a meal within a few hours of ' + training + ' training. Total daily intake matters more than a narrow one-hour window.', 'green');
  },
  'sleep-hygiene-calculator': function () {
    var labels = [['bedtime', 'inconsistent schedule'], ['screen', 'late screen use'], ['caffeine', 'late caffeine'], ['temp', 'uncomfortable temperature'], ['dark', 'light exposure'], ['wind', 'limited wind-down'], ['alcohol', 'alcohol near bedtime']]; var concerns = labels.filter(function (item) { return (parseFloat(document.getElementById(item[0]).value) || 0) < 2; }).map(function (item) { return item[1]; });
    showResult('result', concerns.length + '/7 improvement areas', 'Sleep-hygiene checklist', concerns.length ? 'Possible areas: ' + concerns.join(', ') + '. This custom checklist is not a sleep-disorder test. Persistent insomnia, snoring with breathing pauses, or severe daytime sleepiness warrants clinical assessment.' : 'No listed improvement areas were flagged. Sleep symptoms and duration still matter.', concerns.length >= 4 ? 'red' : concerns.length ? 'yellow' : 'green');
  },
  'smoking-cost-calculator': function () {
    var perDay = parseFloat(document.getElementById('perday').value); var packPrice = parseFloat(document.getElementById('price').value); var years = parseFloat(document.getElementById('years').value); if (!Number.isFinite(perDay) || perDay < 0 || !Number.isFinite(packPrice) || packPrice < 0 || !Number.isFinite(years) || years < 0) { alert('Enter non-negative cigarettes, price, and years'); return; } var daily = perDay / 20 * packPrice; var annual = daily * 365; var total = annual * years;
    showResult('result', '$' + annual.toFixed(2) + '/year', 'Estimated cigarette cost', '$' + daily.toFixed(2) + '/day | $' + (daily * 30.4375).toFixed(2) + '/average month | $' + total.toFixed(2) + ' over ' + years + ' years. Excludes price changes and health-related costs.', perDay > 0 ? 'red' : 'green');
  },
  'steps-to-calories-calculator': function () {
    var steps = parseFloat(document.getElementById('steps').value); var weight = parseFloat(document.getElementById('weight').value); if (!Number.isFinite(steps) || steps < 0 || !Number.isFinite(weight) || weight <= 0) { alert('Enter valid steps and weight'); return; } var low = steps * 0.03 * weight / 70; var high = steps * 0.06 * weight / 70; var distance = steps * 0.000762;
    showResult('result', '~' + Math.round(low) + '–' + Math.round(high) + ' kcal', 'Broad step-based estimate', 'Approximate distance using a 0.762 m step: ' + distance.toFixed(1) + ' km. Without pace, incline, stride, and duration, calories cannot be calculated precisely.', 'green');
  },
  'sugar-intake-calculator': function () {
    var drinks = parseFloat(document.getElementById('drinks').value) || 0; var sweets = parseFloat(document.getElementById('sweet').value) || 0; var processed = parseFloat(document.getElementById('processed').value) || 0; var fruit = parseFloat(document.getElementById('fruit').value) || 0; var added = parseFloat(document.getElementById('added').value) || 0; if ([drinks, sweets, processed, fruit, added].some(function (value) { return value < 0; })) { alert('Enter non-negative serving counts'); return; } var addedSugar = drinks * 39 + sweets * 20 + processed * 8 + added * 4; var fruitSugar = fruit * 12;
    showResult('result', '~' + Math.round(addedSugar) + ' g added sugar', 'Serving-based estimate', 'Assumptions: 39 g per sugary drink, 20 g per sweet serving, 8 g per processed-food serving, and 4 g per entered teaspoon. Fruit sugar (~' + Math.round(fruitSugar) + ' g) is shown separately. Product labels are more accurate than these averages.', addedSugar > 50 ? 'red' : addedSugar > 25 ? 'yellow' : 'green');
  },
  'swimming-calories-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var duration = parseFloat(document.getElementById('duration').value); var stroke = document.getElementById('stroke').value; if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0) { alert('Enter valid weight and duration'); return; } var mets = {'Leisurely': 6, 'Moderate Freestyle': 7, 'Vigorous Freestyle': 10, 'Backstroke': 7, 'Breaststroke': 10, 'Butterfly': 13.8}; var met = mets[stroke]; if (!met) { alert('Choose a stroke'); return; } var calories = met * 3.5 * weight / 200 * duration;
    showResult('result', '~' + Math.round(calories) + ' kcal', 'MET-based swimming estimate', met + ' MET for ' + duration + ' minutes. Stroke efficiency, rest intervals, water conditions, and actual effort affect energy use.', 'green');
  },
  'text-counter': function () {
    var text = document.getElementById('text').value; if (!text.trim()) { alert('Enter some text'); return; } var words = (text.trim().match(/\S+/g) || []).length; var characters = Array.from(text).length; var charactersNoSpace = Array.from(text.replace(/\s/gu, '')).length; var sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter(function (item) { return item.trim(); }).length; var paragraphs = text.split(/\n\s*\n|\n+/).filter(function (item) { return item.trim(); }).length;
    showResult('result', words + ' words', 'Text statistics', 'Characters: ' + characters + ' | Without whitespace: ' + charactersNoSpace + ' | Sentences: ' + sentences + ' | Paragraphs: ' + paragraphs + ' | Reading time at 200 wpm: ' + Math.max(1, Math.ceil(words / 200)) + ' min.', 'green');
  },
  'tip-calculator': function () {
    var bill = parseFloat(document.getElementById('bill').value); var tipPercent = parseFloat(document.getElementById('tip').value); var people = parseInt(document.getElementById('people').value, 10); if (!Number.isFinite(bill) || bill < 0 || !Number.isFinite(tipPercent) || tipPercent < 0 || !Number.isInteger(people) || people < 1) { alert('Enter valid bill, tip percentage, and number of people'); return; } var tip = bill * tipPercent / 100; var total = bill + tip;
    showResult('result', '$' + tip.toFixed(2) + ' tip', 'Bill split', 'Total: $' + total.toFixed(2) + ' | Per person: $' + (total / people).toFixed(2) + ' | Tip per person: $' + (tip / people).toFixed(2) + '.', 'green');
  },
  'waist-to-height-ratio': function () {
    var waist = parseFloat(document.getElementById('waist').value); var height = parseFloat(document.getElementById('height').value); if (!Number.isFinite(waist) || waist <= 0 || !Number.isFinite(height) || height <= 0 || waist > height * 1.5) { alert('Enter valid waist and height in the same unit'); return; } var ratio = waist / height; var color = ratio < 0.5 ? 'green' : ratio < 0.6 ? 'yellow' : 'red';
    showResult('result', ratio.toFixed(2), 'Waist-to-height ratio', 'A simple adult screening message is to keep waist below half of height. Ethnicity, age, pregnancy, body shape, and measurement technique affect interpretation; this is not a diagnosis.', color);
  },
  'waist-to-hip-ratio': function () {
    var waist = parseFloat(document.getElementById('waist').value); var hip = parseFloat(document.getElementById('hip').value); var sex = document.getElementById('gender').value; if (!Number.isFinite(waist) || waist <= 0 || !Number.isFinite(hip) || hip <= 0) { alert('Enter valid waist and hip measurements in the same unit'); return; } var ratio = waist / hip; var threshold = sex === 'Male' ? 0.9 : 0.85;
    showResult('result', ratio.toFixed(2), ratio > threshold ? 'Above common WHO risk threshold' : 'At or below common WHO risk threshold', 'Common adult thresholds are above 0.90 for men and above 0.85 for women. Measurement technique, ethnicity, age, pregnancy, and clinical context matter; exercise cannot selectively reduce waist fat.', ratio > threshold ? 'yellow' : 'green');
  },
  'yoga-calories-calculator': function () {
    var weight = parseFloat(document.getElementById('weight').value); var duration = parseFloat(document.getElementById('duration').value); var style = document.getElementById('style').value; if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0) { alert('Enter valid weight and duration'); return; } var mets = {'Hatha': 2.5, 'Vinyasa': 4, 'Ashtanga': 5, 'Bikram/Hot Yoga': 5, 'Power Yoga': 5.5, 'Restorative': 2}; var met = mets[style]; if (!met) { alert('Choose a yoga style'); return; } var calories = met * 3.5 * weight / 200 * duration;
    showResult('result', '~' + Math.round(calories) + ' kcal', 'MET-based yoga estimate', met + ' MET for ' + duration + ' minutes. Class pace, room temperature, rest periods, and individual effort affect actual energy use.', 'green');
  },
};

const pageTransforms = {
  'body-fat-calculator': (html) => {
    let next = html.replace(/<div class="form-group"><label for="weight">Weight \(kg\)<\/label><input[^>]+id="weight"[^>]*><\/div>/, '');
    if (!next.includes('id="hip"')) next = next.replace(
      '<div class="form-group"><label for="neck">Neck (cm)</label><input type="number" id="neck" placeholder="38"></div>',
      '<div class="form-group"><label for="hip">Hip (cm, required for women)</label><input type="number" id="hip" placeholder="100" min="1" step="0.1"></div><div class="form-group"><label for="neck">Neck (cm)</label><input type="number" id="neck" placeholder="38"></div>'
    );
    return next;
  },
  'depression-screening-calculator': (html) => {
    let next = html;
    if (!next.includes('id="q9"')) next = next.replace(
      /(<div class="form-group"><label for="q7">Trouble concentrating \(0-3\)<\/label><input[^>]+id="q7"[^>]*><\/div>)/,
      '$1<div class="form-group"><label for="q8">Moving or speaking slowly, or being unusually restless (0-3)</label><input type="number" id="q8" placeholder="0" min="0" max="3" step="1"></div><div class="form-group"><label for="q9">Thoughts of death or self-harm (0-3)</label><input type="number" id="q9" placeholder="0" min="0" max="3" step="1"></div>'
    );
    if (!next.includes('During the last two weeks')) next = next.replace(
      '<div class="form-group"><label for="q1">Little interest/pleasure (0-3)</label>',
      '<p class="calc-input-sub">During the last two weeks: 0 = not at all, 1 = several days, 2 = more than half the days, 3 = nearly every day.</p><div class="form-group"><label for="q1">Little interest/pleasure (0-3)</label>'
    );
    return next;
  },
  'diabetes-risk-calculator': (html) => html.includes('id="gestational"') ? html : html
    .replace('<div class="form-group"><label for="family">Family History of Diabetes</label>', '<div class="form-group"><label for="gender">Sex</label><select id="gender"><option value="Female">Female</option><option value="Male">Male</option></select></div><div class="form-group"><label for="gestational">If female, history of gestational diabetes</label><select id="gestational"><option value="No">No</option><option value="Yes">Yes</option></select></div><div class="form-group"><label for="family">Parent or sibling with diabetes</label>')
    .replace('<div class="form-group"><label for="activity">Physical Activity</label><select id="activity"><option value="Active">Active</option><option value="Moderate">Moderate</option><option value="Sedentary">Sedentary</option></select></div>', '<div class="form-group"><label for="bloodpressure">Diagnosed high blood pressure</label><select id="bloodpressure"><option value="No">No</option><option value="Yes">Yes</option></select></div><div class="form-group"><label for="activity">Physically active</label><select id="activity"><option value="Yes">Yes</option><option value="No">No</option></select></div>')
    .replace('<div class="form-group"><label for="waist">Waist Circumference (cm)</label><input type="number" id="waist" placeholder="90"></div>', '')
};

const pageCopyTransforms = {
  'body-fat-calculator': (html) => html.replace(
    /<h2>How to Use the Body Fat Calculator<\/h2>\s*<ol class="how-to-steps">[\s\S]*?<\/ol>/,
    '<h2>How to Use the Body Fat Calculator</h2><ol class="how-to-steps"><li><strong>Step 1 — Sex:</strong> Select the formula set to use.</li><li><strong>Step 2 — Circumferences:</strong> Enter waist and neck. Women must also enter a measured hip circumference; it is never inferred from waist.</li><li><strong>Step 3 — Height:</strong> Enter height in centimetres.</li><li><strong>Step 4 — Calculate:</strong> Review the U.S. Navy circumference estimate and its measurement limitations.</li></ol>'
  ),
  'depression-screening-calculator': (html) => html
    .replace(
      /<h2>How to Use the Depression Screening Calculator<\/h2>\s*<ol class="how-to-steps">[\s\S]*?<\/ol>/,
      '<h2>How to Use the Depression Screening Calculator</h2><ol class="how-to-steps"><li><strong>Step 1 — Use the two-week timeframe:</strong> Rate all nine PHQ-9 symptom items from 0 (not at all) to 3 (nearly every day).</li><li><strong>Step 2 — Answer every item:</strong> Do not leave movement/restlessness or thoughts of death/self-harm unanswered.</li><li><strong>Step 3 — Calculate:</strong> Review the 0–27 screening score and severity band. It is not a diagnosis.</li><li><strong>Step 4 — Act on safety:</strong> Any self-harm response requires prompt human support; immediate danger requires local emergency or crisis services.</li></ol>'
    )
    .replace('<h2>This wellness score is not a diagnostic depression screen</h2>', '<h2>The PHQ-9 score is a screening result, not a diagnosis</h2>')
    .replace('The current questionnaire is an educational self-check and should not be described as a validated clinical instrument unless its wording, scoring, population, and interpretation match the published instrument exactly.', 'This implementation includes all nine PHQ-9 symptom items, the two-week timeframe, the 0–3 response scale, and the standard 0–27 severity bands. Clinical assessment is still required for diagnosis and treatment.'),
  'diabetes-risk-calculator': (html) => html
    .replace(
      /<h2>How to Use the Diabetes Risk Calculator<\/h2>\s*<ol class="how-to-steps">[\s\S]*?<\/ol>/,
      '<h2>How to Use the CDC Prediabetes Risk Test</h2><ol class="how-to-steps"><li><strong>Step 1 — Enter age and sex:</strong> These use the published CDC/ADA point values.</li><li><strong>Step 2 — Add history:</strong> Answer gestational diabetes when applicable, close family history, and diagnosed high blood pressure.</li><li><strong>Step 3 — Add activity and BMI:</strong> Answer whether you are physically active and enter BMI; the published BMI bands contribute 0–3 points.</li><li><strong>Step 4 — Calculate:</strong> A total of 5 or higher meets the screening threshold for increased prediabetes risk. Only a blood test can diagnose prediabetes or diabetes.</li></ol>'
    )
    .replace('Validated risk tests use a specified question set and scoring model. A locally created point score should not be presented as a percentage or clinical risk category unless it has been validated for that purpose.', 'This implementation follows the published CDC/ADA question set and 0–10 scoring model. A score of 5 or higher is the published threshold for increased prediabetes risk.')
    .replace('Use the official CDC risk test and discuss screening with a clinician.', 'Use this CDC/ADA screening result to discuss appropriate blood testing with a clinician.')
};

for (const [slug, calculator] of Object.entries(repairs)) {
  const file = path.join(calculatorDirectory, `${slug}.html`);
  let html = fs.readFileSync(file, 'utf8');
  if (pageTransforms[slug]) html = pageTransforms[slug](html);
  if (pageCopyTransforms[slug]) html = pageCopyTransforms[slug](html);
  const replacement = `<script>window._vhCalcFn=${calculator.toString()};</script>`;
  const marker = /<script>\s*window\._vhCalcFn\s*=\s*function\s*\(\)\s*\{[\s\S]*?\};\s*<\/script>/i;
  if (!marker.test(html) && slug === 'loan-emi-calculator') {
    html = html.replace(/<script>\s*window\._vhCalcFn[\s\S]*?(?=<div id="vh-chatbot">)/i, () => `${replacement}\n`);
  }
  if (!marker.test(html)) throw new Error(`Calculator function marker not found: ${slug}`);
  const next = html.replace(marker, () => replacement);
  fs.writeFileSync(file, next);
}

const calculatorCopyReplacements = new Map([
  ['Get accurate, science-based results instantly. ', 'Enter your information to get a transparent educational result. '],
  ['Child BMI Calculator – Healthy Weight for Kids', 'Child BMI Calculator – Raw BMI for Ages 2–19'],
  ["Concerned about your child's weight? Calculate their BMI percentile for ages 2–19 using age-adjusted standards. Get science-based guidance to support.", "Calculate a child's raw BMI for ages 2–19 and learn why an official age- and sex-specific growth chart is required for interpretation."],
  ['Body Fat Calculator – Reveal Your True Composition', 'Body Fat Calculator – Navy Circumference Estimate'],
  ['Diabetes Risk Calculator – Know Your Risk Level', 'CDC Prediabetes Risk Test – Diabetes Screening'],
  ['Assess your current stress level with this quick quiz.', 'Review five stress-related wellbeing factors without assigning a clinical stress score.'],
  ['Anti-Inflammatory Food Habit Checklist – Rate Your Diet Today', 'Anti-Inflammatory Food Habit Checklist'],
  ['Heart Health Factor Checklist – Is Your Heart Aging Too Fast?', 'Heart Health Factor Checklist'],
  ['Waist Target Difference Calculator – How Long to a Healthy Waist', 'Waist Target Difference Calculator'],
  ['Burnout Risk Calculator', 'Burnout Check-In'],
  ['Focus & Concentration Score', 'Focus Habit Check-In'],
  ['Stress Level Calculator', 'Stress and Wellbeing Check-In'],
  ['Sleep Hygiene Score', 'Sleep Hygiene Checklist'],
  ['Productivity Score Calculator', 'Productivity Habit Check-In'],
  ['Biological Age Calculator', 'Healthy Aging Habit Checklist'],
  ['Metabolic Age Calculator', 'Resting Metabolism Calculator'],
  ['Heart Age Calculator', 'Heart Health Factor Checklist'],
  ['Life Expectancy Calculator', 'Longevity Habit Checklist'],
  ['Testosterone Level Estimator', 'Testosterone Health Checklist'],
  ['Visceral Fat Estimator', 'Waist and BMI Screening Tool'],
  ['PCOS Risk Calculator', 'PCOS Symptom Checklist'],
  ['Thyroid Risk Calculator', 'Thyroid Symptom Checklist'],
  ['Stroke Risk Calculator', 'Stroke Risk-Factor Checklist'],
  ['Injury Risk Calculator', 'Training Injury Factor Checklist'],
  ['Work-Life Balance Calculator', 'Work-Life Balance Check-In'],
  ['Child Growth Calculator', 'Child Growth Measurement Summary'],
  ['Baby Weight Percentile Calculator', 'Baby Weight Measurement Tracker'],
  ['Medication Dosage Calculator', 'Medication Dose Arithmetic Checker'],
  ['Waist Reduction Calculator', 'Waist Target Difference Calculator'],
  ['Electrolyte Needs Calculator', 'Electrolyte Reference Tool'],
  ['Anti-Inflammatory Diet Score', 'Anti-Inflammatory Food Habit Checklist'],
  ['with this validated screening tool', 'with this educational check-in'],
  ["Check if your baby's weight is within a healthy percentile range.", "Record a baby's weight for use with an official growth chart."],
  ["Is your baby growing at a healthy pace? Check their weight percentile against CDC growth standards. Get peace of mind and understand your baby's.", "Record a baby's age, sex, and weight, then use an official WHO or CDC growth chart or clinician for percentile interpretation."],
  ["The Baby Weight Measurement Tracker is a tool that helps you check if your baby's weight is within a healthy percentile range.", "The Baby Weight Measurement Tracker records age, sex, and weight without claiming to calculate an official growth percentile."],
  ['The current tool uses a simplified age-based estimate. It does not apply the sex- and age-specific LMS data required to calculate a recognised WHO or CDC weight-for-age percentile.', 'This tool records the entered measurement but does not calculate a percentile. A recognised WHO or CDC percentile requires the correct sex- and exact-age-specific growth-chart data.'],
  ['Calculate BMI percentile for children aged 2-19.', 'Calculate raw BMI for ages 2-19 and use an official age-and-sex growth chart for interpretation.'],
  ['The Child BMI Calculator is a tool that helps you calculate bmi percentile for children aged 2-19.', 'The Child BMI Calculator calculates raw BMI for ages 2-19; an official age- and sex-specific growth chart is required for percentile interpretation.'],
  ['Assess child height and weight percentiles for ages 2-17 using CDC growth standards.', 'Summarize child measurements without fabricating growth percentiles.'],
  ['Estimate your testosterone range based on age and lifestyle factors (informational only).', 'Review lifestyle factors related to hormone health without inventing a testosterone level.'],
  ['Estimate your visceral fat level using waist circumference and BMI-based assessment.', 'Calculate waist-to-height ratio and BMI without claiming to measure visceral fat.'],
  ['Find the best time to sleep or wake up based on sleep cycles.', 'Find an age-based bedtime range from your preferred wake time.'],
  ['Calculate how long it will take to reach a healthy waist circumference with realistic projections.', 'Compare current and target waist measurements without inventing a timeline.'],
  ['Optimize when and how to distribute your daily protein intake for maximum muscle synthesis.', 'Plan a practical daily protein distribution around meals and training.'],
  ['Calculate optimal Pomodoro sessions for your task list and work schedule.', 'Plan Pomodoro sessions and breaks for your task list.'],
  ['Calculate your personalized daily step goal based on your health objectives.', 'Set a gradual next-step target from your current activity.'],
  ['Assess your risk of exercise-related injury based on training habits and biomechanics.', 'Review training habits associated with injury risk without assigning a probability.'],
  ['Calculate your daily electrolyte requirements for sodium, potassium, and magnesium.', 'Review general adult electrolyte reference amounts and important limitations.'],
  ['Calculate your optimal daily omega-3 intake based on your health needs and diet.', 'Estimate food-based marine omega-3 and plant ALA separately.'],
  ['Find your ideal weight range based on height and frame size.', 'Review the historical Devine reference-weight formula and its limits.'],
  ['Find out how much water you should drink daily.', 'Review a rough total-fluid starting range and factors that change it.'],
  ["Our generator uses JavaScript's Math.random(), which is suitable for games, education, and casual use but not for cryptographic security applications.", 'This generator uses the browser Web Crypto API with rejection sampling to produce unbiased integers within the selected range.'],
  ['Computer-generated random numbers are technically "pseudo-random" — produced by mathematical algorithms that appear statistically random.', 'Browser-generated values come from the operating system randomness exposed through the Web Crypto API.'],
]);

for (const name of fs.readdirSync(calculatorDirectory).filter((file) => file.endsWith('.html'))) {
  const file = path.join(calculatorDirectory, name);
  let html = fs.readFileSync(file, 'utf8');
  for (const [from, to] of calculatorCopyReplacements) html = html.split(from).join(to);
  fs.writeFileSync(file, html);
}

console.log(`Repaired ${Object.keys(repairs).length} calculator implementations.`);
