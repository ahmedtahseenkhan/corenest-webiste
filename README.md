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

The site opens in **Turkish** on every new visit.

- Click the **`EN / TR`** toggle in the top-right of the nav (the choice lasts for that visit), **or**
- Open with a query param: <http://localhost:5051/?lang=en> (`?lang=tr` for Turkish)

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

## Files

| File | Purpose |
|------|---------|
| `index.html` | Entry point — loads React, Babel, and the app |
| `website.jsx` | The entire app: components + the EN/TR translation dictionary |
| `website.css` | All styles (dark, SOC-dashboard aesthetic) |
| `assets/` | Dashboard screenshots and the link-preview image |
| `config.js` | Web3Forms key and Google Analytics ID |
| `analytics.js` | Cookie banner + Google Analytics (consent first) |
| `privacy.html`, `thanks.html`, `404.html` | Plain pages, both languages; `pages.js` switches them |
| `robots.txt`, `sitemap.xml` | For search engines (domain: corenest.io) |
| `.assetsignore` | Repo files Cloudflare must not publish |
| `server.py` | Static file server on port 5051 (sends no-cache headers) |
