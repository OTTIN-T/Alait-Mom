<template>
  <ModalBase :title="setTitle" :is-open="isOpen" :label="setLabel" @show-dialog="showDialog">
    <template #content>
      <FormLogin v-if="isLoginType" @submit="onSubmit" @close="showDialog" />
      <FormSignup v-if="!isLoginType" @submit="onSubmit" @close="showDialog" />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <UButton v-if="isLoginType" variant="ghost" class="dark:text-white">
          Mot de passe oublié ?
        </UButton>
        <UButton v-if="isLoginType" variant="ghost" class="dark:text-white" @click="setFormType(FormTypeEnum.SIGNUP)">
          S'inscrire
        </UButton>
        <UButton v-if="!isLoginType" variant="ghost" class="dark:text-white" @click="setFormType(FormTypeEnum.LOGIN)">
          Déjà inscrit ?
        </UButton>
      </div>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import { FormTypeEnum } from '~/models/auth.model';

interface MyComponentPropOptions {
  formType: FormTypeEnum
};

// CONST
const props = defineProps<MyComponentPropOptions>()
const currentFormType = ref<FormTypeEnum>(props.formType)
const isOpen = ref(false)
const setLabel = props.formType === FormTypeEnum.LOGIN ? 'Connexion' : 'Inscription'

// COMPUTED
const isLoginType = computed((): boolean => currentFormType.value === FormTypeEnum.LOGIN)
const setTitle = computed((): string => isLoginType.value ? 'Connexion' : 'Inscription')

// FUNCTIONS
function onSubmit($event: any): void {
  console.log('submit', $event)
}

function setFormType($event: FormTypeEnum): void {
  currentFormType.value = $event
}

function showDialog(): void {
  isOpen.value = !isOpen.value
}
</script>

<style lang="sass" scoped>
</style>
