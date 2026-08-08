/* Extracted from calculators/bmr-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value); var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 18 || age > 120 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid adult age, weight, and height'); return; }
    var bmr = sex === 'Male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    showResult('result', Math.round(bmr) + ' kcal/day', 'Mifflin–St Jeor BMR estimate', 'Estimated energy use at rest. It is not total daily energy expenditure and may be less accurate for pregnancy, illness, very high muscularity, or unusual body composition.', 'green');
  };
