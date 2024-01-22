<template>
  <UFormGroup label="Information complémentaire" class="my-5">
    <UTextarea v-model.number.trim="description" autoresize :maxlength="255" />
    <span class="text-sm pt-1 pl-1">{{ description ? description.length : 0 }}/255</span>
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
