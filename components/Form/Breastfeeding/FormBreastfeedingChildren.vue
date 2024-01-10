<template>
  <UFormGroup label="Relié un enfant" :ui="{
    label: { wrapper: 'justify-center' }
  }">
    <USelectMenu :disabled="children.id === 0" :loading="isLoading" icon="i-heroicons-magnifying-glass-20-solid"
      :options="childrenList" v-model="children.name" value-attribute="id" option-attribute="name" />
  </UFormGroup>
</template>

<script lang="ts" setup>
import type { Tables } from '~/models/database.types';

interface FormBreastfeedingChildrenPropOptions {
  isLoading: boolean
  childrenList: Tables<'children'>[]
}
defineProps<FormBreastfeedingChildrenPropOptions>()

// MODEL
const children = defineModel<Tables<'children'>>('children', {
  required: true,
})
</script>

<style lang="sass" scoped>
</style>
