<template>
  <UContainer @mousemove="mouseMove" as="section"
    class="relative z-50 grid gap-4 px-8 pt-16 pb-8 transition duration-300 ease-in-out shadow hover:transition hover:ease-in-out hover:bg-my-gray-50 hover:dark:bg-my-gray-900 hover:backdrop-blur-3xl rounded-3xl ring-1 ring-my-gray-400 dark:ring-my-gray-800 md:px-10 md:pt-20"
    @mouseenter="setAnim(index)" @mouseleave="removeAnim(index)">
    <DecorationGlow :mouseEvent="mouseEvent" />

    <ClientOnly>
      <div
        class="absolute -top-8 left-10 flex flex-col items-center justify-center rounded-xl border border-solid border-my-accent-800 bg-my-accent px-8 py-5 [box-shadow:rgb(0,_0,_0)_4px_4px]"
        data-aos="flip-left" :data-aos-delay="350" data-aos-easing="ease-out-cubic" :data-aos-duration="800">
        <div class="text-xl font-bold text-white md:text-2x dark:text-white">
          {{ header }}
        </div>
      </div>
    </ClientOnly>
    <div class="flex flex-col md:w-max w-max">
      <h3 class="text-xl font-semibold md:text-2xl w-max">
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

// CONST
const props = defineProps<HeroTilePropOptions>();
const mouseEvent = ref<MouseEvent>()
const { setGlowOpacity } = useAnimation()

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
  setGlowOpacity(1, index)
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
  setGlowOpacity(0, index)
}

function mouseMove(event: MouseEvent): void {
  mouseEvent.value = event
}

// LIFE CYCLE
onMounted(() => {
  setGlowOpacity(0, props.index)
})
</script>

<style lang="css" scoped>
</style>
