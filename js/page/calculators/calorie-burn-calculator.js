/* Extracted from calculators/calorie-burn-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var activity = document.getElementById('activity').value; var duration = parseFloat(document.getElementById('duration').value);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(duration) || duration <= 0 || duration > 1440) { alert('Enter valid weight and duration'); return; }
    var mets = {'Walking (moderate)': 3.5, 'Running (8 km/h)': 8.3, 'Running (12 km/h)': 11.8, 'Cycling (moderate)': 6.8, 'Swimming': 7, 'HIIT Training': 12, 'Weight Training': 4, 'Yoga': 2.5, 'Pilates': 3, 'Dancing': 5, 'Hiking': 6, 'Rowing': 7, 'Jump Rope': 11, 'Basketball': 8, 'Tennis': 7.3, 'Golf': 4, 'Gardening': 4, 'Cleaning House': 3.5, 'Cooking': 2.5, 'Office Work': 1.5}; var met = mets[activity];
    if (!met) { alert('Choose an activity'); return; } var calories = met * 3.5 * weight / 200 * duration;
    showResult('result', '~' + Math.round(calories) + ' kcal', 'MET-based energy estimate', met + ' MET × ' + duration + ' minutes. Actual energy use varies with pace, efficiency, fitness, environment, and equipment.', 'green');
  };
