<template>
  <footer class="block mx-auto w-full max-w-7xl px-5 pb-5">
    <UDivider class="pb-5" />
    <div class="flex flex-row justify-between md:items-center">
      <div class="flex flex-col sm:flex-row">
        <ULink to="/" active-class="text-my-primary" class="text-my-primary font-bold pr-6"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-my-secondary">
          Alait'Mom
        </ULink>
        <a href="mailto:ottin.timothe@gmail.com" class="font-normal transition hover:text-my-secondary pr-6">Contact</a>
        <NuxtLink to="https://twitter.com/TimCode_" external
          class="font-normal transition hover:text-my-secondary pr-6 pt-0.5">
          <UIcon name="i-simple-icons-x" />
        </NuxtLink>
        <NuxtLink to="https://github.com/OTTIN-T" external
          class="font-normal transition hover:text-my-secondary pr-6 pt-0.5">
          <UIcon name="i-simple-icons-github" />
        </NuxtLink>
      </div>
      <p class="text-my-gray-600 text-sm md:text-base">
        © Copyright {{ formatted }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
// CONST
const formatted = useDateFormat(useNow(), 'YYYY')
</script>

<style lang="sass" scoped>
</style>
