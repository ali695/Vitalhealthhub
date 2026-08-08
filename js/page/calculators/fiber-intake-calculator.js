/* Extracted from calculators/fiber-intake-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value; var calories = parseFloat(document.getElementById('calories').value); if (!Number.isFinite(age) || age < 19 || !Number.isFinite(calories) || calories < 800) { alert('Enter adult age and valid calories'); return; } var ageSex = age > 50 ? (sex === 'Male' ? 30 : 21) : (sex === 'Male' ? 38 : 25); var energyBased = Math.round(calories / 1000 * 14);
    showResult('result', ageSex + ' g/day', 'Age-and-sex fiber reference', 'The 14 g per 1,000 kcal method gives ' + energyBased + ' g for the entered calories. These are alternative reference approaches, not values that should automatically be combined or whichever is higher.', 'green');
  };
