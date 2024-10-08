<template>
  <nav class="hidden md:block">
    <ul
      class="flex items-center gap-2 rounded-full border border-white/10 px-[4px] py-2 pb-[9px] transition-colors"
      :class="{ '!border-black/10': !isDark }"
    >
      <li v-for="link in navLinks" :key="link.label">
        <NuxtLink
          :to="localePath(link.to)"
          class="cursor-pointer overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-neutral-100 backdrop-blur-md transition-colors hover:bg-primary-500/50 active:bg-primary-500/70"
          :class="[{ '!text-neutral-800': !isDark }, { 'bg-primary-500/20': $route.path === localePath(link.to) }]"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const navLinksEn = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About us",
    to: "/about-us",
  },
  {
    label: "Services",
    to: "/#services",
  },
  {
    label: "Solutions",
    to: "/#solutions",
  },
];
const navLinksAr = [
  {
    label: "الرئيسية",
    to: "/",
  },
  {
    label: "من نحن",
    to: "/about-us",
  },
  {
    label: "خدماتنا",
    to: "/#services",
  },
  {
    label: "الحلول",
    to: "/#solutions",
  },
];

const { locale } = useI18n();
const currentLocale = locale.value;

const localePath = useLocalePath();

const navLinks = computed(() => {
  return currentLocale === "en" ? navLinksEn : navLinksAr;
});

const { isDark = false } = defineProps({
  isDark: {
    type: Boolean,
  },
});
</script>

<style scoped>
/* .router-link-active,
.router-link-exact-active {
  @apply bg-primary-500/20;
} */
</style>
