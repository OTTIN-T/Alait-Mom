<template>
  <UFormGroup label="Taille (cm)" class="my-5">
    <UInput type="number" v-model.number.trim="size">
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs">cm</span>
      </template>
    </UInput>
  </UFormGroup>
</template>

<script lang="ts" setup>
// CONST
const size = defineModel<number | string>('size', {
  required: false,
})
</script>

<style lang="sass" scoped>
</style>
