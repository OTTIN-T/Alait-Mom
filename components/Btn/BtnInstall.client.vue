<template>
  <div class="flex flex-col mx-auto">
    <UButton :icon="btnProperty.icon" :color="btnProperty.color" variant="solid" :label="btnProperty.label" size="xl"
      class="text-black" :disabled="btnProperty.disabled" @click="getInstallPrompt" />
    <UPopover v-if="isFirefox || isIOS" class="mx-auto mt-2" :popper="{ arrow: true }">
      <UButton color="orange" :label="labelPopover" class="text-black" icon="i-heroicons-exclamation-triangle-20-solid"
        size="2xs" />
      <template #panel>
        <p v-if="isFirefox" class="text-sm text-center">
          Sur Firefox vous avez besoin de cet
          <NuxtLink to="https://addons.mozilla.org/fr/firefox/addon/pwas-for-firefox/" class="text-my-primary">
            addon
          </NuxtLink> et de suivre les instructions.
        </p>
        <p v-if="isIOS">Sur IOS, il faut cliquer sur l'icône partager et choisir "Sur l'écran d'accueil".</p>
      </template>
    </UPopover>
  </div>
</template>

<script lang="ts" setup>
// CONST
const nuxtApp = useNuxtApp()
const { getPlatform } = usePlatform()

// COMPUTED
const btnProperty = computed((): {
  icon: string;
  label: string;
  color: string;
  disabled: boolean;
} => {
  if (nuxtApp.$pwa?.isPWAInstalled) {
    return {
      icon: 'i-heroicons-check-circle-16-solid',
      label: 'Déjà installée !',
      color: 'green',
      disabled: true,
    }
  }
  return {
    icon: 'i-heroicons-inbox-arrow-down-20-solid',
    label: 'Installe moi !',
    color: 'my-primary',
    disabled: false,
  }
})
const isFirefox = computed((): boolean => {
  return getPlatform().firefox
})
const isIOS = computed((): boolean => {
  return getPlatform().ios
})
const labelPopover = computed((): string => {
  if (isFirefox.value) {
    return 'Firefox détecté'
  }
  if (isIOS.value) {
    return 'IOS détecté'
  }
  return ''
})


// FUNCTIONS
function getInstallPrompt(): void {
  nuxtApp.$pwa?.install();
};
</script>

<style lang="sass" scoped>
</style>
