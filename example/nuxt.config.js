import { resolve } from 'path'
import colorModeModule from '..'

export default {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  css: ['@/assets/main.css'],
  modules: [
    '@nuxtjs/svg',
    colorModeModule
  ]
}
