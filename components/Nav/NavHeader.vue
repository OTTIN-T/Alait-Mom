<template>
  <header>
    <UContainer class="md:px-4 px-2">
      <nav class="flex justify-between items-center mt-2">
        <ULink to="/" active-class="text-my-primary" class="font-bold mr-1 flex items-center"
          inactive-class="text-my-gray-500 dark:text-my-gray-400 hover:text-my-gray-700 dark:hover:text-my-gray-200">
          <NuxtImg src="/logo-no-bg.svg" alt="Logo alait'mom" width="40" height="40" class="mr-1" />
          Alait'Mom
        </ULink>
        <UContainer class="flex px-0 md:px-4">
          <FormAuth />
        </UContainer>
        <ToggleTheme class="items-end ml-2" />
      </nav>
    </UContainer>
  </header>
</template>

<script lang="ts" setup>
</script>

<style lang="sass" scoped>
</style>
