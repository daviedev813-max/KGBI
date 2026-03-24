import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// https://vite.dev
export default defineConfig(({ mode }) => {
  // 🛠️ Fix: Use import.meta.url instead of process.cwd() to solve the ESLint error
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const env = loadEnv(mode, __dirname, '');

  return {
    plugins: [
      react(), 
      tailwindcss()
    ],

    // ⚡ Performance Minification
    esbuild: {
      // Cleans up your code for Vercel; keeps logs for local dev
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      cssCodeSplit: true,
      
      rollupOptions: {
        output: {
          // 🏛️ Advanced Chunking: Keeps your 'Admissions' page lightweight
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-core';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('axios')) {
                return 'vendor-network';
              }
              return 'vendor-utils';
            }
          },
          // 🛡️ Cache Busting: Ensures Vercel users don't see old versions
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        },
      },
    },

    // 🚀 Local Development Bridge
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        // Automatically sends '/api' requests to your local Render-style server
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:10000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
