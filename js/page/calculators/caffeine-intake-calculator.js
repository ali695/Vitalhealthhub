/* Extracted from calculators/caffeine-intake-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var coffee = parseFloat(document.getElementById('coffee').value) || 0; var tea = parseFloat(document.getElementById('tea').value) || 0; var soda = parseFloat(document.getElementById('soda').value) || 0;
    if ([coffee, tea, soda].some(function (value) { return value < 0 || value > 50; })) { alert('Enter valid daily serving counts'); return; }
    var total = coffee * 95 + tea * 47 + soda * 80;
    showResult('result', '~' + Math.round(total) + ' mg/day', 'Caffeine estimate', 'Assumptions per entered serving: coffee 95 mg, tea 47 mg, and the third beverage 80 mg. Actual products vary widely. The general 400 mg/day reference is for most healthy adults; pregnancy, adolescence, medications, heart conditions, anxiety, and sleep problems require lower or individualized limits.', total > 400 ? 'yellow' : 'green');
  };
