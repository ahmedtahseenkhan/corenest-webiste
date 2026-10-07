/* Language switch for the plain HTML pages (privacy, terms, thanks, 404).
   Turkish content is in the page; English content sits in
   <template data-lang="en"> so the source has a single <h1> per page.
   Only the active language is in the document at any time.
   Per-language titles/descriptions live in data-title-* / data-desc-* on <html>.
   Rule (same as the home page): ?lang= wins, then this visit's choice, else Turkish. */
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

  var slots = [];
  function collect() {
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      var lang = el.getAttribute('data-lang');
      var node = el;
      if (el.tagName === 'TEMPLATE') {
        node = document.importNode(el.content, true).firstElementChild;
        el.replaceWith(node);
      }
      var marker = document.createComment(' ' + lang + ' ');
      node.parentNode.insertBefore(marker, node);
      slots.push({ lang: lang, node: node, marker: marker });
    });
  }

  // "/" and "/#…" links go to the home page in the visitor's language
  function homeLinks(lang) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var orig = a.getAttribute('data-home-href');
      if (orig === null) {
        orig = a.getAttribute('href');
        if (!/^\/(#.*)?$/.test(orig)) return;
        a.setAttribute('data-home-href', orig);
      }
      a.setAttribute('href', (lang === 'en' ? '/en/' : '/') + orig.slice(1));
    });
  }

  function apply(lang) {
    var root = document.documentElement;
    root.lang = lang;
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    var desc = root.getAttribute('data-desc-' + lang);
    var md = document.querySelector('meta[name="description"]');
    if (desc && md) md.setAttribute('content', desc);
    slots.forEach(function (s) {
      if (s.lang === lang) {
        if (!s.node.isConnected) s.marker.after(s.node);
        s.node.hidden = false;
      } else if (s.node.isConnected) {
        s.node.remove();
      }
    });
    homeLinks(lang);
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      var on = b.getAttribute('data-set-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on);
    });
    window.dispatchEvent(new CustomEvent('cn:lang', { detail: lang }));
  }

  document.addEventListener('DOMContentLoaded', function () {
    collect();
    apply(pick());
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-set-lang');
        try { sessionStorage.setItem('cn-lang', l); } catch (e) {}
        apply(l);
      });
    });
  });
})();
