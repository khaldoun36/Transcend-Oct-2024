<template>
  <main class="wrapper py-24 pt-32 sm:pb-32 sm:pt-48">
    <div class="grid gap-16 rounded-lg border border-black/10 bg-neutral-50 p-8 shadow-sm lg:grid-cols-2">
      <form @submit.prevent="submitForm" class="flex flex-col gap-8">
        <div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl">{{ contactUs?.formTitle }}</h1>
          <p class="mt-4 text-base md:text-lg">
            {{ contactUs?.formDescription }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <label for="name" class="text-base font-medium text-neutral-800 md:text-lg">
            Your name
            <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            v-model="name"
            required
            class="h-12 rounded-lg border border-black/10 px-4 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email" class="text-base font-medium text-neutral-800 md:text-lg">
            Your email
            <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            v-model="email"
            required
            class="h-12 rounded-lg border border-black/10 px-4 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="service" class="text-base font-medium text-neutral-800 md:text-lg">
            Service
            <span class="text-red-500">*</span>
          </label>
          <div class="grid gap-8 md:grid-cols-2">
            <button
              type="button"
              :class="[
                'flex items-center justify-start rounded-lg border px-4 py-3 transition-colors',
                service === 'ai-development'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-black/10 bg-white text-neutral-800 hover:bg-neutral-100',
              ]"
              @click="service = 'ai-development'"
            >
              <input
                type="radio"
                id="ai-development"
                name="service"
                value="ai-development"
                v-model="service"
                required
                class="hidden"
              />
              <label for="ai-development" class="cursor-pointer text-base">AI development</label>
            </button>
            <button
              type="button"
              :class="[
                'flex items-center justify-start rounded-lg border px-4 py-3 transition-colors',
                service === 'ai-training'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-black/10 bg-white text-neutral-800 hover:bg-neutral-100',
              ]"
              @click="service = 'ai-training'"
            >
              <input
                type="radio"
                id="ai-training"
                name="service"
                value="ai-training"
                v-model="service"
                required
                class="hidden"
              />
              <label for="ai-training" class="cursor-pointer text-base">AI training</label>
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label for="message" class="text-base font-medium text-neutral-800 md:text-lg">
            Your message
            <span class="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            v-model="message"
            required
            class="h-32 rounded-lg border border-black/10 px-4 py-2 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
          ></textarea>
        </div>
        <button
          type="submit"
          class="h-12 rounded-lg bg-primary-500 px-4 text-base font-medium text-zinc-100 transition-colors hover:bg-primary-600 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
        >
          Send Message
        </button>
      </form>
      <NuxtImg
        src="/assets/visual/contact-us.jpg"
        alt="contact us"
        width="3152"
        height="3128"
        class="hidden min-h-full w-full rounded border border-black/10 shadow-sm lg:block"
      />
    </div>
  </main>
</template>

<script setup>
useHead({
  title: "Transcend AI - Contact Us",
});

// Get the current locale from i18n
const { locale } = useI18n();
const localePath = useLocalePath();
const currentLocale = locale.value;

// Fetch the hero section content for the current locale
// This uses the `useAsyncData` composable to query the content
// The content is fetched from the path `/${currentLocale}/home/hero-section`
const { data: contactUs } = await useAsyncData("contact-us", () =>
  queryContent(`/${currentLocale}/contact/contact-us`).findOne()
);

// form control
import { ref } from "vue";
const WEB3FORMS_ACCESS_KEY = "63da4544-2ce2-4fa9-9cee-b51a2927b918";
const name = ref("");
const email = ref("");
const message = ref("");
const service = ref("");

const resetForm = () => {
  name.value = "";
  email.value = "";
  message.value = "";
  service.value = "";
};

const submitForm = async () => {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: name.value,
      email: email.value,
      message: message.value,
      service: service.value,
    }),
  });
  const result = await response.json();
  if (result.success) {
    resetForm();
    // Redirect to home page after successful submission
    alert("Message sent successfully");

    setTimeout(() => {
      navigateTo(localePath("/"));
    }, 5000);
  }
};
</script>

<style scoped></style>
