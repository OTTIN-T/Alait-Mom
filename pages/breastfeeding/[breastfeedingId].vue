<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-12 md:w-96 ">
        <h1 class="text-center mt-5">Modifier votre allaitement</h1>
        <UForm :schema="BreastfeedingSchema" :state="state" class="space-y-4 mt-5 mx-auto" @submit="onSubmit">
          <ClientOnly>
            <template #fallback>
              <SkeletonFormBreastfeeding />
            </template>
            <UDivider icon="i-fluent-emoji-high-contrast-breast-feeding" />
            <FormBreastfeedingBreast v-model:breast="state.breast" />

            <UDivider icon="i-heroicons-clock" class="pt-10" />
            <FormBreastfeedingDuration v-model:duration="state.duration" />

            <UDivider icon="i-lucide-baby" class="pt-10" />
            <FormBreastfeedingChildren :is-loading="isLoadingChildrenList" :children-list="childrenList"
              v-model:children="state.children" />

            <UDivider icon="i-heroicons-pencil-square" class="pt-10" />
            <FormBreastfeedingDescription v-model:description="state.description" />

            <UContainer class="flex justify-between pt-10">
              <ModalCancel>
                <template #content>
                  <span>
                    Êtes-vous sûr de vouloir annuler l'enregistrement de votre allaitement ?
                  </span>
                </template>
              </ModalCancel>
              <UButton type="submit" :disabled="!hasCompletedForm">
                Enregistrer
              </UButton>
            </UContainer>
          </ClientOnly>
        </UForm>

        <UDivider icon="i-heroicons-exclamation-triangle-20-solid" class="mt-32" />
        <UBadge variant="outline" color="red" :ui="{
          variant: {
            outline: 'text-black dark:text-white'
          }
        }" class="flex justify-center my-5">Zone de danger</UBadge>

        <ModalDelete title="Suppression" label="Supprimer cet allaitement" class="flex flex-col items-center"
          @delete="onDelete" :is-loading="isDeleting">
          <template #content>
            <p>
              Êtes-vous sûr de vouloir supprimer votre allaitement ? Toute suppression est <strong>définitive</strong>
              ainsi
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
import type { FormSubmitEvent } from '#ui/types';
import { Breast } from '~/models/breastfeeding.model';
import type { ChildrenSelectForm } from '~/models/children.model';
import { BreastfeedingSchema, type BreastfeedingSchemaType } from '~/models/schema/breastfeeding.schema';

// CONST
const toast = useToast()
const route = useRoute()
const router = useRouter()
const isLoadingChildrenList = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const childrenList = ref<(ChildrenSelectForm)[]>([])
const state = ref({
  breast: Breast.LEFT,
  duration: '00:00',
  description: undefined,
  children: childrenList.value[0],
})

// COMPUTED
const hasCompletedForm = computed((): boolean => {
  return state.value.breast !== undefined && state.value.duration !== undefined
})

// FUNCTIONS
async function getBreastfeeding(): Promise<void> {
  const { data, pending } = await useFetch('/api/breastfeeding/one', {
    query: {
      id: (route.params as { breastfeedingId: number }).breastfeedingId,
    },
  })
  isLoading.value = pending.value
  if (data.value?.breastfeeding) {
    state.value = {
      breast: data.value.breastfeeding.breast,
      duration: data.value.breastfeeding.duration,
      description: data.value.breastfeeding.description ?? '',
      children: data.value.breastfeeding.children ? data.value.breastfeeding.children : childrenList.value[0],
    }
  }
  isLoading.value = false
}

async function onSubmit(formEvent: FormSubmitEvent<BreastfeedingSchemaType>) {
  const { data, error, pending } = await useFetch('/api/breastfeeding/one', {
    method: 'PUT',
    body: {
      breast: formEvent.data.breast,
      duration: formEvent.data.duration,
      description: formEvent.data.description ?? undefined,
      children_id: formEvent.data.children?.id === 0 ? undefined : formEvent.data.children?.id,
    },
    query: {
      id: (route.params as { breastfeedingId: number }).breastfeedingId,
    },
  })
  isLoading.value = pending.value
  if (!error.value) {
    toast.add({
      id: 'breastfeeding_notification',
      title: 'Enregistrement effectué !',
      description: 'Votre allaitement a bien été enregistré.',
      icon: 'i-heroicons-check-circle-solid',
      timeout: 6000,
      color: 'green',
    })
    router.back()
  }

  if (error.value || data.value?.error) {
    toast.add({
      id: 'breastfeeding_notification',
      title: error.value?.name ?? 'Une erreur est survenue',
      description: error.value?.message ?? String(data.value?.error),
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }

  isLoading.value = false
}


async function initChildrenList() {
  const { data, pending } = await useFetch('/api/children/list')
  isLoadingChildrenList.value = pending.value
  if (data.value && data.value.childrenList?.length) {
    childrenList.value = data.value.childrenList
  }
  if (!data.value?.childrenList?.length) {
    childrenList.value = [{ name: 'Pas d\'enfant enregistré', id: 0 }]
  }
}

async function onDelete(): Promise<void> {
  const { data, error, pending } = await useFetch('/api/breastfeeding/one', {
    method: 'DELETE',
    query: {
      id: (route.params as { breastfeedingId: number }).breastfeedingId,
    }
  })

  isDeleting.value = pending.value
  if (!data.value?.error && !error.value) {
    toast.add({
      id: 'breastfeeding_deletion_notification',
      title: 'Suppression effectué !',
      description: `Votre allaitement a bien été supprimé.`,
      icon: 'i-heroicons-check-circle-solid',
      timeout: 6000,
      color: 'green',
    })
    router.back()
  }

  if (error.value || data.value?.error) {
    toast.add({
      id: 'breastfeeding_deletion_notification',
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
  await initChildrenList()
  await getBreastfeeding()
})


// PROVIDE
provide('modal-color-btn', 'red')
</script>
