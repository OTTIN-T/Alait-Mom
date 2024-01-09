// Improve from https://github.com/riderx/vue-timer-hook/tree/main

const isNumber = (val: unknown): val is number => typeof val === 'number'

export interface UseInterval {
  remove: () => void
  start: (_ms?: number | undefined) => NodeJS.Timeout | undefined
}

export const useInterval = (callback: () => void, ms?: number | boolean | null): UseInterval => {
  let intervalId: NodeJS.Timeout | undefined = undefined

  function remove(): void {
    if (!intervalId) return
    clearInterval(intervalId)
    intervalId = undefined
  }

  function start(_ms?: number): NodeJS.Timeout | undefined {
    remove()
    if (!_ms && !ms) {
      return
    }
    const m = (_ms || ms) as number
    return (intervalId = setInterval(callback, m))
  }

  if (isNumber(ms)) {
    start()
  }

  return { remove, start }
}
