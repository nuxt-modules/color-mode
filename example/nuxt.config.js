import colorModeModule from '..'

export default {
  components: true,
  css: [
    '@/assets/main.css'
  ],
  buildModules: [
    '@nuxtjs/svg',
    colorModeModule
  ]
}
