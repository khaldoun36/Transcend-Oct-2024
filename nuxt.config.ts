// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  // CSS import
  css: ["@/assets/css/main.css", "@/assets/css/components.css"],

  future: {
    compatibilityVersion: 4,
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts", "@nuxt/content", "@nuxtjs/i18n", "@nuxt/image"],

  // Internationalization Config
  i18n: {
    // Defines the available locales for the application
    locales: [
      {
        code: "en", // Short language code used in URLs and as a key
        iso: "en-US", // ISO code for the language, used for SEO purposes
        name: "EN", // Display name of the language
      },
      {
        code: "ar", // Short language code for Spanish
        iso: "ar-AE", // ISO code for Arabic (United Arab Emirates)
        name: "AR", // Display name for Arabic
      },
    ],
    // Defines how URLs are structured for different locales
    // "prefix_except_default" means all non-default locales will have a prefix in the URL
    strategy: "prefix_except_default",
    // Sets the default locale of the application
    defaultLocale: "en",
  },
});