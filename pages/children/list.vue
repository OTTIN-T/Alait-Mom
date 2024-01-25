<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="pt-28  flex flex-col">
        <BtnAddChildren class="w-40 mx-auto mb-5" />
        <h1 class="text-center">Vos enfants</h1>
        <TableChildren />
      </UContainer>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
</script>
