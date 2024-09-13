// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: '@nuxt/ui-pro',
  modules: ['@nuxt/ui', '@nuxt/content'],
  compatibilityDate: '2024-09-13',
})
