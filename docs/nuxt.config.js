import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#00CD82'
  },
  buildModules: ['vue-plausible'],
  plausible: {
    domain: 'color-mode.nuxtjs.org'
  }
})
