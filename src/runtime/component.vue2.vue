<script lang="ts">
import { componentName } from '#color-mode-options'

export default {
  name: componentName,
  functional: true,
  props: {
    placeholder: String,
    tag: {
      type: String,
      default: 'span',
    },
  },
  render(createElement, { data, props, children, slots }) {
    // transform props for <client-only>
    if (!props.placeholder && slots.placeholder) {
      props = {
        placeholderTag: props.placeholderTag,
      }
      const scopedSlots = {
        placeholder: () => slots.placeholder(),
      }

      return createElement('client-only', { ...data, props, scopedSlots }, children)
    }

    props = {
      placeholder: props.placeholder,
      placeholderTag: props.tag,
    }

    return createElement('client-only', { ...data, props }, children)
  },
}
</script>
