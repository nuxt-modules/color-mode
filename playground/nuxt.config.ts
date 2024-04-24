export default defineNuxtConfig({
  components: { global: true, dirs: ['~/components'] },
  css: ['~/assets/main.css'],
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  colorMode: {
    storage: 'cookie'
  }
})
