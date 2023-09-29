/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minHeight: {
      'min-13rem': '13rem',
      'min-8rem': '8rem',
    },
    extend: {
    },
  },
  plugins: [],
}

