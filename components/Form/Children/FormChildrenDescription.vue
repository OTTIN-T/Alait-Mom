<template>
  <UFormGroup label="Information complémentaire" class="my-5">
    <UTextarea v-model.number="description" autoresize />
  </UFormGroup>
</template>

<script lang="ts" setup>
// CONST
const description = defineModel<string>('description', {
  required: false,
})
</script>

<style lang="sass" scoped>
</style>
