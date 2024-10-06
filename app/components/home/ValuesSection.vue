<template>
  <section class="wrapper grid place-items-center pt-20 md:pt-24 lg:pt-32">
    <h2 class="text-balance text-center text-4xl lg:text-5.5xl">{{ valuesSection?.title }}</h2>
    <p class="mt-6 max-w-prose text-pretty text-center text-base md:text-lg">{{ valuesSection?.body }}</p>
    <ul class="mt-10 grid gap-8 md:mt-12 lg:mt-16 lg:grid-cols-3">
      <li
        v-for="(value, index) in valuesSection?.values"
        :key="index"
        class="overflow-clip rounded-lg border border-black/10 bg-neutral-50 shadow-sm"
      >
        <NuxtImg
          :src="value.image.src"
          :alt="value.image.alt"
          :width="value.image.width"
          :height="value.image.height"
          class="block h-auto w-full object-cover"
        />
        <div class="p-8">
          <h3 class="text-3xl">{{ value.title }}</h3>
          <p class="mt-4 text-pretty text-base">{{ value.body }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = locale.value;
// Fetch the values section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/values-section`
const { data: valuesSection } = await useAsyncData("values-section", () =>
  queryContent(`/${currentLocale}/home/values-section`).findOne()
);
</script>

<style scoped></style>
