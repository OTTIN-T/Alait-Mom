<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-32 flex flex-col">
        <UDivider icon="i-fluent-emoji-high-contrast-breast-feeding" />
        <h1 class="text-center mt-5">Vos 5 derniers allaitements</h1>
        <TableBreastfeeding :limit="5" />
        <UButton class="mt-5 text-black mx-auto" color="my-primary" to="/breastfeeding/list" label="Tous vos allaitements"
          icon="i-fluent-emoji-high-contrast-breast-feeding" />
      </UContainer>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
// CONST
const { auth } = useSupabaseClient();

// LIFE CYCLE
onMounted(async () => {
  await auth.getSession();
})
</script>
