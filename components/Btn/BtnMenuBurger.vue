<template>
  <UPopover overlay :popper="{ placement: 'bottom-start', arrow: true }" :open="isOpen">
    <UButton color="white" aria-label="menu button" trailing-icon="i-heroicons-bars-3-16-solid"
      @click="isOpen = !isOpen" />
    <template #panel>
      <UVerticalNavigation :links="links" class="p-4" :ui="{ active: 'text-my-primary-700 dark:text-my-primary' }">
        <template #avatar="{ link }">
          <UAvatar v-if="link.avatar" v-bind="link.avatar" size="xs" loading="lazy" />
        </template>
        <template #icon="{ link }">
          <UIcon v-if="link.icon" :name="link.icon" class="text-base w-6" />
        </template>
        <template #default="{ link }">
          <span class="hover:text-my-secondary relative" @click="isOpen = !isOpen">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
import type { VerticalNavigationLink } from '@nuxt/ui/dist/runtime/types';

// CONST
const user = useSupabaseUser();
const isOpen = ref(false)
const avatarCookie = useCookie<string>('avatar_url', { watch: true, secure: true, sameSite: true, encode: (value) => btoa(value) })


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
  {
    label: 'Allaitements',
    icon: 'i-fluent-emoji-high-contrast-breast-feeding',
    to: '/breastfeeding/list'
  }
])

// WATCH
watch(() => getAvatar.value, (avatar) => {
  avatarCookie.value = avatar
})
</script>

<style lang="sass" scoped>
</style>
