<template>
  <UFormGroup label="Poids (kg)" class="my-5">
    <UInput type="number" v-model.number.trim="weight" :step="0.001">
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs">kg</span>
      </template>
    </UInput>
  </UFormGroup>
</template>

<script lang="ts" setup>
// CONST
const weight = defineModel<number | string>('weight', {
  required: false,
})
</script>

<style lang="sass" scoped>
</style>
