/* Extracted from calculators/cycling-calories-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var duration = parseFloat(document.getElementById('duration').value); var intensity = document.getElementById('intensity').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0) { alert('Enter valid weight and duration'); return; } var mets = {'Light (< 16 km/h)': 4, 'Moderate (16-19 km/h)': 6.8, 'Vigorous (19-22 km/h)': 8, 'Racing (> 22 km/h)': 10}; var met = mets[intensity]; if (!met) { alert('Choose intensity'); return; } var calories = met * 3.5 * weight / 200 * duration;
    showResult('result', '~' + Math.round(calories) + ' kcal', 'MET-based cycling estimate', met + ' MET for ' + duration + ' minutes. Terrain, wind, drafting, bicycle type, and actual power can substantially change energy use.', 'green');
  };
