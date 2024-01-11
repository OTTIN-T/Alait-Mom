<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="pt-32 flex justify-around">
        <UButton icon="i-heroicons-user-circle" class="text-black dark:text-white" label="Profil" to="/dashboard/profile"
          color="my-primary" variant="soft" />
        <BtnAddChildren />
      </UContainer>
      <UContainer as="section" class="py-10 flex flex-col">
        <UDivider icon="i-fluent-emoji-high-contrast-breast-feeding" class=" w-1/2 mx-auto" />
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
const { beforeEach } = useRouter();

// LIFE CYCLE
onMounted(async () => {
  await auth.getSession();
})
beforeEach(async (to, _from, next) => {
  await auth.getSession();
  next()
})
</script>
