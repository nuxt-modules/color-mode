<template>
  <div>
    <h2>This page is forced with dark mode</h2>
    <p>
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  colorMode: 'dark',
  head: {
    title: 'Demo of @nuxtjs/color-mode'
  }
}
</script>
