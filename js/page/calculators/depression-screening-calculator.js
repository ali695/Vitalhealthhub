/* Extracted from calculators/depression-screening-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var total = 0;
    for (var index = 1; index <= 9; index += 1) {
      var value = parseInt(document.getElementById('q' + index).value, 10);
      if (!Number.isInteger(value) || value < 0 || value > 3) { alert('Answer every question with a value from 0 to 3'); return; }
      total += value;
    }
    var selfHarm = parseInt(document.getElementById('q9').value, 10);
    var color = total < 5 ? 'green' : total < 10 ? 'yellow' : 'red';
    var label = total < 5 ? 'Minimal symptoms' : total < 10 ? 'Mild symptoms' : total < 15 ? 'Moderate symptoms' : total < 20 ? 'Moderately severe symptoms' : 'Severe symptoms';
    var note = 'PHQ-9 screening result; this is not a diagnosis. Discuss persistent symptoms or functional difficulty with a qualified professional.';
    if (selfHarm > 0) note = 'You reported thoughts of death or self-harm. Seek immediate support from local emergency or crisis services and tell someone you trust now. This screening result is not a diagnosis.';
    showResult('result', total + '/27', label, note, color);
  };
