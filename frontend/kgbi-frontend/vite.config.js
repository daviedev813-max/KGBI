import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // Use import.meta.url to define __dirname for ESM compatibility
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
  // Load env file based on `mode` (development/production)
  const env = loadEnv(mode, __dirname, '');

  return {
    plugins: [
      react(), 
      tailwindcss() // Tailwind v4 engine (zero-config)
    ],

    esbuild: {
      // Automatic cleanup: drops console/debugger in production to keep KGBI logs private
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      cssCodeSplit: true,
      
      rollupOptions: {
        output: {
          // Splitting large libraries into separate files to optimize Vercel load times
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
          // Cache busting: [hash] ensures users always get the latest version after a build
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        },
      },
    },

    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        // Redirects frontend requests from /api to your backend
        '/api': {
          // If VITE_API_URL includes "/api", we strip it for the proxy target
          target: env.VITE_API_URL?.replace('/api', '') || 'http://localhost:10000',
          changeOrigin: true,
          secure: false,
          // Rewrite ensures we don't double up on /api/api if your variable is inconsistent
          rewrite: (path) => path.replace(/^\/api/, '/api') 
        },
      },
    },
  }
})
