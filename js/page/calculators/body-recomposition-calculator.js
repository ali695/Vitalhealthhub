/* Extracted from calculators/body-recomposition-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value; var activity = document.getElementById('activity').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(age) || age < 18) { alert('Enter valid adult measurements'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161; var multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725}; var maintenance = Math.round(bmr * (multipliers[activity] || 1.375));
    var proteinLow = Math.round(weight * 1.6); var proteinHigh = Math.round(weight * 2.2);
    showResult('result', '~' + maintenance + ' kcal/day', 'Recomposition starting estimates', 'Estimated maintenance energy: ' + maintenance + ' kcal/day; protein reference range: ' + proteinLow + '–' + proteinHigh + ' g/day. A fixed 5% deficit does not guarantee recomposition; adjust from measured trends and resistance-training performance.', 'green');
  };
