/* Extracted from calculators/running-pace-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var distance = parseFloat(document.getElementById('distance').value);
    var time = parseFloat(document.getElementById('time').value);
    if (!Number.isFinite(distance) || distance <= 0 || !Number.isFinite(time) || time <= 0) { alert('Enter a valid distance and time'); return; }
    var paceSeconds = Math.round(time * 60 / distance);
    var minutes = Math.floor(paceSeconds / 60);
    var seconds = paceSeconds % 60;
    var speed = distance / (time / 60);
    showResult('result', minutes + ':' + (seconds < 10 ? '0' : '') + seconds + '/km', 'Average running pace', 'Average speed: ' + speed.toFixed(1) + ' km/h. Same-pace projections: 5 km ' + Math.round(paceSeconds * 5 / 60) + ' min; 10 km ' + Math.round(paceSeconds * 10 / 60) + ' min. Longer-race performance usually slows, so these are not race predictions.', 'green');
  };
