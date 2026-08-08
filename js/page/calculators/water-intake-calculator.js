/* Extracted from calculators/water-intake-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var activity = document.getElementById('activity').value; var climate = document.getElementById('climate').value;
    if (!Number.isFinite(weight) || weight <= 0 || weight > 500) { alert('Enter a valid body weight'); return; }
    var low = weight * 0.03; var high = weight * 0.035; var add = {'Sedentary': 0, 'Moderate': 0.35, 'Active': 0.7, 'Very Active': 1}[activity] || 0; if (climate === 'Hot') add += 0.5;
    low += add; high += add;
    showResult('result', low.toFixed(1) + '–' + high.toFixed(1) + ' L/day', 'Rough total-fluid starting range', 'Includes fluid from beverages and foods. Thirst, urine, sweat loss, pregnancy, illness, kidney/heart conditions, and medications can change needs; avoid forcing a fixed volume.', 'green');
  };
