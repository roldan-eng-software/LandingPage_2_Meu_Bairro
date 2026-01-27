/**
 * MeuBairro - Cookie Consent Banner
 * Exibe aviso na primeira visita e armazena preferência em localStorage
 */
(function () {
  var STORAGE_KEY = 'meubairro_cookie_consent';
  var BANNER_ID = 'cookieConsentBanner';

  function getBanner() {
    return document.getElementById(BANNER_ID);
  }

  function hasConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch (e) {
      return false;
    }
  }

  function setConsent() {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      return true;
    } catch (e) {
      return false;
    }
  }

  function hideBanner() {
    var el = getBanner();
    if (el) {
      el.classList.remove('is-visible');
    }
  }

  function showBanner() {
    var el = getBanner();
    if (el) {
      el.classList.add('is-visible');
    }
  }

  function acceptAll() {
    setConsent();
    hideBanner();
  }

  function init() {
    var banner = getBanner();
    if (!banner) return;

    var btnAccept = banner.querySelector('[data-cookie-accept]');
    var btnSettings = banner.querySelector('[data-cookie-settings]');

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        acceptAll();
      });
    }

    if (btnSettings) {
      btnSettings.addEventListener('click', function () {
        setConsent();
        hideBanner();
        if (window.location.pathname.indexOf('cookies.html') >= 0) return;
        window.location.href = 'cookies.html';
      });
    }

    if (!hasConsent()) {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
