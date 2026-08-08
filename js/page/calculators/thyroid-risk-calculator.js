/* Extracted from calculators/thyroid-risk-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var symptoms = [];
    [['fatigue', 'fatigue'], ['weight', 'weight change'], ['cold', 'temperature sensitivity'], ['hair', 'hair or skin change'], ['mood', 'mood change']].forEach(function (item) { if ((parseFloat(document.getElementById(item[0]).value) || 0) >= 3) symptoms.push(item[1]); });
    if (document.getElementById('family').value === 'Yes') symptoms.push('family history');
    showResult('result', symptoms.length + ' item' + (symptoms.length === 1 ? '' : 's') + ' reported', 'Thyroid-related symptom checklist', symptoms.length ? 'Reported: ' + symptoms.join(', ') + '. These symptoms are nonspecific and cannot produce a thyroid-risk score. Diagnosis requires clinical evaluation and thyroid blood tests.' : 'No major listed features were reported. This checklist cannot rule out thyroid disease.', symptoms.length >= 3 ? 'yellow' : 'green');
  };
