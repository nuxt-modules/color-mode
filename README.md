# @nuxtjs/color-mode

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> 🌑 Dark and 🌕 Light mode with auto detection made easy with NuxtJS

[![nuxt-color-mode](https://user-images.githubusercontent.com/904724/79349768-f09cf080-7f36-11ea-93bb-20fae8c94811.gif)](https://nuxt-color-mode.surge.sh)

<p align="center">
  <a href="https://nuxt-color-mode.surge.sh">Live demo</a>
</p>

[📖 Release Notes](./CHANGELOG.md)

## Features

- Add `.${color}-mode` class to `<html>` for easy CSS theming
- Works with any NuxtJS target (`static` or `server`) and rendering (`universal` and `spa`)
- Auto detect the system [color-mode](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-mode)
- Sync between tabs 🔄
- Supports IE9+ 👴

ℹ️ This module is using a cookie to support server-side rendering, if your visitors are located in Europe, make sure to follow the [EU cookie directive](https://en.wikipedia.org/wiki/HTTP_cookie#EU_cookie_directive)

## Setup

1. Add `@nuxtjs/color-mode` dependency to your project

```bash
yarn add --dev @nuxtjs/color-mode
# OR npm install --save-dev @nuxtjs/color-mode
```

2. Add `@nuxtjs/color-mode` to the `buildModules` section of your `nuxt.config.js`


```js
{
  buildModules: [
    // Simple usage
    '@nuxtjs/color-mode'
  ]
}
```

ℹ️ If you are using `nuxt < 2.9.0`, use `modules` property instead.

3. Start theming your CSS with `.dark-mode` and `.ligh-mode` classes

## Usage

It injects `$colorMode` helper with:
- `preference`: Actual color-mode selected (can be `'system'`), update it to change the user prefered color mode
- `value`: Useful to know what color mode has been detected when `$colorMode === 'system'`, you should not update it
- `unknown`: Useful to know if during SSR or Generate, we need to render a placeholder

```vue
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

You can see a more advanced example in the [example/ directory](./example) or [play online on CodeSandBox](https://codesandbox.io/s/github/nuxt-community/color-mode-module/tree/master/?fontsize=14&hidenavigation=1&theme=dark&file=/example/pages/index.vue).

## Configuration

You can configure the module by providing the `colorMode` property in your `nuxt.config.js`, here are the default options:

```js
colorMode: {
  preference: 'system', // default value of $colorMode.preference
  fallback: 'light', // fallback value if not system preference found
  hid: 'nuxt-color-mode-script',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  cookie: {
    key: 'nuxt-color-mode',
    options: {
      path: nuxt.options.router.base // https://nuxtjs.org/api/configuration-router#base
    }
  }
}
```

Notes:
- `'system'` is a special value, it will automatically detect the color mode based on the system preferences (see [prefers-color-mode spec](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-mode)). The value injected will be either `'light'` or `'dark'`. If `no-preference` is detected or the browser does not handle color-mode, it will set the `fallback` value.
- `cookie` are the options where to store the chosen color mode (to make it work universally), the `cookie.options` are available on the [cookie serialize options](https://www.npmjs.com/package/cookie#options-1) documentation.

## Caveats

If you are doing SSR (`nuxt start` or `nuxt generate`) and if `$colorMode.preference` is set to `'system'`, using `$colorMode` in your Vue template will lead to a flash. This is due to the fact that we cannot know the user preferences when pre-rendering the page since they are detected on client-side.

You have to guard any rendering path which depends on `$colorMode` with `$colorMode.unknown` to render a placeholder or directory use our `<ColorScheme>` component.

***Example:**

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

## TailwindCSS Dark Mode

You can easily integrate this module with [tailwindcss-dark-mode](https://github.com/ChanceArthur/tailwindcss-dark-mode) by just setting `darkSelector: '.dark-mode'`, see [changing the selector documentation](https://github.com/ChanceArthur/tailwindcss-dark-mode#changing-the-selector).

## Contributing

You can contribute to this module online with CodeSandBox:

[![Edit @nuxtjs/tailwindcss](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nuxt-community/color-mode-module/tree/master/?fontsize=14&hidenavigation=1&theme=dark)

Or locally:

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) NuxtJS Team

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/color-mode/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/color-mode

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/color-mode.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/color-mode

[github-actions-ci-src]: https://github.com/nuxt-community/color-mode-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/color-mode-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/color-mode-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/color-mode-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/color-mode.svg
[license-href]: https://npmjs.com/package/@nuxtjs/color-mode
