import { reactive, watch } from 'vue'

import type { ColorModeInstance } from './types'
import { defineNuxtPlugin, isVue2, isVue3, useRouter, useState } from '#imports'
import { globalName, storageKey, dataValue } from '#color-mode-options'

const helper = window[globalName] as unknown as {
  preference: string
  value: string
  getColorScheme: () => string
  addClass: (className: string) => void
  removeClass: (className: string) => void
}

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState<ColorModeInstance>('color-mode', () => reactive({
    // For SPA mode or fallback
    preference: helper.preference,
    value: helper.value,
    unknown: false,
    forced: false
  })).value

  if (dataValue) {
    if (isVue3) {
      useHead({
        htmlAttrs: { [`data-${dataValue}`]: computed(() => colorMode.value) }
      })
    } else {
      const app = nuxtApp.nuxt2Context.app
      const originalHead = app.head
      app.head = function () {
        const head = (typeof originalHead === 'function' ? originalHead.call(this) : originalHead) || {}
        head.htmlAttrs = head.htmlAttrs || {}
        head.htmlAttrs['data-theme'] = colorMode.value
        return head
      }
    }
  }

  useRouter().afterEach((to) => {
    const forcedColorMode = isVue2
      ? (to.matched[0]?.components.default as any)?.options.colorMode
      : to.meta.colorMode

    if (forcedColorMode && forcedColorMode !== 'system') {
      colorMode.value = forcedColorMode
      colorMode.forced = true
    } else {
      if (forcedColorMode === 'system') {
        // eslint-disable-next-line no-console
        console.warn('You cannot force the colorMode to system at the page level.')
      }
      colorMode.forced = false
      colorMode.value = colorMode.preference === 'system'
        ? helper.getColorScheme()
        : colorMode.preference
    }
  })

  let darkWatcher: MediaQueryList

  function watchMedia () {
    if (darkWatcher || !window.matchMedia) { return }

    darkWatcher = window.matchMedia('(prefers-color-scheme: dark)')
    darkWatcher.addEventListener('change', () => {
      if (!colorMode.forced && colorMode.preference === 'system') {
        colorMode.value = helper.getColorScheme()
      }
    })
  }

  function watchStorageChange () {
    window.addEventListener('storage', (e) => {
      if (e.key === storageKey && e.newValue && colorMode.preference !== e.newValue) {
        colorMode.preference = e.newValue
      }
    })
  }

  watch(() => colorMode.preference, (preference) => {
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

  nuxtApp.hook('app:mounted', () => {
    if (window.localStorage) {
      watchStorageChange()
    }
    if (colorMode.unknown) {
      colorMode.preference = helper.preference
      colorMode.value = helper.value
      colorMode.unknown = false
    }
  })

  nuxtApp.provide('colorMode', colorMode)
})
