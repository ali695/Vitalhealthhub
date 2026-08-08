/* Extracted from calculators/birthday-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var raw = document.getElementById('dob').value;
    if (!raw) { alert('Enter date of birth'); return; }
    var dob = new Date(raw + 'T00:00:00');
    var now = new Date();
    if (Number.isNaN(dob.getTime()) || dob > now) { alert('Enter a valid date of birth'); return; }
    var name = document.getElementById('name').value || 'You';
    var next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (next < now || next.toDateString() === now.toDateString()) next.setFullYear(now.getFullYear() + 1);
    var days = Math.ceil((next - now) / 86400000);
    var age = next.getFullYear() - dob.getFullYear();
    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][next.getDay()];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    showResult('result', days + ' days', 'Next Birthday', name + "'s next birthday is in " + days + ' days, on ' + day + ', ' + months[next.getMonth()] + ' ' + next.getDate() + ', ' + next.getFullYear() + '. Turning ' + age + '.', 'green');
  };
