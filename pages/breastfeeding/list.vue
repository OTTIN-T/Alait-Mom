<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="pt-28  flex flex-col">
        <h1 class="text-center">Vos allaitements</h1>
        <TableBreastfeeding :limit="Infinity" :has-pagination="true" />
      </UContainer>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
</script>
