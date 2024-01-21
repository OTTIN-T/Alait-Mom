<template>
  <UFormGroup label="Email" class="my-5">
    <UInput v-model.trim="email" autofocus :disabled="isDisabled" :maxlength="255" />
  </UFormGroup>
</template>

<script lang="ts" setup>
interface FormProfileEmailPropOptions {
  isDisabled: boolean;
};
defineProps<FormProfileEmailPropOptions>();

// CONST
const email = defineModel<string>('email', {
  required: true,
})
</script>

<style lang="sass" scoped>
</style>
