<template>
  <section class="space-y-8 overflow-hidden">
    <div class="wrapper mt-10 grid place-items-center text-center">
      <h2 class="text-xl !text-neutral-600">
        {{ partnersSection?.title }}
      </h2>
      <!-- <p class="mt-3 text-pretty text-base">
        {{ partnersSection?.body }}
      </p> -->
    </div>
    <div class="marquee fadeout-horizontal" :style="{ '--num-items': cleanedImagesPath.length }">
      <ul class="marquee-track">
        <li
          class="marquee-item"
          v-for="(path, index) in cleanedImagesPath"
          :key="index"
          :style="{ '--item-position': index + 1 }"
        >
          <NuxtImg
            :src="path"
            :alt="`Partner ${index + 1}`"
            class="media-images__image h-auto w-full object-contain"
            @load="adjustImageWidth"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

const images = import.meta.glob("@@/public/assets/visual/partners-logos/*.png");

const imagesPath = Object.keys(images);

function removePublicFromPaths(paths) {
  return paths.map((path) => path.replace("../public", ""));
}

const cleanedImagesPath = removePublicFromPaths(imagesPath);

const { locale } = useI18n();
const currentLocale = locale.value;

// Fetch the partners section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/partners-section`
const { data: partnersSection } = await useAsyncData("partners-section", () =>
  queryContent(`/${currentLocale}/home/partners-section`).findOne()
);

function adjustImageWidth(event) {
  const image = event.target;
  if (image && image.naturalWidth && image.naturalHeight) {
    const widthBase = 64;
    const scaleFactor = 0.525;
    const imageRatio = image.naturalWidth / image.naturalHeight;

    image.style.width = `${Math.pow(imageRatio, scaleFactor) * widthBase}px`;
  }
}

onMounted(() => {
  const images = document.querySelectorAll(".media-images__image");
  images.forEach((image) => {
    if (image.complete && image.naturalWidth !== 0) {
      adjustImageWidth({ target: image });
    } else {
      image.addEventListener("load", adjustImageWidth);
    }
  });
});
</script>

<style scoped>
.marquee {
  max-width: 90vw;
  overflow: hidden;
  --speed: 25s;
  --item-width: 160px;
  --item-gap: 80px;

  --single-slide-speed: calc(var(--speed) / var(--num-items));
  --item-width-plus-gap: calc(var(--item-width) + var(--item-gap));
  --track-width: calc(var(--item-width-plus-gap) * calc(var(--num-items) - 1));

  margin-inline: auto;

  --mask-color: theme("colors.zinc.100");
  mask: linear-gradient(90deg, transparent, var(--mask-color, #333) 20%, var(--mask-color, #333) 80%, transparent);
}

.marquee-track {
  container-type: inline-size;
  display: grid;
  grid-template-columns: var(--track-width) [track] 0px [resting];
  width: max-content;
}

.marquee-item {
  width: var(--item-width);
  height: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  grid-area: resting;
  animation: marquee-move var(--speed) linear infinite var(--direction, forwards);
  animation-delay: calc(var(--single-slide-speed) * var(--item-position) * -1);
}

@keyframes marquee-move {
  to {
    transform: translateX(calc(-100cqw - 100%));
  }
}
</style>
