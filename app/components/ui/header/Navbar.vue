<template>
  <nav>
    <ul
      class="flex items-center gap-4 rounded-full border border-white/10 p-2 transition-colors"
      :class="{ '!border-black/10': !isDark }"
    >
      <li v-for="link in navLinks" :key="link.label">
        <NuxtLink
          :to="localePath(link.to)"
          class="cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-neutral-100 backdrop-blur-md transition-colors hover:bg-primary-500/50 active:bg-primary-500/70"
          :class="{ '!text-neutral-800': !isDark }"
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
    to: "/services",
  },
  {
    label: "Projects",
    to: "/projects",
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
    to: "/services  ",
  },
  {
    label: "مشاريعنا",
    to: "/projects",
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
.router-link-active,
.router-link-exact-active {
  @apply bg-primary-200/50;
}
</style>
