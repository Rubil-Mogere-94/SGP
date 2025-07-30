import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: { port: 5173 },
  base: '/',  // Add this line for production deployment
  build: {
    outDir: 'dist'  // Ensure this matches Vercel's expectations
  }
});