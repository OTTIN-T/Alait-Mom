<template>
  <URadioGroup v-model="breast" legend="Sein utilisé(s)" color="my-primary" :options="breastOptionList"
    class="justify-center" />
</template>

<script lang="ts" setup>
import { Breast } from '~/models/breastfeeding.model';

// CONST
const breast = defineModel<Breast>('breast', {
  required: true,
})
const breastOptionList = [{
  value: Breast.LEFT,
  label: 'Gauche'
}, {
  value: Breast.RIGHT,
  label: 'Droit'
}, {
  value: Breast.BOTH,
  label: 'Les deux'
}]
</script>

<style lang="sass" scoped>
</style>
