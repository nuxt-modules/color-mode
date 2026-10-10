import { defineNuxtPlugin, useHead } from '#imports'
import { script } from '#build/color-mode-options.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.ssrContext?.islandContext) {
    return
  }
  useHead({
    script: [{ innerHTML: script, tagPriority: 'low' }],
  })
})
