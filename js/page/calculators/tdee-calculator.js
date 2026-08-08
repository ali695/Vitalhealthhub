/* Extracted from calculators/tdee-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value); var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value; var activity = document.getElementById('activity').value;
    if (!Number.isFinite(age) || age < 18 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid adult age, weight, and height'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161; var multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725, 'Extra Active': 1.9}; var tdee = Math.round(bmr * (multipliers[activity] || 1.2));
    showResult('result', '~' + tdee + ' kcal/day', 'Estimated total daily energy expenditure', 'Mifflin–St Jeor BMR multiplied by the selected activity factor. Treat this as a starting estimate and adjust from observed weight and intake trends; a fixed 500-kcal change does not guarantee a specific weekly result.', 'green');
  };
