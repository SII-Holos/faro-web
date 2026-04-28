import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// SII Notebook: Vite dev server is accessed via NAT proxy, which strips
// the base path.  We need to set the server origin so that Vite generates
// correct WebSocket URLs, and proxy /api to the Faro backend to avoid CORS.
const NAT_ORIGIN = process.env.VITE_NAT_ORIGIN || "";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
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
