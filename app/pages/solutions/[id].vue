<template>
  <div class="wrapper py-24 pt-32 sm:pb-32 sm:pt-48">
    <main>
      <h1 class="mx-auto max-w-[25ch] text-balance text-center text-4.5xl md:text-5xl lg:text-6xl">
        {{ solution?.Subtitle }}
      </h1>
      <p class="mx-auto mt-6 max-w-[60ch] text-center text-base md:text-lg">
        {{ solution?.TaglineDescription }}
      </p>

      <NuxtImg
        :src="solution?.thumbnail"
        :alt="solution?.title"
        class="mt-8 aspect-video h-auto w-full rounded-lg border border-black/10 shadow-sm"
        width="1600"
        height="900"
      />
    </main>
    <!-- <section class="flex flex-col items-end justify-between gap-4 pt-10 md:pt-12 lg:flex-row lg:pt-28">
      <h2 class="mx-auto max-w-[25ch] text-balance text-center text-4xl md:text-start lg:text-5.5xl">
        {{ solution?.sectionTitle }}
      </h2>
      <p class="mg:text-lg mx-auto max-w-prose text-pretty text-center text-base md:text-start">
        {{ solution?.sectionDescription }}
      </p>
    </section> -->
    <KeyFeaturesContainer :features="solution?.features" />
    <RealWordApplications :features="solution?.applications" />
  </div>
</template>

<script setup>
import KeyFeaturesContainer from "~/components/content/KeyFeatures.vue";
import RealWordApplications from "~/components/content/RealWordApplications.vue";
const { locale } = useI18n();
const currentLocale = locale.value;
const { data: solution } = await useAsyncData("solutions", () =>
  queryContent(`/${currentLocale}/solutions/marlin`).findOne()
);
</script>

<style scoped></style>
