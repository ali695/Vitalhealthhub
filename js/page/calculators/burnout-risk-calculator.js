/* Extracted from calculators/burnout-risk-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var ids = ['exhaust', 'detach', 'ineffect', 'workload', 'control', 'sleep', 'recovery']; var concerns = [];
    ids.forEach(function (id) { var value = parseFloat(document.getElementById(id).value); if (Number.isFinite(value) && value >= 3) concerns.push(id); });
    showResult('result', concerns.length + '/7 elevated items', 'Burnout check-in', concerns.length ? 'Elevated areas: ' + concerns.join(', ') + '. This custom checklist is not a validated diagnosis or percentage. Persistent exhaustion, detachment, or impaired functioning deserves professional support and workplace changes.' : 'No elevated items were reported. This short checklist cannot rule out burnout or another health condition.', concerns.length >= 5 ? 'red' : concerns.length >= 2 ? 'yellow' : 'green');
  };
