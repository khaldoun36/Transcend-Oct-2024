/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontSize: {
        "4.5xl": ["2.5rem", "3rem"],
        "5.5xl": ["3.5rem", "3.5rem"],
      },
      colors: ({ colors }) => ({
        primary: colors.purple,
        neutral: colors.zinc,
      }),
    },
  },
  plugins: [],
};
