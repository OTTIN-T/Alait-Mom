// Improve from https://github.com/riderx/vue-timer-hook/tree/main

interface TimeAmPm {
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  amPm: Ref<string>
}

interface TimeNum {
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  days: Ref<number>
}

export class Time {
  static getTimeFromSeconds(secs: Ref<number>): TimeNum {
    const totalSeconds = computed((): number => Math.ceil(secs.value))
    const days = computed((): number => Math.floor(totalSeconds.value / (60 * 60 * 24)))
    const hours = computed((): number => Math.floor((totalSeconds.value % (60 * 60 * 24)) / (60 * 60)))
    const minutes = computed((): number => Math.floor((totalSeconds.value % (60 * 60)) / 60))
    const seconds = computed((): number => Math.floor(totalSeconds.value % 60))

    return {
      seconds,
      minutes,
      hours,
      days,
    }
  }

  static getSecondsFromExpiry(expiry: number, shouldRound?: boolean): number {
    const now = new Date().getTime()
    const milliSecondsDistance = expiry - now
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000
      return shouldRound ? Math.round(val) : val
    }
    return 0
  }

  static getSecondsFromPrevTime(prevTime: number, shouldRound: boolean): number {
    const now = new Date().getTime()
    const milliSecondsDistance = now - prevTime
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000
      return shouldRound ? Math.round(val) : val
    }
    return 0
  }

  static getSecondsFromTimeNow(): number {
    const now = new Date()
    const currentTimestamp = now.getTime()
    const offset = now.getTimezoneOffset() * 60
    return currentTimestamp / 1000 - offset
  }

  static getFormattedTimeFromSeconds(totalSeconds: Ref<number>, format: '12-hour' | '24-hour'): TimeAmPm {
    const { seconds: secondsValue, minutes, hours } = Time.getTimeFromSeconds(totalSeconds)
    const amPm = computed(() => (format === '12-hour' ? (hours.value >= 12 ? 'pm' : 'am') : ''))
    const hoursValue = computed(() => (format === '12-hour' ? hours.value % 12 : hours.value))

    return {
      seconds: secondsValue,
      minutes,
      hours: hoursValue,
      amPm,
    }
  }
}
