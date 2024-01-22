<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-14">
        <h1 class="text-center mb-5">Information de votre enfant</h1>
        <UForm :state="state" :schema="ChildrenSchema" @submit="onSubmit" class="space-y-4 mt-5 w-56 md:w-96 mx-auto">
          <ClientOnly>
            <template #fallback>
              <SkeletonFormChildren />
            </template>
            <UDivider icon="i-material-symbols-light-transgender-rounded" />
            <FormChildrenGender v-model:gender="state.gender" />

            <UDivider icon="i-lucide-baby" />
            <FormChildrenName v-model:name="state.name" />

            <UDivider icon="i-heroicons-calendar-days-16-solid" />
            <FormChildrenBirthdate v-model:birthdate="state.birthdate" />

            <UDivider icon="i-mdi-human-male-height" />
            <FormChildrenSize v-model:size="state.size" />

            <UDivider icon="i-lucide-weight" />
            <FormChildrenWeight v-model:weight="state.weight" />

            <UDivider icon="i-heroicons-pencil-square" />
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
          </ClientOnly>
        </UForm>
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
const isLoading = ref(false)
const toast = useToast()
const state = ref({
  name: '',
  gender: ChildrenGender.M,
  birthdate: '',
  size: 0,
  weight: 0,
  description: '',
})

// FUNCTIONS
async function onSubmit(formEvent: FormSubmitEvent<ChildrenSchemaType>): Promise<void> {
  const { data, error, pending } = await useFetch('/api/children/one', {
    method: 'POST',
    body: {
      name: formEvent.data.name,
      gender: formEvent.data.gender,
      birthdate: formEvent.data.birthdate?.length ? formEvent.data.birthdate : undefined,
      size: !!formEvent.data.size ? formartSize(formEvent.data.size) : undefined,
      weight: !!formEvent.data.weight ? formatWeight(formEvent.data.weight) : undefined,
      description: formEvent.data.description?.length ? formEvent.data.description : undefined
    },
  })
  isLoading.value = pending.value
  if (!error.value) {
    toast.add({
      id: 'children_notification',
      title: 'Enregistrement effectué !',
      description: `${formEvent.data.name} a bien été enregistré.`,
      icon: 'i-heroicons-check-circle-solid',
      timeout: 6000,
      color: 'green',
    })
    await navigateTo('/dashboard/home')
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

  isLoading.value = false
}

function initForm(): void {
  state.value = {
    name: '',
    gender: ChildrenGender.M,
    birthdate: '',
    size: 0,
    weight: 0,
    description: '',
  }
}

function formatWeight(weight: number): number {
  if (weight.toString().includes('.') || weight.toString().includes(',')) {
    return weight
  }
  if (weight < 1000) {
    return weight / 100
  }
  return weight / 1000
}

function formartSize(size: number): number {
  if (size.toString().includes(',')) {
    return Math.floor(parseFloat(size.toString().replaceAll(',', '.')))
  }
  return Math.floor(parseFloat(size.toString()))
}

// LIFE CYCLE
onMounted(() => {
  initForm()
})

// PROVIDE
provide('modal-color-btn', 'red')
</script>
