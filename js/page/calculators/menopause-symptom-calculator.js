/* Extracted from calculators/menopause-symptom-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var symptoms = [['hotflash', 'hot flashes'], ['sleep', 'sleep difficulty'], ['mood', 'mood symptoms'], ['vaginal', 'vaginal symptoms'], ['cognitive', 'cognitive concerns']].filter(function (item) { return (parseFloat(document.getElementById(item[0]).value) || 0) >= 2; }).map(function (item) { return item[1]; });
    var period = document.getElementById('period').value; var stage = period === 'No period 12+ months' ? 'postmenopause may be consistent if other causes are excluded' : period === 'No period 3-11 months' || period === 'Irregular periods' ? 'menopause transition may be possible' : 'cycle pattern alone does not indicate menopause';
    showResult('result', symptoms.length + '/5 notable symptoms', 'Menopause symptom check-in', (symptoms.length ? 'Reported: ' + symptoms.join(', ') + '. ' : '') + 'Period response: ' + stage + '. This is not a diagnostic score; discuss concerning bleeding or disruptive symptoms with a clinician.', symptoms.length >= 3 ? 'yellow' : 'green');
  };
