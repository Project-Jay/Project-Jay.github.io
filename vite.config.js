import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths for better GitHub Pages compatibility
  build: {
    outDir: 'dist',
  }
});
