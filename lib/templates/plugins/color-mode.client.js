import Vue from 'vue'
import { parse, serialize } from 'cookie'

const options = <%= JSON.stringify(options) %>
const wColorMode = window.__NUXT_COLOR_MODE__

export default function (ctx, inject) {
  const colorMode = new Vue({
    data: {
      preference: wColorMode.preference,
      value: wColorMode.value
    },
    watch: {
      preference (preference) {
        if (preference === 'system') {
          this.value = wColorMode.getColorScheme()
          this._watchMedia()
        } else {
          this.value = preference
        }
        document.cookie = serialize(options.cookie.key, this.preference, options.cookie.options)
        // Tell others tabs to update the preference
        window.localStorage && window.localStorage.setItem(options.cookie.key, preference)
      },
      value (newValue, oldValue) {
        wColorMode.removeClass(oldValue)
        wColorMode.addClass(newValue)
      }
    },
    created () {
      if (this.preference === 'system') {
        this._watchMedia()
      }
      window.localStorage && this._watchCookieChange()
    },
    methods: {
      _watchMedia () {
        if (this._mediaWatcher || !window.matchMedia) return
        this._darkWatcher = window.matchMedia('(prefers-color-scheme: dark)')
        this._darkWatcher.addListener((e) => {
          if (this.preference === 'system') {
            this.value = wColorMode.getColorScheme()
          }
        })
      },
      _watchCookieChange () {
        window.addEventListener('storage', (e) => {
          if (e.key === options.cookie.key) {
            this.preference = e.newValue
          }
        })
      }
    }
  })

  inject('colorMode', colorMode)
}
