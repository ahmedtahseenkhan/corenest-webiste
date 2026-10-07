#!/usr/bin/env python3
import fnmatch
import http.server
import os

PORT = 5051
DIR = os.path.dirname(os.path.abspath(__file__))

def load_header_rules():
    # Minimal reader for Cloudflare's _headers format: a path pattern on its
    # own line, then indented "Name: value" lines.
    rules, current = [], None
    try:
        with open(os.path.join(DIR, '_headers'), encoding='utf-8') as f:
            for line in f:
                if not line.strip() or line.lstrip().startswith('#'):
                    continue
                if not line[0].isspace():
                    current = (line.strip(), [])
                    rules.append(current)
                elif current and ':' in line:
                    name, value = line.strip().split(':', 1)
                    current[1].append((name.strip(), value.strip()))
    except FileNotFoundError:
        pass
    return rules

HEADER_RULES = load_header_rules()

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def end_headers(self):
        # Same security headers Cloudflare sends (from _headers).
        path = self.path.split('?')[0].split('#')[0]
        for pattern, headers in HEADER_RULES:
            if fnmatch.fnmatchcase(path, pattern):
                for name, value in headers:
                    self.send_header(name, value)
        # Always serve fresh files so edits show up on a normal reload.
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    # Mirror Cloudflare's static-asset rules: /privacy serves privacy.html,
    # and anything missing gets 404.html with a 404 status.
    def translate_path(self, path):
        p = super().translate_path(path)
        if not os.path.exists(p) and os.path.isfile(p + '.html'):
            return p + '.html'
        return p

    def send_error(self, code, message=None, explain=None):
        page = os.path.join(DIR, '404.html')
        if code == 404 and os.path.isfile(page):
            with open(page, 'rb') as f:
                body = f.read()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)

    def log_message(self, fmt, *args):
        print(f"[website] {fmt % args}")

if __name__ == '__main__':
    with http.server.HTTPServer(('', PORT), Handler) as httpd:
        print(f"CoreNest website running at http://localhost:{PORT}")
        httpd.serve_forever()
