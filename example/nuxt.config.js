import colorModeModule from '..'

export default {
  target: 'static',
  components: true,
  css: [
    '@/assets/main.css'
  ],
  buildModules: [
    '@nuxtjs/svg',
    colorModeModule
  ]
}
