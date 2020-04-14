# @nuxtjs/color-mode

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> 🌑 Dark and 🌕 Light modes made easy with NuxtJS

[📖 **Release Notes**](./CHANGELOG.md)

## NOT WORKING, module in progress 🏗

## Features

- Detect the system [color-scheme](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-scheme)
- Add `.${color}-mode` class to `<html>` for easy CSS theming
- Works with any NuxtJS target (`static` or `server`) or rendering (`universal` and `spa`)

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


## Usage

It injects:
- `$colorMode`: actual color-mode selected (can be `'system'`), update it directly to change the user prefered color mode
- `$colorModeValue`: read-only value, useful to know what color mode has been detected when `$colorMode === 'system'`

```vue
<template>
  <div>
    <h1>Color mode: {{ $colorModeValue }}</h1>
    <select v-model="$colorMode">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>

<style>
/* TODO */
</style>
```

## Configuration

You can configure the module by providing the `colorMode` property in your `nuxt.config.js`:

```js
colorMode: {
  default: 'system',
  fallback: 'light',
  cookie: {
    key: 'nuxt-color-mode',
    options: {
      path: '/'
    }
  }
}
```

Notes:
- `'system'` is a special value, it will automatically detect the color mode based on the system preferences (see [prefers-color-scheme spec](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-scheme)). The value injected will be either `'light'` or `'dark'`. If `no-preference` is detected or the browser does not handle color-scheme, it will set the `fallback` value.
- `cookie` are the options where to store the chosen color mode (to make it work universally), the `cookie.options` are available on the [cookie serialize options](https://www.npmjs.com/package/cookie#options-1) documentation.

## Caveats

With `nuxt generate` and using `$colorMode` (or `$colorModeValue`) in your Vue template, you may expect a flash. This is due to the fact that we cannot know the user preferences pre-rendering the page, so it will be directly the `fallback` value (or `default` if !== `'system'`).

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) NuxtJS Team

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/color-scheme/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/color-scheme

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/color-scheme.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/color-scheme

[github-actions-ci-src]: https://github.com/nuxt-community/color-scheme-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/color-scheme-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/color-scheme-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/color-scheme-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/color-scheme.svg
[license-href]: https://npmjs.com/package/@nuxtjs/color-scheme
