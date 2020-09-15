export interface ColorModeCookieOptions {
  /**
   * Default: `nuxt-color-mode`
   */
  key: string,
  options: {
    /**
     * Default: `nuxt.options.router.base`
     */
    path: string,
    /**
     * Default: `lax`
     */
    sameSite: string
  }
}

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
  cookie: ColorModeCookieOptions
}

export interface ColorModeInstance {
  preference: string,
  value: string,
  unknown: boolean
}
