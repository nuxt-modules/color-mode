---
title: Nuxt Color Mode
description: Dark and Light mode with auto detection made easy with Nuxt 🌗
---

## Features

- Nuxt 3 and Nuxt Bridge support
- Add `.${color}-mode` class to `<html>` for easy CSS theming
- Force a page to a specific color mode (perfect for incremental development)
- Works with client-side and universal rendering
- Works out of the box with [@nuxtjs/tailwindcss](https://github.com/nuxt-modules/tailwindcss)
- Auto detect system [color-mode](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-mode)
- Supports IE9+ 👴

## Live demo

[![Nuxt color mode demo](https://user-images.githubusercontent.com/904724/79349768-f09cf080-7f36-11ea-93bb-20fae8c94811.gif){.border-b .border-r}](https://color-mode.nuxt.dev/)

Checkout the [online demo](https://color-mode.nuxt.dev/) and [source code](https://github.com/nuxt-modules/color-mode/tree/main/playground).

## Setup

::callout
The current version of `@nuxtjs/color-mode` is compatible with [Nuxt 3 and Nuxt Bridge](https://nuxt.com). :br If you're looking for the previous version of this module, check out [v2.color-mode.nuxtjs.org](https://v2.color-mode.nuxtjs.org/), or [read more about the differences](#migrating-to-v3).
::

Add `@nuxtjs/color-mode` dependency to your project:

```bash
npx nuxi module add color-mode
```

Then, add `@nuxtjs/color-mode` to the `modules` section of your `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode'
  ]
})
```

You are ready to start theming your CSS with `.dark-mode` and `.light-mode` classes ✨

## Usage

You can access the color mode helper by either calling `useColorMode()` or accessing `$colorMode` directly in your template. This helper has the following properties:

- `preference`: Actual color-mode selected (can be `'system'`), update it to change the user preferred color mode
- `value`: Useful to know what color mode has been detected when `$colorMode === 'system'`, you should not update it
- `unknown`: Useful to know if during SSR or Generate, we need to render a placeholder
- `forced`: Useful to know if the current color mode is forced by the current page (useful to hide the color picker)

```html [pages/index.vue]
<template>
  <div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>

<script setup>
const colorMode = useColorMode()

console.log(colorMode.preference)
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
```

## Force a color mode

You can force the color mode at the page level (only parent) by setting the `colorMode` property:

```html [pages/light.vue]
<template>
  <h1>This page is forced with light mode</h1>
</template>

<script>
// For Nuxt Bridge
export default {
  colorMode: 'light',
}
// For Nuxt 3
definePageMeta({
  colorMode: 'light',
})
</script>
```

This feature is perfect for implementing dark mode to a website incrementally by setting the not-ready pages to `colorMode: 'light'`.

::callout
We recommend to hide or disable the color mode picker on the page since it won't be able to change the current page color mode, using `$colorMode.forced` value.
::

## Configuration

You can configure the module by providing the `colorMode` property in your `nuxt.config.js`; here are the default options:

```js{}[nuxt.config.js]
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  }
})
```

Notes:
- `'system'` is a special value; it will automatically detect the color mode based on the system preferences (see [prefers-color-mode spec](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-mode)). The value injected will be either `'light'` or `'dark'`. If `no-preference` is detected or the browser does not handle color-mode, it will set the `fallback` value.
- Optional `dataValue` lets you add dataset to the `html`, for example if you currently have `class="dark"` on `html`, `dataValue: 'theme'` will also set `data-theme="dark"` on `html`. This is useful when using library like daisyUI that uses `data-theme="light"` on `html` to apply theme.

## Caveats

When `$colorMode.preference` is set to `'system'`, using `$colorMode` in your Vue template will lead to a flash. This is due to the fact that we cannot know the user preferences when pre-rendering the page since they are detected on client-side.

To avoid the flash, you have to guard any rendering path which depends on `$colorMode` with `$colorMode.unknown` to render a placeholder or use our `<ColorScheme>` component.

**Example:**

```vue
<template>
  <ColorScheme placeholder="..." tag="span">
    Color mode: <b>{{ $colorMode.preference }}</b>
    <span v-if="$colorMode.preference === 'system'">(<i>{{ $colorMode.value }}</i> mode detected)</span>
  </ColorScheme>
</template>
```

Props:
- `placeholder`: `String`
- `tag`: `String`,  default: `'span'`

Slots:
- `placeholder`: used to render as placeholder, similar to the `placeholder` prop

## Migrating to v3

v3 of `@nuxtjs/color-mode` requires either Nuxt Bridge or Nuxt 3. (If you are using Nuxt 2 without Bridge, you should continue to use v2.)

1. The main change between Nuxt 2 -> Nuxt 3 is that you will define your color mode at the page level with `definePageMeta`:

```diff
<template>
  <h1>This page is forced with light mode</h1>
</template>

- <script>
- export default {
-   colorMode: 'light',
- }
+ <script setup>
+ definePageMeta({
+   colorMode: 'light',
+ })
</script>
```

⚠️ If you are using Nuxt Bridge, you should not use `definePageMeta` but instead continue using the component option `colorMode`.

2. The `$colorMode` helper remains the same, but there is also a new composable (`useColorMode`) which is the recommended way of accessing color mode information.

3. If you were directly importing color mode configuration types, note that this has been renamed to `ModuleOptions`.

## Contributing

1. Clone this repository
2. Install dependencies using `pnpm install`
3. Start development server using `pnpm dev`

## License

[MIT License](https://github.com/nuxt-modules/color-mode/blob/main/LICENSE)

