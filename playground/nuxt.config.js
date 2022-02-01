import { defineNuxtConfig } from 'nuxt3'
import colorModeModule from '..'

export default defineNuxtConfig({
  css: ['~/assets/main.css'],
  buildModules: [colorModeModule]
})
