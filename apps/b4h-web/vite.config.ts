/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/b4h-web',

  server: {
    port: 3000,
    host: 'localhost',
    watch: {
      usePolling: true
    }
  },

  preview: {
    port: 3100,
    host: 'localhost'
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: process.env.NODE_ENV === 'development'
      }
    })
  ],

  build: {
    outDir: '../../dist/apps/b4h-web',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },

  define: {
    'process.env': process.env
  }
});
