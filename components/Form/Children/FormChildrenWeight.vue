<template>
  <UFormGroup label="Poids (kg)" class="my-5">
    <UInput type="number" v-model.number.trim="weight" :step="0.001" placeholder="3.202" :max="200">
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs">kg</span>
      </template>
    </UInput>
    <p class="text-sm pt-1 pl-1">Assurez-vous de rentrez une valeur valide en cm (ex: 3.225 ou 10.020 kg)</p>
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
