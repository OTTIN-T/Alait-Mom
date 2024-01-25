<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-14 md:w-96">
        <h1 class="text-center mb-5">Information de votre enfant</h1>
        <SkeletonFormChildren v-if="isLoading" />
        <UForm v-if="!isLoading" :state="state" :schema="ChildrenSchema" @submit="onSubmit"
          class="space-y-4 mt-5 mx-auto">

          <UDivider icon="i-material-symbols-light-transgender-rounded" />
          <FormChildrenGender v-model:gender="state.gender" />

          <UDivider icon="i-lucide-baby" class="pt-10" />
          <FormChildrenName v-model:name="state.name" />

          <UDivider icon="i-heroicons-calendar-days-16-solid" class="pt-10" />
          <FormChildrenBirthdate v-model:birthdate="state.birthdate" />

          <UDivider icon="i-mdi-human-male-height" class="pt-10" />
          <FormChildrenSize v-model:size="state.size" />

          <UDivider icon="i-lucide-weight" class="pt-10" />
          <FormChildrenWeight v-model:weight="state.weight" />

          <UDivider icon="i-heroicons-pencil-square" class="pt-10" />
          <FormChildrenDescription v-model:description="state.description" />

          <UContainer class="flex justify-between pt-10">
            <ModalCancel>
              <template #content>
                <span>
                  Êtes-vous sûr de vouloir annuler l'enregistrement de votre enfant ?
                </span>
              </template>
            </ModalCancel>
            <UButton type="submit" :loading="isLoading" :disabled="!state.name">Enregistrer</UButton>
          </UContainer>
        </UForm>

        <UDivider icon="i-heroicons-exclamation-triangle-20-solid" class="mt-32" />
        <UBadge variant="outline" color="red" :ui="{
          variant: {
            outline: 'text-black dark:text-white'
          }
        }" class="flex justify-center my-5">Zone de danger</UBadge>

        <ModalDelete title="Suppression" label="Supprimer cet enfant" class="flex flex-col items-center"
          @delete="onDelete" :is-loading="isDeleting">
          <template #content>
            <p>
              Êtes-vous sûr de vouloir supprimer votre enfant ? Toute suppression est <strong>définitive</strong> ainsi
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
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { ChildrenGender } from '~/models/children.model';
import { ChildrenSchema, type ChildrenSchemaType } from '~/models/schema/children.schema';

// CONST
const { formartSize, formatWeight } = useChildren()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const isLoading = ref<boolean>(true)
const isSending = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const state = ref({
  name: '',
  gender: ChildrenGender.M,
  birthdate: '',
  size: 0,
  weight: 0,
  description: '',
})

// FUNCTIONS
async function getChildren(): Promise<void> {
  const { data, error, pending } = await useFetch('/api/children/one', {
    method: 'GET',
    query: {
      id: (route.params as { childrenId: number }).childrenId,
    },
  })
  isLoading.value = pending.value
  if (data.value?.children) {
    state.value = {
      name: data.value.children.name,
      gender: data.value.children.gender,
      birthdate: data.value.children.birthdate ?? '',
      size: data.value.children.size ?? 0,
      weight: data.value.children.weight ?? 0,
      description: data.value.children.description ?? '',
    }
  }
  if (error.value || data.value?.error) {
    toast.add({
      id: 'children_list_notification',
      title: error.value?.name ?? 'Une erreur est survenue',
      description: error.value?.message ?? String(data.value?.error),
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }
  isLoading.value = false
}

async function onSubmit(formEvent: FormSubmitEvent<ChildrenSchemaType>): Promise<void> {
  const { data, error, pending } = await useFetch('/api/children/one', {
    method: 'PUT',
    body: {
      name: formEvent.data.name,
      gender: formEvent.data.gender,
      birthdate: formEvent.data.birthdate?.length ? formEvent.data.birthdate : undefined,
      size: !!formEvent.data.size ? formartSize(formEvent.data.size) : undefined,
      weight: !!formEvent.data.weight ? formatWeight(formEvent.data.weight) : undefined,
      description: formEvent.data.description?.length ? formEvent.data.description : undefined
    },
    query: {
      id: (route.params as { childrenId: number }).childrenId,
    },
  })

  isSending.value = pending.value
  if (!error.value) {
    toast.add({
      id: 'children_notification',
      title: 'Enregistrement effectué !',
      description: `${formEvent.data.name} a bien été enregistré.`,
      icon: 'i-heroicons-check-circle-solid',
      timeout: 6000,
      color: 'green',
    })
    router.back()
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
  isSending.value = false
}

async function onDelete(): Promise<void> {
  const { data, error, pending } = await useFetch('/api/children/one', {
    method: 'DELETE',
    query: {
      id: (route.params as { childrenId: number }).childrenId,
    }
  })

  isDeleting.value = pending.value
  if (!data.value?.error && !error.value) {
    toast.add({
      id: 'children_deletion_notification',
      title: 'Suppression effectué !',
      description: `L'enfant ${state.value.name} a bien été supprimé.`,
      icon: 'i-heroicons-check-circle-solid',
      timeout: 6000,
      color: 'green',
    })
    router.back()
  }

  if (error.value || data.value?.error) {
    toast.add({
      id: 'children_deletion_notification',
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
  await nextTick()
  await getChildren()
})

// PROVIDE
provide('modal-color-btn', 'red')
</script>
