// @ts-check
/**
 * @typedef {'dark' | 'light'} KnownColorScheme
 * @typedef {import('./module').ModuleOptions} ModuleOptions
 * @typedef {`<%= options.${keyof ModuleOptions} %>`} TemplateTag
 */

// Add dark / light detection that runs before loading Nuxt
(() => {
  // Global variable minimizers
  /** @type {typeof window & { ['<%= options.globalName %>']?: any }} */
  const w = window
  const de = document.documentElement
  const ls = window.localStorage

  /** @type {KnownColorScheme[]} */
  const knownColorSchemes = ['dark', 'light']

  const localPreference = /** @type {KnownColorScheme | 'system' | null} */ (ls && ls.getItem && ls.getItem('<%= options.storageKey %>'))
  const preference = localPreference || '<%= options.preference %>'
  let value = /** @type {Exclude<typeof preference, 'system'>} */ (preference === 'system' ? getColorScheme() : preference)
  // Applied forced color mode
  const forcedColorMode = /** @type {KnownColorScheme | null} */ (de.getAttribute('data-color-mode-forced'))
  if (forcedColorMode) {
    value = forcedColorMode
  }

  addColorScheme(value)

  w['<%= options.globalName %>'] = {
    preference,
    value,
    getColorScheme,
    addColorScheme,
    removeColorScheme
  }

  /** @param {KnownColorScheme | Extract<TemplateTag, '<%= options.preference %>' | '<%= options.fallback %>'>} value */
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

  /** @param {KnownColorScheme} value */
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

  /** @param {`:${KnownColorScheme}` | ''} suffix */
  function prefersColorScheme (suffix) {
    return w.matchMedia('(prefers-color-scheme' + suffix + ')')
  }

  function getColorScheme () {
    if (
      // @ts-expect-error TS assumes matchMedia is always defined
      w.matchMedia &&
      prefersColorScheme('').media !== 'not all') {
      for (const colorScheme of knownColorSchemes) {
        if (prefersColorScheme(`:${colorScheme}`).matches) {
          return colorScheme
        }
      }
    }

    return '<%= options.fallback %>'
  }
})()
