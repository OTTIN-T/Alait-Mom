<template>
  <UButton class="mt-3 text-black" icon="i-simple-icons-google" block label="Google" :disabled="props.disabled"
    @click="signInWithOAuth" :loading="isLoading" />
</template>

<script lang="ts" setup>
interface BtnGoogleAuthPropOptions {
  disabled?: boolean;
}

// CONST
const props = withDefaults(defineProps<BtnGoogleAuthPropOptions>(), {
  disabled: false
})
const { auth } = useSupabaseClient()
const toast = useToast()
const redirectTo = `${useRuntimeConfig().public.NUXT_PUBLIC_FRONTEND_URL}/confirm`
const isLoading = ref<boolean>(false)

// FUNCTIONS
async function signInWithOAuth(): Promise<void> {
  isLoading.value = true
  const { error } = await auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })

  if (!error) {
    toast.add({
      id: 'auth_notification',
      title: 'Bienvenu !',
      description: 'Merci de vous être inscrit.',
      icon: 'i-heroicons-check-badge-16-solid',
      timeout: 6000,
      color: 'green',
    })
  }
  isLoading.value = false
  if (error) {
    toast.add({
      id: 'auth_notification',
      title: 'Une erreur est survenue.',
      description: error.message,
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
    throw createError({
      statusCode: error.status,
      statusMessage: error.message
    })
  }
}
</script>

<style lang="sass" scoped>
</style>
