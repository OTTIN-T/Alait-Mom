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
const { beforeEach } = useRouter();
const toast = useToast()
const { createBreastfeeding } = useBreastfeeding()
const { getChildrenList } = useChildren()
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
  isSending.value = true
  const result = await createBreastfeeding({
    breast: formEvent.data.breast,
    duration: formEvent.data.duration,
    description: formEvent.data.description ?? undefined,
    children_id: state.value.children.id === 0 ? undefined : formEvent.data.children?.id,
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
  if (!result) {
    childrenList.value = [{ name: 'Pas d\'enfant enregistré', id: 0 }]
  }
  isLoadingChildrenList.value = false
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
beforeEach(async (_to, _from, next) => {
  await initChildrenList()
  initForm()
  next()
})

// PROVIDE
provide('modal-color-btn', 'red')
</script>
