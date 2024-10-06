<template>
  <section class="pt-10 md:pt-12 lg:pt-16">
    <ul
      class="mt-10 grid grid-cols-1 items-center justify-center gap-8 md:mt-12 md:grid-cols-2 lg:mt-16"
      :class="gridCols"
      ref="list"
    >
      <li v-for="n in 2" :key="n" class="overflow-clip rounded-lg border border-black/10 bg-neutral-50 shadow-sm">
        <NuxtImg
          src="https://images.unsplash.com/photo-1562155955-b73c7402a20b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Feature image"
          width="1600"
          height="1200"
          class="block aspect-[4/3] h-auto w-full object-cover"
        />
        <div class="p-8">
          <h3 class="text-4xl">hello wortld</h3>
          <p class="mt-4 text-pretty text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias provident quam eaque nihil dolorum rerum
            quisquam cumque dolore explicabo neque odit nobis eligendi maxime architecto, quae nostrum animi
            voluptatibus ea!
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
</script>

<style scoped></style>
