<template>
  <ModalBase title="Authentification" :is-open="isOpen" :label="props.label" @show-dialog="showDialog">
    <template #content>
      <UForm :schema="authSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" autocomplete="email" />
        </UFormGroup>
        <div class="flex justify-between">
          <UButton class="dark:text-white" @click="showDialog" color="red">
            Fermer
          </UButton>
          <UButton :disabled="!hasCaptchatoken" type="submit" class="dark:text-white">
            Se connecter
          </UButton>
        </div>
        <UDivider label="Autre" />
        <BtnGoogleAuth />
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <NuxtTurnstile v-if="state.email" v-model="state.captchaToken" />
      </div>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import { useAuth } from "~/composables/useAuth";
import type { AuthSchemaType } from '~/models/auth.model';

interface FormAuthPropOptions {
  label?: string;
}

// CONST
const props = withDefaults(defineProps<FormAuthPropOptions>(), {
  label: 'Rejoins nous !'
})
const supabase = useSupabaseClient()
const runtimeConfig = useRuntimeConfig()
const isOpen = ref<boolean>(false)
const hasCaptchatoken = ref<boolean>(false)
const { authSchema } = useAuth()
const emailStore = useState<string>('email')
const state = reactive({
  email: undefined,
  captchaToken: undefined
})

// WATCHERS
watch(() => state.captchaToken, (value) => {
  hasCaptchatoken.value = !!value
})

// FUNCTIONS
async function onSubmit(authEvent: FormSubmitEvent<AuthSchemaType>): Promise<void> {
  emailStore.value = authEvent.data.email
  const { error } = await supabase.auth.signInWithOtp({
    email: authEvent.data.email,
    options: {
      emailRedirectTo: `${runtimeConfig.public.NUXT_PUBLIC_FRONTEND_URL}/confirm`,
      shouldCreateUser: false,
      captchaToken: authEvent.data.captchaToken,
    }
  })
  if (error) {
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
