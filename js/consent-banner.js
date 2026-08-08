/* Consent banner UI.
 *
 * Pairs with consent-defaults.js, which has already registered the denied-by-default
 * Consent Mode v2 state before this runs.
 *
 * Design notes that are legal requirements, not preferences:
 *  - Reject is exactly as prominent and as few clicks as Accept. A banner where
 *    refusing is harder than agreeing is not valid consent under GDPR/ePrivacy.
 *  - Nothing non-essential is set until the visitor chooses. The only thing stored
 *    before a choice is nothing at all; the record of the choice itself is the first
 *    write, and that is strictly necessary.
 *  - The choice is re-openable from the footer so it can be withdrawn as easily as
 *    it was given.
 *
 * NOTE ON ADSENSE IN THE EEA: this is a first-party banner, not a Google-certified
 * CMP. Google requires a certified CMP from its own list before it will serve ads to
 * EEA/UK traffic. The free option is Google's own Privacy & messaging tool in the
 * AdSense dashboard. This implementation sets the Consent Mode signals a certified
 * CMP expects, so switching to one is a drop-in rather than a rewrite.
 */
(function () {
  'use strict';

  var api = window.vhhConsent;
  if (!api) return;

  var STORAGE_KEY = api.STORAGE_KEY;
  var gtag = api.gtag;

  var GRANT_ALL = {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'granted',
    security_storage: 'granted'
  };

  var DENY_ALL = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  };

  function persist(choices, decision) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 1, decision: decision, at: new Date().toISOString(), choices: choices })
      );
    } catch (e) {
      /* storage unavailable: the session still runs denied-by-default */
    }
  }

  function apply(choices, decision) {
    gtag('consent', 'update', choices);
    persist(choices, decision);
    close();
  }

  var banner = null;
  var lastFocused = null;

  function close() {
    if (!banner) return;
    banner.remove();
    banner = null;
    document.removeEventListener('keydown', onKeydown, true);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function onKeydown(event) {
    if (!banner) return;
    if (event.key !== 'Tab') return;
    var focusable = banner.querySelectorAll('button, a[href]');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function build() {
    if (banner) return;
    lastFocused = document.activeElement;

    banner = document.createElement('div');
    banner.className = 'vhh-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'vhhConsentTitle');
    banner.setAttribute('aria-describedby', 'vhhConsentBody');

    var title = document.createElement('h2');
    title.id = 'vhhConsentTitle';
    title.className = 'vhh-consent-title';
    title.textContent = 'Your privacy choice';

    var body = document.createElement('p');
    body.id = 'vhhConsentBody';
    body.className = 'vhh-consent-body';
    body.textContent =
      'Calculators and trackers on this site run entirely in your browser and never send your figures anywhere. We would like to use optional cookies to measure how the site is used. Nothing optional is set unless you agree.';

    var link = document.createElement('a');
    link.href = '/privacy';
    link.textContent = 'Read the privacy policy';
    link.className = 'vhh-consent-link';

    var actions = document.createElement('div');
    actions.className = 'vhh-consent-actions';

    var reject = document.createElement('button');
    reject.type = 'button';
    reject.className = 'vhh-consent-btn vhh-consent-btn-secondary';
    reject.textContent = 'Reject optional';
    reject.addEventListener('click', function () {
      apply(DENY_ALL, 'rejected');
    });

    var accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'vhh-consent-btn vhh-consent-btn-primary';
    accept.textContent = 'Accept optional';
    accept.addEventListener('click', function () {
      apply(GRANT_ALL, 'accepted');
    });

    actions.appendChild(reject);
    actions.appendChild(accept);

    banner.appendChild(title);
    banner.appendChild(body);
    banner.appendChild(link);
    banner.appendChild(actions);
    document.body.appendChild(banner);

    document.addEventListener('keydown', onKeydown, true);
    reject.focus();
  }

  // Let the choice be changed later, from the footer link.
  window.vhhOpenConsent = function () {
    build();
  };

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-consent-open]');
    if (trigger) {
      event.preventDefault();
      build();
    }
  });

  if (!api.stored) build();
})();
