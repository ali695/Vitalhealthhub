/* Extracted from calculators/heart-age-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 100) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if (document.getElementById('smoker').value === 'Yes') factors.push('current smoking');
    if (parseFloat(document.getElementById('bp').value) >= 130) factors.push('systolic blood pressure at or above 130');
    if (parseFloat(document.getElementById('chol').value) >= 200) factors.push('total cholesterol at or above 200');
    if (document.getElementById('diabetic').value === 'Yes') factors.push('diabetes');
    if ((parseFloat(document.getElementById('exercise').value) || 0) < 2) factors.push('low reported activity');
    var label = factors.length ? factors.length + ' modifiable factor' + (factors.length === 1 ? '' : 's') + ' identified' : 'No listed modifiable factors identified';
    showResult('result', label, 'Cardiovascular factor summary', factors.length ? 'Review with a healthcare professional: ' + factors.join(', ') + '. A valid heart-age estimate requires a validated regional model and additional clinical inputs; this tool does not invent an age.' : 'This short checklist is not a cardiovascular risk calculation. Routine clinical screening is still important.', factors.length >= 3 ? 'red' : factors.length ? 'yellow' : 'green');
  };
