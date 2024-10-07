<template>
  <div class="no-scrollbar mt-10 h-[500px] max-w-[99vw] overflow-hidden md:mt-12 lg:mt-16">
    <ContentList :path="`/${currentLocale}/solutions`" v-slot="{ list }">
      <!-- <div >
        <h2>{{ article.Subtitle }}</h2>
      </div> -->

      <ul
        ref="sliderRef"
        @scroll="handleScroll"
        class="carousel no-scrollbar flex h-[432px] snap-x snap-mandatory overflow-x-auto pb-10 md:h-[540px]"
      >
        <li v-for="article in list" :key="article.name" class="mr-5 shrink-0 snap-start snap-always last:mr-0">
          <NuxtLink :to="localePath(`/solutions/${article.path}`)">
            <div
              class="slide-center relative flex h-full w-[320px] flex-col rounded-lg border border-black/10 bg-neutral-50 md:w-[400px]"
            >
              <!-- <div :class="['flex h-full justify-center', slide.centered ? 'items-center' : 'items-start']">
              <img :src="slide.img" :alt="slide.title" :width="slide.imageWidth" :height="slide.imageHeight" />
            </div> -->
              <h3 class="mt-auto p-6 text-2xl">
                {{ article.Subtitle }}
              </h3>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </div>
  <div class="wrapper mt-4 hidden justify-end lg:flex">
    <button
      @click="goToPreviousSlide"
      class="mr-2 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 disabled:border-gray-400 disabled:text-gray-400"
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
      class="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 disabled:border-gray-400 disabled:text-gray-400"
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
import { ref, computed } from "vue";

const { locale } = useI18n();
const currentLocale = locale.value;

const slideWidth = 320;
const slideMargin = 20;

const sliderRef = ref(null);
const sliderPosition = ref(0);

const currentSlide = computed(() => {
  return Math.floor(sliderPosition.value / (slideWidth + slideMargin));
});

const scrolledToEndOfSlider = computed(() => {
  if (!sliderRef.value) return false;
  return sliderRef.value.scrollWidth - sliderRef.value.scrollLeft - sliderRef.value.clientWidth === 0;
});

const scrollToSlide = (slideIndex) => {
  if (!sliderRef.value) return;
  sliderRef.value.scrollTo({
    left: slideIndex * (slideWidth + slideMargin),
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
/* .carousel {
  --mask-color: theme("colors.zinc.100");
  mask: linear-gradient(90deg, transparent, var(--mask-color, #333) 10%, var(--mask-color, #333) 90%, transparent);
} */

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
