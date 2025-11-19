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

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        fs.readFile("./404.html", (error, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        });
      } else {
        res.writeHead(500);
        res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      }
    } else {
      res.writeHead(200, { "Content-Type": mimeTypes[extensionName] || "application/octet-stream" });
      res.end(content, "utf-8");
    }
  });
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
