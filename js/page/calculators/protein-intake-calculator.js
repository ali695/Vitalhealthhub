/* Extracted from calculators/protein-intake-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(weight) || weight <= 0) { alert('Enter a valid body weight'); return; }
    var ranges = {'Sedentary Adult': [0.8, 0.8], 'Active/Fitness': [1.2, 1.6], 'Muscle Building': [1.6, 2.2], 'Weight Loss': [1.2, 1.6], 'Endurance Athlete': [1.2, 1.6]}; var range = ranges[goal] || [0.8, 0.8];
    var low = Math.round(weight * range[0]); var high = Math.round(weight * range[1]);
    showResult('result', low === high ? low + ' g/day' : low + '–' + high + ' g/day', 'Protein reference range', 'Based on ' + range[0] + (range[0] === range[1] ? '' : '–' + range[1]) + ' g/kg/day for the selected goal. Kidney disease, pregnancy, older age, total energy intake, and clinical care can change needs. Protein is digested across meals; this tool does not claim a fixed absorption limit.', 'green');
  };
