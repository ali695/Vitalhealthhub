/* Extracted from calculators/hiit-calories-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var duration = parseFloat(document.getElementById('duration').value);
    var intensity = document.getElementById('intensity').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0) { alert('Enter valid weight and duration'); return; }
    var mets = {'Moderate (e.g., basic circuits)': 8, 'High (e.g., sprint intervals)': 12, 'Very High (e.g., Tabata, CrossFit)': 15};
    var met = mets[intensity] || 10;
    var calories = Math.round(met * 3.5 * weight / 200 * duration);
    showResult('result', '~' + calories + ' kcal', 'Estimated workout energy use', 'Calculated from the selected MET value for ' + duration + ' minutes. HIIT varies substantially by work-to-rest ratio and actual intensity; no fixed afterburn percentage has been added.', 'green');
  };
