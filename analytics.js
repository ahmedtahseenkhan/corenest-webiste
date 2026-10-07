/* CoreNest analytics + cookie consent.
   Google Analytics 4 loads only after the visitor accepts (KVKK / GDPR).
   Nothing happens until CORENEST_CONFIG.gaId is set in config.js.
   Exposes window.cnCookies.open() (re-open the banner) and
   window.cnTrack(name, params) (send an event when consent was given). */
(function () {
  var cfg = window.CORENEST_CONFIG || {};
  var id = cfg.gaId;
  var KEY = 'cn-consent';
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  window.cnCookies = { enabled: !!id, open: function () {} };
  window.cnTrack = function (name, params) { if (loaded) gtag('event', name, params || {}); };
  if (!id) return;

  var TEXT = {
    tr: {
      msg: 'Siteyi nasıl kullandığınızı anlamak için, izin verirseniz Google Analytics çerezleri kullanıyoruz.',
      more: 'Gizlilik Politikası', accept: 'Kabul et', reject: 'Reddet',
    },
    en: {
      msg: 'With your permission, we use Google Analytics cookies to understand how the site is used.',
      more: 'Privacy Policy', accept: 'Accept', reject: 'Reject',
    },
  };

  function lang() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'tr') return q;
      var s = sessionStorage.getItem('cn-lang');
      if (s === 'en' || s === 'tr') return s;
    } catch (e) {}
    return 'tr';
  }
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    if (loaded) return;
    loaded = true;
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', id); // GA4 never stores full IP addresses
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }

  // Withdrawing consent: stop collection and remove the GA cookies.
  function revoke() {
    if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') === 0) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = name + '=; Max-Age=0; path=/' + d;
        });
      }
    });
  }

  var bar = null;
  function render() {
    var t = TEXT[lang()];
    bar.innerHTML =
      '<p>' + t.msg + ' <a href="/privacy">' + t.more + '</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-secondary" data-choice="denied">' + t.reject + '</button>' +
      '<button type="button" class="btn btn-primary" data-choice="granted">' + t.accept + '</button>' +
      '</div>';
  }
  function open() {
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'cookie-bar';
      bar.setAttribute('role', 'dialog');
      bar.setAttribute('aria-live', 'polite');
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-choice]');
        if (!b) return;
        var v = b.getAttribute('data-choice');
        setChoice(v);
        if (v === 'granted') load(); else revoke();
        bar.hidden = true;
      });
      document.body.appendChild(bar);
      // The home page switches language without reloading.
      window.addEventListener('cn:lang', render);
    }
    render();
    bar.hidden = false;
  }
  window.cnCookies.open = open;

  var choice = getChoice();
  if (choice === 'granted') load();
  else if (choice !== 'denied') {
    if (document.body) open();
    else document.addEventListener('DOMContentLoaded', open);
  }
})();
