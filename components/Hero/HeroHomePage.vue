<template>
  <div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
    <div class="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
      <div class="flex flex-col">
        <h1 class="mb-4 text-2xl font-bold md:text-4xl">
          Alait'Mom l'appli qu'il vous faut pour suivre vos allaitements!
        </h1>
        <p class="mb-6 max-w-lg text-base text-my-gray-700 dark:text-my-gray-300 md:text-xl md:mb-10 lg:mb-12">
          Ajoutez facilement le nombre d'allaitement par jour, la durée et le sein utilisé.
        </p>
        <FormAuth />
      </div>
      <!-- TODO replace image -->
      <NuxtImg src="/pwa/screenshot/desktop-1.png" alt="" class="inline-block h-full w-full max-w-[640px]" preload />
    </div>
    <ClientOnly>
      <NuxtImg src="/logo-no-bg.svg" alt="Logo alait'mom" :width="logoSize.width" :height="logoSize.height"
        class="mx-auto mt-5 lg:mt-16" loading="lazy" />
    </ClientOnly>
    <LazyHeroStepper />
  </div>
</template>

<script lang="ts" setup>
import type { ButtonSize } from '~/models/ui.model'

// COMPUTED
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const logoSize = computed((): {
  width: number;
  height: number;
} => {
  const width = isLargeScreen.value ? 200 : 100
  const height = isLargeScreen.value ? 200 : 100
  return { width, height }
})

// PROVIDERS
provide<ButtonSize>('modal-size-btn', 'xl')
</script>

<style lang="sass" scoped>
</style>
