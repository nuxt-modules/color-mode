import { preference, hid, script } from '#color-mode-options'
import { defineNuxtPlugin, isVue2, isVue3 } from '#app'
import { useMeta, useState, useRouter } from '#imports'
import { reactive } from 'vue'

import type { ColorModeInstance } from './types'

const addScript = (head) => {
  head.script = head.script || []
  head.script.push({
    hid,
    innerHTML: script,
  })
  const serializeProp = '__dangerouslyDisableSanitizersByTagID'
  head[serializeProp] = head[serializeProp] || {}
  head[serializeProp][hid] = ['innerHTML']
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const colorMode = useState<ColorModeInstance>('color-mode', () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value

  const htmlAttrs = {}

  if (isVue2) {
    const app = nuxtApp.nuxt2Context.app

    if (typeof app.head === 'function') {
      const originalHead = app.head
      app.head = function () {
        const head = originalHead.call(this) || {}
        addScript(head)
        head.htmlAttrs = htmlAttrs
        return head
      }
    } else {
      addScript(app.head)
      app.head.htmlAttrs = htmlAttrs
    }
  }

  if (isVue3) {
    useMeta({
      htmlAttrs,
      script: [{ children: script }]
    })
  }

  useRouter().afterEach((to) => {
    const forcedColorMode = isVue2
      ? (to.matched[0]?.components.default as any)?.options.colorMode
      : to.meta.colorMode

    if (forcedColorMode && forcedColorMode !== 'system') {
      colorMode.value = htmlAttrs['data-color-mode-forced'] = forcedColorMode
      colorMode.forced = true
    } else {
      if (forcedColorMode === 'system') {
        console.warn('You cannot force the colorMode to system at the page level.')
      }
    }
  })

  nuxtApp.provide('colorMode', colorMode)
})
