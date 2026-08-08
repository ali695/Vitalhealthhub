/* Extracted from calculators/alcohol-unit-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var volume = parseFloat(document.getElementById('volume').value);
    var abv = parseFloat(document.getElementById('abv').value);
    var drinks = parseFloat(document.getElementById('drinks').value);
    if (!Number.isFinite(volume) || volume <= 0 || !Number.isFinite(abv) || abv <= 0 || abv > 100 || !Number.isFinite(drinks) || drinks <= 0) { alert('Enter valid drink volume, ABV, and count'); return; }
    var units = volume * abv / 1000 * drinks;
    var grams = units * 8;
    var alcoholCalories = grams * 7;
    showResult('result', units.toFixed(1) + ' UK units', 'Pure alcohol estimate', grams.toFixed(1) + ' g alcohol and at least ' + Math.round(alcoholCalories) + ' kcal from alcohol alone. This does not estimate impairment and excludes sugar or other drink calories.', units > 6 ? 'red' : units > 3 ? 'yellow' : 'green');
  };
