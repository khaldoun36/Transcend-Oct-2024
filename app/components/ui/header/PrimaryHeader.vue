<template>
  <header
    class="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-transparent transition-all"
    :class="{ '!border-black/10 !bg-neutral-100/80 !backdrop-blur-md': !isDark }"
  >
    <div class="wrapper mt-20 flex items-center justify-between py-4 transition-all" :class="{ 'mt-0': !isDark }">
      <NuxtLink :to="localePath('/')" aria-label="Home">
        <Logo :isDark="isDark" />
      </NuxtLink>
      <Navbar :isDark="isDark" />
      <div>
        <NuxtLink class="button" data-button-variant="primary" :to="localePath('/contact-us')">Book a meeting</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from "@/components/ui/Logo.vue";
import Navbar from "@/components/ui/header/Navbar.vue";
const localePath = useLocalePath();

const { y } = useWindowScroll();

const isDark = computed(() => y.value < 10);
</script>

<style scoped></style>
