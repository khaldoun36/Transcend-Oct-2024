<template>
  <section ref="sectionRef" class="wrapper grid place-items-center pt-20 md:pt-24 lg:pt-32" id="services">
    <h2 class="fade-in max-w-[35ch] text-balance text-center text-4xl lg:text-5.5xl" :style="{ animationDelay: '0ms' }">
      {{ servicesSection?.title }}
    </h2>

    <ul class="mt-10 grid gap-8 md:mt-12 lg:mt-16 lg:grid-cols-2 lg:grid-rows-1">
      <li
        v-for="(service, index) in servicesSection?.services"
        :key="index"
        class="fade-in min-h-full"
        :style="{ animationDelay: `${(index + 1) * 150}ms` }"
      >
        <Card :title="service.title" :body="service.body" :link="service.link" class="!min-h-full" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Card from "@/components/ui/Card.vue";

const { locale } = useI18n();
const currentLocale = locale.value;

// Fetch the services section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/services-section`
const { data: servicesSection } = await useAsyncData("services-section", () =>
  queryContent(`/${currentLocale}/home/services-section`).findOne()
);

const sectionRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>

<style scoped>
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.visible .fade-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
