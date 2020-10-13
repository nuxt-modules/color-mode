<template>
  <div>
    <ColorModePicker />
    <p>
      Go to
      <NuxtLink to="/light">
        light page
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Demo of @nuxtjs/color-mode'
  }
}
</script>
