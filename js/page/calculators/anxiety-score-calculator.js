/* Extracted from calculators/anxiety-score-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var total = 0;
    for (var index = 1; index <= 7; index += 1) { var value = parseInt(document.getElementById('q' + index).value, 10); if (!Number.isInteger(value) || value < 0 || value > 3) { alert('Answer every question with a value from 0 to 3'); return; } total += value; }
    var label = total < 5 ? 'Minimal anxiety symptoms' : total < 10 ? 'Mild anxiety symptoms' : total < 15 ? 'Moderate anxiety symptoms' : 'Severe anxiety symptoms';
    showResult('result', total + '/21', 'GAD-7: ' + label, 'A screening result is not a diagnosis. Discuss persistent symptoms, functional difficulty, panic, or safety concerns with a qualified mental-health professional.', total >= 15 ? 'red' : total >= 5 ? 'yellow' : 'green');
  };
