export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus'],
  modules: ['nuxt-plausible'],
  plausible: {
    domain: 'color-mode.nuxtjs.org'
  }
})
