<template>
  <header
    class="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-transparent transition-all duration-300"
    :class="{ '!border-black/10 !bg-neutral-100/80 !backdrop-blur-md': !isDark }"
  >
    <div
      class="wrapper mt-4 flex items-center justify-between py-4 transition-all lg:mt-8"
      :class="{ '!mt-0': !isDark }"
    >
      <Logo :isDark="!isLogoDark" />
      <Navbar :isDark="!isLogoDark" />
      <div class="flex items-center gap-4">
        <NuxtLink class="button !hidden md:!inline-flex" data-button-variant="primary" :to="localePath('/contact-us')"
          >Book a meeting</NuxtLink
        >
        <HamburgerMenu @toggleMenu="toggleMenu" :isMenuOpen="openNav" />
      </div>
    </div>
    <MobileNavbar :isOpen="openNav" />
  </header>
</template>

<script setup>
import Logo from "@/components/ui/Logo.vue";
import Navbar from "@/components/ui/header/Navbar.vue";
import MobileNavbar from "@/components/ui/header/MobileNavbar.vue";
import HamburgerMenu from "@/components/ui/header/HamburgerMenu.vue";
const localePath = useLocalePath();

const { y } = useWindowScroll();

const route = useRoute();

const routeNameWithoutLocale = computed(() => {
  return route.name.split("___")[0];
});

const isDark = computed(() => y.value < 10);

const isLogoDark = computed(() => y.value > 10 || routeNameWithoutLocale.value !== "index" || openNav.value);

const openNav = ref(false);

const toggleMenu = () => {
  openNav.value = !openNav.value;
};
</script>

<style scoped></style>
