<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="pt-24 flex justify-around">
        <UButton icon="i-heroicons-user-circle" class="mx-auto" label="Modifier" to="/profile/edit" color="my-primary" />
      </UContainer>
      <UContainer as="section" class="py-14 w-56 md:w-96">
        <h1 class="text-center mb-5">Votre profil</h1>
        <UDivider icon="i-simple-icons-maildotru" />
        <FormProfileEmail v-model:email="userEmail" :is-disabled="true" />

        <UDivider icon="i-heroicons-pencil-square" />
        <FormProfileName v-model:name="userName" :is-disabled="true" />

        <UDivider icon="i-heroicons-chart-pie-16-solid" />
        <UContainer class="flex flex-col items-center my-5 px-0">
          <span>Dernière modification</span>
          <UBadge variant="outline" color="orange" :ui="{
            variant: {
              outline: 'text-black dark:text-white'
            }
          }">{{ useDateFormat(user?.updated_at, 'DD-MM-YYYY HH:mm:ss').value }}
          </UBadge>
        </UContainer>
        <UContainer class="flex flex-col items-center mb-5">
          <span>Dernière connexion</span>
          <UBadge variant="outline" color="green" :ui="{
            variant: {
              outline: 'text-black dark:text-white'
            }
          }">{{ useDateFormat(user?.last_sign_in_at, 'DD-MM-YYYY HH:mm:ss').value }}
          </UBadge>
        </UContainer>

        <UDivider icon="i-heroicons-exclamation-triangle-20-solid" class="mt-32" />
        <UBadge variant="outline" color="red" :ui="{
          variant: {
            outline: 'text-black dark:text-white'
          }
        }" class="flex justify-center my-5">Zone de danger</UBadge>

        <ModalDelete title="Supprimer mon compte" label="Supprimer mon compte" class="flex flex-col items-center"
          @delete="onDelete" :is-loading="isDeleting">
          <template #content>
            <p>
              Êtes-vous sûr de vouloir supprimer votre compte ? Toute suppression est <strong>définitive</strong> ainsi
              que <strong>l'ensemble</strong> des données.
            </p>
          </template>
        </ModalDelete>
      </UContainer>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
import type { Tables } from '~/models/database.types';

// CONST
const toast = useToast()
const user = useSupabaseUser()
const client = useSupabaseClient()
const profile = ref<Tables<'profile'>>()
const isLoading = ref<boolean>(false)
const isDeleting = ref<boolean>(false)

// COMPUTED
const userName = computed<string>(() => {
  return profile.value?.user_name ?? 'Non renseigné'
})
const userEmail = computed<string>(() => {
  return user.value?.email ?? 'Non renseigné'
})

// FUNCTION
async function getProfile(): Promise<void> {
  const { data, error, pending } = await useFetch('/api/profile/one', {
    method: 'GET',
  })
  isLoading.value = pending.value
  if (data.value?.profile) {
    profile.value = data.value.profile
  }
  if (error.value || data.value?.error) {
    toast.add({
      id: 'children_notification',
      title: error.value?.name ?? 'Une erreur est survenue',
      description: error.value?.message ?? String(data.value?.error),
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }
}

async function onDelete(): Promise<void> {
  const { data, error, pending } = await useFetch('/api/profile/one-delete', {
    method: 'POST',
    body: {
      id: user.value?.id,
    }
  })

  isDeleting.value = pending.value
  if (!data.value?.error && !error.value) {
    toast.add({
      id: 'profile_deletion_notification',
      title: 'Suppression effectué !',
      description: 'Votre compte a bien été supprimé.',
      icon: 'i-heroicons-check-circle-solid',
      timeout: 6000,
      color: 'green',
    })
    await client.auth.signOut()
    await navigateTo('/')
  }

  if (error.value || data.value?.error) {
    toast.add({
      id: 'profile_deletion_notification',
      title: error.value?.name ?? 'Une erreur est survenue',
      description: error.value?.message ?? data.value?.error?.message,
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }

  isDeleting.value = false
}

// LIFE CYCLE
onMounted(async () => {
  await getProfile()
})

// PROVIDE
provide('modal-color-btn', 'red')
</script>
