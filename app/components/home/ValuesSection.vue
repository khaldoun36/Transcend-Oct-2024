<template>
  <section ref="sectionRef" class="wrapper grid place-items-center pt-20 md:pt-24 lg:pt-32">
    <h2 class="fade-in text-balance text-center text-4xl lg:text-5.5xl" :style="{ animationDelay: '0ms' }">
      {{ valuesSection?.title }}
    </h2>
    <p
      class="fade-in mt-6 max-w-prose text-pretty text-center text-base md:text-lg"
      :style="{ animationDelay: '150ms' }"
    >
      {{ valuesSection?.body }}
    </p>
    <ul class="mt-10 grid gap-8 md:mt-12 lg:mt-16 lg:grid-cols-3">
      <li
        v-for="(value, index) in valuesSection?.values"
        :key="index"
        class="fade-in overflow-clip rounded-lg border border-black/10 bg-neutral-50 shadow-sm"
        :style="{ animationDelay: `${(index + 2) * 150}ms` }"
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
import { ref, onMounted } from "vue";

const { locale } = useI18n();
const currentLocale = locale.value;
// Fetch the values section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/values-section`
const { data: valuesSection } = await useAsyncData("values-section", () =>
  queryContent(`/${currentLocale}/home/values-section`).findOne()
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
