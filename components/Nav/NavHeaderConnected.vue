<template>
  <header>
    <UContainer class="md:px-4 px-2">
      <nav class="flex justify-between items-center mt-2">
        <UPopover overlay :popper="{ placement: 'bottom-start', arrow: true }">
          <UButton color="white" aria-label="menu button" trailing-icon="i-heroicons-bars-3-16-solid" />
          <template #panel>
            <UVerticalNavigation :links="links" class="p-4" :ui="{ active: 'text-my-primary-700 dark:text-my-primary' }">
              <template #avatar="{ link }">
                <UAvatar v-if="link.avatar" v-bind="link.avatar" size="xs" loading="lazy" />
              </template>
              <template #icon="{ link }">
                <UIcon v-if="link.icon" :name="link.icon" class="text-base w-6" />
              </template>
              <template #default="{ link }">
                <span class="hover:text-my-secondary relative">{{ link.label }}</span>
              </template>
            </UVerticalNavigation>
          </template>
        </UPopover>
        <ULink to="/dashboard/home" active-class="text-my-primary-700 dark:text-my-primary"
          class="font-bold mr-1 flex items-center"
          inactive-class="text-my-gray-500 dark:text-my-gray-400 hover:text-my-secondary">
          <NuxtImg src="/logo-no-bg.svg" alt="Logo alait'mom" width="40" height="40" class="mr-1" />
        </ULink>
        <ToggleTheme class="items-end ml-2" />
      </nav>
    </UContainer>
  </header>
</template>

<script lang="ts" setup>
import type { VerticalNavigationLink } from '@nuxt/ui/dist/runtime/types';

// CONST
const user = useSupabaseUser();

// COMPUTED
const getAvatar = computed((): string => {
  if (user.value?.user_metadata.avatar_url) {
    return user.value?.user_metadata.avatar_url;
  }
  return 'https://api.dicebear.com/7.x/thumbs/svg?seed=Jack';
})
const links = computed((): VerticalNavigationLink[] => [
  {
    label: 'Accueil',
    icon: 'i-heroicons-home',
    to: '/dashboard/home'
  },
  {
    label: 'Profil',
    avatar: {
      src: getAvatar.value
    },
    to: '/dashboard/profile'
  },
])
</script>

<style lang="sass" scoped>
</style>
