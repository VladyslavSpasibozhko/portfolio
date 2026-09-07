import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  publicDir: '../data',
  envDir: './src',
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, '../types'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  server: {
    proxy: {
      '/ws/chat': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});
