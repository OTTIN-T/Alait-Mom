<template>
  <NuxtLayout name="default">
    <template #body>
      <section v-if="!haveParams" class="h-dvh flex flex-col justify-center">
        <h1 class="text-xl text-center">Redirection en cours...</h1>
        <USkeleton class="h-4 w-1/2 mx-auto mt-3" />
      </section>
      <section v-if="haveParams" class="h-dvh flex flex-col justify-center">
        <h1 class="text-xl text-center mb-5">Verification et activation de votre compte</h1>
        <UContainer class="border rounded-2xl flex flex-col lg:px-4 mt-6">
          <div class="flex">
            <UContainer v-for=" tokenSplitted  in  tokenSplittedList " :key="tokenSplitted"
              class="text-center md:text-xl bg-my-accent md:rounded-xl rounded-lg lg:p-10 md:p-6 p-3 lg:mx-5 md:mx-2 mx-1 my-10">
              {{ tokenSplitted }}
            </UContainer>
          </div>
          <UButton :color="hasError ? 'red' : 'green'" variant="solid"
            :icon="hasError ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-arrow-right-circle-16-solid'"
            :padded="false" :loading="isLoading" @click="onSubmit" type="submit" label="Activez votre compte"
            class="w-1/4 mx-auto p-5 mb-10" />
        </UContainer>
      </section>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
import type { RouteParams } from 'vue-router';

// CONST
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const emailStore = useState<string>('email')
const route = useRoute()
const token = ref<string>('')
const isLoading = ref<boolean>(false)
const hasError = ref<boolean>(false)
const haveParams = ref<boolean>(false)

// WATCHERS
watch(() => route.params, (value: RouteParams) => {
  haveParams.value = Boolean(value.token.length && value.email.length)
  if (haveParams) {
    token.value = String(value.token)
    emailStore.value = String(value.email)
  }

  if (!haveParams) {
    goToDashboard()
  }
},
  {
    immediate: true
  }
)

// COMPUTED
const tokenSplittedList = computed<string[]>(() => {
  return token.value.split('')
})

// FUNCTIONS
async function onSubmit(): Promise<void> {
  isLoading.value = true
  const {
    data,
    error,
  } = await supabase.auth.verifyOtp({
    email: emailStore.value,
    token: token.value,
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
  if (user.value) {
    await navigateTo('/dashboard/home')
  }
}
</script>
