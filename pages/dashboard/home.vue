<template>
  <NuxtLayout name="connected">
    <template #body>
      <div>
        dashboard
      </div>
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
