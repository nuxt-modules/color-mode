export default {
  name: '<%= options.componentName %>',
  functional: true,
  render (createElement, context) {
    const tag = context.tag || 'span'
    const { $colorMode } = context.parent

    if (!$colorMode.unknown) {
      return createElement(tag, context.data, context.children)
    }

    return createElement('client-only', {
      'placeholder-tag': tag,
      ...context.data
    }, context.children)
  }
}
