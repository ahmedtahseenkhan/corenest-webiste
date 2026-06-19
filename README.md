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

- Click the **`EN / TR`** toggle in the top-right of the nav, **or**
- Open with a query param: <http://localhost:5051/?lang=tr> (`?lang=en` for English)

Your choice is saved in `localStorage` and otherwise falls back to the browser language.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Entry point — loads React, Babel, and the app |
| `website.jsx` | The entire app: components + the EN/TR translation dictionary |
| `website.css` | All styles (dark, SOC-dashboard aesthetic) |
| `server.py` | Static file server on port 5051 (sends no-cache headers) |
