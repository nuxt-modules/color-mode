<template>
  <div>
    <ColorModePicker />
    <p>
      Go to
      <NuxtLink to="/dark">
        dark page
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Dark page'
  }
}
</script>
