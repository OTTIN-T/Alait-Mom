<template>
  <UFormGroup label="Taille (cm)" class="my-5">
    <UInput type="number" v-model.number.trim="size" pattern="\d+" placeholder="47" :max="250">
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs">cm</span>
      </template>
    </UInput>
    <p class="text-sm pt-1 pl-1">Assurez-vous de rentrez un nombre entier en cm (ex: 47 ou 110 cm)</p>
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
