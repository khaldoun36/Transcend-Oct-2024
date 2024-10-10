<template>
  <main class="wrapper layout-container wrapper grid place-items-center pt-32 sm:pt-48 md:pt-64">
    <h1 class="max-w-[25ch] text-balance text-center text-4xl text-neutral-800 md:text-5xl lg:text-6xl">
      Ai models transforming work processes and data organization
    </h1>
  </main>
  <section class="wrapper mt-10 md:mt-12 lg:mt-16">
    <ContentList :path="`/${currentLocale}/solutions`" v-slot="{ list }">
      <ul ref="sliderRef" class="grid grid-rows-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="article in list" :key="article.name" class="aspect-[3/4] h-auto w-full shrink-0">
          <NuxtLink :to="localePath(`/solutions/${article.path}`)">
            <div
              class="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-black/10 bg-neutral-50"
            >
              <NuxtImg
                :src="article?.thumbnail"
                :alt="article?.title"
                class="image-mask absolute inset-0 h-full w-full object-cover object-center"
                width="1600"
                height="900"
              />
              <h3 class="isolate mt-auto p-6 text-2xl text-neutral-800">
                {{ article?.Header }}
              </h3>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </section>
</template>

<script setup>
useHead({
  title: "Transcend AI - Solutions",
});

const { locale } = useI18n();
const currentLocale = locale.value;
</script>

<style scoped></style>
