import { computed, reactive, watch } from 'vue'

import type { ColorModeInstance } from './types'
import type { NuxtApp } from '#app'
import { defineNuxtPlugin, useRouter, useHead, useState, useCookie, useRuntimeConfig } from '#imports'
import { globalName, storageKey, dataValue, disableTransition, storage, preference, fallback } from '#build/color-mode-options.mjs'

type Helper = {
  preference: string
  value: string
  getColorScheme: () => string
  addColorScheme: (className: string) => void
  removeColorScheme: (className: string) => void
}

// The helper is created by the inline script that is injected into the `<head>` before the app
// loads. Fall back to the configured defaults with no-op class helpers when the HTML was rendered
// without that script (e.g. by a test runner) to avoid hard errors when hydrating.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const helper: Helper = (window[globalName as any] as unknown as Helper | undefined) || createFallbackHelper()

function createFallbackHelper(): Helper {
  if (import.meta.dev && !import.meta.test) {
    console.warn(`[@nuxtjs/color-mode] \`window.${globalName}\` is not defined because the inline script was not injected into the page. The color mode is neither detected nor applied to the document.`)
  }
  return {
    preference,
    value: preference === 'system' ? fallback : preference,
    getColorScheme: () => fallback,
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

  let initialColorScheme = helper.preference === 'system' && !document.documentElement.hasAttribute('data-color-mode-forced')
    ? helper.value
    : undefined

  function getColorScheme() {
    return initialColorScheme || helper.getColorScheme()
  }

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
        ? getColorScheme()
        : colorMode.preference
      setColorModeValue(colorMode, newValue)
    }
  })

  let darkWatcher: MediaQueryList

  function syncSystemColorScheme() {
    if (!colorMode.forced && colorMode.preference === 'system') {
      setColorModeValue(colorMode, helper.getColorScheme())
    }
  }

  function watchMedia() {
    if (darkWatcher || !window.matchMedia) {
      return
    }

    darkWatcher = window.matchMedia('(prefers-color-scheme: dark)')
    darkWatcher.addEventListener('change', syncSystemColorScheme)
  }

  let isReady = false
  let pendingPreference: string | undefined

  watch(() => colorMode.preference, (preference) => {
    if (colorMode.forced) {
      return
    }

    if (preference === 'system') {
      setColorModeValue(colorMode, getColorScheme())
      if (isReady) {
        watchMedia()
      }
    }
    else {
      setColorModeValue(colorMode, preference)
    }

    if (isReady) {
      setPreferenceToStorage(preference)
    }
    else {
      pendingPreference = preference
    }
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

  onIdleAfterHydration(nuxtApp, () => {
    isReady = true
    initialColorScheme = undefined
    if (colorMode.preference === 'system') {
      watchMedia()
      syncSystemColorScheme()
    }
    const preference = pendingPreference
    if (preference) {
      nuxtApp.runWithContext(() => setPreferenceToStorage(preference))
    }
  })

  nuxtApp.hook('app:mounted', () => {
    if (colorMode.unknown) {
      colorMode.preference = helper.preference
      setColorModeValue(colorMode, helper.value)
      colorMode.unknown = false
    }
  })

  nuxtApp.provide('colorMode', colorMode)
})

function onIdleAfterHydration(nuxtApp: NuxtApp, callback: () => void) {
  const schedule = () => {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(callback, { timeout: 1000 })
    }
    else {
      setTimeout(callback, 1)
    }
  }
  if (nuxtApp.isHydrating) {
    nuxtApp.hooks.hookOnce('app:suspense:resolve', schedule)
  }
  else {
    schedule()
  }
}

function setColorModeValue(colorMode: ColorModeInstance, value: string) {
  // @ts-expect-error readonly property
  colorMode.value = value
}

function setPreferenceToStorage(preference: string) {
  if (storage === 'cookie') {
    try {
      const { cookieAttrs } = useRuntimeConfig().public.colorMode as { cookieAttrs?: Record<string, unknown> }
      const cookie = useCookie(storageKey, cookieAttrs)
      cookie.value = preference
    }
    catch {
      // Ignore cookie write errors; storage may be blocked.
    }
    return
  }

  if (storage === 'sessionStorage') {
    try {
      window.sessionStorage?.setItem(storageKey, preference)
    }
    catch {
      // Ignore sessionStorage write errors; storage may be blocked.
    }
    return
  }

  try {
    window.localStorage?.setItem(storageKey, preference)
  }
  catch {
    // Ignore localStorage write errors; storage may be blocked.
  }
}
