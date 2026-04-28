import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// SII NAT proxy setup:
// - Browser requests https://host/ws-xxx/.../proxy/5173/src/main.tsx
// - NAT strips the prefix, forwards /src/main.tsx to Vite
// - So Vite needs `base` to generate URLs with the NAT prefix,
//   and `origin` (protocol+host only) for HMR WebSocket.
const NAT_URL = (process.env.VITE_NAT_ORIGIN || "").replace(/\/+$/, "");

let base = "/";
let origin = "";

if (NAT_URL) {
  const url = new URL(NAT_URL);
  base = url.pathname + "/"; // e.g. /ws-xxx/.../proxy/5173/
  origin = url.origin; // e.g. https://nat2-notebook-inspire.sii.edu.cn
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
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
