/* Extracted from calculators/homa-ir-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var glucose = parseFloat(document.getElementById('glucose').value);
    var insulin = parseFloat(document.getElementById('insulin').value);
    if (!Number.isFinite(glucose) || glucose <= 0 || !Number.isFinite(insulin) || insulin <= 0) { alert('Enter valid fasting glucose and insulin values'); return; }
    var homa = (glucose / 18 * insulin) / 22.5;
    showResult('result', homa.toFixed(2), 'HOMA-IR estimate', 'Formula: fasting insulin (µU/mL) × fasting glucose (mmol/L) ÷ 22.5. Cutoffs vary by laboratory and population, so this result must be interpreted by a clinician and is not a diagnosis.', 'yellow');
  };
