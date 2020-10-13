[![@nuxtjs/color-mode](https://color-mode.nuxtjs.org/preview.png)](https://color-mode.nuxtjs.org)

# @nuxtjs/color-mode

[![npm version][npm-version-src]][npm-version-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> 🌑 Dark and 🌕 Light mode with auto detection made easy with NuxtJS

[![nuxt-color-mode](https://user-images.githubusercontent.com/904724/79349768-f09cf080-7f36-11ea-93bb-20fae8c94811.gif)](https://color-mode.nuxtjs.app/)

<p align="center">
  <a href="https://color-mode.nuxtjs.app">Live demo</a>
</p>

- [✨ &nbsp;Release Notes](https://color-mode.nuxtjs.org/releases)
- [📖 &nbsp;Documentation](https://color-mode.nuxtjs.org)

## Features

- Add `.${color}-mode` class to `<html>` for easy CSS theming
- Force a page to a specific color mode (perfect for incremental development)
- Works with any NuxtJS target (`static` or `server`) and rendering (`universal` and `spa`)
- Auto detect the system [color-mode](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-mode)
- Sync dark mode across tabs and windows 🔄
- Supports IE9+ 👴

[📖 &nbsp;Read more](https://color-mode.nuxtjs.org)

## Contributing

You can contribute to this module online with CodeSandBox:

[![Edit @nuxtjs/color-mode](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nuxt-community/color-mode-module/tree/master/?fontsize=14&hidenavigation=1&theme=dark)

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
