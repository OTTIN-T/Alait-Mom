<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-12">
        <h1 class="text-center mt-5">Enregistrez votre allaitement</h1>
        <UForm :schema="BreastfeedingSchema" :state="state" class="space-y-4 mt-5 w-56 md:w-96 mx-auto"
          @submit="onSubmit">
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
              <UButton type="submit" class="text-black" :disabled="!hasCompletedForm">
                Enregistrer
              </UButton>
            </UContainer>
          </ClientOnly>
        </UForm>
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
const isLoadingChildrenList = ref<boolean>(false)
const childrenList = ref<(ChildrenSelectForm)[]>([])
const isSending = ref<boolean>(false)
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
async function onSubmit(formEvent: FormSubmitEvent<BreastfeedingSchemaType>) {
  const { data, error, pending } = await useFetch('/api/breastfeeding/one', {
    method: 'POST',
    body: {
      breast: formEvent.data.breast,
      duration: formEvent.data.duration,
      description: formEvent.data.description ?? undefined,
      children_id: formEvent.data.children?.id === 0 ? undefined : formEvent.data.children?.id,
    }
  })
  isSending.value = pending.value
  if (data.value?.data) {
    toast.add({
      id: 'breastfeeding_notification',
      title: 'Enregistrement effectué !',
      description: 'Votre allaitement a bien été enregistré.',
      icon: 'i-heroicons-check-circle-solid',
      timeout: 6000,
      color: 'green',
    })
    await navigateTo('/dashboard/home')
  }

  if (error.value || data.value?.error) {
    toast.add({
      id: 'breastfeeding_notification',
      title: error.value?.name ?? 'Une erreur est survenue',
      description: error.value?.message ?? data.value?.error?.message,
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }

}


async function initChildrenList() {
  const { data, pending } = await useFetch('/api/children/list')
  isLoadingChildrenList.value = pending.value
  if (data.value && data.value.childrenList?.length) {
    childrenList.value = data.value.childrenList
  }
  if (!data.value) {
    childrenList.value = [{ name: 'Pas d\'enfant enregistré', id: 0 }]
  }
}

function initForm(): void {
  state.value = {
    breast: Breast.LEFT,
    duration: '00:00',
    description: undefined,
    children: childrenList.value[0],
  }
}

// LIFE CYCLE
onMounted(async () => {
  await nextTick()
  await initChildrenList()
  initForm()
})


// PROVIDE
provide('modal-color-btn', 'red')
</script>
