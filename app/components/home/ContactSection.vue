<template>
  <section ref="sectionRef" class="wrapper pt-20 md:pt-24 lg:pt-32">
    <div
      class="contact-background fade-in flex flex-col items-center justify-center gap-8 rounded-lg border border-black/10 p-8 pb-10 pt-[4.5rem] shadow-sm md:pb-12 md:pt-20 lg:pb-16 lg:pt-24"
    >
      <h2 class="max-w-[35ch] text-balance text-center text-3xl text-neutral-100 md:text-4xl lg:text-5xl">
        {{ contactSection?.title }}
      </h2>
      <ul class="flex flex-col items-center justify-center gap-8 md:flex-row">
        <li v-for="(link, index) in contactSection?.links" :key="index">
          <NuxtLink
            :to="link.link"
            :target="link.link.includes('calendly') ? '_blank' : '_self'"
            class="button"
            :data-button-variant="link.isPrimary ? 'primary' : 'secondary'"
          >
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { locale } = useI18n();
const localePath = useLocalePath();

const { data: contactSection } = await useAsyncData("contact-section", () =>
  queryContent(`/${locale.value}/home/contact-section`).findOne()
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
.contact-background {
  background: url("/assets/visual/hero-background.svg") no-repeat center center / cover;
}

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
