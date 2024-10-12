<template>
  <div class="no-scrollbar mt-10 max-h-[500px] max-w-[99vw] overflow-hidden md:mt-12 lg:mt-16">
    <ContentList :path="`/${currentLocale}/solutions`" v-slot="{ list }">
      <ul
        ref="sliderRef"
        @scroll="handleScroll"
        class="carousel no-scrollbar flex h-[432px] snap-x snap-mandatory overflow-x-auto md:h-[540px] md:pb-10"
      >
        <li
          v-for="article in list"
          :key="article.name"
          class="shrink-0 snap-start snap-always px-4 first:pl-8 last:pr-8"
        >
          <NuxtLink :to="localePath(`/solutions/${article.path}`)">
            <div
              class="relative flex h-full w-[calc(100vw-6rem)] flex-col overflow-hidden rounded-lg border border-black/10 bg-neutral-50 md:w-[400px]"
            >
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
  </div>
  <div class="wrapper mt-8 flex justify-end">
    <button
      @click="goToPreviousSlide"
      class="mr-2 flex size-10 items-center justify-center rounded-full border border-black/10 bg-black/5"
    >
      <span>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="sr-only">Previous slide</span>
    </button>
    <button
      @click="goToNextSlide"
      class="flex size-10 items-center justify-center rounded-full border border-black/10 bg-black/5"
    >
      <span>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="sr-only">Next slide</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const currentLocale = locale.value;

const sliderRef = ref(null);
const sliderPosition = ref(0);
const totalSlides = ref(0);
const visibleSlides = ref(0);
const slideWidth = ref(320);
const slideMargin = 32;

const currentSlide = computed(() => {
  return Math.round(sliderPosition.value / (slideWidth.value + slideMargin));
});

onMounted(() => {
  const updateSliderMetrics = () => {
    if (!sliderRef.value) return;

    const firstSlide = sliderRef.value.children[0];
    slideWidth.value = firstSlide.offsetWidth;
    totalSlides.value = sliderRef.value.children.length;
    visibleSlides.value = Math.floor(sliderRef.value.clientWidth / (slideWidth.value + slideMargin));
  };

  const updateSlideWidth = () => {
    if (window.innerWidth > 768) {
      slideWidth.value = 400 - 8;
    } else {
      slideWidth.value = window.innerWidth - 6 * 16; // 6rem converted to pixels
    }
    updateSliderMetrics();
  };

  updateSlideWidth();
  window.addEventListener("resize", updateSlideWidth);

  watch([totalSlides, visibleSlides], () => {
    // Ensure current slide is within bounds after metrics update
    scrollToSlide(currentSlide.value);
  });

  return () => {
    window.removeEventListener("resize", updateSlideWidth);
  };
});

const scrollToSlide = (slideIndex) => {
  if (!sliderRef.value) return;

  const maxIndex = totalSlides.value - visibleSlides.value;
  const finalIndex = Math.min(Math.max(0, slideIndex), maxIndex);

  const scrollPosition = finalIndex * (slideWidth.value + slideMargin);

  console.log({
    currentSlide: currentSlide.value,
    finalIndex,
    scrollPosition,
  });

  sliderRef.value.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
};

const goToNextSlide = () => {
  scrollToSlide(currentSlide.value + 1);
};

const goToPreviousSlide = () => {
  scrollToSlide(currentSlide.value - 1);
};

const handleScroll = (event) => {
  sliderPosition.value = event.target.scrollLeft;
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
