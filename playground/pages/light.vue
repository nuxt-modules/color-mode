<template>
  <div>
    <Title>Light page</Title>
    <h2>This page is forced with light mode</h2>
    <p>
      Forcing a color mode is great to implement dark mode to a website incrementally, <a href="https://color-mode.nuxtjs.org/#force-a-color-mode">learn more</a> about it.
    </p>
    <p>
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  colorMode: 'light'
})
</script>
