// Add dark / light detection that runs before loading Nuxt.js

// Global variable minimizers
const w = window
const d = document
const de = d.documentElement

const knownColorSchemes = ['dark', 'light']

const preference = getCookie('<%= options.cookie.key %>') || '<%= options.preference %>'
const value = preference === 'system' ? getColorScheme() : preference

addClass(value)

w['<%= options.globalName %>'] = {
  preference,
  value,
  getColorScheme,
  addClass,
  removeClass
}

function getCookie (name) {
  const nameEQ = name + '='
  const cookies = d.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }
  return null
}

function addClass (value) {
  const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
  if (de.classList) {
    de.classList.add(className)
  } else {
    de.className += ' ' + className
  }
}

function removeClass (value) {
  const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
  if (de.classList) {
    de.classList.remove(className)
  } else {
    de.className = de.className.replace(new RegExp(className, 'g'), '')
  }
}

function prefersColorScheme (suffix) {
  return w.matchMedia('(prefers-color-scheme' + suffix + ')')
}

function getColorScheme () {
  if (w.matchMedia && prefersColorScheme('').media !== 'not all') {
    for (const colorScheme of knownColorSchemes) {
      if (prefersColorScheme(':' + colorScheme).matches) {
        return colorScheme
      }
    }
  }

  return '<%= options.fallback %>'
}
