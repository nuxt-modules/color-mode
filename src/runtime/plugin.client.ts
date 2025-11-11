import { computed, reactive, watch } from 'vue'

import type { ColorModeInstance } from './types'
import { defineNuxtPlugin, useRouter, useHead, useState } from '#imports'
import { globalName, storageKey, dataValue, disableTransition, storage } from '#color-mode-options'

type Helper = {
  preference: string
  value: string
  getColorScheme: () => string
  addColorScheme: (className: string) => void
  removeColorScheme: (className: string) => void
}

let helper = window[globalName] as unknown as Helper

// Initialise to object with defaults and no-ops to avoid hard error when hydrating app in test mode
if (import.meta.test && !helper) {
  helper = {
    preference: 'light',
    value: 'light',
    getColorScheme: () => 'light',
    addColorScheme: () => {},
    removeColorScheme: () => {},
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState<ColorModeInstance>('color-mode', () => reactive({
    // For SPA mode or fallback
    preference: helper.preference,
    value: helper.value,
    unknown: false,
    forced: false,
  })).value

  if (dataValue) {
    useHead({
      htmlAttrs: { [`data-${dataValue}`]: computed(() => colorMode.value) },
    })
  }

  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode

    if (forcedColorMode && forcedColorMode !== 'system') {
      colorMode.value = forcedColorMode
      colorMode.forced = true
    }
    else {
      if (forcedColorMode === 'system') {
        console.warn('You cannot force the colorMode to system at the page level.')
      }
      colorMode.forced = false
      colorMode.value = colorMode.preference === 'system'
        ? helper.getColorScheme()
        : colorMode.preference
    }
  })

  let darkWatcher: MediaQueryList

  function watchMedia() {
    if (darkWatcher || !window.matchMedia) {
      return
    }

    darkWatcher = window.matchMedia('(prefers-color-scheme: dark)')
    darkWatcher.addEventListener('change', () => {
      if (!colorMode.forced && colorMode.preference === 'system') {
        colorMode.value = helper.getColorScheme()
      }
    })
  }

  function setPreferenceToStorage(storageType: typeof storage, preference: string) {
    switch (storageType) {
      case 'cookie':
        window.document.cookie = storageKey + '=' + preference
        break
      case 'sessionStorage':
        window.sessionStorage?.setItem(storageKey, preference)
        break
      case 'localStorage':
      default:
        window.localStorage?.setItem(storageKey, preference)
    }
  }

  watch(() => colorMode.preference, (preference) => {
    if (colorMode.forced) {
      return
    }
    if (preference === 'system') {
      colorMode.value = helper.getColorScheme()
      watchMedia()
    }
    else {
      colorMode.value = preference
    }

    setPreferenceToStorage(storage, preference)
    // Local storage to sync with other tabs
    // window.localStorage?.setItem(storageKey, preference)
  }, { immediate: true })

  watch(() => colorMode.value, (newValue, oldValue) => {
    let style: HTMLStyleElement | undefined
    if (disableTransition) {
      style = window!.document.createElement('style')
      style.appendChild(document.createTextNode('*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'))
      window!.document.head.appendChild(style)
    }
    helper.removeColorScheme(oldValue)
    helper.addColorScheme(newValue)
    if (disableTransition) {
      // Calling getComputedStyle forces the browser to redraw

      const _ = window!.getComputedStyle(style!).opacity
      document.head.removeChild(style!)
    }
  })

  if (colorMode.preference === 'system') {
    watchMedia()
  }

  nuxtApp.hook('app:mounted', () => {
    if (colorMode.unknown) {
      colorMode.preference = helper.preference
      colorMode.value = helper.value
      colorMode.unknown = false
    }
  })

  nuxtApp.provide('colorMode', colorMode)
})
