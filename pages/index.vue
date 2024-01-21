<template>
  <NuxtLayout name="default">
    <template #body>
      <HeroHomePage />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NavigationFailure, RouteLocationRaw } from '#vue-router';

// CONST
const { auth } = useSupabaseClient();
const { beforeResolve } = useRouter();

// FUNCTIONS
async function redirectIfSession(): Promise<boolean | void | RouteLocationRaw | NavigationFailure> {
  const session = await auth.getSession();
  if (!!session.data.session) {
    return navigateTo("/dashboard/home");
  }
}

// LIFE CYCLE
onMounted(() => {
  redirectIfSession()
})

</script>

<style lang="scss" scoped>
</style>
