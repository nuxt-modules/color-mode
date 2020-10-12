import Vue from 'vue'
import colorSchemeComponent from './color-scheme'

Vue.component('<%= options.componentName %>', colorSchemeComponent)

const storageKey = '<%= options.storageKey %>'
const colorMode = window['<%= options.globalName %>']

export default function (ctx, inject) {
  let data = ctx.nuxtState.colorMode
  // For SPA mode or fallback
  if (!data) {
    data = {
      preference: colorMode.preference,
      value: colorMode.value,
      unknown: colorMode.preference === 'system'
    }
  }
  const $colorMode = new Vue({
    data,
    watch: {
      preference (preference) {
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
      if (window.localStorage) {
        this._watchStorageChange()
      }
    },
    methods: {
      _watchMedia () {
        if (this._mediaWatcher || !window.matchMedia) {
          return
        }

        this._darkWatcher = window.matchMedia('(prefers-color-scheme: dark)')
        this._darkWatcher.addListener((e) => {
          if (this.preference === 'system') {
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

  if ($colorMode.unknown) {
    window.onNuxtReady(() => {
      $colorMode.preference = colorMode.preference
      $colorMode.value = colorMode.value
      $colorMode.unknown = false
    })
  }
  inject('colorMode', $colorMode)
}
