import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/backend': {
        target: 'http://localhost/proactive-health-ui',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost/proactive-health-ui',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost/proactive-health-ui',
        changeOrigin: true,
      }
    }
  }
});
