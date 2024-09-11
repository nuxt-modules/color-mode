import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  hooks: {
    'rollup:options'(_ctx, options) {
      options.treeshake = false
    },
  },
})
