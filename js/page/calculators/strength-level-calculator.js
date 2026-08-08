/* Extracted from calculators/strength-level-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var bodyWeight = parseFloat(document.getElementById('weight').value);
    if (!Number.isFinite(bodyWeight) || bodyWeight <= 0) { alert('Enter body weight'); return; }
    var lifts = [['Bench', parseFloat(document.getElementById('bench').value)], ['Squat', parseFloat(document.getElementById('squat').value)], ['Deadlift', parseFloat(document.getElementById('deadlift').value)]];
    var valid = lifts.filter(function (item) { return Number.isFinite(item[1]) && item[1] > 0; });
    if (!valid.length) { alert('Enter at least one lift'); return; }
    var details = valid.map(function (item) { return item[0] + ': ' + item[1] + ' kg (' + (item[1] / bodyWeight).toFixed(2) + '× body weight)'; });
    var average = valid.reduce(function (sum, item) { return sum + item[1] / bodyWeight; }, 0) / valid.length;
    showResult('result', average.toFixed(2) + '× average', 'Body-weight-relative lift summary', details.join(' | ') + '. Strength standards depend on lift, sex, age, technique, equipment, and training population, so this tool does not assign a universal rank.', 'green');
  };
