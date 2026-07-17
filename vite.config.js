import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        python: resolve(__dirname, 'online-python-compiler.html'),
        java: resolve(__dirname, 'online-java-compiler.html'),
        c: resolve(__dirname, 'online-c-compiler.html'),
        cpp: resolve(__dirname, 'online-cpp-compiler.html'),
        javascript: resolve(__dirname, 'online-javascript-compiler.html'),
        csharp: resolve(__dirname, 'online-csharp-compiler.html'),
        go: resolve(__dirname, 'online-go-compiler.html'),
        rust: resolve(__dirname, 'online-rust-compiler.html'),
        php: resolve(__dirname, 'online-php-compiler.html'),
        ruby: resolve(__dirname, 'online-ruby-compiler.html'),
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    }
  }
})
