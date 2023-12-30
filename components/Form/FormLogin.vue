<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" autocomplete="email" />
    </UFormGroup>

    <UFormGroup label="Mot de passe" name="password">
      <UInput v-model="state.password" type="password" autocomplete="current-password" />
    </UFormGroup>

    <div class="flex justify-between">
      <UButton class="dark:text-white" @click="onClose">
        Fermer
      </UButton>
      <UButton type="submit" class="dark:text-white">
        Se connecter
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

// CONST
const emit = defineEmits<{
  submit: [data: Schema]
  close: []
}>()
const schema = z.object({
  email: z.string().email('Email au mauvais format').trim(),
  password: z.string().trim(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

// FUNCTIONS
async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data)
}

function onClose() {
  emit('close')
}
</script>

<style lang="sass" scoped>
</style>
