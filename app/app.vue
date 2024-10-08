<template>
  <div class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
    <PrimaryHeader />
    <div class="main-placeholder">
      <NuxtPage />
    </div>
    <PrimaryFooter />
  </div>
</template>

<script setup>
import PrimaryFooter from "~/components/ui/PrimaryFooter.vue";
import PrimaryHeader from "~/components/ui/header/PrimaryHeader.vue";
</script>

<style>
html,
body,
#__nuxt {
  font-family: "Geist", system-ui, sans-serif;
  background-color: theme("colors.neutral.100");
  scroll-behavior: smooth;
}
</style>
