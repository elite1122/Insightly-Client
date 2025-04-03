/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#07190f',
        'background': '#f1fbf4',
        'first': '#4ac87c',
        'second': '#ca94df',
        'third': '#d5759f',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

