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
      '@global-types': path.resolve(__dirname, '../types'),
      '@api': path.resolve(__dirname, './src/api'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config.ts'),
      '@data': path.resolve(__dirname, '../data'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@static': path.resolve(__dirname, './static'),
      '@global-utils': path.resolve(__dirname, '../utils'),
    },
  },
  server: {
    proxy: {
      '/chat': {
        target: 'http://localhost:3001',
      },
    },
  },
});
