<template>
  <NuxtLayout name="default">
    <template #body>
      <section v-if="!haveParams" class="h-dvh flex flex-col justify-center">
        <h1 class="text-xl text-center">Redirection en cours...</h1>
        <USkeleton class="h-4 w-1/2 mx-auto mt-3" />
      </section>
      <section v-if="haveParams" class="h-dvh flex flex-col justify-center mt-10">
        <h1 class="text-xl text-center mb-5 mt-10">Verification et activation de votre compte</h1>
        <h2 class="text-center">
          {{ emailStore ? `Rentrez le code reçu sur l'email ${emailStore}` : 'Rentrez le code reçu par email' }}
        </h2>
        <UContainer class="border rounded-2xl flex flex-col lg:px-4 mt-6 ">
          <UForm :schema="tokenOTPSchema" :state="stateTokenList" @submit="onSubmit">
            <div class="flex justify-center">
              <UInput v-for="(_, index) in  stateTokenList " :key="index" type="number" :autofocus="index === 0"
                @input="focusInput(index)" min="0" max="9" v-model.trim.number="stateTokenList[index]"
                :class="`input-${index}`" :ui="{
                  base: 'text-center focus:outline-my-primary text-xl md:text-2xl lg:text-3xl', size: 'md:text-3xl text-sm'
                }" variant="outline" color="my-accent" padded
                class="text-black md:text-xl md:rounded-xl rounded-sm lg:mx-3 md:mx-5 mx-1 my-5" required>
              </UInput>
            </div>

            <UButton :color="hasError ? 'red' : 'green'" variant="solid"
              :icon="hasError ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-shield-check-20-solid'"
              :padded="false" :loading="isLoading" type="submit" label="Activez votre compte"
              class="w-auto mx-auto p-5 my-5 text-black flex" :disabled="!hasCompletedToken" />
          </UForm>
        </UContainer>

        <UContainer class="flex flex-col lg:px-4 mt-16">
          <UDivider icon="i-heroicons-bug-ant" />
          <h2 class="mt-5">Une erreur est survenue ?</h2>
          <UForm :schema="authSchema.pick({ email: true })" :state="stateResend" @submit="resendEmail">
            <UFormGroup label="Saisissez votre email" name="email" class="mt-5" :ui="{
              label: { wrapper: 'justify-center' }
            }
              ">
              <UInput v-model.trim="stateResend.email" required type="email" autocomplete
                :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                  <UButton v-show="!!stateResend.email" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                    :padded="false" @click="onClear" />
                </template>
              </UInput>
            </UFormGroup>
            <UButton label="Renvoyer un email" color="my-primary" class="text-black w-auto mx-auto p-2 my-2 flex"
              icon="i-heroicons-envelope-solid" :loading="isSendingEmail" variant="solid" type="submit"
              :disabled="!stateResend.email" />
          </UForm>
        </UContainer>
      </section>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import type { RouteParams } from 'vue-router';
import type { AuthSchemaType, TokenSchemaType } from '~/models/auth.model';

// CONST
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const emailStore = useState<string>('email')
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const toast = useToast()
const { authSchema, tokenOTPSchema } = useAuth()
const { createProfile } = useProfile()
const isLoading = ref<boolean>(false)
const isSendingEmail = ref<boolean>(false)
const hasError = ref<boolean>(false)
const haveParams = ref<boolean>(false)
const stateTokenList = ref<(number | undefined)[]>([undefined, undefined, undefined, undefined, undefined, undefined])
const stateResend = ref({ email: emailStore.value })


// WATCHERS
watch(() => route.params, (value: RouteParams) => {
  haveParams.value = Boolean(value.otp.length)
  if (!haveParams.value) {
    goToDashboard()
  }
},
  {
    immediate: true
  }
)


watch(stateTokenList, (value) => {
  autoCompleteInput(value)
}, {
  immediate: true,
  deep: true
})

// COMPUTED
const hasCompletedToken = computed<boolean>((): boolean => {
  return stateTokenList.value.every((token) => token !== undefined)
})

// FUNCTIONS
async function onSubmit(tokenEvent: FormSubmitEvent<TokenSchemaType>): Promise<void> {
  isLoading.value = true
  const {
    data,
    error,
  } = await auth.verifyOtp({
    email: emailStore.value,
    token: tokenEvent.data.join(''),
    type: 'email',
  })

  isLoading.value = false
  if (data) {
    await goToDashboard()
  }
  if (error) {
    hasError.value = true
    throw createError({
      statusCode: error.status,
      statusMessage: error.message
    })
  }
}

async function goToDashboard(): Promise<void> {
  try {
    if (user.value) {
      await createProfile()
      await navigateTo('/dashboard/home')

      toast.add({
        id: 'auth_notification',
        title: 'Profil créé !',
        description: 'Vous allez être redirigé.',
        icon: 'i-heroicons-check-badge-20-solid',
        timeout: 6000,
        color: 'green',
      })
    }
  } catch (error) {
    toast.add({
      id: 'got_to_error_notification',
      title: 'Une erreur est survenue.',
      description: 'Merci de réessayer plus tard.',
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }
}

async function resendEmail(authEvent: FormSubmitEvent<Pick<AuthSchemaType, 'email'>>): Promise<void> {
  isSendingEmail.value = true
  const { error } = await auth.resend({
    type: 'signup',
    email: authEvent.data.email,
    options: {
      emailRedirectTo: `${runtimeConfig.public.NUXT_PUBLIC_FRONTEND_URL}/confirm`,
    }
  })
  if (!error) {
    toast.add({
      id: 'auth_notification',
      title: 'Email envoyé !',
      description: 'Merci de vérifier votre boite mail pour vous connecter.',
      icon: 'i-heroicons-envelope-solid',
      timeout: 60000,
      color: 'green',
    })
  }
  isSendingEmail.value = false
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


function focusInput(index: number | undefined): void {
  if (index !== undefined && index < 5) {
    const nextInput = document.querySelector(`.input-${index + 1} > input`) as HTMLInputElement | null;
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function autoCompleteInput(value: (number | undefined)[]): void {
  if (value[0] && value[0] > 1 && value[1] === undefined) {
    Number(stateTokenList.value[0]).toString().split('').forEach((number, index) => {
      stateTokenList.value[index] = Number(number)
      focusInput(index)
    })
  }
}

function onClear(): void {
  stateResend.value.email = ''
}
</script>
