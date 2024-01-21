<template>
  <div>
    <UButton :color="color" :label="label" :size="size" @click="showDialog" />

    <UModal v-model="isOpened" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <UButton color="my-gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="showDialog" />
          </div>
        </template>

        <slot name="content" />

        <template #footer>
          <slot name="footer" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { ButtonSize } from '~/models/ui.model';

interface ModalBasePropOptions {
  title: string
  isOpen: boolean
  label: string
};

// CONST
const props = defineProps<ModalBasePropOptions>()
const emit = defineEmits<{
  showDialog: []
}>()
const isOpened = ref(props.isOpen)

// FUNCTIONS
function showDialog() {
  emit('showDialog')
}

// WATCHERS
watch(() => props.isOpen, (value) => {
  isOpened.value = value
})

// INJECT
const size = inject<ButtonSize>('modal-size-btn', 'md')
const color = inject<string>('modal-color-btn', 'primary')
</script>

<style lang="sass" scoped>
</style>
