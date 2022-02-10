import { preference, hid, script } from '#color-mode-options'
import { defineNuxtPlugin, isVue2, isVue3 } from '#app'
import { addRouteMiddleware, useMeta, useState, useRoute } from '#imports'
import { reactive } from 'vue'

import type { ColorModeInstance } from './types'

const metaScript = {
  hid,
  innerHTML: script,
  pbody: true
}

const addScript = (head) => {
  head.script = head.script || []
  head.script.push(metaScript)
  const serializeProp = '__dangerouslyDisableSanitizersByTagID'
  head[serializeProp] = head[serializeProp] || {}
  head[serializeProp][hid] = ['innerHTML']
}

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState<ColorModeInstance>('color-mode', () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value

  if (isVue2) {
    const route = useRoute()
    const app = nuxtApp.nuxt2Context.app

    if (typeof app.head === 'function') {
      const originalHead = app.head
      app.head = function () {
        const head = originalHead.call(this) || {}
        addScript(head)
        return head
      }
    } else {
      addScript(app.head)
    }

    if (route.matched[0]) {
      const pageColorMode = route.matched[0].components.default.options.colorMode
      if (pageColorMode && pageColorMode !== 'system') {
        colorMode.value = pageColorMode
        colorMode.forced = true

        app.head.bodyAttrs = app.head.bodyAttrs || {}
        app.head.bodyAttrs['data-color-mode-forced'] = pageColorMode
      } else if (pageColorMode === 'system') {
        console.warn('You cannot force the colorMode to system at the page level.')
      }
    }
  }

  // Workaround until we have support in vueuse/head
  if ('renderMeta' in nuxtApp.ssrContext) {
    console.log('rendering meta')
    const originalRender = nuxtApp.ssrContext.renderMeta
    nuxtApp.ssrContext.renderMeta = async () => {
      const result = await originalRender()
      result.bodyScripts = `<script>${script}</script>` + (result.bodyScripts || '')
      return result
    }
  }

  if (isVue3) {
    addRouteMiddleware('color-mode', (to, from) => {
      const forcedColorMode = to.meta.colorMode

      if (forcedColorMode && forcedColorMode !== 'system') {
        colorMode.value = forcedColorMode
        colorMode.forced = true

        useMeta({
          bodyAttrs: {
            'data-color-mode-forced': forcedColorMode
          }
        })
      } else {
        if (forcedColorMode === 'system') {
          console.warn('You cannot force the colorMode to system at the page level.')
        }
      }
    }, { global: true })
  }

  nuxtApp.provide('colorMode', colorMode)
})
