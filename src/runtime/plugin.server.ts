import { reactive, ref } from 'vue'

import type { ColorModeInstance } from './types'
import { defineNuxtPlugin, useHead, useState, useRouter, useCookie } from '#imports'
import { preference, dataValue, storage, storageKey } from '#build/color-mode-options.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext
    ? ref<Partial<ColorModeInstance>>({}).value
    : useState<ColorModeInstance>('color-mode', () => reactive({
      preference,
      value: preference,
      unknown: true,
      forced: false,
    })).value

  const htmlAttrs: Record<string, string> = {}

  if (storage === 'cookie') {
    const cookie = useCookie(storageKey)
    if (cookie.value) {
      colorMode.preference = cookie.value
    }
  }
  useHead({ htmlAttrs })

  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode

    if (forcedColorMode && forcedColorMode !== 'system') {
      htmlAttrs['data-color-mode-forced'] = forcedColorMode
      // @ts-expect-error readonly property
      colorMode.value = forcedColorMode
      if (dataValue) {
        htmlAttrs[`data-${dataValue}`] = colorMode.value
      }
      colorMode.forced = true
    }
    else if (forcedColorMode === 'system') {
      console.warn('You cannot force the colorMode to system at the page level.')
    }
  })

  nuxtApp.provide('colorMode', colorMode)
})
