<template>
  <UFormGroup label="Prénom" class="my-5">
    <UInput v-model.trim="name" autofocus />
  </UFormGroup>
</template>

<script lang="ts" setup>
// CONST
const name = defineModel<string>('name', {
  required: true,
})
</script>

<style lang="sass" scoped>
</style>
