module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'no-use-before-define': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
