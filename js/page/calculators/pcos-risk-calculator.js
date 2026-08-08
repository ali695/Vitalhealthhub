/* Extracted from calculators/pcos-risk-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var symptoms = [];
    if (document.getElementById('cycle').value !== 'No') symptoms.push('irregular or absent cycles');
    if (document.getElementById('acne').value !== 'None') symptoms.push('acne');
    if (document.getElementById('hair').value !== 'No') symptoms.push('increased hair growth');
    if (document.getElementById('weight').value !== 'No') symptoms.push('weight change');
    if (document.getElementById('hairloss').value !== 'No') symptoms.push('hair loss');
    if (document.getElementById('family').value === 'Yes') symptoms.push('family history');
    showResult('result', symptoms.length + ' item' + (symptoms.length === 1 ? '' : 's') + ' reported', 'PCOS symptom checklist', symptoms.length ? 'Reported: ' + symptoms.join(', ') + '. This is not a PCOS probability or diagnosis. Similar symptoms have other causes; discuss persistent cycle or androgen-related symptoms with a qualified clinician.' : 'No listed features were reported. This checklist cannot rule out PCOS or other hormonal conditions.', symptoms.length >= 3 ? 'yellow' : 'green');
  };
