import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/test-lp/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3009,
    historyApiFallback: {
      rewrites: [
        { from: /^\/test-lp\/.*$/, to: '/test-lp/index.html' }
      ]
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
});