<template>
  <div class="no-scrollbar mt-10 h-[500px] max-w-[99vw] overflow-hidden md:mt-12 lg:mt-16">
    <ContentList :path="`/${currentLocale}/solutions`" v-slot="{ list }">
      <ul
        ref="sliderRef"
        @scroll="handleScroll"
        class="carousel no-scrollbar flex h-[432px] snap-x snap-mandatory overflow-x-auto pb-10 md:h-[540px]"
      >
        <li v-for="article in list" :key="article.name" class="mr-5 shrink-0 snap-start snap-always last:mr-0">
          <NuxtLink :to="localePath(`/solutions/${article.path}`)">
            <div
              class="slide-center relative flex h-full w-[calc(100vw-4rem)] flex-col overflow-hidden rounded-lg border border-black/10 bg-neutral-50 md:w-[400px]"
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
        <li class="opacity-0 last:mr-0">
          <NuxtLink>
            <div
              class="slide-center relative flex h-full w-[3px] flex-col rounded-lg border border-black/10 bg-neutral-50"
            >
              <h3 class="mt-auto p-6 text-2xl">hello world</h3>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </div>
  <div class="wrapper mt-8 hidden justify-end lg:flex">
    <button
      @click="goToPreviousSlide"
      :disabled="isAtStart"
      class="mr-2 flex size-10 items-center justify-center rounded-full border border-black/10 bg-black/5 disabled:opacity-40"
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
      :disabled="isAtEnd"
      class="flex size-10 items-center justify-center rounded-full border border-black/10 bg-black/5 disabled:opacity-40"
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
import { ref, computed, onMounted } from "vue";

const { locale } = useI18n();
const currentLocale = locale.value;

const sliderRef = ref(null);
const sliderPosition = ref(0);

let slideWidth = 320;
const slideMargin = 20;

const currentSlide = computed(() => {
  return Math.floor(sliderPosition.value / (slideWidth + slideMargin));
});

const isAtStart = computed(() => {
  return sliderPosition.value === 0;
});

const isAtEnd = computed(() => {
  if (!sliderRef.value) return false;
  const buffer = 5; // Buffer to account for rounding errors
  return sliderRef.value.scrollWidth - sliderRef.value.scrollLeft - sliderRef.value.clientWidth < buffer;
});

const scrollToSlide = (slideIndex) => {
  if (!sliderRef.value) return;

  const totalSlides = sliderRef.value.children.length;
  const maxIndex = totalSlides - 1; // Ensure it doesn't scroll beyond the last slide
  const finalIndex = Math.min(slideIndex, maxIndex); // Prevent going out of bounds

  sliderRef.value.scrollTo({
    left: finalIndex * (slideWidth + slideMargin),
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

onMounted(() => {
  // Dynamically update slide width based on the current slide element width
  if (sliderRef.value && sliderRef.value.children.length > 0) {
    const firstSlide = sliderRef.value.children[0];
    slideWidth = firstSlide.offsetWidth;
  }
});
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

/* .carousel {
  --mask-color: theme("colors.zinc.100");
  mask: linear-gradient(90deg, transparent, var(--mask-color, #333) 20%, var(--mask-color, #333) 80%, transparent);
} */
</style>
