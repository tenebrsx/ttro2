#!/usr/bin/env python3
"""
Simple Python HTTP server for previewing the built React application.
This serves the static files from the dist directory.

Usage:
    python serve.py [port]

Default port: 8000
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

# Default port
DEFAULT_PORT = 8000

# Directory to serve (dist folder)
DIST_DIR = "dist"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler that serves index.html for SPA routing"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

        # Cache control for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')

        super().end_headers()

    def do_GET(self):
        """Handle GET requests with SPA routing support"""
        # Check if the requested path is a file that exists
        requested_path = self.path.lstrip('/')
        full_path = os.path.join(DIST_DIR, requested_path)

        # If it's a directory, serve index.html
        if os.path.isdir(full_path):
            requested_path = os.path.join(requested_path, 'index.html')

        # If the file doesn't exist and it's not an asset, serve index.html (SPA routing)
        elif not os.path.exists(full_path) and not requested_path.startswith('assets/'):
            requested_path = 'index.html'

        # Update the path for the parent handler
        self.path = '/' + requested_path

        return super().do_GET()

def main():
    """Main function to start the server"""
    # Get port from command line argument or use default
    port = DEFAULT_PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port number: {sys.argv[1]}")
            print(f"Using default port: {DEFAULT_PORT}")
            port = DEFAULT_PORT

    # Check if dist directory exists
    if not os.path.exists(DIST_DIR):
        print(f"❌ Error: {DIST_DIR} directory not found!")
        print("Please run 'npm run build' first to create the production build.")
        sys.exit(1)

    # Check if there are files in the dist directory
    if not os.listdir(DIST_DIR):
        print(f"❌ Error: {DIST_DIR} directory is empty!")
        print("Please run 'npm run build' first to create the production build.")
        sys.exit(1)

    # Create the server
    handler = CustomHTTPRequestHandler

    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            server_url = f"http://localhost:{port}"

            print("=" * 60)
            print("🎉 Cucinanostrard Preview Server")
            print("=" * 60)
            print(f"📁 Serving files from: {os.path.abspath(DIST_DIR)}")
            print(f"🌐 Server running at: {server_url}")
            print(f"📱 Network access: http://{get_local_ip()}:{port}")
            print("=" * 60)
            print("💡 Tips:")
            print("   • Press Ctrl+C to stop the server")
            print("   • The server supports SPA routing")
            print("   • Static files are served with no-cache headers")
            print("=" * 60)

            # Try to open the browser
            try:
                webbrowser.open(server_url)
                print(f"🔗 Opening {server_url} in your browser...")
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"   Please manually open: {server_url}")

            print("\n🚀 Server is running! Press Ctrl+C to stop.")

            # Start serving
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n\n👋 Server stopped by user.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Port already in use
            print(f"❌ Error: Port {port} is already in use!")
            print(f"Try a different port: python serve.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

def get_local_ip():
    """Get the local IP address for network access"""
    import socket
    try:
        # Create a socket connection to determine the local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "localhost"

if __name__ == "__main__":
    main()
