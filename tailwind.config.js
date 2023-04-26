/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app_color-bg': '#D8F7FF',
        'app_color-light-blue': '#07435E',
        'app_color-blue': '#042838',
        'app_color-text': '#2D3748',
        'app_color-box-bg': '#4390BA',
      },
      spacing: {
        'cities-list-w': '28rem'
      }
    },
  },
  plugins: [],
}

