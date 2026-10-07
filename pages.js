/* Language switch for the plain HTML pages (privacy, thanks, 404).
   Each page holds both languages in [data-lang="tr"] / [data-lang="en"] blocks
   and per-language titles in data-title-tr / data-title-en on <html>.
   Same rule as the home page: ?lang= wins, then the choice made this visit, else Turkish. */
(function () {
  function pick() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'tr') return q;
      var s = sessionStorage.getItem('cn-lang');
      if (s === 'en' || s === 'tr') return s;
    } catch (e) {}
    return 'tr';
  }
  function apply(lang) {
    var root = document.documentElement;
    root.lang = lang;
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    var desc = root.getAttribute('data-desc-' + lang);
    var md = document.querySelector('meta[name="description"]');
    if (desc && md) md.setAttribute('content', desc);
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      var on = b.getAttribute('data-set-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    var lang = pick();
    apply(lang);
    window.dispatchEvent(new CustomEvent('cn:lang', { detail: lang }));
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-set-lang');
        try { sessionStorage.setItem('cn-lang', l); } catch (e) {}
        apply(l);
        window.dispatchEvent(new CustomEvent('cn:lang', { detail: l }));
      });
    });
  });
})();
