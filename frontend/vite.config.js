// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/webhook': {
        target: 'https://virtually-lenient-shad.ngrok-free.app',
        changeOrigin: true,
        secure: false, // Permite certificados autofirmados o ngrok
        rewrite: (path) => path.replace(/^\/webhook/, ''),
      },
    },
  },
});