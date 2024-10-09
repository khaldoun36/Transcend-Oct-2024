<template>
  <Popover v-slot="{ open, close }" class="md:hidden">
    <PopoverButton
      class="shadow-inset group isolate z-[9999px] flex items-center rounded-lg border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-800 shadow-lg backdrop-blur"
      :class="!isDark ? 'bg-primary-100/20' : ''"
    >
      Menu
      <ChevronDownIcon class="ml-3 h-auto w-2 stroke-neutral-500" />
    </PopoverButton>
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-50 bg-neutral-800/40 backdrop-blur-sm"></div>
    </Transition>
    <TransitionRoot appear :show="open" as="template">
      <PopoverPanel focus class="fixed inset-x-4 top-8 z-50 origin-top rounded-lg bg-white p-8">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div>
            <div class="flex flex-row-reverse items-center justify-between">
              <PopoverButton aria-label="Close menu" class="-m-1 p-1">
                <CloseIcon class="h-6 w-6 text-neutral-500" />
              </PopoverButton>
              <h2 class="text-sm font-medium text-neutral-600">Navigation</h2>
            </div>
            <nav class="mt-6">
              <ul class="-my-2 space-y-4 text-xl text-neutral-800">
                <MobileNavItem
                  v-for="link in navLinks"
                  :key="link.label"
                  class="relative after:absolute after:-bottom-px after:left-0 after:right-0 after:h-[1px] after:bg-black/5 after:content-['']"
                >
                  <NuxtLink :to="localePath(link.to)" @click="close">{{ link.label }}</NuxtLink>
                </MobileNavItem>
                <!-- <MobileNavItem>
                  <NuxtLink :to="localePath('/contact-us')" @click="close" class="button" data-button-variant="primary"
                    >Book a meeting</NuxtLink
                  >
                </MobileNavItem> -->
              </ul>
            </nav>
          </div>
        </TransitionChild>
      </PopoverPanel>
    </TransitionRoot>
  </Popover>
</template>

<script setup>
import MobileNavItem from "./MobileNavItem.vue";
import CloseIcon from "./CloseIcon.vue";
import ChevronDownIcon from "./ChevronDownIcon.vue";

import { Popover, PopoverButton, PopoverPanel, TransitionRoot, TransitionChild } from "@headlessui/vue";

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
    to: "/solutions",
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
    to: "/solutions",
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
.shadow-inset {
  box-shadow: inset 0 0 8px 0px hsl(0 0% 0% / 0.2);
}
</style>
