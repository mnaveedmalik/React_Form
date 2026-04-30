import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import karein

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Plugin list mein add karein
  ],
})