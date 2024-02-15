<template>
  <UContainer as="section" class="py-16 md:py-24 lg:py-32" ref="container">
    <div class="grid items-center gap-8 justify-items-start sm:gap-16 lg:grid-cols-2">
      <div class="relative z-50 flex flex-col">
        <h1 class="relative mb-4 text-2xl font-bold title md:text-4xl">
          Alait'Mom l'appli qu'il vous faut pour <span class="inline-block anim-text" ref="animFollowText">suivre</span>
          vos <span class="inline-block anim-text" ref="animBreastfeedingText">allaitements</span> !
        </h1>
        <p class="max-w-lg mb-6 text-base text-my-gray-700 dark:text-my-gray-300 md:text-xl md:mb-10 lg:mb-12">
          Ajoutez facilement le nombre d'allaitement par jour, la durée et le sein utilisé.
        </p>
        <FormAuth />
      </div>
      <DecorationHeartFloating v-for="({ pos, multiplicator }, index) in heartList" :key="index" :position="pos"
        :multiplicator="multiplicator" :container="container" class="absolute z-0" />
      <!-- TODO replace image -->
      <NuxtImg src="/pwa/screenshot/desktop-1.png" alt="" class="inline-block h-full w-full max-w-[640px]" preload />
    </div>
    <NuxtImg src="/logo-no-bg.svg" alt="Logo alait'mom" :width="200" :height="200"
      class="mx-auto mt-5 alm-logo lg:mt-16 top-2" loading="lazy" />
    <LazyHeroStepper />
    <LazyUBadge variant="outline" color="my-primary" :ui="{
      variant: {
        outline: 'text-black dark:text-white'
      },
      rounded: 'rounded-full'
    }" class="flex justify-center w-40 mx-auto mt-10 text-sm">
      <UIcon name="i-heroicons-heart" class="mr-2" />
      Fait par un père
    </LazyUBadge>
  </UContainer>
</template>

<script lang="ts" setup>
import type { ButtonSize } from '~/models/ui.model'

// CONST
const { $anime } = useNuxtApp()
const animFollowText = ref<HTMLElement>()
const animBreastfeedingText = ref<HTMLElement>()
const container = ref<HTMLElement>()
const heartList = [
  {
    pos: 'lg:-top-28 lg:left-96 md:-top-72 md:left-[36rem] -top-52 left-40', multiplicator: {
      x: 70,
      y: 60
    }
  },
  {
    pos: 'lg:top-5 lg:left-20 md:-top-40 md:left-20 -top-24 left-20', multiplicator: {
      x: 40,
      y: 30
    }
  },
  {
    pos: 'lg:top-28 lg:left-80 md:-top-20 md:left-96 -top-10 left-52', multiplicator: {
      x: 50,
      y: 40
    }
  },
]

// FUNCTIONS
function setAnimation(): void {
  if (animFollowText.value && animFollowText.value.textContent && animBreastfeedingText.value && animBreastfeedingText.value.textContent) {
    animFollowText.value.innerHTML = animFollowText.value.textContent.replace(/\S/g, "<span class='inline-block follow-letter text-my-accent-500'>$&</span>");
    animBreastfeedingText.value.innerHTML = animBreastfeedingText.value.textContent.replace(/\S/g, "<span class='inline-block breastfeeding-letter text-my-accent-500'>$&</span>");

    $anime.timeline({
      loop: true,
      duration: 800,
      direction: 'alternate',
    }).add({
      targets: '.title .follow-letter',
      scale: [0.8, 1],
      translateZ: 0,
      delay: $anime.stagger(100, { start: 500 }),
      loop: true,
      direction: 'alternate',
    }).add({
      targets: '.title .breastfeeding-letter',
      scale: [0.8, 1],
      translateZ: 0,
      delay: $anime.stagger(100),
      loop: true,
      endDelay: 1500,
      direction: 'alternate',
    })

  }
}

// LIFE CYCLE
onMounted(() => {
  useAnime({ targets: '.alm-logo', keyframes: [{ scale: 1, easing: 'easeOutBounce' }, { scale: 0.91, easing: 'easeInBounce' }, { scale: 0.98, easing: 'easeOutBounce' }, { scale: 0.87, easing: 'easeInBounce' }, { scale: 1, easing: 'easeOutBounce' }], loop: true, duration: 4000, })
})

// WATCHER
watch([animFollowText, animBreastfeedingText], () => {
  setAnimation()
}, {
  immediate: true, deep: true
})

// PROVIDERS
provide<ButtonSize>('modal-size-btn', 'xl')
</script>

<style lang="css" scoped>
</style>
