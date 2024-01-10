<template>
  <ClientOnly>
    <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="my-gray" variant="ghost"
      aria-label="Theme" @click="isDark = !isDark" />
    <template #fallback>
      <UButton icon="i-heroicons-moon-20-solid" color="my-gray" variant="ghost" aria-label="Theme"
        @click="isDark = !isDark" />
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
</script>
