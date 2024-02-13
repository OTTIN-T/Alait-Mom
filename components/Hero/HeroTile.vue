<template>
  <UContainer as="section"
    class="relative grid gap-4 rounded-3xl border border-solid border-my-gray-700 dark:border-my-gray-300 px-8 pb-8 pt-16 md:px-10 md:pt-20"
    @mouseenter="setAnim(index)" @mouseleave="removeAnim(index)">
    <ClientOnly>
      <div
        class="absolute -top-8 left-10 flex flex-col items-center justify-center rounded-xl border border-solid border-my-accent-800 bg-my-accent px-8 py-5 [box-shadow:rgb(0,_0,_0)_4px_4px]"
        data-aos="flip-left" :data-aos-delay="350" data-aos-easing="ease-out-cubic" :data-aos-duration="800">
        <div class="text-xl font-bold md:text-2x text-white dark:text-white">
          {{ header }}
        </div>
      </div>
    </ClientOnly>
    <div class="flex flex-col md:w-max w-max">
      <h3 class="text-xl md:text-2xl font-semibold w-max">
        {{ title }}
      </h3>
      <span class="line opacity-0 h-1 w-full bg-my-accent origin-[0_0]" :class="`line-${index}`"></span>
    </div>
    <p class="text-base">
      {{ description }}
    </p>
    <slot name="content" />
  </UContainer>
</template>

<script lang="ts" setup>
interface HeroTilePropOptions {
  header: string | number /** header is the little block on top of the card */
  title: string
  description: string
  index: number
};
defineProps<HeroTilePropOptions>();

// FUNCTION
function setAnim(index: number): void {
  useAnime({
    targets: `.line-${index}`,
    scaleX: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  })
}

function removeAnim(index: number): void {
  useAnime({
    targets: `.line-${index}`,
    scaleX: [1, 0],
    opacity: [1, 0.5],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  })
}
</script>

<style lang="css" scoped>
</style>
