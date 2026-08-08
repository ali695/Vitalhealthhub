/* Contact form submission handler.
   Posts to Web3Forms. Set the access_key hidden input in contact.html to the key
   emailed to you by https://web3forms.com (free, 250 submissions/month).
   Falls back to a native form POST if JavaScript-based submission is unavailable. */
(function () {
  'use strict';

  var PLACEHOLDER_KEY = 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY';
  var form = document.getElementById('contactForm');
  if (!form) return;

  var status = document.getElementById('contactStatus');
  var submit = document.getElementById('contactSubmit');
  var submitLabel = submit ? submit.textContent : 'Send Message';

  function setStatus(message, state) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status' + (state ? ' is-' + state : '');
  }

  function setBusy(busy) {
    if (!submit) return;
    submit.disabled = busy;
    submit.textContent = busy ? 'Sending...' : submitLabel;
  }

  function firstInvalidField() {
    var fields = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].name === 'botcheck') continue;
      if (!fields[i].checkValidity()) return fields[i];
    }
    return null;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var invalid = firstInvalidField();
    if (invalid) {
      setStatus(invalid.validationMessage || 'Please complete the highlighted field.', 'error');
      invalid.focus();
      return;
    }

    var key = form.querySelector('input[name="access_key"]');
    if (!key || !key.value || key.value === PLACEHOLDER_KEY) {
      setStatus(
        'This form is not connected yet. Please email contact@vitalhealthhub.org directly.',
        'error'
      );
      return;
    }

    setBusy(true);
    setStatus('Sending your message...', 'pending');

    var payload = new FormData(form);
    payload.append('page_url', window.location.href);

    fetch(form.action, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok && result.data && result.data.success) {
          form.reset();
          setStatus('Thanks. Your message has been sent, we reply within 24-48 hours.', 'success');
        } else {
          var reason = (result.data && result.data.message) || 'Please try again in a moment.';
          setStatus('Sorry, that did not send. ' + reason, 'error');
        }
      })
      .catch(function () {
        setStatus(
          'Sorry, that did not send. Check your connection, or email contact@vitalhealthhub.org.',
          'error'
        );
      })
      .then(function () {
        setBusy(false);
      });
  });
})();
