<template>
  <ClientOnly>
    <NavHeaderConnected />
  </ClientOnly>
  <main>
    <slot name="body" />
    <BtnAddBreastfeeding />
  </main>
  <LazyNavFooter />
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
