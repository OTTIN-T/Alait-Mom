<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-12">
        <h1 class="text-center mb-5">Modifier votre profil</h1>
        <UForm :schema="ProfileSchema" :state="state" @submit="onSubmit" class="space-y-4 mt-5 w-56 md:w-96 mx-auto">
          <UDivider icon="i-simple-icons-maildotru" />
          <FormProfileEmail v-model:email="state.email" :is-disabled="false" />

          <UDivider icon="i-heroicons-pencil-square" />
          <FormProfileName v-model:name="state.name" :is-disabled="false" />

          <UContainer class="flex justify-between pt-10">
            <ModalCancel>
              <template #content>
                <span>
                  Êtes-vous sûr de vouloir annuler l'enregistrement de votre profile ?
                </span>
              </template>
            </ModalCancel>
            <UButton type="submit" :disabled="!hasCompletedForm" :loading="isLoading">
              Enregistrer
            </UButton>
          </UContainer>
        </UForm>

      </UContainer>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import type { Tables } from '~/models/database.types';
import { ProfileSchema, type ProfileSchemaType } from '~/models/schema/profile.schema';


// CONST
const toast = useToast()
const user = useSupabaseUser()
const client = useSupabaseClient()
const profile = ref<Tables<'profile'>>()
const isLoading = ref<boolean>(false)
const state = ref({
  name: profile.value?.user_name ?? undefined,
  email: user.value?.email ?? 'Non renseigné',
})

// COMPUTED
const hasCompletedForm = computed<boolean>(() => {
  return !!state.value.email
})

// FUNCTIONS
async function onSubmit(event: FormSubmitEvent<ProfileSchemaType>): Promise<void> {
  isLoading.value = true
  if (event.data.email !== user.value?.email) {
    const { error } = await client.auth.updateUser({ email: event.data.email })
    if (error) {
      toast.add({
        id: 'profile_update_notification',
        title: error.name ?? 'Une erreur est survenue',
        description: error.message,
        icon: 'i-heroicons-exclamation-triangle-20-solid',
        timeout: 6000,
        color: 'red',
      })
    }
    isLoading.value = false
  }

  if (event.data.name) {
    const { data, error, pending } = useFetch('/api/profile/one', {
      method: 'POST',
      body: {
        name: event.data.name,
      }
    })

    isLoading.value = pending.value
    if (!data.value?.error) {
      toast.add({
        id: 'profile_update_notification',
        title: 'Enregistrement effectué !',
        description: 'Votre profil a bien été mis à jour.',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 6000,
        color: 'green',
      })
      await navigateTo('/profile/detail')
    }

    if (error.value || data.value?.error) {
      toast.add({
        id: 'profile_update_notification',
        title: error.value?.name ?? 'Une erreur est survenue',
        description: error.value?.message ?? data.value?.error?.message,
        icon: 'i-heroicons-exclamation-triangle-20-solid',
        timeout: 6000,
        color: 'red',
      })
    }

    isLoading.value = false
  }

}

</script>
