import process from 'node:process'
import { pwa } from './config/pwa.config'
import { nitro } from './config/nitro.config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: process.env.NODE_ENV_NUXT === 'development',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  devServer: {
    host: 'alait-mom',
    https: {
      key: './alaitmom-key.pem',
      cert: './alaitmom.pem',
    },
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_FRONTEND_URL: process.env.NUXT_PUBLIC_FRONTEND_URL,
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "Alait'Mom",
    },
    script: [
      { src: 'https://alait-mom.vercel.app/_vercel/insights/script.js', defer: true, type: 'text/partytown' },
      { src: 'https://alait-mom.vercel.app/_vercel/speed-insights/script.js', defer: true, type: 'text/partytown' },
    ],
  },
  experimental: {
    typedPages: true,
    externalVue: false,
    viewTransition: true,
  },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  imports: {
    dirs: ['composables/**'],
  },
  nitro,
  pwa,
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
    url: 'https://alait-mom.vercel.com',
    autoI18n: true,
    name: "Alait'Mom",
    defaultLocale: 'fr',
    currentLocale: 'fr',
    identity: {
      type: 'Organization',
    },
    description: "Tout ce qu'il faut pour suivre ses allaitements !",
  },
  delayHydration: {
    debug: process.env.NODE_ENV_NUXT === 'development',
    mode: 'mount',
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'credentialless',
      crossOriginOpenerPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'same-origin-allow-popups',
      crossOriginResourcePolicy: process.env.NODE_ENV === 'development' ? 'cross-origin' : 'same-origin',
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https:'],
        'script-src-attr': ["'unsafe-inline'"],
      },
      xXSSProtection: '1; mode=block',
    },
  },
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'fluent-emoji-high-contrast', 'lucide', 'material-symbols-light', 'mdi', 'line-md'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/config/tailwind.config.ts',
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },
  image: {
    dir: 'public/',
  },
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    redirect: true,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/', '/confirm/*', '/cgu', '/rgpd', '/pricing'],
    },
  },
  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY,
  },
  cookieControl: {
    locales: ['fr'],
    cookies: {
      necessary: [
        {
          description: {
            fr: "Ces cookie nous servent pour le bon fonctionnement de l'application, choix du thème, informations de connexion, durée de session. Aucun cookie servant à l'analytique est utilisé ici.",
            en: 'These cookies are necessary for the proper functioning of the application, choice of theme, login information, session duration. No cookie used for analytics is used here.',
          },
          name: {
            fr: 'Cookie nécessaire',
            en: 'Necessary cookie',
          },
        },
      ],
      optional: [],
    },
  },
  anime: {
    composables: true,
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
    'nuxt-lazy-hydrate',
    '@nuxtjs/supabase',
    '@nuxtjs/turnstile',
    '@nuxtjs/partytown',
    '@dargmuesli/nuxt-cookie-control',
    '@hypernym/nuxt-anime',
    'nuxt-aos',
    'nuxt-svgo',
  ],
})
