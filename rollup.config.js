import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

export default {
  input: './lib/script.js',
  output: [
    {
      file: './lib/script.min.js',
      format: 'iife',
      plugins: [
        terser()
      ]
    }
  ],
  plugins: [
    babel()
  ]
}
