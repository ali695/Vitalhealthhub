/* Extracted from calculators/cholesterol-risk-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var total = parseFloat(document.getElementById('total').value); var hdl = parseFloat(document.getElementById('hdl').value); var ldl = parseFloat(document.getElementById('ldl').value);
    if (![total, hdl, ldl].every(function (value) { return Number.isFinite(value) && value > 0; })) { alert('Enter valid lipid values'); return; }
    var ratio = total / hdl; var flags = [];
    if (total >= 240) flags.push('high total cholesterol'); else if (total >= 200) flags.push('borderline-high total cholesterol');
    if (ldl >= 190) flags.push('very high LDL'); else if (ldl >= 160) flags.push('high LDL'); else if (ldl >= 130) flags.push('borderline-high LDL');
    if (hdl < 40) flags.push('low HDL');
    showResult('result', 'Total/HDL ' + ratio.toFixed(1), 'Lipid summary', (flags.length ? 'Flags: ' + flags.join(', ') + '. ' : 'No listed threshold flags. ') + 'A total/HDL ratio alone is not a cardiovascular-risk calculation; age, blood pressure, smoking, diabetes, treatment, and other factors matter.', flags.length >= 2 ? 'red' : flags.length ? 'yellow' : 'green');
  };
