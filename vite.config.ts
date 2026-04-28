import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// SII NAT proxy strips the path prefix before forwarding to Vite.
// So Vite sees requests as if they're on / — base stays "/".
// We only need `origin` so the HMR WebSocket URL points to the public URL.
const NAT_ORIGIN = (process.env.VITE_NAT_ORIGIN || "").replace(/\/+$/, "");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    // Listen on all interfaces — required for SII NAT proxy to reach Vite
    host: "0.0.0.0",
    // When running behind SII NAT proxy, set VITE_NAT_ORIGIN to the
    // full proxy URL so Vite's HMR WebSocket connects correctly.
    origin: NAT_ORIGIN,
    proxy: {
      // Proxy API requests to Faro backend — avoids CORS entirely
      "/search": "http://localhost:8000",
      "/health": "http://localhost:8000",
      "/stats": "http://localhost:8000",
    },
  },
});
