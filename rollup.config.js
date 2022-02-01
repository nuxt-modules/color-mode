import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

export default {
  input: './src/script.js',
  output: [
    {
      file: './dist/script.min.js',
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
