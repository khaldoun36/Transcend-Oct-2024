<template>
  <main class="mx-2 mt-2 rounded-lg border border-black/10">
    <div class="layout-container wrapper grid place-items-center pb-24 pt-32 sm:pb-32 sm:pt-48 md:pb-48 md:pt-64">
      <h1
        class="fade-in max-w-[25ch] text-balance text-center text-4xl text-neutral-100 md:text-5xl lg:text-6xl"
        :style="{ animationDelay: '0ms' }"
      >
        {{ heroSection?.title }}
      </h1>
      <p
        class="fade-in mt-6 max-w-[50ch] text-pretty text-center text-lg text-neutral-300 md:text-xl"
        :style="{ animationDelay: '300ms' }"
      >
        {{ heroSection?.body }}
      </p>
      <div
        class="btn-container fade-in mt-8 flex items-center justify-center gap-8"
        :style="{ animationDelay: '600ms' }"
      >
        <NuxtLink
          v-for="(link, index) in heroSection.links"
          :key="link.url"
          :target="link.url.includes('calendly') ? '_blank' : '_self'"
          :to="localePath(link.url)"
          class="button"
          :data-button-variant="link.variant"
          :style="{ animationDelay: `${900 + index * 300}ms` }"
          >{{ link.label }}</NuxtLink
        >
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Get the current locale from i18n
const { locale } = useI18n();
const currentLocale = locale.value;

// Fetch the hero section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/hero-section`
const { data: heroSection } = await useAsyncData("hero-section", () =>
  queryContent(`/${currentLocale}/home/hero-section`).findOne()
);

// Get the localePath function to generate localized URLs
const localePath = useLocalePath();

// Trigger animation on mount
const isLoaded = ref(false);
onMounted(() => {
  isLoaded.value = true;
});
</script>

<style scoped>
main {
  background: url("/assets/visual/hero-background.svg") no-repeat center center / cover;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease-out forwards;
  animation-play-state: paused;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation-play-state: running;
}
</style>
