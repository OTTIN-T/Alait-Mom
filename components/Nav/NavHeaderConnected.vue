<template>
  <header class="fixed w-screen z-50 bg-white dark:bg-my-surface-dark">
    <UContainer class="md:px-4 px-2 flex justify-between items-center mt-2" as="nav">
      <ToggleTheme class="items-end ml-2" />
      <ULink to="/dashboard/home" active-class="text-my-primary-700 dark:text-my-primary"
        class="font-bold mr-1 flex items-center"
        inactive-class="text-my-gray-500 dark:text-my-gray-400 hover:text-my-secondary">
        <NuxtImg src="/logo-no-bg.svg" alt="Logo alait'mom" width="40" height="40" class="mr-1" />
      </ULink>
      <ClientOnly>
        <template #fallback>
          <UButton color="white" aria-label="menu button" trailing-icon="i-heroicons-bars-3-16-solid" />
        </template>
        <BtnMenuBurger />
      </ClientOnly>
    </UContainer>
  </header>
</template>

<script lang="ts" setup>



</script>

<style lang="sass" scoped>
</style>
