// @ts-check

// Add dark / light detection that runs before loading Nuxt
(() => {
  // Global variable minimizers
  const w = window
  const de = document.documentElement

  const knownColorSchemes = ['dark', 'light']

  const preference = getStorageValue('<%= options.storage %>', '<%= options.storageKey %>') || '<%= options.preference %>'
  let value = preference === 'system' ? getColorScheme() : preference
  // Applied forced color mode
  const forcedColorMode = de.getAttribute('data-color-mode-forced')
  if (forcedColorMode) {
    value = forcedColorMode
  }

  addColorScheme(value)

  // @ts-expect-error global name is not of correct type
  w['<%= options.globalName %>'] = {
    preference,
    value,
    getColorScheme,
    addColorScheme,
    removeColorScheme,
  }

  /** @param {string} value */
  function addColorScheme(value) {
    const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
    const dataValue = '<%= options.dataValue %>'
    if (de.classList) {
      de.classList.add(className)
    }
    else {
      de.className += ' ' + className
    }
    if (dataValue) {
      de.setAttribute('data-' + dataValue, value)
    }
  }

  /** @param {string} value */
  function removeColorScheme(value) {
    const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
    const dataValue = '<%= options.dataValue %>'
    if (de.classList) {
      de.classList.remove(className)
    }
    else {
      de.className = de.className.replace(new RegExp(className, 'g'), '')
    }
    if (dataValue) {
      de.removeAttribute('data-' + dataValue)
    }
  }

  /** @param {string} suffix */
  function prefersColorScheme(suffix) {
    return w.matchMedia('(prefers-color-scheme' + suffix + ')')
  }

  function getColorScheme() {
    if (
      // @ts-expect-error TS assumes matchMedia is always defined
      w.matchMedia
      && prefersColorScheme('').media !== 'not all') {
      for (const colorScheme of knownColorSchemes) {
        if (prefersColorScheme(':' + colorScheme).matches) {
          return colorScheme
        }
      }
    }

    return '<%= options.fallback %>'
  }
})()

// @ts-ignore
function getStorageValue(storageType, storageKey) {
  switch (storageType) {
    case 'localStorage':
      try {
        return window.localStorage.getItem(storageKey)
      } catch (e) {
        // console.log('Problem accessing localStorage. Browser may have disabled it.', e)
      }
    case 'sessionStorage':
      try {
        return window.sessionStorage.getItem(storageKey)
      } catch (e) {
        // console.log('Problem accessing sessionStorage. Browser may have disabled it.', e)
      }
    case 'cookie':
      try {
        return getCookie(storageKey)
      } catch (e) {
        // console.log('Problem accessing cookie storage. Browser may have disabled it.', e)
      }
    default:
      return null
  }
}

// @ts-ignore
function getCookie(name) {
  const value = '; ' + window.document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    const part = parts.pop()
    if (!part) {
      return null
    }
    return part.split(';').shift()
  }
}
