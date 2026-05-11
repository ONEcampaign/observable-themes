import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@pkg': path.resolve(__dirname, '..'),
    },
  },
  build: {
    rollupOptions: {
      external: ['xlsx'],
    },
  },
})
