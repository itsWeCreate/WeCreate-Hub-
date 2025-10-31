import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // IMPORTANT for GitHub Pages (project site)
    // If you set a *custom domain* in GitHub Pages later, you can change this back to '/'.
    base: '/WeCreate-Hub-/',

    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react()],

    // Avoid shipping secrets as process.env on the client.
    // Use VITE_* vars via import.meta.env.VITE_GEMINI_API_KEY in your code.
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || '')
    },

    resolve: {
      alias: { '@': path.resolve(__dirname, '.') }
    }
  };
});
