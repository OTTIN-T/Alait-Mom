<template>
  <NuxtPwaManifest />
  <SpeedInsights />
  <NuxtPage />
  <UNotifications />
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';

// CONST
const ogImageOptions = {
  title: 'Alait\'Mom',
  description: 'Tout ce qu\'il faut pour suivre ses allaitements !',
}

// USE
useSchemaOrg([
  // TODO Select Identity: https://unhead.unjs.io/schema-org/recipes/identity
  defineWebSite({
    name: 'Alait\'Mom',
  }),
  defineWebPage(),
])

defineOgImageComponent('NuxtSeo', ogImageOptions)
</script>
