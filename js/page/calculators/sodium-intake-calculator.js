/* Extracted from calculators/sodium-intake-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var current = parseFloat(document.getElementById('current').value);
    var condition = document.getElementById('condition').value;
    if (!Number.isFinite(current) || current < 0 || current > 30000) { alert('Enter a valid estimated sodium intake'); return; }
    var limit = 2300;
    var color = current <= limit ? 'green' : current <= limit * 1.3 ? 'yellow' : 'red';
    var note = 'General adult limit used here: less than 2,300 mg/day. Your estimate is ' + Math.abs(current - limit).toFixed(0) + ' mg ' + (current > limit ? 'above' : 'below') + ' that level.';
    if (condition !== 'Healthy Adult') note += ' A fixed 1,500 mg target should not be assigned solely from this dropdown; ask your clinician for an individualized target.';
    note += ' Heavy prolonged exercise can change replacement needs, but this tool does not add an arbitrary exercise allowance.';
    showResult('result', current.toFixed(0) + ' mg/day', current <= limit ? 'At or below general limit' : 'Above general limit', note, color);
  };
