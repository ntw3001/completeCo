import { serve } from "bun";

console.log("Starting Bun server...");

serve({
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Bun, World!\n", {status: 200})
      } else if (url.pathname === "/about") {
      return new Response("About Buns\n", {status: 200})
    } else {
      return new Response("404 Not Found\n", {status: 404})
    }
  },
  port: 3000,
  hostname: "127.0.0.1",
});
