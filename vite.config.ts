import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// SII Notebook: Vite dev server is accessed via NAT proxy, which strips
// the base path.  We need to set the server origin so that Vite generates
// correct WebSocket URLs, and proxy /api to the Faro backend to avoid CORS.
const NAT_ORIGIN = (process.env.VITE_NAT_ORIGIN || "").replace(/\/+$/, "");

// Extract the path portion from the NAT URL to use as Vite's base.
// e.g. "https://host/ws-xxx/.../proxy/5173" → "/ws-xxx/.../proxy/5173/"
// This ensures Vite generates correct asset URLs behind the NAT proxy.
const NAT_BASE = NAT_ORIGIN ? new URL(NAT_ORIGIN).pathname.replace(/\/+$/, "") + "/" : "/";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: NAT_BASE,
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    // Listen on all interfaces — required for SII NAT proxy to reach Vite
    host: "0.0.0.0",
    // When running behind SII NAT proxy, set VITE_NAT_ORIGIN to the
    // full proxy URL so Vite's HMR WebSocket connects correctly.
    // Example: VITE_NAT_ORIGIN=https://nat2-notebook-inspire.sii.edu.cn/.../proxy/5173
    origin: NAT_ORIGIN,
    proxy: {
      // Proxy API requests to Faro backend — avoids CORS entirely
      "/search": "http://localhost:8000",
      "/health": "http://localhost:8000",
      "/stats": "http://localhost:8000",
    },
  },
});
