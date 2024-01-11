<template>
  <URadioGroup v-model="gender" legend="Genre" color="my-primary" :options="genderOptionList"
    class="my-5 justify-center" />
</template>

<script lang="ts" setup>
import { ChildrenGender } from '~/models/children.model';

// CONST
const gender = defineModel<ChildrenGender>('gender', {
  required: true,
})
const genderOptionList = [{
  value: ChildrenGender.M,
  label: 'Masculin'
},
{
  value: ChildrenGender.F,
  label: 'Féminin'
},
{
  value: ChildrenGender.O,
  label: 'Autre'
}]
</script>

<style lang="sass" scoped>
</style>
