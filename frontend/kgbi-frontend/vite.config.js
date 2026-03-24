import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const env = loadEnv(mode, __dirname, '');

  return {
    plugins: [
      react(), 
      tailwindcss() 
    ],

    // 🚨 REMOVED the top-level esbuild: { drop: [...] } 
    // Vite 8 uses Oxc by default, so we move these to the build options below.

    build: {
      outDir: 'dist',
      minify: 'oxc', // Vite 8 default high-performance minifier
      cssCodeSplit: true,
      
      rolldownOptions: {
        output: {
          // ✅ NEW VITE 8 WAY: Drop console/debugger using the Oxc compressor
          minify: {
            compress: {
              drop: mode === 'production' ? ['console', 'debugger'] : [],
            }
          },
          // Smart Chunking for Vercel
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-core';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor-utils';
            }
          },
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
        '/api': {
          target: env.VITE_API_URL?.replace('/api', '') || 'http://localhost:10000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api') 
        },
      },
    },
  }
})
