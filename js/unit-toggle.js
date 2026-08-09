/* Metric / Imperial switching for the calculators.
 *
 * The 103 calculator formulas all expect metric (kg, cm, km, ml) and none of them
 * were changed. This layer sits in front of them:
 *
 *   - renders the toggle state and rewrites labels/placeholders
 *   - converts what the visitor sees when they switch
 *   - writes the metric equivalent back into the field immediately before the
 *     page's _vhCalcFn runs, then restores the display value
 *
 * Height in imperial is the awkward one: nobody thinks in "70 inches", so imperial
 * height becomes two fields, feet and inches, and recombines to centimetres.
 *
 * The choice is remembered, so a visitor from the US sets pounds once and every other
 * calculator on the site already knows.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'vhh_unit_system';
  var KG_PER_LB = 0.45359237;
  var CM_PER_IN = 2.54;
  var KM_PER_MILE = 1.609344;
  var ML_PER_FLOZ = 29.5735295625;

  function system() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'imperial' ? 'imperial' : 'metric';
    } catch (e) {
      return 'metric';
    }
  }

  function remember(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* private mode: the toggle still works for this pageview */
    }
  }

  function round(value, dp) {
    var factor = Math.pow(10, dp === undefined ? 1 : dp);
    return Math.round(value * factor) / factor;
  }

  // Display unit shown to the visitor for each metric unit the formulas accept.
  var IMPERIAL_LABEL = { kg: 'lb', cm: 'ft/in', km: 'mi', ml: 'fl oz', l: 'fl oz' };

  function toImperial(unit, metricValue) {
    if (unit === 'kg') return metricValue / KG_PER_LB;
    if (unit === 'cm') return metricValue / CM_PER_IN;
    if (unit === 'km') return metricValue / KM_PER_MILE;
    if (unit === 'ml') return metricValue / ML_PER_FLOZ;
    if (unit === 'l') return (metricValue * 1000) / ML_PER_FLOZ;
    return metricValue;
  }

  function toMetric(unit, imperialValue) {
    if (unit === 'kg') return imperialValue * KG_PER_LB;
    if (unit === 'cm') return imperialValue * CM_PER_IN;
    if (unit === 'km') return imperialValue * KM_PER_MILE;
    if (unit === 'ml') return imperialValue * ML_PER_FLOZ;
    if (unit === 'l') return (imperialValue * ML_PER_FLOZ) / 1000;
    return imperialValue;
  }

  var fields = [];

  function collect() {
    fields = Array.prototype.slice.call(document.querySelectorAll('[data-unit]'));
  }

  function labelFor(field) {
    return document.querySelector('label[for="' + field.id + '"]');
  }

  /* ---- height gets a second box in imperial ---- */

  function heightPartner(field) {
    return document.getElementById(field.id + '-inches');
  }

  function buildHeightInches(field) {
    if (heightPartner(field)) return heightPartner(field);
    var inches = document.createElement('input');
    inches.type = 'number';
    inches.id = field.id + '-inches';
    inches.className = field.className;
    inches.placeholder = 'in';
    inches.setAttribute('aria-label', 'Height, inches');
    inches.min = '0';
    inches.max = '11';
    inches.style.display = 'none';
    field.parentNode.appendChild(inches);
    return inches;
  }

  function isHeight(field) {
    return field.dataset.unit === 'cm' && /height/i.test(field.dataset.unitLabel || field.id);
  }

  /* ---- rendering ---- */

  function render(target) {
    fields.forEach(function (field) {
      var unit = field.dataset.unit;
      var name = field.dataset.unitLabel || '';
      var label = labelFor(field);
      var raw = parseFloat(field.value);
      var height = isHeight(field);
      var inches = height ? buildHeightInches(field) : null;

      if (target === 'imperial') {
        if (height) {
          var totalIn = Number.isFinite(raw) ? raw / CM_PER_IN : NaN;
          if (Number.isFinite(totalIn)) {
            field.value = Math.floor(totalIn / 12);
            inches.value = round(totalIn % 12, 0);
          } else {
            field.value = '';
            inches.value = '';
          }
          field.placeholder = 'ft';
          inches.style.display = '';
          if (label) label.textContent = name + ' (ft / in)';
        } else {
          if (Number.isFinite(raw)) field.value = round(toImperial(unit, raw), 1);
          if (label) label.textContent = name + ' (' + IMPERIAL_LABEL[unit] + ')';
        }
      } else {
        if (height) {
          var ft = parseFloat(field.value);
          var inch = inches ? parseFloat(inches.value) : 0;
          if (Number.isFinite(ft)) {
            field.value = round((ft * 12 + (Number.isFinite(inch) ? inch : 0)) * CM_PER_IN, 0);
          }
          if (inches) inches.style.display = 'none';
          field.placeholder = '175';
          if (label) label.textContent = name + ' (cm)';
        } else {
          if (Number.isFinite(raw)) field.value = round(toMetric(unit, raw), 1);
          if (label) label.textContent = name + ' (' + unit + ')';
        }
      }
    });

    document.querySelectorAll('[data-unit-system]').forEach(function (btn) {
      var active = btn.dataset.unitSystem === target;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  /**
   * Hand the formulas metric numbers no matter what the visitor typed, then put the
   * display values back so the form still reads in their units.
   */
  function withMetricValues(run) {
    if (system() === 'metric') return run();

    var saved = fields.map(function (field) {
      var partner = isHeight(field) ? heightPartner(field) : null;
      return { field: field, value: field.value, partnerValue: partner ? partner.value : null };
    });

    fields.forEach(function (field) {
      var raw = parseFloat(field.value);
      if (!Number.isFinite(raw)) return;
      if (isHeight(field)) {
        var partner = heightPartner(field);
        var inch = partner ? parseFloat(partner.value) : 0;
        field.value = round((raw * 12 + (Number.isFinite(inch) ? inch : 0)) * CM_PER_IN, 2);
      } else {
        field.value = round(toMetric(field.dataset.unit, raw), 4);
      }
    });

    try {
      return run();
    } finally {
      saved.forEach(function (entry) {
        entry.field.value = entry.value;
        if (entry.partnerValue !== null) {
          var partner = heightPartner(entry.field);
          if (partner) partner.value = entry.partnerValue;
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    collect();
    if (!fields.length) return;

    // Wrap the page's calculator so it always receives metric.
    var original = window._vhCalcFn;
    if (typeof original === 'function') {
      window._vhCalcFn = function () {
        return withMetricValues(function () {
          return original.apply(this, arguments);
        });
      };
    }

    document.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-unit-system]');
      if (!btn) return;
      var target = btn.dataset.unitSystem;
      if (target === system()) return;
      remember(target);
      render(target);
    });

    render(system());
  });
})();
