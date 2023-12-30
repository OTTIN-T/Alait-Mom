/* eslint-disable import/order */
import type { ModuleOptions } from '@vite-pwa/nuxt'
import process from 'node:process'

export const pwa: ModuleOptions = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico'],
  client: {
    installPrompt: true,
  },
  useCredentials: true,
  manifest: {
    id: '/',
    name: 'Alait\'Mom',
    short_name: 'Alait\'Mom',
    lang: 'fr',
    description: 'Comment timmer ses allaitements !',
    background_color: '#F3F6FC',
    theme_color: '#ffffff',
    orientation: 'landscape',
    display: 'fullscreen',
    protocol_handlers: [
      {
        protocol: 'web+tea',
        url: '/tea?type=%s',
      },
      {
        protocol: 'web+coffee',
        url: '/coffee?type=%s',
      },
    ],
    icons: [
      {
        src: 'pwa/icons/pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa/icons/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa/icons/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa/icons/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: 'pwa/screenshot/mobile-1.png',
        type: 'image/png',
        sizes: '322x357',
        form_factor: 'narrow',
      },
      {
        src: 'pwa/screenshot/desktop-1.png',
        type: 'image/png',
        sizes: '1883x944',
        form_factor: 'wide',
      },
    ],
  },
  devOptions: {
    enabled: process.env.PWA_DEV_ENABLED === 'true',
  },
  workbox: {
    sourcemap: true,
    globPatterns: process.env.NODE_ENV_NUXT === 'development' ? [] : ['**/*.{js,css,html,png,jpg,svg,ico,webp}'],
  },
}
