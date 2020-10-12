import Vue from 'vue'
import colorSchemeComponent from './color-scheme'

Vue.component('<%= options.componentName %>', colorSchemeComponent)

export default function (ctx, inject) {
  const preference = '<%= options.preference %>'

  const colorMode = {
    preference,
    value: preference,
    unknown: preference === 'system'
  }

  ctx.beforeNuxtRender(({ nuxtState }) => {
    nuxtState.colorMode = colorMode
  })

  inject('colorMode', colorMode)
}
