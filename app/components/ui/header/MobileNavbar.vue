<template>
  <nav
    class="fixed inset-0 -z-10 flex min-h-dvh -translate-y-full items-center bg-neutral-100/80 px-4 backdrop-blur-md transition-transform duration-700"
    :class="{ '!translate-y-0': isOpen }"
  >
    <ul class="space-y-16">
      <li v-for="link in navLinks" :key="link.label" class="text-2xl font-medium text-neutral-800">
        <NuxtLink :to="localePath(link.to)">
          {{ link.label }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/contact-us')" class="button" data-button-variant="primary">Book a meeting</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const { isOpen = false } = defineProps({
  isOpen: {
    type: Boolean,
  },
});
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
</script>

<style scoped></style>
