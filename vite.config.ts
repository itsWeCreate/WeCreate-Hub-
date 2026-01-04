
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  loadEnv(mode, '.', '') 
  return {
    // Set base to empty string or './' for relative paths, 
    // essential for GitHub Pages subfolder deployment.
    base: '',
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [
        react(),
        tailwindcss()
    ],
  }
})
