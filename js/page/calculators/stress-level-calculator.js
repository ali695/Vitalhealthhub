/* Extracted from calculators/stress-level-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var sleep = parseFloat(document.getElementById('sleep').value);
    var work = parseFloat(document.getElementById('work').value);
    var exercise = parseFloat(document.getElementById('exercise').value);
    var social = parseFloat(document.getElementById('social').value);
    var worry = parseFloat(document.getElementById('worry').value);
    if ([sleep, work, exercise, social, worry].some(function (value) { return !Number.isFinite(value) || value < 1 || value > 5; })) { alert('Answer every item from 1 to 5'); return; }
    var concerns = [];
    if (sleep <= 2) concerns.push('poor sleep quality'); if (work >= 4) concerns.push('high work stress'); if (exercise <= 2) concerns.push('low activity'); if (social <= 2) concerns.push('limited support'); if (worry >= 4) concerns.push('frequent worry');
    showResult('result', concerns.length + '/5 concerns', 'Wellbeing check-in', concerns.length ? 'Reported concerns: ' + concerns.join(', ') + '. This five-item check-in is not a validated stress scale or diagnosis. Seek professional support if distress is persistent, severe, or affects safety.' : 'No major concerns were flagged by this short check-in. It is not a validated stress measurement.', concerns.length >= 3 ? 'red' : concerns.length ? 'yellow' : 'green');
  };
