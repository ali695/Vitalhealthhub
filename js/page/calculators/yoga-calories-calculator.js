/* Extracted from calculators/yoga-calories-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var duration = parseFloat(document.getElementById('duration').value); var style = document.getElementById('style').value; if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0) { alert('Enter valid weight and duration'); return; } var mets = {'Hatha': 2.5, 'Vinyasa': 4, 'Ashtanga': 5, 'Bikram/Hot Yoga': 5, 'Power Yoga': 5.5, 'Restorative': 2}; var met = mets[style]; if (!met) { alert('Choose a yoga style'); return; } var calories = met * 3.5 * weight / 200 * duration;
    showResult('result', '~' + Math.round(calories) + ' kcal', 'MET-based yoga estimate', met + ' MET for ' + duration + ' minutes. Class pace, room temperature, rest periods, and individual effort affect actual energy use.', 'green');
  };
