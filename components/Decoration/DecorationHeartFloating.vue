
<template>
  <div>
    <ClientOnly>
      <NuxtImg src="/heart-no-bg.png" :width="28" :height="25" :quality="60" format="png"
        class="ease-linear blur-sm relative" :style="parallaxAnim" :class="position" alt="image d'un coeur flouté" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
interface DecorationHeartFloating {
  container: HTMLElement | undefined;
  position: string;
  multiplicator: {
    x: number;
    y: number;
  };
}

// CONST
const props = defineProps<DecorationHeartFloating>()
const { tilt, roll } = useParallax(props.container)

// COMPUTED
const parallaxAnim = computed((): { transform: string } => ({
  transform: `translateX(${tilt.value * props.multiplicator.x}px) translateY(${roll.value * props.multiplicator.y
    }px)`,
}))
</script>
