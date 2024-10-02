<template>
  <main class="mx-2 mt-2 rounded-lg border border-black/10">
    <div class="layout-container wrapper grid place-items-center py-24 pt-32 sm:pb-32 sm:pt-48 md:pb-48 md:pt-64">
      <h1 class="max-w-[25ch] text-balance text-center text-4xl text-neutral-100 md:text-5xl lg:text-6xl">
        {{ heroSection?.title }}
      </h1>
      <p class="mt-6 max-w-[50ch] text-pretty text-center text-lg text-neutral-300 md:text-xl">
        {{ heroSection?.body }}
      </p>
      <div class="btn-container mt-8 flex items-center justify-center gap-8">
        <NuxtLink
          v-for="link in heroSection.links"
          :key="link.url"
          :to="localePath(link.url)"
          class="button"
          :data-button-variant="link.variant"
          >{{ link.label }}</NuxtLink
        >
      </div>
    </div>
  </main>
</template>

<script setup>
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
</script>

<style scoped>
main {
  background: url("/assets/visual/hero-background.svg") no-repeat center center / cover;
}
</style>
