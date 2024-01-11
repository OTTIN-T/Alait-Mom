<template>
  <UFormGroup label="Relié un enfant" :ui="{
    label: { wrapper: 'justify-center' }
  }">
    <USelectMenu :disabled="children?.id === 0" :loading="isLoading" icon="i-heroicons-magnifying-glass-20-solid"
      :options="childrenList" v-model="children" option-attribute="name" />
  </UFormGroup>
</template>

<script lang="ts" setup>
import type { ChildrenSelectForm } from '~/models/children.model';

interface FormBreastfeedingChildrenPropOptions {
  isLoading: boolean
  childrenList: ChildrenSelectForm[]
}
defineProps<FormBreastfeedingChildrenPropOptions>()

// MODEL
const children = defineModel<ChildrenSelectForm>('children', {
  required: false,
})
</script>

<style lang="sass" scoped>
</style>
