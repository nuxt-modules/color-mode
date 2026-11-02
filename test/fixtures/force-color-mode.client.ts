import { addRouteMiddleware, defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  addRouteMiddleware('test-force-color-mode', (to) => {
    const mode = to.query.testColorMode
    if (to.path === '/' && (mode === 'light' || mode === 'dark')) {
      to.meta.colorMode = mode
    }
  }, { global: true })
})
