import { globalName, storageKey } from '#color-mode-options'
import { defineNuxtPlugin } from '#app'
import { addRouteMiddleware, useRoute } from '#imports'
import { reactive, watch } from 'vue'

// @ts-ignore
declare module 'vue-router' {
  interface RouteMeta {
    colorMode?: string
  }
}

const helper = window[globalName] as unknown as {
  preference: string
  value: string
  getColorScheme: () => string
  addClass: (className: string) => void
  removeClass: (className: string) => void
}

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = reactive(nuxtApp.payload.state.colorMode || {
    // For SPA mode or fallback
    preference: helper.preference,
    value: helper.value,
    unknown: false,
    forced: false,
  })

  const route = useRoute()
  if (route.meta.colorMode) {
    colorMode.value = route.meta.colorMode
    colorMode.forced = true
    helper.addClass(route.meta.colorMode)
  }

  let darkWatcher: MediaQueryList

  function watchMedia () {
    if (darkWatcher || !window.matchMedia) {
      return
    }

    darkWatcher = window.matchMedia('(prefers-color-scheme: dark)')
    darkWatcher.addListener((e) => {
      if (!colorMode.forced && colorMode.preference === 'system') {
        colorMode.value = helper.getColorScheme()
      }
    })
  }

  function watchStorageChange () {
    window.addEventListener('storage', (e) => {
      if (e.key === storageKey) {
        colorMode.preference = e.newValue
      }
    })
  }

  watch(() => colorMode.preference, preference => {
    if (colorMode.forced) {
      return
    }
    if (preference === 'system') {
      colorMode.value = helper.getColorScheme()
      watchMedia()
    } else {
      colorMode.value = preference
    }

    // Local storage to sync with other tabs
    window.localStorage?.setItem(storageKey, preference)
  }, { immediate: true })

  watch(() => colorMode.value, (newValue, oldValue) => {
    helper.removeClass(oldValue)
    helper.addClass(newValue)
  })

  if (colorMode.preference === 'system') {
    watchMedia()
  }

  nuxtApp.hook('app:suspense:resolve', () => {
    if (window.localStorage) {
      watchStorageChange()
    }
    if (colorMode.unknown) {
      colorMode.preference = helper.preference
      colorMode.value = helper.value
      colorMode.unknown = false
    }
  })

  addRouteMiddleware('color-mode', (to, from) => {
    const forcedColorMode = to.meta.colorMode

    if (forcedColorMode && forcedColorMode !== 'system') {
      colorMode.value = forcedColorMode
      colorMode.forced = true
    } else {
      if (forcedColorMode === 'system') {
        console.warn('You cannot force the colorMode to system at the page level.')
      }
      colorMode.forced = false
      colorMode.value = colorMode.preference === 'system'
        ? helper.getColorScheme()
        : colorMode.preference
    }
  }, { global: true })

  return {
    provide: {
      colorMode
    }
  }
})
