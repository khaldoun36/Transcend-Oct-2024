<template>
  <section class="wrapper grid place-items-center pt-20 md:pt-24 lg:pt-32">
    <div
      class="relatie grid aspect-[4/3] max-h-[400px] w-full place-content-center rounded-lg border border-black/10 p-8 shadow-sm md:aspect-video"
    >
      <h2 class="max-w-[35ch] text-balance text-center text-3xl text-neutral-100 md:text-4xl lg:text-5xl">
        {{ contactSection?.title }}
      </h2>
      <ul class="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
        <li v-for="(link, index) in contactSection?.links" :key="index">
          <NuxtLink
            :to="localePath(link.link)"
            class="button"
            :data-button-variant="link.isPrimary ? 'primary' : 'secondary'"
            >{{ link.title }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();
const localePath = useLocalePath();
const currentLocale = locale.value;
const { data: contactSection } = await useAsyncData("contact-section", () =>
  queryContent(`/${currentLocale}/home/contact-section`).findOne()
);
</script>

<style scoped>
div {
  background: url("/assets/visual/hero-background.svg") no-repeat center center / cover;
}
</style>
