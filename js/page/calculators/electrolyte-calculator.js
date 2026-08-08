/* Extracted from calculators/electrolyte-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var activity = document.getElementById('activity').value;
    var climate = document.getElementById('climate').value;
    var sweat = document.getElementById('sweat').value;
    var note = 'General adult reference amounts: sodium under 2,300 mg/day, potassium about 2,600 mg/day for adult women or 3,400 mg/day for adult men, and magnesium 310-420 mg/day depending on age and sex.';
    if (activity !== 'Sedentary' || climate === 'Hot/Humid' || sweat !== 'Light Sweater') note += ' Exercise and heat losses vary widely; replace fluids and electrolytes according to duration, measured sweat loss, medical conditions, and professional advice rather than a fixed body-weight formula.';
    showResult('result', 'Individual needs vary', 'Electrolyte reference, not a prescription', note, 'yellow');
  };
