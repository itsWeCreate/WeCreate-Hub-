import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  loadEnv(mode, '.', '') 
  return {
    // Set base to '/' for custom domains at the root level.
    base: '/',
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [
        react(),
        tailwindcss()
    ],
  }
})