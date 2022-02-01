import { preference, script } from '#color-mode-options'
import { defineNuxtPlugin } from '#app'
import { addRouteMiddleware, useMeta } from '#imports'
import { reactive } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Workaround until we have support in vueuse/head
  if ('renderMeta' in nuxtApp.ssrContext) {
    const originalRender = nuxtApp.ssrContext.renderMeta
    nuxtApp.ssrContext.renderMeta = async () => {
      const result = await originalRender()
      result.bodyScripts = `<script>${script}</script>` + (result.bodyScripts || '')
      return result
    }
  }

  const colorMode = reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })

  nuxtApp.payload.state.colorMode = colorMode

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

  return {
    provide: {
      colorMode
    }
  }
})
