import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          mobx: ["mobx", "mobx-react-lite"],
          markdown: ["react-markdown", "react-syntax-highlighter"]
        }
      }
    }
  },
  esbuild: {
    logOverride: {
      "this-is-undefined-in-esm": "silent",
      "unused": "silent"
    },
    drop: ["console", "debugger"],
    ignoreAnnotations: true
  },
  cacheDir: ".vite",
  optimizeDeps: {
    include: ["react", "react-dom", "mobx", "mobx-react-lite"]
  }
}) 