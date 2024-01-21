<template>
  <UFormGroup label="Nom" class="my-5">
    <UInput v-model.trim="name" autofocus :disabled="isDisabled" />
  </UFormGroup>
</template>

<script lang="ts" setup>
interface FormProfileNamePropOptions {
  isDisabled: boolean;
};
defineProps<FormProfileNamePropOptions>();

// CONST
const name = defineModel<string>('name', {
  required: false,
})
</script>

<style lang="sass" scoped>
</style>
