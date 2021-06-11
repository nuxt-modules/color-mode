export default {
  name: '<%= options.componentName %>',
  functional: true,
  props: {
    placeholder: String,
    tag: {
      type: String,
      default: 'span'
    }
  },
  render (createElement, { parent, data, props, children }) {
    // transform props for <client-only>
    props = {
      placeholder: props.placeholder,
      placeholderTag: props.tag
    }

    return createElement('client-only', { ...data, props }, children)
  }
}
