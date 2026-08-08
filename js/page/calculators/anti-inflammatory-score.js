/* Extracted from calculators/anti-inflammatory-score.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var yes = function (id) { return document.getElementById(id).value === 'Yes' ? 1 : 0; };
    var score = yes('omega3') + yes('veggies') + yes('olive') + yes('sugar') + yes('refined') + yes('spice') + yes('alcohol');
    var pct = Math.round(score / 7 * 100);
    var color = score >= 5 ? 'green' : score >= 3 ? 'yellow' : 'red';
    var label = score >= 5 ? 'Many supportive habits' : score >= 3 ? 'Mixed dietary pattern' : 'Few supportive habits';
    var tips = [];
    if (!yes('omega3')) tips.push('add fatty fish twice weekly');
    if (!yes('veggies')) tips.push('increase fruit and vegetable variety');
    if (!yes('olive')) tips.push('choose unsaturated oils');
    if (!yes('sugar')) tips.push('reduce added sugar');
    var note = tips.length ? 'Possible priorities: ' + tips.join(', ') + '.' : 'Your answers include all seven habits in this checklist.';
    showResult('result', score + '/7 (' + pct + '%)', label, 'This is a food-habit checklist, not a measurement of inflammation. ' + note, color);
  };
