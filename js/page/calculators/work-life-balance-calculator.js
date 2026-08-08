/* Extracted from calculators/work-life-balance-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var work = parseFloat(document.getElementById('workhours').value);
    var commute = parseFloat(document.getElementById('commute').value);
    var vacation = parseFloat(document.getElementById('vacation').value);
    var exercise = parseFloat(document.getElementById('exercise').value);
    var social = parseFloat(document.getElementById('social').value);
    var sleep = parseFloat(document.getElementById('sleep').value);
    if ([work, commute, vacation, exercise, social, sleep].some(function (value) { return !Number.isFinite(value) || value < 0; })) { alert('Complete every field with a non-negative value'); return; }
    var concerns = [];
    if (work > 50) concerns.push('more than 50 work hours'); if (commute > 60) concerns.push('long daily commute'); if (vacation < 10) concerns.push('limited annual leave'); if (exercise < 2) concerns.push('low activity'); if (social < 5) concerns.push('limited social time'); if (sleep < 7) concerns.push('short sleep');
    showResult('result', concerns.length + '/6 concerns', 'Work-life check-in', concerns.length ? 'Reported: ' + concerns.join(', ') + '. This is a transparent checklist, not a validated wellbeing score. Use it to choose one realistic change or seek support if strain is persistent.' : 'No listed concerns were flagged. This short checklist is not a clinical wellbeing measure.', concerns.length >= 4 ? 'red' : concerns.length ? 'yellow' : 'green');
  };
