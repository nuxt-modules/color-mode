import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/script'],
  hooks: {
    'rollup:options' (_ctx, options) {
      options.treeshake = false
    }
  }
})
