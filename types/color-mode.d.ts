import Vue from 'vue'

export interface ColorModeOptions {
  /**
   * Default: `system`
   */
  preference: string, // default value of $colorMode.preference
  /**
   * Default: `light`
   */
  fallback: string, // fallback value if not system preference found
  /**
   * Default: `nuxt-color-mode-script`
   */
  hid: string,
  /**
   * Default: `__NUXT_COLOR_MODE__`
   */
  globalName: string,
  /**
   * Default: `ColorScheme`
   */
  componentName: string,
  /**
   * Default: ''
   */
  classPrefix: string,
  /**
   * Default: '-mode'
   */
  classSuffix: string,
  /**
   * Default: 'nuxt-color-mode'
   */
  storageKey: string
}

export interface ColorModeInstance extends Vue {
  preference: string,
  value: string,
  unknown: boolean,
  forced: boolean
}

export type ColorModeConfig = Partial<ColorModeOptions>;
