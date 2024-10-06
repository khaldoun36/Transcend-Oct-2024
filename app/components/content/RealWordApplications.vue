<template>
  <section class="mt-20 md:mt-24 lg:mt-32">
    <h2 class="text-center text-4xl font-bold">Real-world applications</h2>
    <ul
      class="mt-10 grid grid-cols-1 items-center justify-center gap-8 md:mt-12 md:grid-cols-2 lg:mt-16"
      :class="gridCols"
      ref="list"
    >
      <li
        v-for="(feature, index) in features"
        :key="index"
        class="min-h-full overflow-clip rounded-lg border border-black/10 bg-neutral-50 shadow-sm"
      >
        <NuxtImg
          :src="feature.image"
          :alt="feature.title"
          width="1600"
          height="1200"
          class="block aspect-[4/3] h-auto w-full object-cover"
        />
        <div class="p-8">
          <h3 class="text-4xl">{{ feature.title }}</h3>
          <p class="mt-4 text-pretty text-base">
            {{ feature.description }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
const list = ref(null);
const gridCols = ref("lg:grid-cols-3");

onMounted(() => {
  if (list.value.childElementCount < 3) {
    gridCols.value = `grid-cols-${list.value.childElementCount}`;
  } else if (list.value.childElementCount >= 4) {
    gridCols.value = "lg:grid-cols-4";
  }
});

const { features } = defineProps(["features"]);
</script>

<style scoped></style>
