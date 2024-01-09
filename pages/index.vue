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
/**
 * SSR execute only once the onMounted hook, need to use beforeResolve for other cases
 */
onMounted(() => {
  redirectIfSession()
})
beforeResolve((to, _from) => {
  to.path === "/" && redirectIfSession();
})
</script>

<style lang="scss" scoped>
</style>
