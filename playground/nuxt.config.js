import colorModeModule from '../src/module'

export default defineNuxtConfig({
  components: { global: true, dirs: ['~/components'] },
  css: ['~/assets/main.css'],
  modules: [colorModeModule],
})
