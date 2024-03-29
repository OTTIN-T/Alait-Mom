<template>
  <ModalBase title="Authentification" :is-open="isOpen" :label="props.label" @show-dialog="showDialog">
    <template #content>
      <h3 class="mb-3">Inscrit toi ou connecte toi avec simplement ton email</h3>
      <UForm :schema="AuthSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model.trim="state.email" autocomplete="email" />
        </UFormGroup>
        <div class="flex justify-between">
          <UButton @click="showDialog" color="red">
            Fermer
          </UButton>
          <UButton :loading="isLoading" :disabled="!hasCaptchaToken" type="submit">
            Se connecter
          </UButton>
        </div>
        <UDivider label="Autre" />
        <BtnGoogleAuth :disabled="!hasCaptchaToken" class="w-1/3 mx-auto sm:w-1/4" />
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <NuxtTurnstile v-model="state.captchaToken" />
      </div>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import type { NavigationFailure, RouteLocationRaw } from 'vue-router/auto';
import { AuthSchema, type AuthSchemaType } from '~/models/schema/auth.schema';
import confetti from 'canvas-confetti';

interface FormAuthPropOptions {
  label?: string;
}

// CONST
const props = withDefaults(defineProps<FormAuthPropOptions>(), {
  label: 'Rejoins nous !'
})
const route = useRoute()
const toast = useToast()
const { auth } = useSupabaseClient()
const runtimeConfig = useRuntimeConfig()
const emailCookie = useCookie<string>('email', { watch: true, secure: true, sameSite: true, encode: (value) => btoa(value) })
const isOpen = ref<boolean>(false)
const hasCaptchaToken = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const state = reactive({
  email: undefined,
  captchaToken: undefined
})

// WATCHERS
watch(() => state.captchaToken, (value) => {
  hasCaptchaToken.value = !!value
}, {
  immediate: true
})

// FUNCTIONS
async function onSubmit(authEvent: FormSubmitEvent<AuthSchemaType>): Promise<boolean | void | RouteLocationRaw | NavigationFailure> {
  isLoading.value = true
  emailCookie.value = authEvent.data.email

  if (route.name === 'pricing') {
    useState<boolean>('isComingFromPricingPage', () => true)
  }

  const { error } = await auth.signInWithOtp({
    email: authEvent.data.email,
    options: {
      emailRedirectTo: `${runtimeConfig.public.NUXT_PUBLIC_FRONTEND_URL}/confirm`,
      captchaToken: authEvent.data.captchaToken,
    }
  })
  isLoading.value = false
  isOpen.value = false

  if (!error) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast.add({
      id: 'auth_notification',
      title: 'Email envoyé !',
      description: 'Merci de vérifier votre boite mail pour vous connecter.',
      icon: 'i-heroicons-envelope-solid',
      timeout: 60000,
      color: 'green',
    })
    await navigateTo('/confirm/otp')
  }
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

function showDialog(): void {
  isOpen.value = !isOpen.value
}
</script>

<style lang="sass" scoped>
</style>
