---
title: 'Documentation'
description: 'Dark and Light mode with auto detection made easy with Nuxt 🌗'
category: 'Home'
csb_link: https://codesandbox.io/embed/github/nuxt-community/color-mode-module/tree/master/?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fplayground%2Fpages%2Findex.vue&theme=dark&view=preview
---

## Features

- Nuxt 3 and Nuxt Bridge support
- Add `.${color}-mode` class to `<html>` for easy CSS theming
- Force a page to a specific color mode (perfect for incremental development)
- Works with client-side and universal rendering
- Auto detect system [color-mode](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-mode)
- Sync dark mode across tabs and windows 🔄
- Supports IE9+ 👴

## Live demo

<a href="https://color-mode.nuxtjs.app"><img src="https://user-images.githubusercontent.com/904724/79349768-f09cf080-7f36-11ea-93bb-20fae8c94811.gif" alt="Nuxt color mode demo" class="border-r border-b border-black" /></a>

Checkout the <a href="https://color-mode.nuxtjs.app">online demo</a>.

## Setup

<alert>

`@nuxtjs/color-mode` version 3 supports Nuxt Bridge and Nuxt 3 only. For use in Nuxt 2 (without Bridge), make sure to install version 2.

</alert>

Add `@nuxtjs/color-mode` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add --dev @nuxtjs/color-mode
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install --save-dev @nuxtjs/color-mode
  ```

  </code-block>
</code-group>

Then, add `@nuxtjs/color-mode` to the `modules` section of your `nuxt.config.js`

```js{}[nuxt.config.js]
{
  modules: [
    '@nuxtjs/color-mode'
  ]
}
```

You are ready to start theming your CSS with `.dark-mode` and `.light-mode` classes ✨

## Usage

It injects a `$colorMode` helper with:
- `preference`: Actual color-mode selected (can be `'system'`), update it to change the user preferred color mode
- `value`: Useful to know what color mode has been detected when `$colorMode === 'system'`, you should not update it
- `unknown`: Useful to know if during SSR or Generate, we need to render a placeholder
- `forced`: Useful to know if the current color mode is forced by the current page (useful to hide the color picker)

```html
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

```html{}[pages/light.vue]
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

<alert>

We recommend to hide or disable the color mode picker on the page since it won't be able to change the current page color mode, using `$colorMode.forced` value.

</alert>

## Example

You can see a more advanced example in the [playground/ directory](https://github.com/nuxt-community/color-mode-module/tree/master/playground) or play online with the CodeSandBox below:

<code-sandbox :src="csb_link"></code-sandbox>

## Configuration

You can configure the module by providing the `colorMode` property in your `nuxt.config.js`; here are the default options:

```js
colorMode: {
  preference: 'system', // default value of $colorMode.preference
  fallback: 'light', // fallback value if not system preference found
  hid: 'nuxt-color-mode-script',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  classPrefix: '',
  classSuffix: '-mode',
  storageKey: 'nuxt-color-mode'
}
```

Notes:
- `'system'` is a special value; it will automatically detect the color mode based on the system preferences (see [prefers-color-mode spec](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-mode)). The value injected will be either `'light'` or `'dark'`. If `no-preference` is detected or the browser does not handle color-mode, it will set the `fallback` value.

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

## TailwindCSS

### Tailwind v2

Tailwind v2 introduced [dark mode](https://tailwindcss.com/docs/dark-mode), in order to work with `@nuxtjs/color-mode`, you need to set `darkMode: 'class'` in your `tailwind.config.js`:

```js{}[tailwind.config.js]
module.exports = {
  darkMode: 'class'
}
```

Then in your `nuxt.config.js`, set the `classSuffix` option to an empty string:

```js{}[nuxt.config.js]
export default {
  colorMode: {
    classSuffix: ''
  }
}
```

Checkout the [live example on CodeSandBox](https://codesandbox.io/s/nuxt-dark-tailwindcss-vxfuj).

### Tailwind Dark Mode Plugin

You can easily integrate this module with [tailwindcss-dark-mode](https://github.com/ChanceArthur/tailwindcss-dark-mode) by just setting `darkSelector: '.dark-mode'`, see [changing the selector documentation](https://github.com/ChanceArthur/tailwindcss-dark-mode#changing-the-selector).

```js
// tailwind.config.js
module.exports = {
  theme: {
    darkSelector: '.dark-mode'
  },
  variants: {
    backgroundColor: ["dark", "dark-hover", "dark-group-hover", "dark-even", "dark-odd", "hover", "responsive"],
    borderColor: ["dark", "dark-focus", "dark-focus-within", "hover", "responsive"],
    textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"]
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ]
}
```

Checkout a [live example on CodeSandBox](https://codesandbox.io/s/nuxt-dark-tailwindcss-17g2j?file=/pages/index.vue) as well as [@nuxtjs/tailwindcss](https://github.com/nuxt-community/tailwindcss-module) module.

## Contributing

You can contribute to this module online with CodeSandBox:

[![Edit @nuxtjs/color-mode](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nuxt-community/color-mode-module/tree/master/?fontsize=14&hidenavigation=1&theme=dark)

Or locally:

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](https://github.com/nuxt-community/color-mode-module/blob/master/LICENSE)

Copyright (c) Nuxt Team
