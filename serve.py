#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse

class TestLPHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Handle /test-lp routes
        if path.startswith('/test-lp'):
            # Remove /test-lp prefix to get the actual file path
            file_path = path[8:]  # Remove '/test-lp'
            if file_path == '' or file_path == '/':
                file_path = '/index.html'
            
            # Check if it's a React Router route (not a static file)
            if not any(file_path.endswith(ext) for ext in ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp']):
                file_path = '/index.html'
            
            # Set the path to serve from test-lp directory
            self.path = file_path
            
            # Change to test-lp directory
            os.chdir('test-lp')
            try:
                super().do_GET()
            finally:
                os.chdir('..')
        else:
            # Redirect root to /test-lp
            if path == '/' or path == '':
                self.send_response(302)
                self.send_header('Location', '/test-lp/')
                self.end_headers()
            else:
                self.send_response(404)
                self.end_headers()

if __name__ == "__main__":
    PORT = 3000
    
    with socketserver.TCPServer(("", PORT), TestLPHandler) as httpd:
        print(f"🚀 Server running at http://localhost:{PORT}/test-lp")
        print(f"📋 Quiz available at: http://localhost:{PORT}/test-lp")
        print(f"📊 Results page: http://localhost:{PORT}/test-lp/results")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
            httpd.shutdown()