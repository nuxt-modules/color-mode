# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.1.8](https://github.com/nuxt-community/color-mode-module/compare/v3.1.7...v3.1.8) (2022-10-07)


### Bug Fixes

* remove localStorage watch (blink) ([b7b32ed](https://github.com/nuxt-community/color-mode-module/commit/b7b32edf383fc259b98aa21c3895d4b388ce7ee4))

### [3.1.7](https://github.com/nuxt-community/color-mode-module/compare/v3.1.6...v3.1.7) (2022-10-04)

### [3.1.6](https://github.com/nuxt-community/color-mode-module/compare/v3.1.5...v3.1.6) (2022-09-22)


### Bug Fixes

* inject color-mode script with nitro plugin (handles mixed spa/ssr) ([#164](https://github.com/nuxt-community/color-mode-module/issues/164)) ([620ca17](https://github.com/nuxt-community/color-mode-module/commit/620ca1799f8788bcdd275829ffbb796d346138d7))

### [3.1.5](https://github.com/nuxt-community/color-mode-module/compare/v3.1.4...v3.1.5) (2022-09-09)


### Bug Fixes

* color mode in server ([#159](https://github.com/nuxt-community/color-mode-module/issues/159)) ([fcf0aea](https://github.com/nuxt-community/color-mode-module/commit/fcf0aead26f812ee5c3cc1720350763fd464804d))

### [3.1.4](https://github.com/nuxt-community/color-mode-module/compare/v3.1.3...v3.1.4) (2022-06-09)


### Bug Fixes

* works with ssr: false ([#149](https://github.com/nuxt-community/color-mode-module/issues/149)) ([3dde9cb](https://github.com/nuxt-community/color-mode-module/commit/3dde9cb8d7c4c37db745c6c35bc7e7feb85b5716))

### [3.1.3](https://github.com/nuxt-community/color-mode-module/compare/v3.1.2...v3.1.3) (2022-05-31)


### Bug Fixes

* handle data attribute in script as well ([30b173e](https://github.com/nuxt-community/color-mode-module/commit/30b173e4ffebcd452ecc076e3660290907af196f))

### [3.1.2](https://github.com/nuxt-community/color-mode-module/compare/v3.1.1...v3.1.2) (2022-05-31)


### Bug Fixes

* add missing imports in client-plugin ([c0ce7b2](https://github.com/nuxt-community/color-mode-module/commit/c0ce7b2944e099600bcfb1541b42b9398821daa1))

### [3.1.1](https://github.com/nuxt-community/color-mode-module/compare/v3.1.0...v3.1.1) (2022-05-31)


### Bug Fixes

* add missing import ([70665db](https://github.com/nuxt-community/color-mode-module/commit/70665dbc6477f927d246c7eaa92ba177b2d41a7a))

## [3.1.0](https://github.com/nuxt-community/color-mode-module/compare/v3.0.3...v3.1.0) (2022-05-31)


### Features

* add support for `data-*` attribute in `<html>` tag ([#144](https://github.com/nuxt-community/color-mode-module/issues/144)) ([7a92150](https://github.com/nuxt-community/color-mode-module/commit/7a92150a802aba29b6db0d78b3dfba3535bf3ceb))

### [3.0.3](https://github.com/nuxt-community/color-mode-module/compare/v3.0.2...v3.0.3) (2022-05-10)


### Bug Fixes

* **plugin:** prevent infinite loop on watch ([#145](https://github.com/nuxt-community/color-mode-module/issues/145)) ([d4ee818](https://github.com/nuxt-community/color-mode-module/commit/d4ee8186e5073e248baa8cea6438f8a50f6a9f19))
* rename useMeta to useHead ([#135](https://github.com/nuxt-community/color-mode-module/issues/135)) ([63d86ab](https://github.com/nuxt-community/color-mode-module/commit/63d86ab9702e247a89ca18167874051850665dec))

### [3.0.2](https://github.com/nuxt-community/color-mode-module/compare/v3.0.1...v3.0.2) (2022-03-07)


### Bug Fixes

* type helper as `$colorMode` not `colorMode` ([b2d89bd](https://github.com/nuxt-community/color-mode-module/commit/b2d89bd5f3048b92b7b43ec21b7e74e4f1ae2454)), closes [#130](https://github.com/nuxt-community/color-mode-module/issues/130)

### [3.0.1](https://github.com/nuxt-community/color-mode-module/compare/v3.0.0...v3.0.1) (2022-02-21)


### Bug Fixes

* move script to head and set forced color mode on `<html>` element ([#128](https://github.com/nuxt-community/color-mode-module/issues/128)) ([273f07e](https://github.com/nuxt-community/color-mode-module/commit/273f07ebda0d87fc7574d09658e60a9863ce84a8))

## [3.0.0](https://github.com/nuxt-community/color-mode-module/compare/v2.1.1...v3.0.0) (2022-02-16)


### ⚠ BREAKING CHANGES

* add support for nuxt 3/nuxt bridge (#118)

### Features

* add support for nuxt 3/nuxt bridge ([#118](https://github.com/nuxt-community/color-mode-module/issues/118)) ([a5036a4](https://github.com/nuxt-community/color-mode-module/commit/a5036a4a816a3baa2bc2a953048469a7a78a851e))

### [2.1.1](https://github.com/nuxt-community/color-mode-module/compare/v2.1.0...v2.1.1) (2021-08-02)


### Bug Fixes

* add script to webpack build (in dev) for storybook support ([#99](https://github.com/nuxt-community/color-mode-module/issues/99)) ([54b482b](https://github.com/nuxt-community/color-mode-module/commit/54b482b5cd8a63c42575165a02d96a0e1c959cc4)), closes [#69](https://github.com/nuxt-community/color-mode-module/issues/69)

## [2.1.0](https://github.com/nuxt-community/color-mode-module/compare/v2.0.10...v2.1.0) (2021-08-02)


### Features

* add csp hash for color script ([#94](https://github.com/nuxt-community/color-mode-module/issues/94)) ([e2f1ffc](https://github.com/nuxt-community/color-mode-module/commit/e2f1ffc2a64dd22d7ed5b40fc6bc78562e47c9d0))

### [2.0.10](https://github.com/nuxt-community/color-mode-module/compare/v2.0.9...v2.0.10) (2021-06-11)


### Bug Fixes

* module stability ([#92](https://github.com/nuxt-community/color-mode-module/issues/92)) ([e9aa91c](https://github.com/nuxt-community/color-mode-module/commit/e9aa91c8caf56d6cae1dfe641034a1960bee6269))

### [2.0.9](https://github.com/nuxt-community/color-mode-module/compare/v2.0.8...v2.0.9) (2021-05-24)


### Bug Fixes

* move ssr script injection into plugin for nitro compat ([#86](https://github.com/nuxt-community/color-mode-module/issues/86)) ([9002bb0](https://github.com/nuxt-community/color-mode-module/commit/9002bb0d696bac7945077d6bcafe3993866ebb2f))

### [2.0.8](https://github.com/nuxt-community/color-mode-module/compare/v2.0.7...v2.0.8) (2021-05-20)

### [2.0.7](https://github.com/nuxt-community/color-mode-module/compare/v2.0.5...v2.0.7) (2021-05-20)


### Bug Fixes

* move script injection into plugin for nitro compat ([#85](https://github.com/nuxt-community/color-mode-module/issues/85)) ([fb31651](https://github.com/nuxt-community/color-mode-module/commit/fb31651d7103a972d2e922d623565d791b84078c))

### [2.0.6](https://github.com/nuxt-community/color-mode-module/compare/v2.0.5...v2.0.6) (2021-05-20)

### [2.0.5](https://github.com/nuxt-community/color-mode-module/compare/v2.0.4...v2.0.5) (2021-03-10)


### Bug Fixes

* spa mode ([139b0e6](https://github.com/nuxt-community/color-mode-module/commit/139b0e68fced030db9035839ffdfd2fa1d80c117))

### [2.0.4](https://github.com/nuxt-community/color-mode-module/compare/v2.0.3...v2.0.4) (2021-03-03)


### Bug Fixes

* types compatible with nuxt-property-decorator ([#72](https://github.com/nuxt-community/color-mode-module/issues/72)) ([43f5806](https://github.com/nuxt-community/color-mode-module/commit/43f5806b84f407d55f7de939348e25293ebbaa12))

### [2.0.3](https://github.com/nuxt-community/color-mode-module/compare/v2.0.2...v2.0.3) (2021-01-25)


### Bug Fixes

* **type-defs:** make interface ColorModeInstance extend Vue ([#62](https://github.com/nuxt-community/color-mode-module/issues/62)) ([bac6667](https://github.com/nuxt-community/color-mode-module/commit/bac6667553c1801cd6aaefcce0d829bab03d663a))
* don't use window in created ([#59](https://github.com/nuxt-community/color-mode-module/issues/59)) ([9b47c6e](https://github.com/nuxt-community/color-mode-module/commit/9b47c6ea630e35c8958a62f5b645fd3ef7216846))

### [2.0.2](https://github.com/nuxt-community/color-mode-module/compare/v2.0.1...v2.0.2) (2020-12-04)


### Bug Fixes

* **type-defs:** make all options optional ([#56](https://github.com/nuxt-community/color-mode-module/issues/56)) ([7d2aaff](https://github.com/nuxt-community/color-mode-module/commit/7d2aaff02d0e81327a88be67310ef49263055bad))

### [2.0.1](https://github.com/nuxt-community/color-mode-module/compare/v2.0.0...v2.0.1) (2020-12-02)


### Bug Fixes

* **type-defs:** add types reference to package ([#52](https://github.com/nuxt-community/color-mode-module/issues/52)) ([82592f4](https://github.com/nuxt-community/color-mode-module/commit/82592f4451f696bb8cf2c5d2282fc7b60ac7cbb5))

## [2.0.0](https://github.com/nuxt-community/color-mode-module/compare/v1.1.1...v2.0.0) (2020-10-13)


### ⚠ BREAKING CHANGES

* Version 2 (#39)

### Features

* Version 2 ([#39](https://github.com/nuxt-community/color-mode-module/issues/39)) ([47664d7](https://github.com/nuxt-community/color-mode-module/commit/47664d76dc76a44ff270a6cd8569f512e5b004f3))

### [1.1.1](https://github.com/nuxt-community/color-mode-module/compare/v1.1.0...v1.1.1) (2020-09-15)


### Bug Fixes

* **types:** add new options and include in package ([00bb7e8](https://github.com/nuxt-community/color-mode-module/commit/00bb7e85a114e5f50941b5445395b7b09d9a5a68))

## [1.1.0](https://github.com/nuxt-community/color-mode-module/compare/v1.0.3...v1.1.0) (2020-09-15)


### Features

* add classPrefix and classSuffix ([0f2141c](https://github.com/nuxt-community/color-mode-module/commit/0f2141c182cfef81321d8cd3bed39d173ec281b3))
* add types declaration ([#27](https://github.com/nuxt-community/color-mode-module/issues/27)) ([078d38f](https://github.com/nuxt-community/color-mode-module/commit/078d38f6347a297f388ef65aedfa503892bf73b0)), closes [#15](https://github.com/nuxt-community/color-mode-module/issues/15)

### [1.0.3](https://github.com/nuxt-community/color-mode-module/compare/v1.0.2...v1.0.3) (2020-08-04)


### Bug Fixes

* handle spa fallback (regression) ([b92d64b](https://github.com/nuxt-community/color-mode-module/commit/b92d64b29a15bb901abe406aa8dda5709b5caacc)), closes [#21](https://github.com/nuxt-community/color-mode-module/issues/21)

### [1.0.2](https://github.com/nuxt-community/color-mode-module/compare/v1.0.1...v1.0.2) (2020-07-28)


### Bug Fixes

* wait hydration to update $colorMode ([7a873ab](https://github.com/nuxt-community/color-mode-module/commit/7a873ab1f6f862b608923e904ae153b8f89864fc))

### [1.0.1](https://github.com/nuxt-community/color-mode-module/compare/v1.0.0...v1.0.1) (2020-07-27)


### Bug Fixes

* add `SameSite=Lax` to cookie ([#18](https://github.com/nuxt-community/color-mode-module/issues/18)) ([f236c93](https://github.com/nuxt-community/color-mode-module/commit/f236c93ae6092c8d273c9241901a47e01e058845))
* broken link ([#17](https://github.com/nuxt-community/color-mode-module/issues/17)) ([a4f0e02](https://github.com/nuxt-community/color-mode-module/commit/a4f0e021e31a1fedaef249f38cfd1e88a9e0ea19))
* correct spelling for preferred ([#10](https://github.com/nuxt-community/color-mode-module/issues/10)) ([cd565c5](https://github.com/nuxt-community/color-mode-module/commit/cd565c5f7425cde41b5255631ad088e2a1f4eff2))
* fix correct spelling for preferred ([#9](https://github.com/nuxt-community/color-mode-module/issues/9)) ([8f65b8d](https://github.com/nuxt-community/color-mode-module/commit/8f65b8d21955fc13c5c3428edb6b3f6fea2e3795))

### [1.0.0](https://github.com/nuxt-community/color-mode-module/compare/v0.0.2...v1.0.0) (2020-04-15)

### Features

* overall improvements ([#1](https://github.com/nuxt-community/color-mode-module/issues/1)) ([be3dd4b](https://github.com/nuxt-community/color-mode-module/commit/be3dd4b1885e025d05cac13f921ce338628eb305))


### Bug Fixes

* color-scheme component and hydration ([6f026bc](https://github.com/nuxt-community/color-mode-module/commit/6f026bc88eaeb75560b544d7bdafb36debd9f05d))

### [0.0.2](https://github.com/nuxt-community/color-mode-module/compare/v0.0.1...v0.0.2) (2020-04-15)


### Bug Fixes

* use colorMode options ([507faef](https://github.com/nuxt-community/color-mode-module/commit/507faef219789b674838f0d1de7882e9725664da))

### 0.0.1 (2020-04-15)
