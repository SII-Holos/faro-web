import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// SII NAT proxy setup:
// The NAT proxy serves Vite at a sub-path like
//   https://host/ws-xxx/.../proxy/5173/
// and strips that prefix before forwarding to Vite.
//
// Strategy: use base="." (relative paths) so the browser resolves asset
// URLs relative to the current page URL — no double-prefixing possible.
// For HMR WebSocket, set origin to protocol+host only.
const NAT_URL = (process.env.VITE_NAT_ORIGIN || "").replace(/\/+$/, "");

let origin = "";
if (NAT_URL) {
  const url = new URL(NAT_URL);
  origin = url.origin; // e.g. https://nat2-notebook-inspire.sii.edu.cn
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // relative paths — works behind any proxy prefix
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    host: "0.0.0.0",
    origin,
    proxy: {
      "/search": "http://localhost:8000",
      "/health": "http://localhost:8000",
      "/stats": "http://localhost:8000",
    },
  },
});
