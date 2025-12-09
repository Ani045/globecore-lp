import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/depression-quiz/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3009,
    historyApiFallback: {
      rewrites: [
        { from: /^\/depression-quiz\/.*$/, to: '/depression-quiz/index.html' }
      ]
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
});