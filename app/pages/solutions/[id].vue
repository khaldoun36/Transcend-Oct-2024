<template>
  <div class="wrapper space-y-10 py-24 pt-32 sm:pb-32 sm:pt-48 md:space-y-12 lg:space-y-8">
    <main>
      <h1 class="mx-auto max-w-[25ch] text-balance text-center text-4.5xl md:text-5xl lg:text-6xl">
        {{ solution?.title }}
      </h1>
      <p class="mt-6 text-center text-base md:text-lg">
        {{ solution?.subTitle }}
      </p>

      <NuxtImg
        :src="solution?.thumbnail"
        :alt="solution?.title"
        class="mt-8 aspect-video h-auto w-full rounded-lg border border-black/10 shadow-sm"
      />
    </main>
    <ContentDoc :path="`/${currentLocale}/solutions/marlin/marlin`" />
  </div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = locale.value;
const { data: solution } = await useAsyncData("solutions", () =>
  queryContent(`/${currentLocale}/solutions/marlin/marlin`).findOne()
);
</script>

<style scoped></style>
