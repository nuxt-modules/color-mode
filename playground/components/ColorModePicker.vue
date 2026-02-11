<script setup>
function iconName(theme) {
  if (theme === 'system') return 'i-ph-laptop'
  if (theme === 'light') return 'i-ph-sun'
  if (theme === 'dark') return 'i-ph-moon'
  return 'i-ph-coffee'
}
</script>

<template>
  <div>
    <div class="flex justify-center gap-2.5">
      <button
        v-for="theme of ['system', 'light', 'dark', 'sepia']"
        :key="theme"
        class="relative top-0 cursor-pointer p-2 bg-white dark:bg-gray-800 sepia:bg-[#eae0c9] border-2 border-gray-200 dark:border-gray-700 sepia:border-[#ded0bf] rounded-md transition-all duration-100 ease-in-out hover:-top-1"
        :class="{
          '!border-emerald-600 dark:!border-emerald-400 sepia:!border-[#6b4c2a] !-top-1': !$colorMode.unknown && theme === $colorMode.preference,
          'text-emerald-600 dark:text-emerald-400 sepia:text-[#6b4c2a]': !$colorMode.unknown && theme === $colorMode.value,
        }"
        @click="$colorMode.preference = theme"
      >
        <Icon
          :name="iconName(theme)"
          class="size-6"
        />
      </button>
    </div>
    <p class="m-0 pt-1 pb-5">
      <ColorScheme
        placeholder="..."
        tag="span"
      >
        Preference: <b>{{ $colorMode.preference }}</b>
        <span v-if="$colorMode.preference === 'system'">&nbsp;(<i>{{ $colorMode.value }}</i> mode detected)</span>
        <span v-if="$colorMode.forced">&nbsp;(<i>{{ $colorMode.value }}</i> forced)</span>
      </ColorScheme>
    </p>
  </div>
</template>
