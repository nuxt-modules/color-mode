import Vue from 'vue'
import colorSchemeComponent from './color-scheme'

Vue.component('<%= options.componentName %>', colorSchemeComponent)

const storageKey = '<%= options.storageKey %>'
const colorMode = window['<%= options.globalName %>']
const getForcedColorMode = route => route.matched[0] && route.matched[0].components.default.options.colorMode

export default function (ctx, inject) {
  let data = ctx.nuxtState ? ctx.nuxtState.colorMode : null
  // For SPA mode or fallback
  if (!data) {
    data = {
      preference: colorMode.preference,
      value: colorMode.value,
      unknown: false
    }
    const pageColorMode = getForcedColorMode(ctx.route)
    if (pageColorMode) {
      data.value = pageColorMode
      data.forced = true
      colorMode.addClass(pageColorMode)
    }
  }
  // Get current page component
  const $colorMode = new Vue({
    data,
    watch: {
      preference (preference) {
        if (this.forced) {
          return
        }
        if (preference === 'system') {
          this.value = colorMode.getColorScheme()
          this._watchMedia()
        } else {
          this.value = preference
        }

        this._storePreference(preference)
      },
      value (newValue, oldValue) {
        colorMode.removeClass(oldValue)
        colorMode.addClass(newValue)
      }
    },
    created () {
      if (this.preference === 'system') {
        this._watchMedia()
      }
    },
    mounted () {
      if (window.localStorage) {
        this._watchStorageChange()
      }
    },
    methods: {
      _watchMedia () {
        if (this._darkWatcher || !window.matchMedia) {
          return
        }

        this._darkWatcher = window.matchMedia('(prefers-color-scheme: dark)')
        this._darkWatcher.addListener((e) => {
          if (!this.forced && this.preference === 'system') {
            this.value = colorMode.getColorScheme()
          }
        })
      },
      _watchStorageChange () {
        window.addEventListener('storage', (e) => {
          if (e.key === storageKey) {
            this.preference = e.newValue
          }
        })
      },
      _storePreference (preference) {
        // Local storage to sync with other tabs
        window.localStorage.setItem(storageKey, preference)
      }
    }
  })

  window.onNuxtReady(() => {
    if ($colorMode.unknown) {
      $colorMode.preference = colorMode.preference
      $colorMode.value = colorMode.value
      $colorMode.unknown = false
    }
    ctx.app.router.beforeEach((route, from, next) => {
      const forcedColorMode = getForcedColorMode(route)

      if (forcedColorMode && forcedColorMode !== 'system') {
        $colorMode.value = forcedColorMode
        $colorMode.forced = true
      } else {
        if (forcedColorMode === 'system') {
          console.warn('You cannot force the colorMode to system at the page level.')
        }
        $colorMode.forced = false
        $colorMode.value = $colorMode.preference === 'system' ? colorMode.getColorScheme() : $colorMode.preference
      }
      next()
    })
  })
  inject('colorMode', $colorMode)
}
