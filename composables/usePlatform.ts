// Copied from Vuetify: https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/composables/display.ts#L113

import { IN_BROWSER, type DisplayPlatform, SUPPORTS_TOUCH } from '~/models/platform.model'

interface UsePlatform {
  getPlatform: () => DisplayPlatform
}

export const usePlatform = (): UsePlatform => {
  function getPlatform(): DisplayPlatform {
    const userAgent = IN_BROWSER ? window.navigator.userAgent : 'ssr'

    function match(regexp: RegExp) {
      return Boolean(userAgent.match(regexp))
    }

    const android = match(/android/i)
    const ios = match(/iphone|ipad|ipod/i)
    const cordova = match(/cordova/i)
    const electron = match(/electron/i)
    const chrome = match(/chrome/i)
    const edge = match(/edge/i)
    const firefox = match(/firefox/i)
    const opera = match(/opera/i)
    const win = match(/win/i)
    const mac = match(/mac/i)
    const linux = match(/linux/i)

    return {
      android,
      ios,
      cordova,
      electron,
      chrome,
      edge,
      firefox,
      opera,
      win,
      mac,
      linux,
      touch: SUPPORTS_TOUCH,
      ssr: userAgent === 'ssr',
    }
  }

  return {
    getPlatform,
  }
}
