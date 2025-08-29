import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"),
    "Assets": path.resolve(__dirname, "src/assets"),
  },
},
  server: {
    host: true,
    port: 5173,
  }
});
