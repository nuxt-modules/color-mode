import { ColorModeOptions, ColorModeInstance } from "./color-mode";

declare module '@nuxt/types/config/index' {
  interface NuxtOptions {
    colorMode: ColorModeOptions
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
