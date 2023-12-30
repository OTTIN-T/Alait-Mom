<template>
  <NuxtPwaManifest />
  <NuxtLayout name="default">
    <template #body>
      <NuxtPage />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
// CONST
const ogImageOptions = {
  title: 'Alait\'Mom',
  description: 'Trouvez qui feat avec qui !',
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
