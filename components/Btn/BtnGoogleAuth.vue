<template>
  <UButton class="mt-3 dark:text-white" icon="i-simple-icons-google" block label="Google" :disabled="props.disabled"
    @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })" />
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
const redirectTo = `${useRuntimeConfig().public.NUXT_PUBLIC_FRONTEND_URL}/confirm`
</script>

<style lang="sass" scoped>
</style>
