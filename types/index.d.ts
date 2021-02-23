import { ColorModeConfig, ColorModeInstance } from "./color-mode";

declare module '@nuxt/types/config/index' {
  interface NuxtOptions {
    colorMode: ColorModeConfig
  }
}

declare module '@nuxt/vue-app' {
  interface Context {
    $colorMode: ColorModeInstance
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $colorMode: ColorModeInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $colorMode: ColorModeInstance
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    /**
     * Forces a color mode for current page
     * @see https://color-mode.nuxtjs.org/#force-a-color-mode
     */
    colorMode?: string
  }
}


