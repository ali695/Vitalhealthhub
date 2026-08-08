/* Extracted from calculators/productivity-score-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var items = [['goals', 'unclear goals'], ['priority', 'weak prioritization'], ['distract', 'frequent distraction'], ['breaks', 'insufficient breaks'], ['sleep', 'poor sleep'], ['exercise', 'low activity']]; var concerns = items.filter(function (item) { return (parseFloat(document.getElementById(item[0]).value) || 0) <= 2; }).map(function (item) { return item[1]; });
    showResult('result', concerns.length + '/6 improvement areas', 'Productivity habit check-in', concerns.length ? 'Reported: ' + concerns.join(', ') + '. This is a transparent checklist, not a scientific productivity percentage.' : 'No listed improvement areas were flagged. This checklist does not measure actual output or effectiveness.', concerns.length >= 4 ? 'red' : concerns.length ? 'yellow' : 'green');
  };
