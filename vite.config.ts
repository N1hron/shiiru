/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ svgrOptions: { titleProp: true } })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    host: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "./src/__tests__/setup.ts"
    ],
    coverage: {
      include: [
        "src/components/**/*.{ts,tsx}",
        "src/layout/**/*.{ts,tsx}",
        "src/ui/**/*.{ts,tsx}",
        "src/hooks/**/*.{ts,tsx}",
        "src/utils/**/*.{ts,tsx}"
      ]
    }
  }
});
