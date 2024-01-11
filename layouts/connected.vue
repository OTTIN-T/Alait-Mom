<template>
  <NavHeaderConnected />
  <main>
    <slot name="body" />
    <BtnAddBreastfeeding class="fixed bottom-5 right-5" />
  </main>
  <LazyNavFooter />
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
