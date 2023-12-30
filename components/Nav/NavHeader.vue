<template>
  <header>
    <UContainer class="md:px-4 px-2">
      <nav class="flex justify-between items-center mt-2">
        <ULink to="/" active-class="text-my-primary" class="font-bold mr-1 flex items-center"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <NuxtImg src="/logo-no-bg.svg" alt="Logo alait'mom" width="40" height="40" class="mr-1" />
          Alait'Mom
        </ULink>
        <UContainer class="flex px-0 md:px-4">
          <DelayHydration>
            <HeroAuth v-for="(authType, index) in authFormList" :key="authType" :form-type="authType"
              :class="{ 'mr-2 md:mr-5': index === 0 }" />
          </DelayHydration>
        </UContainer>
        <ToggleTheme class="items-end ml-2" />
      </nav>
    </UContainer>
  </header>
</template>

<script lang="ts" setup>
import { FormTypeEnum } from '~/models/auth.model';

// CONST
const isSmallScreen = useMediaQuery('(max-width: 340px)')
const authFormList = computed((): FormTypeEnum[] =>
  isSmallScreen.value ? [
    FormTypeEnum.LOGIN,
  ] : [
    FormTypeEnum.LOGIN,
    FormTypeEnum.SIGNUP,
  ])
</script>

<style lang="sass" scoped>
</style>
