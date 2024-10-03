<template>
  <footer class="wrapper pt-20 md:pt-24 lg:pt-32">
    <div
      class="layout flex flex-col items-center justify-between gap-8 border-t border-black/10 py-8 lg:grid lg:grid-cols-[1fr_auto_1fr]"
    >
      <NuxtLink :to="localePath('/')" aria-label="Home">
        <Logo :isDark="false" />
      </NuxtLink>
      <p class="font-meidum text-center text-sm text-neutral-600">
        All rights reserved &#169; 2023-{{ new Date().getFullYear() }} Transcend Technologies
      </p>
    </div>
  </footer>
</template>

<script setup>
import Logo from "@/components/ui/Logo.vue";

const localePath = useLocalePath();
</script>

<style scoped></style>
