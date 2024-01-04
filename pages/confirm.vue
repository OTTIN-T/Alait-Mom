<template>
  <NuxtLayout name="default">
    <template #body>
      <UContainer class="h-screen flex flex-col justify-center">
        <h1 class="text-xl">Verification de votre compte</h1>
        <div>Merci de vérifier l'email envoyé sur <strong>{{ emailStore }}</strong> et de renseigner le code reçu
          ci-dessous :</div>
        <UFormGroup label="Code de vérification" required class="mt-8" @submit="onSubmit"
          :error="hasError && 'Une erreur est survenue, merci de vérifier votre code.'">
          <template #default="{ error }">
            <UInput :loading="isLoading" placeholder="123465798"
              :icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-check-circle'" autocomplete="off"
              :ui="{ icon: { trailing: { pointer: '' } } }" autofocus>
              <template #trailing>
                <UButton :color="error ? 'red' : 'green'" variant="link"
                  :icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-arrow-right-circle-16-solid'"
                  :padded="false" type="submit" />
              </template>
            </UInput>
          </template>
          <template #error="{ error }">
            <div class="flex flex-col" v-if="error">
              <span>
                {{ error }}
              </span>
              <span class="text-sm">Si l'erreur persiste merci de contacter le <a href="mailto:ottin.timothe@gmail.com"
                  class="font-bold">support</a></span>
            </div>
          </template>
        </UFormGroup>
      </UContainer>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
// CONST
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const emailStore = useState<string>('email')
const token = ref<string>('')
const isLoading = ref<boolean>(false)
const hasError = ref<boolean>(false)

// SHORTCUTS
defineShortcuts({
  enter: {
    usingInput: true,
    handler: async () => {
      await onSubmit()
    }
  }
})

// FUNCTIONS
async function onSubmit(): Promise<void> {
  isLoading.value = true
  console.log('emailStore.value: ', emailStore.value);
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: emailStore.value,
    token: token.value,
    type: 'email',
    options: {
      redirectTo: `${useRuntimeConfig().public.NUXT_PUBLIC_FRONTEND_URL}/dashboard/home`,
    },
  })

  isLoading.value = false
  if (error) {
    hasError.value = true
    throw createError({
      statusCode: error.status,
      statusMessage: error.message
    })
  }
}

async function connexionFromProvider(): Promise<void> {
  if (user.value) {
    await navigateTo('/dashboard/home')
  }
}


// LIFECYCLE
onMounted(async () => {
  await connexionFromProvider()
})
</script>
