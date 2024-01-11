<template>
  <ModalBase label="Annuler" title="Annulation" :is-open="isOpen" @show-dialog="showDialog">
    <template #content>
      <div class="flex justify-center">
        <slot name="content" />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <UButton color="red" class="text-black " @click="showDialog">
          Retour
        </UButton>
        <UButton color="green" class="text-black " @click="onCancel">
          Confirmer l'annulation
        </UButton>
      </div>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
// CONST
const isOpen = ref<boolean>(false)

// FUNCTIONS
async function onCancel(): Promise<void> {
  await navigateTo('/dashboard/home')
  showDialog()
}

function showDialog(): void {
  isOpen.value = !isOpen.value
}
</script>

<style lang="sass" scoped>
</style>
