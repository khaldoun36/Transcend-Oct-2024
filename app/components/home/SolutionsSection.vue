<template>
  <section ref="sectionRef" class="pt-20 md:pt-24 lg:pt-32" id="projects">
    <h2
      class="wrapper fade-in mx-auto max-w-[35ch] text-balance text-center text-4xl lg:text-5.5xl"
      :style="{ animationDelay: '0ms' }"
    >
      AI models revolutionizing work methods and data classification
    </h2>
    <div class="fade-in" :style="{ animationDelay: '300ms' }">
      <Carousel />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Carousel from "@/components/ui/Carousel.vue";

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
