import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_GITHUB_PAGES === 'true' ? '/hungnhi-project/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/references/**', '**/tools/**'] },
  },
});
