import http from "http";
import fs from "fs";
import path from "path";

console.log("Starting server...");


const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
  path.join(__dirname, req.url === "/" ? "index.html" : "req.url");
  const extensionName = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
  }
  mimeTypes[extensionName] || "application/octet-stream";
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
