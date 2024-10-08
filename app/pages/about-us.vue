<template>
  <main class="wrapper space-y-10 py-24 pt-32 sm:pb-32 sm:pt-48 md:space-y-12 lg:space-y-8">
    <div class="grid gap-8 lg:grid-cols-2">
      <div class="lg:pr-8">
        <h1 class="text-3xl md:text-4xl lg:text-4.5xl">{{ aboutUS?.title }}</h1>
        <p class="mt-8 text-base md:text-lg">{{ aboutUS?.body }}</p>
      </div>
      <NuxtImg
        src="https://images.unsplash.com/photo-1648814036925-6225537ed166?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="about us image"
        width="1587"
        height="2381"
        class="hidden aspect-square rounded-lg border border-black/10 object-cover object-left-bottom shadow-sm lg:block"
      />
    </div>
    <div class="grid gap-8 lg:grid-cols-2">
      <div
        v-for="teamMember in aboutUS?.team"
        :key="teamMember.name"
        class="relative flex aspect-[3/3.5] h-auto min-w-full items-end overflow-hidden rounded-lg bg-neutral-100 p-6 shadow-sm md:aspect-square md:p-8"
      >
        <NuxtImg
          :src="teamMember.image"
          :alt="teamMember.name"
          class="team-image absolute inset-0 aspect-square h-auto w-full bg-zinc-50 object-cover object-[center_top]"
        />
        <h2 class="isolate text-2xl text-neutral-800 md:text-3xl">{{ teamMember.name + " – " + teamMember.title }}</h2>
      </div>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: "Transcend AI - About Us",
});
// Get the current locale from i18n
const { locale } = useI18n();
const currentLocale = locale.value;

// Fetch the hero section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/hero-section`
const { data: aboutUS } = await useAsyncData("about-us", () =>
  queryContent(`/${currentLocale}/about/about-us`).findOne()
);
</script>

<style scoped>
.team-image {
  mask: linear-gradient(
    180deg,
    theme("colors.zinc.100") 0%,
    theme("colors.zinc.100") 10%,
    theme("colors.zinc.100") 20%,
    theme("colors.zinc.100") 30%,
    theme("colors.zinc.100") 40%,
    theme("colors.zinc.100") 50%,
    theme("colors.zinc.100") 60%,
    theme("colors.zinc.100") 70%,
    theme("colors.zinc.100") 80%,
    theme("colors.zinc.100") 90%,
    theme("colors.zinc.100/0%") 100%
  );
}

@media (min-width: 768px) {
  .team-image {
    mask: linear-gradient(
      180deg,
      theme("colors.zinc.100") 0%,
      theme("colors.zinc.100") 10%,
      theme("colors.zinc.100") 20%,
      theme("colors.zinc.100") 30%,
      theme("colors.zinc.100") 40%,
      theme("colors.zinc.100") 50%,
      theme("colors.zinc.100") 60%,
      theme("colors.zinc.100") 70%,
      theme("colors.zinc.100") 80%,
      theme("colors.zinc.100/10%") 90%,
      theme("colors.zinc.100/20%") 100%
    );
  }
}
</style>
