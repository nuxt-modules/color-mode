// Add dark / light detection that runs before loading Nuxt

// Global variable minimizers
const w = window
const de = document.documentElement

const knownColorSchemes = ['dark', 'light']

const preference = window.localStorage.getItem('<%= options.storageKey %>') || getCookie('<%= options.storageKey %>') || '<%= options.preference %>'
let value = preference === 'system' ? getColorScheme() : preference
// Applied forced color mode
const forcedColorMode = de.getAttribute('data-color-mode-forced')
if (forcedColorMode) {
  value = forcedColorMode
}

addColorScheme(value)

// @ts-ignore
w['<%= options.globalName %>'] = {
  preference,
  value,
  getColorScheme,
  addColorScheme,
  removeColorScheme
}

// @ts-ignore
function addColorScheme (value) {
  const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
  const dataValue = '<%= options.dataValue %>'
  if (de.classList) {
    de.classList.add(className)
  } else {
    de.className += ' ' + className
  }
  if (dataValue) {
    de.setAttribute('data-' + dataValue, value)
  }
}

// @ts-ignore
function removeColorScheme (value) {
  const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
  const dataValue = '<%= options.dataValue %>'
  if (de.classList) {
    de.classList.remove(className)
  } else {
    de.className = de.className.replace(new RegExp(className, 'g'), '')
  }
  if (dataValue) {
    de.removeAttribute('data-' + dataValue)
  }
}

// @ts-ignore
function prefersColorScheme (suffix) {
  return w.matchMedia('(prefers-color-scheme' + suffix + ')')
}

function getColorScheme () {
  // @ts-ignore
  if (w.matchMedia && prefersColorScheme('').media !== 'not all') {
    for (const colorScheme of knownColorSchemes) {
      if (prefersColorScheme(':' + colorScheme).matches) {
        return colorScheme
      }
    }
  }

  return '<%= options.fallback %>'
}

// @ts-ignore
function getCookie (name) {
  const value = '; ' + window.document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) { return parts.pop().split(';').shift() }
}
