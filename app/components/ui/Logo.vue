<template>
  <NuxtLink :to="localePath('/')" aria-label="Home" class="grid">
    <img
      src="/assets/visual/logo-dark.png"
      alt="Logo"
      width="448"
      height="120"
      class="col-start-1 row-start-1 h-10 w-auto transition-opacity duration-300"
      :class="isDark ? 'opacity-0' : 'opacity-100'"
    />
    <img
      src="/assets/visual/logo-light.png"
      alt="Logo"
      width="448"
      height="120"
      class="col-start-1 row-start-1 h-10 w-auto transition-opacity duration-300"
      :class="isDark ? 'opacity-100' : 'opacity-0'"
    />
  </NuxtLink>
</template>

<script setup>
const { isDark = false } = defineProps({
  isDark: {
    type: Boolean,
  },
});
</script>

<style scoped></style>
