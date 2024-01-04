<template>
  <UButton :icon="btnProperty.icon" :color="btnProperty.color" variant="solid" :label="btnProperty.label" size="xl"
    :class="btnProperty.class" :disabled="btnProperty.disabled" @click="getInstallPrompt" />
</template>

<script lang="ts" setup>
// CONST
const nuxtApp = useNuxtApp()

// COMPUTED
const btnProperty = computed((): {
  icon: string;
  label: string;
  color: string;
  disabled: boolean;
  class: string;
} => {
  if (nuxtApp.$pwa?.isPWAInstalled) {
    return {
      icon: 'i-heroicons-check-circle-16-solid',
      label: 'Déjà installée !',
      color: 'green',
      disabled: true,
      class: 'dark:text-black'
    }
  }
  return {
    icon: 'i-heroicons-inbox-arrow-down-20-solid',
    label: 'Installe moi !',
    color: 'my-primary',
    disabled: false,
    class: 'dark:text-white'
  }
})

// FUNCTIONS
function getInstallPrompt(): void {
  nuxtApp.$pwa?.install();
};
</script>

<style lang="sass" scoped>
</style>
