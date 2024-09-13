// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-13',
  extends: '@nuxt/ui-pro',
  modules: ['@nuxt/ui', '@nuxt/content'],
  uiPro: { license: 'oss' },
  devtools: { enabled: true },
})
