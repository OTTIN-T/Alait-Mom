<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-line-md-sunny-filled-loop-to-moon-filled-loop-transition' : 'i-line-md-sun-rising-filled-loop'"
      color="my-gray" variant="ghost" aria-label="Theme" @click="toggleDark" />
    <template #fallback>
      <UButton icon="i-heroicons-moon-20-solid" color="my-gray" variant="ghost" aria-label="Theme" @click="toggleDark" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
// TYPES
enum ColorModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

// CONST
const colorMode = useColorMode()

// COMPUTED
const isDark = computed({
  get(): boolean {
    return colorMode.value === ColorModeEnum.DARK
  },
  set(): void {
    colorMode.preference = colorMode.value === ColorModeEnum.DARK ? ColorModeEnum.LIGHT : ColorModeEnum.DARK
  },
})

// FUNCTIONS
// Credits: https://github.com/antfu/antfu.me/blob/main/src/logics/index.ts
function toggleDark(event: MouseEvent): void {
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
</script>
