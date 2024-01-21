<template>
  <ModalBase title="Supprimer mon compte" label="Supprimer mon compte" :is-open="isOpen" @show-dialog="showDialog">
    <template #content>
      <slot name="content" />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <UButton color="red" class="text-black " @click="showDialog">
          Retour
        </UButton>
        <UButton color="green" class="text-black " @click="onDelete" :loading="isLoading">
          Confirmer la suppression
        </UButton>
      </div>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
interface ModalDeletePropOptions {
  isLoading: boolean;
}
withDefaults(defineProps<ModalDeletePropOptions>(), {
  isLoading: false,
})

// EMITS
const emit = defineEmits(['delete'])

// CONST
const isOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)

// FUNCTIONS
function showDialog(): void {
  isOpen.value = !isOpen.value
}

async function onDelete(): Promise<void> {
  emit('delete')
}
</script>

<style lang="sass" scoped>
</style>
