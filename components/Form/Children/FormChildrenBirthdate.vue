<template>
  <UFormGroup label="Date de naissance" class="my-5">
    <UInput type="date" v-model="birthdate" />
  </UFormGroup>
</template>

<script lang="ts" setup>
// CONST
const birthdate = defineModel<string>('birthdate', {
  required: false,
})
</script>

<style lang="sass" scoped>
</style>
