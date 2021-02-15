import { withDocus } from 'docus'

export default withDocus({
  docus: {
    colors: {
      primary: '#00CD82'
    }
  },
  buildModules: ['vue-plausible'],
  plausible: {
    domain: 'color-mode.nuxtjs.org'
  }
})
