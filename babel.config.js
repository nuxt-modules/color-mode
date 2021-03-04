module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          browsers: '> 0.25%, not dead, ie 11, ie_mob 11'
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}
