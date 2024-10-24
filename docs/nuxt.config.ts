// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: '@nuxt/ui-pro',
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/plausible'],
  devtools: { enabled: true },
  compatibilityDate: '2024-09-13',
  uiPro: { license: 'oss' },
})
