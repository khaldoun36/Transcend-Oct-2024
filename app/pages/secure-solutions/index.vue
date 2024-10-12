<template>
  <main class="wrapper layout-container wrapper grid place-items-center pt-32 sm:pt-48 md:pt-64">
    <h1 class="max-w-[25ch] text-balance text-center text-4xl text-neutral-800 md:text-5xl lg:text-6xl">
      Secure Ai solutions revolutionizing workflows and data management
    </h1>
  </main>
  <section class="wrapper mt-10 md:mt-12 lg:mt-16">
    <ContentList :path="`/${currentLocale}/secure-solutions`" v-slot="{ list }">
      <ul ref="sliderRef" class="grid grid-rows-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="article in list" :key="article.name" class="aspect-[3/4] h-auto w-full shrink-0">
          <NuxtLink :to="localePath(`/secure-solutions/${article.path}`)">
            <div class="relative flex h-full w-full flex-col rounded-lg border border-black/10 bg-neutral-50">
              <NuxtImg
                :src="article?.thumbnail"
                :alt="article?.title"
                class="image-mask absolute inset-0 h-full w-full object-cover object-center"
                width="1600"
                height="900"
              />
              <div class="isolate mt-auto space-y-3 p-6">
                <p
                  class="max-w-fit rounded-full border border-black/10 bg-neutral-950/40 px-5 py-2.5 text-xs font-bold text-neutral-50 backdrop-blur-md"
                >
                  {{ article?.Name }}
                </p>
                <h3 class="text-2xl text-neutral-800">{{ article?.Header }}</h3>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </section>
</template>

<script setup>
useHead({
  title: "Transcend AI - Secure solutions",
});

const { locale } = useI18n();
const currentLocale = locale.value;
</script>

<style scoped></style>
