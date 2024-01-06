// import type { NitroOptions } from 'nitropack';

import type { ModuleOptions } from '@nuxt/schema'

export const nitro: ModuleOptions = {
  compressPublicAssets: {
    gzip: true,
    brotli: true,
  },
  minify: true,
  routeRules: {
    '/**': {
      prerender: true,
      cache: {
        swr: true,
        maxAge: 31536000,
        staleMaxAge: 31536000,
        headersOnly: true,
      },
    },
    '/_nuxt/**': {
      prerender: true,
      headers: {
        'cache-control': 's-maxage=31536000, max-age=31536000',
      },
    },
  },
}
