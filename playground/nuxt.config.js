import { defineNuxtConfig } from 'nuxt'
import colorModeModule from '..'

export default defineNuxtConfig({
  components: { global: true },
  css: ['~/assets/main.css'],
  modules: [colorModeModule]
})
