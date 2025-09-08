import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "Assets": path.resolve(__dirname, "src/assets"),
      "Components": path.resolve(__dirname, "src/Components"),
      "Utils": path.resolve(__dirname, "src/Utils"),
    },
  },
  server: {
    host: true,
    port: 5173,
  }
});