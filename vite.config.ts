
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  loadEnv(mode, '.', '') 
  return {
    // Set base to './' to ensure all asset paths are relative.
    // This prevents blank pages when deploying to GitHub Pages subfolders.
    base: './',
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [
        react(),
        tailwindcss()
    ],
  }
})
