<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-12">
        <h1 class="text-center mt-5">Enregistrez votre allaitement</h1>
        <UForm :schema="BreastfeedingSchema" :state="state" class="space-y-4 mt-5 w-56 md:w-96 mx-auto"
          @submit="onSubmit">
          <ClientOnly>
            <template #fallback>
              <SkeletonBreastfeeding />
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
              <ModalCancelBreastfeeding />
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
import { Breast, type BreastfeedingSchemaType } from '~/models/breastfeeding.model';
import type { Tables } from '~/models/database.types';
import { BreastfeedingSchema } from '~/models/schema/breastfeeding.schema';

// CONST
const toast = useToast()
const { createBreastfeeding } = useBreastfeeding()
const { getChildrenList } = useChildren()
const isLoadingChildrenList = ref<boolean>(false)
const childrenList = ref<(Tables<'children'>)[]>([{ name: 'Pas d\'enfant enregistré', id: 0, created_at: '', profile_id: '' }])
const isSending = ref<boolean>(false)
const state = reactive({
  breast: Breast.LEFT,
  duration: '00:00',
  description: undefined,
  children: childrenList.value[0],
})

// COMPUTED
const hasCompletedForm = computed((): boolean => {
  return state.breast !== undefined && state.duration !== undefined
})

// FUNCTIONS
async function onSubmit(formEvent: FormSubmitEvent<BreastfeedingSchemaType>) {
  isSending.value = true
  const result = await createBreastfeeding({
    breast: formEvent.data.breast,
    duration: formEvent.data.duration,
    description: formEvent.data.description ?? undefined,
    children_id: state.children.id === 0 ? undefined : formEvent.data.children?.id,
  })
  isSending.value = false
  if (result) {
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

  if (!result) {
    toast.add({
      id: 'breastfeeding_notification',
      title: 'Une erreur est survenue.',
      description: 'Merci de réessayer ultérieurement.',
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }

}

async function initChildrenList() {
  isLoadingChildrenList.value = true
  const result = await getChildrenList()
  if (result) {
    childrenList.value = result
  }
  isLoadingChildrenList.value = false
}

// LIFE CYCLE
onMounted(async () => {
  await initChildrenList()
})

// PROVIDE
provide('modal-color-btn', 'red')
</script>
