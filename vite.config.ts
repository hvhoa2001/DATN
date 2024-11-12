import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:3003",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@datn": path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
    },
  },
});
