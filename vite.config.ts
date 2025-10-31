import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  loadEnv(mode, '.', '') // if you don’t use envs, you can ignore the return
  return {
    base: '/WeCreate-Hub-/',   // <- required for project pages
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react()],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } }
  }
})
