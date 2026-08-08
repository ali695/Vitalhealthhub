/* Extracted from calculators/percentage-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var mode = document.getElementById('mode').value;
    var x = parseFloat(document.getElementById('val1').value);
    var y = parseFloat(document.getElementById('val2').value);
    if (!Number.isFinite(x) || !Number.isFinite(y)) { alert('Enter both values'); return; }
    var result; var label; var note;
    if (mode === 'What is X% of Y?') { result = x / 100 * y; label = x + '% of ' + y; note = x + '% × ' + y + ' = ' + result.toFixed(2); }
    else if (mode === 'X is what % of Y?') { if (y === 0) { alert('The comparison value cannot be zero'); return; } result = x / y * 100; label = 'Percentage result'; note = x + ' is ' + result.toFixed(2) + '% of ' + y + '.'; }
    else if (mode === '% Change from X to Y') { if (x === 0) { alert('Percent change is undefined when the starting value is zero'); return; } result = (y - x) / Math.abs(x) * 100; label = result > 0 ? 'Increase' : result < 0 ? 'Decrease' : 'No change'; note = 'Difference: ' + (y - x).toFixed(2) + '.'; }
    else if (mode === 'Add X% to Y') { result = y * (1 + x / 100); label = 'After adding ' + x + '%'; note = 'Added amount: ' + (y * x / 100).toFixed(2) + '.'; }
    else { result = y * (1 - x / 100); label = 'After subtracting ' + x + '%'; note = 'Subtracted amount: ' + (y * x / 100).toFixed(2) + '.'; }
    showResult('result', result.toFixed(2) + (mode === '% Change from X to Y' ? '%' : ''), label, note, 'green');
  };
