/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          100: "#79b3ff",
          200: "#aed1ff",
        },
      },
    },
  },
  plugins: [],
};
