import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  // ⚡ Faster minification using esbuild (replaces Terser)
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    // No need for 'minify: terser' anymore as esbuild is the default
    rollupOptions: {
      output: {
        // 🏛️ Vite 8 / Rolldown compatible chunking
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
          }
        },
      },
    },
  },
})
