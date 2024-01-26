import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "./" : "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },

  build: {
    outDir: "dist",
  },

  server: {
    port: 5174,
    open: true,
  },

  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
}));
