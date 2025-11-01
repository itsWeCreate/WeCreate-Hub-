import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  loadEnv(mode, '.', '') // if you don’t use envs, you can ignore the return
  return {
    base: '/',   // Updated for custom domain
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react()],
    // FIX: `__dirname` is not available in ES modules. Use `.` to resolve from the current working directory.
    resolve: { alias: { '@': path.resolve('.') } }
  }
})