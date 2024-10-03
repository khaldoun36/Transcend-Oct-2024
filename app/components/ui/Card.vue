<template>
  <NuxtLink v-if="link" :to="localePath('/')" class="block">
    <div
      class="group relative flex aspect-[4/3] w-full items-end rounded-lg border border-black/10 p-8 pt-16 lg:pt-8"
      ref="cardRef"
      @mousemove="updateMousePosition"
      @mouseleave="resetMousePosition"
    >
      <div
        class="pointer-events-none absolute -inset-[1.5px] rounded-lg opacity-0 transition-all duration-[350ms] group-hover:opacity-100"
        :style="{
          background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, hsl(270 95% 75% / .20), hsl(0 0% 0% / 0) 80%)`,
        }"
      />
      <div
        class="pointer-events-none absolute -inset-[1.5px] rounded-lg transition-all duration-[350ms] group-hover:opacity-0"
        :style="{
          background: `radial-gradient(800px circle at 700px 0px, hsl(270 95% 75% / .20), hsl(0 0% 0% / 0) 80%)`,
        }"
      />

      <div class="card-content flex flex-col">
        <h3 class="text-balance text-4xl md:text-4.5xl">{{ title }}</h3>
        <p class="mt-6 text-base md:text-lg">{{ body }}</p>
        <p
          v-if="link"
          class="group mt-8 flex items-center gap-2 text-base font-semibold text-primary-700 transition-colors hover:text-primary-800"
        >
          {{ link }} <span class="mt-[2px] transition-transform group-hover:translate-x-1">&rarr;</span>
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const localePath = useLocalePath();

const { title, body, link } = defineProps(["title", "body", "link"]);

const cardRef = ref(null);
const mouseX = ref(700);
const mouseY = ref(0);

const updateMousePosition = (event) => {
  if (cardRef.value) {
    const rect = cardRef.value.getBoundingClientRect();
    mouseX.value = event.clientX - rect.left;
    mouseY.value = event.clientY - rect.top;
  }
};

const resetMousePosition = () => {
  mouseX.value = 700;
  mouseY.value = 0;
};
</script>

<style scoped></style>
