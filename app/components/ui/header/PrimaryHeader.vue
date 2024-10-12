<template>
  <header
    class="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-transparent transition-all duration-300"
    :class="{ '!border-black/10 !bg-neutral-100/60 !backdrop-blur-lg': !isDark }"
    :data-id="id"
  >
    <div
      class="wrapper mt-4 flex items-center justify-between py-4 transition-all lg:mt-8"
      :class="{ '!mt-0': !isDark }"
    >
      <Logo :isDark="!isLogoDark" />
      <Navbar :isDark="!isLogoDark" />
      <div class="hidden items-center gap-4 md:flex">
        <NuxtLink
          class="button !hidden md:!inline-flex"
          data-button-variant="primary"
          to="https://calendly.com/transcend-info/meeting?month=2024-10"
          target="_blank"
          >Book a meeting</NuxtLink
        >
      </div>
      <MobileNavigation />
    </div>
  </header>
</template>

<script setup>
import Logo from "@/components/ui/Logo.vue";
import Navbar from "@/components/ui/header/Navbar.vue";
import MobileNavigation from "@/components/ui/header/mobile-nav/MobileNavigation.vue";
const localePath = useLocalePath();

const { y } = useWindowScroll();

const route = useRoute();

const routeNameWithoutLocale = computed(() => {
  return route.name.split("___")[0];
});

const id = useId();
const isDark = ref(true);
const isLogoDark = ref(false);

onMounted(() => {
  isDark.value = y.value < 10;
  isLogoDark.value = y.value > 10 || routeNameWithoutLocale.value !== "index";

  watch([y, routeNameWithoutLocale], () => {
    isDark.value = y.value < 10;
    isLogoDark.value = y.value > 10 || routeNameWithoutLocale.value !== "index";
  });
});
</script>

<style scoped></style>
