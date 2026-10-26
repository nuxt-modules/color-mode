import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if ('__holdHydration' in window) {
    Object.assign(window, { __resumeHydration: nuxtApp.deferHydration() })
  }
})
