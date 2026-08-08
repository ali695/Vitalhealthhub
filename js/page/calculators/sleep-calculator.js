/* Extracted from calculators/sleep-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var wake = document.getElementById('wakeup').value;
    var age = parseFloat(document.getElementById('age').value);
    if (!wake || !Number.isFinite(age) || age < 6 || age > 120) { alert('Enter a wake time and age 6 or older'); return; }
    var range = age <= 12 ? [9, 12] : age <= 18 ? [8, 10] : age <= 64 ? [7, 9] : [7, 8];
    var parts = wake.split(':');
    var wakeMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    var format = function (minutes) { minutes = (minutes + 1440) % 1440; var hour = Math.floor(minutes / 60); var minute = minutes % 60; return (hour % 12 || 12) + ':' + (minute < 10 ? '0' : '') + minute + ' ' + (hour < 12 ? 'AM' : 'PM'); };
    var latest = wakeMinutes - range[0] * 60;
    var earliest = wakeMinutes - range[1] * 60;
    showResult('result', range[0] + '-' + range[1] + ' hours', 'Age-based sleep range', 'For a ' + age + '-year-old waking at ' + format(wakeMinutes) + ', the corresponding sleep window is approximately ' + format(earliest) + ' to ' + format(latest) + '. Individual needs vary; fixed 90-minute cycles are not precise enough to prescribe a bedtime.', 'green');
  };
