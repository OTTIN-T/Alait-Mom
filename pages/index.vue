<template>
  <NuxtLayout name="default">
    <template #body>
      <HeroHomePage />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// CONST
const { auth } = useSupabaseClient();
const { beforeResolve } = useRouter();

// FUNCTIONS
async function redirectIfSession() {
  const session = await auth.getSession();
  if (session) {
    await navigateTo("/dashboard/home");
  }
}

// LIFE CYCLE
/**
 * SSR execute only once the onMounted hook, need to use beforeResolve for other cases
 */
onMounted(() => {
  redirectIfSession()
})
beforeResolve(() => {
  redirectIfSession()
})
</script>

<style lang="scss" scoped>
</style>
