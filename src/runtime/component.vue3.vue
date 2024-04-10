<script lang="ts">
import { componentName } from '#color-mode-options'

export default {
  name: componentName,
  props: {
    placeholder: String,
    tag: {
      type: String,
      default: 'span',
    },
  },
}
</script>

<template>
  <ClientOnly
    :placeholder="placeholder"
    :placeholder-tag="tag"
  >
    <slot />
  </ClientOnly>
</template>
