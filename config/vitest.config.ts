// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    dir: 'tests',
    coverage: {
      reportsDirectory: '../tests/coverage',
      exclude: ['**/node_modules/**', '**/.nuxt/**'],
    },
    environment: 'happy-dom',
    globals: true,
  },
})
