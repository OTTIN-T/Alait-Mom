<template>
  <NuxtLayout name="connected">
    <template #body>
      <UContainer as="section" class="py-12">
        <h1 class="text-center mt-5">Enregistrez votre allaitement</h1>
        <UForm :schema="breastfeedingSchema" :state="state" class="space-y-4 mt-5 w-56 md:w-96 mx-auto"
          @submit="onSubmit">
          <UDivider icon="i-fluent-emoji-high-contrast-breast-feeding" />
          <URadioGroup v-model="state.breast" legend="Sein utilisé(s)" color="my-primary" :options="breastOptions"
            class="justify-center" />

          <UDivider icon="i-heroicons-clock" class="pt-10" />
          <ClientOnly>
            <UFormGroup label="Saisie du temps passé" :ui="{
              label: { wrapper: 'justify-center' }
            }" name="duration" class="mx-auto text-center">
              <UTabs :items="durationTabList" @change="onChangeTabs">
                <template #item="{ item }">
                  <UInput v-if="item.key === 'manual'" v-model="state.duration" type="time" class="w-24 mx-auto mt-5" />
                  <div v-if="item.key === 'stopwatch'" class="mt-5">
                    <span class="text-center">
                      {{ hours }} h {{ minutes }} min {{ seconds }} s
                    </span>
                    <div>
                    </div>
                    <div class="flex justify-around w-1/2 mx-auto mt-4 ">
                      <UButton @click="stopwatch.reset()" icon="i-heroicons-arrow-path-20-solid"
                        class="rounded-full text-black" color="my-primary" aria-label="boutton reset" />
                      <UButton v-if="!stopwatch.isRunning.value" @click="stopwatch.start()"
                        icon="i-heroicons-play-20-solid" class="rounded-full text-black" color="my-primary"
                        aria-label="boutton start" />
                      <UButton v-if="stopwatch.isRunning.value" @click="stopwatch.pause()"
                        icon="i-heroicons-pause-20-solid" class="rounded-full text-black" color="my-primary"
                        aria-label="boutton pause" />
                    </div>
                  </div>
                </template>
              </UTabs>
            </UFormGroup>
          </ClientOnly>

          <UDivider icon="i-lucide-baby" class="pt-10" />
          <ClientOnly>
            <UFormGroup label="Relié un enfant" :ui="{
              label: { wrapper: 'justify-center' }
            }">
              <USelectMenu :disabled="state.children.id === 0" :loading="isLoadingChildrenList"
                icon="i-heroicons-magnifying-glass-20-solid" :options="childrenList" v-model="state.children.name"
                value-attribute="id" option-attribute="name" />
            </UFormGroup>
          </ClientOnly>

          <UDivider icon="i-heroicons-pencil-square" class="pt-10" />
          <ClientOnly>
            <UFormGroup label="Description" :ui="{
              label: { wrapper: 'justify-center' }
            }">
              <UTextarea v-model="state.description" color="primary" variant="outline"
                placeholder="Information complémentaire..." autoresize />
            </UFormGroup>
          </ClientOnly>

          <UContainer class="flex justify-between pt-10">
            <ModalBase label="Annuler" title="Annulation" :is-open="isOpen" @show-dialog="showDialog">
              <template #content>
                <div class="flex justify-center">
                  <span>
                    Êtes-vous sûr de vouloir annuler l'enregistrement de votre allaitement ?
                  </span>
                </div>
              </template>
              <template #footer>
                <div class="flex justify-between">
                  <UButton color="red" class="text-black " @click="showDialog">
                    Retour
                  </UButton>
                  <UButton color="green" class="text-black " @click="onCancel">
                    Confirmer l'annulation
                  </UButton>
                </div>
              </template>
            </ModalBase>
            <!-- @click="onSubmit" -->
            <UButton type="submit" class="text-black" :disabled="!hasCompletedForm">
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
import type { FormSubmitEvent } from '#ui/types';
import { z } from 'zod';
import { Breath } from '~/models/breastfeeding.model';
import type { Tables } from '~/models/database.types';

// CONST
const toast = useToast()
const { createBreastfeeding } = useBreastfeeding()
const { getChildrenList } = useChildren()
const autoStart = ref<boolean>(false);
const stopwatch = useStopwatch(0, autoStart.value)
const isLoadingChildrenList = ref<boolean>(false)
const childrenList = ref<(Tables<'children'>)[]>([{ name: 'Pas d\'enfant enregistré', id: 0, created_at: '', profile_id: '' }])
const isOpen = ref<boolean>(false)
const isSending = ref<boolean>(false)
const breastfeedingSchema = z.object({
  breast: z.nativeEnum(Breath),
  duration: z.string(),
  children: z.object({
    id: z.number(),
    name: z.string().min(1),
    created_at: z.string().optional(),
    profile_id: z.string().optional(),
  }).optional(),
  description: z.string().trim().optional(),
})
const state = reactive({
  breast: Breath.LEFT,
  duration: undefined as string | undefined,
  description: undefined,
  children: childrenList.value[0],
})
const breastOptions = [{
  value: Breath.LEFT,
  label: 'Gauche'
}, {
  value: Breath.RIGHT,
  label: 'Droit'
}, {
  value: Breath.BOTH,
  label: 'Les deux'
}]
const durationTabList = [{
  key: 'manual',
  label: 'Manuel'
}, {
  key: 'stopwatch',
  label: 'Chronomètre'
}]
type BreastfeedingSchemaType = z.output<typeof breastfeedingSchema>

// WATCHERS
watch(() => stopwatch, () => {
  state.duration = formattedDuration.value
}, {
  deep: true,
})

// COMPUTED
const seconds = computed((): string | number => {
  return stopwatch.seconds.value < 10 ? `0${stopwatch.seconds.value}` : stopwatch.seconds.value
})
const minutes = computed((): string | number => {
  return stopwatch.minutes.value < 10 ? `0${stopwatch.minutes.value}` : stopwatch.minutes.value
})
const hours = computed((): string | number => {
  return stopwatch.hours.value < 10 ? `0${stopwatch.hours.value}` : stopwatch.hours.value
})
const formattedDuration = computed((): string => {
  return `${hours.value}:${minutes.value}`
})
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

function onChangeTabs(index: number) {
  if (index === 1) {
    if (!stopwatch.isRunning.value) {
      stopwatch.start();
    }
    if (stopwatch.isRunning.value) {
      state.duration = formattedDuration.value
    }
  }

  if (index === 0 && stopwatch.isRunning.value) {
    state.duration = formattedDuration.value
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

async function onCancel(): Promise<void> {
  await navigateTo('/dashboard/home')
  showDialog()
}

function showDialog(): void {
  isOpen.value = !isOpen.value
}

// LIFE CYCLE
onMounted(async () => {
  await initChildrenList()
})

// PROVIDE
provide('modal-color-btn', 'red')
</script>
