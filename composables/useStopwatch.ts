// Improve from https://github.com/riderx/vue-timer-hook/tree/main

const epochSeconds = (): number => new Date().getTime()
export interface UseStopwatch {
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  days: Ref<number>
  start(): void
  pause(): void
  reset(offset?: number, newAutoStart?: boolean): void
  isRunning: Ref<boolean>
}

export const useStopwatch = (offsetTimestamp: number = 60, autoStart: boolean = true): UseStopwatch => {
  let interval: UseInterval
  const passedSeconds = ref<number>(offsetTimestamp)

  const prevTime = ref<number>(epochSeconds())
  const seconds = ref<number>(passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value || 0, true))
  const isRunning = ref<boolean>(autoStart)

  function start(): void {
    prevTime.value = epochSeconds()
    isRunning.value = true
    seconds.value = passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value, true)
    interval = useInterval(
      () => {
        seconds.value = passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value, true)
      },
      isRunning.value ? 1000 : false
    )
  }

  function pause(): void {
    passedSeconds.value = seconds.value
    isRunning.value = false
    if (interval) interval.remove()
  }

  function reset(offset = 0, newAutoStart = true): void {
    pause()
    isRunning.value = newAutoStart
    passedSeconds.value = offset
    seconds.value = +passedSeconds.value
    Time.getSecondsFromPrevTime(prevTime.value, true)
    if (isRunning.value) start()
  }

  if (isRunning.value) start()
  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  }
}
