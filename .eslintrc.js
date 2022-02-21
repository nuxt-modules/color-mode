module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off'
  },
  extends: [
    '@nuxtjs'
  ]
}
