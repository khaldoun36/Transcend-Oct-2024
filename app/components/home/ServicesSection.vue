<template>
  <section class="wrapper grid place-items-center pt-20 md:pt-24 lg:pt-32">
    <h2 class="lg:text-5.5xl max-w-[35ch] text-balance text-center text-4xl">{{ servicesSection?.title }}</h2>

    <ul class="mt-10 grid gap-8 md:mt-12 lg:mt-16 lg:grid-cols-2">
      <li v-for="(service, index) in servicesSection?.services" :key="index">
        <Card :title="service.title" :body="service.body" :link="service.link" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import Card from "@/components/content/Card.vue";
const { locale } = useI18n();
const currentLocale = locale.value;

// Fetch the services section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/services-section`
const { data: servicesSection } = await useAsyncData("services-section", () =>
  queryContent(`/${currentLocale}/home/services-section`).findOne()
);
</script>

<style scoped></style>
