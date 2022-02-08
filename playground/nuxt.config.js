import { defineNuxtConfig } from 'nuxt'
import colorModeModule from '..'

export default defineNuxtConfig({
  components: { global: true, dirs: ['~/components'] },
  css: ['~/assets/main.css'],
  modules: [colorModeModule],
  colorMode: {
    themeColors: {
      dark: '#091a28',
      light: '#f3f5f4',
      sepia: '#f1e7d0'
    }
  }
})
