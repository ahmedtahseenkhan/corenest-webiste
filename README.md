# CoreNest — marketing site

A single-page marketing site for **CoreNest**, a modern SIEM concept. It's a one-file
React app (React 18 + Babel Standalone via CDN, no build step) served by a tiny Python
static file server. Fully bilingual — **English / Turkish**.

## Run

```bash
python3 server.py
# → http://localhost:5051
```

## Languages

- Turkish (default): <http://localhost:5051/>
- English: <http://localhost:5051/en/>

Each language has its own URL with its own title, description, canonical and
share tags. The **`EN / TR`** toggle switches URL without reloading; old
`?lang=en` links are moved to `/en/`. The plain pages (privacy, thanks, 404)
follow the language picked during the visit.

The hero shows the real dashboard: the English UI on the English site and the
Arabic (right-to-left) UI on the Turkish site (`assets/dashboard-en.webp`, `assets/dashboard-ar.webp`).

## Components

The motion effects (text-roll nav links, letter scroll reveal, hover-expand
panels, sticky stacked cards, scroll-drawn line, underline links) are ported
from [Skiper UI](https://skiper-ui.com) to plain React + CSS, so there is still
no build step. Skiper UI's free components require attribution, which is the
"Components by Skiper UI" link in the footer.

## Settings

`config.js` holds the two values the live site needs:

- `web3formsKey`: Web3Forms access key; demo requests are emailed to the address you signed up with.
- `gaId`: Google Analytics 4 measurement ID. When set, a cookie banner asks for consent and GA loads only after "Accept".

## Demo form

Submissions go from the browser to **Web3Forms** (`api.web3forms.com`), which
emails them to the address that owns `web3formsKey`. Nothing is stored on
this site. Spam protection: a hidden honeypot field, a 3-second minimum before
sending, and Web3Forms' own filter. Success goes to `/thanks`, which also sends
the `generate_lead` analytics event (only with cookie consent).

To test delivery: set `web3formsKey`, run `python3 server.py`, send the form on
<http://localhost:5051/#cta> with your own address, and check the inbox (and
spam folder) of the Web3Forms account email. Repeat once on the live site.

## Files

| File | Purpose |
|------|---------|
| `index.html`, `en/index.html` | Turkish / English entry points (static SEO head), both load the same app |
| `website.jsx` | The entire app: components + the EN/TR translation dictionary |
| `website.css` | All styles (dark, SOC-dashboard aesthetic) |
| `assets/` | Dashboard screenshots and the link-preview images (TR + EN) |
| `favicon.*`, `icon-*.png`, `site.webmanifest` | Browser and app icons |
| `config.js` | Web3Forms key and Google Analytics ID |
| `analytics.js` | Cookie banner + Google Analytics (consent first) |
| `privacy.html`, `thanks.html`, `404.html` | Plain pages, both languages; `pages.js` switches them |
| `robots.txt`, `sitemap.xml` | For search engines (domain: corenest.io) |
| `.assetsignore` | Repo files Cloudflare must not publish |
| `server.py` | Static file server on port 5051 (sends no-cache headers) |
