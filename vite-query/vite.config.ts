import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-reniec': {
        target: 'https://api.decolecta.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-reniec/, ''),
      },
    },
  },
})