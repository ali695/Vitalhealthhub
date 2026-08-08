/* Extracted from calculators/intermittent-fasting-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var method = document.getElementById('method').value;
    var start = document.getElementById('start').value;
    if (!start) { alert('Enter an eating-window start time'); return; }
    if (method === '5:2') {
      showResult('result', '5:2 weekly pattern', 'Choose two non-consecutive reduced-intake days', 'The 5:2 method is based on days, not a daily eating window. Eat normally on five days and use the two reduced-intake days only if appropriate for you. Avoid fasting during pregnancy, eating-disorder recovery, or when medication/medical conditions require regular meals.', 'yellow');
      return;
    }
    var hours = {'16:8': 8, '18:6': 6, '20:4': 4};
    var eating = hours[method];
    if (!eating) { alert('Choose a supported fasting method'); return; }
    var parts = start.split(':');
    var startMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    var endMinutes = (startMinutes + eating * 60) % 1440;
    var format = function (minutes) { var hour = Math.floor(minutes / 60); var minute = minutes % 60; return (hour % 12 || 12) + ':' + (minute < 10 ? '0' : '') + minute + ' ' + (hour < 12 ? 'AM' : 'PM'); };
    showResult('result', method + ' schedule', 'Eating window', format(startMinutes) + ' to ' + format(endMinutes) + ' (' + eating + ' hours). This is a scheduling aid, not a medical recommendation.', 'green');
  };
