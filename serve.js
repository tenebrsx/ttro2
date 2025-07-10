#!/usr/bin/env node

/**
 * Simple Node.js HTTP server for previewing the built React application.
 * This serves the static files from the dist directory with SPA routing support.
 *
 * Usage:
 *   node serve.js [port]
 *
 * Default port: 8000
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

// Configuration
const DEFAULT_PORT = 8000;
const DIST_DIR = path.join(__dirname, "dist");

// MIME types for different file extensions
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".zip": "application/zip",
};

/**
 * Get the local IP address
 */
function getLocalIP() {
  const { networkInterfaces } = require("os");
  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

/**
 * Get MIME type for a file extension
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

/**
 * Serve a file
 */
function serveFile(res, filePath, statusCode = 200) {
  try {
    const content = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);

    res.writeHead(statusCode, {
      "Content-Type": mimeType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    res.end(content);
  } catch (error) {
    console.error(`Error serving file ${filePath}:`, error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

/**
 * Create HTTP server
 */
function createServer() {
  return http.createServer((req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      let pathname = decodeURIComponent(url.pathname);

      // Remove leading slash
      pathname = pathname.replace(/^\/+/, "");

      // If pathname is empty, serve index.html
      if (!pathname) {
        pathname = "index.html";
      }

      const filePath = path.join(DIST_DIR, pathname);

      // Security check: make sure the file is within the dist directory
      if (!filePath.startsWith(DIST_DIR)) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        res.end("Forbidden");
        return;
      }

      // Check if file exists
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          // If it's a directory, serve index.html from that directory
          const indexPath = path.join(filePath, "index.html");
          if (fs.existsSync(indexPath)) {
            serveFile(res, indexPath);
          } else {
            // Serve the main index.html for SPA routing
            serveFile(res, path.join(DIST_DIR, "index.html"));
          }
        } else {
          // Serve the file
          serveFile(res, filePath);
        }
      } else {
        // File doesn't exist
        // If it's not an asset request, serve index.html for SPA routing
        if (!pathname.startsWith("assets/") && !pathname.includes(".")) {
          serveFile(res, path.join(DIST_DIR, "index.html"));
        } else {
          // Asset not found
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
      }
    } catch (error) {
      console.error("Server error:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });
}

/**
 * Main function
 */
function main() {
  // Get port from command line argument or use default
  let port = DEFAULT_PORT;
  if (process.argv.length > 2) {
    const argPort = parseInt(process.argv[2], 10);
    if (!isNaN(argPort)) {
      port = argPort;
    } else {
      console.log(`Invalid port number: ${process.argv[2]}`);
      console.log(`Using default port: ${DEFAULT_PORT}`);
    }
  }

  // Check if dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ Error: ${DIST_DIR} directory not found!`);
    console.error(
      'Please run "npm run build" first to create the production build.',
    );
    process.exit(1);
  }

  // Check if there are files in the dist directory
  const distFiles = fs.readdirSync(DIST_DIR);
  if (distFiles.length === 0) {
    console.error(`❌ Error: ${DIST_DIR} directory is empty!`);
    console.error(
      'Please run "npm run build" first to create the production build.',
    );
    process.exit(1);
  }

  // Create and start the server
  const server = createServer();

  server.listen(port, (error) => {
    if (error) {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Error: Port ${port} is already in use!`);
        console.error(`Try a different port: node serve.js ${port + 1}`);
      } else {
        console.error(`❌ Error starting server: ${error.message}`);
      }
      process.exit(1);
    }

    const serverUrl = `http://localhost:${port}`;
    const localIP = getLocalIP();

    console.log("=".repeat(60));
    console.log("🎉 Cucinanostrard Preview Server");
    console.log("=".repeat(60));
    console.log(`📁 Serving files from: ${DIST_DIR}`);
    console.log(`🌐 Server running at: ${serverUrl}`);
    console.log(`📱 Network access: http://${localIP}:${port}`);
    console.log("=".repeat(60));
    console.log("💡 Tips:");
    console.log("   • Press Ctrl+C to stop the server");
    console.log("   • The server supports SPA routing");
    console.log("   • Static files are served with no-cache headers");
    console.log("=".repeat(60));

    // Try to open the browser (optional)
    try {
      const { exec } = require("child_process");
      const platform = process.platform;

      let command;
      if (platform === "darwin") {
        command = `open ${serverUrl}`;
      } else if (platform === "win32") {
        command = `start ${serverUrl}`;
      } else {
        command = `xdg-open ${serverUrl}`;
      }

      exec(command, (error) => {
        if (error) {
          console.log(
            `⚠️  Could not open browser automatically: ${error.message}`,
          );
          console.log(`   Please manually open: ${serverUrl}`);
        } else {
          console.log(`🔗 Opening ${serverUrl} in your browser...`);
        }
      });
    } catch (error) {
      console.log(`⚠️  Could not open browser automatically: ${error.message}`);
      console.log(`   Please manually open: ${serverUrl}`);
    }

    console.log("\n🚀 Server is running! Press Ctrl+C to stop.");
  });

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n\n👋 Server stopped by user.");
    server.close(() => {
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    console.log("\n\n👋 Server stopped.");
    server.close(() => {
      process.exit(0);
    });
  });
}

// Run the server
if (require.main === module) {
  main();
}

module.exports = { createServer, getMimeType, getLocalIP };
