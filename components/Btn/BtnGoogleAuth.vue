<template>
  <UButton class="mt-3 dark:text-white" icon="i-simple-icons-google" block label="Google"
    @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })" />
</template>

<script lang="ts" setup>
const { auth } = useSupabaseClient()
const redirectTo = `${useRuntimeConfig().public.NUXT_PUBLIC_FRONTEND_URL}/confirm`
</script>

<style lang="sass" scoped>
</style>
