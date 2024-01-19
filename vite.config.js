import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
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
});
