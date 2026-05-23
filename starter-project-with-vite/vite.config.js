import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/story-app/',

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      // ✅ DIUBAH: dari 'generateSW' ke 'injectManifest'
      strategies: 'injectManifest',

      // ✅ DITAMBAH: arahkan ke src/sw.js milik kamu
      srcDir: 'src',
      filename: 'sw.js',

      includeAssets: ['favicon.svg'],

      manifest: {
        name: 'Story App',
        short_name: 'StoryApp',
        description: 'Dicoding Story App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/story-app/',
        icons: [
          {
            src: '/story-app/images/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/story-app/images/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      // ✅ DIUBAH: dari 'workbox' ke 'injectManifest'
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,png,svg,json}'],
      },
    }),
  ],
});