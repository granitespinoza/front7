// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // Cuando en el front hagas GET /cartelera, Vite lo reenvía a http://localhost:8000/cartelera
      '/cartelera': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/usuarios': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/reservas': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/reservar': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
