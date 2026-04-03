import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // FE chạy cổng này
    proxy: {
      // Proxy tất cả API requests sang BE
      '/api': {
        target: 'http://localhost:3000',  // BE đang chạy ở cổng 3000
        changeOrigin: true,
      },
      '/go': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  }
})