import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Faro backend address for Vite proxy.
// - Local development against SII: set VITE_FARO_API_PROXY to the NAT URL
//   e.g. VITE_FARO_API_PROXY=https://nat2-notebook-inspire.sii.edu.cn/.../proxy/8000
// - Backend on same machine: leave empty (defaults to http://localhost:8000)
const API_PROXY = process.env.VITE_FARO_API_PROXY || "http://localhost:8000";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    proxy: {
      "/search": API_PROXY,
      "/health": API_PROXY,
      "/stats": API_PROXY,
    },
  },
});
