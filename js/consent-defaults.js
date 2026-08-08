/* Google Consent Mode v2 defaults.
 *
 * This MUST run synchronously, in <head>, before any tag manager or analytics
 * snippet. Consent Mode only works if the default state is registered before the
 * first tag fires; a deferred script would run too late and tags would default to
 * granted, which is the exact failure this is meant to prevent.
 *
 * Kept deliberately tiny for that reason. The banner UI is in consent-banner.js
 * and is deferred.
 *
 * There is currently no analytics or advertising tag on this site at all. This is
 * here so that when one is added, it is denied by default from the first pageview
 * rather than bolted on afterwards.
 */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  var STORAGE_KEY = 'vhh_consent_v1';

  var stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch (e) {
    stored = null;
  }

  // Denied unless this visitor has previously said otherwise. security_storage
  // covers anti-fraud and is not a tracking category, so it stays granted.
  var defaults = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  };

  gtag('consent', 'default', defaults);

  // Replay a previous decision immediately so returning visitors are not asked twice.
  if (stored && stored.choices) {
    gtag('consent', 'update', stored.choices);
  }

  window.vhhConsent = {
    STORAGE_KEY: STORAGE_KEY,
    defaults: defaults,
    stored: stored,
    gtag: window.gtag
  };
})();
