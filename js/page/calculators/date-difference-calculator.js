/* Extracted from calculators/date-difference-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var raw1 = document.getElementById('date1').value; var raw2 = document.getElementById('date2').value;
    if (!raw1 || !raw2) { alert('Enter both dates'); return; }
    var first = new Date(raw1 + 'T00:00:00'); var second = new Date(raw2 + 'T00:00:00'); if (second < first) { var swap = first; first = second; second = swap; }
    var days = Math.round((Date.UTC(second.getFullYear(), second.getMonth(), second.getDate()) - Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) / 86400000);
    var fullWeeks = Math.floor(days / 7); var businessDays = fullWeeks * 5; for (var offset = fullWeeks * 7; offset < days; offset += 1) { var weekday = new Date(first.getTime() + offset * 86400000).getDay(); if (weekday !== 0 && weekday !== 6) businessDays += 1; }
    showResult('result', days.toLocaleString() + ' days', 'Exact calendar-day difference', fullWeeks.toLocaleString() + ' complete weeks plus ' + (days % 7) + ' days. Weekdays excluding Saturdays and Sundays: ' + businessDays.toLocaleString() + ' (public holidays not removed).', 'green');
  };
