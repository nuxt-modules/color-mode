import { computed, reactive, watch } from 'vue'

import type { ColorModeInstance } from './types'
import { defineNuxtPlugin, useRouter, useHead, useState } from '#imports'
import { globalName, storageKey, dataValue, disableTransition, storage, cookieAttrs } from '#build/color-mode-options.mjs'

type Helper = {
  preference: string
  value: string
  getColorScheme: () => string
  addColorScheme: (className: string) => void
  removeColorScheme: (className: string) => void
}

// Initialise to object with defaults and no-ops to avoid hard error when hydrating app in test mode
if (import.meta.test) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window[globalName as any] ||= {
    preference: 'light',
    value: 'light',
    getColorScheme: () => 'light',
    addColorScheme: () => {},
    removeColorScheme: () => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } satisfies Helper as any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const helper = window[globalName as any] as unknown as Helper

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
      setColorModeValue(colorMode, forcedColorMode)
      colorMode.forced = true
    }
    else {
      if (forcedColorMode === 'system') {
        console.warn('You cannot force the colorMode to system at the page level.')
      }
      colorMode.forced = false
      const newValue = colorMode.preference === 'system'
        ? helper.getColorScheme()
        : colorMode.preference
      setColorModeValue(colorMode, newValue)
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
        setColorModeValue(colorMode, helper.getColorScheme())
      }
    })
  }

  watch(() => colorMode.preference, (preference) => {
    if (colorMode.forced) {
      return
    }

    if (preference === 'system') {
      setColorModeValue(colorMode, helper.getColorScheme())
      watchMedia()
    }
    else {
      setColorModeValue(colorMode, preference)
    }

    setPreferenceToStorage(preference)
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
      setColorModeValue(colorMode, helper.value)
      colorMode.unknown = false
    }
  })

  nuxtApp.provide('colorMode', colorMode)
})

function setColorModeValue(colorMode: ColorModeInstance, value: string) {
  // @ts-expect-error readonly property
  colorMode.value = value
}

function setPreferenceToStorage(preference: string) {
  if (storage === 'cookie') {
    if (cookieAttrs && Object.keys(cookieAttrs).length) {
      let cookieString = storageKey + '=' + preference
      for (const key in cookieAttrs) {
        cookieString += `; ${key}=${cookieAttrs[key as keyof typeof cookieAttrs]}`
      }
      window.document.cookie = cookieString
    }
    else {
      window.document.cookie = storageKey + '=' + preference
    }
    return
  }

  if (storage === 'sessionStorage') {
    window.sessionStorage?.setItem(storageKey, preference)
    return
  }

  window.localStorage?.setItem(storageKey, preference)
}
