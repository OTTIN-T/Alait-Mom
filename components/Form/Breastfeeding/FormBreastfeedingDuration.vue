<template>
  <UFormGroup label="Saisie du temps passé" :ui="{
    label: { wrapper: 'justify-center' }
  }" name="duration" class="mx-auto text-center">
    <UTabs :items="durationTabList" @change="onChangeTabs">
      <template #item="{ item }">
        <UInput v-if="item.key === DurationMode.MANUAL" v-model.trim="duration" type="time" class="w-24 mx-auto mt-5" />
        <div v-if="item.key === DurationMode.STOPWATCH" class="mt-5">
          <span class="text-center">
            {{ hours }} h {{ minutes }} min {{ seconds }} s
          </span>
          <div>
          </div>
          <div class="flex justify-around w-1/2 mx-auto mt-4 ">
            <UButton @click="stopwatch.reset()" icon="i-heroicons-arrow-path-20-solid" class="rounded-full"
              color="my-primary" aria-label="boutton reset" />
            <UButton v-if="!stopwatch.isRunning.value" @click="stopwatch.start()" icon="i-heroicons-play-20-solid"
              class="rounded-full" color="my-primary" aria-label="boutton start" />
            <UButton v-if="stopwatch.isRunning.value" @click="stopwatch.pause()" icon="i-heroicons-pause-20-solid"
              class="rounded-full" color="my-primary" aria-label="boutton pause" />
          </div>
        </div>
      </template>
    </UTabs>
  </UFormGroup>
</template>

<script lang="ts" setup>
import { DurationMode } from '~/models/breastfeeding.model';

// MODEL
const duration = defineModel<string>('duration', {
  required: true,
  default: '00:00',
})

// CONST
const autoStart = ref<boolean>(false);
const stopwatch = useStopwatch(0, autoStart.value)
const durationTabList = [{
  key: DurationMode.MANUAL,
  label: 'Manuel'
}, {
  key: DurationMode.STOPWATCH,
  label: 'Chronomètre'
}]

// WATCHERS
watch(() => stopwatch, () => {
  duration.value = formattedDuration.value
}, {
  deep: true,
})

// COMPUTED
const seconds = computed((): string | number => {
  return stopwatch.seconds.value < 10 ? `0${stopwatch.seconds.value}` : stopwatch.seconds.value
})
const minutes = computed((): string | number => {
  return stopwatch.minutes.value < 10 ? `0${stopwatch.minutes.value}` : stopwatch.minutes.value
})
const hours = computed((): string | number => {
  return stopwatch.hours.value < 10 ? `0${stopwatch.hours.value}` : stopwatch.hours.value
})
const formattedDuration = computed((): string => {
  return `${hours.value}:${minutes.value}`
})

// FUNCTIONS
function onChangeTabs(index: number) {
  if (index === 1) {
    if (!stopwatch.isRunning.value) {
      stopwatch.start();
    }
    if (stopwatch.isRunning.value) {
      duration.value = formattedDuration.value
    }
  }

  if (index === 0 && stopwatch.isRunning.value) {
    duration.value = formattedDuration.value
  }
}
</script>

<style lang="sass" scoped>
</style>
