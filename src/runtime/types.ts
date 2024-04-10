/* eslint-disable @typescript-eslint/no-unused-vars */
export interface ColorModeInstance {
  preference: string
  value: string
  unknown: boolean
  forced: boolean
}

// @ts-expect-error vue 2 types
declare module 'vue/types/vue' {
  interface Vue {
    $colorMode: ColorModeInstance
  }
}

// @ts-expect-error vue 2 types
declare module 'vue/types/options' {
  interface ComponentOptions<V> {
    /**
     * Forces a color mode for current page
     * @see https://color-mode.nuxtjs.org/#force-a-color-mode
     */
    colorMode?: string
  }
}

// Nuxt Bridge & Nuxt 3
declare module '#app' {
  interface NuxtApp extends PluginInjection { }
}

// Nuxt 3
declare module 'vue-router' {
  interface RouteMeta {
    colorMode?: string
  }
}

interface PluginInjection {
  $colorMode: ColorModeInstance
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection { }
}
