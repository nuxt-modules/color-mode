// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/plausible'],
  devtools: { enabled: true },
  site: {
    name: 'Nuxt Color Mode',
  },
  compatibilityDate: '2024-09-13',
  llms: {
    domain: 'https://color-mode.nuxtjs.org',
  },
})
