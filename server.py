#!/usr/bin/env python3
import http.server
import os

PORT = 5051
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def end_headers(self):
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
