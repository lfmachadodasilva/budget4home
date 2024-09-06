/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/b4h-react',

    define: {
      'process.env': JSON.stringify(env)
    },

    server: {
      port: 3001,
      host: 'localhost'
    },

    preview: {
      port: 3002,
      host: 'localhost'
    },

    plugins: [
      react(),
      nxViteTsPaths(),
      VitePWA({
        registerType: 'autoUpdate'
      })
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    build: {
      outDir: '../../dist/apps/b4h-react',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  };
});
