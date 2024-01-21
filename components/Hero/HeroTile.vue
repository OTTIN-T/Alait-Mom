<template>
  <div
    class="relative grid gap-4 rounded-3xl border border-solid border-my-gray-700 dark:border-my-gray-300 px-8 pb-8 pt-16 md:px-10 md:pt-20">
    <div
      class="absolute -top-8 left-10 flex flex-col items-center justify-center rounded-xl border border-solid border-my-accent-800 bg-my-accent px-8 py-5 [box-shadow:rgb(0,_0,_0)_4px_4px]">
      <div class="text-xl font-bold md:text-2x text-white dark:text-white">
        {{ header }}
      </div>
    </div>
    <h3 class="text-xl md:text-2xl font-semibold">
      {{ title }}
    </h3>
    <p class="text-base lg:h-44 md:h-64">
      {{ description }}
    </p>
    <slot name="content" />
  </div>
</template>

<script lang="ts" setup>
interface HeroTilePropOptions {
  header: string | number /** header is the little block on top of the card */
  title: string
  description: string
};
defineProps<HeroTilePropOptions>()
</script>

<style lang="sass" scoped>
</style>
