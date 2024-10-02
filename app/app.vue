<template>
  <div class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
    <div class="header-placeholder bg-primary-500"></div>
    <div class="main-placeholder">
      <NuxtPage />
    </div>
    <div class="footer-placeholder h-10 bg-blue-500"></div>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  font-family: "Geist", system-ui, sans-serif;
  background-color: theme("colors.neutral.100");
}
</style>
