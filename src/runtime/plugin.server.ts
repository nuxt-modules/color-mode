import { reactive, ref } from 'vue'
import { parse as cookieParse } from 'cookie'

import type { ColorModeInstance } from './types'
import { defineNuxtPlugin, useHead, useState, useRouter, useRequestHeaders } from '#imports'
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
    const { cookie } = useRequestHeaders(['cookie'])
    // Previously parsed with s.split('='), which breaks for cookie values that contain
    // '=' (e.g. base64 padding): "key=abc==" would yield ["key","abc","",""] and only
    // "abc" would be captured. We now use the `cookie` npm package which splits on the
    // first '=' only and is RFC 6265 compliant.
    // cookie.parse() drops bare tokens (no '='), so normalise them to "key=" first
    // to preserve the same behaviour as a naive split-on-first-'=' parser would give.
    const normalized = cookie?.split('; ').map(s => s.includes('=') ? s : `${s}=`).join('; ')
    const value = normalized ? cookieParse(normalized)[storageKey] : undefined
    if (value) {
      colorMode.preference = value
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
