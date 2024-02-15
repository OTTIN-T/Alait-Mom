<template>
  <section @mousemove="mouseMove" class="flex flex-wrap content-center">
    <UContainer @mouseenter="setAnim(index, 1)" @mouseleave="setAnim(index, 0)" ref="container"
      class="z-50 transition ease-in-out duration-300 overflow-hidden rounded-xl ring-1 ring-my-gray-200 dark:ring-my-gray-800 shadow relative flex flex-col self-stretch lg:w-[56rem] md:w-4/5 w-11/12">
      <DecorationGlow :mouseEvent="mouseEvent" />
      <div class="flex flex-col flex-1 gap-6 p-6 lg:gap-x-8 xl:gap-x-10 sm:p-6 lg:p-8 xl:p-10">
        <div>
          <div class="flex flex-col items-center gap-3 md:flex-row">
            <p class="relative z-50 text-2xl font-semibold sm:text-3xl">{{ options.title }}</p>
            <span v-if="options.badge"
              class="inline-flex items-center w-32 px-2 py-1 text-xs font-medium rounded-md bg-my-accent-50 dark:bg-my-accent-200 dark:bg-opacity-10 text-my-accent-500 dark:text-my-accent-400 ring-1 ring-inset ring-my-accent-500 dark:ring-my-accent-400 ring-opacity-25 dark:ring-opacity-25">
              {{ options.badge }}
            </span>
          </div>
          <p class="mt-2 text-sm sm:text-base text-my-gray-500 dark:text-my-gray-300">
            {{ options.description }}
          </p>
        </div>
        <div class="flex flex-row items-baseline gap-x-1" v-if="options.price">
          <span class="text-2xl font-semibold text-my-gray-900 dark:text-white sm:text-4xl">{{ options.price }}€</span>
          <span class="font-medium text-my-gray-500 dark:text-my-gray-400 text-sm/6">/mois</span>
        </div>
        <div class="flex-1">
          <DecorationHeartFloating v-if="options.hasHeart" v-for="({ pos, multiplicator }, index) in heartList"
            :key="index" :position="pos" :multiplicator="multiplicator" :container="container" class="absolute z-0" />
          <ul class="relative z-50 space-y-3 text-sm">
            <li v-for="(option, index) in options.featureList" :key="index" class="flex items-center min-w-0 gap-x-3">
              <UIcon name="i-heroicons-check-badge-20-solid" class="flex-shrink-0 w-5 h-5 text-my-primary" />
              <p>{{ option }}</p>
            </li>
          </ul>
        </div>
        <slot name="cta" />
      </div>
    </UContainer>
  </section>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
import type { PricingCard } from '~/models/pricing.model';

interface CardPricingPropOptions {
  options: PricingCard
  index: number
};

// CONST
const props = defineProps<CardPricingPropOptions>()
const { setGlowOpacity } = useAnimation()
const mouseEvent = ref<MouseEvent>()
const container = ref<HTMLElement>()
const heartList = [
  {
    pos: 'lg:-top-48 lg:left-96 md:-top-64 md:left-56 -top-56 left-40', multiplicator: {
      x: 10,
      y: 5
    }
  },
  {
    pos: 'lg:-top-16 lg:left-44 md:-top-16 md:left-28 left-26', multiplicator: {
      x: 10,
      y: 5
    }
  },
  {
    pos: 'lg:top-28 lg:left-[36rem] md:top-36 md:left-96 top-52 left-52', multiplicator: {
      x: 10,
      y: 5
    }
  },
]

// FUNCTIONS
function mouseMove(event: MouseEvent): void {
  mouseEvent.value = event
}

function setAnim(index: number, value: number): void {
  setGlowOpacity(value, index)
}

// LIFE CYCLE
onMounted(() => {
  setGlowOpacity(0, props.index)
})
</script>
