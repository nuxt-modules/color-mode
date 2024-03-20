<script lang="ts">
import { componentName } from '#color-mode-options'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
import { defineProps, withDefaults } from '#imports'

const props = withDefaults(defineProps<{
  placeholder: string
  tag?: string
}>(), {
  tag: 'div'
})
</script>

<template>
  <ClientOnly :placeholder="props.placeholder" :placeholder-tag="props.tag">
    <slot />
  </ClientOnly>
</template>
