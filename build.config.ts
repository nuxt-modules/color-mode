import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // TODO: fix issue in unbuild with inlining package.json
  // `Inlined implicit external D:\a\color-mode\color-mode\package.json`
  failOnWarn: false,
  entries: ['src/script'],
  hooks: {
    'rollup:options' (_ctx, options) {
      options.treeshake = false
    }
  }
})
