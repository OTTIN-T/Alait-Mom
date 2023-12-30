import process from 'node:process'
import { pwa } from './config/pwa.config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: process.env.NODE_ENV_NUXT === 'development',
  devtools: { enabled: true },
  devServer: {
    host: 'alaitmom',
    https: {
      key: './alaitmom-key.pem',
      cert: './alaitmom.pem',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  googleFonts: {
    families: {
      Montserrat: true,
    },
    display: 'swap',
  },
  testUtils: {
    startOnBoot: false,
    logToConsole: true,
    vitestConfig: {
      config: '~/config/vitest.config.ts',
    },
  },
  site: {
    url: 'https://alaitmom.com',
    autoI18n: true,
    name: "Alait'Mom",
    defaultLocale: 'fr',
    currentLocale: 'fr',
    identity: {
      type: 'Organization',
    },
    description: 'Comment timmer ses allaitements !',
  },
  delayHydration: {
    debug: process.env.NODE_ENV_NUXT === 'development',
    mode: 'mount',
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },
  pwa,
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/config/tailwind.config.ts',
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  image: {
    dir: 'public/',
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    'nuxt-simple-sitemap',
    'nuxt-schema-org',
    '@vite-pwa/nuxt',
    'nuxt-delay-hydration',
    '@nuxtjs/fontaine',
    'nuxt-security',
    'nuxt-simple-robots',
    'nuxt-og-image',
    'nuxt-link-checker',
    'nuxt-seo-experiments',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils',
    'nuxt-lazy-hydrate',
  ],
})
