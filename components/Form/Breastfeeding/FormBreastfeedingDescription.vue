<template>
  <UFormGroup label="Description" :ui="{
    label: { wrapper: 'justify-center' }
  }">
    <UTextarea v-model="description" color="primary" variant="outline" placeholder="Information complémentaire..."
      autoresize />
  </UFormGroup>
</template>

<script lang="ts" setup>
const description = defineModel<string>('description', {
  required: false,
})
</script>

<style lang="sass" scoped>
</style>
