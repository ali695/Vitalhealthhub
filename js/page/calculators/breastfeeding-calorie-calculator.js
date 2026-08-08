/* Extracted from calculators/breastfeeding-calorie-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var age = parseFloat(document.getElementById('age').value); var activity = document.getElementById('activity').value; var stage = document.getElementById('stage').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(age) || age < 14 || age > 70) { alert('Enter valid age, weight, and height'); return; }
    var bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    var multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725};
    var baseline = Math.round(bmr * (multipliers[activity] || 1.2));
    var extra = stage === '0-6 months (exclusive)' ? 330 : stage === '6-12 months (partial)' ? 400 : 0;
    var total = baseline + extra;
    showResult('result', '~' + total + ' kcal/day', 'Estimated energy need while lactating', 'Estimated non-lactation maintenance: ' + baseline + ' kcal; general lactation adjustment: +' + extra + ' kcal. Needs vary with milk production, postpartum goals, body changes, and activity; use clinical guidance when nutrition or milk supply is a concern.', 'green');
  };
