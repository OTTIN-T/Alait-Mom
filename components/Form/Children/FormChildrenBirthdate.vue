<template>
  <UFormGroup label="Date de naissance" class="my-5">
    <UInput type="datetime-local" v-model.trim="birthdate" :value="birthdate" />
  </UFormGroup>
</template>

<script lang="ts" setup>
// CONST
const birthdate = defineModel<string>('birthdate', {
  required: false,
})

// FUNCTIONS
function formatDate(date: string): string {
  const splittedDate = date.split(":");
  const yearMonthDayHourDatePart = splittedDate[0]
  const minuteDatePart = splittedDate[1]
  const formattedDate = yearMonthDayHourDatePart + ":" + minuteDatePart;
  return formattedDate
}

// WATCHERS
watch(birthdate, (value) => {
  if (value?.includes('+')) {
    birthdate.value = formatDate(value)
  }
}, { immediate: true })

</script>

<style lang="sass" scoped>
</style>
