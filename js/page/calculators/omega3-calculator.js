/* Extracted from calculators/omega3-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var condition = document.getElementById('condition').value; var fishPerWeek = parseFloat(document.getElementById('fish').value) || 0; var flaxPerDay = parseFloat(document.getElementById('flax').value) || 0; var nutsPerDay = parseFloat(document.getElementById('nuts').value) || 0;
    if ([fishPerWeek, flaxPerDay, nutsPerDay].some(function (value) { return value < 0; })) { alert('Enter non-negative servings'); return; }
    var marineDaily = fishPerWeek * 1500 / 7; var alaDaily = flaxPerDay * 2300 + nutsPerDay * 1600;
    showResult('result', '~' + Math.round(marineDaily) + ' mg EPA+DHA/day', 'Food-based omega-3 estimate', 'Estimated plant ALA: ~' + Math.round(alaDaily) + ' mg/day. Plant ALA is not equivalent to EPA+DHA and should not be added as though conversion were complete. Medical-dose omega-3 for triglycerides or other conditions requires clinician guidance; selected goal: ' + condition + '.', 'green');
  };
