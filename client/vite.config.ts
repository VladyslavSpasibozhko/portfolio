import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), svgr()],
  publicDir: '../data',
  envDir: './src',
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, '../types'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config.ts'),
      '@data': path.resolve(__dirname, '../data'),
      '@tailwind-config': path.resolve(__dirname, './tailwind.config.ts'),
      '@icons': path.resolve(__dirname, './src/icons'),
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
