const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const calculatorDirectory = path.resolve(__dirname, '..', 'calculators');

function calculate(slug, values) {
  const html = fs.readFileSync(path.join(calculatorDirectory, `${slug}.html`), 'utf8');
  const source = html.match(/<script>\s*(window\._vhCalcFn\s*=\s*function\s*\(\)\s*\{[\s\S]*?\};)\s*<\/script>/i)?.[1];
  assert(source, `${slug}: calculator source not found`);
  let rendered = null;
  let alertMessage = null;
  const resultChildren = new Map();
  const result = {
    style: {}, className: '',
    querySelector(selector) {
      if (!resultChildren.has(selector)) resultChildren.set(selector, { textContent: '', style: {}, className: '' });
      return resultChildren.get(selector);
    },
  };
  const context = {
    window: {},
    document: {
      getElementById(id) {
        if (id === 'result') return result;
        return { value: Object.prototype.hasOwnProperty.call(values, id) ? String(values[id]) : '0', style: {}, className: '', querySelector: result.querySelector.bind(result) };
      },
    },
    showResult(id, value, label, suggestion, color) { rendered = { id, value: String(value), label: String(label), suggestion: String(suggestion), color: String(color) }; },
    alert(message) { alertMessage = String(message); },
    Date, Math, Number, parseFloat, parseInt, isNaN,
    crypto: {
      getRandomValues(array) {
        for (let index = 0; index < array.length; index += 1) array[index] = (index * 2246822519 + 3266489917) >>> 0;
        return array;
      },
    },
    Uint32Array, setInterval(callback) { callback(); return 1; }, clearInterval() {},
  };
  context.window = context;
  vm.createContext(context);
  new vm.Script(source, { filename: slug }).runInContext(context, { timeout: 500 });
  context.window._vhCalcFn();
  assert(!alertMessage, `${slug}: unexpected alert: ${alertMessage}`);
  assert(rendered, `${slug}: no rendered result`);
  return rendered;
}

function exact(slug, values, expected) {
  assert.strictEqual(calculate(slug, values).value, expected, slug);
}

exact('bmi-calculator', { weight: 70, height: 175 }, '22.9');
exact('bmr-calculator', { age: 30, weight: 70, height: 175, gender: 'Male' }, '1649 kcal/day');
exact('body-surface-area-calculator', { weight: 70, height: 175 }, '1.84 m²');
exact('percentage-calculator', { mode: 'What is X% of Y?', val1: 20, val2: 50 }, '10.00');
exact('loan-emi-calculator', { principal: 1200, rate: 0, tenure: 12 }, '$100.00/mo');
exact('tip-calculator', { bill: 100, tip: 20, people: 4 }, '$20.00 tip');
exact('alcohol-unit-calculator', { volume: 500, abv: 5, drinks: 2 }, '5.0 UK units');
exact('calcium-calculator', { age: 12, gender: 'Female' }, '1300 mg/day');
exact('iron-intake-calculator', { age: 30, gender: 'Female', pregnant: 'No' }, '18 mg/day');
exact('medication-dosage-calculator', { weight: 20, dose: 10, frequency: 2 }, '100.00 mg');
exact('one-rep-max-calculator', { weight: 100, reps: 5 }, '117 kg');
exact('running-pace-calculator', { distance: 10, time: 50 }, '5:00/km');
exact('sleep-calculator', { wakeup: '07:00', age: 30 }, '7-9 hours');
exact('date-difference-calculator', { date1: '2026-01-01', date2: '2026-02-01' }, '31 days');
exact('depression-screening-calculator', { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1, q6: 1, q7: 1, q8: 1, q9: 1 }, '9/27');
exact('diabetes-risk-calculator', { age: 62, bmi: 41, gender: 'Male', gestational: 'No', family: 'Yes', bloodpressure: 'Yes', activity: 'No' }, '10/10');
exact('ovulation-calculator', { lmp: '2026-01-01', cycle: 28 }, '1/15/2026');
exact('calorie-burn-calculator', { weight: 70, activity: 'Office Work', duration: 60 }, '~110 kcal');

const bodyFat = parseFloat(calculate('body-fat-calculator', { gender: 'Male', waist: 90, neck: 40, height: 180, hip: 100 }).value);
assert(bodyFat > 10 && bodyFat < 30, 'body-fat-calculator: result outside plausible fixture range');

const password = calculate('password-generator', { length: 20, upper: 'Yes', nums: 'Yes', sym: 'Yes' }).value;
assert.strictEqual(password.length, 20, 'password-generator: wrong length');
assert(/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*_+\-=?]/.test(password), 'password-generator: selected groups missing');

console.log(JSON.stringify({ formulaAssertions: 22, failures: [] }, null, 2));
