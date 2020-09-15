import theme from '@nuxt/content-theme-docs'

export default theme({
  buildModules: ['nuxt-ackee'],
  loading: { color: '#00DC82' },
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: 'f52f02b3-20f1-49a0-8342-b2112b91405b',
    detailed: true
  }
})
