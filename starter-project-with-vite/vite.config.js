import { defineConfig }
from 'vite';

import {
  VitePWA,
} from 'vite-plugin-pwa';

export default defineConfig({
  base: '/story-app/',

  plugins: [
    VitePWA({
      registerType:
        'autoUpdate',

      injectRegister:
        'auto',

      strategies:
        'generateSW',

      includeAssets: [
        'favicon.svg',
      ],

      manifest: {
        name:
          'Story App',

        short_name:
          'StoryApp',

        description:
          'Dicoding Story App',

        theme_color:
          '#ffffff',

        background_color:
          '#ffffff',

        display:
          'standalone',

        start_url:
          '/story-app/',

        icons: [
          {
            src:
              '/story-app/images/icon-192.png',

            sizes:
              '192x192',

            type:
              'image/png',
          },

          {
            src:
              '/story-app/images/icon-512.png',

            sizes:
              '512x512',

            type:
              'image/png',
          },
        ],
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,png,svg,json}'
        ],

        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/story-api\.dicoding\.dev\/v1\/stories/,

            handler:
              'NetworkFirst',

            options: {
              cacheName:
                'stories-api-cache',

              expiration: {
                maxEntries: 50,

                maxAgeSeconds:
                  60 * 60 * 24,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          {
            urlPattern:
              /^https:\/\/tile\.openstreetmap\.org/,

            handler:
              'CacheFirst',

            options: {
              cacheName:
                'osm-cache',

              expiration: {
                maxEntries: 100,

                maxAgeSeconds:
                  60 * 60 * 24 * 30,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});